# M4B Tier Upgrade / Universal Reward Follow-up

> Historical T1-base /5/10 release evidence. Superseded before player acceptance by `M4B_T0_CORRECTION.md` (T0 base, costs5/10/15, schema3 migration). Universal Chapter reward content below remains unchanged; use the newer document for current Tier smoke.

**ENGINEERING PASS / PLAYER SMOKE PENDING** — 2026-10-02.
Branch `feat/m0-combat-core-20260927`, PR #1 open. Recovery base `c3db01dab1963da3018357281bab51e0794e18f6`; safe deployed source `af56523791fc59eaecaa7657e82197bb4f003ec9`. Closure commits are docs-only.

## Recovery checkpoints

- A universal reward content: `348b1ac43192538b3837191dcf430899f549d83f`.
- B pure Tier ledger/persistence: `c7e26a020a000df55d721717953a3a1bb4949254`.
- C Collection/detail integration: `c755d8b89ea401c0e0620ad6c70608a66b006993`.
- Review malformed-Tier correction/Campaign integration: `7aaf3840dcab148aef3ce84770d8b56bd2acedde`.
- Final Tier-action grouping/disabled opacity: deployed source above.

## Content and accounting

Chapter1 accepted fixture is unchanged. Chapters2–6 each have five stages with firstClear primary×3 + secondary×2, then repeatable secondary×1. Rows correspond to stages1–5:

| Chapter | Primary IDs | Secondary/replay IDs |
|---|---|---|
|2|P1,P4,P2,P5,P3|P4,P2,P5,P3,P1|
|3|P2,P5,P3,P1,P4|P5,P3,P1,P4,P2|
|4|P3,P1,P4,P2,P5|P1,P4,P2,P5,P3|
|5|P4,P2,P5,P3,P1|P2,P5,P3,P1,P4|
|6|P5,P3,P1,P4,P2|P3,P1,P4,P2,P5|

This is replaceable deterministic engineering content, not formal balance. All30 stages use the same reward schema/transaction/presentation. Future synthetic Chapter7 first/replay grants require only reward data.

Acquisition schema version2 remains in existing `shanhaijing-arena.acquisition.v1` storage key; the key suffix is historical, avoiding a second inventory/key/reset path. `shardsByCharacterId` is lifetime earned and never reduced. Added `spentShardsByCharacterId`, `tierByCharacterId`, `completedUpgradeIds`; available=earned-spent. Existing battle receipts/claims remain. Campaign/team keys are untouched.

Legacy version1 migration:
- P1/P2/P3 baseline owned -> T1, recruit spending0; historical earned shards remain fully usable.
- Other shard-unlocked owned IDs -> T1, recruit spending5 exactly once. Lifetime earned remains unchanged. Locked counts below5 have no Tier/spending.
- Normalization uses cumulative minimum spending, never repeated subtraction; version1 load writes normalized v2 to the same key once. Denied writes keep normalized session memory. Malformed counts/IDs/Tiers sanitize; only canonical string Tiers accepted. Higher Tier requires enough earned to back its cumulative recruit/upgrade cost; invalid unaffordable Tier falls back T1.

T1→T2 consumes5; T2→T3 consumes10; T3MAX, no T4/action. Pure transaction requires current expectedTier and unique requestId; rejected/duplicate/stale requests do not spend. Detail adds a500ms per-character rapid gesture guard and ignores multi-click detail>1; an intentional subsequent upgrade can be tapped after that interval. Successful state persists immediately, card/detail re-render from the authoritative ledger. No combat bonus/definition/stat/cooldown/AI/input change.

Cards show Tier + available/requirement (locked4/5, T1surplus10/5, T2remaining5/10), T3MAX. Detail shows next Tier/requirement and consistent UPGRADE label; insufficient disabled button has45% opacity; locked/MAX have no upgrade action. Optional ability/lore unchanged. Compact84px/44px cards and13px/96px detail, sibling Landing routes remain.

## Actual verification

- PartA RED3/8 → related **29/29 PASS** (allChapterRewards/universalRewards/campaignData/campaignRewards). Old emptyChapter2 assertion intentionally replaced.
- Tier domain RED0/12 → related **51/51 PASS**. Collection UI RED13/19 → related **74/74 PASS**.
- Reviewer reproduced malformed object/array Tier coercion. Added persistence regression RED12/13; fixed canonical-string check. Final relevant Collection/Tier/acquisition/content/controller suite **76/76 PASS** (also repeated after presentation-only finish).
- Final impacted command: `node --test tests/collection*.test.js tests/tier*.test.js tests/allChapterRewards.test.js tests/campaign*.test.js tests/acquisition*.test.js tests/rewardPresentation.test.js tests/universalRewards.test.js tests/team*.test.js tests/rosterTeam.test.js tests/routeOwnership.test.js tests/appRouteReset.test.js tests/progressReset.test.js tests/viewportSync.test.js` — **161/161 PASS**, zero failures. Last subsequent product edit only groups Tier UI before Abilities and styles disabled buttons; relevant76/76 and final CI passed afterward.
- Combat regression: `node --test tests/battleRules.test.js tests/battleSession.test.js tests/demoBattle.test.js tests/headlessSimulation.test.js tests/criticalDamage.test.js tests/ability.test.js tests/ai.test.js tests/controlHandoff.test.js tests/prototypePacing.test.js` — **93/93 PASS**. No unrelated historical combat browser smoke.
- Build / diff-check PASS. [Actions #316 /36968180269](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36968180269): configured CI **330/330 PASS**, zero failures; Build job110716370606 and Pages deploy110716437892 success.
- Final local/CI/public assets match JS `index-DKY9AbKF.js`, CSS `index-CXWSf6fJ.css`. Public normal URL shows T1/fractions, locked progress, P1nextT2cost5 and disabled UPGRADE at0/5, opacity.45, no stale #game. Public isolated unlock-all preview confirms2-1P1×3/P4×2/P4×1 and6-5P2×3/P5×2/P5×1. No reset or storage edits used for browser verification.
- Independent review verified fix and Tier13/13, no remaining Important/Critical defects. Normal Campaign Chapter2 integration covers actual first grants, upgrade spending, replay numerator gain, unchanged lineup and fresh persistence reload.

## Exact player smoke / next action

Use normal URL with existing save, no reset required:
1. Chapter2 (or any unlocked later Chapter): Preview contains character reward rows; first Victory grants configured first set, replay grants repeatable subset. Claimed first rows dim; repeatable remains bright. Other Chapters' content/semantics covered by automated all30-stage tests.
2. Collection: P1/P2/P3 initial baseline T1 uses all previously earned shards. Previously unlocked P4/P5 available equals historical earned minus5 recruitment (e.g. earned7→2/5), not lifetime total. Locked4/5 stays dim; hitting5 recruits T1 and shows0/5.
3. Pick owned T1 with available≥5: Detail UPGRADE enabled; tap once. It becomes T2 and numerator drops exactly5, denominator becomes10; card updates immediately. Rapid double tap must not skip toT3. Insufficient button stays dim/disabled.
4. If T2available≥10, deliberate UPGRADE consumes10 to T3MAX; excess retained; no further action. Reload: Tier/fractions/ownership, Campaign clears and saved team remain. Readability/touch/scroll/safe areas are player-owned smoke.

No formal balance, lore/art/animation or Tier combat bonuses. Tiers are stored/displayed progression only until mechanics are separately authorized. Current browser save had no spendable shards; actual enabled upgrades were verified by executable UI/controller/persistence contracts, not falsely claimed as real-device acceptance. Existing bundle-size warning remains, build succeeds.

**STOP at M4B follow-up.** Await player acceptance. No Tier combat bonuses/Level/stars/rarity/shop/gacha/formal character animation.
