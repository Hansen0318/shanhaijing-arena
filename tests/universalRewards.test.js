import test from 'node:test';
import assert from 'node:assert/strict';
import { CampaignController } from '../src/campaign/controller.js';
import { findStage } from '../src/campaign/data.js';
import { stageRewardRows,resultRewardLines } from '../src/acquisition/presentation.js';
import { createAcquisitionPersistence } from '../src/acquisition/persistence.js';
const tuples=[[['P4',3],['P2',2],['P2',1]],[['P4',2],['P1',2],['P1',1]],[['P5',2],['P3',2],['P3',1]],[['P5',2],['P2',2],['P5',1]],[['P5',3],['P1',2],['P5',2]]];
const items=i=>tuples[i].map(([characterId,quantity],n)=>({type:'characterShard',characterId,quantity,repeat:n===2?'repeatable':'firstClear'}));
function launch(c,id){if(c.screen==='result')c.exitBattle();if(c.screen==='chapters')c.openChapter(findStage(id).chapterId);c.selectStage(id);c.openTeamSelect();for(const x of ['P1','P2','P3'])if(!c.teamSelection.slots.includes(x))c.teamSelection.toggle(x);const config=c.startBattle();assert.ok(config);return config;}
for(let i=0;i<5;i++)test(`live1-${i+1} firstClear and replay use config; cleared Preview stays farmable`,()=>{
 const c=new CampaignController({dev:true}),id=`1-${i+1}`,stage=findStage(id),expected=items(i);
 assert.deepEqual(stage.reward.items,expected);
 assert.deepEqual(stageRewardRows(stage,c.acquisition).map(r=>r.status),['FIRST CLEAR','FIRST CLEAR','REPEATABLE']);
 const first=launch(c,id);c.finishBattle(id,'victory',first.battleCompletionId);assert.deepEqual(c.rewardResult.grantedItems,expected.slice(0,2));assert.equal(resultRewardLines(c.rewardResult).length,2);
 assert.equal(c.finishBattle(id,'victory',first.battleCompletionId),false);
 assert.deepEqual(stageRewardRows(stage,c.acquisition).map(r=>r.status),['CLAIMED','CLAIMED','REPEATABLE']);
 const replay=launch(c,id);assert.equal(c.finishBattle(id,'victory',first.battleCompletionId),false);c.finishBattle(id,'victory',replay.battleCompletionId);assert.deepEqual(c.rewardResult.grantedItems,[expected[2]]);assert.equal(resultRewardLines(c.rewardResult).length,1);
 const before=structuredClone(c.acquisition);assert.equal(c.finishBattle(id,'victory',replay.battleCompletionId),false);assert.deepEqual(c.acquisition,before);
});
test('live normal Chapter1 path unlocks P4/P5 and persists owned inventory and future farm gains',()=>{
 const map=new Map(),storage={getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v)};
 const c=new CampaignController({acquisitionPersistence:createAcquisitionPersistence(storage)});
 for(let i=0;i<5;i++){
  const id=`1-${i+1}`,config=launch(c,id);c.finishBattle(id,'victory',config.battleCompletionId);
  if(i===1){assert.ok(c.ownership.characterIds.includes('P4'));assert.equal(c.acquisition.shardsByCharacterId.P4,5);}
 }
 assert.deepEqual(c.acquisition.shardsByCharacterId,{P1:4,P2:4,P3:2,P4:5,P5:7});
 c.exitBattle();c.openTeamSelect();assert.ok(c.teamSelection.available.includes('P4'));assert.ok(c.teamSelection.available.includes('P5'));c.back();
 const config=launch(c,'1-5');c.finishBattle('1-5','victory',config.battleCompletionId);assert.equal(c.rewardResult.shardCounts.P5,9);
 const reload=createAcquisitionPersistence(storage).load();assert.equal(reload.shardsByCharacterId.P1,4);assert.equal(reload.shardsByCharacterId.P5,9);assert.ok(reload.ownedCharacterIds.includes('P5'));
});
test('future Chapter2 config has three first-clear characters and two replay items through unchanged engine',()=>{
 const stage=findStage('2-2'),original=stage.reward;
 const first=[['P1',2],['P4',1],['P5',3]].map(([characterId,quantity])=>({type:'characterShard',characterId,quantity,repeat:'firstClear'}));
 const replay=[first[0],first[2]].map(item=>({...item,quantity:1,repeat:'repeatable'}));stage.reward={items:[...first,...replay]};
 try{const c=new CampaignController({dev:true});let config=launch(c,'2-2');c.finishBattle('2-2','victory',config.battleCompletionId);assert.deepEqual(c.rewardResult.grantedItems,first);assert.equal(resultRewardLines(c.rewardResult).length,3);config=launch(c,'2-2');c.finishBattle('2-2','victory',config.battleCompletionId);assert.deepEqual(c.rewardResult.grantedItems,replay);assert.deepEqual(stageRewardRows(stage,c.acquisition).map(r=>r.status),['CLAIMED','CLAIMED','CLAIMED','REPEATABLE','REPEATABLE']);}finally{stage.reward=original;}
});
