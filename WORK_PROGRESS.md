# Work Progress

## CURRENT HANDOFF POINTER
- **M3 PREVIEW PRESENTATION CORRECTION — ENGINEERING PASS / PLAYER SMOKE PENDING**. Active branch feat/m0-combat-core-20260927 / PR#1 open. Safe implementation/deployed source2d25cdeb8fb07fbf3e1078b67bff9c66d123bddc; later closure docs-only. Recoverybase0636172132c2719f68d5a154039a1f34e30aac7e.
- Changed only Campaign Preview view/styles: remove FIRST CLEAR/CLAIMED/REPEATABLE spans; keep each character/quantity. Normal available/repeatable rows color#ffe0a0/opacity1; claimed non-repeatable color#bac4cc/opacity.5. Model/grant/firstClear/repeatable semantics/save/config/TeamSelect/combat unchanged.
- Actual verification: RED presentation5/7, GREEN related28/28 (rewardPresentation/universalRewards/campaignNavigation/teamFlowView); build/diff and bounded product diff review PASS. Configured CI full288/288; [Actions#290 /36942296853](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36942296853) Build/Pages success, jobs110636375075/110636469702. Public/local/CI JSindex-BLZigtQP.js /CSSindex-CtA1vGg1.css match. Public fresh1-1 shows allthreequantityrows, no labels, normalcolor/opacity1. Claimed/repeatable styling covered by actualDOMcontract tests; no full battle/device smoke replayed.
- Design record only: future Team Select formal idle/micro-animation retains character name underneath (docs/CHARACTER_SYSTEM.md). No current Team Select/animation implementation.
- Exact next action: player short Preview smoke on an already-cleared stage: no policy labels, claimed first-clear rows clearly dim, repeatable row bright; unclaimed rows bright and mobile readable. Do not reset/retest the accepted reward engine for this visual correction. Previous universal farming/reload acceptance remains as previously recorded, not newly asserted. STOP before M4. No PLAYER VERIFIED claim.
- Evidence docs/verification/M3_PREVIEW_CONTRAST.md. Prior universal fixture, route reset and safe save behavior remain unchanged; current canonicalM3§5 supersedes visible-label wording in old checks.

## Previous universal farming checkpoint (historical)
- **M3 PREVIEW PRESENTATION CORRECTION — RELEASE CHECKS IN PROGRESS**. Branch feat/m0-combat-core-20260927 / PR#1 retained. Recoverybase0636172132c2719f68d5a154039a1f34e30aac7e. Preview labels FIRST CLEAR/CLAIMED/REPEATABLE removed; available/repeatable rows normal contrast, claimed non-repeatable muted+50%opacity. Existing reward/acquisition/persistence/config/TeamSelect/combat unchanged.
- Actual checks: RED presentation5/7 then GREEN28/28 (rewardPresentation, universalRewards, campaignNavigation, teamFlowView); build/diff PASS. Local JSindex-BLZigtQP.js /CSSindex-CtA1vGg1.css. Next exactaction: Actions/Pages deployment/source verification then targeted player readability smoke. No full local suite or unrelated historical smoke.
- Design record only: future Team Select idle/micro-animation retains name below character (docs/CHARACTER_SYSTEM.md); no current Team Select changes, no M4. Previous farming release evidence below remains historical.

- **M3 UNIVERSAL REWARD / FARMING FOLLOW-UP — ENGINEERING PASS / PLAYER SMOKE PENDING**. Branch feat/m0-combat-core-20260927 / PR#1 open, no main merge. Safe implementation/deployed checkpoint1f5ef823d18d424dc4ffe97f16a0f08ab48fbeab; later closure docs-only. Recovery base31c8344174cd5f08647864a94bdbf455881eb0f3. Prior originalM3 player accepted; latest follow-up not accepted yet.
- Current Chapter1 live config:1-1firstP4×3/P2×2,replayP2×1;1-2firstP4×2/P1×2,replayP1×1;1-3firstP5×2/P3×2,replayP3×1;1-4firstP5×2/P2×2,replayP5×1;1-5firstP5×3/P1×2,replayP5×2. P4 unlocksafter1-2at5; P5after1-5at7. All five cleared stages remain farmable. Canonical docs updated; former single-item fixture superseded.
- Reward engine/presentation/persistence untouched. All stages share reward.items; syntheticChapter2three first/two replay items verifies future data-only content. Owned shards/duplicate UUID/unlock5/migration/Team Select/protectedcombat unchanged.
- Route visibility owner introduced: Campaign render hides game; battle launch shows game; viewport/pageshow/visualViewport callbacks reassert after Phaser refresh. Initial #game hidden + display:none rule, geometry unchanged.
- Explicit consumed ?resetProgress=1 clears only Campaign/acquisition/team keys before loading state, opens freshChapter1. Normal URL preserves saves; denied storage gives fresh memory-only mode, history failure prevents clearing. No automatic wipe.
- Checks actually run: universal fixture RED1/7 (six expected failures); route/reset RED0/7; targeted16/16 GREEN incl actual main.js VM; final impacted126/126 including actual app integration. Seven old fixture/app harness regressions corrected. Independent review39/39/no findings, build/diff PASS. [Actions#289 /36881481144](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36881481144) CI288/288, Build/Pages success; jobs110434055193/110434260343. Public/local/CI JSindex-fgF_0oLa.js; CSSindex-Da2FpEU1.css unchanged. Public cleared1-1 shows twoCLAIMED+REPEATABLE; reload Campaign gameHidden=true/campaignHidden=false. PhysicalSafari touch/readability not replayed.
- Exact next action: PLAYER SMOKE then STOP. Use explicit?resetProgress=1 once to start fresh;1-1 firstP4+3/P2+2,replayP2+1; verify every1-2→1-5 cleared Preview still hasREPEATABLE, first-runP4unlocks1-2/P5unlocks1-5, shards survive normalreload. Check Safari reload/route/toolbar/rotation has no rectangle, battlestillvisible and multi-rowbuttonsreadable. No repeated unrelatedcombat testing. Evidence docs/verification/M3_UNIVERSAL_FARMING.md. Existing denied-storage/receipt-growth/bundle limitations preserved; explicitreset changes only authorized3keys, never normalURL. STOP before M4; no PLAYER VERIFIED claim.

## M3 implementation history (superseded checkpoint notes)
### Earlier checkpoints
- Integration safe remote: 2c0b9e3953ecac0e899ccbfbdc72b4226257a003. Release first full run 265/266: sole stale criticalDamage Restart fixture assumed P5 initially owned. Explicit prototypeOwnership fixture correction GREEN targeted19/19 then full266/266. Build PASS (index-CYcU_UMN.js); existing Phaser bundle advisory only. Independent review pending; final deployment not yet claimed.

- Domain/persistence safe remote: a0e83010cfc1ea8f42658e70b4fe014b749c6ec8. UI/controller integration now coherent: canonical Chapter 1 rewards; current normal ownership; per-round UUID rejects stale callbacks; authoritative Result; Preview policies/CLAIMED; ownership refresh preserves empty slots/order.
- RED integration 9 tests + presentation 4 tests; slot-order regression reproduced then fixed. GREEN impacted 106/106. Historical M2 tests now explicitly inject unlock-all ownership fixtures; no normal Campaign bypass. Test harness filter lookup corrected to data-filter (nested icon labels).
- Remaining release review/build/CI/deploy/public source confirmation. Next: checkpoint integration remotely BEFORE long release verification.

- Safe preflight checkpoint: 5b32c8e47aae630a63f1ca132f4e86fe83616eec. Domain + acquisition persistence now complete: RED 13 + 9 expected missing behavior failures; GREEN targeted/impacted 37/37. Dedicated acquisition.v1 key, universal inventory, retained unlock shards, durable receipts, pre-M3 CLAIMED initialization, denied-storage in-memory fallback. No Campaign/team save rewrite.
- Remaining: metadata/controller/UI integration, release checks/review/deploy. Next: RED Campaign reward integration tests.

- M3 implementation IN PROGRESS; direct Work authorized. Recovery baseline b40a3fd58a1dee16c580ac2d4b10177cf60f509b, branch feat/m0-combat-core-20260927 / PR #1. Remote latest confirmed unchanged; Actions #275 / 36868292806 success.
- Spec/docs recovery complete; execution plan docs/M3_IMPLEMENTATION_PLAN.md. No product code changed yet. Next: RED acquisition/persistence contracts then pure model; preserve M0/M1/M2; STOP before M4.

- **M2 impact-text / prototype movement pacing — PASS / PLAYER VERIFIED**. Player accepted the final larger 40/45/50/55px impact-text tuning, in-place fade/CRITICAL hierarchy, and current faster prototype movement. Actions#269 / 36866538530 completed successfully. Original `feat/m0-combat-core-20260927` / PR#1 remains active.
- Final implementation/deployed source `9ad74e6f9b93a85451f9cf09552243530274f35a`; Actions#265 /36865286592 Test, Build, Pages Deploy success. Public bundle `index-CI9O6wHr.js` matches local build; Chapter Select renders after reload. Closure following source is documentation only [skip ci].
- Changed only damageNumbers presentation + roster/runtime enemy speed data and their tests. Normal32/36/40/44px; critical1.25×, CRITICAL! another6px larger;80ms yoyo pop then in-place fade,840–1040ms total, no x/y tween. P1–P5 moveSpeed1.8, runtime enemy1.6, headless4/3.5 unchanged. Crit/RNG/resolver/cooldown/attackSpeed/AI/input/Campaign/Restart untouched.
- Actual checks: targeted17/17, impacted battle/AI98/98, check230/230, build and bounded whole-diff review/check PASS. RED6 expected contract failures; stale Restart pop count1→3 updated to cover normal + critical number + label. No known engineering failures. Existing Phaser bundle/npm proxy advisories remain. No unnecessary Campaign browser replay.
- Player acceptance closes the M2 combat-feedback/pacing correction. **M3 — Shard / Reward / Character Unlock Loop is now authorized for implementation planning.** Canonical spec: `docs/M3_SHARD_REWARD_UNLOCK.md`. Exact next step: Work implements M3 only after reading that spec; stop before M4.

- Second player size correction: normal damage text was still too small on iPhone. Authorized direct presentation-only tuning: normal Basic/Heavy/Special/Awakening sizes 40/45/50/55px (approximately the previous critical-number scale); critical number remains slightly larger at 1.12×; `CRITICAL!` remains largest at critical+12px. No combat/RNG/movement/cooldown changes. Deploy and re-smoke only this visual size delta.

## Previous release / correction checkpoints
- Current bounded correction: **M2 impact-text / prototype movement pacing — LOCAL VERIFIED, DEPLOY PENDING**. Recovery remote `7428d34661df2b453b83d9f777519e830380b682`, PR#1 original branch, Actions#263 success. No crit/RNG/resolver reimplementation.
- Implemented: normal32/36/40/44px; critical1.25× and CRITICAL! another6px larger; all text80ms yoyo pop,120ms hold then in-place fade (840–1040ms total), no x/y tween. P1–P5 moveSpeed1.8, actual runtime enemy1.6; headless4/3.5 untouched.
- Tests RED6 expected failures → targeted17/17, impacted98/98 PASS. One stale Restart assertion expected only1 pop; now3 (normal + critical number + label), corrected without lifecycle change. Remaining build/diff/Pages; exact next: build then push verified source/deploy and record release. No M3.
- Milestone: **M2 CRITICAL / DAMAGE-NUMBER POLISH — ENGINEERING PASS / iPhone PLAYER SMOKE PENDING**. M0/M1/M2/layout/filter/Restart/3-5-10 pacing remain PLAYER VERIFIED.
- Branch `feat/m0-combat-core-20260927`, PR#1 open; no alternate branch/main merge. Canonical `docs/M2_CRITICAL_DAMAGE_POLISH.md`. Final deployed source `80054aea902a3bc48a726509ca3f70aa9897b397`.
- Checkpoints:1 `9c696717deedeb733824934b2b129066af17d680`;2 `ea7bf1db2e09fead0cfa2f3a547a602efa20b6b1`;3 `238cd00bb459f95cf84415aba8be5318e28a79dc`;4/finalsource above. Closure following this source is docs/evidence only [skip ci].
- Completed: immutable per-ability crit validation; fresh session Mulberry32 seeded RNG; shared AI/player final damage/event critical flag; runtime prototype values with untouched headless no-crit fixture; normal category emphasis + warm larger CRIT!/pop; existing pause/shutdown/reset pipeline.
- Actual checks: targeted31/31, impacted168/168, full check227/227, build/diff PASS. Independent whole-diff reviewer no findings,30/30 independent tests + same-category/overkill probes. Actions#260 /36861577213 Test227/227, Build, Pages Deploy success; public JS `index-CTo9sRxy.js` matches local/CI.
- Public engineering smoke: selected P1/P3/P5 into1-1 Arena; real damage numbers/HP/CD observed at01:26/01:25; Pause freezes the visible numbers/timer; X/RESTART from damaged/KO paused state restores full same-team scene and clears text. No page-origin errors. Cloud clock initially slow; live critical/iPhone readability not claimed. Critical style/freeze/cleanup verified using deterministic tests and real Phaser tween manager. Screenshots are normal-damage/Pause + fresh Arena evidence, not iPhone proof.
- Player smoke completed and found presentation tuning still needed: damage numbers should be larger; critical number larger than normal; CRITICAL! larger than the critical number; text should flash/pop then fade in place with no upward drift. Prototype movement pacing should also increase while keeping moveSpeed per-character data-driven.
- Authorized bounded correction: roster P1–P5 moveSpeed 1.4→1.8; runtime placeholder enemy 1.2→1.6. Crit probabilities/multipliers, 3/5/10 cooldowns, AI spacing, attackSpeed and combat formulas stay unchanged.
- Limitations: prototype visibility tuning, integer displayed rounding with exact/overkill event amounts, default seed repeats fresh rounds; no formal balance/art/audio/M3. Exact next step: implement this bounded player correction, targeted/impacted verification, build/deploy, then repeat only the short player smoke. STOP before M3.

## Earlier checkpoint notes / accepted baseline
- Critical checkpoint3 remote `238cd00bb459f95cf84415aba8be5318e28a79dc`. Integration verification: targeted31/31; impacted168/168; `npm run check` full227/227; Vite build PASS (bundle `index-CTo9sRxy.js`); whole-diff whitespace check PASS. Existing large-Phaser bundle/npm proxy advisories only. Fresh independent review running; Pages/current-source public smoke not yet claimed. Exact next: resolve review findings, confirm latest Actions build/deploy, minimal public crit/pause/restart smoke, then closure docs + STOP.
- Critical checkpoint2 remote `ea7bf1db2e09fead0cfa2f3a547a602efa20b6b1`. Checkpoint3: normal category sizes24/28/32/36px and lifetimes900/1000/1050/1100ms; critical1.25× size, warm outline, CRIT! label,100ms yoyo scale-pop. All use protected tween clock and scene shutdown cleanup. Presentation/lifecycle26/26 PASS after RED5 failures; actual fresh Arena Restart now covers normal/critical labels/pop cleanup and seed reset. Remaining: final targeted/impacted/check/build/review/Pages/public smoke and closure docs.
- Latest critical checkpoint1 remote: `9c696717deedeb733824934b2b129066af17d680`. Checkpoint2 now implements one shared structured resolver + legacy numeric wrapper, session-owned seeded RNG and boolean critical damage events; runtime prototype crit data separated from unchanged no-crit headless fixture. Targeted/core impacted88/88 PASS, diff PASS. Test setup error (empty default team) corrected with explicit valid saved-team fixture; no product failure remaining. Next: category/CRIT text and tween cleanup tests, then release verification/deploy.
- Current work: **M2 CRITICAL / DAMAGE-NUMBER POLISH — IN PROGRESS**, existing branch/PR#1. Recovery HEAD `07416754954be1f337f929bfb0f133cbf96fb033`, Actions#256 success. Prior M0/M1/M2/layout/filter/Restart and 3/5/10 pacing are player verified; do not redo.
- Checkpoint1: immutable optional crit fields + isolated uint32 seeded RNG. Definition tests RED7/7 (missing contract), GREEN targeted21/21 with existing ability tests; diff check PASS. Remaining resolver/events, presentation, integrated checks/deploy. Exact next step: shared resolver with injected session RNG; no M3.
- Milestone: **M2 TEAM SELECT LAYOUT / ROSTER FILTER / BATTLE RESTART CORRECTION — PASS / PLAYER VERIFIED** (2026-10-01).
- M0/M1/M2 remain **PASS / PLAYER VERIFIED**. Prior polish AI/damage implementation retained; no M3/M4.
- Active branch / PR: `feat/m0-combat-core-20260927` / #1; no replacement branch or main merge. Recovery baseline `d13252799e933f66b425035ddcc03335387b6d86`, main inspected `16f73932a0399979ba79b92f93f5ce1c1d1909b9`.
- Canonical spec: `docs/M2_TEAM_SELECT_LAYOUT_CORRECTION.md`.
- Deployed final source: `3e1063bb61455438a9cf5e707cbd05a1e2114410`; Actions #249 / 36818638073, CI204/204, Build, Pages Deploy success. Public bundle `index-Dp67u527.js` matched local final build. Later closure commit is docs/evidence only [skip ci].
- Checkpoints: layout `d3cbf1707ed1c385522d9037be0755a5a9a36bf3`; bench/filter `84c0b438604e6fbdbdb4cf5172278b97b02169df`; Restart `290d5f48974dad7896f3649b68ffea4c91eec307`; integration `85e9df78389c7f98260cfc9b99e72cd60f7d0a16`; safe-area follow-up/final source `3e1063bb61455438a9cf5e707cbd05a1e2114410`.
- Completed: viewport rows with safe-area bottom; compact64×64 bench and ALL/Power/Speed/Blast display-only filters; clean actual-enemy matchup without upper type marks; shared Restart/Retry fresh scene pipeline. No ownership/catalog/combat/input/AI/damage refactor.
- Actual local verification: targeted11/11, impacted130/130, build and whole-diff check PASS. Independent review no remaining Critical/Important/Minor. Forced long label compacted; reduced viewport844×320+21px bottom inset reproduced then passed CSS budget regression.
- Public final-source smoke: Team Select/filter rendered; P1/P3/P5 preserved across Blast/Speed/ALL; exact3 BATTLE; bench64×64, upper type marks0; root scrollHeight=clientHeight936 and BATTLE visible in1363×936 cloud viewport. BATTLE and X/RESTART returned same lineup/full HP/01:30/fresh3/defaultA2. CONTINUE retained manual Pause; EXIT returned1-1 Preview with1-2locked. No page-origin errors (extension metadata messages excluded).
- Geometry limit: mobile dimensions are covered by static CSS row-budget contracts (667×320,844×320+21pxbottom,740×360,844×390,932×430), not real-device/browser emulation. Cloud local-file probe blocked by browser URL policy; no resize capability. `scripts/team-layout-probe.mjs` remains reproducible for a normal browser. Screenshot `docs/verification/m2-layout-correction-public.jpg` is cloud desktop evidence only.
- Player acceptance: real-device smoke reported OK for the layout/filter/Restart correction. Preserve this verified UI/flow baseline unless a later change can materially affect it.
- Prototype combat pacing follow-up authorized: shared placeholder Heavy/Special/Awakening cooldowns are reduced from 5/10/15s to 3/5/10s for faster testing only. This is not a formal balance decision; future characters keep per-ability cooldown definitions.
- Existing Phaser bundle advisory unchanged; 5 prototypes contain fewer than3 of each Type, so same-type3 remains covered by future-catalog fixtures without expanding the prototype catalog.
- Prototype 3/5/10 cooldown pacing is deployed and player verified.
- **Authorized next bounded slice before M3:** `docs/M2_CRITICAL_DAMAGE_POLISH.md` — per-ability deterministic critical-hit data/resolution plus stronger normal/critical floating damage presentation. No M3 yet.
- Exact next step: Work implements only the critical/damage-number polish spec with deterministic tests, impacted regression, build/deploy, then player performs the short feedback smoke.

- Prototype cooldown deployment correction: source had already changed Heavy/Special/Awakening to 3/5/10, but Actions #252 failed 203/204 because `tests/demoBattle.test.js` still asserted 5/10/15, so Build/Pages Deploy were skipped and the public site stayed on the prior 5/10/15 bundle. Stale regression expectations were corrected in `125341ff177a539c6fee584f1bf09d1a871e3355`. Actions #253 / 36856525782: Test 204/204 PASS, Build PASS, Pages Deploy PASS. This is now the deployed prototype cooldown source.
- Player confirmed the deployed 3/5/10 prototype cooldowns are visible/working on the public build. Preserve these only as test pacing values, not formal balance.

## Historical M0 handoff
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Preview URL: https://hansen0318.github.io/shanhaijing-arena/
- KO smoke URL: https://hansen0318.github.io/shanhaijing-arena/?fixture=ko
- Current slice: **final graybox closure complete**. **GREYBOX ENGINEERING PASS / iPhone FINAL PLAYER SMOKE PENDING**. No formal art work started.
- Graybox prototype baseline: implementation `64ba9652b17654d49c6b31e0df9f6222cd807121`; Actions [run #212](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36585956592) Test/Build/Pages Deploy success. The 90-second battle, cast feedback, result/Restart, protected mobile input, and immediate AI takeover remain intact.
- HUD correction checkpoint (2026-09-30): removed top enemy team-total HP; enemy E1/E2/E3 now have non-interactive right-side portrait/individual HP cards; timer is larger at top center. Both sides dim KO cards; existing ally KO selection guard/fallback remains. Card columns use compact mirrored placement above the joystick/skill zones. Only `ArenaScene` presentation and `battleHud` view data changed, plus HUD regression tests. Targeted 3/3 PASS; full local 107/107 PASS; Vite build PASS. Source commit `6e4f1e294c27f1165dd95a1885b3b4ff4d5d6d66`; Actions [run #213](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36647151726) Test/Build/Pages Deploy success.
- Public browser smoke: default shows mirrored cards, centered larger 01:30 timer, no enemy total HP; A1/A2/A3 portrait selection and enemy-card no-op observed. Individual ally/enemy HP changes during combat. In `?fixture=ko`, A2 shows dim 0/260, cannot be reselected, A1 receives selection; E3 later shows dim 0/240. VICTORY/RESTART returns to 5 countdown, all cards full HP/bright and A2 selected. Skill button showed cooldown; joystick pointer drag completed. No blocking page-origin errors (browser extension metadata error excluded). No real iPhone touch or visual acceptance was performed. **ENGINEERING PASS / iPhone PLAYER SMOKE PENDING**.
- Player follow-up (2026-09-30): real iPhone screenshots showed all six portrait squares smaller than the previous 68x68 ally version, and the first row nearly touched the stage top. The previous HUD commit changed portrait size 68→58 and first row y72→32 to fit E3 above the fixed Special ring. Source commit `36b7822185608c227f07ffc9ab47fde601d526be` restores 68x68 squares on both sides and places rows at y56/148/240, with selected scale 1.08, selected top margin >18 logical px, and E3 lower edge above the Special ring. Only portrait card geometry changed; timer, HP/KO, joystick, skills, and battle are untouched. Targeted layout/HUD tests 4/4 and local Vite build PASS; Actions [run #214](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36649387516) Test/Build/Pages Deploy success. Public browser smoke: six larger mirrored cards, visible top gap and E3/Special gap, A1 portrait selection/highlight; no blocking page-origin errors. **ENGINEERING PASS / iPhone PLAYER SMOKE PENDING**.
- Player follow-up (2026-09-30): six cards showed dark strips inside the portrait area. Root cause: dark backing 86px wide while the colored placeholder was only 68px, exposing 9px per side. Source commit `68a9ffe922f5c265a5c7adefde602b34a8057592` makes both the backing and colored square 84x84, centers its label, and keeps the existing card centers/row pitch, HP bar/text coordinates, KO alpha, and input unchanged. Selected portrait keeps a visible white border. Targeted HUD/layout tests 4/4 and local Vite build PASS; Actions [run #215](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36650652173) Test/Build/Pages Deploy PASS. Public default browser smoke shows A1/A2/A3 and E1/E2/E3 fully colored without inner side bars, including enlarged A1/A3 selection. Enemy card click remains no-op; ally and enemy HP text/bars stay aligned. `?fixture=ko` shows dim A2 and E2/E3 KO cards without side bars. No page-origin console/runtime error (browser extension metadata messages excluded). **ENGINEERING PASS / iPhone PLAYER SMOKE PENDING**.
- New player feedback (2026-09-30): the prior 84x84 portrait was square in data, but the HP bar painted over its bottom 18px, making the visible colored area appear flattened. Source `68f8c9012862f6f4574037f77d16e27aaac47e69` changes the portrait and backing to a 70x70 square and places a 70x14 HP bar beneath it, with a 1px gap. Existing card x/y centers and 92px row pitch remain fixed; selected scale 1.08, KO alpha, input, timer, and combat are untouched. Targeted HUD/layout tests 4/4 and local build PASS; Actions [run #216](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36652583515) Test/Build/Pages Deploy PASS. Public default page shows six complete square portraits and independent red HP bars with centered white numbers; A1 selected enlargement remains square, E1 click no-op. KO fixture shows A2 and E2/E3 dim with square portraits and separate 0/max HP bars. No page-origin runtime error. **ENGINEERING PASS / iPhone PLAYER SMOKE PENDING**.
- Player confirms six portrait/HP cards, selected scale and KO state on iPhone: **PASS / PLAYER VERIFIED** for that HUD slice.
- Final graybox checkpoint 1 (2026-09-30): countdown 3→2→1 uses a fresh `PreBattleGate` on each scene start; runtime A2/E2 spawn 1.2 simulation units toward center while A1/A3/E1/E3 remain mirrored upper/lower rear. Canonical headless fixture unchanged. Tests first failed on prior 5-second/default and aligned spawn, then targeted countdown/session/projection 8/8 PASS. Source checkpoint `4d40ab0ca67e8c6566ca6cc1d19a9c7f9293b7aa`; input, camera, bounds, HUD, combat rules unchanged.
- Final graybox checkpoints 2–5 (verification of existing implementation): targeted AI/ability/session/HUD/VFX/battle-rules/targeting tests 76/76 PASS. Existing nearest-target/multi-chaser/range spacing/Basic fallback, per-actor H/S/A cooldowns, HP/KO/HUD, VFX, 90-second win/lose/draw and Restart were retained; no reimplementation or combat rebalance. Full `npm test` 110/110 PASS, `npm run check` 110/110 PASS, `npm run build` PASS. Actions [run #217](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36670386117) Test/Build/Pages Deploy success for the source checkpoint.
- Final graybox checkpoint 6 public browser smoke: default Pages showed the frozen mirrored 3→2→1 formation, full HP and 01:30 timer; after countdown AI moved freely, HP and cooldowns changed with visible Basic/H/S/A placeholder effects. A1 portrait selection worked. A full auto round ended VICTORY with enemy cards at 0/max and dimmed; Restart returned to 3, the same mirrored spawn, full HP, bright cards, A2 selected and 01:30 without page refresh. The `?fixture=ko` page showed A2 at dim 0/260 with automatic selected fallback to A1; enemy portrait click did not change selection. Joystick drag visibly displaced its thumb. No blocking page-origin console error; a Chrome extension metadata error is external to the page. Defeat, exact Draw/90-second timeout, air-cast range/no damage, immediate joystick-release handoff and per-actor cooldown independence rely on automated tests here; cloud browser drag does not establish iPhone multitouch behavior.
- Final state: **GREYBOX ENGINEERING PASS / iPhone FINAL PLAYER SMOKE PENDING**. No regression found in the tested scope. Next exact step: player completes one full round on iPhone landscape, including touch selection, joystick plus second-finger skill, KO fallback, readability and Restart; then decide whether to proceed with formal assets. Do not begin art/progression work before that player review.

## Protected mobile input baseline
Player confirmed this path works on iPhone Chrome:
- fixed 1120x540 Phaser surface (previous player-confirmed 960x540 input architecture retained);
- `Phaser.Scale.NONE`;
- outer DOM performs visual contain/positioning;
- A1/A2/A3 use Phaser GameObject `setInteractive()`;
- joystick base uses Phaser GameObject input;
- joystick movement converts pointer client coordinates through canvas `getBoundingClientRect()` back to the fixed logical stage (now 1120x540).

Do not migrate this input/display architecture again without a separate regression-safe experiment.

## Regression bisect result
Exact baseline restore recovered:
- ally selection;
- joystick drag;
- selected ally movement.

Step 1 slow runtime demo initially froze because runtime character definition IDs were changed to `ally_runtime/enemy_runtime` while `BattleSession` looked up `ally/enemy`.
That defect was fixed by preserving canonical definition IDs while changing only runtime stats.

Player then confirmed movement works again with the slower runtime fixture.

## Current runtime smoke pacing
- runtime ally move speed: 1.4;
- runtime enemy move speed: 1.2;
- increased runtime HP;
- reduced runtime attack pacing;
- canonical deterministic headless fixture remains unchanged.

## New canonical control handoff
Player judged the 1.0s grace period unnecessary.

Shared `ControlHandoff` is now:
- valid manual input overrides immediately;
- while joystick input remains active, player control is refreshed every simulation step;
- when valid player input stops, AI resumes on the **next simulation step** with **0s intentional delay**;
- selected character remains selected;
- no AUTO/MANUAL UI.

Implementation detail: timeout is 0ms and the active-input comparison is inclusive (`<=`) so the exact frame receiving player input is still owned by the player.

## Next gate
After automated tests/build/deploy PASS, player smoke:
1. select A1/A2/A3;
2. move selected ally;
3. release joystick;
4. release joystick and observe AI resume immediately;
5. confirm camera/viewport remain unchanged.

After PASS, next isolated feel change can be joystick position only.


## Zero-delay deployment correction
The first zero-delay attempts did not reach Pages because an older AI unit test still asserted the retired 2-second boundary.
Therefore player smoke performed during those failed runs was still exercising the previous successful deployment, not the intended immediate-handoff build.

The stale AI test is now updated to the canonical behavior:
- valid input instant => player override;
- immediately after input stops => AI.

## Arena sand color A (2026-09-28)
- `src/runtime/ArenaScene.js`: field rectangle fill `#8E7B5A`, center line and ellipse stroke `#5F513B`; camera/outer background remains `#253648`.
- Source commit `9b9fe641848a412e2b10e26493a73532ba4551bc` (pushed to active branch); GitHub Actions run `36436079695`: Test, Build, Pages Deploy all success. No separate local test/build repeated.
- Public preview https://hansen0318.github.io/shanhaijing-arena/ observed sand field, dark markings, and dark exterior in browser. This verifies deployed appearance only; player device/size-ratio assessment is pending.
- Exact next action: player evaluates field, actors, and empty-space proportions from the preview; then return to the separately pending joystick position/sensitivity decisions. Do not start those changes as part of the color slice.


## Arena horizontal widening — Chat implementation
Chat-side minimal implementation prepared for a wider logical stage while preserving the protected mobile input architecture.

Changes:
- logical stage width: 960 -> 1120;
- logical stage height remains 540;
- horizontal projection padding: 120 -> 200, preserving the original 720px actor projection span and adding 80px visible space on each side;
- Phaser remains Scale.NONE;
- outer DOM still performs contain/centering;
- pointer mapping still uses ARENA_STAGE.width / canvas rect width, so it follows the new logical width without an input-architecture change;
- center ellipse remains 280x170;
- simulation coordinates, battle logic, character stats, joystick logic, and AI handoff are unchanged.

Player/runtime smoke is still required after deploy; visual proportion is not pre-marked PASS.

## Arena 1120x540 widening verification (2026-09-29)
- Chat widening checkpoint `4d13321a660ea25a4cedddb96eb7a7857b4827fa`: stage/canvas/DOM width 1120, height 540, projection padding 200 (720px actor span), sand fill and center line track stage width, ellipse 280x170. No joystick/input architecture or battle logic change.
- Initial Actions run `36499677507` failed only because `tests/arenaProjection.test.js` still asserted 960 width and old projected x coordinates (59/61 pass); build/deploy skipped. Work changed only that stale test's expected width and x values in commit `23c4e759551c24d149203c2574ee0109e5921046`.
- Actions run `36500167030` for that commit: 61/61 tests PASS, Vite build PASS, Pages deploy PASS.
- Public browser smoke: stage visually wider with unchanged height, sand fill covers visible canvas, line spans the wider stage, center ellipse and actor markers preserve logical size, actor horizontal projection span remains 720 per code/test. No observed clipping, overflow, anomalous black borders, or camera shift. A1/A2/A3 selection highlight worked. Pointer drag on joystick moved selected A3 left; after release knob recentered and A3 moved right under AI. No browser pointer regression observed.
- Cloud browser pointer drag does not prove real iPhone touch. Real-device touch alignment and visual proportion remain PLAYER SMOKE PENDING. Do not label either as player verified.
- Exact next step: player opens https://hansen0318.github.io/shanhaijing-arena/ on device and checks widened field proportion and touch selection/joystick movement. No joystick position/sensitivity changes in this slice.


## Arena movement-range widening after player smoke
Player real-device smoke showed that the 1120x540 stage widened visually while the role projection/movement range still matched the old field.

Correction:
- shared simulation x bounds expand from 0..10 to -1.1..11.1;
- runtime projection uses the same -1.1..11.1 range;
- horizontal projection padding returns from 200 to 120, exposing the newly added left/right field as actual movement space;
- original spawn coordinates x=0 and x=10 remain visually near the same locations as before widening;
- all six actors share the same BattleSession arena bounds;
- AI moveToward is explicitly clamped to the same arena bounds;
- stage stays 1120x540; vertical bounds, joystick, input architecture, camera, combat stats, and zero-delay AI handoff are unchanged.

Player real-device smoke is required after deploy to verify both allies and enemies can occupy the added horizontal space.


## Arena full-width movement correction
Player real-device smoke showed the previous expanded bounds still rendered movement extremes near the horizontal line limits rather than near the visible sand-field edges.

Geometry correction:
- stage remains 1120x540;
- horizontal actor-safe screen margin becomes 32px on each side;
- shared simulation x bounds expand to approximately -2.3333333333..12.3333333333;
- mapping is chosen so the original spawn coordinates x=0 and x=10 remain at approximately screen x=200 and x=920;
- new movement extremes render at approximately screen x=32 and x=1088, allowing the actor circles to approach the sand-field edges without clipping;
- all six actors still share the same BattleSession arena bounds;
- enemy AI and ally/player movement remain governed by the same shared bounds;
- vertical range, joystick, input architecture, camera, combat logic, and zero-delay AI handoff are unchanged.

Player smoke after deploy should drag an ally to both horizontal extremes and observe enemies following into the same expanded space.


## Joystick feel / direction correction
Player reported three real-device symptoms after Arena widening:
- drag direction can disagree with the visible knob direction;
- joystick may require a second tap to acquire reliably;
- small drags feel insufficiently responsive.

Chat-side minimal correction keeps the protected input architecture:
- still Phaser GameObject setInteractive + scene pointermove/up;
- no document/canvas touch adapter;
- pointerToStage now reads TouchEvent changedTouches/touches client coordinates before falling back to mouse/pointer coordinates, avoiding double-scaling ambiguity on iPhone CSS-scaled canvas;
- visual joystick radius remains 54;
- acquisition radius increases to 76 without changing visual size;
- full input magnitude is reached at 30 logical px with dead zone 0.03;
- joystick center remains x=70, y=435 in this slice;
- AI handoff, camera, Arena bounds, battle logic, and viewport architecture unchanged.

Real-device player smoke is required for direction fidelity and acquisition feel.


## Ally tap-target tolerance
Player real-device smoke reported ally selection sometimes requires a second, more precise tap.

Minimal correction:
- ally visual marker radius remains 24;
- invisible ally selection hit radius increases to 36;
- enemy interaction remains unchanged/no-op;
- joystick, pointer mapping, camera, Arena geometry, AI handoff, and battle logic are unchanged.

Player smoke should confirm A1/A2/A3 are easier to select without noticeable ambiguous selection when allies are close.


## Player skill controls — Chat implementation
Chat implemented the first real Heavy / Special / Awakening control slice.

Combat:
- BattleSession exposes usePlayerAbility(instanceId, category) for Heavy/Special/Awakening only;
- player abilities use the existing startAbility -> resolveDirectDamage -> finishAbility pipeline;
- targeting reuses existing soft-target behavior: retain living current target, otherwise nearest living enemy;
- out-of-range, KO, invalid, or cooling abilities fail cleanly;
- cooldown remains the canonical ability slot state, not a UI-only timer.

Runtime UI:
- three circular skill buttons sit near the bottom-right edge, visually balancing the left joystick;
- Heavy and Special use 42px radius; Awakening uses 50px radius;
- current placeholders are H / S / A; final art can replace labels later without changing layout;
- ready state uses normal color;
- cooldown/disabled state dims the button/icon;
- remaining whole seconds render over the button;
- outer radial ring renders the same cooldown state's remaining fraction and disappears/shrinks with the timer;
- cooldown completion restores normal color/full ready ring;
- button state always follows the currently selected living ally.

Input:
- Phaser Scale.NONE and current protected mobile input path remain unchanged;
- activePointers is increased to 4 so joystick + skill presses can coexist for multitouch;
- no touch adapter or pointer-coordinate architecture change.

Automated player-ability tests were added for real damage/cooldown, cooldown rejection, and out-of-range rejection.

Remaining requirement after CI/deploy: real-device smoke for multitouch joystick+skill, button placement, cooldown readability, and correct selected-character binding.


## Battle start / manual skill ownership correction
Player clarified the intended control contract after first skill-button smoke:

- every round has a 5-second pre-battle countdown;
- during countdown, all six actors are frozen and no skill may be used;
- after countdown, untouched actors run fully automatic AI;
- touching/holding the selected ally's joystick establishes player ownership even if the stick vector is centered or inside the dead zone;
- while joystick is held, that ally's AI cannot auto-cast Heavy/Special/Awakening;
- skill cooldown reaching zero means READY only; while player ownership is held it must stay ready until the player presses it;
- releasing the joystick ends player ownership immediately and AI resumes full automatic movement/ability use on the next simulation step;
- each ally owns independent abilityState/cooldowns; switching A1/A2/A3 reads that ally's own slots;
- Heavy/Special/Awakening layout spacing was widened to prevent cooldown-ring overlap.

Chat added tests for joystick-hold AI suppression, independent ally cooldowns, ready-state persistence under manual control, and AI auto-cast resumption after release.


## Manual skill immediate-cast rule
Player smoke showed manual skill buttons were blocked at battle start because the shared ability start check required the target to already be inside the same range used by AI.

Canonical split:
- AI keeps the existing approach/range behavior and may only cast after entering ability range;
- player manual Heavy/Special/Awakening may cast immediately after the 5-second battle countdown if the selected ally is alive, the slot is ready, and a living target exists;
- manual cast uses the existing soft target selection but bypasses the AI range gate;
- manual cast still uses the same damage/cooldown pipeline;
- pressing a manual skill registers player input for that instant; with zero-delay handoff, AI may resume next simulation step when joystick is not held.

This is a control-rule difference, not a second combat implementation.


## Air-cast + nearest-target + continuous runtime sandbox
Player clarified the next control/testing contract:

Manual skill cast:
- after the 5-second countdown, a selected living ally may press Heavy/Special/Awakening immediately when the slot is ready;
- manual cast does not require a target and may visibly cast into empty space;
- if the nearest living target is inside the skill's real range, normal damage applies;
- if the target is outside real hit range, the skill still casts and enters cooldown but deals no remote damage;
- AI still requires range before auto-casting.

AI targeting:
- both allied and enemy AI now reevaluate the currently nearest living opponent on each decision;
- moving one side closer to a different opponent can change the target;
- this applies symmetrically to all six actors.

Runtime test sandbox:
- the public runtime fixture uses very high HP and a 24-hour maxSeconds value so the prototype does not stop during ordinary manual testing;
- canonical deterministic/headless battle rules, including the formal 90-second limit and normal HP/balance fixture, remain unchanged.


## Continuous nearest-opponent pursuit invariant
Player clarified the intended AI movement contract:

- all uncontrolled allies and all enemies continuously reevaluate the nearest living opponent;
- manual control of one allied actor must not pause AI movement for the other five actors;
- while the nearest opponent is outside usable attack range, AI must keep moving toward that opponent every simulation step;
- AI may hold position only when the nearest opponent is already inside attack range and the actor is attacking / waiting for its next attack cadence;
- if that opponent moves back outside range, pursuit resumes on the next decision;
- if another opponent becomes nearer, target switches immediately.

Regression tests now cover enemy pursuit while one ally is manually controlled, allied pursuit while another ally is manual, and resuming pursuit when a target leaves range.


## Pursuit while casting
Player device smoke showed that nearest-target retargeting existed, but movement still appeared to stop too early.

Root cause:
- AI intent was exclusive: either move OR ability.
- Entering a longer-range Heavy/Special/Awakening range produced an ability intent and suppressed movement even while still far from the opponent.

Correction:
- Basic attack range is now the pursuit stop distance for the M0 prototype.
- If the nearest opponent is outside Basic range, AI keeps moving toward it every simulation step.
- Heavy/Special/Awakening may be cast while that pursuit movement is happening.
- Once the nearest opponent is inside Basic range, AI may hold position and attack.
- If the nearest opponent changes, pursuit immediately follows the new nearest target.
- Manual joystick ownership remains unchanged; releasing returns to this pursuit behavior immediately.

This applies symmetrically to allied and enemy AI.


## Close engage-distance correction
Player smoke still showed AI failing to follow a nearby manually moved opponent.

Exact root cause:
- ranged skills had been changed to pursue while casting;
- Basic ability intents still hard-coded pursue=false;
- therefore entering Basic range (~1.8 simulation units) still stopped movement too early.

Correction:
- pursuit stop distance is now independent from all ability ranges;
- M0 uses AI_ENGAGE_DISTANCE = 0.75;
- outside 0.75, AI keeps moving toward the currently nearest living opponent even when Basic/Heavy/Special/Awakening are being used;
- inside 0.75, AI may stop and attack;
- moveToward now respects this stop distance instead of moving actor centers into each other;
- applies symmetrically to allied and enemy AI.

Regression coverage includes being inside Basic range but outside engage distance, and an enemy following a manually controlled nearest ally.


## Multi-chaser pursuit regression
Player clarified that pursuit is not one-to-one:
- one ally may be pursued by two or three enemy AI actors at the same time;
- one enemy may be pursued by two or three allied AI actors at the same time;
- there is no target reservation or exclusive pairing;
- each AI independently chooses its nearest living opponent and may share that target with teammates.

Chat added direct BattleSession regressions for two enemies simultaneously pursuing one nearest ally and two allies simultaneously pursuing one nearest enemy. If these pass but device behavior differs, investigate runtime geometry/engage-distance presentation rather than adding target reservation logic.


## Near-overlap engage distance correction
Player screenshot confirmed that the previous M0 engage distance (0.75 simulation units) stopped pursuit while actor circles were merely adjacent.

Updated rule:
- AI_ENGAGE_DISTANCE reduced from 0.75 to 0.20 simulation units;
- actors continue pursuing until their centers are visually very close / nearly overlapping;
- ability ranges remain independent and do not stop pursuit;
- multi-chaser targeting remains nonexclusive;
- applies symmetrically to allied and enemy AI.

Regression coverage now checks that the former ~edge-touch distance still pursues and only near-overlap distance permits stopping.


## Skill-driven combat spacing foundation
Basic / Heavy / Special / Awakening remain slot names only; they do not imply melee or ranged behavior.

Ability definitions now support an optional range profile:
- minRange: if a Ready skill's target is closer than this, AI retreats;
- preferredRange: desired spacing used while approaching/retreating;
- maxRange: maximum cast/hit range;
- legacy range remains an alias of maxRange for compatibility;
- legacy abilities without preferredRange retain the prior near-overlap pursuit behavior.

AI planning:
- evaluates the highest-priority Ready non-Basic skill first;
- too close for that profiled skill => retreat toward preferredRange;
- too far => approach toward preferredRange;
- inside minRange..maxRange => cast;
- after the skill enters cooldown, another Ready skill can drive spacing on following decisions;
- Basic is evaluated as the fallback using its own independent profile.

Manual player casts keep the existing air-cast behavior and are not blocked by AI spacing decisions.

The demo fixture now deliberately exercises mixed ranges:
- Basic close;
- Heavy close;
- Special medium;
- Awakening longer-range.
These are prototype fixture values, not final character balance.


## Basic fallback + prototype cooldowns
Player clarified that Basic is the unlimited automatic fallback, not a cooldown button.

Locked prototype behavior:
- Basic has no cooldown button and remains automatic/unlimited, paced only by attack cadence;
- if Heavy/Special/Awakening are all cooling down, AI must not idle;
- AI continues approaching the nearest opponent using the Basic range profile and attacks once Basic is usable;
- Heavy / Special / Awakening remain the three manual buttons in the current M0 prototype;
- prototype cooldowns are now Heavy 5s, Special 10s, Awakening 15s.

Awakening progression/unlock is not implemented in M0 yet; future progression may gate the slot without changing the combat API.


## Playable graybox integration checkpoint (2026-09-29)
- Portrait cards at upper left are the selection entry for A1/A2/A3; actor markers retain selected highlight but no longer receive selection clicks. Selected card scales 1.12 with white frame. KO cards are dim and cannot select a KO ally.
- Each card has centered white current/max HP over a red bar; upper center shows sum of enemy HP, upper right countdown timer. Both bind directly to BattleSession snapshots.
- Public runtime fixture now has finite 90-second rounds and moderate test HP, retaining the canonical headless fixture and 90-second HP% tie rule. Existing AI spacing, shared targeting, no-reservation pursuit, Basic fallback, joystick ownership, and protected 1120x540 input/viewport code remain in place.
- Shared BattleSession cast events drive distinct lightweight local/ranged placeholder Basic, Heavy, Special, Awakening feedback, including a non-damaging out-of-range manual air-cast. Result text and clickable Restart are displayed after resolution.
- Regression added for HP data, timer, finite/replayable runtime, cast events, VFX direction/range clamp including overlapping caster, countdown freeze, and future Awakening unlockTier metadata. Full local suite: 107/107 PASS; Vite build PASS. Public Pages and player device smoke still pending.

## Public Pages engineering smoke — graybox (2026-09-29)
- Source `64ba9652b17654d49c6b31e0df9f6222cd807121`, Actions run #212: Test, Build, Deploy Pages all PASS. Public URL: https://hansen0318.github.io/shanhaijing-arena/ .
- Browser observed 5→1 countdown with six actors frozen; after battle starts, all six converge and automatically cast. Portrait A1/A2/A3 selection enlarges/highlights the card; clicking an actor marker did not steal selection. Upper enemy HP and all three ally HP bars/numbers decrease; timer counts down from 01:30.
- At battle start, manual Special was pressed while enemies were far: selected cooldown displayed 10, enemy team HP stayed 720/720. Basic/Heavy/Special/Awakening placeholder effects were visible during battle. The default round reached VICTORY, and RESTART reset HP/timer and returned to 5 countdown without page reload.
- `?fixture=ko`: A2 started selected, then displayed 0/260 and dimmed; selection automatically moved to A1. Clicking A2's KO portrait left A1 selected. Joystick pointer drag still moved the knob. No blocking page-origin console error; recorded console errors came only from the browser extension.
- No real iPhone multitouch or player visual/game feel acceptance was performed. **ENGINEERING PASS / PLAYER SMOKE PENDING**. Do not claim real-device touch or visual readability PASS.

## M1 bounded correction — portrait gate / START / exit confirmation (2026-09-30)
- Portrait visual viewport uses a full-page ROTATE DEVICE gate. Campaign and Arena are hidden/inert, and a live battle pauses countdown/simulation/cooldown/VFX. Landscape resumes the same route and round with viewport remeasurement; manual Pause and Exit confirmation remain independent interruption reasons.
- Stage Preview CTA is START only. Battle X opens an EXIT BATTLE? overlay: CONTINUE restores the prior running or manually paused state; EXIT uses existing unfinished-exit route without a new completion write. Earlier CLEAR persists.
- Protected 1120×540 stage, fixed camera, joystick/skills/HUD, formation, AI and save schema. Release/browser evidence belongs to this checkpoint; real iPhone acceptance remains pending.

## Polish damage checkpoint (2026-10-01)
- AI checkpoint remote: `e83dd34b738b7dcd7561e872e9e88da32d284b56`.
- Real resolved-damage events and 1s outlined floating numbers integrated; air/invalid/KO hits excluded, rapid hits offset, same tween pause clock, shutdown cleanup.
- Damage + Pause/tween targeted tests 13/13 PASS; earlier BattleSession impacted tests PASS.
- Remaining: VS/type and integration/deploy. Exact next action: shared encounter definition lookup and VS view.

## Polish VS/type checkpoint (2026-10-01)
- Damage checkpoint remote: `30c6419e61c6de8594515af418b611fa49f8e54c`.
- VS ally/enemy placeholders; preview and battle share immutable encounter definition lookup. Power/Speed/Blast replaceable marks derive from definition type. Battle HUD geometry unchanged.
- Roster/team/VS impacted tests 26/26 PASS.
- Remaining: whole-diff review, targeted/impacted checks, build/deploy and minimum public runtime smoke. Exact next action: inspect integrated diff and verify impacted surfaces.
