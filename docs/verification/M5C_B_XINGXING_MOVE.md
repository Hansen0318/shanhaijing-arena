# P5 Xingxing Locomotion Integration — 2026-10-14

Status: ENGINEERING PASS / PLAYER PHONE SMOKE PENDING.
Branch feat/m0-combat-core-20260927 / PR1; recovered HEAD cf1aa476aa63d945fbb04ead7877b75d782bcf79. Permanent rules already updated by Chat; no rule rework.

## Approved input / necessary lossless repack
ZIP SHA256 0ca7906a65cb1d1f26641d6a270bc6ae29195c89d97a6738638cf69d334718f2; all12 SHA256SUMS entries verified.
Approved strip2420×735/1031185bytes/SHA256 f7219afe41d6a1396970c4618f0322e879f22f69d1b6ab326933f278ac5312ce is authoritative. Source JPEG SHA256 bfb4e5ad89858bd054f789dfd8bf21e87d8b38cfbe6b2651e26f21989d6afb64; review GIF never used at runtime.
Direct strip integration is impossible under existing2048 dimension guard; decoded7114800 bytes also exceeds16MiB when combined with current roster. The handoff explicitly permits minimal lossless repacking when technically required.
Actual strip alpha bottoms are546/578/546/583, not normalization_manifest baseline714; separated frame PNGs are not pixel-identical to strip crops. Do not treat their metadata as exact strip geometry. We use only the exact approved strip pixels.
For each complete605×735 source cell, crop its nonzero-alpha bbox, remove only outer transparent area and translate the unscaled RGBA crop onto a560×440 fixed cell with common foot baseline426. Pack cells2×2 in originalF1→F4 order. No resampling, recoloring, fringe removal, redraw or invented pose. Exact RGBA equality verified crop-to-runtime for all four; metadata and crop hashes in M5C_B_XINGXING_MOVE_REPACK.json. Per-frame margins are F1[6,14,6,14],F2[62,25,63,14],F3[41,17,42,14],F4[65,15,65,14]. No edge touching or adjacent-cell bleed; all appendages retained.
Runtime public/assets/characters/xingxing/battleMove-4f.png:1120×880 RGBA,1008507bytes,SHA256 ae8c3c2c8504d999eb14d8790ee4ebcf74680f96e12a01c178d5de124992290f; decoded3942400bytes.

## Descriptor / protections
Four560×440 frame regions at[0,0],[560,0],[0,440],[560,440];10fps normal/5fps reduced, looptrue, staticFrame0, origin[.5,426/440], scale2.25. Visible silhouette heights116.00–119.19px preserve accepted static Idle118.8px; scale compensates canvas geometry, does not enlarge character to solve readability. Same shared state/mirror/XY renderer, no new ID-specific code.
P5 existing Idle PNG SHA2561004c76a0ea3e5e942a60137cee5628752220edcfb8cd4c453a43df7e54e3c26 and descriptor remain unchanged. Stop immediately returns Idle. No KO/Hit/Cast/VFX. P1–P4 entire catalog presentation and all gameplay catalog source byte-identical to recovery HEAD. P5moveSpeed1.85 unchanged; no AI/ability/Tier/reward/progression/persistence/UI changes.

## Verification
- New movement tests RED3/3 before integration on missing source/playback.
- Targeted51/51 PASS; four-frame cycle, bothmotion modes, XYmovement, duplicate time, stop→Idle, leftmirror, staticportrait/identity/Idle, real BattleSession snapshots/coordinates/moveSpeed purity, P1–P4Move checks.
- Local CI-equivalent npm test677/677 PASS.
- Guard61files3509345encodedbytes; build PASS; index-C2ZLrpAZ.js / battleRuntime-5ub_Q_wp.js / index-DcqtNRF0.css.
- Actual all-five+identity cache and scene peak16646800bytes<16777216 unchanged16MiB; tested forward/reverse order and required textures retained. No budget increase or asset deletion.
- PNG decode and exact RGBA crop equality / border safety / baseline / proportional visible-size checks PASS.
- git diff --check PASS. Independent review: no critical/important defects; independent13/13 affected checks and exactRGBA comparisons PASS.
- Existing npm http-proxy and Vite large-chunk warnings only.

## Release / exact next gate
Push feature branch using authorized GitHub connector (CLI credentials unavailable), enforce CI/Pages/public byte-match, record release source and stop.
After engineering release, wait for player iPhone Move gait/cadence/size/ground/fulltails/no clipping, left-right mirror and immediate static stop acceptance. Do not claim PLAYER VERIFIED; no P5KO/actions/VFX/main merge.

## Release closure
Tested/deployed source `79968249af9b46726dad109ce8113f26082febc0`; containing closure HEAD is docs-only. GitHub connector commit tree `378315df564e769cb86e0f8d9a208ab44a62703d` equals local verified tree; local checkout synchronized to remote.
Actions #962 https://github.com/Hansen0318/shanhaijing-arena/actions/runs/38576388866: Build115894514386 and Pages115894731012 SUCCESS. CI logs677/677 and matching build filenames. Final affected13/13 PASS.
Public downloaded files matched dist byte-for-byte:
- index.html SHA256 a21869f570ba93a4cbf4f02604014f2e78f411d0e49532793e14861dc6ef3c00
- index-C2ZLrpAZ.js SHA256 5a1b89bfabfef300f1da8abb819f0e14c0cbafa9509e095f1ae06d3837e650ea
- battleRuntime-5ub_Q_wp.js SHA256 ed33df93f4266c578739ae7f32652a859d7d04d5dce4f8bbd8dec026a2c32c4c
- index-DcqtNRF0.css SHA256 a20af2bfa9f5a700823772a0d7e0391b1760c35336de8cc621b36e54bad501da
- battleMove-4f.png SHA256 ae8c3c2c8504d999eb14d8790ee4ebcf74680f96e12a01c178d5de124992290f
- battleIdle.png SHA2561004c76a0ea3e5e942a60137cee5628752220edcfb8cd4c453a43df7e54e3c26 (unchanged).
Pages https://hansen0318.github.io/shanhaijing-arena/ . No technical blocker. STOP for player phone gait/cadence/size/ground/no clipping/tail/mirror/stop→Idle acceptance. No PLAYER VERIFIED claim and no next state work.
