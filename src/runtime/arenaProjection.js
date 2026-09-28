export const ARENA_STAGE = Object.freeze({
  width: 960,
  height: 540,
  xMin: 0,
  xMax: 10,
  yMin: -2,
  yMax: 2,
  horizontalPadding: 120,
  verticalPadding: 86,
});

// Stable logical-stage projection. Simulation coordinates are always mapped into
// the same 960x540 Arena design space. The whole Arena layer is then uniformly
// contained inside the real browser viewport.
export function arenaToStage({ x, y }) {
  const left = ARENA_STAGE.horizontalPadding;
  const right = ARENA_STAGE.width - ARENA_STAGE.horizontalPadding;
  const top = ARENA_STAGE.verticalPadding;
  const bottom = ARENA_STAGE.height - ARENA_STAGE.verticalPadding;

  const xRatio = (x - ARENA_STAGE.xMin) / (ARENA_STAGE.xMax - ARENA_STAGE.xMin);
  const yRatio = (y - ARENA_STAGE.yMin) / (ARENA_STAGE.yMax - ARENA_STAGE.yMin);

  return {
    x: left + xRatio * (right - left),
    y: top + yRatio * (bottom - top),
  };
}

export function fitStageToViewport({ width, height }) {
  const scale = Math.min(width / ARENA_STAGE.width, height / ARENA_STAGE.height);
  return {
    scale,
    offsetX: (width - ARENA_STAGE.width * scale) / 2,
    offsetY: (height - ARENA_STAGE.height * scale) / 2,
  };
}
