import test from 'node:test';
import assert from 'node:assert/strict';
import { CampaignController } from '../src/campaign/controller.js';
import { findStage } from '../src/campaign/data.js';
import { createAcquisitionPersistence } from '../src/acquisition/persistence.js';
import { createPersistence,SAVE_KEY } from '../src/campaign/persistence.js';
import { createTeamPersistence } from '../src/roster/persistence.js';
import { initialProgress,recordVictory } from '../src/campaign/progression.js';
const storage=()=>{const map=new Map();return {getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v)};};
const options=s=>({persistence:createPersistence(s),teamPersistence:createTeamPersistence(s),acquisitionPersistence:createAcquisitionPersistence(s)});
function launch(c,id){if(c.screen==='result')c.exitBattle();if(c.screen==='chapters')c.openChapter('chapter-1');c.selectStage(id);c.openTeamSelect();for(const x of ['P1','P2','P3'])if(!c.teamSelection.slots.includes(x))c.teamSelection.toggle(x);return c.startBattle();}
function win(c,id){const config=launch(c,id);assert.ok(config);assert.equal(c.finishBattle(id,'victory',config.battleCompletionId),true);return c.rewardResult;}
test('normal ownership and stale team sanitation protect locked P4/P5 and exact-three',()=>{
 const c=new CampaignController({teamPersistence:{load:()=>['P5','missing','P1'],save(){}}});assert.deepEqual(c.ownership.characterIds,['P1','P2','P3']);c.openChapter('chapter-1');c.openTeamSelect();assert.deepEqual(c.teamSelection.slots,['P1',null,null]);assert.equal(c.teamSelection.toggle('P4'),false);assert.equal(c.startBattle(),null);
});
test('all Chapter1 stages configure first-clear multi items and a replay subset; later placeholders share schema',()=>{
 for(let i=1;i<=5;i++){const items=findStage(`1-${i}`).reward.items;assert.equal(items.filter(x=>x.repeat==='firstClear').length,2);assert.equal(items.filter(x=>x.repeat==='repeatable').length,1);}
 assert.deepEqual(findStage('2-1').reward.items,[]);
});
test('Chapter1 unlock path retains shards, owned inventory, replay farming and reload ownership',()=>{
 const s=storage(),c=new CampaignController(options(s));
 let r=win(c,'1-1');assert.equal(r.shardCounts.P4,3);assert.equal(r.grantedItems.length,2);assert.equal(c.finishBattle('1-1','victory'),false);
 r=win(c,'1-1');assert.equal(r.shardCounts.P4,3);assert.equal(r.shardCounts.P2,3);assert.equal(r.grantedItems[0].characterId,'P2');
 r=win(c,'1-2');assert.equal(r.shardCounts.P4,5);assert.deepEqual(r.unlockedCharacterIds,['P4']);
 c.exitBattle();c.openTeamSelect();assert.ok(c.teamSelection.available.includes('P4'));c.teamSelection.remove(0);assert.equal(c.teamSelection.toggle('P4'),true);assert.equal(c.teamSelection.canBattle,true);c.back();
 assert.equal(win(c,'1-3').shardCounts.P5,2);assert.equal(win(c,'1-4').shardCounts.P5,4);r=win(c,'1-5');assert.equal(r.shardCounts.P5,7);assert.deepEqual(r.unlockedCharacterIds,['P5']);
 assert.equal(win(c,'1-5').shardCounts.P5,9);assert.equal(win(c,'1-4').shardCounts.P5,10);
 const reload=new CampaignController(options(s));assert.deepEqual(reload.ownership.characterIds,['P1','P2','P3','P4','P5']);assert.equal(reload.acquisition.shardsByCharacterId.P4,5);assert.equal(reload.acquisition.shardsByCharacterId.P5,10);assert.equal(reload.acquisition.shardsByCharacterId.P2,5);assert.equal(reload.progress.clearedStages.length,5);
});
for(const outcome of ['defeat','draw'])test(`${outcome} result, Retry start, and unfinished Exit never grant`,()=>{
 const c=new CampaignController();launch(c,'1-1');const before=structuredClone(c.acquisition);c.finishBattle('1-1',outcome);assert.deepEqual(c.rewardResult.grantedItems,[]);assert.deepEqual(c.acquisition,before);assert.deepEqual(c.progress.clearedStages,[]);
 c.retryBattle();assert.deepEqual(c.acquisition,before);c.exitBattle();assert.deepEqual(c.acquisition,before);assert.equal(c.finishBattle('1-1','victory'),false);
});
test('Restart changes completion identity; stale old callback and late duplicate after Retry cannot grant',()=>{
 const c=new CampaignController(),old=launch(c,'1-1'),before=structuredClone(c.acquisition),fresh=c.restartBattle();assert.notEqual(old.battleCompletionId,fresh.battleCompletionId);assert.deepEqual(c.acquisition,before);assert.equal(c.finishBattle('1-1','victory',old.battleCompletionId),false);assert.equal(c.screen,'battle');assert.equal(c.finishBattle('1-1','victory',fresh.battleCompletionId),true);
 const retry=c.retryBattle();assert.notEqual(fresh.battleCompletionId,retry.battleCompletionId);assert.equal(c.finishBattle('1-1','victory',fresh.battleCompletionId),false);assert.equal(c.finishBattle('1-1','victory',retry.battleCompletionId),true);assert.equal(c.acquisition.shardsByCharacterId.P4,3);
});
test('pre-M3 Campaign clears remain intact and CLAIMED after migration/reload; stale P5 save sanitizes',()=>{
 const s=storage();let p=initialProgress();for(let i=1;i<=3;i++)p=recordVictory(p,`1-${i}`);s.setItem(SAVE_KEY,JSON.stringify(p));createTeamPersistence(s).save(['P1','P3','P5']);
 const c=new CampaignController(options(s));assert.deepEqual(c.progress,p);assert.deepEqual(c.acquisition.claimedStageIds,['1-1','1-2','1-3']);assert.deepEqual(win(c,'1-1').grantedItems,findStage('1-1').reward.items.filter(x=>x.repeat==='repeatable'));assert.equal(c.acquisition.shardsByCharacterId.P4,0);assert.deepEqual(new CampaignController(options(s)).progress,p);
});
test('dev unlock-all exposes all prototypes without touching ANY normal save',()=>{
 const forbidden={load(){throw Error('read normal save');},save(){throw Error('write normal save');}};
 const c=new CampaignController({dev:true,persistence:forbidden,teamPersistence:forbidden,acquisitionPersistence:forbidden});assert.equal(c.ownership.characterIds.length,5);win(c,'1-4');assert.equal(c.rewardResult.shardCounts.P5,2);
});
test('synthetic owned P1 reward integrates through valid Victory and persists without editing Chapter fixture',()=>{
 const stage=findStage('1-1'),original=stage.reward,s=storage();stage.reward={items:[{type:'characterShard',characterId:'P1',quantity:2,repeat:'repeatable'}]};
 try {const c=new CampaignController(options(s));assert.equal(win(c,'1-1').shardCounts.P1,2);assert.equal(win(c,'1-1').shardCounts.P1,4);const reload=new CampaignController(options(s));assert.equal(reload.acquisition.shardsByCharacterId.P1,4);assert.ok(reload.ownership.characterIds.includes('P1'));}finally{stage.reward=original;}
});
test('Team Select rerender preserves empty slot positions and selected slot order',()=>{
 const c=new CampaignController();launch(c,'1-1');c.finishBattle('1-1','defeat');c.exitBattle();c.openTeamSelect();c.teamSelection.remove(0);const before=[...c.teamSelection.slots];c.refreshTeamOwnership();assert.deepEqual(c.teamSelection.slots,before);assert.deepEqual(before,[null,'P2','P3']);
});

test('multi-item Victory, subset replay, duplicate receipts, owned persistence and unlock refresh integrate',()=>{
 const stage=findStage('1-1'),original=stage.reward,s=storage();
 const first=[{type:'characterShard',characterId:'P4',quantity:3,repeat:'firstClear'},{type:'characterShard',characterId:'P2',quantity:2,repeat:'firstClear'}];
 const replay={type:'characterShard',characterId:'P2',quantity:1,repeat:'repeatable'};
 stage.reward={items:[...first,replay]};
 try {
  const c=new CampaignController(options(s));c.acquisition.shardsByCharacterId.P4=2;
  const config=launch(c,'1-1');assert.equal(c.finishBattle('1-1','victory',config.battleCompletionId),true);
  assert.deepEqual(c.rewardResult.grantedItems,first);assert.deepEqual(c.rewardResult.unlockedCharacterIds,['P4']);
  assert.equal(c.finishBattle('1-1','victory',config.battleCompletionId),false);
  let reload=new CampaignController(options(s));assert.equal(reload.acquisition.shardsByCharacterId.P2,2);assert.equal(reload.acquisition.shardsByCharacterId.P4,5);
  reload.openChapter('chapter-1');reload.openTeamSelect();assert.ok(reload.teamSelection.available.includes('P4'));reload.back();
  assert.deepEqual(win(reload,'1-1').grantedItems,[replay]);assert.equal(reload.acquisition.shardsByCharacterId.P4,5);assert.equal(reload.acquisition.shardsByCharacterId.P2,3);
  assert.equal(reload.finishBattle('1-1','victory',config.battleCompletionId),false);
  reload=new CampaignController(options(s));assert.equal(reload.acquisition.shardsByCharacterId.P2,3);assert.equal(reload.acquisition.shardsByCharacterId.P4,5);assert.ok(reload.ownership.characterIds.includes('P2'));
 }finally{stage.reward=original;}
});
