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
