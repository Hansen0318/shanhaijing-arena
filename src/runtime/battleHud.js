function health(actor) {
  const maxHp = Math.max(0, actor.maxHp);
  const hp = Math.max(0, Math.min(maxHp, actor.hp));
  return { hpText: `${Math.ceil(hp)} / ${Math.ceil(maxHp)}`, hpRatio: maxHp ? hp / maxHp : 0 };
}

export function allyHud(allies, selectedId) {
  return allies.map((actor) => ({
    id: actor.instanceId,
    ...health(actor),
    selected: actor.instanceId === selectedId,
    selectable: actor.hp > 0,
    alive: actor.hp > 0,
  }));
}

export function enemyHud(enemies) {
  return enemies.map((actor) => ({
    id: actor.instanceId,
    ...health(actor),
    selected: false,
    selectable: false,
    alive: actor.hp > 0,
  }));
}

export function formatBattleTime(elapsedSeconds, limitSeconds) {
  const remaining = Math.max(0, Math.ceil(limitSeconds - elapsedSeconds));
  return `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`;
}
