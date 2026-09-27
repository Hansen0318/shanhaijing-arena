# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Latest completed slice: framework-independent deterministic combat core
- Recovery rule: inspect the active branch/PR first; do **not** recreate this slice from `main`
- Next exact step: implement Character state/data model, then Ability cooldown/execution, then headless 3v3 simulation
- Canonical state: `docs/STATE.md`
- Preflight: `docs/PREFLIGHT_M0.md`

## Current status
Design/spec foundation is complete. First framework-independent combat-core slice is implemented on the active branch.

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

## Verification
- Deterministic tests: **14 / 14 PASS** using Node built-in test runner.
- Rendering/browser/mobile smoke: **not applicable yet**; rendering is not implemented in this slice.
- Player smoke: **not started**.

## Known blockers / defects
- None in the deterministic core slice.
- Rendering stack is intentionally not locked yet.

## Remaining M0 work
1. Character state/data model.
2. Ability cooldown/execution state.
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
