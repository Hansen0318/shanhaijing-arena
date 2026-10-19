# Mobile menu enlargement / clipping — open defect

## Reproduction and fix candidate

Diagnostic source d5805a840324910139b8ce52adcc29d5e06fd733, Actions39201400645 build117894941331 SUCCESS, deploy SKIPPED. Artifact12163589029 SHA25659b55890047bbff8404f0ab52502b3de3f04f2d0bb35bb46bf67424daa59bfb5 contains actual built-app Chromium/WebKit six cases. Normal landscape/short/rotation/reload/routes fit. Chromium visual-page scale2/3 reproduces clipped menus: layout width852 remains the CSS-vw basis while visualViewport/root width426/284 shrinks; at3 none of the three controls fully fit. This reproduces a mechanism matching the screenshots, not proof of the player's exact device scale or gesture. No page errors.

Fix keeps campaign/canvas logical width/height = visual viewport × page scale and counter-transforms fixed surfaces into the visible viewport, including body-owned orientation/exit overlays. Scale1 remains unchanged; no meta zoom prohibition, font/actor/art/combat/save change. Also fixes visualViewport scroll Event accidentally enabling the pageshow-only transient-height clamp. New regressions RED4/4 before production change, GREEN4/4 afterward; relevant53/53 PASS; build and81-file asset guard PASS. Release browser gate now requires mobile menu bounds and zoomed route navigation, real app Chapter→Stage→Team→Battle, Pause and visible/clickable Exit dialog, return to menu, and zoom restoration. Engineering browser/deployment/public proof still pending; physical phone review remains pending. Heavy paused, PR1 open/unmerged.

## Player report — 2026-10-19

Player「整個變的比例很怪，無法遊戲，妳確認後修改」with IMG_2661.png and IMG_2662.png (2556×1179) shows enlarged/clipped Landing content and a partially filled content surface. This is NOT acceptance of the previous body-scale fix or a request for more character scaling. Prior scoped browser4cases exercised a direct Arena fixture and did not cover actual built-app Landing navigation on mobile. Heavy production remains paused.

Recovered feature c10351c69240292120c63b1601a4682d5b2c2d7a / PR1 open, unmerged, clean worktree. Source comparison confirms the last body correction changed action presentation data, not Landing CSS/index viewport/viewportSync. Root cause of the newly reported page-scale defect is not yet confirmed; do not blame a browser setting or user gesture without evidence.

## Diagnostic slice

`scripts/checkMobileViewport.mjs` exercises the actual built entry, not a replacement HTML game fixture: Chromium and WebKit mobile emulation,852×330/852×240, portrait→landscape, reload, BATTLE/COLLECTION/INFO→BACK and Chromium visual-page scale1.5/2/3/restoration. Save DOM geometry, visualViewport scale/offsets, computed type/transform, menu bounds and screenshots. Browser emulation is not physical iPhone/Chrome-iOS verification. Local host has no browser executable; use existing CI executable environment.

`[viewport probe]` runs49affected unit checks + Build + diagnostics and uploads observations. Configure Pages/upload Pages/deploy are explicitly skipped for probe commits. No live release or production layout change in this diagnostic slice. Probe mode reports observations rather than pretending all controls fit. Future `[viewport release]` enforces menu bounds and runs browser checks before release.

49/49 existing targeted unit checks pass before any fix; this is evidence of a missing real-browser layout regression, not evidence that the player's defect is absent. Next: inspect actual metrics/screenshots, reproduce failing behavior, add corresponding regression, then smallest supported fix and scoped release/public proof. Preserve battle/actor pixels, combat, saves, P1 acceptance, Heavy F3 receipt and16MiB/reserve. No new art/main merge/P3 or arbitrary whole-page/actor multiplier.
