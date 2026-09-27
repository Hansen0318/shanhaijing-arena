// One Arena-space to Phaser-world projection; viewport scaling stays in Phaser.
export function arenaToWorld({ x, y }) {
  return { x: 260 + x * 59, y: 270 + y * 52.5 };
}
