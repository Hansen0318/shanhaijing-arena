import test from 'node:test';
import assert from 'node:assert/strict';
import { createStageBattleSession } from '../src/campaign/battleFactory.js';
import { findStage as stageData } from '../src/campaign/data.js';
import { createDemoBattleSession } from '../src/runtime/demoBattle.js';
import { BattleSession } from '../src/combat/battleSession.js';

test('stage 1-1 and 1-3 route unique identities through the existing BattleSession',()=>{
 const first=createStageBattleSession(findStage('1-1')), third=createStageBattleSession(findStage('1-3'));
 assert.ok(first instanceof BattleSession);assert.ok(third instanceof BattleSession);
 assert.equal(first.stageId,'1-1');assert.equal(third.stageId,'1-3'); assert.equal(third.chapterId,'chapter-1');
 assert.deepEqual(first.enemies.map(a=>a.definitionId),['P5','P1','P3']);
 assert.deepEqual(first.allies.map(a=>a.definitionId),['P2','P4','P1']);
});
test('routing consumes lineup, formation, duration and returns fresh sessions for Retry',()=>{
 const config=structuredClone(findStage('1-1'));config.allySpawnFormation[0].x=2;config.battleDuration=90;
 const first=createStageBattleSession(config);assert.equal(first.allies[0].x,2);assert.equal(first.maxSeconds,90);
 first.allies[0].damage(10);const retry=createStageBattleSession(config);assert.equal(retry.allies[0].hp,320);
 assert.equal(findStage('1-1').allySpawnFormation[0].x,0);
 assert.throws(()=>createStageBattleSession({...config,enemyLineup:['missing','enemy','enemy']}));
});
test('legacy opt-out stage battle preserves seeded graybox Victory',()=>{
 // Explicit opt-out fixture protects the legacy ability contract's seeded Victory.
 // Production staged mechanics have independently tested termination/retry below.
 const session=createStageBattleSession(findStage('1-1'),{tacticalEnabled:false});
 for(const [id,table] of session.actorAbilityDefinitions)session.actorAbilityDefinitions.set(id,Object.fromEntries(Object.entries(table).map(([key,value])=>{const {stagedAction,...legacy}=value;return [key,legacy];})));
 for(let i=0;i<1801 && session.result()==='running';i++) session.step(.05);
 assert.equal(session.result(),'victory');
});

const findStage=id=>({...stageData(id),selectedTeam:['P2','P4','P1']});

test('current staged stage1-1 wins deterministically and Retry starts fresh',()=>{
 const run=()=>{const session=createStageBattleSession(findStage('1-1'),{tacticalEnabled:false});for(let i=0;i<1801&&session.result()==='running';i++)session.step(.05);return session;};
 const first=run(),retry=run();assert.equal(first.result(),'victory');assert.deepEqual(first.snapshot(),retry.snapshot());assert.equal(first.pendingActions.size,0);assert.equal(retry.pendingActions.size,0);
});
