# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Current status: **LANDSCAPE VIEWPORT DEFECT FIXED IN CODE — DEPLOY/INTERACTIVE SMOKE PENDING**
- Preview URL: https://hansen0318.github.io/shanhaijing-arena/
- KO smoke URL: https://hansen0318.github.io/shanhaijing-arena/?fixture=ko
- Recovery rule: do **not** recreate combat foundation, renderer bootstrap, Pages setup, fullscreen arena world, selection, or KO fixture
- Next exact step: verify the latest landscape viewport-cover fix in deployed runtime; do not begin joystick until this smoke passes
- Canonical camera contract: `docs/CONTROL_CAMERA.md`

## Player-reported landscape defect
Player screenshots on iPhone landscape showed the battlefield occupying only part of the available browser viewport with large unused dark regions. Portrait looked visually acceptable, but portrait is not the M0 acceptance orientation.

Root cause:
- the Phaser display scale mode was `Phaser.Scale.FIT`;
- FIT preserves all 16:9 content inside the viewport, which intentionally leaves unused bars when the mobile landscape viewport is wider than 16:9;
- this conflicts with the product requirement that the battlefield presentation fill the landscape game viewport.

## Chat-first fix
Changed only the display/presentation layer:
- Phaser scale mode: `FIT` -> `ENVELOP`;
- logical game size remains 960x540;
- Arena world remains 1280x720;
- aspect ratio remains 16:9;
- display now uses cover/envelop semantics: preserve aspect, cover the available viewport, crop excess rather than show unused bars;
- page/game container is fixed to the dynamic viewport with overflow hidden and touch-action disabled;
- no combat, AI, ability, selection, projection, or balance logic changed;
- portrait is explicitly not the M0 acceptance orientation.

## Existing evidence retained
- previous combat/headless tests remain valid;
- fullscreen Arena world/projection implementation remains valid;
- only viewport presentation evidence is invalidated by this display-scale change.

## Required verification
Automated:
- existing test suite PASS;
- production build PASS;
- Pages deploy PASS.

Interactive landscape smoke:
- rotate/use phone in landscape;
- battlefield presentation covers the available game viewport;
- no large unused dark bands around the game canvas;
- canvas is not stretched/distorted;
- A1/A2/A3 selection/highlight still works;
- camera retarget still reads as movement through the battlefield;
- camera never reveals outside-world blank space;
- enemy click remains no-op;
- replay continues;
- no blocking page-origin runtime/console error.

KO fixture:
- A2 initial selection;
- KO fallback works;
- camera follows fallback;
- no outside-world blank space.

## Gate
Do not begin `movement joystick + shared player override input` until landscape viewport smoke passes.

If PASS:
- mark landscape/fullscreen presentation defect resolved;
- next exact step: `movement joystick + shared player override input`.

If FAIL:
- record exact device/orientation/screenshot;
- fix only display/camera presentation;
- do not broaden scope.
