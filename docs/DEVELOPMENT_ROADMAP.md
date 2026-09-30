# Development Roadmap — Post-M1

> Planning source of truth for the next bounded milestones. This roadmap records product sequencing only; each milestone still requires its own implementation handoff, tests, deployment, and player smoke.

## Locked sequencing rule

Do not start a later milestone by bypassing the data/contracts required by the earlier one.

Current order:

1. **M2 — Team Select / Roster Skeleton**
2. **M3 — Shard / Reward / Character Unlock Loop**
3. **M4 — Tier Upgrade / Collection Screen**
4. Formal Chapter 1 content / character art / battle art passes
5. Audio pass after core flow and visual timing are stable

M3 depends on M2 roster ownership/team-selection contracts.  
M4 depends on M3 shard inventory/unlock/reward contracts.

## M2 — Team Select / Roster Skeleton

Goal: insert a reusable roster/team layer between Stage Preview and Arena.

Flow:

Chapter Select
→ Stage Select / Preview
→ START
→ Team Select
→ choose exactly 3 owned/available characters
→ BATTLE
→ existing 3v3 Arena
→ Result

Requirements:
- data-driven character catalog;
- runtime battle slots A1/A2/A3 remain slots, not permanent character IDs;
- exactly three unique characters per team;
- selected character definitions feed HP/stats/abilities/portrait metadata into the existing battle;
- slot 2 remains the front spawn; formation belongs to slots, not character IDs;
- Team Select BACK returns to the same Stage Preview;
- last valid team can be restored;
- stage config can later express allowed/forced/banned characters;
- ownership is separate from immutable character definition data;
- prototype may expose several placeholder characters for engineering smoke;
- no formal character art, reward economy, fragments, tiers, or audio.

Acceptance gate before M3:
- engineering tests/build/deploy pass;
- Stage Preview → Team Select → Battle → Result works;
- selected team maps correctly into A1/A2/A3;
- retry/re-entry preserves a valid team;
- iPhone player smoke should be performed before expanding into reward/unlock systems.

## M3 — Shard / Reward / Character Unlock Loop

Goal: give Campaign stages meaningful visible rewards and connect victories to roster growth.

Stage Preview must be able to show:
- which character shard(s) can be earned;
- shard quantity/range or fixed quantity;
- first-clear-only vs repeatable reward metadata when later required;
- special/finale reward presentation.

Core progression:
- Victory may award configured character shards.
- Defeat / Draw / unfinished Exit award no clear-based unlock.
- Shards are stored outside combat core.
- Character ownership is derived from progression/unlock state, not from battle slot IDs.
- Newly unlocked characters become available to M2 Team Select.

Planned initial shard unlock rule:
- collect **5 shards** to unlock the character at the first usable tier.

Chapter finale concept:
- stage 5 is the harder finale/boss/recruit-value stage;
- it may award higher-value shards;
- some stronger character shards may be exclusive to that chapter/finale;
- exact balance, drop rates, and named characters remain content decisions, not hard-coded architecture.

Important:
- reward tables must be data-driven per stage;
- Stage Preview should explain the reward before the player enters battle;
- cleared stages stay replayable for shard farming when their reward definition allows it;
- do not implement full economy/shop/gacha in M3.

## M4 — Tier Upgrade / Collection Screen

Goal: expose owned characters, shard inventory, and character growth.

Collection / Roster Detail layout concept:
- left side: selectable character list/cards;
- right side: selected character detail;
- show current shard count, current Tier, next requirement, and upgrade action/state.

Planned incremental shard costs:
- unlock / first usable tier: **5 shards**;
- next tier: **10 additional shards**;
- final tier: **15 additional shards**.

This means total earned shards across the full path are 5 + 10 + 15 = 30 unless the product owner later changes the rule.

Tier naming must stay internally consistent when implemented. The exact T1/T2/T3 starting label is a product decision to confirm before coding; do not silently invert earlier terminology.

Visual identity:
- square roster portrait/card;
- card border color distinguishes Tier;
- battle portrait/card may also display a small star row beneath HP to communicate character level/grade when that level system is formally defined;
- Tier, star/level, and rarity must remain separate concepts unless explicitly unified later.

Do not use stars as a second uncontrolled progression system before its meaning is defined.

## Formal content after progression skeletons

After M2–M4 are stable:
- replace placeholder roster/stage images with formal Shanhaijing character and Chapter content;
- define actual Chapter 1 stage enemies/rewards/finale character;
- formal portraits/sprites;
- skill icons and VFX;
- animation;
- stage/background art;
- HUD polish.

## Audio timing

Do not prioritize final audio during M2–M4.

Later audio pass:
- UI click/select;
- stage start;
- Basic/Heavy/Special/Awakening;
- hit / KO;
- Victory / Defeat;
- Pause / Resume;
- Chapter/menu BGM;
- battle BGM;
- volume / mute.

Where practical, preserve clean event hooks such as battleStart, skillCast, hit, ko, victory, and defeat so audio can attach later without changing combat logic.

## Protected boundaries

- Do not import tower-defense gameplay rules.
- Combat core remains shared by AI/player control.
- Campaign, roster ownership, shard inventory, tier progression, and persistence remain outside combat state.
- Character definition data is immutable; ownership/tier/shards are player progression state.
- Placeholder content must be replaceable without rewriting navigation or combat.
- Each milestone stops after engineering/deploy evidence and player smoke; do not automatically start the next milestone.
