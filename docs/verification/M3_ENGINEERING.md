# M3 engineering closure — 2026-10-01

Historical initial M3 release: PASS / PLAYER VERIFIED (player confirmed before the bounded multi-character correction). Current correction evidence: [M3_MULTI_REWARD_CORRECTION.md](M3_MULTI_REWARD_CORRECTION.md). Branch feat/m0-combat-core-20260927 / PR #1 open; no main merge. Deployed source dd3a4d1a5472c720a6f75c55f7980ada7cfacde3; docs-only closure follows it.

## Actual verification
- Recovery source b40a3fd / Actions#275; baseline tests15/15.
- Domain RED13 + persistence RED9, GREEN acquisition/persistence/prior save contracts37/37.
- Controller/metadata RED9, model/controller GREEN31/31. Presentation RED4, slot preservation RED1 then GREEN.
- Impacted command: `node --test tests/acquisition*.test.js tests/campaign*.test.js tests/rewardPresentation.test.js tests/team*.test.js tests/rosterTeam.test.js tests/battleRestart.test.js tests/boundedCorrections.test.js` →106/106 (before final height test).
- First full265/266 failed only old criticalDamage Restart fixture implicitly assumed P5 owned; explicit prototypeOwnership fixture correction targeted19/19 then full266/266.
- Fresh independent read-only review:36/36 targeted, no core Critical/Important; multi-item text-height finding identified. Regraded for valid array inputs, reproduced RED, fit actual Phaser text height above button band; presentation5/5 and final `npm test`267/267.
- Final `npm run build`:PASS; `git diff --check`:PASS. No changes to combat core, RNG, damageNumbers, demo pacing, roster catalog, joystick/input or roster CSS. Result/callback integration only in protected runtime files.
- Actions#277 failed stale P5 fixture; #278 succeeded fix; final [#279 /36873107391](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36873107391): build110405593244 (Test267/267, Build, artifact) and deploy110405751111 success. CI logs report267 tests/pass267/fail0 and index-DXT92jQP.js. Public script matches local/CI; CSS index-Da2FpEU1.css.

## Acceptance coverage
| User acceptance | Executable evidence |
|---|---|
|1–3 normalP1/P2/P3, lockedP4/P5, dev isolation|campaignRewards normal/stale + dev tests|
|4–5 Preview quantity/policy/CLAIMED|rewardPresentation Stage rows + actual CampaignView|
|6,24 ownedP1 accumulates/persists|acquisition owned/mixed reward + persistence reload + controller syntheticP1|
|7–16 Chapter1 exact grants, replay policy, unlock, retained/future shards|campaignRewards full first/replay path; acquisition repeatable/threshold/mixed model|
|17–22 no Defeat/Draw/Exit/Restart/Retry/stale/duplicate grants|campaignRewards lifecycle/completion-ID tests; acquisition nonVictory tests; actual Arena Result once guard|
|23,25–26 reload, malformed/obsolete/denied storage, preM3 migration|acquisitionPersistence9 + campaignRewards migration/reload|
|27–29 stale team, Victory-only Campaign unlock, filters/exact3/mapping/order|campaignRewards slot/stale + impacted Campaign/roster/team/battleRestart tests|
|30 protected baseline|whole diff against b40a3fd + release267 tests + zero protected core/input/pacing/style diff|

## Public engineering check scope
Final-source cloud browser: Chapter Select; preM3 1-1CLEAR retained with P4×2 CLAIMED;1-2 P4×2 FIRST CLEAR; START shows only P1/P2/P3; saved P1/P3/P5 sanitized to P1/P3/empty/BATTLEdisabled. No page-origin errors observed; extension metadata errors excluded. Full battle and real iPhone readability/feel were not replayed here. Transaction/Scene/Restart/save executable contracts carry engineering coverage; player performs changed-scope smoke.

## Review decisions / limitations
- PreM3 clears seed CLAIMED, zero retroactive shards: preserves history and firstClear policy, but old cleared P4 rewards cannot unlock P4; use separate fresh/private browser save for full fixture smoke. Never wipe original data. This migration choice is explicit in plan/canonical docs.
- Failed storage writes guarantee current-session memory only; no reload durability for denied writes. Separate acquisition and Campaign writes are not cross-key atomic; inventory/receipts write first so successful acquisition remains idempotent if Campaign save fails.
- Multi-item Result layout finding is fixed; no deferred review minors. Completion receipt list grows with victories in this prototype. Existing Phaser large-bundle advisory unchanged.
- Historical M2 full-roster tests deliberately inject engineering ownership; normal app cannot use this injection.

Next: player checklist in docs/M3_SHARD_REWARD_UNLOCK.md §15. STOP before M4. Await player acceptance; never claim PLAYER VERIFIED.
