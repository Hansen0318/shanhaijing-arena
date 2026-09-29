export function castVisual(event, project) {
  const origin = project(event.origin);
  const target = event.target ? project(event.target) : null;
  const dx = target ? target.x - origin.x : (event.actorId.startsWith('a') ? 1 : -1);
  const dy = target ? target.y - origin.y : 0;
  const distance = Math.hypot(dx, dy);
  const direction = distance > 0.0001
    ? { x: dx / distance, y: dy / distance }
    : { x: event.actorId.startsWith('a') ? 1 : -1, y: 0 };
  const ranged = event.minRange >= 0.5;
  const oneUnit = Math.hypot(
    project({ x: event.origin.x + 1, y: event.origin.y }).x - origin.x,
    project({ x: event.origin.x + 1, y: event.origin.y }).y - origin.y,
  );
  return {
    origin, direction, ranged,
    length: ranged ? Math.min(distance, event.maxRange * oneUnit) : 0,
  };
}
