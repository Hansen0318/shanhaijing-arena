import test from 'node:test';
import assert from 'node:assert/strict';
import { arenaToWorld } from '../src/runtime/arenaProjection.js';

test('one stable projection maps Arena coordinates independently of viewport size', () => {
  assert.deepEqual(arenaToWorld({ x: 0, y: -2 }), { x: 260, y: 165 });
  assert.deepEqual(arenaToWorld({ x: 10, y: 2 }), { x: 850, y: 375 });
  assert.deepEqual(arenaToWorld({ x: 5, y: 0 }), { x: 555, y: 270 });
});
