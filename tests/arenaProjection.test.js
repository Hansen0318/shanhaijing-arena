import test from 'node:test';
import assert from 'node:assert/strict';
import { arenaToWorld, ARENA_WORLD } from '../src/runtime/arenaProjection.js';

test('arena world is larger than the 960x540 viewport and keeps 16:9 aspect ratio', () => {
  assert.equal(ARENA_WORLD.width, 1280);
  assert.equal(ARENA_WORLD.height, 720);
  assert.equal(ARENA_WORLD.width / ARENA_WORLD.height, 16 / 9);
  assert.ok(ARENA_WORLD.width > 960);
  assert.ok(ARENA_WORLD.height > 540);
});

test('one stable projection maps Arena coordinates into the fullscreen world', () => {
  assert.deepEqual(arenaToWorld({ x: 0, y: -2 }), { x: 160, y: 120 });
  assert.deepEqual(arenaToWorld({ x: 10, y: 2 }), { x: 1120, y: 600 });
  assert.deepEqual(arenaToWorld({ x: 5, y: 0 }), { x: 640, y: 360 });
});
