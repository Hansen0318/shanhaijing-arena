# M0 Headless Combat Simulation Contract

## Purpose
Prove that the Arena-native Character, Targeting, ControlHandoff, Ability, AI, type, damage, KO, and battle-resolution contracts can resolve a deterministic 3v3 battle without rendering or player input.

This is a prototype integration harness, not final balance.

## Deterministic direct-damage resolver
For the M0 headless damage fixture:

`damage = max(1, attacker.ATK * abilityCoefficient * typeMultiplier - defender.DEF)`

Where:
- `abilityCoefficient` comes from `ability.effect.coefficient`;
- `typeMultiplier` is the existing Power/Speed/Blast helper;
- the result is applied through the existing Character damage API;
- no random crit, dodge, armor penetration, status effect, projectile travel, or variance exists in this slice.

This formula is explicitly **prototype-only and tunable**. It exists to make the headless integration deterministic; it is not a final balance decision.

## Basic cadence
Basic definition cooldown remains `0`.
The headless simulation owns a separate per-combatant Basic cadence timer:
- interval = `1 / attackSpeed` seconds;
- successful Basic resolution resets that timer to the interval;
- cadence ticks toward zero and never becomes negative;
- this timer is simulation scheduling state, not user-facing Ability cooldown.

## Headless step
Default deterministic simulation step: **0.25 seconds**, matching the existing AI tactical interval target.

Each step:
1. tick non-Basic Ability cooldowns;
2. tick Basic cadence timers;
3. resolve battle terminal state;
4. ask living actors for AI intents from the same start-of-step state;
5. apply move intents directly toward target by at most `moveSpeed * dt`;
6. execute eligible ability intents through shared `startAbility()`;
7. for this headless fixture, resolve direct damage immediately and call shared `finishAbility()`;
8. re-evaluate victory/defeat/timeout.

The simulation is renderer-free and does not implement animation windup, projectiles, collision/avoidance, camera, HUD, VFX, or touch controls.

## Deterministic actor order
Use stable actor order: allies in input order, then enemies in input order.
This is an explicit M0 harness rule for reproducibility, not a claim of final simultaneous-combat semantics.

## 3v3 acceptance criteria
1. exactly three allies and three enemies can be simulated from start to a terminal result;
2. no player input is required;
3. actors acquire/retain/fallback targets via existing Targeting;
4. out-of-range actors move toward targets;
5. Basic cadence respects Attack Speed without changing Basic definition cooldown;
6. prioritized abilities use the shared Ability lifecycle and cooldowns;
7. resolved direct damage uses the existing type multiplier and Character HP/KO state;
8. KO actors stop acting;
9. battle ends through the existing victory/defeat/90s timeout resolver;
10. same input fixture produces the same result and final HP state across repeated runs.
