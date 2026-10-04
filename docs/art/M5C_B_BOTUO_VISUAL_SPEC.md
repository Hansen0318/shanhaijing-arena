# M5C-B Batch1 Visual Spec — 猼訑

## Status
**CONCEPT DIRECTION READY FOR PLAYER REVIEW — IMAGE NOT YET APPROVED**

This spec inherits the accepted roster-wide presentation and asset rules from:
- `docs/M5C_B_ACCEPTED_PRESENTATION_BASELINE.md`
- `docs/M5C_B_FORMAL_ASSET_BATCH.md`
- `docs/art/M5C_B_CHAPTER1_VISUAL_DIFFERENTIATION.md`

Do not modify accepted 鹿蜀 assets or shared Stage/Team/Battle layout while authoring 猼訑.

## 1. Gameplay identity

- Character: 猼訑
- Type: **Power**
- Role: **Tank**
- AI/profile read: **front_guard**
- Combat read: durable frontline protector, absorbs pressure, holds space, protects allies.
- Movement/readability must communicate weight and stability rather than chase speed.

## 2. Core silhouette

Humanoid / anthropomorphic biped.

Primary silhouette:
- broad shoulders;
- thick upper torso;
- planted hips/legs;
- low, stable center of gravity;
- defensive symmetry;
- large curved horns creating the top silhouette;
- dense neck/shoulder fur creating a compact mantle mass.

Avoid:
- tall/lean Speed proportions;
- hunched gorilla/bruiser posture;
- oversized punching fists as the main read;
- full medieval knight silhouette;
- literal quadruped sheep/goat anatomy.

The first read at battle scale must be:
**horned, broad, planted protector**.

## 3. Head / face morphology

Use a species-derived mythic sheep/goat face, not a human face with horns.

Required:
- shorter broad muzzle;
- strong brow;
- heavy cheek/jaw structure;
- wide-set eyes;
- large curved horn bases visibly attached to the skull;
- ears separated enough from horns to remain readable;
- dense fur transition from jaw/neck into shoulder mantle.

Expression:
- calm;
- unyielding;
- alert rather than enraged.

Avoid:
- handsome human-face template;
- deer-like delicate muzzle that collides with 鹿蜀;
- demon/goat horror exaggeration that turns the character into a villain caricature.

## 4. Horn design

Horn silhouette is a Tier-1 identity cue.

Recommended:
- one large pair of thick backward/outward curves;
- compact enough to fit portraitSquare and Team Select without clipping;
- strong outer arc;
- simplified surface treatment;
- no dense ridges that disappear at mobile scale.

The horn pair should frame the head, not become a giant horizontal weapon system.

## 5. Equipment direction

### Current recommended concept direction
**Shield/bracer-led protector**.

Primary equipment:
- one oversized protective forearm/bracer surface on the forward arm;
- secondary compact heavy gauntlet / impact guard on the other arm;
- limited shoulder armor integrated into the fur/torso mass.

Why this is preferred:
- reads Tank immediately;
- separates 猼訑 from 狌狌, whose attack identity belongs in large striking forearms/fists;
- keeps one clear protection surface between allies and enemies;
- integrates naturally with guard / mitigation / area-impact animation language.

Optional:
- a short compact mace or impact baton may exist as a secondary prop only if it does not become the main silhouette.

Avoid:
- giant two-handed hammer;
- paired boxing gauntlets;
- long spear;
- tower shield that hides the whole body;
- ornate weapon silhouette that competes with horns.

This equipment choice remains **recommended, not final locked**, until player concept approval.

## 6. Clothing / armor

Use few large material masses.

Recommended:
- dark fitted underlayer;
- broad chest/waist wrap;
- iron/stone protective pieces;
- muted gold accents;
- dense shoulder/neck fur.

Armor coverage:
- strongest on shoulders/forearms;
- moderate torso protection;
- legs comparatively simpler so the planted stance remains visible.

Avoid:
- many small plates;
- dangling straps;
- layered skirt panels;
- tiny buckles/charms;
- ornamental spikes.

## 7. Color direction

Dominant:
- stone gray;
- dark brown;
- iron charcoal;
- muted gold.

Secondary natural tones:
- off-white / pale beige fur accents;
- restrained warm earth tones.

Power readability should come from mass and equipment first, not saturated color.

Do not overlap strongly with:
- 鹿蜀 tawny + vermilion motion axis;
- 狌狌 deep brown + oversized forearm attack read.

## 8. Battle identity priority hierarchy

Preserve in this order:

1. **large curved horns + sheep/goat head silhouette**
2. **broad planted Tank body**
3. **dense neck/shoulder fur mantle**
4. **forward protective bracer/guard surface**
5. stone/brown/iron large color blocks
6. secondary armor details
7. decorative surface texture

If simplification is needed, remove from 7 upward. Never sacrifice 1–4 to preserve ornament.

## 9. portraitSquare

Composition:
- head + upper torso;
- 3/4 angle;
- both horn arcs readable;
- no horn crop;
- face large enough to read expression;
- protective shoulder/fur mass visible.

Expression:
**steady / guarded / dependable**.

Portrait must not look like:
- berserker rage;
- generic armored human;
- slim goat mage.

## 10. collectionArt / full-body identity

Pose:
- 3/4 frontline guard stance;
- feet clearly planted;
- torso square;
- forward bracer between body and threat;
- secondary hand ready but not overextended;
- horns clearly separated from shoulder silhouette.

The pose should visually say:
**“I hold this line.”**

Do not use an attack-lunge pose for the identity master.

## 11. battleIdle base

Battle silhouette:
- knees slightly bent;
- chest stable;
- weight centered;
- forward bracer raised;
- free hand/secondary guard near torso;
- head aimed toward threat;
- no exaggerated weapon extension.

At small scale:
- horn arc;
- shoulder width;
- bracer face;
- leg separation

must remain readable as four distinct large-shape cues.

## 12. Idle micro-animation

Use the same lightweight four-frame production philosophy accepted for 鹿蜀, but with a different motion signature.

Suggested loop:
- F1 neutral guarded stance;
- F2 slow chest/shoulder rise;
- F3 peak breath with tiny head/horn settle and slight fur lift;
- F4 return toward neutral.

Secondary motion:
- minimal neck/shoulder fur compression;
- tiny bracer/guard hand follow;
- extremely small weight transfer.

Do not use:
- side-to-side horn swinging;
- repeated shield pumping;
- stomp;
- attack wind-up;
- large body bob;
- VFX/glow.

Gameplay actor position and feet anchor stay fixed.

## 13. Battle simplification gate

At intended mobile size, pass only if:
- head is not swallowed by horns/fur;
- both legs remain separable;
- forward guard does not cover the entire torso;
- shoulder fur reads as one mantle mass rather than many strands;
- armor surfaces use broad shapes;
- no fine horn ridges are identity-critical;
- no secondary prop visually turns the Tank into a bruiser.

If the concept only reads correctly when enlarged, simplify before integration.

## 14. Collision control vs 狌狌

This distinction is mandatory.

### 猼訑
- width concentrated in shoulders/torso;
- defensive symmetry;
- planted stance;
- guard/bracer surface;
- calm/protective posture.

### 狌狌
- width concentrated in forearms/hands;
- forward lean;
- asymmetrical attack posture;
- striking/chase equipment;
- spring-loaded aggression.

Never solve both with the same large-gauntlet silhouette.

## 15. Future Batch2 direction

Not authorized yet; recorded only for continuity.

- Hit: short heavy recoil, guard remains visually present.
- KO: weight-driven grounded collapse / failed brace.
- Cast: planted guard/impact anticipation with minimal translation.

Do not author Hit / KO / Cast during this concept slice.

## 16. Player concept gate

Before any final portraitSquare / collectionArt / battleIdle production asset is locked, player review must confirm:

1. body reads as Power / Tank before color;
2. head reads as mythic sheep/goat rather than human + horns;
3. curved horns are distinctive but not oversized;
4. protective bracer/shield direction is acceptable;
5. silhouette is clearly different from 狌狌;
6. portrait and full-body pose feel like the same character;
7. concept can be simplified cleanly for mobile battle use.

## 17. Immediate next action

Create/review **one 猼訑 humanoid concept image** using the recommended shield/bracer-led protector direction.

Do not generate production portraitSquare / collectionArt / battleIdle yet.
Do not start another character.
Do not start Hit / KO / Cast or VFX.


## 18. Concept A review — 2026-10-04

Status: **DIRECTIONALLY USEFUL / NOT APPROVED**

Strengths:
- broad planted Power/Tank silhouette reads correctly;
- mythic sheep/goat head and large curved horns are immediately identifiable;
- front-guard/protector role is clear;
- shoulder-fur mantle supports the heavy upper-body read;
- shield/bracer-led equipment direction separates the character from 狌狌.

Required correction before player approval:
- reduce overall ornament density substantially;
- simplify armor into fewer large masses;
- reduce tassels, cords, plaques, tiny gold details and layered garment pieces;
- simplify horn surface detail;
- reduce red accents so they do not compete with 鹿蜀/九尾狐 identity language;
- replace the highly ornamental beast/lion-face shield sculpture with a simpler broad protective bracer/guard silhouette;
- ensure the forward guard does not obscure too much torso/arm readability;
- keep the face more mythic sheep/goat than heroic fantasy-warrior;
- concept rendering must stay within the roster-wide simplified 2D cel-shaded language.

The small 4-frame figures shown in Concept A are **visual mockups only**, not authored/integrated battleIdle frames and not production assets.

### Concept B target
Preserve:
- large curved horns;
- broad shoulders and planted stance;
- white/cream goat face;
- dark shoulder-fur mantle;
- one clear forward guard surface;
- stone / dark brown / iron / muted-gold palette.

Simplify:
- one main torso armor mass;
- one main waist cloth mass;
- one main bracer/guard mass;
- minimal secondary hand protection;
- very few decorative accents;
- clean negative space around head, arms and legs.

Concept B should read correctly from silhouette and 4–6 major color masses before any small details are visible.
