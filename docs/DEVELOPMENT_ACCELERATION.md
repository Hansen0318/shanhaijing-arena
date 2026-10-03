# Development Acceleration Rules — Post-INFO

## Status
**PLAYER APPROVED / CANONICAL WORKFLOW**

These rules govern how future Chat and Work should proceed unless a later player decision explicitly overrides them.

## 1. Batch milestone over micro-slices

Prefer a larger coherent milestone when several changes belong to the same system.

Example:
- do not separately stop for telegraph, dodge, healer retreat, ranged spacing, target scoring;
- group them under one combat-behavior milestone with internal checkpoints.

Work should still use safe checkpoints and tests, but player validation happens mainly at the end of the milestone.

## 2. Internal checkpoints

For a larger milestone, Work should split execution into internal checkpoints such as:
- A: data/contracts
- B: shared engine primitives
- C: feature integration
- D: UI/content integration
- E: regression/build/deploy

Each checkpoint should:
- run targeted tests;
- commit;
- push safe progress before long verification;
- continue automatically if no player decision is required.

Do not stop after every small checkpoint merely to ask for player testing.

## 3. Player smoke policy

Player testing is required mainly when:
- subjective feel/readability matters;
- a cross-system milestone is complete;
- a risky interaction cannot be validated well by automation;
- a design decision truly needs player preference.

Do not ask the player to replay unrelated accepted flows after every change.

Accepted systems should be protected by automated regression.

## 4. Developer Battle Lab

Create a developer-only Battle Lab to accelerate future combat testing.

Purpose:
- jump directly into a chosen combat scenario;
- configure ally/enemy lineups;
- optionally set HP/state;
- skip countdown;
- force skills ready;
- choose AI-only or player-control test modes;
- launch focused scenarios such as heal/AoE/type/dodge.

Hard isolation:
- must not write Campaign clear;
- must not award shards;
- must not unlock characters;
- must not modify Tier;
- must not mutate saved team;
- must not write normal progression receipts;
- should use isolated/dev-only state.

It must not be visible in the normal player flow.

## 5. Data-driven character/content development

Future characters and stages should mostly be integrated through:
- roster data;
- ability data;
- AI profile data;
- stage data;
- reward data;
- asset manifest data.

Do not add bespoke controller/view/combat branches for individual characters unless a shared mechanic genuinely does not yet exist.

If a new character requires a new mechanic:
1. define a reusable shared primitive;
2. test it generically;
3. map the character to it through data.

## 6. Scope of manual regression

If the current change only affects one system:
- Work runs automated regression for protected systems;
- player manually tests only the changed subjective path.

Example:
- AI changes do not require re-testing INFO, Collection, shard accounting, or Landing unless the diff affects them.

## 7. Asset integration acceleration

For formal art/VFX, define an asset contract first instead of integrating one image at a time.

Per-character asset slots should remain standardized:
- portrait
- battle sprite
- idle
- hit
- KO
- Basic VFX
- Heavy VFX
- Special VFX
- Awakening VFX
- Collection art

Work should build reusable loading/fallback/manifest behavior once; later assets should mostly be file + manifest replacement.

## 8. Next approved sequence

### M6A — Developer Battle Lab
Goal:
- build the isolated dev-only combat test harness;
- preserve all normal progression/save contracts;
- make later role/AI/skill testing faster.

### M6B — Combat Tactical AI / Telegraph / Dodge Batch
After M6A, implement a larger coherent batch:
- telegraph / dodgeable ability metadata;
- shared threat detection;
- safe-position selection;
- sidestep / backstep / diagonal reposition;
- healer retreat/recover/re-engage;
- ranged spacing / kite tendency;
- bruiser/tank tactical differences;
- profile-driven behavior for the five formal Chapter1 characters.

Do not make dodge perfect.
Do not use character-ID-specific branches.
Keep seeded/deterministic behavior where variation is required.

## 9. Stop conditions

Pause and ask the player only when:
- a product decision is genuinely ambiguous;
- player preference changes the feature substantially;
- a safe migration/compatibility decision cannot be inferred;
- final deployed milestone requires subjective smoke.

Otherwise Work should continue through its internal checkpoints to the bounded milestone result.
