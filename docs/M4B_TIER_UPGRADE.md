# M4B — Tier Upgrade / Character Growth

## Status
**ENGINEERING PASS / PLAYER SMOKE PENDING**

M4A Collection/Navigation is deployed pending final player acceptance. This spec defines the next progression slice and also records the shard-accounting correction required before Tier upgrades are safe.

## 1. Canonical progression

Player correction 2026-10-02 supersedes the previous Tier numbering/cost model.

Current Tier order:
- T0 = base Tier for every newly obtained/owned character
- T1 = first upgrade
- T2 = second upgrade
- T3 = current maximum Tier

Upgrade costs use available character shards:
- T0 -> T1 costs 5
- T1 -> T2 costs 10
- T2 -> T3 costs 15
- T3 = MAX

Character acquisition and Tier progression are separate concerns. A character becomes owned at T0. If acquisition itself consumes shards, those acquisition shards must not also count as available Tier-upgrade shards.

## 2. No double use of acquisition shards

The same shards cannot both obtain/unlock a character and immediately pay for a Tier upgrade.

Existing M3 stores lifetime earned shard counts and historically retained those counts after unlock. Preserve that historical data.

Introduce explicit progression spending/accounting, for example:
- earnedShardsByCharacterId = existing M3 inventory
- spentShardsByCharacterId = cumulative consumed amount
- available = earned - spent

If the current acquisition contract unlocks a locked character by consuming 5 shards, that cost must be accounted once when the character becomes owned at T0.

For pre-correction saves:
- every already-owned character migrates to T0 unless a later authoritative Tier save exists;
- characters previously unlocked through the M3 5-shard acquisition path must account that acquisition cost exactly once;
- baseline-owned characters that did not require shard acquisition must not receive a fabricated acquisition charge;
- do not alter lifetime earned count;
- do not double-charge on future reloads.

Exact storage shape may differ, but the invariant is mandatory.

## 3. Collection card presentation

Do not show a bare shard total such as "Shards 4".

Show available / next requirement:
- owned T0: 4 / 5
- owned T0 with surplus: 10 / 5
- owned T1: 7 / 10
- owned T2: 12 / 15
- T3: MAX presentation; no enabled upgrade action

The numerator may exceed the requirement until the player chooses to upgrade.

After upgrade:
- consume exactly the requirement;
- preserve excess;
- update fraction to the next Tier requirement.

Example:
- T0 has 10 / 5
- upgrade to T1
- spend 5
- T1 shows 5 / 10

## 4. Character Detail upgrade action

Character Detail becomes the authoritative upgrade/synthesis interaction.

Show:
- current Tier
- available shard fraction
- next Tier
- required shard count
- UPGRADE / SYNTHESIZE action

Button state:
- enabled iff character is owned, not max Tier, and available >= requirement;
- disabled when insufficient;
- locked/unowned character has no Tier-upgrade action;
- T3 shows MAX / no upgrade action.

On successful upgrade:
- Tier persists immediately;
- required shards are consumed/accounted;
- excess remains;
- Collection card/detail refresh immediately;
- saved team/combat definition identity remains the same character.

## 5. Tier state ownership

Tier progression is player progression state, separate from immutable character definitions and separate from battle runtime slots.

Do not store Tier on A1/A2/A3 battle actor IDs.

A Character Definition may expose Tier-specific effect definitions later, but owned Tier state belongs to persistence/progression.

## 6. Current M4B mechanics boundary

This slice only establishes:
- Tier state;
- shard consumption/accounting;
- upgrade eligibility/transaction;
- Collection presentation.

Do not yet invent undefined Tier combat bonuses if not already specified.

If no Tier-specific combat mechanic is formally defined, upgrading Tier may persist/display correctly without changing combat numbers in this slice. Mechanical Tier evolution can be a later bounded content/mechanics pass.

## 7. Persistence / migration

Requirements:
- versioned persistence;
- pre-M4B saves migrate safely;
- existing M3 earned shard totals preserved;
- existing ownership preserved;
- recruitment cost accounted exactly once for already-owned characters;
- Tier defaults:
  - owned characters -> T0 unless a later authoritative save says otherwise;
  - locked characters -> no owned Tier;
- malformed data sanitizes safely;
- denied storage degrades safely to current-session behavior;
- no localStorage.clear().

## 8. Universal Campaign reward dependency

All current Chapter1–6 stages use the same reward system. Placeholder engineering reward tables are acceptable until formal chapter balance is authored.

M4B must not depend on Chapter1-specific reward logic.

## 9. Engineering acceptance

At minimum:
1. newly owned character starts at T0;
2. baseline-owned pre-correction characters migrate to T0;
3. shard-unlocked owned characters migrate to T0 and acquisition cost is accounted exactly once;
4. T0 4/5 upgrade disabled;
5. T0 5/5 upgrade enabled;
6. T0 10/5 upgrade enabled;
7. T0 10/5 -> T1 consumes5 -> displays5/10;
8. T1 9/10 disabled;
9. T1 10/10 enabled;
10. T1 -> T2 consumes10;
11. T2 14/15 disabled;
12. T2 15/15 enabled;
13. T2 -> T3 consumes15;
14. T3 is MAX and cannot upgrade;
15. excess shards remain after upgrade;
14. repeatable Campaign rewards increase available numerator;
15. owned/locked/Tier/shard state survives reload;
16. Collection and Character Detail show the same authoritative state;
17. upgrade does not modify saved team lineup;
18. duplicate click/transaction cannot double-spend;
19. malformed/denied persistence safe;
20. targeted + impacted regression + build/deploy pass.

## 10. Stop

After engineering PASS/deploy:
- player smoke Collection fraction display and one T1->T2 upgrade;
- stop;
- do not invent Tier combat bonuses, Level, stars, rarity, shop or formal animation without separate authorization.

## 11. Implemented accounting / migration (2026-10-02)

Acquisition schema2 uses existing `shanhaijing-arena.acquisition.v1` key. `shardsByCharacterId` remains lifetime earned; `spentShardsByCharacterId`, `tierByCharacterId`, `completedUpgradeIds` added. Available=earned-spent. Legacy owned P1/P2/P3 are baseline grants and pay no fabricated recruitment fee; other shard-unlocked owned IDs defaultT1 and record recruit5 once. Normalize derives a cumulative spending floor rather than repeatedly subtracting; v1 load writes v2 once, denied writes retain session state. Campaign/team/battle receipts preserved. Only canonical Tier strings accepted; structured/malformed values fall back safely.

UPGRADE is the consistent label. Request ID + expectedTier enforce idempotency; detail adds500ms per-character gesture guard. Success persists and refreshes card/detail immediately. T3MAX has no upgrade action. No combat bonuses.

## 12. Release evidence / next action

Safe source `af56523791fc59eaecaa7657e82197bb4f003ec9`, branch `feat/m0-combat-core-20260927` / PR #1. CheckpointsA/B/C recorded in `docs/verification/M4B_TIER_UNIVERSAL_REWARDS.md`. Final relevant76/76, impacted161/161, combat93/93, build/diff/review PASS; Actions#316 /36968180269 CI330/330, Build/Pages success and public source match. Next player short farming/fraction/upgrade/reload smoke per verification document, then STOP. No PLAYER VERIFIED claim.


## 13. Tier correction release target (2026-10-02)

The currently deployed T1-base model is superseded before player acceptance.

Required migration:
- owned T1 from the just-deployed prototype becomes T0 unless there is explicit evidence of a player-performed upgrade that must be preserved;
- because this change happened during player smoke rather than a finalized release, prefer a deterministic migration that preserves earned/spent accounting and does not grant free Tier advancement;
- baseline-owned characters remain T0;
- M3 shard-unlocked characters remain owned at T0 with their acquisition spend preserved;
- no character should become T1 merely because it is owned.
