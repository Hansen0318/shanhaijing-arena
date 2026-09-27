export const BATTLE_LIMIT_SECONDS = 90;

export function isKO(character) {
  return character.hp <= 0;
}

export function allKO(team) {
  return team.length > 0 && team.every(isKO);
}

export function remainingHpPercent(character) {
  if (character.maxHp <= 0) return 0;
  return Math.max(0, Math.min(1, character.hp / character.maxHp));
}

export function teamRemainingHpScore(team) {
  return team.reduce((sum, character) => sum + remainingHpPercent(character), 0);
}

export function resolveBattleState(allies, enemies, elapsedSeconds) {
  if (allKO(enemies)) return 'victory';
  if (allKO(allies)) return 'defeat';
  if (elapsedSeconds < BATTLE_LIMIT_SECONDS) return 'running';

  const allyScore = teamRemainingHpScore(allies);
  const enemyScore = teamRemainingHpScore(enemies);
  if (allyScore > enemyScore) return 'victory';
  if (enemyScore > allyScore) return 'defeat';
  return 'draw';
}
