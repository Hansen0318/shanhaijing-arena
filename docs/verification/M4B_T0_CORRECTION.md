# M4B T0 Base Tier Correction — Verification

## Release state

**ENGINEERING PASS / PLAYER SMOKE PENDING** (2026-10-02).

Branch `feat/m0-combat-core-20260927` / PR#1 retained, no main merge. Recoverybase `e511df93e3d1e0d608244cb4133cf7297ab8559d`. Domain checkpoint `76b7c0a4fa065ca4dff165d523ddc7aaa338ca13`; final implementation/deployed source `7bb3802a72392ed175e08ffd170a09305a5b3fc9`. Later closure docs-only.

## Bounded change

| Current Tier | Next | Cost (available) |
|---|---|---:|
|T0|T1|5|
|T1|T2|10|
|T2|T3|15|
|T3|MAX|No action|

Newly owned characters startT0. Acquisition remains separate: nonbaseline shard recruitment consumes5 once; baselineP1/2/3 are free-owned. Earned lifetime remains unchanged, available=earned-totalspent. Excess survives upgrade/MAX.

Save schema3 keeps `shanhaijing-arena.acquisition.v1`. v1/v2 owned Tiers deterministically resetT0. v2 recorded spend stays consumed; valid old Tier's implied spend floor is retained if earned supports it (oldT2 upgrade5, oldT3 cumulative15 plus recruit). Old prototype upgrades are not refunded/free-promoted. v3 authoritative Tier/spent survive reload without repeated charge. Unknown IDs, malformed counts/structured Tier, unfunded Tier and denied storage normalize safely. Battle/upgrade receipts, clear claims, Campaign progress and saved team remain intact.

Only acquisition model/Tier/persistence and Collection's dev-fixture Tier fallback changed. Existing Detail UPGRADE reads that shared model; expectedTier/requestID/500ms per-character guard retained. Layout/navigation/routevisibility, reward transaction/presentation/all30 reward tables, catalog, combat stats/abilities/cooldowns/AI/input unchanged.

## Executed evidence

- Before edits: focused existing57 tests clean (dot reporter).
- New correction RED0/18 (oldT1/cost/schema assertions), then GREEN18/18.
- Domain/acquisition55/55, no failures.
- UI/Campaign targeted RED9/10 (dev-owned fallbackT1), then fixed fallbackT0.
- Final relevant95/95, impacted180/180, combat93/93.
- Independent read-only focused review50/50, no Critical/Important/Minor findings.
- `npm run build`, `git diff --check` PASS. Existing bundle-size warning and local npm proxy-env warning remain non-blocking; no dependency/workflow changes.

Commands:

```sh
node --test tests/tierT0Correction.test.js
node --test tests/tierProgression.test.js tests/tierT0Correction.test.js tests/acquisition*.test.js
node --test tests/collection*.test.js tests/tier*.test.js tests/acquisition*.test.js tests/allChapterRewards.test.js tests/campaignRewards.test.js
node --test tests/collection*.test.js tests/tier*.test.js tests/allChapterRewards.test.js tests/campaign*.test.js tests/acquisition*.test.js tests/rewardPresentation.test.js tests/universalRewards.test.js tests/team*.test.js tests/rosterTeam.test.js tests/routeOwnership.test.js tests/appRouteReset.test.js tests/progressReset.test.js tests/viewportSync.test.js
node --test tests/battleRules.test.js tests/battleSession.test.js tests/demoBattle.test.js tests/headlessSimulation.test.js tests/criticalDamage.test.js tests/ability.test.js tests/ai.test.js tests/controlHandoff.test.js tests/prototypePacing.test.js
npm run build
git diff --check
```

No extra local full suite or unrelated historical visual smoke. Configured CI runs its normal full suite.

## Actions / Pages / public source

Domain checkpoint [#323 /37006182297](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/37006182297) failed346/348: old `collectionView` rapid-upgrade and `tierCampaign` expectedT1/T2 assertions had not yet been updated. Build/deploy skipped; intermediate checkpoint was never a release-PASS claim.

Final [#324 /37006321807](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/37006321807): CI349/349, build and Pages deploy success. Build job110835341645, deploy110835456958. CI/local/public JS `index-B5Rq6VE2.js`, CSS `index-CXWSf6fJ.css` match. CSS unchanged.

Public normal URL https://hansen0318.github.io/shanhaijing-arena/ : reload Landing→Collection P1/P2/P3T0 0/5, P4/P5LOCKED0/5; single-tapP1DetailT0,nextT1requires5,UPGRADEdisabled and gameHidden=true confirmed. No reset, save injection or unrelated battle replay. Cloud had no spendable shards; enabled-upgrade/migration/reload covered executable domain/UI/Campaign tests. Real iPhone touch/readability is pending.

## Exact player smoke / next action

Use normal URL; no reset required.

1. Reload an existing save. Owned characters areT0, lifetime earned preserved; available excludes prior spent. P1/2/3 have no fabricated acquisition charge; recruitedP4/5 retain one-time5 spend. Any previous prototype upgrade spend remains consumed, oldTier resetsT0.
2. Open eligible T0 Detail: available>=5 enablesUPGRADE. One tap consumes5, showsT1 with next requirement10, card/detail agree. Insufficient disabled. Rapid tap must not skipTier.
3. When enough shards exist, deliberate T1→T2 costs10 and next denominator15; T2→T3 costs15, showsMAX/no action, excess retained. These can wait until sufficient farming rather than reset saves.
4. Repeatable reward adds to available numerator; reload retains Tier/available/ownership/Campaign clears/team. Landing/Battle/Collection navigation remains intact.

Then report player smoke. **STOP** before Tier combat bonuses, Level, stars, rarity, shop, gacha or formal animation. No PLAYER VERIFIED claim.
