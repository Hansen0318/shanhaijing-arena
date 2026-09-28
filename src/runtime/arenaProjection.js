export const ARENA_LAYOUT = Object.freeze({
  xMin: 0,
  xMax: 10,
  yMin: -2,
  yMax: 2,
  horizontalPaddingRatio: 0.12,
  verticalPaddingRatio: 0.16,
});

// Fixed-view Arena projection. Simulation coordinates are mapped directly into
// the current visible viewport so the whole 3v3 battlefield remains on screen.
// Selection never changes the camera.
export function arenaToViewport({ x, y }, { width = 960, height = 540 } = {}) {
  const left = width * ARENA_LAYOUT.horizontalPaddingRatio;
  const right = width * (1 - ARENA_LAYOUT.horizontalPaddingRatio);
  const top = height * ARENA_LAYOUT.verticalPaddingRatio;
  const bottom = height * (1 - ARENA_LAYOUT.verticalPaddingRatio);

  const xRatio = (x - ARENA_LAYOUT.xMin) / (ARENA_LAYOUT.xMax - ARENA_LAYOUT.xMin);
  const yRatio = (y - ARENA_LAYOUT.yMin) / (ARENA_LAYOUT.yMax - ARENA_LAYOUT.yMin);

  return {
    x: left + xRatio * (right - left),
    y: top + yRatio * (bottom - top),
  };
}
