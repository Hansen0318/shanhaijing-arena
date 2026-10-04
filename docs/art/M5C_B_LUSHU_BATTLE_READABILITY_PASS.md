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


## 21. Idle micro-animation player acceptance

Status:
**PLAYER ACCEPTED — CURRENT 4-FRAME BREATHING DIRECTION**

Player accepted the latest 4-frame 鹿蜀 idle micro-animation direction.

Accepted motion language:
- no glow, aura, motion trail or idle VFX;
- feet / ground anchor remain fixed;
- the body performs a visible breathing rise / lower cycle;
- tail follows the body's breathing rhythm with vertical up/down secondary motion;
- tail does not wag left/right;
- tail does not perform a separate brushing / sweeping gesture;
- head and weapon hand may follow the breathing cycle with small coordinated motion;
- animation amplitude is intentionally increased to approximately 1.3× the earlier subtle pass so it remains visible at battle scale;
- motion must remain idle-like and must not read as attack anticipation.

The accepted direction remains subject to technical frame cleanup and runtime slicing/anchor validation before production lock.

Next step:
- prepare/validate the accepted 4-frame PNG source for runtime use;
- confirm frame consistency, transparent background, anchor stability and approximately 48px readability;
- only after that should Work integrate the idle loop through the existing M5C-A animation pipeline.


## 22. 4-frame PNG technical validation

Status:
**SOURCE CANDIDATE TECHNICALLY VALIDATED — READY FOR RUNTIME INTEGRATION SMOKE**

Validated source:
- format: PNG / RGBA;
- canvas: 2172 × 724;
- exactly four equal horizontal slots;
- frame width: 543 px each;
- frame height: 724 px;
- alpha channel present with transparent background;
- no embedded glow / aura requirement in the accepted motion contract.

Frame slicing:
- F1: x 0–542;
- F2: x 543–1085;
- F3: x 1086–1628;
- F4: x 1629–2171.

Observed opaque bounds:
- F1 local bbox: x 50–462, y 36–690;
- F2 local bbox: x 54–486, y 21–689;
- F3 local bbox: x 57–474, y 67–690;
- F4 local bbox: x 48–462, y 36–689.

Technical interpretation:
- ground / foot baseline is effectively stable at y≈690–691 across all four frames;
- vertical silhouette change is large enough to survive downscaling and visibly communicates the accepted inhale / exhale cycle;
- equal 543×724 frame slicing is deterministic;
- 48px preview remains readable as four distinct breathing states;
- no frame requires a separate canvas size or per-frame crop.

Recommended runtime contract:
- use the four equal cells from the single sprite sheet;
- keep one fixed origin / anchor for all frames;
- do not trim individual frames independently at runtime, because that could reintroduce anchor drift;
- first integration should test only the idle loop before authoring or wiring Hit / KO / Cast.

This validation is technical source acceptance, not final in-game player acceptance. The next gate is a focused runtime smoke through the existing M5C-A animation pipeline.


## 23. First runtime player-smoke findings

Status:
**FAIL — BOUNDED PRESENTATION / NAVIGATION CORRECTION REQUIRED**

Player iPhone smoke after first runtime integration found:

1. **Formal image missing outside battle**
   - Character Detail still shows placeholder tile/text instead of 鹿蜀 formal art.
   - Team Select / roster cards still use placeholder presentation.
   - Collection-facing presentation must resolve the formal 鹿蜀 image through the existing asset system rather than a new one-off path.

2. **Battle sprite too small**
   - current stage fit (~36×48) is visually undersized on the real device.
   - increase battle presentation scale/fit enough for readable character identity while preserving HUD, spacing, gameplay geometry and collision semantics.
   - do not change actor hitbox/range to match visual scale.

3. **Facing does not follow movement direction**
   - 鹿蜀 currently keeps one facing orientation while moving both directions.
   - runtime presentation should mirror horizontally from movement/facing state using the existing shared sprite presentation path.
   - do not create duplicated left/right art assets if mirroring is sufficient.

4. **BACK viewport restoration defect**
   - returning from Character Detail / Team Select / related menu routes can leave the document/viewport at an incorrect scroll position.
   - treat this as a shared navigation presentation defect, not a 鹿蜀-specific art issue.
   - restore/normalize the intended route viewport on BACK without breaking the previously accepted portrait orientation gate / return viewport behavior.

Protected:
- accepted 4-frame breathing motion;
- tail vertical breathing follow;
- no glow/VFX;
- fixed animation anchor;
- combat/AI/progression/Tier/shard/reward rules.

Do not proceed to Hit / KO / Cast until these four runtime issues pass player smoke.


## 24. Provisional presentation correction targets

Status:
**PLAYER-DIRECTED CORRECTION TARGETS — NOT YET GLOBAL HARD RULE**

Use these targets for the current 鹿蜀 correction slice, then validate on device before promoting them into project-wide production rules.

### Small-card presentation
For Team Select / Collection grid / compact roster cards:
- prefer head / face / bust-oriented presentation;
- prioritize species face, horns, ears and upper-body identity;
- do not force a full-body figure into a small card if it becomes unreadable.

### Character Detail / Info presentation
For larger character-detail surfaces:
- use a larger 3/4 or full-body identity image;
- allow the player to read the character's complete silhouette, body plan, tail and equipment;
- this surface is the correct place for richer presentation art than battle or small cards.

### Battle scale correction
Current ~36×48 stage fit is too small on iPhone.

First correction target:
- approximately 2.0–2.2× the current visual size;
- roughly 64×86 to 72×96 equivalent visible fit is a reasonable first smoke target;
- do not change hitbox, ability range, AI spacing, movement speed, collision or telegraph geometry;
- adjust only presentation scale/fit.

Do not jump directly to a ~4× scale unless later device evidence requires it.

### Static-first validation
For the correction smoke:
- static frame presentation may be used first to validate scale, facing, card/detail bindings and viewport behavior;
- once those pass, restore/verify the accepted 4-frame idle loop;
- this is a validation sequence, not removal of the accepted idle animation.

### Promotion gate
If player device smoke confirms these choices improve readability and navigation:
- perform a post-acceptance review;
- then promote the successful pattern into reusable future-character hard rules.

Until then, keep these decisions scoped to the current 鹿蜀 correction.


## 25. Placeholder-to-formal replacement correction — Chat implementation

Status:
**IMPLEMENTED IN SOURCE / EXECUTABLE VALIDATION PENDING**

Current provisional replacement contract is now implemented for 鹿蜀:

- placeholder names may identify characters before art exists;
- when the relevant formal image slot resolves successfully, compact-card name placeholders retire instead of remaining beside the image;
- Team Select selected lineup uses full-body identity art as the primary visual, with a much larger 3v3 presentation, slight overlap permitted, and a dominant central VS;
- lower roster/collection cards remain secondary and use enlarged head/bust imagery;
- in battle, a formal actor sprite replaces the solid placeholder body marker; the marker may remain only as an outline ring/stroke for selection/team feedback;
- characters without formal art continue to use their existing placeholder representation.

Implementation is deliberately conditional on asset availability so the graybox-first development workflow still works for undeveloped characters.

Do not promote this to a project-wide hard rule until player device smoke confirms the result.

## 26. Second runtime/presentation correction — source implemented

Status:
**IMPLEMENTED IN SOURCE / EXECUTABLE + PLAYER VALIDATION PENDING**

Latest player review supersedes two parts of Section 25.

### 26.1 Formal battle sprite completely replaces graybox body marker
When a formal battle actor sprite is visible:
- the original filled placeholder actor circle is hidden;
- its white outline/ring is also hidden;
- the formal sprite is the sole body representation.

Dedicated telegraphs, targeting effects, damage feedback or other explicit gameplay indicators remain separate systems and are not affected by this replacement rule.

Characters without formal battle art continue to use the graybox circle placeholder.

### 26.2 KO replacement contract
Current 鹿蜀 has no authored formal battleKo asset.

Existing battle descriptor/presenter architecture already supports the intended future replacement:
- actor enters battleKo state on KO;
- if the character has a valid/loadable formal battleKo asset or animation descriptor, that state art is rendered;
- if formal KO art is absent, current fallback keeps a static idle identity visible with KO alpha rather than making the character disappear.

Do not author 鹿蜀 KO art in this correction slice.

### 26.3 Lower Team Select roster card is an information card
Previous provisional removal of the name on a formal lower roster card is rejected.

Lower roster cards retain:
- portrait/head image;
- character name;
- Type icon/label.

Formal art improves the portrait but does not remove those information fields.

### 26.4 Upper Team Select selected lineup remains the dominant visual
The upper selected 3v3 preview should occupy much more of the available landscape height:
- substantially larger full-body figures;
- tighter team grouping;
- slight overlap permitted;
- less unused space;
- central VS remains prominent but should not consume width needed by the figures.

Space is reclaimed by shrinking the Type filters and reducing/right-aligning the BATTLE button.

This remains a provisional 鹿蜀 presentation decision until device smoke passes.

## 27. Third runtime/presentation correction — source implemented

Status:
**IMPLEMENTED IN SOURCE / EXECUTABLE + PLAYER VALIDATION PENDING**

### 27.1 Lower roster portrait framing
The lower Team Select roster card remains an information card and must retain portrait + character name + Type.

The formal 鹿蜀 portrait must not crop off the head or horns. The current source replaces the previous aggressive cover/1.28 crop with centered contain framing at approximately 0.98 scale.

### 27.2 Formal actor debug-label retirement
When a visible formal battle sprite is present, the old floating graybox/debug identity label (A/E instance identifier plus name/status text) is hidden.

Placeholder-only actors may continue to use the debug identity label until their formal art exists.

HUD portraits/HP, damage numbers, explicit telegraphs and skill UI are unaffected.

### 27.3 Battle sprite visual scale
The player requested formal battle actors be 1.5× larger than the previous accepted engineering presentation.

For 鹿蜀 this changes the visual target from approximately 72×96 to approximately 108×144 while preserving:
- actor gameplay x/y;
- hitbox;
- attack/ability range;
- AI spacing and movement logic;
- targeting and telegraph geometry.

This is a presentation-only scale correction and remains provisional until device smoke.

## 28. Player acceptance closure — 2026-10-04

Status:
**PASS / PLAYER VERIFIED**

The player verified the latest deployed 鹿蜀 presentation/UI correction on device. The accepted result includes the current formal 鹿蜀 battle readability, shared placeholder-retirement behavior, Team Select formal presentation, Stage Select layout, battle facing behavior and side-relative HUD portrait mirroring.

This closes the presentation-correction loop only. It does not authorize redesign of accepted 鹿蜀 assets and does not imply formal Hit / KO / Cast art exists.

Canonical reusable baseline:
`docs/M5C_B_ACCEPTED_PRESENTATION_BASELINE.md`
