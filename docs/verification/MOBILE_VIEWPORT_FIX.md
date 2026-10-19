# Mobile menu enlargement / clipping — open defect

## Player report — 2026-10-19

Player「整個變的比例很怪，無法遊戲，妳確認後修改」with IMG_2661.png and IMG_2662.png (2556×1179) shows enlarged/clipped Landing content and a partially filled content surface. This is NOT acceptance of the previous body-scale fix or a request for more character scaling. Prior scoped browser4cases exercised a direct Arena fixture and did not cover actual built-app Landing navigation on mobile. Heavy production remains paused.

Recovered feature c10351c69240292120c63b1601a4682d5b2c2d7a / PR1 open, unmerged, clean worktree. Source comparison confirms the last body correction changed action presentation data, not Landing CSS/index viewport/viewportSync. Root cause of the newly reported page-scale defect is not yet confirmed; do not blame a browser setting or user gesture without evidence.

## Diagnostic slice

`scripts/checkMobileViewport.mjs` exercises the actual built entry, not a replacement HTML game fixture: Chromium and WebKit mobile emulation,852×330/852×240, portrait→landscape, reload, BATTLE/COLLECTION/INFO→BACK and Chromium visual-page scale1.5/2/3/restoration. Save DOM geometry, visualViewport scale/offsets, computed type/transform, menu bounds and screenshots. Browser emulation is not physical iPhone/Chrome-iOS verification. Local host has no browser executable; use existing CI executable environment.

`[viewport probe]` runs49affected unit checks + Build + diagnostics and uploads observations. Configure Pages/upload Pages/deploy are explicitly skipped for probe commits. No live release or production layout change in this diagnostic slice. Probe mode reports observations rather than pretending all controls fit. Future `[viewport release]` enforces menu bounds and runs browser checks before release.

49/49 existing targeted unit checks pass before any fix; this is evidence of a missing real-browser layout regression, not evidence that the player's defect is absent. Next: inspect actual metrics/screenshots, reproduce failing behavior, add corresponding regression, then smallest supported fix and scoped release/public proof. Preserve battle/actor pixels, combat, saves, P1 acceptance, Heavy F3 receipt and16MiB/reserve. No new art/main merge/P3 or arbitrary whole-page/actor multiplier.
