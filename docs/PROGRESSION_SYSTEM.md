# Progression System — Current Planning

> Campaign progression is implemented in M1. M3 acquisition/shards, universal multi-character farming and Preview presentation are player accepted; M4A Collection is engineering PASS pending player smoke; M4B Tier accounting/upgrade is engineering PASS pending player smoke; the canonical sequencing is in `docs/DEVELOPMENT_ROADMAP.md`.

## M1 Campaign progression
Separate unlocked/cleared chapter/stage arrays derive from sequential victories. Defeat and Draw do not unlock. Cleared stages remain replayable. Versioned persistence is isolated from combat and replaceable; see CAMPAIGN_SYSTEM.md.

## M2 dependency — roster ownership foundation
M2 is player verified and implements:
- data-driven roster / character catalog;
- ownership state separate from immutable character definitions;
- Team Select with exactly three characters;
- battle slots A1/A2/A3 as runtime slots, not permanent character IDs.

M3 must not bypass these contracts.

## M3 character acquisition / shards (PLAYER ACCEPTED)

Shard inventory is universal across the roster:
- locked characters accumulate shards toward unlock;
- already-owned characters can also receive and retain their own shards;
- M3 does not spend owned-character shards;
- M4A reads those retained counts without spending; M4B now adds separate spent/Tier accounting while preserving lifetime earned.

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

### Current Campaign reward contract
The reward engine is universal across every chapter/stage. No chapter may require a different reward mechanism.

Current Chapter1 engineering fixture:

| Stage | FIRST CLEAR | REPEATABLE |
|---|---|---|
|1-1|P4×3 + P2×2|P2×1|
|1-2|P4×2 + P1×2|P1×1|
|1-3|P5×2 + P3×2|P3×1|
|1-4|P5×2 + P2×2|P5×1|
|1-5|P5×3 + P1×2|P5×2|

P4 unlocks after1-2 at5; P5 after1-5 at7. First Victory selects firstClear if present; replay selects repeatable.

Player clarification 2026-10-02: Chapters2–6 must no longer appear reward-empty in the player-visible engineering build. Every existing Chapter1–6 stage must expose the same data-driven firstClear/repeatable shard mechanism, using placeholder engineering reward tables until formal chapter content is authored. Future chapters inherit the same schema automatically. Exact character/quantity balance remains replaceable content data, never chapter-specific controller/view logic. Preview marks only firstClear rows CLAIMED. Explicit `?resetProgress=1` is a consumed, one-shot testing reset; ordinary visits preserve saves.

## M4 Tier progression — player clarified 2026-10-02

The earlier provisional 5 / 10 / 15 progression is superseded.

Canonical direction:
- locked -> recruit/unlock at 5 shards -> character enters roster at T1;
- T1 -> T2 requires 5 available character shards;
- T2 -> T3 requires 10 available character shards;
- T3 is the current maximum tier unless later expanded.

Important accounting rule:
- recruitment/unlock cost and Tier-upgrade cost must not double-use the same shards;
- preserve M3 historical earned-shard data by introducing explicit spent/consumed progression accounting rather than silently rewriting old earned totals;
- available shards = earned shards - already-consumed recruitment/upgrade cost;
- excess shards carry forward after an upgrade.

Collection presentation:
- locked character: available/recruit requirement, e.g. 4/5;
- owned T1 character: available/T2 requirement, e.g. 4/5, 5/5, 10/5;
- owned T2 character: available/T3 requirement, e.g. 7/10;
- upgrade button is enabled only when available >= requirement;
- pressing upgrade consumes exactly the requirement and preserves excess;
- T3 has no further upgrade action.

Tier, character Level/star count, and rarity remain separate concepts unless explicitly unified later.

## Collection / roster detail concept

M4 is now intentionally split so visibility comes before upgrade actions.

### M4A — Collection / Roster Hub
Dedicated full-page roster screen:
- compact84px cards with44px square portraits, approximately Team Select bench scale;
- ALL / Power / Speed / Blast filters can reuse the current roster taxonomy;
- show owned and locked characters together;
- owned card = normal presentation;
- locked card = dimmed presentation but still identifiable;
- every card shows available/next requirement and Tier (T3MAX), with lifetime earned preserved internally;
- locked characters show shard progress toward unlock;
- show current Tier when Tier labels are formally confirmed;
- tapping a card opens Character Detail; M4B adds the eligibility-gated UPGRADE action.

Character Detail planning:
- character name;
- Type / Role;
- current ownership state;
- current shard inventory / next requirement;
- current Tier;
- ability summary;
- future Level information only after Level is separately defined;
- concise Shanhaijing lore/introduction.

This screen reads the same M3 acquisition state used by Campaign/Team Select. No duplicate inventory or ownership state.

### M4B — Tier Upgrade / Character Growth
After M4A is stable, add shard spending, Tier transition, next requirement and upgrade action/state.

Square portrait/card border color may distinguish Tier.

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

## M4B implementation state

ENGINEERING PASS / PLAYER SMOKE PENDING. Acquisition schema2 retains earned+reward receipts and adds spent/Tier/upgrade receipts in the existing key. BaselineP1/P2/P3 recruit cost0; pre-M4B shard-unlocked owned IDs recruit5 once. See `docs/M4B_TIER_UPGRADE.md` and `docs/verification/M4B_TIER_UNIVERSAL_REWARDS.md`. All30 current Chapter stages now have reward content. No Tier combat bonuses are implemented.
