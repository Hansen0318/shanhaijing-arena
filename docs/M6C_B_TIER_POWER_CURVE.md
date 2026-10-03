# M6C-B — Tier Power Curve Rebalance

## Status
**IMPLEMENTATION READY**

Player feedback after M6C smoke: current Tier mechanic differences are structurally correct but overall power growth is not visually/strategically noticeable enough. Tier should feel materially stronger, while avoiding runaway values that would invalidate AI, telegraph timing, player control, or encounter readability.

This milestone adjusts the generic Tier power curve. It does not redesign progression accounting or replace the M6C shared effect/status architecture.

## 1. Goal

Make T1/T2/T3 clearly stronger than T0 through:
- meaningful HP growth;
- meaningful outgoing damage/healing growth;
- bounded improvements to combat tempo stats;
- existing T1/T2/T3 mechanic effects retained on top.

Do not use the player's originally proposed compounding ×2→×3→×4 across every stat, because that would create T3 values up to 24× T0 and break timing/readability.

## 2. Canonical global Tier multipliers

First playtest baseline:

| Tier | Max HP | Damage / Healing Power | Move Speed | Attack Speed | Cooldown Duration | Cast/Telegraph Windup |
|---|---:|---:|---:|---:|---:|---:|
| T0 | ×1.00 | ×1.00 | ×1.00 | ×1.00 | ×1.00 | ×1.00 |
| T1 | ×1.50 | ×1.45 | ×1.08 | ×1.10 | ×0.92 | ×0.95 |
| T2 | ×2.25 | ×2.05 | ×1.16 | ×1.22 | ×0.84 | ×0.90 |
| T3 | ×3.75 | ×3.20 | ×1.28 | ×1.40 | ×0.72 | ×0.82 |

These multipliers are cumulative from T0, not multiplicative from the previous Tier.

Examples:
- T3 HP = T0 HP ×3.75, not ×24.
- T3 damage/heal = T0 ×3.20.
- T3 movement and attack speed remain bounded to preserve control readability.

## 3. Scope of scaling

Global Tier scaling applies generically to:
- max HP;
- direct damage coefficients after base/T0 calculation;
- healing output;
- move speed;
- attack speed;
- ability cooldown duration;
- cast/telegraph windup timing where the ability exposes a scalable windup field.

Do not scale:
- arena dimensions;
- hitbox size;
- type multiplier;
- crit chance unless separately defined;
- crit multiplier unless separately defined;
- AI decision frequency;
- joystick sensitivity;
- dodge reaction logic;
- reward/shard economy.

## 4. Existing character-specific Tier mechanics

All M6C T1/T2/T3 character mechanics remain.

Examples:
- 鹿蜀 mobility/avoidance/final-hit condition;
- 猼訑 protection/stagger/team mitigation;
- 赤鱬 low-HP heal/support mitigation;
- 九尾狐 coverage/conditional pressure/residual area;
- 狌狌 movement/stagger/commitment mitigation.

Global power scaling is additive to identity mechanics, not a replacement.

## 5. Order of operations

Use one documented generic order:
1. T0 base character stat/ability definition;
2. apply global Tier stat multiplier;
3. apply character-specific Tier mechanic modifier/status/condition;
4. apply Type relation;
5. apply crit where valid;
6. apply mitigation/status/target conditions.

Avoid double-scaling the same value through multiple layers.

## 6. HP initialization / current HP

When battle is created:
- maxHP is resolved from T0 base × Tier multiplier;
- initial HP % is preserved when a Lab HP override exists;
- normal Campaign full-health start uses scaled maxHP;
- no progression save mutation.

If a future mid-battle Tier change exists, it requires a separate rule. M6C-B does not add dynamic mid-battle Tier changes.

## 7. Attack speed semantics

Use one generic attack-speed multiplier on the existing attack cadence contract.

Protect:
- minimum practical Basic interval;
- animation readability;
- no multi-Basic burst in a single simulation step;
- no frame-dependent execution.

If needed, clamp final Basic cadence to a documented engine-safe lower bound.

## 8. Cooldown semantics

Tier cooldown multiplier applies to formal Heavy/Special/Awakening cooldown duration.

Protect:
- cooldown cannot become negative/zero;
- current ability categories remain unchanged;
- all-skills-ready Lab option still overrides initial readiness only.

Recommended engine minimum cooldown: 0.75s unless an existing stricter contract already exists.

## 9. Cast / telegraph timing

Tier may shorten scalable windup modestly, but:
- telegraph and actual impact timing must remain synchronized;
- do not shorten below the minimum reaction/readability window for dodgeable attacks;
- minimum dodgeable warning should remain at least the existing AI/player reaction floor.

If a skill's windup is marked non-scalable, leave it unchanged.

## 10. Persistent / periodic effects

For periodic/persistent damage/healing:
- scale magnitude via Damage/Healing Power multiplier;
- do not automatically multiply tick count;
- do not automatically shrink interval;
- do not extend duration unless a character-specific Tier mechanic says so.

This prevents multiplicative explosion.

## 11. Defensive scaling

This milestone does not globally multiply DEF.

Reason:
- HP already scales strongly;
- multiplying HP + DEF together would create excessive time-to-kill inflation.

Existing defensive character identity and M6C mitigation mechanics remain.

A future separate balance pass may revisit DEF if data shows a need.

## 12. Future-character rule

Global Tier curve is engine/data-level and applies to every future character automatically.

A future character only defines:
- T0 base stats;
- abilities;
- character-specific Tier mechanics where applicable.

Do not add per-character base-stat multipliers unless explicitly approved for a special archetype.

No character-ID branches.

## 13. Battle Lab

Extend Tier comparison so player can quickly compare same:
- roster;
- enemy roster;
- seed;
- scenario;
- HP percentage;
- T0 / T1 / T2 / T3.

Display compact resolved stats in Lab only if practical:
- HP multiplier/resolved maxHP;
- damage/heal power multiplier;
- move/attack speed;
- cooldown multiplier.

Do not clutter normal player battle HUD.

## 14. Acceptance

Player should clearly feel:
- T1 stronger than T0;
- T2 clearly stronger than T1;
- T3 substantially stronger than T2;
- T3 is powerful but battle still remains readable/playable;
- movement does not become uncontrollable;
- attack cadence does not become visual noise;
- telegraphs remain reactable;
- character-specific Tier mechanics are still noticeable.

## 15. Engineering acceptance

At minimum test:
1. T0 stats exactly preserve accepted base values.
2. T1 HP ×1.50.
3. T2 HP ×2.25.
4. T3 HP ×3.75.
5. damage/heal power exact per Tier table.
6. move speed exact per Tier table.
7. attack speed exact per Tier table.
8. cooldown duration exact per Tier table.
9. scalable windup exact per Tier table.
10. non-scalable windup unchanged.
11. no Type multiplier change.
12. no crit formula change.
13. no DEF global scaling.
14. persistent effects scale magnitude only.
15. Lab HP percentage preserved against scaled maxHP.
16. same seed/Tier comparison deterministic.
17. no character-ID branches.
18. existing M6C mechanic effects still active.
19. Campaign uses saved Tier.
20. Lab Tier override remains persistence-free.
21. reward/shard/Tier costs unchanged.
22. M6B dodge/telegraph geometry unchanged.
23. M5C-A asset pipeline unchanged.
24. full relevant tests/build pass.

## 16. Internal checkpoints

### A — global Tier curve contract
- generic multipliers;
- projection/resolution order;
- tests;
- commit/push.

### B — HP/damage/heal + tempo integration
- move/attack speed;
- cooldown;
- scalable windup;
- safety clamps;
- commit/push.

### C — persistent/periodic + M6C mechanic compatibility
- no double scaling;
- deterministic fixtures;
- commit/push.

### D — Battle Lab comparison UX
- compact resolved stat comparison if practical;
- exact same-seed A/B;
- commit/push.

### E — regression/release
- impacted/full;
- performance/readability sanity;
- independent review;
- build;
- Actions/Pages;
- docs update.

Continue automatically between checkpoints unless a true player decision is required.

## 17. Stop

Final status:
**M6C-B TIER POWER CURVE REBALANCE — ENGINEERING PASS / PLAYER SMOKE PENDING**

STOP before:
- M5C-B final art integration;
- audio;
- Chapter2 formal content;
- new economy/progression;
- Level/Star/Rarity.
