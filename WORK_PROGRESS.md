# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Current status: **ENGINEERING PASS / PLAYER SMOKE PASS** for fullscreen Arena/camera slice; defect resolved
- Latest fullscreen-arena branch SHA deployed by Pages workflow: `dcbefd47f136d3ffa4f482fcb96e0d0c4d6789a0`
- Preview URL: https://hansen0318.github.io/shanhaijing-arena/
- KO smoke URL: https://hansen0318.github.io/shanhaijing-arena/?fixture=ko
- Recovery rule: do **not** recreate or rerun completed combat foundation, renderer bootstrap, Pages setup, fullscreen-arena code, projection tests, build, or deployment unless the interactive smoke finds a real defect
- Next exact step: **movement joystick + shared player override input**
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

## Fullscreen arena interactive browser smoke — PASS
Executed against the deployed HTTPS URL above (runtime SHA `dcbefd47f136d3ffa4f482fcb96e0d0c4d6789a0`); no code change in this smoke slice.

Default:
- Battlefield background fills the entire landscape game canvas; the old 760x320 bordered card is absent.
- Six actors render; all six are visible together as replay advances from the initial separated positions.
- Clicking A1, A3, and A2 moves the white selection highlight accordingly. Camera soft-retargets within one continuous world rather than moving a framed mini-map.
- Camera observations at initial left position, upper A1, lower A3, and subsequent central/rightward replay positions showed no outside-world blank space.
- Enemy E2 click leaves A2 selected; replay advances; no blocking page-origin console/runtime error.

`?fixture=ko`:
- A2 initially selected; scripted A2 KO fades its marker and automatically selects living A1.
- Camera follows A1; no outside-world blank space or blocking page-origin error.

A browser extension emitted its own metadata error from `chrome-extension://`; it did not block the game. The canvas can have letterboxing outside the 16:9 **game viewport** in a differently proportioned browser window; no blank area appeared **inside** the game canvas.

## Gate and next step
- Fullscreen arena/camera defect: **RESOLVED**.
- This slice: **ENGINEERING PASS / PLAYER SMOKE PASS**.
- Exact next step: **movement joystick + shared player override input**.
- Do not redo combat, build, deploy, or these browser checks unless a later change materially affects them.
