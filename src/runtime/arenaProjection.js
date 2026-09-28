export const ARENA_WORLD = Object.freeze({
  width: 1280,
  height: 720,
});

// Arena simulation coordinates stay framework-independent.
// This projection places the 0..10 horizontal combat span inside a larger 16:9 world
// so the camera can move without ever revealing space outside the arena.
export function arenaToWorld({ x, y }) {
  return {
    x: 160 + x * 96,
    y: 360 + y * 120,
  };
}
