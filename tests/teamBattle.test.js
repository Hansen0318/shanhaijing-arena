import test from 'node:test';
import assert from 'node:assert/strict';
import { createStageBattleSession } from '../src/campaign/battleFactory.js';
import { findStage } from '../src/campaign/data.js';
import { rosterCatalog } from '../src/roster/catalog.js';
import { createDemoBattleSession } from '../src/runtime/demoBattle.js';
import { battlePortrait } from '../src/roster/battlePresentation.js';

test('selected definitions become A1/A2/A3 with their HP/stats; slot 2 remains front for any character',()=>{
 for(const ids of [['P1','P3','P5'],['P5','P1','P3']]) {
  const config={...findStage('1-1'),selectedTeam:ids};const s=createStageBattleSession(config);
  assert.equal(s.stageId,'1-1');assert.equal(s.chapterId,'chapter-1');
  for(let i=0;i<3;i++) {
   const actor=s.allies[i];assert.equal(actor.instanceId,`a${i+1}`);assert.equal(actor.definitionId,ids[i]);
   assert.equal(actor.hp,rosterCatalog[ids[i]].stats.maxHp);assert.equal(s.characterDefinitions[ids[i]],rosterCatalog[ids[i]]);
   assert.equal(actor.x,i===1?1.2:0);assert.equal(actor.y,i-1);
   assert.deepEqual(battlePortrait(s,actor.instanceId),{label:`A${i+1}\n${ids[i]}`,color:rosterCatalog[ids[i]].portrait.color});
  }
  assert.deepEqual(s.snapshot().enemies,createDemoBattleSession().snapshot().enemies);
  assert.deepEqual(battlePortrait(s,'e1'),{label:'E1',color:'#ee9475'});
  s.allies[0].damage(50);assert.equal(createStageBattleSession(config).allies[0].hp,rosterCatalog[ids[0]].stats.maxHp);
 }
});
test('factory rejects missing/duplicate/unowned/banned teams and keeps enemy config unchanged',()=>{
 const config=findStage('1-1');
 for(const selectedTeam of [undefined,[],['P1','P1','P2'],['P1','P2','missing']])assert.throws(()=>createStageBattleSession({...config,selectedTeam}));
 assert.throws(()=>createStageBattleSession({...config,selectedTeam:['P1','P3','P5'],bannedCharacters:['P3']}));
 assert.throws(()=>createStageBattleSession({...config,selectedTeam:['P1','P3','P5'],rosterOwnership:{characterIds:['P1']}}));
 assert.deepEqual(config.enemyLineup,['enemy','enemy','enemy']);
 assert.throws(()=>createStageBattleSession({...config,selectedTeam:['P1','P3','P5'],enemyLineup:['missing','enemy','enemy']}));
});
test('selected prototype team completes through unchanged combat resolver',()=>{
 const s=createStageBattleSession({...findStage('1-1'),selectedTeam:['P1','P3','P5']});
 for(let i=0;i<1801 && s.result()==='running';i++)s.step(.05);
 assert.ok(['victory','defeat','draw'].includes(s.result()));
});
