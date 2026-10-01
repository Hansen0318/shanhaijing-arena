# Progression System — Current Planning

> Campaign progression is implemented in M1. Character acquisition, shards, and Tier upgrades are planned future milestones; the canonical sequencing is in `docs/DEVELOPMENT_ROADMAP.md`.

## M1 Campaign progression
Separate unlocked/cleared chapter/stage arrays derive from sequential victories. Defeat and Draw do not unlock. Cleared stages remain replayable. Versioned persistence is isolated from combat and replaceable; see CAMPAIGN_SYSTEM.md.

## M2 dependency — roster ownership foundation
M2 is player verified and implements:
- data-driven roster / character catalog;
- ownership state separate from immutable character definitions;
- Team Select with exactly three characters;
- battle slots A1/A2/A3 as runtime slots, not permanent character IDs.

M3 must not bypass these contracts.

## M3 planned character acquisition / shards
Planned loop:
Stage Preview shows configured shard rewards
→ Victory grants configured shards
→ shard inventory persists outside combat
→ collecting 5 shards unlocks that character into roster ownership
→ newly owned character becomes selectable in M2 Team Select.

Rules:
- Defeat / Draw / unfinished Exit do not grant clear-based unlock rewards.
- Reward tables are data-driven per stage.
- Stage 5 may be a harder finale with higher-value or chapter-exclusive character shards.
- Exact named characters, drop rates, and balance remain later content decisions.

### M3 locked prototype engineering fixture
For implementation smoke only, not formal content:
- initial normal ownership: P1/P2/P3;
- P4/P5 start locked;
- 1-1 P4×2 first-clear;
- 1-2 P4×2 first-clear;
- 1-3 P4×1 first-clear -> reaches 5 and unlocks P4;
- 1-4 P5×1 repeatable;
- 1-5 P5×3 first-clear;
- replay 1-4 once after the first pass -> P5 reaches 5 and unlocks.

Unlock threshold remains 5 shards. Shard count persists after unlock for later M4 use. First-clear rewards must be idempotent; repeatable rewards grant once per completed Victory.

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
