# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Previous status: **ENGINEERING PASS / PLAYER SMOKE PENDING** for first selection interaction
- New player-smoke defect: the prototype battlefield was rendered as a small bordered rectangle inside the viewport, so camera retargeting looked like the whole map was sliding
- Latest completed Chat-first fix: fullscreen arena-world presentation + updated projection + camera bounds contract
- Recovery rule: do **not** recreate combat foundation, renderer bootstrap, Pages workflow, selection, or KO fixture
- Preview URL: https://hansen0318.github.io/shanhaijing-arena/
- KO smoke URL: https://hansen0318.github.io/shanhaijing-arena/?fixture=ko
- Next exact step: verify the latest fullscreen-arena runtime change with targeted build + Pages/browser smoke; do not begin joystick until player-smoke defect is cleared
- Canonical camera contract: `docs/CONTROL_CAMERA.md`

## Current fullscreen-arena fix
Chat changed only the bounded renderer/projection slice:
- logical viewport remains 960x540;
- Arena world is now 1280x720;
- both are 16:9;
- removed the small 760x320 bordered battlefield presentation;
- arena background now fills the entire world;
- Arena simulation coordinates map across the larger world;
- camera remains soft-follow and clamped to world bounds;
- future HUD/joystick/skills remain screen-space overlays and must not move with camera;
- projection tests updated for the new world geometry.

## Why
Player smoke showed that the previous small framed battlefield made normal camera retargeting look like the entire map was drifting. The intended product presentation is one fullscreen battlefield with camera motion inside it.

## Existing evidence retained
- deterministic combat/headless evidence remains valid;
- previous first-interaction Pages/browser smoke remains historical evidence but is invalidated for visual/camera presentation by this renderer change;
- no combat rules were changed.

## Required targeted verification
1. latest projection tests / relevant existing tests PASS;
2. production build PASS;
3. deploy latest branch to existing Pages preview;
4. default browser smoke:
   - fullscreen battlefield fills viewport;
   - no small framed arena;
   - six placeholders render;
   - A1/A2/A3 selection still works;
   - selected highlight still works;
   - camera retarget reads as movement through battlefield;
   - no outside-world blank area appears at camera bounds;
   - enemy click remains no-op;
   - no blocking runtime error;
5. KO fixture:
   - a2 fallback still works;
   - camera retargets to fallback;
   - no blank outside-world area appears.

## Gate
Do not begin joystick until this focused visual/camera regression passes.

If PASS:
- mark fullscreen arena/camera player-smoke defect resolved;
- keep `ENGINEERING PASS / PLAYER SMOKE PENDING` for player feel if needed;
- next exact step: `movement joystick + shared player override input`.
