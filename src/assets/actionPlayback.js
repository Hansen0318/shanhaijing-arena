// Opt-in readability: one static sweep in reduced motion, never extra hits.
export function releasedBladeOpacity(descriptor,after,reducedMotion=false){
 const duration=descriptor.blade.holdAfterResolveMs/1000;
 if(after<0||after+1e-9>=duration)return 0;
 return reducedMotion?1:Math.min(1,(duration-after)/.08);
}
// Copied presentation events only. Simulation owns all timing and hit outcomes.
export class ActionPlayback{
 constructor(){this.active=new Map();}
 handle(event,descriptor){
  const {actorId,actionId,phase}=event;if(!actorId||!actionId)return;
  const old=this.active.get(actorId);
  if(descriptor.kind==='staged'){this.handleStaged(event,descriptor,old);return;}
  if(phase==='start'){
   if(!Number.isFinite(event.startedAt)||old?.actionId===actionId||old&&event.startedAt<old.startedAt)return;
   const origin=event.attackOrigin??event.origin,target=event.attackTarget??event.target??origin;
   if(!origin||!target)return;
   this.active.delete(actorId);while(this.active.size>=64)this.active.delete(this.active.keys().next().value);
   this.active.set(actorId,{actionId,descriptor,startedAt:event.startedAt,flipX:target.x<origin.x,resolvedAt:null,hit:false,...(descriptor.kind==='area-observed'?{sourceOrigin:{...origin}}:{}),...(descriptor.blade.attach==='line'?{lineOrigin:{...origin},lineTarget:{...target}}:{})});
  }else if(old?.actionId===actionId){
   if(phase==='cancel')this.remove(actorId);
   else if(phase==='resolve'&&old.resolvedAt===null&&Number.isFinite(event.resolvedAt)&&event.resolvedAt>=old.startedAt){old.resolvedAt=event.resolvedAt;old.hit=event.hit===true;if(descriptor.blade.attach==='line'){old.lineOrigin={...(event.attackOrigin??old.lineOrigin)};old.lineTarget={...(event.attackTarget??old.lineTarget)};}if(event.target)old.contactTarget={x:event.target.x,y:event.target.y};}
  }
 }
 handleStaged(event,descriptor,old){
  const {actorId,actionId,phase}=event;
  if(phase==='start'){
   if(!Number.isFinite(event.startedAt)||old?.actionId===actionId||old&&event.startedAt<old.startedAt)return;
   const origin=event.attackOrigin??event.origin,target=event.attackTarget??event.target??origin;if(!origin||!target)return;
   this.active.delete(actorId);while(this.active.size>=64)this.active.delete(this.active.keys().next().value);
   this.active.set(actorId,{actionId,descriptor,startedAt:event.startedAt,flipX:target.x<origin.x,stageIndex:-1,segmentAt:event.startedAt,resolvedAt:null,settled:new Set()});
  }else if(old?.actionId===actionId){
   if(phase==='cancel'||phase==='end')this.remove(actorId);
   else if(phase==='segment'&&Number.isInteger(event.hitIndex)&&event.hitIndex>=0&&event.hitIndex<descriptor.stages.length&&Number.isFinite(event.eventAt)&&event.eventAt>=old.segmentAt&&event.hitIndex>old.stageIndex){old.stageIndex=event.hitIndex;old.segmentAt=event.eventAt;if(Math.abs(event.direction?.x??0)>1e-9)old.flipX=event.direction.x<0;}
   else if(phase==='resolve'&&Number.isInteger(event.hitIndex)&&event.hitIndex>=0&&event.hitIndex<descriptor.stages.length)old.settled.add(event.hitIndex);
  }
 }
 sampleStaged(ownerId,r,now){
  const d=r.descriptor,elapsed=Math.max(0,now-r.startedAt)*1000;
  if(elapsed+1e-7>=d.durationMs){this.remove(ownerId);return null;}
  const recovering=elapsed+1e-7>=d.recoveryStartMs,stage=r.stageIndex>=0?d.stages[r.stageIndex]:null;
  return {kind:'staged',actionId:r.actionId,descriptor:d,frameIndex:recovering?d.phaseFrames[4]:r.stageIndex<0?d.phaseFrames[0]:d.phaseFrames[r.stageIndex+1],stageIndex:recovering?-1:r.stageIndex,flipX:r.flipX,bladeOpacity:!recovering&&stage&&elapsed+1e-7>=stage.startMs&&elapsed<stage.endMs?(stage.blade.opacity??1):0,contactOpacity:0};
 }
 sample(ownerId,now,reducedMotion=false){
  const r=this.active.get(ownerId);if(!r||!Number.isFinite(now))return null;
  if(r.descriptor.kind==='staged')return this.sampleStaged(ownerId,r,now);
  const d=r.descriptor,elapsed=Math.max(0,now-r.startedAt),resolved=r.resolvedAt!==null,after=resolved?Math.max(0,now-r.resolvedAt):0,hold=d.frameDurationsMs[2]/1000,recovery=d.frameDurationsMs[3]/1000;
  if(resolved&&after+1e-9>=(reducedMotion?hold:hold+recovery)){this.remove(ownerId);return null;}
  const frameIndex=resolved?(after+1e-9<hold?2:3):reducedMotion||elapsed+1e-9<d.frameDurationsMs[0]/1000?0:1;
  const fade=resolved?Math.max(0,1-after/hold):0;
  return {actionId:r.actionId,descriptor:d,frameIndex,flipX:r.flipX,...(r.sourceOrigin?{sourceOrigin:{...r.sourceOrigin}}:{}),...(r.lineTarget?{lineOrigin:{...r.lineOrigin},lineTarget:{...r.lineTarget}}:{}),anticipationOpacity:d.anticipation&&!resolved?(reducedMotion?.45:frameIndex===0?.45:.85):0,bladeOpacity:d.blade.attach==='line'?(resolved?reducedMotion?.65:fade:0):d.kind==='area-observed'&&!resolved?0:d.blade.holdAfterResolveMs?(resolved?releasedBladeOpacity(d,after,reducedMotion):d.blade.startMs!==undefined?elapsed+1e-9>=d.blade.startMs/1000?1:0:!reducedMotion&&frameIndex===1?1:0):reducedMotion||frameIndex===0||frameIndex===3?0:resolved?fade:.55,contactOpacity:resolved&&r.hit&&!d.contact.durationMs?fade:0,...(d.contact.attach==='target'&&r.contactTarget?{contactTarget:{...r.contactTarget}}:{})};
 }
 remove(ownerId){this.active.delete(ownerId);}
 clear(){this.active.clear();}
}
