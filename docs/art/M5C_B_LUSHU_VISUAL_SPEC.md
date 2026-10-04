# M5C-B Batch1 Visual Spec — 鹿蜀

## Status
**CONCEPT DIRECTION — CORRECTION REQUIRED / PLAYER REVIEW PENDING**

This is the first formal character-visual specification for M5C-B Batch1. It defines the canonical art direction for 鹿蜀 before final asset integration.

## 1. Source identity

Classical anchor from 南山經:
- horse-like body;
- white head;
- tiger-like body markings;
- red tail;
- voice compared to song.

The game adaptation should preserve those four visual identifiers clearly enough that the creature remains recognizable as 鹿蜀.

## 2. Game role read

Runtime role:
- Type: Speed
- Role: Attacker
- Combat identity: mobile melee skirmisher

Visual priority:
1. speed;
2. agile directional movement;
3. horn/hoof melee pressure;
4. southern-mountain mythic identity;
5. readable silhouette at mobile battle size.

Do not make 鹿蜀 bulky, armored, or tank-like.

## 3. Body design

Overall silhouette:
- humanoid / anthropomorphic biped combat body;
- lean athletic proportions rather than bulky mass;
- digitigrade or hoof-influenced lower-leg treatment is allowed if it remains compatible with the shared humanoid animation vocabulary;
- long, mobile silhouette with clear shoulders / torso / arms / legs;
- tail long enough to read at 48px battle scale;
- creature traits must not turn the default body back into a literal quadruped.

Head:
- predominantly white;
- deer/horse-inspired mythic facial structure on the humanoid character;
- short elegant horn/antler elements may support the horn-strike identity;
- ears swept slightly back/outward to reinforce speed;
- avoid a plain human head that loses the creature identity.
- use a species-derived mythic anthropomorphic face: clearly horse/deer-derived skull and muzzle structure, stylized enough for expressive eyes/brows/mouth and character acting;
- do not use a reusable normal-human face with only deer ears/horns added;
- do not push all the way to a fully naturalistic deer/horse head if that reduces readable expression or makes the design feel like an animal head mounted on a humanoid body.

Body markings:
- dark tiger-like stripes on a warm tawny/amber base;
- stripes should be broad and few, not many thin realistic tiger lines;
- pattern must remain readable when sprite is small.

Tail:
- saturated red / vermilion;
- treated as a strong motion accent;
- can be slightly plume-like for readability, but should still read as a tail rather than fire.

## 4. Color direction

Primary:
- warm tawny / ochre body;
- white head / neck accent;
- dark charcoal tiger markings;
- vermilion-red tail.

Secondary accent:
- restrained turquoise / cyan Speed-type accent may appear in tiny ornaments or VFX-facing details, but should not replace the canonical red tail or tiger markings.

Avoid:
- neon rainbow palette;
- full-body white;
- heavy metallic armor;
- excessive clothing coverage that hides the animal anatomy.

## 5. Anthropomorphism level

Use a **humanoid mythic-creature design**.

鹿蜀 should have a clearly humanoid combat silhouette for shared animation/ability production, while retaining unmistakable creature traits.

Allowed:
- humanoid arms/hands or clawed/hoof-inspired hands that can hold equipment;
- light armor, harness, belts, talismans, scarves, mobility gear;
- invented weapon/prop language that reinforces Speed / Attacker mechanics;
- asymmetrical accessories if they mirror safely or have explicit facing handling.

Avoid:
- literal quadruped default body;
- generic human with only decorative ears;
- heavy tank armor that contradicts Speed identity;
- long garments that hide leg motion.

## 5A. Gameplay-equipment direction

Equipment is allowed and should support the Speed / Attacker identity rather than merely copy the source text.

Possible directions, not locked:
- light paired blades / horn-shaped short weapons;
- forearm/hoof guards designed for rush impact;
- streamlined sash/scarf or talisman strips that make movement readable;
- compact mobility-focused armor pieces;
- small cyan Speed-type accents.

Do not lock a specific weapon until player visual approval. The key rule is that equipment supports the character's mechanics and shared humanoid animation pipeline without hiding the white head, tiger markings or red tail.

## 6. portraitSquare

Target source:
- 512×512;
- square crop-safe.

Composition:
- head + upper torso;
- 3/4 angle;
- white head immediately visible;
- one or two bold tiger markings visible on shoulder/neck;
- red tail may appear only as a background accent if composition permits;
- expression alert / energetic, not aggressive monster grimace;
- minimal clean background.

The portrait must read clearly in small HUD/bench size.

## 7. collectionArt

Target:
- 768–1024px major dimension.

Pose:
- dynamic three-quarter humanoid pivot / dash-ready stance;
- one leg loaded, the other transitioning as if changing direction;
- torso counter-rotated for agility;
- red tail sweeping opposite the body turn;
- enough torso/limb surface remains visible to show tiger markings.

Do not depict a full attack impact yet; this is identity art.

Background:
- restrained southern mountain / grass-rock motif;
- low-detail;
- should not compete with silhouette.

## 7A. Battle readability simplification

鹿蜀 concept / collection art may retain richer costume and equipment detail, but the battle version must use a reduced detail language.

Battle identity priority:
1. white mythic horse/deer-derived head;
2. tall lean long-legged humanoid silhouette;
3. one separated vermilion-red tail;
4. warm tawny body with 2–3 broad charcoal tiger-marking groups;
5. compact rear-swept horn/antler silhouette;
6. one compact light melee weapon / slim rush-guard cue;
7. decorative costume detail.

Battle version should simplify or remove first:
- loose hair strands beyond a few major masses;
- extra hanging straps / talismans / tassels;
- small buckles and layered waist hardware;
- fine armor seams / engraved trim;
- detailed tail hair texture;
- tiny cyan accents;
- excess garment panels;
- dense tiger striping.

At mobile scale, head, torso, legs, weapon and single tail must remain visually separable. If they merge into one mass, simplify further before asset lock.

## 8. battleIdle base sprite

Target source:
- transparent;
- subject comfortably inside 512×512;
- runtime base fit approximately 48px.

Default pose:
- side/three-quarter humanoid battle stance;
- feet/hoof-feet staggered;
- center of mass forward;
- arms positioned for a fast melee/engage identity;
- head held ready;
- tail separated from body silhouette;
- legs clearly readable for shared locomotion/hit/KO animation.

Facing:
- authored so it can be mirrored safely for opposing sides;
- asymmetric ornaments must not contain text/symbols that break when mirrored.

Anchor:
- consistent ground/hoof baseline;
- visual center close to actor gameplay center.

## 9. battleIdle micro-animation

Use a short lightweight loop.

Preferred first pass:
- 4 frames;
- approximately 4–6 fps;
- total loop about 0.8–1.2s;
- subtle chest/shoulder breathing;
- ears make a small reactive tilt;
- red tail sways 1–2 small steps;
- tiny hand/weapon/ornament secondary motion if present;
- weight shifts slightly between the two legs without looking like locomotion.

Hard rule:
- actor gameplay position does not move;
- hooves should not appear to walk;
- body vertical displacement stays small;
- no hitbox/range change;
- Pause freezes the loop;
- static fallback uses the clearest neutral frame.

## 10. Future battle-state direction

Batch2 later:
- Hit: brief recoil through shoulders/head, tail snaps opposite.
- KO: lowered/grounded posture clearly distinct from idle.
- Cast: short lean/brace pose before returning to idle.

Do not build these assets in Batch1 unless they fall out naturally from the same approved source.

## 11. Style

Target game art:
- stylized 2D;
- clean cel shading;
- no gradients required;
- clear separated color blocks;
- simplified detail;
- readable outer silhouette;
- moderate line weight;
- mobile-first.

The final look should feel like a polished game character rather than a realistic wildlife illustration.

## 12. Acceptance gate

Player reviews:
- does it clearly read as 鹿蜀;
- white head / tiger markings / red tail retained;
- agile rather than bulky;
- portrait readable;
- collection pose fits Speed/Attacker;
- battle silhouette survives small scale;
- idle motion feels alive but not distracting.

After player approves the character direction, preserve the identity across portraitSquare, collectionArt and battleIdle assets.



## Latest Team Preview / Detail correction direction — 2026-10-04
Latest explicit player instruction supersedes the previous upper selected-slot portrait interpretation: Team Select upper3v3 uses complete static identity figures and a prominent central VS; lower roster and Collection small cards use enlarged head/bust. Reuse existing approved F1 identity/portrait files; no new production art. Other characters keep their current placeholders. Battle keeps72×96 display/fixed origin/four-frame idle. Hit/cast/KO missing-art transitions keep an existing static idle frame visible at the current projected position.
Character Detail/Info remains a static larger identity image now. Future breathing animation and a species/myth-specific Shanhaijing scene background are recorded directions, not work in this slice. Future upper-lineup micro-animation is also deferred. Acceptance remains PLAYER SMOKE PENDING; Chat owns post-acceptance review.
