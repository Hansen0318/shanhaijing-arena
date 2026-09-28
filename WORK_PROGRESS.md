# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Current status: **VIEWPORT RESIZE REGRESSION FIXED IN CODE — DEPLOY/PLAYER SMOKE PENDING**
- Preview URL: https://hansen0318.github.io/shanhaijing-arena/
- KO smoke URL: https://hansen0318.github.io/shanhaijing-arena/?fixture=ko
- Recovery rule: do **not** recreate combat foundation, renderer bootstrap, Pages setup, fullscreen arena world, selection, or KO fixture
- Next exact step: verify latest viewport-driven resize fix; do not begin joystick until visual smoke passes
- Canonical camera contract: `docs/CONTROL_CAMERA.md`

## Player-reported regression
After changing display scale to `Phaser.Scale.ENVELOP`, player screenshots showed:
- landscape scene offset/cropped incorrectly;
- portrait scene also offset;
- actors and battlefield appeared over-zoomed.

ENVELOP was the wrong fix because it filled the viewport by globally magnifying/cropping the fixed 16:9 canvas.

## Chat-first correction
Display/presentation only:
- `Phaser.Scale.ENVELOP` -> `Phaser.Scale.RESIZE`;
- canvas follows the actual browser viewport instead of scaling a fixed 960x540 surface;
- main camera size updates from Phaser game size on create and on every resize/orientation change;
- Arena world remains 1280x720;
- arena projection remains unchanged;
- camera world bounds remain unchanged;
- page container remains fixed to `100vw x 100dvh`;
- no combat, AI, ability, target, selection, KO, or balance logic changed.

## Intended result
- landscape: battlefield uses the available browser game viewport without FIT bars and without ENVELOP over-zoom;
- no global scene stretch;
- no large scale jump when orientation changes;
- camera still moves inside the 1280x720 world and clamps at bounds;
- portrait is secondary but must remain undistorted and not globally over-zoomed/offset.

## Existing evidence retained
- combat/headless tests remain valid;
- fullscreen Arena world/projection remain valid;
- only viewport presentation evidence is invalidated.

## Required verification
Automated:
- existing tests PASS;
- production build PASS;
- Pages deploy PASS.

Interactive:
- landscape first:
  - battlefield occupies available game viewport;
  - no large unused bars from fixed-aspect canvas scaling;
  - no ENVELOP-style over-zoom/cropping;
  - actors remain reasonable scale;
  - A1/A2/A3 selection/highlight works;
  - camera retarget stays inside continuous Arena world;
  - no outside-world blank area;
- portrait sanity:
  - no obvious global zoom or offset;
  - no stretch/distortion;
- KO fixture remains valid.

## Gate
Do not start `movement joystick + shared player override input` until this viewport regression is cleared.
