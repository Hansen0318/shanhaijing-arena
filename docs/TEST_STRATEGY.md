# Test Strategy v1

## Prototype test priorities

### Deterministic rules
Automate where practical:
- type counter multiplier;
- character definition/state separation;
- HP damage/heal clamping;
- KO prevents action, selection, and healing;
- cooldown transitions;
- ability readiness/execution/cooldown lifecycle;
- invalid or KO target rejection at ability start;
- HP/damage/heal;
- KO state;
- victory/defeat;
- 90s timeout tiebreak;
- invalid target handling;
- player-override timer;
- 2.0s AI resume;
- dead character cannot be reselected.

### M0 Character/Ability targeted gate
For the Character + Ability implementation slice, use **Level B targeted verification** by default.

Character tests already completed:
1. immutable definition is not mutated by battle-state updates;
2. state initializes from definition with full HP and valid runtime identifiers;
3. damage clamps at 0 and healing clamps at max HP;
4. healing a KO target is rejected;
5. KO prevents action and selection;
6. type and role remain independent;
7. invalid state inputs are rejected.

Required Ability tests:
1. active ability definition validation covers category, nonnegative cooldown/range, targeting identifier, and deterministic effect data;
2. valid request transitions `ready -> executing` and stores target id when required;
3. successful finish transitions `executing -> cooldown` and copies the definition cooldown;
4. cooldown tick clamps at `0` and then returns `cooldown -> ready`;
5. zero-cooldown Basic finishes directly to `ready`;
6. KO caster cannot begin an ability;
7. missing, KO, or out-of-range target cannot begin a targeted ability;
8. KO during execution cancels a caster-required pending execution, clears target state, applies no effect, and does not start cooldown;
9. duplicate start while `executing` or `cooldown` is rejected;
10. negative/nonfinite cooldown tick input is rejected;
11. AI and player-originated requests call the same execution API and produce the same state transition for equivalent inputs.

Required impacted regression:
- rerun `tests/character.test.js` because Ability integrates with Character `abilityState`;
- rerun existing targeting tests only if production targeting code is changed;
- rerun handoff/type/battle-resolution tests only if their production contracts are changed or imported into Ability implementation.

Do not run browser/mobile smoke for this slice unless rendering/runtime integration is introduced.
Do not run full regression unless targeted failure demonstrates wider coupling.

### Runtime smoke
Verify on mobile-landscape representative sizes:
- battle starts and finishes;
- all six actors can move/fight;
- no actor leaves arena bounds;
- left-side character selection works;
- camera soft-follow works;
- player override is immediate;
- AI resumes without changing selected character;
- no AUTO/MANUAL indicator appears;
- HUD remains readable;
- damage numbers do not obscure the entire fight;
- active-character KO switches smoothly to a living ally.

### Red-team cases
- selected character dies during skill windup;
- target dies before projectile/skill resolves;
- player inputs exactly near the 2.0s handoff boundary;
- rapid switching among three portraits;
- all enemies KO nearly simultaneously;
- timeout occurs during an ability;
- Support attempts heal on KO target;
- AI and player issue competing movement/ability intents.

## Prototype pass gate
All core deterministic tests pass and manual landscape smoke has no blocking defect.
