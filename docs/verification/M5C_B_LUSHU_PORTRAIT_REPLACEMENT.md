# P1 鹿蜀 PortraitSquare Replacement — 2026-10-07

**ENGINEERING PASS / PLAYER SMOKE PENDING**

## Scope / asset
Recovered feature HEAD `17fc88bb526187b6d68e2bc425480064c25a8f4d`, PR #1. Player supplied approved replacement JPEG (1254×1254, 367379 bytes, SHA256 `6782b63fe56a65132c1ffb5b9eb7bdbff072b6c57ab544aa1ac16c7170e669d4`). Full source composition retained: no additional crop/redraw; RGBA LANCZOS resize to128×128 optimized PNG.

Replacement: `public/assets/characters/lushu/portrait-face.png`,128×128,35172 bytes, SHA256 `beb57539d9b115517cf3fea07ec1fb60abb46c52f4bc53b14676406092952351`. Old portrait23816 bytes, SHA256 `235e95ae32fa19232877996b07ebfe283ff94577b049b1b00a6877f44edaa87f`. New source is visibly head-dominant compared with the old bust composition. Final phone art acceptance stays player-owned.

Production delta is PNG replacement plus manifest path/bytes; two stale filename test assertions updated. P1 portraitSquare resolves `lushu.portrait`; collectionArt remains `lushu.identity`144×192; battleIdle remains `lushu.battleIdle`, single static F1 descriptor. No catalog/loader/UI/layout/mirror/projection/gameplay changes; all other assets unchanged.

## Executable checks
63/63 PASS: assetManifest, formalCatalog, assetMenu, collectionView, teamView, battleHud, assetGuard, assetPresenter, lushuPresentationCorrection, lushuTeamBattleCorrection. Guard46 files374029 bytes PASS. Build/diff PASS. Two stale filename assertions updated; no broad local suite run.

## Surfaces / stop
Consumers: Battle HUD ally/enemy portraits, Team lower compact roster/bench, Collection grid and equivalent portraitSquare consumers. Team upper and Collection Detail remain collectionArt; Arena remains battleIdle. Shared enemy mirror retained.

Feature-branch Pages deployment, public PNG/bundle byte comparison and bounded surface technical verification complete. No main merge or later character/motion/action/VFX work. Player phone checks Collection cards, Team lower cards and both HUD sides only.

Actions #807 /37584252905 at `0e825597cee7ab0773a3e35285eff708e1921584` caught existing RGBA PNG color-type assertion (RGB2 vs RGBA6). Re-encoded identical resized color pixels as RGBA with opaque alpha to preserve the existing contract; no source composition/white background/test expectation changes. Direct56/56 and build pass after correction.

Public #808 succeeded609/609 and byte fingerprints matched, but browser retained old same-URL PNG (Pages max-age600). Bounded delivery correction uses new `portrait-face.png` path with the same `lushu.portrait` key; only two filename expectations updated, no loader/cache/UI architecture change. Old runtime portrait file removed. Public surface verification must use the new filename.

## Final release / public evidence
Tested/deployed source SHA `760e2d7d6a27ebfe04755cf410da793fd0a29589`, exact tested tree `3624c8c8114abaa3ff9d447b0df6388177ca0075`. Final HEAD is this docs-only closure commit, available by resolving active feature ref. No main merge.
Actions #809 /37584915664 at tested source: CI609/609, Build112672739177 and Pages112672856671 SUCCESS.
https://github.com/Hansen0318/shanhaijing-arena/actions/runs/37584915664
https://hansen0318.github.io/shanhaijing-arena/

Public/local files byte-identical:
- index-C4Y886HL.js SHA256 `f37fe3a879428054aac6d4e3d85ecdf20711750267f64e497d71185c9d17d32f`
- index-DcqtNRF0.css SHA256 `a20af2bfa9f5a700823772a0d7e0391b1760c35336de8cc621b36e54bad501da`
- battleRuntime-BiuQNsPj.js SHA256 `8c1f7cbb58e2f32c482e3230087fe1441d2268655bc8b4255672409cee9523c6`
- portrait-face.png SHA256 `beb57539d9b115517cf3fea07ec1fb60abb46c52f4bc53b14676406092952351`

Public DOM confirms entry index-C4Y886HL.js and P1 Collection/Team bench `lushu.portrait` resolves new portrait-face.png complete128×128. Root1363×936 has equal client/scroll dimensions. New portrait visibly head-dominant and fills compact square similarly to accepted P2/P3; subjective final ratio remains player-owned. Actual public initial Battle HUD shows new P1 portrait on both sides, ally original/enemy horizontal mirror, with portrait/HP inside existing card bounds. Actual Arena P1/P2/P3 sprites/HP/HUD layout unchanged. This bounded initial HUD check does not claim sustained cloud combat or phone acceptance.

Collection Detail and Team upper remain `lushu.identity` complete144×192, independent of portrait. Protected asset public hashes at #808 (unchanged in #809 production delta) matched build: P1 identity SHA256 `bf82ac4f64f517a5503f6a3cabc53e046df8ef9ce16bf9ba5dba8d6567f497a1`, P1 battleIdle SHA256 `ca123eb6eb15c1f32fab2c9d732d40d7db279ed2e4332a1043172d3fb0bef327`; all P2/P3 PNGs byte-identical. Catalog/descriptors/projection/UI/gameplay files identical to recovered HEAD. Independent bounded production diff review clear; final manifest path/test filename change manually reviewed.

No technical blocker. Player phone smoke only: Collection P1 card, Team lower P1 roster card, allied/enemy P1 Battle HUD. Check desired head ratio and face readability on actual device. No later art/motion/action/VFX/character gate opened.
