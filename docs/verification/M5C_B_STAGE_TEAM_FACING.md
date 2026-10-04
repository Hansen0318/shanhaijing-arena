# M5C-B Stage / Team / action-facing verification

Chat source checkpoint: `cee00e5e024a8a5fbc758e65a3ebd3b2468f5386`.
Branch: `feat/m0-combat-core-20260927`; existing PR #1; no main merge.

## Executable checkpoint
64/64 impacted tests PASS. Modules: teamLayout, teamFlowView, teamNavigation, teamFilter, teamMatchup, campaignNavigation, formalChapter, lushuPresentationCorrection, lushuIdle, viewportSync, routeOwnership, assetPresenter.

Stale expectations updated for three flow rows, intentional slot overlap and approved campaign CSS. Landing CSS section preserved. Added id/name overlay-only Stage check and attack/cast facing overrides motion, bounded expiry, movement/rest recovery, frozen clock, unchanged actor/origin and cleanup tests. Production source unchanged at this checkpoint.

`npm run build` PASS, including asset guard; `git diff --check` PASS. Existing large battle chunk advisory remains. Generated JS index-DEJ5kEMQ.js, CSS index-CEYMeBel.css, battleRuntime-4-fnTSFJ.js.

## Pending
Existing Actions / Pages deployment, public fingerprints and actual Stage/Team render inspection. Do not claim player verified. No new art/animation/gameplay scope.

## Runtime defect and bounded correction
Actions #550 /37198636741 Test/Build/Pages SUCCESS for `2cc78902527109702342098ce93a61d36f144fa5`. Public Stage at1363×936 shows overlay top-left and separate unobscured rewards/START; page clientHeight=scrollHeight=936.

Team runtime showed computed padding-bottom66px: roster bottom870, BACK/BATTLE bottom924 (54px separation). Shared `.campaign-page:not(.landing-page)` specificity beat `.team-page`. Corrected only the three Team selectors to `.campaign-page.team-page`, imported after campaign CSS, retaining original Chat dimensions and media rules. Added cascade regression (RED before fix / GREEN after); row budgets now use effective intended Team padding.

Targeted71/71 PASS, including six Collection/menu checks; asset guard40files148075bytes, build/diff PASS. New JS index-CAIw_s5b.js, CSS index-DapD6M69.css, battleRuntime-Dxl519vC.js. Correction deployment/public Team verification pending.
