import test from 'node:test';
import assert from 'node:assert/strict';
import { arenaToStage, ARENA_STAGE, fitStageToViewport } from '../src/runtime/arenaProjection.js';

test('fixed Arena stage is 960x540', () => {
  assert.equal(ARENA_STAGE.width, 960);
  assert.equal(ARENA_STAGE.height, 540);
});

test('Arena coordinates map into stable logical stage positions', () => {
  assert.deepEqual(arenaToStage({ x: 0, y: -2 }), { x: 120, y: 86 });
  assert.deepEqual(arenaToStage({ x: 10, y: 2 }), { x: 840, y: 454 });
  assert.deepEqual(arenaToStage({ x: 5, y: 0 }), { x: 480, y: 270 });
});

test('stage contain-fit preserves aspect and centers in wide landscape viewport', () => {
  const fit = fitStageToViewport({ width: 1170, height: 532 });
  assert.ok(Math.abs(fit.scale - (532 / 540)) < 1e-12);
  assert.ok(Math.abs(fit.offsetX - ((1170 - 960 * fit.scale) / 2)) < 1e-12);
  assert.ok(Math.abs(fit.offsetY) < 1e-12);
});

test('stage contain-fit also works in portrait without cropping', () => {
  const fit = fitStageToViewport({ width: 390, height: 844 });
  assert.ok(Math.abs(fit.scale - (390 / 960)) < 1e-12);
  assert.ok(Math.abs(fit.offsetX) < 1e-12);
  assert.ok(fit.offsetY > 0);
});
