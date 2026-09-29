import test from 'node:test';
import assert from 'node:assert/strict';
import { arenaToStage, ARENA_STAGE } from '../src/runtime/arenaProjection.js';

test('fixed Arena stage is 1120x540', () => {
  assert.equal(ARENA_STAGE.width, 1120);
  assert.equal(ARENA_STAGE.height, 540);
});

test('expanded Arena coordinates use the wider visible field', () => {
  assert.deepEqual(arenaToStage({ x: -1.1, y: -2 }), { x: 120, y: 86 });
  assert.deepEqual(arenaToStage({ x: 11.1, y: 2 }), { x: 1000, y: 454 });
  assert.deepEqual(arenaToStage({ x: 5, y: 0 }), { x: 560, y: 270 });
});

test('original spawn coordinates remain visually near their pre-widening positions', () => {
  const allySpawn = arenaToStage({ x: 0, y: 0 });
  const enemySpawn = arenaToStage({ x: 10, y: 0 });

  assert.ok(Math.abs(allySpawn.x - 200) < 1);
  assert.ok(Math.abs(enemySpawn.x - 920) < 1);
});
