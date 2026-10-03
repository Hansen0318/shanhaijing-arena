import test from 'node:test';import assert from 'node:assert/strict';
import {createLabConfig} from '../src/dev/battleLab/config.js';import {createLabBattleSession} from '../src/dev/battleLab/battleFactory.js';import {createAssetCache} from '../src/runtime/assetCache.js';
const api=await import('../src/runtime/assetPresenter.js').catch(()=>({}));
function scene(){const objects=[];const textures=new Map();const make=()=>{const v=new Proxy({destroyed:false,destroy(){this.destroyed=true;}},{get:(o,k)=>k in o?o[k]:()=>v});objects.push(v);return v;};return {objects,add:{graphics:make,image:make},textures:{exists:k=>textures.has(k),addImage(k){textures.set(k,{add(){}});return textures.get(k);},remove:k=>textures.delete(k),get:k=>textures.get(k)},keys:textures};}
test('presenter owns loaded textures and discards stale completion after shutdown',async()=>{
 assert.equal(typeof api.AssetPresenter,'function');let resolve,calls=0;const cache=createAssetCache({transport:()=>{calls++;return new Promise(r=>resolve=r);}}),s=scene();
 const p=new api.AssetPresenter(s,{cache});const pending=p.loadKeys(['placeholder.actor-strip']);assert.equal(calls,1);p.destroy();resolve({image:{width:64,height:32},bytes:200});await pending;assert.equal(s.keys.size,0);
 const q=new api.AssetPresenter(s,{cache});await q.loadKeys(['placeholder.actor-strip']);assert.equal(calls,1);assert.equal(s.keys.size,1);q.destroy();assert.equal(s.keys.size,0);
});
test('formal cast/hit/KO rendering is presentation-only and bounded; clear destroys displays',async()=>{
 assert.equal(typeof api.AssetPresenter,'function');const session=createLabBattleSession(createLabConfig({scenarioId:'persistent-area',allyTier:'T3',skipCountdown:true}));const s=scene(),p=new api.AssetPresenter(s);const before=JSON.stringify(session.snapshot());
 p.prepare(Object.values(session.characterDefinitions),{});const frame=session.snapshot();p.render(frame,0,session.characterDefinitions);assert.equal(JSON.stringify(session.snapshot()),before);
 p.cast({actorId:'a2',category:'awakening',origin:{x:4,y:0},target:{x:7,y:0}},session.characterDefinitions[session.actorById('a2').definitionId],0);
 p.hit({targetId:'a1'},session.characterDefinitions[session.actorById('a1').definitionId],0);p.render(frame,.1,session.characterDefinitions);assert.ok(p.playback.active.size>0);
 const ko=structuredClone(frame);ko.allies[1].hp=0;p.render(ko,.2,session.characterDefinitions);assert.equal(p.playback.active.size,0);assert.equal(JSON.stringify(session.snapshot()),before);
 p.destroy();assert.ok(s.objects.every(o=>o.destroyed));assert.equal(p.states.size,0);
});
test('Lab inspection uses shared presenter without combat mutation',async()=>{
 assert.equal(typeof api.AssetPresenter,'function');const session=createLabBattleSession(createLabConfig()),p=new api.AssetPresenter(scene(),{cache:createAssetCache({transport:async()=>({image:{width:64,height:32},bytes:200})})});
 const frame=session.snapshot(),before=JSON.stringify(frame);await p.inspect(frame.allies[0].instanceId,session.characterDefinitions[frame.allies[0].definitionId],'battleIdle',0);p.render(frame,.6,session.characterDefinitions);assert.equal(JSON.stringify(session.snapshot()),before);assert.equal(p.states.get('a1').descriptor.source,'placeholder.actor-strip');p.destroy();
});
test('unknown/failed image slots leave real combat running and retained session unchanged',async()=>{
 const session=createLabBattleSession(createLabConfig({scenarioId:'heal'})),p=new api.AssetPresenter(scene(),{cache:createAssetCache({transport:async()=>{throw Error('missing');}})});
 const defs=Object.fromEntries(Object.entries(session.characterDefinitions).map(([id,d])=>[id,{...d,assets:{...d.assets,battleIdle:'does-not-exist'}}]));await p.prepare([...session.allies,...session.enemies].map(a=>defs[a.definitionId]));
 let steps=0;while(session.result()==='running'&&steps++<1800){session.step(.05);p.render(session.snapshot(),session.elapsedSeconds,defs);}assert.notEqual(session.result(),'running');p.destroy();
});
