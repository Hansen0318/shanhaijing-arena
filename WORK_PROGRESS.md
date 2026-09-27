# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Latest completed verified slice: deterministic M0 headless 3v3 simulation
- Latest renderer/build checkpoint before interaction edit: `a3bdbadc64dc0a9369e5c9570f6831fa344b73f4` (48/48 Node + build PASS; browser smoke incomplete)
- Latest completed Chat-first slice: first player-testable ally selection/camera interaction, commit `446f94175358bda4927a9c04729f2c7c0c1c6b52`
- Latest verification handoff base: `2789be29986171c63cbdc8ad4c7c673fb3e08d56`; build verified, browser smoke blocked in this environment
- Recovery rule: inspect the active branch/PR first; do **not** recreate completed deterministic core, Character, Ability, AI, headless simulation, renderer bootstrap, or ally-selection edit
- First interaction contract: `docs/PLAYER_INTERACTION_M0.md`
- Next exact step: obtain a browser-accessible preview for this branch and run the bounded scene/selection smoke, including a KO-containing replay fixture for selected-KO fallback; only after engineering PASS proceed to movement joystick + shared player override input
- Canonical state: `docs/STATE.md`
- Workflow: `docs/DEVELOPMENT_PLAYBOOK.md`
- Rendering stack: `docs/RENDERING_STACK_M0.md`
- Test scope: `docs/TEST_STRATEGY.md`

## Current status
The deterministic combat foundation is complete. Renderer bootstrap is checkpointed and Chat has added the first player-testable interaction directly in `src/runtime/ArenaScene.js`: allied placeholder selection, selected visual state, smooth camera retargeting, and selected-KO fallback via existing `nearestSurvivingAlly()`. The latest branch build passed; browser verification remains pending because the cloud browser cannot access the local preview and no accessible preview was found in this repository. The current nine-frame demo ends with all three allies alive, so ordinary clicks cannot exercise selected-KO fallback.

## Completed combat foundation
- Deterministic core, Character, Ability, AI, CombatResolver, and headless 3v3 integration.
- Headless impacted integration evidence: **38 / 38 PASS**.

## Renderer/bootstrap evidence before latest interaction edit
- Phaser 4.2.1 + Vite 8.3.1 exact versions locked.
- `package-lock.json` present.
- Previous renderer checkpoint `npm test`: **48 / 48 PASS**.
- Previous renderer checkpoint `npm run build`: **PASS**.
- Previous bounded browser smoke: **INCOMPLETE** because cloud browser returned `ERR_BLOCKED_BY_CLIENT` for local Vite preview.

## Latest Chat-first interaction edit
- Directly tappable/clickable allied placeholders a1/a2/a3.
- Default selection a2.
- Obvious selected stroke state.
- Camera retarget uses existing soft follow damping.
- Enemy placeholders have no selection handler.
- Selection persists while replay frames advance.
- Selected KO falls back through existing `nearestSurvivingAlly()`.
- No combat logic duplicated in Phaser.
- Contract: `docs/PLAYER_INTERACTION_M0.md`.

## Verification pending
Latest branch `npm run build`: **PASS** (Vite 8.3.1; 18 modules transformed). The interaction edit was renderer-only; no historical deterministic/full regression was rerun.

Executable/runtime verification still pending:
1. make this exact branch build browser-accessible without redoing renderer bootstrap;
2. bounded browser smoke: scene boot, six visible actors, a1/a2/a3 selection/highlight, camera retarget, enemy click no-op, replay continuing, and no blocking console/runtime error;
3. use a KO-containing deterministic replay fixture to observe selected-KO fallback. The current demo ends with allied HP `[78.45, 78.45, 78.45]`, so this path has not been runtime tested.

Status: **FAIL / INCOMPLETE** for interaction engineering verification. No accessible player preview was verified in this session.

Do not rerun historical deterministic/full regression unless the build/runtime result reveals wider coupling.

## Remaining M0 work
1. Accessible bounded browser verification of the latest renderer + first interaction slice, including a KO fixture.
2. If PASS, retain the accessible player preview/build and mark ENGINEERING PASS / PLAYER SMOKE PENDING.
3. Next after player selection smoke: movement joystick + shared player override input.
4. Heavy/Special/Awakening controls.
5. Minimum HUD / damage numbers / KO presentation.
6. Runtime/mobile smoke and final M0 verification.
