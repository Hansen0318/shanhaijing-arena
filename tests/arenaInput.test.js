import test from 'node:test';
import assert from 'node:assert/strict';
import { hitTestCircle, joystickVectorFromPoint } from '../src/runtime/arenaInput.js';

const joystick = {
  x: 70,
  y: 435,
  inputRadius: 30,
  deadZone: 0.03,
};

test('circle hit test accepts center and rejects outside radius', () => {
  assert.equal(hitTestCircle({ x: 10, y: 10 }, { x: 10, y: 10 }, 20), true);
  assert.equal(hitTestCircle({ x: 31, y: 10 }, { x: 10, y: 10 }, 20), false);
});

test('joystick center returns zero vector', () => {
  assert.deepEqual(joystickVectorFromPoint({ x: 70, y: 435 }, joystick), {
    x: 0, y: 0, magnitude: 0,
  });
});

test('joystick reaches full magnitude at input radius', () => {
  const result = joystickVectorFromPoint({ x: 100, y: 435 }, joystick);
  assert.ok(Math.abs(result.x - 1) < 1e-12);
  assert.ok(Math.abs(result.y) < 1e-12);
  assert.ok(Math.abs(result.magnitude - 1) < 1e-12);
});

test('joystick diagonal vector is normalized at maximum magnitude', () => {
  const result = joystickVectorFromPoint({ x: 100, y: 465 }, joystick);
  assert.ok(Math.abs(Math.hypot(result.x, result.y) - 1) < 1e-12);
});
