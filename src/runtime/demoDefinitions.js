import {createCharacterDefinition} from '../combat/character.js';
import {createAbilityDefinition} from '../combat/ability.js';

function ability(id, category, cooldown, range, coefficient, priority, spacing = null) {
  return createAbilityDefinition({
    id,
    category,
    cooldown,
    range,
    ...(spacing ?? {}),
    targetingRule: 'enemy',
    effect: { coefficient },
    ai: { priority },
  });
}

export const demoAbilityDefinitions = {
  basic: ability('basic', 'basic', 0, 1.8, 0.8, 0, {
    minRange: 0,
    preferredRange: 0.20,
    maxRange: 1.8,
  }),
  heavy: ability('heavy', 'heavy', 3, 2.2, 1.2, 20, {
    minRange: 0,
    preferredRange: 0.45,
    maxRange: 2.2,
  }),
  special: ability('special', 'special', 5, 2.5, 1.5, 30, {
    minRange: 1.0,
    preferredRange: 1.8,
    maxRange: 2.5,
  }),
  awakening: ability('awakening', 'awakening', 10, 3, 2, 40, {
    minRange: 1.5,
    preferredRange: 2.4,
    maxRange: 3,
  }),
};

// Runtime visibility tuning is ability data, independent of the no-crit headless fixture.
export const runtimeAbilityDefinitions = Object.freeze({
  basic: createAbilityDefinition({ ...demoAbilityDefinitions.basic, canCrit:true, critChance:.10, critMultiplier:1.50 }),
  heavy: createAbilityDefinition({ ...demoAbilityDefinitions.heavy, canCrit:true, critChance:.20, critMultiplier:1.75 }),
  special: createAbilityDefinition({ ...demoAbilityDefinitions.special, canCrit:true, critChance:.15, critMultiplier:1.75 }),
  awakening: createAbilityDefinition({ ...demoAbilityDefinitions.awakening, canCrit:false, critChance:0, critMultiplier:1 }),
});

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

// Finite graybox encounter; the canonical headless fixture below is unchanged.
export const runtimeCharacterDefinitions = {
  ally: character('ally', 'power', { maxHp: 260, atk: 16, def: 6, moveSpeed: 1.4, attackSpeed: 1.0 }),
  enemy: character('enemy', 'speed', { maxHp: 240, atk: 13, def: 5, moveSpeed: 1.6, attackSpeed: 0.9 }),
};

