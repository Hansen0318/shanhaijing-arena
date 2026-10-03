# M5C-B — Formal Asset Batch Integration

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

### Batch 1 — Character identity + idle motion pack
Across all five characters:
- portraitSquare
- collectionArt
- battleIdle base battle sprite
- battleIdle micro-animation source/frames or layered motion-ready source

Purpose:
- establish formal likeness;
- confirm scale/origin/silhouette;
- replace the most visible placeholders first;
- establish the battlefield idle-motion language before hit/KO/cast states.

Idle micro-animation should remain lightweight and loopable. Good examples:
- subtle breathing/body rise-fall;
- small tail/ear/feather/hair/ornament motion;
- restrained garment/appendage sway;
- tiny posture shift.

Avoid large displacement that changes gameplay readability or looks like locomotion.

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

## 4. Asset style constraints

- mobile-first readability;
- simplified shapes;
- strong silhouette;
- avoid excessive micro-detail;
- transparent battle assets where appropriate;
- consistent scale/origin conventions;
- no need for four separate sprite sets for T0–T3;
- decorative VFX must not hide damage numbers, critical text, telegraphs, joystick or skill buttons.

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

Battlefield idle motion is part of formal M5C-B presentation.

Required properties:
- loopable;
- low amplitude;
- does not move the actor's gameplay position;
- does not alter hitbox/range/telegraph geometry;
- uses battle clock / existing animation playback;
- Pause-safe;
- cleanly stops on hit/KO/cast transitions;
- resumes idle after short transient states;
- has a static fallback.

Preferred implementation:
- short sprite sequence / flipbook; or
- a layered motion-ready asset if the existing descriptor can express it without new engine architecture.

Do not start a bone/skeletal animation subsystem.

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
