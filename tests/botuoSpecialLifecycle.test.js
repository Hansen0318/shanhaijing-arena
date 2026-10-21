import test from 'node:test';
import assert from 'node:assert/strict';
import {createLabConfig} from '../src/dev/battleLab/config.js';
import {createLabBattleSession} from '../src/dev/battleLab/battleFactory.js';
import {BattleStatuses} from '../src/combat/statuses.js';

function fixture(tier='T0',legacy=false){
 const s=createLabBattleSession(createLabConfig({allyTeam:['P2','P3','P4'],enemyTeam:['P2','P5','P3'],allyTier:tier,enemyTier:tier}),{tacticalEnabled:false,rng:()=>.99});
 for(const a of s.actors){Object.assign(a,{x:10,y:10});s.cadence.set(a.instanceId,99);for(const c of ['heavy','special','awakening'])Object.assign(a.abilityState[c],{phase:'cooldown',cooldownRemaining:99});}
 const a=s.actorById('a1'),ally=s.actorById('a2'),enemy=s.actorById('e1');Object.assign(a,{x:0,y:0});Object.assign(ally,{x:1,y:0});Object.assign(enemy,{x:.7,y:0});Object.assign(a.abilityState.special,{phase:'ready',cooldownRemaining:0});
 if(legacy){const d=s.actorAbilityDefinitions.get(a.instanceId);s.actorAbilityDefinitions.set(a.instanceId,{...d,'P2.special':{...d['P2.special'],presentation:null}});}
 return {s,a,ally,enemy};
}
const mechanicalRecords=s=>[...s.statuses.records.values()].map(({presentationSource,...r})=>r);
for(const tier of ['T0','T1','T2','T3'])test(`utility observation preserves real instant combat and Tier recipients ${tier}`,()=>{
 const f=fixture(tier),old=fixture(tier,true);assert.ok(f.s.executeAbility(f.a,'special','player'));assert.ok(old.s.executeAbility(old.a,'special','player'));
 const [event]=f.s.drainCastEvents();assert.equal(event.abilityId,'P2.special');assert.equal(event.eventAt,0);assert.equal(event.presentationId,'utility.1');assert.equal(event.phase,undefined);assert.equal(event.hit,true);
 assert.deepEqual(f.s.snapshot(),old.s.snapshot());assert.deepEqual(f.a.abilityState,old.a.abilityState);assert.deepEqual(mechanicalRecords(f.s),mechanicalRecords(old.s));
 const records=[...f.s.statuses.records.values()];assert.equal(records.length,tier==='T0'?1:2);
 assert.deepEqual(records[0].presentationSource,{abilityId:'P2.special',category:'special',effectId:'primary'});
 assert.ok(Object.isFrozen(records[0].presentationSource));if(tier!=='T0'){assert.equal(records[1].targetId,f.ally.instanceId);assert.equal(records[1].presentationSource.effectId,'boyi.ally');}
 for(const x of [f,old]){Object.assign(x.a.abilityState.heavy,{phase:'ready',cooldownRemaining:0});assert.ok(x.s.executeAbility(x.a,'heavy','player',x.enemy));}
 assert.deepEqual(f.s.snapshot(),old.s.snapshot());assert.deepEqual(f.s.drainDamageEvents(),old.s.drainDamageEvents());assert.equal(f.s.statuses.damageMultiplier(f.a.instanceId,0),old.s.statuses.damageMultiplier(old.a.instanceId,0));assert.equal(f.s.pendingActions.size,0);
 f.a.x+=.2;assert.equal(f.s.statuses.forActor(f.a.instanceId,0).length,1);assert.equal(f.s.drainCastEvents().some(e=>e.category==='special'),false);
});
test('failed utility readiness/control produces no new observation or status',()=>{
 const {s,a}=fixture();a.abilityState.special.phase='cooldown';assert.equal(s.executeAbility(a,'special','player'),false);assert.equal(s.drainCastEvents().length,0);assert.equal(s.statuses.records.size,0);
 a.abilityState.special.phase='ready';s.statuses.apply({type:'control',sourceId:'e1',targetId:a.instanceId,magnitude:1,duration:1},0);assert.equal(s.executeAbility(a,'special','player'),false);assert.equal(s.drainCastEvents().length,0);
});
test('optional source ownership is cloned, refreshes identity, and keeps MAX/KO/expiry semantics',()=>{
 const s=new BattleStatuses(),source={abilityId:'test.special',category:'special',effectId:'primary'};
 const first=s.applyMitigation('a',.25,4,0,source);source.abilityId='mutated';assert.equal(first.presentationSource.abilityId,'test.special');
 const second=s.applyMitigation('a',.25,4,1,{abilityId:'test.special',category:'special',effectId:'primary'});assert.notEqual(second.id,first.id);assert.equal(s.records.size,1);
 s.apply({type:'mitigation',key:'ally',sourceId:'b',targetId:'a',magnitude:.3,duration:2},1);assert.equal(s.damageMultiplier('a',1),.7);s.cleanupKO(new Set(['b']));assert.equal(s.damageMultiplier('a',1),.75);s.expire(5);assert.equal(s.records.size,0);
 assert.throws(()=>s.applyMitigation('a',.25,4,0,{abilityId:42,category:'special',effectId:'primary'}),/presentation/i);
});
