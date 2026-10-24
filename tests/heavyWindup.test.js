import test from 'node:test';
import assert from 'node:assert/strict';
import {makeWindupFixture} from './helpers/basicWindup.js';
import {formalAbilityDefinitions} from '../src/roster/abilities.js';
import {createAbilityDefinition} from '../src/combat/ability.js';

function fixture(options={}){
 const f=makeWindupFixture(options),{session:s,actor:a,target:t}=f;
 Object.assign(a.abilityState.heavy,{phase:'ready',cooldownRemaining:0});
 Object.assign(t,{x:2,y:0});
 return {...f,step(dt){for(const actor of s.actors)s.holdPlayerControl(actor.instanceId);s.step(dt);}};
}
test('Heavy opts into280ms at every Tier without altering Basic or other skills',()=>{
 const d=formalAbilityDefinitions['P1.heavy'];assert.equal(d.windupMs,280);
 assert.equal(createAbilityDefinition({...d,id:'other.heavy'}).windupMs,280);
 assert.throws(()=>createAbilityDefinition({...d,category:'awakening'}));
 assert.throws(()=>createAbilityDefinition({...d,telegraph:{telegraphMs:500,dangerRadius:1}}));
 for(const tier of ['T0','T1','T2','T3']){const {session:s}=fixture({tier});assert.equal(s.actorAbilityDefinitions.get('a1')['P1.heavy'].windupMs,280);}
 for(const [key,d] of Object.entries(formalAbilityDefinitions))if(d.category!=='passive')assert.equal(d.windupMs,key==='P1.basic'?180:key==='P1.heavy'?280:key==='P1.special'?320:key==='P2.basic'?250:key==='P3.basic'?180:key==='P3.heavy'?350:key==='P3.special'?320:key==='P3.awakening'?600:0);
});
for(const source of ['player','ai'])for(const sign of [1,-1])test(`Heavy ${source} facing${sign} has no early move/HP/RNG, resolves once with matching actionId`,()=>{
 let draws=0;const f=fixture({rng:()=>{draws++;return .99;}}),{session:s,actor:a,target:t}=f;t.x=sign*2;
 const hp=t.hp;assert.equal(s.executeAbility(a,'heavy',source,t),true);
 assert.equal(t.hp,hp);assert.equal(a.x,0);assert.equal(draws,0);assert.equal(a.abilityState.heavy.cooldownRemaining,3);
 const [start]=s.drainCastEvents();assert.equal(start.phase,'start');assert.equal(start.category,'heavy');assert.equal(start.dueAt,.28);
 assert.equal(s.executeAbility(a,'heavy',source,t),false);f.step(.279);assert.equal(t.hp,hp);assert.equal(a.x,0);assert.equal(draws,0);
 f.step(.001);const damage=s.drainDamageEvents(),resolve=s.drainCastEvents().filter(e=>e.phase==='resolve');
 assert.equal(damage.length,1);assert.equal(resolve.length,1);assert.ok(t.hp<hp);assert.ok(Math.abs(a.x-sign*1.35)<1e-9);
 assert.equal(draws,1);assert.equal(damage[0].actionId,start.actionId);assert.equal(resolve[0].actionId,start.actionId);assert.equal(resolve[0].resolvedAt,.28);
 assert.ok(Math.abs(a.abilityState.heavy.cooldownRemaining-2.72)<1e-9);f.step(.5);assert.equal(s.drainDamageEvents().length,0);
});
test('AI/automatic Basic cannot overwrite a committed Heavy; failed manual skill cannot cancel it',()=>{
 const {session:s,actor:a,target:t,step}=fixture();s.executeAbility(a,'heavy','ai',t);s.drainCastEvents();
 Object.assign(a.abilityState.special,{phase:'ready',cooldownRemaining:0});
 assert.equal(s.executeAbility(a,'basic','ai',t),false);assert.equal(s.executeAbility(a,'special','ai',t),false);
 assert.equal(s.executeAbility(a,'heavy','player',t),false);step(.1);assert.equal(s.drainCastEvents().length,0);assert.equal(s.pendingActions.size,1);
});
test('successful other manual skill cancels Heavy once without refund or late hit',()=>{
 const {session:s,actor:a,target:t,step}=fixture();s.executeAbility(a,'heavy','ai',t);s.drainCastEvents();step(.1);
 Object.assign(a.abilityState.special,{phase:'ready',cooldownRemaining:0});assert.equal(s.executeAbility(a,'special','player',t),true);
 const es=s.drainCastEvents();assert.equal(es.filter(e=>e.category==='heavy'&&e.phase==='cancel').length,1);
 assert.ok(Math.abs(a.abilityState.heavy.cooldownRemaining-2.9)<1e-9);s.drainDamageEvents();step(.3);
 assert.equal(s.drainDamageEvents().length,0);assert.equal(s.pendingActions.size,1);step(.02);assert.equal(s.drainDamageEvents().length,1);assert.equal(s.pendingActions.size,0);
});
test('range escape produces locked miss without damage, RNG, movement or retarget',()=>{
 let draws=0;const {session:s,actor:a,target:t,step}=fixture({rng:()=>{draws++;return .99;}});
 s.executeAbility(a,'heavy','ai',t);s.drainCastEvents();t.x=9;Object.assign(s.actorById('e2'),{x:.7,y:0});step(.28);
 const [e]=s.drainCastEvents();assert.equal(e.phase,'resolve');assert.equal(e.targetId,t.instanceId);assert.equal(e.hit,false);
 assert.equal(a.x,0);assert.equal(draws,0);assert.equal(s.drainDamageEvents().length,0);
});
for(const which of ['source','target','control','clear'])test(`Heavy ${which} cancellation removes pending damage and keeps spent cooldown`,()=>{
 const {session:s,actor:a,target:t,step}=fixture();s.executeAbility(a,'heavy','ai',t);s.drainCastEvents();
 if(which==='source')a.damage(a.hp);else if(which==='target')t.damage(t.hp);else if(which==='control')s.statuses.apply({sourceId:'e1',targetId:'a1',type:'control',magnitude:1,duration:.5},0);else s.clearTransientCombat({preserveEvents:true});
 step(.28);assert.equal(s.drainDamageEvents().length,0);assert.equal(s.pendingActions.size,0);assert.equal(s.drainCastEvents().filter(e=>e.actorId==='a1'&&e.phase==='cancel').length,1);
 assert.ok(a.abilityState.heavy.cooldownRemaining>0);assert.equal(a.abilityState.heavy.phase,'cooldown');
});
test('movement and ordinary incoming damage do not root or cancel Heavy',()=>{
 const {session:s,actor:a,target:t}=fixture();s.executeAbility(a,'heavy','player',t);a.damage(1);s.setPlayerMovement('a1',{x:0,y:1});s.step(.05);
 assert.ok(a.y>0);assert.equal(s.pendingActions.size,1);assert.equal(s.drainCastEvents().some(e=>e.phase==='cancel'),false);
});
test('air cast keeps spent cooldown, phased swing and no fabricated hit',()=>{
 const {session:s,actor:a,target:t}=fixture();t.x=10;s.executeAbility(a,'heavy','player',t);
 assert.equal(s.pendingActions.size,1);assert.equal(a.abilityState.heavy.cooldownRemaining,3);assert.equal(s.drainDamageEvents().length,0);const e=s.drainCastEvents()[0];assert.equal(e.hit,false);assert.equal(e.phase,'start');assert.equal(e.targetId,null);
});
test('Pause/no step freezes pending Heavy; coarse step and terminal kill clear exactly once',()=>{
 const {session:s,actor:a,target:t,step}=fixture();for(const e of s.enemies)if(e!==t)e.damage(e.hp);t.damage(t.hp-1);
 s.executeAbility(a,'heavy','player',t);const hp=t.hp;s.drainCastEvents();assert.equal(s.elapsedSeconds,0);assert.equal(t.hp,hp);
 step(.4);assert.notEqual(s.result(),'running');assert.equal(s.drainDamageEvents().length,1);assert.equal(s.drainCastEvents().filter(e=>e.phase==='resolve'&&e.hit).length,1);assert.equal(s.pendingActions.size,0);
});
test('two Heavy casters keep independent tokens, each hit resolves once',()=>{
 const f=fixture({allyTeam:['P1','P1','P3']}),{session:s,actor:a,target:t}=f,b=s.actorById('a2');Object.assign(b,{x:0,y:.1});Object.assign(b.abilityState.heavy,{phase:'ready',cooldownRemaining:0});
 s.executeAbility(a,'heavy','ai',t);s.executeAbility(b,'heavy','ai',t);const starts=s.drainCastEvents();assert.equal(new Set(starts.map(e=>e.actionId)).size,2);
 f.step(.28);assert.equal(s.drainDamageEvents().length,2);assert.equal(s.drainCastEvents().filter(e=>e.phase==='resolve').length,2);assert.equal(s.pendingActions.size,0);
});
