import {battleAssetCache} from './assetCache.js';
import {encounterAssetKeys,resolveCharacterAsset} from '../assets/resolver.js';
import {characterAnimation,characterVfx,grayboxAnimation} from '../assets/battleDescriptors.js';
import {VisualPlayback,animationFrame} from '../assets/playback.js';
import {animationDescriptor,vfxDescriptor} from '../assets/descriptors.js';
import {ASSET_LIMITS} from '../assets/schema.js';
let nextPresenter=0;
// This adapter has no ability execution, mutable actor or persistence capability.
export class AssetPresenter{
 constructor(scene,{cache=battleAssetCache,project=p=>p,reducedMotion=false}={}){
  this.scene=scene;this.cache=cache;this.project=project;this.reducedMotion=reducedMotion;this.prefix=`visual.${++nextPresenter}.`;this.closed=false;this.textureBytes=0;
  this.textures=new Map();this.displays=new Map();this.displayKinds=new Map();this.actorSprites=new Map();this.overlaySprites=new Map();this.hudSprites=new Map();this.states=new Map();this.facings=new Map();this.actionFacings=new Map();this.playback=new VisualPlayback();
 }
 async loadKeys(keys){return Promise.all([...new Set(keys)].map(async key=>{
  const asset=await this.cache.load(key);if(this.closed||!asset.image||this.textures.has(key))return;
  const residentBytes=asset.width*asset.height*4;if(this.textures.size>=64||this.textureBytes+residentBytes>ASSET_LIMITS.cacheBytes)return;
  const textureKey=this.prefix+key;try{this.scene.textures?.addImage(textureKey,asset.image);this.textures.set(key,{key:textureKey,asset});this.textureBytes+=residentBytes;}catch{this.scene.textures?.remove(textureKey);}
 }));}
 prepare(definitions,stage={},abilities={}){
  this.stageAssetKey=stage.battleAssetKey??null;
  const keys=encounterAssetKeys(definitions,stage);
  for(const d of definitions){for(const state of ['battleIdle','battleHit','battleKo','battleCast'])keys.push(characterAnimation(d,state).source);for(const cat of ['basic','heavy','special','awakening']){const v=characterVfx(d,cat,abilities[d.abilities?.[cat]]);keys.push(v.assetKey);if(v.animation)keys.push(v.animation.source);}}
  return this.loadKeys(keys);
 }
 setState(ownerId,descriptor,now,state){this.states.set(ownerId,{descriptor,start:now,state});}
 cast(event,character,now,ability=null){
  if(this.closed)return;const descriptor=characterVfx(character,event.category,ability);
  const target=event.target??event.origin,dx=target.x-event.origin.x,dy=target.y-event.origin.y,len=Math.hypot(dx,dy)||1;
  this.playback.play(event.actorId,descriptor,event.origin,now,{targetId:event.targetId??null,target,direction:{x:dx/len,y:dy/len}});
  // Presentation facing follows the actual attack/cast direction for the action window.
  if(Math.abs(dx)>1e-6)this.actionFacings.set(event.actorId,{flipX:dx<0,until:now+descriptor.duration});
  const overlay=character?.assets?.skillOverlays?.[event.category];if(overlay)try{this.playback.play(event.actorId,vfxDescriptor({form:'sprite',assetKey:overlay,duration:descriptor.duration}),event.origin,now,{target});}catch{/* optional invalid art falls back to existing cast */}
  if(character?.animationDescriptors?.battleCast)this.setState(event.actorId,characterAnimation(character,'battleCast'),now,'battleCast');
 }
 hit(event,character,now){if(!this.closed)this.setState(event.targetId,characterAnimation(character,'battleHit'),now,'battleHit');}
 async inspect(ownerId,character,slot,now){
  if(slot==='none'||this.closed)return;
  if(slot.endsWith('Vfx'))this.playback.play(ownerId,characterVfx(character,slot.slice(0,-3)),{x:0,y:0},now);
  else {const descriptor=slot==='battleIdle'?(character?.animationDescriptors?.battleIdle?characterAnimation(character,'battleIdle'):grayboxAnimation):animationDescriptor({source:resolveCharacterAsset(character,slot).key,duration:1});await this.loadKeys([descriptor.source]);if(!this.closed)this.setState(ownerId,descriptor,now,'inspection');}
 }
 imageFor(ownerId,descriptor,elapsed,map=this.actorSprites){
  const texture=this.textures.get(descriptor.source);if(!texture)return null;
  const projection=animationFrame(descriptor,elapsed,this.reducedMotion),region=texture.asset.key===descriptor.source?projection.region:null;const frame=region?`${region.x}.${region.y}.${region.width}.${region.height}`:undefined;
  if(region){const t=this.scene.textures?.get(texture.key);if(!t?.has?.(frame))t?.add(frame,0,region.x,region.y,region.width,region.height);}
  let sprite=map.get(ownerId);if(!sprite){sprite=this.scene.add.image(0,0,texture.key,frame);map.set(ownerId,sprite);}else sprite.setTexture(texture.key,frame);
  sprite.setOrigin(...descriptor.origin).setScale(descriptor.scale).setVisible(true);return sprite;
 }
 renderHud(views,definitions,session){
  if(this.closed||!views)return;
  for(const [id,view] of views){const actor=session.actorById(id),key=resolveCharacterAsset(definitions[actor.definitionId],'portraitSquare').key,texture=this.textures.get(key);if(!texture)continue;
   let image=this.hudSprites.get(id);if(!image){image=this.scene.add.image(0,view.layout.backingY,texture.key);view.card.addAt(image,2);this.hudSprites.set(id,image);}image.setDisplaySize(view.layout.portraitSize,view.layout.portraitSize);
  }
 }
 renderOverlays(frame,definitions,statuses,now){
  if(this.closed)return;const valid=new Set();for(const actor of [...frame.allies,...frame.enemies]){if(actor.hp<=0)continue;const character=definitions[actor.definitionId];
   for(const status of statuses.forActor(actor.instanceId,now)){const key=character?.assets?.statusOverlays?.[status.type],texture=this.textures.get(key);if(!texture)continue;const id=actor.instanceId+'.'+status.type;valid.add(id);let image=this.overlaySprites.get(id);if(!image){image=this.scene.add.image(0,0,texture.key);this.overlaySprites.set(id,image);}const p=this.project(actor);image.setPosition(p.x,p.y).setDepth(7).setDisplaySize(56,56);}
  }for(const [id,image] of this.overlaySprites)if(!valid.has(id)){image.destroy();this.overlaySprites.delete(id);}
 }
 render(frame,now,definitions){
  if(this.closed)return;const actors=[...frame.allies,...frame.enemies],alive=new Set(actors.filter(a=>a.hp>0).map(a=>a.instanceId)),positions=new Map(actors.map(a=>[a.instanceId,this.project(a)]));
  const stage=this.textures.get(this.stageAssetKey);if(stage&&!this.stageDisplay)this.stageDisplay=this.scene.add.image(0,0,stage.key).setOrigin(0,0).setDisplaySize(1120,540).setDepth(1);
  for(const actor of actors){const id=actor.instanceId,character=definitions[actor.definitionId];let state=this.states.get(id);
   const previous=this.facings.get(id),dx=previous?actor.x-previous.x:0,actionFacing=this.actionFacings.get(id);
   if(actionFacing && now>actionFacing.until)this.actionFacings.delete(id);
   // Facing priority: current attack/cast direction > movement direction > last facing/default team direction.
   const activeAction=this.actionFacings.get(id);
   const flipX=activeAction?activeAction.flipX:dx>1e-6?false:dx< -1e-6?true:previous?.flipX??frame.enemies.includes(actor);
   this.facings.set(id,{x:actor.x,flipX});
   if(actor.hp<=0&&state?.state!=='battleKo'){this.setState(id,characterAnimation(character,'battleKo'),now,'battleKo');state=this.states.get(id);}
   else if(!state||actor.hp>0&&state.state!=='battleIdle'&&state.state!=='inspection'&&animationFrame(state.descriptor,now-state.start).finished){this.setState(id,characterAnimation(character,'battleIdle'),now,'battleIdle');state=this.states.get(id);}
   // Missing optional state art must not hide a loaded identity. Keep state timing,
   // but display its idle static frame at the current actor position until art exists.
   const idle=characterAnimation(character,'battleIdle'),formalState=this.textures.has(state.descriptor.source);
   const descriptor=formalState?state.descriptor:idle,elapsed=formalState?now-state.start:0;
   const image=this.imageFor(id,descriptor,elapsed);
   if(image){const pos=positions.get(id),asset=this.textures.get(descriptor.source).asset,region=asset.key===descriptor.source?animationFrame(descriptor,elapsed,this.reducedMotion).region:null,w=region?.width??asset.width,h=region?.height??asset.height;image.setDisplaySize(72*descriptor.scale*w/Math.max(w,h),72*descriptor.scale*h/Math.max(w,h)).setFlipX(flipX).setPosition(pos.x,pos.y).setDepth(5).setAlpha(actor.hp>0?1:.35);}
   else this.actorSprites.get(id)?.setVisible(false); // Arena's procedural marker remains visible.
  }
  const records=this.playback.update(now,alive),ids=new Set(records.map(r=>r.id));
  for(const [id,display] of this.displays)if(!ids.has(id)){display.destroy();this.displays.delete(id);this.displayKinds.delete(id);}
  for(const r of records){
   const d=r.descriptor,elapsed=now-r.start,progress=this.reducedMotion?0:Math.min(1,elapsed/d.duration),source=positions.get(r.ownerId)??this.project(r.position),target=r.targetId?positions.get(r.targetId):r.target?this.project(r.target):source;
   const anchor=d.attach==='target'?target:d.attach==='fixed'?this.project(r.position):source;
   let display=this.displays.get(r.id);const texture=this.textures.get(d.animation?.source??d.assetKey);
   const kind=texture?'image':'graphics';if(display&&this.displayKinds.get(r.id)!==kind){display.destroy();this.displays.delete(r.id);display=null;}
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
 }
 destroy(){if(this.closed)return;this.closed=true;this.stageDisplay?.destroy();for(const map of [this.displays,this.actorSprites,this.overlaySprites,this.hudSprites]){for(const v of map.values())v.destroy();map.clear();}for(const {key} of this.textures.values())this.scene.textures?.remove(key);this.textures.clear();this.textureBytes=0;this.displayKinds.clear();this.states.clear();this.facings.clear();this.actionFacings.clear();this.playback.clear();}
}
