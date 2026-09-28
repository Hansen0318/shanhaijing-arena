import test from 'node:test';
import assert from 'node:assert/strict';
import { clientToLogicalPoint } from '../src/runtime/canvasTouchAdapter.js';

test('maps CSS-scaled canvas client coordinates into 960x540 logical coordinates', () => {
  const rect = { left: 71, top: 0, width: 592, height: 333 };
  const point = clientToLogicalPoint(367, 166.5, rect, 960, 540);
  assert.ok(Math.abs(point.x - 480) < 1e-9);
  assert.ok(Math.abs(point.y - 270) < 1e-9);
});

test('maps visible canvas corners to logical corners', () => {
  const rect = { left: 71, top: 12, width: 592, height: 333 };
  assert.deepEqual(clientToLogicalPoint(71, 12, rect, 960, 540), { x: 0, y: 0 });
  assert.deepEqual(clientToLogicalPoint(663, 345, rect, 960, 540), { x: 960, y: 540 });
});

test('rejects zero-sized canvas rect', () => {
  assert.throws(() => clientToLogicalPoint(0, 0, { left: 0, top: 0, width: 0, height: 1 }, 960, 540));
});
