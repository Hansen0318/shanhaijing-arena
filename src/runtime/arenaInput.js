export function hitTestCircle(point, center, radius) {
  const dx = point.x - center.x;
  const dy = point.y - center.y;
  return dx * dx + dy * dy <= radius * radius;
}

export function joystickVectorFromPoint(point, config) {
  const dx = point.x - config.x;
  const dy = point.y - config.y;
  const distance = Math.hypot(dx, dy);

  if (distance <= 0.001) {
    return { x: 0, y: 0, magnitude: 0 };
  }

  const rawMagnitude = Math.min(1, distance / config.inputRadius);
  if (rawMagnitude <= config.deadZone) {
    return { x: 0, y: 0, magnitude: 0 };
  }

  const magnitude = (rawMagnitude - config.deadZone) / (1 - config.deadZone);
  return {
    x: (dx / distance) * magnitude,
    y: (dy / distance) * magnitude,
    magnitude,
  };
}
