# Shared Basic Windup Implementation Plan

Final execution2026-10-15: ENGINEERING PASS / PLAYER IPHONE PENDING. Deployed source7e7ae7371bbcade8434fe4e3771ebb5c65eab7a3, targeted94/local+CI751/build/guard PASS, Actions#1004/38758231891 PagesSUCCESS,33public files exact-byte match. Evidence/rulings: docs/verification/M5C_B_LUSHU_BASIC_RUNTIME.md; fingerprints adjacent JSON. Plan/art/GIF/B gates resolved. STOP for iPhone, no new actions/VFX/main merge.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task in the current session. Steps use checkbox (`- [ ]`) syntax for tracking. Native execution is preserved from the reviewed design; do not spawn subagents without explicit user instruction.

**Goal:** Integrate accepted P1 Basic art with actual180ms windup, synchronized real damage/contact and protected existing combat/presentation.

**Architecture:** BattleSession owns a per-actor pending Basic action and phased copied events. A small pure ActionPlayback samples event-gated poses/effect opacity; AssetPresenter only renders those samples using data-driven action descriptors and existing residency. All other current abilities retain their legacy path.

**Tech Stack:** Existing Node>=22.12.0 ES modules/node:test, Phaser4.2.1, Vite8.3.1; Python/Pillow only for offline deterministic asset preparation, no production dependency added.

**Spec:** `docs/superpowers/specs/2026-10-15-shared-basic-windup-design.md`, player reviewed2026-10-15T22:33:01+08:00 with「好，繼續」. This implementation plan still awaits review before code/assets/tests are written.

## Global Constraints

- Continue feat/m0-combat-core-20260927 / PR#1; no main merge. Recover latest remote rules/pointers before execution.
- P1.basic only opts into180ms; all other current windup values default0. No character-ID branches in shared engine/presenter.
- Preserve start-to-start Basic cadence, attack-speed/Tier curves, coefficients/crit/range, AI profiles, rewards/progression, movement and accepted art. Only reviewed windup/cancel/range-resolution semantics change gameplay.
- No timers outside simulation. F1/F2/F3/F4 nominal120/60/100/120ms; actual resolve gates F3/contact. Miss/cancel never produces a fake hit spark.
- Scene12MiB soft /16MiB hard; separate cache16MiB unchanged. Actual worst-case load failure or over-budget is a stop, never an ignored fallback or budget increase.
- Master PNGs/GIF stay unchanged. Runtime-only resize derivatives and exact static-Idle F1 extraction are approved preparation; preserve render size/ground.
- Intermediate feature checkpoints use `[skip ci]` so the push-triggered Pages workflow cannot deploy a half-integrated action. Final verified release commit must NOT skip CI; existing workflow runs full tests/build/deploy.
- No new character attacks, Heavy/Special/Awakening art or unrelated refactoring. Player iPhone acceptance remains the final stop.

## Review Focus

1. Killing blow: source-alive contact survives the target becoming KO in that same update; no extra hit or resurrection. Task4 test.
2. Same actor starts another ability while Basic is pending: cancel old token once, retain paid cadence, reject late resolve. Tasks2/4 tests.
3. Coarse frame jumps across impact: real resolve forces F3 that update rather than displaying recovery before damage. Tasks2/3/4 tests.
4. Resident menu/optional art plus five unique actors and concurrent same-key attacks: evict only unpinned optional textures, never exceed either hard guard or hide required images. Tasks1/4 tests.
5. Shutdown during delayed image completion/retry: no old session texture/action/spark appears after Restart. Tasks1/4 tests.

## File map / task boundaries

| Task | Production/art surface | Evidence |
| --- | --- | --- |
| 1 | Offline prepare script; four new P1 PNGs; manifest; exact P1 static-Idle source; asset guard references | Pixel/hash/padding, guard and real cache+scene budget |
| 2 | combat/ability.js, combat/battleSession.js, roster/abilities.js | Real-session windup/resolve/cancel/cadence/Tier |
| 3 | assets/descriptors.js, new assets/actionPlayback.js, battleDescriptors.js, roster/catalog.js | Pure phased playback and validated data |
| 4 | runtime/assetPresenter.js, runtime/ArenaScene.js | Readiness, actual frame/effect/damage sync, lifecycle/mirror |
| 5 | Only directly stale tests/docs, final workflow release | Regression/build/CI/Pages/public fingerprints |

### Task 1: Runtime-safe assets and near-limit residency gate

**Files:** Create `scripts/prepareLushuBasicAssets.py`, `tests/lushuBasicAssets.test.js`, `tests/helpers/pngRgba.js`, `docs/art/approved/lushu/basic/review-v1/runtime-manifest.json`; create `public/assets/characters/lushu/battleIdle-static.png`, `battleBasic-4f.png`, `basic-blade.png`, `basic-contact.png`. Modify `src/assets/manifest.js`, `scripts/checkAssets.js`; narrowly update P1 static-source metadata expectations only where necessary.

**Interfaces:** Offline script consumes only accepted review sources/hashes and original Idle strip; emits the four new PNGs plus geometry/checksums. Manifest keys: retain `lushu.battleIdle` with new96x128 static path; add `lushu.battleBasic`512x128, `lushu.basicBlade`97x81, `lushu.basicContact`85x57. New test helper `decodeRgbaPng(buffer)->{width,height,pixels}` supports existing8-bit RGBA PNGs/filters0..4; `cropRgba(image,[x,y,w,h])->Buffer` permits exact original-F1 comparison. No decoder helper enters production.

- [x] Write tests `runtime Idle is exact old F1`, `action is four uniformly resized padded cells`, `all approved masters unchanged`, `five-roster textures plus action/effects stay finite`, and `new refs are not asset-guard orphans`. Assert:
  ```js
  assert.deepEqual(decodeRgbaPng(idle).pixels, cropRgba(oldIdle,[0,0,96,128]));
  assert.deepEqual([strip.width,strip.height],[512,128]);
  assert.equal(allRequiredDecodedBytes,16763144);
  assert.ok(cache.diagnostics().highWaterBytes<=16777216);
  assert.ok(residency.snapshot().highWaterBytes<=16777216);
  ```
  Assert new file existence before reading so RED is a missing feature assertion, not an accidental decoder error. Compare every original approved file to acceptance.json hashes. Decoder/crop are test utilities following existing KO tests' inflate/unfilter approach, verified against known original pixels.
- [x] Run `node --test tests/lushuBasicAssets.test.js`; record expected missing-derivative/manifest assertions failing.
- [x] Implement deterministic full-cell LANCZOS resizing and exact F1 extraction, no recolor/threshold deletion/crop of actor cells. Save atomically and decode written PNGs before accepting checksums. Record byte sizes, full alpha bounds/margins and decoded bytes. Match F4 visible height to old Idle, with displayScale computed from old/new visible-height fractions; compute common origin so old Idle foot-to-actor offset is retained. Preserve original Idle file/origin/visible pixels. Record these measured scale/origin values in runtime-manifest.json; no guessed enlargement.
- [x] Extend `presentationReferences(characters,stages,abilities)` in checkAssets to include an optional character `actionDescriptors` map's animation source and blade/contact keys. For this independent asset checkpoint add action keys as explicit references via that optional data shape, not an orphan-ignore allowlist. Task3 validates/populates the full descriptor; no runtime behavior yet.
- [x] Run asset test, `node scripts/checkAssets.js`, and inspect all four runtime cells independently on light/dark backgrounds at intended display size. Require transparent margins on every cell and no clipped blade/antlers/tail. Exercise real createAssetCache/AssetResidency with truthful decoded PNG dimensions and all five required sets, both load orders; also pre-existing optional/menu data and delayed failure/destroy. Do not proceed if actual guards/readability fail; report the narrowly measured blocker.
- [x] Checkpoint asset prep+evidence/pointers `[skip ci]`; no deployment or claim of action integration. New optional descriptor references must be present/guard-valid, not silently ignored.

### Task 2: Authoritative Basic windup lifecycle

**Files:** Modify `src/combat/ability.js`, `src/combat/battleSession.js`, `src/roster/abilities.js`; create `tests/basicWindup.test.js`, `tests/helpers/basicWindup.js`; add validation cases to `tests/ability.test.js` and regression assertions for Tier projection.

**Interfaces:** `createAbilityDefinition(input)` adds immutable `windupMs` (integer0..1000, default0; nonzero basic-only/no telegraph). `BattleSession.pendingBasics: Map<actorId,record>` and `nextBasicActionId` are session-owned. Add `cancelBasicAction(actorId,reason)->boolean` and `resolveBasicActions()->void`; retain public executeAbility/drainCastEvents/step signatures. Pending record fields: actionId, actorId, targetId, source, definition, startedAt, dueAt. Extend `recordCast(actor,target,category,source,definition,hit,metadata={})` for copied phase/actionId/startedAt/dueAt/resolvedAt/windupMs; resolve retains hit, cancel adds reason. Extend `applyAbilityEffects(actor,target,definition,category,source,context,geometry=null,hitContext={})` to thread actionId through the existing applyResolvedDamage hitContext without changing legacy callers. Test fixture `makeWindupFixture({tier='T0',tacticalEnabled=false,rng=()=>.99}={})` returns `{session,actor,target}` using real Lab factory/catalog, distant other slots and cooling-down non-tested attacks so AI cannot add unrelated hits.

- [x] Write `P1 damage waits until .18 exactly once`:
  ```js
  assert.equal(session.executeAbility(actor,'basic','ai',target),true);
  assert.equal(target.hp,before);
  assert.equal(session.drainDamageEvents().length,0);
  assert.equal(session.drainCastEvents()[0].phase,'start');
  session.step(.179); assert.equal(target.hp,before);
  session.step(.001); assert.ok(target.hp<before);
  assert.equal(session.drainDamageEvents().length,1);
  assert.equal(session.drainCastEvents().filter(e=>e.phase==='resolve').length,1);
  ```
  Add exact tests for no early crit RNG draw; repeated start false; T0–T3 windup180 with original start intervals; legacy0 immediate; negative/noninteger/NaN/Infinity/non-Basic/telegraph validation. Run `node --test tests/ability.test.js tests/basicWindup.test.js` and observe RED before code.
- [x] Add field validation and P1 data opt-in. At valid start charge cadence and on-cast once, keep one locked target, emit start, queue due at simulation+.18; no finish/damage immediately for the opted-in path. Other ability paths stay unchanged. Preserve windupMs through existing spread-based Tier projection; do not opt it into telegraph Tier floors/scaling.
- [x] Add tests `locked target leaves range is miss/no retarget`, `source/target KO cancels`, `hard control cancels`, `successful different ability cancels/no refund`, `failed different ability does not cancel`, `ordinary damage/movement does not cancel`, `same-now no-step pause`, `coarse step resolves once`, `two sources have independent tokens`, `clear/result/new session have no stale impact`. For cancel cases assert no damage/resolve and exactly one cancel; for misses assert resolve.hit=false, paid cadence and unchanged HP; for movement compare existing displacement against moveSpeed. Test new ability and KO in the same step for deterministic event order, not a timeout-based delay.
- [x] Implement resolution using current target relation/range and living/control checks, epsilon1e-9. Resolve once at due step and draw crit RNG only on actual hit. Cancel on reviewed causes before a later impact can run; clear pending/event state on lifecycle closure without erasing the winning attack's legitimate damage feedback. Do not reset cadence at impact/cancel. `finishAbility`/slot cleanup must leave no executing slot stuck after cancel. Reuse shared effects on-cast/on-hit exactly once.
- [x] Run all Task2 tests GREEN plus `node --test tests/battleSession.test.js tests/ability.test.js`; record directly stale P1 immediate-hit expectations for Task5, never drop semantic assertions. Checkpoint core+evidence `[skip ci]`.

### Task 3: Validated action data and event-gated pure playback

**Files:** Modify `src/assets/descriptors.js`, `src/assets/battleDescriptors.js`, `src/roster/catalog.js`; create `src/assets/actionPlayback.js`, `tests/actionPlayback.test.js`; extend `tests/assetDescriptors.test.js`.

**Interfaces:** Add `actionDescriptor(input,{manifest=assetManifest}={})` producing frozen `{animation,frameDurationsMs,impactFrame,coordinateSize,blade,contact}`. animation uses Task1 source/frames/origin/scale; durations[120,60,100,120], impactFrame2, coordinateSize[384,384]. blade/contact contain assetKey, offset, size, layer; accepted character-cell-relative geometry is blade offset[176,65]/size[192,160]/layer4, contact offset[262,91]/size[169,113]/layer6. These dimensions describe display geometry, not texture-resolution ratios. Add `characterAction(character,category)->descriptor|null`; invalid authored descriptors throw, absent descriptor returns null. Formal metadata `rosterCatalog.P1.actionDescriptors.basic` only; every other category/character stays absent.

`ActionPlayback` API: `handle(event,descriptor)->void`, `sample(ownerId,now,reducedMotion=false)->sample|null`, `remove(ownerId)->void`, `clear()->void`; internal active map is bounded64 and keyed by owner. Sample fields: actionId, descriptor, frameIndex, flipX, bladeOpacity, contactOpacity. Start captures facing from copied event origin/target; resolve records actual resolvedAt and hit; cancel removes only matching token. Unknown/stale tokens cannot generate impact. No actor references, combat calls or timers.

- [x] Write pure phase tests with synthetic copied events:
  ```js
  playback.handle(start,d);
  assert.equal(playback.sample('a1',0).frameIndex,0);
  assert.equal(playback.sample('a1',.12).frameIndex,1);
  assert.equal(playback.sample('a1',.20).contactOpacity,0);
  playback.handle({...resolve,resolvedAt:.22,hit:true},d);
  assert.equal(playback.sample('a1',.22).frameIndex,2);
  assert.equal(playback.sample('a1',.22).contactOpacity,1);
  assert.equal(playback.sample('a1',.32).frameIndex,3);
  assert.equal(playback.sample('a1',.44),null);
  ```
  Add resolve.hit=false ->F3/recovery but contact0; cancel ->null; newer token rejects old resolve; source facing capture; repeated sample at same now unchanged; coarse late resolve begins F3; no normal resolve before start; map bound64; reduced-motion has no trail and same resolution time. Descriptor tests reject bad count/durations, impactFrame, unknown source/effect keys, invalid geometry or looping action.
- [x] Run `node --test tests/actionPlayback.test.js tests/assetDescriptors.test.js`; record RED for missing action API/metadata.
- [x] Implement descriptors and pure playback. Pending resolve must not auto-show F3/contact by elapsed time alone; F2 may hold until real outcome. Real resolve holds F3 for100ms then F4 for120ms; nominal timeline400ms. Trail follows accepted pre-impact/impact envelope and is behind actor; contact opacity decays only after successful resolve. Reduced mode shows F1, then static contact F3 without sweeping trail, and clears after the short reviewed window; no damage/cadence change.
- [x] Populate P1 metadata with Task1 geometry, using no ID condition inside playback/descriptors. Run Task3 tests GREEN plus guard; check output immutable. Checkpoint `[skip ci]`.

### Task 4: Presenter, readiness and real-event synchronization

**Files:** Modify `src/runtime/assetPresenter.js`, `src/runtime/ArenaScene.js`; create `tests/basicActionIntegration.test.js`; extend `tests/arenaAssetReadiness.test.js`, `tests/assetResidency.test.js`. AssetCache/Residency core need no budget changes.

**Interfaces:** Existing `AssetPresenter.cast(event,character,now,ability)` routes phased events to its ActionPlayback before legacy VFX logic. `prepare()` includes only encounter-authored action source/effect keys after critical Portrait/Idle readiness priority. Extend `imageFor(ownerId,descriptor,elapsed,map,playbackMode,frameIndex=null)` so event-gated action region is used instead of uniform-fps recomputation; legacy callers unchanged. Add `clearAction(ownerId)` to remove action record/effect images/pins, and `renderActionEffects(ownerId,sample,position,displaySize)` using shared descriptor geometry with horizontal mirror about actor anchor. Actor action overrides living Hit fallback but KO/new successful cast/cancel wins; base Idle/Move state selection is still computed normally for return. `ArenaScene.renderCastEvents()` passes copied phase records; actual damage/HP/numbers remain immediate on real resolution.

- [x] Add a faithful fake Phaser boundary that records texture/frame, position/size, visibility/flip/depth and destroy, but use real sessions/catalog/cache/presenter. In `actual hit F3 and feedback agree`, assert no HP/spark before.18, first resolve render uses action frame x256 and one visible contact with the same actionId, later F4 x384 and base Idle/Move return. Also prove session snapshot unchanged by presenter calls.
- [x] Write tests `killing target KO keeps one source-owned contact`, `miss/cancel produces no procedural or contact burst`, `new ability replaces pending Basic without stale image`, `ordinary hit does not erase Basic`, `coarse .22 resolve starts F3`, `mirror keeps facing during moving attack`, `action feet match Idle ground within one rendered pixel`, `pause freezes normal/reduced action and VFX`, `KO overrides immediately`, and `reduced trail hidden with same HP time`. Run `node --test tests/basicActionIntegration.test.js` RED before implementing the bridge.
- [x] Implement event routing/presenter priorities, independent behind/foreground images and cleanup. A lethal contact uses copied impact geometry with source ownership, not a living-target pin that would instantly erase it. All phase branches return before the legacy generic burst; no double cast/VFX. Resolve actor image frame and render-size region consistently through explicit frameIndex.
- [x] Add readiness/lifecycle tests: first Portrait/Idle callback is still first; action+effects load before prepare.ready; no unrelated character load. Fail each new key in turn -> explicit rejection/retry, ready=false, existing HUD/actor not blank. Late completion after destroy cannot repopulate scene. Run20 repeated Restart/scene transitions with full five-roster keys, concurrent same-key actions/legacy effects and optional menu data; require scene/cache peaks<=16777216, no required failures and zero scene textures/pins after destroy. Assert exact new full-required inventory16763144 before optional eviction, not an arbitrary smaller fake width/height. Reuse actual PNG dimensions/byte metadata at transport boundary.
- [x] Run Task4 tests GREEN plus Tasks1–3 and guard. If budget/readiness/art-visibility fails, checkpoint FAIL and stop; do not continue to deploy. Checkpoint integrated local state `[skip ci]` before release work.

### Task 5: Regression, reviewed feature release and public proof

**Files:** Update only directly impacted old tests, `docs/verification/M5C_B_LUSHU_BASIC_PREFLIGHT.md`, WORK_PROGRESS.md, docs/STATE.md, action spec/workflow, and new `docs/verification/M5C_B_LUSHU_BASIC_RUNTIME.md`. Keep this plan's task boxes/results current; do not rewrite accepted art or old historical PASS evidence.

**Interfaces:** Existing `.github/workflows/m0-pages-preview.yml` builds/tests/deploys feature pushes. Final evidence records exact tested source commit, workflow/build/deploy IDs, public bundle names/hashes and new PNG hashes. Public URL is obtained from actual deployment output, not guessed. No separate manual publish or main merge.

- [x] Run `node --test tests/ability.test.js tests/basicWindup.test.js tests/lushuBasicAssets.test.js tests/actionPlayback.test.js tests/basicActionIntegration.test.js tests/assetPresenter.test.js tests/assetCache.test.js tests/assetResidency.test.js tests/arenaAssetReadiness.test.js tests/assetDescriptors.test.js tests/assetGuard.test.js`. Then `npm test` because this slice changes shared combat timing, followed by `npm run build` and `git diff --check`. Every command must exit0; record actual counts and failures by name. Fix stale P1 immediate-resolution timing expectations to advance180ms, while retaining damage/cadence/AI/Tier assertions. Do not rebaseline unrelated failures or suppress image failures.
- [x] Compare original art hashes, P2–P5 action/timing absence, all existing Move/KO descriptors, Move fps, stats/AI/Tier/reward data and Collection bindings. Review complete source diff against spec, including cast-trigger ordering, simultaneous KO, cancel/no-refund, stale-token handling, reduced-motion and finite budgets. Do not claim an independent reviewer if only self-review was performed; no automatic agent spawn. Fix direct findings and rerun affected tests before release.
- [x] Save a verified release checkpoint without `[skip ci]` on the active feature branch. Wait for the corresponding existing workflow Test/Build/Pages jobs to succeed; inspect actual failed logs if any, and do not deploy around failing CI. Reuse approved configured credentials/tools only; permission or network blockers stop with a saved checkpoint.
- [x] Fetch public HTML, referenced JS/CSS and the four new PNGs through supported access. Compare exact bytes/hashes with the tested dist; check old protected assets still resolve. Record real deployment URL and immutable public fingerprints. A pretty GIF or successful Actions status alone is not public proof. If verification access fails, mark public proof incomplete rather than invent a PASS.
- [x] Update docs/progress with actual tests, guard/budget peaks, build/CI/Pages/public evidence and precise `ENGINEERING PASS / PLAYER IPHONE SMOKE PENDING` only when all executor-owned gates pass. Docs-only closure `[skip ci]` must preserve the tested deployed source SHA. Stop for player's iPhone: first attack load, readable four poses+single true impact, movement/last-facing/Idle return, KO interruption, Pause/Restart. No next character/action/VFX or main merge.

## Self-review and current execution gate

Spec coverage:1–2 global map;3–5 Task2;6 Tasks3–4;7 Task1/readiness in4;8 Task5. All five Review Focus cases have explicit owning tests. Named fields/interfaces are shared consistently across tasks; scene/cache guard failure halts before release. Asset/display geometry is measured in Task1, not guessed from raw canvas dimensions. No production dependency or subsystem beyond the approved action lifecycle is added.

Historical planning gate (resolved2026-10-15T22:43:03+08:00): the player accepted this plan; all Tasks1–5 now executed and verified. Canonical final evidence is linked above. Do not repeat approvals or implementation. Only iPhone acceptance remains.
