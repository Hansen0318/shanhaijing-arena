# SDD ledger — plan: docs/superpowers/plans/2026-10-22-lushu-passive.md

Base:7497b3545cd618b0f349393f5b88a0707b4a6f13. Spec and plan approved; native single-agent. Tasks1–4 pending.

Pre-flight Task1→Task2: PassiveRuntime.characterForActor supplies Tier-projected instance definitions, ordinary segments only. Task2→Task3: immutable PassiveView snapshot, no UI clocks. Task3→Task4: actual renderer independent formal-art badge and real CSSfont metrics. Task4: normal source-bound release guard must block unverified source.

Ruling: Use existing task-specific feature checkout in scratch; user forbids alternate branch and all prior work uses this checkout. No linked worktree/new branch; preserve unrelated untracked. Cost if wrong: no extra checkout-level isolation, mitigated by exact staged path allowlists.
Ruling: Cloud skill scripts have no local executable root; implement their ledger/brief/completion steps in .git/lushu-passive-work and copy durable evidence to WORK_LOG. Cost if wrong: bookkeeping implemented manually; commands/results recorded explicitly.
Ruling: Reuse source-identical1014/1014 baseline rather than rerun unchanged fullsuite at setup per user rule; after shared Runtime changes run actual fullsuite normally. Cost if wrong: environment-only baseline fault discovered later, distinguish using saved source/evidence hashes.
Ruling: Existing project explicitly requires native single-agent/self-review, so do not spawn final reviewer; document independent-review limitation. Cost if wrong: same-author blind spots, mitigated by RED→GREEN/real browser/fullsuite and focused self-review.

Task1: ACTIVE. Read task brief and approved spec; tests first.

Task1: complete — new schema/runtime10/10 PASS after10 intendedRED missing-feature failures; command node --test tests/passiveDefinition.test.js tests/passiveRuntime.test.js. Production roster stilldisabled. npmci exit0, Node24.19.0 satisfies>=22.12.0; normalCI willuse22.12.0. Exact RED/GREEN logs saved besideWORK_LOG.
Task2: ACTIVE — motion/session tests first.
Ruling: optional writing-good-tests reference is unavailable from cloud package; main TDD instructions read and applied, actual feature-missing RED and real status behavior tested. Cost if wrong: missing supplemental testing advice; no gate bypass.

Task2 Ruling: first integration failure traced to testfixture failing to reassert existing0ms manual override before each externalstep; the realUI holds control eachtick. Add stepHeld fixture only, preserve productioncontrol timing. Cost if wrong: manual-input regression could be masked, covered separately by existing handoff tests and built-input check. Diagnostic debug-motion.log shows AI resume after firststep.

Task2 Ruling: retain advanceStagedMotion as staged-only public entry while moving its single shared resolver to advancePlannedMotion for passive-only paths. Two existing stagedActionClock failures measured staged-entry calls, not elapsedtime; preserve that interface without changing assertions or introducing a second engine. Cost if wrong: caller instrumentation ambiguity, now explicit by method.
Task2 fix: rolling solver omitted candidate.start+window breakpoint for a prospective6second leg; separate regression1.5 vs0.5 RED, include candidate knots GREEN.

Task2: complete —146/146 pass (new core/motion/session plus10 existing directlyaffected testfiles), aftertask2 missing-featureRED and recorded core/staged-interfacefixes. Source general movement only; P1dataenabled, P2–P5disabled; no Browser/deploymentyet. Logs exactgzip besideWORK_LOG.
Task3: ACTIVE — real visible badge/HUD/Collection tests first.

Task3 Ruling: fullsuite1039/1025/14 failures traced to threeVMscene harnesses stripping imports without injectingnewPassivePresenter, two directapplyFrame doubles lacking presenter/canvas, and rosterTeam assertingallpassivesfalse. InjectrealpresenterintoVMcontexts with renderercontainerdouble; add neutralnewUIboundary toHP/identity-onlydoubles; updateexpectedmetadataP1only. Preserve all existing assertions and add passivepresenter shutdownassertion. Cost if wrong: doubles could missrendererfault, realBrowser remains mandatory. Full firstTAP retained.

Task3: complete — declared UI/Collectionimpacted43/43PASS plus migratedsceneharness27/27PASS, existingart/HP/identity assertions retained. Initialfull1039/1025/14fail exactTAP retained, fixturemigrations verified; finalfullsuite dueTask4afterverifiercode. BuildPASS91assetguard, no newart. LocalChromium standardinstallfailed(download), completebrowser-installlog retained; useactualActions verification ratherthan claimlocalBrowserPASS.
Task4: ACTIVE — sourceboundreleaseverifier RED, actualremoteBrowser/compatibility and normalreleaseproof. PublicGitHub API confirmsTask2 P2nativeAction39791130497SUCCESS, normal39791130502FAIL; these are not newP1UIproof.

Task4 Ruling: old P2browserfixture clears allsessiontransients beforecase, which now intentionally clears passive registration. Reinitialize a freshgenericPassiveRuntime afterthatclear in thetestscript, so compatibility actuallyexercisesnewsharedmotion; don't alterproductreset or oldreports. Cost if wrong: testfixture differsfromnewsessioninitialization, constructorinputs matchrealSession.

Task4 engineering: full1042/1042PASS andBuildPASS; verifier3/3RED→GREEN. Newverification-onlyworkflow runsactualP1native4/built2 plusnewsourceP2native4/built2/scale10. ExistingPagesguardstillblocksnewsource untilsourceboundfreshreceipt; notbypassed. CurrentBrowsernotyetexecutedfornewscript.

Task4 Browser COMPLETE: local real Chromium151/Playwright1.62.1 native4/built2 PASS; real852×393 built joystick route, both facings/reduced-motion, font>=12CSSpx, actual speed/distance1.08, expiry/Pause/cap1.15/KO/restart and six-label zero overlaps PASS. Screenshots inspected: readable badge and actual HUD2.214/2.0s/CD4.0s. P2 native4/built2/scale10 PASS in Actions39793433740 on exact same src/public; source-binding retained. Fullsuite1042/1042 and BuildPASS locally and remote. Failed first browser probe preserved: Phaser4 Graphics lacks getBounds; observation now uses actual HP anchor.rect, product source unchanged. Official browser archive validated after CDN partial-response download failure.
Ruling: source-identical P2 compatibility proof reused, and verification workflow reuses complete current-source-bound receipt when valid; stale/missing receipt runs Browser and normal Pages guard still rejects. Fullsuite/Build always normal CI. Cost if wrong: provenance mismatch; mitigated by complete src/public and all scripts/tests/dependencies hashes, real negative changed-source rejection plus restored-positive proof. No bounded-test marker.
Task4 release ACTIVE: normal workflow now requires new receipt549 bindings, immutable spec/plan approval plus real reports/screenshots. Physical phone PLAYER ACCEPTANCE remains pending; P2 queued and P3 blocked.

Normal release82257f9ea2fc6ad88e2ab3afe8241f270c550a1b/treeb63489cfb9dbf334bdf0956559e3747b36113c10: Actions39796107767 buildSUCCESS1042/1042, BuildPASS, guard549PASS. Verification39796107824SUCCESS. Pages artifact12432129680 CI/local149/149 exact bytes. Deployment7254931808/job119883988676 QUEUED, no pending approvals, public newbundle404. Task4 engineeringcomplete, release/public/player pending. Do not rerun unchanged sources or ask player to accept old public version. Observe existingjob then publiccompare.
Ruling: finishing-a-development-branch menu overridden by user's explicit samebranch/PR#1open/unmerged; no merge/newbranch/worktreecleanup. Cost if wrong: none from integration because explicit instruction retained. Native self-review limitation remains recorded.
