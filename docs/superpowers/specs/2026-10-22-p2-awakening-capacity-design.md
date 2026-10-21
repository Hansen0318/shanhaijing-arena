# P2 鎮岳容量方向 — 赤鱬 KO 無損分塊設計

Status: **direction verbally approved; written specification awaiting player review**. This document is not an installed pack, capacity PASS, executable-contract approval, Runtime integration or deployment authorization. Branch `feat/m0-combat-core-20260927`, PR #1 remains open/unmerged. Based on fetched `bfb19e8d669c3f6ee52c08d8a726ca48248b25ea`.

## Intent and boundaries

The player wants the visually approved P2 Awakening「鎮岳」to reach the game while preserving approved character artwork and actual combat mechanics. The immediate problem is a measured required-texture shortfall. The player recalled dynamic allocation and asked whether the 16 MiB rule had been removed. Code inspection confirms **dynamic encounter residency and the 16 MiB cap both coexist**: `src/assets/schema.js` sets both asset-cache and scene-residency hard maxima to `16*1024*1024`; `src/runtime/assetResidency.js` pins all encounter-required keys and keeps a 131072-byte optional reserve. Dynamic loading prevents loading every asset in the game at once, but does not exempt an encounter's 45 currently required textures from its hard cap. The approved Special historical runtime measurements are not a new Awakening pass.

The player replied 「確認紀錄進度規則流程 目前應該沒有16mib限制吧，上次有取消過，用動態配置？現在要做什麼 部署到遊戲嗎，這樣我同意核准」 to the immediately preceding proposed **Chiru KO lossless split direction**. Interpret this as approval to document and investigate that direction, not as a claim that the written design or a final pack was inspected. Earlier proposal explicitly said this approval would not be treated as Runtime/deployment authorization. The question about deployment deserves an accurate sequence; do not silently turn it into permission for Pages.

## Observed baseline and proposed capacity

The full existing encounter required set was read from current roster descriptors/manifest: 45 keys, 16611224 decoded bytes, 34920 bytes left after 131072 reserve under 16777216. Four Awakening textures proposed in `docs/verification/M5C_P2_BOTUO_AWAKENING_PREFLIGHT.md` total 1145272 bytes; without reclaimed space, 49 keys would exceed the cap-minus-reserve by 1110352 bytes. These four are measured rectangle candidates, not installed or native-validated PNGs.

The current faithful Chiru KO runtime derivative is `public/assets/special-runtime-v1/chiru-battleKo.png`, SHA256 `d8af126e055a4d6093c9e587c2303771160d369211f9c825eefaef0aab97f12c`, 1244×1254, 6239904 decoded bytes. Its original `public/assets/characters/chiru/battleKo.png` and approved static KO identity stay untouched. Read-only RGBA measurement shows the big existing rectangle has sparse nonzero regions; cropping only its outer bounding box cannot recover enough space. A deterministic 108-row-band partition yields **11 nonempty bands**; taking each band's minimum nonzero-RGBA horizontal interval plus a source-sampled one-pixel neighborhood on every side and shelf-packing the regions into a single 2048×550 atlas yields **4505600 decoded bytes**. Reconstructing all 1244×1254 source RGBA pixels from the nominal band interiors in memory was byte-exact. No image was written or installed; neither bilinear texture sampling nor on-device placement has been proven.

Read-only candidate layout below uses half-open source intervals and top-left physical atlas coordinates *including* the 1-pixel gutter. Band y108..216 is entirely zero RGBA and has no part. The packer sorts regions by descending height then width and shelves at 2048 px. This is an input mapping for a future deterministic installer, not a checked-in image. Out-of-source halo at the texture edges is zero-filled; sample only nominal interior pixels when reconstructing the logical frame.

| Source y | Nonzero x interval | Atlas top-left |
| ---: | ---: | ---: |
| 0..108 | 0..896 | (0,330) |
| 216..324 | 314..316 | (979,440) |
| 324..432 | 817..1144 | (614,440) |
| 432..540 | 556..1168 | (0,440) |
| 540..648 | 300..1209 | (1039,220) |
| 648..756 | 163..1200 | (0,220) |
| 756..864 | 0..1244 | (0,0) |
| 864..972 | 0..1219 | (0,110) |
| 972..1080 | 518..552 | (943,440) |
| 1080..1188 | 385..1168 | (898,330) |
| 1188..1254 | 582..589 | (983,440) |

| Capacity model | Decoded bytes |
| --- | ---: |
| Existing 45 required | 16611224 |
| Chiru KO 1244×1254 old → 2048×550 proposed | −1734304 |
| Four Awakening candidate textures | +1145272 |
| **Proposed 49 required** | **16022192** |
| Optional reserve | +131072 |
| **Combined / 16 MiB limit** | **16153264 / 16777216** |
| **Projected headroom** | **623952** |

This is a **calculated design**. Extra gutters/packing revisions, metadata, actual encoded PNG limits, texture sampling, total browser RAM/GPU memory and concurrent loading can invalidate it. Preserve the unchanged 16 MiB hard cap, 64-entry limit, all required keys and 131072 optional reserve. The Chiru KO keeps one required texture key; a multi-region renderer reads eleven logical pieces from one physical atlas. Do not reclassify required textures as optional, drop KO/Move, enlarge the budget, quantize/reduce approved pixels or alter the game's combat.

## Proposed generic rendering contract

1. Extend the existing logical-to-physical region adapter with an optional **multi-region static-frame record**, not a Chiru-specific conditional. Each part names its nominal logical rectangle, atlas inner rectangle, source-exact sampling gutter and draw order. The union of nominal rectangles reconstructs the original logical 1244×1254 RGBA frame exactly; all omitted areas must be all-zero RGBA. Preserve its pre-existing logical `1254×1254` descriptor, trim, origin, scale and root-ground placement.
2. An actor static KO frame may create a small set of sibling sprites (or a container with demonstrably identical world transform); apply a single shared actor transform to their logical rectangles. Right-facing is canonical. Left-facing must mirror the complete logical image around the original root, not independently mirror each strip around its own center. Ordering and alpha blending at band boundaries may not produce seams, doubled pixels, flicker or ghost trails. Other characters and action frames remain on the existing single-region path.
3. The sprites have the same lifecycle as the KO actor display: HP≤0 selection, stage/scene teardown, Pause/Restart, late texture loading and eviction/cleanup. No effect on battle status, targetability, damage, movement, KO timing or approved special/awakening presentation. An atlas load failure uses the existing fail-closed required-asset path; never paint a partially assembled KO as a success.
4. New Awakening body/radial/victim/status layers remain separate assets and are only observed through real cast/damage/status records per the still-unapproved execution preflight. KO packing is a capacity enabler, not an approval of that whole execution contract.

The adapter and painter boundaries need an implementation plan after written-spec approval; the existing `physicalRegion()` returns a single rectangle, and `AssetPresenter` currently draws one actor image. Do not assume a new manifest field alone will render eleven pieces. This is a shared compositing extension with a narrowly selected input record, not an exception for P3 gameplay.

## Verification and stop conditions

- Generate the atlas deterministically only after this written design and implementation plan are separately approved. Record source and output SHA256/bytes, every part's source rectangle, inner atlas rectangle and gutter, and the 11-band reconstruction mapping. Independently decode the installed PNG and reconstruct the entire original logical KO **RGBA-exact**, including alpha-zero RGB. Verify frame dimensions/encoded-byte guard and all approved original masters/receipts remain unchanged.
- Use RED→GREEN tests for generic multi-region math: whole-image/right and left mirror, ground/origin/scale equivalence, fully zero omitted row, edge/gutter, duplicate/late paint, KO/Restart cleanup and legacy single-region regression. Run bounded affected tests, complete 49-key required residency/cache/scene estimates and actual high-water/64-entry/reserve checks. Do not claim a new capacity PASS from the arithmetic alone.
- Verify Phaser **native** rendering against the source-equivalent original in the actual built app, with strict prior native-sampling control and both facings. Check Chiru Idle→Move→KO size and contact/foot, seams through alpha edges, Pause/Restart and memory teardown. If native sampling or world transform differs, revise the pack/adapter and recalculate capacity; do not loosen thresholds or remove approved pixels.
- Separately review/approve the Awakening cast/action/VFX/status execution contract and final pack evidence before Runtime. After bounded local/build/Browser checks of any later integration, request a separate scoped Pages deployment decision; then public fingerprint and player phone review. No deployment or new live URL at this stage.

## Alternatives considered

- **Recommended: source-exact single-atlas/11-part KO compositing** — modeled 623952 bytes spare after reserve while retaining all 49 keys. It costs extra static-KO draw pieces and requires shared renderer/native equivalence proof.
- Simple outer-edge trim of existing 45 textures yields at most ~80588 decoded bytes in read-only per-texture bounding-box measurement, far short of 1110352; it is not a solution. Existing Chiru KO near-edge nonzero pixels prohibit one-box shrinking.
- Evicting an encounter-required key, treating it as optional, lowering art density or changing the 16 MiB cap would violate current project rules. Do not implement these as a silent fallback; seek a distinct player decision if exact compositing cannot be validated.

**Written-spec review Gate:** Ask the player to confirm/revise this exact design. Their prior approval covered the direction, not this full 11-piece adapter specification. No code, tests, asset installation, build, Browser or deployment until the appropriate later Gate.
