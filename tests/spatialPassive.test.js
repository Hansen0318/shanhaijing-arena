import test from 'node:test';import assert from 'node:assert/strict';
import {createPassiveDefinition} from '../src/combat/passiveDefinition.js';
import {PassiveRuntime} from '../src/combat/passiveRuntime.js';
import {BattleStatuses} from '../src/combat/statuses.js';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
export const armorDefinition=()=>({id:'future-creature.shell',name:'護甲',category:'passive',implemented:true,trigger:{kind:'spatial-pressure',enemyRadius:2.2,allyRadius:2.4,allyEnemyRadius:2.2},cooldownSeconds:8,tierMagnitudes:{T0:.2,T1:.3,T2:.4,T3:.5},effect:{kind:'status',type:'mitigation',magnitude:.2,duration:4},presentation:{style:'guard-plates'}});
function fixture({tier='T0',two=false}={}){
 const a={instanceId:'anonymous-1',hp:100,teamId:'blue',x:0,y:0},ally={instanceId:'friend',hp:100,teamId:'blue',x:8,y:0},enemy={instanceId:'red',hp:100,teamId:'red',x:8,y:1},actors=[a,ally,enemy];
 if(two)actors.push({...a,instanceId:'anonymous-2',x:-1});
 const d=armorDefinition(),statuses=new BattleStatuses(),runtime=new PassiveRuntime({actors,statuses,tierForActor:()=>tier,characterForActor:actor=>({stats:{moveSpeed:2},abilities:{passives:actor.instanceId.startsWith('anonymous')?[d.id]:[]}}),abilityDefinitions:{[d.id]:d}});
 return {a,ally,enemy,actors,statuses,runtime};
}
test('shared armor definition accepts immutable non-character data and rejects unsafe defense/geometry',()=>{
 const input=armorDefinition(),d=createPassiveDefinition(input);input.trigger.enemyRadius=9;assert.equal(d.trigger.enemyRadius,2.2);assert.equal(d.effect.type,'mitigation');assert.ok(Object.isFrozen(d.tierMagnitudes));assert.equal(d.presentation.style,'guard-plates');
 for(const patch of [{effect:{...d.effect,magnitude:.51}},{tierMagnitudes:{T0:.2,T1:.3,T2:.4,T3:.51}},{tierMagnitudes:{T0:.2}},{trigger:{...d.trigger,enemyRadius:NaN}},{trigger:{...d.trigger,allyRadius:0}},{trigger:{...d.trigger,allyEnemyRadius:21}},{effect:{...d.effect,type:'incoming'}},{tierMagnitudes:{T0:.4,T1:.3,T2:.4,T3:.5}}])assert.throws(()=>createPassiveDefinition({...armorDefinition(),...patch}));
});
test('frontline radius includes boundary, excludes KO enemies and nearby ally alone',()=>{
 const f=fixture(),r=f.runtime;assert.equal(r.hasSpatial(),true);assert.equal(r.settle(0).length,0);Object.assign(f.ally,{x:1,y:0});assert.equal(r.settle(.1).length,0);Object.assign(f.enemy,{x:2.200001,y:0});assert.equal(r.settle(.2).length,1,'near threatened ally is a valid second branch');
 const g=fixture();Object.assign(g.enemy,{x:2.200001,y:0});assert.equal(g.runtime.settle(0).length,0);g.enemy.x=2.2;g.enemy.hp=0;assert.equal(g.runtime.settle(.1).length,0);g.enemy.hp=100;assert.equal(g.runtime.settle(.2).length,1);
});
test('near threatened teammate branch excludes self and includes both radius boundaries',()=>{
 const f=fixture();Object.assign(f.ally,{x:2.4,y:0});Object.assign(f.enemy,{x:4.6,y:0});assert.equal(f.runtime.settle(0).length,1);
 const g=fixture();Object.assign(g.ally,{x:2.40001,y:0});Object.assign(g.enemy,{x:4.60001,y:0});assert.equal(g.runtime.settle(0).length,0);g.ally.hp=0;g.ally.x=2.4;assert.equal(g.runtime.settle(.1).length,0);
});
test('all four tiers change actual damage multiplier without Tier double scaling',()=>{
 for(const [tier,amount]of Object.entries({T0:.2,T1:.3,T2:.4,T3:.5})){const f=fixture({tier});f.enemy.x=1;f.runtime.settle(0);near(f.statuses.damageMultiplier(f.a.instanceId,0),1-amount);const v=f.runtime.snapshot(0)[0];assert.equal(v.effectType,'mitigation');assert.equal(v.triggerKind,'spatial-pressure');near(v.active.contribution,amount);assert.equal(v.active.effective,true);assert.equal(v.presentation.segments,{T0:1,T1:2,T2:3,T3:4}[tier]);assert.equal('effectiveMoveSpeed'in v,false);assert.equal('progressDistance'in v,false);}
});
test('CD from activation, no refresh on leaving, repeat at ready, pure snapshot and ordinary path isolation',()=>{
 const f=fixture();f.enemy.x=1;assert.equal(f.runtime.nextSpatialBoundary(0,1),0);f.runtime.settle(0);const before=JSON.stringify(f.runtime.snapshot(0));f.runtime.snapshot(0);assert.equal(JSON.stringify(f.runtime.snapshot(0)),before);assert.equal(f.runtime.nextSpatialBoundary(1,9),8);
 f.enemy.x=9;f.runtime.settle(1);assert.equal(f.runtime.snapshot(3.9)[0].active.expiryTime,4);assert.equal(f.runtime.snapshot(4)[0].active,null);f.enemy.x=1;assert.equal(f.runtime.settle(7.99).length,0);assert.equal(f.runtime.settle(8).length,1);assert.equal(f.runtime.snapshot(8)[0].readyAt,16);
 const segment={kind:'ordinary',start:8,end:9,from:{x:0,y:0},to:{x:2,y:0}};assert.equal(f.runtime.nextBoundary(f.a.instanceId,segment),null);f.runtime.appendOrdinary(f.a.instanceId,segment);assert.equal(f.runtime.entries.get(f.a.instanceId)[0].samples.length,0);
});
test('MAX contribution suppressed then resumes on independent expiry; control prevents new activation only',()=>{
 const f=fixture();f.enemy.x=1;f.statuses.apply({sourceId:'red',targetId:f.a.instanceId,type:'control',magnitude:1,duration:1},0);assert.equal(f.runtime.settle(0).length,0);assert.notEqual(f.runtime.nextSpatialBoundary(0,.5),0);f.runtime.settle(1);
 f.statuses.apply({sourceId:f.a.instanceId,targetId:f.a.instanceId,type:'mitigation',key:'special',magnitude:.25,duration:2},1);assert.equal(f.runtime.snapshot(1)[0].active.effective,false);near(f.statuses.damageMultiplier(f.a.instanceId,1),.75);assert.equal(f.runtime.snapshot(3)[0].active.effective,true);
 f.statuses.apply({sourceId:'red',targetId:f.a.instanceId,type:'control',magnitude:1,duration:1},3);assert.ok(f.runtime.snapshot(3)[0].active);
});
test('instances and enemies share generic engine; KO and clear remove owned records only',()=>{
 const f=fixture({two:true});f.enemy.x=1;assert.equal(f.runtime.settle(0).length,2);f.a.hp=0;f.runtime.settle(.1);assert.equal(f.runtime.snapshot(.1).length,1);assert.equal(f.statuses.forActor('anonymous-1',.1).length,0);f.enemy.hp=0;f.ally.hp=0;assert.ok(f.runtime.snapshot(.2)[0].active);f.runtime.clear();assert.equal(f.statuses.records.size,0);assert.deepEqual(f.runtime.snapshot(.2),[]);
 const g=fixture();g.a.teamId='red';g.enemy.teamId='blue';g.enemy.x=1;assert.equal(g.runtime.settle(0).length,1);
});
