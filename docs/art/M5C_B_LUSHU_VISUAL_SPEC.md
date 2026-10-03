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

