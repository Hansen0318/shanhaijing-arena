# M5C-B — Lushu third correction executable validation / deploy

Status: CHECKS PASS / DEPLOYMENT PENDING.
Recovereddb5e52bf3a5c5f3155a1830a7f266f90b7c71d97, original feat/m0-combat-core-20260927 /PR#1 open/no merge. Sourcee0b227f3/3909e46f/e72bb33b and docs44a08d1c/d1cfa3c0/db5e52bf retained. Latest baseline Actions37186750718 FAILURE.

## Work delta — tests/docs only
Initial132/136: three stale display-size expectations72×96 while actual presenter correctly produced108×144; actual Arena label mock lacked setVisible. Updated only three tests to latest contract, including real applyFrame ally a1/enemy e2 formal marker+label hidden, no-art marker+label visible, formal unavailable→placeholder visible, unchanged snapshot and projected actor position. No production source change, no art/asset/master change, no gameplay/AI/Tier/shard/reward/save change.
Lower card production contain/.98/centered framing retained with portrait/name/Type. Arena visible formal sprite retires both circle/ring and old A/E/name/status floating label; dedicated HUD/telegraph/damage/critical/skill systems untouched. Presenter max-dimension fit72×descriptor.scale, descriptor scale2, frame96×128 →108×144. Origin[.5,691/724] unchanged; gameplay x/y remains untouched.4-frame2.5fps/1.6s accepted breathing sheet retained. Encoded PNG/dimensions/decoded/cache/lazy-load delta0.

## Targeted evidence
node --test --test-reporter=tap tests/lushu*.test.js tests/asset*.test.js tests/collection*.test.js tests/team*.test.js tests/viewportSync.test.js tests/routeOwnership.test.js tests/lazyBattleRuntime.test.js tests/battleLabRuntime.test.js tests/preBattleGate.test.js tests/appRouteReset.test.js tests/hudCardLayout.test.js →136/136 PASS.
Asset guard40files148075bytes /npm run build /git diff --check PASS. Existing large-chunk advisory unchanged. No full local regression; standard CI workflow unchanged.
Existing missing Hit/Cast/KO test and real bounded hit-event run retain formal sprite visible; KO hp=0 selects battleKo with static-idle fallback/alpha.35. Existing future formal KO slot and custom descriptor test selects state art rather than idle fallback without a new PNG. Four frame/pause/resume/cleanup/facing/viewport/cache guards PASS.
Build index-CwYMc66v.js /index-C8gqOBF1.css /battleRuntime-BjvHkh0h.js.

## Release pending
Push tested tests/docs checkpoint, verify Actions/Pages/public JS/CSS/battle chunk/PNG fingerprints; inspect Team portrait whole head/horns+name+Type and real Arena108×144/no formal labels/no circles/placeholder fallback. Engineering final status ENGINEERING PASS / PLAYER SMOKE PENDING.

## Phone smoke / STOP
Full head/horns in lower card; name+Type retained; no A/E/name floating text over formal鹿蜀;1.5× larger complete battle body; no old dot/ring; graybox-only actors retain placeholders; facing/idle/Hit/KO/BACK stable. No formal Hit/KO/Cast, new characters, preview/Detail animation, scenic background,VFX/audio/Chapter2. Stop for player device acceptance; no global hard-rule promotion.
