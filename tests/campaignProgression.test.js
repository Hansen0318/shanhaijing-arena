import test from 'node:test';
import assert from 'node:assert/strict';
import { initialProgress, recordVictory, stageStatus, chapterStatus, normalizeProgress, devProgress } from '../src/campaign/progression.js';
import { createPersistence } from '../src/campaign/persistence.js';

test('fresh save exposes only 1-1 and Chapter 1', () => {
 const p=initialProgress(); assert.deepEqual(p.unlockedStages,['1-1']); assert.deepEqual(p.unlockedChapters,['chapter-1']);
 assert.equal(stageStatus(p,'1-2'),'locked'); assert.equal(chapterStatus(p,'chapter-2'),'locked');
});
test('victory unlocks successor and cleared stage remains replayable/idempotent', () => {
 const p=recordVictory(initialProgress(),'1-1'); assert.equal(stageStatus(p,'1-1'),'cleared'); assert.equal(stageStatus(p,'1-2'),'available');
 assert.deepEqual(recordVictory(p,'1-1'),p); assert.equal(stageStatus(p,'1-3'),'locked');
});
test('five victories clear Chapter 1 and unlock Chapter 2 first stage', () => {
 let p=initialProgress(); for(let s=1;s<=5;s++) p=recordVictory(p,`1-${s}`);
 assert.equal(chapterStatus(p,'chapter-1'),'cleared'); assert.equal(chapterStatus(p,'chapter-2'),'available');
 assert.equal(stageStatus(p,'2-1'),'available'); assert.equal(stageStatus(p,'2-2'),'locked');
 assert.equal(stageStatus(p,'1-1'),'cleared');
});
test('locked/unknown wins cannot unlock content or mutate progress', () => {
 const p=initialProgress(); assert.deepEqual(recordVictory(p,'1-5'),p); assert.deepEqual(recordVictory(p,'unknown'),p);
 assert.equal(stageStatus(p,'unknown'),'locked'); assert.equal(chapterStatus(p,'unknown'),'locked');
});
test('storage reload restores authoritative wins; malformed and obsolete saves reset', () => {
 let value=null; const storage={getItem:()=>value,setItem:(_k,v)=>{value=v;}};
 const save=createPersistence(storage); save.save(recordVictory(initialProgress(),'1-1'));
 assert.equal(stageStatus(createPersistence(storage).load(),'1-2'),'available');
 value='bad json'; assert.deepEqual(save.load(),initialProgress());
 value=JSON.stringify({version:99,clearedStages:['1-1']}); assert.deepEqual(save.load(),initialProgress());
 assert.deepEqual(normalizeProgress({version:1,clearedStages:['1-5'],unlockedStages:['6-5']}),initialProgress());
});
test('storage denial is reported while pure in-memory progression remains usable', () => {
 const save=createPersistence({getItem(){throw Error('denied');},setItem(){throw Error('denied');}});
 assert.deepEqual(save.load(),initialProgress()); const p=recordVictory(initialProgress(),'1-1');
 assert.equal(save.save(p),false); assert.equal(stageStatus(p,'1-2'),'available');
});
test('unlock-all fixture is isolated, not accepted as a formal save', () => {
 const p=devProgress(); assert.equal(stageStatus(p,'6-5'),'available'); assert.deepEqual(normalizeProgress(p),initialProgress());
});
