import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveBattleState } from '../src/combat/battleRules.js';

const c = (hp, maxHp = 100) => ({ hp, maxHp });

test('enemy team all KO is victory', () => {
  assert.equal(resolveBattleState([c(50)], [c(0), c(0), c(0)], 20), 'victory');
});

test('ally team all KO is defeat', () => {
  assert.equal(resolveBattleState([c(0), c(0), c(0)], [c(1)], 20), 'defeat');
});

test('before 90 seconds battle remains running', () => {
  assert.equal(resolveBattleState([c(10)], [c(10)], 89.99), 'running');
});

test('timeout compares sum of remaining HP percentages', () => {
  assert.equal(resolveBattleState([c(80), c(40), c(0)], [c(30), c(20), c(10)], 90), 'victory');
});

test('exact timeout tie is draw', () => {
  assert.equal(resolveBattleState([c(50), c(0)], [c(25), c(25)], 90), 'draw');
});
