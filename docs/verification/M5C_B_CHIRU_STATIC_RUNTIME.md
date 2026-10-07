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

## Release pending
Tested source SHA, Actions, Pages and public byte fingerprints to be recorded after deployment. Player-owned smoke: P3 Collection grid/detail, Team Select upper/lower, Arena and both HUD sides. No later art/motion gate authorized.
