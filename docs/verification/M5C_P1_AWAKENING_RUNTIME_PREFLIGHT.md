# P1 Awakening — measured runtime preflight

## Subsequent decision — 2026-10-18T10:10+08:00

Player「好確認，繼續」explicitly accepts the complete Section2 executable contract and Section3/4 source-preserving packaging proposal at fa29a9c. Runtime integration is authorized; the report below remains the immutable historical measured proposal. No integration/deploy/phone result is implied by approval.

## Status and authority

2026-10-18, Asia/Taipei. **PREFLIGHT COMPLETE / EXECUTABLE CONTRACT PROPOSED / PLAYER DECISION PENDING. Runtime NOT IMPLEMENTED; no integration ENGINEERING PASS, deployment or phone acceptance.**

Fresh fetch and PR #1 confirmed feature HEAD `a82d544028ba5e701a159b6bddb7d0ed9dfe44f4`; remote main `16f73932a0399979ba79b92f93f5ce1c1d1909b9`. PR open/unmerged. Continue `feat/m0-combat-core-20260927`, never merge main. This document's checkpoint is discoverable from its Git history; the SHA above is the measured source, not a claim that it remains the newest remote forever.

Read current AGENTS, DEVELOPMENT_PLAYBOOK, PROJECT_BOUNDARIES, top WORK_PROGRESS/STATE, DEVELOPMENT_ROADMAP, M5C_ART_ANIMATION_VFX, CHARACTER_ACTION_ART_WORKFLOW, M5C_P1_LUSHU_AWAKENING_ACTION, composite-v3 acceptance and P1_AWAKENING_V3_NEXT_WORK. Accepted poses, VFX and v3 playback remain closed visual gates. All original files/acceptance receipts/history preserved. No product source, public asset, descriptor, CI setting or gameplay changed in this slice.

Machine evidence:
- `M5C_P1_AWAKENING_RUNTIME_PREFLIGHT.json`: actual session/cache measurements, isolated geometry math and protected source hashes.
- `M5C_P1_AWAKENING_ASSET_PREFLIGHT.json`: source/normalization proof, in-memory packaging estimates, exact lossless alternatives and mirror formula checks.
- Reproduce from repository root: `node scripts/inspectLushuAwakeningRuntimePreflight.mjs` and `python scripts/inspectLushuAwakeningAssets.py`. These scripts write only the two evidence JSON files. They never run authoring scripts over approved paths.

## 1. Current engine facts

| Surface | Measured current behavior / implication |
| --- | --- |
| Ability | P1.awakening: windup0, hits3, interval120ms, total coefficient2.20, T0 range3/CD12; no movement/telegraph; canCrit=false. |
| Actual execution | 16 cases: both factions × player/AI execution × tactical on/off × left/right. Frozen independent actors isolate the skill. Actor displacement0; initial hit at0; queued deadlines120/240 are actually consumed at150/250ms with scene-sized50ms steps. No phased actionId. These cases do not prove live tactical play. |
| Damage | `applyAbilityEffects` splits2.20 equally into2.20/3, queues subsequent range checks only after a first victim exists. A first whiff currently cannot queue independent later rushes. |
| Collision | Actor model has XY points; ordinary range checks use center distance. No common physical body/hurtbox radius or actor separation exists. Telegraph circles/lanes are unrelated danger geometry. Proposed capsule radii below are NEW decisions, not measurements of an existing body radius. |
| Movement | `abilityMovement.js` changes position once at resolve; engage/reposition only, component clamp. No continuous triple movement or moving-target sweep. No solid arena obstacles. Actor centers may share coordinates. |
| Clock | `ArenaScene.SIM_STEP_SECONDS=.05`; paint can batch up to5 steps after the250ms delta clamp. Proposed80/110/135/260/280/420/470/610 boundaries become100/150/150/300/300/450/500/650 if merely polled at50ms. First30ms rush can be skipped visually. |
| Action model | `createAbilityDefinition` rejects nonzero Awakening windup. `actionDescriptor` requires exactly4 frames, impactFrame2, one blade/contact pair; ActionPlayback stores only one resolvedAt/hit and initial facing. Five poses/three resolves cannot be installed as ordinary four-frame data. |
| Renderer/events | Arena drains damage before casts; damage event exposes actionId only when supplied, not hitIndex/time. Presenter keeps only one pending impact per actor and one blade afterglow. A later cast can replace an earlier action. Reuse ownership/retention policies, but extend event identity for multiple impacts; do not synthesize HP/impact from timers. |
| Cache | All action keys currently pinned by `prepare()` for every encounter character. Inactive actions cannot be evicted from this required set. LRU alone cannot solve over-budget pinning. Cache16MiB and scene16MiB are separate RGBA estimates; their sum is not measured browser/GPU RAM. |

Current 16-case setup originally exposed probe-only mistakes: the handoff control object has no `holdPlayerControl` method, and a one-time session hold does not hold all subsequent steps. The probe now invokes the actual session method before each step. No production correction was necessary. All resulting16 cases pass.

### Tier facts to preserve

| Tier | Move speed, units/s | Awakening acquisition range | CD, seconds | Damage power multiplier |
| --- | ---: | ---: | ---: | ---: |
| T0 | 2.050 | 3.00 | 12.00 | 1.00 |
| T1 | 2.214 | 3.15 | 11.04 | 1.45 |
| T2 | 2.378 | 3.30 | 10.08 | 2.05 |
| T3 | 2.624 | 3.54 | 8.64 | 3.20 |

“CD12” and coefficients0.40/0.70/1.10 are T0 seeds. Do not reset existing Tier CD/range/power scaling. Awakening currently cannot crit; preserving the common critical pipeline means retaining false, not enabling new critical rolls. Per-hit defense/type/mitigation remain common resolver operations. The T3 last-hit changed-angle modifier must receive hitIndex2,totalHits3 and retain its existing prior-Special mobility evidence condition; do not automatically grant that condition merely because Awakening now moves.

### Weighted-damage visibility limit (isolated resolver projection)

The unmodified common resolver was also called on temporary T0 states with the **proposed** per-hit weights (no gameplay integration). For T0 P1 against T0 P1/P2/P3/P4/P5, the three amounts are respectively [2.20,7.60,14.80], [1.00,1.71,7.83], [3.28,9.49,17.77], [4.28,10.49,18.77], [1.00,3.71,9.83]. Against320HP Botuo, the first hit is only0.3125% HP and third2.4469% HP. Defense applies to every hit, so coefficient weights do not imply equally large or guaranteed visible HP steps. This is a measured numerical limitation, not permission to alter damage/HP/defense. Phone readability and actual encounter damage remain unverified.

## 2. Concrete revised executable proposal — NOT APPROVED

Recommended option: shared opt-in multi-stage action data, exact chronological movement/TOI events and bounded substeps during the action. Do not hard-code character IDs. Keep legacy action descriptors/abilities unchanged unless they explicitly opt in.

Alternatives considered: retain50ms polling (reject: loses30ms opening); globally change all combat ticks (larger unrelated regression/AI/performance surface); infer hits from GIF positions or replay cosmetic displacement (reject: false mechanics). The proposed adaptive action window changes time resolution only while a generic staged action is active; it still needs implementation/performance tests.

### A. Time, route and legal displacement

Use v3 deadlines as **nominal trajectory center-arrival checkpoints**, never guaranteed damage timestamps. Real HP/F3-contact/target burst follow the first actual swept overlap, which can occur earlier or never. This distinction is part of the player decision. Prior150/300/460,total650 real contract remains recorded and unchanged until the revised contract is accepted.

| Cast time | Authoritative motion proposal | Source / hit identity |
| --- | --- | --- |
| 0–80ms | Anticipation; caster position held; acquire one live in-range target, or manual empty-facing intent | F1; no damage |
| 80–110ms | A straight rush toward frozen target-position sample | A body/source; independent hitIndex0, coefficient0.40 |
| 110–135ms | Continue same ray, at most0.65 unit follow-through | Still hit0 window; no second hit |
| 135–260ms | B boundary-only re-aim from real current XY to same target's current XY | B return body/source; hitIndex1, coefficient0.70 |
| 260–280ms | Continue B ray, at most1.10 units follow-through | Still hit1 window; this larger overrun gives C more terminal acceleration |
| 280–420ms | C boundary-only re-aim to the same live target | Exact approved terminal F3/source; hitIndex2, coefficient1.10 |
| 420–470ms | Continue C ray, at most0.65 unit follow-through | Still hit2 window; no fourth hit |
| 470–610ms | Grounded recovery at last legal coordinate, then normal Idle/Move | No damage; finite effects expire independently |

These numerical lengths/phase transitions are executor-selected proposals, not extracted gameplay authority from preview coordinates. B's1.10 overrun differs from the illustrative preview and is explicitly pending approval.

- At starts80/135/280, snapshot **only the locked target's current position**, derive a unit ray and freeze it through that leg's follow-through. No intra-leg homing, target switch, teleport or guaranteed pursuit.
- Main approach length = min(distance to sampled target, current projected acquisition range,4.00). Follow-through is bounded by both the phase overrun above and remaining `(4.00-mainLength)`; at T0 longest main+follow3.65/4.00/3.65, never over4.00 per leg. No added Tier mobility multiplier (current ability opts out). Tier acquisition range still3.00/3.15/3.30/3.54.
- If a locked target has moved farther than the main cap, aim along its ray but end short; this can whiff. If initially absent/out-of-range in a manual cast, lock **no target for the entire action**; use displayed facing for A/C and its reverse for B, main travel1.00 each plus bounded follow-through; no late acquisition or damage. AI retains existing in-range start eligibility; both controllers use the same execution geometry after start.
- Zero-distance target: preserve last nonzero leg/facing direction, zero main length, only legal follow-through; initial overlap is still eligible once in that segment. No nudging actors or adding separation physics.
- Arena centers constrained to x[-2.3333333333,12.3333333333], y[-2,2]. Intersect the ray with the arena rectangle and truncate distance at first boundary. Do not separately clamp X/Y to create a curved wall slide; do not bounce/teleport to force the return. A boundary-shortened return can lose its crossing shape and can miss. No attack geometry outside the legal traversed path and no new obstacles.

Measured projection: **72.0000000003 stage px/unit X**, **87 stage px/unit Y**. The projection is anisotropic; measure/collide in world units, project presentation afterward. A .65 horizontal overrun is46.8px;1.10 is79.2px. A3-unit first rush is216px in30ms (100units/s); these are real high speeds relative to P1 T0 movement2.05units/s.

Stationary example (away from edges): caster(4,0), target(6,0). Center/endpoint X trace: 4@80 →6@110 →6.65@135 →6@260 →4.90@280 →6@420 →6.65@470 →6.65@610. Main approach mean speeds66.667 /5.200 /7.857units/s, so terminal main rush is faster than B. Left-facing counterpart mirrors around arena centerX5. These are computed route examples, not recorded gameplay.

### B. True swept collision, damage and independence

Proposed skill-only source sweep radius **0.30 world unit**, target hurt radius **0.25**, combined overlap radius **0.55**. These radii apply only to the new opt-in collision contract; other abilities keep their range/telegraph geometry. No hit on other enemies along the path (single locked target, no AoE). The projected combined circle is an ellipse39.6px X/47.85px Y; the larger accepted VFX footprint never becomes a hitbox.

Use relative linear point/circle TOI for every at-most10ms subinterval: relative position `p = casterStart - targetStart`, relative displacement `v = (casterEnd-casterStart)-(targetEnd-targetStart)`; solve the earliest u∈[0,1] with `|p+u*v| <= .55`. Use actual clipped caster movement and same-time target path, not target endpoint against the entire historic segment. If p already overlaps, u=0. Split another actor's teleport/reposition at its event time; never invent a continuous path across a discontinuity.

- Each action owns three independent `settled/hit` flags and `(actionId,hitIndex)` identities. Start a later segment regardless of previous misses. At first valid overlap in that segment, settle at most one hit; no repeat during follow-through. If it never overlaps, settle miss at135/280/470 respectively. “At most once” includes a zero-damage avoided result: do not retry until an avoidance status expires within the same segment.
- Resolve only genuine contact through `applyResolvedDamage`, using fixed coefficients[.40,.70,1.10], hitIndex0/1/2,totalHits3 and actual target coordinate/time. Actual defense/mitigation/type/Tier still apply separately. No coefficient redistribution after misses, no guaranteed total HP decrease2.20, no damage/critical RNG on whiff.
- Example above with stationary point target and combined radius.55: first physical contacts **101.75 /154.231 /350ms**, before the110/260/420 center-arrival checkpoints. This is the unavoidable consequence of nonzero hurtboxes with continuous swept hits. Do not delay these HP events to the GIF accents; target VFX and contact-body accent must follow these true events. If the player requires exact110/260/420 damage irrespective of radius, this recommendation is not that contract and must be redesigned before implementation.
- Target escapes before relative overlap: no damage, HP, number or target burst for that segment. Later overlap can independently produce any of the8 masks000–111. Target death after hit0/1: remaining segments finish as safe whiffs along frozen last intent (alternate B/C direction when no live sample); no retarget, corpse damage or target burst. If battle already ended, cancel all immediately instead.
- Caster KO, control interruption, scene teardown, Restart or battle end: cancel remaining movement/hits/source effects; no cooldown refund. Manual new active skill or nonzero joystick input cancels this staged action before executing new input; no hidden movement lock/invulnerability. AI cannot queue another skill/basic until610ms/end/cancel. This is a proposed cast-commitment policy, not an assertion about existing behavior.

Isolated math evidence:5 crossing/escape/tangent cases,8 independent mask combinations,20 boundary rays. These probes do NOT prove integrated target motion, interruption, damage flags, AI or runtime synchronization.

### C. Scheduling, ownership and visual synchronization

Keep default50ms ticks outside the staged action. While any actor has an active opt-in staged action (through610ms), the scene consumes its accumulator in **at most10ms** simulation intervals; split further at action boundaries and exact TOI/status-expiry/displacement events. Re-evaluate after a cast begins inside a50ms step so its first80ms boundary is not skipped. At paint, use resulting authoritative state; do not predict a sprite ahead of actor XY. At60Hz a30ms dash offers roughly1–2 paint intervals, not a guaranteed frame count on every device. Worst-case250ms render stall can still skip visual poses; preserve bounded confirmed-impact presentation without replaying simulation/HP.

All actors must advance on the same chronological subinterval, with start/end snapshots for relative sweeps. Sort ties deterministically (time,actorId,hitIndex), validate target/source liveness again after earlier same-time damage, and never emit overdue damage after battle end. This requires a focused shared session scheduling delta, not just calling old `step(.01)` and assuming current sequential actor order solves moving-target sweeps. Preserve seeded AI architecture and existing passive conditions; targeted regression must assess different sampling during the610ms action window.

Introduce opt-in data for bounded staged phases/weights/target/trajectory/collision/recovery and a5-pose descriptor. Start/segment/hit/miss/end/cancel events carry actionId,actorId,targetId,hitIndex,eventAt,source/target XY,phase direction and pose key. Only hit events with real applied damage produce damage numbers and target burst. Collision with fully avoided damage is distinguishable from a damage hit. Common actionId ownership and bounded queue protect distinct hitIndex impacts when several steps precede paint; do not overwrite three impacts into the present single pendingImpactViews slot. Duplicate event/paint is idempotent; Pause freezes simulation/FX; KO/scene exit removes attached effects. Source effects follow true caster trajectory even on whiff. Reduced motion retains static phase/source cues and true target confirmation without changing simulation.

Cast-side effects begin at80/135/280; target-contact holds80/90/130ms begin at their **real hit times**, with independent finite expiry. Retain relative accepted effect scale and the three distinct source/contact shapes; no fourth impact or invented persistent damage. At470 recover, at610 return; early cancel ends owner effects. Retained target impacts do not keep the old body's pose over a new action indefinitely. Update Arena event consumption to preserve event times rather than replacing all event timestamps with latest paint time or delaying only HP text.

## 3. Sources, scale, anchors and mirror evidence

14 receipt-bound originals/GIFs hash-verified. Each5 normalized RGBA cell was reconstructed from the exact receipt-bound original with recorded resize/translation and compared pixel-for-pixel in memory. Six padded VFX halves reconstruct exactly from the three raw pair PNGs; no threshold deletion or decoded GIF sprite extraction. Existing low-alpha noise retained.

Full five-cell review strip3200×480 violates the2048 texture dimension limit. Five separate640×480 cells cost6,144,000 decoded bytes; six full padded VFX cost26,360,420. Combined with baseline49,279,852 bytes is impossible under16MiB.

A measured derivative candidate, **not written/installed**:

- Crop all five640×480 cells with one shared logical rectangle[160,112,480,432] (320×320); restoration to original transparent canvas is byte-exact. Downsample each to128×128; atlas640×128/5poses =327,680 decoded bytes; measured PNG64,019 bytes. Full sources stay unchanged. All pose margins/alpha boxes are recorded in asset evidence.
- Six padded VFX uniformly downsample full canvases to longest dimension96 (preserving padding/ratio); decoded total186,240. Exact encoded sizes/dimensions/hashes recorded for the in-memory candidates. No independently threshold-cropped fragments.
- Action source pelvis/support anchor[320,410] →crop[160,298] →runtime[64,119.2], origin[.5,.93125]. Preview-to-stage density144/275=.523636; logical320-cell display167.5636px square, descriptor scale2.3272727 (within.05–4). Skull width32 review px becomes16.7564 stage px, rather than fitting a crouched full silhouette to standing height. Keep one whole-sequence density policy.
- Preview Idle used foot125 original px; installed Idle origin is122.1657px. Blindly copying preview ground creates a**3.1885 stage-px** support/actor-anchor discrepancy. Preserve installed Idle; use authoritative grounded anchor for new action, compare transitions in both directions. Preview acceptance is not evidence that these pivots already match.
- Actual presenter authored-action rule: on left, `setOrigin(1-originX,originY)` plus `setFlipX(true)`; effect X offsets negate about the action anchor, target effects attach to real target coordinate. Frame-center flip alone does not mirror an asymmetric pivot. Formula probes cover current Special origin.375 and proposed.5,8 sample positions; existing renderer integration tests exercise noncentral-origin correction. These are mock draw-command/math proofs, not new Phaser screen captures. Keep ordinary Idle/Move/KO mirroring policy unchanged. Per-phase facing must update from authoritative frozen ray, including B/C reversal; initial cast facing alone is insufficient.

## 4. Measured16MiB packing plan — candidate only

Current all-five required residency/cache peak **16,775,432 /16,777,216**,29 unique required images, spare**1,784 bytes**. Reservations return to0 and scene teardown removes every installed fixture texture. `prepare()` uses manifest/file PNG dimensions and real cache/residency classes, with a mock texture manager; no browser decode/GPU/RAM claim.

Keep every necessary action/portrait/Idle/Move/KO resident. Pure optional LRU/action switching cannot guarantee simultaneous P1 ally/enemy skills plus retained impacts fit; do not evict visible/required art or stall gameplay on an unready action. The following measured lossless packaging can free room while preserving every displayed source pixel:

| Existing asset | Exact candidate packing | Decoded savings |
| --- | --- | ---: |
| Botuo static Idle640×160 | Retain only its already displayed F1[0,0,160,160], no animation frame used is removed | 307,200 |
| P1 Basic512×128 | Common full-width rows10..111 (exclusive bottom), height101 | 55,296 |
| P1 Heavy512×128 | Full-width rows31..116, height85 | 88,064 |
| P1 Special320×80 | Full-width rows10..69, height59 | 26,880 |
| Chiru Move640×160 | Common full-width rows42..160, height118; retain anchor at160 | 107,520 |
| Jiuweihu KO512×512 | Full-width rows47..485, height438 | 151,552 |
| **Total** | Exact RGBA reconstruction proved except unused Botuo cells, which are deliberately not displayed | **736,512** |

Candidate action+six VFX add**513,920 bytes**. Estimated complete required set **16,552,840 bytes**, headroom**224,376 bytes**, above proposed128KiB/131,072 reserve. This estimate supports all required keys concurrently; duplicate actors reuse same texture keys. No high-resolution originals or old derivatives are overwritten/deleted.

These lossless candidates affect packaging descriptors for other approved states, not art/behavior. Subsequent integration must prove original and derivative **visible world coordinates** are identical in both directions, compensate originY=(oldOriginY*oldFrameHeight-top)/newFrameHeight and adjust descriptor scale to keep original world pixel density if max frame side changes. Retaining each frame's full width avoids horizontal center-of-flip drift. Botuo F1 keeps its same160×160 frame geometry. Origins remain in schema bounds; Chiru's retained bottom is essential to avoid originY>1. Never shrink/recolor other characters to fit.

Scene/cache each remain capped16MiB/max64; Seven new texture keys (one5-pose atlas+six VFX) bring required keys29→36. Pin replacement/new required keys, release old displays before replacing their texture, reserve uploads within cap, and stage installs to avoid old+new replacement peaks. No optional upload may consume the128KiB safety reserve; defer optional VFX/background demand under pressure. Pending transport may decode at most2 requests concurrently; browser decoded/image/GPU copies and driver allocations remain unmeasured. Cache LRU release and scene texture release are separate. Preserve visible old resources until consumers rebind; perform replacement before encounter readiness, not during a live hit. Source masters remain offline docs assets, never loaded by the battle cache.

The96px VFX/128px pose raster quality and actual renderer pixel equivalence are **not player/device verified**. If engineering visuals reject these derivative sizes, remeasure a source-preserving packing/residency plan; do not raise cap, silently evict required art, or claim the estimate is a finished budget gate.

## 5. Smallest subsequent implementation slice and checks

Only after explicit executable-contract acceptance:

1. Deterministically write/version the measured approved-source derivatives, adjusted legacy packaging descriptors and manifest; preserve originals/receipts. Validate all5 cells,6 VFX and both-facing before/after transforms, lossless RGBA restoration and decoder/reservation totals. No generative asset work.
2. Add one validated opt-in staged-action schema/lifecycle with three weights, boundary-only target snapshots, legal ray clipping, relative sweeps and at-most-once hit states. Extend the common damage event context with actionId/hitIndex/eventAt. Legacy four-frame/basic/heavy/special behavior remains unchanged. T0 CD12, coefficients total2.20; current Tier projection still authoritative.
3. Add exact subinterval chronology/adaptive action stepping, interrupts/input bridge and data-driven5-pose/multi-contact renderer/VFX; preserve each accepted source/target signature, independent impact retention and late-paint cleanup. No P1 conditionals in engine, no AI redesign or new invulnerability/DoT/AoE.
4. Focused TDD/impacted checks:8 masks with moving targets, diagonal/parallel/tangent sweep, through-path crossing, escape during follow-through, initial/out-of-range whiff, target KO after0/1, source KO/control/manual cancel, deterministic ties, wall/corner/range cap, both factions, real player button-facing bridge, duplicate callbacks/paint, three weights/max3hits, no RNG/HP/target FX on misses, Tier lastHit/modifier and all four CD/range projections, Pause/Restart/battle-end, B/C mirror,5poses/Idle transitions, reduced motion, true event/HP/VFX matching and all-required cache/reservation peaks. Cast-chain tests must include multiple steps per paint and >1 active P1 actor.
5. Build and affected regression; measure10ms-window CPU cost and renderer visibility on real runtime. Feature deployment requires a later explicit scope; this preflight gives none. Then targeted phone acceptance, followed by Hit/reactions/P1 full smoke; no P2 or main merge.

## 6. Evidence actually run and limitations

| Command / observation | Actual result |
| --- | --- |
| `node scripts/inspectLushuAwakeningRuntimePreflight.mjs` |16 baseline session cases;5 sweep examples,8 masks,20 clipped rays;4 Tier projections; baseline cache/scene metadata/header and teardown assertions pass |
| `python scripts/inspectLushuAwakeningAssets.py` |14 hashes,5 normalized source reconstructions,6 padded VFX reconstructions;6 exact packaging candidates; in-memory derivative budget and8 mirror-formula points pass |
| `node --test tests/actionPlayback.test.js tests/assetPresenter.test.js tests/assetResidency.test.js tests/assetCache.test.js tests/castVfx.test.js tests/arenaProjection.test.js` |39/39 current-contract tests pass |
| `node --test tests/specialActionIntegration.test.js tests/heavyActionIntegration.test.js tests/basicActionIntegration.test.js tests/battleSession.test.js` |69/69 baseline tests pass, including shared renderer action integrations |
| `node scripts/checkAssets.js` |Asset guard PASS,71 files,3,799,939 encoded bytes |
| `git diff --check`; changed-path/source protection |Required before checkpoint; result recorded in top progress/state |

No npm install, broad full suite, build, browser screenshot, real GPU upload, deployment or phone test performed/needed for this measurement/docs slice. The108 existing targeted tests validate baseline contracts, not the unimplemented triple dash. Isolated proposal math is not integrated ENGINEERING PASS. Real10ms scheduling/relative target paths, actor cancel semantics, physical contact accent changes, derivative visual quality and performance remain engineering work after the decision.

**Single next player decision:** accept/revise the proposed executable package in Section2: nominal110/260/420 center-arrival,610ms finish; real overlap-timed HP/target FX (example101.75/154.231/350ms),.30+.25 radii, per-leg4.00 cap, overruns.65/1.10/.65, boundary-only locked-target re-aim, wall truncation, whiff/death/manual-cancel policy and action-window10ms stepping. Also acknowledge the measured source-preserving packaging path; do not reopen approved art/GIFs. If any of these differs from intended combat, settle that exact item before implementation. Stop here.
