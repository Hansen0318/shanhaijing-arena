import test from 'node:test';import assert from 'node:assert/strict';
import {createLabBattleSession} from '../src/dev/battleLab/battleFactory.js';
import {createLabConfig} from '../src/dev/battleLab/config.js';
import {createAbilityDefinition} from '../src/combat/ability.js';
function fixture(castAt=0){
 const s=createLabBattleSession(createLabConfig({allyTeam:['P1','P1','P1'],enemyTeam:['P1','P1','P1']}),{tacticalEnabled:false,rng:()=>.99});
 for(const a of s.actors){s.holdPlayerControl(a.instanceId);for(const c of ['heavy','special','awakening'])Object.assign(a.abilityState[c],{phase:'cooldown',cooldownRemaining:99});s.cadence.set(a.instanceId,99);}
 const a=s.actorById('a1'),target=s.actorById('a2'),rusher=s.actorById('e1');Object.assign(a,{x:5.4,y:0});Object.assign(target,{x:6,y:0});Object.assign(rusher,{x:4,y:0});rusher.damage(rusher.hp-1);
 s.elapsedSeconds=castAt;for(const actor of s.actors)s.holdPlayerControl(actor.instanceId);
 Object.assign(rusher.abilityState.awakening,{phase:'ready',cooldownRemaining:0});s.executeAbility(rusher,'awakening','player',target);
 return {s,a,target,rusher};
}
test('queued multi-hit and real swept contact use common time/actor ordering',()=>{
 const {s}=fixture();s.pendingHits.push({actorId:'a1',targetId:'e1',definition:s.actorAbilityDefinitions.get('a1')['P1.basic'],category:'basic',source:'player',due:.10175,hitIndex:1,totalHits:2});
 s.step(.12);assert.deepEqual(s.drainDamageEvents().map(e=>e.actorId),['a1']);assert.equal(s.actorById('a2').hp,s.actorById('a2').maxHp);
});
test('delayed telegraph and real swept contact use common time/actor ordering',()=>{
 const {s,a,rusher}=fixture(),table=s.actorAbilityDefinitions.get('a1');s.tacticalEnabled=true;
 const def=createAbilityDefinition({...table['P1.heavy'],windupMs:0,telegraph:{telegraphMs:101.75,dangerRadius:2,dodgeable:true}});
 s.actorAbilityDefinitions.set('a1',{...table,'P1.heavy':def});Object.assign(a.abilityState.heavy,{phase:'ready',cooldownRemaining:0});s.executeAbility(a,'heavy','player',rusher);
 s.step(.12);assert.deepEqual(s.drainDamageEvents().map(e=>e.actorId),['a1']);assert.equal(s.actorById('a2').hp,s.actorById('a2').maxHp);
});

test('periodic area pulse and swept contact use common time/actor ordering',()=>{
 const {s,a}=fixture(.19825),definition=s.actorAbilityDefinitions.get('a1')['P1.basic'];
 s.areas.create({sourceId:'a1',sourceTeamId:a.teamId,center:{x:4,y:0},spec:{radius:2,duration:1,interval:.3,eligibility:'enemy',behavior:'periodic',coefficient:1},definition,category:'special',source:'player'},0);
 s.step(.12);assert.deepEqual(s.drainDamageEvents().map(e=>e.actorId),['a1']);assert.equal(s.actorById('a2').hp,s.actorById('a2').maxHp);
});
