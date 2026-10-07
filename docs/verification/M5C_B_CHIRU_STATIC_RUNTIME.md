# P3 Chiru Static Runtime Integration — 2026-10-07

## Scope and recovery
Recovered feature HEAD `1e7013ef84a536071a1996c866228b1a37928d37`, PR #1. Approved ZIP contains exactly three unchanged PNGs. Only manifest/catalog P3 presentation and directly impacted test expectations changed. No common runtime, layout, gameplay or P1/P2 production changes. No main merge.

| Asset | Dimensions | Bytes | SHA256 |
| --- | --- | --- | --- |
| portrait.png | 128×128 | 39490 | bc2568ddf8b6d80c3f3f818dce646b66515dd7f0c130fa4bd02249333e44b245 |
| identity.png | 160×192 | 53023 | 304a96ea0e9a215ad387708935e80bbd915722d5743ab2d8d4422e2963496a0a |
| battleIdle.png | 160×160 | 44131 | a965600f0b9e873e652a6d6048a89d38a0d078d92cb8c2622cdc003ae4646d5d |

## Engineering checks
New P3 resolution test RED (placeholder.portrait) → GREEN. Targeted81/81 PASS: assetManifest, formalCatalog, assetMenu, collectionView, teamView, teamBattle, battleHud, assetPresenter, teamMatchup, lushuIdle, lushuPresentationCorrection, lushuTeamBattleCorrection, teamLayout, assetGuard, botuoIdleRuntime. Guard46 files /362673 bytes. Build/diff PASS. Existing chunk-size advisory only.
Additional direct shared presenter check exposed stale tests predating the authoritative idle withdrawal. One diagnostic npm test reproduced ten stale failures (four-frame expectations, invalid future fixture staticFrame3, old inventory and P3 placeholders); updated only those fixtures/expectations. Production P1/P2 art/descriptors unchanged. Existing synthetic future multi-frame KO fixture remains explicit, independent of static current catalog.

## Surface contract
P3 compact roster/grid/HUD → chiru.portrait; Team Select upper / Collection Detail → chiru.identity; Arena → chiru.battleIdle. Descriptor one region0,0,160,160; origin[.5,1], scale2 (canonical), staticFrame0. Transparent source padding supplies hover above bottom anchor; no actor-coordinate offsets or motion. All times resolve the same frame. Shared mirror/overhead HP/layout code unchanged and targeted contract tests PASS. No idleBreath/GIF/F1–F4 P3 assets.

## Release closure — ENGINEERING PASS / PLAYER SMOKE PENDING
Tested/deployed source SHA `687b2cfe8a9a8cca943448576c732b312a947380`; exact source tree `f3cb4995667bf5f55374f98177b8b11327e16242` equals local checked build tree. CLI credential unavailable: authenticated connector saved equivalent blobs/tree, verified against local Git hashes. Complete WORK_PROGRESS history preserved. Independent bounded review found no important defects or unjustified edits.

Actions #792 /37553399048: CI608/608, build112573975388 and Pages deploy112574089002 SUCCESS.
https://github.com/Hansen0318/shanhaijing-arena/actions/runs/37553399048
https://hansen0318.github.io/shanhaijing-arena/

Public index names match local build; downloaded three bundles and three P3 PNGs compare byte-for-byte equal to dist. Public fingerprints:
- index-fdOkQv-K.js: `51353c3ff1e052a34b00be1983431a979604846e17b51b79ae8662a15911aba6`
- index-DcqtNRF0.css: `a20af2bfa9f5a700823772a0d7e0391b1760c35336de8cc621b36e54bad501da`
- battleRuntime-ZxZ2Uv6j.js: `b98ab573ea582af6f6e9d7cc7cdd2e78695640695ecb511e7aa093530a4fc582`
- P3 PNG fingerprints equal asset table above.

Public DOM: Collection P3 portrait loads128×128, Detail identity160×192; Team upper ally/enemy identity160×192 complete, animation:none, ally transform:none, enemy horizontal mirror matrix(-1,0,0,1,0,0). Lower portrait128×128 complete. No root horizontal overflow in Collection and no vertical overflow in Team at cloud viewport. No P3 placeholder captions on formal surfaces.

Executable real AssetPresenter with Phaser Frame confirms P3 Arena texture chiru.battleIdle, source region0,0,160,160 unchanged at0/.4/.8/1.2/90s, origin[.5,1], current canonical display144×144, fixed authoritative actor positions, no snapshot mutation. Shared HUD mirror/overhead HP/static-menu/layout contracts covered by targeted tests; identical deployed runtime bytes establish the public contract. This does not claim phone visual acceptance or inspect hidden Phaser state through browser APIs.

Final HEAD is this documentation-only closure commit (resolve the feature branch ref); tested source SHA above is the release artifact authority. Player-owned smoke: P3 Collection grid/detail, Team Select upper/lower, Arena and both HUD sides. No technical blocker. STOP; no breathing/locomotion/action/Hit/KO/VFX/next character/main merge.
