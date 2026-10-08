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

## Release / public verification
Tested and deployed source SHA `6639367ca114d02f696f37b49d6a361d3291c237`; tree `f892d0a1a99800492d9f4ad759d9e6b177b57f2d`. Local verified checkpoint797db28 has the identical tree; connector commit preserves authoritative parent864007f and was fast-forward pushed with expected-head lease. PR #1 stays open; no main merge.

Actions #821 /37768071556 SUCCESS: Build job113280502721, Pages job113280642721; configured CI612/612, asset guard47files428346bytes PASS, build PASS. No additional unrelated local full regression run.

Public `https://hansen0318.github.io/shanhaijing-arena/` HTML selects index-CCyvbPQ8.js and index-DcqtNRF0.css. Fresh public responses for all three bundles + Move PNG were byte-identical to local tested dist:

| File | Bytes | SHA256 |
| --- | ---: | --- |
| index-CCyvbPQ8.js | 93944 | 348cafccc6dd653f8ed42b567746381ee16c5d89798a8b33d571a9a5ecafb307 |
| battleRuntime-C2UEmRw8.js | 1444866 | 8036132ae5f4deff909b793a39a5f814ecbce34e681d9bc9e2d869ddf434fcaf |
| index-DcqtNRF0.css | 22943 | a20af2bfa9f5a700823772a0d7e0391b1760c35336de8cc621b36e54bad501da |
| characters/lushu/battleMove-4f.png | 54317 | 6ecceda53ceb1ed23fbbe2c75166c65b365af2ee23f3122d7531165ed1beff74 |

Public Battle Lab normal lineup / skip countdown loaded actual Phaser Arena. Screenshots showed original static Lushu plus changing run silhouettes on moving ally/enemy, shared enemy mirror, P2/P3 static sprites, HUD/overhead HP/telegraph/damage intact; no missing Move texture or adjacent-cell artifact observed. Cloud rendering advances slowly around UI interactions; screenshots are not claimed as frame-by-frame continuous timing/stop proof or iPhone final art acceptance.

Complementary executable verification on exact deployed source uses real createStageBattleSession with P1/P2/P3, real shared arenaToStage and AssetPresenter (only external renderer/decoder doubled): 12×.05s rightward ticks traverse cells0→96→192→288→repeat; a zero movement vector/held control tick immediately restores idle; negative-X tick mirrors Move. Every presenter render leaves authoritative session snapshot byte-for-byte unchanged. Existing targeted tests additionally cover Y-only movement, duplicate-clock freeze, missing-Move static fallback, reduced-motion static frame, KO and P2/P3 unchanged. Frame canvas108×144/origin remains exact accepted idle contract; PNG transparent side columns and common hoof-bottom125 prevent bleed/baseline drift. No gameplay-owned animation flags/coordinates/speed/AI/collision/targeting/telegraph edits; no GIF or breathing integration.

Final HEAD is the docs-only closure commit containing this note; resolve active feature ref. It changes no runtime/build bytes, so tested source and public fingerprints above remain authoritative. No technical blocker. Final subjective phone acceptance remains player-owned.
Player smoke after release: P1 moves left/right/up/down, visibly cycles four poses, stops to static idle, keeps ground anchor and expected readability. Do not start P2/P3 motion/action/VFX/next character.
