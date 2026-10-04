# M5C-B — Lushu third correction executable validation / deploy

Status: ENGINEERING PASS / PLAYER SMOKE PENDING.
Recovereddb5e52bf3a5c5f3155a1830a7f266f90b7c71d97, original feat/m0-combat-core-20260927 /PR#1 open/no merge. Sourcee0b227f3/3909e46f/e72bb33b and docs44a08d1c/d1cfa3c0/db5e52bf retained. Latest baseline Actions37186750718 FAILURE.

## Work delta — tests/docs only
Initial132/136: three stale display-size expectations72×96 while actual presenter correctly produced108×144; actual Arena label mock lacked setVisible. Updated only three tests to latest contract, including real applyFrame ally a1/enemy e2 formal marker+label hidden, no-art marker+label visible, formal unavailable→placeholder visible, unchanged snapshot and projected actor position. No production source change, no art/asset/master change, no gameplay/AI/Tier/shard/reward/save change.
Lower card production contain/.98/centered framing retained with portrait/name/Type. Arena visible formal sprite retires both circle/ring and old A/E/name/status floating label; dedicated HUD/telegraph/damage/critical/skill systems untouched. Presenter max-dimension fit72×descriptor.scale, descriptor scale2, frame96×128 →108×144. Origin[.5,691/724] unchanged; gameplay x/y remains untouched.4-frame2.5fps/1.6s accepted breathing sheet retained. Encoded PNG/dimensions/decoded/cache/lazy-load delta0.

## Targeted evidence
node --test --test-reporter=tap tests/lushu*.test.js tests/asset*.test.js tests/collection*.test.js tests/team*.test.js tests/viewportSync.test.js tests/routeOwnership.test.js tests/lazyBattleRuntime.test.js tests/battleLabRuntime.test.js tests/preBattleGate.test.js tests/appRouteReset.test.js tests/hudCardLayout.test.js →136/136 PASS.
Asset guard40files148075bytes /npm run build /git diff --check PASS. Existing large-chunk advisory unchanged. No full local regression; standard CI workflow unchanged.
Existing missing Hit/Cast/KO test and real bounded hit-event run retain formal sprite visible; KO hp=0 selects battleKo with static-idle fallback/alpha.35. Existing future formal KO slot and custom descriptor test selects state art rather than idle fallback without a new PNG. Four frame/pause/resume/cleanup/facing/viewport/cache guards PASS.
Build index-CwYMc66v.js /index-C8gqOBF1.css /battleRuntime-BjvHkh0h.js.

## Release / executable inspection
Source checkpoint `bcb8758dc66d8121f23f716155a8c76d81b8ef8f`; tested tree `7ddf3add45ed54ec48b4128e33c93678797971ec`.
Actions [37186983907](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/37186983907): completed SUCCESS; build and deploy jobs SUCCESS. Original feature branch / PR #1 retained; no main merge.
Public https://hansen0318.github.io/shanhaijing-arena/ responds with exact build bytes:

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| index.html | 1491 | d01b5f6846206f29680fe7973e8ca0da7f3f271acf2c11f2baa93b6d02a30dab |
| assets/index-CwYMc66v.js | 92021 | c83fc11f44feec0ca4d0640df8165732c125a2b328336793e8097b04c09275e4 |
| assets/index-C8gqOBF1.css | 20872 | 144e84f74485baf985c28611bf861ccbfcb6dc1b52b29bae70f112e9b12a1186 |
| assets/battleRuntime-BjvHkh0h.js | 1443039 | 324e77d5ab74fc1c6a439722efd607a8b76c9489242572d939cadd0654e57364 |
| assets/characters/lushu/portrait.png | 23816 | 235e95ae32fa19232877996b07ebfe283ff94577b049b1b00a6877f44edaa87f |
| assets/characters/lushu/identity.png | 35708 | bf82ac4f64f517a5503f6a3cabc53e046df8ef9ce16bf9ba5dba8d6567f497a1 |
| assets/characters/lushu/battleIdle-4f.png | 70848 | ca123eb6eb15c1f32fab2c9d732d40d7db279ed2e4332a1043172d3fb0bef327 |

Actual deployed browser Team Select: portrait loaded; computed contain / matrix(.98) / centered origin; entire head/horns visible, 鹿蜀 name and aria-label Type: Speed retained. Team BACK returned Stage with campaign root scrollTop=0. No production correction needed.
Actual deployed Battle Lab: duplicate ally 鹿蜀 plus enemy 鹿蜀, battleHit visual inspection with countdown skipped. All three formal figures complete and enlarged, no A1/A2/E2/name/status labels, no solid circle/white ring; A3/E1/E3 graybox actors retain circle/identity labels. HP portraits and skill controls intact. No initial HUD clipping. Missing-Hit inspection visibly retained formal sprite. Pause→Resume→Pause control state verified; Exit→Lab removed canvas (0) and game host. Normal Landing returned without Lab/canvas.
Cloud viewport 1363×936; clock stayed 01:30. Continuous physical movement/breathing and actual device scale/overlap are not claimed from this browser. Four-frame/frozen-clock/resume/facing, actual hp=0 KO static-idle fallback and future formal KO replacement are covered by the targeted executable tests above. Phone smoke remains pending; no real KO PNG produced.

## Phone smoke / STOP
Full head/horns in lower card; name+Type retained; no A/E/name floating text over formal鹿蜀;1.5× larger complete battle body; no old dot/ring; graybox-only actors retain placeholders; facing/idle/Hit/KO/BACK stable. No formal Hit/KO/Cast, new characters, preview/Detail animation, scenic background,VFX/audio/Chapter2. Stop for player device acceptance; no global hard-rule promotion.
