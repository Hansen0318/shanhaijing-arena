import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {rosterCatalog} from '../src/roster/catalog.js';
import {assetManifest} from '../src/assets/manifest.js';
import {characterAnimation} from '../src/assets/battleDescriptors.js';
import {animationFrame} from '../src/assets/playback.js';
import {resolveCharacterAsset,encounterAssetKeys} from '../src/assets/resolver.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
const key='lushu.battleIdle';
test('approved idle resolves four equal frames with a fixed ground origin and static fallback',()=>{
 const d=characterAnimation(rosterCatalog.P1,'battleIdle');
 assert.equal(resolveCharacterAsset(rosterCatalog.P1,'battleIdle').key,key);
 assert.equal(d.source,key);assert.equal(d.frames.length,4);
 assert.deepEqual(d.origin,[.5,691/724]);assert.equal(d.scale,2);
 for(let i=0;i<4;i++){
  assert.deepEqual(d.frames[i],{x:i*96,y:0,width:96,height:128});
  assert.equal(animationFrame(d,i/d.fps+.001).index,i);
 }
 assert.equal(animationFrame(d,d.duration+.001).index,0);
 assert.equal(animationFrame(d,.6,true).index,0);
 for(const state of ['battleHit','battleKo','battleCast'])assert.equal(characterAnimation(rosterCatalog.P1,state).source,'placeholder.battle');
 assert.equal(characterAnimation(rosterCatalog.P2,'battleIdle').source,'botuo.battleIdle');
 for(const c of Object.values(rosterCatalog).slice(2))assert.equal(characterAnimation(c,'battleIdle').source,'placeholder.battle');
});
test('runtime PNG is RGBA, bounded and encounter-only, never a menu image',async()=>{
 const a=assetManifest[key];assert.ok(a);
 const b=readFileSync('public/'+a.path);assert.equal(b.readUInt32BE(16),384);assert.equal(b.readUInt32BE(20),128);assert.equal(b[25],6);assert.ok(b.length<=a.bytes);
 for(const slot of ['portraitSquare','collectionArt'])assert.equal(resolveCharacterAsset(rosterCatalog.P1,slot).type,'image');
 assert.ok(!encounterAssetKeys([rosterCatalog.P2]).includes(key));assert.ok(encounterAssetKeys([rosterCatalog.P1]).includes(key));
 const cache=createAssetCache({transport:async record=>({image:{width:record.width,height:record.height},bytes:b.length})});
 assert.equal(cache.size,0);assert.equal((await cache.load(key)).key,key);assert.equal(cache.bytes,384*128*4);assert.equal(cache.size,1);
 await cache.load(key);assert.equal(cache.size,1);
});
function trackedScene(){
 const textures=new Map(),images=[];
 const make=(x,y,texture,frame)=>{const o={x,y,texture,frame,destroyed:false};
 for(const method of ['setTexture','setOrigin','setDisplaySize','setPosition','setVisible','setDepth','setAlpha','setScale','setFlipX'])o[method]=(...args)=>{
  if(method==='setTexture')[o.texture,o.frame]=args;
  if(method==='setOrigin')o.origin=args;
  if(method==='setDisplaySize')o.size=args;
  if(method==='setPosition')[o.x,o.y]=args;
  return o;
 };o.destroy=()=>o.destroyed=true;images.push(o);return o;};
 return {images,textures:{addImage(k){const regions=new Map();textures.set(k,{has:n=>regions.has(n),add:(n,...r)=>regions.set(n,r)});},get:k=>textures.get(k),remove:k=>textures.delete(k)},add:{image:make},keys:textures};
}
test('real presenter loop freezes on battle time, resumes, exits hit/KO safely and releases textures',async()=>{
 const s=trackedScene(),a=assetManifest[key];assert.ok(a);
 const cache=createAssetCache({transport:async record=>({image:{width:record.width,height:record.height},bytes:100})});
 const p=new AssetPresenter(s,{cache});await p.prepare([rosterCatalog.P1]);
 const frame={allies:[{instanceId:'a1',definitionId:'P1',x:3,y:2,hp:245}],enemies:[]};const before=structuredClone(frame);
 for(let i=0;i<4;i++){
  p.render(frame,i*.4,rosterCatalog);const image=p.actorSprites.get('a1');
  assert.equal(image.frame,`${i*96}.0.96.128`);assert.deepEqual(image.origin,[.5,691/724]);assert.deepEqual(image.size,[108,144]);assert.deepEqual([image.x,image.y],[3,2]);
 }
 const frozen=p.actorSprites.get('a1').frame;p.render(frame,1.2,rosterCatalog);assert.equal(p.actorSprites.get('a1').frame,frozen);
 p.render(frame,1.6,rosterCatalog);assert.equal(p.actorSprites.get('a1').frame,'0.0.96.128');assert.deepEqual(frame,before);
 p.hit({targetId:'a1'},rosterCatalog.P1,1.6);p.render(frame,1.7,rosterCatalog);assert.equal(p.states.get('a1').state,'battleHit');
 p.render(frame,2.1,rosterCatalog);assert.equal(p.states.get('a1').state,'battleIdle');
 const ko=structuredClone(frame);ko.allies[0].hp=0;p.render(ko,2.2,rosterCatalog);assert.equal(p.states.get('a1').state,'battleKo');
 p.destroy();assert.equal(s.keys.size,0);assert.equal(p.states.size,0);assert.ok(s.images.every(i=>i.destroyed));assert.equal(p.textureBytes,0);
});
test('Lab idle inspection resolves approved descriptor rather than hiding it under graybox',async()=>{
 const p=new AssetPresenter(trackedScene(),{cache:{async load(){return {type:'procedural'};}}});
 await p.inspect('a1',rosterCatalog.P1,'battleIdle',0);assert.equal(p.states.get('a1').descriptor.source,key);p.destroy();
});

test('actual Arena enriches presentation copies with identity without modifying battle snapshot',async()=>{
 const vm=await import('node:vm');
 const {createLabBattleSession}=await import('../src/dev/battleLab/battleFactory.js');
 const {createLabConfig}=await import('../src/dev/battleLab/config.js');
 const {arenaToStage}=await import('../src/runtime/arenaProjection.js');
 const {battlePortrait}=await import('../src/roster/battlePresentation.js');
 const source=readFileSync('src/runtime/ArenaScene.js','utf8').replace(/^import .*;\n/gm,'').replace('export class ArenaScene','class ArenaScene');
 const Arena=vm.runInNewContext(source+'\nArenaScene',{window:{},Phaser:{Scene:class{}},ARENA_STAGE:{width:1120,height:540},arenaToStage,battlePortrait,statusMarks:()=>''});
 const session=createLabBattleSession(createLabConfig()),frame=session.snapshot(),before=JSON.stringify(frame);let presented;
 const visual={setFillStyle(){return this;},setPosition(){return this;},setAlpha(){return this;},setText(){return this;}};
 const hpBar={clear(){return this;},fillStyle(){return this;},fillRect(){return this;},fillGradientStyle(){return this;},lineStyle(){return this;},strokeRect(){return this;},setVisible(){return this;},setAlpha(){return this;}};
 const labelPositions=new Map(),fills=new Map(),strokes=new Map(),visibility=new Map(),labelVisibility=new Map();
 const s=new Arena();s.session=session;s.actorViews=new Map([...frame.allies,...frame.enemies].map(a=>[a.instanceId,{hpBar:{...hpBar},allied:a.instanceId.startsWith('a'),marker:{...visual,setVisible(value){visibility.set(a.instanceId,value);return this;},setStrokeStyle(width,color){strokes.set(a.instanceId,[width,color]);return this;},setFillStyle(color,alpha){fills.set(a.instanceId,alpha);return this;}},markerColor:0x112233,label:{...visual,setVisible(value){labelVisibility.set(a.instanceId,value);return this;},setPosition(x,y){labelPositions.set(a.instanceId,[x,y]);return this;}}}]));
 s.visualAssets={actorSprites:new Map([['a1',{displayHeight:144,originY:691/724,visible:true}],['e2',{displayHeight:144,originY:691/724,visible:true}]]),render(f){presented=f;},renderOverlays(){},renderHud(){}};s.telegraphs={render(){}};
 s.selectedId='a1';for(const m of ['ensureLivingSelection','refreshSkillButtons','refreshHud','showResult'])s[m]=()=>{};
 s.applyFrame(frame);
 for(const a of [...presented.allies,...presented.enemies])assert.equal(a.definitionId,session.actorById(a.instanceId).definitionId);
 assert.equal(JSON.stringify(frame),before);
 for(const id of ['a1','e2']){assert.equal(visibility.get(id),false);assert.equal(labelVisibility.get(id),false);}for(const a of [...frame.allies,...frame.enemies])if(!['a1','e2'].includes(a.instanceId)){assert.equal(visibility.get(a.instanceId),true);assert.equal(labelVisibility.get(a.instanceId),true);assert.equal(fills.get(a.instanceId),1);}assert.equal(strokes.get('a2')[0],3);
 s.visualAssets.actorSprites.get('a1').visible=false;s.applyFrame(frame);assert.equal(visibility.get('a1'),true);assert.equal(labelVisibility.get('a1'),true);assert.equal(fills.get('a1'),1);
 const pos=arenaToStage(frame.allies[0]);assert.equal(labelPositions.get('a1')[1],pos.y-(144*691/724+10+22));
});
