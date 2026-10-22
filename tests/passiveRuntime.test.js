import test from 'node:test';import assert from 'node:assert/strict';
import {BattleStatuses} from '../src/combat/statuses.js';
const api=await import('../src/combat/passiveRuntime.js').catch(e=>{if(e.code==='ERR_MODULE_NOT_FOUND')return {};throw e;});
const definition=()=>({id:'runner.passive',name:'疾行',category:'passive',implemented:true,trigger:{kind:'ordinary-distance',distance:1,windowSeconds:2},cooldownSeconds:4,effect:{kind:'status',type:'movement',magnitude:1.08,duration:2},presentation:{label:'疾行'}});
function fixture({enabled=true,two=false}={}){
 assert.equal(typeof api.PassiveRuntime,'function','distance passive runtime is not implemented');
 const actors=[{instanceId:'unit-x',hp:100},...(two?[{instanceId:'unit-y',hp:100}]:[])],statuses=new BattleStatuses(),d=definition();d.implemented=enabled;
 const runtime=new api.PassiveRuntime({actors,characterForActor:()=>({stats:{moveSpeed:2},abilities:{passives:[d.id]}}),abilityDefinitions:{[d.id]:d},statuses});return {actors,statuses,runtime};
}
const segment=(start,end,x0,x1,y0=0,y1=0)=>({start,end,from:{x:x0,y:y0},to:{x:x1,y:y1},kind:'ordinary'});
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`);
test('distance threshold is predicted exactly without mutation and fires once with real status expiry and CD',()=>{
 const {runtime:r,statuses}=fixture(),before=JSON.stringify(r.snapshot(0));
 near(r.nextBoundary('unit-x',segment(0,1,0,2)),.5);assert.equal(JSON.stringify(r.snapshot(0)),before);
 r.appendOrdinary('unit-x',segment(0,.5,0,1));const activations=r.settle(.5);assert.equal(activations.length,1);assert.equal(r.settle(.5).length,0);
 const view=r.snapshot(.5)[0];near(view.active.startTime,.5);near(view.active.expiryTime,2.5);near(view.readyAt,4.5);near(view.effectiveMoveSpeed,2.16);assert.equal(view.active.statusId,activations[0].statusId);
 assert.equal(statuses.forActor('unit-x',.5).length,1);assert.equal(r.snapshot(2.5)[0].active,null);assert.ok(Object.isFrozen(view));
});
test('cooldown movement is discarded and progress resumes empty at the exact ready boundary',()=>{
 const {runtime:r}=fixture();r.appendOrdinary('unit-x',segment(0,.5,0,1));r.settle(.5);
 near(r.nextBoundary('unit-x',segment(.5,5,1,10)),2.5);
 r.appendOrdinary('unit-x',segment(.5,4.5,1,9));r.settle(4.5);near(r.snapshot(4.5)[0].progressDistance,0);
 r.appendOrdinary('unit-x',segment(4.5,5,9,10));assert.equal(r.settle(5).length,1);near(r.snapshot(5)[0].readyAt,9);
});
test('rolling window clips a partial old segment and forgets stopped gaps without endpoint shortcut',()=>{
 const {runtime:r}=fixture();r.appendOrdinary('unit-x',segment(0,1,0,.8));r.settle(1);
 near(r.snapshot(2.5)[0].progressDistance,.4);
 r.appendOrdinary('unit-x',segment(3,3.4,.8,1.4));r.settle(3.4);near(r.snapshot(3.4)[0].progressDistance,.6);assert.equal(r.snapshot(3.4)[0].active,null);
 r.appendOrdinary('unit-x',segment(3.4,3.6,1.4,1.4,0,.4));assert.equal(r.settle(3.6).length,1);
});
test('window loss changes threshold slope and solver handles it before the next breakpoint',()=>{
 const {runtime:r}=fixture();r.appendOrdinary('unit-x',segment(0,1,0,.8));r.settle(1);
 // At2.5 old distance=.4; new speed2 loses old speed.8, so crosses after .5.
 near(r.nextBoundary('unit-x',segment(2.5,3.5,.8,2.8)),3);
});
test('below threshold, zero-distance walls and non-ordinary/replayed input do not fabricate triggers',()=>{
 const {runtime:r}=fixture();r.appendOrdinary('unit-x',segment(0,.5,0,1-1e-7));assert.equal(r.settle(.5).length,0);
 r.appendOrdinary('unit-x',segment(.5,1,1,1));assert.equal(r.settle(1).length,0);
 const before=JSON.stringify(r.snapshot(1));
 for(const s of [segment(0,.5,0,1),{...segment(1,2,1,9),kind:'skill'},segment(1,1,1,2),{...segment(1,2,1,2),to:{x:NaN,y:0}}])assert.throws(()=>r.appendOrdinary('unit-x',s));
 assert.equal(JSON.stringify(r.snapshot(1)),before);
});
test('separate instances, external status removal and KO cleanup never leave ghost active state',()=>{
 const {runtime:r,statuses,actors}=fixture({two:true});r.appendOrdinary('unit-x',segment(0,.5,0,1));r.settle(.5);
 assert.equal(r.snapshot(.5).find(v=>v.instanceId==='unit-y').active,null);
 statuses.records.clear();assert.equal(r.snapshot(1)[0].active,null);assert.equal(r.settle(1).length,0);near(r.snapshot(1)[0].readyAt,4.5);
 actors[0].hp=0;r.settle(1);assert.equal(r.snapshot(1).some(v=>v.instanceId==='unit-x'),false);
 r.clear();assert.deepEqual(r.snapshot(1),[]);
});
test('movement cap and independent expiration use the existing status owner, not a second multiplier',()=>{
 const {runtime:r,statuses}=fixture();statuses.apply({sourceId:'unit-x',targetId:'unit-x',key:'tier-speed',type:'movement',magnitude:1.1,duration:1},0);
 r.appendOrdinary('unit-x',segment(0,.5,0,1));r.settle(.5);near(r.snapshot(.5)[0].effectiveMoveSpeed,2.3);assert.equal(r.snapshot(.5)[0].movementCapReached,true);
 near(r.snapshot(1)[0].effectiveMoveSpeed,2.16);assert.equal(r.snapshot(1)[0].movementCapReached,false);
});
test('same-time control or KO prevents activation and disabled passives leave no runtime state',()=>{
 const {runtime:r,statuses,actors}=fixture();r.appendOrdinary('unit-x',segment(0,.5,0,1));statuses.apply({sourceId:'enemy',targetId:'unit-x',key:'stun',type:'control',magnitude:1,duration:.3},.5);assert.equal(r.settle(.5).length,0);
 assert.equal(r.settle(.8).length,0);actors[0].hp=0;r.settle(.8);assert.deepEqual(r.snapshot(.8),[]);
 const disabled=fixture({enabled:false}).runtime;assert.equal(disabled.enabled(),false);assert.deepEqual(disabled.snapshot(0),[]);
});
