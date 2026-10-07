export const ARENA_STAGE = Object.freeze({
  width: 1120,
  height: 540,
  xMin: -2.3333333333,
  xMax: 12.3333333333,
  yMin: -2,
  yMax: 2,
  horizontalPadding: 32,
  topPadding: 160,
  bottomPadding: 32,
});

export function arenaToStage({ x, y }) {
  const left = ARENA_STAGE.horizontalPadding;
  const right = ARENA_STAGE.width - ARENA_STAGE.horizontalPadding;
  const top = ARENA_STAGE.topPadding;
  const bottom = ARENA_STAGE.height - ARENA_STAGE.bottomPadding;

  const xRatio = (x - ARENA_STAGE.xMin) / (ARENA_STAGE.xMax - ARENA_STAGE.xMin);
  const yRatio = (y - ARENA_STAGE.yMin) / (ARENA_STAGE.yMax - ARENA_STAGE.yMin);

  return {
    x: left + xRatio * (right - left),
    y: top + yRatio * (bottom - top),
  };
}
