# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Latest completed implementation slice: M0 Basic AI intent loop
- Latest completed Chat-first slice: AI contract + implementation + targeted verification
- Recovery rule: inspect the active branch/PR first; do **not** recreate completed deterministic core, Character, Ability, or AI slices
- Next exact step: implement the **headless 3v3 simulation** by integrating existing Character, Targeting, ControlHandoff, Ability, AI, type, and battle-resolution contracts; keep it renderer-free
- Canonical state: `docs/STATE.md`
- Workflow: `docs/DEVELOPMENT_PLAYBOOK.md`
- AI contract: `docs/AI_SYSTEM.md`
- Test scope: `docs/TEST_STRATEGY.md`
- Preflight: `docs/PREFLIGHT_M0.md`

## Current status
Deterministic combat core, Character model, Ability lifecycle, and Basic AI intent loop are complete on the active branch. PR #1 remains open. Rendering is still intentionally absent.

## Implemented M0 core slice
- Type multiplier rule.
- KO / team HP score / victory-defeat timeout rule.
- 2-second control handoff timer.
- Soft-target retention and nearest-target fallback.
- Nearest surviving ally helper for selected-character KO.

## Implemented M0 Character slice
- Immutable definition snapshot and shared player/enemy per-battle state.
- HP clamp, terminal KO, selection/action/heal gates.
- Independent ability runtime slots and existing control handoff state.

## Implemented M0 Ability slice
- Declarative active Ability definitions.
- Shared ready/executing/cooldown lifecycle.
- Cooldown, target validation, KO cancellation, Basic zero-cooldown behavior.
- Shared AI/player execution surface.

## Implemented M0 AI slice
- Framework-independent deterministic AI intent decision in `src/combat/ai.js`.
- KO and player-override gates.
- Existing soft-target retention/fallback reuse.
- Positive-priority non-Basic selection with deterministic tie order.
- Basic fallback.
- Move intent when no usable ability can reach target.
- AI returns intent only; Ability execution still uses shared `startAbility()`.

## Verification
- Existing deterministic core: **14 / 14 PASS** recorded evidence.
- Character + direct handoff: **9 / 9 PASS** recorded evidence.
- Ability isolated: **10 / 10 PASS**.
- Ability + Character impacted: **16 / 16 PASS**.
- AI + Targeting + ControlHandoff + Ability impacted targeted run: **27 / 27 PASS**.
- Tests used Node built-in runner in an isolated reconstruction of exact fetched branch source because direct clone was blocked by executor DNS.
- Browser/mobile smoke: **not applicable yet**.
- Player smoke: **not started**.

## Known blockers / defects
- None in deterministic core, Character, Ability, or AI slices.
- Rendering stack is intentionally not locked yet.
- Headless 3v3 simulation is the first unfinished item.

## Remaining M0 work
1. Headless 3v3 simulation.
2. Select/integrate rendering stack.
3. Mobile-landscape arena.
4. Character selection UI.
5. Soft-follow camera.
6. Touch controls and player override integration.
7. HUD / damage numbers / KO presentation.
8. Runtime/mobile smoke and final M0 verification.

## Prototype exit criteria
See `docs/STATE.md` and `docs/TEST_STRATEGY.md`.
