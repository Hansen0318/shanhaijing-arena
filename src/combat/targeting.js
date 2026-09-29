import { isKO } from './battleRules.js';

function distanceSquared(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

export function chooseSoftTarget(actor, enemies, currentTarget = null) {
  let best = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (const enemy of enemies) {
    if (isKO(enemy)) continue;

    const d2 = distanceSquared(actor, enemy);
    if (
      d2 < bestDistance ||
      (
        d2 === bestDistance &&
        currentTarget &&
        enemy === currentTarget
      )
    ) {
      best = enemy;
      bestDistance = d2;
    }
  }

  return best;
}

export function nearestSurvivingAlly(origin, allies) {
  let best = null;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const ally of allies) {
    if (isKO(ally)) continue;
    const d2 = distanceSquared(origin, ally);
    if (d2 < bestDistance) {
      best = ally;
      bestDistance = d2;
    }
  }
  return best;
}
