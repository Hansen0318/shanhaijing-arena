# Work Progress

## Current milestone
**M0 — Combat Prototype foundation**

## Current status
Repository initialized. No production gameplay implementation yet.

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

## Next action
Build a minimal combat prototype with placeholder actors before implementing meta/progression systems.

## Prototype exit criteria
See `docs/STATE.md` and `docs/TEST_STRATEGY.md`.
