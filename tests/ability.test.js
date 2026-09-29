import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createCharacterDefinition, createCharacterState, applyDamage,
} from '../src/combat/character.js';
import {
  createAbilityDefinition, canStartAbility, startAbility, finishAbility,
  tickAbilityCooldown,
} from '../src/combat/ability.js';

const characterDefinition = () => createCharacterDefinition({
  id: 'fighter',
  name: 'Fighter',
  type: 'power',
  role: 'attacker',
  stats: { maxHp: 100, atk: 20, def: 5, moveSpeed: 4, attackSpeed: 1.5 },
  abilities: { basic: 'strike', heavy: 'heavy', special: 'special', awakening: 'awakening', passives: [] },
});

const actor = (instanceId, teamId, x = 0, y = 0) =>
  createCharacterState(characterDefinition(), { instanceId, teamId, x, y });

const heavy = () => createAbilityDefinition({
  id: 'heavy',
  category: 'heavy',
  cooldown: 5,
  range: 4,
  targetingRule: 'enemy',
  effect: { coefficient: 1.5 },
  ai: { minRange: 0 },
});

test('ability definition is validated and immutable', () => {
  const definition = heavy();
  assert.equal(definition.category, 'heavy');
  assert.equal(definition.cooldown, 5);
  assert.ok(Object.isFrozen(definition));
  assert.ok(Object.isFrozen(definition.effect));
  assert.throws(() => createAbilityDefinition({ ...definition, cooldown: -1 }));
  assert.throws(() => createAbilityDefinition({ ...definition, category: 'passive' }));
  assert.throws(() => createAbilityDefinition({ ...definition, range: Infinity }));
});

test('valid request transitions ready to executing and stores target id', () => {
  const caster = actor('a1', 'allies');
  const target = actor('e1', 'enemies', 3, 0);
  const definition = heavy();
  const slot = caster.abilityState.heavy;
  assert.equal(startAbility({ caster, slot, definition, target, source: 'player' }), true);
  assert.equal(slot.phase, 'executing');
  assert.equal(slot.targetId, 'e1');
  assert.equal(slot.cooldownRemaining, 0);
});

test('successful finish starts cooldown and cooldown tick returns to ready at zero', () => {
  const caster = actor('a1', 'allies');
  const target = actor('e1', 'enemies', 3, 0);
  const definition = heavy();
  const slot = caster.abilityState.heavy;
  startAbility({ caster, slot, definition, target });
  assert.equal(finishAbility({ caster, slot, definition }), true);
  assert.deepEqual([slot.phase, slot.cooldownRemaining, slot.targetId], ['cooldown', 5, null]);
  assert.equal(tickAbilityCooldown(slot, 2), 3);
  assert.equal(tickAbilityCooldown(slot, 10), 0);
  assert.equal(slot.phase, 'ready');
});

test('zero-cooldown Basic finishes directly to ready', () => {
  const caster = actor('a1', 'allies');
  const target = actor('e1', 'enemies', 1, 0);
  const definition = createAbilityDefinition({
    id: 'strike', category: 'basic', cooldown: 0, range: 2,
    targetingRule: 'enemy', effect: { coefficient: 1 }, ai: {},
  });
  const slot = caster.abilityState.basic;
  assert.equal(startAbility({ caster, slot, definition, target }), true);
  assert.equal(finishAbility({ caster, slot, definition }), true);
  assert.deepEqual([slot.phase, slot.cooldownRemaining], ['ready', 0]);
});

test('KO caster cannot start an ability', () => {
  const caster = actor('a1', 'allies');
  const target = actor('e1', 'enemies', 1, 0);
  const definition = heavy();
  applyDamage(caster, 100);
  assert.equal(canStartAbility({ caster, slot: caster.abilityState.heavy, definition, target }), false);
  assert.equal(startAbility({ caster, slot: caster.abilityState.heavy, definition, target }), false);
});

test('missing, KO and out-of-range targets cannot start a targeted ability', () => {
  const caster = actor('a1', 'allies');
  const dead = actor('dead', 'enemies', 1, 0);
  const far = actor('far', 'enemies', 10, 0);
  const definition = heavy();
  const slot = caster.abilityState.heavy;
  applyDamage(dead, 100);
  assert.equal(startAbility({ caster, slot, definition, target: null }), false);
  assert.equal(startAbility({ caster, slot, definition, target: dead }), false);
  assert.equal(startAbility({ caster, slot, definition, target: far }), false);
  assert.equal(slot.phase, 'ready');
});

test('KO during execution cancels pending effect without cooldown', () => {
  const caster = actor('a1', 'allies');
  const target = actor('e1', 'enemies', 1, 0);
  const definition = heavy();
  const slot = caster.abilityState.heavy;
  let applied = 0;
  startAbility({ caster, slot, definition, target });
  applyDamage(caster, 100);
  assert.equal(finishAbility({ caster, slot, definition, applyEffect: () => { applied += 1; } }), false);
  assert.deepEqual([slot.phase, slot.cooldownRemaining, slot.targetId, applied], ['ready', 0, null, 0]);
});

test('duplicate start is rejected while executing or cooling down', () => {
  const caster = actor('a1', 'allies');
  const target = actor('e1', 'enemies', 1, 0);
  const definition = heavy();
  const slot = caster.abilityState.heavy;
  assert.equal(startAbility({ caster, slot, definition, target }), true);
  assert.equal(startAbility({ caster, slot, definition, target }), false);
  finishAbility({ caster, slot, definition });
  assert.equal(startAbility({ caster, slot, definition, target }), false);
});

test('cooldown tick rejects negative or nonfinite deltas', () => {
  const caster = actor('a1', 'allies');
  const target = actor('e1', 'enemies', 1, 0);
  const definition = heavy();
  const slot = caster.abilityState.heavy;
  startAbility({ caster, slot, definition, target });
  finishAbility({ caster, slot, definition });
  assert.throws(() => tickAbilityCooldown(slot, -1));
  assert.throws(() => tickAbilityCooldown(slot, NaN));
});

test('AI and player requests use the same execution surface', () => {
  const definition = heavy();
  const targetA = actor('e1', 'enemies', 1, 0);
  const targetB = actor('e2', 'enemies', 1, 0);
  const aiCaster = actor('ai', 'allies');
  const playerCaster = actor('player', 'allies');
  assert.equal(startAbility({ caster: aiCaster, slot: aiCaster.abilityState.heavy, definition, target: targetA, source: 'ai' }), true);
  assert.equal(startAbility({ caster: playerCaster, slot: playerCaster.abilityState.heavy, definition, target: targetB, source: 'player' }), true);
  assert.deepEqual(
    [aiCaster.abilityState.heavy.phase, aiCaster.abilityState.heavy.cooldownRemaining],
    [playerCaster.abilityState.heavy.phase, playerCaster.abilityState.heavy.cooldownRemaining],
  );
});


test('AI range rule remains enforced when player cast bypass is not requested', () => {
  const caster = createCharacterState(characterDefinition(), {
    instanceId: 'a-range',
    teamId: 'allies',
    x: 0,
    y: 0,
  });
  const target = createCharacterState(characterDefinition(), {
    instanceId: 'e-range',
    teamId: 'enemies',
    x: 10,
    y: 0,
  });
  const definition = createAbilityDefinition({
    id: 'range-heavy',
    category: 'heavy',
    cooldown: 4,
    range: 2,
    targetingRule: 'enemy',
    effect: { coefficient: 1 },
  });
  const slot = {
    definitionId: 'range-heavy',
    cooldownRemaining: 0,
    phase: 'ready',
    targetId: null,
  };

  assert.equal(startAbility({
    caster,
    slot,
    definition,
    target,
    source: 'ai',
  }), false);

  assert.equal(startAbility({
    caster,
    slot,
    definition,
    target,
    source: 'player',
    ignoreRange: true,
  }), true);
});


test('explicit player air-cast may start a targeted ability without a target', () => {
  const caster = actor('a-air', 'allies');
  const definition = heavy();
  const slot = caster.abilityState.heavy;

  assert.equal(startAbility({
    caster,
    slot,
    definition,
    target: null,
    source: 'player',
    ignoreRange: true,
    allowNoTarget: true,
  }), true);

  assert.equal(slot.phase, 'executing');
  assert.equal(slot.targetId, null);
  assert.equal(finishAbility({ caster, slot, definition }), true);
  assert.equal(slot.phase, 'cooldown');
});


test('ability range profile validates and keeps range as maxRange alias', () => {
  const definition = createAbilityDefinition({
    id: 'profiled',
    category: 'special',
    cooldown: 6,
    range: 3,
    minRange: 1,
    preferredRange: 2,
    maxRange: 3,
    targetingRule: 'enemy',
    effect: { coefficient: 1 },
  });

  assert.equal(definition.minRange, 1);
  assert.equal(definition.preferredRange, 2);
  assert.equal(definition.maxRange, 3);
  assert.equal(definition.range, 3);

  assert.throws(() => createAbilityDefinition({
    id: 'bad-profile',
    category: 'special',
    cooldown: 6,
    range: 3,
    minRange: 2.5,
    preferredRange: 2,
    maxRange: 3,
    targetingRule: 'enemy',
  }));
});
