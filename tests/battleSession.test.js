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


test('player Heavy uses shared ability pipeline and starts cooldown', () => {
  const session = makeSession();
  const a2 = session.actorById('a2');
  const e2 = session.actorById('e2');

  a2.x = 4;
  e2.x = 5;
  const hpBefore = e2.hp;

  assert.equal(session.usePlayerAbility('a2', 'heavy'), true);
  assert.ok(e2.hp < hpBefore);
  assert.equal(a2.abilityState.heavy.phase, 'cooldown');
  assert.equal(a2.abilityState.heavy.cooldownRemaining, abilities.heavy.cooldown);
});

test('player ability cannot fire while cooling down', () => {
  const session = makeSession();
  const a2 = session.actorById('a2');
  const e2 = session.actorById('e2');

  a2.x = 4;
  e2.x = 5;

  assert.equal(session.usePlayerAbility('a2', 'special'), true);
  const hpAfterFirst = e2.hp;
  assert.equal(session.usePlayerAbility('a2', 'special'), false);
  assert.equal(e2.hp, hpAfterFirst);
});

test('player ability can air-cast immediately when target is outside hit range', () => {
  const session = makeSession();
  const a2 = session.actorById('a2');
  const e2 = session.actorById('e2');

  a2.x = session.arenaBounds.xMin;
  e2.x = session.arenaBounds.xMax;
  const hpBefore = e2.hp;

  assert.equal(session.usePlayerAbility('a2', 'heavy'), true);
  assert.equal(e2.hp, hpBefore);
  assert.equal(a2.abilityState.heavy.phase, 'cooldown');
});


test('holding joystick ownership suppresses AI even with zero movement vector', () => {
  const session = makeSession();
  const a2 = session.actorById('a2');
  const e2 = session.actorById('e2');

  a2.x = 4;
  e2.x = 5;

  assert.equal(session.holdPlayerControl('a2'), true);
  session.step(0.25);

  assert.equal(a2.abilityState.heavy.phase, 'ready');
  assert.equal(a2.abilityState.special.phase, 'ready');
  assert.equal(a2.abilityState.awakening.phase, 'ready');
});

test('cooldowns are independent per allied actor', () => {
  const session = makeSession();
  const a1 = session.actorById('a1');
  const a2 = session.actorById('a2');
  const e1 = session.actorById('e1');

  a1.x = 4;
  a2.x = 4;
  e1.x = 5;

  session.holdPlayerControl('a1');
  session.holdPlayerControl('a2');

  assert.equal(session.usePlayerAbility('a1', 'heavy'), true);
  assert.equal(a1.abilityState.heavy.phase, 'cooldown');
  assert.equal(a2.abilityState.heavy.phase, 'ready');
});

test('finished cooldown stays ready while player holds control until manually used', () => {
  const session = makeSession();
  const a2 = session.actorById('a2');
  const e2 = session.actorById('e2');

  a2.x = 4;
  e2.x = 5;

  session.holdPlayerControl('a2');
  assert.equal(session.usePlayerAbility('a2', 'heavy'), true);

  for (let i = 0; i < 20; i += 1) {
    for (const actor of session.actors) session.holdPlayerControl(actor.instanceId);
    session.step(0.25);
  }

  assert.equal(a2.abilityState.heavy.phase, 'ready');
  assert.equal(a2.abilityState.heavy.cooldownRemaining, 0);

  for (const actor of session.actors) session.holdPlayerControl(actor.instanceId);
  session.step(0.25);
  assert.equal(a2.abilityState.heavy.phase, 'ready');

  assert.equal(session.usePlayerAbility('a2', 'heavy'), true);
  assert.equal(a2.abilityState.heavy.phase, 'cooldown');
});

test('AI resumes full automatic ability use after player control is released', () => {
  const session = makeSession();
  const a2 = session.actorById('a2');
  const e2 = session.actorById('e2');

  a2.x = 4;
  e2.x = 5;

  session.holdPlayerControl('a2');
  session.step(0.25);
  assert.equal(a2.abilityState.awakening.phase, 'ready');

  session.clearPlayerMovement('a2');
  session.step(0.25);
  assert.equal(a2.abilityState.awakening.phase, 'cooldown');
});


test('manual targeted ability can air-cast with no living opponent', () => {
  const session = makeSession();
  const a2 = session.actorById('a2');

  for (const enemy of session.enemies) enemy.damage(enemy.maxHp);

  assert.equal(session.usePlayerAbility('a2', 'special'), true);
  assert.equal(a2.abilityState.special.phase, 'cooldown');
});


test('enemy AI keeps pursuing while one ally is under player control', () => {
  const session = makeSession();
  const a2 = session.actorById('a2');
  const e2 = session.actorById('e2');

  // Move unrelated actors away so a2 is e2's nearest opponent.
  session.actorById('a1').y = -2;
  session.actorById('a3').y = 2;
  e2.x = 8;
  a2.x = 2;

  session.holdPlayerControl('a2');
  const before = e2.x;

  for (let i = 0; i < 8; i += 1) {
    session.holdPlayerControl('a2');
    session.setPlayerMovement('a2', { x: -1, y: 0 });
    session.step(0.25);
  }

  assert.ok(e2.x < before);
});

test('uncontrolled allied AI keeps pursuing enemies while selected ally is manual', () => {
  const session = makeSession();
  const a1 = session.actorById('a1');
  const a2 = session.actorById('a2');

  session.holdPlayerControl('a2');
  const before = a1.x;

  for (let i = 0; i < 4; i += 1) {
    session.holdPlayerControl('a2');
    session.step(0.25);
  }

  assert.ok(a1.x > before);
});

test('AI resumes pursuit as soon as its nearest target leaves attack range', () => {
  const session = makeSession();
  const a2 = session.actorById('a2');
  const e2 = session.actorById('e2');

  a2.x = 5;
  e2.x = 6;
  session.step(0.25);

  // Pull the target far away under player ownership.
  a2.x = -1;
  session.holdPlayerControl('a2');
  const before = e2.x;
  session.step(0.25);

  assert.ok(e2.x < before);
});


test('AI can move toward nearest target on the same step it uses a ranged skill', () => {
  const session = makeSession();
  const a1 = session.actorById('a1');
  const e1 = session.actorById('e1');

  a1.x = 0;
  a1.y = 0;
  e1.x = 2.5;
  e1.y = 0;

  // Keep other actors away so e1 is unambiguously nearest.
  session.actorById('e2').x = 10;
  session.actorById('e3').x = 10;

  const beforeX = a1.x;
  const beforeHp = e1.hp;

  session.step(0.25);

  assert.ok(a1.x > beforeX);
  assert.ok(e1.hp < beforeHp);
  assert.equal(a1.abilityState.awakening.phase, 'cooldown');
});
