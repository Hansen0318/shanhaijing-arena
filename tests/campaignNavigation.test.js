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
 const c=new CampaignController(); assert.equal(c.startBattle(),null); c.openChapter('chapter-1');
 assert.equal(c.selectStage('1-2'),false); assert.equal(c.selectStage('2-1'),false);
 assert.equal(c.screen,'stages'); assert.equal(c.startBattle().stageId,'1-1'); assert.equal(c.screen,'battle');
 assert.equal(c.back(),false); assert.equal(c.openChapter('chapter-1'),false);
});
test('dev navigation can preview 1-3 without launching or reading/writing formal saves',()=>{
 const persistence={load(){throw Error('fixture read formal save');},save(){throw Error('fixture saved');}};
 const c=new CampaignController({dev:true,persistence}); c.openChapter('chapter-1'); c.selectStage('1-3');
 assert.equal(c.screen,'stages'); assert.equal(c.selectedStageId,'1-3'); assert.equal(c.startBattle().stageId,'1-3');
});
