import test from 'node:test';
import assert from 'node:assert/strict';
import {AssetPresenter} from '../src/runtime/assetPresenter.js';
import {createAssetCache} from '../src/runtime/assetCache.js';
import {rosterCatalog} from '../src/roster/catalog.js';
import {actionDescriptor} from '../src/assets/descriptors.js';
import {assetScene,pngTransport} from './helpers/assetScene.js';
for(const reduced of [false,true])for(const sign of [1,-1])test(`Heavy sweep remains readable across next cast without extending contact/pose, reduced=${reduced}, facing=${sign}`,async()=>{
 const scene=assetScene(),p=new AssetPresenter(scene,{cache:createAssetCache({transport:pngTransport}),reducedMotion:reduced});await p.prepare([rosterCatalog.P1]);
 const frame={allies:[{instanceId:'a',definitionId:'P1',hp:10,x:0,y:0}],enemies:[]},d=rosterCatalog.P1;
 const visibleWind=()=>scene.objects.filter(i=>!i.destroyed&&i.visible&&i.alpha>0&&i.texture?.endsWith('lushu.heavyWind'));
 p.cast({actorId:'a',category:'heavy',actionId:'h',phase:'start',startedAt:0,origin:{x:0,y:0},target:{x:sign*2,y:0}},d,0);
 p.render(frame,.2,rosterCatalog);if(!reduced)assert.equal(visibleWind()[0]?.alpha,1,'sweep should be full opacity during release');else assert.equal(visibleWind().length,0,'no moving anticipation trail in reduced motion');
 p.cast({actorId:'a',category:'heavy',actionId:'h',phase:'resolve',resolvedAt:.28,hit:true,target:{x:sign*2,y:0}},d,.28);
 p.cast({actorId:'a',category:'awakening',origin:{x:0,y:0},target:{x:sign*2,y:0}},d,.30);
 p.render(frame,.35,rosterCatalog);assert.equal(visibleWind().length,1,'one supplied sweep survives next cast including reduced motion');assert.equal(visibleWind()[0].flipX,sign<0);
 p.render(frame,.45,rosterCatalog);assert.equal(visibleWind().length,1,'sweep remains after original contact window');assert.ok(p.actorSprites.get('a').texture.endsWith('lushu.battleIdle'),'do not prolong Heavy F3 to fit blade');assert.ok(!p.actionEffects.get('a')?.get('contact')?.visible,'do not prolong or invent hit burst');
 const before=visibleWind()[0].alpha;p.render(frame,.45,rosterCatalog);assert.equal(visibleWind()[0].alpha,before,'Pause does not age trail');
 p.render(frame,.55,rosterCatalog);assert.equal(visibleWind().length,0,'finite260ms after real release');p.destroy();assert.ok(scene.objects.every(o=>o.destroyed));assert.equal(scene.budget().bytes,0);
});
test('Heavy whiff has static reduced-motion sweep but never contact; KO cleans it',async()=>{
 const scene=assetScene(),p=new AssetPresenter(scene,{cache:createAssetCache({transport:pngTransport}),reducedMotion:true});await p.prepare([rosterCatalog.P1]);const frame={allies:[{instanceId:'a',definitionId:'P1',hp:10,x:0,y:0}],enemies:[]};
 p.cast({actorId:'a',category:'heavy',actionId:'h',phase:'start',startedAt:0,origin:{x:0,y:0},target:{x:1,y:0}},rosterCatalog.P1,0);
 p.cast({actorId:'a',category:'heavy',actionId:'h',phase:'resolve',resolvedAt:.28,hit:false},rosterCatalog.P1,.28);p.render(frame,.3,rosterCatalog);
 assert.ok(scene.objects.some(o=>!o.destroyed&&o.visible&&o.alpha>0&&o.texture?.endsWith('lushu.heavyWind')));assert.ok(!p.actionEffects.get('a')?.get('contact')?.visible);
 frame.allies[0].hp=0;p.render(frame,.31,rosterCatalog);assert.ok(!scene.objects.some(o=>!o.destroyed&&o.visible&&o.texture?.endsWith('lushu.heavyWind')));p.destroy();
});
test('readable sweep retention is validated opt-in presentation data, Basic stays unchanged',()=>{
 const heavy=rosterCatalog.P1.actionDescriptors.heavy;assert.equal(heavy.blade.holdAfterResolveMs,260);assert.equal(rosterCatalog.P1.actionDescriptors.basic.blade.holdAfterResolveMs,undefined);
 for(const value of [0,-1,1001,'260',null])assert.throws(()=>actionDescriptor({...heavy,blade:{...heavy.blade,holdAfterResolveMs:value}}));
});
