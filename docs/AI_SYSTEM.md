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
