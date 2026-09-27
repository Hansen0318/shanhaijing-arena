# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Latest completed verified slice: deterministic M0 headless 3v3 simulation
- Latest renderer/build checkpoint before interaction edit: `a3bdbadc64dc0a9369e5c9570f6831fa344b73f4`
- Latest completed Chat-first interaction slice: allied selection/camera/KO fallback
- Latest completed Chat-first unblock: GitHub Pages preview workflow + Vite Pages base + deterministic KO smoke fixture
- Recovery rule: do **not** recreate deterministic core, Character, Ability, AI, headless simulation, renderer bootstrap, ally selection, Pages workflow, or KO fixture
- Preview workflow: `.github/workflows/m0-pages-preview.yml`
- KO smoke URL mode: `?fixture=ko`
- Next exact step: verify the GitHub Pages deployment produced an accessible HTTPS preview, then run bounded browser smoke on default and KO fixture URLs; only after PASS advance to joystick
- Canonical state: `docs/STATE.md`
- First interaction contract: `docs/PLAYER_INTERACTION_M0.md`

## Current status
The previous Work attempt correctly remained **FAIL / INCOMPLETE** because its cloud browser could not access localhost. Chat has now removed both identified blockers in repository code/config:

1. Added a GitHub Pages deployment workflow to produce a normal HTTPS preview from the active feature branch.
2. Added a deterministic `?fixture=ko` runtime mode so selected-KO fallback can be observed without changing production combat balance.

## Existing verified evidence
- Deterministic/headless integration evidence retained.
- Previous renderer checkpoint Node tests: **48 / 48 PASS**.
- Previous production build: **PASS**.
- Latest interaction branch build reported by Work: **PASS**.
- Browser interaction smoke: still pending until the Pages deployment is confirmed accessible.

## Latest Chat-first unblock changes
- `vite.config.js`: Pages base `/shanhaijing-arena/`.
- `.github/workflows/m0-pages-preview.yml`: Node 22.12, npm ci/test/build, Pages configure/upload/deploy.
- `src/runtime/demoBattle.js`: deterministic selected-a2 KO replay fixture.
- `src/runtime/ArenaScene.js`: reads `?fixture=ko` and exposes fixture name in smoke metadata.

## Required bounded browser verification
Default preview:
- scene boots;
- six actors visible;
- a1/a2/a3 selection works;
- selected highlight switches;
- camera retargets smoothly;
- enemy click does not change selection;
- replay continues;
- no blocking console/runtime error.

KO fixture preview:
- starts with a2 selected;
- deterministic replay sets a2 HP to zero;
- selection automatically falls back to a living ally through existing `nearestSurvivingAlly()`;
- camera follows fallback;
- no blocking console/runtime error.

## Gate
Do **not** start joystick until the default + KO browser smoke passes.

If PASS:
- mark `ENGINEERING PASS / PLAYER SMOKE PENDING`;
- preserve the accessible HTTPS preview for the player;
- next exact step: `movement joystick + shared player override input`.
