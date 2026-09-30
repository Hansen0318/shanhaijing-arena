import test from 'node:test';
import assert from 'node:assert/strict';
import { CampaignController } from '../src/campaign/controller.js';

test('chapter navigation rejects locked/unknown and BACK returns chapter grid',()=>{
 const c=new CampaignController(); assert.equal(c.screen,'chapters');
 assert.equal(c.openChapter('chapter-2'),false); assert.equal(c.openChapter('missing'),false);
 assert.equal(c.openChapter('chapter-1'),true); assert.equal(c.screen,'stages'); assert.equal(c.selectedStageId,'1-1');
 assert.equal(c.back(),true); assert.equal(c.screen,'chapters');
});
test('stage thumbnail updates preview only; locked/foreign selection cannot START',()=>{
 const c=new CampaignController(); assert.equal(launch(c),null); c.openChapter('chapter-1');
 assert.equal(c.selectStage('1-2'),false); assert.equal(c.selectStage('2-1'),false);
 assert.equal(c.screen,'stages'); assert.equal(launch(c).stageId,'1-1'); assert.equal(c.screen,'battle');
 assert.equal(c.back(),false); assert.equal(c.openChapter('chapter-1'),false);
});
test('dev navigation can preview 1-3 without launching or reading/writing formal saves',()=>{
 const persistence={load(){throw Error('fixture read formal save');},save(){throw Error('fixture saved');}};
 const c=new CampaignController({dev:true,persistence}); c.openChapter('chapter-1'); c.selectStage('1-3');
 assert.equal(c.screen,'stages'); assert.equal(c.selectedStageId,'1-3'); assert.equal(launch(c).stageId,'1-3');
});

test('Victory EXIT returns correct chapter with CLEAR/unlock; replay Retry keeps same stage',()=>{
 const c=new CampaignController();c.openChapter('chapter-1');launch(c);
 assert.equal(c.finishBattle('1-1','victory'),true);assert.equal(c.finishBattle('1-1','victory'),false);
 assert.equal(c.exitBattle(),true);assert.equal(c.screen,'stages');assert.equal(c.chapterId,'chapter-1');
 assert.ok(c.progress.clearedStages.includes('1-1'));assert.ok(c.progress.unlockedStages.includes('1-2'));
 c.selectStage('1-1');assert.equal(launch(c).stageId,'1-1');c.finishBattle('1-1','victory');
 assert.equal(c.retryBattle().stageId,'1-1');assert.equal(c.screen,'battle');assert.equal(c.outcome,null);
});
test('NEXT shows successor preview and waits for explicit START',()=>{
 const c=new CampaignController();c.openChapter('chapter-1');launch(c);c.finishBattle('1-1','victory');
 assert.equal(c.nextPreview(),true);assert.equal(c.screen,'stages');assert.equal(c.selectedStageId,'1-2');
 assert.equal(launch(c).stageId,'1-2');
});
for(const outcome of ['defeat','draw']) test(`${outcome} does not unlock and offers only Retry/Exit`,()=>{
 const c=new CampaignController();c.openChapter('chapter-1');launch(c);c.finishBattle('1-1',outcome);
 assert.deepEqual(c.progress.unlockedStages,['1-1']);assert.deepEqual(c.progress.clearedStages,[]);
 assert.equal(c.nextPreview(),false);assert.equal(c.retryBattle().stageId,'1-1');
 c.finishBattle('1-1',outcome);assert.equal(c.exitBattle(),true);assert.equal(c.chapterId,'chapter-1');
});
test('chapter finale NEXT opens Chapter 2 / 2-1 preview and completed chapter reenters',()=>{
 const c=new CampaignController();c.openChapter('chapter-1');
 for(let s=1;s<=5;s++){c.selectStage(`1-${s}`);launch(c);c.finishBattle(`1-${s}`,'victory');if(s<5)c.exitBattle();}
 assert.ok(c.progress.clearedChapters.includes('chapter-1'));assert.equal(c.nextPreview(),true);
 assert.equal(c.chapterId,'chapter-2');assert.equal(c.selectedStageId,'2-1');assert.equal(c.screen,'stages');
 c.back();assert.equal(c.openChapter('chapter-1'),true);assert.equal(c.selectStage('1-5'),true);
});
test('result cannot be forged for wrong stage/invalid outcome or outside a battle',()=>{
 const c=new CampaignController();assert.equal(c.finishBattle('1-1','victory'),false);c.openChapter('chapter-1');launch(c);
 assert.equal(c.finishBattle('1-5','victory'),false);assert.equal(c.finishBattle('1-1','running'),false);
 assert.equal(c.retryBattle(),null);assert.equal(c.nextPreview(),false);
});
test('unfinished Exit returns the same preview without writing or unlocking; late result is ignored',()=>{
 let writes=0;
 const c=new CampaignController({persistence:{load:()=>undefined,save:()=>writes++}});
 c.openChapter('chapter-1');launch(c);
 const before=structuredClone(c.progress);
 assert.equal(c.exitBattle(),true);
 assert.equal(c.screen,'stages');assert.equal(c.selectedStageId,'1-1');assert.equal(c.chapterId,'chapter-1');
 assert.deepEqual(c.progress,before);assert.equal(writes,0);
 assert.equal(c.finishBattle('1-1','victory'),false);
 assert.equal(c.exitBattle(),false);
});
test('Exit from replay preserves earlier CLEAR and unlocks across reload',()=>{
 let saved;
 const c=new CampaignController({persistence:{load:()=>saved,save:p=>{saved=structuredClone(p);}}});
 c.openChapter('chapter-1');launch(c);c.finishBattle('1-1','victory');c.exitBattle();
 launch(c);const before=structuredClone(c.progress);assert.equal(c.exitBattle(),true);
 assert.deepEqual(c.progress,before);assert.deepEqual(saved,before);
});
test('Victory persistence is saved once and controller reload restores unlock',()=>{
 let saved=null, writes=0; const persistence={load:()=>saved??undefined,save:p=>{saved=structuredClone(p);writes++;return true;}};
 const c=new CampaignController({persistence});c.openChapter('chapter-1');launch(c);c.finishBattle('1-1','victory');c.finishBattle('1-1','victory');
 assert.equal(writes,1);assert.ok(new CampaignController({persistence}).progress.unlockedStages.includes('1-2'));
});
test('last campaign stage Victory has no successor',()=>{
 const c=new CampaignController({dev:true});c.openChapter('chapter-6');c.selectStage('6-5');launch(c);c.finishBattle('6-5','victory');
 assert.equal(c.nextPreview(),false);assert.equal(c.exitBattle(),true);
});

function launch(c) {
 if(c.screen==='stages') {
  c.openTeamSelect();
  if(!c.teamSelection.canBattle)for(const id of ['P1','P2','P3'])if(!c.teamSelection.slots.includes(id))c.teamSelection.toggle(id);
 }
 return c.startBattle();
}
