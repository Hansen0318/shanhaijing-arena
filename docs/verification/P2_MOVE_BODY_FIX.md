# P2 Move body density correction — 2026-10-20

## DEPLOYED / ENGINEERING PASS / PLAYER MOVE SIZE REVIEW PENDING

Release `0fe44b3c5eed46402d0394af6dff128a72be7393`, Actions [39371658550](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/39371658550), build118460665060 / deploy118461659898 SUCCESS. Basic actual Chromium4cases/44screenshots, mobile Chromium/WebKit6actual entry cases, and actual built-entry cross-roster4cases/32actor-sequences/880samples/24real KO PASS; all four Retry/Restart presenters closed with0bytes, Exit returns to preview. PNGs and P2 Idle/Basic/KO +other catalog fields unchanged. Both facings and reduced motion covered; physical phone appearance not inferred.

Downloaded artifact hashes independently matched: Basic12241547841 `3b82000f6ca8023bbb5474cf7ca36c8a7ae538cbdd6ead8d6d337a71978451ec`; mobile12241701561 `4f5f58b8745e7f8e894da6aec193572977a6414b85706b15f99bd2eeecdaa08a`; Pages12241835976 `ab2ac6f85360846ca892a43b6ec01b697949b7a1f173f8ff661c265851aa09c3`. All104built files byte-exact equal CI; public16complete index/JS/CSS/runtime PNG files match CI/local SHA256. Details P2_MOVE_BODY/{release.json,public-fingerprint.json,basic-browser.json,mobile-viewport.json,actor-scale-trace.json.gz}. Actual rendered Move144×139.5/foot0, source density0.9, restored original body footprint; generated per-state head-span metadata is a posed source diagnostic, not an equal-face-size claim. Actual raster excerpts inspected and retained in actual-built-continuity.png.

Test URL: https://hansen0318.github.io/shanhaijing-arena/?v=0fe44b3c5eed46402d0394af6dff128a72be7393 . NEXT ONLY scoped P2 phone review: ready→Move→stop→Basic→Move; keep Heavy paused and defect not PLAYER VERIFIED until explicit confirmation. Do not rerun unchanged approved P1/art/whole suite/release or restore25/32Move conversion. This release closure supersedes historical pending text below; evidence-only commit[skip ci].


## Player evidence and scope

Player at12:43 Asia/Taipei: 「準備的時候正常大小。移動的時候會變小。打架的時候又變正常，應該只剩下移動的動畫參考的圖要調整和待機準備一樣大」. Inspected both supplied phone PNGs: countdown uses accepted large static actor, locomotion is visibly smaller. Idle/Basic remain protected. This is new rejection of Move size, not phone acceptance of earlier diagnostics. Their loaded source SHA is unproven; do not blame cache.

## Root and correction

The prior Move descriptor calibration incorrectly treated25px static vs32px posed longitudinal face lengths as a reliable whole-body scale ruler. It multiplied the original approved body source density0.9 by25/32, yielding0.703125 and an actor22% smaller. Prior tests compared the renderer to that same wrong expected density and therefore passed while the player-visible body shrank. No residual parent transform was required to cause this bug.

Keep exact approved source pixels, pose order/cadence/mirror, original Idle144×144 and Basic177.75×160.875. Restore Move to its original160-unit authored body grid at0.9 world/source-pixel (display144×139.5 for the losslessly packed160×155cell). Keep original support calibration: packed foot153, origin153/155, ground0 in both facings. This removes the wrong pose-dependent25/32 conversion at the data source; no `if character` renderer code or arbitrary post-render scale multiplier is added. Shared calibrateAnimationBody remains unchanged, now supplied the matched160-unit authoring spans for this source pair.

This does not stretch crouches to the upright outer bounds, nor claim the posed face length is identical between different original drawings. Four original Move poses and their equipment/trunk bulk were inspected alongside accepted static/Basic at one display scale. A secondary equipment-region gold pigment-area measurement detects undersizing independently of the skull assertion: source static1525colored pixels, four Move2019/1895/1887/2001; old projected area was75.5–80.8% of static, restored projected area123.7–132.4%. This is a coarse bulk/perspective-tolerant regression, not a full anatomy/perspective invariant. ROI/mask/source SHA256 in P2_MOVE_BODY/measurements.json; old/new pose board in source-density-comparison.png. All source bytes are unchanged.

## Changes and protected scope

Production: `src/roster/catalog.js`, only P2 battleMove calibration spans/comment. Renderer, shared calibration implementation, PNGs, action/FX, gameplay, timings, KO, AI, rewards/save/Tier unchanged. Deep-equality checks against recoveredc99256f establish every P1/P3/P4/P5 catalog field unchanged and every P2 field outside battleMove unchanged. No other character fix is authorized by this correction.16MiB decoded cap,131072reserve and required39keys/16,639,660bytes unchanged.

Tests: botuoStaticScale/botuoMove/botuoBasicRuntime expected Move body contract corrected. Small independent equipment assertion RED on old production data (Idle1PASS/Move1FAIL), then GREEN; initial combined46tests38PASS/8FAIL due old Move expectations, then all115affected tests PASS after source correction. Build/81file Asset Guard PASS. Existing five full-suite failures remain recorded in P2_STATIC_SCALE_FIX.md; full suite not rerun or claimed green.

Browser gates: existing Basic real-raster checker retains all4Move cells/4Basic phases, face/foot/source/contact/hit/miss/cleanup checks, but the invalid cross-pose facial-length assertion is replaced by correct Move body density. Existing built-entry actor trace records posed Move facial span28.8 separately from Idle/Basic22.5; it requires body source density0.9/foot0, actual movement/retreat/KO/Retry/Restart/Exit. No assertion that different face poses have identical projected longitudinal height. In addition to6mobile Chromium/WebKit entry checks, `[move body release]` opts in to the4case cross-roster built-entry trace before Pages deployment; failure blocks release.

## Release status

ENGINEERING CHECKS PASS / REAL-BROWSER + DEPLOYMENT + PUBLIC FINGERPRINT PENDING / NOT PLAYER VERIFIED. Release flags `[botuo basic release] [botuo body scale] [viewport release] [move body release]` use existing feature/PR1 pipeline. No new branch/main merge, Heavy/P3/art generation. After verified release, ask only for P2 countdown→Move→Basic→Move→stop phone comparison. Keep defect open until explicit player sign-off.

Phone evidence SHA256:
{
  "IMG_2688.png": "0cf55390cb1d2a4afacabe3255972960e619d622929e69d6117f38dff2b510aa",
  "IMG_2689.png": "1f70166400a85e18b223c00ceb8c183139bc531aaac6d77116636eb07a7cffb7"
}
