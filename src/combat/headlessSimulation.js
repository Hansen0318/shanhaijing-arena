import { BATTLE_LIMIT_SECONDS } from './battleRules.js';
import { createBattleSession } from './battleSession.js';

function positiveFinite(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label} must be a positive finite number`);
  }
  return value;
}

export function simulateHeadless3v3({
  allies,
  enemies,
  characterDefinitions,
  abilityDefinitions,
  stepSeconds = 0.25,
  maxSeconds = BATTLE_LIMIT_SECONDS,
  onStep = null,
}) {
  positiveFinite(stepSeconds, 'stepSeconds');
  positiveFinite(maxSeconds, 'maxSeconds');

  const session = createBattleSession({
    allies,
    enemies,
    characterDefinitions,
    abilityDefinitions,
    maxSeconds,
  });

  let frame = session.snapshot();
  if (onStep) onStep(frame);

  while (frame.result === 'running' && session.elapsedSeconds < maxSeconds) {
    frame = session.step(stepSeconds);
    if (onStep) onStep(frame);
  }

  return frame;
}
