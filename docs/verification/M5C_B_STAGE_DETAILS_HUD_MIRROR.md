# M5C-B Stage details / START / HUD mirror verification

Chat checkpoint `223ca5b899392d170b94ff6888fbf7798185c840`; original feature branch /PR #1; no main merge.

## Executable checkpoint
Initial77tests75PASS/2stale expectations: old Stage overlay and campaign CSS hash. Updated tests to text-free image, right chapter/stage/reward stack and separate page-level START. Added executable HUD presenter check: canonical ally, mirrored enemy, unchanged square size, reuse, cleanup and no actor mutation.

Impacted78/78 PASS: boundedCorrections, assetPresenter, teamLayout, teamFlowView, teamNavigation, campaignNavigation, formalChapter, lushuPresentationCorrection, viewportSync, routeOwnership, assetMenu, assetIntegration, lushuTeamBattleCorrection, hudCardLayout. Asset guard/build/diff PASS. Existing large battle chunk advisory remains. Production source/art unchanged relative to Chat checkpoint.

Build index-b1hadBZG.js /index-Dx6h4tHE.css /battleRuntime-BKb1rtoD.js.

## Deployment and executable smoke
Status: **ENGINEERING PASS / PLAYER SMOKE PENDING**.
Tested/deployed source `0ee341e5df066eb7312c53231a5b3fad989f11f1`; Actions [#576](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/37204231115) SUCCESS (build111441961581/deploy111442022654). Original feature branch `feat/m0-combat-core-20260927` /PR #1; no main merge. Workflow Test/Build/Pages all passed. Local verification remained impacted only.

Public index.html and every generated JS/CSS byte-match local dist:

| Artifact | SHA256 |
| --- | --- |
| index-b1hadBZG.js | f0c1cd5c7463343ef44b75595a6fe8d3179660631704816b41ffe04e843fe38e |
| index-Dx6h4tHE.css | 35b4b5ca4c0e966abebe48ae407bcd99f994d26690cdd4c735abeb20bc574c3c |
| battleRuntime-BKb1rtoD.js | 7390de228917bd5b3a9fd39850a8cac3fd053d83c88120ec0ae55c5efa422870 |

Public Chrome1363×936 smoke:
- Stage image text-free; chapter/stage/rewards right stack unobscured. BACK at20,878,82.3×46; START at1231,878,112×46. Both bottom924; root clientHeight=scrollHeight936.
- Team full-body allied/enemy formal art visible, no formal SLOT/E/front/name captions; placeholders retained. Refresh re-entry has one Team page, loaded formal images and no remnants; root936=scrollHeight936. Re-selection replaces formal placeholder cleanly.
- Battle HUD ally portrait canonical facing right; enemy portrait mirrored facing left. Formal sprite remains visible without graybox dot/ring/labels; other actors retain placeholders.
- Exit confirmation returns Stage with canvas count0 and root936=scrollHeight936.
- No actual runtime defect found; production untouched. Desktop/cloud smoke is not iPhone/Safari acceptance, and does not claim continuous combat playback verification.

[Stage screenshot](M5C_B_STAGE_DETAILS.jpg) / [HUD mirror screenshot](M5C_B_HUD_MIRROR.jpg).

Next: player iPhone smoke only (Stage details/START/BACK, Team refresh, enemy/ally HUD direction), then STOP. No new characters, state art, VFX/audio/Chapter2 or hard-rule promotion.
