import test from 'node:test';
import assert from 'node:assert/strict';
import { initialAcquisition, normalizeAcquisition, completeAcquisition } from '../src/acquisition/model.js';
import { upgradeTier } from '../src/acquisition/tier.js';
import { resultRewardLines } from '../src/acquisition/presentation.js';
import { collectionEntries } from '../src/collection/model.js';
import { CampaignController } from '../src/campaign/controller.js';
import { initialProgress, recordVictory } from '../src/campaign/progression.js';
const reward=(id,quantity=1)=>({items:[{type:'characterShard',characterId:id,quantity,repeat:'repeatable'}]});
const grant=(state,id,quantity=1,completionId='win')=>completeAcquisition(state,{stageId:'future-stage',completionId,outcome:'victory',reward:reward(id,quantity)});
const save=(id,earned,spent,tier)=>normalizeAcquisition({version:3,shardsByCharacterId:{[id]:earned},spentShardsByCharacterId:{[id]:spent},tierByCharacterId:{[id]:tier}});
test('locked 4 plus1 shows post-acquisition T0 0/5 and UNLOCKED, leaves input ledger intact',()=>{
 const before=save('P4',4,0,null),snapshot=structuredClone(before),tx=grant(before,'P4');
 assert.deepEqual(resultRewardLines(tx),['九尾狐 Shard +1   0 / 5   九尾狐 UNLOCKED']);
 assert.equal(tx.state.shardsByCharacterId.P4,5);assert.equal(tx.state.spentShardsByCharacterId.P4,5);
 assert.deepEqual(before,snapshot);assert.deepEqual(tx.unlockedCharacterIds,['P4']);
 assert.equal(collectionEntries(tx.state).find(e=>e.definition.id==='P4').shardLabel,'0 / 5');
});
for(const [id,earned,spent,tier,label,name] of [
 ['P5',8,5,'T0','4 / 5','狌狌'],['P1',6,0,'T0','7 / 5','鹿蜀'],
 ['P2',12,5,'T1','8 / 10','猼訑'],['P3',28,15,'T2','14 / 15','赤鱬'],
 ['P4',36,35,'T3','MAX','九尾狐'],['P5',2,0,null,'3 / 5','狌狌'],
])test(`${id} ${tier??'locked'} Result and Collection both show ${label} after reward`,()=>{
 const tx=grant(save(id,earned,spent,tier),id),before=structuredClone(tx);
 assert.deepEqual(resultRewardLines(tx),[`${name} Shard +1   ${label}`]);
 assert.equal(collectionEntries(tx.state).find(e=>e.definition.id===id).shardLabel,label);
 assert.equal(tx.shardCounts[id],earned+1);assert.equal(tx.state.shardsByCharacterId[id],earned+1);
 assert.equal(tx.state.spentShardsByCharacterId[id],spent);assert.deepEqual(tx,before);
});
test('multiple reward characters use their own Tier/ledger and duplicate rows aggregate only the grant',()=>{
 const s=normalizeAcquisition({version:3,shardsByCharacterId:{P1:8,P2:12,P3:28,P4:4,P5:36},spentShardsByCharacterId:{P1:5,P2:5,P3:15,P5:35},tierByCharacterId:{P1:'T0',P2:'T1',P3:'T2',P5:'T3'}});
 const items=['P1','P2','P3','P4','P5','P1'].map(id=>reward(id).items[0]);
 const tx=completeAcquisition(s,{stageId:'later-chapter',completionId:'multi',outcome:'victory',reward:{items}});
 assert.deepEqual(resultRewardLines(tx),['鹿蜀 Shard +2   5 / 5','猼訑 Shard +1   8 / 10','赤鱬 Shard +1   14 / 15','九尾狐 Shard +1   0 / 5   九尾狐 UNLOCKED','狌狌 Shard +1   MAX']);
 const entries=collectionEntries(tx.state);for(const [index,id] of ['P1','P2','P3','P4','P5'].entries())assert.ok(resultRewardLines(tx)[index].includes(`   ${entries.find(e=>e.definition.id===id).shardLabel}`));
});
test('repeat farming increases available; Result formatting does not spend or upgrade, Tier upgrade remains5',()=>{
 const first=grant(save('P5',8,5,'T0'),'P5'),second=grant(first.state,'P5',1,'repeat');
 assert.deepEqual(resultRewardLines(first),['狌狌 Shard +1   4 / 5']);
 assert.deepEqual(resultRewardLines(second),['狌狌 Shard +1   5 / 5']);
 assert.equal(second.state.shardsByCharacterId.P5,10);assert.equal(second.state.spentShardsByCharacterId.P5,5);assert.equal(second.state.tierByCharacterId.P5,'T0');
 const upgrade=upgradeTier(second.state,{characterId:'P5',expectedTier:'T0',requestId:'upgrade'});
 assert.equal(upgrade.consumed,5);assert.equal(upgrade.state.shardsByCharacterId.P5,10);assert.equal(upgrade.state.spentShardsByCharacterId.P5,10);assert.equal(upgrade.state.tierByCharacterId.P5,'T1');
});
test('controller exposes post-state to Result for Chapter2 first/replay with unchanged persisted ledger',()=>{
 let progress=initialProgress();for(let i=1;i<=5;i++)progress=recordVictory(progress,`1-${i}`);
 const writes=[],c=new CampaignController({persistence:{load:()=>progress,save(){}},acquisitionPersistence:{load:()=>save('P1',10,5,'T1'),save:s=>writes.push(structuredClone(s))}});
 c.openChapter('chapter-2');c.openTeamSelect();for(const id of ['P1','P2','P3'])c.teamSelection.toggle(id);c.startBattle();
 c.finishBattle('2-1','victory');assert.deepEqual(resultRewardLines(c.rewardResult),['鹿蜀 Shard +3   8 / 10','九尾狐 Shard +2   2 / 5']);
 assert.deepEqual(c.rewardResult.state,c.acquisition);assert.deepEqual(writes[0],c.acquisition);
 const first=c.rewardResult;c.retryBattle();c.finishBattle('2-1','victory');
 assert.deepEqual(resultRewardLines(c.rewardResult),['九尾狐 Shard +1   3 / 5']);assert.deepEqual(resultRewardLines(first),['鹿蜀 Shard +3   8 / 10','九尾狐 Shard +2   2 / 5']);
 assert.equal(c.rewardResult.shardCounts.P1,13);assert.equal(c.rewardResult.shardCounts.P4,3);assert.equal(c.acquisition.spentShardsByCharacterId.P1,5);assert.equal(c.acquisition.tierByCharacterId.P1,'T1');
});
