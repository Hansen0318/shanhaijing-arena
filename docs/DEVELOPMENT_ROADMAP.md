# Development Roadmap — Post-M1

> Planning source of truth for the next bounded milestones. This roadmap records product sequencing only; each milestone still requires its own implementation handoff, tests, deployment, and player smoke.

## Locked sequencing rule

Do not start a later milestone by bypassing the data/contracts required by the earlier one.

Current order:

1. **M2 — Team Select / Roster Skeleton** — complete
2. **M3 — Shard / Reward / Character Unlock Loop** — complete
3. **M4A — Collection / Roster Hub** — complete
4. **M4B — Tier Upgrade / Character Growth** — complete
5. **M4C — Main Menu / Landing Visual Polish** — complete
6. **M5A — Formal Chapter 1 Content Definition** — complete
7. **M5B — Formal Character / Stage Data Integration** — complete
8. **INFO Hub** — complete
9. **M6A — Developer Battle Lab** — complete
10. **M6B — Combat Tactical AI / Telegraph / Dodge Batch** — complete
11. **M6C — Tier Combat Effects / Shared Status Primitives** — complete / player verified
12. **M5C — Art / Animation / VFX Integration** — M5C-A Asset Pipeline engineering pass / player smoke pending; production art integration separately authorized
13. Audio pass after core flow and visual timing are stable

M3 depends on M2 roster ownership/team-selection contracts.  
M4 depends on M3 shard inventory/unlock/reward contracts.
All Campaign chapters/stages share one reward schema; later chapters are content data, not separate progression mechanisms.

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

Status: **COMPLETE / superseded by accepted M4+ progression work**. Canonical implementation/acceptance: `M3_SHARD_REWARD_UNLOCK.md`.

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

## M4A — Collection / Roster Hub

Goal: give the player a dedicated roster/collection view for inspecting all characters and current acquisition state before adding upgrade actions.

Collection requirements:
- full-page roster/collection screen, separate from battle Team Select;
- larger character cards than Team Select because the purpose is inspection, not rapid lineup selection;
- filters/tabs may reuse the existing ALL / Power / Speed / Blast model;
- show both owned and locked characters;
- owned characters use normal presentation;
- locked/unowned characters remain visible but are clearly dimmed;
- every card shows character identity, current Tier label when defined, and current shard inventory;
- locked characters still show current shard progress toward unlock;
- clicking/tapping a character card opens a read-only Character Detail view/modal;
- Character Detail may show name, Type/Role, shard count/progress, current Tier, abilities, future Level data when defined, and a concise Shanhaijing lore/introduction;
- formal character art/idle animation is not required for M4A; placeholder portraits remain acceptable;
- do not duplicate Team Select semantics. Team Select remains for choosing exactly three combatants; Collection is for inspection/progression visibility.

M4A must consume the existing M3 acquisition/ownership state. It must not create a second shard inventory or alternate ownership model.

## M4B — Tier Upgrade / Character Growth

Goal: add the actual progression action after M4A makes current state visible.

Canonical Tier model after player correction:
- newly obtained character starts at T0;
- T0 -> T1: 5 available shards;
- T1 -> T2: 10 available shards;
- T2 -> T3: 15 available shards;
- T3: current maximum.

Recruitment and Tier upgrade must consume/account for shards separately so the same 5 shards cannot both recruit and immediately pay for T0 -> T1. Preserve historical earned totals with explicit spent/consumed accounting and carry excess forward.

Collection cards should show available / next requirement rather than a bare shard count; Character Detail owns the enabled/disabled upgrade action.

Visual identity:
- square roster portrait/card;
- card border color distinguishes Tier;
- battle portrait/card may also display a small star row beneath HP to communicate character level/grade when that level system is formally defined;
- Tier, star/level, and rarity must remain separate concepts unless explicitly unified later.

Do not use stars as a second uncontrolled progression system before its meaning is defined.

## M4C — Main Menu / Landing Visual Polish

**PASS / PLAYER VERIFIED.** Static prototype full-screen mountain/sun hero, title treatment and clean primary/secondary buttons are the accepted Landing baseline. Later INFO adds a third sibling entry without replacing this baseline.

Fixed hierarchy:
- BATTLE -> Chapter Select
- COLLECTION -> Collection
- Both top-level BACK paths -> Landing

Navigation/progression/combat remained unchanged in M4C. Release evidence: `docs/verification/M4C_MAIN_MENU_LANDING.md`. Player acceptance is complete; later milestones supersede its historical STOP.

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


## M5A — Formal Chapter 1 Content Definition

Status: **CONTENT APPROVED / COMPLETE**.

Goal: replace engineering placeholders with an approved formal Chapter1 content sheet before Work changes runtime data.

Define:
- real character identities and display names;
- Type / Role;
- base combat identity;
- Basic / Heavy / Special / Awakening / Passive concepts;
- per-ability range/targeting intent;
- future AI-profile tendencies such as engage/ranged/kite/support/retreat thresholds;
- Chapter1 five stage enemy lineups;
- firstClear / repeatable shard reward tables;
- Chapter1 finale/boss/recruit identity;
- short Shanhaijing lore copy;
- required portrait/sprite/idle/VFX asset slots.

Do not tune final numeric balance yet. Use relative intent and bounded prototype values until player approves the content sheet.

## M5B — Formal Character / Stage Data Integration

After M5A approval, Work maps the approved content into the existing data-driven catalog, stage configs, rewards, Collection detail and battle definitions. Preserve existing engine contracts; no bespoke per-character combat engine.

## M5C — Art / Animation / VFX Integration

After formal data is stable, replace placeholders with approved visual assets in bounded slices. Current idle presentation remains static. Later motion work is split into creature-appropriate locomotion animation plus state-specific attack/cast micro-animation paired with skill VFX. AI tactical variation may be introduced alongside formal character profiles when needed, but must remain shared-engine/profile-driven.


## INFO Hub

Status: **PASS / PLAYER VERIFIED**. Evidence: `verification/INFO_HUB.md`.

Landing sibling destinations:
- BATTLE
- COLLECTION
- INFO

INFO initial pages:
- GAME GUIDE
- WORLD
- TYPE MATCHUP

Canonical content/visual specification: `docs/INFO_HUB.md`.

The Type Matchup page uses an icon-only triangular diagram for the three Types with text/multipliers below. Current live combat relation remains Power > Speed > Blast > Power, advantage x1.15, disadvantage x0.85, same x1.00.

INFO should be implemented as a bounded UI/documentation slice, separate from combat balance and AI work.

## Future Tactical AI — Dodge / Telegraph Reaction

After formal attack telegraphs exist, AI may gain limited threat reaction and evasive repositioning for explicitly dodgeable attacks. This belongs to the shared tactical-AI/profile system, not bespoke character logic. See `docs/AI_SYSTEM.md`.

Do not start this merely because INFO describes combat. Player manual movement remains the current way to evade attacks.


## Development acceleration policy

Canonical workflow: `docs/DEVELOPMENT_ACCELERATION.md`.

Future work should prefer coherent batch milestones with internal checkpoints and automated regression rather than player-visible micro-slices for every small change.

## M6A — Developer Battle Lab

Status: **PASS / PLAYER VERIFIED**. Evidence: `docs/verification/M6A_DEVELOPER_BATTLE_LAB.md`.

Goal:
- create a dev-only isolated combat test harness to reduce repeated setup time for future character, ability, AI, Type, healing, AoE and Tier-behavior testing.

Required capabilities may include:
- ally lineup selection;
- enemy lineup selection;
- scenario presets;
- optional HP overrides;
- all-skills-ready mode;
- countdown skip;
- AI-only vs manual-control mode;
- direct launch into battle.

Hard isolation:
- no Campaign clear writes;
- no shard/reward writes;
- no unlock writes;
- no Tier writes;
- no saved-team mutation;
- no normal progression receipts;
- not visible in normal player navigation.

## M6B — Combat Tactical AI / Telegraph / Dodge Batch

Status: **PASS / PLAYER VERIFIED**. Canonical spec: `docs/M6B_COMBAT_TACTICAL_AI.md`; evidence: `docs/verification/M6B_COMBAT_TACTICAL_AI.md`. A–E complete and player accepted the current tactical/telegraph baseline.

Implement one coherent tactical-combat milestone rather than many micro-slices.

Scope:
- telegraph / dodgeable ability metadata;
- threat detection;
- safe-position scoring;
- sidestep / backstep / diagonal evasive reposition;
- healer retreat / recover / re-engage;
- ranged spacing / kite behavior;
- bruiser / tank tactical differentiation;
- Chapter1 character tactical profiles.

Rules:
- shared/profile-driven engine;
- no character-ID-specific tactical branches;
- deterministic/seeded where variation exists;
- AI must not dodge perfectly;
- player manual movement remains the current natural dodge path;
- do not add a dedicated dodge button unless separately approved.



## M6C — Tier Combat Effects / Shared Status Primitives

Status: **ENGINEERING PASS / PLAYER SMOKE PENDING**. A–E complete,512/512 tests/build/review/Actions/Pages/public verified. Canonical spec: `docs/M6C_TIER_COMBAT_EFFECTS.md`.

After M6B acceptance, connect the existing T0→T3 progression to combat through reusable, data-driven shared primitives.

Scope includes:
- read-only Tier projection into battle;
- generic status/modifier lifecycle;
- mitigation/movement/avoidance/control;
- ally protection;
- conditional low-HP / isolated-target modifiers;
- persistent area effects;
- approved Chapter1 T1/T2/T3 mechanic mappings;
- Battle Lab Tier comparison presets.

Current five characters are validation content only. Future characters must reuse the same primitives through data; no character-ID branches.



## M6C-B — Tier Power Curve Rebalance

Status: **ENGINEERING PASS / PLAYER SMOKE PENDING**. Actions/Pages/public verified; one focused fixed-seed T0–T3 comparison remains. Canonical spec: `docs/M6C_B_TIER_POWER_CURVE.md`.

Player feedback: M6C mechanic differentiation is correct but the raw Tier power jump is too subtle. Add a generic cumulative `TierScalingProfile` covering HP, damage/healing, bounded combat-tempo stats, attack range, AoE, mobility distance, buff/debuff duration and defensive-effect strength. Per-character weights reinforce role identity while the engine remains future-character-safe. Preserve M6C identity mechanics, progression costs/accounting, AI, telegraph authority and M5C-A asset pipeline.


## M5C-B — Formal Asset Batch Integration

Status: **IN PROGRESS — shared presentation baseline PASS / PLAYER VERIFIED; 鹿蜀 and 猼訑 formal identity/static-runtime accepted; idle breathing withdrawn; 赤鱬 Concept is the next active gate.** Canonical specs: `docs/M5C_B_FORMAL_ASSET_BATCH.md` and `docs/M5C_B_ACCEPTED_PRESENTATION_BASELINE.md`.

M5C-A pipeline and M6C-B balance are accepted. Continue character-by-character static formal art through the gated process. 鹿蜀 and 猼訑 static presentation are accepted. Next: 赤鱬 Concept → Battle Simplification → Static Asset Pack → Static Runtime Readability. Current Idle remains static. Later locomotion is archetype-driven (ground / flight / aquatic-hover as appropriate), and ability action micro-animation is authored together with matching VFX.
