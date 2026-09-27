# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Latest completed verified slice: deterministic M0 headless 3v3 simulation
- Latest renderer/build checkpoint before interaction edit: `a3bdbadc64dc0a9369e5c9570f6831fa344b73f4` (48/48 Node + build PASS; browser smoke incomplete)
- Latest completed Chat-first slice: first player-testable ally selection/camera interaction, commit `446f94175358bda4927a9c04729f2c7c0c1c6b52`
- Recovery rule: inspect the active branch/PR first; do **not** recreate completed deterministic core, Character, Ability, AI, headless simulation, renderer bootstrap, or ally-selection edit
- First interaction contract: `docs/PLAYER_INTERACTION_M0.md`
- Next exact step: executable verification of the latest branch only — Vite build plus bounded browser smoke confirming scene boot, six actors, ally selection/highlight, camera retarget, enemy tap no-op, and no blocking console/runtime error
- Canonical state: `docs/STATE.md`
- Workflow: `docs/DEVELOPMENT_PLAYBOOK.md`
- Rendering stack: `docs/RENDERING_STACK_M0.md`
- Test scope: `docs/TEST_STRATEGY.md`

## Current status
The deterministic combat foundation is complete. Renderer bootstrap is checkpointed and Chat has added the first player-testable interaction directly in `src/runtime/ArenaScene.js`: allied placeholder selection, selected visual state, smooth camera retargeting, and selected-KO fallback via existing `nearestSurvivingAlly()`. Because this latest edit changes Phaser runtime code, browser/build verification remains pending.

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
Only executable/runtime verification that Chat cannot reliably perform remains for this slice:
1. `npm run build` on the latest branch;
2. bounded browser smoke on an accessible preview;
3. confirm six actors visible, a1/a2/a3 selection/highlight, camera retarget, enemy tap no-op, replay continues, KO fallback, and no blocking console/runtime error.

Do not rerun historical deterministic/full regression unless the build/runtime result reveals wider coupling.

## Remaining M0 work
1. Verify latest renderer + first interaction slice.
2. If PASS, expose an accessible player preview/build.
3. Next after player selection smoke: movement joystick + shared player override input.
4. Heavy/Special/Awakening controls.
5. Minimum HUD / damage numbers / KO presentation.
6. Runtime/mobile smoke and final M0 verification.
