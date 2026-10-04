# Global BACK / Team layout executable validation

Status: CHECKS PASS / DEPLOYMENT PENDING.
Recovered ae1a90f216a0de54958ac1e7ed6266670e503370 on feat/m0-combat-core-20260927 / PR #1. Chat source retained; no main merge.

## Work delta
Tests/docs only. Initial 83/86: two Collection mocks missing classList.add, one CSS row parser expecting old fixed upper min height. Updated mocks and flexible row/back-safe-area budget expectation. Added shared lower-left BACK / overflow-hidden / intended Collection grid/detail and Info scroll contracts; Team no team-status and contain/.98 centered square portrait / narrow right BATTLE asserted. No production or asset/gameplay change.

## Executed checks
node --test tests/teamView.test.js tests/teamLayout.test.js tests/teamFlowView.test.js tests/teamNavigation.test.js tests/teamFilter.test.js tests/teamMatchup.test.js tests/collectionView.test.js tests/collectionLayout.test.js tests/collectionNavigation.test.js tests/campaignNavigation.test.js tests/infoHub.test.js tests/viewportSync.test.js tests/routeOwnership.test.js tests/appRouteReset.test.js tests/lushuTeamBattleCorrection.test.js
87/87 PASS. Includes selection/required slots/filter/navigation, Collection remembered scroll/focus, Info hub/back and viewport/orientation lifecycle. No full local regression.
Asset guard 40 files /148075 bytes; npm run build and git diff --check PASS. Existing large-chunk advisory unchanged.
Build: index-DAMFDu9B.js / index-BKlCRJc6.css / battleRuntime-Bo58up-H.js.

## Remaining release step
Push safe checkpoint; verify Actions, Pages exact public JS/CSS fingerprints and actual Chapter/Stage/Team/Collection/Detail/Info lower-left BACK / upper-left title / no outer scroll; preserve intended internal scroll. Then engineering pass / player smoke pending and STOP.
