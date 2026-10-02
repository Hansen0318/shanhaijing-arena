# M5A — Chapter 1 Formal Content Draft

## Status
**DRAFT / PLAYER REVIEW REQUIRED**

This is a chat-first content sheet. It does not authorize runtime replacement, balance tuning, formal art production, or AI implementation.

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
