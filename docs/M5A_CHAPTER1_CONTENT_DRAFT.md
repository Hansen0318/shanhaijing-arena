# M5A — Chapter 1 Formal Content Draft

## Status
**CHARACTER DIRECTION APPROVED / SKILL + REWARD DETAIL DRAFT**

This is a chat-first content sheet. It does not authorize runtime replacement, balance tuning, formal art production, or AI implementation.

## Approved roster direction

Player approved continuing with this five-character Chapter1 direction:
- initial owned: 鹿蜀 / 猼訑 / 赤鱬
- Chapter1 unlocks: 九尾狐 / 狌狌

This approval covers character identity, broad Type/Role direction and Chapter1 use. Exact numeric combat balance remains later.

## Chapter 1 theme

Working title: **南山初境**

Design intent:
- first formal chapter should introduce the game's three Types and three Roles clearly;
- use recognizable but not endgame-scale Shanhaijing creatures;
- introduce one tank/frontliner, one mobile attacker, one support/healer in the initial roster;
- unlock two additional characters through Chapter1 shard rewards;
- keep the current 3v3 combat engine and M3/M4 progression contracts unchanged.

## Initial owned roster

### P1 — 鹿蜀
- Type: Speed
- Role: Attacker
- Combat identity: mobile melee skirmisher
- Basic: short-range horn/hoof strike
- Heavy: forward rush / stronger single-target hit
- Special: side-step charge that prefers a diagonal approach lane
- Awakening: multi-hit rushing sequence
- Passive concept: gains a small mobility/pressure benefit after changing target or repositioning
- AI tendency: high aggression, medium lateral variation, low retreat tendency
- Lore copy direction: a beast of the southern mountains, presented as agile and difficult to pin down

### P2 — 猼訑
- Type: Power
- Role: Tank
- Combat identity: durable frontliner / protector
- Basic: close-range body/horn strike
- Heavy: heavy shove
- Special: temporary guard/mitigation or ally-protection effect
- Awakening: area disruption around the front line
- Passive concept: becomes harder to displace / gains protection while near allies
- AI tendency: engage front space, protect lower-HP ally, low kite tendency
- Lore copy direction: sheep-like mythic beast adapted as a steadfast guardian

### P3 — 赤鱬
- Type: Blast
- Role: Support
- Combat identity: ranged support / healer
- Basic: short-ranged water projectile
- Heavy: stronger water burst
- Special: heal lowest-HP ally or self if critical
- Awakening: team sustain / area restorative effect
- Passive concept: small sustain bonus while maintaining rear range
- AI tendency: rear positioning, medium retreat threshold, heal priority, re-engage after recovery
- Lore copy direction: aquatic-humanlike creature adapted as a restorative support

## Chapter 1 unlock characters

### P4 — 九尾狐
- Type: Blast
- Role: Attacker
- Combat identity: ranged burst / pressure
- Basic: ranged spirit projectile
- Heavy: stronger focused shot
- Special: area fox-fire / multi-target pressure
- Awakening: large burst with strong visual identity
- Passive concept: damage/pressure improves when attacking isolated or weakened targets
- AI tendency: preferred mid-long range, medium kite tendency, target low-HP enemies more strongly
- Lore copy direction: iconic nine-tailed fox of Qingqiu, adapted as a high-threat ranged attacker

### P5 — 狌狌
- Type: Power
- Role: Attacker
- Combat identity: bruiser / chase specialist
- Basic: close-range claw/fist hit
- Heavy: heavy leap or slam
- Special: chase/engage tool
- Awakening: high-impact brawl sequence
- Passive concept: gains pressure after sustained engagement
- AI tendency: aggressive chase, low retreat, target switching only when tactically valuable
- Lore copy direction: humanlike beast associated with the southern mountains, adapted as a relentless bruiser

## Type/Role coverage

Initial three:
- 鹿蜀 — Speed / Attacker
- 猼訑 — Power / Tank
- 赤鱬 — Blast / Support

Unlocks:
- 九尾狐 — Blast / Attacker
- 狌狌 — Power / Attacker

This ensures the initial roster teaches all three Types and all three core Roles without requiring the player to unlock a missing role.

## Chapter 1 stage draft

### 1-1 — 山麓試煉
Purpose:
- basic tutorial-quality combat pressure
- teach mixed frontline/backline

Enemy lineup draft:
- 狌狌
- 鹿蜀
- 赤鱬

Reward draft:
- firstClear: 九尾狐 shards + one initial-roster character shard
- repeatable: one initial-roster character shard

### 1-2 — 溪谷伏擊
Purpose:
- teach mobile pressure and target switching

Enemy lineup draft:
- 鹿蜀
- 鹿蜀
- 猼訑

Reward draft:
- firstClear: 九尾狐 shards + one initial-roster shard
- repeatable: one initial-roster shard

### 1-3 — 青丘之影
Purpose:
- introduce ranged burst threat before the player owns it

Enemy lineup draft:
- 九尾狐
- 猼訑
- 赤鱬

Reward draft:
- firstClear: 九尾狐 shards + support/tank shard
- repeatable: support/tank shard

### 1-4 — 群獸爭道
Purpose:
- higher chase pressure and bruiser introduction

Enemy lineup draft:
- 狌狌
- 狌狌
- 鹿蜀

Reward draft:
- firstClear: 狌狌 shards + initial-roster shard
- repeatable: 狌狌 or initial-roster shard

### 1-5 — 南山鎮關
Purpose:
- Chapter finale
- strongest mixed 3v3 composition in Chapter1

Enemy lineup draft:
- 九尾狐
- 狌狌
- 猼訑

Reward draft:
- firstClear: higher-value 狌狌 shards + second character shard
- repeatable: 狌狌 shards

Final exact quantities remain balance/content data and should be set only after the player approves identities and progression pace.

## Reward design rule

Keep the already-implemented stage contract:
- multiple firstClear shard items allowed;
- repeatable subset allowed;
- fixed deterministic quantities;
- every Chapter1 stage remains farmable;
- owned-character shards remain useful for T0→T1→T2→T3 progression.

Formal numbers should be chosen so:
- P4 can be recruited during the middle of Chapter1;
- P5 is a later/finale recruit;
- repeat farming remains useful without making T3 trivial.

## Character Detail content fields

For each formal character, add data-driven fields:
- display name;
- short combat-role summary;
- concise Shanhaijing introduction;
- Basic/Heavy/Special/Awakening/Passive names and short descriptions;
- Type / Role;
- AI profile metadata later.

Do not hard-code prose into Collection view logic.

## AI profile boundary

M5A defines intent only. Runtime AI polish is later.

Proposed profile tags:
- 鹿蜀: mobile_skirmisher
- 猼訑: front_guard
- 赤鱬: rear_healer
- 九尾狐: ranged_burst
- 狌狌: aggressive_bruiser

These should eventually map into the shared AI system, not bespoke per-character AI code.

## Art / animation asset slots

Per playable character eventually requires:
- square portrait;
- battle sprite / idle pose;
- idle micro-animation;
- hit reaction;
- KO pose/state;
- Basic effect;
- Heavy effect;
- Special effect;
- Awakening effect;
- Collection detail art;
- optional type/role icon treatment.

Chapter1 eventually requires:
- Chapter thumbnail;
- 1-1..1-5 preview art;
- battlefield background/environment;
- finale visual treatment.

## Player decisions still required

Before M5B runtime integration:
1. approve or replace the five proposed characters;
2. approve Chapter1 working theme/title;
3. approve Type/Role assignments;
4. approve broad skill identities;
5. approve which character should be mid-chapter unlock vs finale unlock;
6. then set exact shard quantities and prototype combat values.

No Work implementation should begin before these content decisions are approved.


## Formal skill identity draft

These names/effects define character identity and UI copy direction. They are not final balance values.

### 鹿蜀 — Speed / Attacker

Combat summary: fast melee skirmisher that changes angle often and pressures exposed targets.

- Basic — **踏角**
  - short melee horn/hoof strike;
  - reliable filler attack.
- Heavy — **逐風衝**
  - short forward rush into a stronger single-target hit;
  - intended as a gap-close/pressure tool.
- Special — **迴蹄**
  - quick lateral/diagonal reposition followed by a strike;
  - future AI should prefer an angled entry rather than always moving straight in.
- Awakening — **南山奔襲**
  - rapid multi-hit rushing sequence through the target area;
  - high mobility visual identity.
- Passive — **疾行**
  - rewards changing position/target rather than standing still continuously.

Range identity:
- Basic: close
- Heavy: close-mid engage
- Special: close-mid angled engage
- Awakening: close-mid multi-hit path

AI profile tag: `mobile_skirmisher`

### 猼訑 — Power / Tank

Combat summary: durable front guard that absorbs pressure and protects nearby allies.

- Basic — **角擊**
  - close melee body/horn strike.
- Heavy — **震嶺**
  - heavy shove/impact with stronger stagger/control identity.
- Special — **守群**
  - temporary self/nearby ally protection or mitigation.
- Awakening — **鎮岳**
  - area disruption around the frontline; intended to create space.
- Passive — **厚甲**
  - defensive benefit while contesting frontline space or staying near allies.

Range identity:
- Basic: close
- Heavy: close
- Special: self/near ally
- Awakening: close-area

AI profile tag: `front_guard`

### 赤鱬 — Blast / Support

Combat summary: rear-line ranged support with healing and self-preservation behavior.

- Basic — **水矢**
  - ranged water projectile.
- Heavy — **湧浪**
  - stronger water burst at range.
- Special — **回瀾**
  - heals the lowest-HP valid ally; may prioritize self when critically low.
- Awakening — **潤澤**
  - larger team-sustain/restorative effect.
- Passive — **游息**
  - rewards maintaining safer rear/support distance.

Range identity:
- Basic: mid
- Heavy: mid
- Special: ally-targeted support
- Awakening: team/area support

Future AI intent:
- maintain rear range;
- heal by threshold;
- retreat/reposition when threatened;
- re-engage after recovery.

AI profile tag: `rear_healer`

### 九尾狐 — Blast / Attacker

Combat summary: mid-long ranged burst attacker focused on weakened or isolated enemies.

- Basic — **靈火**
  - ranged spirit-fire projectile.
- Heavy — **狐焰**
  - focused stronger ranged shot.
- Special — **九焰散華**
  - area fox-fire pressure affecting multiple enemies in a target zone.
- Awakening — **青丘幻火**
  - high-impact ranged burst with signature visual treatment.
- Passive — **惑心**
  - increases pressure/value when focusing isolated or weakened targets.

Range identity:
- Basic: mid-long
- Heavy: mid-long
- Special: mid-long area
- Awakening: long burst

AI profile tag: `ranged_burst`

### 狌狌 — Power / Attacker

Combat summary: aggressive bruiser that sticks to targets and becomes dangerous in sustained melee.

- Basic — **裂爪**
  - close-range claw/fist strike.
- Heavy — **撼地**
  - heavy slam with strong impact.
- Special — **追獵**
  - short chase/leap engage tool.
- Awakening — **狂鬥**
  - high-impact sustained brawl sequence.
- Passive — **鬥性**
  - gains combat pressure after continuous engagement.

Range identity:
- Basic: close
- Heavy: close
- Special: close-mid chase
- Awakening: close sustained

AI profile tag: `aggressive_bruiser`

## Chapter 1 formal reward draft

This draft intentionally keeps the already-proven progression rhythm:
- 九尾狐 reaches 5 acquisition shards after 1-2 and becomes owned at T0;
- 狌狌 reaches at least 5 acquisition shards by the Chapter1 finale;
- initial-owned characters also receive shards so their T0→T1 progression is introduced naturally;
- every stage remains farmable.

| Stage | First clear | Repeatable |
|---|---|---|
| 1-1 山麓試煉 | 九尾狐 ×3 + 鹿蜀 ×2 | 鹿蜀 ×1 |
| 1-2 溪谷伏擊 | 九尾狐 ×2 + 猼訑 ×2 | 猼訑 ×1 |
| 1-3 青丘之影 | 狌狌 ×2 + 赤鱬 ×2 | 赤鱬 ×1 |
| 1-4 群獸爭道 | 狌狌 ×2 + 鹿蜀 ×2 | 狌狌 ×1 |
| 1-5 南山鎮關 | 狌狌 ×3 + 猼訑 ×2 | 狌狌 ×2 |

Progression outcome:
- 九尾狐: 3 + 2 = 5 by first-clearing 1-2 -> owned T0;
- 狌狌: 2 + 2 + 3 = 7 by first-clearing 1-5 -> owned T0 with 2 excess earned beyond acquisition threshold before accounting;
- 鹿蜀 / 猼訑 / 赤鱬 gain upgrade shards through normal Chapter play.

Exact future balance can change through stage data without changing reward engine semantics.

## Stage encounter identity draft

### 1-1 — 山麓試煉
Enemy lineup:
- 狌狌 — frontline pressure
- 鹿蜀 — mobile melee
- 赤鱬 — rear support

Teaching goal:
- first example of frontline + mobile attacker + support.

### 1-2 — 溪谷伏擊
Enemy lineup:
- 鹿蜀
- 鹿蜀
- 猼訑

Teaching goal:
- faster pressure;
- shows why target selection and positioning matter.

### 1-3 — 青丘之影
Enemy lineup:
- 九尾狐
- 猼訑
- 赤鱬

Teaching goal:
- first clear ranged burst threat;
- player sees 九尾狐 in battle before/around obtaining it.

### 1-4 — 群獸爭道
Enemy lineup:
- 狌狌
- 狌狌
- 鹿蜀

Teaching goal:
- sustained chase pressure;
- previews 狌狌 as the later recruit.

### 1-5 — 南山鎮關
Enemy lineup:
- 九尾狐
- 狌狌
- 猼訑

Teaching goal:
- strongest mixed Chapter1 composition;
- ranged burst + bruiser + tank;
- Chapter1 finale/recruit-value stage.

## Character Detail short-copy draft

These are intentionally concise placeholders for Collection layout testing and may be rewritten for final literary tone.

- 鹿蜀：南山異獸，以迅捷與靈動著稱；戰場上善於快速切入與改變攻擊角度。
- 猼訑：南山異獸，形象厚重而堅韌；在隊伍中擔任承受壓力、守護同伴的前線角色。
- 赤鱬：水中異獸，以水流之力支援同伴；擅長在後方維持隊伍續戰能力。
- 九尾狐：青丘代表性的異獸之一；在本作中定位為操使靈火、擅長遠距爆發的攻擊者。
- 狌狌：具強烈獸性與追擊感的異獸；在本作中定位為持續貼身施壓的近戰鬥士。

## M5A next decision gate

Before M5B Work integration, player should confirm:
1. skill names/effect identities;
2. Chapter1 stage lineup direction;
3. reward table;
4. short Collection copy tone.

After approval, M5A should be marked CONTENT APPROVED and M5B may replace P1–P5 placeholders with formal identities/data while preserving the existing engine.
