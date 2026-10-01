import { prototypeOwnership } from '../src/roster/catalog.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import { CampaignController } from '../src/campaign/controller.js';
import { findStage } from '../src/campaign/data.js';

function pick(c,ids=['P1','P3','P5']) {for(const id of ids)c.teamSelection.toggle(id);}
test('START opens Team Select, BACK retains same preview, BATTLE requires 3 and routes ordered team',()=>{
 const c=new CampaignController({dev:true});assert.equal(c.openTeamSelect(),false);
 c.openChapter('chapter-1');c.selectStage('1-3');assert.equal(c.startBattle(),null);
 assert.equal(c.openTeamSelect(),true);assert.equal(c.screen,'team');assert.equal(c.selectedStageId,'1-3');
 assert.equal(c.startBattle(),null);pick(c,['P1','P3']);assert.equal(c.startBattle(),null);
 assert.equal(c.back(),true);assert.equal(c.screen,'stages');assert.equal(c.selectedStageId,'1-3');
 c.openTeamSelect();pick(c);const config=c.startBattle();assert.equal(config.stageId,'1-3');
 assert.deepEqual(config.selectedTeam,['P1','P3','P5']);assert.equal(c.screen,'battle');
 assert.equal(c.back(),false);assert.equal(c.openTeamSelect(),false);
 config.selectedTeam[0]='P2';assert.deepEqual(c.battleTeam,['P1','P3','P5']);
});
for(const outcome of ['victory','defeat','draw'])test(`${outcome} Retry preserves team; Exit and reentry preload it`,()=>{
 const c=new CampaignController({ownership:prototypeOwnership()});c.openChapter('chapter-1');c.openTeamSelect();pick(c);c.startBattle();
 c.finishBattle('1-1',outcome);assert.deepEqual(c.retryBattle().selectedTeam,['P1','P3','P5']);
 c.finishBattle('1-1',outcome);c.exitBattle();assert.equal(c.selectedStageId,'1-1');
 c.openTeamSelect();assert.deepEqual(c.teamSelection.slots,['P1','P3','P5']);
 c.teamSelection.toggle('P3');c.teamSelection.toggle('P2');assert.deepEqual(c.startBattle().selectedTeam,['P1','P2','P5']);
});
test('Next Stage opens preview then START preloads recent team; illegal stale team never launches',()=>{
 const c=new CampaignController({ownership:prototypeOwnership()});c.openChapter('chapter-1');c.openTeamSelect();pick(c);c.startBattle();c.finishBattle('1-1','victory');
 c.nextPreview();assert.equal(c.screen,'stages');assert.equal(c.selectedStageId,'1-2');
 const stage=findStage('1-2'),before=stage.bannedCharacters;stage.bannedCharacters=['P3'];
 try {
  c.openTeamSelect();assert.deepEqual(c.teamSelection.slots,['P1','P5',null]);assert.equal(c.startBattle(),null);
  c.teamSelection.slots=['P1','P3','P5'];assert.equal(c.startBattle(),null);
 }finally{stage.bannedCharacters=before;}
});
test('ownership loss after selection blocks start and Retry',()=>{
 const ownership={characterIds:['P1','P2','P3','P4','P5']};const c=new CampaignController({ownership});
 c.openChapter('chapter-1');c.openTeamSelect();pick(c);ownership.characterIds=['P1','P3'];assert.equal(c.startBattle(),null);
 ownership.characterIds.push('P5');c.startBattle();c.finishBattle('1-1','defeat');ownership.characterIds.pop();
 assert.equal(c.retryBattle(),null);assert.equal(c.screen,'result');
});
