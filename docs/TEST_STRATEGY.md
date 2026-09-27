# Test Strategy v1

## Prototype test priorities

### Deterministic rules
Automate where practical:
- type counter multiplier;
- cooldown transitions;
- HP/damage/heal;
- KO state;
- victory/defeat;
- 90s timeout tiebreak;
- invalid target handling;
- player-override timer;
- 2.0s AI resume;
- dead character cannot be reselected.

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
