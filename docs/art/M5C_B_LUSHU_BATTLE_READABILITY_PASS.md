# M5C-B 鹿蜀 — Battle Readability Simplification Pass

## Status
**CHAT DESIGN PASS — PLAYER REVIEW PENDING**

This document translates the richer 鹿蜀 Concept B identity into a mobile-readable battle design.

It does not replace the concept sheet. It defines the reduced-detail battle presentation that later battleIdle / hit / KO / cast assets must follow.

Canonical references:
- `docs/art/M5C_B_LUSHU_VISUAL_SPEC.md`
- `docs/art/M5C_B_LUSHU_CONCEPT_B_HORN_SKIRMISHER.md`
- `docs/M5C_B_FORMAL_ASSET_BATCH.md`

## 1. Battle design objective

At current Arena battle scale, 鹿蜀 must remain readable primarily from large shape hierarchy rather than internal linework.

Target read:
- fast;
- lean;
- horse/deer-derived mythic humanoid;
- single red-tail mobility axis;
- light melee skirmisher.

The battle version should look like the same character as the concept sheet, but with significantly reduced surface complexity.

## 2. Identity priority hierarchy

Preserve in this order:

1. white mythic horse/deer-derived head;
2. tall lean long-legged humanoid silhouette;
3. one separated vermilion-red tail;
4. warm tawny body mass;
5. 2–3 broad charcoal tiger-marking groups;
6. compact rear-swept horn/antler silhouette;
7. one compact short curved blade;
8. slim forearm/shin rush guards;
9. minimal garment accents;
10. all decorative micro-detail.

If simplification is needed, remove from the bottom upward.

## 3. Silhouette proportions

Battle body:
- tall and narrow;
- shoulders moderate, not broad;
- waist clearly narrower than torso;
- legs visually long relative to torso;
- forearms slim;
- hooved/digitigrade lower legs readable but not over-articulated;
- tail separated from hips by negative space.

Avoid:
- broad upper-body mass;
- giant forearms;
- oversized shoulder armor;
- wide horn crown;
- long cape-like fabric.

## 4. Head / face

Battle head should preserve the species-derived mythic anthropomorphic rule.

Use:
- white head as one dominant light mass;
- compact muzzle;
- readable eye/brow region;
- short rear-swept horns/antlers;
- ears as two simple directional shapes.

Reduce:
- facial fur strands;
- tiny cheek markings;
- fine horn texture;
- small jewelry.

At battle scale, expression detail is secondary to head silhouette.

## 5. Hair / mane treatment

Concept-sheet loose hair is too detailed for battle.

Battle version:
- 2–4 major hair/mane masses;
- no thin individual strands;
- no long loose locks crossing limbs or weapon;
- rear hair should not merge with the red tail.

Hair should support head direction, not create a second trailing silhouette system.

## 6. Tail treatment

The red tail is the primary rear identity feature.

Battle tail:
- one clean large shape;
- medium-long;
- one broad curve;
- minimal internal fur lines;
- strong separation from torso and rear leg.

Do not use:
- multiple red tail strands;
- split plume branches;
- long red cloth strips next to the tail;
- extra tassels that create false tails.

## 7. Tiger markings

Use exactly a few broad groups.

Preferred:
- shoulder / upper arm;
- side torso;
- outer thigh.

Optional:
- one lower-leg accent if still readable.

Rules:
- broad, simple, high-contrast;
- no dense stripe fields;
- no thin realistic tiger pattern;
- markings must still read after downscale.

## 8. Clothing / color blocking

Use large color masses.

Recommended battle grouping:
- white head / upper neck;
- tawny body;
- charcoal garment/guard mass;
- vermilion tail;
- small dark weapon;
- optional tiny teal accent.

Garment treatment:
- fitted upper-body wrap or short tunic mass;
- one compact waist wrap;
- no layered skirt of many panels;
- no multiple hanging straps.

## 9. Weapon

Battle weapon:
- one short curved skirmisher blade;
- simple readable outline;
- one dark blade mass + one handle mass;
- minimal guard;
- no fine engraving or ornate silhouette.

Weapon length should remain compact enough not to collide visually with nearby actors.

## 10. Rush guards

Forearm:
- one slim guard mass;
- does not widen arm beyond attacker silhouette.

Shin:
- one compact front/outer shin guard mass;
- preserves long-leg read.

Avoid:
- layered plates;
- spikes;
- broad shield-like forms;
- oversized knuckle mass.

## 11. Negative-space requirements

At battle pose:
- weapon separated from torso;
- front arm separated from chest where practical;
- tail separated from body/rear leg;
- both legs remain individually readable;
- horns remain separated from hair mass;
- no large accessory fills the waist-to-tail gap.

If negative space collapses, simplify geometry before increasing scale.

## 12. Battle stance

Default idle silhouette:
- 3/4 side-facing;
- front leg loaded;
- rear leg extended;
- torso slightly forward;
- weapon low/ready;
- off-hand guard near centerline;
- head facing threat;
- tail arcs opposite torso direction.

The stance should read as mobile before any animation plays.

## 13. 48px readability check

At approximate current runtime base fit:
- head should still read as a separate white mass;
- red tail should remain distinct;
- 2–3 tiger-marking groups should remain visible as dark blocks;
- horn shape should register without internal detail;
- weapon should remain visible as one compact dark/metal shape;
- leg gap should remain visible;
- no more than 5–7 major internal color masses should compete at once.

If the character reads as mottled noise rather than large shapes, simplify.

## 14. Idle micro-animation

Keep the existing Agile humanoid structure.

Battle idle:
- tiny chest rise;
- slight ear tilt;
- one compact tail sway;
- minimal weapon/guard settle;
- tiny weight shift.

Do not animate:
- multiple cloth strips;
- many hair strands;
- independent tassels;
- large vertical bounce.

The motion should reinforce the silhouette, not fragment it.

## 15. Battle-state extension rule

Future Hit / KO / Cast variants must preserve the same simplification level.

Do not reintroduce concept-only detail into battle reaction states.

Hit:
- clear shoulder/head recoil;
- tail snap as one shape.

KO:
- clear low silhouette;
- tail loses lift;
- head/horns remain readable.

Cast/attack:
- short anticipation;
- compact weapon arc;
- no oversized decorative trail unless handled by separate VFX.

## 16. Fail conditions

FAIL if:
- white head disappears into hair/horn detail;
- tail merges with garment or leg;
- character needs costume jewelry to identify;
- tiger markings become visual noise;
- weapon/guards make the character read as Power;
- multiple trailing cloth elements imitate 九尾狐 multi-tail mass;
- limbs collapse into torso at runtime size;
- the battle version is just a downscaled concept sheet.

## 17. Current recommendation

Preserve the current Concept B as the richer presentation reference.

For battle authoring, use this simplified version:
- fewer hair masses;
- fewer garment panels;
- one clean red tail;
- 2–3 tiger-marking groups;
- simpler blade;
- simpler guards;
- larger negative spaces;
- reduced internal linework.

## 18. Next step

After player review of this design pass, the next optional Chat-owned visual step is:
**generate one simplified battle-readable 鹿蜀 concept sheet / battleIdle exploration based on this spec.**

Do not treat that image as production-approved until it passes the runtime readability review.


## 19. Simplified concept-sheet visual review

Status:
**CONDITIONAL PASS — BATTLE READABILITY DIRECTION ACCEPTABLE / PRODUCTION ASSET NOT YET APPROVED**

The newly generated simplified battle concept is materially better aligned with the global battle-readability hard rule than the richer Concept B sheet.

### What passes
- white head remains clearly separated from the torso at small scale;
- tall lean leg-driven silhouette is preserved;
- the single vermilion tail remains the dominant rear mass;
- weapon remains compact and visible;
- front/rear legs retain useful negative space;
- body does not drift into 猼訑 / 狌狌 Power mass;
- the simplified small-size previews remain recognizable across idle / run / attack / hit / skill / KO poses.

### Remaining corrections before battle-asset lock

1. **Reduce competing red trailing elements further**
   - waist cloth/tassels should be shorter and fewer;
   - weapon tassel should be removed or reduced to a tiny non-trailing accent;
   - the red tail must remain the only major rear motion axis.

2. **Simplify mane / hair one more step**
   - target roughly 3 major rear/side masses rather than many separated locks;
   - no thin hair strand should be required for identity.

3. **Keep tiger markings grouped**
   - preserve only 2–3 broad groups in battle art;
   - avoid adding extra thin stripes during final cleanup.

4. **Horn silhouette**
   - current compact vertical/rear-swept horn read is acceptable;
   - do not add additional branching or fine horn ridges in battle assets.

5. **Weapon**
   - current short curved blade footprint is acceptable;
   - simplify guard/handle ornament in final battle art;
   - remove decorative elements that create a second motion trail.

6. **Face**
   - current face remains somewhat animal-derived, which is acceptable;
   - final head pass should preserve the mythic species structure while keeping eye/brow/mouth acting readable;
   - do not move back toward a normal human face.

### Runtime-readability judgment

The ~48px reference is readable enough to continue development because:
- head, tail, weapon and legs remain separable;
- identity survives removal of micro-detail;
- silhouette still reads as Speed / Attacker;
- the character is not relying on tiny costume ornaments.

However this is not yet the final battle asset because the current concept sheet still contains more presentation detail than the runtime sprite should carry.

### Next action

Apply one final **battle-detail cleanup pass** to the design language:
- fewer red cloth/tassel elements;
- fewer hair masses;
- simpler weapon guard;
- preserve the current successful white-head / long-leg / single-tail silhouette.

After that cleanup, 鹿蜀 can move to battleIdle source authoring / runtime-size validation without another fundamental redesign.


## 20. Final battle-detail cleanup lock

Status:
**CLEANUP DIRECTION LOCKED — READY FOR BATTLEIDLE AUTHORING / RUNTIME VALIDATION**

This section converts the conditional pass into a concrete cleanup contract for the next battle asset.

### 20.1 Mandatory removals / reductions

Remove or reduce before final battleIdle authoring:
- weapon-end tassel as a trailing element;
- extra red waist cloth beyond one compact short panel;
- secondary long teal/black/red hip strips;
- small hanging charms at waist/weapon;
- fine guard engraving;
- layered belt hardware;
- thin individual mane strands;
- fine tail fur strands;
- narrow secondary tiger stripes;
- tiny cyan accents that disappear at runtime size.

These elements may remain in collection/portrait art but are not required in battle art.

### 20.2 Mandatory retained shapes

The final battleIdle source must preserve:
1. one white head mass;
2. one compact rear-swept horn/antler pair;
3. one tall lean humanoid torso/leg structure;
4. one separated vermilion tail mass;
5. 2–3 broad charcoal tiger-marking groups;
6. one short curved blade;
7. one slim forearm guard;
8. one slim shin/hoof guard language.

No additional element may compete with the tail as a major trailing silhouette.

### 20.3 Hair / mane lock

Battle mane should resolve into approximately three major masses:
- crown / upper-back mass;
- one side/rear directional mass;
- one lower rear mass if needed.

Do not render a field of separate locks.

The mane must remain visually lighter and smaller than the red tail.

### 20.4 Waist / garment lock

Battle garment language:
- fitted torso wrap;
- one compact waist wrap/panel;
- no skirt-like stack of multiple hanging panels;
- no long ribbons;
- no rear cloth mass overlapping the tail.

Garment motion is secondary to tail motion.

### 20.5 Weapon lock

Battle weapon direction:
- single short curved skirmisher blade;
- simple guard silhouette;
- simple handle;
- no trailing tassel;
- no detailed engraving;
- no second blade in the default battleIdle.

The blade supports role readability but does not carry creature identity.

### 20.6 Marking lock

Use only 2–3 broad tiger-marking groups:
- shoulder/upper arm;
- side torso;
- outer thigh.

Optional lower-leg mark only if the sprite remains clean at runtime size.

Do not restore dense striping during polish.

### 20.7 Color-block lock

Battle color hierarchy:
1. white head;
2. vermilion tail;
3. warm tawny body;
4. charcoal markings/garment;
5. dark weapon/guards;
6. optional tiny muted accent.

Avoid introducing additional high-contrast accent colors.

### 20.8 Negative-space lock

In the default battleIdle:
- blade must not overlap the torso center;
- front arm should not fully merge with chest;
- front and rear legs must remain separable;
- tail must remain separated from rear leg/waist;
- horns must remain distinguishable from mane;
- no cloth/ornament may fill the waist-to-tail gap.

### 20.9 Runtime validation target

The final battleIdle must be checked at the current intended runtime fit, approximately 48px base fit.

PASS requires:
- white head identifiable as a discrete mass;
- one red tail clearly identifiable;
- at least two broad tiger-marking groups visible;
- weapon visible but not dominant;
- leg gap visible;
- no major silhouette collision;
- no dependency on micro-linework for recognition.

If any one of these fails, simplify the source asset before integration.

### 20.10 Authoring handoff state

鹿蜀 no longer needs a fundamental visual redesign.

The next authoring step is:
**produce one battleIdle source using this locked cleanup contract, then validate the result at runtime scale before creating the rest of the battle-state set.**

Do not proceed to Hit / KO / Cast production until battleIdle passes the runtime-size gate.
