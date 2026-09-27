import { createCharacterDefinition, createCharacterState } from '../combat/character.js';
import { createAbilityDefinition } from '../combat/ability.js';
import { simulateHeadless3v3 } from '../combat/headlessSimulation.js';

// Temporary Arena-native fixture. Combat rules and time stepping live in the existing core.
function ability(id, category, cooldown, range, coefficient, priority) {
  return createAbilityDefinition({
    id, category, cooldown, range, targetingRule: 'enemy',
    effect: { coefficient }, ai: { priority },
  });
}

const abilityDefinitions = {
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

const characterDefinitions = {
  ally: character('ally', 'power', { maxHp: 120, atk: 24, def: 6, moveSpeed: 4, attackSpeed: 1.5 }),
  enemy: character('enemy', 'speed', { maxHp: 100, atk: 18, def: 5, moveSpeed: 3.5, attackSpeed: 1.2 }),
};

export function createDemoBattleFrames() {
  const allies = [-1, 0, 1].map((y, index) => createCharacterState(characterDefinitions.ally, {
    instanceId: `a${index + 1}`, teamId: 'allies', x: 0, y,
  }));
  const enemies = [-1, 0, 1].map((y, index) => createCharacterState(characterDefinitions.enemy, {
    instanceId: `e${index + 1}`, teamId: 'enemies', x: 10, y,
  }));
  const frames = [];
  simulateHeadless3v3({ allies, enemies, characterDefinitions, abilityDefinitions, onStep: (frame) => frames.push(frame) });
  return frames;
}
