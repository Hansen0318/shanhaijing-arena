import {canCharacterAct} from './character.js';
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export function matchesTierCondition(condition,session,actor,target){
 if(!condition)return true;if(!target||!canCharacterAct(target))return false;
 const context=session.teamContext(actor);
 if(condition.kind==='low_hp')return target.hp/target.maxHp<=(condition.threshold??.35);
 if(condition.kind==='rear_range'){const d=Math.min(Infinity,...context.enemies.filter(canCharacterAct).map(e=>distance(actor,e)));return d>=(condition.min??2)&&d<=(condition.max??4.2);}
 if(condition.kind==='target_pressure')return target.hp/target.maxHp<=(condition.threshold??.35)||!context.enemies.some(e=>e.instanceId!==target.instanceId&&canCharacterAct(e)&&distance(e,target)<=(condition.radius??1.4));
 if(condition.kind==='changed_angle'){const e=session.mobilityEvidence.get(actor.instanceId);return e?.targetId===target.instanceId&&session.elapsedSeconds-e.at<=(condition.within??4)&&(e.distance>=(condition.minDistance??.35)||e.angle>=(condition.minAngle??.2));}
 return false;
}
export class TierEffectRuntime {
 constructor(session){this.session=session;}
 effects(actor,category,trigger){return (this.session.tierProjections.get(actor.instanceId)?.effects??[]).filter(e=>(!e.category||e.category===category)&&(!trigger||e.trigger===trigger));}
 multiplier(kind,actor,target,category,{hitIndex=0,totalHits=1}={}){
  const effects=this.effects(actor,category,'modify').filter(e=>e.kind===kind&&(!e.lastHit||hitIndex===totalHits-1)&&matchesTierCondition(e.condition,this.session,actor,target));
  return 1+Math.min(.15,effects.reduce((n,e)=>n+e.magnitude-1,0));
 }
 trigger(trigger,actor,target,category){
  for(const e of this.effects(actor,category,trigger))if(matchesTierCondition(e.condition,this.session,actor,target)){
   if(e.kind==='status'){const victim=e.recipient==='target'?target:actor;if(victim&&canCharacterAct(victim))this.session.statuses.apply({...e.status,sourceId:actor.instanceId,targetId:victim.instanceId,key:e.id},this.session.elapsedSeconds);}
  }
 }
}
