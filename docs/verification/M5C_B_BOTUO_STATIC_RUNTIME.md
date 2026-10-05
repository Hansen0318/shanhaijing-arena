# M5C-B 猼訑 static runtime executable verification

Status: **ENGINEERING PASS / PLAYER SMOKE PENDING** (2026-10-05).

Chat checkpoint `74dc0e7fd2d7019dc985fc13ad17d878cb1ea93d`; tested/deployed source `960b85f787179ff79b315524146352f6f6e88a7b`, tree `046de68b9a88e211355f6b4bb73c1f5419adfa79`. Branch `feat/m0-combat-core-20260927`, existing PR #1. No main merge.

## Canonical binary integration

Copied only the three named PNGs from the supplied `botuo_static_runtime_pack(1).zip`, without resizing, cropping, re-encoding or generation. All are RGBA PNGs; exact bytes equal the ZIP entries and SHA256 equals its `RUNTIME_PACK.json`. Paths/dimensions/encoded sizes agree with Chat's manifest.

| Path under public/assets/characters/botuo/ | Dimensions | Encoded bytes | Decoded RGBA bytes | SHA256 |
| --- | --- | ---: | ---: | --- |
| portrait.png | 128×128 | 32501 | 65536 | f7ceff655ab04902b434069bb5862d3211b3353c997e4e535743c2ff92bca864 |
| identity.png | 160×192 | 48520 | 122880 | f23045dec637f03bbd14649f078c98b696084aad161e8f5ffcad27bb2dc14308 |
| battleIdle.png | 160×160 | 47136 | 102400 | 27c65e3f1633f4e5959e62b2fbb72df7bf47e6e8324425af24943b53d8a0d2b8 |

Added encoded bytes: 128157. Combined decoded estimate: 290816 bytes (284 KiB), not an assertion that all menu/battle assets are resident concurrently. Existing lazy loading, 64-entry / 16 MiB decoded cache, texture ownership and guards are unchanged. P2 static descriptor keeps `staticFrame:0`, origin `[0.5,158/160]`, scale `2`; no micro-animation authored.

## Targeted verification

**64/64 PASS**, zero skipped/cancelled:

```sh
node --test tests/assetManifest.test.js tests/assetResolver.test.js tests/assetDescriptors.test.js tests/assetCache.test.js tests/assetGuard.test.js tests/assetMenu.test.js tests/assetPresenter.test.js tests/assetIntegration.test.js tests/lushuPresentationCorrection.test.js tests/lushuTeamBattleCorrection.test.js tests/lushuIdle.test.js tests/teamFlowView.test.js tests/collectionView.test.js
```

Initial 61/64 isolated three stale test issues; only necessary test edits:
- Inventory now includes the three approved PNGs: 43 files, aggregate bytes bounded below 300000. Per-file/dimension/decoded/cache production guards unchanged.
- P2's idle source is now formal `botuo.battleIdle`; P3 onward retain procedural fallback assertions.
- Formal-lineup fallback test now selects the hidden fallback label instead of the surrounding figure span, retaining image-error fallback assertions.

No production JS/CSS changes were required. Existing P2 bindings/static descriptor, menu conditional placeholder retirement, shared fallback/presenter, and prior 鹿蜀 idle/facing contracts passed. No combat/AI/movement/range/Tier/economy/progression/save-schema changes.

`node scripts/checkAssets.js`: **43 files / 276232 bytes PASS**.
`npm run build`: **PASS**; existing large battle-chunk advisory only.
`git diff --check`: **PASS**.

Local scope stayed targeted; the unchanged deployment workflow additionally ran its existing configured test suite successfully.

## Deployment

[Actions #653](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/37298785196): Test/Build/Pages **SUCCESS**. Build job `111726273324`; deploy job `111726398565`.

Direct HTTP comparison against this source's local `dist`: all seven public artifacts resolved and matched exact bytes/SHA256. This is network fingerprint verification, not browser visual smoke.

| Public artifact | Bytes | SHA256 | Exact match |
| --- | ---: | --- | --- |
| index.html | 1491 | 456cb134dc1ee3f44a3b51fe038a939b95f6bca91e6d962f4f70c134e0194b98 | Yes |
| assets/index-AbtEAhih.js | 92755 | b67818bb2c5af4262c1c30a8ea8a3064571580741222a6ecd161d1c298782520 | Yes |
| assets/index-DcqtNRF0.css | 22943 | a20af2bfa9f5a700823772a0d7e0391b1760c35336de8cc621b36e54bad501da | Yes |
| assets/battleRuntime-CvDgD_n4.js | 1444388 | 82b0c1a1ebe537e6e1e1f3d37e1aaffe8d995d96f389fdff274fc3fee1d6926d | Yes |
| assets/characters/botuo/portrait.png | 32501 | f7ceff655ab04902b434069bb5862d3211b3353c997e4e535743c2ff92bca864 | Yes |
| assets/characters/botuo/identity.png | 48520 | f23045dec637f03bbd14649f078c98b696084aad161e8f5ffcad27bb2dc14308 | Yes |
| assets/characters/botuo/battleIdle.png | 47136 | 27c65e3f1633f4e5959e62b2fbb72df7bf47e6e8324425af24943b53d8a0d2b8 | Yes |

## Player acceptance boundary

**No browser visual smoke performed**, as explicitly requested. Engineering/deployment success does not imply player visual acceptance.

Next exact action: player phone smoke only of Team/Collection/HUD portrait framing, Detail/full-body proportions, static battle size/silhouette, ally/enemy mirror, overhead HP position, placeholder retirement, readability/layout. Stop afterward for Chat review. Idle micro-animation, Run/movement animation, Hit/KO/Cast, VFX and the next character remain blocked.
