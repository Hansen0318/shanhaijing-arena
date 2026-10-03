import {freezeEffectData} from './tierEffects.js';
import {validateStatus} from './statusSchema.js';
// Session-owned records and compatibility projection for the T0 mitigation indicator.
export class BattleStatuses {
 constructor(){this.records=new Map();this.mitigation=new Map();this.sequence=0;}
 apply(input,now){
  validateStatus(input);if(!Number.isFinite(now)||now<0||!input.targetId||!input.sourceId)throw new TypeError('Invalid status identity/clock');
  this.expire(now);
  if(input.type==='control'&&this.forActor(input.targetId,now).some(s=>s.type==='steadfast'))return null;
  const key=input.key??input.type,policy=input.policy??'replace';
  const matching=[...this.records.values()].filter(s=>s.targetId===input.targetId&&s.sourceId===input.sourceId&&s.key===key);
  if(policy==='stack'){while(matching.length>=(input.maxStacks??3))this.records.delete(matching.shift().id);}
  else{for(const s of matching)this.records.delete(s.id);}
  const strongest=policy==='strongest'?Math.max(input.magnitude,...matching.map(s=>s.magnitude)):input.magnitude;
  if(this.records.size>=64)this.records.delete(this.records.keys().next().value);
  const record=freezeEffectData({id:`status-${++this.sequence}`,sourceId:input.sourceId,targetId:input.targetId,areaId:input.areaId??null,key,type:input.type,magnitude:strongest,data:structuredClone(input.data??{}),startTime:now,expiryTime:now+input.duration,policy,tags:[...(input.tags??[])]});
  this.records.set(record.id,record);this.refreshMitigation(now);return record;
 }
 applyMitigation(actorId,reduction,duration,now){return this.apply({sourceId:actorId,targetId:actorId,type:'mitigation',magnitude:reduction,duration,key:'base-mitigation'},now);}
 forActor(id,now){return [...this.records.values()].filter(s=>s.targetId===id&&now>=s.startTime&&now+1e-9<s.expiryTime);}
 refreshMitigation(now){this.mitigation.clear();for(const s of this.records.values())if(s.type==='mitigation'&&now+1e-9<s.expiryTime){const old=this.mitigation.get(s.targetId);if(!old||s.magnitude>old.reduction)this.mitigation.set(s.targetId,{reduction:s.magnitude,expiresAt:s.expiryTime});}}
 expire(now){for(const [id,s] of this.records)if(now+1e-9>=s.expiryTime)this.records.delete(id);this.refreshMitigation(now);}
 cleanupKO(ids){for(const [id,s] of this.records)if(ids.has(s.sourceId)||ids.has(s.targetId))this.records.delete(id);this.refreshMitigation(0);}
 clear(){this.records.clear();this.mitigation.clear();}
 damageMultiplier(id,now){return 1-Math.max(0,...this.forActor(id,now).filter(s=>['mitigation','incoming'].includes(s.type)).map(s=>s.magnitude));}
 multiplier(id,now,type){return 1+Math.min(.15,this.forActor(id,now).filter(s=>s.type===type).reduce((n,s)=>n+s.magnitude-1,0));}
 movementMultiplier(id,now){return this.multiplier(id,now,'movement');}
 outgoingMultiplier(id,now){return this.multiplier(id,now,'outgoing');}
 controlled(id,now){return this.forActor(id,now).some(s=>s.type==='control');}
 avoids(id,now,dodgeable){return this.forActor(id,now).some(s=>s.type==='avoidance'&&(!s.data.dodgeableOnly||dodgeable));}
}
