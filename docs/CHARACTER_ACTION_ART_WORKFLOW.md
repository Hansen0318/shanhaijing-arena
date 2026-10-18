# Character action art, VFX and animation review workflow

## 2026-10-18 — P2 猼訑 Basic F3 CANDIDATE / PLAYER REVIEW PENDING

Recovery fetched feature `39f7d2b50202c93798ef7d3cf38a57ee8388fcaa`, clean branch `feat/m0-combat-core-20260927`, PR #1 open/unmerged; checkpoint is the containing feature commit (resolve remote ref again). **P1 COMPLETE BY EXISTING ACCEPTANCE EVIDENCE; ordinary Hit CANCELLED / NOT REQUIRED.** Preserve all P1 approvals; no repeat tests/deploy/device sign-off. P2 Concept/portrait/collection/static Idle/static runtime/Move/KO accepted; static Idle only. No prior approved P2 action/VFX/GIF found; runtime has no P2 actionDescriptors.

**Current first unfinished gate: Basic「角擊」ONE F3 player art review.** Built-in imagegen candidate from approved identity/Idle/Move: `docs/art/candidates/botuo/basic/key-pose-v1/F3-contact-master.png`, SHA256 `19a8e9f8cf74c870558a4ea734b67e03d5eacce71072c5bc979931cf00f42f36`. Prompt, PNG/alpha/hash verification, opaque light/dark QA preserved beside source; low-alpha noise reported, no source cleanup claimed. **ART CANDIDATE, NOT PLAYER ART APPROVED / NOT INTEGRATED / NOT DEPLOYED.** No F1/F2/F4, new VFX or GIF yet.

Contract, base acceptance inventory, four-skill proposed motion differentiation and timing caveat: `docs/M5C_P2_BOTUO_BASIC_ACTION.md`. Basic T0 is single-target coefficient1.00/range1.4/windup0/no displacement; no P1 windup copied or HP delay. Existing Tier effects/control protected. Chat owns art/review preparation; Work runtime remains blocked until explicit pose/GIF and any material timing approvals. **STOP for player F3 review**, not Heavy/P3. Full self-contained successor: `docs/handoffs/P2_BOTUO_BASIC_NEXT_CHAT.md`. Existing accepted deployment remains8e2f5e0; no suite/build/Pages/public verification rerun. Candidate/docs-only checkpoint uses `[skip ci]`; no main merge, no protected source/public/receipt changes.

## 2026-10-18 — PLAYER DECISION: cancel ordinary Hit Reaction, preserve uninterrupted abilities

Player explicitly rejects ordinary on-hit pose/animation: being damaged must **not** switch into a hurt/recoil stance or interrupt an ongoing attack/cast/movement. Concurrent hit recoil and offensive VFX clutter combat readability. **Cancel the entire P1 ordinary Hit Reaction production/review/GIF/integration/deploy gate**, and remove it from mandatory P1 completion criteria. Do not create equivalent per-character ordinary Hit animation for P2–P5 by default. This supersedes older “Hit next” handoffs/proposals, including KO>Cast>Hit>Move>Idle and two-100ms poses; those are HISTORY / REJECTED, not pending tasks.

Work-generated candidate `docs/art/candidates/lushu/hit/key-pose-v1/` is **ABANDONED / REJECTED BY SCOPE**, never player-approved; **do not promote, render additional poses, QA/GIF, integrate, or deploy**. Preserve existing immutable evidence/history if necessary rather than silently deleting it, but mark obsolete in documentation. If Work is still running a Hit task, stop that task and do not merge/use its products. Do not roll back or touch player-approved Basic/Heavy/Special/Awakening and their runtime/receipts. This is a **design and scope change only**, not an implementation claim.

At actual damage, preserve authoritative HP subtraction, damage/critical numbers, skill/contact VFX, normal attack/cast/movement animation uninterrupted; lethal damage still transitions to existing KO/death behavior. No stun, knockback, interruption or invulnerability is added by damage alone. Distinguish explicit ability-defined crowd-control, if any, from removed **generic hurt pose**: do not silently remove approved mechanics.

**NEXT:** skip ordinary Hit and perform **P1 whole-character closure audit** using existing accepted evidence (not re-run Awakening or all earlier player gates). Read current roadmap/acceptance matrices to inventory any remaining non-Hit obligations (including existing KO/Idle/Move status) and run only missing checks if needed; ask player for *one scoped final P1 sign-off* only if genuine acceptance requirement remains. After explicit P1 complete, follow character-first roadmap to P2 猼訑, starting with repository-approved identity/first missing art gate. No main merge; no shanhaijing-td gameplay. Keep Chat-first, minimal Work, generic data-driven architecture. New Chat/Work handoffs must be single self-contained copyable code blocks. This entry overrides conflicting old pointers, not historical receipts.


## 2026-10-18 — current authorized Hit reaction slice

P1 Hit now has one unapproved key-pose candidate, not an attack F3 or four-frame sequence. Read `docs/M5C_P1_LUSHU_HIT_REACTION.md` and its key-pose manifest. Latest player task explicitly requires Hit-specific design/key pose → required poses/safe preparation → GIF → approval → scoped integration/release → player acceptance. Do not copy attack timings/frame count or generate remaining poses before key-pose acceptance. This scoped clarification preserves every earlier accepted attack and its sources; no new permanent rule/AGENTS edit is needed.

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


## 2026-10-18 — v3 browser-safe GIF correction / PLAYER REVIEW PENDING

Player reported normal GIF slower than comparison and requested corrected review files. Decoded v2 normal has twelve10ms holds; GIF players may clamp these to100ms, stretching1920ms to3000ms. Previous checks verified encoded time only, not player wall-clock playback. V2 is retained as historical evidence and superseded for speed review.

V3 `docs/art/candidates/lushu/awakening/composite-review-v3/` derives only from decoded immutable v1/v2 GIFs. Every decoded hold is >=20ms; normal and comparison share exact sample times, both directions,350ms Idle holds and1920ms total. Slow is5760ms. Discrete20/30ms sampling retains80→110ms first rush and exact110/260/420 contact samples; recovery610ms is a candidate contract only. No new poses, source-art/VFX changes, approved actual-timing changes, runtime/deploy or engineering/phone PASS. Browser-safe timing checks do not claim wall-clock measurement on the player's device.

Reproduce/verify: `python scripts/repairLushuAwakeningGifTiming.py`; output `verification.json` records every decoded hold, source hashes and total duration. Permanent review rule: verify decoded minimum frame hold >=20ms and use matching sampling, direction count and Idle holds between speed-review GIFs. File duration alone is insufficient evidence of playback speed. NEXT: player reviews corrected normal/slow/comparison and explicitly accepts VFX/GIF and exact candidate timing before runtime. No P2/main merge; art-only checkpoint [skip ci].


## 2026-10-18 — faster first-rush v2 preview ready, player review pending

Requested revision recorded first at e46d29c. V2 retains80ms anticipation, compresses first travel70→30ms; the remaining original timeline is advanced40ms without changing its phase durations. **Candidate** contact110/260/420ms,recovery610ms; original real-design150/300/460ms,total650ms is NOT silently superseded. These exact new numbers need separate player acceptance before real gameplay changes. Coeff0.40/0.70/1.10,total2.20,CD12 unchanged; no extra hits.

Review assets: `docs/art/candidates/lushu/awakening/composite-review-v2/` normal/3x-slow/character-only/VFX-only/whiff GIFs, before-after first rush comparison, source/padding/event metadata and decoded contact proof. Reproduce `python scripts/prepareLushuAwakeningComposite.py --fast-opening`; verify `python scripts/verifyLushuAwakeningReview.py --fast-opening`. V1 GIFs, approved pose sources, normalized pose cells and VFX source records remain unchanged. Six corresponding decoded contact crops have mean absolute RGB error<0.10/255 (quantization only); later contact intervals150/160ms preserved. All5 v2 GIF hashes/decode/frame count/total duration checked; visible bounds/approved-source protection PASS. Before-after export list-duration TypeError was fixed, rerun passed; no source/runtime change.

**POSES PLAYER APPROVED / SPEED-V2 + VFX/GIF CANDIDATE / PLAYER REVIEW PENDING.** Normal total1920ms and slow5760ms include both directions and350ms Idle hold each. These are illustrative scripted previews, not combat/HP/physical collision tests. No runtime implementation/ENGINEERING PASS/deploy/phone acceptance. NEXT player reviews first-rush speed and VFX/GIF; no new runtime task until acceptance and exact timing contract decision. Preserve Basic/Heavy/Special; no P2/main merge; commit [skip ci].


## 2026-10-18 — first-rush speed revision requested; prior GIF not accepted

Player2026-10-18T09:12:07+08:00: 「進度流程規則先紀錄到github相關資料文件，第一段要改更快」. Record35971db assets/provenance/checks before revision. **Five character poses remain PLAYER APPROVED; VFX/GIF remain CANDIDATE / PLAYER REVIEW PENDING.** This revision request is not acceptance of the prior GIF or permission to integrate/deploy.

Create a versioned PREVIEW candidate only: retain80ms anticipation, shorten first visible rush80–150ms (70ms) to80–110ms (30ms). After first contact advance the remaining timeline40ms, preserving all later segment/impact/recovery durations: contact110/260/420ms, recovery610ms. No inserted pause or slower second segment. These exact new numbers are executor-selected candidates, NOT player-approved replacement combat timing. Prior real design150/300/460ms,total650ms remains recorded until separate exact contract acceptance; current runtime remains unimplemented old behavior. Keep coeff0.40/0.70/1.10,total2.20,CD12 and independent collision semantics.

Preserve v1 GIFs/approved art/VFX source bytes; no image regeneration or changed character scale, path, effect shapes/sizes or damage. Publish v2 normal/slow and before-after speed comparison, record hashes/timeline/actual GIF checks and wait for player review. Timing-only requests must not be promoted into unseen asset/GIF/runtime approval. No P2/main merge/deploy; checkpoint [skip ci].


## 2026-10-18 — Awakening independent VFX and composite GIF review ready

All five character poses are PLAYER APPROVED (receipt at a353773; `docs/art/approved/lushu/awakening/phase-poses-v1/acceptance.json`). Exact approved sources remain immutable. New review-only assets: `docs/art/candidates/lushu/awakening/vfx-review-v1/` (three distinct source/impact pairs; C first clipped candidate retained separately and replaced) and `composite-review-v1/` (normal,3x slow, character-only,VFX-only,whiff GIFs, each with both directions and approved Idle return). Reproduce with `python scripts/prepareLushuAwakeningComposite.py`; verify with `python scripts/verifyLushuAwakeningReview.py`.

**POSES PLAYER APPROVED / VFX + GIF CANDIDATE / PLAYER REVIEW PENDING.** Full-canvas uniform-XY skull-density normalization, common pelvis/ground family, exact resized source insertion,16px cell margins; independent VFX split-rejoin and source contour checks;5 GIF hashes/decode/frame-count/total duration checks PASS. Actual GIF contact proof150/300/460ms and mirrored1150/1300/1460ms inspected. Effects size uses significant-alpha content, preserving full original asset, with source caps350/400/450 and impact caps180/270/400. Original low-alpha noise retained, no cleanup claim. One truncated B impact derivative was detected, deterministically re-extracted and decoded, then atomic exact-byte writes checked; no damaged derivative accepted.

**PREVIEW ONLY:** scripted route/contacts, no combat simulation/HP/damage implementation. Runtime still old0/+120/+240ms equal split/no triple dash; no ENGINEERING PASS/deploy/phone verification. NEXT: explicit player review of independent effects and normal/slow composite GIFs; only after acceptance proceed to separately bounded runtime preparation and geometry decisions. Keep real design150/300/460ms,650ms,coeff0.40/0.70/1.10,CD12; preserve Basic/Heavy/Special, no P2/main merge. Commit [skip ci] prevents automatic Pages deployment. Older pending pose text below is historical.


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



**2026-10-17T14:59+08:00 — P1 SPECIAL DEPLOYED / ENGINEERING PASS / PLAYER PHONE PENDING.** Source67c45ebb5e09fe0e70d3d271bc2c1b0322a50dc6 implements approved REAL320ms move+one hit+F3/target burst through shared pipeline, preserving T0 CD6 and existing Tier scaling. Approved F1–F4/GIF/VFX originals unchanged; source-preserving runtime PNGs and transparent-only P1 Move/KO crops fit16,775,432/16,777,216 bytes. Local828/828/build/guard PASS; independent final review no Critical/Important. Actions#1034/39011872100 build117335937679 and deploy117336027166 SUCCESS. Public16files exact-byte match: index-8JGZpf69.js / battleRuntime-Bb3b-o-u.js / index-DcqtNRF0.css plus action assets. Evidence: docs/verification/M5C_B_LUSHU_SPECIAL_RUNTIME.md and special/runtime-v1/PUBLIC_FINGERPRINT.json. Current closure is docs-only. NEXT only player phone review https://hansen0318.github.io/shanhaijing-arena/?v=67c45eb for left/right large distinct source sweep + real-target burst,320ms sync, empty swing, actor size and Idle/Basic return. No phone PASS, new skill/character or main merge. Earlier timing/implementation/deploy pending entries are historical.


**2026-10-17T14:45:48+08:00 — P1 SPECIAL REAL320ms APPROVED / IMPLEMENTATION IN PROGRESS.** Player「好，我確認， 繼續，並紀錄進度和流程 如果要整合到硬規則相關資料，就整合」accepts real320ms startup and existing feature deployment scope. Acceptance: `docs/art/approved/lushu/special/review-v2/acceptance.json`. Earlier timing/GIF pending gates below are historical, do not reopen. Shared pending-action pipeline now opts Special into320ms: reposition, one real hit, F3/contact and Tier post_cast effects resolve together; T0 CD6/.65 unchanged, existing Tier scaling retained. Deterministic approved-source80px cells plus separate source/target PNGs; P1 Move/KO only lose outer fully transparent rows with exact visible-pixel/ground transforms, originals retained. All-five required16,775,432/16,777,216 bytes; no cap increase. Independent review found left-facing noncentral action-origin drift; reproduced RED and fixed generically for authored actions, preserving established locomotion/KO policy. NEXT finish full checks/visual projection, feature CI/Pages/public fingerprint, then player phone review. No deployment or phone PASS claimed yet; no main merge.


## Special GIF acceptance and retained deployment authority — 2026-10-17

Player14:22:27 explicitly approved full Special composite GIF/VFX and continuing through deployment. Bind exact files and statement in `docs/art/approved/lushu/special/review-v2/acceptance.json`; accepted poses/FX/GIF are immutable and no duplicate review/publication approval is needed. The previous missing-source and preview-only gates are closed. Preserve review-v2 reproducible packaging, receipt, manifest, checksums and visual/timeline proof.

Apply the existing timing rule: the accepted320ms preview contact does not by itself specify real320ms simulation delay. Read-only8case campaign preflight confirms actual0ms Special and the existing generic pending-action path. Seek only the material real-timing choice; ordinary source-preserving implementation, testing and feature deployment are already authorized after that choice. Current residency needs an under16MiB solution before adding required assets. Exact measured evidence and concrete320ms contract: `docs/verification/M5C_B_LUSHU_SPECIAL_INTEGRATION_PREFLIGHT.md`. Never treat preflight or deployment authorization as completed gameplay/phone acceptance.

## Special exact-source recovery and reproducible composite — 2026-10-17

Player reattached the previously accepted F1–F4 after a missing-originals handoff gap. Exact originals and statement/hash binding: `docs/art/approved/lushu/special/recovered-inputs-v1/receipt.json`. F3 is byte-identical to the earlier accepted file. Preserve the source receipt and old gap as history; never recreate an accepted pose to fill missing storage. `scripts/prepareLushuSpecialComposite.py` packages the full canvases with one explicit skull-width density policy, common XY scale, shared support-foot baseline and generous cell padding; metadata records each source's measurement/scale rather than fitting a crouched silhouette to standing height. Original pixels/bytes are preserved in masters, derived cells downsample explicitly.

Four-pose character-only and independent-VFX normal/slow composite GIFs now exist under `docs/art/candidates/lushu/special/review-v2/`. They include normal/mirrored direction and original approved Idle return; full decode verifies held/coalesced GIF durations and pixel timeline. This is reproducible asset-preparation evidence, not player GIF acceptance or installed gameplay. The320ms preview contact does not authorize changing immediate0ms Special simulation. Current next gate is explicit composite/VFX review, then separately scoped timing/runtime work. No other-character/skill promotion or main merge.

## Phone-scale VFX enlargement acceptance — player clarification 2026-10-17

Canonical requirement: `docs/M5C_ART_ANIMATION_VFX.md` → "Large, unmistakable cast and impact VFX". Before closing a skill, compare outgoing light/sweep AND real-target impact separately against the preceding skill at the same actual phone display scale. Basic < Heavy < Special < Awakening must be immediately apparent in effect size and impact emphasis, with distinct skill-specific motion and VFX. Never enlarge the actor or damage geometry to meet this requirement. Preserve original art, mirror/grounding, finite budgets and true-hit-only contact. P1 Heavy corrected source33a0f21 is player-verified on2026-10-17 (M5C_B_LUSHU_HEAVY_PLAYER_ACCEPTANCE.json); earlier size/visibility rejections are historical and must not reopen accepted work. Special/Awakening authored visuals remain unfinished and must follow the existing review gates under this stronger rule.

## 可重用的完整製作歷程與接手索引 — 2026-10-16

P1 Basic 已完成工程驗證與部署，玩家回覆「這樣不錯」，肯定本次攻擊動畫／效果。本流程可作為後續角色的製作方法；不代表其他角色的形象、攻擊、美術或戰鬥時序自動獲准。KO／Pause／Restart 等未逐項回報項目維持待確認。下方舊日期的 pending／proposal 是歷史階段；當前狀態以最新 WORK_PROGRESS.md、STATE.md、驗證紀錄為準。

| 階段 | 本次正確做法／需保存的成果 | 唯一可追溯來源 |
| --- | --- | --- |
| 形象 Recovery | 只用核准 identity、battleIdle；先核對臉／角／體型／服裝／尾巴／小型武器 | public/assets/characters/lushu/identity.png、battleIdle-4f.png |
| 關鍵姿勢 | 先單獨完成 F3 命中姿勢並讓玩家審核，再逐張做 F1 蓄勢、F2 出手、F4 收勢；不靠一次四格自由生成鎖定形象 | docs/art/approved/lushu/basic/；候選與失敗歷史保留在 docs/art/candidates/lushu/basic/ |
| 特效分層 | 角色圖不烘焙刀光；blade sweep 在角色後、真實命中 contact spark 在前；保留效果原圖與生成提示詞 | approved/lushu/basic/review-v1/ 的 blade-sweep-raw-v1.png、contact-spark-raw-v1.png；候選同目錄有提示詞 |
| 安全包裝 | 接受後保留原 PNG；固定透明格、統一縮放與接地 family，逐格確認武器／角／尾巴完整及 alpha 邊界，不直接切四格拼貼 | docs/art/candidates/lushu/basic/review-v1/prepare_review.py、REVIEW_NOTES.md、review-manifest.json、SHA256SUMS.json |
| GIF 審核 | 先交正常／慢速、正向／鏡射與 Idle return 合成預覽；玩家核准後才進 runtime；GIF 只作審核材料 | docs/art/approved/lushu/basic/review-v1/acceptance.json 與 normal/slow GIF |
| 時序契約 | 先查真實 Basic 傷害時點；本次玩家選 B，明確授權實際 180ms 前搖。禁止只延遲 HP／傷害字製造同步，也不得將 P1 的數值直接套用別人 | docs/superpowers/specs/2026-10-15-shared-basic-windup-design.md、對應 plans/ 文件 |
| Runtime 素材 | 確認預算再製作核准來源的縮放衍生；P1 Idle 僅無損擷取原 F1，原 strip 不動；runtime 不使用 GIF | scripts/prepareLushuBasicAssets.py、approved/lushu/basic/review-v1/runtime-manifest.json、public/assets/characters/lushu/ 新4張 PNG |
| 共用整合 | BattleSession 發出 start/resolve/cancel；ActionPlayback 等真實 resolve 才播 F3；AssetPresenter 分開畫角色／刀光／命中。資料驅動，沒有引擎角色 ID 特例 | src/combat/battleSession.js、src/assets/actionPlayback.js、src/assets/descriptors.js、src/runtime/assetPresenter.js、src/roster/catalog.js |
| 工程驗證／發布 | 先測載入、預算、時序、落空／取消、KO、鏡射、reduced、Restart／切場，再 Build、CI、Pages 與公開逐檔比對；記錄來源 commit 與裝置驗收界線 | docs/verification/M5C_B_LUSHU_BASIC_RUNTIME.md、M5C_B_LUSHU_BASIC_PUBLIC_FINGERPRINT.json |

**關鍵教訓**：一次四格生成曾出現形象漂移、姿勢不清、武器／邊界問題；不把失敗候選當 reference。改用核准 GitHub identity＋已接受的單張 F3 作逐姿勢製作，先完成玩家審核，再用可重現腳本包裝。每次檢查實際寫出的 PNG 能完整解碼，原檔／hash／候選／核准／runtime 衍生分開保存。玩家不必重傳本專案已保存的四張圖才能接續。

**不能盲抄的 P1 數值**：120/60/100/120ms、180ms windup、128格尺寸、origin/scale、特效附著位置是本次核准資料，不是所有角色的固定模板。後續招式必須重新對應核准形象、武器與真實技能契約；一般流程與共用管線才是重用的部分。16MiB 安全上限與動態 residency 保留，不能為了新增圖片提高上限或忽略必要貼圖失敗。

**零上下文接手**：先最新 remote/branch/PR/HEAD → AGENTS/playbook/boundaries → WORK_PROGRESS/STATE → 本文件 → 當前招式的 approved 素材／acceptance／manifest → 實作設計與驗證證據。從第一個未完成 gate 接續，不根據下方歷史 pending 文字重開已完成任務。Chat 先完成可做的檢查、素材準備與規格，Work 只接剩餘 executable delta；若另開 Work 包，遵守已有 START_HERE.md＋WORK_HANDOFF.md＋核准素材／checksums 的完整 ZIP，以及單一可一鍵複製 handoff 規則。沒有新授權就停在當前驗收，不自行開始其他角色攻擊。


Final execution2026-10-15: ENGINEERING PASS / PLAYER IPHONE PENDING. Deployed source7e7ae7371bbcade8434fe4e3771ebb5c65eab7a3, targeted94/local+CI751/build/guard PASS, Actions#1004/38758231891 PagesSUCCESS,33public files exact-byte match. Evidence/rulings: docs/verification/M5C_B_LUSHU_BASIC_RUNTIME.md; fingerprints adjacent JSON. Plan/art/GIF/B gates resolved. STOP for iPhone, no new actions/VFX/main merge.

Status: **PLAYER-APPROVED PROCESS / FIRST P1 SLICE VALIDATION PENDING — 2026-10-15**.

The player explicitly approved this sequence after reviewing its explanation: key contact pose → four poses → composite GIF with independent effects → player approval → shared runtime integration/tests/deploy → iPhone acceptance. This approves the **process**, not any generated image, VFX design, runtime change or claim that the method is already production-proven. First implementation is P1 Lushu Basic only. Broader-character reuse follows successful validation or explicit player direction.

## 1. Recover before acting

Read current GitHub branch/PR/HEAD, AGENTS, DEVELOPMENT_PLAYBOOK, PROJECT_BOUNDARIES, CURRENT HANDOFF POINTER, docs/STATE, accepted character presentation and the relevant action spec/data. GitHub is authoritative; do not reconstruct identity from conversation. Keep feature branch feat/m0-combat-core-20260927 / PR#1; never merge main without explicit approval.

Identify exact approved art paths and hashes before editing. For current Lushu only identity sources are public/assets/characters/lushu/identity.png and battleIdle-4f.png. Prior rejected drafts are not identity references. A generated candidate is not automatically an approved reference.

## 2. Pose review gates

1. **F3 contact key pose first**: one complete transparent figure. Preserve approved head/face/antlers, body proportions, clothing/colors, markings, tail and the exact compact weapon/equipment. Articulate joints/torso/legs for a real grounded attack; do not substitute whole-sprite wobble. Inspect, show to player and **wait for explicit identity/weapon/pose acceptance** before extending to remaining poses.
2. **F1/F2/F4**: author individual complete poses from the approved identity and accepted F3 visual solution. F1 anticipation/load, F2 clearly intermediate strike, F3 contact/follow-through, F4 recovery/return. Check each against the same source; preserve scale and ground family. Show full four-pose sequence for player review. Do not classify four similar idle positions as attack animation.
3. Keep each candidate's revision/hash/status. Do not guarantee generated edits lock original pixels; actual segmentation/layered editing requires real layer extraction and occlusion/joint repair. If image identity is wrong, correct the affected pose before packing or VFX.

## 3. Character and VFX are separate assets

Author the character without baked-in slash light/particles. Blade arc/trail and contact flash/shards are separate transparent effects with independent origin/attachment, lifetime, scale and layers. The player requests visually elaborate effects; exact shape/color/strength still needs review. Effects must retain character/HUD/ally-enemy readability and reflect the actual weapon/ability.

Four character key poses do not force VFX to four frames. Add a needed character in-between only after preview evidence and art review, not by inventing interpolated anatomy. Reduced-motion behavior must be considered before integration. No new damage, extra hits, projectiles or attack range may be inferred from visual effects.

## 4. Deterministic packaging of accepted art

After pose acceptance, retain exact accepted source PNGs. Extract each entire silhouette, remove neighboring fragments or unintended background without erasing character colors, then place on equal transparent cells with one uniform scale policy and common anchor/ground family. Preserve weapon tips, antlers, tail, hands and feet. Inspect alpha, all cell bounds and light/dark backgrounds. Do not simply slice arbitrary four-up collages.

**Do not regenerate approved art to fix packing.** Use reproducible layout/crop/padding operations on the accepted pixels. This is packaging, not permission for new poses or character redesign. No frame may contain neighboring-frame bleed or clipped anatomy/equipment.

## 5. GIF approval BEFORE runtime integration/deployment

Create a composite GIF/animation preview from the safely packed accepted character poses and independent VFX. Give the player a readable attack sequence, checking windup/strike/contact/recovery, weapon continuity, ground, tail, left/right presentation and ending back in the correct Idle/Move pose. Assign frame timing for the preview and label it preview timing, not an approved combat-timing change.

**WAIT for explicit player GIF acceptance before integrating or deploying.** Earlier identity/static/locomotion/KO approval and a process approval are not GIF approval. If player requests correction, preserve accepted work and correct only the affected pose/effect/timing. The game consumes PNG/frame metadata and shared engine playback; GIF is a review artifact.

## 6. Future engineering gate

After approved GIF and explicitly scoped engineering authorization: implement data-driven shared action/VFX playback, match actual cast/hit events without shifting damage or cadence to fit the preview, preserve movement/gameplay/AI/Tier/rewards, protect KO/interruptions/pause/mirroring/reduced motion/return-to-Idle-or-Move, and use shared dynamic residency. Run appropriate checks, build/CI/Pages/public fingerprint, then stop for player iPhone acceptance. Never treat a nice GIF as proof of actual event sync or phone readability.

Explicit scope exception2026-10-15T22:18:37+08:00: player selected B, actual180ms P1 Basic windup. This overrides immediate resolution only for the opted-in Basic; do not infer permission for different damage/cadence/stat changes. Detailed contract docs/superpowers/specs/2026-10-15-shared-basic-windup-design.md was accepted22:33:01+08:00. Its implementation plan now awaits review; A/B and written-design gates are resolved.

## 7. Durable handoff contract

No need for the player to re-upload our own retained materials. Save candidate/accepted versions to distinct GitHub art paths; never overwrite approved/runtime art with a candidate. Keep source PNGs, each accepted frame, normalized sheet, independent VFX, composite GIF, manifest/checksums, frame geometry/anchors/preview timing, origin/reference paths and revision/status history. A future Work package must contain START_HERE.md and WORK_HANDOFF.md plus those assets and explicit acceptance evidence, no reliance on transient scratch or conversation images.

Update WORK_PROGRESS and STATE at meaningful checkpoints: exact active revision, what was accepted/rejected, checks actually done, next one unfinished gate, protected scope and stop boundary. Any new Chat/Work prompt must be one complete self-contained copyable code block. Chat finishes safe preparation first; Work receives only the remaining executable delta.

## Current first slice

P1 Lushu Basic. **All four character poses are PLAYER APPROVED** (full-sequence acceptance2026-10-15T21:43:37+08:00), archived unchanged at docs/art/approved/lushu/basic/. Accepted source hashes and approval statement are in docs/art/candidates/lushu/basic/Basic-four-pose-review-v1.json. Do not regenerate these poses.

Safe full-canvas uniform packaging, independent blade/contact VFX candidates and normal/slow composite GIFs are prepared in docs/art/candidates/lushu/basic/review-v1/. REVIEW_NOTES.md records actual checks and limitations; review-manifest.json records complete geometry/hashes/timing and SHA256SUMS.json covers checkpoint contents. Four384-square cells, common visible baseline320, minimum39px nonzero-alpha clearance; normal GIF8frames/1600ms includes400ms action plus Idle holds, mirroring and actual approved Idle F1 return. Timing is preview-only.

**Current2026-10-15T22:33:01+08:00: four poses/GIF/VFX, B and written shared-windup design are PLAYER APPROVED.** Art/hashes remain under docs/art/approved/lushu/basic/review-v1/acceptance.json. Reviewed contract docs/superpowers/specs/2026-10-15-shared-basic-windup-design.md governs lifecycle, actual damage timing, accessibility and protected assets. **Next is player confirmation of docs/superpowers/plans/2026-10-15-shared-basic-windup.md, then native executing-plans implementation in this Work.** Do not reopen A/B, art/design approval or executor selection. No implementation/tests/build/deploy/phone PASS yet. First full slice remains production-validation pending; no main merge.

## Mandatory action-power visual escalation — player rule 2026-10-16

For each character's four active categories, **Basic < Heavy < Special < Awakening** in perceived impact, animation commitment and spectacle. This is a **relative visual hierarchy**, not a new damage formula or numerical guarantee: individual ability data (including defensive/heal skills) remain authoritative. Preserve readability, role/species identity and mobile performance.

- **Basic:** fast, compact, readable signature strike, brief contact flash/trail; little screen occupation.
- **Heavy:** stronger anticipation, forceful acceleration/weight transfer and a clearly more substantial hit, brighter/broader weapon trail, impact burst and modest recoil/shock accent.
- **Special:** distinct signature character/ability expression and richer, layered VFX with greater spatial presence, appropriate to actual targeting and gameplay function; utility/healing skills convey stronger potency without fake damage.
- **Awakening:** most dramatic ultimate action and VFX payoff; strongest anticipation/release, unmistakable silhouette, staged/layered burst, persistent-but-bounded aftermath. Do not obscure HUD, targets or critical warnings, nor add unearned hit geometry or extra damage.

For all four tiers, **animation body mechanics must escalate together with VFX** (pose breadth, windup/follow-through, weapon/limb energy, timing), not merely a larger recolored particle sprite. Judge each new skill against the preceding approved skill of the same character in a side-by-side GIF/small-screen comparison. Keep character identity, weapon, scale/anchor, right-facing mirror, existing combat data/timing and actual hit synchronization unchanged unless the player explicitly approves a separate gameplay/timing change. FX complexity is constrained by scene residency, accessibility/reduced-motion, frame budget and target readability. For future characters use the same hierarchy and review gate. Do not copy identical effects across species or damage-only assumptions into support/defense.

## Mandatory within-character attack motion differentiation — PLAYER HARD RULE 2026-10-16

**Basic / Heavy / Special / Awakening MUST have immediately distinguishable bodily movements, silhouettes, attack vectors and timing signatures, even with VFX turned off.** The existing escalating power/spectacle hierarchy is additional, not a substitute. Do not produce the same four poses with just recolored/larger effects, faster playback or extra particles. These categories are distinguishable by the character's actual articulated motion and relationship to its ability's validated gameplay mechanics.

Required art review for every character before completing the four skills:
- Build a **four-skill motion differentiation matrix** describing each skill's stance/center of gravity, anticipation, primary limb/weapon path, facing/target vector, release/contact pose, follow-through and rhythm, with the real ability data as authority. Use distinct primary silhouette and action grammar per skill.
- Show each skill's player-preview GIF **both character-only (effects hidden) and with independent VFX** at actual phone battle scale. If testers cannot identify the skill by body movement alone (or its actual support/defense gesture), revise poses before approving effects or integration.
- Preserve exact approved identity, weapon, visual proportions, animation safety and state transitions. Do not add fake hit count/target/path/projectile/teleport/area, nor edit stats/AI/range/real damage timing without a separate player-approved combat change. Power feel escalates Basic < Heavy < Special < Awakening, while distinguishing attack type independently.
- For P1 鹿蜀 starting differentiation proposals, **Basic「踏角」** is the deployed compact grounded horn/hoof/weapon strike; **Heavy「逐風衝」** must uniquely emphasize a forward engage→planted forceful collision/weapon blow, with unmistakably different F3 and silhouette; **Special「迴蹄」** must emphasize a diagonal reposition followed by a rotational/turning hoof strike (no invented extra move/hit); **Awakening「南山奔襲」** must uniquely portray the existing three successive rushing hits, with staged peak burst and strongest overall payoff. Validate the latter two against real ability timing and source prior to making art; these are design directions, not preapproved poses or extra gameplay.
- Develop the current character's full four-skill kit before starting the next character; existing accepted Basic stays intact. No new art is approved simply by recording this rule.

## Distinct ability-specific VFX and target-bound persistent status effects — PLAYER HARD RULE (2026-10-16)

Every individual ability has its own immediately readable **VFX signature**, driven by ability definition and actual combat event/state—not merely a recolor/size increase of shared explosions. Basic < Heavy < Special < Awakening must escalate dramatic release, layered impact and visual scale where appropriate, while maintaining different shape, trajectory, element/material, rhythm and contact geometry for each move. Strong explosion/burst/impact feel is required for damaging power moves where justified. Support, defense, healing, buffs and debuffs receive appropriately striking protective/healing/condition visuals, not fake damage explosions.

**Three presentation phases must remain distinct:** (1) caster-side startup/charge/travel/release effect follows actual validated action; (2) impact VFX belongs to actual hit/landing/affected targets; (3) sustained **target-bound status VFX** stays anchored to the affected unit for exactly the *actual active state* and ends upon state expiry, cleanse, KO/despawn, scene switch or cancel as appropriate. Examples: burn flames/embers on the enemy, poison violet-green fume/droplets, bleed wound pulses, slow/chill ice/snow, shield aura, regeneration/heal halo. Periodic damage numbers and pulses occur only when the simulation actually applies periodic HP ticks, **not** at arbitrary animation intervals; hit count/stacking/refresh, immunity, partial resist, target switching and state visibility need data contracts and tests. Multiple effects must be legible and bounded, no opaque HUD masking, no confusion with team colors/critical numbers. Respect reduced-motion, frame/texture budgets and mirroring; effects never persist as orphan sprites after target death/scene exit.

**No invented gameplay:** The current roster ability data does not broadly define burn/poison/DoT status merely because a fire/water/venom-themed attack exists. An ability that applies no persistent status must show only its approved cast/impact visuals. Introduce DoT/status mechanics only in a separately player-approved combat milestone, then use generic event/state-driven target attachment. The VFX architecture should support future data-driven target statuses without character-ID specials.

**Per-skill player review gate:** record skill identity, offensive/support type, unique motion silhouette, VFX signature shape/color/trajectory/layering, attach point (caster/projectile/target/world), onset event, impact confirmation, linger/expiry source, Basic<Heavy<Special<Awakening comparison, effects-off and effects-on GIF, phone readability and reduced-motion. Do not reuse the identical effect for different abilities under a different name.

## Recovered GIF acceptance and successor rule — 2026-10-16

When a player confirms an explicitly linked recovered GIF/VFX, archive the exact statement/time and reviewed file SHA256 in acceptance metadata and update the top progress/state pointers. This closes only the visual gates actually shown; do not regenerate accepted poses/effects or restart F3/four-pose/GIF review because a new session begins. Receipt alone is not acceptance. Keep original recovery observations as dated history; latest explicit acceptance supersedes historical pending pointers.

A recovered GIF may lack its original assembly script, transparent cells or transform manifest. Record those gaps honestly: visual approval is not proof of source-to-GIF byte provenance, clean alpha, padding, budget or gameplay hit synchronization. Reconstruct only deterministic source-preserving packaging from accepted source art, inspect it and record exact derivatives/geometry/checksums. Material pose/effect changes need review; unchanged approved art does not need a duplicate approval gate. Never extract runtime character sprites from a composited GIF or generate replacement art just to fill missing packaging.

Heavy preview loading duration is not a gameplay timing decision. Inspect the real ability/event path and resolve any timing mismatch in the integration design before changing simulation; no fake HP delay or silent Basic timing reuse. Runtime engineering, feature deployment and player phone gameplay acceptance remain separate gates. Current P1 Heavy visual acceptance: docs/art/candidates/lushu/heavy/recovered-review-v1/acceptance.json (2026-10-16T20:33:23+08:00). No main merge.

## Pre-integration synchronization and residency evidence — 2026-10-16

Before adding another accepted action to the shared renderer, measure the actual ability lifecycle and current all-required decoded residency. An approved preview timing is not an authorized gameplay delay. Existing phased Basic playback does not imply immediate Heavy emits start/resolve/cancel events. Record missing lifecycle contracts and seek an explicit timing decision before shifting real hits; never delay HP/damage text alone. Account for new action/VFX textures against the complete live required set, cache and upload reservations. Optional LRU does not rescue an over-budget set whose every key is pinned. Preserve finite16MiB and design shared readiness/pin transitions; do not raise limits or modify another approved character as an unreviewed workaround. Keep preparation, engineering verification, deployment and player phone acceptance separate. Evidence for current Heavy: docs/art/candidates/lushu/heavy/runtime-prep-v1/README.md.

## Shared action ownership and lossless packaging evidence — Heavy2026-10-16

Independent action-effect images belong to actionId/category; when a new action replaces one on the same actor, destroy/rebind previous effect images. Test actual same-actor Basic→Heavy and Heavy→Basic, not just two different actors. A batched render must show the last real resolved impact once even if a later valid action has already started; preserve simulation/HP/CD/input timestamps, do not invent an animation lock. Repeat renders at the same simulation time must remain visually frozen, and an impact sampled after playback expiry must still clean up.

A budget fix may use deterministic lossless removal of fully transparent canvas rows while preserving the approved original file. Prove complete nonzero-alpha retention, exact pixel equality and adjusted origin/display transforms for BOTH mirror directions. Keeping full logical width avoids the center-of-flip shift caused by asymmetric horizontal trimming. This is packaging, not new character artwork or permission to alter colors/pose. Required decoded/cache/reservation peaks still need actual measurement. Current Heavy uses a512x331 Botuo KO derivative, original512x512 retained, same144px display width/scale2, origin[.5,280/331]; all-five+Basic+Heavy16748808bytes under unchanged16MiB.


## Runtime regression lessons — P1 Heavy player feedback (2026-10-16)

- Do not fit a crouched/wide action's full silhouette height to standing Idle height: that inflates the actual head/torso. Compare head/body size against the approved action/Idle at real display scale, use one authored pixel-scale policy across all action cells, and separately align grounded baseline. Preserve masters.
- Asset presence, manifest pinning and automated tests do not prove visible VFX. Inspect real presenter coordinates, draw order, direction and body-height contact; player phone acceptance remains separate. Keep VFX independently layered when correcting body scale.
- For an opted-in manual empty Heavy swing, run the authored action lifecycle and sweep in current displayed facing, spend the existing cooldown, and resolve as a miss. No fabricated target, acquire-on-resolve, damage, movement or contact burst. This does not authorize changes to other abilities' mechanics.
- Include the actual skill-button-to-session-facing bridge in regression coverage; direct session calls alone cannot prove the control forwards the correct direction.

Case evidence: docs/verification/M5C_B_LUSHU_HEAVY_FEEDBACK.md.


## Real cast-chain VFX visibility — Heavy defect 2026-10-17

Asset hashes, dimensions, isolated manual-control previews and a single successful paint do not establish battlefield VFX readability. Reproduce the actual campaign factory with every skill ready and immediate AI handoff. Test multiple simulation steps per paint: a phased real hit followed by an immediate/nonphased cast can erase both active action and pending impact before rendering. A one-frame safeguard is insufficient for readable impact.

Completed impact retention must be an explicit reusable presentation policy, bounded by the original authored hold, actual confirmed hit and owner lifecycle. Preserve core damage/CD/input/AI timestamps, reject stale tokens, freeze Pause, clear KO/scene teardown and never manufacture air-hit bursts. P1 Heavy opts in; Basic's data/policy is unchanged. Retained Heavy F3 can temporarily cover a subsequent Basic's anticipation frames; record that visual priority rather than claiming all new poses stay visible.

Give the player standalone supplied VFX, character-only/VFX-only/composite normal+slow GIFs, and actual cast-chain before/after evidence with reproducible traces and hashes. Label draw-command reconstruction separately from real browser/screen recording and phone acceptance. Current evidence: docs/art/candidates/lushu/heavy/playback-proof-v1/README.md.

## Preview acceptance and battlefield evidence (2026-10-17)

Bind each player preview acceptance to exact source/derivative hashes and the actual statement. Approval of a source board or reconstructed GIF approves that preview scope only. Keep a separate battlefield defect status until the current deployed build is demonstrated using actual input, actual cast/resolve events, required texture registration and visible real-renderer output in both directions. Generic VFX visibility is not evidence of authored Heavy PNG visibility. Reuse verified deployments and fixes; do not make another size/code/art change without a reproduced cause. If browser timing prevents the Heavy frame capture, record that precise limitation and keep device acceptance open. Never label a reconstruction a screen recording.

## Reduced-motion skill readability and separate release trails (2026-10-17)

Do not silently hide an accepted skill-identifying effect in reduced-motion mode. Use a brief static release cue instead of moving trails, with no new flash/strobe, repeated hit or damage implication. Source sweep and target-hit contact have separate finite presentation lifetimes; making a sweep readable must not prolong the impact/character pose, cooldown, cast windup or simulation. Measure normal and reduced-mode source-sweep visibility independently from contact; include whiffs, both directions, following AI casts, Pause and KO cleanup. Heavy currently opts into260ms static/fading blade afterglow via shared data; Basic retains its approved existing behavior. A code-proven reduced-mode hiding path does not prove that the player enabled that OS setting.

## Heavy player closure and successor rule — 2026-10-17

Heavy source33a0f21 is now player-verified; see M5C_B_LUSHU_HEAVY_PLAYER_ACCEPTANCE.json. Earlier Heavy runtime/size rejection statements above are historical. Preserve accepted art and corrections. Bind a device acceptance to the exact deployed source, wording and changed scope; do not turn a general confirmation into a fabricated per-device/per-case matrix. Reuse engineering evidence when code has not changed. Continue P1 Special through F3 review first; preview timing never changes immediate Special gameplay without a separately approved timing contract.

## Transparent candidate diagnosis — actual compositing (2026-10-17)

For generated RGBA candidates, inspect actual alpha values and composite on opaque light/dark backgrounds. Colored RGB under alpha0 is invisible and must not be mistaken for rendered glow by an RGB-only thumbnail. Check complete silhouette and transparent outer borders; keep source hash and a reproducible QA derivative. Alpha/background QA is separate from player pose approval and safe equal-cell runtime normalization. When an unapproved candidate needs generative cleanup, retain the original and version the edit; never claim the edit preserved exact pixels or inherited approval.

## Special F3 acceptance / larger explosive VFX confirmation — 2026-10-17

Player10:58 explicitly accepts P1 Special F3 v2 and confirms later effects must be clearly visible, larger and more explosive under the existing Basic<Heavy<Special<Awakening rule. Save accepted pose/hash separately from future pose/effect/GIF review. Continue individual remaining poses first; do not bake effects into them or infer unseen VFX approval. Outgoing effect and actual-hit burst must each be reviewed independently at equal actor scale; maintain reduced-mode static cues and finite cleanup.
