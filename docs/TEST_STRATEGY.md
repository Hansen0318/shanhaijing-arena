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
- AI target retention/fallback;
- player-override suppression and 2.0s AI resume;
- AI ability priority/fallback;
- victory/defeat;
- 90s timeout tiebreak;
- dead character cannot be reselected.

### Completed Character / Ability evidence
Character and Ability slices use Level B targeted verification.
- Character + direct handoff evidence: 9 / 9 PASS.
- Ability isolated evidence: 10 / 10 PASS.
- Ability + Character impacted evidence: 16 / 16 PASS.

### M0 Basic AI targeted gate
Use **Level B targeted verification**.

Required AI tests:
1. KO actor -> idle;
2. player override -> idle immediately;
3. exact 2.0s handoff boundary resumes AI;
4. living current target is retained;
5. KO current target falls back to nearest living enemy;
6. no living enemy -> idle;
7. highest valid positive-priority non-Basic ability is selected;
8. equal priority uses Awakening > Special > Heavy tie order;
9. cooling/invalid/out-of-range prioritized ability is skipped;
10. Basic is selected as fallback when valid;
11. move intent is returned when chosen target is outside all usable ability ranges;
12. emitted AI ability intent can be executed through shared `startAbility()`.

Required impacted regression:
- rerun targeting tests because AI imports the existing targeting helper;
- rerun control-handoff tests because AI imports controller arbitration;
- rerun Ability tests because AI validates against Ability contracts;
- do not rerun battle-resolution/type tests unless their production contracts are changed.

Do not run browser/mobile smoke for this slice.
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
