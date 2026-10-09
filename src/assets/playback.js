export function animationFrame(descriptor,elapsed,reducedMotion=false,playbackMode='decorative'){
 // Locomotion conveys movement state: reduce cadence, never turn it into static sliding.
 // All other callers retain the existing reduced-motion/static fallback by default.
 const locomotion=playbackMode==='locomotion',time=Math.max(0,elapsed)*(reducedMotion&&locomotion?.5:1),count=Math.max(1,descriptor.frames.length);
 const index=reducedMotion&&!locomotion?descriptor.staticFrame:descriptor.loop?Math.floor(time*descriptor.fps)%count:Math.min(count-1,Math.floor(time*descriptor.fps));
 return {index,region:descriptor.frames[index]??null,finished:!descriptor.loop&&time>=descriptor.duration};
}
// Presentation records contain copied geometry; never receive mutable combat actors.
export class VisualPlayback{
 constructor({maxActive=64}={}){this.maxActive=maxActive;this.active=new Map();this.nextId=0;}
 play(ownerId,descriptor,position,now,{targetId=null,target=null,direction={x:1,y:0}}={}){
  if(!position||!Number.isFinite(position.x)||!Number.isFinite(position.y)||!Number.isFinite(now))return null;
  while(this.active.size>=this.maxActive)this.active.delete(this.active.keys().next().value);
  const record={id:++this.nextId,ownerId,targetId,descriptor,position:{x:position.x,y:position.y},target:target?{x:target.x,y:target.y}:null,direction:{...direction},start:now,expiry:now+descriptor.duration};this.active.set(record.id,record);return record;
 }
 update(now,livingIds){for(const [id,r] of this.active)if(now+1e-9>=r.expiry||!livingIds.has(r.ownerId)||r.targetId&&!livingIds.has(r.targetId))this.active.delete(id);return [...this.active.values()];}
 clear(){this.active.clear();}
}
