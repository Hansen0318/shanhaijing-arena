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

function cloneFrame(frame) {
  return {
    result: frame.result,
    elapsedSeconds: frame.elapsedSeconds,
    allies: frame.allies.map((actor) => ({ ...actor })),
    enemies: frame.enemies.map((actor) => ({ ...actor })),
  };
}

function withSelectedKoFixture(frames) {
  const fixtureIndex = Math.min(4, frames.length - 1);
  const base = cloneFrame(frames[fixtureIndex]);
  const ko = cloneFrame(base);
  ko.allies = ko.allies.map((actor) => actor.instanceId === 'a2' ? { ...actor, hp: 0 } : actor);
  ko.result = 'running';

  const hold = Array.from({ length: 4 }, (_, index) => ({
    ...cloneFrame(ko),
    elapsedSeconds: ko.elapsedSeconds + index * 0.25,
  }));

  return [...frames.slice(0, fixtureIndex), ...hold];
}

export function createDemoBattleFrames({ selectedKoFixture = false } = {}) {
  const allies = [-1, 0, 1].map((y, index) => createCharacterState(characterDefinitions.ally, {
    instanceId: `a${index + 1}`, teamId: 'allies', x: 0, y,
  }));
  const enemies = [-1, 0, 1].map((y, index) => createCharacterState(characterDefinitions.enemy, {
    instanceId: `e${index + 1}`, teamId: 'enemies', x: 10, y,
  }));
  const frames = [];
  simulateHeadless3v3({ allies, enemies, characterDefinitions, abilityDefinitions, onStep: (frame) => frames.push(frame) });
  return selectedKoFixture ? withSelectedKoFixture(frames) : frames;
}
