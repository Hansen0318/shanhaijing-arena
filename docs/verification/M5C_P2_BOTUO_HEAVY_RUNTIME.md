# P2 Heavy — preserved timing runtime integration

## Current state

Player A approved, receipt docs/art/approved/botuo/heavy/executable-v1/acceptance.json. Source-preserving runtime integrated locally;136directly affected tests PASS, build/84file guard PASS. Not deployed; browser gate pending. Detailed machine evidence and logs: P2_HEAVY_RUNTIME/engineering.json, affected-tests.log, build.log.

## Change

Generic ability data actionLifecycle existing-impact emits observational start/resolve/cancel tied to existing delayedImpacts. No pendingActions insertion or AI/input/movement/CD/targeting/collision/RNG/HP changes. T0tactical650ms and Tier scaling preserved; immediate non-tactical/whiff start+resolve at same current time entersF3, no new320ms or250ms. Existing Heavy F1/F2/F3/F4 images and GIF are immutable. Independent source230×144 cropped-review raster/280ms afterglow, hit-only target204×161/280ms contact; F3/F4body160ms each. Generic resolve catch-up preserves a real Heavy contact if another legal action replaces its presentation; bounded event dedupe, no fake damage or simulation lock.

Heavy body uses exact accepted .126review-density cells175×162, crop93,123→268,285, support42/175 and ground151/162. No single-face/silhouette-height fit or post-render P2 multiplier. Source and contact world transforms independent. Original Idle/Move/Basic/KO pixels, descriptors and geometry remain unchanged forP2. Final actual browser/anatomy review still required, not phone-approved.

Capacity: per-frame zero-RGBA trim ofP3/P4/P5 Move only, existing originals retained, exact fullRGBA reconstruction. Shared native-Phaser Frame.setTrim retains original logical cell/pivot/scale/FPS/mirroring; no resampling/redesign. Original logical sizesP3 160×118,P4 160×133,P5 560×414 preserved. New atlases smaller; full per-frame original pixels and both-facing world positions verified. Saved734952bytes; newHeavy717456;42required keys16622164bytes under unchanged16777216 with131072reserve+23980extra. All portraits/Idle/Move/KO/actions pinned, both load orders0failure and cleanup0bytes; no required-key eviction. New tests supersede hard-coded historical atlas coordinate/file-count/residency assertions while retaining original master hashes and movement gameplay checks.

## Verification and release

TDD failures observed before schema/renderer, packing, lifecycle and concurrency changes; final136affected PASS. Tests exercise19mechanics-equivalence/whiff/cancel, both-facing/reduced/normal/source/contact/realHP/Idle/Move/KO/Pause/cleanup, rawPNG reconstruction and complete resident set. FullP1 acceptance not repeated. Five preexisting full-suite failures remain named in P2_STATIC_SCALE_FIX.md; scoped suite is not whole-suite PASS.

Build guard84files4336374bytes PASS. Local browser package installed but browser ZIP truncated; do not claim local WebGL. New CI[botuo heavy probe]runs same affected suite/build plus checkBotuoHeavyBrowser.mjs (8tactical/instant×normal/reduced×both-facing,24native-trim original/current raster comparisons,40screenshots) and checkBotuoHeavyBuiltEntry.mjs (2actualmobile-emulation built entry/control-callback/HP/contact/Pause/Restart/cleanup cases). Probe explicitly skips all Pages upload/deploy. Real screenshots/results must be inspected, failures fixed, then normal[botuo heavy release]with same gates deploys. This adds a bounded new release gate, not a bypass using old viewport/basic tags.

NEXT run CI probe, inspect actual browser evidence and fix any issue; checkpoint before long steps. Once PASS, publish exact tested feature release and verify complete public asset fingerprints, then supply scoped phone checklist. P2 Heavy runtime not PLAYER PHONE VERIFIED. No Special/Awakening/P3 art production/main merge.
