import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { campaign, orderedChapters, chapterRows, findStage, nextStage } from '../src/campaign/data.js';

test('six ordered chapters use five columns and Chapter 6 starts next row', () => {
  assert.deepEqual(orderedChapters().map(c => c.chapterNumber), [1,2,3,4,5,6]);
  assert.deepEqual(chapterRows().map(row => row.map(c => c.chapterNumber)), [[1,2,3,4,5],[6]]);
  assert.deepEqual(chapterRows([...campaign].reverse()).map(row => row.map(c => c.chapterNumber)), [[1,2,3,4,5],[6]]);
});
test('each chapter owns five unique configs and independent placeholder images', () => {
  const ids = new Set(), images = new Set();
  for (const chapter of campaign) {
    assert.equal(chapter.stages.length, 5);
    assert.ok(existsSync(`public/${chapter.thumbnail}`));
    for (const [i, stage] of chapter.stages.entries()) {
      assert.equal(stage.chapterId, chapter.chapterId);
      assert.equal(stage.stageId, `${chapter.chapterNumber}-${i+1}`);
      assert.equal(findStage(stage.stageId), stage);
      ids.add(stage.stageId); images.add(stage.previewImage);
      assert.ok(existsSync(`public/${stage.previewImage}`));
      for (const field of ['battlefieldId','allyConfig','enemyLineup','allySpawnFormation','enemySpawnFormation','battleDuration','stageType','finale','reward','unlockRequirement']) assert.ok(field in stage, field);
    }
  }
  assert.equal(ids.size,30); assert.equal(images.size,30);
  assert.notEqual(campaign[0].stages[0].enemyLineup, campaign[0].stages[1].enemyLineup);
});
test('successors are driven by data including chapter boundary and final stage', () => {
  assert.equal(nextStage('1-1').stageId,'1-2');
  assert.equal(nextStage('1-5').stageId,'2-1');
  assert.equal(nextStage('6-5'),null);
  assert.equal(findStage('missing'),null);
});
