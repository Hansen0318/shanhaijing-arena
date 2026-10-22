# P1 鹿蜀「疾行」Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Project/player method is already **Native single-agent**; do not dispatch subagents or ask to choose a method again.

**Goal:** Deliver the approved independent P1 passive with actual ordinary-motion acceleration, readable battlefield/HUD state and truthful Collection, then normal verified release and focused player acceptance.

**Architecture:** Pure immutable passive data and a session-owned rolling-distance runtime feed existing BattleStatuses. Insert passive motion events into the authoritative motion timeline while preserving existing intent/cooldown/combat ordering; UI consumes an immutable projection, never owns combat time. Keep opt-out paths unchanged and do not branch on roster identity.

**Tech Stack:** JavaScript ESM, Node >=22.12.0 / node:test, Phaser4.2.1, Vite8.3.1, existing Playwright1.62.1 validation tooling and feature-branch Pages. No product dependency changes.

**Spec:** `docs/superpowers/specs/2026-10-22-lushu-passive-design.md`, immutable approval in `docs/verification/P1_PASSIVE_DESIGN/spec-acceptance.json` at the recorded SHA256.

**Status:** PLAN WRITTEN / SELF-REVIEWED / PLAYER PLAN REVIEW PENDING. No product implementation in this slice. Recovery source3115179886111804964fea565e93805d66c8225c/tree22fd78553786b9c8f283538944854e78aa974f10.

## Global Constraints

- Same branch feat/m0-combat-core-20260927, PR#1 open/unmerged; no main merge, alternative branch, TD or character-ID runtime exceptions. Native single-agent self-review; do not claim independent review.
- P1 first through passive PLAYER VERIFIED, then P2厚甲; P3 skills blocked until both complete. Preserve all accepted identity/static/Idle/Move/KO/four-skill art, receipts, GIFs, scales/anchors/ground/mirror; ordinary Hit permanently cancelled.
- Distance1.0 in rolling2seconds; movement gain+8percent for2seconds; cooldown4seconds from activation. CD accumulates no movement; T0–T3 passive parameters fixed. Existing movement gains sum with15percent total cap.
- Only actual general manual/AI motion counts. Exclude skills/rush/spawn/teleport/external position changes/animation/camera and zero movement at walls. Simulation clocks only; Pause/snapshot/render do not advance state.
- True status badge above HP, actual remaining-time bar and selected HUD progress/effective speed/CD; at852×393 text >=12 CSS px. At cap show「疾行 · 移速上限15%」rather than falsely promising another8percent. No actor enlargement, placeholder/debug-label revival or hidden-only MOB indicator.
- No fixed16MiB total/required-count/131072reserve admission gate; retain per-file safety/two downloads/all-required/ownership/reclaim/actual errors/destroy.
- Product source changes require fresh affected checks, normal full CI/Build, actual renderer/built-entry evidence and current release source binding. Reuse old asset evidence only for precisely unchanged scope; no old1014/149 claims for new runtime. Docs-only checkpoints [skip ci].

## Review Focus

1. An ordinary path crosses activation/expiry inside a large step: only the correct time slice accelerates; retain original AI and cooldown evaluation cadence (Task2 tests).
2. Same-time hit/KO/control collides with activation: existing combat tie ordering is preserved; dead/controlled movement cannot grant a ghost buff (Task2 tests).
3. An already-earned buff is removed by existing status eviction/cleanup: projection immediately stops calling it active; do not refill during CD (Tasks1/3 tests).
4. Formal art/viewport transform/actor overlap hides text: dedicated badge stays visible at real CSS size without covering HP/face/controls, in normal/reduced modes (Tasks3/4 tests).
5. Existing10percent Tier movement buff coexists with疾行: result is1.15, independent expiries remain, UI distinguishes contribution from effective speed (Tasks2/3 tests).

## File Map and Interfaces

Create `src/combat/passiveDefinition.js` for immutable validation; `passiveRuntime.js` for session-owned tracking/status ownership; `passiveMotion.js` for pure motion timeline candidates. Modify `src/combat/battleSession.js` only at constructor, motion planning/event queue, snapshot and lifecycle hooks. Modify `src/roster/abilities.js`/`catalog.js` for P1 opt-in after wiring is tested.

Create `src/runtime/passivePresentation.js` (pure projection/copy/layout), `passivePresenter.js` (Phaser badges/HUD lifecycle). Wire `src/runtime/ArenaScene.js` through create/refresh/ownCleanup and real canvas rectangle. Modify `src/collection/model.js`/`view.js` for honest passive status text. No changes to approved PNGs or character transform code.

Create tests `passiveDefinition.test.js`, `passiveRuntime.test.js`, `passiveMotion.test.js`, `passiveSession.test.js`, `passivePresentation.test.js`, `passiveCollection.test.js`, `passiveReleaseEvidence.test.js` and helper `tests/helpers/passiveFixture.js`. Reuse existing staged/tier/asset/lifecycle tests by impact, retaining their assertions.

Create `scripts/checkLushuPassiveBrowser.mjs`/`verifyLushuPassiveRelease.mjs`, `.github/workflows/p1-passive-verification.yml`, and new evidence `docs/verification/P1_PASSIVE_RUNTIME/`. Change the normal Pages workflow's active release verifier to the new source-bound verifier only when it is supplied with real successful evidence. Preserve the old P2 verifier/receipt/reports unchanged as historical proof; do not rewrite the old hashes to pretend the old run covered new code.

### Shared types (JSDoc shapes, no new dependency)

`MotionSegment = {start:number,end:number,from:{x,y},to:{x,y},kind:'ordinary'}` with absolute simulation seconds and actual clipped endpoints. `PassiveDefinition = {id,name,category:'passive',implemented:true,trigger:{kind:'ordinary-distance',distance:1,windowSeconds:2},cooldownSeconds:4,effect:{kind:'status',type:'movement',magnitude:1.08,duration:2},presentation:{label:'疾行'}}`.

`PassiveView = {instanceId,definitionId,label,implemented,progressDistance,threshold,readyAt,active:null|{statusId,startTime,expiryTime,contribution},effectiveMoveSpeed,movementCapReached}`. Values are immutable, derived at a requested clock, and contain no mutable status references. Disabled/absent passives yield an empty list. Tests may use arbitrary definition IDs and copied definitions; engine branches must never compare P1/P2.

---

### Task 1: Validated passive data and rolling-distance/status core

**Files:** Create passiveDefinition.js, passiveRuntime.js, tests/passiveDefinition.test.js, tests/passiveRuntime.test.js. Product roster is not enabled yet.

**Interfaces:** `createPassiveDefinition(input)->frozen PassiveDefinition` rejects invalid values; absent/implemented:false entries are skipped by runtime. `new PassiveRuntime({actors,characterForActor,abilityDefinitions,statuses})` consumes live actors, characterForActor(actor) returning the existing Tier-projected instance definition, ability definitions and BattleStatuses; methods `enabled()->boolean`, `nextBoundary(instanceId,segment)->number|null`, `appendOrdinary(instanceId,segment)->void`, `settle(now)->Activation[]`, `snapshot(now)->Readonly<PassiveView[]>`, `clearActor(instanceId)->void`, `clear()->void`. Activation is `{instanceId,definitionId,at,statusId}`. Runtime does not advance session elapsedSeconds or mutate actor coordinates.

- [ ] **Step1 — RED:** write validation and core tests, including arbitrary IDs, incomplete definitions and non-finite distance/window/CD/duration/multiplier. Finite positive distance/window/duration, nonnegative CD>=duration for this initial supported trigger, and movement status bounds use existing validation; accepted data must be deep-frozen.

```js
assert.equal(createPassiveDefinition(valid).effect.magnitude,1.08);
assert.throws(()=>createPassiveDefinition({...valid,trigger:{...valid.trigger,distance:NaN}}));
// At speed2, first threshold occurs at0.5, never before it.
assert.equal(runtime.nextBoundary('unit-x',{start:0,end:1,from:{x:0,y:0},to:{x:2,y:0},kind:'ordinary'}),0.5);
```

Tests commit a segment only up to the returned earliest boundary, settle there, and assert status start0.5/expiry2.5/readyAt4.5, then no accumulation until4.5. Include turn path lengths, partial rolling-window clipping, expiry-without-movement, replay/out-of-order rejection with no mutation, duplicate settle no second activation, distinct actor instances, KO/clear and external status deletion. Reject unsupported kinds before they can count movement; enabled:false returns no tracked state.

- [ ] **Step2 — Run RED:** `node --test tests/passiveDefinition.test.js tests/passiveRuntime.test.js`; require failure for missing feature, not parse/import spelling errors.
- [ ] **Step3 — Implement core:** keyed by instanceId+passive reference, store linear path segments and readyAt/statusId; nextBoundary computes on a clipped copy and never mutates. Find the earliest crossing analytically across segment start/end shifted bywindowSeconds, not by render polling. appendOrdinary records actual movement to that boundary; settle applies one existing movement status to a living actor, clears progress and sets readyAt. Existing status key is derived from passive reference; snapshot confirms the stored statusId still exists before reporting active, computes clipped progress purely and gets effective speed from existing projected stats×status movementMultiplier. No new UI timer or second status store.
- [ ] **Step4 — GREEN:** same two tests; use absolute 1e-9 seconds / 1e-8 world-unit tolerances consistently, assert no trigger at 1−1e-7 distance. No whole-suite yet.
- [ ] **Step5 — Checkpoint:** update WORK_PROGRESS/STATE with exact RED/GREEN evidence and commit/push core checkpoint. Keep product passive disabled until Task2; normal release guard must block source changes without current evidence, never bypass it to make this checkpoint deploy.

### Task 2: Authoritative general-motion integration and P1 opt-in

**Files:** Create passiveMotion.js, tests/passiveMotion.test.js, tests/passiveSession.test.js, tests/helpers/passiveFixture.js; modify battleSession.js, abilities.js, catalog.js.

**Interfaces:** consume Task1 API. `nextPassiveMotionBoundary({runtime,segments,now,end})->number|null` chooses earliest candidate with stable instanceId order; `clipOrdinarySegment(segment,end)->MotionSegment` is pure. Session owns `passives:PassiveRuntime`; snapshot adds `passives:Readonly<PassiveView[]>` without changing existing fields. Existing movement inputs and ability APIs stay unchanged.

- [ ] **Step1 — RED:** controlled real-session fixture uses existing createBattleSession/createLabBattleSession, all actors held and cooldowns fixed to prevent incidental AI hits. Include enabled fixture, same copied character with implemented:false baseline and arbitrary-ID clone proving generic routing. Freeze four-skill references/definitions, not substitute fake damage code.

```js
// Same Tier/positions/controls, unobstructed active2seconds, no other buffs.
assert.ok(Math.abs(activeTravel / baselineTravel - 1.08) < 1e-8);
assert.ok(Math.abs(t0ActorSpeed - 2.214) < 1e-9);
assert.equal(coarse.activationTimes.length,fine.activationTimes.length);
coarse.activationTimes.forEach((t,i)=>assert.ok(Math.abs(t-fine.activationTimes[i])<1e-9));
```

Explicit assertions: exact1.0 crossing; stopped/wall/zero inputs; a turn path exceeds endpoint distance; gap older than2seconds forgotten; expiry and4secondCD restart; manual/AI/ally/enemy; abilityMovement/staged rush and external position assignments excluded; existing Tier 10 percent + passive gives1.15 then each expires independently; Pause/snapshot pure; KO/battle end/new session cleanup. Same-time KO/control precedes new activation; affected four-skill damage/CD/hit identity and existing staged sweep order stay within their established contracts. For integration histories compare deterministic control paths; do not promise identical unrelated AI trajectories across arbitrary different externalstep inputs.

- [ ] **Step2 — Run RED:** `node --test tests/passiveMotion.test.js tests/passiveSession.test.js`; record failures attributable to missing wiring.
- [ ] **Step3 — Wire motion:** preserve preexisting intent selection/cooldown-before-intent cadence. General moveToward/moveAway/moveByVector must expose actual bound/stop-clipped ordinary segments to the planner before coordinates are committed; skill movement is separately tagged and never inferred from actor endpoint deltas. For passive-enabled intervals, merge passive threshold/ready/expiry and window breakpoints into the existing swept/discrete motion event queue; at each event commit actual ordinary segments tothat time, settle existing combat ties in their existing order, cleanup dead/control paths, then settle surviving passive activations and rebuild only remaining ordinary trajectories with the new speed. Keep staged legs governed by legPosition and never scale their skill velocity. Passive subevents must not resample AI/random/cooldowns or fire duplicate damage. Use the old path verbatim when there are no implemented passives. Reset hook calls passives.clear/clearActor with current existing lifecycle cleanup.
- [ ] **Step4 — Enable data and GREEN:** register P1.passive via createPassiveDefinition with approved values and Collection description; set both P1 implemented flags consistently, keep P2–P5 false. Add an explicit metadata entry/table for the passive; do not mutate globalabilities in runtime. Run new tests plus `node --test tests/battleSession.test.js tests/stagedAction.test.js tests/stagedActionClock.test.js tests/stagedActionOrder.test.js tests/tierStatus.test.js tests/tierPowerRuntime.test.js tests/basicActionIntegration.test.js tests/botuoAwakeningLifecycle.test.js tests/botuoSpecialLifecycle.test.js tests/botuoHeavyLifecycle.test.js`. A legacy fixture that intentionally tests non-passive math may opt out via copieddefinitions while retaining all original assertions; explain any migration individually, never delete a failure to get green.
- [ ] **Step5 — Checkpoint:** self-review same-time ordering and opt-out delta; save actual traces/commands under P1_PASSIVE_RUNTIME, update progress, commit/push coherent runtime checkpoint. No P2 passive or art changes. Source guard still prevents incomplete release.

### Task 3: Visible badge, selected HUD and honest Collection

**Files:** Create passivePresentation.js, passivePresenter.js, tests/passivePresentation.test.js, tests/passiveCollection.test.js; modify ArenaScene.js, collection/model.js, collection/view.js.

**Interfaces:** `passiveBadgeText(view)->string` returns「疾行 +8%」or「疾行 · 移速上限15%」only when active. `passiveHudText(view,now)->string` formats progress, independent active/CD remaining and effectiveMoveSpeed3decimals. `layoutPassiveBadges({items,canvasRect,logicalSize,reservedRects})->Layout[]` returns deterministic rectangles/font sizes/expiry fractions; consumes caller's HP anchor and face/HUD exclusion rectangles. `new PassivePresenter(scene,{project})`, `render({views,actors,hpAnchors,faceRects,canvasRect,reservedRects,selectedId,now})`, `destroy()` own Phaser objects exclusively; views are Task 2 snapshot. No property in these modules may mutate session/status records.

- [ ] **Step1 — RED:** pure tests assertactive-only text, 1.08+1.10 capped text/effective speed, one decimal remaining vs 3 decimal speed, simultaneous active+CD, readyprogress, recordremoved/KO clears badge, six overlapping actors produce stable clamped non-overlapping labels and avoid protected rectangles. Resize to852×393/large viewport asserts effectivefont>=12 CSS px and no actor transforms. Collection model adds passive-only `implemented/statusLabel`, existing abilitynames/categories unchanged; view text says「已實裝」forP1 and「尚未實裝」P2–P5; locked/unowned screens and existing Tier upgrade ledger remain unchanged.
- [ ] **Step2 — Run RED:** `node --test tests/passivePresentation.test.js tests/passiveCollection.test.js`.
- [ ] **Step3 — Implement:** add separate Phaser text/background/bar objects aboveHP, not view.label and not debugnames; use actual canvas bounding rectangle ratios for CSSpixel readability and relayout onviewportchanges. Collision resolution sorts stable actor identities, tries vertical rows avoiding HP/face/HUD then an unoccupied clampedlane with a thin connector so source identity stays clear; fixed bounds ensure all six labels fit minimum viewport. No flashing or new art; reduced mode keeps same static widgets. Add one selectedHUDstatus container outside joystick/skill/hp/timer reserved rectangles with accurate progression/effectiveSpeed/CD; scene calls renderer with snapshot and registers ownCleanup destroy. Collection consumes implementedmetadata from definition, never infers from name/Tier or ownership.
- [ ] **Step4 — GREEN:** new tests plus `node --test tests/collectionModel.test.js tests/collectionView.test.js tests/collectionLayout.test.js tests/battleHud.test.js tests/hudCardLayout.test.js tests/tierPresentation.test.js tests/tierPowerHud.test.js tests/viewportSync.test.js tests/routeOwnership.test.js`. Pure geometry tests do not prove actual WebGL text readability; Task 4 must capture it.
- [ ] **Step5 — Checkpoint:** update source/evidence ledger and commit/push. Preserve character transform diff as empty and do not regenerate oldGIF/master sources.

### Task 4: Real built-app proof, guarded normal release and player Gate

**Files:** Create checkLushuPassiveBrowser.mjs, verifyLushuPassiveRelease.mjs, tests/passiveReleaseEvidence.test.js, p1-passive-verification.yml and P1_PASSIVE_RUNTIME evidence; modify m0-pages-preview.yml only at active release verifier. Read existing checkBotuoAwakeningBrowser.mjs, checkBotuoAwakeningScale.mjs and verifyBotuoAwakeningRelease.mjs for patterns, do not overwrite saved old reports/receipts.

**Interfaces:** Browser script `node scripts/checkLushuPassiveBrowser.mjs [--built]` consumes existing ARENA_BROWSER_TOOL_ROOT/ARENA_BROWSER_OUTPUT; outputs native.json/built-entry.json, screenshots, actual time/path/status/UI records, `status:PASS|FAIL`, `physicalPhone:false`, errors and source hashes. New verifier reads `docs/verification/P1_PASSIVE_RUNTIME/release-evidence.json`, requires complete src/public coverage plus changed verifier/tests and real report SHA256s, approved-spec receipt binding, native/built PASS and compatibility policy; rejects missing/partial/stale/failed evidence. It does not trust a user-suppliedstatus alone.

- [ ] **Step1 — RED:** verifier tests reject missing evidence, changed source, incomplete src/public map, fake case count, missing CSS measurements, missing counterpart, malformed/failed report or placeholder approval hash; accepted fixture passes. Run `node --test tests/passiveReleaseEvidence.test.js` and see intended RED, then implement verifier and require GREEN.
- [ ] **Step2 — Normal engineering:** run `npm test` and `npm run build` once final Runtime changes are coherent (fresh whole-suite justified by shared simulation/lifecycle/UI changes). Record actual totals/failures, not hardcoded 1014. Resolve real impact/migrations with evidence; blockrelease on failed checks. Self-review full diff and source / approved-art guards. Do not install new product dependencies.
- [ ] **Step3 — True browser:** verification-only workflow follows existing Node 22.12.0 / npm ci / temporary Playwright 1.62.1 / Chromium pattern, never Pages deploy. New script runs 4 controlled WebGL cases (ally/enemy×normal/reduced, eachsample both facings), then 2 actual built Campaign→Stage→Team→Arena cases(normal/reduced, P1 selected). Trigger by actual general movement through real session/controls, inspect badge/HUD/expiry/cap and session stats; capture six-actor overlap,12 CSS px font metrics, clipping/HP/face/HUD intersections, Pause/restart/KOcleanup and controlled2second baseline/passive traces. Controls may instrument builtbundle as existing tests do, never shipdebug hooks or claim fixture as physical phone. Preserve screenshot files and visually inspect actual captures. Fail if renderer,text or elapsed-time evidence missing.
- [ ] **Step4 — Changed shared compatibility:** rerun only affected true P2 runtime/native/built/scale checks because motion timeline and scene have changed; save separate outputs under P1_PASSIVE_RUNTIME/compatibility, not old files. Use existing `checkBotuoAwakeningBrowser.mjs`(normal/--built) and `checkBotuoAwakeningScale.mjs`; these check P2 shared timing / status / locked impact / pixel transforms onnew source, not new art approval. Unchanged source art normalization / GIF QA is not rerun. Any stale fixture-only expectation must be documented without loosening approved pixel / timing assertions.
- [ ] **Step5 — Release gate:** bind full source/public and actual new native/built/compatibility report hashes in new release-evidence, verifier must match them. NormalPages workflow runsnewverifier and normal full suite, with no bounded/skip/probe bypass. Write a negative current-source tamper check demonstrating verifier blocks before release, restore exact files, then run positive guard. Final release commit has no [skip ci] or bounded bypassmarkers. Spec approval covers this verified release flow for player review; do not ask again merely for unchanged release intent. Preserve old evidence history. If local browser unavailable use verification workflow, but do not claim PASS before artifact download/hash inspection.
- [ ] **Step6 — Deploy/public:** observe actual normalCI/Pages success at full release SHA/tree; compare complete public dist SHA256s against the actual tested/CI built output, save results/new filecount and exact URL. Do not reuse149/149asifnew run; count current artifacts. No new player PASS until actual user statement.
- [ ] **Step7 — Closurecheckpoint:** WORK_PROGRESS/STATE/AGENTS/specindex/report/handoff state ENGINEERING PASS / DEPLOYED / P1 PASSIVE PLAYER REVIEW PENDING. Present focused URL and ask only 疾行 readability, actual acceleration and expiry; preserve existing four-skill review. Record player receipt if confirmed, then mark P1 whole character complete and only then start P2 厚甲 first missing design Gate. Do not startP3. Evidence-only closure[skip ci]. If interrupted, checkpoint all actual outcomes and the first blocked Gate; retain untracked files.

## Self-Review and Stop

Spec coverage: §1 scope→ all tasks; §2 timing/status→ Tasks 1/2; §3 visible UI/numeric→ Tasks 3/4; §4 interfaces/lifecycle→ Tasks 1–3; §5 validation/release→ Task 4. Five Review Focus failure classes each have explicit owning test steps. Interface names used later match definitions above; every new file hasoneowner, no character-specific engine branch. Every stage requires actual results; expectations are not passed checks.

Current deliverable is this plan only. The approved spec is immutable and bound by receipt; no new design review of it is required. **Next: player reviews this written plan.** Preserve previously selected Native single-agent, then use executing-plans; no new execution-method question and no subagents. Plan approval is not recorded until actual response. P2/P3 and unapproved art remain outside the current task.
