import {battleAssetCache} from './assetCache.js';
import {resolveCharacterAsset} from '../assets/resolver.js';
import {characterAnimation,characterAction,characterVfx,grayboxAnimation} from '../assets/battleDescriptors.js';
import {ActionPlayback} from '../assets/actionPlayback.js';
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
  this.actions=new ActionPlayback();this.actionEffects=new Map();
 }
 get textureBytes(){return this.residency.bytes;}
 async loadKeys(keys){return Promise.all([...new Set(keys)].map(key=>this.residency.load(key)));}
 clearOptionalDisplays(key){for(const [map,sources] of [[this.displays,this.displayTextureKeys],[this.overlaySprites,this.overlayTextureKeys]])for(const [id,source] of sources)if(source===key){map.get(id)?.destroy();map.delete(id);sources.delete(id);this.displayKinds.delete(id);}}
 demand(keys){for(const key of new Set(keys.filter(Boolean))){if(this.closed||this.textures.has(key)||this.optionalLoads.has(key)||this.optionalFailures.has(key)||this.residency.record(key).type!=='image')continue;const task=this.loadKeys([key]).catch(()=>{this.optionalFailures.add(key);}).finally(()=>this.optionalLoads.delete(key));this.optionalLoads.set(key,task);}}
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
  const actionKeys=definitions.flatMap(d=>Object.keys(d.actionDescriptors??{}).flatMap(category=>{const a=characterAction(d,category);return [a.animation.source,a.blade.assetKey,a.contact.assetKey];}));
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
  if(event.phase){const action=characterAction(character,event.category);if(action){const old=this.actions.active.get(event.actorId);this.actions.handle(event,action);if(event.phase==='cancel'&&old?.actionId===event.actionId)this.clearAction(event.actorId);}return;}
  if(this.actions.active.has(event.actorId)){this.clearAction(event.actorId);this.states.delete(event.actorId);}
  const descriptor=characterVfx(character,event.category,ability);
  const target=event.target??event.origin,dx=target.x-event.origin.x,dy=target.y-event.origin.y,len=Math.hypot(dx,dy)||1;
  this.playback.play(event.actorId,descriptor,event.origin,now,{targetId:event.targetId??null,target,direction:{x:dx/len,y:dy/len}});
  // Presentation facing follows the actual attack/cast direction for the action window.
  if(Math.abs(dx)>1e-6)this.actionFacings.set(event.actorId,{flipX:dx<0,until:now+descriptor.duration});
  const overlay=character?.assets?.skillOverlays?.[event.category];if(overlay)try{this.playback.play(event.actorId,vfxDescriptor({form:'sprite',assetKey:overlay,duration:descriptor.duration}),event.origin,now,{target});}catch{/* optional invalid art falls back to existing cast */}
  if(character?.animationDescriptors?.battleCast)this.setState(event.actorId,characterAnimation(character,'battleCast'),now,'battleCast');
  this.syncEffectPins();
 }
 hit(event,character,now){if(!this.closed){this.setState(event.targetId,characterAnimation(character,'battleHit'),now,'battleHit');this.syncEffectPins();}}
 syncEffectPins(){const keys=[...this.playback.active.values()].flatMap(r=>[r.descriptor.assetKey,r.descriptor.animation?.source]);for(const state of this.states.values())if(['battleHit','battleCast'].includes(state.state))keys.push(state.descriptor.source);this.residency.setPins('effects',keys.filter(Boolean));this.demand(keys);}
 async inspect(ownerId,character,slot,now){
  if(slot==='none'||this.closed)return;
  if(slot.endsWith('Vfx'))this.playback.play(ownerId,characterVfx(character,slot.slice(0,-3)),{x:0,y:0},now);
  else {const descriptor=slot==='battleIdle'?(character?.animationDescriptors?.battleIdle?characterAnimation(character,'battleIdle'):grayboxAnimation):animationDescriptor({source:resolveCharacterAsset(character,slot).key,duration:1});this.residency.setPins('inspection',[descriptor.source]);await this.loadKeys([descriptor.source]);if(!this.closed)this.setState(ownerId,descriptor,now,'inspection');}
 }
 clearAction(ownerId){this.actions.remove(ownerId);const effects=this.actionEffects.get(ownerId);if(effects)for(const image of effects.values())image.destroy();this.actionEffects.delete(ownerId);}
 renderActionEffects(ownerId,sample,position,displaySize){
  let effects=this.actionEffects.get(ownerId);if(!effects){effects=new Map();this.actionEffects.set(ownerId,effects);}
  const d=sample.descriptor,[cw,ch]=d.coordinateSize,sx=displaySize.width/cw,sy=displaySize.height/ch;
  for(const kind of ['blade','contact']){const spec=d[kind],opacity=sample[kind+'Opacity'];let image=effects.get(kind);
   if(opacity>0&&!image){const texture=this.textures.get(spec.assetKey);if(!texture)throw Error('Required action texture unavailable: '+spec.assetKey);image=this.scene.add.image(0,0,texture.key);effects.set(kind,image);}
   if(!image)continue;const targetAttached=spec.attach==='target'&&sample.contactTarget;
   const anchor=targetAttached?this.project(sample.contactTarget):position;
   const x=spec.offset[0]+spec.size[0]/2-(targetAttached?0:d.animation.origin[0]*cw),y=spec.offset[1]+spec.size[1]/2-(targetAttached?0:d.animation.origin[1]*ch);
   image.actionId=sample.actionId;image.setOrigin(.5,.5).setDisplaySize(spec.size[0]*sx,spec.size[1]*sy).setFlipX(sample.flipX).setPosition(anchor.x+(sample.flipX?-x:x)*sx,anchor.y+y*sy).setDepth(spec.layer).setAlpha(opacity).setVisible(opacity>0);
  }
 }
 imageFor(ownerId,descriptor,elapsed,map=this.actorSprites,playbackMode='decorative',frameIndex=null){
  const texture=this.textures.get(descriptor.source);if(!texture)return null;
  const projection=animationFrame(descriptor,elapsed,this.reducedMotion,playbackMode),region=texture.asset.key===descriptor.source?(frameIndex===null?projection.region:descriptor.frames[frameIndex]):null;const frame=region?`${region.x}.${region.y}.${region.width}.${region.height}`:undefined;
  if(region){const t=this.scene.textures?.get(texture.key);if(!t?.has?.(frame))t?.add(frame,0,region.x,region.y,region.width,region.height);}
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
   const action=actor.hp>0?this.actions.sample(id,now,this.reducedMotion):null;
   if(hadAction&&!action&&actor.hp>0){this.clearAction(id);this.states.delete(id);state=undefined;}
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
   if(image){const pos=positions.get(id),asset=this.textures.get(descriptor.source).asset,region=asset.key===descriptor.source?(action?descriptor.frames[action.frameIndex]:animationFrame(descriptor,elapsed,this.reducedMotion,playbackMode).region):null,w=region?.width??asset.width,h=region?.height??asset.height,width=72*descriptor.scale*w/Math.max(w,h),height=72*descriptor.scale*h/Math.max(w,h);image.setDisplaySize(width,height).setFlipX(flipX).setPosition(pos.x,pos.y).setDepth(5).setAlpha(actor.hp>0?1:.35);if(action)this.renderActionEffects(id,action,pos,{width,height});}
   else this.actorSprites.get(id)?.setVisible(false); // Arena's procedural marker remains visible.
  }
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
 destroy(){if(this.closed)return;this.closed=true;this.ready=false;this.stageDisplay?.destroy();for(const id of this.actionEffects.keys())this.clearAction(id);this.actions.clear();for(const map of [this.displays,this.actorSprites,this.overlaySprites,this.hudSprites]){for(const v of map.values())v.destroy();map.clear();}this.residency.destroy();this.optionalLoads.clear();this.optionalFailures.clear();this.displayKinds.clear();this.displayTextureKeys.clear();this.actorTextureKeys.clear();this.overlayTextureKeys.clear();this.states.clear();this.facings.clear();this.actionFacings.clear();this.playback.clear();}
}
