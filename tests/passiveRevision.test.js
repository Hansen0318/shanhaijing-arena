import test from 'node:test';
import assert from 'node:assert/strict';
import {passiveFixture,stepHeld} from './helpers/passiveFixture.js';
import {BattleStatuses} from '../src/combat/statuses.js';
import {PassivePresenter} from '../src/runtime/passivePresenter.js';
import {createPassiveDefinition} from '../src/combat/passiveDefinition.js';
import {formalAbilityDefinitions} from '../src/roster/abilities.js';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
test('P1 passive has substantial distinct Tier gains, exact expiry and cooldown',()=>{
 for(const [tier,gain] of [['T0',.35],['T1',.50],['T2',.65],['T3',.80]])for(const enemy of [false,true]){
  const {session:s,actor:a}=passiveFixture({tier,enemy});const base=s.definitionForActor(a).stats.moveSpeed;
  s.setPlayerMovement(a.instanceId,{x:1,y:0});stepHeld(s,1/base);
  const v=s.snapshot().passives.find(v=>v.instanceId===a.instanceId);near(v.effectiveMoveSpeed/base,1+gain);near(v.active.expiryTime-v.active.startTime,3);near(v.readyAt-v.active.startTime,6);
  s.setPlayerMovement(a.instanceId,{x:0,y:0});stepHeld(s,3);near(s.statuses.movementMultiplier(a.instanceId,s.elapsedSeconds),1);
 }
});
test('strong movement is explicitly bounded; ordinary and outgoing caps retain 15 percent',()=>{
 const s=new BattleStatuses(),base={sourceId:'x',targetId:'x',type:'movement',duration:2};
 assert.throws(()=>s.apply({...base,magnitude:1.8},0));
 s.apply({...base,key:'passive',magnitude:1.8,data:{movementBonusCap:.95}},0);
 s.apply({...base,key:'other',magnitude:1.15},0);near(s.movementMultiplier('x',0),1.95);
 s.expire(2);s.apply({...base,magnitude:1.15},2);s.apply({...base,key:'second',magnitude:1.15},2);near(s.movementMultiplier('x',2),1.15);
 assert.throws(()=>s.apply({...base,type:'outgoing',magnitude:1.8,data:{movementBonusCap:.95}},2));
 for(const cap of [NaN,Infinity,-1,.14,1.01])assert.throws(()=>s.apply({...base,magnitude:1.8,data:{movementBonusCap:cap}},2));
});
test('Tier tables reject incomplete, unsupported or out of bounds values and preserve immutable data',()=>{
 const p=formalAbilityDefinitions['P1.passive'];
 for(const tierMagnitudes of [{T0:1.35},{...p.tierMagnitudes,T4:1.9},{...p.tierMagnitudes,T3:2},{...p.tierMagnitudes,T2:NaN}])assert.throws(()=>createPassiveDefinition({...p,tierMagnitudes}));
 assert.ok(Object.isFrozen(p.tierMagnitudes));assert.ok(Object.isFrozen(p.effect.data));
});
test('passive presentation creates no battlefield text, badges, HUD or leader lines',()=>{
 const created=[];const scene={add:new Proxy({}, {get:(_,type)=>(()=>{created.push(type);throw Error('Unexpected passive display object');})})};
 const presenter=new PassivePresenter(scene,{project:p=>p});presenter.render({views:[{active:{}}]});presenter.destroy();assert.deepEqual(created,[]);
});
