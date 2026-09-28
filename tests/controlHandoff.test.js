import test from 'node:test';
import assert from 'node:assert/strict';
import { ControlHandoff } from '../src/combat/controlHandoff.js';

test('AI controls before any player input', () => {
  const handoff = new ControlHandoff();
  assert.equal(handoff.controlSource(1000), 'ai');
});

test('player input overrides immediately and full AI resumes at 1 second', () => {
  const handoff = new ControlHandoff();
  handoff.registerPlayerInput(1000);
  assert.equal(handoff.controlSource(1000), 'player');
  assert.equal(handoff.controlSource(1999), 'player');
  assert.equal(handoff.controlSource(2000), 'ai');
});

test('new input resets the handoff timer', () => {
  const handoff = new ControlHandoff();
  handoff.registerPlayerInput(1000);
  handoff.registerPlayerInput(2500);
  assert.equal(handoff.controlSource(3499), 'player');
  assert.equal(handoff.controlSource(3500), 'ai');
});
