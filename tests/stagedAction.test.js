import test from 'node:test';
import assert from 'node:assert/strict';
import {makeWindupFixture} from './helpers/basicWindup.js';
import {createAbilityDefinition} from '../src/combat/ability.js';
import {formalAbilityDefinitions} from '../src/roster/abilities.js';
function fixture(sign=1,tier='T0'){
 const f=makeWindupFixture({tier});Object.assign(f.actor,{x:4,y:0});Object.assign(f.target,{x:4+2*sign,y:0});
 for(const a of f.session.actors)f.session.holdPlayerControl(a.instanceId);
 Object.assign(f.actor.abilityState.awakening,{phase:'ready',cooldownRemaining:0});
 return {...f,step(dt){for(const a of f.session.actors)f.session.holdPlayerControl(a.instanceId);f.session.step(dt);}};
}
test('shared staged schema rejects malformed routes and preserves immutable opt in',()=>{
 const base=formalAbilityDefinitions['P1.awakening'];assert.equal(base.stagedAction.segments.length,3);
 assert.throws(()=>createAbilityDefinition({...base,stagedAction:{...base.stagedAction,segments:[{startMs:100,centerMs:50,endMs:200,coefficient:1,overrun:.5}]}}));
 assert.ok(Object.isFrozen(base.stagedAction.segments));
});
for(const sign of [1,-1])test(`real staged route and collision chronology sign=${sign}`,()=>{
 const f=fixture(sign),s=f.session;assert.ok(s.executeAbility(f.actor,'awakening','player',f.target));
 assert.equal(s.drainDamageEvents().length,0);f.step(.61);
 const events=s.drainCastEvents(),hits=s.drainDamageEvents();assert.equal(hits.length,3);
 const expected=[.10175,.15423076923076923,.35];hits.forEach((e,i)=>{assert.equal(e.hitIndex,i);assert.ok(Math.abs(e.eventAt-expected[i])<1e-8,`${e.eventAt} != ${expected[i]}`);});
 assert.ok(Math.abs(f.actor.x-(4+2.65*sign))<1e-8);assert.equal(s.pendingActions.size,0);
 assert.deepEqual(events.filter(e=>e.phase==='segment').map(e=>e.eventAt),[.08,.135,.28]);
 assert.equal(events.at(-1).phase,'end');assert.ok(Math.abs(events.at(-1).eventAt-.61)<1e-9);
 assert.equal(new Set(hits.map(e=>`${e.actionId}/${e.hitIndex}`)).size,3);
});
test('manual out of range cast remains empty with no RNG or HP changes',()=>{
 let rolls=0;const f=fixture();f.session.random=()=>{rolls++;return .5;};f.target.x=10;
 const hp=f.target.hp;f.session.executeAbility(f.actor,'awakening','player',f.target);f.step(.61);
 assert.equal(f.target.hp,hp);assert.equal(rolls,0);assert.equal(f.session.drainDamageEvents().length,0);
 assert.deepEqual(f.session.drainCastEvents().filter(e=>e.phase==='resolve').map(e=>e.hit),[false,false,false]);
});
test('nonzero joystick cancels without refund and zero vector preserves cast',()=>{
 const f=fixture(),s=f.session;s.executeAbility(f.actor,'awakening','player',f.target);s.setPlayerMovement('a1',{x:0,y:0});assert.equal(s.pendingActions.size,1);
 s.setPlayerMovement('a1',{x:1,y:0});assert.equal(s.pendingActions.size,0);assert.equal(f.actor.abilityState.awakening.cooldownRemaining,12);f.step(.61);assert.equal(s.drainDamageEvents().length,0);
});
for(const mask of ['000','001','010','011','100','101','110','111'])test(`independent real relative moving-target mask ${mask}`,()=>{
 const f=fixture(),s=f.session;
 // A fast test actor makes escape/crossing unambiguous inside each short real leg.
 const td=s.actorCharacterDefinitions.get(f.target.instanceId);s.actorCharacterDefinitions.set(f.target.instanceId,{...td,stats:{...td.stats,moveSpeed:100}});
 s.executeAbility(f.actor,'awakening','player',f.target);
 const starts=[.08,.135,.28],ends=[.135,.28,.47];
 for(let i=0;i<3;i++){
  const before=starts[i]-s.elapsedSeconds-1e-7;if(before>0)f.step(before);
  Object.assign(f.target,{x:f.actor.x+(f.actor.x<5?2:-2),y:0});s.playerMovement.set('e1',{x:0,y:0});f.step(starts[i]-s.elapsedSeconds);
  s.playerMovement.set('e1',{x:0,y:mask[i]==='1'?0:1});
  f.step(ends[i]-s.elapsedSeconds-1e-7);
 }
 f.step(.61-s.elapsedSeconds);
 const resolved=s.drainCastEvents().filter(e=>e.phase==='resolve');assert.equal(resolved.length,3);assert.equal(resolved.map(e=>+e.hit).join(''),mask);
 assert.equal(s.drainDamageEvents().length,[...mask].filter(c=>c==='1').length);
});
for(const kind of ['source_ko','control','clear','target_ko'])test(`staged lifecycle ${kind} safely clears or whiffs remaining segments`,()=>{
 const f=fixture(),s=f.session;s.executeAbility(f.actor,'awakening','player',f.target);f.step(.12);s.drainDamageEvents();s.drainCastEvents();
 if(kind==='source_ko')f.actor.damage(f.actor.hp);
 if(kind==='target_ko')f.target.damage(f.target.hp);
 if(kind==='control')s.statuses.apply({sourceId:'e2',targetId:'a1',type:'control',magnitude:1,duration:.5},s.elapsedSeconds);
 if(kind==='clear')s.clearTransientCombat({preserveEvents:true});
 f.step(.49);assert.equal(s.drainDamageEvents().length,0);assert.equal(s.pendingActions.size,0);
 const events=s.drainCastEvents();assert.ok(events.some(e=>e.phase===(kind==='target_ko'?'end':'cancel')));
});
test('staged schema rejects coefficients not matching ability total',()=>{
 const base=formalAbilityDefinitions['P1.awakening'];assert.throws(()=>createAbilityDefinition({...base,effect:{...base.effect,coefficient:5}}));
});
test('same-time contacts resolve by actor identity even when cast insertion is reversed',()=>{
 const f=makeWindupFixture({allyTeam:['P1','P1','P4']}),s=f.session,a2=s.actorById('a2');
 for(const a of s.actors){s.holdPlayerControl(a.instanceId);a.controlHandoff.resumeAfterMs=1000;}
 Object.assign(f.actor,{x:4,y:0});Object.assign(a2,{x:4,y:0});Object.assign(f.target,{x:6,y:0});f.target.damage(f.target.hp-1);
 for(const a of [a2,f.actor]){Object.assign(a.abilityState.awakening,{phase:'ready',cooldownRemaining:0});s.executeAbility(a,'awakening','player',f.target);}
 s.step(.61);const damage=s.drainDamageEvents();assert.equal(damage.length,1);assert.equal(damage[0].actorId,'a1');
});
test('terminal battle kill cancels other action events at exact contact time',()=>{
 const f=fixture(),s=f.session;for(const a of s.enemies)if(a!==f.target)a.damage(a.hp);f.target.damage(f.target.hp-1);
 s.executeAbility(f.actor,'awakening','player',f.target);f.step(.61);
 assert.equal(s.result(),'victory');assert.ok(Math.abs(s.elapsedSeconds-.10175)<1e-9);
 const events=s.drainCastEvents();assert.equal(events.filter(e=>e.phase==='segment').length,1);assert.ok(events.every(e=>e.eventAt<=.10175+1e-9));
});
test('targeted start direction follows the locked target rather than team default',()=>{
 const f=fixture(-1);f.session.executeAbility(f.actor,'awakening','player',f.target);assert.equal(f.session.drainCastEvents()[0].direction.x,-1);
});
test('legacy windup and staged TOI share same-time actor ordering',async()=>{
 const {createLabBattleSession}=await import('../src/dev/battleLab/battleFactory.js');const {createLabConfig}=await import('../src/dev/battleLab/config.js');
 const s=createLabBattleSession(createLabConfig({allyTeam:['P1','P1','P1'],enemyTeam:['P1','P1','P1']}),{tacticalEnabled:false,rng:()=>.99});
 for(const a of s.actors){s.holdPlayerControl(a.instanceId);for(const c of ['heavy','special','awakening'])Object.assign(a.abilityState[c],{phase:'cooldown',cooldownRemaining:99});s.cadence.set(a.instanceId,99);}
 const basic=s.actorById('a1'),victim=s.actorById('a2'),rusher=s.actorById('e1');Object.assign(basic,{x:4.1,y:0});Object.assign(victim,{x:5.65,y:0});Object.assign(rusher,{x:4,y:0});rusher.damage(rusher.hp-1);
 const table=s.actorAbilityDefinitions.get('a1');s.actorAbilityDefinitions.set('a1',{...table,'P1.basic':createAbilityDefinition({...table['P1.basic'],windupMs:100})});s.cadence.set('a1',0);
 Object.assign(rusher.abilityState.awakening,{phase:'ready',cooldownRemaining:0});s.executeAbility(rusher,'awakening','player',victim);s.executeAbility(basic,'basic','ai',rusher);
 s.step(.12);const damage=s.drainDamageEvents();assert.deepEqual(damage.map(e=>e.actorId),['a1']);
});
