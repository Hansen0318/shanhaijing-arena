import test from 'node:test';
import assert from 'node:assert/strict';
import { ControlHandoff } from '../src/combat/controlHandoff.js';

test('AI controls before any player input', () => {
  const handoff = new ControlHandoff();
  assert.equal(handoff.controlSource(1000), 'ai');
});

test('player owns the exact active-input instant and AI resumes immediately after', () => {
  const handoff = new ControlHandoff();
  handoff.registerPlayerInput(1000);
  assert.equal(handoff.controlSource(1000), 'player');
  assert.equal(handoff.controlSource(1001), 'ai');
});

test('each new valid input refreshes ownership only for that input instant', () => {
  const handoff = new ControlHandoff();
  handoff.registerPlayerInput(1000);
  assert.equal(handoff.controlSource(1000), 'player');
  assert.equal(handoff.controlSource(1001), 'ai');

  handoff.registerPlayerInput(2500);
  assert.equal(handoff.controlSource(2500), 'player');
  assert.equal(handoff.controlSource(2501), 'ai');
});
