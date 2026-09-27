# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Latest completed implementation slice: deterministic M0 headless 3v3 simulation
- Latest completed Chat-first slice: headless simulation contract + CombatResolver + integration tests
- Recovery rule: inspect the active branch/PR first; do **not** recreate completed deterministic core, Character, Ability, AI, or headless simulation slices
- Next exact step: select and integrate the rendering/build stack, then expose the existing combat state in a minimal mobile-landscape arena
- Canonical state: `docs/STATE.md`
- Workflow: `docs/DEVELOPMENT_PLAYBOOK.md`
- Headless contract: `docs/HEADLESS_SIMULATION_M0.md`
- Test scope: `docs/TEST_STRATEGY.md`
- Preflight: `docs/PREFLIGHT_M0.md`

## Current status
The framework-independent M0 combat foundation now runs through deterministic 3v3 headless resolution. PR #1 remains open. Rendering/build integration is the first unfinished item.

## Implemented slices
- Deterministic type, KO, battle resolution, handoff, and targeting core.
- Character definition and per-battle state.
- Ability definition and shared execution lifecycle.
- Basic AI intent loop.
- Prototype-only deterministic direct-damage resolver.
- Headless 3v3 simulation with movement intents, Basic cadence, shared Ability execution, type multiplier, KO, and existing battle termination.

## Headless prototype rules
- Direct-damage formula and Basic cadence are documented in `docs/HEADLESS_SIMULATION_M0.md`.
- They are deterministic M0 harness rules, not final balance.
- Simulation step is 0.25s.
- Rendering, collision/avoidance, animation windup, projectiles, camera, HUD, VFX, and touch controls are intentionally not part of the headless harness.

## Verification
- Existing deterministic core: **14 / 14 PASS** recorded evidence.
- Character + direct handoff: **9 / 9 PASS** recorded evidence.
- Ability isolated: **10 / 10 PASS**.
- Ability + Character impacted: **16 / 16 PASS**.
- AI + Targeting + ControlHandoff + Ability impacted: **27 / 27 PASS**.
- Headless integration plus directly affected Character / Ability / AI / Targeting / ControlHandoff: **38 / 38 PASS**.
- Repeated identical 3v3 fixture produced identical result/final state.
- Stronger advantaged ally fixture resolved to victory without player input.
- Tests used Node built-in runner in an isolated reconstruction of exact fetched branch source because direct GitHub clone was blocked by executor DNS.
- Browser/mobile smoke: **not started** because renderer/build stack is not integrated.
- Player smoke: **not started**.

## Known blockers / defects
- None in the headless combat foundation.
- Rendering/build stack integration is now the first unfinished item.

## Remaining M0 work
1. Select/integrate rendering/build stack.
2. Mobile-landscape arena.
3. Character selection UI.
4. Soft-follow camera.
5. Touch controls and player override integration.
6. HUD / damage numbers / KO presentation.
7. Runtime/mobile smoke and final M0 verification.

## Prototype exit criteria
See `docs/STATE.md` and `docs/TEST_STRATEGY.md`.
