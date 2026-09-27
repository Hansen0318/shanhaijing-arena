# AI System v1

## Principle
Every living character has autonomous combat AI. Player input is an override layer, not a separate combat ruleset.

## Suggested states
Idle -> Acquire Target -> Move/Position -> Basic Attack -> Ability Decision -> Reposition -> repeat.

## Role tendencies
- Tank: engage threats, protect allies, prioritize control/taunt/mitigation.
- Attacker: maximize safe damage, chase appropriate targets, use burst windows.
- Support: maintain useful distance, heal/buff/debuff/control based on conditions.

These are tendencies, not separate character engines.

## Targeting
Prototype uses soft auto-targeting.
Baseline priority:
1. valid existing target, if still sensible;
2. nearby valid enemy;
3. role/ability-specific preference.

Player manual movement/ability input can change positioning immediately. Explicit target lock is out of prototype scope unless playtesting proves soft targeting insufficient.

## Performance
AI tactical decisions should run on a configurable interval (initial target: roughly 0.2-0.4s), separate from rendering.
