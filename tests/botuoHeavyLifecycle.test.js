import test from 'node:test';
import assert from 'node:assert/strict';
import {createLabConfig} from '../src/dev/battleLab/config.js';
import {createLabBattleSession} from '../src/dev/battleLab/battleFactory.js';
function fixture({tactical=true,tier='T0',sign=1,legacy=false}={}){
 const s=createLabBattleSession(createLabConfig({allyTeam:['P2','P3','P4'],enemyTeam:['P2','P5','P3'],allyTier:tier,enemyTier:tier}),{tacticalEnabled:tactical,rng:()=>.99});
 for(const a of s.actors){Object.assign(a,{x:10,y:10});s.cadence.set(a.instanceId,99);for(const cat of ['heavy','special','awakening'])Object.assign(a.abilityState[cat],{phase:'cooldown',cooldownRemaining:99});}
 const a=s.actorById('a1'),t=s.actorById('e1');Object.assign(a,{x:0,y:0});Object.assign(t,{x:sign*.7,y:0});Object.assign(a.abilityState.heavy,{phase:'ready',cooldownRemaining:0});
 if(legacy){const table=s.actorAbilityDefinitions.get(a.instanceId);s.actorAbilityDefinitions.set(a.instanceId,{...table,'P2.heavy':{...table['P2.heavy'],presentation:null}});}
 const step=dt=>{for(const actor of s.actors){s.holdPlayerControl(actor.instanceId);s.setPlayerMovement(actor.instanceId,{x:0,y:0});}s.step(dt);};
 return {s,a,t,step};
}
for(const tactical of [false,true])for(const tier of ['T0','T1','T2','T3'])for(const sign of [-1,1])test(`Heavy A is presentation-only tactical=${tactical} ${tier} facing=${sign}`,()=>{
 const f=fixture({tactical,tier,sign}),old=fixture({tactical,tier,sign,legacy:true});
 assert.ok(f.s.executeAbility(f.a,'heavy','player',f.t));assert.ok(old.s.executeAbility(old.a,'heavy','player',old.t));
 const events=f.s.drainCastEvents();assert.equal(events[0]?.phase,'start','observational start exists');
 if(tactical){assert.equal(events.length,1);assert.equal(f.t.hp,old.t.hp);}
 else {assert.equal(events[1].phase,'resolve');assert.equal(events[1].resolvedAt,0);assert.equal(events[1].hit,true);}
 for(let i=0;i<16;i++){
  assert.deepEqual(f.s.snapshot(),old.s.snapshot(),'all real HP/positions/timing match old engine');
  assert.deepEqual(f.a.abilityState,old.a.abilityState,'cooldown phases unchanged');
  assert.deepEqual(f.s.drainDamageEvents(),old.s.drainDamageEvents(),'real damage events unchanged');
  f.step(.05);old.step(.05);events.push(...f.s.drainCastEvents());
 }
 const resolves=events.filter(e=>e.phase==='resolve');assert.equal(resolves.length,1);
 assert.equal(resolves[0].actionId,events[0].actionId);assert.equal(resolves[0].hit,true);
 assert.equal(f.s.pendingActions.size,0,'no new simulation action lock');
});
for(const tactical of [false,true])test(`Heavy A manual whiff is immediate F3-ready, no fake hit tactical=${tactical}`,()=>{
 const {s,a,t}=fixture({tactical,sign:-1});t.x=8;
 assert.ok(s.executeAbility(a,'heavy','player',t,{facingX:-1}));const es=s.drainCastEvents();
 assert.deepEqual(es.map(e=>e.phase),['start','resolve']);assert.equal(es[1].resolvedAt,0);assert.equal(es[1].hit,false);
 assert.equal(es[0].attackTarget.x,-1);assert.equal(s.drainDamageEvents().length,0);assert.equal(s.delayedImpacts.size,0);
 assert.equal(a.abilityState.heavy.cooldownRemaining,4);
});
test('Heavy A source KO and scene clear terminate only presentation at existing cancellation points',()=>{
 for(const clear of [false,true]){
  const {s,a,t,step}=fixture();s.executeAbility(a,'heavy','player',t);const start=s.drainCastEvents()[0];
  if(clear)s.clearTransientCombat({preserveEvents:true});else{a.damage(a.hp);step(.01);}
  const es=s.drainCastEvents();assert.equal(es.at(-1)?.phase,'cancel');assert.equal(es.at(-1).actionId,start.actionId);
  assert.equal(s.drainDamageEvents().length,0);assert.equal(s.delayedImpacts.size,0);
 }
});
