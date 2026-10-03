# M6B — Combat Tactical AI / Telegraph / Dodge Batch

## Status
**IMPLEMENTED / RELEASE VERIFICATION IN PROGRESS**

M6A Developer Battle Lab is PLAYER VERIFIED and is the primary player-smoke harness for this milestone.

This is a coherent combat-behavior milestone. Follow `docs/DEVELOPMENT_ACCELERATION.md`: internal checkpoints, targeted tests, safe commits, automatic continuation when no player decision is required, and one focused player smoke at the end.

## 1. Goal

Make formal Chapter1 combat less like six deterministic straight-line bots colliding at center while preserving:
- one shared combat engine;
- player override semantics;
- deterministic/seeded reproducibility;
- existing ability/cooldown/damage rules;
- existing Campaign/progression/reward/Tier contracts.

The milestone combines:
- attack telegraph metadata/presentation;
- dodgeable threat detection;
- safe-position scoring;
- limited AI evasion;
- ranged spacing/kite;
- healer retreat/recover/re-engage;
- bruiser/tank tactical differences;
- formal AI profiles for 鹿蜀 / 猼訑 / 赤鱬 / 九尾狐 / 狌狌.

## 2. Protected baselines

Do not change:
- type multipliers: Power > Speed > Blast > Power, +15%/-15%;
- player joystick ownership/0s AI resume after release;
- manual H/S/A behavior;
- Basic automatic behavior;
- formal T0 stats/cooldowns/ability coefficients except where a telegraph timing field is added without changing damage;
- reward/shard/Tier/accounting/persistence;
- M6A save isolation;
- lazy battle loading;
- INFO / Landing / Collection navigation.

## 3. Shared tactical state model

Extend the shared tactical layer with bounded states:
- engage;
- pressure/chase;
- reposition;
- kite;
- retreat;
- recover/support;
- regroup;
- evade.

AI decides intent only. It must not directly apply damage, cooldown, heal, status, or rendering effects.

All ability casts still go through the existing shared ability execution API.

## 4. Formal AI profile data

Character behavior must be driven by immutable profile data, not character IDs.

Recommended profile fields:
- aggression
- preferredRangeMin
- preferredRangeMax
- lateralVariation
- kiteTendency
- retreatHpThreshold
- reengageHpThreshold
- dangerRadius
- allyHealHpThreshold
- evadeTendency
- evadeReactionMs
- target weights
- protectAllyWeight
- weakenedTargetWeight
- typeAdvantageWeight
- skillOpportunityWeight

Exact numeric seeds may be chosen conservatively for first playtest and documented.

## 5. Character tactical intent

### 鹿蜀 — mobile skirmisher
- high lateral variation;
- high evade tendency;
- aggressive angle-changing engage;
- does not stand still at tank range;
- may briefly disengage/reposition before re-entering.

### 猼訑 — front guard
- low/medium evade tendency;
- stays closer to frontline/allies;
- prioritizes threats near vulnerable allies;
- may intentionally absorb pressure rather than always dodge;
- uses protection ability when ally threat/HP conditions justify it.

### 赤鱬 — rear healer
- maintains rear support range;
- retreats when self HP low or enemy threat enters danger radius;
- heals through shared ability pipeline;
- recovers, then re-engages once above reengage threshold;
- medium/high evade tendency for telegraphed threats;
- should not run permanently away from battle.

### 九尾狐 — ranged burst
- seeks mid-long preferred range;
- kites when melee pressure gets too close;
- repositions for AoE/burst opportunity;
- medium/high evade tendency;
- avoids unnecessary melee collapse.

### 狌狌 — aggressive bruiser
- high chase/aggression;
- lower evade tendency than 鹿蜀;
- uses short lateral adjustment when useful but generally commits to pressure;
- should not kite like a ranged unit.

## 6. Telegraph metadata

Add declarative ability metadata for attacks where reaction is meaningful.

Candidate fields:
- `telegraphMs`
- `dodgeable`
- `dangerShape`
- `dangerRadius`
- `projectileTravelMs` or equivalent impact delay
- `commitment` / `interruptible`

Not every ability needs telegraph.

Normally:
- Basic: no dodge reaction requirement;
- instant melee hits: usually non-dodgeable;
- selected Heavy/Special/Awakening with visible windup/projectile/AoE: dodgeable.

Do not change ability damage merely to support telegraphing.

## 7. Threat model

Create a shared threat record for dodgeable incoming attacks.

Threat should identify:
- source;
- intended target or danger area;
- impact time;
- danger geometry;
- severity/category;
- whether the actor is still eligible to evade.

Threat lifetime must be battle-clock based and Pause-safe.

Restart/Retry/new session clears all threat state.

## 8. Safe-position scoring

For an actor reacting to a threat, evaluate a small deterministic set of candidate positions:
- left sidestep;
- right sidestep;
- backward step;
- diagonal left-back;
- diagonal right-back.

Score candidates for:
- outside danger geometry at impact;
- arena bounds;
- enemy proximity;
- preferred-range compatibility;
- ally spacing/collision pressure;
- direction continuity.

Do not sample random positions every frame.

Hold chosen tactical destination for a bounded interval to avoid jitter.

## 9. Dodge policy

AI must not perfectly dodge.

A dodge is considered only if:
- threat is marked dodgeable;
- actor can move;
- sufficient telegraph/reaction time remains;
- profile evade tendency permits a response;
- a materially safer candidate exists;
- current action commitment does not prohibit it.

Use deterministic/seeded decision logic.

Profile difference matters more than Type. Type must not hard-code dodge chance.

Player manual movement remains the current natural dodge method. Do not add a dodge button.

## 10. Telegraph presentation

Add lightweight placeholder-readable telegraphs only, not final VFX.

Examples:
- ground ring/shape;
- short directional line/cone;
- projectile warning lane;
- brief windup pulse.

Requirements:
- readable on iPhone landscape;
- timing corresponds to actual impact;
- Pause freezes telegraph;
- Restart/Retry cleans it up;
- no final art/audio.

## 11. Ranged spacing / kite

For profiles with ranged preference:
- advance when outside max range;
- hold/use ability inside preferred band;
- backstep/kite when enemy enters danger/min band;
- optional lateral reposition while maintaining preferred range.

Do not oscillate every decision tick.
Use hysteresis/settle tolerances.

## 12. Healer retreat / recover / re-engage

赤鱬-style support profile:
1. detects self low HP or nearby enemy threat;
2. selects safer rear/ally-relative position;
3. uses heal when valid through normal ability API;
4. remains in recover/support state until reengage condition is met;
5. returns to normal support spacing.

Prevent permanent retreat loops:
- use reengage threshold higher than retreat threshold;
- ensure arena-bound safe-space fallback;
- allow support actions while retreating when legal.

## 13. Target scoring

Keep nearest enemy as fallback.

Profile-driven score may include:
- distance;
- target HP%;
- threat;
- Type advantage;
- target attacking vulnerable ally;
- skill opportunity;
- weakened/isolated target;
- protect-alive-support priority.

Deterministic tie-breaking required.

Do not let scoring invalidate ability target rules.

## 14. M6A Lab extensions

Use Battle Lab for focused verification.

Add data-driven presets only as needed:
- DODGE TEST
- TELEGRAPH TEST
- HEALER RETREAT
- RANGED KITE

These remain dev-only and persistence-free.

Do not modify formal progression or Campaign rewards to create test conditions.

## 15. Performance

Tactical evaluation should not run every render frame.

Use bounded decision/threat intervals where practical.

Avoid:
- per-frame global pathfinding;
- expensive random sampling;
- unbounded candidate search.

Arena remains small; use simple geometry and deterministic candidate scoring.

## 16. Determinism

Same initial state + same seed should reproduce:
- tactical side/offset choice;
- target tie-breaks;
- dodge decision where seeded variability is used;
- state transitions within timing tolerance.

Do not randomize:
- damage;
- cooldown completion;
- target validity;
- KO rules;
- player ownership arbitration.

Existing deterministic regression fixture may retain simpler behavior if explicitly scoped as legacy fixture.

## 17. Acceptance behavior

The final player smoke should visibly demonstrate:
- 鹿蜀 changes angle/repositions and can evade some telegraphed attacks;
- 猼訑 holds front-space and does not dodge like a speed skirmisher;
- 赤鱬 can retreat under threat, heal/recover, then return;
- 九尾狐 tries to preserve ranged distance and kite pressure;
- 狌狌 commits/chases more aggressively;
- AI sometimes dodges selected telegraphed attacks, but also sometimes takes hits;
- player can manually move out of the same readable telegraph;
- battle no longer always collapses into the same center-field pile immediately.

## 18. Engineering acceptance

At minimum test:
1. profile schema validation;
2. no character-ID tactical branch in shared AI;
3. deterministic tactical state selection;
4. target scoring deterministic tie-break;
5. lateral destination held for bounded window;
6. kite enters/exits with hysteresis;
7. healer retreat threshold;
8. healer reengage threshold;
9. no permanent retreat loop in deterministic fixture;
10. telegraph metadata validation;
11. threat creation/expiry;
12. Pause freezes threat/telegraph timing;
13. Restart/Retry clears threat state;
14. safe candidate respects arena bounds;
15. dodge ignores non-dodgeable attacks;
16. dodge requires reaction window;
17. actor can intentionally fail/ignore dodge by profile/commitment;
18. evade movement still uses normal movement layer;
19. player override immediately suppresses AI;
20. release returns AI at current accepted 0s rule;
21. ability execution remains shared;
22. ranged spacing avoids collapse;
23. tank/bruiser do not inherit ranged kite behavior;
24. support can heal while using tactical states;
25. M6A Lab scenarios remain persistence-free;
26. normal Campaign progression unchanged;
27. type multiplier unchanged;
28. formal cooldown/damage contracts unchanged;
29. lazy loading remains;
30. full relevant tests/build pass.

## 19. Internal checkpoints

### A — profile + telegraph contracts
- profile schema;
- telegraph metadata;
- threat model;
- RED/GREEN tests;
- commit/push.

### B — tactical movement engine
- safe-position scoring;
- lateral destination;
- kite/retreat/evade states;
- determinism;
- commit/push.

### C — formal character profiles
- map five Chapter1 characters;
- target scoring;
- healer/ranged/tank/bruiser/skirmisher behavior;
- commit/push.

### D — presentation + Battle Lab scenarios
- placeholder telegraphs;
- dodge/retreat/kite dev presets;
- targeted runtime smoke;
- commit/push.

### E — release
- impacted/full regression;
- performance sanity;
- independent review;
- build;
- Actions/Pages;
- public source verify;
- docs update.

Continue automatically between checkpoints unless a true player decision is required.

## 20. Stop

Final status:
**M6B COMBAT TACTICAL AI / TELEGRAPH / DODGE BATCH — ENGINEERING PASS / PLAYER SMOKE PENDING**

STOP before:
- final character art;
- formal animation/VFX production;
- audio;
- advanced Tier combat mechanics;
- Chapter2 formal content;
- new progression systems.


## Implementation seeds and boundaries (M6B)
Tactical interval250ms, held destination700ms, 5 safe candidates, max step1.2 units, profile range enter+0.25/kite enter-0.15/exit+0.35. Retreat threshold .32/reengage .62, max recovery2800ms then regroup/cooloff2000ms; repeated bounded retreats allowed when danger persists. Profile numerical data lives src/roster/aiProfiles.js; no character-ID branches in shared engine. Dedicated tactical seeded stream preserves crit RNG independence.

Selected formal telegraphs only: 猼訑 Heavy650ms/radius.7, Awakening900ms/radius2.2; 赤鱬 Heavy350+350ms/lane.45; 九尾狐 Heavy450+200ms/lane.45, Special900ms/radius1.6, Awakening650+250ms/radius.7. Commitment locked; Basic/heals/mitigation/instant engage/multi-hit remain immediate. Damage/cooldowns/crit/range untouched. Fixed geometry is captured when a valid cast begins, cooldown starts at the same cast time; eligible effect is resolved at impact through shared damage resolver. Caster KO cancels delayed effects; air casts consume cooldown normally but produce no damaging threat. Movement out of geometry can avoid AI/player attacks alike.

Stage/Lab factory defaults tacticalEnabled true; low-level BattleSession defaults false for protected legacy fixtures. Existing M5B formalKits tests explicitly opt out only to pin original immediate damage/multi-hit contracts. New tacticalSession tests exercise production factories with actual delayed impacts/manual/AI equality. No save/progression/controller logic touched. C targeted73/73/full463/463 PASS. D renderer/Lab scenarios and E release pending.

D targeted39/39/build/diff PASS. Placeholder warnings use projected locked circle/lane geometry, battle-clock fill/progress, no independent tween/timer; shutdown destroys one graphics layer. Lab adds DODGE TEST/TELEGRAPH TEST/HEALER RETREAT/RANGED KITE with formal data only. Actual Arena Pause/retry lifecycle test covers clock freeze and clean threat/jobs/presenter. E release pending.

## Release review resolutions
Independent review found0 Critical and4 Important. Four RED→GREEN regressions resolve capsule endpoint rendering, .08-unit safe-position clearance beyond .05 movement stop, urgent eligible threat checks before retaining ordinary destinations, and shared target/area dodge eligibility. Existing evade destination remains held when still reachable/safe. New production tests cover support heal during retreat, ranged-only kite and natural termination of four Lab presets. Original graybox winner fixture explicitly opts out of tactical mode; new behavior can change matchup outcomes without changing stats/damage/accounting.

Pure runtime/demoDefinitions.js separates existing prototype metadata from simulation imports; old demoBattle exports remain compatible and data values identical. Normal Landing/preview static graph excludes BattleSession/tactics/Arena/Phaser. Entry68,623 bytes vs accepted M6A79,192; battle1,422,246 bytes deferred. E targeted50/50, impacted308/308, full475/475/build/diff PASS; deployment pending.
