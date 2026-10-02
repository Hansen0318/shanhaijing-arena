# AI System v1

## Principle
Every living character has autonomous combat AI. Player input is an override layer, not a separate combat ruleset.

AI decides **intent only**. It must not implement a second combat engine or mutate Ability execution state directly. AI and player-originated ability intents both enter the same shared Ability execution API.

## M0 deterministic decision boundary
The M0 Basic AI decision function is framework-independent and runs separately from rendering.

Inputs:
- actor Character state;
- enemy Character states;
- current resolved target, when any;
- active Ability definitions indexed by definition id;
- current time for ControlHandoff arbitration.

Output is one deterministic intent:
- `idle`;
- `move` toward the chosen target;
- `ability` with category / definition id / resolved target id.

The decision function itself does not move actors, apply damage, tick cooldowns, or call rendering code.

## Controller arbitration
Before tactical AI:
1. KO actor -> `idle:ko`;
2. if the actor's existing ControlHandoff reports player control at `nowMs` -> `idle:player_override`;
3. otherwise full AI may decide normally.

The selected character/camera contract remains outside this module.

## Targeting
Prototype uses the existing soft-targeting helper.

Baseline:
1. retain a living current target;
2. otherwise choose nearest living enemy;
3. if none exists -> `idle:no_target`.

AI must not duplicate target-selection geometry.

## Ability decision
Ability definitions may provide numeric `ai.priority`.

M0 policy:
1. consider ready/valid non-Basic abilities with finite `ai.priority > 0`;
2. choose highest priority;
3. deterministic tie order: Awakening > Special > Heavy;
4. if no prioritized non-Basic can start, try Basic;
5. if no ability can start because the chosen target is out of usable range, return `move` toward that target.

Basic remains automatic: AI may emit a Basic ability intent, but execution still goes through the same shared Ability API.

Role-specific Tank/Attacker/Support behavior remains a later tuning layer. M0 must not create separate role engines.

## Suggested future loop
Idle -> Acquire Target -> Move/Position -> Basic Attack -> Ability Decision -> Reposition -> repeat.

## Role tendencies
- Tank: engage threats, protect allies, prioritize control/taunt/mitigation.
- Attacker: maximize safe damage, chase appropriate targets, use burst windows.
- Support: maintain useful distance, heal/buff/debuff/control based on conditions.

These are tendencies, not separate character engines.

## Performance
AI tactical decisions should run on a configurable interval (initial target: roughly 0.2-0.4s), separate from rendering. Exact scheduler integration is not part of the bounded M0 decision-function slice.

## M0 acceptance criteria
Deterministic tests must establish:
1. KO actor never emits move/ability;
2. player override suppresses tactical AI immediately;
3. after the existing 2.0s handoff boundary, AI resumes without a separate mode switch;
4. valid current target is retained;
5. dead current target falls back to nearest living enemy;
6. no target returns idle;
7. highest valid positive-priority non-Basic ability wins;
8. deterministic category tie order is stable;
9. invalid/cooling/out-of-range prioritized ability is skipped;
10. Basic is fallback when valid;
11. movement intent is emitted when no ability can currently reach the chosen target;
12. equivalent AI ability intent is executable through the existing shared `startAbility()` API.

## M2 accepted-baseline polish
BattleSession owns per-actor tactical preparation state. A tunable 1.5s window considers positive-priority enemy-targeted skills with declared preferredRange; newly beginning preparation never preempts ready prioritized abilities. Skill/target commitment and 0.25 enter / 0.06 settle tolerances stabilize repositioning. Settled actors may still Basic in range without pursuing inward. Prepared ready/valid skill feeds the existing startAbility pipeline. KO/manual override/invalid target clear preparation; current accepted manual-release handoff is 0s (historical 2s text above is superseded). No character/role IDs determine range.


## Future tactical variation / anti-scripted behavior

Player feedback: the deterministic M0/M2 prototype often produces nearly identical center-field collisions and similar timeout timing. This is acceptable as a regression-friendly engineering baseline, but formal characters should not all behave like the same straight-line bot.

Future AI should remain one shared engine with **data-driven tactical profiles**, not one bespoke AI implementation per character.

### Tactical state layer

A living AI actor may evaluate a small set of states:
- engage;
- reposition;
- pressure/chase;
- kite;
- retreat;
- recover/support;
- regroup.

State changes are conditional and should be reevaluated on the existing tactical interval rather than every render frame.

Examples:
- melee attacker: close aggressively, but may approach with lateral/diagonal offset rather than the exact center line;
- ranged attacker: seek preferred range, kite when threatened, sidestep while preparing a skill;
- tank: bias toward threats near vulnerable allies and hold front-space;
- support/healer: maintain rear distance; if HP or threat crosses a threshold, retreat toward safer space, heal/recover, then re-engage;
- burst caster: reposition toward a geometry that can satisfy its high-value skill before casting.

### Movement variation

Do not make movement random every frame.

When an actor selects a movement objective, derive a short-lived tactical destination:
- target-relative forward/back distance;
- lateral offset;
- diagonal approach angle;
- safe-space or ally-relative offset for retreat/support.

Hold that destination for a bounded decision window, then reevaluate. This avoids jitter while preventing all six actors from converging on the same center line.

### Controlled variability

Use **seeded tactical variation** for reproducibility:
- different battle seed/session may choose different legal approach offsets or equivalent target scores;
- the same seed + same state remains reproducible for tests;
- randomness only selects among tactically valid alternatives and never bypasses cooldown/range/targeting rules.

Suitable low-amplitude variation:
- lateral approach side;
- preferred offset within a character's allowed positioning band;
- tie-breaking between similarly scored targets;
- short regroup/reposition timing.

Do not randomize:
- whether an invalid skill can cast;
- damage formula;
- cooldown completion;
- ownership/control arbitration;
- KO rules.

### Target scoring

Nearest enemy remains the M0 fallback, but future profiles may score valid targets using:
- distance;
- target HP%;
- threat;
- Type advantage;
- whether target is attacking a vulnerable ally;
- skill-specific opportunity;
- healer/support priority rules.

This should remain declarative/profile-driven and resolve to the same shared targeting/ability execution contracts.

### Retreat / heal example

A support/healer profile may declare:
- selfRetreatHpThreshold;
- allyHealHpThreshold;
- preferredSupportRange;
- dangerRadius;
- reengageHpThreshold.

Possible behavior:
1. HP falls below retreat threshold or nearby threat is too high;
2. choose a safer point away from enemies / nearer allied rear space;
3. if healing ability is valid, cast through the normal Ability API;
4. once recovered above re-engage threshold, return to support/engage state.

Retreat is therefore tactical repositioning, not leaving the arena.

### Character data ownership

Formal Character/AI profile may eventually define:
- aggression;
- preferredRange band;
- lateralVariation;
- kite tendency;
- retreat threshold;
- re-engage threshold;
- target-scoring weights;
- ally-protection/heal thresholds;
- skill preparation bias.

The shared AI engine interprets these values. Character definitions do not contain executable AI code.

### Engineering constraint

Keep the current deterministic straight-forward behavior as a protected test fixture where useful. Add tactical variation as a later bounded AI-polish milestone with seeded tests so richer behavior does not destroy reproducibility.
