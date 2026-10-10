# P3 Chiru locomotion — 2026-10-10

## Executable checkpoint
Recovered feature HEAD `ecddfb29f306fd2cc52884e50efd9c6dfa70b5ee`, PR #1 open/unmerged, latest preceding Actions38026702980 SUCCESS. Player explicitly approved this exact safe strip for runtime integration; this supersedes the earlier integration-authorization-pending text. P1/P2 are player verified. No design or normalization repeated.

Approved attachment `chiru_battleMove-4f_safe(1).png` copied byte-for-byte to `public/assets/characters/chiru/battleMove-4f.png`:640×160 RGBA PNG, four160-square cells,112708bytes,SHA256`d0839a1630f21d1b59dd0363c35e94886d3983290cac6e339f59c4afa93bc74f`. Exact alpha margins L/T/R/B: F1 26/43/27/4,F2 16/50/16/4,F3 12/55/12/4,F4 29/43/29/4. No re-export, resize, crop, recolor or new pose.

Only production code delta: manifest chiru.battleMove with placeholder.battle fallback; P3 assets.battleMove and descriptor(source chiru.battleMove,x0/160/320/480,y0,width160,height160,fps10,looptrue,origin[.5,1],scale2,staticFrame0). Existing loader/presenter/playback/projection unchanged. Aquatic Hover Humanoid F1 Neutral Hover→F2 Travel Lean→F3 Peak Drift→F4 Recovery, no walking or gameplay-position bob. Static idle/portrait/collection and P1/P2 assets untouched.

## Targeted evidence
Six new regressions RED before integration (missing asset/descriptor/static fallback), then6/6 GREEN. Full minimum impacted command: `node --test tests/chiruMove.test.js tests/botuoMove.test.js tests/lushuMove.test.js tests/assetManifest.test.js tests/formalCatalog.test.js tests/assetPresenter.test.js tests/assetDescriptors.test.js tests/assetIntegration.test.js tests/assetGuard.test.js` →56/56 PASS. Only stale P3-unauthored assertions removed from P1/P2 tests; guard count49files699346bytes. `node scripts/checkAssets.js` PASS; `npm run build` PASS (existing chunk-size advisory only); diff whitespace PASS.

Actual presenter verifies full four-frame normal10/reduced5fps cycles, multiple distinct frames/no single-frame sliding, duplicate simulation time preserves progression, Y-only movement, negative/positive X facing, next unchanged tick immediately static idle. Origin[.5,1],144×144 display size and exact projected position remain fixed. Native PNG inflation/unfilter verifies exact RGBA header/hash/bytes and per-cell margins, four distinct pixel hashes and occupied bottom155: independent safe cells/no neighboring-frame bleed.

Actual BattleSession22×.05s in both modes proves all four frames, movement→stop, snapshots equal before/after presenter and moveSpeed1.6 unchanged. P1 18fps/gameplay2.05 and P2 12fps/gameplay1.45 regressions PASS. Decorative reduced playback remains static. No gameplay coordinate or HUD/HP/telegraph/damage/control/layout changes. Final review, feature push, Actions/Pages and public verification pending. Stop after this release for player P3 phone smoke; no next gate/main merge.
