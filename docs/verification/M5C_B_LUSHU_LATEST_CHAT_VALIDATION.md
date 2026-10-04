# M5C-B — Latest Chat correction validation / deploy

Status: targeted checks PASS / DEPLOYMENT PENDING.
Recovered81b44d33ae7467a6582306f3306679a7b8f94675 on original feat/m0-combat-core-20260927 /PR#1. Remote main inspected; no merge. Source49bb9617/69a35700/41b56f1d and docs625ec991/31e511b1/131721b3/81b44d33 preserved. Baseline Actions37183428511 FAILURE.

## Executable delta
Initial targeted131/134: lower formal card still expected name retirement; actual Arena mock lacked setVisible and expected a retained ring; row test expected old180px. Updated these to current name+Type, marker visibility and150/132 minimum contracts.
Revised budget test independently FAILS at667×320: all four rows need340px without inset /357px with21px inset. First product correction: <=356px responsive CSS: upper132px unchanged, header44px unchanged, bench84px (36px filters+44px information cards+4px internal gap), footer/BATTLE36px, outer gaps0, top1px. With21px inset, minimum319px fits320px. >=357px Chat rows/filter/footer/overlap/width unchanged. No redesign or132→82 reversion. Second actual public runtime defect: negative-margin slot boxes extended5px beyond root, creating a horizontal scrollbar. Added only4% symmetric team-container inset, preserving42% basis/negative4.5% overlap. A box-budget test observed RED→GREEN; final runtime recheck pending. RED→GREEN observed. Tests cover667×320,844×320 with21px inset,740×356,740×360,844×390,932×430.

## Contracts / tests
Actual Arena applyFrame sets formal marker visible=false (fully hides both fill/stroke); absent/invisible formal sprite sets marker visible=true/fill1. No-art selection stroke remains. Snapshot/actor x/y unchanged. Dedicated telegraph adapter untouched.
Upper formal identity remains primary static full-body; lower P1 retains portrait+鹿蜀+Type:Speed icon/accessible label; placeholder characters stable. Collection conditional placeholder retirement/gradient/Tier remain unchanged.
Added one distinct KO test: current approved identity.png stands in for a future battleKo image slot in test data only; another test case supplies an animation descriptor over the current idle sheet. Both select formal KO state texture/frame, remain visible at actor x/y with KO alpha. Missing/procedural Hit/KO/Cast tests retain static idle fallback. No KO PNG or production binding created.
Protected72×96 scale/common origin/four-frame2.5fps loop/facing/hit visibility/Pause/Resume/scene cleanup/viewport BACK/menu dependency/cache tests PASS. Approved PNG/master and asset architecture unchanged; asset encoded/decoded delta0.

## Engineering evidence
node --test --test-reporter=tap tests/lushu*.test.js tests/asset*.test.js tests/collection*.test.js tests/team*.test.js tests/viewportSync.test.js tests/routeOwnership.test.js tests/lazyBattleRuntime.test.js tests/battleLabRuntime.test.js tests/preBattleGate.test.js tests/appRouteReset.test.js tests/hudCardLayout.test.js →136/136 PASS.
Asset guard40files148075bytes; npm run build PASS; git diff --check PASS. Existing large-chunk advisory unchanged. No full local regression; existing CI workflow unchanged.
Final build fingerprints recorded after release.

## Release pending
Push tested checkpoint, verify relevant Actions/Pages, public fingerprint/PNG resolution, Team/Collection/Detail/Battle inspection. Final status ENGINEERING PASS / PLAYER SMOKE PENDING.

## Player smoke / STOP
1 No old white circle under formal鹿蜀;2no disappearance;3facing/idle;4upper full-body noticeably larger;5less ally/enemy whitespace;6upper primary visual;7lower portrait+name+Type;8compact usable filters;9small right-aligned proportional BATTLE;10BACK/viewport.
No formal Hit/KO/Cast, other characters, preview/Detail animation, scenic background,VFX/audio/Chapter2. Stop for device smoke; global hard-rule promotion remains Chat-owned after player PASS.
