import {validateStatus} from './statusSchema.js';
import {freezeEffectData} from './tierEffects.js';
const positive=(v,label)=>{if(!Number.isFinite(v)||v<=0)throw new RangeError(`Invalid passive ${label}`);};
export function createPassiveDefinition(input){
 if(!input||!['id','name'].every(k=>typeof input[k]==='string'&&input[k].trim())||input.category!=='passive'||input.implemented!==true)throw new TypeError('Invalid implemented passive definition');
 const {trigger,effect,cooldownSeconds}=input;
 if(trigger?.kind==='rear-support'){
  for(const key of ['enemyMinDistance','recipientRange','recipientMaxHpRatio'])positive(trigger[key],key);
  if(trigger.enemyMinDistance>20||trigger.recipientRange>20||trigger.recipientMaxHpRatio>1)throw new RangeError('Unsafe rear support condition');
  positive(cooldownSeconds,'cooldown');
  const valid=m=>{positive(m,'heal fraction');if(m>1)throw new RangeError('Unsafe heal fraction');};
  if(effect?.kind!=='instant-heal')throw new TypeError('Rear support requires instant heal');valid(effect.magnitude);
  if(Object.keys(input.tierMagnitudes??{}).sort().join(',')!=='T0,T1,T2,T3')throw new TypeError('Incomplete heal Tier data');
  let previous=0;for(const tier of ['T0','T1','T2','T3']){const m=input.tierMagnitudes[tier];valid(m);if(m<=previous)throw new RangeError('Heal Tiers must increase');previous=m;}
  const v=input.presentation;
  if(v?.style!=='paired-fish'||!Array.isArray(v.assetKeys)||v.assetKeys.length!==4||v.assetKeys.some(k=>typeof k!=='string'||!k.trim()))throw new TypeError('Invalid recipient presentation');
  positive(v.duration,'visual duration');if(v.duration>1||!Array.isArray(v.size)||v.size.length!==2||v.size.some(n=>!Number.isFinite(n)||n<=0)||!Array.isArray(v.offset)||v.offset.length!==2||!v.offset.every(Number.isFinite))throw new TypeError('Invalid visual geometry');
  return freezeEffectData(structuredClone({...input,trigger:{...trigger},effect:{kind:'instant-heal',magnitude:effect.magnitude},presentation:{...v,label:v.label??input.name}}));
 }
 const spatial=trigger?.kind==='spatial-pressure';
 if(!spatial&&trigger?.kind!=='ordinary-distance')throw new TypeError('Unsupported passive trigger');
 const fields=spatial?['enemyRadius','allyRadius','allyEnemyRadius']:['distance','windowSeconds'];
 for(const key of fields){positive(trigger[key],key);if(spatial&&trigger[key]>20)throw new RangeError('Passive radius exceeds arena safety bound');}
 positive(cooldownSeconds,'cooldown');
 if(effect?.kind!=='status'||effect.type!==(spatial?'mitigation':'movement'))throw new TypeError('Unsupported passive effect');
 const validate=value=>{validateStatus(value);if(spatial&&value.magnitude>.5)throw new RangeError('Passive mitigation exceeds 50 percent');};
 validate(effect);
 if(spatial&&!input.tierMagnitudes)throw new TypeError('Defense passive requires explicit Tier growth');
 if(input.tierMagnitudes){
  if(Object.keys(input.tierMagnitudes).sort().join(',')!=='T0,T1,T2,T3')throw new TypeError('Incomplete passive Tier data');
  let previous=-Infinity;
  for(const tier of ['T0','T1','T2','T3']){const magnitude=input.tierMagnitudes[tier];validate({...effect,magnitude});if(spatial&&magnitude<=previous)throw new RangeError('Defense passive Tier growth must increase');previous=magnitude;}
 }
 if(cooldownSeconds<effect.duration)throw new RangeError('Passive cooldown must cover the active duration');
 const label=input.presentation?.label??input.name,style=input.presentation?.style;
 if(typeof label!=='string'||!label.trim())throw new TypeError('Invalid passive label');
 if(style!=null&&style!==(spatial?'guard-plates':'speed-streaks'))throw new TypeError('Unsupported passive presentation');
 return freezeEffectData({id:input.id,name:input.name,category:'passive',implemented:true,...(typeof input.description==='string'?{description:input.description}:{}),...(input.tierMagnitudes?{tierMagnitudes:{...input.tierMagnitudes}}:{}),trigger:{kind:trigger.kind,...Object.fromEntries(fields.map(key=>[key,trigger[key]]))},cooldownSeconds,effect:{kind:'status',type:effect.type,magnitude:effect.magnitude,duration:effect.duration,...(effect.data?{data:structuredClone(effect.data)}:{})},presentation:{label,...(style?{style}:{})}});
}
