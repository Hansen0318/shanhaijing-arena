// Observations only. No actors, combat actions, clocks or effects may be mutated here.
export class UtilityPlayback{
 constructor(){this.gestures=new Map();this.activations=new Map();this.seen=new Set();this.latest=new Map();this.epoch=0;}
 resetEpoch(epoch){if(Number.isInteger(epoch)&&epoch>this.epoch){this.clear();this.epoch=epoch;}}
 staleStart(event,now){const previous=this.latest.get(event.actorId),time=event.eventAt??now;return (event.presentationEpoch??0)<this.epoch||Number.isFinite(event.eventSequence)&&previous&&(time<previous.time||time===previous.time&&event.eventSequence<=previous.sequence);}
 observe(event,descriptor,now,flipX=false){
  if((event.presentationEpoch??0)<this.epoch)return false;
  this.resetEpoch(event.presentationEpoch);
  const time=event.eventAt??now,sequence=event.eventSequence??(Number(event.presentationId?.split('.').at(-1))||0),previous=this.latest.get(event.actorId);
  if(!Number.isFinite(time)||time<0||previous&&(time<previous.time||time===previous.time&&sequence<=previous.sequence))return false;
  if(descriptor?.kind!=='utility'){
   if(event.phase!=='cancel'&&event.phase!=='end'){this.gestures.delete(event.actorId);this.latest.set(event.actorId,{time,sequence});}return false;
  }
  const id=event.actorId+'.'+event.presentationId;
  if(event.phase||!event.presentationId||event.hit!==true||!Number.isFinite(event.eventAt)||this.seen.has(id))return false;
  this.seen.add(id);while(this.seen.size>512)this.seen.delete(this.seen.values().next().value);this.latest.set(event.actorId,{time,sequence});
  const r={id,actorId:event.actorId,descriptor,startedAt:time,flipX};
  this.gestures.set(event.actorId,r);this.activations.set(id,r);while(this.activations.size>64)this.activations.delete(this.activations.keys().next().value);return true;
 }
 cancelGesture(id){this.gestures.delete(id);}
 sample(id,now,reduced=false){
  const r=this.gestures.get(id);if(!r)return null;
  const ms=(now-r.startedAt)*1000,d=r.descriptor,limit=reduced?d.reducedGestureMs:d.frameDurationsMs.reduce((a,b)=>a+b,0);
  if(ms<0)return null;if(ms+1e-7>=limit){this.gestures.delete(id);return null;}
  let frame=d.animation.staticFrame;if(!reduced){let end=0;frame=d.frameDurationsMs.findIndex(n=>(end+=n)>ms+1e-7);}
  return {kind:'utility',actionId:r.id,descriptor:d,frameIndex:frame,flipX:r.flipX};
 }
 update(now,alive){
  for(const [id,r] of this.activations)if(!alive.has(r.actorId)||(now-r.startedAt)*1000+1e-7>=r.descriptor.activation.durationMs)this.activations.delete(id);
  for(const id of this.gestures.keys())if(!alive.has(id))this.gestures.delete(id);
  for(const id of this.latest.keys())if(!alive.has(id))this.latest.delete(id);
  return [...this.activations.values()].filter(r=>now>=r.startedAt);
 }
 clear(){this.gestures.clear();this.activations.clear();this.seen.clear();this.latest.clear();}
}
