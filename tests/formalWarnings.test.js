import test from 'node:test';
import assert from 'node:assert/strict';
import {TelegraphPresenter} from '../src/runtime/telegraphs.js';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
import {rosterCatalog} from '../src/roster/catalog.js';
import {formalAbilityDefinitions} from '../src/roster/abilities.js';
const threat={id:'t',sourceId:'renamed-instance',sourceTeamId:'allies',category:'heavy',createdAtMs:0,impactAtMs:1000,geometry:{shape:'lane',origin:{x:2,y:0},center:{x:6,y:1},radius:.45}};
function fixture(){
 const calls=[],textures=new Map(),objects=[];
 const make=()=>{const o=new Proxy({destroy(){this.destroyed=true;}},{get:(target,k)=>k in target?target[k]:(...args)=>{calls.push([k,...args]);return o;}});objects.push(o);return o;};
 const scene={add:{graphics:make,image:make},textures:{exists:k=>textures.has(k),addImage(k){const t={add(){}};textures.set(k,t);return t;},get:k=>textures.get(k),remove:k=>textures.delete(k)}};
 const assets=new AssetPresenter(scene,{cache:createAssetCache({transport:async r=>({image:{width:r.width,height:r.height},bytes:r.bytes})})});
 return {scene,calls,assets,objects};
}
test('loaded formal Heavy sources retire all schematic commands throughout its warning lifetime',async()=>{
 const {scene,calls,assets}=fixture();await assets.prepare([rosterCatalog.P3],{},formalAbilityDefinitions);
 const p=new TelegraphPresenter(scene,x=>x,{formalSource:()=>assets.formalActionSource(rosterCatalog.P3,'heavy')});
 for(const now of [0,200,350,500,699,1000]){calls.length=0;p.render([threat],now);assert.deepEqual(calls,[['clear']]);assert.equal(p.presentations.get('t').mode,'formal-action');assert.ok(p.presentations.get('t').assetKeys.includes('chiru.heavyColumn'));}
 p.destroy();assets.destroy();
});
test('formal source gate requires all actual textures, never an asset name or procedural descriptor',async()=>{
 const {assets,scene}=fixture();assert.equal(typeof assets.formalActionSource,'function');assert.equal(assets.formalActionSource(rosterCatalog.P3,'heavy'),null);
 await assets.prepare([rosterCatalog.P3],{},formalAbilityDefinitions);const source=assets.formalActionSource({...rosterCatalog.P3,id:'anonymous'},'heavy');assert.equal(source.kind,'action-assets');assert.ok(source.assetKeys.length>=4);
 for(const key of source.assetKeys){const loaded=assets.textures.get(key);assets.textures.delete(key);assert.equal(assets.formalActionSource(rosterCatalog.P3,'heavy'),null,key);assets.textures.set(key,loaded);}
 const loaded=assets.textures.get(source.assetKeys[0]);scene.textures.remove(loaded.key);assert.equal(assets.formalActionSource(rosterCatalog.P3,'heavy'),null);
 assert.equal(assets.formalActionSource({assets:{skillOverlays:{heavy:'chiru.heavyColumn'}}},'heavy'),null);assets.destroy();assert.equal(assets.formalActionSource(rosterCatalog.P3,'heavy'),null);
});
test('missing or invalid formal sources retain one fallback and restore it after an actual texture loss',async()=>{
 const {scene,calls,assets}=fixture();await assets.prepare([rosterCatalog.P3],{},formalAbilityDefinitions);
 const p=new TelegraphPresenter(scene,x=>x,{formalSource:()=>assets.formalActionSource(rosterCatalog.P3,'heavy')});
 const loaded=assets.textures.get('chiru.heavyColumn');assets.textures.delete('chiru.heavyColumn');calls.length=0;p.render([threat],400);assert.equal(p.presentations.get('t').mode,'fallback');assert.equal(calls.filter(c=>c[0]==='strokeEllipse').length,2);
 assets.textures.set('chiru.heavyColumn',loaded);calls.length=0;p.render([threat],400);assert.equal(p.presentations.get('t').mode,'formal-action');assert.deepEqual(calls,[['clear']]);
 for(const source of [null,true,{renderer:'ground-sigil-v1'},{kind:'action-assets',assetKeys:[]}]){const q=new TelegraphPresenter(scene,x=>x,{formalSource:()=>source});q.render([threat],400);assert.equal(q.presentations.get('t').mode,'fallback');q.destroy();}p.destroy();assets.destroy();
});
test('all developed action categories retire schematic geometry using shared source resolution',async()=>{
 const {scene,calls,assets}=fixture();await assets.prepare(Object.values(rosterCatalog),{},formalAbilityDefinitions);
 for(const character of Object.values(rosterCatalog))for(const category of ['basic','heavy','special','awakening'])for(const shape of ['circle','lane'])for(const sourceTeamId of ['allies','enemies']){
  const source=assets.formalActionSource({...character,id:'anonymous'},category),p=new TelegraphPresenter(scene,x=>x,{formalSource:()=>source});calls.length=0;p.render([{...threat,category,sourceTeamId,geometry:{...threat.geometry,shape}}],500);
  if(character.actionDescriptors?.[category]){assert.equal(p.presentations.get('t').mode,'formal-action');assert.deepEqual(calls,[['clear']]);}else assert.equal(p.presentations.get('t').mode,'fallback');p.destroy();
 }assets.destroy();
});
test('independent persistent areas, pause and cleanup retain their own ownership',()=>{
 const {scene,calls}=fixture(),p=new TelegraphPresenter(scene,x=>x,{formalSource:()=>({kind:'action-assets',assetKeys:['poses','wave']})}),area={...threat,id:'area',startTime:0,expiryTime:2};
 p.render([threat],200,[area]);assert.equal(p.presentations.get('area').mode,'fallback');assert.equal(p.presentations.get('t').mode,'formal-action');calls.length=0;p.render([threat],200,[area]);const same=JSON.stringify(calls);calls.length=0;p.render([threat],200,[area]);assert.equal(JSON.stringify(calls),same);
 p.render([],300);assert.equal(p.presentations.size,0);p.destroy();p.destroy();assert.equal(p.closed,true);
});
