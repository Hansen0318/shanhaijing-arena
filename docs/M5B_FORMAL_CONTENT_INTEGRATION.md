# M5B — Formal Chapter 1 Data Integration

## Status
**ENGINEERING PASS / PLAYER SMOKE PENDING**

M5A content is PLAYER APPROVED. This milestone integrates the approved Chapter1 content into the existing data-driven systems and adds only the minimum reusable combat primitives required by the five approved T0 kits.

Do not combine this milestone with formal art/animation/VFX production.

## 1. Protected baseline

Preserve:
- M0/M1/M2 combat/input/HUD behavior;
- M3 universal firstClear/repeatable reward engine;
- Chapter1–6 reward schema;
- M4A Collection/navigation;
- M4B T0→T1→T2→T3 progression and shard accounting;
- M4C Landing;
- saved Campaign/team/acquisition data where IDs remain compatible;
- route visibility and reset behavior.

## 2. Formal roster mapping

Keep stable IDs P1–P5 for migration/save compatibility.

Map:
- P1 -> 鹿蜀
  - type: speed
  - role: attacker
  - T0 stats: HP245 / ATK18 / DEF5 / move2.05 / attackSpeed1.15
- P2 -> 猼訑
  - type: power
  - role: tank
  - T0 stats: HP320 / ATK14 / DEF9 / move1.45 / attackSpeed0.85
- P3 -> 赤鱬
  - type: blast
  - role: support
  - T0 stats: HP235 / ATK13 / DEF5 / move1.60 / attackSpeed0.95
- P4 -> 九尾狐
  - type: blast
  - role: attacker
  - T0 stats: HP230 / ATK19 / DEF4 / move1.70 / attackSpeed1.05
- P5 -> 狌狌
  - type: power
  - role: attacker
  - T0 stats: HP285 / ATK17 / DEF7 / move1.85 / attackSpeed1.00

Do not renumber IDs.

## 3. Formal ability definitions

Create stable ability definition IDs instead of reusing one global placeholder skill for all characters.

Each character gets:
- Basic
- Heavy
- Special
- Awakening
- Passive metadata

Use the exact approved names from M5A.

### 鹿蜀
- 踏角
- 逐風衝
- 迴蹄
- 南山奔襲
- 疾行

### 猼訑
- 角擊
- 震嶺
- 守群
- 鎮岳
- 厚甲

### 赤鱬
- 水矢
- 湧浪
- 回瀾
- 潤澤
- 游息

### 九尾狐
- 靈火
- 狐焰
- 九焰散華
- 青丘幻火
- 惑心

### 狌狌
- 裂爪
- 撼地
- 追獵
- 狂鬥
- 鬥性

## 4. Cooldown baseline

Use M5A playtest values:
- 鹿蜀: H3 / S6 / A12
- 猼訑: H4 / S8 / A14
- 赤鱬: H4 / S7 / A14
- 九尾狐: H3.5 / S7 / A13
- 狌狌: H3 / S6 / A12

Basic remains automatic / category cooldown0 and uses attackSpeed cadence.

## 5. Range / targeting identity

Do not force all abilities through identical placeholder range.

Character definitions should express distinct min/preferred/max or equivalent usable range metadata.

Targeting categories required for T0:
- living enemy single-target;
- living ally single-target;
- self/nearby ally defensive target;
- enemy area target;
- team/area ally heal.

## 6. Minimum reusable combat primitives

Implement only shared primitives required by approved T0 kits.

Required:
1. heal effect
   - deterministic;
   - living ally/self only;
   - clamps to maxHP;
   - KO remains non-healable under current v1 rule;
   - publishes presentation event for heal feedback.

2. ally-target selection
   - lowest-HP% valid ally for 赤鱬 回瀾;
   - deterministic tie-break;
   - same player/AI ability execution surface.

3. defensive mitigation
   - bounded temporary damage-reduction effect for 猼訑 守群;
   - generic status/effect representation, not character-specific branching;
   - expiry driven by battle/session clock and Pause-safe.

4. enemy AoE target resolution
   - generic radius/shape or bounded area selection for 九尾狐 九焰散華 / 猼訑 鎮岳;
   - deterministic target ordering;
   - shared resolver applies effect to each valid target once.

5. chase/reposition movement hook
   - enough to support 鹿蜀 / 狌狌 engage abilities without implementing full future AI tactical variation;
   - ability-owned short reposition/engage may be represented declaratively.

Not required yet unless necessary for T0:
- knockback physics;
- cleanse;
- persistent residual fire zone;
- complex stagger state;
- advanced T1/T2/T3 mechanics;
- full buff/debuff framework beyond minimum mitigation.

## 7. T0 ability behavior boundary

Implement T0 identity first.

### 鹿蜀
- damage + short engage/reposition;
- no advanced T1/T2/T3 mobility bonus yet.

### 猼訑
- direct hit;
- generic temporary mitigation/protection;
- area Awakening damage/disruption may use damage-only AoE at first if full control primitive is deferred.

### 赤鱬
- ranged damage;
- 回瀾 heals lowest-HP living ally/self according to threshold logic;
- 潤澤 heals all living allies by bounded amount.

### 九尾狐
- ranged single-target attacks;
- 九焰散華 damages valid enemies in area;
- 青丘幻火 high single-target or bounded area burst as approved T0 expression.

### 狌狌
- melee damage;
- chase/engage Special;
- sustained multi-hit Awakening.

## 8. Relative coefficient baseline

Use M5A values as initial playtest seeds:
- Basic around 1.0x ATK;
- 鹿蜀 Heavy1.40 / Special1.30 / Awakening total2.20;
- 猼訑 Heavy1.30 / defensive Special / Awakening total1.70 area;
- 赤鱬 Heavy1.25 / Special heal22–28% maxHP target / Awakening heal14–18% per living ally;
- 九尾狐 Heavy1.50 / Special1.35 per valid AoE target / Awakening2.50;
- 狌狌 Heavy1.45 / Special1.30 / Awakening total2.30.

Choose one concrete value inside any stated range and document it for the first smoke. Do not perform a broad balance pass.

## 9. Critical rules

Do not infer crit globally from Role/Type.

Use existing per-ability crit metadata.
For the first formal pass:
- preserve conservative prototype crit behavior where reasonable;
- support/heal-only abilities should not crit unless explicitly defined later;
- document any crit-enabled formal ability.

## 10. Campaign Chapter1 integration

Replace Chapter1 placeholder enemy identities with approved formal P1–P5 lineups:

- 1-1: 狌狌 / 鹿蜀 / 赤鱬
- 1-2: 鹿蜀 / 鹿蜀 / 猼訑
- 1-3: 九尾狐 / 猼訑 / 赤鱬
- 1-4: 狌狌 / 狌狌 / 鹿蜀
- 1-5: 九尾狐 / 狌狌 / 猼訑

Keep current spawn-slot semantics.

## 11. Chapter1 rewards

Formal Chapter1 reward table:
- 1-1 first 九尾狐×3 + 鹿蜀×2; replay 鹿蜀×1
- 1-2 first 九尾狐×2 + 猼訑×2; replay 猼訑×1
- 1-3 first 狌狌×2 + 赤鱬×2; replay 赤鱬×1
- 1-4 first 狌狌×2 + 鹿蜀×2; replay 狌狌×1
- 1-5 first 狌狌×3 + 猼訑×2; replay 狌狌×2

Preserve:
- P4/九尾狐 recruit after cumulative5;
- P5/狌狌 recruit by finale;
- repeatable farming;
- lifetime earned/spent accounting.

## 12. Collection integration

Replace P1–P5 placeholder labels with formal names.

Character Detail should display from data:
- formal name;
- Type;
- Role;
- T0/Tier state;
- shard fraction;
- short combat summary;
- approved lore copy;
- ability names/categories;
- concise T0 descriptions.

Do not hard-code Chinese copy in view templates.

## 13. Team Select / HUD identity

Team Select cards and battle portraits should resolve formal character names/portrait metadata from the same catalog.

No formal art required yet:
- existing placeholder portrait blocks may remain;
- labels must be real names;
- do not create fake final art.

## 14. Persistence / migration

Stable P1–P5 IDs mean existing saves should remain valid.

Verify:
- ownership survives;
- shards survive;
- Tier survives;
- saved team survives;
- claimed stages survive;
- completed reward/upgrade receipts survive.

Do not reset progression to integrate names/stats.

## 15. AI boundary

Do not implement the full future tactical-variation system in M5B.

However, T0 ability AI must understand:
- healer threshold use;
- ally-targeted ability use;
- ranged preferred distance;
- valid AoE opportunity when needed.

Keep it declarative/profile-driven and deterministic.

Full lateral variation / kite / retreat/re-engage polish remains a later bounded AI milestone after formal content is playable.

## 16. Presentation events

Add generic presentation events as needed:
- heal number;
- mitigation/shield status indicator placeholder;
- multi-hit damage events continue using existing damage event path.

Do not start final VFX.

## 17. Engineering acceptance

At minimum:

Roster/data:
1. P1–P5 stable IDs map to correct formal names.
2. Type/Role matches approved content.
3. T0 stats match content sheet.
4. character-specific cooldowns/ranges are immutable data.
5. saved ownership/team/Tier/shards migrate unchanged.

Combat primitives:
6. heal clamps maxHP and rejects KO target.
7. lowest-HP ally selection deterministic.
8. team heal affects each living ally once.
9. mitigation reduces only valid incoming damage and expires correctly.
10. AoE resolves each valid target once.
11. Pause freezes timed mitigation/status expiry.
12. Restart/Retry clears battle-only effects.
13. player and AI use the same ability execution path.

Character smoke:
14. 鹿蜀 can engage/reposition and damage.
15. 猼訑 can protect and use area Awakening.
16. 赤鱬 can damage + heal ally/self + team heal.
17. 九尾狐 ranged/AoE kit works.
18. 狌狌 chase/multi-hit kit works.
19. manual Heavy/Special/Awakening remain usable through existing controls.
20. Basic remains automatic.

Campaign:
21. 1-1..1-5 use approved lineups.
22. Chapter1 rewards exactly match approved table.
23. 九尾狐 unlock progression remains correct.
24. 狌狌 unlock progression remains correct.
25. replays grant only repeatable sets.

UI:
26. Collection uses real names/details.
27. Team Select uses real names.
28. battle ally/enemy identity labels use formal character names where applicable.
29. no horizontal overflow/regression on supported landscape sizes.

Regression:
30. M4B Tier flow unchanged.
31. M4C Landing unchanged.
32. Chapter2–6 universal reward schema still valid.
33. route visibility unchanged.
34. impacted regression + combat regression + build/deploy pass.

## 18. Checkpoint discipline

Recommended:
- Checkpoint A: formal catalog/ability data + migration tests.
- Checkpoint B: generic heal/ally/AoE/mitigation primitives.
- Checkpoint C: five T0 kits integrated.
- Checkpoint D: Chapter1 lineups/rewards + Collection/Team identity.
- Final: impacted regression/build/review/Actions/Pages.

Push safe checkpoints before long verification.

## 19. Player smoke

After deploy, ask player to test only:
- Collection names/details;
- Team Select formal identities;
- one battle containing 赤鱬 healing;
- one 九尾狐 AoE/ranged battle;
- one 猼訑 protection interaction;
- Chapter1 first/replay reward visibility;
- existing Tier/shards survive reload.

Do not require replaying every old M0/M1/M2 smoke manually.

## 20. Stop

Final status:
**M5B FORMAL CONTENT DATA INTEGRATION — ENGINEERING PASS / PLAYER SMOKE PENDING**

STOP before:
- final character art;
- idle animation;
- formal VFX;
- audio;
- advanced Tier mechanics;
- full AI tactical variation;
- Chapter2 formal content.

## Locked first-playtest implementation seeds
- Stable ability IDs: P1.basic/heavy/special/awakening/passive through P5.*; character/save IDs unchanged.
- 回瀾 25% maxHP, 潤澤 16% per living ally. AI thresholds: single ≤65%, team at least two living allies ≤80%.
- 守群 T0 self-only mitigation25% for4s; nearby ally extension remains T1 spec. Recast refreshes one status, does not stack.
- 鎮岳 caster-centered radius2.2; 九焰散華 target-centered radius1.6, AI prefers ≥2 targets (manual supports one).
- Range tuples (min/preferred/max) in shared arena units are explicitly frozen in src/roster/abilities.js. Ally healing reach20 covers the complete arena.
- Engage distance1.6/1.8, stop.65; 迴蹄 diagonal offset.65; bounds clamp. Ability-owned movement only.
- 南山奔襲3 hits / 狂鬥4 hits at.12s intervals; total coefficient2.20/2.30. DEF/type/crit resolve per hit as existing damage rules; total damage is not a single-hit post-DEF equivalent.
- Basic crit10%×1.5; Heavy20%×1.75; damaging Special15%×1.75; Awakening/heal/mitigation no crit. No Type/Role/Tier inference.
- Passives have named metadata and honest descriptions. M5A did not specify numerical conditional T0 passive modifiers: no additional invented passive/status engine or advanced Tier effect. Base stats/ranges/mobility express current passive identity; conditional bonuses remain spec.

## Release record
Final sourcea692e2357639c99a36aab196026ec9d358c02575, original feature branch/PR#1. Actions352/37015761111 Test397/397, Build and Pages success. Public/local/CI assets match; names/details/Chapter1/reward preview/startup HUD observed. Independent review clean. Exact evidence, cloud observation limits, balance observations and player checklist: `docs/verification/M5B_FORMAL_CONTENT_INTEGRATION.md`. STOP pending player smoke.
