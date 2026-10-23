import test from 'node:test';
import assert from 'node:assert/strict';
import {makeWindupFixture} from './helpers/basicWindup.js';
import {createAbilityDefinition} from '../src/combat/ability.js';

function fixture(tier='T0',tacticalEnabled=false){
 const f=makeWindupFixture({tier,tacticalEnabled,allyTeam:['P3','P1','P4']});
 for(const a of f.session.actors){f.session.holdPlayerControl(a.instanceId);f.session.setPlayerMovement(a.instanceId,{x:0,y:0});}
 Object.assign(f.target,{x:2,y:0});return f;
}
for(const tier of ['T0','T1','T2','T3'])for(const tactical of [false,true])test(`water arrow real180ms fixed Tier/mode ${tier}/${tactical}`,()=>{
 const {session:s,actor:a,target:t}=fixture(tier,tactical),hp=t.hp;
 assert.equal(s.executeAbility(a,'basic','player',t),true);
 const start=s.drainCastEvents().find(e=>e.actorId===a.instanceId);
 assert.equal(start.phase,'start');assert.equal(start.windupMs,180);assert.equal(t.hp,hp);
 const cadence=s.cadence.get(a.instanceId);assert.equal(cadence,1/s.definitionForActor(a).stats.attackSpeed);
 s.step(.179);assert.equal(t.hp,hp);assert.equal(s.drainDamageEvents().length,0);
 s.step(.001);assert.ok(t.hp<hp);const hits=s.drainDamageEvents();assert.equal(hits.length,1);assert.equal(hits[0].actionId,start.actionId);
 const resolve=s.drainCastEvents().find(e=>e.phase==='resolve');assert.equal(resolve.resolvedAt,.18);assert.equal(resolve.hit,true);
 s.step(.05);assert.equal(s.drainDamageEvents().length,0);assert.ok(s.cadence.get(a.instanceId)>0);
});
for(const offset of [{x:2,y:.121},{x:2.01,y:0},{x:-.01,y:0}])test('locked finite line misses target movement '+JSON.stringify(offset),()=>{
 const {session:s,actor:a,target:t}=fixture(),hp=t.hp;s.executeAbility(a,'basic','player',t);Object.assign(t,offset);
 const other=s.actorById('e2');Object.assign(other,{x:1,y:0});const hp2=other.hp;s.step(.18);
 assert.equal(t.hp,hp);assert.equal(other.hp,hp2);assert.equal(s.drainDamageEvents().length,0);
 assert.equal(s.drainCastEvents().find(e=>e.phase==='resolve').hit,false);
});
test('line uses caster current position and locked aim, not homing or original source',()=>{
 const {session:s,actor:a,target:t}=fixture(),hp=t.hp;s.executeAbility(a,'basic','player',t);
 Object.assign(a,{x:0,y:1});Object.assign(t,{x:1,y:.5});s.step(.18);
 assert.ok(t.hp<hp);const e=s.drainCastEvents().find(e=>e.phase==='resolve');assert.deepEqual(e.attackOrigin,{x:0,y:1});assert.deepEqual(e.attackTarget,{x:2,y:0});
});
for(const kind of ['control','sourceKO','targetKO','end'])test('pending water arrow cleanup '+kind,()=>{
 const {session:s,actor:a,target:t}=fixture(),hp=t.hp;s.executeAbility(a,'basic','player',t);
 if(kind==='control')s.statuses.apply({sourceId:'e2',targetId:'a1',type:'control',magnitude:1,duration:1},0);
 if(kind==='sourceKO')a.damage(a.hp);if(kind==='targetKO')t.damage(t.hp);if(kind==='end')s.clearTransientCombat();
 s.step(.18);assert.equal(s.drainDamageEvents().length,0);assert.equal(s.pendingBasics.size,0);if(kind!=='targetKO')assert.equal(t.hp,hp);
});
test('line geometry validates shared opt-in and rejects unsupported contracts',()=>{
 const input={id:'anonymous.basic',category:'basic',cooldown:0,range:4,targetingRule:'enemy',windupMs:180,effect:{coefficient:1},resolveGeometry:{kind:'locked-line',halfWidth:.12}};
 assert.deepEqual(createAbilityDefinition(input).resolveGeometry,input.resolveGeometry);
 for(const resolveGeometry of [{kind:'wrong',halfWidth:.12},{kind:'locked-line',halfWidth:0},{kind:'locked-line',halfWidth:Infinity}])assert.throws(()=>createAbilityDefinition({...input,resolveGeometry}));
 assert.throws(()=>createAbilityDefinition({...input,windupMs:0}));assert.throws(()=>createAbilityDefinition({...input,targetingRule:'self'}));
});
test('anonymous renamed ability executes same line geometry without character ID branch',()=>{
 const {session:s,actor:a,target:t}=fixture(),hp=t.hp,defs=s.actorAbilityDefinitions.get(a.instanceId),old=defs['P3.basic'];
 const renamed=createAbilityDefinition({...old,id:'anonymous.basic',windupMs:180,resolveGeometry:{kind:'locked-line',halfWidth:.12}});
 s.actorAbilityDefinitions.set(a.instanceId,{...defs,[renamed.id]:renamed});const character=s.definitionForActor(a);
 s.actorCharacterDefinitions.set(a.instanceId,{...character,id:'anonymous',abilities:{...character.abilities,basic:renamed.id}});
 a.abilityState.basic.definitionId=renamed.id;s.executeAbility(a,'basic','player',t);t.y=.2;s.step(.18);assert.equal(t.hp,hp);
});
test('deadline rounds only sub-epsilon residual and cannot strand surviving teams before timeout',()=>{
 const {session:s}=fixture();s.elapsedSeconds=s.maxSeconds-3e-12;s.step(.05);
 assert.equal(s.elapsedSeconds,s.maxSeconds);assert.notEqual(s.result(),'running');assert.equal(s.pendingActions.size,0);
});
