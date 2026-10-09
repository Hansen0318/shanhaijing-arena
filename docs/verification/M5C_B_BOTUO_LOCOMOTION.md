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
Pending final review, source checkpoint push, Actions/Pages, public bundle/PNG match and bounded technical browser verification. Do not claim engineering closure until those complete. Public/iPhone art/readability acceptance belongs to player.

Stop after P2 release. No P3 locomotion, Basic/actions/VFX/next character/main merge.
