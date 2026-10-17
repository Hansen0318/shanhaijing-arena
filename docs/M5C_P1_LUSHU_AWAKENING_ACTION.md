# P1 鹿蜀 Awakening「南山奔襲」— Chat-first mechanics and visual preflight

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
