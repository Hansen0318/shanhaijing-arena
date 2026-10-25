import test from 'node:test';
import assert from 'node:assert/strict';
import {TelegraphPresenter} from '../src/runtime/telegraphs.js';
import {rosterCatalog} from '../src/roster/catalog.js';
import {containsDanger} from '../src/combat/threats.js';
import {arenaToStage} from '../src/runtime/arenaProjection.js';

const threat={id:'warning',sourceId:'renamed',sourceTeamId:'allies',category:'heavy',createdAtMs:0,impactAtMs:1000,geometry:{shape:'lane',origin:{x:2,y:-1},center:{x:6,y:1},radius:.6}};
function fixture(options={}){
 const calls=[];const graphics=new Proxy({destroy(){calls.push(['destroy']);}},{get(o,k){return k in o?o[k]:(...args)=>{calls.push([k,...args]);return graphics;};}});
 const presenter=new TelegraphPresenter({add:{graphics:()=>graphics}},arenaToStage,options);calls.length=0;
 return {calls,presenter};
}
test('explicit formal warning source replaces old capsule outlines and center line',()=>{
 const source=rosterCatalog.P1.warningDescriptors?.heavy;
 assert.ok(source,'developed skill needs a distinct warning source');
 const {calls,presenter}=fixture({warningSource:()=>source});presenter.render([threat],250);
 assert.ok(calls.some(c=>c[0]==='fillPath'));
 assert.equal(calls.filter(c=>['strokeEllipse','lineBetween'].includes(c[0])).length,0);
 assert.equal(presenter.presentations.get(threat.id).mode,'formal');
});
test('formal coverage uses projected true capsule caps and circle under anisotropic projection',()=>{
 for(const shape of ['circle','lane'])for(const center of [{x:6,y:1},{x:2,y:3},{x:2,y:-1}]){
  const t={...threat,geometry:{...threat.geometry,shape,center}};
  const {presenter}=fixture({warningSource:()=>rosterCatalog.P3.warningDescriptors.heavy});presenter.render([t],700);
  const view=presenter.presentations.get(t.id);assert.equal(view.mode,'formal');
  // All silhouette samples lie on the same combat boundary, including both caps.
  for(const v of view.boundary){assert.ok(containsDanger(v,{...t.geometry,radius:t.geometry.radius+1e-8}));assert.equal(containsDanger(v,{...t.geometry,radius:t.geometry.radius-1e-8}),false);}
  assert.deepEqual(view.projectedBoundary,view.boundary.map(arenaToStage));
  assert.equal(view.progress,.7);
 }
});
test('no source, invalid source and unsupported coverage preserve one original fallback',()=>{
 for(const source of [null,{renderer:'unknown'}, {...rosterCatalog.P1.warningDescriptors?.heavy,shapes:['circle']}]){
  const {calls,presenter}=fixture({warningSource:()=>source});presenter.render([threat],300);
  assert.equal(calls.filter(c=>c[0]==='strokeEllipse').length,2);
  assert.equal(presenter.presentations.get(threat.id).mode,'fallback');
 }
});
test('formal warning retains team distinction, impact progression, pause and bounded lifecycle',()=>{
 for(const reducedMotion of [false,true]){
  const {calls,presenter}=fixture({warningSource:()=>rosterCatalog.P2.warningDescriptors.awakening,reducedMotion});
  presenter.render([threat],200);const early=JSON.stringify(calls);calls.length=0;presenter.render([threat],200);assert.equal(JSON.stringify(calls),early);
  calls.length=0;presenter.render([threat],850);assert.notEqual(JSON.stringify(calls),early);
  const ally=presenter.presentations.get(threat.id).color;
  presenter.render([{...threat,sourceTeamId:'enemies'}],850);assert.notEqual(presenter.presentations.get(threat.id).color,ally);
  presenter.render([],850);assert.equal(presenter.presentations.size,0);
  presenter.destroy();presenter.destroy();assert.equal(calls.filter(c=>c[0]==='destroy').length,1);
 }
});
test('only explicitly authored warning descriptors resolve; future roster retains fallback',()=>{
 for(const id of ['P1','P2','P3'])for(const category of ['basic','heavy','special','awakening'])assert.equal(rosterCatalog[id].warningDescriptors?.[category]?.renderer,'ground-sigil-v1');
 for(const id of ['P4','P5'])assert.equal(rosterCatalog[id].warningDescriptors,undefined);
});
test('cast warning source does not suppress a persistent area and resolver failure retains warning',()=>{
 const area={...threat,id:'area',startTime:0,expiryTime:2,geometry:{...threat.geometry,shape:'circle'}};
 const {presenter}=fixture({warningSource:()=>rosterCatalog.P1.warningDescriptors.heavy});
 presenter.render([threat],500,[area]);
 assert.equal(presenter.presentations.get('area').mode,'fallback');
 assert.equal(presenter.presentations.get(threat.id).mode,'formal');
 const broken=fixture({warningSource:()=>{throw Error('source unavailable');}}).presenter;
 broken.render([threat],500);assert.equal(broken.presentations.get(threat.id).mode,'fallback');
});
