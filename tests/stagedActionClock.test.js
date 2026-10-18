import test from 'node:test';
import assert from 'node:assert/strict';
import {makeWindupFixture} from './helpers/basicWindup.js';

function automaticFixture({distance=2}={}){
 const f=makeWindupFixture(),s=f.session;
 Object.assign(f.actor,{x:4,y:0});Object.assign(f.target,{x:4+distance,y:0});
 for(const a of s.actors)if(a!==f.actor){s.holdPlayerControl(a.instanceId);if(a!==f.target)Object.assign(a,{x:12,y:2});}
 s.cadence.set(f.actor.instanceId,99);
 Object.assign(f.actor.abilityState.awakening,{phase:'ready',cooldownRemaining:0});
 const intervals=[],advance=s.stepInterval.bind(s),motion=s.advanceStagedMotion.bind(s),motionIntervals=[];
 s.stepInterval=dt=>{intervals.push(dt);return advance(dt);};
 s.advanceStagedMotion=dt=>{motionIntervals.push({at:s.elapsedSeconds,dt});return motion(dt);};
 return {...f,intervals,motionIntervals};
}

test('ready AI staged ability outside range keeps one normal interval with no staged simulation',()=>{
 const f=automaticFixture();Object.assign(f.actor,{x:-2,y:0});for(const a of f.session.enemies)Object.assign(a,{x:12,y:0});
 f.session.step(.05);
 assert.equal(f.session.drainCastEvents().filter(e=>e.staged).length,0);
 assert.deepEqual(f.intervals,[.05]);assert.equal(f.motionIntervals.length,0);
 assert.ok(Math.abs(f.actor.abilityState.heavy.cooldownRemaining-98.95)<1e-9);
 assert.ok(Math.abs(f.session.cadence.get('a1')-98.95)<1e-9);
});

test('an actual automatic staged start switches the whole session before anticipation advances',()=>{
 const f=automaticFixture(),s=f.session;const targetX=f.target.x;
 s.playerMovement.set(f.target.instanceId,{x:1,y:0});s.step(.1);
 const events=s.drainCastEvents().filter(e=>e.staged);
 assert.equal(events.find(e=>e.phase==='start')?.eventAt,0);
 assert.equal(events.find(e=>e.phase==='segment')?.eventAt,.08);
 assert.ok(f.motionIntervals.length>=10);
 assert.ok(f.motionIntervals.every(e=>e.dt<=.01+1e-9),JSON.stringify(f.motionIntervals));
 assert.ok(Math.abs(f.target.x-targetX-s.definitionForActor(f.target).stats.moveSpeed*.1)<1e-8);
 assert.ok(Math.abs(f.actor.abilityState.heavy.cooldownRemaining-98.9)<1e-9);
 assert.ok(Math.abs(f.actor.abilityState.awakening.cooldownRemaining-11.9)<1e-9);
 s.setPlayerMovement('a1',{x:1,y:0});s.step(.05);
 assert.equal(s.hasStagedAction(),false);
 assert.ok(Math.abs(f.actor.abilityState.awakening.cooldownRemaining-11.85)<1e-9);
});

test('an in-range ready staged slot does not change sampling when AI selects basic',async()=>{
 const {createAbilityDefinition}=await import('../src/combat/ability.js');
 const f=automaticFixture({distance:.65}),s=f.session,table=s.actorAbilityDefinitions.get('a1');
 s.actorAbilityDefinitions.set('a1',{...table,'P1.awakening':createAbilityDefinition({...table['P1.awakening'],ai:{...table['P1.awakening'].ai,priority:0}})});
 s.cadence.set('a1',0);s.step(.05);
 const events=s.drainCastEvents();assert.ok(events.some(e=>e.category==='basic'&&e.phase==='start'));
 assert.equal(events.some(e=>e.staged),false);assert.deepEqual(f.intervals,[.05]);assert.equal(f.motionIntervals.length,0);
});

test('a new automatic cast immediately splits at an earlier status expiry',()=>{
 const f=automaticFixture(),s=f.session;
 s.statuses.apply({sourceId:'e1',targetId:'e1',type:'mitigation',magnitude:.1,duration:.005},0);
 s.step(.05);
 assert.equal(f.motionIntervals[0].dt,.005);
 assert.ok(Math.abs(s.elapsedSeconds-.05)<1e-9);
 assert.ok(Math.abs(f.actor.abilityState.heavy.cooldownRemaining-98.95)<1e-9);
 assert.ok(Math.abs(f.actor.abilityState.awakening.cooldownRemaining-11.95)<1e-9);
});
