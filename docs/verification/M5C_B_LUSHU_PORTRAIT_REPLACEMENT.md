# P1 鹿蜀 PortraitSquare Replacement — 2026-10-07

**Executable checkpoint — public deployment verification pending.**

## Scope / asset
Recovered feature HEAD `17fc88bb526187b6d68e2bc425480064c25a8f4d`, PR #1. Player supplied approved replacement JPEG (1254×1254, 367379 bytes, SHA256 `6782b63fe56a65132c1ffb5b9eb7bdbff072b6c57ab544aa1ac16c7170e669d4`). Full source composition retained: no additional crop/redraw; RGBA LANCZOS resize to128×128 optimized PNG.

Replacement: `public/assets/characters/lushu/portrait.png`,128×128,35172 bytes, SHA256 `beb57539d9b115517cf3fea07ec1fb60abb46c52f4bc53b14676406092952351`. Old portrait23816 bytes, SHA256 `235e95ae32fa19232877996b07ebfe283ff94577b049b1b00a6877f44edaa87f`. New source is visibly head-dominant compared with the old bust composition. Final phone art acceptance stays player-owned.

Production delta is PNG replacement plus manifest bytes only. P1 portraitSquare resolves `lushu.portrait`; collectionArt remains `lushu.identity`144×192; battleIdle remains `lushu.battleIdle`, single static F1 descriptor. No catalog/loader/UI/layout/mirror/projection/gameplay changes; all other assets unchanged.

## Executable checks
56/56 PASS: assetManifest, formalCatalog, assetMenu, collectionView, teamView, battleHud, assetGuard, assetPresenter, lushuPresentationCorrection. Guard46 files374029 bytes PASS. Build/diff PASS. No tests changed or broad local suite run.

## Surfaces / stop
Consumers: Battle HUD ally/enemy portraits, Team lower compact roster/bench, Collection grid and equivalent portraitSquare consumers. Team upper and Collection Detail remain collectionArt; Arena remains battleIdle. Shared enemy mirror retained.

Next: feature-branch Pages deployment, public PNG/bundle byte comparison and bounded surface technical verification; then docs closure. No main merge or later character/motion/action/VFX work. Player phone checks Collection cards, Team lower cards and both HUD sides only.

Actions #807 /37584252905 at `0e825597cee7ab0773a3e35285eff708e1921584` caught existing RGBA PNG color-type assertion (RGB2 vs RGBA6). Re-encoded identical resized color pixels as RGBA with opaque alpha to preserve the existing contract; no source composition/white background/test expectation changes. Direct56/56 and build pass after correction.
