# M3 Universal Reward / Farming Follow-up

**ENGINEERING PASS / PLAYER SMOKE PENDING**. Branch feat/m0-combat-core-20260927 / PR#1 open, no main merge/M4. Recoverybase31c8344174cd5f08647864a94bdbf455881eb0f3; safe implementation/deployedsource1f5ef823d18d424dc4ffe97f16a0f08ab48fbeab; laterclosure docs-only. InitialM3 acceptance preserved; this follow-up awaits player.

## Change and root cause
The engine already supported first/replay alternative sets universally, but live1-1/1-2/1-3/1-5 lacked replay metadata. Replace only Chapter1 content with the explicit authorized twofirst/one replay table in canonicalM3§4. All five now farm afterclear. FutureChapter2 syntheticthreefirst/two replay item coverage confirms noenginechange/stage-IDbranchneeded. P4unlocksafter1-2at5, P5after1-5at7, all countsretained.

Campaign visibility was set only initially or when returning frombattle. Campaign render and viewportpageshow settlement did not own/hide stalehost state. New routeVisibility owner setsbothhiddenandvisibility, reasserts afterPhaserrefresh, plusinitialhiddenCSSdisplay:none. Campaign/Stage/TeamownCampaign; Battle/ResultownArena. Geometry/protected combat/input unchanged.

Explicitreset consumes?resetProgress=1 viareplaceState before removingONLY campaign/acquisition/teamkeys, then opensfreshChapter1. NormalURLneverclears; reloadhasnoconsumedtrigger. Historyfailurepreventsdeletion; deniedremovalusesfreshmemoryonly for allsaveadapters. No localStorage.clear. Existing engine/acquisition/persistence/ownership/team modules untouched.

## Actual checks
- Universalfixture RED1/7: sixexpectedoldcontent/unlockfailures; futureChapter2alreadyworks.
- Route/reset RED0/7: absentownership/reset behavior andbootstrapwiring.
- Targeted16/16 GREEN: universalRewards, progressReset, routeOwnership, appRouteReset.
- Initialimpacted117/124: sevenstaleoldfixtureexpectations/appVMmissingnewimports; allcorrected, then124/124. AddedactualmainVMreset/route integration, finalimpacted126/126.
- Finalimpacted command: `node --test tests/acquisition*.test.js tests/campaign*.test.js tests/universalRewards.test.js tests/rewardPresentation.test.js tests/rosterTeam.test.js tests/team*.test.js tests/routeOwnership.test.js tests/progressReset.test.js tests/appRouteReset.test.js tests/viewportSync.test.js tests/preBattleGate.test.js tests/battleRestart.test.js`.
- Independentreadonlyreview39/39 (newfiles16 + changedexisting23), zero findings. Build/diffPASS. ExistinglargePhaserbundle advisoryunchanged.
- [Actions#289 /36881481144](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36881481144) automaticallyranfullCI288/pass288/fail0, BuildandPages success. Jobs110434055193/110434260343. No localfull/historicalvisualsuite repetition.
- Public/local/CI JSindex-fgF_0oLa.js; CSSindex-Da2FpEU1.css unchanged. Publicexisting1-1CLEAR preserved; PreviewP4×3CLAIMED/P2×2CLAIMED/P2×1REPEATABLE. ReloadChapterSelecthasgamehidden=true/campaignhidden=false. Publicresetnotinvokedoverexistingsave; executablebootstrapcoversdestructionfreshstate/consumption/no-wipe.

## Coverage mapping
| User requirement | Evidence |
|---|---|
|1–6 everylivefirst/replay|fiveuniversalRewards perstage cases, exactmetadata/grants/Resulttwo-or-oneitem|
|7–10clearPreviewCLAIMED/repeatable/multiqty|eachstagepolicyrowsbefore/after, actualCampaignViewmultiDOMtestretained|
|11–12ownedpersist/lockedunlock|normalfive-stagepath P1/P2/P3counts4/4/2, P4=5/P5=7, reloadandbench; farmP5=9|
|13–14duplicate/replayonce|perstagecurrent/stalecallbacks andstateunchanged; existingUUIDtests|
|15–16Previewconfig/Resultauthoritative|sameconfigureditems assertions, actualPreviewDOM/SceneResult tests|
|17futureChapter2sameengine|synthetic2-2threefirst/tworeplay items withclaimedstates/restoration|
|18–20routes/reload/pageshow|routeOwnership + actualmainappRouteReset; Phaserrefreshhostmutationmock; viewporteventtests; initialhiddenCSS|
|21–22reset/normalno-wipe|progressReset keyscope/consume/historydenied/storage-denied; actualmainfreshChapter1andnormalkeyretention|

## Exact next player smoke
Use the deployed ordinaryURL with?resetProgress=1 explicitly once if you want to delete thisgame'sthree saves. Parameterdisappears; fresh1-1 opens. First1-1 grantsP4+3/P2+2; replayonlyP2+1. Checkeach1-2→1-5Preview'sfirstrowsCLAIMEDandconfiguredREPEATABLEstillavailable. FirstpathunlocksP4after1-2andP5after1-5; replaysdon'tresetcounts; normalreloadretainssave.

OnactualiPhoneSafari: reload/route/toolbar/rotation mustnotshowstaleArenaoverCampaign/Stage/Team; battle/resultstillshowArena, multirewardrowsandbuttonsreadable. VMmockedPhaser/browsercloudchecksarenotphysicalSafariacceptance. Don'trepeatunrelatedacceptedcombat smoke.

Limits: originalclearsremainCLAIMED/noretro-grantsunlessexplicitreset; migrationunchanged. Deniedstorageonlymemory, receiptsgrow, existingbundlesizeadvisory. STOPbeforeM4; noPLAYER VERIFIEDclaimwithoutconfirmation.
