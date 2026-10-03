import test from 'node:test';
import assert from 'node:assert/strict';
import {createLabConfig} from '../src/dev/battleLab/config.js';
import {createLabBattleSession} from '../src/dev/battleLab/battleFactory.js';
import {rosterCatalog} from '../src/roster/catalog.js';
import {formalAbilityDefinitions} from '../src/roster/abilities.js';
test('Lab factory uses exact formal data and independent duplicate actor states',()=>{
 const s=createLabBattleSession(createLabConfig({allyTeam:['P3','P3','P3']}));
 assert.equal(s.characterDefinitions,rosterCatalog);assert.equal(s.abilityDefinitions,formalAbilityDefinitions);
 assert.deepEqual(s.allies.map(a=>a.instanceId),['a1','a2','a3']);s.allies[0].damage(10);assert.equal(s.allies[1].hp,235);
 assert.equal(s.chapterId,undefined);assert.equal(s.stageId,'dev-battle-lab');
});
test('all scenarios apply generic positions/HP and retry builds fresh formal runtime',()=>{
 for(const scenarioId of ['normal','low-hp','heal','aoe','types','mitigation']){
  const c=createLabConfig({scenarioId}),s=createLabBattleSession(c);
  for(const [i,a] of s.allies.entries()){assert.equal(a.hp/a.maxHp,c.allyHpRatios[i]);assert.equal(a.x,c.allySpawnFormation[i].x);}
  for(const [i,a] of s.enemies.entries()){assert.equal(a.hp,a.maxHp);assert.equal(a.y,c.enemySpawnFormation[i].y);}
  s.allies[0].damage(10);s.step(.05);assert.equal(createLabBattleSession(c).elapsedSeconds,0);
 }
});
test('ready override remains session-local and never mutates formal cooldowns',()=>{
 const before=JSON.stringify(formalAbilityDefinitions),s=createLabBattleSession(createLabConfig({allSkillsReady:true,hpRatio:.5}));
 for(const a of s.actors)for(const k of ['heavy','special','awakening'])assert.equal(a.abilityState[k].cooldownRemaining,0);
 assert.equal(JSON.stringify(formalAbilityDefinitions),before);assert.equal(s.allies[0].hp/s.allies[0].maxHp,.5);
});
