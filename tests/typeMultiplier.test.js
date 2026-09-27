import test from 'node:test';
import assert from 'node:assert/strict';
import { TYPES, getTypeMultiplier } from '../src/combat/typeMultiplier.js';

test('type triangle applies +15% advantage', () => {
  assert.equal(getTypeMultiplier(TYPES.POWER, TYPES.SPEED), 1.15);
  assert.equal(getTypeMultiplier(TYPES.SPEED, TYPES.BLAST), 1.15);
  assert.equal(getTypeMultiplier(TYPES.BLAST, TYPES.POWER), 1.15);
});

test('reverse matchups apply -15% disadvantage', () => {
  assert.equal(getTypeMultiplier(TYPES.SPEED, TYPES.POWER), 0.85);
  assert.equal(getTypeMultiplier(TYPES.BLAST, TYPES.SPEED), 0.85);
  assert.equal(getTypeMultiplier(TYPES.POWER, TYPES.BLAST), 0.85);
});

test('same type is neutral', () => {
  assert.equal(getTypeMultiplier(TYPES.POWER, TYPES.POWER), 1);
});
