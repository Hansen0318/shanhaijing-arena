import {freezeEffectData} from './tierEffects.js';
import {validateArea} from './areaSchema.js';
import {containsDanger} from './threats.js';
import {livingUnique} from './effectTargeting.js';
export class PersistentAreas{
 constructor(){this.records=new Map();this.sequence=0;this.nextTicks=new Map();this.evaluations=0;}
 create({sourceId,sourceTeamId,center,spec,definition=null,category='awakening',source='ai'},now){
  validateArea(spec);if(!sourceId||!sourceTeamId||!Number.isFinite(center?.x)||!Number.isFinite(center?.y)||!Number.isFinite(now)||now<0)throw new TypeError('Invalid area identity/geometry');
  if(this.records.size>=12)this.remove(this.records.keys().next().value);
  const record=freezeEffectData({id:`area-${++this.sequence}`,sourceId,sourceTeamId,geometry:{shape:'circle',center:{x:center.x,y:center.y},origin:{x:center.x,y:center.y},radius:spec.radius},spec:structuredClone(spec),definition,category,source,startTime:now,expiryTime:now+spec.duration});
  this.records.set(record.id,record);this.nextTicks.set(record.id,now+(spec.behavior==='impact'?0:spec.interval));return record;
 }
 tick(now,actors,apply){
  for(const area of this.records.values()){
   if(now>=area.expiryTime){this.remove(area.id);continue;}
   const due=this.nextTicks.get(area.id);if(now+1e-9<due)continue;
   this.evaluations++;
   for(const target of livingUnique(actors))if((area.spec.eligibility==='all'||(target.teamId===area.sourceTeamId)===(area.spec.eligibility==='ally'))&&containsDanger(target,area.geometry))apply(area,target);
   if(area.spec.behavior==='impact')this.remove(area.id);
   // One pulse per simulation step, skips missed intervals; never unbounded catch-up.
   else this.nextTicks.set(area.id,due+(Math.floor(Math.max(0,now-due)/area.spec.interval)+1)*area.spec.interval);
  }
 }
 remove(id){this.records.delete(id);this.nextTicks.delete(id);}
 cleanupKO(ids){for(const [id,a] of this.records)if(ids.has(a.sourceId))this.remove(id);}
 clear(){this.records.clear();this.nextTicks.clear();}
}
