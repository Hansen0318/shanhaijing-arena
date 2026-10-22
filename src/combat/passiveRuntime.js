import {createPassiveDefinition} from './passiveDefinition.js';
import {freezeEffectData} from './tierEffects.js';
const EPS=1e-10;
function validateSegment(s){
 if(s?.kind!=='ordinary'||![s.start,s.end,s.from?.x,s.from?.y,s.to?.x,s.to?.y].every(Number.isFinite)||s.start<0||s.end<=s.start)throw new TypeError('Invalid ordinary motion segment');
}
const length=s=>Math.hypot(s.to.x-s.from.x,s.to.y-s.from.y);
function distanceAt(samples,now,window,readyAt){
 return samples.reduce((sum,s)=>{const lo=Math.max(s.start,now-window,readyAt),hi=Math.min(s.end,now);return sum+(hi>lo?length(s)*(hi-lo)/(s.end-s.start):0);},0);
}
export class PassiveRuntime{
 constructor({actors,characterForActor,abilityDefinitions,statuses,tierForActor=()=> 'T0'}){
  this.actors=actors;this.characterForActor=characterForActor;this.statuses=statuses;this.entries=new Map();this.now=0;
  for(const actor of actors){const defs=[];for(const id of characterForActor(actor).abilities.passives??[]){const input=abilityDefinitions[id];if(!input?.implemented)continue;const base=createPassiveDefinition(input),tier=tierForActor(actor);if(base.tierMagnitudes&&!Object.hasOwn(base.tierMagnitudes,tier))throw new TypeError('Invalid passive Tier');const definition=createPassiveDefinition({...base,effect:{...base.effect,magnitude:base.tierMagnitudes?.[tier]??base.effect.magnitude}});defs.push({actor,definition,samples:[],readyAt:0,statusId:null,lastEnd:0});}if(defs.length)this.entries.set(actor.instanceId,defs);}
 }
 enabled(){return this.entries.size>0;}
 nextBoundary(instanceId,segment){
  validateSegment(segment);const times=[];
  for(const e of this.entries.get(instanceId)??[]){
   const {definition:d}=e,start=segment.start,end=segment.end;
   if(start<e.lastEnd-EPS)throw new RangeError('Ordinary motion goes backwards');
   const status=this.statuses.forActor(instanceId,start).find(s=>s.id===e.statusId);
   if(status&&status.expiryTime>start+EPS&&status.expiryTime<=end+EPS)times.push(status.expiryTime);
   if(e.readyAt>start+EPS){if(e.readyAt<=end+EPS)times.push(e.readyAt);continue;}
   const samples=[...e.samples,segment],knots=[start,end,...samples.flatMap(s=>[s.start+d.trigger.windowSeconds,s.end+d.trigger.windowSeconds])].filter(t=>t>=start&&t<=end).sort((a,b)=>a-b);
   const value=t=>distanceAt(samples,t,d.trigger.windowSeconds,e.readyAt);
   for(let i=0;i<knots.length-1;i++){
    const a=knots[i],b=knots[i+1],v=value(a),w=value(b);
    if(v>=d.trigger.distance-EPS){times.push(a);break;}
    if(w>=d.trigger.distance-EPS&&w>v+EPS){times.push(a+(d.trigger.distance-v)*(b-a)/(w-v));break;}
   }
  }
  return times.length?Math.min(...times):null;
 }
 appendOrdinary(instanceId,segment){
  validateSegment(segment);const entries=this.entries.get(instanceId)??[];
  for(const e of entries)if(segment.start<e.lastEnd-EPS)throw new RangeError('Replayed or out-of-order ordinary movement');
  for(const e of entries){
   e.lastEnd=segment.end;e.samples=e.samples.filter(s=>s.end>segment.end-e.definition.trigger.windowSeconds&&s.end>e.readyAt);
   const start=Math.max(segment.start,e.readyAt);
   if(start<segment.end&&length(segment)>0){const f=(start-segment.start)/(segment.end-segment.start);e.samples.push({kind:'ordinary',start,end:segment.end,from:{x:segment.from.x+(segment.to.x-segment.from.x)*f,y:segment.from.y+(segment.to.y-segment.from.y)*f},to:{...segment.to}});}
  }
 }
 settle(now){
  if(!Number.isFinite(now)||now<this.now-EPS)throw new RangeError('Invalid passive simulation clock');this.now=now;const activations=[];
  for(const [id,entries]of this.entries){
   if(entries[0].actor.hp<=0){this.clearActor(id);continue;}
   for(const e of entries){
    const d=e.definition;e.samples=e.samples.filter(s=>s.end>now-d.trigger.windowSeconds);
    if(now+EPS<e.readyAt)continue;
    if(distanceAt(e.samples,now,d.trigger.windowSeconds,e.readyAt)<d.trigger.distance-EPS)continue;
    if(this.statuses.controlled(id,now)){e.samples=[];continue;}
    const record=this.statuses.apply({sourceId:id,targetId:id,key:`passive:${d.id}`,type:d.effect.type,magnitude:d.effect.magnitude,duration:d.effect.duration,...(d.effect.data?{data:d.effect.data}:{})},now);
    e.statusId=record.id;e.readyAt=now+d.cooldownSeconds;e.samples=[];activations.push(freezeEffectData({instanceId:id,definitionId:d.id,at:now,statusId:record.id}));
   }
  }
  return activations;
 }
 snapshot(now){
  if(!Number.isFinite(now)||now<0)throw new RangeError('Invalid passive snapshot clock');const views=[];
  for(const [id,entries]of this.entries)for(const e of entries){
   if(e.actor.hp<=0)continue;const d=e.definition,records=this.statuses.forActor(id,now),record=records.find(s=>s.id===e.statusId),multiplier=this.statuses.movementMultiplier(id,now);
   views.push(freezeEffectData({instanceId:id,definitionId:d.id,label:d.presentation.label,implemented:true,progressDistance:now+EPS<e.readyAt?0:Math.min(d.trigger.distance,distanceAt(e.samples,now,d.trigger.windowSeconds,e.readyAt)),threshold:d.trigger.distance,readyAt:e.readyAt,active:record?{statusId:record.id,startTime:record.startTime,expiryTime:record.expiryTime,contribution:d.effect.magnitude-1}:null,effectiveMoveSpeed:this.characterForActor(e.actor).stats.moveSpeed*multiplier,movementCapReached:multiplier>=1+this.statuses.movementBonusCap(id,now)-1e-9}));
  }
  return Object.freeze(views);
 }
 clearActor(id){
  const ids=new Set((this.entries.get(id)??[]).map(e=>e.statusId));for(const [key,record]of this.statuses.records)if(ids.has(record.id))this.statuses.records.delete(key);this.entries.delete(id);this.statuses.refreshMitigation(this.now);
 }
 clear(){for(const id of this.entries.keys())this.clearActor(id);}
}
