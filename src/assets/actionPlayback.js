// Copied presentation events only. Simulation owns all timing and hit outcomes.
export class ActionPlayback{
 constructor(){this.active=new Map();}
 handle(event,descriptor){
  const {actorId,actionId,phase}=event;if(!actorId||!actionId)return;
  const old=this.active.get(actorId);
  if(phase==='start'){
   if(!Number.isFinite(event.startedAt)||old?.actionId===actionId||old&&event.startedAt<old.startedAt)return;
   const origin=event.attackOrigin??event.origin,target=event.attackTarget??event.target??origin;
   if(!origin||!target)return;
   this.active.delete(actorId);while(this.active.size>=64)this.active.delete(this.active.keys().next().value);
   this.active.set(actorId,{actionId,descriptor,startedAt:event.startedAt,flipX:target.x<origin.x,resolvedAt:null,hit:false});
  }else if(old?.actionId===actionId){
   if(phase==='cancel')this.remove(actorId);
   else if(phase==='resolve'&&old.resolvedAt===null&&Number.isFinite(event.resolvedAt)&&event.resolvedAt>=old.startedAt){old.resolvedAt=event.resolvedAt;old.hit=event.hit===true;if(event.target)old.contactTarget={x:event.target.x,y:event.target.y};}
  }
 }
 sample(ownerId,now,reducedMotion=false){
  const r=this.active.get(ownerId);if(!r||!Number.isFinite(now))return null;
  const d=r.descriptor,elapsed=Math.max(0,now-r.startedAt),resolved=r.resolvedAt!==null,after=resolved?Math.max(0,now-r.resolvedAt):0,hold=d.frameDurationsMs[2]/1000,recovery=d.frameDurationsMs[3]/1000;
  if(resolved&&after+1e-9>=(reducedMotion?hold:hold+recovery)){this.remove(ownerId);return null;}
  const frameIndex=resolved?(after+1e-9<hold?2:3):reducedMotion||elapsed+1e-9<d.frameDurationsMs[0]/1000?0:1;
  const fade=resolved?Math.max(0,1-after/hold):0;
  return {actionId:r.actionId,descriptor:d,frameIndex,flipX:r.flipX,bladeOpacity:reducedMotion||frameIndex===0||frameIndex===3?0:resolved?fade:.55,contactOpacity:resolved&&r.hit?fade:0,...(d.contact.attach==='target'&&r.contactTarget?{contactTarget:{...r.contactTarget}}:{})};
 }
 remove(ownerId){this.active.delete(ownerId);}
 clear(){this.active.clear();}
}
