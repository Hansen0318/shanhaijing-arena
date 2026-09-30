import test from 'node:test';
import assert from 'node:assert/strict';
import { createStageBattleSession } from '../src/campaign/battleFactory.js';
import { findStage } from '../src/campaign/data.js';
import { createDemoBattleSession } from '../src/runtime/demoBattle.js';
import { BattleSession } from '../src/combat/battleSession.js';

test('stage 1-1 and 1-3 route unique identities through the existing BattleSession',()=>{
 const first=createStageBattleSession(findStage('1-1')), third=createStageBattleSession(findStage('1-3'));
 assert.ok(first instanceof BattleSession);assert.ok(third instanceof BattleSession);
 assert.equal(first.stageId,'1-1');assert.equal(third.stageId,'1-3'); assert.equal(third.chapterId,'chapter-1');
 assert.deepEqual(first.snapshot(),createDemoBattleSession().snapshot());
});
test('routing consumes lineup, formation, duration and returns fresh sessions for Retry',()=>{
 const config=structuredClone(findStage('1-1'));config.allySpawnFormation[0].x=2;config.battleDuration=90;
 const first=createStageBattleSession(config);assert.equal(first.allies[0].x,2);assert.equal(first.maxSeconds,90);
 first.allies[0].damage(10);const retry=createStageBattleSession(config);assert.equal(retry.allies[0].hp,260);
 assert.equal(findStage('1-1').allySpawnFormation[0].x,0);
 assert.throws(()=>createStageBattleSession({...config,enemyLineup:['missing','enemy','enemy']}));
});
test('stage battle completes Victory under unchanged graybox rules',()=>{
 const session=createStageBattleSession(findStage('1-1'));
 for(let i=0;i<1801 && session.result()==='running';i++) session.step(.05);
 assert.equal(session.result(),'victory');
});
