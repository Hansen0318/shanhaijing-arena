# P1 鹿蜀 Awakening「南山奔襲」— Chat-first mechanics and visual preflight

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
