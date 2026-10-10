# P3 Chiru locomotion — 2026-10-10

## Executable checkpoint
Recovered feature HEAD `ecddfb29f306fd2cc52884e50efd9c6dfa70b5ee`, PR #1 open/unmerged, latest preceding Actions38026702980 SUCCESS. Player explicitly approved this exact safe strip for runtime integration; this supersedes the earlier integration-authorization-pending text. P1/P2 are player verified. No design or normalization repeated.

Approved attachment `chiru_battleMove-4f_safe(1).png` copied byte-for-byte to `public/assets/characters/chiru/battleMove-4f.png`:640×160 RGBA PNG, four160-square cells,112708bytes,SHA256`d0839a1630f21d1b59dd0363c35e94886d3983290cac6e339f59c4afa93bc74f`. Exact alpha margins L/T/R/B: F1 26/43/27/4,F2 16/50/16/4,F3 12/55/12/4,F4 29/43/29/4. No re-export, resize, crop, recolor or new pose.

Only production code delta: manifest chiru.battleMove with placeholder.battle fallback; P3 assets.battleMove and descriptor(source chiru.battleMove,x0/160/320/480,y0,width160,height160,fps10,looptrue,origin[.5,1],scale2,staticFrame0). Existing loader/presenter/playback/projection unchanged. Aquatic Hover Humanoid F1 Neutral Hover→F2 Travel Lean→F3 Peak Drift→F4 Recovery, no walking or gameplay-position bob. Static idle/portrait/collection and P1/P2 assets untouched.

## Targeted evidence
Six new regressions RED before integration (missing asset/descriptor/static fallback), then6/6 GREEN. Full minimum impacted command: `node --test tests/chiruMove.test.js tests/botuoMove.test.js tests/lushuMove.test.js tests/assetManifest.test.js tests/formalCatalog.test.js tests/assetPresenter.test.js tests/assetDescriptors.test.js tests/assetIntegration.test.js tests/assetGuard.test.js` →56/56 PASS. Only stale P3-unauthored assertions removed from P1/P2 tests; guard count49files699346bytes. `node scripts/checkAssets.js` PASS; `npm run build` PASS (existing chunk-size advisory only); diff whitespace PASS.

Actual presenter verifies full four-frame normal10/reduced5fps cycles, multiple distinct frames/no single-frame sliding, duplicate simulation time preserves progression, Y-only movement, negative/positive X facing, next unchanged tick immediately static idle. Origin[.5,1],144×144 display size and exact projected position remain fixed. Native PNG inflation/unfilter verifies exact RGBA header/hash/bytes and per-cell margins, four distinct pixel hashes and occupied bottom155: independent safe cells/no neighboring-frame bleed.

Actual BattleSession22×.05s in both modes proves all four frames, movement→stop, snapshots equal before/after presenter and moveSpeed1.6 unchanged. P1 18fps/gameplay2.05 and P2 12fps/gameplay1.45 regressions PASS. Decorative reduced playback remains static. No gameplay coordinate or HUD/HP/telegraph/damage/control/layout changes. Final review, feature push, Actions/Pages and public verification pending. Stop after this release for player P3 phone smoke; no next gate/main merge.

## Release / public technical verification
Status **ENGINEERING PASS / PLAYER PHONE SMOKE PENDING**. Tested/deployed source `c3eba59f968c8ab542c093a517dc385833b41c95`, tree`7f9cfcc232001fd604d5130794d52ea420c7d3ce`. Remote commit tree equals local tested checkpoint. Final HEAD is the containing docs-only closure (resolve active feature ref); closure changes no runtime bytes. Expected-head fast-forward push only; PR #1 remains open/unmerged, no main merge.

Independent review: no findings, independently6/6 Chiru regressions and whitespace PASS. Actions #858 /38027107307 SUCCESS; Build114140172706 and Pages114140236037 SUCCESS. Configured CI627/627 PASS, guard49files699346bytes, build PASS. Local scoped56/56 as above; no unrelated local full-suite run. No shared runtime/source gameplay deviation.

Fresh public HTML and current JS/battleRuntime/CSS/PNG are byte-for-byte equal to tested dist. Old bundles retained locally by checkout are not referenced by current HTML and return404 after deploy; they were excluded from the current-build fingerprint.

| Public file | Bytes | SHA256 |
| --- | ---: | --- |
| index.html | 1491 | bdd966adcfd48b2a014ca8ccf8ed5983e83c254de4ebbf7405dcd120c274fc43 |
| assets/index-DcqtNRF0.css | 22943 | a20af2bfa9f5a700823772a0d7e0391b1760c35336de8cc621b36e54bad501da |
| assets/battleRuntime-CfPrL4jg.js | 1445032 | d44ef9e1617e96f4dc4a8c903ba870fd01d380cac7387eb1672d9378c8c2e956 |
| assets/index-vvdU3HUt.js | 94633 | 1ffa85d10ab2e274b8902cc2503eac4ef0181001399a7eb2235bd3a8256dc562 |
| assets/characters/chiru/battleMove-4f.png | 112708 | d0839a1630f21d1b59dd0363c35e94886d3983290cac6e339f59c4afa93bc74f |

Live public Battle Lab lineup P1/P3/P2 against P3/P1/P2 loaded index-vvdU3HUt.js and actual Phaser canvas1120×540. Selected ally P3 through HUD; held joystick input observed distinct upright/travel-lean/horizontal-drift poses across running ticks, followed by static idle on release; no fake ground steps or entire-strip rendering. Negative-X input produced left-facing presentation; enemy shared mirroring and original ally portrait orientation remained visible. Up/down control exercised, with exact Y-only switching/order also mechanically asserted. No neighboring-body bleed or sprite container-size discontinuity observed. Fixed144-square frame geometry/origin and position purity are measured in regression, not inferred from snapshots.

P1/P2 maintained their authored locomotion and static identities. Blue/red overhead HP and side HUD, heal/damage text and shared telegraph rings/lines were visible in combat. Buttons/joystick/layout unchanged; DOM scroll/client dimensions both1363×936 (no outer overflow). Console sample contained only browser-extension metadata errors, no sampled app-origin error.

Forced reducedMotion=true is verified through actual presenter and BattleSession: all four Move frames cycle at5fps, stop→static idle; normal10fps. This is not a claim of OS/browser preference emulation: the browser tool exposes no media-emulation capability. Exact cadence/full order/duplicate time/mirror/next-tick stop/snapshot purity are asserted by executable tests rather than guessed from isolated screenshots. Player iPhone smoke remains the final device/art acceptance.

No technical release blocker. Only player check: P3 left/right/up/down hover motion shows changing drift/fin/appendage poses rather than static sliding, facing correct, stable presentation anchor/size and release→accepted static idle; with Reduce Motion enabled still multi-frame at slower cadence. STOP; no combined archetype tuning, Basic/actions/VFX/Hit/KO/Cast/next character/main merge.
