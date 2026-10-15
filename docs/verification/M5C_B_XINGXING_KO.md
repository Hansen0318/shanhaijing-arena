# P5 Xingxing static KO — 2026-10-15 lossless-crop follow-up

## Current release closure — 2026-10-15

**P5 STATIC KO — ENGINEERING PASS / PLAYER IPHONE SMOKE PENDING (2026-10-15).** Tested/deployed source `d4ec0fb789617db1159756d4dd5c7ab2372de5f7`; this closure is documentation only. Approved lossless480×288 KO integrated unchanged through shared battleKo. Targeted86/86 and local/CI686/686 PASS; guard62files3667880bytes and Build PASS. Actual all-five battle portrait/Idle/Move/KO residency16597648bytes in both orders, no missing textures, unchanged16777216-byte cap (179568bytes spare). Collection menu images separately validated and all five public PNGs match the build. Actions#987 run38697371716: build116297026881 and Pages116297160854 SUCCESS. Public index.html, index-2C9LBe0-.js, battleRuntime-BRQs-BB9.js, index-DcqtNRF0.css, P5KO/Idle/Move and five Collection PNGs (12files) freshly downloaded and byte-identical to tested dist. KO SHA256e9bf9bbd3684aeb45422d53046eb2c7fd218da058ee9f48d582ac54a6a5ae4e8. Public URL: https://hansen0318.github.io/shanhaijing-arena/ . P1–P4, approved art, gameplay/AI/Tier/reward, P5Idle/Move and shared readiness unchanged; PR#1 open/unmerged. Evidence: `docs/verification/M5C_B_XINGXING_KO.md`. **STOP: only player iPhone KO pose/size/ground/full-body/tail/last-facing/static-persistence acceptance next. No PLAYER VERIFIED claim, actions/Hit/VFX or main merge.**

Public fingerprint SHA256:

| File | SHA256 |
| --- | --- |
| index.html | fc1d49e782ff162cc97d6b468717caf10079b75e36a52b468fdddb940871b955 |
| assets/index-2C9LBe0-.js | 6c02652ae54c7e30c2ff74c60ea9114419749dd489fc1dce20c446f6bbe7ce44 |
| assets/battleRuntime-BRQs-BB9.js | 27e150a678d0d72fc9a001240a2a2abf39451cb50f82aae17d42928a15ad042a |
| assets/index-DcqtNRF0.css | a20af2bfa9f5a700823772a0d7e0391b1760c35336de8cc621b36e54bad501da |

Source workflow: https://github.com/Hansen0318/shanhaijing-arena/actions/runs/38697371716 . The checkpoint below records implementation details; its release-pending wording is superseded by this closure. No further runtime work is authorized before player acceptance.

## Current executable checkpoint — 2026-10-15

**LOCAL ENGINEERING PASS / CI-PAGES RELEASE PENDING / PLAYER IPHONE SMOKE PENDING.** Recovery HEAD `38fdcf1`; active feature branch/PR#1 unchanged, no main merge. Chat's menu-versus-Arena fixture correction is preserved. The former mixed-residency blocker below is historical and superseded by this integration.

- Exact archived480×288 PNG158535bytes/SHA256 `e9bf9bbd3684aeb45422d53046eb2c7fd218da058ee9f48d582ac54a6a5ae4e8` copied byte-for-byte to `public/assets/characters/xingxing/battleKo.png`; native RGBA decode, exact crop(20,149)-(500,437) of approved512 source, retained pixels and discardedalpha0 all freshly verified.
- Only production delta: one manifest entry plus P5 shared assets/descriptor registration. One frame480×288, duration1/fps1, loopfalse, staticFrame0, origin[236/480,279/288], scale1.875. Presenter output135×81 compensates512→480 canvas without resizing the art's visible footprint. Visible silhouette132.46875×76.21875px; y279 foot-contact lands exactly on actor ground anchor.
- Shared last-facing mirror retained. Independent review checked Phaser4.2.1 TransformerImage implementation: canonical retained pixels exactly preserve the proposed512 geometry. Phaser frame-center flip semantics with noncentral origin introduce a2.25px horizontal shift relative to that never-deployed512 proposal when mirrored; vertical ground, size, actor coordinates and facing remain correct. New test's geometry model explicitly accounts for this; no shared renderer change was made.
- Seven new KO tests initially RED on absent formal KO, then GREEN. Actual shared presenter proves Idle→Move→HP0KO, both facing directions and normal/reduced modes, static persistence through100s, no source/frame revert, deadalpha.35, and texture cleanup. Actual BattleSession dead coordinates and snapshots remain authoritative; P5speed1.85 unchanged. Existing overheadHP tests cover HP0 hiding through untouched shared UI.
- Targeted **86/86 PASS**: P5KO/static/Move, P1–P4KO, assetPresenter/cache/guard, HUD, Collection and menu tests. Local CI-equivalent **686/686 PASS**. Collection assets remain independently validated menu images; Arena memory tests now require **all five** portrait/Idle/Move/KO sets, including new P5KO, with no ignored missing keys.
- Both roster orders actual cache and scene peak **16,597,648 bytes**, below unchanged16,777,216 by179,568; every required texture remains resident. No menu full-body images forced into Arena. Cold-readiness regression retained and passed; presenter/cache/ArenaScene production code unchanged.
- Build PASS; guard62files3667880encodedbytes; fingerprints `index-2C9LBe0-.js`, `battleRuntime-BRQs-BB9.js`, `index-DcqtNRF0.css`. Existing npm http-proxy and Vite large-chunk warnings only. `git diff --check` PASS.
- Independent review found no critical/important defects; the small Phaser flip-offset caveat above is documented and test geometry corrected. All P1–P4 catalog presentation and all gameplay catalog source compare unchanged; accepted P5Idle/Move and shared readiness unchanged. Only directly obsolete P5 pre-KO expectations and inventory totals updated.

Next only feature push/CI/Pages/public byte-match, record closure, then STOP for iPhone lying pose/size/ground/fullbody/tail/last-facing/static-persistence smoke. No PLAYER VERIFIED, next actions/Hit/VFX or whole-character completion claim.

## Historical crop preflight (superseded by corrected test contract)

**Current status: FAIL / INCOMPLETE — battle-only memory PASS, existing mixed battle+Collection fixture still loses images; stopped as explicitly requested.**

Latest request supersedes the exact512 runtime canvas with the attached480×288 lossless crop. ZIP SHA256 `9dff08cde523e692295283469b6a8b3695332f154c0b3b5b69c090abcf4cd330`; both SHA256SUMS entries verified. New PNG158535bytes/SHA256 `e9bf9bbd3684aeb45422d53046eb2c7fd218da058ee9f48d582ac54a6a5ae4e8`; crop rectangle `(20,149)-(500,437)` is exact RGBA-equal to the archived approved512 source. All discarded alpha values are zero; local bbox `(4,8)-(475,279)`. New crop archived unchanged at `docs/art/approved/xingxing/battleKo-480x288.png`.

Recovery HEAD `60d8d3a`; current rules unchanged from previous recovery. Latest handoff proposed crop-corrected origin[236/480,279/288], scale1.875, static one-frame/duration1/loopfalse. These calculations were read, but descriptor/HP0 runtime integration was **not committed or claimed complete** after the memory stop condition triggered.

Repeated real manifest/cache/presenter loader preflight using a temporary in-memory480×288 KO record and P5 asset mapping, exact attached PNG metadata, existing shared portrait-ready priority, both roster orders:

| Load scope | Required decoded bytes | Cap | Result |
| --- | ---: | ---: | --- |
| All5 battle Portrait/Idle/Move/KO only | 16,597,648 | 16,777,216 | PASS, all required textures present, both orders |
| Above + all5 collectionArt, as currently exercised by xingxingStatic.test.js fixture | 17,199,760 | 16,777,216 | FAIL, deficit422544 and identity images refused |

Forward order actual scene16708240bytes, missing botuo/chiru/jiuweihu/xingxing identity; reverse16720528bytes, missing jiuweihu/chiru/botuo/lushu identity. **No battle texture was missing in the new crop's battle-only check.** The former316048-byte pure-battle deficit is resolved by this candidate; do not report that old blocker as still applying to ordinary battle-only residency.

Scope distinction matters: production `ArenaScene` prepares current-encounter battle keys, while the existing static regression fixture additionally calls `loadKeys` on every collectionArt. Collection/Team Select full-body images use their menu path. This follow-up does **not** prove normal battle requires every full-body identity in the scene. However, the current full-residency regression contract fails with the new asset; the player's explicit instruction says to stop if memory/tests still fail, so the executor did not weaken/rewrite that fixture or expand into shared residency changes.

Exact next action: review/authorize the existing test's mixed-residency contract against the real menu-versus-Arena loading paths (or explicitly scope a shared residency solution), then resume static KO integration. Preserve all approved images, the16MiB cap and shared readiness. Do not simply omit an expected image to force a green result.

No production/test-source change, public KO, new integration build/CI/public fingerprint, HP0/mirror/persistence acceptance or phone-ready KO release is claimed in this follow-up. Stopped immediately after the relevant residency reproduction, as requested. Existing deployed release remains untouched.

## Historical exact512 preflight (superseded canvas)

Status: **FAIL / INCOMPLETE — exact-512 integration blocked by unchanged 16MiB scene budget**.
Recovery HEAD `89d8680` on `feat/m0-combat-core-20260927`, PR #1. Latest player request and attached WORK_HANDOFF authorize this static KO integration and state that its art is approved; this supersedes the older progress pointer saying KO art authoring is next. Shared portrait readiness and P5 locomotion remain PLAYER VERIFIED.

## Verified handoff

ZIP SHA256 `c875ac22940637ab20a90a3faccfa88db0783e7485fc90c683dd16e5823094b7`; read START_HERE.md and WORK_HANDOFF.md. All three entries in SHA256SUMS.json passed bytes/hash checks (the supplied checksum list does not cover the two startup Markdown files).

| Asset | Dimensions | Bytes | SHA256 |
| --- | --- | --- | --- |
| Approved master | 1254×1254 RGBA | 880547 | `94afb1b598e933653aad374e87402c34a73626f7a8ff676739794c177c669255` |
| Exact runtime derivative | 512×512 RGBA | 162856 | `76f5b5e67745d03821fd105de493c6d61b1ee1b09c6428908372da96fa645a2d` |

PNG decode, transparency and intact lying-pose visual inspection PASS. Derivative nonzero-alpha bbox `(24,157)-(495,428)`; alpha>64 bbox `(25,157)-(494,428)`. Candidate shared static descriptor would be one512-square frame, duration1, loopfalse, staticFrame0, origin[.5,428/512], scale2. **This descriptor is not integrated or claimed runtime-verified.** Exact approved derivative archived at `docs/art/approved/xingxing/battleKo-512.png` for zero-context recovery; it is not a public/runtime asset. No resizing/redraw/recolor.

## Executed memory reproduction

Used the real `createAssetManifest`, `createAssetCache` and `AssetPresenter.prepare`, with PNG-backed transport metadata and a minimal renderer texture boundary. Extended only an in-memory manifest with the proposed512-square P5KO record and an in-memory P5 asset mapping. No production files were changed.

All five distinct roster characters can occur in a valid battle: e.g. Stage1-5 enemy[P4,P5,P2] against selected[P1,P2,P3]. Deduplicated portrait/Idle/Move/KO requirements therefore cover P1–P5. Full-body Collection images are **excluded** from the failing battle-only calculation.

| Preparation order | Required decoded bytes | Cap | Actual scene bytes | Missing required texture |
| --- | ---: | ---: | ---: | --- |
| P1,P2,P3,P4,P5 | 17,093,264 | 16,777,216 | 16,044,688 | xingxing.battleKo |
| P5,P4,P3,P2,P1 | 17,093,264 | 16,777,216 | 16,044,688 | lushu.battleKo |

The approved512 KO adds1,048,576 decoded bytes. Deficit is316,048 bytes even without Collection art. The current shared scene guard silently declines the texture that no longer fits; ordering merely changes which approved KO disappears. Encoded PNG162856-byte size does not solve decoded texture capacity. Raising16MiB, replacing/downscaling approved files, accepting a silent missing texture, or changing shared residency architecture is outside this bounded exact-file handoff. No such workaround was applied.

## Other checks / deployment state

- Existing directly relevant asset/cache/guard/P1–P4KO/P5Static/Move tests **61/61 PASS** on protected baseline.
- Baseline build PASS, guard61files3509345bytes, existing fingerprints `index-C4gb6cFa.js`, `battleRuntime-BD5CfBKu.js`, `index-DcqtNRF0.css`. These are **existing source** checks, not evidence of an integrated P5KO release.
- No production/test-source edits, no P1–P5 image/descriptor/gameplay/readiness change, no 16MiB change, no main merge.
- New P5 HP0→KO/mirror/persistence/overhead-HP engineering acceptance and P5KO release are **not completed**. No P5KO Pages deployment or public-KO success claimed.
- Public baseline index.html, index-C4gb6cFa.js, battleRuntime-BD5CfBKu.js and index-DcqtNRF0.css were freshly downloaded and all matched the unchanged local baseline build byte-for-byte. Existing player-verified release remains available; this is not a new KO fingerprint.

## Exact next action

Resolve the exact512-file / fixed16MiB incompatibility through a separately authorized shared texture-residency scope or a newly approved memory-safe runtime asset plan, then resume this same static-KO gate. Preserve existing player-verified art and shared readiness. Do not bypass the guard, start actions/VFX, or ask the player to phone-test KO before a valid KO build exists.
