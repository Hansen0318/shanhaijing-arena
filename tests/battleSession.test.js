import test from 'node:test';
import assert from 'node:assert/strict';
import { createCharacterDefinition, createCharacterState } from '../src/combat/character.js';
import { createAbilityDefinition } from '../src/combat/ability.js';
import { createBattleSession } from '../src/combat/battleSession.js';

const abilities = {
  basic: createAbilityDefinition({ id: 'basic', category: 'basic', cooldown: 0, range: 1.8, targetingRule: 'enemy', effect: { coefficient: 0.8 }, ai: { priority: 0 } }),
  heavy: createAbilityDefinition({ id: 'heavy', category: 'heavy', cooldown: 4, range: 2.2, targetingRule: 'enemy', effect: { coefficient: 1.2 }, ai: { priority: 20 } }),
  special: createAbilityDefinition({ id: 'special', category: 'special', cooldown: 7, range: 2.5, targetingRule: 'enemy', effect: { coefficient: 1.5 }, ai: { priority: 30 } }),
  awakening: createAbilityDefinition({ id: 'awakening', category: 'awakening', cooldown: 12, range: 3, targetingRule: 'enemy', effect: { coefficient: 2 }, ai: { priority: 40 } }),
};

function def(id, type, moveSpeed) {
  return createCharacterDefinition({
    id, name: id, type, role: 'attacker',
    stats: { maxHp: 120, atk: 20, def: 5, moveSpeed, attackSpeed: 1 },
    abilities: { basic: 'basic', heavy: 'heavy', special: 'special', awakening: 'awakening', passives: [] },
  });
}

const definitions = {
  ally: def('ally', 'power', 4),
  enemy: def('enemy', 'speed', 3),
};

function makeSession() {
  const allies = [-1, 0, 1].map((y, i) => createCharacterState(definitions.ally, {
    instanceId: `a${i + 1}`, teamId: 'allies', x: 0, y,
  }));
  const enemies = [-1, 0, 1].map((y, i) => createCharacterState(definitions.enemy, {
    instanceId: `e${i + 1}`, teamId: 'enemies', x: 10, y,
  }));
  return createBattleSession({ allies, enemies, characterDefinitions: definitions, abilityDefinitions: abilities });
}

test('valid player movement immediately owns selected actor movement', () => {
  const session = makeSession();
  const a2 = session.actorById('a2');
  assert.equal(a2.controlHandoff.controlSource(0), 'ai');

  assert.equal(session.setPlayerMovement('a2', { x: 0, y: -1 }), true);
  assert.equal(a2.controlHandoff.controlSource(0), 'player');

  session.step(0.25);
  assert.equal(a2.x, 0);
  assert.equal(a2.y, -1);
});

test('player movement is clamped to Arena bounds', () => {
  const session = makeSession();
  const a2 = session.actorById('a2');

  for (let i = 0; i < 20; i += 1) {
    session.setPlayerMovement('a2', { x: -1, y: -1 });
    session.step(0.25);
  }

  assert.ok(a2.x >= -2.3333333333);
  assert.ok(a2.y >= -2);
});

test('zero/dead-zone movement does not refresh player ownership', () => {
  const session = makeSession();
  const a2 = session.actorById('a2');

  assert.equal(session.setPlayerMovement('a2', { x: 1, y: 0 }), true);
  session.step(0.25);
  session.clearPlayerMovement('a2');

  assert.equal(a2.controlHandoff.controlSource(session.elapsedSeconds * 1000), 'ai');

  assert.equal(session.setPlayerMovement('a2', { x: 0.01, y: 0.01 }), false);
  assert.equal(a2.controlHandoff.controlSource(session.elapsedSeconds * 1000), 'ai');
});

test('releasing player movement immediately returns ownership to AI', () => {
  const session = makeSession();
  const a2 = session.actorById('a2');

  session.setPlayerMovement('a2', { x: 0, y: 1 });
  session.step(0.25);
  assert.equal(a2.controlHandoff.controlSource(session.elapsedSeconds * 1000), 'ai');

  session.setPlayerMovement('a2', { x: 0, y: 1 });
  assert.equal(a2.controlHandoff.controlSource(session.elapsedSeconds * 1000), 'player');

  session.clearPlayerMovement('a2');
  assert.equal(a2.controlHandoff.controlSource(session.elapsedSeconds * 1000), 'ai');

  const heldX = a2.x;
  session.step(0.25);
  assert.ok(a2.x > heldX);
});


test('expanded Arena bounds are shared by all six actors', () => {
  const session = makeSession();
  assert.deepEqual(session.arenaBounds, {
    xMin: -2.3333333333,
    xMax: 12.3333333333,
    yMin: -2,
    yMax: 2,
  });

  for (const actor of [...session.allies, ...session.enemies]) {
    assert.ok(actor.x >= session.arenaBounds.xMin);
    assert.ok(actor.x <= session.arenaBounds.xMax);
    assert.ok(actor.y >= session.arenaBounds.yMin);
    assert.ok(actor.y <= session.arenaBounds.yMax);
  }
});

test('enemy AI movement uses the same expanded Arena bounds', () => {
  const session = makeSession();
  const a2 = session.actorById('a2');
  const e2 = session.actorById('e2');

  a2.x = -2.3333333333;
  e2.x = 12.3333333333;

  for (let i = 0; i < 40; i += 1) {
    session.step(0.25);
  }

  for (const actor of session.enemies) {
    assert.ok(actor.x >= session.arenaBounds.xMin);
    assert.ok(actor.x <= session.arenaBounds.xMax);
  }
});
