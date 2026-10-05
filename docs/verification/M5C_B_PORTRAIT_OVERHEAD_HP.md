# M5C-B 鹿蜀 / shared portrait and overhead HP verification

Status: **ENGINEERING PASS / PLAYER SMOKE PENDING**.

Chat checkpoint `1e14b025d5ed559a9ee2c86e8dd570d976ba5623`; tested/deployed source `89429fc5c8573001d235907d41ed92c67352666d`. Active branch `feat/m0-combat-core-20260927`, existing PR #1, no main merge. Accepted presentation baseline recovered; no new art/characters/states/VFX scope.

## Executable findings and bounded corrections
- Initial impacted61/60PASS: stale global transform-scale assertion incorrectly counted the new compact crop as lineup enlargement. Narrowed it to lineup rules.
- CI #624 exposed stale `lushuIdle` scene double lacking the new hpBar and old label offset. Updated only the double/expectation; #625 then passed.
- Actual Canvas runtime rendered six black-only overhead bars: Phaser Graphics fillGradientStyle is WebGL-only. Added Canvas-only16 explicit color strips; WebGL retains original gradient. Display-scale seams reproduced and removed with1px overlap capped to live fill endpoint. No second HP state, no combat math changes.
- Actual HUD setCrop masked the source without fitting it, leaving a smaller portrait within the square. Kept Chat .82 source crop/anchor intent and fit the visible crop using display size and origin. Ally canonical/enemy horizontal mirror preserved. Assets unchanged.
- Regression tests failed for visible-square fit and Canvas color fills before each fix; green after correction. Canvas seam assertion also failed before bounded overlap fix.

## Required checks
Impacted **72/72 PASS**:
`node --test tests/overheadHpExecution.test.js tests/lushuIdle.test.js tests/assetPresenter.test.js tests/battleHud.test.js tests/lushuPresentationCorrection.test.js tests/teamLayout.test.js tests/teamFlowView.test.js tests/teamNavigation.test.js tests/collectionView.test.js tests/collectionLayout.test.js tests/collectionNavigation.test.js tests/assetMenu.test.js tests/assetIntegration.test.js tests/lushuTeamBattleCorrection.test.js tests/hudCardLayout.test.js tests/viewportSync.test.js`

Executed production Arena.applyFrame with faithful display interfaces at full/damaged/KO HP in both renderer paths. Overhead painted extent agrees with side HP ratio; gradients differ by side; KO hidden; formal/placeholder clearance and actor isolation hold. Actual HUD test records source crop, visible64×64 footprint, reuse, mirroring and destruction. Idle/facing/fallback/cache/menu/navigation impacted contracts PASS.

Asset guard **40files /148075bytes PASS**; `npm run build` PASS; `git diff --check` PASS. Existing large battle chunk advisory retained; no architecture refactor. Local verification remained impacted only; existing CI workflow runs its configured suite.

## Pages/public verification
[Actions #627](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/37247750569): Test/Build/Pages SUCCESS, build111568921383 /deploy111569005611. #626 also passed before final seam correction. Source fingerprint verified against local dist, not inferred from deployment status.

| Public artifact | SHA256 | Byte match |
| --- | --- | --- |
| index.html | a9c0db82fc46fae58f978a6a3935fc5d66580f385f99ca58df9961526d8544c8 | True |
| assets/index-DcqtNRF0.css | a20af2bfa9f5a700823772a0d7e0391b1760c35336de8cc621b36e54bad501da | True |
| assets/battleRuntime-BRrwb49l.js | f78b4865a3577a7ed9adb8061a1f653ff2b34ba559601fcf7e50922558deee93 | True |
| assets/index-C6kJVdIb.js | 80ae25f694b3567b27d2886ee30f222be20469ae5c0118a33e186146b839198a | True |
| assets/characters/lushu/portrait.png | 235e95ae32fa19232877996b07ebfe283ff94577b049b1b00a6877f44edaa87f | True |
| assets/characters/lushu/identity.png | bf82ac4f64f517a5503f6a3cabc53e046df8ef9ce16bf9ba5dba8d6567f497a1 | True |
| assets/characters/lushu/battleIdle-4f.png | ca123eb6eb15c1f32fab2c9d732d40d7db279ed2e4332a1043172d3fb0bef327 | True |

## Actual public runtime smoke
Chrome1363×936; iPhone/Safari acceptance remains player-owned.
- Team lower /Collection compact portrait: cover1.22 crop scoped to cards, names/Type and layout preserved; root clientHeight=scrollHeight936.
- Character Detail: identity.png /contain /transform:none, independent of compact crop; close returns focus to original card; no outer scroll.
- Normal3v3 formal and placeholder actors rendered without app crash; initial inspection found the two bounded defects above.
- Final shared-runtime Lab NORMAL at50% initial HP/skip countdown: HUD face region fills its square, allied portrait faces right/canonical, enemy mirrored left. All six living actors have visible blue/red gradient overhead bars above silhouette. Healing values162/245,212/320,156/235 and bar proportions agree. Damage/heal text remains above HP in render depth; bar does not cover formal face.
- Final Lab TYPE ADVANTAGE, T0 allies at25%HP vsT3 enemies, skip countdown: actual damage left ally side HP51/320,11/245,58/230 and enemy851/863; overhead proportions track damage. Subsequent Defeat has all ally side HP0 and all ally overhead bars hidden; living enemy bars remain. This is existing no-save fixture configuration, not production gameplay changes.
- BACK TO LAB cleans canvas count to0. Final public Landing reload works. No extra visual/state art produced.

[Final HUD/HP screenshot](M5C_B_PORTRAIT_HP.jpg), [damage screenshot](M5C_B_PORTRAIT_HP_DAMAGE.jpg), [KO screenshot](M5C_B_PORTRAIT_HP_KO.jpg).

Next exact action: focused phone smoke of compact portraits (HUD/Team/Collection), independent Detail full-body, ally/enemy facing, overhead HP colors/placement/synchronization and KO hiding. STOP. Do not start 猼訑 Static Asset Pack, Idle/state art, VFX, audio or Chapter2 in this slice. No player verification claimed for this correction.
