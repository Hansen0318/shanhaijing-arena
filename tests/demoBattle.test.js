import test from 'node:test';
import assert from 'node:assert/strict';
import { createDemoBattleSession, demoAbilityDefinitions } from '../src/runtime/demoBattle.js';

test('public graybox battle is a finite, replayable 90-second encounter', () => {
  const first = createDemoBattleSession();
  assert.equal(first.maxSeconds, 90);
  assert.equal(first.snapshot().result, 'running');
  let frame = first.snapshot();
  while (frame.result === 'running') frame = first.step(0.25);
  assert.ok(['victory', 'defeat', 'draw'].includes(frame.result));
  assert.ok(frame.elapsedSeconds <= 90);

  const replay = createDemoBattleSession();
  assert.equal(replay.elapsedSeconds, 0);
  assert.equal(replay.snapshot().result, 'running');
  assert.notEqual(replay.actorById('a2'), first.actorById('a2'));
});

test('graybox skill slots use the requested independent prototype cooldowns', () => {
  assert.equal(demoAbilityDefinitions.basic.cooldown, 0);
  assert.equal(demoAbilityDefinitions.heavy.cooldown, 5);
  assert.equal(demoAbilityDefinitions.special.cooldown, 10);
  assert.equal(demoAbilityDefinitions.awakening.cooldown, 15);
});
