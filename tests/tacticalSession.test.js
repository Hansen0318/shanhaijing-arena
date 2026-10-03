import test from 'node:test';import assert from 'node:assert/strict';
import {createLabConfig} from '../src/dev/battleLab/config.js';import {createLabBattleSession} from '../src/dev/battleLab/battleFactory.js';
import {scoreTacticalTarget} from '../src/combat/tacticalTargeting.js';import {rosterCatalog} from '../src/roster/catalog.js';
import {formalAbilityDefinitions} from '../src/roster/abilities.js';import {readFileSync} from 'node:fs';
const make=(scenarioId='aoe')=>createLabBattleSession(createLabConfig({scenarioId,skipCountdown:true}),{seed:71,tacticalEnabled:true});
const hold=s=>s.actors.forEach(a=>s.holdPlayerControl(a.instanceId));
test('five complete immutable profiles are distinct and shared AI has no character-ID branches',()=>{
 for(const d of Object.values(rosterCatalog)){assert.ok(Object.isFrozen(d.aiProfile));assert.ok(Number.isFinite(d.aiProfile.evadeTendency));}
 assert.ok(rosterCatalog.P1.aiProfile.evadeTendency>rosterCatalog.P2.aiProfile.evadeTendency);assert.equal(rosterCatalog.P5.aiProfile.kiteTendency,0);
 for(const f of ['ai.js','tactics.js','tacticalTargeting.js'])assert.ok(!/['"]P[1-5]['"]|characterId\s*===/.test(readFileSync(new URL('../src/combat/'+f,import.meta.url),'utf8')));
});
test('target scoring deterministically ties by instance identity and favors vulnerable-ally attacker',()=>{
 const s=make(),a=s.allies[2],e1=s.enemies[0],e2=s.enemies[1];e1.x=e2.x=5;e1.y=e2.y=0;
 const p=rosterCatalog.P2.aiProfile;s.allies[0].damage(200);e2.targetId='a1';
 assert.equal(scoreTacticalTarget({actor:a,enemies:[e1,e2],allies:s.allies,profile:p,characterDefinitions:s.characterDefinitions}),e2);
 e2.targetId=null;assert.equal(scoreTacticalTarget({actor:a,enemies:[e2,e1],allies:[],profile:p,characterDefinitions:s.characterDefinitions}),e1);
});
test('telegraph delays shared AoE impact; leaving locked danger dodges without damage/CD changes',()=>{
 const s=make();const before=s.enemies[0].hp;assert.ok(s.usePlayerAbility('a2','special'));assert.equal(s.drainDamageEvents().length,0);assert.equal(s.threats.active(0).length,1);
 const t=s.threats.active(0)[0];s.enemies[0].y=2;s.enemies[0].x=10;
 hold(s);s.step((t.impactAtMs-1)/1000);assert.equal(s.enemies[1].hp,s.enemies[1].maxHp);
 hold(s);s.step(.001);assert.equal(s.enemies[0].hp,before);assert.deepEqual(s.drainDamageEvents().map(e=>e.targetId),['e2','e3']);assert.equal(s.threats.active(s.elapsedSeconds*1000).length,0);
 assert.equal(s.allies[1].abilityState.special.cooldownRemaining,formalAbilityDefinitions['P4.special'].cooldown-t.impactAtMs/1000);
});
test('AI/player use identical telegraphed execution, KO cancels, air casts never create damaging area',()=>{
 const s=make(),m=make();assert.ok(s.executeAbility(s.allies[1],'special','ai',s.enemies[1]));assert.ok(m.usePlayerAbility('a2','special'));
 assert.deepEqual(s.threats.active(0).map(t=>t.geometry),m.threats.active(0).map(t=>t.geometry));
 s.allies[1].damage(9999);hold(s);s.step(1);assert.equal(s.drainDamageEvents().length,0);assert.equal(s.threats.active(1000).length,0);
 const air=make();air.enemies.forEach(e=>e.x=12);assert.ok(air.usePlayerAbility('a2','special'));assert.equal(air.threats.active(0).length,0);
});
test('player movement immediately clears tactical objective; release resumes AI with fresh intent',()=>{
 const s=make('normal');s.step(.05);const a=s.allies[0];s.holdPlayerControl('a1');s.setPlayerMovement('a1',{x:-1,y:0});const before=a.x;s.step(.05);assert.ok(a.x<before);assert.equal(s.tacticalStates.get('a1').destination,undefined);
 s.clearPlayerMovement('a1');s.step(.05);assert.ok(s.tacticalStates.get('a1').phase);
});
test('seeded tactics and simulation repeat while new sessions clear transient threats/state',()=>{
 const a=make(),b=make();for(let i=0;i<120;i++){a.step(.05);b.step(.05);}assert.deepEqual(a.snapshot(),b.snapshot());assert.deepEqual([...a.tacticalStates],[...b.tacticalStates]);assert.equal(make().threats.active(0).length,0);
 assert.ok(a.tacticalEvaluations<=a.actors.length*25+6);
});
