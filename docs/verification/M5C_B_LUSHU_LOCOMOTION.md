# Lushu Locomotion — 2026-10-08

## Executable checkpoint
Recovered latest authoritative feature HEAD `864007fc6fd75cf77a1446521f47d30d407c5b4d` (newer than handoff959f0b1), PR #1 open. Latest explicit player handoff approves `lushu_move_clean_strip.png` and authorizes only P1 runtime integration; it supersedes pending-art-review pointers. No main merge.

Source transparent RGBA PNG2652×626,1176581bytes, SHA256 `d67fffa5662dacf8cfa94af3e3a16e44518a0b9f2c18204b9b5305b72d2b70a8`.
Four663×626 cells retain approved order. All share hoof bottom593. One common crop(37,34,630,593), uniform resize94×89 and offset(1,36) into each96×128 cell. No per-frame tight crop/translation, redraw, new pose, interpolation or GIF. Transparent cell side columns prevent neighboring frame bleed. Runtime hoof bottom125 matches accepted idle F1; small authored compression in F2 preserved. Common crop union retains head/horns/face/weapon/single tail. Wide, leaned locomotion silhouette is preserved rather than distorted to imitate upright idle proportions.

Runtime `public/assets/characters/lushu/battleMove-4f.png`:384×128 RGBA,54317bytes,196608decoded bytes; SHA256 `6ecceda53ceb1ed23fbbe2c75166c65b365af2ee23f3122d7531165ed1beff74`.
P1 `lushu.battleMove` descriptor:4×96×128,9fps,loop,staticFrame0,origin[.5,691/724],scale2. Frame canvas display108×144 is unchanged from idle. Idle PNG/descriptor, portraits, identity and all P2/P3 assets unchanged.

## Ledger / contract
Preflight: manifest/catalog descriptor supplies optional battleMove; encounterAssetKeys must load it before presenter can select it. Existing nine required slots stay unchanged; battleMove is optional like authored battleCast. Shared renderer selects authored data, never character ID.
Movement is derived from copied authoritative X/Y displacement only. Duplicate simulation time retains previous moving state/stride (sub-step/paused render); a subsequent unchanged-position simulation tick returns idle. KO never plays move; loaded reaction/inspection priority remains existing behavior; missing move falls back to authored static idle. Reduced motion freezes moveF1. No combat coordinate/speed/state mutation.

TDD RED: new move slot resolved placeholder and real presenter remained idle while moving (3/3 failed). GREEN:3/3 move tests pass. Direct61/61 PASS: assetManifest, formalCatalog, teamBattle, assetPresenter, lushuIdle, battleHud, arenaProjection, assetGuard, lushuMove, assetResolver, assetDescriptors, assetIntegration. Only stale guard inventory46→47 updated. Guard47files428346bytes PASS; build/diff PASS. Existing bundle-size advisory only; no unrelated local full suite.

Independent bounded code review: no Critical/Important finding. Minor deferred: descriptor-only future Move sources are not loaded unless also supplied through assets.battleMove; current P1 supplies both, so no current blocker. Pixel/source fidelity and hoof bounds verified by executor; deployed/browser evidence remains the next release step; subjective art review stays player-owned.

Pending: feature push/Pages/public fingerprints and technical runtime evidence, then docs closure. No subjective final art acceptance claimed.
Player smoke after release: P1 moves left/right/up/down, visibly cycles four poses, stops to static idle, keeps ground anchor and expected readability. Do not start P2/P3 motion/action/VFX/next character.
