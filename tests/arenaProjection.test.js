import test from 'node:test';
import assert from 'node:assert/strict';
import { arenaToStage, ARENA_STAGE } from '../src/runtime/arenaProjection.js';

test('fixed Arena stage is 1120x540', () => {
  assert.equal(ARENA_STAGE.width, 1120);
  assert.equal(ARENA_STAGE.height, 540);
});

test('expanded Arena coordinates reach the sand field edges with actor-safe margin', () => {
  const left = arenaToStage({ x: ARENA_STAGE.xMin, y: -2 });
  const right = arenaToStage({ x: ARENA_STAGE.xMax, y: 2 });
  const center = arenaToStage({ x: 5, y: 0 });

  assert.ok(Math.abs(left.x - 32) < 0.001);
  assert.ok(Math.abs(right.x - 1088) < 0.001);
  assert.ok(Math.abs(center.x - 560) < 0.001);
  assert.equal(left.y, 86);
  assert.equal(right.y, 454);
  assert.equal(center.y, 270);
});

test('original spawn coordinates preserve their previous screen positions', () => {
  const allySpawn = arenaToStage({ x: 0, y: 0 });
  const enemySpawn = arenaToStage({ x: 10, y: 0 });

  assert.ok(Math.abs(allySpawn.x - 200) < 0.001);
  assert.ok(Math.abs(enemySpawn.x - 920) < 0.001);
});
