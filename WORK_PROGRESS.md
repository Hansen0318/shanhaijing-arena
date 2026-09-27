# Work Progress

## Current milestone
**M0 — Combat Prototype foundation**

## Current status
Design/spec foundation is complete. First framework-independent combat-core slice is implemented on branch `feat/m0-combat-core-20260927`.

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
Local framework-independent test run: **14 / 14 PASS** using Node built-in test runner.

## Next action
Continue M0 in Work:
1. Character state/data model.
2. Ability cooldown/execution state.
3. Basic AI decision loop.
4. Headless 3v3 simulation.
5. Select and integrate rendering stack.
6. Mobile-landscape arena + camera + touch controls.

## Prototype exit criteria
See `docs/STATE.md` and `docs/TEST_STRATEGY.md`.
