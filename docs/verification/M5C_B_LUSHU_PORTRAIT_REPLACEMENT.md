# P1 鹿蜀 PortraitSquare Replacement — 2026-10-07

**Executable checkpoint — public deployment verification pending.**

## Scope / asset
Recovered feature HEAD `17fc88bb526187b6d68e2bc425480064c25a8f4d`, PR #1. Player supplied approved replacement JPEG (1254×1254, 367379 bytes, SHA256 `6782b63fe56a65132c1ffb5b9eb7bdbff072b6c57ab544aa1ac16c7170e669d4`). Full source composition retained: no additional crop/redraw; RGB LANCZOS resize to128×128 optimized PNG.

Replacement: `public/assets/characters/lushu/portrait.png`,128×128,31664 bytes, SHA256 `93c4e97a1b005573c8be10d127a7e8bfd1fbba0058e26ceb607026cb0f5f2dde`. Old portrait23816 bytes, SHA256 `235e95ae32fa19232877996b07ebfe283ff94577b049b1b00a6877f44edaa87f`. New source is visibly head-dominant compared with the old bust composition. Final phone art acceptance stays player-owned.

Production delta is PNG replacement plus manifest bytes only. P1 portraitSquare resolves `lushu.portrait`; collectionArt remains `lushu.identity`144×192; battleIdle remains `lushu.battleIdle`, single static F1 descriptor. No catalog/loader/UI/layout/mirror/projection/gameplay changes; all other assets unchanged.

## Executable checks
36/36 PASS: assetManifest, formalCatalog, assetMenu, collectionView, teamView, battleHud, assetGuard. Guard46 files370521 bytes PASS. Build/diff PASS. No tests changed or broad local suite run.

## Surfaces / stop
Consumers: Battle HUD ally/enemy portraits, Team lower compact roster/bench, Collection grid and equivalent portraitSquare consumers. Team upper and Collection Detail remain collectionArt; Arena remains battleIdle. Shared enemy mirror retained.

Next: feature-branch Pages deployment, public PNG/bundle byte comparison and bounded surface technical verification; then docs closure. No main merge or later character/motion/action/VFX work. Player phone checks Collection cards, Team lower cards and both HUD sides only.
