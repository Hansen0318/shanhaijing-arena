import test from 'node:test';
import assert from 'node:assert/strict';
import { createCharacterDefinition, createCharacterState } from '../src/combat/character.js';
import { createAbilityDefinition } from '../src/combat/ability.js';
import { resolveDirectDamage } from '../src/combat/combatResolver.js';
import { simulateHeadless3v3 } from '../src/combat/headlessSimulation.js';

const abilityDefinitions = {
  basic: createAbilityDefinition({
    id: 'basic', category: 'basic', cooldown: 0, range: 1.8,
    targetingRule: 'enemy', effect: { coefficient: 0.8 }, ai: { priority: 0 },
  }),
  heavy: createAbilityDefinition({
    id: 'heavy', category: 'heavy', cooldown: 4, range: 2.2,
    targetingRule: 'enemy', effect: { coefficient: 1.2 }, ai: { priority: 20 },
  }),
  special: createAbilityDefinition({
    id: 'special', category: 'special', cooldown: 7, range: 2.5,
    targetingRule: 'enemy', effect: { coefficient: 1.5 }, ai: { priority: 30 },
  }),
  awakening: createAbilityDefinition({
    id: 'awakening', category: 'awakening', cooldown: 12, range: 3,
    targetingRule: 'enemy', effect: { coefficient: 2 }, ai: { priority: 40 },
  }),
};

function characterDefinition(id, type, stats) {
  return createCharacterDefinition({
    id,
    name: id,
    type,
    role: 'attacker',
    stats,
    abilities: { basic: 'basic', heavy: 'heavy', special: 'special', awakening: 'awakening', passives: [] },
  });
}

const characterDefinitions = {
  ally: characterDefinition('ally', 'power', {
    maxHp: 120, atk: 24, def: 6, moveSpeed: 4, attackSpeed: 1.5,
  }),
  enemy: characterDefinition('enemy', 'speed', {
    maxHp: 100, atk: 18, def: 5, moveSpeed: 3.5, attackSpeed: 1.2,
  }),
};

function teams() {
  const allies = [
    createCharacterState(characterDefinitions.ally, { instanceId: 'a1', teamId: 'allies', x: 0, y: -1 }),
    createCharacterState(characterDefinitions.ally, { instanceId: 'a2', teamId: 'allies', x: 0, y: 0 }),
    createCharacterState(characterDefinitions.ally, { instanceId: 'a3', teamId: 'allies', x: 0, y: 1 }),
  ];
  const enemies = [
    createCharacterState(characterDefinitions.enemy, { instanceId: 'e1', teamId: 'enemies', x: 10, y: -1 }),
    createCharacterState(characterDefinitions.enemy, { instanceId: 'e2', teamId: 'enemies', x: 10, y: 0 }),
    createCharacterState(characterDefinitions.enemy, { instanceId: 'e3', teamId: 'enemies', x: 10, y: 1 }),
  ];
  return { allies, enemies };
}

test('direct damage uses coefficient, type multiplier and DEF through Character HP state', () => {
  const { allies, enemies } = teams();
  const amount = resolveDirectDamage({
    attacker: allies[0],
    defender: enemies[0],
    attackerDefinition: characterDefinitions.ally,
    defenderDefinition: characterDefinitions.enemy,
    abilityDefinition: abilityDefinitions.heavy,
  });
  assert.equal(amount, 24 * 1.2 * 1.15 - 5);
  assert.equal(enemies[0].hp, 100 - amount);
});

test('headless simulation requires exactly 3v3', () => {
  const { allies, enemies } = teams();
  assert.throws(() => simulateHeadless3v3({
    allies: allies.slice(0, 2),
    enemies,
    characterDefinitions,
    abilityDefinitions,
  }));
});

test('3v3 resolves without player input and actors move from spawn', () => {
  const { allies, enemies } = teams();
  const result = simulateHeadless3v3({
    allies, enemies, characterDefinitions, abilityDefinitions,
  });
  assert.notEqual(result.result, 'running');
  assert.ok(['victory', 'defeat', 'draw'].includes(result.result));
  assert.ok(result.elapsedSeconds <= 90);
  assert.ok(result.allies.some((actor) => actor.x > 0));
  assert.ok(result.enemies.some((actor) => actor.x < 10));
});

test('same 3v3 fixture is deterministic across repeated runs', () => {
  const firstTeams = teams();
  const secondTeams = teams();
  const first = simulateHeadless3v3({
    ...firstTeams, characterDefinitions, abilityDefinitions,
  });
  const second = simulateHeadless3v3({
    ...secondTeams, characterDefinitions, abilityDefinitions,
  });
  assert.deepEqual(first, second);
});

test('stronger advantaged ally fixture reaches victory', () => {
  const { allies, enemies } = teams();
  const result = simulateHeadless3v3({
    allies, enemies, characterDefinitions, abilityDefinitions,
  });
  assert.equal(result.result, 'victory');
  assert.ok(result.enemies.every((actor) => actor.hp === 0));
});
