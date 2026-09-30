import test from 'node:test';
import assert from 'node:assert/strict';
import { PreBattleGate } from '../src/runtime/preBattleGate.js';
import { createDemoBattleSession } from '../src/runtime/demoBattle.js';

test('all six actors and skills remain frozen through 3 to 1, then battle starts', () => {
  const gate = new PreBattleGate();
  const session = createDemoBattleSession();
  const before = session.snapshot();
  let started = 0;
  let steps = 0;
  for (let second = 3; second >= 1; second -= 1) {
    assert.equal(gate.display(), String(second));
    gate.advance(1, () => { started += 1; }, () => { steps += 1; session.step(1); });
    assert.deepEqual(session.snapshot(), before);
    assert.deepEqual(session.drainCastEvents(), []);
  }
  assert.equal(started, 1);
  assert.equal(steps, 0);
  gate.advance(0.05, () => { started += 1; }, () => { steps += 1; session.step(0.05); });
  assert.equal(steps, 1);
  assert.equal(session.elapsedSeconds, 0.05);
});

test('a fresh countdown restarts at 3 after a completed battle', () => {
  const first = new PreBattleGate();
  first.advance(3, () => {}, () => {});
  assert.equal(first.remaining, 0);
  assert.equal(new PreBattleGate().display(), '3');
});
