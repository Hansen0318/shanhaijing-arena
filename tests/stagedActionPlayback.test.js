import test from 'node:test';
import assert from 'node:assert/strict';
import {ActionPlayback} from '../src/assets/actionPlayback.js';
import {actionDescriptor} from '../src/assets/descriptors.js';
import {rosterCatalog} from '../src/roster/catalog.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
import {assetScene,pngTransport} from './helpers/assetScene.js';
const legacy=rosterCatalog.P1.actionDescriptors.basic;
function input(){return {kind:'staged',animation:{...legacy.animation,source:'lushu.battleAwakening',frames:[0,128,256,384,512].map(x=>({x,y:0,width:128,height:128})),duration:.61},coordinateSize:[320,320],durationMs:610,recoveryStartMs:470,phaseFrames:[0,1,2,3,4],stages:[80,90,130].map((contactHoldMs,i)=>({startMs:[80,135,280][i],endMs:[135,280,470][i],blade:legacy.blade,contact:{...legacy.contact,attach:'target',offset:legacy.contact.size.map(n=>-n/2)},contactHoldMs}))};}
const start={staged:true,actorId:'a1',actionId:'rush1',category:'awakening',phase:'start',startedAt:0,eventAt:0,attackOrigin:{x:4,y:0},attackTarget:{x:6,y:0}};
const segment=(hitIndex,eventAt,direction={x:1,y:0})=>({...start,phase:'segment',hitIndex,eventAt,direction,origin:{x:6,y:0}});
const resolve=(hitIndex,eventAt,hit=true)=>({...start,phase:'resolve',hitIndex,eventAt,resolvedAt:eventAt,hit,targetId:'e1',target:{x:6,y:0},direction:{x:hitIndex===1?-1:1,y:0}});
test('five-pose descriptor accepts staged effects and rejects malformed lifecycle data',()=>{
 const d=actionDescriptor(input());assert.equal(d.kind,'staged');assert.equal(d.animation.frames.length,5);assert.ok(Object.isFrozen(d.stages));
 for(const patch of [{durationMs:0},{phaseFrames:[0,1,2,3,5]},{stages:[]},{stages:[...input().stages,{...input().stages[0]}]},{stages:input().stages.map(s=>({...s,contactHoldMs:NaN}))}])assert.throws(()=>actionDescriptor({...input(),...patch}));
});
test('staged body/source follows real segment events, reverses at B and ends at610ms',()=>{
 const p=new ActionPlayback(),d=input();p.handle(start,d);assert.equal(p.sample('a1',.07).frameIndex,0);
 p.handle(segment(0,.08),d);assert.equal(p.sample('a1',.09).frameIndex,1);assert.equal(p.sample('a1',.09).bladeOpacity,1);
 p.handle(segment(1,.135,{x:-1,y:0}),d);assert.equal(p.sample('a1',.14).frameIndex,2);assert.equal(p.sample('a1',.14).flipX,true);
 p.handle(resolve(0,.10175),d);assert.equal(p.sample('a1',.15).frameIndex,2,'older contact cannot roll body/facing back');
 p.handle(segment(2,.28),d);assert.equal(p.sample('a1',.35).frameIndex,3);assert.equal(p.sample('a1',.47).frameIndex,4);assert.equal(p.sample('a1',.47).bladeOpacity,0);assert.equal(p.sample('a1',.61),null);
});
test('staged reduced motion retains static phase cues and misses never create contact opacity',()=>{
 const p=new ActionPlayback(),d=input();p.handle(start,d);p.handle(segment(0,.08),d);p.handle(resolve(0,.1,false),d);const sample=p.sample('a1',.11,true);assert.equal(sample.frameIndex,1);assert.equal(sample.bladeOpacity,1);assert.equal(sample.contactOpacity,0);assert.deepEqual(p.sample('a1',.11,true),sample);p.handle({...start,phase:'cancel',eventAt:.12},d);p.handle(resolve(1,.2),d);assert.equal(p.sample('a1',.2),null);
});
async function fixture(){const scene=assetScene(),p=new AssetPresenter(scene,{cache:createAssetCache({transport:pngTransport}),project:p=>({x:72*p.x,y:87*p.y})}),character={...rosterCatalog.P1,actionDescriptors:{awakening:input()}};await p.prepare([character]);return {scene,p,character};}
function paint(f,now,targetX=6,hp=200){f.p.render({allies:[{instanceId:'a1',definitionId:'P1',x:6,y:0,hp:200}],enemies:[{instanceId:'e1',definitionId:'P1',x:targetX,y:0,hp}]},now,{P1:f.character});}
test('three confirmed impacts survive batched paint with distinct identity, follow target, then expire',async()=>{
 const f=await fixture();f.p.cast(start,f.character,0);for(const [i,t] of [[0,.10175],[1,.154231],[2,.35]]){f.p.cast(segment(i,[.08,.135,.28][i]),f.character,.36);f.p.cast(resolve(i,t),f.character,.36);f.p.cast(resolve(i,t),f.character,.36);}
 paint(f,.36,7);assert.equal(f.p.stagedImpacts.size,3);assert.equal(f.p.stagedImpactSprites.size,3);for(const image of f.p.stagedImpactSprites.values()){assert.equal(image.x,504);assert.equal(image.actionId,'rush1');assert.ok(image.visible);}
 const snapshot=[...f.p.stagedImpactSprites.values()].map(x=>[x.x,x.alpha]);paint(f,.36,7);assert.deepEqual([...f.p.stagedImpactSprites.values()].map(x=>[x.x,x.alpha]),snapshot);
 paint(f,.37,8);assert.equal(f.p.stagedImpacts.size,1);assert.equal([...f.p.stagedImpactSprites.values()][0].x,576);paint(f,.49,8);assert.equal(f.p.stagedImpacts.size,0);f.p.destroy();assert.equal(f.scene.budget().bytes,0);assert.ok(f.scene.objects.every(o=>o.destroyed));
});
test('staged whiff creates source cue only; cancel clears owner impacts and KO removes target impacts',async()=>{
 const f=await fixture();f.p.cast(start,f.character,0);f.p.cast(segment(0,.08),f.character,.1);f.p.cast(resolve(0,.1,false),f.character,.1);paint(f,.11);assert.equal(f.p.stagedImpacts.size,0);assert.ok(f.p.actionEffects.get('a1').get('blade').visible);
 f.p.cast(resolve(1,.15),f.character,.15);paint(f,.16);assert.equal(f.p.stagedImpacts.size,1);paint(f,.17,6,0);assert.equal(f.p.stagedImpacts.size,0);
 f.p.cast(resolve(2,.35),f.character,.35);f.p.cast({...start,phase:'cancel',eventAt:.36},f.character,.36);paint(f,.36);assert.equal(f.p.stagedImpacts.size,0);assert.equal(f.p.actions.active.size,0);f.p.destroy();
});
test('retained legacy contact cannot replace the next staged body or hide its first30ms rush',async()=>{
 const f=await fixture(),character={...f.character,actionDescriptors:{...f.character.actionDescriptors,heavy:rosterCatalog.P1.actionDescriptors.heavy}};
 await f.p.prepare([character]);
 f.p.cast({...start,actionId:'heavy',category:'heavy',startedAt:0},character,0);
 f.p.cast({...start,actionId:'heavy',category:'heavy',phase:'resolve',resolvedAt:.28,hit:true,target:{x:6,y:0}},character,.28);
 f.p.cast({...start,startedAt:.3,eventAt:.3},character,.3);
 f.p.cast({...segment(0,.38),startedAt:.3},character,.38);
 paint(f,.39);assert.equal(f.p.actorSprites.get('a1').frame,'128.0.128.128');assert.ok(f.p.actionEffects.get('a1').get('blade').visible);
 assert.ok([...f.p.stagedImpactSprites.values()].some(x=>x.actionId==='heavy'&&x.visible));f.p.destroy();
});
test('real approved staged descriptor changes source texture for every phase in both directions',async()=>{
 for(const sign of [1,-1]){
  const scene=assetScene(),p=new AssetPresenter(scene,{cache:createAssetCache({transport:pngTransport})}),character=rosterCatalog.P1;
  await p.prepare([character]);p.cast({...start,attackTarget:{x:4+2*sign,y:0}},character,0);
  for(const [i,time] of [[0,.08],[1,.135],[2,.28]]){
   p.cast(segment(i,time,{x:sign*(i===1?-1:1),y:0}),character,time);
   const frame={allies:[{instanceId:'a1',definitionId:'P1',x:4,y:0,hp:200}],enemies:[{instanceId:'e1',definitionId:'P1',x:6,y:0,hp:200}]};
   p.render(frame,time,rosterCatalog);const wind=p.actionEffects.get('a1').get('blade');
   assert.ok(wind.texture.endsWith(character.actionDescriptors.awakening.stages[i].blade.assetKey));assert.equal(wind.flipX,sign*(i===1?-1:1)<0);assert.equal(wind.alpha,.85);
  }
  p.destroy();
 }
});
