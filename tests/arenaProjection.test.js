import test from 'node:test';
import assert from 'node:assert/strict';
import { arenaToViewport, ARENA_LAYOUT } from '../src/runtime/arenaProjection.js';

test('fixed-view arena layout keeps symmetric viewport padding', () => {
  assert.equal(ARENA_LAYOUT.horizontalPaddingRatio, 0.12);
  assert.equal(ARENA_LAYOUT.verticalPaddingRatio, 0.16);
});

test('960x540 viewport maps the whole 0..10, -2..2 arena inside the screen', () => {
  assert.deepEqual(arenaToViewport({ x: 0, y: -2 }), { x: 115.19999999999999, y: 86.4 });
  assert.deepEqual(arenaToViewport({ x: 10, y: 2 }), { x: 844.8, y: 453.59999999999997 });
  assert.deepEqual(arenaToViewport({ x: 5, y: 0 }), { x: 480, y: 270 });
});

test('projection adapts to viewport size without changing camera', () => {
  assert.deepEqual(arenaToViewport({ x: 5, y: 0 }, { width: 1170, height: 532 }), { x: 585, y: 266 });
  assert.deepEqual(arenaToViewport({ x: 5, y: 0 }, { width: 390, height: 844 }), { x: 195, y: 422 });
});
