# Shared first-entry portrait readiness — 2026-10-15

Status: **ENGINEERING PASS / PLAYER IPHONE SMOKE PENDING**.
Branch `feat/m0-combat-core-20260927`, PR #1; tested/deployed source `cfe5c0cfe89f685bca4760c624ddcd815c5218a0`. Containing closure HEAD changes documentation only.

## Scope

Chat already committed shared portrait/Idle-first scheduling and critical-ready Arena HUD refresh. Work recovered the latest rules and source, ran remaining checks, and made **no production or test-code changes**. No test failure required a fix. No P5 KO or main merge.

## Executed evidence

- Targeted **54/54 PASS**: assetPresenter, assetCache, assetIntegration, battleHud, hudCardLayout, lushuTeamBattleCorrection, assetGuard, xingxingStatic, xingxingMove, jiuweihuStatic tests.
- Controlled cold/warm diagnostic used the real AssetPresenter and AssetCache with deterministic asynchronous transport and renderer boundary doubles. Cold load bound both P1/P5 HUD portraits in the critical-ready callback before optional Move transport; warm fresh-presenter prepare bound portraits with zero additional transports. Keys were deduplicated, max concurrent transports stayed 2, and shutdown suppressed the late critical callback. This is engineering evidence, **not a real Safari network/decode timing measurement or player acceptance**.
- P1–P5 approved image files, roster/animation descriptors, combat source, asset manifest/schema and AssetCache have no diff from the accepted locomotion baseline `9b718b8`. Only the previously committed ArenaScene/AssetPresenter scheduling and regression test changed.
- Existing decoded cache/scene cap remains **16,777,216 bytes (16MiB)**. Actual all-five-plus-identity test peak **16,646,800 bytes**, both forward/reverse order, no required texture dropped.
- Asset guard **61 files / 3,509,345 encoded bytes**. Local `npm run build` PASS; `git diff --check` PASS. Existing npm http-proxy and Vite large-chunk warnings only.
- Existing current-HEAD CI/Pages already succeeded; reused that exact release rather than triggering a duplicate source deployment. Actions **#976 / 38656695722**: build job **116168044070**, deploy job **116168190777**, both SUCCESS. Build logs confirm **678/678 tests, zero failures** and matching build fingerprints.

## Public version proof

Pages: https://hansen0318.github.io/shanhaijing-arena/
Downloaded all four files below and compared byte-for-byte to tested local dist: all EXACT MATCH.

| File | SHA256 |
| --- | --- |
| index.html | `798c4af34995a4b9036d124b33e9495360d8b8bf7a45f7bb56ba4034ecc7d80b` |
| index-C4gb6cFa.js | `3f41d337ce0ff3b215a0243e5852db7dbf60942b8ce63ee7ec983d00d74c3546` |
| battleRuntime-BD5CfBKu.js | `0d90728838992e492b890a20b739db97922f4dce1a284467816c17031b53ddc8` |
| index-DcqtNRF0.css | `a20af2bfa9f5a700823772a0d7e0391b1760c35336de8cc621b36e54bad501da` |

## Stop / remaining player gate

STOP for player iPhone smoke: first entry after refresh should show HUD portraits as essential assets become ready without needing Restart; paused entry should also refresh; warmed Restart should remain correct; P1–P5 approved movements/pictures should remain unchanged. Slow/broken device-network behavior is not claimed solved by real-device evidence until player confirms. Do not open P5 KO or further asset/gameplay scope.
