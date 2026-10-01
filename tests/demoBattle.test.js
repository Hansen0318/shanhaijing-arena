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
  assert.equal(demoAbilityDefinitions.heavy.cooldown, 3);
  assert.equal(demoAbilityDefinitions.special.cooldown, 5);
  assert.equal(demoAbilityDefinitions.awakening.cooldown, 10);
});

test('runtime teams start in mirrored one-front-two-back triangles and restart there', () => {
  const first = createDemoBattleSession();
  const spawn = Object.fromEntries([...first.snapshot().allies, ...first.snapshot().enemies]
    .map((actor) => [actor.instanceId, { x: actor.x, y: actor.y }]));
  assert.deepEqual(spawn, {
    a1: { x: 0, y: -1 }, a2: { x: 1.2, y: 0 }, a3: { x: 0, y: 1 },
    e1: { x: 10, y: -1 }, e2: { x: 8.8, y: 0 }, e3: { x: 10, y: 1 },
  });
  first.step(0.25);
  assert.notDeepEqual(first.snapshot().allies.map((actor) => actor.x), [0, 1.2, 0]);
  const restarted = createDemoBattleSession();
  const reset = Object.fromEntries([...restarted.snapshot().allies, ...restarted.snapshot().enemies]
    .map((actor) => [actor.instanceId, { x: actor.x, y: actor.y }]));
  assert.deepEqual(reset, spawn);
  assert.equal(restarted.maxSeconds, 90);
  assert.equal(restarted.snapshot().result, 'running');
});
