# P5 Xingxing static KO — 2026-10-15 preflight blocker

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
