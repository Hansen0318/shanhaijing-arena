import test from 'node:test';
import assert from 'node:assert/strict';
import { arenaToStage, ARENA_STAGE } from '../src/runtime/arenaProjection.js';

test('fixed Arena stage is 960x540', () => {
  assert.equal(ARENA_STAGE.width, 960);
  assert.equal(ARENA_STAGE.height, 540);
});

test('Arena coordinates map into stable logical stage positions', () => {
  assert.deepEqual(arenaToStage({ x: 0, y: -2 }), { x: 120, y: 86 });
  assert.deepEqual(arenaToStage({ x: 10, y: 2 }), { x: 840, y: 454 });
  assert.deepEqual(arenaToStage({ x: 5, y: 0 }), { x: 480, y: 270 });
});
