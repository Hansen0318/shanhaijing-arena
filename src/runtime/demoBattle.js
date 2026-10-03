import { createCharacterState } from '../combat/character.js';
import { simulateHeadless3v3 } from '../combat/headlessSimulation.js';
import { createBattleSession } from '../combat/battleSession.js';

import {demoAbilityDefinitions, runtimeAbilityDefinitions, demoCharacterDefinitions, runtimeCharacterDefinitions} from './demoDefinitions.js';
export {demoAbilityDefinitions, runtimeAbilityDefinitions, demoCharacterDefinitions, runtimeCharacterDefinitions} from './demoDefinitions.js';

function createTeams(definitions, frontOffset = 0) {
  const allies = [-1, 0, 1].map((y, index) => createCharacterState(definitions.ally, {
    instanceId: `a${index + 1}`, teamId: 'allies', x: index === 1 ? frontOffset : 0, y,
  }));
  const enemies = [-1, 0, 1].map((y, index) => createCharacterState(definitions.enemy, {
    instanceId: `e${index + 1}`, teamId: 'enemies', x: index === 1 ? 10 - frontOffset : 10, y,
  }));
  return { allies, enemies };
}

export function createDemoBattleSession({ seed, rng } = {}) {
  const { allies, enemies } = createTeams(runtimeCharacterDefinitions, 1.2);
  return createBattleSession({
    allies,
    enemies,
    characterDefinitions: runtimeCharacterDefinitions,
    abilityDefinitions: runtimeAbilityDefinitions,
    seed,
    rng,
    maxSeconds: 90,
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
