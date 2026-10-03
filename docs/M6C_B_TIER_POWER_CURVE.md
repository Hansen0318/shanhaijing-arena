# M6C-B — Tier Power Curve Rebalance

## Status
**ENGINEERING PASS / PLAYER SMOKE PENDING**

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

| Tier | Max HP | Damage / Healing Power | Move Speed | Attack Speed | Cooldown Duration | Cast/Telegraph Windup | Attack Range | AoE Radius | Dash / Move Skill Distance | Buff / Debuff Duration | Shield / Mitigation Strength |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| T0 | ×1.00 | ×1.00 | ×1.00 | ×1.00 | ×1.00 | ×1.00 | ×1.00 | ×1.00 | ×1.00 | ×1.00 | ×1.00 |
| T1 | ×1.50 | ×1.45 | ×1.08 | ×1.10 | ×0.92 | ×0.95 | ×1.05 | ×1.04 | ×1.06 | ×1.08 | ×1.10 |
| T2 | ×2.25 | ×2.05 | ×1.16 | ×1.22 | ×0.84 | ×0.90 | ×1.10 | ×1.08 | ×1.12 | ×1.15 | ×1.20 |
| T3 | ×3.75 | ×3.20 | ×1.28 | ×1.40 | ×0.72 | ×0.82 | ×1.18 | ×1.15 | ×1.20 | ×1.25 | ×1.35 |

These multipliers are cumulative from T0, not multiplicative from the previous Tier.

Examples:
- T3 HP = T0 HP ×3.75, not ×24.
- T3 damage/heal = T0 ×3.20.
- T3 movement and attack speed remain bounded to preserve control readability.

## 3. Scope of scaling

Global Tier scaling may apply generically to:
- max HP;
- direct damage coefficients after base/T0 calculation;
- healing output;
- move speed;
- attack speed;
- ability cooldown duration;
- cast/telegraph windup timing where the ability exposes a scalable windup field;
- attack / ability range;
- AoE radius / lane width / cone radius where declared scalable;
- dash / engage / reposition distance;
- buff / debuff duration;
- shield / protection / mitigation strength.

These parameters form a reusable **TierScalingProfile**. The global table defines the canonical maximum/default curve, while a character/ability may opt specific fields in or weight them through data. The engine must remain generic and future-character-safe.

Do not scale globally:
- arena dimensions;
- core collision hitbox size;
- Type multiplier;
- crit chance unless separately defined;
- crit multiplier unless separately defined;
- AI decision frequency;
- joystick sensitivity;
- dodge reaction logic itself;
- reward/shard economy.

Attack range / AoE / movement-skill distance are presentation-and-gameplay geometry, so their resolved geometry and telegraph geometry must remain synchronized.

## 3A. TierScalingProfile

Every character resolves Tier growth through data, not character-ID logic.

Recommended profile fields:
- hpScaleWeight
- damageScaleWeight
- healingScaleWeight
- moveSpeedScaleWeight
- attackSpeedScaleWeight
- cooldownScaleWeight
- windupScaleWeight
- attackRangeScaleWeight
- aoeScaleWeight
- mobilityDistanceScaleWeight
- buffDurationScaleWeight
- defenseEffectScaleWeight
- controlDurationScaleWeight
- supportRangeScaleWeight
- persistentMagnitudeScaleWeight

Weight semantics:
- 0 = this character/ability does not use that global Tier growth axis;
- 1 = use the full canonical Tier multiplier;
- values between 0 and 1 = interpolate between ×1.00 and the canonical Tier multiplier;
- values above 1 are not allowed in the first M6C-B pass unless separately approved.

This lets Tier reinforce role identity:
- 鹿蜀: higher mobility/attack-speed/range/avoidance weighting;
- 猼訑: higher HP/protection/control/support-range weighting;
- 赤鱬: higher healing/support-range/buff-duration weighting;
- 九尾狐: higher damage/range/AoE/persistent-effect weighting;
- 狌狌: higher HP/damage/attack-speed/chase/control weighting.

Current five characters are only validation profiles. Future characters use the same fields.

## 3B. Parameters that must stay bounded

Some parameters can grow, but not at the same magnitude as HP/damage:
- control/stagger duration;
- avoidance/evasion window;
- AI reaction timing;
- support radius;
- telegraph shortening;
- movement speed.

These must use conservative caps so Tier does not produce permanent control, unreadable attacks, or uncontrollable movement.

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

## 9. Attack range / AoE / mobility geometry

Global canonical curve:
- Attack Range: T0 1.00 / T1 1.05 / T2 1.10 / T3 1.18
- AoE Radius: T0 1.00 / T1 1.04 / T2 1.08 / T3 1.15
- Dash / Move Skill Distance: T0 1.00 / T1 1.06 / T2 1.12 / T3 1.20

Requirements:
- AI uses resolved attack/preferred range, not T0 range;
- kite / engage / reposition logic uses the same resolved geometry;
- telegraph visual geometry must match actual damage/control geometry;
- lane/cone/radius expansion must respect arena bounds;
- melee identity must remain melee and ranged identity must remain readable.

## 10. Buff / debuff / protection duration and strength

Global canonical curve:
- Buff / Debuff Duration: T0 1.00 / T1 1.08 / T2 1.15 / T3 1.25
- Shield / Mitigation Strength: T0 1.00 / T1 1.10 / T2 1.20 / T3 1.35

Apply only when an effect definition opts into scaling.

Do not scale an effect past its safety cap. Examples:
- mitigation cannot exceed engine cap;
- control cannot become effectively permanent;
- avoidance windows remain short;
- stagger durations use their own conservative cap.

## 11. Cast / telegraph timing

Tier may shorten scalable windup modestly, but:
- telegraph and actual impact timing must remain synchronized;
- do not shorten below the minimum reaction/readability window for dodgeable attacks;
- minimum dodgeable warning should remain at least the existing AI/player reaction floor.

If a skill's windup is marked non-scalable, leave it unchanged.

## 12. Persistent / periodic effects

For periodic/persistent damage/healing:
- scale magnitude via Damage/Healing Power multiplier;
- do not automatically multiply tick count;
- do not automatically shrink interval;
- do not extend duration unless a character-specific Tier mechanic says so.

This prevents multiplicative explosion.

## 13. Defensive scaling

This milestone does not globally multiply DEF.

Reason:
- HP already scales strongly;
- multiplying HP + DEF together would create excessive time-to-kill inflation.

Existing defensive character identity and M6C mitigation mechanics remain.

A future separate balance pass may revisit DEF if data shows a need.

## 14. Future-character rule

Global Tier curve is engine/data-level and applies to every future character automatically.

A future character only defines:
- T0 base stats;
- abilities;
- character-specific Tier mechanics where applicable.

Do not add per-character base-stat multipliers unless explicitly approved for a special archetype.

No character-ID branches.

## 15. Battle Lab

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

## 16. Acceptance

Player should clearly feel:
- T1 stronger than T0;
- T2 clearly stronger than T1;
- T3 substantially stronger than T2;
- T3 is powerful but battle still remains readable/playable;
- movement does not become uncontrollable;
- attack cadence does not become visual noise;
- telegraphs remain reactable;
- character-specific Tier mechanics are still noticeable.

## 17. Engineering acceptance

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
15. attack range scaling exact and generic.
16. AoE scaling exact and generic.
17. mobility-distance scaling exact and generic.
18. buff/debuff duration scaling exact and bounded.
19. shield/mitigation strength scaling exact and capped.
20. resolved range feeds AI spacing/kite/engage.
21. telegraph geometry matches resolved attack geometry.
22. TierScalingProfile weights interpolate generically.
23. Lab HP percentage preserved against scaled maxHP.
24. same seed/Tier comparison deterministic.
25. no character-ID branches.
26. existing M6C mechanic effects still active.
27. Campaign uses saved Tier.
28. Lab Tier override remains persistence-free.
29. reward/shard/Tier costs unchanged.
30. M6B dodge/telegraph authority preserved.
31. M5C-A asset pipeline unchanged.
32. full relevant tests/build pass.

## 18. Internal checkpoints

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

## 19. Stop

Final status:
**M6C-B TIER POWER CURVE REBALANCE — ENGINEERING PASS / PLAYER SMOKE PENDING**

STOP before:
- M5C-B final art integration;
- audio;
- Chapter2 formal content;
- new economy/progression;
- Level/Star/Rarity.

## M6C-B exact implementation seeds

All scale factors use `1 + (canonical - 1) × weight` once from immutable T0. Unspecified/future profile weights default1. Control duration uses the buff-duration canonical curve; support range uses attack-range curve; persistent magnitude uses damage curve. Current role weights:

| Weight | Mobile skirmisher | Front guard | Rear healer | Ranged burst | Aggressive bruiser |
|---|---:|---:|---:|---:|---:|
| hpScaleWeight | 1 | 1 | 1 | 1 | 1 |
| damageScaleWeight | 1 | 0.85 | 0.65 | 1 | 1 |
| healingScaleWeight | 0.35 | 0.3 | 1 | 0.3 | 0.3 |
| moveSpeedScaleWeight | 1 | 0.35 | 0.75 | 0.65 | 0.85 |
| attackSpeedScaleWeight | 1 | 0.55 | 0.6 | 0.8 | 1 |
| cooldownScaleWeight | 1 | 0.7 | 1 | 1 | 0.85 |
| windupScaleWeight | 1 | 0.5 | 0.7 | 1 | 0.6 |
| attackRangeScaleWeight | 1 | 0.65 | 0.8 | 1 | 1 |
| aoeScaleWeight | 1 | 0.65 | 0.6 | 1 | 0.6 |
| mobilityDistanceScaleWeight | 1 | 0.4 | 0.7 | 0.55 | 1 |
| buffDurationScaleWeight | 1 | 1 | 1 | 0.65 | 0.8 |
| defenseEffectScaleWeight | 0.5 | 1 | 1 | 0.5 | 0.8 |
| controlDurationScaleWeight | 1 | 1 | 0.5 | 0.4 | 1 |
| supportRangeScaleWeight | 0.5 | 1 | 1 | 0.5 | 0.5 |
| persistentMagnitudeScaleWeight | 0.5 | 0.5 | 0.75 | 1 | 0.75 |

Bounds: H/S/A cooldown≥0.75s, Basic interval≥0.25s (one Basic per step); opt-in windup≥300ms and dodgeable total window≥350ms. Projectile travel and AI reaction frequency untouched. Global DEF/ATK base data unchanged; outgoing power applies through resolver before Type/DEF and crit. Existing mechanics/status outgoing bonus stays bounded1.15. Incoming mitigation retains strongest policy.

Opt-in status duration: general≤30s, control≤0.5s, avoidance≤0.4s, steadfast≤1s; mitigation strength≤0.5. AoE/persistent radius≤6 arena units; support/protection range≤20; ability displacement≤4 and existing arena clamping. No joystick-sensitivity change. Formal heavy warnings may hit their documented floor; actual impact uses the same threat clock.

Formal abilities declare `tierScaling` booleans for AoE/lane width, movement, base mitigation, windup. Attack-range growth defaults on, can opt out. Status definitions opt into duration/strength; M6C controls/avoidance/support use the same generic schema. Persistent area opts into radius only; coefficient0.12, interval0.5s, duration3s and exclusive expiry five pulses remain unchanged. Residual power applies once through persistentMagnitude at pulse resolution.

Healing seed: target T0/base maxHP × original heal fraction × caster healing scale × existing conditional mechanic. Target scaled maxHP is only the clamp; target HP scale must not multiply healing output a second time. Full-health support still applies its legal secondary status without fake healing. Same-ID actor tiers are independent. Lab HP25/50/100% applies to scaled maxHP through preserved ratio at battle setup. No mid-battle Tier mutations.

Lab RESOLVED STATS is a collapsed developer-only six-actor summary; pure projection, no Phaser import/preload. Team/Tier/baseline changes refresh summary. Selected character cooldown HUD uses resolved actor duration; formal HUD has no new stat panels.

Targeted47/47 and full564/564 PASS at D. Independent review/release follows.

## Final engineering verification
Targeted28/28, impacted221/221, full570/570 and build/diff PASS. Review: zero Critical, two Important and one Minor; the geometry opt-out Minor was regraded Important because it violates weight0/opt-out gameplay contracts. All three reproduced RED→GREEN and fixed; no unresolved findings.

Geometry caps bound added Tier growth: `max(base, min(cap, base × gain))`. A legal existing T0 geometry above the growth cap is never shrunk on Tier upgrade; explicit opt-outs and weight0 remain exact identity. AI preferred bands respect Basic range opt-out. Delayed Basic starts its scaled cadence on valid cast and permits at most one pending Basic per actor; no burst queue or cooldown mutation by AI.

Twelve paired deterministic fixtures (three scenarios × four ally tiers, enemyT1) terminate3.80–28.65s, max13 statuses/1 area/6 threats. No hardware FPS claim: bounded250ms tactics and existing bounded collections remain authoritative. Entry87,939 bytes vs accepted M5C-A81,218 (+6,721); CSS19,407 vs19,133 (+274); deferred battle1,444,469 vs1,443,740 (+729). Asset guard37 files/17,703 bytes unchanged; no dependencies. Detailed release evidence: `verification/M6C_B_TIER_POWER_CURVE.md`.

Release verified: source 0b34bfdd41edc88b7528a64d0db63b6f2fbbcd28, Actions #409 /37113178973 Test/Build/Pages SUCCESS; public entry index-BID405J0.js matches. Lab Tier summary/T0 baseline/real Arena/Pause/Restart/Exit and normal no-Lab/deferred entry verified. Full evidence `verification/M6C_B_TIER_POWER_CURVE.md`. Remaining: one focused same-team/seed T0–T3 player comparison; STOP.
