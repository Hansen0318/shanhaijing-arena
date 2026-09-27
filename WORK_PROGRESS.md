# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Latest completed verified slice: deterministic M0 headless 3v3 simulation
- Latest safe renderer checkpoint: `a3bdbadc64dc0a9369e5c9570f6831fa344b73f4` (code/build/test checkpoint, browser smoke pending)
- Latest completed Chat-first slice: rendering/build stack decision and integration acceptance criteria
- Recovery rule: inspect the active branch/PR first; do **not** recreate completed deterministic core, Character, Ability, AI, or headless simulation slices
- Rendering/build decision: Phaser 4.2.1 + Vite 8.3.1 + plain JavaScript/ESM; see `docs/RENDERING_STACK_M0.md`
- Next exact step: run one bounded browser smoke on an accessible preview of this checkpoint, confirming scene boot, six visible actors, and no blocking console/runtime error; then advance to mobile-landscape arena + first player-testable interaction slice
- Canonical state: `docs/STATE.md`
- Workflow: `docs/DEVELOPMENT_PLAYBOOK.md`
- Rendering stack: `docs/RENDERING_STACK_M0.md`
- Headless contract: `docs/HEADLESS_SIMULATION_M0.md`
- Test scope: `docs/TEST_STRATEGY.md`

## Current status
The framework-independent M0 combat foundation resolves deterministic 3v3 battles headlessly. The renderer code, locked dependencies, lockfile and production build are checkpointed on PR #1. Browser smoke remains incomplete because the cloud browser blocked access to the local Vite address (`ERR_BLOCKED_BY_CLIENT`). Do not treat this checkpoint as renderer ENGINEERING PASS.

## Completed combat foundation
- Deterministic type, KO, battle resolution, handoff, and targeting core.
- Character definition and per-battle state.
- Ability definition and shared execution lifecycle.
- Basic AI intent loop.
- Prototype deterministic direct-damage resolver.
- Headless 3v3 simulation with movement, Basic cadence, shared Ability execution, type multiplier, KO, and battle termination.

## Rendering/build decision
- Phaser 4.2.1.
- Vite 8.3.1.
- Plain JavaScript / ESM; no React/Vue/Svelte layer.
- Phaser is presentation/input only; deterministic combat truth remains in existing modules.
- Node engine metadata tightened to >=22.12.0.
- First runtime slice uses placeholders only; no final art/VFX/progression/campaign.

## Renderer checkpoint implementation
- Exact Phaser/Vite versions installed and recorded in `package-lock.json`.
- Minimal Vite HTML entry, one Phaser scene and one Arena-to-world coordinate adapter.
- Six placeholders use immutable-by-copy snapshots emitted by the existing headless simulation; Phaser replays these snapshots for presentation and follows allied `a2`.
- Combat logic remains in the framework-independent modules. Snapshot callback is optional and preserves the prior headless result API.
- Commit `a3bdbadc64dc0a9369e5c9570f6831fa344b73f4` is pushed on the active branch.

## Verification
- Existing deterministic core: **14 / 14 PASS** recorded evidence.
- Character + direct handoff: **9 / 9 PASS** recorded evidence.
- Ability isolated: **10 / 10 PASS**.
- Ability + Character impacted: **16 / 16 PASS**.
- AI + Targeting + ControlHandoff + Ability impacted: **27 / 27 PASS**.
- Headless integration plus directly affected modules: **38 / 38 PASS**.
- Current checkpoint `npm test`: **48 / 48 PASS**, including snapshot and coordinate-adapter tests.
- `npm run build`: **PASS** with Vite 8.3.1; bundle-size advisory emitted, no build failure.
- Runtime fixture check: **9 frames**, initial **6 actors**, terminal **victory**.
- Local Vite process reported ready on `127.0.0.1:5173`; actual browser smoke **INCOMPLETE**: cloud browser navigation returned `ERR_BLOCKED_BY_CLIENT`. No scene/visibility/console PASS claim.
- Repeated identical 3v3 fixture produced identical result/final state.
- Browser smoke: **pending accessible runtime preview**. Mobile/player smoke remains later scope.
- Player smoke: **not started**.

## Work-only capability gap
The remaining gate for this slice is one bounded browser smoke in an environment that can reach the preview. Do not redo dependency installation, renderer code or the already passing Node/build checks unless later changes affect them.

Chat has already completed stack selection, dependency versions, architecture boundary, first runtime scope, and acceptance criteria.

## Remaining M0 work
1. Bounded browser renderer smoke: scene boot, six visible actors, no blocking runtime/console error.
2. Mobile-landscape arena and first player-testable interaction slice.
3. Character selection UI.
4. Soft-follow camera.
5. Touch controls and player override integration.
6. HUD / damage numbers / KO presentation.
7. Runtime/mobile smoke and final M0 verification.

## Prototype exit criteria
See `docs/STATE.md` and `docs/TEST_STRATEGY.md`.
