# AGENTS.md

## 2026-10-20 — P2 Move body-size correction DEPLOYED / PHONE REVIEW PENDING

Player12:43 confirms ready/Idle and fighting size normal, only Move shrinks (IMG_2688/2689). Root confirmed: previous25/32posed-face calibration applied0.78125to the entire Move body. **Do not restore that invalid calibration or treat descriptor agreement as visual acceptance.** Source fix `0fe44b3c5eed46402d0394af6dff128a72be7393` restores original approved Move body authoring density0.9/display144×139.5 for160×155packed cells, preserving foot0 and original pixels/cadence. Idle/Basic/KO and P1/P3–P5 catalog deep-equal prior. Generic renderer/calibration code unchanged, no character branch/extra post-render multiplier. Report `docs/verification/P2_MOVE_BODY_FIX.md` supersedes earlier pending/no-repro claims for this Move-size scope.

DEPLOYED: Actions39371658550 build118460665060/deploy118461659898 SUCCESS. Local115affected +Build/81guard PASS; independent bulk regression RED old data→GREEN. Basic Chromium4cases44screenshots, actual mobile Chromium/WebKit6cases, actual built-entry P1–P5 trace4cases/32sequences/880samples/24KO/Retry/Restart/Exit PASS; four old presenters closed/0bytes. Public16complete files exact SHA256 match CI/local;104local build files equal Pages artifact. Evidence/trace/QA in P2_MOVE_BODY/. Full suite not rerun; five existing failures remain documented.16MiB/131072reserve and39required keys16,639,660bytes unchanged. No new art/gameplay/FX/KO/other actor changes.

NEXT ONLY player phone Move-size review at https://hansen0318.github.io/shanhaijing-arena/?v=0fe44b3c5eed46402d0394af6dff128a72be7393 : ready→Move→stop→Basic→Move. **ENGINEERING PASS / DEPLOYED / NOT PLAYER VERIFIED**. Heavy stays paused until explicit scoped sign-off; P1 COMPLETE and HeavyF3 approval protected; no P3/main merge. Preserve original approved body density only after comparing actual body/equipment/poses; neither equal canvas bounds nor posed skull length alone establishes size. New handoffs single complete copyable block, latest docs checkpoint is containing commit, fetch fresh. Evidence closure[skip ci], not a new source release.


## 2026-10-20 12:43 — player isolates Move shrinking / correction release pending

Player confirms countdown/Idle and fighting size normal; **only Move is too small**, with IMG_2688/2689 phone evidence. This supersedes old next-only phone-review/descriptor-conformance reasoning. Root: prior Move face25/32 normalization shrank entire approved body by21.875%; a renderer matching that bad descriptor was not proof of correct body scale. Fix only P2 Move authoring-density data back to0.9 (144×139.5 packed frame), retain grounded foot0/origin153/155. Original PNGs, Idle/Basic/VFX/KO and P1/P3–P5 all protected; full catalog deep-equality outside P2 Move verified. No renderer character exception or post-render multiplier. Authoring-grid/body/equipment comparison, not posed skull length or silhouette-height fitting, owns this correction.

Report `docs/verification/P2_MOVE_BODY_FIX.md`, measurements/old-new source board in `P2_MOVE_BODY/`. Independent equipment-area regression RED on old data→GREEN;115affected PASS +Build/81guard PASS. Existing decoded39keys16,639,660bytes/16MiB+131072reserve unchanged; five old full-suite failures retained, not rerun. REAL BROWSER/DEPLOY/PUBLIC PENDING, NOT PLAYER VERIFIED. Release gates existing Basic raster +6mobile entry cases +4case actual built-entry P1–P5 trace before Pages; `[move body release]` adds no bypass. Continue only measured release/fingerprint/scoped P2 phone review; no Heavy/P3/new art/main merge. Latest checkpoint is containing commit; fetch fresh.


## 2026-10-20 — scale diagnostics complete / existing release verified / PHONE SIZE REVIEW PENDING

Authoritative report: `docs/verification/P2_STATIC_SCALE_EXECUTABLE.md`; summary/complete compressed trace/public fingerprints in `docs/verification/P2_STATIC_SCALE/`. Existing static correction **already DEPLOYED** at `2d83ef6c2a753a77a92b2c2379dace4663866dee` (Actions39247774008); public16/16 complete files exact match CI/local,104/104 local built files equal actual Pages artifact. Previous deployment-pending entries are historical. User's earlier phone-loaded SHA remains unknown; do not assume stale cache or acceptance.

Final test-only probe403176fb5a864fde538c4f8a916d8be99d68e247 / Actions39346391924 build118380181357 SUCCESS, deploy SKIPPED. Actual built campaign entry/UI/countdown, real session Basic and movement retreat>2units (minimum3.4775), normal/reduced×both directions:4cases/32actor-sequences/880samples acrossP1–P5,24real KO actors, four result-Retry and in-battle-Restart zero-byte cleanup/Exit PASS. No residual actor/parent/VFX multiplier reproduced. P2 before/after Idle exact144×144/source/origin, authored face22.5/foot0. This is **DIAGNOSTIC PASS / FIELD DEFECT OPEN / NOT PLAYER VERIFIED**, not independent full-body anatomy or physical iOS proof. P1 non-Basic completed evidence reused; no full P1 replay. Fresh affected115/115 +Build/81guard PASS; full suite not rerun and five prior failures remain named in static-fix report.16MiB/131072reserve unchanged.

No production source/art/VFX/gameplay/KO changes or new deployment; only diagnostics/evidence. Invalid initial getter-hp KO probe and subsequent result-vs-battle navigation timeout are disclosed in report; only final actual-damage/Retry trace owns complete evidence. NEXT ONLY targeted player P2 phone review at https://hansen0318.github.io/shanhaijing-arena/?v=2d83ef6 . If it still fails, isolate time-aligned source frames plus face/trunk/equipment/limb/ground landmarks, not a guessed scale. Do not declare fixed/resume Heavy before player confirms. HeavyF3 protected; P1 COMPLETE closed; no P3/art generation/main merge. Evidence closure[skip ci], latest HEAD is containing commit; successor instructions one complete self-contained code block.


## 2026-10-20 Chat-first scale-defect gate — user reports post-attack growth / move-away shrink

Player still observes P2 猼訑 actor **enlarge immediately after attack and shrink upon moving away from an enemy**. This supersedes any earlier assumed acceptance of size correction. **Do not claim the 2026-10-19 static-baseline engineering fix solved this field defect, or claim it was deployed without reading fresh HEAD/Actions.** The known 2026-10-19 correction already restores original static PNG, calibrates Move & Basic to 22.5-world facial landmark and foot=0. It passed 115 affected tests + build, while browser/deploy/physical player verification were pending at the time of that report. Reuse that patch, do not remake it.

**Chat-only technical diagnosis/preflight:** symptoms are compatible with persistent actor scale/state selection errors; distinguish (a) canonical static asset being replaced after cast, (b) Move/Idle/Basic/attack descriptors each having different authored landmark densities, (c) wrong actor root scale/origin surviving completion, (d) renderer accidentally applying VFX transforms to character sprite, (e) asset fallback/cold-load/restart differences, and (f) CSS viewport zoom (a separate previously addressed bug). Do not assume a single root without **time-aligned actual app** evidence. Character's on-screen silhouette height is not a valid scale invariant for crouched/lunging frames. Compare face/cranial landmark, trunk thickness, equipment proportions, foot baseline and the transform matrices/texture keys while distinguishing opponent proximity from attack/idle transitions.

**Remaining executable-only work for Work:** fetch current HEAD and release provenance; instrument actor draw/state switch at IDLE→MOVE4→BASIC4→IDLE and at target approach/retreat; save timestamps/frame labels, source texture dimensions, normalized landmark pixels, world display scale, origin and parent transforms; reproduce failure in *built* app UI with actual enemy nearby, then add a targeted RED regression, patch the **shared data-driven** descriptor/calibration only if truly needed, verify GREEN & unaffected actor/FX values. Check P1–P5 with same diagnostic harness, **do not modify accepted art or force same size across different characters**. Check normal/mirrored/reduced, KO, restart, real mobile viewport navigation. Run targeted tests/build/cache/real-browser verification; deploy only a changed tested release, record fingerprint vs blocked connectivity separately. Ask for only the affected P2 size correction phone sign-off. P2 Heavy remains paused, approved Heavy F3 protected; P1 COMPLETE remains closed; no new art, no main merge.

**Stop condition:** do not call a geometry proxy or CI screenshot PLAYER VERIFIED. If actual source matches approved scale but no repro is observed in fixture, record missing real-device evidence and isolate the discrepancy rather than gratuitously modifying source. If current HEAD already fixed it, avoid a no-op redeploy; compare the user's reported page/source version and provide a target-built-app URL. This Chat entry contains **design/preflight only**: no runtime modifications, tests, CI or deployment were executed by Chat.


## 2026-10-19 — P2 STATIC-BASELINE SIZE DEFECT / correction release pending

Player IMG_2674/2675/2676 reports Idle/Move/attack size mismatch and explicitly requires the pre-animation static size. This is NOT acceptance of previous Basic/body or viewport fixes. Root and correction: docs/verification/P2_STATIC_SCALE_FIX.md. Restore exact originally approved static PNG (27c65e3f…a0d2b8) and144×144 canvas, align Move/Basic face22.5world and foot0 with shared data calibration, preserve all source bytes/gameplay/independentFX. Previous Idle strip F1 was smaller than original static; do not mix its density with another source. Retired-F1 regeneration binding excluded.

Engineering115/115 affected tests + Build/81guard PASS; full927:922PASS/5preexisting FAIL explicitly named in report (baseline925/6FAIL).39keys16,639,660bytes +131,072reserve retained with6,484extra; no cap raise. Corrected actual-browser continuity/release checks pending; no player PASS. Heavy paused, P1 COMPLETE and F3 approval protected, no P3/main merge. NEXT verify/deploy exact correction, inspect actual static→Move4→Basic4→Idle raster and real app mobile UI, then targeted player phone review. Prior phone-only handoff is superseded by this new defect. GitHub remains authoritative; all successor prompts one complete code block.

## 2026-10-19 — Mobile viewport fix DEPLOYED / PHONE REVIEW PENDING

Public exact-byte verification BLOCKED by host proxy CONNECT timeout (not evidence of a site outage); downloaded actual CI Pages artifact matches local build15/15 files. See public-fingerprint.json: publicVerification=false. Deployment success and browser gate PASS are independently established; do not misreport public hashes or redeploy unchanged code for this network failure.

Player reports whole-page enlargement/clipping and unusable game (IMG_2661/2662); this is not actor-scale approval. Actual built-app diagnostic reproduced the menu failure at visual page scale2/3: visualViewport shrank while CSS-vw typography retained layout width. Fix shares logical viewport and inverse visible transform across Campaign/Arena/Orientation/Exit, and prevents scroll Event from enabling reload-only height stabilization. No actor/art/combat/save/Tier/memory changes; no zoom-prohibition meta.

Release50f303db304f427ca80c1c9c4e0b0b101859b392 DEPLOYED: https://hansen0318.github.io/shanhaijing-arena/?v=50f303d . Actions39202217431 build117897526482/deploy117898058327 SUCCESS. Scoped54/54 + Build/81-file guard PASS; additional local arenaInput4/4 PASS. Actual Chromium/WebKit6mobile-emulation cases/39screenshots PASS, including landscape/short/portrait→landscape/reload/menu returns, Chromium zoom1.5/2/3/restoration and real Chapter→Stage→Team→Battle→canvas portrait a1 selection→Pause→Exit→menu at zoom3. Three representative release screenshots inspected and retained. These are not physical iOS/touch/FPS or Basic size acceptance. Evidence docs/verification/MOBILE_VIEWPORT_FIX.md and MOBILE_VIEWPORT/{probe,release,public-fingerprint.json}.

NEXT ONLY player phone check of whole-page fit/menu/battle/Exit and prior Basic size continuity; both fixes remain NOT PLAYER VERIFIED. Heavy production paused; HeavyF3 approval, P1 COMPLETE and other prior acceptance protected. No new art/P3/main merge or unchanged redeploy. Permanent release rule: direct Arena fixture is not actual mobile app UI proof; viewport/layout changes require real built-app navigation, scale/offset/rotation/reload, transformed canvas pointer and body-modal coverage before deployment. Diagnose page geometry separately from actor landmarks. Every successor prompt one self-contained copyable block; latest containing feature docs commit is authoritative, docs-only closure[skip ci]. Older “NEXT ONLY Basic review” entries below are superseded by this critical UI defect scope.

## 2026-10-19 — Basic size correction DEPLOYED / PLAYER SIZE REVIEW PENDING

Scoped release4607a6bee2675ddf812c5387d787e128969ea684 is DEPLOYED. Actions39179339552 build117828553702/deploy117828757017 SUCCESS; scoped67/67 + Build/guard81/81 PASS. Actual Chromium/Phaser WebGL normal/reduced×left/right4cases/24screenshots PASS; six inspected/retained screenshots. Body177.75×160.875 matches22.5px reference landmark, foot/mirror/true250ms hit/miss/source/contact/Idle/Pause/direct-destroy validated. Controlled fixture is not automatic AI/UI/mobile/FPS/GPU proof. Existing gameplay/cadence/Tier/art/FX geometry,39required keys16,630,060bytes+131,072reserve retained.

Public15files(index+2JS+CSS+11runtime PNGs) exact bytes match downloaded actual CI Pages artifact12155054593 and local build. Large transfers reconstructed from complete HTTP Range parts, not sampled hashes. Live https://hansen0318.github.io/shanhaijing-arena/?v=4607a6b . Evidence docs/verification/M5C_P2_BOTUO_BASIC_BODY_SCALE_RELEASE.md and P2_BASIC_BODY_SCALE/release.json,public-fingerprint.json,browser/. Heavy F3 receipt remains PLAYER APPROVED; P1 COMPLETE and old Basic acceptance other than this reported defect stay protected.

NEXT ONLY targeted player review: 猼訑Basic size continuity from Idle/Move through attack and back. **NOT PLAYER VERIFIED for this size correction until explicit confirmation.** Do not redo F3/art/GIF/250ms/fullP1 or redeploy unchanged release; do not start Heavy poses/P3/main merge. After player confirms, record scoped size-fix acceptance and resume already-approved HeavyF3→remaining poses. This evidence-only closure uses[skip ci]; docsHEAD can be newer than deployed source. Fetch latest containing feature commit; current successor docs/handoffs/P2_BOTUO_BASIC_SCALE_NEXT_WORK.md, every successor in one complete copyable block. Older pending entries below are historical.

## 2026-10-19 — Basic size-fix scoped release AUTHORIZED / pending

Player「完成了嗎，未完成就繼續」at08:05:55+08:00 responds to explicit browser→deploy→fingerprint→size-review next step. Continue that bounded release from3f85dd5; no new art/Heavy production/main merge. Existing feature/PR1 Pages pipeline flags[botuo basic release][botuo body scale] run only67affected checks, Build/guard and updated real Chromium checker before deploy. Evidence/authorization: docs/verification/M5C_P2_BOTUO_BASIC_BODY_SCALE_RELEASE.md. Release/browser/public/phone results remain pending until measured. Prior engineering, F3 approval, other character acceptance and16MiB/reserve protected. Evidence closure[skip ci]; latestcheckpoint is containing commit, fetch again.

## 2026-10-19 — Basic body-scale correction ENGINEERING PASS / NOT DEPLOYED

Heavy F3 is PLAYER ART APPROVED; receipt docs/art/approved/botuo/heavy/f3-v1/acceptance.json and approval/priority remote07a51545853796a0cf69e52cecfd1bf835d99344. Continue to protect it; do not repeat F3 review. Player-reported Basic shrinking took priority over remaining Heavy art.

Root: accepted action review used20px skull span without matching accepted Idle22.5px world landmark. Explicit opt-in shared data calibration now matches22.5px, keeps foot−16.2px and both-facing support, and preserves independent source/contact world size/position/timing. No regenerated source/GIF/receipt, no combat/CD/250ms/Tier/collision change. Other four character definitions and P2 Idle/Move/KO/stats deep-equal baseline. Future actions must calibrate stable body landmarks in actual renderer units before runtime, never infer size from frame dimensions or fit crouched height to Idle. Full workflow lesson and evidence: docs/verification/M5C_P2_BOTUO_BASIC_BODY_SCALE_FIX.md.

RED4/4 reproduced density defect; GREEN4/4; affected67/67 PASS, Build/guard81/81 PASS; six residency cases39keys/16,630,060bytes +131,072reserve retained. Static descriptor comparison inspected, not gameplay capture. Updated real Chromium checker NOT RUN here (executable absent); old browser/phone acceptance is not size-fix evidence. **FIX IMPLEMENTED / ENGINEERING CHECKS PASS / NOT DEPLOYED / PLAYER SIZE FIX REVIEW PENDING.** Current publicdb451cd unchanged. Next: scoped real-browser verification/release authorization, deploy/fingerprint then targeted size review before Heavy continuation. No full P1 rerun/new art/P3/main merge or accidental art/docs deployment; [skip ci]. Latest checkpoint is containing feature commit, fetch again. Current successor docs/handoffs/P2_BOTUO_BASIC_SCALE_NEXT_WORK.md; all successor instructions one complete copyable block.

## 2026-10-19 — Heavy F3 PLAYER APPROVED / Basic size defect PRIORITY

Player explicitly approves the presented Heavy F3 and requests GitHub recording before and after fixing Basic whole-character shrinking. Immutable approval: docs/art/approved/botuo/heavy/f3-v1/acceptance.json, source0049d9610e46b0d3ad5cffff6e54a94190786992999b282eef2253c8c019b206. **F3 DESIGN / PLAYER ART APPROVED**, not remaining poses/VFX/GIF/timing/runtime approval. Prior F3 pending text is historical.

**NEXT PRIORITY: diagnose and correct P2 Basic size continuity against accepted Idle/Move; Heavy production paused.** Concrete new player defect authorizes affected inspection/fix/minimum checks; do not reopen unrelated Basic or P1 acceptance. Preserve approved pixels, grounded anchor, mirror, actual250ms timing/HP/FX/CD/Tier and16MiB+reserve. Confirm body landmarks/density across Idle→F1–F4→Idle/Move instead of trusting canvas dimensions or lower crouched silhouette height. New fix is not deployed/player-verified until separately evidenced. Existing deployment db451cd remains unchanged. No new Heavy poses/P3/main merge. Checkpoint[skip ci].

## 2026-10-19 — P2 Heavy 震嶺 F3 DESIGN CANDIDATE / PLAYER REVIEW PENDING

Player「好繼續」continues after Basic PASS/PLAYER VERIFIED. Recovered feature4d849f760adb2219fcb12b4b710b71507948ebff / PR1 open/unmerged. Mechanics/Tier and approved identity recovered; ONE new character-only F3 forward beast-bracer bash candidate produced, visibly distinct from accepted low horn Basic. Master SHA2560049d9610e46b0d3ad5cffff6e54a94190786992999b282eef2253c8c019b206. Exact references/prompt/alpha/QA: docs/art/candidates/botuo/heavy/key-pose-v1/. Source alpha1 at left edge preserved;40px padding has exact RGBA roundtrip and clear outer borders. PNG/QA/protected-path checks only; no new runtime/tests/build/deploy/phone evidence. Candidate is NOT PLAYER APPROVED.

Spec/mechanics and four-skill distinction: docs/M5C_P2_BOTUO_HEAVY_ACTION.md. Existing Heavy tactical telegraph650ms is Tier-scaled, not Basic250ms or universal windup; non-tactical/empty paths are immediate today. Later preflight must map actual lifecycle before changing it. No timing/collision/extra-hit changes. VFX must remain independent source/true-hit contact and clearly visible; body remains distinct with VFX off. Future Special/Awakening direction is reservation only, not production authority.

NEXT ONLY player review of this F3 design/identity/equipment/grounded forward bash, then accepted-art remaining poses → independent VFX/GIF gates. P1 COMPLETE, P2 base/Idle/Move/KO/Basic PLAYER VERIFIED and old art/receipts protected; ordinary Hit CANCELLED. Existing db451cd deployment unchanged. Required16,630,060+reserve131,072 remains PRIOR Basic evidence, not Heavy residency approval. No P3/main merge/deploy; [skip ci]. Latest checkpoint is containing feature commit; fetch remote. Current successor docs/handoffs/P2_BOTUO_HEAVY_NEXT_CHAT.md; all successor instructions in one complete self-contained copyable block. Older pending/next-gate text below is historical.

## 2026-10-19 — P2 Basic PASS / PLAYER VERIFIED — runtime acceptance CLOSED

Player「好，我測試過了，basic approved，妳紀錄github相關流程紀錄和規則」explicitly confirms the deployed P2 猼訑 Basic「角擊」after the pending phone-review handoff. **PLAYER ART APPROVED / PLAYER EXECUTABLE CONTRACT APPROVED / ENGINEERING PASS / DEPLOYED / PASS — PLAYER VERIFIED.** Accepted runtime `db451cda0e396736b170d0196d32655649303a36`, presented URL https://hansen0318.github.io/shanhaijing-arena/?v=db451cd ; recovery baseline `2bf0ff55ddf69f73eb6ca7f1e34e16b5648590bb`. New immutable receipt: `docs/art/approved/botuo/basic/runtime-v1/acceptance.json`.

This closes overall scoped player acceptance, not an itemized report of facings/reduced motion/Pause/Restart, device/browser identity, FPS or GPU memory. Exact approval time was not provided; 2026-10-19 is the recording date in Asia/Taipei. Reuse existing engineering220/220, Build/guard, Chromium4cases/24screenshots and public15-file fingerprint evidence; none rerun for this documentation closure. Prior deployment evidence remains immutable and its then-pending status is historical, superseded by this receipt.

**Permanent recovery/acceptance rule:** bind the exact player statement to the presented release SHA/URL and skill scope; keep art, executable contract, engineering, deployment and player acceptance distinct. Newest closure overrides older pending pointers; do not reopen completed Basic art/GIF/250ms/runtime/phone gates or repeat tests/deploy without a concrete new defect or changed scope. Preserve approved sources/older receipts, P1 COMPLETE, P2 base/Idle/Move/KO and ordinary Hit CANCELLED. Ordinary damage does not interrupt attacks/casts/movement; legal control/KO remains. Maintain visible independent outgoing/contact FX and readable body motion with FX off for future skills; Basic<Heavy<Special<Awakening escalation does not authorize changing actor size, hit geometry or timings.

**NEXT unfinished gate:** P2 Heavy「震嶺」existing-mechanics/approved-identity recovery → design/choreography → F3-first art review, then remaining poses/independent VFX/GIF → scoped integration/release → player review. Basic approval is not Heavy art approval, whole-P2 completion or permission to bypass later gates. This slice only records acceptance/process/rules and stops; no Heavy production, P3, main merge or deployment. Use `[skip ci]`; documentation HEAD may be newer than deployed runtime. Latest checkpoint is this entry's containing feature commit; fetch again. Successor `docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md`, every subsequent handoff in one complete self-contained copyable code block.

## 2026-10-18 — P2 Basic DEPLOYED / real browser PASS / PLAYER PHONE PENDING

Player「好，繼續」authorized scoped release. Release db451cda0e396736b170d0196d32655649303a36; Actions39127557379 build117675784662/deploy117675979008 SUCCESS,220/220 affected checks + Build/guard PASS. Actual Chromium/Phaser normal/reduced ×left/right4cases/24screenshots, hit/miss/source/contact/F3/F4/Pause/direct-destroy PASS. Screenshots inspected; no live UI/automaticAI/browser-FPS/GPU/mobile acceptance inferred. Prior actualAI/player tests remain separate engineering evidence.

Public15files(index+2JS+CSS+11new runtime PNGs) byte-exact SHA256 match actual CI Pages artifact. Live https://hansen0318.github.io/shanhaijing-arena/?v=db451cd . Evidence docs/verification/M5C_P2_BOTUO_BASIC_RELEASE.md/.json, M5C_P2_BOTUO_BASIC_PUBLIC_FINGERPRINT.json, P2_BASIC_BROWSER/. Original art/receipts/GIFs unchanged; required16,630,060bytes/16MiB with131,072reserve retained. P1 COMPLETE, ordinary Hit CANCELLED remain protected.

NEXT ONLY targeted P2 phone review: body and independent outgoing/contact clarity, real HP/numbers synchronization, both-facing Idle return, Pause/Restart. NOT PLAYER VERIFIED until explicit confirmation. Do not reopen art/GIF/250ms, repeat full P1 or release, start Heavy/P3, merge main or deploy docs-only closure. [skip ci] evidence checkpoint may be newer than release SHA; latest checkpoint is containing feature commit, fetch again. Successor docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md.

## 2026-10-18 19:43+08:00 — P2 Basic executable250ms contract PLAYER APPROVED

Player「如果這樣是符合邏輯的話，我同意」at2026-10-18T19:43:23+08:00 accepts the explained250ms real-windup recommendation from feature preflight `3acdc848d39b13793e10a511422a64860b9dd91e`. Rationale verified in existing preflight: current Basic resolves immediately, accepted visual contact is240ms, and normal50ms steps resolve both240/250ms at250ms. Acceptance receipt: `docs/art/approved/botuo/basic/executable-v1/acceptance.json`. **PLAYER EXECUTABLE CONTRACT APPROVED / NOT IMPLEMENTED**, separate from immutable visual acceptance. Do not ask for timing or art approval again unless actual scope changes.

Approved bounded contract: fixed250ms real windup T0–T3; F1/F2/F3/F4=160/90/160/160ms; same actual resolve owns HP/text/contact; source160ms throughresolve+200ms, hit-only contact200ms independent of F3body160ms. Preserve coefficient/range/crit/Tier/cadence-at-start/no displacement; target escapes miss, ordinary damage does not cancel, existing legal controls/KO/new skill cancellation remains. Details and historical evidence: `docs/verification/M5C_P2_BOTUO_BASIC_PREFLIGHT.md`.

**NEXT: high-fidelity source-preserving runtime packing, then minimum shared/data integration and affected checks.** Rejected low-density PLANNING assets stay rejected. Keep16MiB cap and131,072byte reserve, no approved pixel loss/regeneration or P1 retest/review. Player also asked「接下來呢？先跟我說」at19:42:16: this slice records the decision and explains the next steps only; it does not claim implementation, build, release authorization, deployment or phone acceptance. Do not deploy this docs-only checkpoint (`[skip ci]`). P1 COMPLETE / ordinary Hit CANCELLED; no Heavy/P3/main merge. Latest feature HEAD is the containing commit; fetch again. Canonical successor `docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md`.

## 2026-10-18 — P2 Basic GIF PLAYER APPROVED / real250ms timing proposal pending

Player19:23:19+08:00「我審核ok，紀錄github相關流程規則進度，然後繼續」(repeated19:23:43) accepts presented four poses + independent VFX + normal/slow GIF. **PLAYER VISUAL APPROVED**, immutable receipt `docs/art/approved/botuo/basic/composite-v1/acceptance.json`, published `b7c0df68d5a85de844d35d4892413ec4dc345bfd`. Source-preserving GIF checkpoint `45c8d52402004af7bfea9ddef9d2f366b6fcff3a` has the identical tree to local presented1319da6. Preserve original PNG/GIF/prompts/receipts; historical candidate metadata is superseded for accepted visual scope only. Do not repeat art/GIF review.

**Continued: bounded runtime preflight measured**, `docs/verification/M5C_P2_BOTUO_BASIC_PREFLIGHT.md/.json`.16 direct production-session source/tactical/faction/direction cases +4Tiers +4misses confirm current one immediate0ms real hit/unphased cast/no action token.12 sandbox-only proposed240/250ms/cancel/escape/ordinary-damage probes: normal50ms simulation resolves both due choices at250ms. **Propose fixed250ms real windup T0–T3**, F1/F2/F3/F4=160/90/160/160ms, real HP/text/contact on actual resolve, no fake delay; target escape misses, ordinary damage continues, legal control/KO/new skill cancels without cadence refund. Preserve coeff/range/crit/Tier/cadence/no displacement. Exact source/contact/body lifetimes and minimum integration delta in report.

All-five required16,552,840bytes under16,777,216, reserve131,072 retained.89,856byte low-density probe technically fits but visibly softens approved art and is **REJECTED / NOT SELECTED**; actual high-fidelity packing remains engineering work. No budget increase or approved source edits. Full RGBA crop proof/quality comparison retained under `docs/verification/P2_BASIC_RUNTIME_PACK_PROBE/`; no PLANNING files enter runtime. **NEXT genuine gate: player accepts/revises proposed250ms executable contract**, not art reapproval. No runtime implementation/ENGINEERING PASS/build/deploy/player-phone PASS. P1 COMPLETE, ordinary Hit CANCELLED, protected sources unchanged. No P3/Heavy/main merge; `[skip ci]`; successor `docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md`. Latest HEAD is containing feature commit; fetch again.

## 2026-10-18 — P2 Basic composite GIF CANDIDATE / PLAYER REVIEW PENDING

Player at2026-10-18T17:22:42+08:00:「好接下來是做gif給我確認嗎，是的話就給我連結看」, following「未完成就繼續」, explicitly authorizes advancing the presented pose set into a GIF preview. This supersedes the prior stop-before-GIF pointer for **preview production only**. Do not fabricate a separate per-pose approval statement: F3 remains explicitly PLAYER ART APPROVED; F1/F2v2/F4 are authorized preview inputs, with their final visual acceptance pending composite review. No runtime/deploy authority inferred.

Completed at recovered feature `dec02b2786b8d3829a5b4cb0b01350e62023a9bd`: two new independent Basic horn-force/source and crushed-stone/contact VFX; deterministic full-canvas safe cells using author-selected skull-height density/common XY scaling and hoof baseline; normal/3×slow composite, character-only normal/slow, static reduced-cue preview, both directions and approved Idle return. Sources/prompts/QA/manifest/checksums: `docs/art/candidates/botuo/basic/composite-review-v1/`; reproduce `python scripts/prepareBotuoBasicReview.py`. Normal GIF SHA256 `55c70c31141da605ee16f558bc6c9629c1ceeab73acb3314a2b3066d1c98ae9d`; slow `8f9fd7662e54565ff6fdfe5e709fd4862f0e3b819a85bfe7c777dec4829ab553`. Normal2800ms/slow8400ms include both directions and Idle; decoded minimum holds40/120ms, exact paletted pixel/timeline roundtrip PASS. Character cells preserve every resized source pixel with >=35px alpha padding; masters/approved sources unchanged.

**GIF/VFX CANDIDATE / PLAYER REVIEW PENDING. NEXT: player reviews linked normal/slow GIF for obvious body articulation, independent outgoing/contact visibility, identity/scale/grounding, left/right and Idle return.** Preview F1/F2/F3/F4=160/80/160/160ms, contact240ms after visual action start, is not an approved gameplay delay; real Basic remains windup0ms. Neutral marker is schematic, no real HP/damage/collision proof. No runtime integration/ENGINEERING PASS/build/deploy/phone acceptance. Existing16MiB limits/reserve and accepted P1/P2 base/Move/KO remain protected, generic Hit stays CANCELLED. Source-to-Idle scaling/visible-ground alignment are review transforms, not runtime descriptor edits. Checkpoint `[skip ci]`, no main merge/P3. Updated successor: `docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md`. Always fetch latest containing feature commit on recovery.

## 2026-10-18 — P2 Basic F3 PLAYER APPROVED / F1-F2-F4 CANDIDATES

Player at2026-10-18T15:36:06+08:00:「好f3我approved，繼續，要確保未來動畫東西要足夠明顯」. **F3 PLAYER ART APPROVED**, exact immutable source19a8e9f8cf74c870558a4ea734b67e03d5eacce71072c5bc979931cf00f42f36; receipt `docs/art/approved/botuo/basic/f3-v1/acceptance.json`, checkpoint `cfd2b22c56e995a528909af08a5a491e490c3afa`. F1 rear load, F2v2 forward release, F4 guarded recovery now **ART CANDIDATES / PLAYER REVIEW PENDING** at `docs/art/candidates/botuo/basic/phase-poses-v1/`. Static four-pose light/dark/small-size comparison, individual prompts, originals, rejected F2v1 history, reproducible PNG/alpha/bounds/hash report retained. Latest feature checkpoint is the containing commit; fetch remote again.

**Permanent visibility requirement:** articulated load/release/contact/recovery must be clearly different with effects OFF; review normal-speed and small/mobile-scale playback later, never assume a large still proves battlefield visibility. Caster/source effects and real-target impact must each be unmistakable, with Basic<Heavy<Special<Awakening escalation and distinct signatures; reduced motion retains readable static cues. Achieve this with pose/silhouette/value/independent FX and appropriate existing event-owned finite holds, not actor enlargement, invented hits/range, or unapproved HP/cast timing changes. Current static QA is a uniform source-scale study, not actual phone proof.

**NEXT ONLY: player reviews F1/F2v2/F4; F3 is closed.** Then accepted-pixel safe normalization + independent VFX + normal/slow/effects-off/mirrored/Idle-return GIF review. No VFX/GIF/runtime/deploy acceptance inferred. Basic still windup0ms/one real immediate hit; any timing change needs separate exact approval. P1 COMPLETE, generic Hit CANCELLED, all P1 and P2 base/Move/KO assets protected. Actual checks: PNG decode, visible-edge/border-alpha/hash/opaque QA, whitespace/protected paths; raw alpha1 border noise preserved/reported, no full-alpha-clear or runtime-ready claim. No suite/build/Pages rerun. `[skip ci]`, no main merge/P3. Current spec `docs/M5C_P2_BOTUO_BASIC_ACTION.md`; successor `docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md`.

## 2026-10-18 — Current P2 Basic art gate / protected closure

P1 is COMPLETE BY EXISTING ACCEPTANCE EVIDENCE, generic Hit CANCELLED / NOT REQUIRED. P2 accepted identity/static Idle/Move/KO stay protected; actual approved gold beast-face bracer/red sash images supersede older unaccepted gray/plain-guard suggestions. Current first unfinished gate is Basic「角擊」ONE F3 **ART CANDIDATE / PLAYER REVIEW PENDING** at `docs/art/candidates/botuo/basic/key-pose-v1/`; source SHA256 `19a8e9f8cf74c870558a4ea734b67e03d5eacce71072c5bc979931cf00f42f36`. Read `docs/M5C_P2_BOTUO_BASIC_ACTION.md` and current top WORK_PROGRESS/STATE; do not follow historical P1 Hit/P2 Idle/Move-pending pointers. No remaining poses/VFX/GIF/runtime/deploy before the corresponding player gates. Current Basic remains immediate single hit, no P1 windup inheritance; preserve real Tier controls. No main merge/P3, no repeated accepted tests/deploy. Successor handoff: `docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md` (one complete code block).

## 2026-10-18 — PLAYER DECISION: cancel ordinary Hit Reaction, preserve uninterrupted abilities

Player explicitly rejects ordinary on-hit pose/animation: being damaged must **not** switch into a hurt/recoil stance or interrupt an ongoing attack/cast/movement. Concurrent hit recoil and offensive VFX clutter combat readability. **Cancel the entire P1 ordinary Hit Reaction production/review/GIF/integration/deploy gate**, and remove it from mandatory P1 completion criteria. Do not create equivalent per-character ordinary Hit animation for P2–P5 by default. This supersedes older “Hit next” handoffs/proposals, including KO>Cast>Hit>Move>Idle and two-100ms poses; those are HISTORY / REJECTED, not pending tasks.

Work-generated candidate `docs/art/candidates/lushu/hit/key-pose-v1/` is **ABANDONED / REJECTED BY SCOPE**, never player-approved; **do not promote, render additional poses, QA/GIF, integrate, or deploy**. Preserve existing immutable evidence/history if necessary rather than silently deleting it, but mark obsolete in documentation. If Work is still running a Hit task, stop that task and do not merge/use its products. Do not roll back or touch player-approved Basic/Heavy/Special/Awakening and their runtime/receipts. This is a **design and scope change only**, not an implementation claim.

At actual damage, preserve authoritative HP subtraction, damage/critical numbers, skill/contact VFX, normal attack/cast/movement animation uninterrupted; lethal damage still transitions to existing KO/death behavior. No stun, knockback, interruption or invulnerability is added by damage alone. Distinguish explicit ability-defined crowd-control, if any, from removed **generic hurt pose**: do not silently remove approved mechanics.

**NEXT:** skip ordinary Hit and perform **P1 whole-character closure audit** using existing accepted evidence (not re-run Awakening or all earlier player gates). Read current roadmap/acceptance matrices to inventory any remaining non-Hit obligations (including existing KO/Idle/Move status) and run only missing checks if needed; ask player for *one scoped final P1 sign-off* only if genuine acceptance requirement remains. After explicit P1 complete, follow character-first roadmap to P2 猼訑, starting with repository-approved identity/first missing art gate. No main merge; no shanhaijing-td gameplay. Keep Chat-first, minimal Work, generic data-driven architecture. New Chat/Work handoffs must be single self-contained copyable code blocks. This entry overrides conflicting old pointers, not historical receipts.


## 2026-10-18 — Awakening PASS / PLAYER VERIFIED — runtime acceptance closed

Player on 2026-10-18: 「我測試確認ok，核准，紀錄github相關規則進度流程」, responding to the deployed Awakening phone-review handoff. **P1 鹿蜀 Awakening「南山奔襲」: ENGINEERING PASS / DEPLOYED / PASS — PLAYER VERIFIED.** This closes the scoped player/phone acceptance gate for runtime `8e2f5e049095017d7350b1d0d61e96527ab21e44`, live https://hansen0318.github.io/shanhaijing-arena/?v=8e2f5e0 . Baseline docs checkpoint: `8e528a49c9d5defb8958891a4b05a991689b1c45`. Immutable runtime receipt: `docs/art/approved/lushu/awakening/runtime-v1/acceptance.json`.

Recorded engineering/release evidence remains Actions #1067 / run39097029256, 879/879 tests, build/asset guard, real Chromium four cases/28 screenshots and 17 public-file SHA256 matches. Those are prior release results, not rerun for this documentation update. The player's statement confirms overall scoped acceptance; it does not supply individual checklist observations, device/browser model, FPS or measured GPU memory. Preserve this distinction in future recovery.

Permanent acceptance flow: bind the exact player statement to the presented deployed SHA/URL and scope; keep visual approval, executable-contract approval, engineering evidence, deployment evidence and player acceptance separate. Read the newest authoritative entry/receipt before older history; do not reopen or repeat completed Awakening gates without a new defect or changed scope. Preserve all approved sources/GIFs/older receipts and historical pending entries, which this entry supersedes only for Awakening.

**NEXT unfinished milestone: P1 Hit reaction, then character-wide regression/player acceptance**, following the character-first roadmap. Whole-P1 completion and P2 remain unclosed. This request records acceptance/rules/progress/workflow only; it does not implement that next milestone. Keep feature branch `feat/m0-combat-core-20260927` / PR1, no main merge. Evidence-only checkpoints use `[skip ci]`; docs HEAD may be newer than the deployed runtime SHA. Successor prompts remain one complete copyable block.

## 2026-10-18 — Awakening DEPLOYED / real browser PASS / PLAYER PHONE PENDING

Player「好，確認紀錄進度規則和流程，沒問題就然後繼續」at12:17:25+08:00 authorized the scoped verification/release. **P1 Awakening「南山奔襲」integrated and DEPLOYED** from8e2f5e049095017d7350b1d0d61e96527ab21e44. Actions#1067/39097029256 build117585501848 and deploy117585692920 SUCCESS;879/879 tests, build and asset guard PASS. Actual Chromium/Phaser WebGL verification4 cases(normal/reduced motion ×left/right),28 screenshots, real3 hit identities/times and complete direct-destroy cleanup PASS. Screenshots inspected; this is fixed-simulation-time browser rendering, not phone/FPS/GPU-memory acceptance.

Public17 files(index+3 JS/CSS+13 runtime PNGs) exact-byte SHA256 match release build. JS:index-D7Qjj1EB.js,battleRuntime-Bt34mgQY.js;CSS:index-DcqtNRF0.css. Live: https://hansen0318.github.io/shanhaijing-arena/?v=8e2f5e0 . Fingerprints:`docs/verification/M5C_P1_AWAKENING_PUBLIC_FINGERPRINT.json`; release evidence:`docs/verification/M5C_P1_AWAKENING_RELEASE.md`; real browser JSON+6 representative screenshots:`docs/verification/P1_AWAKENING_BROWSER/`; full28-shot artifact12124838038. Required decoded scene/cache16,552,840/16,777,216 bytes;131,072 optional reserve retained. Approved sources/GIFs/receipts untouched, no cap raise or art regeneration.

First browser release attempt1066 correctly blocked deployment on direct Game.destroy cleanup; generic Arena ownCleanup now handles shutdown/destroy exactly once. Permanent lifecycle rule: scene-owned session/presenter/FX/numbers/load gate cleanup must cover both events, remove paired listener on first event and pass real destruction/Restart checks. Never weaken a failing release gate or infer phone approval from CI.

**NEXT ONLY: player phone review** of first-rush speed,3distinct source/contact VFX, independent realHP steps/escape/empty cast, actor size/left-right/Idle return and Pause/Restart. No claim of phone acceptance, no P1 fully verified/Hit reaction/new art/P2 or main merge. Do not repeat preflight/approved art/runtime integration/deployment. Evidence-only closure uses[skip ci], so latest docs HEAD may be newer than deployed runtime SHA. Every successor prompt remains one complete copyable block; fetch current remote on recovery. Older not-deployed/pending entries below are history.


## 2026-10-18 — scoped Awakening release authorized / browser gate and deployment pending

Player at2026-10-18T12:17:25+08:00: 「好，確認紀錄進度規則和流程，沒問題就然後繼續」, responding to completed integration112f0d3943aa74d59798dfe67d14cab694b6a671 and next steps browser check→Pages deployment→phone acceptance. **Scoped verification/deployment authorized**, no repeated art/contract approval required. Integration877/877/build/source/cache evidence stays recorded; this is not deployment/phone PASS.

Release uses existing feature branch/PR1/Pages pipeline, never main merge. One-shot commit flag `[awakening browser]` opts into real Chromium/Phaser pose/source/contact/mirror/reduced-motion/Idle/teardown checks before Configure Pages/upload/deploy; failure prevents release. Browser tool is pinned and installed outside the repository; production dependencies/source/assets unchanged. Browser evidence is uploaded as `awakening-browser-verification`; deterministic render samples are not device FPS or phone acceptance. This host has no Chromium; its download returns a zero-size/invalid archive, so do not claim local browser PASS. CI is the executable browser environment.

NEXT inspect exact release Actions jobs, browser evidence/screenshots, deployment result and public JS/CSS/all13 runtime PNG fingerprints; record exact SHA/URLs/outcomes. Phone remains player-owned and P1 is not declared fully verified from CI alone. No new art/P2/Hit reactions/main merge. After release use `[skip ci]` for evidence-only closure to avoid unintended redeploy. Historical NOT DEPLOYED entries remain prior checkpoints; only later evidence may close deployment. Every successor prompt stays one complete copyable block.


## 2026-10-18 — approved Awakening runtime integrated / automated verification PASS / NOT DEPLOYED

Player executable acceptance: 「好確認，繼續」2026-10-18T10:10+08:00, against preflight fa29a9c; later status question confirms this work is integrating the accepted animation into the game. **Runtime integration IMPLEMENTED;877/877 automated tests, build, asset guard and diff checks PASS.** Shared staged actions now drive three real ray-clipped displacements, boundary-only locked-target re-aim, independent relative swept hits0.40/0.70/1.10, no miss HP/RNG/target FX, cancellation and true event-owned body/source/target feedback. Default50ms is preserved outside actual staged windows; action intervals<=10ms and exact event/status/area boundaries. Existing defense/crit/Tier contracts preserved.

Five approved poses + six independent accepted source/contact VFX use deterministic runtime derivatives. Six legacy packs remove only proven blank outer rows/unused Botuo static cells; original source bytes/GIFs/receipts untouched and both-facing world placement verified. Required scene/cache/reservation peak16,552,840/16,777,216 bytes;224,376 headroom;optional reserve131,072 retained. No image generation, cap increase or required-art eviction.

Evidence: `docs/verification/M5C_P1_AWAKENING_RUNTIME.md`, `.json`, `P1_AWAKENING_RUNTIME_ASSETS.json`; recovery plan `docs/plans/2026-10-18-p1-awakening-runtime.md`. Fresh reviewer identified source-texture reuse, queued/telegraph time ties and readiness-triggered global10ms stepping; all fixed with RED→GREEN regressions, including periodic-area tie and legacy Heavy-contact/body overlap. Eight isolated production-session/presenter traces cover player/AI, both factions and both directions; real Tier and Arena bridge tests pass. These are NOT browser pixels/GPU/mobile proof.

**NOT DEPLOYED / BROWSER VISUAL + PHONE PENDING.** Feature checkpoint uses `[skip ci]`; PR1 remains open and no main merge/P2/Hit-reaction work. NEXT: review integrated runtime presentation/raster/cadence on the actual game, settle scoped feature deployment, then publish/fingerprint and player phone smoke. Do not regenerate/reopen approved art/GIF/real contract or redo implementation/preflight; recover latest remote and continue only this remaining release/device delta. Every successor prompt must remain a single complete copyable block. Historical pending/old-runtime statements below are superseded by this top entry.


## 2026-10-18 — executable contract PLAYER APPROVED / runtime integration authorized

Player at 2026-10-18T10:10+08:00: 「好確認，繼續」, in direct response to the runtime preflight proposal at `fa29a9caa04a9b91b69169def720327b3c1f1476`. **Executable contract and source-preserving packing path PLAYER APPROVED; implementation authorized.** This supersedes the prior decision-pending stop, not historical evidence or the visual receipt.

Binding contract: `docs/verification/M5C_P1_AWAKENING_RUNTIME_PREFLIGHT.md` Section2 in full: anticipation80ms; starts80/135/280, center-arrivals110/260/420, follow-through ends135/280/470, recovery610ms; real swept-overlap HP/contact times, not fixed preview accents; source/target radii.30/.25;4-unit leg cap, overruns.65/1.10/.65; locked-target boundary-only re-aim, ray truncation at arena boundary, empty/escape/death/cancel policies, shared <=10ms chronological action-window stepping. Fixed coefficients.40/.70/1.10,total2.20,T0 CD12 and existing Tier/defense/crit semantics. No miss damage/RNG/target FX, no P1 engine exceptions. Implement approved-source runtime derivatives and measured lossless legacy packing without changing visible world placement or raising16MiB cap; keep128KiB optional reserve.

Visual sources/GIFs/receipts/history remain immutable. Integration tests/build/review must establish actual engineering evidence; this approval itself is **NOT ENGINEERING PASS / NOT DEPLOYED / PHONE PENDING**. Continue implementation, no P2/main merge. Use `[skip ci]` checkpoints until integration is verified and release scope is settled; preflight did not grant deployment. Do not reopen this accepted contract or re-request the same approval. Next: approved runtime integration; then scoped release and player phone verification.


## 2026-10-18 — v3 GIF PLAYER APPROVED / runtime preflight next

Player: 「我審核OK，你紀錄github相關進度流程規則，然後我要換新的work繼續做，你要給我prompts給新的work，無縫接軌，是嗎?是的話就繼續」, responding to corrected v3 normal/slow/comparison at d8e895ad9d86aaef2e2d15a82e54e13f275d79ca. **Five poses + independent three-phase VFX/composite visual playback PLAYER APPROVED.** Exact immutable paths/hashes/scope: `docs/art/approved/lushu/awakening/composite-v3/acceptance.json`. Approved binaries remain at their versioned source paths; the folder name candidates is historical, the acceptance receipt is authoritative. Do not regenerate or overwrite approved bytes. Older pending statements below are historical.

Accepted visual preview: contacts110/260/420ms,recovery610ms, first rush30ms. Per AGENTS separate timing-scope rule, GIF review does not separately approve real actor displacement/collision geometry/re-aim/arena behavior or changing the prior explicit real combat contract150/300/460ms,total650ms. New Work measures the executable delta and presents a concrete revised real timing/geometry contract before changing mechanics; do not reopen approved art/GIF. Fixed coeff0.40/0.70/1.10,total2.20,CD12, three independent at-most-once swept hits, defense/crit/Tier; no false HP or target hit FX on whiff.

**RUNTIME NOT IMPLEMENTED / ENGINEERING NOT PASSED / NOT DEPLOYED / PHONE PENDING.** Existing code still immediate/+120/+240ms equal damage and no triple dash; preview is scripted illustration. NEXT bounded Work: recover latest GitHub, inspect shared combat/action/VFX/cache/renderer, measure legal paths/hurtboxes, source-to-runtime scale/anchor/mirror and16MiB residency; record executable plan and exact remaining contract decision. No gameplay changes/deploy in this preflight slice. Canonical handoff/static findings: `docs/handoffs/P1_AWAKENING_V3_NEXT_WORK.md`. Preserve Basic/Heavy/Special; no P2/main merge. Checkpoint [skip ci].

Permanent rules: bind exact statement, hashes and scope; keep visual acceptance / real timing-geometry approval / ENGINEERING PASS / DEPLOYED / PHONE VERIFIED separate. Decode all review GIF holds >=20ms; comparison and normal must share sample times/directions/Idle holds. File duration alone does not prove device wall-clock playback. Keep all previous sources/versions immutable.


## 2026-10-18 — first-rush speed revision requested; prior GIF not accepted

Player2026-10-18T09:12:07+08:00: 「進度流程規則先紀錄到github相關資料文件，第一段要改更快」. Record35971db assets/provenance/checks before revision. **Five character poses remain PLAYER APPROVED; VFX/GIF remain CANDIDATE / PLAYER REVIEW PENDING.** This revision request is not acceptance of the prior GIF or permission to integrate/deploy.

Create a versioned PREVIEW candidate only: retain80ms anticipation, shorten first visible rush80–150ms (70ms) to80–110ms (30ms). After first contact advance the remaining timeline40ms, preserving all later segment/impact/recovery durations: contact110/260/420ms, recovery610ms. No inserted pause or slower second segment. These exact new numbers are executor-selected candidates, NOT player-approved replacement combat timing. Prior real design150/300/460ms,total650ms remains recorded until separate exact contract acceptance; current runtime remains unimplemented old behavior. Keep coeff0.40/0.70/1.10,total2.20,CD12 and independent collision semantics.

Preserve v1 GIFs/approved art/VFX source bytes; no image regeneration or changed character scale, path, effect shapes/sizes or damage. Publish v2 normal/slow and before-after speed comparison, record hashes/timeline/actual GIF checks and wait for player review. Timing-only requests must not be promoted into unseen asset/GIF/runtime approval. No P2/main merge/deploy; checkpoint [skip ci].


## 2026-10-18 — all five Awakening character poses player approved

Player at2026-10-18T08:47:38+08:00 「我確認ok」accepts poses1/2/3/5 on the five-pose review at951dac8; terminal F3/pose4 was approved earlier. Receipt and exact approved source hashes: `docs/art/approved/lushu/awakening/phase-poses-v1/acceptance.json`. **ALL FIVE CHARACTER POSES PLAYER APPROVED; VFX/GIF NOT YET APPROVED.** Preserve all shown source bytes; do not regenerate poses. Continue source-preserving common skull-density/ground/anchor normalization, independent three-stage escalating VFX and normal/slow/mirrored/effects-off/Idle-return composite GIF review. Distinguish real runtime from illustrative preview; no actual implementation/deploy/phone acceptance or P2/main merge. Approved gameplay contract is unchanged and remains unimplemented. Old pose-review-pending entries below are historical.


## 2026-10-18 — terminal F3 likeness approved; pose production continues

Player at 2026-10-18T06:47:26+08:00: 「好這個f3的形象我審核通過，紀錄github進度和相關流程規則，依照規則繼續」. Exact shown master SHA256 `c736acca0da5fb5b6c7824a8dfb4bfb2719cf2ce99af74c54dde21773821f3d0` is copied byte-for-byte to `docs/art/approved/lushu/awakening/terminal-f3-v1/F3-terminal-master.png`; receipt: `docs/art/approved/lushu/awakening/terminal-f3-v1/acceptance.json`. **F3 LIKENESS / IDENTITY PLAYER APPROVED; CONTINUATION AUTHORIZED.** This preserves the shown terminal pose; no approval of unseen phase poses, VFX, GIF, alpha changes, runtime, deploy or phone smoke is inferred. This entry supersedes older F3-not-produced/player-pending status below; those remain historical.

Continue with deterministic source-preserving transparent padding and independent character-only candidates: anticipation → first-rush contact → second return/crossing contact → exact approved terminal F3 → recovery. This is an authoring/review plan, not a new gameplay contract or acceptance of unshown poses. Extra key poses are justified by three separate contacts; do not force one generic four-pose loop. Contacts150/300/460ms, full650ms, coeff0.40/0.70/1.10 and CD12 remain design approved but unimplemented. After pose review, independent escalating VFX and composite normal/slow/mirrored/effects-off/Idle-return GIF require explicit player acceptance before runtime. No deploy/P2/main merge.

Source has invisible alpha1–8 noise; preserve immutable master. Padding must preserve every source RGBA pixel; if noise remains inside original canvas, report it rather than claim it was cleaned. No source redesign or regenerative repair of this approved F3. Runtime readiness remains a later shared-scale/anchor/budget gate. Checkpoint with [skip ci] to prevent art-only changes auto-deploying.


## Player-approved P1 Awakening three-rush gameplay contract — 2026-10-17

Player「好 可以 確認紀錄github流程規則進度，然後繼續」explicitly approves the previously presented **real** three-contact schedule **150 / 300 / 460 ms from cast** and **650 ms full playback including recovery**, plus **three independent path-swept collision checks**, each at most once. Design-approved T0 hit coefficients **0.40 / 0.70 / 1.10** sum **2.20**, cooldown **12s**, no extra attack, no guaranteed contact or target impact FX on whiff. Three segments are 起衝突進 → 折返追擊 → 終結奔襲. Third segment remains independently damaging if first/second missed, and third terminal-contact F3 is the first art candidate **only after the three-phase choreography is specified**. Authoritative details: `docs/M5C_P1_LUSHU_AWAKENING_ACTION.md`.

**Status distinction:** PLAYER DESIGN APPROVED / NOT IMPLEMENTED / NO F3 ART YET. Existing runtime still immediate +120/+240ms, equal 2.20/3, range checks and no three-rush displacement. Proposed segment-boundary re-aim, target-lock, swept capsule and arena clamp are implementation preflight choices requiring geometry measurements, not license to change damage geometry/retargeting beyond this approval. Keep generic shared pipeline, AI/player parity, legacy Tier, critical/defense, 16MiB budget, accepted Basic/Heavy/Special, no P2/main merge. A design approval does not authorize bypassing the **art F3 → full poses/VFX/GIF approval → runtime integration/deploy → phone smoke** gates.



## P1 Awakening approved independent hit weighting — 2026-10-17

Player「好我同意 妳把這些紀錄到github相關文件然後繼續」approves the proposed **design** for 「南山奔襲」: three individually collision-qualified hits with increasing *base coefficients* **0.40 / 0.70 / 1.10**, sum **2.20** (T0 baseline), not conditional combos. Third hit must retain coefficient1.10 if hits1/2 miss; no guaranteed hit, no fake HP, no fake target burst. Only real collision at each event can generate that hit's damage and target-attached impact VFX. First VFX smallest, second intermediate, final largest and most distinct; on phone compare independently rendered damage text, true HP bar steps and effects, and preserve existing defense/crit/Tier semantics. Actual visible HP significance is **not verified** until combat/phone test; visual legibility is not permission to change HP or give invulnerability. This supersedes equal-per-hit coefficient as a **future implementation requirement**, not a claim runtime already changed: current `battleSession.js` divides 2.20 evenly and checks later hits by range, not path collision; current ability lacks triple displacement. Keep 3 hits, CD12, total2.20; change timing/travel/hit geometry only after separate fully specified contract and approval. Multi-hit weight arrays must use generic shared data-driven schema, no P1 conditional runtime exceptions. Do not generate terminal F3 until choreography/real mechanics constraints reviewed; do not modify Basic/Heavy/Special/P2/main.



## Player-approved multi-impact Awakening design-first gate — 2026-10-17

Player「好可以，妳確認這個架構流程後，把他整理到github進度流程和硬規則，確保可給別人無縫接軌進度，然後繼續進行」approves the **design sequencing** for P1 鹿蜀「南山奔襲」: first specify all three fast collision phases (initial rush, return/crossing rush, terminal strongest rush), their travel paths, unique body poses, actual three hit/VFX correspondences and ending; **only after design review** create the key **third/terminal-impact F3** candidate, then earlier phase poses, independent effects and composite GIF for explicit player acceptance. F3-first within the pose-production stage does **not** mean F3 before full ability choreography. Do not treat this as approval of any generated image, numerical displacement/timing, GIF, runtime, or deploy. The existing P1.awakening has three damage hits but no active movement and zero windup; real movement or hit-timing changes need a separately approved gameplay contract before implementation. This rule generalizes to future multi-stage/multi-hit abilities: choreography and engine events must be mapped **before** a single key-pose image is authored. Canonical bounded spec: `docs/M5C_P1_LUSHU_AWAKENING_ACTION.md`. Preserve P1 Basic/Heavy/Special acceptance, no P2 or main merge.



## Approved action timing and source-preserving residency

Record visual/GIF approval separately from actual combat timing approval, including exact statement and scope. Once both are explicit, continue the authorized integration/deployment without reopening completed gates. Bind authored contact frame, displacement, real HP/RNG event, target VFX and post_cast effects to the same shared resolve actionId; never fake synchronization by delaying only HP text. T0 constants and existing Tier scaling are separate contracts. Runtime derivatives may remove only proven fully transparent outer rows and downsample approved sources under a recorded deterministic policy; keep originals/GIFs immutable, preserve visible-pixel world placement in both directions and test noncentral authored-action origins against actual renderer flip semantics. Fit every required asset in the existing cache cap; never silently evict required art or raise the cap. Engineering/deploy evidence does not imply phone acceptance. P1 Special320ms approval2026-10-17T14:45:48+08:00 is the current bounded case; it grants no new skill/character or main merge.


## Purpose
This repository is a new game project: **Shanhaijing Arena**. It is independent from `shanhaijing-td`.

These rules are permanent for substantial Chat / Work / Codex development unless the user explicitly changes them.

## 0. Mandatory pre-action rule refresh
Before Chat, Work, or Codex analyzes, recommends, edits, generates assets, prepares a handoff, or decides verification scope for any substantial project task, it must first re-read the current project hard rules from GitHub and recover the latest authoritative state relevant to that action.

Minimum pre-action check:
1. read the latest `AGENTS.md`;
2. read `docs/DEVELOPMENT_PLAYBOOK.md`;
3. read `docs/PROJECT_BOUNDARIES.md` when scope/architecture contamination could matter;
4. read the top CURRENT HANDOFF POINTER in `WORK_PROGRESS.md` and AUTHORITATIVE CURRENT STATE in `docs/STATE.md` when the action depends on current progress;
5. read only the relevant current spec(s) for the proposed action;
6. only after that decide what Chat can finish itself, what remains executable-only, and what should be handed to Work.

Do not rely on conversation memory, an earlier prompt, or a previous recovery when newer GitHub state may exist. If the hard rules or authoritative state changed, the latest repo state wins unless the player explicitly overrides it.

**Chat-first must be applied before every Work handoff, not merely at milestone start.** Chat must finish every safe task available to it first, including rule/spec updates, GitHub inspection, static/code analysis, asset preparation, exact source-delta preparation, and bounded repo edits. A Work prompt may be produced only after the remaining task has been reduced to the smallest irreducible executable/runtime delta.

**All player-facing handoff/instruction prompts must be one-click copyable.** Whenever Chat gives the player text intended to be pasted into a new Chat, Work, Codex, or another execution session, it must provide exactly one complete self-contained copyable code block for that destination. Do not split the instruction across prose plus multiple blocks, do not provide long/short competing versions, and do not make the player manually reconstruct missing context. This applies to new-Chat recovery prompts as well as Work prompts. Put this requirement near the top of successor prompts so the next Chat preserves the same behavior when it later produces another handoff.

## 1. Operating model
- **User / Product Owner**: final decisions and acceptance.
- **Chat**: game design, visual direction, specifications, defect analysis, acceptance criteria, bounded repo edits that can be independently verified.
- **Work**: substantial implementation, integration, executable test/debug loops, browser/runtime smoke, optimization, Git operations, deployment.
- **GitHub**: single source of truth. Conversation memory is not authoritative.

## 2. Chat-first delegation / minimum Work scope
**Token/session efficiency is a hard rule.** Before delegating anything to Work, Chat must complete the maximum safe, order-independent scope it can reliably do with available GitHub, file, image, reasoning, and bounded-edit tools.

Typical Chat-owned work:
- requirements/specification and decision locking;
- GitHub inspection and state comparison;
- architecture decisions;
- documentation/hard-rule updates;
- root-cause narrowing;
- static/code review;
- asset inventory, visual direction, image/static inspection;
- bounded repository edits that can be independently verified without a full runtime;
- preparation of exact acceptance criteria and the smallest Work handoff.

Work receives **only the irreducible executable delta** that genuinely needs its environment, for example:
- checked-out repository + iterative multi-file implementation;
- dependency installation/build tooling;
- executable TDD/debug loops after substantial code changes;
- browser/runtime/devtools verification that cannot be delegated to the player;
- long-running integration/optimization;
- merge/deploy when Work owns a substantial implementation.

If a task mixes Chat-owned and Work-only parts, Chat finishes its part first and then hands Work only the unresolved engineering delta. Do not send Work to rediscover design, repeat documentation, redo static analysis, or execute broad checks merely for convenience.

## 2A. Runtime-safe multi-frame sprite normalization
For any authored multi-frame battle sprite strip (locomotion, action/cast, hit, KO, or future flipbook animation), a visually acceptable raw strip is not automatically runtime-ready.

If any frame silhouette approaches a cell boundary, frame spacing is ambiguous, or neighboring-frame bleed cannot be ruled out, Chat must prepare and verify a **runtime-safe normalized derivative before runtime integration**:
1. use the player-approved strip/source as the only art source;
2. isolate each frame's intended character silhouette and remove pixels belonging to neighboring frames;
3. apply one uniform scale policy across the sequence unless the approved animation explicitly requires otherwise;
4. place each frame into its own fixed cell with transparent safety padding;
5. preserve the approved frame order and the intended shared anchor/baseline family;
6. inspect every cell independently, including alpha bounds / edge clearance, and confirm no horn, fin, hair, fur, cloth, weapon, limb, VFX fragment, or other body part leaks from an adjacent frame;
7. generate review animation previews only from the normalized safe strip when normalization was required;
8. do not hand the asset to Work or integrate it into the repo until the no-bleed check passes.

Normalization is an asset-preparation step, not a redesign. It must not invent new poses, change character identity, alter gameplay coordinates/speed/geometry, or reorder approved frames.

## 2B. Character-first temporary completion order
For Chapter1 playable-character production, finish one character through its current base-presentation lifecycle before starting the next unfinished roster character.

A character is only **temporarily complete** when all three stages below are player-verified:
1. **identity/static presentation** — Concept → portraitSquare → collectionArt → Battle Simplification → static battleIdle → Static Runtime Readability;
2. **locomotion** — creature-appropriate move animation authored from the approved battle identity, runtime-safe normalized when needed, integrated, deployed, and player-verified;
3. **death / KO** — approved static death/KO image, integrated through the shared battleKo path, deployed, and player-verified.

Only after stages 1–3 are closed may production advance to the next unfinished roster character, unless the player explicitly reorders the sequence.

This temporary-completion rule does **not** require Basic / Heavy / Special / Awakening action animation, Hit reaction, or VFX. Those remain later shared gates unless separately authorized.

## 3. Mandatory zero-context bootstrap
A new Chat / Work / Codex session must be able to continue without the player reconstructing the previous conversation.

Before substantial work:
1. inspect/sync latest remote `main`;
2. read this `AGENTS.md`;
3. read `docs/DEVELOPMENT_PLAYBOOK.md`;
4. read `docs/PROJECT_BOUNDARIES.md`;
5. read the **CURRENT HANDOFF POINTER** at the top of `WORK_PROGRESS.md`;
6. read `docs/STATE.md`;
7. read only the system specs relevant to the next action;
8. inspect any recorded active feature branch / PR / safe checkpoint;
9. continue from the first unfinished item only.

Do not ask the player to restate prior decisions unless canonical repo documents are genuinely missing or contradictory.
If `docs/STATE.md` names an accepted/player-verified baseline document, that baseline is a mandatory relevant spec for recovery and supersedes older historical handoff entries for the same presentation/scope. Do not regress to an earlier provisional version merely because it appears later in a long history section.

## 4. Recovery: never redo completed work
After interruption or when starting a new Work:
1. check whether the recorded feature branch exists remotely;
2. inspect branch / HEAD / status / diff;
3. recover the latest safe checkpoint;
4. reuse recorded PASS evidence unless a later change can materially invalidate it;
5. continue from the first unfinished item only.

Do not reimplement committed/pushed work merely because the session is new.

## 5. Safe push checkpoints are mandatory
For multi-step or long-running work, do not keep substantial completed work only in a local workspace.

Create `commit + push` checkpoints when applicable:
1. design/spec or preflight completed;
2. deterministic/core implementation completed;
3. major integration slice completed;
4. before long browser/runtime smoke;
5. whenever session/token/environment interruption risk increases.

A checkpoint is recoverability evidence, **not** a completion/PASS claim.

## 6. Session/token exhaustion procedure
If a Work/Codex session may end before completion:
- stop starting new scope;
- preserve the coherent current state;
- update `WORK_PROGRESS.md` with:
  - active branch;
  - latest safe checkpoint SHA;
  - completed work;
  - remaining work;
  - tests/checks actually run and results;
  - known failures/root cause;
  - exact next step;
- commit/push that state before stopping whenever the environment permits.

If push is impossible, explicitly report that work may exist only locally. Recovery must locate and push it before new development continues.

## 7. Progress documentation is mandatory
`WORK_PROGRESS.md` is the compact project handoff record.
`docs/STATE.md` is the canonical milestone/scope state.

After every meaningful implementation slice, update them before handing off.

At minimum record:
- current milestone;
- current branch / PR;
- completed items;
- locked decisions affected;
- pending items;
- actual verification results;
- known blockers/defects;
- exact next action.

A stale progress/state file is a handoff defect.

## 8. Decision hierarchy
1. Latest explicit user decision.
2. Accepted ADRs / locked decisions in `docs/decisions/`.
3. Current canonical system specs under `docs/`.
4. Existing implementation.

If implementation conflicts with a higher-priority source, stop and report the conflict instead of inventing a new rule.

## 9. Scope discipline
Current milestone is defined in `docs/STATE.md`.

For M0, do not add campaign UI, progression, shards, Tier upgrades, story content, or a large roster unless `docs/STATE.md` explicitly moves the milestone forward.

Avoid unrelated refactors during feature work.

## 10. Engineering architecture rules
- This is a new game architecture; do **not** port tower-defense gameplay assumptions or code.
- `docs/PROJECT_BOUNDARIES.md` is mandatory and defines the contamination firewall.
- Keep systems modular: Character, Controller, Ability, Targeting, Movement, Status, Camera, Team, Battle.
- Player input overrides AI immediately.
- When valid manual combat input is released, full AI control resumes immediately (0s), per the accepted M0/M2 baseline.
- Selected character, camera target, and skill HUD remain unchanged during that handoff.
- No AUTO/MANUAL indicator is shown.
- Basic attack is automatic and has no dedicated player button in v1.
- Prefer data-driven character/ability definitions over hard-coded per-character logic.
- AI and player input must feed the same shared character/ability systems; do not create duplicated manual/AI combat engines.
- Add machine-checkable tests for deterministic rules where practical.

## 11. Verification vs player-owned smoke
Keep engineering verification and player acceptance separate.

**Player smoke is the default for checks the player can efficiently perform on the real device/build**, especially:
- game feel / fun;
- touch-control feel;
- camera comfort;
- visual readability;
- animation/VFX clarity;
- balance feel;
- device-specific layout;
- short end-to-end play confirmation after a localized change.

Work should not spend session/token budget duplicating player-owned smoke unless:
- the user explicitly asks Work to do it;
- an automated/browser check is required to diagnose a defect;
- release cannot be considered technically safe without that runtime evidence.

When player smoke is appropriate, Work/Chat should deploy or provide a testable build and give the player a **small targeted checklist for the changed scope**, not ask them to replay unrelated content.

Use precise status labels:
- **ENGINEERING PASS**: all required engineering checks owned by the executor passed.
- **ENGINEERING PASS / PLAYER SMOKE PENDING**: engineering checks pass and only targeted player/device acceptance remains.
- **PASS / PLAYER VERIFIED**: the required player smoke was actually confirmed.
- **FAIL / INCOMPLETE**: a required engineering check failed or required executor-owned verification could not be completed.
- **RELEASE BLOCKED**: engineering passed but merge/deploy cannot be completed due to a concrete blocker.

Never claim player-verified visual/gameplay success before the player actually confirms it.

## 12. Risk-based verification: test only what the change can break
Verification scope must be proportional to change impact. **Do not automatically run the entire test suite or full game flow for every small edit.**

Use the smallest sufficient layer:
- **Level A — static / local check**: documentation, isolated data, naming, or a trivially bounded helper with no shared runtime effect.
- **Level B — targeted tests**: default for small/local code changes. Run tests covering the touched module plus directly affected contracts.
- **Level C — impacted regression**: use when a shared subsystem changes. Test the affected dependency surface, not unrelated gameplay.
- **Level D — full regression / broad runtime smoke**: reserve for changes to shared architecture, battle lifecycle, persistence/progression, build/release infrastructure, dependency upgrades, large refactors, or when narrower evidence cannot establish safety.

Rules:
- A previously recorded PASS remains reusable evidence when later changes cannot materially affect that verified scope.
- Do not rerun a full suite merely because the session restarted.
- Do not replay the whole game when only one bounded mechanic changed.
- If a targeted test fails in a way suggesting wider coupling, escalate the verification scope.
- Before final release, use the minimum release checks appropriate to the actual changed surface; a full regression is not ceremonial.

For M0, the eventual complete prototype release must have evidence for:
- 3v3 battle completion without player input;
- manual override and immediate 0s AI-resume;
- KO/team switching/victory-defeat;
- type-counter correctness;
- stable landscape runtime for the integrated combat surface.
This does **not** mean every intermediate edit must rerun all of them.

## 13A. Current branch / merge policy
- The current project is intentionally continuing on the recorded long-lived feature branch / PR while milestone work remains in progress.
- Recover and continue the branch/PR named in the CURRENT HANDOFF POINTER.
- Do **not** merge to `main` merely because a new Work session starts.
- Merge to `main` only when the current handoff explicitly authorizes it or the player approves milestone consolidation/release.
- Feature-branch Pages/public verification may continue when that is the recorded release path.

## 13. Default delivery flow
Unless the user explicitly requests feature-branch-only / no-merge / no-deploy:
1. implement on a safe feature branch;
2. create safe pushed checkpoints;
3. run required targeted/regression checks;
4. perform whole-branch review;
5. merge verified work to `main`;
6. deploy/release if the project has a configured public build pipeline;
7. verify the deployed build for the changed scope;
8. update `docs/STATE.md` and `WORK_PROGRESS.md` with release state and next action.

If the project does not yet have deployment configured, record that fact; do not invent a release claim.

## 14. Change traceability
For non-trivial changes identify:
- requirement/decision affected;
- files/systems changed;
- tests added/updated;
- known risks.

## 15. Art / asset rules
- **Player VFX size/readability escalation (2026-10-17):** read `docs/M5C_ART_ANIMATION_VFX.md` section "Large, unmistakable cast and impact VFX". Basic < Heavy < Special < Awakening must be immediately distinguishable in actual phone-scale effect footprint and impact emphasis, without enlarging the character or changing hit geometry. P1 Heavy corrected source33a0f21 is player-verified on2026-10-17; preserve this baseline. Next P1 Special must satisfy the same escalation/readability gates. Engineering PASS alone is never player effect-size acceptance.
- **Action art / VFX / GIF review workflow:** read `docs/CHARACTER_ACTION_ART_WORKFLOW.md` before authoring an attack animation. The player approved its staged process: F3 identity/weapon/pose review → four poses → independent VFX + composite GIF approval → explicitly scoped runtime integration/deploy → iPhone acceptance. Do not skip approval gates or promote candidate/process approval into asset approval. P1 engineering/deployment and the player's positive attack-visual feedback are recorded in that workflow and docs/verification/M5C_B_LUSHU_BASIC_RUNTIME.md; unreported device checks stay pending. Successors must read its reproducible case-study/recovery index and never reopen completed gates from historical pending text; preserve exact accepted pixels during deterministic packaging, not regeneration.
- Mobile readability over fine detail.
- **Roster-wide visual rendering language is locked.** All current and future playable-character formal art must stay within the accepted simplified 2D cel-shaded language: clean readable shape separation, controlled linework, flat/stepped shading, strong silhouette, limited micro-detail, and mobile-first readability. Do not switch a new character to photorealism, painterly/thick-rendered illustration, 3D-rendered/game-model aesthetics, watercolor, sketch-only linework, or another incompatible rendering system unless the player explicitly authorizes a project-wide art-direction change. Consistency applies across portraitSquare, collectionArt, battleIdle and later battle-state assets; detail density may differ by surface, but the rendering language must remain recognizably the same roster.
- **Default playable-character body plan is humanoid / anthropomorphic**, not a literal quadruped or natural-animal body. This is a production hard rule so locomotion, hit/KO/cast states, shared animation hooks, equipment handling, mirroring, and future character integration remain consistent.
- Preserve each Shanhaijing creature's defining identity through creature traits layered onto the humanoid silhouette: head/face treatment, horns/antlers, ears, tails, wings, fur/feather/scale patterns, skin coloration, markings, claws/hooves, appendages, or other canonical traits.
- **Humanoid body plan does not mean a shared human face template.** Default playable heads/faces should use a **species-derived mythic anthropomorphic face**: begin from the creature's species/skull/muzzle/eye/ear/jaw structure, then stylize it for expression and character acting. Avoid a roster of human faces differentiated only by ears, horns, hair or color.
- For repeated species families (for example multiple snake-, bovine-, boar-, deer/horse-, bird-, fox/canine-derived characters), add a second layer of **creature-specific facial morphology**: vary skull proportion, muzzle length/width, brow/eye placement, ear shape, horn topology, jaw, tusks/fangs, scales/markings and special organs so characters remain distinct even before costume/color.
- Facial anthropomorphism should preserve expressive acting for idle/hit/KO/cast/portrait use without collapsing the design back to a normal human face or a fully naturalistic animal head. Body-plan consistency and head/face morphology diversity are separate production rules.
- Clothing, armor, props, tools and weapons are **not restricted to the classical text**. They may be invented to communicate gameplay identity, Type, Role and ability language, as long as the creature remains recognizable.
- Visual gameplay language should reinforce mechanics where useful. Examples are non-exclusive: Blast characters may use explosive/energy-projecting devices or volatile motifs; Speed characters may use light gear, streamlined weapons or mobility-focused accessories; Power characters may use heavier weapons/gauntlets/armor or mass/impact motifs; flying characters may use wings, aerial gear or light silhouettes. Do not force every character into the same prop template.
- Prefer a shared humanoid action-animation vocabulary across the roster: locomotion, hit, KO, cast/attack anticipation and recovery should be reusable in structure even when the creature-specific motion differs. Current idle presentation is intentionally static; do not add breathing/idle loops unless the player explicitly reopens that gate.

- **Locomotion animation must match the creature/body fantasy while reusing shared runtime contracts.** Do not move formal characters as static images sliding across the arena once their locomotion gate is opened. Grounded humanoids use visible leg/foot steps plus coordinated arm/torso follow-through; winged/aerial characters use flight animation such as wing beats/glide/body pitch rather than fake walking; aquatic/fish-derived anthropomorphic characters may use a documented hover/float locomotion archetype with the body suspended above the ground, using fins/tail/clothing/body-wave follow-through instead of footfalls. Other future locomotion families may be added only as reusable data-driven archetypes. Movement animation must not change combat movement speed, collision, targeting, telegraph geometry or authoritative actor coordinates.
- **Action animation and VFX are paired presentation layers.** When a Basic/Heavy/Special/Awakening visual gate opens, author the short attack/cast body motion and the corresponding VFX timing together so anticipation, release/impact and recovery read as one move. VFX never changes gameplay hit geometry/timing by itself, and action animation never owns combat logic.
- Do not let decorative equipment obscure the creature-defining traits or the mobile combat silhouette.
- **Concept-detail and battle-detail are separate tiers.** Portrait / Collection / concept art may carry richer costume, material and ornament detail. Battle sprites must be deliberately simplified for mobile readability rather than downscaled copies of the concept sheet.
- **Character art production uses mandatory gated stages.** For every current/future playable character: Concept approval → Battle Simplification → Static Asset Pack (`portraitSquare`, `collectionArt`, static `battleIdle`) → Static Runtime Readability PASS → roster/batch comparison → later battle-action micro-animation (`battleCast` / attack action, and reaction states when authorized) + corresponding Skill VFX. **Idle breathing animation is currently removed from the production plan.** Do not author or integrate breathing/idle loops unless the player explicitly reopens that gate.
- **Generate only the asset owned by the current gate.** During character art authoring, do not generate composite/multi-panel sheets that include future-gate assets (for example Idle frames while only static `battleIdle` is authorized). Each gate produces/reviews one explicitly requested asset at a time from the latest approved character reference. Preview boards may be used only when the gate itself explicitly requests a board; otherwise they are invalid for production acceptance.
- **Approved character identity is the sole visual source for downstream assets.** Once concept/battle-simplification identity is approved, later `portraitSquare`, `collectionArt`, `battleIdle`, animation and VFX derivatives must preserve that approved face/species morphology, silhouette, palette family and equipment identity. Do not re-randomize/redesign the character between gates.
- **Static readability must stand on its own.** Animation, glow, trails, VFX, or constant secondary motion must never be used to rescue an unreadable static silhouette. If a static battle asset is unclear, simplify shapes, strengthen value/color separation, improve negative space, or reduce detail first.
- **Do not solve battle readability by progressively enlarging characters.** Keep the accepted shared presentation scale/layout unless a verified global layout change is required. Fix unreadable art through silhouette, color/value contrast, line/detail reduction, and composition before considering scale changes.
- Every playable character, present and future, must pass a **battle-readability simplification gate** before production battle assets are locked. At intended runtime size, identity must remain readable from large shapes first: body silhouette, head/species shape, major appendage(s), primary color blocks, one or two defining markings/props. Fine seams, small jewelry, tiny straps, dense hair/fur strokes and micro-ornament cannot carry identity-critical information.
- Battle detail budget is reusable across the roster: prefer few large color blocks, few broad markings, compact equipment, limited trailing elements, separated limbs/appendages and a clean outer contour. If downscaling causes head/weapon/tail/limbs to merge into one visual mass, simplify before integration.
- Each character must define an **identity priority hierarchy** for battle art. Lower-priority details are removed before higher-priority creature/role cues. This rule applies to Chapter1 and all future characters/archetypes.
- Prototype assets may be placeholders.
- **Placeholder retirement is asset-driven and roster-wide.** Prototype labels/cards/circles/rings/debug identifiers may be used only while the corresponding formal asset is unavailable.
- Once a formal asset resolves successfully for a surface/state, that formal asset must replace the placeholder on that surface; do not stack formal art with temporary SLOT/E1/E2 FRONT/A1/E1/name/debug labels, graybox body dots/rings, or equivalent development scaffolding unless that label is part of the final approved UI.
- This applies equally to allies/enemies and to every current/future character through shared asset/presentation logic; never implement character-ID-specific exceptions.
- Placeholder-only characters must still retain the fallback until their formal asset exists.
- **Battle HUD portrait facing is side-relative and roster-wide.** Ally-side portrait/card art uses the canonical portrait orientation; enemy-side portrait/card art is its horizontal mirror so opposing HUD cards face inward relative to each other. Implement by HUD side/presentation state, never by character ID. This applies to all current and future characters and does not replace the separate in-arena dynamic facing rule.
- **Portrait-card framing is face-first and roster-wide.** Wherever a square character portrait/card is used (battle HUD, Team Select lower roster, Collection grid, and future equivalent compact cards), frame primarily the head/face plus a small amount of neck/upper shoulder so identity is immediate. The face should occupy most of the square. Minor cropping of ears, horns, hair, ornaments or other peripheral appendages is acceptable when necessary, but eyes/muzzle/primary facial structure must remain clearly readable. Do not show a small full bust inside the square merely to preserve every accessory. Character Detail/full-body identity art is a separate surface and is not forced into this crop.
- **Approved Team Select full-body identity art is protected presentation and currently static.** The upper Team Select / matchup full-body preview must continue to use the approved `collectionArt` identity image with no breathing/idle transform. Do not substitute a battle sprite sheet, battleIdle frame, or lower-resolution battle asset. Arena idle is also currently static on the approved F1 presentation; later action-state animation (for example cast/attack) may temporarily replace that static idle only when its gate is explicitly authorized.
- **In-arena actor HP bars are roster-wide combat UI.** Every living battlefield actor carries an overhead HP bar positioned above the visible actor silhouette: ally bars use a blue gradient; enemy bars use a red gradient. The ratio must be derived from the same live actor HP/maxHP state used by the side HUD cards so the overhead bar and card can never disagree. This is presentation-only and must not create a second HP state or alter combat math. KO actors may hide the overhead bar.
- **Stage Select layout is data-driven and stage-wide.** Every current and future stage uses the accepted shared layout: text-free large preview image; right information stack ordered as chapter title → stage id/title → reward rows; chapter/stage labels larger than reward text; BACK lower-left; START lower-right; stage cards below; no new outer vertical scroll. Never special-case Stage 1-1 or a specific chapter for presentation.
- Do not produce final roster art before the combat prototype passes.
- Approved production art must not be regenerated/restyled merely because a new session begins.
- **Master/source assets and runtime assets are separate.** High-resolution PNGs may be retained as editable/archive masters, but gameplay must consume optimized runtime derivatives sized to the actual display footprint. Do not ship generated high-resolution source art directly when a smaller lossless/visually equivalent runtime asset is sufficient.
- Runtime optimization must preserve animation contracts: frames in one loop keep a common canvas geometry/origin unless the animation system explicitly supports stable per-frame pivots. Do not independently tight-crop frames if that creates anchor drift.
- Before integrating a new character animation, record source dimensions, runtime dimensions, encoded file size when practical, decoded texture footprint, frame count, and whether lazy/on-demand loading remains within the existing M5C-A cache/guard budgets. Optimize for mobile load time and memory without sacrificing the accepted small-scale readability.

## 16. Work handoff contract
Every Work handoff must be deliberately small.

Before creating a Work task, Chat should state internally/record in the handoff:
1. what Chat already completed;
2. the exact capability gap that requires Work;
3. the smallest implementation delta Work owns;
4. the minimum sufficient engineering checks;
5. which acceptance checks are delegated to the player;
6. where Work must checkpoint if interrupted.

A Work task must not contain broad phrases such as "fully test everything" or "recheck the whole game" unless the actual change impact justifies that scope.
A Work handoff must also be concise and execution-focused. Do not repeat long background already recoverable from GitHub, do not provide both a long and short version, and do not ask the player whether they want a shorter prompt. Give one compact, precise prompt containing only the unresolved Work-owned delta, exact constraints, minimum checks, and stop condition.

**Player-copyability is a hard requirement.** When Chat provides a Work prompt to the player, present exactly one final handoff prompt in a single copyable code block (or equivalent single-copy UI block) so the player can copy it in one action. Do not split the executable instructions across prose plus multiple prompt blocks. Supporting explanation may appear outside the block, but the block itself must be complete and self-sufficient. If a ZIP/package contains the canonical handoff file, prefer telling the player to attach that package and provide one short copyable launch instruction rather than duplicating a second long prompt.

## 17. Interruption protection / recoverability
For any substantial Work task:
- create the feature branch or recover the existing one before new implementation;
- push an early coherent checkpoint instead of waiting for final completion;
- checkpoint again before long browser/runtime steps;
- if session/token capacity becomes uncertain, stop adding scope and push immediately;
- update `WORK_PROGRESS.md` with latest remote SHA, completed work, remaining work, actual verification evidence, known failures, and the single next exact step;
- on the next session, recovery of the existing remote checkpoint happens before any reimplementation.

If push fails or the environment dies before push, the next session must first search the existing workspace/reflog/local branch for recoverable work and push it. Never silently start over.

## Self-contained ZIP handoff contract (player-approved 2026-10-14)
For asset/file handoffs from Chat to Work, Chat MUST prepare one self-contained ZIP including every required approved asset, necessary supporting files, checksums/manifest, and **START_HERE.md + WORK_HANDOFF.md** with complete bounded execution instructions (GitHub zero-context recovery, protected baselines, exact executable delta, tests, release/stop gate and player verification). Work must not need the player to paste a second lengthy prompt or manually assemble files. A new successor Chat must check this rule before every handoff. Do not put outdated or competing prompts in the package.
When a Work environment actually opens the attachment, it should extract the ZIP and read START_HERE.md then WORK_HANDOFF.md, then refresh GitHub and execute the authorized task. **Attaching ZIP alone does not guarantee that a new Work session starts or reads it automatically**; this depends on the product workflow. If the environment requires an initial instruction, provide ONE minimal copyable code block: "解壓縮附件 ZIP，先讀 START_HERE.md 與 WORK_HANDOFF.md，依最新 GitHub 硬規則執行；完成後停止。" Never claim zero-click autonomous execution without verification. No unattended background work unless the platform explicitly supports it.

## Approved multi-frame normalization — required pre-GIF process (player verified 2026-10-14)
When a player approves four poses as the art source, preserve that exact image and do not regenerate it merely to repair layout. A visually good four-pose collage is NOT automatically a sprite strip. Never create GIFs from naïve equal-width slices. **Chat owns the full safe preparation whenever available**: (1) identify each independent entire silhouette and its source bounds, separating any neighboring components/pixels; (2) remove background or fringe only by a color-faithful process that never deletes character colors; (3) individually extract the four frames, preserving fists, claws, tail, accessories and outline; (4) normalize into exactly four equal-sized transparent RGBA cells with generously clear horizontal/vertical safety padding; (5) align a common grounded baseline while keeping each full actor inside cell bounds; (6) inspect per-cell nonzero-alpha bbox, compare on light/dark backgrounds and ensure no neighboring-frame bleed/clipping/discolored fringe; (7) only then derive an animated GIF preview from the normalized cells, and obtain explicit player approval before Work integration. Runtime must animate `battleMove` only while moving, return to previously approved single-frame `battleIdle` when stopped, use the existing mirror contract, and preserve gameplay/stat/collision coordinates. Do not mistake alpha mode or even a successful crop for visual/no-bleed proof. Record exact approved source, normalized derivative hashes/cell geometry and PASS boundaries in progress/state. A Chat→Work package must include approved source, four separated PNGs, normalized strip, review GIF, manifest/checksums and complete START_HERE/WORK_HANDOFF; Work gets only integration/tests/deploy and phone-smoke handoff.
