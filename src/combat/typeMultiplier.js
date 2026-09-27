export const TYPES = Object.freeze({
  POWER: 'power',
  SPEED: 'speed',
  BLAST: 'blast',
});

const ADVANTAGE = new Map([
  [TYPES.POWER, TYPES.SPEED],
  [TYPES.SPEED, TYPES.BLAST],
  [TYPES.BLAST, TYPES.POWER],
]);

export function getTypeMultiplier(attackerType, defenderType, modifier = 0.15) {
  if (!Object.values(TYPES).includes(attackerType) || !Object.values(TYPES).includes(defenderType)) {
    throw new Error('Unknown combat type');
  }
  if (attackerType === defenderType) return 1;
  if (ADVANTAGE.get(attackerType) === defenderType) return 1 + modifier;
  return 1 - modifier;
}
