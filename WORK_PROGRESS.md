# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Current status: **FULLSCREEN ARENA CODE/BUILD/DEPLOY PASS — INTERACTIVE PLAYER/BROWSER SMOKE ONLY**
- Latest fullscreen-arena branch SHA deployed by Pages workflow: `dcbefd47f136d3ffa4f482fcb96e0d0c4d6789a0`
- Preview URL: https://hansen0318.github.io/shanhaijing-arena/
- KO smoke URL: https://hansen0318.github.io/shanhaijing-arena/?fixture=ko
- Recovery rule: do **not** recreate or rerun completed combat foundation, renderer bootstrap, Pages setup, fullscreen-arena code, projection tests, build, or deployment unless the interactive smoke finds a real defect
- Next exact step: **interactive browser/player smoke only** for the fullscreen arena/camera presentation; do not begin joystick until that smoke passes
- Canonical camera contract: `docs/CONTROL_CAMERA.md`

## Fullscreen-arena player-smoke defect
Player feedback correctly identified that the prior 760x320 bordered battlefield looked like a small map card sliding around when the camera retargeted.

Chat corrected the presentation:
- logical viewport remains 960x540;
- Arena world is 1280x720;
- both are 16:9;
- removed the small bordered battlefield;
- arena background fills the entire world;
- Arena simulation coordinates project across the larger world;
- camera remains soft-follow and is clamped to world bounds;
- future controls/HUD are screen-space overlays over the battlefield.

## Current automated / deployment evidence
GitHub Actions `M0 Pages Preview` run #13 for SHA `dcbefd47f136d3ffa4f482fcb96e0d0c4d6789a0` completed successfully:
- checkout/setup/install: PASS
- tests: **49 / 49 PASS**
- failures: **0**
- Vite 8.3.1 production build: **PASS**
- 18 modules transformed
- Pages configure: PASS
- Pages artifact upload: PASS
- Pages deploy: PASS
- published artifact: `github-pages`, generated from the exact feature-branch SHA above

No combat production module was changed by this fullscreen presentation fix, so historical combat/headless evidence remains valid.

## What is already complete and must not be handed back to Work
- combat foundation
- Character / Ability / AI / headless simulation
- Phaser/Vite setup
- GitHub Pages setup and deployment
- first ally selection interaction
- selected-KO fixture
- fullscreen arena world implementation
- projection tests
- latest test/build/deploy cycle

## Only remaining gate
A real interactive browser must visually exercise the deployed Phaser canvas.

Default preview:
- battlefield fills the visible landscape game viewport;
- no small bordered arena card remains;
- six placeholders render;
- tap/click A1/A2/A3 and confirm selection highlight;
- camera retarget reads as moving through one continuous battlefield;
- camera bounds never expose outside-world blank space;
- enemy click remains no-op;
- replay continues;
- no blocking page-origin runtime/console error.

KO fixture:
- A2 initially selected;
- A2 KO causes nearest-living-ally fallback;
- camera follows fallback;
- no outside-world blank space appears;
- no blocking page-origin runtime/console error.

## Gate
If interactive smoke PASS:
- mark fullscreen arena/camera defect resolved;
- preserve `ENGINEERING PASS / PLAYER SMOKE PASS` for this slice;
- next exact step: `movement joystick + shared player override input`.

If smoke finds a defect:
- record the exact visual/runtime defect with screenshot/device context;
- fix only the affected renderer/camera slice;
- do not broaden scope.
