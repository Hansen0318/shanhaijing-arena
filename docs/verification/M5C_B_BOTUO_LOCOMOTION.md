# P2 Botuo locomotion — 2026-10-10

## Executable checkpoint
Recovered authoritative feature source6ec64477b2b190c072d1b226368dc380e3977ba9, PR #1 open/unmerged, latest Actions37996790319 SUCCESS. The user handoff is the full execution plan/spec; no design rediscovery. Existing isolated linked worktree reused. Player approved the strip and Chat normalization; this runtime gate is not yet player verified.

Approved attachment `botuo_battleMove-4f_approved(1).png` matches the exact canonical PNG and is copied without export/crop/resize to `public/assets/characters/botuo/battleMove-4f.png`. Dimensions640×160 RGBA, four160×160 cells,158292bytes, decoded409600bytes,SHA256`fd9083cacfc38d1eb1fd17e5749615e9a51781a83f0d3dfa3759c1de41c5f26b`.

Production delta: manifest botuo.battleMove with placeholder.battle fallback; P2 assets.battleMove and descriptor(x0/160/320/480,y0,width160,height160,fps12,looptrue,origin[.5,158/160],scale2,staticFrame0). Existing encounter loader already preloads assets.battleMove; shared presenter/displacement/facing/reduced playback needs no correction. P2 moveSpeed1.45, P1 descriptor18fps/gameplay2.05 and P3 static fallback untouched. No gameplay/projection/AI/HUD/HP/telegraph/damage/control/art changes outside the new PNG.

## Ledger and evidence
- TDD: six new P2 tests failed before data integration (Move resolved placeholder/no authored descriptor; actual moving presenter/session showed only idle; file absent). After data+copy:6/6 PASS. Timing samples are offset just beyond frame boundaries to avoid floating-point subtraction rounding; no production cadence workaround.
- Minimum impacted command: `node --test tests/botuoMove.test.js tests/lushuMove.test.js tests/assetManifest.test.js tests/formalCatalog.test.js tests/assetPresenter.test.js tests/assetDescriptors.test.js tests/assetIntegration.test.js tests/assetGuard.test.js` →50/50 PASS.
- Stale expectations only: remove P2 from Lushu's unauthored-static list (P3 still protected); guard inventory47→48 and actual bytes586638. No test rewrite.
- Real presenter: normal12/reduced6fps F1→F2→F3→F4→F1, all four distinct frames; duplicate simulation time keeps stride; Y-only up/down and negative/positive X select Move with shared mirror. Subsequent unchanged-position tick immediately selects accepted static idle. Origin and144×144 canvas/ground position stay exact.
- Real BattleSession22×.05s movement/stop in both modes: all four frame keys, snapshots equal around each render, authoritative x/y untouched by presenter, moveSpeed1.45 unchanged. P1 locomotion tests remain PASS, P3 stays static. Decorative reduced playback stays static.
- Native PNG inflation/unfilter regression verifies exact bytes/hash/header and each160×160 cell independently: transparent left/right columns, bottom padding, same ground bottom and four distinct pixel hashes. Approved source fidelity + disjoint rectangles exclude neighboring-body bleed.
- Asset guard48files586638bytes PASS; build PASS (existing >500kB chunk advisory only); git diff --check PASS. No unrelated local broad regression.
- Preflight interfaces: manifest+catalog supply optional Move key to existing encounter loader; loaded descriptor to existing state-aware presenter; no incompatible interface. Ruling: user's minimum-check scope overrides generic skill full-suite default, matching AGENTS risk-based rule; configured CI remains unchanged.

## Release / browser evidence
Status **ENGINEERING PASS / PLAYER PHONE SMOKE PENDING**. Tested/deployed source `ebbbf0457d35538a4118df665d1bef13781881da`, tree`2a1f47f5d12930ba44299e6bdf2493bfe006c431`; local checkpointed9da13 has identical tree. Feature pushed with expected-head fast-forward lease; PR #1 stays open/unmerged. Final HEAD is the containing docs-only closure (resolve feature ref), which changes no tested runtime bytes.

Independent fresh review found no Critical/Important/Minor issues; independently6/6 P2 tests and whitespace PASS. Reviewer declined live browser/network decoding, fingerprints and phone art acceptance; executor supplies browser/public evidence below, player owns final visual acceptance. Skill reference resources were unavailable; main skill instructions and exact user plan/spec governed review. No design/implementation deviation beyond user-authorized minimal test scope.

Actions #845 /37998245333 SUCCESS: Build114049643377 (configured CI621/621, guard48files586638bytes, build PASS) and Pages114049757137 SUCCESS. No unrelated local full-suite run. Build only existing chunk-size advisory. Production diff remains only new PNG + manifest/catalog; shared presenter/playback/Arena/projection/gameplay/P1/P3 assets untouched.

Fresh public HTML and all four responses are byte-identical to local tested dist:

| Public file | Bytes | SHA256 |
| --- | ---: | --- |
| assets/index-AfZn4on4.js | 94295 | a49ddaac4951372f048bea6cabd5674658502a6261b3199e0e4a7b0dc6371d38 |
| assets/battleRuntime-CuckLgQE.js | 1445032 | e5ec44da23443eea45a080c47342e54bb7132aad2c05f0978cacce18d1e485b4 |
| assets/index-DcqtNRF0.css | 22943 | a20af2bfa9f5a700823772a0d7e0391b1760c35336de8cc621b36e54bad501da |
| assets/characters/botuo/battleMove-4f.png | 158292 | fd9083cacfc38d1eb1fd17e5749615e9a51781a83f0d3dfa3759c1de41c5f26b |

Public Battle Lab normal lineup with enemy slot1=P2 and skip countdown loaded actual Phaser/new asset. Screenshots across running ticks show distinct P2 poses (including opposite plant/bracer silhouette), not an entire-sheet display, with enemy P2 horizontal mirror; P1 locomotion and P3 static identity remain visible. Shared ally-blue/enemy-red overhead HP, side portraits/HP, joystick/HSA controls retained. Canvas1120×540; DOM scroll/client dimensions equal1363×936 (no outer overflow); DOM entry index-AfZn4on4.js. Browser console sampling showed only browser-extension metadata messages, no sampled app-origin error. No frame bleed/size discontinuity seen in these observations. Stable origin/cell geometry and ground are also measured mechanically: decoded per-cell bboxes F1(6,4,154,156), F2(14,10,145,156), F3(10,4,150,156), F4(14,4,146,156); occupied bottom155 for all, transparent side/bottom padding. Nothing was re-exported.

Exact four-frame order/cadence, XY-only movement, positive/negative mirror, immediate stop, ordinary reduced fallback and snapshot purity are asserted through actual presenter/session tests, not inferred from isolated screenshots. Forced reducedMotion=true cycles all four at6fps versus12fps normal; browser tooling offers no OS media-emulation capability, so this is not a claim of forced OS/browser preference. Telegrapher/damage text/HP/HUD source remains byte-unchanged; recorded baseline evidence reused rather than replaying unrelated battle flows. No technical release blocker; phone art/readability acceptance remains pending.

Only player smoke now: move P2 left/right/up/down, observe changing leg/arm poses rather than single-pose sliding and stable ground/size; stop→static idle; with phone Reduce Motion enabled still observe multi-frame travel at slower cadence. No unrelated screen replay required.

Stop after P2 release. No P3 locomotion, Basic/actions/VFX/next character/main merge.
