# M5C-B
> **Accepted presentation baseline:** `docs/M5C_B_ACCEPTED_PRESENTATION_BASELINE.md` (PASS / PLAYER VERIFIED 2026-10-04). Future character asset integration must preserve that shared presentation/placeholder behavior.
 — Formal Asset Batch Integration

## Status
**CHAT ASSET AUTHORING / BATCH PREPARATION**

M5C-A asset pipeline is PLAYER VERIFIED.
M6C-B Tier power curve is PLAYER VERIFIED.

Formal visual integration can now begin, but Work must not be used to invent or rediscover visual direction. Chat/player first prepare and approve coherent asset batches; Work then performs only the integration/runtime delta.

## 1. Goal

Replace graybox/procedural placeholders with approved Chapter1 visual assets through the existing M5C-A manifest/descriptor pipeline.

Preserve all accepted gameplay:
- combat formulas;
- TierScalingProfile;
- AI/tactical behavior;
- telegraph gameplay geometry/timing;
- progression/rewards/accounting;
- HUD/control layout unless an actual clipping/readability defect appears.

## 2. Chapter1 roster

Formal visual roster:
- 鹿蜀 — Speed / Attacker
- 猼訑 — Power / Tank
- 赤鱬 — Blast / Support
- 九尾狐 — Blast / Attacker
- 狌狌 — Power / Attacker

Visual designs should preserve readable silhouette and creature-defining traits at mobile battle scale.

## 3. Batch order

Do not integrate one file at a time.

Preferred batch sequence:

### Authoring granularity hard rule

Within every gate, author/review **one asset at a time** from the latest approved character reference.

- Do not generate a composite sheet that bundles later-gate content.
- If the current step is `portraitSquare`, generate/review only the portrait.
- If the current step is `collectionArt`, generate/review only the full-body identity.
- If the current step is static `battleIdle`, generate/review only one static battle still.
- Do not include 4-frame Idle, Hit, KO, Cast, or Skill VFX before their gate is explicitly opened.
- A composite sheet that accidentally contains future-gate content is reference-only and cannot count as an approved production asset for those later gates.
- Downstream art must derive from the latest approved character identity; no silent redesign/species/palette/equipment drift is allowed.

### Batch 1A — Character identity + static runtime gate
Across each character:
- concept direction approved first;
- Battle Simplification pass derived from that approved concept;
- `portraitSquare`;
- `collectionArt`;
- **static** `battleIdle` base battle sprite.

Purpose:
- establish formal likeness and cross-surface consistency;
- prove silhouette / color-value separation / equipment readability;
- validate actual Team / Collection / HUD / Arena scale and mirroring;
- retire the matching placeholders through shared asset-driven logic;
- catch over-detail before animation multiplies rework.

**Static Runtime Readability Gate is mandatory before idle animation.**
At real game presentation size verify:
- identity is readable while completely still;
- head/body/weapon/major appendages remain separated;
- value/color contrast remains strong enough at mobile size;
- line density and ornament do not collapse into noise;
- ally/enemy mirroring and accepted shared scale remain correct;
- no outer-layout regression or placeholder residue is introduced.

If the static asset fails, revise the art first. Do not use animation/VFX or character enlargement to compensate.

### Batch 1B — Idle micro-animation
Only after that character's Batch 1A static runtime gate passes:
- author the lightweight `battleIdle` micro-animation frames / motion-ready source;
- preserve the accepted static design, anchor/origin, scale, silhouette and major color blocks;
- animation may add breathing, tiny weight transfer, and restrained appendage/fur/ear/tail follow-through;
- animation must not redesign the character or become necessary for identity recognition.

Idle animation should remain lightweight, loopable, Pause-safe and position-neutral.

After all five Chapter1 characters complete 1A + 1B, perform one roster-wide comparison for:
- silhouette separation;
- color/value separation;
- rendering-language consistency;
- role readability;
- animation-archetype consistency.

### Batch 2 — Battle state / reaction pack
Across all five:
- battleHit
- battleKo
- battleCast short action state

Preferred treatment:
- hit = short recoil / flinch;
- KO = clear non-combat state;
- cast = short anticipation / action pose that returns cleanly to idle.

Use the existing lightweight animation descriptor system; do not introduce skeletal rigs.

### Batch 3 — Skill VFX pack
Across all five:
- basicVfx
- heavyVfx
- specialVfx
- awakeningVfx

Existing M6B/M6C geometry remains authoritative.

### Batch 4 — Status / Tier / persistent presentation
- generic status overlays;
- mitigation/protection treatment;
- residual-area visuals;
- optional subtle Tier accents.

### Batch 5 — Chapter1 environment
- battlefield/background;
- stage preview art;
- optional chapter illustration polish.

## 3A. Playable-character body-plan hard rule

All normal playable roster characters use a **humanoid / anthropomorphic combat body plan** by default.

Purpose:
- one consistent animation vocabulary;
- simpler shared idle / locomotion / hit / KO / cast production;
- predictable equipment/weapon attachment;
- easier mirroring and battle-sprite framing;
- future-character scalability.

Creature identity is preserved through head/face, horns, ears, tails, wings, fur/feather/scale patterns, markings, claws/hooves and other defining traits.

Clothing, armor, props, tools and weapons may be newly designed for gameplay readability and are not limited to the classical text. Type / Role / ability identity may influence those choices. Examples are illustrative, not mandatory templates:
- Blast: explosive/energy-projecting tools, volatile motifs, ranged devices;
- Speed: streamlined/light gear, mobility-oriented weapons/accessories;
- Power: heavier weapons, gauntlets, armor, impact-oriented props;
- flying: wings or aerial/light equipment language.

A literal animal/quadruped playable body is an exception and requires explicit player approval.

### 3A.1 Head / face morphology hard rule

Humanoid body-plan consistency does **not** require human-face consistency.

Default playable characters should use a **species-derived mythic anthropomorphic face**:
- start from the source creature's species/family morphology;
- preserve recognizable skull / muzzle / eye / ear / jaw / horn / tusk / scale / feather structures;
- stylize those structures enough to support expression, portrait acting and battle-state readability;
- do not default to a normal human face with only decorative ears/horns.

For repeated species families such as snake, bovine, boar, deer/horse, bird or fox/canine characters, each character also needs a **creature-specific morphology layer**. Differentiate them through combinations of:
- skull width/length;
- muzzle length/shape;
- brow and eye placement;
- ear geometry;
- horn/antler topology;
- jaw/tusk/fang structure;
- scale/fur/feather facial distribution;
- markings, crests, gills or other special organs.

The target is neither a fully realistic animal head nor a reusable human-face template. It is a readable mythic creature face with enough anthropomorphic expression for idle / hit / KO / cast / portrait states.

**Production separation:** shared humanoid body/animation architecture is one rule; diverse species-derived head/face morphology is another. Do not solve animation reuse by homogenizing faces.

## 3B. Future character extensibility

The current Chapter1 animation archetypes are reusable starting points, not mandatory permanent categories.

Future characters should:
- reuse an existing humanoid animation structure when it fits;
- compose from shared motion modules when practical;
- introduce a new reusable archetype only when their locomotion / ability delivery / body-motion pattern is genuinely different;
- never receive a bespoke one-off animation architecture solely because they are a new character.

Any newly introduced archetype becomes part of the shared roster toolset for later characters.

## 3C. Concept-detail vs battle-detail hard rule

Formal character identity art and runtime battle art are different production tiers.

### Concept / portrait / collection tier
May retain:
- richer costume construction;
- secondary materials;
- ornamental hardware;
- more facial/hair/fur detail;
- additional surface markings;
- presentation-focused composition.

These assets define identity and presentation. They are **not** the source-of-truth detail density for runtime battle sprites.

### Battle tier
Battle sprites must be authored as simplified mobile assets, not as direct downscales of concept sheets.

At intended runtime fit (approximately 48px base fit for the current Arena baseline), the character must still read through:
1. body silhouette;
2. species/head silhouette;
3. major appendage(s);
4. primary color blocks;
5. 1–3 broad identity markings;
6. compact primary equipment / role cue.

Fine detail is subordinate.

### Reusable battle detail budget
Default battle-art rules for every current and future playable character:
- use few large color regions instead of many small material patches;
- use broad markings instead of dense realistic texture;
- keep hair/fur/feathers in a small number of major masses;
- minimize tiny belts, charms, buckles, seams, filigree and jewelry;
- minimize thin trailing ribbons/straps unless one is identity-critical;
- keep equipment compact enough that limbs/head/appendages remain separable;
- preserve clear negative space between limbs, tail/wings, body and weapon where possible;
- avoid stacking multiple similar motion accents behind the character;
- avoid line density that disappears or aliases at mobile scale.

### Identity priority hierarchy
Every character spec must define a short ordered list of battle identity cues. Example structure:
- Tier 1: species/head/body silhouette;
- Tier 2: major appendage or unique body feature;
- Tier 3: dominant color block / broad marking;
- Tier 4: role/equipment cue;
- Tier 5: decorative detail.

When simplification is required, remove Tier 5 before Tier 4, Tier 4 before Tier 3, and never sacrifice Tier 1–2 merely to preserve decoration.

### Readability failure conditions
A battle asset fails the gate if, at runtime scale:
- the character becomes an undifferentiated visual blob;
- head / torso / weapon / tail / wings merge into one mass;
- identity depends on details that vanish when downscaled;
- two roster characters become distinguishable only by color;
- equipment overwhelms the creature silhouette;
- decorative motion competes with damage text, telegraphs or other battle UI.

If any failure appears, simplify the battle asset before Work integration. Do not solve the problem by enlarging every character or changing gameplay geometry.

## 3D. Roster-wide rendering language hard rule

All current and future formal playable-character assets must preserve one coherent roster rendering language:

- simplified 2D cel-shaded presentation;
- clean, readable contour/shape separation;
- flat or stepped shading rather than soft painterly gradients;
- strong silhouette and large color masses;
- controlled line density;
- mobile-first readability;
- richer portrait/collection detail is allowed, but it must still look like the same character/art system as the battle derivative.

Do not introduce one-off character rendering styles such as photorealism, 3D-rendered/game-model presentation, thick painterly rendering, watercolor, sketch-only treatment, or unrelated comic/illustration systems unless the player explicitly approves a project-wide art-direction change.

This is a roster-wide consistency rule, not a requirement that all characters share the same silhouette, face, equipment, palette or pose.

## 4. Asset style constraints

- mobile-first readability;
- simplified shapes;
- strong silhouette;
- avoid excessive micro-detail;
- transparent battle assets where appropriate;
- consistent scale/origin conventions;
- no need for four separate sprite sets for T0–T3;
- decorative VFX must not hide damage numbers, critical text, telegraphs, joystick or skill buttons.

## 4A. Master vs runtime asset optimization

Formal source/master art and shipped runtime art are distinct artifacts.

Rules for every current and future character:
- keep an approved high-resolution source/master when useful for editing or regeneration;
- create a separate runtime derivative matched to the actual game footprint;
- do not ship oversized generated source PNGs merely because they pass the 2048px / 4MiB authoring ceiling;
- prefer lossless PNG optimization for transparent sprite assets unless a later pipeline decision explicitly adopts another verified format;
- preserve accepted silhouette/readability at target battle scale;
- preserve common frame canvas/origin for sprite-sheet animation loops;
- do not independently trim equal-frame animation cells if doing so can introduce positional drift;
- measure both encoded transfer size and decoded RGBA memory impact;
- retain M5C-A lazy/on-demand loading and bounded cache behavior so roster growth does not imply loading every character asset at startup.

For a new animation asset, the integration handoff should record:
1. master/source dimensions;
2. frame layout/count;
3. optimized runtime dimensions;
4. encoded runtime file size;
5. decoded texture estimate;
6. fixed anchor/origin contract;
7. the smallest runtime/player smoke needed for the changed asset.

Optimization must happen before production lock, not as an emergency pass after the roster becomes large.

## 4B. Formal-asset placeholder retirement hard rule

This rule applies to every current and future character, ally and enemy.

- Placeholder presentation is a fallback only while the corresponding formal asset is unavailable.
- When a formal asset resolves successfully on a surface/state, retire the temporary representation for that same surface/state.
- Team Select formal full-body slots must not keep development labels such as `SLOT 1`, `SLOT 2 · FRONT`, `E1`, `E2 · FRONT`, `E3`, temporary character-name blocks, or equivalent graybox text unless explicitly approved as final UI.
- Battle formal sprites must replace graybox actor dots/rings and floating A/E instance/name/debug labels; placeholder-only actors retain them.
- The same replacement contract applies to future portrait, collection, idle, Hit, KO, Cast and other formal slots as they become available.
- Implement this through shared asset availability / presentation-state logic. Do not hard-code exceptions by character ID, chapter, ally/enemy identity, or current roster membership.
- A missing formal asset must continue to fall back safely rather than disappear.

The intent is scalable roster growth: adding a future character's formal assets should automatically retire the matching development placeholders without a new per-character code path.

## 5. Authoring dimensions

Use M5C-A pipeline limits as hard ceilings:
- file <= 4 MiB;
- dimensions <= 2048×2048;
- decoded/cache budgets remain protected.

For first formal batch, prefer practical sizes substantially below the ceilings.

Suggested authoring targets:
- portraitSquare: 512×512 source, square crop-safe;
- collectionArt: 768–1024px major dimension;
- battleIdle/static: transparent source with subject fitting comfortably inside 512×512;
- VFX sheets/frames: only as large as required by visible battle footprint.

Final runtime fit remains descriptor-driven.

## 6. Battle asset framing

Battle sprites should:
- face the appropriate default combat direction or be safely mirrorable;
- keep feet/base anchor predictable;
- include transparent padding consistently;
- avoid large off-center empty regions;
- maintain silhouette at ~48px runtime base fit;
- tolerate scale adjustment without losing key traits.

## 6A. Idle micro-animation contract

Battlefield Idle motion is part of formal M5C-B presentation. Team Select upper full-body previews remain on the approved `collectionArt` identity image; when player-approved motion is required, animate that same image with bounded program-controlled breathing/transform motion rather than swapping in battle sprite sheets. In Arena, Idle is the living actor fallback whenever no more specific authored state is active.

Required properties:
- loopable;
- low amplitude;
- does not move the actor's gameplay position;
- does not alter hitbox/range/telegraph geometry;
- uses battle clock / existing animation playback;
- Pause-safe;
- cleanly yields to authored hit/KO/cast/move transitions when those assets exist;
- resumes idle after short transient states;
- missing optional living Hit/Cast art must keep the authored Idle loop moving rather than freezing on `staticFrame`; missing KO may use the static fallback until formal KO exists;
- has a static fallback.

Preferred implementation:
- short sprite sequence / flipbook; or
- a layered motion-ready asset if the existing descriptor can express it without new engine architecture.

Do not start a bone/skeletal animation subsystem.

## 6B. Compact portrait framing hard rule

For every current/future character, `portraitSquare` is authored and presented as a **face-first identity crop**:
- head/face fills most of the square;
- include only a small amount of neck/upper shoulder;
- eyes, muzzle/jaw and primary facial morphology remain fully readable;
- ears, horns, hair, fins, ornaments or other peripheral traits may crop slightly at the square edge;
- do not zoom out to preserve every appendage if that makes the face small;
- the same framing intent applies wherever `portraitSquare` is shown: battle HUD, Team Select lower roster, Collection grid and future compact character cards.

`collectionArt` / Character Detail remain full-body or larger identity surfaces and are not subject to this tight crop.

## 6C. Battlefield overhead HP presentation hard rule

Every living Arena actor displays an overhead HP bar above the actor silhouette:
- ally = blue gradient;
- enemy = red gradient;
- width ratio = live `hp / maxHp`;
- the side HUD card and overhead bar consume the same combat snapshot/state;
- no duplicate HP storage or presentation-specific HP calculation;
- formal art and placeholder actors both follow the rule;
- KO may hide the overhead bar.

The bar is presentation-only and must not alter targeting, collision, range, AI, movement, telegraph geometry or damage resolution.

## 7. Portrait / Collection distinction

portraitSquare:
- close readable identity;
- robust at small HUD/bench size;
- head/upper-body centered;
- minimal background noise.

collectionArt:
- may use fuller pose/composition;
- still consistent with same canonical design;
- should not introduce a conflicting costume/species interpretation.

## 8. VFX separation

Formal VFX is presentation only.

Never derive gameplay hit geometry from pixels.

M6B telegraph/threat and M6C area/status records remain authoritative.

If VFX size differs visually from gameplay geometry, adjust the descriptor/presentation to align visually without changing gameplay unless separately approved.

## 9. Work handoff rule

Work receives a batch only after:
- source files exist;
- player/Chat approves style/identity;
- filenames and intended slots are clear;
- any required crop/transparency decisions are settled.

Work then:
- add manifest records;
- bind character/stage data;
- configure scale/origin/animation/VFX descriptors;
- run targeted/impacted checks;
- deploy;
- request one focused player visual smoke.

Work must not regenerate/redesign approved art.

## 10. Player review gates

For Batch1, player reviews:
- likeness;
- silhouette;
- relative character scale;
- portrait crop;
- collection presentation;
- battle sprite readability.

For later VFX:
- clarity;
- visual hierarchy;
- telegraph separation;
- hit/KO readability;
- mobile performance/feel.

## 11. Stop boundaries

Do not start:
- audio;
- Chapter2 formal content;
- new economy/progression;
- stars/rarity/levels;
- complex skeletal rigs;
- unrelated HUD redesign.

## 12. Immediate next action

Prepare **Batch 1 — Character identity + idle motion pack** for the five Chapter1 characters.

No Work implementation is required until that batch exists and is approved.

## 鹿蜀 provisional state-art replacement note (pending player acceptance)

For the current 鹿蜀 validation only, the existing animation-slot contract is being exercised as follows:
- missing optional Hit/KO/Cast formal art may temporarily fall back to a static visible idle identity;
- once a valid formal state asset/descriptor exists for the state, that formal state art replaces the fallback automatically;
- no state-specific art should be authored merely to satisfy this correction before Idle/presentation acceptance.

After player smoke, Chat will decide whether this behavior should be promoted into the reusable future-character workflow.
