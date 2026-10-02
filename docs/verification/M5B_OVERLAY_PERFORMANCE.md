# M5B overlay / performance follow-up

Status: RELEASE VERIFICATION PENDING; physical PLAYER SMOKE PENDING.

## Recovery and scope
Canonical remote7357d234513eb8984c0aff2b8f305de79e88cea8, feat/m0-combat-core-20260927 / PR1. Previous deployed source7555c0b4de3485cce0cb5f271f1fb456c8b92392 / Actions356. Ordinary reload intentionally starts Landing; Chapter/Stage are not URL or saved routes. No reward/accounting/Tier/combat/Chapter content/view CSS changes.

## Overlay findings and correction
Player Landing screenshot shows a large blue area; Stage screenshot shows blank placeholders. Exact phone compositor artifact was not reproduced in desktop cloud, so its physical resolution is not claimed.
Confirmed lifecycle defects: Phaser booted at initial Landing, remained live after returning to menus, and viewport/pageshow refreshed its hidden canvas. Phaser Scale.refresh derives scale from canvas bounds; zero-sized hidden bounds can produce invalid ratios. Hidden attribute alone was the only DOM separation.
Route owner now detaches the battle host on every non-battle route and restores its original position only on battle. Menus stop the renderer; viewport refresh is limited to visible landscape battle. Render closes battle-only controls/dialog. Initial HTML still hides host before JS. No arbitrary clipping or z-index patch.
Cold entry retains menu until module is ready, makes its subtree inert independently of orientation, and releases it on success/error/render. Failed download returns usable preview with retry message. Entry tokens reject late canceled loads. Warm restart remains synchronous. Stale Phaser boot sleep is queued after Phaser loop.start rather than overwritten inside postBoot.

## Loading diagnosis and measurements
Same production build tooling, raw files and Python gzip.compress (not transferred HTTP sizes):

| Asset | Before bytes | After bytes |
| --- | ---: | ---: |
| Initial JS | 1,458,758 | 67,234 |
| Initial JS gzip | 379,677 | 22,275 |
| Deferred battle JS | included above | 1,393,903 |
| Deferred battle JS gzip | included above | 358,563 |

Initial raw JS reduced95.39%; no phone wall-clock timing claim. Static Phaser/ArenaScene imports previously forced the full battle graph before Landing execution. Dynamic import now defers that graph until first battle; cached subsequent entries do not fetch/await it. Large Phaser chunk advisory remains. First battle pays this download; deeper Phaser tuning deferred to avoid destabilizing combat.
36 Campaign SVGs total17,454 bytes, maximum495 bytes; intrinsic640x300. Existing cards reserve aspect ratio and preview has fixed dimensions/object-fit. No raster payload bottleneck or image optimization change justified. Public Chapter images loaded complete at natural640x300 before change. Views render synchronously without awaiting images. Desktop did not reproduce the player blank images; network/device behavior remains to check.
CSS remains index-082fIvTy.css. New JS index-DfDphhuN.js / battleRuntime-CT8Z1Rjm.js.

## Verification
TDD RED then GREEN for lazy load/cache/retry and host detachment. Targeted29/29: lazyBattleRuntime, appRouteReset, routeOwnership, battleRestart, viewportSync. Covers Landing/Collection/Chapter/Stage, restoration/orientation, enter/exit/back, pending inert/resize/release, canceled/error entries and real Phaser postBoot ordering simulation.
Impacted136/136: preceding suites plus landingView, collectionNavigation, campaignNavigation, campaignRewards, rewardPresentation, resultShardProgress, tierT0Correction, acquisition, acquisitionPersistence, collectionView, formalChapter.
Full npm test419/419, zero failures; npm run build PASS; git diff --check PASS. All existing combat and protected progression regressions included in full suite.
Independent read-only review found pending menu interaction race and pre-start sleep ordering gap; both resolved. Re-review: no remaining blocking findings,28/28 suites pass (new stale boot ordering test added afterward; full419 includes it).

## Release evidence
Pending push, Actions, Pages and public bundle verification.

## Boundary and focused next smoke
Formal type advantage ALREADY exists: typeMultiplier.js + combatResolver.js, Power>Speed>Blast>Power,1.15/0.85. Not added/changed here. INFO remains unimplemented.
Player normal URL, without reset: reload Landing landscape; BATTLE→Chapter→Stage images; START→Team→battle→EXIT/BACK; COLLECTION→BACK; rotate and return landscape. Confirm no blue block, usable buttons, pictures, saved progression preserved. Compare entry wait and first-battle wait separately. No full chapter replay necessary.
Deferred: physical Safari compositor/network timing; deeper Phaser splitting; type/INFO/art/animation/AI work. STOP.
