import test from 'node:test';import assert from 'node:assert/strict';
import {createLabConfig} from '../src/dev/battleLab/config.js';import {createLabBattleSession} from '../src/dev/battleLab/battleFactory.js';
import {CampaignController} from '../src/campaign/controller.js';import {createStageBattleSession} from '../src/campaign/battleFactory.js';
import {rosterCatalog} from '../src/roster/catalog.js';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9);
test('same-seed Tier comparison reproducible across heal/control/area fixtures, collections bounded',()=>{
 for(const scenarioId of ['tier-comparison','status-control','persistent-area'])for(const allyTier of ['T0','T1','T2','T3']){
  const config=createLabConfig({scenarioId,allyTier,enemyTier:'T1'}),a=createLabBattleSession(config),b=createLabBattleSession(config);let steps=0;
  while(a.result()==='running'&&steps++<1800){a.step(.05);b.step(.05);assert.ok(a.statuses.records.size<=64);assert.ok(a.areas.records.size<=12);assert.ok(a.threats.records.size<=6);}
  assert.deepEqual(a.snapshot(),b.snapshot());assert.notEqual(a.result(),'running');assert.equal(a.tacticalEvaluations,b.tacticalEvaluations);assert.ok(a.tacticalEvaluations<=6*(Math.ceil(a.elapsedSeconds*4)+1));
 }
});
test('Campaign authoritative Tier snapshot produces full scaled HP without acquisition changes; Retry fresh',()=>{const c=new CampaignController();c.acquisition.tierByCharacterId.P1='T3';c.acquisition.shardsByCharacterId.P1=35;c.acquisition.spentShardsByCharacterId.P1=30;const before=JSON.stringify(c.acquisition);c.openChapter('chapter-1');c.openTeamSelect();c.teamSelection.slots=['P1','P2','P3'];const config=c.startBattle();const s=createStageBattleSession(config);near(s.allies[0].maxHp,245*3.75);assert.equal(s.allies[0].hp,s.allies[0].maxHp);s.step(.05);assert.equal(JSON.stringify(c.acquisition),before);const retry=createStageBattleSession(config);assert.equal(retry.elapsedSeconds,0);assert.equal(retry.statuses.records.size,0);assert.equal(retry.threats.records.size,0);});
test('all formal Tier projections preserve base DEF and ability crit metadata for every actor',()=>{for(const allyTier of ['T0','T1','T2','T3']){const s=createLabBattleSession(createLabConfig({allyTier,enemyTier:'T2'}));for(const a of s.actors){assert.equal(s.definitionForActor(a).stats.def,rosterCatalog[a.definitionId].stats.def);for(const slot of Object.values(a.abilityState)){const base=s.abilityDefinitions[slot.definitionId],resolved=s.actorAbilityDefinitions.get(a.instanceId)[slot.definitionId];for(const k of ['canCrit','critChance','critMultiplier'])assert.equal(resolved[k],base[k]);}}}});
