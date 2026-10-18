# P1 鹿蜀 Awakening「南山奔襲」— Chat-first mechanics and visual preflight

## 2026-10-18 — Awakening independent VFX and composite GIF review ready

All five character poses are PLAYER APPROVED (receipt at a353773; `docs/art/approved/lushu/awakening/phase-poses-v1/acceptance.json`). Exact approved sources remain immutable. New review-only assets: `docs/art/candidates/lushu/awakening/vfx-review-v1/` (three distinct source/impact pairs; C first clipped candidate retained separately and replaced) and `composite-review-v1/` (normal,3x slow, character-only,VFX-only,whiff GIFs, each with both directions and approved Idle return). Reproduce with `python scripts/prepareLushuAwakeningComposite.py`; verify with `python scripts/verifyLushuAwakeningReview.py`.

**POSES PLAYER APPROVED / VFX + GIF CANDIDATE / PLAYER REVIEW PENDING.** Full-canvas uniform-XY skull-density normalization, common pelvis/ground family, exact resized source insertion,16px cell margins; independent VFX split-rejoin and source contour checks;5 GIF hashes/decode/frame-count/total duration checks PASS. Actual GIF contact proof150/300/460ms and mirrored1150/1300/1460ms inspected. Effects size uses significant-alpha content, preserving full original asset, with source caps350/400/450 and impact caps180/270/400. Original low-alpha noise retained, no cleanup claim. One truncated B impact derivative was detected, deterministically re-extracted and decoded, then atomic exact-byte writes checked; no damaged derivative accepted.

**PREVIEW ONLY:** scripted route/contacts, no combat simulation/HP/damage implementation. Runtime still old0/+120/+240ms equal split/no triple dash; no ENGINEERING PASS/deploy/phone verification. NEXT: explicit player review of independent effects and normal/slow composite GIFs; only after acceptance proceed to separately bounded runtime preparation and geometry decisions. Keep real design150/300/460ms,650ms,coeff0.40/0.70/1.10,CD12; preserve Basic/Heavy/Special, no P2/main merge. Commit [skip ci] prevents automatic Pages deployment. Older pending pose text below is historical.


## 2026-10-18 — all five Awakening character poses player approved

Player at2026-10-18T08:47:38+08:00 「我確認ok」accepts poses1/2/3/5 on the five-pose review at951dac8; terminal F3/pose4 was approved earlier. Receipt and exact approved source hashes: `docs/art/approved/lushu/awakening/phase-poses-v1/acceptance.json`. **ALL FIVE CHARACTER POSES PLAYER APPROVED; VFX/GIF NOT YET APPROVED.** Preserve all shown source bytes; do not regenerate poses. Continue source-preserving common skull-density/ground/anchor normalization, independent three-stage escalating VFX and normal/slow/mirrored/effects-off/Idle-return composite GIF review. Distinguish real runtime from illustrative preview; no actual implementation/deploy/phone acceptance or P2/main merge. Approved gameplay contract is unchanged and remains unimplemented. Old pose-review-pending entries below are historical.


## 2026-10-18 — five-pose review prepared; four new poses pending

F3 likeness approval is checkpoint `bff847d0f43812e4ba6e79949a5b1ddd193ca440`; exact approved terminal source remains SHA256 `c736acca0da5fb5b6c7824a8dfb4bfb2719cf2ce99af74c54dde21773821f3d0`. Four independent new candidates were made with actual approved terminal F3 + identity.png as image inputs: F1 anticipation, A first-rush contact, B return/crossing contact, F4 recovery. Candidate originals, prompts, padded derivatives, five-pose board, light/dark QA and per-file hashes: `docs/art/candidates/lushu/awakening/phase-poses-v1/`. Reproduce using `python scripts/prepareLushuAwakeningReview.py` (Pillow).

**F3 LIKENESS PLAYER APPROVED / FOUR NEW POSES CANDIDATE / PLAYER REVIEW PENDING.** Decode/hash checks, exact source RGBA preservation and >=160px exterior-alpha padding PASS; light/dark previews inspected for complete antlers/knife/tail/limbs and visible external effects. No pixels were deleted or redrawn in packaging. Invisible raw alpha noise is retained, not cleaned; no alpha-cleanup PASS or runtime-readiness claim. Character review board uses one0.32 source-pixel scale, not final skull-density/ground/pivot normalization. Four new poses are not accepted identity sources for further generation until player approval.

**NEXT:** player reviews new poses1/2/3/5 on `five-pose-review.jpg`; pose4 is the already approved terminal F3. If accepted, perform shared-size/skull/anchor normalization and phase-direction validation before independent escalating first/second/third VFX and composite GIF review. No GIF/VFX/runtime/deploy yet; no P2/main merge. Timing and hit coefficients stay DESIGN APPROVED / NOT IMPLEMENTED. All older F3-pending text below is historical. Source/public/earlier approved actions unchanged. Art checkpoint uses [skip ci].


## 2026-10-18 — terminal F3 likeness approved; pose production continues

Player at 2026-10-18T06:47:26+08:00: 「好這個f3的形象我審核通過，紀錄github進度和相關流程規則，依照規則繼續」. Exact shown master SHA256 `c736acca0da5fb5b6c7824a8dfb4bfb2719cf2ce99af74c54dde21773821f3d0` is copied byte-for-byte to `docs/art/approved/lushu/awakening/terminal-f3-v1/F3-terminal-master.png`; receipt: `docs/art/approved/lushu/awakening/terminal-f3-v1/acceptance.json`. **F3 LIKENESS / IDENTITY PLAYER APPROVED; CONTINUATION AUTHORIZED.** This preserves the shown terminal pose; no approval of unseen phase poses, VFX, GIF, alpha changes, runtime, deploy or phone smoke is inferred. This entry supersedes older F3-not-produced/player-pending status below; those remain historical.

Continue with deterministic source-preserving transparent padding and independent character-only candidates: anticipation → first-rush contact → second return/crossing contact → exact approved terminal F3 → recovery. This is an authoring/review plan, not a new gameplay contract or acceptance of unshown poses. Extra key poses are justified by three separate contacts; do not force one generic four-pose loop. Contacts150/300/460ms, full650ms, coeff0.40/0.70/1.10 and CD12 remain design approved but unimplemented. After pose review, independent escalating VFX and composite normal/slow/mirrored/effects-off/Idle-return GIF require explicit player acceptance before runtime. No deploy/P2/main merge.

Source has invisible alpha1–8 noise; preserve immutable master. Padding must preserve every source RGBA pixel; if noise remains inside original canvas, report it rather than claim it was cleaned. No source redesign or regenerative repair of this approved F3. Runtime readiness remains a later shared-scale/anchor/budget gate. Checkpoint with [skip ci] to prevent art-only changes auto-deploying.


## 2026-10-17 — referenced terminal F3 candidate, player review pending

Recovery confirmed feature/PR1 HEAD `ac2b3d818c16d29a4b7f8d179efc0de204202dda` and remote main `16f73932a0399979ba79b92f93f5ce1c1d1909b9`. Actual approved identity/idle Git blobs match `1fddc20ac781faf4e0c3271a96de5225fde4f458` / `c0052ab9c6699d4abc2b26ce7d5d0ce1563d2543`. Reviewed approved Basic/Heavy/Special art and current ability/action/VFX runtime. Latest user handoff authorizes only image-conditioned third/final-rush F3 candidate and preservation, then STOP.

Candidate: `docs/art/candidates/lushu/awakening/terminal-f3-v1/F3-terminal-candidate-v1.png`. Exact reference binding, prompts, all three attempts and QA: adjacent `manifest.json`, `generation-prompts.json`, `QA-light-dark.jpg`. Selected image was conditioned directly on approved Basic F3; identity/idle and approved Heavy/Special were additionally inspected. The previous unreferenced Chat F3 is NOT approved and was not an input. No approved identity/action bytes changed.

**CANDIDATE / PLAYER REVIEW PENDING; NOT PLAYER APPROVED, NOT ENGINEERING PASS, NOT DEPLOYED.** Visual review retains face/antlers/palette/gear/tail/knife with complete low-forward charge silhouette. Light/dark alpha composites have no visible background glow; initial raw-RGB glow interpretation was corrected. **Strict-alpha limitation:** raw image has alpha1–8 noise reaching canvas edges, max alpha254; alpha>8 silhouette margins84/186/71/142px at1536x1024. This raw master is not runtime-ready; retain it unchanged and resolve strict-alpha/noise and padded derivative QA before GIF/integration. Do not claim alpha PASS.

Next: player reviews this terminal F3 identity and pose. If accepted, preserve exact master and resolve transparent derivative QA before further approved choreography work. No unseen pose/VFX/GIF acceptance inferred. Until explicit F3 approval STOP; no other pose, VFX, GIF, runtime/deploy/P2/main merge. Approved gameplay contract remains150/300/460ms,650ms total,0.40/0.70/1.10,CD12; existing runtime still unimplemented old behavior. Checkpoint commit uses `[skip ci]` because branch push normally auto-deploys Pages and deployment is forbidden for this candidate gate.


## Terminal F3 production brief — reference recovered, image pending

GitHub source refs confirmed on active feature branch (blob SHAs, **not** player acceptance of a newly rendered F3):
- `public/assets/characters/lushu/identity.png` Git blob SHA `1fddc20ac781faf4e0c3271a96de5225fde4f458`
- `public/assets/characters/lushu/battleIdle-4f.png` Git blob SHA `c0052ab9c6699d4abc2b26ce7d5d0ce1563d2543`

**Only third collision's F3 first; NOT first-rush generic contact.** Frame must preserve the exact approved anthropomorphic Lushu's recognizable head/antlers/face, body proportions, hoof arrangement, tail, outfit color scheme and compact held weapon, facing canonical right. Pose: body drives forward low, power visibly supported by one planted rear hoof and one extended lead leg; shoulders/antlers lead actual contact, torso stretched diagonally forward, arms/weapon readable rather than hidden, tail follows velocity without clipping. Different from approved Special turning/rotational kick and Heavy one-shot planted weapon contact. No extra horns, enlarged actor, costume redesign, motion streak baked into character, explosion baked in character or duplicates of limbs. Transparent complete single-pose PNG with generous alpha margins, consistent ground family. **Candidate remains UNAPPROVED** until player sees and confirms it. Use reference pixels for identity inspection; blob IDs are provenance, not image conditioning by themselves.

Three distinct impact beats must remain synchronized to *real* swept collisions, not a composite fake: first0.40 small wedge; second0.70 crossing fracture; third1.10 unique largest layered terminal burst, only on hit. Prepare independent right/left projected review and effects-off pose test once character source exists. Design cannot guarantee actual high-speed triple travel until runtime implementation and visual device smoke. Next Chat task is create F3 from actual approved visual source; if the creation interface cannot accept recovered GitHub art as visual reference, STOP before making a misleading ungrounded candidate and preserve this exact handoff; do not claim an image was generated or accepted.


## Player-approved P1 Awakening three-rush gameplay contract — 2026-10-17

Player「好 可以 確認紀錄github流程規則進度，然後繼續」explicitly approves the previously presented **real** three-contact schedule **150 / 300 / 460 ms from cast** and **650 ms full playback including recovery**, plus **three independent path-swept collision checks**, each at most once. Design-approved T0 hit coefficients **0.40 / 0.70 / 1.10** sum **2.20**, cooldown **12s**, no extra attack, no guaranteed contact or target impact FX on whiff. Three segments are 起衝突進 → 折返追擊 → 終結奔襲. Third segment remains independently damaging if first/second missed, and third terminal-contact F3 is the first art candidate **only after the three-phase choreography is specified**. Authoritative details: `docs/M5C_P1_LUSHU_AWAKENING_ACTION.md`.

**Status distinction:** PLAYER DESIGN APPROVED / NOT IMPLEMENTED / NO F3 ART YET. Existing runtime still immediate +120/+240ms, equal 2.20/3, range checks and no three-rush displacement. Proposed segment-boundary re-aim, target-lock, swept capsule and arena clamp are implementation preflight choices requiring geometry measurements, not license to change damage geometry/retargeting beyond this approval. Keep generic shared pipeline, AI/player parity, legacy Tier, critical/defense, 16MiB budget, accepted Basic/Heavy/Special, no P2/main merge. A design approval does not authorize bypassing the **art F3 → full poses/VFX/GIF approval → runtime integration/deploy → phone smoke** gates.



## Three-rush executable-contract proposal — Chat-first, pending player timing/geometry approval (2026-10-17)

**Approved already:** three distinct fast rushes, each independently eligible to hit, T0 coefficient weights [0.40,0.70,1.10] totaling 2.20, strongest last VFX, speed identity, whole-action contract before terminal F3. **NOT approved as implementation:** exact times, path length, swept-hit collision shape, re-aim rules, wall behavior, immunity or position changes.

### Proposed timing (real gameplay, not just preview)
| Time from cast | Event | Real HP event |
|--|--|--|
| 0–80ms | visibly compressed anticipation; snapshot intent/initial target | none |
| 80–150ms | first forward swept rush on legal arena path | hit 0 on swept collision at or before 150ms, coeff 0.40 |
| 150–300ms | recovery-to-direction then angled return/crossing rush | hit 1 if independently swept-collides, coeff 0.70 |
| 300–460ms | final fastest committed rush / terminal posture F3 | hit 2 if independently swept-collides, coeff 1.10 |
| 460–650ms | finite aftermath and grounded recovery to normal Move/Idle | no extra damage |

Above contact deadlines are visual targets, not permission to defer/force a hit or credit absent overlap. No contact = no HP event/target burst; the next segment still executes. Per-segment at most one hit; each hit uses a single distinct hitIndex and genuine target coordinate on confirmed swept overlap. Critical/damage RNG evaluated **only** for actual collisions; existing per-hit crit, mitigation and Tier scaling preserved. No fake HP/number or target burst.

### Proposed route and runtime safeguards
- **Single acquired target** for the skill's three segments; do not silently retarget another enemy after a miss/KO. Each segment determines its direction from the current actual caster and live surviving target position at segment start, constrained to fixed bounded travel distance and arena bounds. Re-aim only at segment boundaries, not homing within a segment. No teleport. A brief detour/return arc establishes the second direction visually while staying inside legal bounds; third is a decisive forward charge. Exact travel distance/width and acceleration to be measured against arena scale and confirmed before coding.
- Use swept capsule / segment-vs-target hurtbox overlap **along the authoritative traversed path** (not only center-to-center distance at due time). Each segment records hit/miss once, with no multiple hits from frame subdivision. If target steps out before actual overlap, that segment misses. If later segment physically reaches target, that segment can hit even when previous ones missed.
- Target dies before a later segment: do not assign further damage to dead target; allow safe whiff/clean recovery. Caster KO / interrupt / battle-end cancels pending movement/damage/VFX, preserving actual cooldown semantics. Avoid damage outside legal arena, no wall-passing or force beyond bounds. No new AoE, knockback, DoT or guaranteed stun; no auto-target-switch.
- Position must be updated by shared real combat model (player and AI identical), not visual-only sprites, and render interpolation/camera/VFX must follow real position. Contact F3 and third true impact frame must coincide with hit 2. Reduced-motion cuts camera shake/trails but never alters simulated travel/hits. Whiff still renders **source** motion/trail, not fake **target** impact.
- Validation matrix: hits 000, 001, 010, 011, 100, 101, 110, 111; moving-away dodge, crossing collision, target death after first/second, wall clamp, mirror, interruption, restart, AI/player parity, Tier behavior, 16MiB required texture budget, full 650ms limit, source F3 pose and independently distinguishable hit1/hit2 VFX. Verify three damage events max, weighted total if all hit, no phantom damage when none do.

### Design decision still required before F3
The user's latest 「好，繼續」 continues design and authorizes documentation, **not** explicit approval of new actual hit times, trajectory/collision geometry or gameplay modifications. Present the 150/300/460ms and overall 650ms timing with segment-boundary tracking/swept collisions as a concrete proposal for player approval. Do not hand a runtime Work task or render F3 until this contract is settled. Existing implementation remains 0/+120/+240ms, equal split, range-based pending hits and zero active dash movement.


## P1 Awakening approved independent hit weighting — 2026-10-17

Player「好我同意 妳把這些紀錄到github相關文件然後繼續」approves the proposed **design** for 「南山奔襲」: three individually collision-qualified hits with increasing *base coefficients* **0.40 / 0.70 / 1.10**, sum **2.20** (T0 baseline), not conditional combos. Third hit must retain coefficient1.10 if hits1/2 miss; no guaranteed hit, no fake HP, no fake target burst. Only real collision at each event can generate that hit's damage and target-attached impact VFX. First VFX smallest, second intermediate, final largest and most distinct; on phone compare independently rendered damage text, true HP bar steps and effects, and preserve existing defense/crit/Tier semantics. Actual visible HP significance is **not verified** until combat/phone test; visual legibility is not permission to change HP or give invulnerability. This supersedes equal-per-hit coefficient as a **future implementation requirement**, not a claim runtime already changed: current `battleSession.js` divides 2.20 evenly and checks later hits by range, not path collision; current ability lacks triple displacement. Keep 3 hits, CD12, total2.20; change timing/travel/hit geometry only after separate fully specified contract and approval. Multi-hit weight arrays must use generic shared data-driven schema, no P1 conditional runtime exceptions. Do not generate terminal F3 until choreography/real mechanics constraints reviewed; do not modify Basic/Heavy/Special/P2/main.



## Player-approved design order — three rushes BEFORE terminal F3 (2026-10-17)

Player approves the **sequence and overall concept**: three fast collisions: (1) 起衝突進, (2) 折返追擊, (3) 終結奔襲. Finish whole-action choreography, travel paths, hit↔motion↔VFX mapping and visual distinction *before generating F3*. The **first art-review image** will be third hit's terminal-contact F3, not first impact. Player has **not yet approved** specific collision distances, durations, displacement mechanics, contact poses, effects or a change to the runtime gameplay. This corrects the earlier generic F3-first shorthand, which remains valid only **after** the full triple-hit design gate.

### Choreography proposal for separate review, not approved gameplay
| Phase | Proposed movement and silhouette | Independent target VFX | Engine alignment constraint |
| --- | --- | --- | --- |
| A 起衝突進 | Compress low then launch in a direct fast approach; forward knee/hoof/antler silhouette | narrow wedge pressure burst, small fracture ring | Hit 0; do not claim actual travel currently exists |
| B 折返追擊 | rebound / sharp angled return, unmistakably different body twist | cross-shear streaks and double-edge radial crack | Hit 1; current engine resolves +120ms after hit 0 |
| C 終結奔襲 | strongest planted forward collision with lowered antlers and separated limbs; this is **terminal F3** | largest layered ridge-shatter/pressure-ring burst with finite fade, on true target | Hit 2; current engine resolves +240ms after hit 0 |
| Recovery | stabilize at legal arena coordinate and return to Idle/Move | finite wake expires with skill | no fourth damage event |

**Engineering decision pending:** current `P1.awakening` has 0ms windup, three 0/+120/+240ms damage hits, no movement field. A readable real triple traversal and rebound almost certainly requires an explicitly chosen travel/timing contract; do not silently implement one, nor animate fake gameplay displacement unconnected to actor position. Separate the player-approved *theme/workflow* from proposed geometry and real timing. Preserve T0 cooldown12, coefficient2.2 total, three true hits, targeting/range, Tier scaling unless player explicitly authorizes a bounded change. Any actor motion must synchronize authoritative position, combat hit events and VFX, deal safely with target death, walls, interruption, facing, whiff, AI and reduced-motion. No invented DoT/AoE/extra hits.

**Next Chat-owned deliverable:** complete technical choreography options and verification of engine semantics; request player approval of proposed real movement/timing if change is necessary. Only then generate terminal F3 from exact approved identity; subsequent first/second impact pose set may need more than four total poses. Do not create artwork based only on prose without recovering canonical approved identity; do not start Work yet.


Status: **DESIGN PREFLIGHT / F3 ART NOT YET AUTHORED OR PLAYER APPROVED** (2026-10-17 Asia/Taipei). P1 Basic, Heavy, Special are player verified; P1 Awakening next; Hit/reactions and full P1 character smoke follow. No P2, no main merge.

## Verified gameplay contract
Source: `src/roster/abilities.js` and `src/combat/battleSession.js`.
- Ability ID `P1.awakening`, name `南山奔襲`, T0 cooldown **12 seconds**, effect coefficient **2.2 total**, `hits:3`, `hitInterval:.12`; target enemy; no authored Awakening windup (currently **0 ms**), no explicit movement/dash/AoE/DoT in this ability definition.
- Existing resolver applies hit index 0 immediately on ability-effect resolution and queues hit indices 1/2 at +0.12/+0.24 seconds; split coefficient per hit is existing resolver behavior. This timing is a current fact, **not authorization to move actual HP/RNG events**.
- The name/description `三段奔襲` is a visual theme. Do **not** invent gameplay relocation, multiple target acquisition, new hitboxes, extra hits, projectile, lingering damage, or a charge movement effect. Any proposal to delay actual impact to line up with authored animation requires a separate explicit real-timing decision and shared-engine implementation.
- This gameplay mechanism differs from currently implemented P1 Special (real320ms diagonal reposition, single hit), Heavy (forward engage, one hit), Basic (short grounded strike). The visual must distinguish all four with effects disabled.

## Art-direction proposal — unapproved
Use the **exact approved P1 identity and battle silhouette** (repository `public/assets/characters/lushu/identity.png`, approved idle/Move/KO and accepted Basic/Heavy/Special art) as the only identity source. No new horns, outfit, colors, or large weapon. Canonical faces right, runtime mirrors left.
- **Key contact F3 proposal:** grounded, powerful *straight-on antler/hoof driving impact*, deep bent supporting leg, torso and shoulders strongly thrust forward, small canonical weapon remains visible and intact; silhouette *not* the Special rotational kick or Heavy planted single weapon blow. Allow ample transparent margins, full antlers/tail/weapon/feet, consistent foot baseline. Character-only, transparent canvas, no baked-in light.
- **Sequence conceptual breakdown:** F1 low-slung gathered charge, F2 extended driving stride, F3 committed horn/hoof contact, F4 recoiling spring/next-stride reset. These four represent a proposed pose family, not a false promise that a four-frame sprite by itself depicts 3 independent actual hits. Before composite GIF, map **three distinct actual impact accents** to hit0/hit1/hit2; additional key poses/in-betweens may be necessary, must be assessed without inventing hits.
- **Independent VFX:** source wake with angular earth/wind pressure chevrons; three separate target impact pulses with clearly differentiated crescents/radial fracture shapes, escalating emphasis toward third impact, and a **finite** largest shattered-ridge/pressure-ring finale at the actual third damage event. VFX behind source/target layers as appropriate. Do not use the same Special rotational halo scaled up; avoid HUD occlusion. No burn/poison/DoT because ability does not have those statuses.
- Power hierarchy: Basic < Heavy < Special < Awakening at consistent phone display scale, both outgoing and true-hit feedback. Reduced-motion static key readability and mirrored effects needed.

## Mandatory gates
1. Inspect actual P1 approved identity/asset hashes and visual reference; inspect full multi-hit event/displacement/reaction playback before any art or timing claim.
2. Author **only the character-only F3 candidate** from immutable approved identity; verify exact species/gear, anatomy, alpha, padding, reference provenance, and show player. This document is **not** approval of F3 or VFX.
3. After explicit F3 acceptance, author individual F1/F2/F4 (or formally justified extra distinct contact poses), normalize into safe transparent cells with stable scale/baseline/no bleed; inspect independent source/target VFX, then composite right/left effects-on/off normal/slow GIFs. Obtain player approval separately for poses, VFX, GIF.
4. Read-only campaign/runtime timing preflight determines real hit0/1/2 visual sync and current action events. Preview timeline is **not** real timing approval. Ask player about any material simulation timing change.
5. Only after approvals, finish Chat-safe source prep and bounded docs. Work receives only irreducible checked-out runtime integration/tests/build/Pages/public fingerprint. Player phone smoke is separate, never inferred from engineering PASS.
6. Respect texture cache cap **16,777,216 decoded bytes**; P1 Special deployment used **16,775,432**. Measure any proposed new resident textures; preserve approved sources, deterministic derivatives, no automatic cap increase/eviction.
