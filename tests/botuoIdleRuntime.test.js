import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {rosterCatalog} from '../src/roster/catalog.js';
import {assetManifest} from '../src/assets/manifest.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {characterAnimation} from '../src/assets/battleDescriptors.js';
const Frame=createRequire(import.meta.url)('../node_modules/phaser/src/textures/Frame.js');

// Exercise production presenter against real Phaser Frame crop/UV objects.
function runtimeScene(){
 const textures=new Map();
 return {textures:{addImage(key,image){const t={source:[image],frames:new Map(),has(name){return this.frames.has(name);},add(name,...region){this.frames.set(name,new Frame(this,name,...region));}};textures.set(key,t);},get:key=>textures.get(key),remove:key=>textures.delete(key)},add:{image(x,y,key,name){
  const sprite={x,y,setTexture(key,name){this.frame=textures.get(key).frames.get(name);return this;},setOrigin(x,y){this.origin=[x,y];return this;},setDisplaySize(w,h){this.size=[w,h];return this;},setPosition(x,y){this.x=x;this.y=y;return this;},destroy(){}};
  for(const method of ['setScale','setVisible','setFlipX','setDepth','setAlpha'])sprite[method]=()=>sprite;
  return sprite.setTexture(key,name);
 }}};
}
async function harness(){
 const scene=runtimeScene(),asset=assetManifest['botuo.battleIdle'];
 const presenter=new AssetPresenter(scene,{cache:{async load(){return {...asset,image:{width:asset.width,height:asset.height}};}}});
 await presenter.loadKeys([asset.key]);
 const actor={instanceId:'a2',definitionId:'P2',x:314,y:275,hp:320},snapshot={allies:[actor],enemies:[]};
 return {presenter,actor,snapshot,render(time){presenter.render(snapshot,time,rosterCatalog);return presenter.actorSprites.get('a2');}};
}
test('Botuo PNG and real Phaser frames show one equal cell in F1-F4-repeat order with fixed feet',async()=>{
 const bytes=readFileSync('public/assets/characters/botuo/battleIdle-4f.png'),d=characterAnimation(rosterCatalog.P2,'battleIdle');
 assert.deepEqual([bytes.readUInt32BE(16),bytes.readUInt32BE(20)],[640,160]);assert.equal(bytes.length,31355);
 assert.equal(d.fps,2.5);assert.equal(d.loop,true);assert.equal(d.staticFrame,0);assert.equal(d.scale,2);
 const h=await harness();
 for(const [i,t] of [0,.401,.801,1.201,1.601].entries()){
  const s=h.render(t),x=(i%4)*160;
  assert.deepEqual([s.frame.cutX,s.frame.cutY,s.frame.cutWidth,s.frame.cutHeight],[x,0,160,160]);
  assert.deepEqual([s.frame.u0,s.frame.u1],[x/640,(x+160)/640]);
  assert.deepEqual(s.origin,[.5,158/160]);assert.deepEqual(s.size,[144,144]);assert.deepEqual([s.x,s.y],[314,275]);
  assert.equal(s.y+(1-s.origin[1])*s.size[1],276.8);
 }
 h.presenter.destroy();
});
test('Botuo real frame playback advances under repeated missing Hit/Cast and stays static for KO',async()=>{
 const h=await harness();h.render(0);
 for(const [i,t] of [.401,.801,1.201,1.601].entries()){
  if(i%2)h.presenter.setState('a2',characterAnimation(rosterCatalog.P2,'battleCast'),t,'battleCast');
  else h.presenter.hit({targetId:'a2'},rosterCatalog.P2,t);
  assert.equal(h.render(t).frame.cutX,((i+1)%4)*160);
 }
 h.actor.hp=0;for(const t of [2,2.5,3])assert.equal(h.render(t).frame.cutX,0);
 h.presenter.destroy();
});
test('actual Arena advanceBattle and Pause/Resume preserve Botuo frame phase and feet',async()=>{
 const source=readFileSync('src/runtime/ArenaScene.js','utf8').replace(/^import .*;\n/gm,'').replace('export class ArenaScene','class ArenaScene');
 const Arena=vm.runInNewContext(source+'\nArenaScene',{Phaser:{Scene:class{}},ARENA_STAGE:{width:1120,height:540}});
 const h=await harness(),s=new Arena();
 s.session={elapsedSeconds:0,result:()=> 'running',step(dt){this.elapsedSeconds+=dt;},snapshot:()=>h.snapshot};
 s.paused=false;s.accumulatorSeconds=0;s.joystickPointerId=null;
 s.time={paused:false};s.tweens={getGlobalTimeScale:()=>1,setGlobalTimeScale(){},tick(){}};
 for(const method of ['releaseJoystick','refreshSkillButtons','applyKoFixtureIfNeeded','renderCastEvents'])s[method]=()=>{};
 s.applyFrame=()=>h.render(s.session.elapsedSeconds);
 s.applyFrame();
 s.advanceBattle(.46);assert.equal(h.presenter.actorSprites.get('a2').frame.cutX,160);
 s.togglePause();const pausedTime=s.session.elapsedSeconds;
 s.advanceBattle(10);assert.equal(s.session.elapsedSeconds,pausedTime);assert.equal(h.presenter.actorSprites.get('a2').frame.cutX,160);
 s.togglePause();s.advanceBattle(.4);assert.equal(h.presenter.actorSprites.get('a2').frame.cutX,320);
 const sprite=h.presenter.actorSprites.get('a2');assert.deepEqual([sprite.x,sprite.y],[314,275]);assert.deepEqual(sprite.origin,[.5,158/160]);
 h.presenter.destroy();
});
