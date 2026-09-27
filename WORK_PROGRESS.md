# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Latest completed implementation slice: framework-independent deterministic combat core
- Latest completed Chat-first slice: Character/Ability data-state contract + targeted acceptance/test scope
- Recovery rule: inspect the active branch/PR first; do **not** recreate the completed deterministic core
- Next exact step: implement the M0 Character definition/battle-state model against `docs/CHARACTER_SYSTEM.md`, including its targeted deterministic tests; only after that passes, implement Ability runtime cooldown/execution
- Canonical state: `docs/STATE.md`
- Workflow: `docs/DEVELOPMENT_PLAYBOOK.md`
- Character contract: `docs/CHARACTER_SYSTEM.md`
- Test scope: `docs/TEST_STRATEGY.md`
- Preflight: `docs/PREFLIGHT_M0.md`

## Current status
Design/spec foundation and the first deterministic combat-core slice are complete. Chat-first recovery on 2026-09-27 confirmed the active branch/PR and locked the next Character/Ability runtime contracts without changing gameplay scope.

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
- Character progression concept: T3 -> T2 -> T1 with character fragments.
- Campaign concept: chapters with 1-1 through 1-5 story stages.

## Implemented M0 core slice
- Type multiplier rule.
- KO / team HP score / victory-defeat timeout rule.
- 2-second control handoff timer.
- Soft-target retention and nearest-target fallback.
- Nearest surviving ally helper for selected-character KO.
- Deterministic tests for these rules.

## Chat-first specification completed
- Immutable Character definition vs mutable per-battle state boundary.
- Required Character runtime fields/invariants.
- Deterministic damage/heal/KO state boundary.
- Declarative Ability definition contract.
- Ability runtime ready/executing/cooldown state contract.
- Shared AI/player execution-surface requirement.
- Basic attack M0 contract.
- Level B targeted test gate for the Character/Ability slice.

## Verification
- Existing deterministic core tests: **14 / 14 PASS** using Node built-in test runner (recorded evidence; not rerun because this Chat-only spec update cannot invalidate runtime behavior).
- Documentation/static consistency review: **PASS** for current M0 scope.
- Rendering/browser/mobile smoke: **not applicable yet**; rendering is not implemented in this slice.
- Player smoke: **not started**.

## Known blockers / defects
- None in the deterministic core slice.
- Rendering stack is intentionally not locked yet.
- Executable Character/Ability implementation is still pending.

## Remaining M0 work
1. Character state/data model implementation + targeted deterministic tests.
2. Ability cooldown/execution state + targeted deterministic tests.
3. Basic AI decision loop.
4. Headless 3v3 simulation.
5. Select/integrate rendering stack.
6. Mobile-landscape arena.
7. Character selection UI.
8. Soft-follow camera.
9. Touch controls and player override integration.
10. HUD / damage numbers / KO presentation.
11. Runtime/mobile smoke and final M0 verification.

## Prototype exit criteria
See `docs/STATE.md` and `docs/TEST_STRATEGY.md`.
