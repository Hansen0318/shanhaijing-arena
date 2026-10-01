# Progression System — Current Planning

> Campaign progression is implemented in M1. The initial M3 acquisition/shards loop is player verified; the multi-character reward correction is engineering PASS pending its player smoke; Tier upgrades remain future scope; the canonical sequencing is in `docs/DEVELOPMENT_ROADMAP.md`.

## M1 Campaign progression
Separate unlocked/cleared chapter/stage arrays derive from sequential victories. Defeat and Draw do not unlock. Cleared stages remain replayable. Versioned persistence is isolated from combat and replaceable; see CAMPAIGN_SYSTEM.md.

## M2 dependency — roster ownership foundation
M2 is player verified and implements:
- data-driven roster / character catalog;
- ownership state separate from immutable character definitions;
- Team Select with exactly three characters;
- battle slots A1/A2/A3 as runtime slots, not permanent character IDs.

M3 must not bypass these contracts.

## M3 character acquisition / shards (baseline player verified; reward correction smoke pending)

Shard inventory is universal across the roster:
- locked characters accumulate shards toward unlock;
- already-owned characters can also receive and retain their own shards;
- M3 does not spend owned-character shards;
- M4 will consume/use those persisted counts for Tier progression.

Implemented loop:
Stage Preview shows configured shard rewards
→ Victory grants configured shards
→ shard inventory persists outside combat
→ collecting 5 shards unlocks that character into roster ownership
→ newly owned character becomes selectable in M2 Team Select.

Rules:
- Defeat / Draw / unfinished Exit do not grant clear-based unlock rewards.
- Reward tables are data-driven per stage.
- A stage may grant multiple character shard items with different quantities.
- First-clear and repeatable reward sets are independently configurable. On the first Victory choose the valid firstClear set if present, otherwise repeatable; on replay choose repeatable only.
- Example: first clear may grant Character A ×3 + Character B ×2, while replay grants only Character B ×1/×2.
- Rewards may target already-owned roster characters; those shards remain persistent for future M4 use.
- Stage 5 may be a harder finale with higher-value shards, stronger-character shards, or shards for strong already-owned characters.
- Stage-5 value is content configuration, not a hard-coded stage-number reward rule.
- Exact named characters and quantities remain later content decisions.
- M3 currently uses fixed configured quantities; random drop rates are not implied.

### Current M3 live engineering fixture (not formal balance)
Initial ownershipP1/P2/P3; P4/P5 locked. All Chapter1 stages have firstClear and repeatable sets:

| Stage | FIRST CLEAR | REPEATABLE |
|---|---|---|
|1-1|P4×3 + P2×2|P2×1|
|1-2|P4×2 + P1×2|P1×1|
|1-3|P5×2 + P3×2|P3×1|
|1-4|P5×2 + P2×2|P5×1|
|1-5|P5×3 + P1×2|P5×2|

P4 unlocks after1-2 at5; P5 after1-5 at7. All inventory retained. First Victory selects firstClear if present; replay selects repeatable. Chapters2–6 can remain empty placeholders; future reward.items configuration uses the same engine. Preview marks only firstClear rows CLAIMED. Explicit `?resetProgress=1` is a consumed, one-shot testing reset; ordinary visits preserve saves.

## M4 planned Tier progression
The current player-approved planning direction is incremental shard requirements:
- unlock / first usable tier: 5 shards;
- next tier: 10 additional shards;
- final tier: 15 additional shards.

Total across the full planned path is 30 shards if unchanged.

IMPORTANT:
- Earlier repository notes used the opposite naming direction (T3 -> T2 -> T1). That older convention is superseded as an implementation assumption.
- Before M4 coding begins, confirm the final labels/order of T1/T2/T3 with the player and record it explicitly. Do not infer or silently invert Tier naming.
- Tier, character level/star count, and rarity are separate concepts unless the player later unifies them.

## Collection / roster detail concept
Planned M4 presentation:
- left side: selectable character list/cards;
- right side: selected character details;
- current shard count;
- current Tier;
- next shard requirement;
- upgrade state/action;
- square portrait/card border color distinguishes Tier.

A future star row may appear under battle/roster portrait HP to communicate a separately defined level/grade system. Do not implement stars as an undefined duplicate progression system.

## Tier philosophy
Tier upgrades should add meaningful mechanic/synergy evolution in addition to modest stat growth; do not make tiers only raw-stat multipliers.

## Future reward sources under consideration
- Campaign stage rewards / farming;
- chapter finales;
- Character Challenge;
- Character Mastery/use missions;
- chapter milestones;
- universal fragments;
- duplicate conversion only if a future random-acquisition system exists.

## Level vs Tier
- Level: base-stat progression when formally defined.
- Tier: character mechanic depth / progression.
They remain separate systems.

## Out of current scope
Do not implement full economy, shop, gacha, formal reward balance, or audio during M2.
