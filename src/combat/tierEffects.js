import {validateArea} from './areaSchema.js';
import {validateStatus} from './statusSchema.js';
import {resolveTierScaling,resolveTierStats,TIER_SAFETY,scaleTierStatus,capTierGrowth} from './tierScaling.js';
// Pure immutable combat data. Never imports progression, storage or the battle runtime.
export const COMBAT_TIERS=Object.freeze(['T0','T1','T2','T3']);
export function freezeEffectData(value){if(value&&typeof value==='object'){Object.values(value).forEach(freezeEffectData);Object.freeze(value);}return value;}
const kinds=new Set(['range','approach','damage','heal','status','protect','area']);
const conditions=new Set(['low_hp','rear_range','target_pressure','changed_angle']);
export function createTierEffect(input){
 if(!input||typeof input.id!=='string'||!input.id||!kinds.has(input.kind))throw new TypeError('Invalid Tier effect');
 const e=structuredClone(input);e.trigger??=['range','approach','damage','heal'].includes(e.kind)?'modify':'post_cast';
 if(['range','approach','damage','heal'].includes(e.kind)?e.trigger!=='modify':e.trigger==='modify')throw new TypeError('Unsupported effect trigger');
 if(e.kind==='status'&&e.recipient!=null&&!['self','target'].includes(e.recipient))throw new TypeError('Invalid status recipient');
 if(e.lastHit!=null&&typeof e.lastHit!=='boolean')throw new TypeError('Invalid last-hit predicate');
 if(!['modify','cast','hit','post_cast'].includes(e.trigger))throw new TypeError('Invalid effect trigger');
 if(e.category!=null&&!['basic','heavy','special','awakening'].includes(e.category))throw new TypeError('Invalid effect category');
 if(['range','approach','damage','heal'].includes(e.kind)&&(!Number.isFinite(e.magnitude)||e.magnitude<1||e.magnitude>1.15))throw new RangeError('Modifier must be 1–1.15');
 if(e.condition){const c=e.condition;if(!conditions.has(c.kind))throw new TypeError('Invalid condition');for(const key of ['threshold','radius','min','max','minDistance','minAngle','within'])if(c[key]!=null&&(!Number.isFinite(c[key])||c[key]<0))throw new RangeError('Invalid condition data');if(c.within!=null&&(c.within<=0||c.within>30))throw new RangeError('Invalid condition window');if(c.min!=null&&c.max!=null&&c.min>c.max)throw new RangeError('Invalid condition band');if(['range','approach'].includes(e.kind))throw new TypeError('Static projection cannot have condition');if(c.threshold!=null&&c.threshold>1)throw new RangeError('HP threshold exceeds1');}
 if(['status','protect'].includes(e.kind))validateStatus(e.status);
 if(e.kind==='protect'&&(!Number.isFinite(e.radius)||e.radius<=0||!['threatened','team'].includes(e.recipient)))throw new RangeError('Invalid protection');
 if(e.kind==='area')validateArea(e.area);
 return freezeEffectData(e);
}
export function resolveTierProjection(definition,tier='T0',abilities={}){
 if(!COMBAT_TIERS.includes(tier))throw new TypeError('Invalid combat Tier');
 const scales=resolveTierScaling(tier,definition.tierScalingProfile);
 const effects=COMBAT_TIERS.slice(1,COMBAT_TIERS.indexOf(tier)+1).flatMap(t=>definition.tierEffects?.[t]??[]).map(createTierEffect).map(base=>{
  const e={...base};
  if(e.status)e.status=scaleTierStatus(e.status,scales);
  if(e.kind==='protect')e.radius=capTierGrowth(e.radius,scales.supportRange,TIER_SAFETY.supportRange);
  if(e.area){e.area={...e.area};if(e.area.tierScaling?.aoe)e.area.radius=capTierGrowth(e.area.radius,scales.aoe,TIER_SAFETY.aoeRadius);if(e.area.status)e.area.status=scaleTierStatus(e.area.status,scales);}
  return freezeEffectData(e);
 });
 const stats=resolveTierStats(definition,scales);
 const basic=abilities[definition.abilities.basic];
 const basicMechanic=1+Math.min(.15,effects.filter(e=>e.kind==='range'&&(!e.category||e.category==='basic')).reduce((n,e)=>n+e.magnitude-1,0));
 const bandGain=(basic?.tierScaling?.attackRange===false?1:scales.attackRange)*basicMechanic;
 const aiProfile=definition.aiProfile?Object.freeze({...definition.aiProfile,preferredRangeMin:definition.aiProfile.preferredRangeMin*bandGain,preferredRangeMax:definition.aiProfile.preferredRangeMax*bandGain}):null;
 return Object.freeze({characterId:definition.id,tier,definition,scales,stats,aiProfile,effects:Object.freeze(effects)});
}
export function resolveTierAbilities(projection,definitions){
 const table={...definitions},s=projection.scales;
 for(const category of ['basic','heavy','special','awakening']){
  const id=projection.definition.abilities[category],base=definitions[id];if(!base)continue;
  const effects=projection.effects.filter(e=>(!e.category||e.category===category)&&['range','approach'].includes(e.kind));if(!effects.length&&projection.tier==='T0')continue;
  const gain=kind=>1+Math.min(.15,effects.filter(e=>e.kind===kind).reduce((n,e)=>n+e.magnitude-1,0));
  const mechanicRange=gain('range'),approachGain=gain('approach');
  const support=base.targetingRule!=='enemy',rangeGain=(base.tierScaling?.attackRange===false?1:support?s.supportRange:s.attackRange)*mechanicRange;
  const range=capTierGrowth(base.range,rangeGain,support?TIER_SAFETY.supportRange:Infinity);
  const aoeGain=base.tierScaling?.aoe?s.aoe:1;
  const effect={...base.effect};
  if(effect.areaRadius!=null)effect.areaRadius=capTierGrowth(effect.areaRadius,aoeGain*mechanicRange,TIER_SAFETY.aoeRadius);
  if(effect.movement)effect.movement=Object.freeze({...effect.movement,distance:capTierGrowth(effect.movement.distance,(base.tierScaling?.mobility?s.mobilityDistance:1)*approachGain,TIER_SAFETY.mobilityDistance)});
  if(base.tierScaling?.status&&effect.kind==='mitigation'){
   const status=scaleTierStatus({type:'mitigation',duration:effect.duration,magnitude:effect.reduction,tierScaling:{duration:true,strength:true}},s);
   effect.duration=status.duration;effect.reduction=status.magnitude;
  }
  let telegraph=base.telegraph?{...base.telegraph,dangerRadius:effect.areaRadius??capTierGrowth(base.telegraph.dangerRadius,aoeGain*mechanicRange,TIER_SAFETY.aoeRadius)}:null;
  if(telegraph&&base.tierScaling?.windup===true){
   telegraph.telegraphMs=Math.max(TIER_SAFETY.windupMs,telegraph.telegraphMs*s.windup,
    telegraph.dodgeable?TIER_SAFETY.dodgeWindowMs-telegraph.projectileTravelMs:0);
  }
  table[id]=freezeEffectData({...base,cooldown:category==='basic'?0:Math.max(TIER_SAFETY.cooldown,base.cooldown*s.cooldown),range,maxRange:range,
   minRange:Math.min(range,base.minRange*rangeGain),preferredRange:base.preferredRange==null?null:Math.min(range,base.preferredRange*rangeGain),
   telegraph,effect});
 }
 return Object.freeze(table);
}
