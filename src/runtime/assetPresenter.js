import {battleAssetCache} from './assetCache.js';
import {resolveCharacterAsset} from '../assets/resolver.js';
import {characterAnimation,characterAction,characterVfx,grayboxAnimation} from '../assets/battleDescriptors.js';
import {ActionPlayback,releasedBladeOpacity} from '../assets/actionPlayback.js';
import {VisualPlayback,animationFrame} from '../assets/playback.js';
import {animationDescriptor,vfxDescriptor} from '../assets/descriptors.js';
import {AssetResidency} from './assetResidency.js';
let nextPresenter=0;
// This adapter has no ability execution, mutable actor or persistence capability.
export class AssetPresenter{
 constructor(scene,{cache=battleAssetCache,project=p=>p,reducedMotion=false,residencyOptions={}}={}){
  this.scene=scene;this.cache=cache;this.project=project;this.reducedMotion=reducedMotion;this.prefix=`visual.${++nextPresenter}.`;this.closed=false;this.ready=false;this.optionalLoads=new Map();this.optionalFailures=new Set();
  this.displays=new Map();this.displayKinds=new Map();this.displayTextureKeys=new Map();this.actorSprites=new Map();this.actorTextureKeys=new Map();this.overlaySprites=new Map();this.overlayTextureKeys=new Map();this.hudSprites=new Map();this.states=new Map();this.facings=new Map();this.actionFacings=new Map();this.playback=new VisualPlayback();
  this.residency=new AssetResidency(scene,{...residencyOptions,cache,prefix:this.prefix,onEvict:key=>this.clearOptionalDisplays(key)});this.textures=this.residency.textures;
  this.actions=new ActionPlayback();this.actionEffects=new Map();this.pendingImpactViews=new Map();this.bladeAfterglows=new Map();this.stagedImpacts=new Map();this.stagedImpactSprites=new Map();this.stagedEventKeys=new Map();this.presentationEventKeys=new Set();
 }
 get textureBytes(){return this.residency.bytes;}
 async loadKeys(keys){return Promise.all([...new Set(keys)].map(key=>this.residency.load(key)));}
 clearOptionalDisplays(key){for(const [map,sources] of [[this.displays,this.displayTextureKeys],[this.overlaySprites,this.overlayTextureKeys]])for(const [id,source] of sources)if(source===key){map.get(id)?.destroy();map.delete(id);sources.delete(id);this.displayKinds.delete(id);}}
 demand(keys){for(const key of new Set(keys.filter(Boolean))){if(this.closed||this.textures.has(key)||this.optionalLoads.has(key)||this.optionalFailures.has(key)||this.residency.record(key).type!=='image')continue;const task=this.residency.load(key,{required:false}).catch(()=>{this.optionalFailures.add(key);}).finally(()=>this.optionalLoads.delete(key));this.optionalLoads.set(key,task);}}
 whenIdle(){return Promise.all([...this.optionalLoads.values()]);}
 async prepare(definitions,stage={},abilities={},onCriticalReady=null){
  this.ready=false;
  // Required descriptors must fail explicitly; transient rendering may fallback.
  for(const d of definitions)for(const state of ['battleIdle','battleMove','battleKo'])if(d.animationDescriptors?.[state])animationDescriptor(d.animationDescriptors[state]);
  this.stageAssetKey=stage.battleAssetKey??null;
  // Critical first-paint textures must not queue behind large Move/KO/VFX atlases.
  // The shared cache processes only two image requests concurrently, so staging
  // priorities here benefits every roster character and preserves cache budgets.
  const portraits=definitions.map(d=>d.assets?.portraitSquare??resolveCharacterAsset(d,'portraitSquare').key);
  const idles=definitions.map(d=>d.animationDescriptors?.battleIdle?.source??d.assets?.battleIdle??characterAnimation(d,'battleIdle').source);
  const critical=[...new Set([...portraits,...idles])];
  const actionKeys=definitions.flatMap(d=>Object.keys(d.actionDescriptors??{}).flatMap(category=>{const a=characterAction(d,category);return a.kind==='staged'?[a.animation.source,...a.stages.flatMap(s=>[s.blade.assetKey,s.contact.assetKey])]:[a.animation.source,a.blade.assetKey,a.contact.assetKey];}));
  const required=[...new Set([...critical,...definitions.flatMap(d=>['battleMove','battleKo'].map(state=>d.animationDescriptors?.[state]?.source??d.assets?.[state]).filter(Boolean)),...actionKeys])];
  this.residency.setPins('encounter',required);
  await this.loadKeys(critical);if(this.closed)return;
  onCriticalReady?.();
  await this.loadKeys(required.filter(key=>!critical.includes(key)));if(this.closed)return;
  this.ready=true;
  this.residency.setPins('stage',this.stageAssetKey?[this.stageAssetKey]:[]);this.demand([this.stageAssetKey]);
 }
 setState(ownerId,descriptor,now,state){this.states.set(ownerId,{descriptor,start:now,state});}
 cast(event,character,now,ability=null){
  if(this.closed)return;
  if(event.phase){
   const action=characterAction(character,event.category);
   if(action){
    if(action.kind==='staged'){this.castStaged(event,action);return;}
    if(event.presentationOnly){
     const key=event.actorId+'.'+event.actionId+'.'+event.phase;
     if(this.presentationEventKeys.has(key))return;
     this.presentationEventKeys.add(key);while(this.presentationEventKeys.size>512)this.presentationEventKeys.delete(this.presentationEventKeys.values().next().value);
     // Simulation may legally run another action during an existing telegraph.
     // A real later resolve owns its F3 cue without replaying anticipation or HP.
     if(event.phase==='resolve'&&this.actions.active.get(event.actorId)?.actionId!==event.actionId)this.actions.handle({...event,phase:'start',startedAt:event.resolvedAt},action);
    }
    const old=this.actions.active.get(event.actorId),beforeResolvedAt=old?.resolvedAt;
    this.actions.handle(event,action);
    const current=this.actions.active.get(event.actorId);
    if(event.phase==='resolve'&&beforeResolvedAt===null&&current?.actionId===event.actionId&&current.resolvedAt!==null){
     // Multiple simulation steps may resolve one action then start another
     // before the next paint. Keep the last real impact for one visible frame,
     // or its original authored hold when that action opts into retention;
     // never postpone simulation, input, cooldown or HP to fit the presentation.
     const sample=this.actions.sample(event.actorId,current.resolvedAt,this.reducedMotion);
     if(sample&&action.blade.holdAfterResolveMs){
      this.clearBladeAfterglow(event.actorId);
      while(this.bladeAfterglows.size>=64)this.clearBladeAfterglow(this.bladeAfterglows.keys().next().value);
      this.bladeAfterglows.set(event.actorId,{sample,resolvedAt:current.resolvedAt,image:null});
     }
     // Opt-in confirmed contacts own their lifetime; never hold the body in F3.
     if(sample&&event.hit===true&&action.contact.durationMs&&sample.contactTarget){
      const key=event.actorId+'.'+event.actionId+'.independent';
      while(this.stagedImpacts.size>=192)this.removeStagedImpact(this.stagedImpacts.keys().next().value);
      this.stagedImpacts.set(key,{independent:true,actionId:event.actionId,ownerId:event.actorId,targetId:event.targetId??null,hitIndex:0,descriptor:action,eventAt:current.resolvedAt,target:{...sample.contactTarget},flipX:sample.flipX,paintedAt:null});
     }
     if(sample&&event.hit===true&&!action.contact.durationMs){while(this.pendingImpactViews.size>=64&&!this.pendingImpactViews.has(event.actorId))this.pendingImpactViews.delete(this.pendingImpactViews.keys().next().value);this.pendingImpactViews.set(event.actorId,{sample,resolvedAt:current.resolvedAt,paintedAt:null,displaySample:null});}
    }
    if(event.phase==='cancel'&&old?.actionId===event.actionId){if(this.bladeAfterglows.get(event.actorId)?.sample.actionId===event.actionId)this.clearBladeAfterglow(event.actorId);this.clearAction(event.actorId,{preserveImpact:this.pendingImpactViews.get(event.actorId)?.sample.descriptor.contact.retainOnNextCast===true});}
   }
   return;
  }
  if(this.actions.active.has(event.actorId)){this.clearAction(event.actorId,{preserveIndependent:true,preserveImpact:this.pendingImpactViews.get(event.actorId)?.sample.descriptor.contact.retainOnNextCast===true});this.states.delete(event.actorId);}
  const descriptor=characterVfx(character,event.category,ability);
  const target=event.target??event.origin,dx=target.x-event.origin.x,dy=target.y-event.origin.y,len=Math.hypot(dx,dy)||1;
  this.playback.play(event.actorId,descriptor,event.origin,now,{targetId:event.targetId??null,target,direction:{x:dx/len,y:dy/len}});
  // Presentation facing follows the actual attack/cast direction for the action window.
  if(Math.abs(dx)>1e-6)this.actionFacings.set(event.actorId,{flipX:dx<0,until:now+descriptor.duration});
  const overlay=character?.assets?.skillOverlays?.[event.category];if(overlay)try{this.playback.play(event.actorId,vfxDescriptor({form:'sprite',assetKey:overlay,duration:descriptor.duration}),event.origin,now,{target});}catch{/* optional invalid art falls back to existing cast */}
  if(character?.animationDescriptors?.battleCast)this.setState(event.actorId,characterAnimation(character,'battleCast'),now,'battleCast');
  this.syncEffectPins();
 }
 castStaged(event,descriptor){
  const before=this.actions.active.get(event.actorId);
  this.actions.handle(event,descriptor);
  const current=this.actions.active.get(event.actorId);
  if(event.phase==='start'&&current?.actionId===event.actionId&&before?.actionId!==event.actionId){
   // A new action releases its predecessor's source/body, never confirmed contacts.
   const retained=this.pendingImpactViews.get(event.actorId);
   if(retained?.sample.descriptor.contact.retainOnNextCast&&retained.sample.contactTarget){
    const sample=retained.sample,key=event.actorId+'.'+sample.actionId+'.legacy';
    while(this.stagedImpacts.size>=192)this.removeStagedImpact(this.stagedImpacts.keys().next().value);
    this.stagedImpacts.set(key,{actionId:sample.actionId,ownerId:event.actorId,targetId:null,hitIndex:0,descriptor:sample.descriptor,eventAt:retained.resolvedAt,target:{...sample.contactTarget},flipX:sample.flipX,paintedAt:retained.paintedAt,opacity:sample.contactOpacity});
   }
   this.pendingImpactViews.delete(event.actorId);this.clearBladeAfterglow(event.actorId);
   this.clearActionEffects(event.actorId);this.states.delete(event.actorId);
  }
  if(event.phase==='segment'&&current?.actionId===event.actionId&&current.stageIndex===event.hitIndex){
   const old=this.facings.get(event.actorId);if(old&&Math.abs(event.direction?.x??0)>1e-9)old.flipX=event.direction.x<0;
   this.actionFacings.set(event.actorId,{flipX:current.flipX,until:current.startedAt+descriptor.durationMs/1000});
  }
  if(event.phase==='resolve'&&current?.actionId===event.actionId&&event.hit===true&&Number.isInteger(event.hitIndex)&&descriptor.stages[event.hitIndex]&&Number.isFinite(event.eventAt)&&event.eventAt>=current.startedAt){
   const id=event.actionId+'.'+event.hitIndex,key=event.actorId+'.'+id;
   if(this.stagedEventKeys.has(key))return;
   this.stagedEventKeys.set(key,event.eventAt);while(this.stagedEventKeys.size>512)this.stagedEventKeys.delete(this.stagedEventKeys.keys().next().value);
   while(this.stagedImpacts.size>=192)this.removeStagedImpact(this.stagedImpacts.keys().next().value);
   const target=event.target??event.attackTarget;
   if(target)this.stagedImpacts.set(key,{actionId:event.actionId,ownerId:event.actorId,targetId:event.targetId??null,hitIndex:event.hitIndex,descriptor,eventAt:event.eventAt,target:{x:target.x,y:target.y},flipX:Math.abs(event.direction?.x??0)>1e-9?event.direction.x<0:current.flipX,paintedAt:null});
  }
  if((event.phase==='end'||event.phase==='cancel')&&before?.actionId===event.actionId){
   this.clearActionEffects(event.actorId);this.states.delete(event.actorId);
   if(event.phase==='cancel'){this.clearStagedImpacts(event.actorId);this.actionFacings.delete(event.actorId);}
  }
 }
 removeStagedImpact(key){this.stagedImpactSprites.get(key)?.destroy();this.stagedImpactSprites.delete(key);this.stagedImpacts.delete(key);}
 clearStagedImpacts(ownerId,{preserveIndependent=false}={}){for(const [key,r] of this.stagedImpacts)if(r.ownerId===ownerId&&!(preserveIndependent&&r.independent))this.removeStagedImpact(key);}
 renderStagedImpacts(alive,positions,now){
  for(const [key,r] of this.stagedImpacts){
   const stage=r.descriptor.kind==='staged'?r.descriptor.stages[r.hitIndex]:{contact:r.descriptor.contact,contactHoldMs:r.descriptor.contact.durationMs??r.descriptor.frameDurationsMs[2]},hold=stage.contactHoldMs/1000,age=now-r.eventAt;
   if(!alive.has(r.ownerId)||r.targetId&&!r.independent&&!alive.has(r.targetId)||r.paintedAt!==null&&r.paintedAt!==now&&age+1e-9>=hold){this.removeStagedImpact(key);continue;}
   if(age<0)continue;
   const spec=stage.contact,d=r.descriptor,frame=d.animation.frames[0],width=72*d.animation.scale*frame.width/Math.max(frame.width,frame.height),height=72*d.animation.scale*frame.height/Math.max(frame.width,frame.height),sx=width/d.coordinateSize[0],sy=height/d.coordinateSize[1];
   let image=this.stagedImpactSprites.get(key);
   if(!image){const texture=this.textures.get(spec.assetKey);if(!texture)throw Error('Required staged contact unavailable: '+spec.assetKey);image=this.scene.add.image(0,0,texture.key);this.stagedImpactSprites.set(key,image);}
   const anchor=r.targetId?positions.get(r.targetId)??this.project(r.target):this.project(r.target),x=spec.offset[0]+spec.size[0]/2,y=spec.offset[1]+spec.size[1]/2;
   // Event time controls normal expiry. A late first paint retains one confirmed cue;
   // the next distinct paint expires it, so stalls do not replay HP or extend lifetime.
   if(r.paintedAt!==now)r.opacity=r.paintedAt===null&&age>=hold?1:this.reducedMotion&&(d.kind==='staged'||r.independent)?1:Math.max(0,1-age/hold);
   image.actionId=r.actionId;image.hitIndex=r.hitIndex;image.eventAt=r.eventAt;
   image.setOrigin(.5,.5).setDisplaySize(spec.size[0]*sx,spec.size[1]*sy).setPosition(anchor.x+(r.flipX?-x:x)*sx,anchor.y+y*sy).setFlipX(r.flipX).setDepth(spec.layer).setAlpha(r.opacity).setVisible(true);r.paintedAt=now;
  }
 }
 hit(event,character,now){if(!this.closed){this.setState(event.targetId,characterAnimation(character,'battleHit'),now,'battleHit');this.syncEffectPins();}}
 syncEffectPins(){const keys=[...this.playback.active.values()].flatMap(r=>[r.descriptor.assetKey,r.descriptor.animation?.source]);for(const state of this.states.values())if(['battleHit','battleCast'].includes(state.state))keys.push(state.descriptor.source);this.residency.setPins('effects',keys.filter(Boolean));this.demand(keys);}
 async inspect(ownerId,character,slot,now){
  if(slot==='none'||this.closed)return;
  if(slot.endsWith('Vfx'))this.playback.play(ownerId,characterVfx(character,slot.slice(0,-3)),{x:0,y:0},now);
  else {const descriptor=slot==='battleIdle'?(character?.animationDescriptors?.battleIdle?characterAnimation(character,'battleIdle'):grayboxAnimation):animationDescriptor({source:resolveCharacterAsset(character,slot).key,duration:1});this.residency.setPins('inspection',[descriptor.source]);await this.loadKeys([descriptor.source]);if(!this.closed)this.setState(ownerId,descriptor,now,'inspection');}
 }
 clearActionEffects(ownerId){const effects=this.actionEffects.get(ownerId);if(effects)for(const image of effects.values())image.destroy();this.actionEffects.delete(ownerId);}
 clearAction(ownerId,{preserveImpact=false,preserveIndependent=false}={}){this.actions.remove(ownerId);this.clearStagedImpacts(ownerId,{preserveIndependent});if(!preserveImpact)this.pendingImpactViews.delete(ownerId);this.clearActionEffects(ownerId);}
 clearBladeAfterglow(ownerId){this.bladeAfterglows.get(ownerId)?.image?.destroy();this.bladeAfterglows.delete(ownerId);}
 renderBladeAfterglows(alive,positions,now){
  for(const [id,record] of this.bladeAfterglows){
   const {sample,resolvedAt}=record,d=sample.descriptor,spec=d.blade;
   const opacity=releasedBladeOpacity(d,now-resolvedAt,this.reducedMotion);
   if(!alive.has(id)||opacity<=0){this.clearBladeAfterglow(id);continue;}
   // Reuse the live action's sweep when present; never draw it twice.
   const live=this.actionEffects.get(id)?.get('blade');
   if(live?.actionId===sample.actionId&&live.visible&&live.alpha>0){record.image?.destroy();record.image=null;continue;}
   if(!record.image){const texture=this.textures.get(spec.assetKey);if(!texture)throw Error('Required blade texture unavailable: '+spec.assetKey);record.image=this.scene.add.image(0,0,texture.key);}
   const [cw,ch]=d.coordinateSize,w=d.animation.frames[0].width,h=d.animation.frames[0].height;
   const sx=72*d.animation.scale*w/Math.max(w,h)/cw,sy=72*d.animation.scale*h/Math.max(w,h)/ch,pos=positions.get(id);
   const x=spec.offset[0]+spec.size[0]/2-d.animation.origin[0]*cw,y=spec.offset[1]+spec.size[1]/2-d.animation.origin[1]*ch;
   record.image.setOrigin(.5,.5).setDisplaySize(spec.size[0]*sx,spec.size[1]*sy).setFlipX(sample.flipX).setPosition(pos.x+(sample.flipX?-x:x)*sx,pos.y+y*sy).setDepth(spec.layer).setAlpha(opacity).setVisible(true);
  }
 }
 renderActionEffects(ownerId,sample,position,displaySize){
  let effects=this.actionEffects.get(ownerId);
  if(effects&&[...effects.values()].some(image=>image.actionId!==sample.actionId)){this.clearActionEffects(ownerId);effects=null;}
  if(!effects){effects=new Map();this.actionEffects.set(ownerId,effects);}
  const descriptor=sample.descriptor,d=descriptor.kind==='staged'?{...descriptor,...descriptor.stages[Math.max(0,sample.stageIndex)]}:descriptor,[cw,ch]=d.coordinateSize,sx=displaySize.width/cw,sy=displaySize.height/ch;
  for(const kind of ['blade','contact']){const spec=d[kind],opacity=sample[kind+'Opacity'];let image=effects.get(kind);
   if(opacity>0&&!image){const texture=this.textures.get(spec.assetKey);if(!texture)throw Error('Required action texture unavailable: '+spec.assetKey);image=this.scene.add.image(0,0,texture.key);effects.set(kind,image);}
   if(!image)continue;if(opacity>0){const texture=this.textures.get(spec.assetKey);if(!texture)throw Error('Required action texture unavailable: '+spec.assetKey);if(image.texture!==texture.key)image.setTexture(texture.key);}
   const targetAttached=spec.attach==='target'&&sample.contactTarget;
   const anchor=targetAttached?this.project(sample.contactTarget):position;
   const x=spec.offset[0]+spec.size[0]/2-(targetAttached?0:d.animation.origin[0]*cw),y=spec.offset[1]+spec.size[1]/2-(targetAttached?0:d.animation.origin[1]*ch);
   image.actionId=sample.actionId;image.setOrigin(.5,.5).setDisplaySize(spec.size[0]*sx,spec.size[1]*sy).setFlipX(sample.flipX).setPosition(anchor.x+(sample.flipX?-x:x)*sx,anchor.y+y*sy).setDepth(spec.layer).setAlpha(opacity).setVisible(opacity>0);
  }
 }
 imageFor(ownerId,descriptor,elapsed,map=this.actorSprites,playbackMode='decorative',frameIndex=null){
  const texture=this.textures.get(descriptor.source);if(!texture)return null;
  const projection=animationFrame(descriptor,elapsed,this.reducedMotion,playbackMode),region=texture.asset.key===descriptor.source?(frameIndex===null?projection.region:descriptor.frames[frameIndex]):null;const frame=region?`${region.x}.${region.y}.${region.width}.${region.height}`:undefined;
  if(region){const t=this.scene.textures?.get(texture.key);if(!t?.has?.(frame)){const added=t?.add(frame,0,region.x,region.y,region.width,region.height);if(region.trim)added.setTrim(...region.trim,region.width,region.height);}}
  let sprite=map.get(ownerId);if(!sprite){sprite=this.scene.add.image(0,0,texture.key,frame);map.set(ownerId,sprite);}else sprite.setTexture(texture.key,frame);
  // A state change may start another upload before the next render. Keep the
  // old displayed actor texture pinned until setTexture actually releases it.
  if(map===this.actorSprites){this.actorTextureKeys.set(ownerId,descriptor.source);this.residency.setPins('actor-displays',this.actorTextureKeys.values());}
  sprite.setOrigin(...descriptor.origin).setScale(descriptor.scale).setVisible(true);return sprite;
 }
 renderHud(views,definitions,session){
  if(this.closed||!views)return;
  for(const [id,view] of views){const actor=session.actorById(id),key=resolveCharacterAsset(definitions[actor.definitionId],'portraitSquare').key,texture=this.textures.get(key);if(!texture)continue;
   let image=this.hudSprites.get(id);if(!image){image=this.scene.add.image(0,view.layout.backingY,texture.key);view.card.addAt(image,2);this.hudSprites.set(id,image);}
   // Compact portrait cards are face-first: head/face + a little neck, with peripheral horn/ear crop allowed.
   const sourceW=texture.asset.width??1,sourceH=texture.asset.height??1,cropW=Math.max(1,Math.round(sourceW*.82)),cropH=Math.max(1,Math.round(sourceH*.82));
   const cropX=Math.round((sourceW-cropW)/2),cropY=Math.round((sourceH-cropH)*.35);
   image.setCrop?.(cropX,cropY,cropW,cropH);
   // Phaser crop masks pixels without resizing: fit the visible region, centered in the card.
   image.setOrigin?.((cropX+cropW/2)/sourceW,(cropY+cropH/2)/sourceH);
   image.setDisplaySize(view.layout.portraitSize*sourceW/cropW,view.layout.portraitSize*sourceH/cropH).setFlipX(view.side==='enemy');
  }
 }
 renderOverlays(frame,definitions,statuses,now){
  if(this.closed)return;const valid=new Set(),keys=[];for(const actor of [...frame.allies,...frame.enemies]){if(actor.hp<=0)continue;const character=definitions[actor.definitionId];
   for(const status of statuses.forActor(actor.instanceId,now)){const key=character?.assets?.statusOverlays?.[status.type];if(key)keys.push(key);const texture=this.textures.get(key);if(!texture)continue;const id=actor.instanceId+'.'+status.type;valid.add(id);let image=this.overlaySprites.get(id);if(!image){image=this.scene.add.image(0,0,texture.key);this.overlaySprites.set(id,image);this.overlayTextureKeys.set(id,key);}const p=this.project(actor);image.setPosition(p.x,p.y).setDepth(7).setDisplaySize(56,56);}
  }for(const [id,image] of this.overlaySprites)if(!valid.has(id)){image.destroy();this.overlaySprites.delete(id);this.overlayTextureKeys.delete(id);}this.residency.setPins('overlays',keys);this.demand(keys);
 }
 render(frame,now,definitions){
  if(this.closed)return;const actors=[...frame.allies,...frame.enemies],alive=new Set(actors.filter(a=>a.hp>0).map(a=>a.instanceId)),positions=new Map(actors.map(a=>[a.instanceId,this.project(a)]));
  const stage=this.textures.get(this.stageAssetKey);if(stage&&!this.stageDisplay)this.stageDisplay=this.scene.add.image(0,0,stage.key).setOrigin(0,0).setDisplaySize(1120,540).setDepth(1);
  for(const actor of actors){const id=actor.instanceId,character=definitions[actor.definitionId];let state=this.states.get(id);
   const hadAction=this.actions.active.has(id);if(actor.hp<=0)this.clearAction(id);
   let action=actor.hp>0?this.actions.sample(id,now,this.reducedMotion):null;
   const impact=this.pendingImpactViews.get(id);
   if(impact){
    const hold=impact.sample.descriptor.frameDurationsMs[2]/1000,retain=impact.sample.descriptor.contact.retainOnNextCast===true;
    const expired=!retain||now-impact.resolvedAt+1e-9>=hold;
    if(impact.paintedAt!==null&&impact.paintedAt!==now&&expired)this.pendingImpactViews.delete(id);
    else {
     // Confirmed opted-in impacts keep their original display window even if
     // an automatic next cast replaces the live action before this paint.
     // A late first paint still gets one frame; repeated Pause paints freeze.
     if(impact.paintedAt===null)impact.displaySample=impact.sample;
     else if(impact.paintedAt!==now){const fade=Math.max(0,1-(now-impact.resolvedAt)/hold);impact.displaySample={...impact.sample,bladeOpacity:impact.sample.descriptor.blade.holdAfterResolveMs?releasedBladeOpacity(impact.sample.descriptor,now-impact.resolvedAt,this.reducedMotion):impact.sample.bladeOpacity*fade,contactOpacity:impact.sample.contactOpacity*fade};}
     impact.paintedAt=now;action=impact.displaySample;
    }
   }
   if((hadAction||this.actionEffects.has(id))&&!action&&actor.hp>0){this.clearAction(id,{preserveIndependent:true});this.states.delete(id);state=undefined;}
   const previous=this.facings.get(id),dx=previous?actor.x-previous.x:0,dy=previous?actor.y-previous.y:0,actionFacing=this.actionFacings.get(id);
   if(actionFacing && now>actionFacing.until)this.actionFacings.delete(id);
   // Facing priority: current attack/cast direction > movement direction > last facing/default team direction.
   const activeAction=this.actionFacings.get(id);
   const flipX=action?action.flipX:activeAction?activeAction.flipX:dx>1e-6?false:dx< -1e-6?true:previous?.flipX??frame.enemies.includes(actor);
   // Derive presentation-only motion from copied authoritative XY snapshots.
   // Duplicate simulation time (Pause/countdown/sub-step render) must not reset a stride.
   const displaced=Math.hypot(dx,dy)>1e-6;
   const moving=actor.hp>0&&Boolean(previous)&&(displaced||now===previous.now&&previous.moving);
   this.facings.set(id,{x:actor.x,y:actor.y,now,moving,flipX});
   const idle=characterAnimation(character,'battleIdle');
   const move=character?.animationDescriptors?.battleMove?characterAnimation(character,'battleMove'):null;
   const baseState=moving&&move&&this.textures.has(move.source)?'battleMove':'battleIdle';
   const base=baseState==='battleMove'?move:idle;
   if(actor.hp<=0&&state?.state!=='battleKo'){this.setState(id,characterAnimation(character,'battleKo'),now,'battleKo');state=this.states.get(id);}
   else if(!state||actor.hp>0&&state.state!=='inspection'&&(
    ['battleIdle','battleMove'].includes(state.state)?state.state!==baseState:animationFrame(state.descriptor,now-state.start).finished
   )){this.setState(id,base,now,baseState);state=this.states.get(id);}
   // Missing optional transient art must not freeze a living authored Idle on F1.
   // Living Hit/Cast fallback keeps the Idle loop moving; KO fallback remains static.
   const formalState=this.textures.has(state.descriptor.source);
   const descriptor=action?.descriptor.animation??(formalState?state.descriptor:actor.hp>0?base:idle),elapsed=formalState?now-state.start:actor.hp>0?now:0;
   const resolvedState=formalState?state.state:actor.hp>0?baseState:'battleIdle';
   const playbackMode=resolvedState==='battleMove'?'locomotion':'decorative';
   const image=this.imageFor(id,descriptor,elapsed,this.actorSprites,playbackMode,action?.frameIndex??null);
   if(image){const pos=positions.get(id),asset=this.textures.get(descriptor.source).asset,region=asset.key===descriptor.source?(action?descriptor.frames[action.frameIndex]:animationFrame(descriptor,elapsed,this.reducedMotion,playbackMode).region):null,w=region?.trim?.[0]??region?.width??asset.width,h=region?.trim?.[1]??region?.height??asset.height,width=72*descriptor.scale*w/Math.max(w,h),height=72*descriptor.scale*h/Math.max(w,h);image.setOrigin(action&&flipX?1-descriptor.origin[0]:descriptor.origin[0],descriptor.origin[1]).setDisplaySize(width,height).setFlipX(flipX).setPosition(pos.x,pos.y).setDepth(5).setAlpha(actor.hp>0?1:.35);if(action)this.renderActionEffects(id,action,pos,{width,height});}
   else this.actorSprites.get(id)?.setVisible(false); // Arena's procedural marker remains visible.
  }
  this.renderBladeAfterglows(alive,positions,now);
  this.renderStagedImpacts(alive,positions,now);
  const records=this.playback.update(now,alive),ids=new Set(records.map(r=>r.id));
  for(const [id,display] of this.displays)if(!ids.has(id)){display.destroy();this.displays.delete(id);this.displayKinds.delete(id);this.displayTextureKeys.delete(id);}
  this.syncEffectPins();
  for(const r of records){
   const d=r.descriptor,elapsed=now-r.start,progress=this.reducedMotion?0:Math.min(1,elapsed/d.duration),source=positions.get(r.ownerId)??this.project(r.position),target=r.targetId?positions.get(r.targetId):r.target?this.project(r.target):source;
   const anchor=d.attach==='target'?target:d.attach==='fixed'?this.project(r.position):source;
   let display=this.displays.get(r.id);const texture=this.textures.get(d.animation?.source??d.assetKey);
   const kind=texture?'image':'graphics';if(display&&this.displayKinds.get(r.id)!==kind){display.destroy();this.displays.delete(r.id);display=null;}
   if(texture)this.displayTextureKeys.set(r.id,d.animation?.source??d.assetKey);else this.displayTextureKeys.delete(r.id);
   if(!display){display=texture?this.scene.add.image(0,0,texture.key):this.scene.add.graphics();this.displays.set(r.id,display);this.displayKinds.set(r.id,kind);}
   display.setPosition(anchor.x,anchor.y).setDepth(d.layer).setAlpha(1-progress).setScale(d.scale);
   const angle=d.rotation==='facing'?Math.atan2(target.y-source.y,target.x-source.x):0;
   if(texture){display.setRotation(angle).setOrigin(...d.origin);if(d.animation){const proxy=new Map([[r.id,display]]);this.imageFor(r.id,d.animation,elapsed,proxy);}const region=d.animation&&texture.asset.key===d.animation.source?animationFrame(d.animation,elapsed,this.reducedMotion).region:null,w=region?.width??texture.asset.width,h=region?.height??texture.asset.height;display.setDisplaySize(80*d.scale*w/Math.max(w,h),80*d.scale*h/Math.max(w,h));if(d.form==='projectile')display.setPosition(source.x+(target.x-source.x)*progress,source.y+(target.y-source.y)*progress);}
   else {display.clear();const color=0xffe894;display.lineStyle(4,color,.95);
    if(['trail','projectile'].includes(d.form)){display.lineBetween(source.x-anchor.x,source.y-anchor.y,target.x-anchor.x,target.y-anchor.y);if(d.form==='projectile')display.fillStyle(0x6adaff,.9).fillCircle(source.x-anchor.x+(target.x-source.x)*progress,source.y-anchor.y+(target.y-source.y)*progress,8);}
    else if(['ring','persistent-area'].includes(d.form))display.strokeCircle(0,0,43);
    else {display.strokeCircle(0,0,26);for(let i=0;i<8;i++){const a=i*Math.PI/4+angle;display.lineBetween(Math.cos(a)*20,Math.sin(a)*20,Math.cos(a)*48,Math.sin(a)*48);}}
   }
  }
  this.residency.reclaim();
 }
 destroy(){if(this.closed)return;this.closed=true;this.ready=false;this.stageDisplay?.destroy();for(const id of this.actionEffects.keys())this.clearAction(id);this.actions.clear();this.pendingImpactViews.clear();for(const key of this.stagedImpacts.keys())this.removeStagedImpact(key);this.stagedEventKeys.clear();this.presentationEventKeys.clear();for(const id of this.bladeAfterglows.keys())this.clearBladeAfterglow(id);for(const map of [this.displays,this.actorSprites,this.overlaySprites,this.hudSprites]){for(const v of map.values())v.destroy();map.clear();}this.residency.destroy();this.optionalLoads.clear();this.optionalFailures.clear();this.displayKinds.clear();this.displayTextureKeys.clear();this.actorTextureKeys.clear();this.overlayTextureKeys.clear();this.states.clear();this.facings.clear();this.actionFacings.clear();this.playback.clear();}
}
