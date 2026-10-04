# Global BACK / Team layout executable validation

Status: ENGINEERING PASS / PLAYER SMOKE PENDING.
Recovered ae1a90f216a0de54958ac1e7ed6266670e503370 on feat/m0-combat-core-20260927 / PR #1. Chat source retained; no main merge.

## Work delta
Tests/docs only. Initial 83/86: two Collection mocks missing classList.add, one CSS row parser expecting old fixed upper min height. Updated mocks and flexible row/back-safe-area budget expectation. Added shared lower-left BACK / overflow-hidden / intended Collection grid/detail and Info scroll contracts; Team no team-status and contain/.98 centered square portrait / narrow right BATTLE asserted. No production or asset/gameplay change.

## Executed checks
node --test tests/teamView.test.js tests/teamLayout.test.js tests/teamFlowView.test.js tests/teamNavigation.test.js tests/teamFilter.test.js tests/teamMatchup.test.js tests/collectionView.test.js tests/collectionLayout.test.js tests/collectionNavigation.test.js tests/campaignNavigation.test.js tests/infoHub.test.js tests/viewportSync.test.js tests/routeOwnership.test.js tests/appRouteReset.test.js tests/lushuTeamBattleCorrection.test.js
87/87 PASS. Includes selection/required slots/filter/navigation, Collection remembered scroll/focus, Info hub/back and viewport/orientation lifecycle. No full local regression.
Asset guard 40 files /148075 bytes; npm run build and git diff --check PASS. Existing large-chunk advisory unchanged.
Build: index-DAMFDu9B.js / index-BKlCRJc6.css / battleRuntime-Bo58up-H.js.

## Additional CI expectation correction
Checkpoint b147218 / Actions37193597008 was blocked by one stale full-file campaign CSS hash in formalChapter.test.js. Verified Landing CSS section byte-identical to previous release and Chapter2–6 fixture untouched; updated approved campaign CSS hash to e7622e713b191df01a3440d790df3bffb98a822733ec8a3ddf949138fb12a827. Directly impacted formalChapter file 9/9 PASS. No full local regression; existing workflow runs its configured test suite unchanged. Total executor targeted tests 87+9 PASS.

## Deployment evidence
Source b80597621fd66256ee7e5ff5fbfcce2fe32eb40e; tested tree 2ec81c5f449f997894845d4b6aa25a7dde92478e. [Actions37193707005](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/37193707005) completed SUCCESS. Original feature branch / PR #1 remains open, no main merge.
Public https://hansen0318.github.io/shanhaijing-arena/ exact build byte matches:

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| index.html | 1491 | b70db9862879dfd3d210587d654151d04ae2a861a18440f529626209c6ca6d30 |
| assets/index-DAMFDu9B.js | 91991 | dc3bbc1f4b73fa7394379ae411ebc4f0ff9213710e3fc03ad1488885bf43542f |
| assets/index-BKlCRJc6.css | 21531 | 92751e7ba0bf60a9709969ba28e0a5dabbc399a915d30c9c2d8be56f7423407e |

## Executable public inspection
Cloud viewport 1363×936. Chapter/Stage/Team/Collection/Detail/Info hub+Guide root client dimensions and scroll dimensions both 1363×936, overflow hidden, scrollTop 0. BACK x20/y878–880; headings x16–20/y6–16. No runtime production defect found.
Team square portrait 56×56, contain and loaded; head/horns/name/Type retained. No team-status/READY. BATTLE112×40 at right x1231. Speed filter returned one card; All restored three; selected team filled three slots and enabled BATTLE. Upper allied/enemy full identity/VS retained with complete figures in screenshot, no design rewrite.
Team BACK→Stage→Chapter→Landing, Collection→Detail→Collection→Landing and Info→Guide→hub→Landing executed. Detail close restored focus to original 鹿蜀 card and root/grid scrollTop0. Collection grid / detail body / Info hub+body computed overflow-y auto; root remains hidden. Nonzero remembered grid restoration and orientation/visualViewport transitions proven by impacted tests, not falsely claimed from tall desktop where internal contents fit.
Phone safe-area/Safari short-landscape readability remains player-owned smoke. No production, art, animation, battle, progression or schema changes by Work.

## STOP / phone smoke
Confirm lower-left BACK + upper-left title across affected menu/detail/info screens; no unintended whole-page scrolling and intended internal scroll/BACK restoration remain correct. Team square portrait/name/Type/no head crop, no READY text, compact right BATTLE, filters/full-body preview usable. No new character/Hit/KO/Cast/VFX/audio/Chapter2 scope. Stop for player smoke; no player-verified or global hard-rule promotion claim.
