import { prototypeOwnership } from '../src/roster/catalog.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import * as resolver from '../src/combat/combatResolver.js';
import { createAbilityDefinition } from '../src/combat/ability.js';
import * as demo from '../src/runtime/demoBattle.js';
import { createStageBattleSession } from '../src/campaign/battleFactory.js';
import { CampaignController } from '../src/campaign/controller.js';

const ability=(settings={})=>createAbilityDefinition({id:'test',category:'heavy',cooldown:3,range:2,
  targetingRule:'enemy',effect:{coefficient:1.2},canCrit:true,critChance:.2,critMultiplier:1.75,...settings});
function hit(settings={},rng=()=>0,atk=16,def=5,type='speed') {
  const s=demo.createDemoBattleSession();const target=s.enemies[1];
  assert.equal(typeof resolver.resolveDamage,'function');
  const result=resolver.resolveDamage({attacker:s.allies[1],defender:target,
    attackerDefinition:{type:'power',stats:{atk}},defenderDefinition:{type,stats:{def}},
    abilityDefinition:ability(settings),rng});
  return {result,target};
}
test('forced crit applies multiplier after existing type/DEF/minimum formula',()=>{
  const {result,target}=hit();const base=16*1.2*1.15-5;
  assert.deepEqual(result,{amount:base*1.75,critical:true});assert.equal(target.hp,240-result.amount);
  assert.deepEqual(hit({},()=>0,1,100).result,{amount:1.75,critical:true});
});
test('forced non-crit preserves exact damage and legacy numeric resolver',()=>{
  const {result}=hit({},()=>.9);assert.deepEqual(result,{amount:16*1.2*1.15-5,critical:false});
  const s=demo.createDemoBattleSession();
  assert.equal(resolver.resolveDirectDamage({attacker:s.allies[1],defender:s.enemies[1],
    attackerDefinition:s.characterDefinitions.ally,defenderDefinition:s.characterDefinitions.enemy,
    abilityDefinition:ability(),rng:()=>.9}),result.amount);
});
test('type triangle remains correct for crit and non-crit',()=>{
  for(const [type,multiplier] of [['power',1],['speed',1.15],['blast',.85]]) {
    assert.equal(hit({},()=>.9,16,5,type).result.amount,16*1.2*multiplier-5);
    assert.equal(hit({},()=>0,16,5,type).result.amount,(16*1.2*multiplier-5)*1.75);
  }
});
test('disabled and zero-chance abilities never roll; probability boundary is strict',()=>{
  const noRoll=()=>{assert.fail('disabled crit consumed RNG');};
  assert.equal(hit({canCrit:false,critChance:1},noRoll).result.critical,false);
  assert.equal(hit({critChance:0},noRoll).result.critical,false);
  assert.equal(hit({},()=>.2).result.critical,false);
  assert.equal(hit({critChance:1},()=>.999).result.critical,true);
});
test('eligible crit requires valid injected random values before HP application',()=>{
  for(const rng of [undefined,()=>NaN,()=>1,()=>-.1]) {
    const s=demo.createDemoBattleSession();assert.equal(typeof resolver.resolveDamage,'function');
    assert.throws(()=>resolver.resolveDamage({attacker:s.allies[1],defender:s.enemies[1],
      attackerDefinition:s.characterDefinitions.ally,defenderDefinition:s.characterDefinitions.enemy,
      abilityDefinition:ability(),rng}),/rng|random/);
    assert.equal(s.enemies[1].hp,240);
  }
});
function ready(options){const s=demo.createDemoBattleSession(options);s.allies[1].x=9;s.allies[1].y=0;return s;}
test('runtime prototype crit values are immutable data and preserve cooldowns',()=>{
  const defs=demo.createDemoBattleSession().abilityDefinitions;
  assert.deepEqual(['basic','heavy','special','awakening'].map(k=>[defs[k].canCrit,defs[k].critChance,defs[k].critMultiplier]),
    [[true,.1,1.5],[true,.2,1.75],[true,.15,1.75],[false,0,1]]);
  assert.deepEqual(['heavy','special','awakening'].map(k=>defs[k].cooldown),[3,5,10]);
  assert.ok(Object.isFrozen(defs));assert.ok(Object.values(defs).every(Object.isFrozen));
  assert.equal(demo.demoAbilityDefinitions.basic.canCrit,false);
});
test('player damage event carries exact final amount and boolean critical',()=>{
  for(const [roll,critical] of [[0,true],[.9,false]]) {
    const s=ready({rng:()=>roll});s.usePlayerAbility('a2','heavy');
    const [event]=s.drainDamageEvents();assert.equal(event.critical,critical);
    assert.equal(event.amount,(16*1.2*1.15-5)*(critical?1.75:1));
    assert.equal(event.actorId,'a2');assert.equal(event.targetId,'e2');assert.equal(event.source,'player');
    assert.equal(event.category,'heavy');assert.equal(s.enemies[1].hp,240-event.amount);
  }
});
test('AI and player Heavy execute the same crit formula',()=>{
  const manual=ready({rng:()=>0});manual.usePlayerAbility('a2','heavy');const expected=manual.drainDamageEvents()[0];
  const ai=ready({rng:()=>0});
  for(const a of ai.actors) for(const k of ['special','awakening']){
    a.abilityState[k].phase='cooldown';a.abilityState[k].cooldownRemaining=8;
  }
  ai.step(.05);const actual=ai.drainDamageEvents().find(e=>e.actorId==='a2'&&e.category==='heavy');
  assert.ok(actual);assert.equal(actual.source,'ai');assert.equal(actual.amount,expected.amount);assert.equal(actual.critical,true);
});
test('miss, invalid, air-cast, KO and no-damage hits emit nothing and consume no RNG',()=>{
  let rolls=0;const s=demo.createDemoBattleSession({rng:()=>{rolls++;return 0;}});
  s.usePlayerAbility('a2','heavy');s.usePlayerAbility('missing','special');s.usePlayerAbility('a2','heavy');
  assert.deepEqual(s.drainDamageEvents(),[]);assert.equal(rolls,0);
  s.applyResolvedDamage(s.allies[1],s.enemies[1],s.characterDefinitions.ally,s.characterDefinitions.enemy,
    ability({effect:{coefficient:0}}),'heavy','player');
  s.enemies[1].damage(240);
  s.applyResolvedDamage(s.allies[1],s.enemies[1],s.characterDefinitions.ally,s.characterDefinitions.enemy,ability(),'heavy','ai');
  assert.deepEqual(s.drainDamageEvents(),[]);assert.equal(rolls,0);
});
test('same battle seed and inputs reproduce actual hit/crit sequence',()=>{
  const run=seed=>{const s=demo.createDemoBattleSession({seed}),events=[];
    for(let i=0;i<100 && s.result()==='running';i++){s.step(.1);events.push(...s.drainDamageEvents());}return events;};
  const first=run(123);assert.ok(first.length>10);assert.ok(first.some(e=>e.critical));
  assert.deepEqual(first,run(123));assert.notDeepEqual(first,run(124));
});
test('fresh Restart/retry factory resets RNG, events, HP and time with same stage/team',()=>{
  const controller=new CampaignController({ownership:prototypeOwnership(),teamPersistence:{load:()=>['P1','P3','P5'],save(){}}});controller.openChapter('chapter-1');controller.openTeamSelect();
  const config=controller.startBattle();
  const first=createStageBattleSession(config);const run=s=>{const events=[];for(let i=0;i<80;i++){s.step(.1);events.push(...s.drainDamageEvents());}return events;};
  const sequence=run(first);const fresh=createStageBattleSession(config);
  assert.equal(fresh.stageId,first.stageId);assert.deepEqual(fresh.allies.map(a=>a.definitionId),first.allies.map(a=>a.definitionId));
  assert.equal(fresh.elapsedSeconds,0);assert.ok(fresh.actors.every(a=>a.hp===a.maxHp));assert.deepEqual(fresh.drainDamageEvents(),[]);
  assert.deepEqual(run(fresh),sequence);
});
