import { createCharacterDefinition, createCharacterState } from '../combat/character.js';
import { createAbilityDefinition } from '../combat/ability.js';
import { simulateHeadless3v3 } from '../combat/headlessSimulation.js';
import { createBattleSession } from '../combat/battleSession.js';

function ability(id, category, cooldown, range, coefficient, priority) {
  return createAbilityDefinition({
    id, category, cooldown, range, targetingRule: 'enemy',
    effect: { coefficient }, ai: { priority },
  });
}

export const demoAbilityDefinitions = {
  basic: ability('basic', 'basic', 0, 1.8, 0.8, 0),
  heavy: ability('heavy', 'heavy', 4, 2.2, 1.2, 20),
  special: ability('special', 'special', 7, 2.5, 1.5, 30),
  awakening: ability('awakening', 'awakening', 12, 3, 2, 40),
};

function character(id, type, stats) {
  return createCharacterDefinition({
    id, name: id, type, role: 'attacker', stats,
    abilities: { basic: 'basic', heavy: 'heavy', special: 'special', awakening: 'awakening', passives: [] },
  });
}

// Canonical deterministic fixture retained for headless tests/regression.
export const demoCharacterDefinitions = {
  ally: character('ally', 'power', { maxHp: 120, atk: 24, def: 6, moveSpeed: 4, attackSpeed: 1.5 }),
  enemy: character('enemy', 'speed', { maxHp: 100, atk: 18, def: 5, moveSpeed: 3.5, attackSpeed: 1.2 }),
};

// Runtime-only smoke fixture: slower and longer-lived so manual control,
// character switching and 2-second AI handoff can be observed.
export const runtimeCharacterDefinitions = {
  ally: character('ally', 'power', { maxHp: 260, atk: 16, def: 6, moveSpeed: 1.4, attackSpeed: 1.0 }),
  enemy: character('enemy', 'speed', { maxHp: 220, atk: 13, def: 5, moveSpeed: 1.2, attackSpeed: 0.9 }),
};

function createTeams(definitions) {
  const allies = [-1, 0, 1].map((y, index) => createCharacterState(definitions.ally, {
    instanceId: `a${index + 1}`, teamId: 'allies', x: 0, y,
  }));
  const enemies = [-1, 0, 1].map((y, index) => createCharacterState(definitions.enemy, {
    instanceId: `e${index + 1}`, teamId: 'enemies', x: 10, y,
  }));
  return { allies, enemies };
}

export function createDemoBattleSession() {
  const { allies, enemies } = createTeams(runtimeCharacterDefinitions);
  return createBattleSession({
    allies,
    enemies,
    characterDefinitions: runtimeCharacterDefinitions,
    abilityDefinitions: demoAbilityDefinitions,
  });
}

// Deterministic headless/regression path remains canonical.
export function createDemoBattleFrames() {
  const { allies, enemies } = createTeams(demoCharacterDefinitions);
  const frames = [];
  simulateHeadless3v3({
    allies,
    enemies,
    characterDefinitions: demoCharacterDefinitions,
    abilityDefinitions: demoAbilityDefinitions,
    onStep: (frame) => frames.push(frame),
  });
  return frames;
}
