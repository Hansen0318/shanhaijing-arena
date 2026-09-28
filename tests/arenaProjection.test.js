import test from 'node:test';
import assert from 'node:assert/strict';
import { arenaToStage, ARENA_STAGE } from '../src/runtime/arenaProjection.js';

test('fixed Arena stage is 1120x540', () => {
  assert.equal(ARENA_STAGE.width, 1120);
  assert.equal(ARENA_STAGE.height, 540);
});

test('Arena coordinates map into stable logical stage positions', () => {
  assert.deepEqual(arenaToStage({ x: 0, y: -2 }), { x: 200, y: 86 });
  assert.deepEqual(arenaToStage({ x: 10, y: 2 }), { x: 920, y: 454 });
  assert.deepEqual(arenaToStage({ x: 5, y: 0 }), { x: 560, y: 270 });
});
