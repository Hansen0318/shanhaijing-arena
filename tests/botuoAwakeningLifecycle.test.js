import test from 'node:test';
import assert from 'node:assert/strict';
import {createLabConfig} from '../src/dev/battleLab/config.js';
import {createLabBattleSession} from '../src/dev/battleLab/battleFactory.js';
export function fixture({tactical=true,tier='T0',legacy=false}={}){
 const s=createLabBattleSession(createLabConfig({allyTeam:['P2','P3','P4'],enemyTeam:['P2','P5','P3'],allyTier:tier}),{seed:71,tacticalEnabled:tactical,rng:()=>.99});
 for(const a of s.actors){Object.assign(a,{x:9,y:1});s.cadence.set(a.instanceId,99);for(const c of ['heavy','special','awakening'])Object.assign(a.abilityState[c],{phase:'cooldown',cooldownRemaining:99});}
 const a=s.allies[0];Object.assign(a,{x:3,y:0});Object.assign(s.enemies[0],{x:4,y:0});Object.assign(s.enemies[1],{x:2,y:0});Object.assign(s.allies[1],{x:4,y:0});Object.assign(a.abilityState.awakening,{phase:'ready',cooldownRemaining:0});
 if(legacy){const table=s.actorAbilityDefinitions.get(a.instanceId);s.actorAbilityDefinitions.set(a.instanceId,{...table,'P2.awakening':{...table['P2.awakening'],presentation:null}});}
 return {s,a,step:dt=>{for(const actor of s.actors)s.holdPlayerControl(actor.instanceId);s.step(dt);}};
}
const gameplayDamage=events=>events.map(({actionId,presentationEpoch,...e})=>e);
for(const tactical of [false,true])for(const tier of ['T0','T3'])test(`Awakening observed ${tier} tactical=${tactical} preserves real gameplay and emits actual victims`,()=>{
 const f=fixture({tactical,tier}),old=fixture({tactical,tier,legacy:true});
 for(const x of [f,old])assert.ok(x.s.executeAbility(x.a,'awakening','player',x.s.enemies[0]));
 const starts=f.s.drainCastEvents();assert.equal(starts[0].phase,'start');assert.equal(starts[0].startedAt,0);
 let events=[...starts];if(tactical){const due=tier==='T3'?.819:.9;assert.ok(Math.abs(starts[0].dueAt-due)<1e-9);f.step(due);old.step(due);events.push(...f.s.drainCastEvents());}
 assert.deepEqual(f.s.snapshot(),old.s.snapshot());assert.deepEqual(f.a.abilityState,old.a.abilityState);
 const damage=f.s.drainDamageEvents(),oldDamage=old.s.drainDamageEvents();assert.deepEqual(gameplayDamage(damage),gameplayDamage(oldDamage));
 assert.deepEqual(damage.map(e=>e.targetId).sort(),['e1','e2']);assert.ok(damage.every(e=>e.actionId===starts[0].actionId&&e.presentationEpoch===0));
 const resolve=events.find(e=>e.phase==='resolve');assert.ok(resolve);assert.ok(Math.abs(resolve.resolvedAt-(tactical?(tier==='T3'?.819:.9):0))<1e-9);assert.deepEqual(resolve.victims.map(e=>e.targetId).sort(),['e1','e2']);assert.ok(resolve.victims.every(e=>e.amount>0));assert.equal(f.s.pendingActions.size,0);
 if(tier==='T3'){const records=[...f.s.statuses.records.values()].filter(r=>r.key==='boyi.team');assert.deepEqual(records.map(r=>r.targetId).sort(),['a1','a2']);assert.ok(records.every(r=>r.presentationSource?.abilityId==='P2.awakening'&&r.presentationSource.effectId==='boyi.team'));}
});
test('Awakening locked original target escapes while entrant gets sole true contact provenance',()=>{const f=fixture();f.s.executeAbility(f.a,'awakening','player',f.s.enemies[0]);f.s.drainCastEvents();f.s.enemies[0].x=9;f.s.enemies[1].x=9;f.s.enemies[2].x=3.5;f.step(.9);const [resolve]=f.s.drainCastEvents();assert.deepEqual(resolve.victims.map(v=>v.targetId),['e3']);assert.equal(f.s.drainDamageEvents()[0].actionId,resolve.actionId);});
for(const tactical of [false,true])test(`Awakening air tactical=${tactical} emits immediate release without fake contact or protection`,()=>{const f=fixture({tactical,tier:'T3'});for(const e of f.s.enemies)e.x=9;f.s.executeAbility(f.a,'awakening','player',f.s.enemies[0]);const es=f.s.drainCastEvents();assert.deepEqual(es.map(e=>e.phase),['start','resolve']);assert.equal(es[1].resolvedAt,0);assert.deepEqual(es[1].victims,[]);assert.equal(f.s.drainDamageEvents().length,0);assert.equal(f.s.statuses.records.size,0);});
test('Awakening source KO cancels pending presentation and damage',()=>{const f=fixture();f.s.executeAbility(f.a,'awakening','player',f.s.enemies[0]);const start=f.s.drainCastEvents()[0];f.a.damage(f.a.hp);f.step(.9);assert.equal(f.s.drainDamageEvents().length,0);const cancel=f.s.drainCastEvents().find(e=>e.phase==='cancel');assert.equal(cancel.actionId,start.actionId);});
test('Awakening real team status coexists with Special using MAX and expires independently',()=>{
 const f=fixture({tactical:false,tier:'T3'}),{s,a}=f;Object.assign(a.abilityState.special,{phase:'ready',cooldownRemaining:0});assert.ok(s.executeAbility(a,'special','player'));
 const special=[...s.statuses.records.values()];assert.equal(special.length,2);assert.ok(special.every(r=>r.presentationSource.category==='special'));
 assert.ok(s.executeAbility(a,'awakening','player',s.enemies[0]));const team=[...s.statuses.records.values()].filter(r=>r.key==='boyi.team');assert.equal(team.length,2);
 for(const id of ['a1','a2']){const records=s.statuses.forActor(id,0);assert.equal(records.length,2);assert.equal(s.statuses.damageMultiplier(id,0),1-Math.max(...records.map(r=>r.magnitude)));}
 s.statuses.expire(3.75);assert.ok(team.every(r=>!s.statuses.records.has(r.id)));assert.ok(special.every(r=>s.statuses.records.has(r.id)));s.statuses.expire(5);assert.equal(s.statuses.records.size,0);
});
