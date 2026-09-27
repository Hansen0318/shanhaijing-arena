import test from 'node:test';
import assert from 'node:assert/strict';
import { chooseSoftTarget, nearestSurvivingAlly } from '../src/combat/targeting.js';

const actor = { id: 'actor', x: 0, y: 0, hp: 100, maxHp: 100 };
const e = (id, x, y, hp = 100) => ({ id, x, y, hp, maxHp: 100 });

test('keeps valid current target to avoid target thrashing', () => {
  const current = e('current', 10, 0);
  const closer = e('closer', 1, 0);
  assert.equal(chooseSoftTarget(actor, [current, closer], current).id, 'current');
});

test('chooses nearest living enemy when current target is invalid', () => {
  const dead = e('dead', 1, 0, 0);
  const near = e('near', 2, 0);
  const far = e('far', 8, 0);
  assert.equal(chooseSoftTarget(actor, [dead, far, near], dead).id, 'near');
});

test('active KO switching selects nearest living ally', () => {
  const origin = e('ko', 0, 0, 0);
  const near = e('near', 3, 0);
  const far = e('far', 20, 0);
  assert.equal(nearestSurvivingAlly(origin, [far, near]).id, 'near');
});
