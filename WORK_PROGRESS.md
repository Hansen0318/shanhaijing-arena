# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Latest completed implementation slice: deterministic M0 headless 3v3 simulation
- Latest completed Chat-first slice: rendering/build stack decision and integration acceptance criteria
- Recovery rule: inspect the active branch/PR first; do **not** recreate completed deterministic core, Character, Ability, AI, or headless simulation slices
- Rendering/build decision: Phaser 4.2.1 + Vite 8.3.1 + plain JavaScript/ESM; see `docs/RENDERING_STACK_M0.md`
- Next exact step: install the locked dependencies, generate lockfile, wire the minimal Vite/Phaser runtime, render six placeholder combatants from existing Arena state, and perform the bounded build/browser smoke
- Canonical state: `docs/STATE.md`
- Workflow: `docs/DEVELOPMENT_PLAYBOOK.md`
- Rendering stack: `docs/RENDERING_STACK_M0.md`
- Headless contract: `docs/HEADLESS_SIMULATION_M0.md`
- Test scope: `docs/TEST_STRATEGY.md`

## Current status
The framework-independent M0 combat foundation resolves deterministic 3v3 battles headlessly. The rendering/build stack is now locked. PR #1 remains open. Dependency installation/runtime integration is the first unfinished item and is the first task that genuinely requires Work.

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

## Verification
- Existing deterministic core: **14 / 14 PASS** recorded evidence.
- Character + direct handoff: **9 / 9 PASS** recorded evidence.
- Ability isolated: **10 / 10 PASS**.
- Ability + Character impacted: **16 / 16 PASS**.
- AI + Targeting + ControlHandoff + Ability impacted: **27 / 27 PASS**.
- Headless integration plus directly affected modules: **38 / 38 PASS**.
- Repeated identical 3v3 fixture produced identical result/final state.
- Browser/mobile smoke: **pending renderer integration**.
- Player smoke: **not started**.

## Work-only capability gap
Work is now required only for:
1. dependency installation / lockfile;
2. Vite/Phaser executable integration;
3. dev-server / production build loop;
4. one bounded browser runtime smoke.

Chat has already completed stack selection, dependency versions, architecture boundary, first runtime scope, and acceptance criteria.

## Remaining M0 work
1. Minimal Vite/Phaser runtime integration and six-placeholder scene.
2. Mobile-landscape arena refinement.
3. Character selection UI.
4. Soft-follow camera.
5. Touch controls and player override integration.
6. HUD / damage numbers / KO presentation.
7. Runtime/mobile smoke and final M0 verification.

## Prototype exit criteria
See `docs/STATE.md` and `docs/TEST_STRATEGY.md`.
