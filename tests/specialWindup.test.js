import test from 'node:test';
import assert from 'node:assert/strict';
import {makeWindupFixture} from './helpers/basicWindup.js';
import {formalAbilityDefinitions} from '../src/roster/abilities.js';
function fixture(options={}){const f=makeWindupFixture(options);Object.assign(f.actor.abilityState.special,{phase:'ready',cooldownRemaining:0});Object.assign(f.target,{x:2,y:0});return {...f,step(dt){for(const a of f.session.actors)f.session.holdPlayerControl(a.instanceId);f.session.step(dt);}};}
test('Special uses approved320ms at every Tier, preserving Basic180 and Heavy280',()=>{
 assert.equal(formalAbilityDefinitions['P1.special'].windupMs,320);
 for(const tier of ['T0','T1','T2','T3']){const f=fixture({tier});assert.equal(f.session.actorAbilityDefinitions.get('a1')['P1.special'].windupMs,320);}
 assert.equal(formalAbilityDefinitions['P1.basic'].windupMs,180);assert.equal(formalAbilityDefinitions['P1.heavy'].windupMs,280);
});
for(const source of ['player','ai'])for(const sign of [1,-1])test(`Special ${source} direction${sign} no early movement/damage/RNG, one synchronized resolve`,()=>{
 let draws=0;const f=fixture({rng:()=>{draws++;return .99;}}),{session:s,actor:a,target:t}=f;t.x=2*sign;const hp=t.hp;
 assert.equal(s.executeAbility(a,'special',source,t),true);const [start]=s.drainCastEvents();
 assert.equal(start.phase,'start');assert.equal(start.dueAt,.32);assert.equal(a.abilityState.special.cooldownRemaining,6);
 f.step(.319);assert.equal(a.x,0);assert.equal(a.y,0);assert.equal(t.hp,hp);assert.equal(draws,0);
 assert.equal(s.executeAbility(a,'basic','ai',t),false);f.step(.001);
 const damage=s.drainDamageEvents(),[resolve]=s.drainCastEvents();assert.equal(damage.length,1);assert.equal(draws,1);assert.equal(resolve.phase,'resolve');assert.equal(resolve.actionId,start.actionId);assert.equal(damage[0].actionId,start.actionId);
 assert.equal(resolve.resolvedAt,.32);assert.ok(t.hp<hp);assert.ok(Math.abs(a.x-sign*.65/Math.SQRT2)<1e-9);assert.ok(Math.abs(a.y-sign*.65/Math.SQRT2)<1e-9);
 assert.ok(Math.abs(a.abilityState.special.cooldownRemaining-5.68)<1e-9);f.step(.5);assert.equal(s.drainDamageEvents().length,0);
});
for(const reason of ['escape','sourceKO','targetKO','control','clear','air'])test(`Special ${reason} never invents movement, hits, or cooldown refunds`,()=>{
 let draws=0;const f=fixture({rng:()=>{draws++;return .99;}}),{session:s,actor:a,target:t}=f;
 if(reason==='air')t.x=9;s.executeAbility(a,'special','player',t);s.drainCastEvents();
 if(reason==='escape')t.x=9;else if(reason==='sourceKO')a.damage(a.hp);else if(reason==='targetKO')t.damage(t.hp);else if(reason==='control')s.statuses.apply({sourceId:'e1',targetId:'a1',type:'control',magnitude:1,duration:.5},0);else if(reason==='clear')s.clearTransientCombat({preserveEvents:true});
 f.step(.32);assert.equal(s.drainDamageEvents().length,0);assert.equal(draws,0);assert.equal(a.x,0);assert.equal(a.y,0);assert.equal(s.pendingActions.size,0);assert.ok(a.abilityState.special.cooldownRemaining>0);
});
