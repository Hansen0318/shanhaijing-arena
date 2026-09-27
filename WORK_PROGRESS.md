# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Latest completed implementation slice: M0 Ability definition + shared execution lifecycle
- Latest completed Chat-first slice: Ability implementation, targeted tests, and verification
- Recovery rule: inspect the active branch/PR first; do **not** recreate the completed deterministic core, Character slice, or Ability slice
- Next exact step: define and implement the **Basic AI decision loop** using the existing Character, Targeting, ControlHandoff, and Ability APIs; keep it framework-independent and do not start headless 3v3 until the AI slice passes
- Canonical state: `docs/STATE.md`
- Workflow: `docs/DEVELOPMENT_PLAYBOOK.md`
- Character/Ability contract: `docs/CHARACTER_SYSTEM.md`
- Test scope: `docs/TEST_STRATEGY.md`
- Preflight: `docs/PREFLIGHT_M0.md`

## Current status
Design/spec foundation, deterministic combat core, Character model, and Ability lifecycle are complete on the active branch. PR #1 remains open. Rendering is still intentionally absent.

## Completed design decisions
- Mobile landscape.
- 2.5D / three-quarter arena presentation.
- 3v3 real-time semi-auto combat.
- All characters can fight autonomously.
- Player can select one allied character and intervene at any time.
- 2.0 seconds without valid combat input returns that character to full AI decision-making.
- Camera continues following the selected character.
- No AUTO/MANUAL UI state indicator.
- Types: Power / Speed / Blast.
- Roles: Tank / Attacker / Support; type and role are independent.
- Skill model: Basic / Heavy / Special / Awakening / Passive.
- Basic has no cooldown and is automatic.
- Enemy characters use the same core character rules/data model as player characters.

## Implemented M0 core slice
- Type multiplier rule.
- KO / team HP score / victory-defeat timeout rule.
- 2-second control handoff timer.
- Soft-target retention and nearest-target fallback.
- Nearest surviving ally helper for selected-character KO.
- Deterministic tests for these rules.

## Implemented M0 Character slice
- Immutable definition snapshot and shared player/enemy per-battle Character state.
- HP clamp, terminal KO, selection/action/heal gates.
- Independent ability runtime slots and existing control handoff state.
- Framework-independent code in `src/combat/character.js`.

## Implemented M0 Ability slice
- Declarative immutable active Ability definition.
- Shared `ready -> executing -> cooldown -> ready` lifecycle.
- Cooldown starts on successful finish/resolution and clamps at zero.
- Basic requires declared cooldown 0 and returns directly to ready after finish.
- KO caster start rejection and KO-during-execution cancellation.
- Resolved-target validation for missing/KO/out-of-range targets.
- Target selection remains outside Ability.
- AI/player source metadata uses the same start/finish execution surface.
- Production code: `src/combat/ability.js`.
- Targeted tests: `tests/ability.test.js`.

## Verification
- Existing deterministic core: **14 / 14 PASS** recorded evidence; not rerun because Ability did not modify those production contracts.
- Previous Character + directly affected handoff: **9 / 9 PASS** recorded evidence.
- Ability isolated targeted tests: **10 / 10 PASS**.
- Ability + Character impacted targeted run: **16 / 16 PASS**.
- Verification used Node built-in test runner in an isolated local reconstruction of the exact fetched branch source because direct GitHub clone was blocked by executor DNS. Source/test files were fetched/written from the active branch contents; no dependency installation or renderer/runtime was involved.
- Browser/mobile smoke: **not applicable yet**.
- Player smoke: **not started**.

## Known blockers / defects
- None in deterministic core, Character, or Ability slices.
- Rendering stack is intentionally not locked yet.
- Basic AI decision loop is the first unfinished item.

## Remaining M0 work
1. Basic AI decision loop.
2. Headless 3v3 simulation.
3. Select/integrate rendering stack.
4. Mobile-landscape arena.
5. Character selection UI.
6. Soft-follow camera.
7. Touch controls and player override integration.
8. HUD / damage numbers / KO presentation.
9. Runtime/mobile smoke and final M0 verification.

## Prototype exit criteria
See `docs/STATE.md` and `docs/TEST_STRATEGY.md`.
