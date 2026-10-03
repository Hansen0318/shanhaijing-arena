# M6C — Tier Combat Effects / Shared Status Primitives

## Status
**PASS / PLAYER VERIFIED**

M6B tactical AI is PLAYER VERIFIED. M6C makes the already-existing T0→T3 progression meaningful in combat without changing shard costs or progression accounting.

This is a coherent batch milestone governed by `docs/DEVELOPMENT_ACCELERATION.md`.

## 1. Goal

Connect read-only character Tier state to battle setup and apply data-driven Tier mechanics through reusable shared combat primitives.

Current Chapter1 characters are validation content only. The architecture must support future characters through definitions/data rather than character-ID branches.

## 2. Protected progression rules

Do not change:
- T0 base ownership state;
- T0→T1 cost 5;
- T1→T2 cost 10;
- T2→T3 cost 15;
- T3 MAX;
- lifetime earned / spent / available accounting;
- recruitment cost accounting;
- reward tables;
- upgrade receipts;
- save schema unless a read-only migration-neutral field is genuinely required.

Combat consumes an authoritative Tier snapshot; it must not mutate progression.

## 3. Combat Tier projection

Add one generic read-only path from progression/team selection into battle config:
- characterId
- current Tier
- immutable character definition
- resolved Tier effect definitions

Normal Campaign uses saved progression Tier.
Battle Lab may expose a dev-only Tier override for testing, persistence-free.

T0 means no advanced Tier modifier beyond the full base kit.

## 4. Shared modifier/status model

Implement reusable primitives that future characters can reference.

At minimum support:
- ability range modifier;
- approach/reposition reliability modifier;
- temporary outgoing/incoming damage multiplier;
- temporary mitigation;
- short movement-speed modifier;
- short avoidance/evasion window or equivalent generic incoming-hit eligibility modifier;
- stagger/control window;
- ally protection target/effect;
- conditional low-HP support modifier;
- isolated/weakened-target pressure modifier;
- persistent area/residual effect;
- short post-cast buff/status.

Do not create one-off functions named for 鹿蜀/猼訑/赤鱬/九尾狐/狌狌.

## 5. Status lifecycle

Statuses/effects must have generic records:
- source actor;
- target actor or area;
- effect type;
- magnitude/data;
- start time;
- expiry time;
- stack/replace policy;
- optional tags.

Use battle clock:
- Pause-safe;
- Restart/Retry/new session clear runtime status;
- KO handling explicit;
- no real-time timers outside battle clock.

## 6. Generic persistent area

Add a reusable bounded area-effect primitive for future skills/tier mechanics.

Requirements:
- fixed geometry captured at creation;
- duration;
- periodic or enter/exit/impact behavior from data;
- team/target eligibility;
- maximum active instances bounded;
- cleanup on shutdown/retry/restart;
- no per-frame expensive search if avoidable.

M6C may use it for 九尾狐 T3.

## 7. Generic control/stagger

Add reusable short control/stagger:
- prevents or delays appropriate movement/action according to data;
- cannot break ownership/save contracts;
- Pause-safe;
- deterministic;
- cleans on KO/session reset.

Use for 猼訑 T2 / 狌狌 T2 if appropriate.

## 8. Tier effect data

Tier effects belong in immutable data keyed by character definition / tier, consumed by generic systems.

No logic such as:
`if (characterId === 'P2') ...`

A future character should be able to reuse the same primitives by declaring different data.

## 9. Chapter1 Tier mappings

### 鹿蜀
T1 — 疾踏
- 逐風衝 gets modestly improved engage reach / approach reliability.

T2 — 回身
- 迴蹄 grants a short avoidance/mobility window after the reposition strike.

T3 — 逐影
- 南山奔襲 gains an enhanced final hit when angle/position-change condition was satisfied.

### 猼訑
T1 — 護群
- 守群 can protect the most threatened valid nearby ally in addition to self.

T2 — 震退
- 震嶺 gains a short shared stagger/space-making effect.

T3 — 鎮守
- 鎮岳 leaves a brief team-protection window after disruption.

### 赤鱬
T1 — 回流
- 回瀾 becomes more reliable/effective under configured low-HP conditions.

T2 — 游息
- maintaining rear/support range grants a modest healing-efficiency or self-sustain benefit.

T3 — 澤被
- 潤澤 grants a brief secondary team-support effect; prefer generic mitigation for first implementation unless an existing shared cleanse primitive already exists.

### 九尾狐
T1 — 狐火增幅
- 九焰散華 gains improved area coverage / secondary-hit reliability.

T2 — 惑心追獵
- pressure against isolated or low-HP valid targets is strengthened via generic conditional target modifier.

T3 — 青丘餘焰
- 青丘幻火 leaves a short-lived residual fox-fire area through the generic persistent-area primitive.

### 狌狌
T1 — 追勢
- 追獵 grants a short post-engage movement/pressure benefit.

T2 — 撼勢
- 撼地 gains a brief shared stagger effect.

T3 — 狂鬥不退
- 狂鬥 gains temporary mitigation / anti-interruption during the sequence using generic status data.

## 10. Numeric policy

Use conservative first-playtest values.

Rules:
- Tier effects should be noticeable but smaller than the identity of the base skill;
- avoid large flat ATK/HP inflation;
- avoid stacking multiplicative effects into runaway burst;
- prefer roughly 5–15% magnitude changes or short bounded windows where applicable;
- document exact seeds;
- do not alter T0 base stats/cooldowns unless an effect definition explicitly modifies runtime behavior at T1+.

## 11. AI awareness

AI may read generic effect opportunity where needed:
- protector may value threatened ally;
- healer may value low-HP threshold;
- ranged attacker may value isolated/weakened target;
- persistent area placement may use existing skill-opportunity scoring.

Do not add Tier-specific AI branches by character ID.

Player and AI must use the same ability/effect resolution.

## 12. Battle Lab acceleration

Extend M6A Lab with:
- Tier selector T0/T1/T2/T3 per ally/enemy slot or a simpler side-wide override if that keeps UI compact;
- TIER COMPARISON preset;
- STATUS / CONTROL TEST preset;
- PERSISTENT AREA TEST preset.

Dev overrides are session-only and persistence-free.

Allow quick A/B comparison:
- same teams/seed at T0;
- same teams/seed at selected Tier.

## 13. UI/readability

Normal Battle HUD does not need a large Tier redesign in this milestone.

At minimum:
- keep current portraits/names;
- optionally show a compact Tier label in dev Lab/debug presentation only;
- do not add stars/rarity/level systems.

Collection remains source of truth for owned Tier.

## 14. Determinism / performance

Status, stagger, persistent area and Tier modifiers must:
- use battle clock;
- be deterministic for same seed/state;
- have bounded active collections;
- avoid unbounded per-frame scans;
- preserve existing tactical interval/performance behavior.

## 15. Acceptance

Player should be able to use Battle Lab to compare T0 vs higher Tier and visibly notice mechanic differences without needing to replay Campaign.

Expected:
- 鹿蜀 becomes more reliable/mobile rather than simply hitting much harder;
- 猼訑 protects/control-space better;
- 赤鱬 sustains team more reliably;
- 九尾狐 applies stronger conditional/ranged pressure;
- 狌狌 commits to melee more effectively;
- no Tier feels like a separate character or an overwhelming stat jump.

## 16. Engineering acceptance

At minimum test:
1. Campaign battle receives authoritative Tier snapshot;
2. T0 produces base behavior;
3. T1/T2/T3 effect resolution is data-driven;
4. no character-ID branches in shared Tier/status engine;
5. range modifier generic;
6. temporary mitigation generic;
7. movement modifier generic;
8. avoidance window generic;
9. stagger/control generic;
10. ally protection generic;
11. low-HP conditional modifier generic;
12. isolated/weakened conditional modifier generic;
13. persistent area generic;
14. post-cast status generic;
15. status expiry Pause-safe;
16. Restart/Retry clears statuses;
17. KO cleanup correct;
18. persistent-area cleanup correct;
19. bounded area instance count;
20. AI/player shared effect resolution;
21. Battle Lab Tier overrides do not touch persistence;
22. TIER COMPARISON is repeatable with same seed;
23. normal Tier accounting unchanged;
24. upgrade costs unchanged;
25. reward/shards unchanged;
26. Type multiplier unchanged;
27. M6B tactical AI preserved;
28. lazy loading preserved;
29. no horizontal overflow in Lab;
30. full relevant tests/build PASS.

## 17. Internal checkpoints

### A — Tier projection + generic effect schema
- read-only Tier into battle;
- effect/status definitions;
- validation/tests;
- commit/push.

### B — shared runtime primitives
- mitigation/movement/avoidance/control/conditional modifiers;
- status lifecycle;
- commit/push.

### C — persistent area + ally protection
- bounded generic area effects;
- generic threatened-ally support targeting hook;
- commit/push.

### D — five character Tier data + Battle Lab presets
- map approved T1/T2/T3 identities;
- conservative numeric seeds;
- Tier A/B dev testing;
- commit/push.

### E — regression/release
- targeted/impacted/full;
- deterministic/performance sanity;
- independent review;
- build;
- Actions/Pages;
- public verify;
- docs update.

Continue automatically between checkpoints unless a true player decision is required.

## 18. Stop

Final status:
**M6C TIER COMBAT EFFECTS / SHARED STATUS PRIMITIVES — ENGINEERING PASS / PLAYER SMOKE PENDING**

STOP before:
- final art/animation/VFX production;
- audio;
- Chapter2 formal content;
- new economy/progression systems;
- level/star/rarity systems.


## Implementation contract seeds
A/B: cumulative Tiers; detached Campaign Tier snapshots; immutable per-actor resolved range/approach tables. Generic statuses cap64, stack cap3, lifetime max30s, refresh replaces same source/key/target. Mitigation/incoming choose strongest; outgoing and healing gains additive capped15%; movement gains capped15%. Avoidance may require dodgeable metadata; control blocks AI/player movement and new ability execution, not ownership; steadfast prevents newly applied control. KO removes statuses on source or target; terminal clears records. All use simulation seconds; no persistence or timers. B targeted152/152 PASS. C–E complete; see final evidence below.

C area contract: max12 active records, circle geometry copied/frozen at creation, duration≤10s, interval≥200ms; periodic one due pulse per step (missed intervals skipped), expiry exclusive. Each pulse living unique actors in identity order with ally/enemy/all eligibility. KO source removes zone; terminal/new session clear. Residual noncrit damage uses shared Type/DEF/mitigation resolver and cannot recursively trigger area hooks. Generic threatened-nearby ally scores authoritative retained enemy targets/incoming threat/proximity/HP%, tie by instance ID.

## Formal conservative seeds (first playtest, cumulative)
No flat HP/ATK growth. All positive damage/heal gains additive, capped15%; incoming reductions use strongest instead of multiplying.

| Character | T1 | T2 | T3 |
|---|---|---|---|
| 鹿蜀 | Heavy max/engage reach×1.10; engage displacement×1.10 | Successful Special: movement×1.10 for0.8s; dodgeable-hit avoidance0.25s | Awakening final hit×1.12 only after qualifying reposition against same target within4s; movement≥0.35 or angle≥0.2rad |
| 猼訑 | Special additionally protects most threatened living ally within2.4:15% mitigation4s; base self25%/4s unchanged | Heavy successful hit stagger0.35s | Successful Awakening protects living team within2.4:10% mitigation3s |
| 赤鱬 | Special heal×1.10 if recipientHP≤35% | Any heal×1.05 if nearest living enemy distance2–4.2; combine cap15% | Valid Awakening (including full-HP allies) team mitigation8%/2s within20 |
| 九尾狐 | Special max/area/warning radius×1.10 (radius1.6→1.76) | Any damage×1.08 if recipientHP≤35% OR no other living enemy within1.4 | Awakening hit leaves fixed circle radius0.9/duration3s; periodic0.5s, coefficient0.12, five pulses before exclusive expiry; noncrit, normal Type/DEF/mitigation |
| 狌狌 | Successful Special movement×1.12 for1.2s | Heavy successful hit stagger0.30s | Valid Awakening cast mitigation12% and steadfast0.6s; steadfast rejects new stagger |

Mobility/avoidance buffs require successful valid cast; no free air-cast buffs. Short stagger blocks new actions and ordinary AI/player movement; existing noninterruptible casts/multi-hit sequences continue. No cleanse or generic dodge button added.
Persistent zone source KO cancels its remaining pulses; target KO excluded; residual pulses cannot recursively spawn zones. Status labels MOB/EVA/STG/RES and guard◈ are generic placeholders; Lab-only compact Tier labels. Circle area placeholder reads same frozen geometry/clock as damage, no timer/tween.
Lab adds TIER COMPARISON / STATUS / CONTROL TEST / PERSISTENT AREA TEST. Ally/Enemy Tier overridesT0–T3, T0 ally baseline toggle; same roster/enemies/seed41. Normal Campaign reads authoritative current Tier with detached snapshot; no battle writeback. D targeted108/108/full501/501 PASS. E review/build/release complete.

## E verification and review fixes
Targeted119/119, impacted369/369, full512/512, build/diff PASS. Independent review0 Critical/1 Important schema gap/1 angle finding. All RED→GREEN resolved: finite bounded condition window, supported trigger/kind combinations, valid status recipients, actual wrapped bearing angle instead of0. Root integration tests also verify actual Arena shutdown clears retained old-session records, full-HP secondary support (no phantom heal), natural production area preset, and1e-9s logical-clock tolerance at exclusive expiry (five pulses, never six). Existing noninterruptible casts remain noninterruptible; no new stun/cancel mechanic introduced.
Entry76,859 bytes vs accepted M6B68,623 (pure Tier/schema/UI metadata); battle1,431,411 deferred. Static menu graph excludes BattleSession/tactics/Phaser/Arena. Build advisory on deferred Phaser size remains existing baseline. Actions/Pages/public verification complete; one physical focused smoke remains.

## Released engineering evidence
Release source be46c92e59139a92bcff89cecbd95accf553d4a6; Actions #391 / 37099650309 completed SUCCESS (build111136525373, deploy111136573373). Public entry index-CP8sRNpJ.js matches build; normal Landing has BATTLE/COLLECTION/INFO, no Lab/canvas/modulepreload. Dev menu has13 presets/Tier selectors; real Arena allyT3/enemyT1 and T0 baseline labels, residual-area ring, Pause/Restart/Exit→Lab verified; settings retained, canvas detached. Cloud1363×936 no horizontal overflow. Physical phone feel/readability remains player smoke.
Canonical detailed evidence: `docs/verification/M6C_TIER_COMBAT_EFFECTS.md`. No unresolved review findings. Only focused player Tier comparison remains; STOP.


## Player acceptance (2026-10-03)

Player completed the focused Tier comparison smoke and accepted the current T0–T3 mechanic differentiation as the working balance baseline. Exact effect magnitudes, durations, radii and conditional thresholds remain tunable in later balance passes; future tuning must preserve the generic data-driven effect/status architecture and must not alter canonical shard costs/accounting unless separately approved.
