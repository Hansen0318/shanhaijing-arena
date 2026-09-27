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

Required new tests:
1. immutable definition is not mutated by battle-state updates;
2. state initializes from definition with full HP and valid runtime identifiers;
3. damage clamps at 0 and healing clamps at max HP;
4. healing a KO target is rejected;
5. KO combatant cannot begin an ability;
6. ability transitions ready -> executing -> cooldown -> ready;
7. cooldown tick clamps at 0;
8. invalid/dead target cannot start a targeted ability;
9. AI/player intents call the same ability execution surface;
10. Basic remains automatic/no-button data with category Basic and zero declared cooldown.

Required impacted regression:
- rerun existing deterministic tests for type multiplier, battle resolution, targeting/KO fallback, and player-override handoff **only if** the new model imports or changes those shared contracts.

Do not run browser/mobile smoke for this slice unless rendering/runtime integration is introduced.

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
