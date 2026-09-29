import test from 'node:test';
import assert from 'node:assert/strict';
import { castVisual } from '../src/runtime/castVfx.js';

test('ranged placeholder travels toward target but never suggests an out-of-range hit', () => {
  const visual = castVisual({
    actorId: 'a2', category: 'special', origin: { x: 0, y: 0 },
    target: { x: 10, y: 0 }, hit: false, minRange: 1, maxRange: 2.5,
  }, (point) => ({ x: point.x * 70, y: point.y * 70 }));
  assert.equal(visual.ranged, true);
  assert.equal(visual.length, 175);
  assert.deepEqual(visual.direction, { x: 1, y: 0 });
});

test('melee and empty-air casts stay local and retain a facing direction', () => {
  const visual = castVisual({
    actorId: 'e1', category: 'heavy', origin: { x: 3, y: 1 },
    target: null, hit: false, minRange: 0, maxRange: 2,
  }, (point) => ({ x: point.x * 70, y: point.y * 70 }));
  assert.equal(visual.ranged, false);
  assert.deepEqual(visual.direction, { x: -1, y: 0 });
  assert.equal(visual.length, 0);
});

test('overlapping caster and target keep finite placeholder coordinates', () => {
  const visual = castVisual({
    actorId: 'a1', category: 'basic', origin: { x: 2, y: 2 },
    target: { x: 2, y: 2 }, hit: true, minRange: 0, maxRange: 1.8,
  }, (point) => ({ x: point.x * 70, y: point.y * 70 }));
  assert.deepEqual(visual.direction, { x: 1, y: 0 });
});
