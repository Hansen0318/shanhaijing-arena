# M5C-B Batch1 Visual Spec — 猼訑

## Status
**CONCEPT + BATTLE SIMPLIFICATION APPROVED — STATIC ASSET PACK IN PROGRESS**

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

## 17. Historical concept-gate note

The concept-image gate described here has been completed and is superseded by Sections 19–20. Do not return to concept generation unless a later player decision explicitly reopens it.


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


## 19. Battle Simplification approval — 2026-10-04

Status: **PASS / PLAYER APPROVED**

The player accepted the simplified battle-direction image as the canonical 猼訑 battle simplification reference.

Locked from this approval:
- broad, planted Power/Tank silhouette;
- mythic sheep/goat face;
- large curved horns;
- dark shoulder-fur mantle;
- one dominant forward protective bracer/guard;
- simplified armor and fewer decorative elements than Concept A;
- stronger large color/value separation;
- simplified 2D cel-shaded rendering language;
- mobile-first readability.

This approval is for **battle simplification direction**, not yet for final runtime assets.

### Next gate — Static Asset Pack
Author/review:
1. `portraitSquare`;
2. `collectionArt`;
3. static `battleIdle`.

Do not author idle animation yet.

After those three static assets are approved and integrated, run the mandatory Static Runtime Readability Gate at real game scale. Only after that PASS may the 4-frame idle micro-animation be authored.


## 20. Roster-wide portrait / HP rules — deferred to the correct gate

The new roster-wide presentation rules also apply to 猼訑, but **do not advance its production state prematurely**.

When 猼訑 reaches its Static Asset Pack / runtime integration gate:
- author `portraitSquare` as a face-first head + slight neck/upper-shoulder crop;
- use that same portrait framing intent in battle HUD, Team Select compact roster and Collection compact cards;
- allow minor horn/ear/accessory edge crop when necessary while preserving full facial readability;
- its Arena actor must use the shared overhead HP system: ally blue-gradient, enemy red-gradient, same live HP/maxHP state as side HUD.

Until that gate, these are requirements only. They do not mean 猼訑 portrait/runtime assets are already completed or integrated.

## 21. Current production step — Static Asset Pack

Status: **IN PROGRESS**

Author/review exactly three static assets from the approved battle-simplified identity:
1. `portraitSquare` — face-first square crop, head/face + slight neck/upper shoulder; minor horn/ear crop allowed; facial structure must dominate the square.
2. `collectionArt` — full-body identity art preserving the approved planted Tank pose and simplified roster rendering language.
3. static `battleIdle` — one battle-readable still using the approved simplified silhouette, strong value/color separation, fixed feet/ground anchor and no animation/VFX.

Do not author 4-frame breathing yet. After these three static assets are approved and integrated, run the Static Runtime Readability Gate before Idle micro-animation.

## 22. portraitSquare approval — 2026-10-05

Status: **PASS / PLAYER APPROVED**

The current 猼訑 square portrait is the accepted `portraitSquare` direction.

Locked presentation:
- face-first square crop;
- mythic sheep/goat face dominates the frame;
- head plus only slight neck/upper shoulder;
- large curved horns may crop at the outer edge;
- red tassel / peripheral ornament may crop;
- eyes, muzzle, brow and primary facial morphology remain immediately readable;
- same simplified 2D cel-shaded roster language.

This satisfies the roster-wide compact portrait framing rule and is the portrait reference for Battle HUD / Team Select compact roster / Collection compact cards when 猼訑 reaches runtime integration.

### Next Static Asset Pack item
Create/review `collectionArt` only:
- full-body identity;
- preserve the same approved face/horns/colors/protector identity;
- broad planted Power/Tank stance;
- dominant forward protective bracer/guard;
- fewer lines/details than the original Concept A;
- no animation or VFX.

Do not start static `battleIdle` until `collectionArt` direction is approved.

## 23. collectionArt approval — 2026-10-05

Status: **PASS / PLAYER APPROVED**

The current full-body 猼訑 identity direction is accepted as the `collectionArt` reference.

Locked identity:
- same approved sheep/goat face and large curved horns as portraitSquare;
- broad planted Power/Tank proportions;
- dark shoulder-fur mantle;
- dominant forward protective bracer/guard;
- white / dark brown / black base with restrained red + muted gold accents;
- simplified 2D cel-shaded roster language;
- reduced ornament density compared with Concept A.

Static Asset Pack progress: 2/3 direction-approved (`portraitSquare`, `collectionArt`).

### Next exact item
Create/review **one static `battleIdle` still only**:
- battle-readable simplified derivative of the approved identity;
- fixed feet/ground anchor;
- low, stable guarded stance;
- forward protective bracer readable;
- large color/value blocks;
- fewer lines/details than collectionArt;
- no breathing frames;
- no animation;
- no VFX.

Idle micro-animation remains blocked until portraitSquare + collectionArt + static battleIdle are all approved and the Static Runtime Readability Gate passes.

## 24. Process correction — composite sheet is not a production gate result

The later composite sheet that repeated portrait/collection/reference panels and included 4-frame breathing imagery is **NOT** an approved Static Asset Pack result for `battleIdle` or Idle animation.

Current authoritative 猼訑 status:
- Concept: PASS / PLAYER APPROVED.
- Battle Simplification: PASS / PLAYER APPROVED.
- `portraitSquare`: PASS / PLAYER APPROVED.
- `collectionArt`: PASS / PLAYER APPROVED.
- static `battleIdle`: **NOT YET AUTHORED / NOT APPROVED**.
- Idle micro-animation: **BLOCKED**.
- Hit / KO / Cast: **BLOCKED**.
- Skill VFX: **BLOCKED**.

Next exact action is one **single static `battleIdle` image only**, derived from the approved 猼訑 identity. No sheet, no alternate character redesign, no four-frame animation, no VFX.

## 25. static battleIdle approval — 2026-10-05

Status: **PASS / PLAYER APPROVED**

The single static 猼訑 battleIdle still is approved.

Locked battle presentation:
- same approved sheep/goat face, horns, mantle, palette family and protector equipment identity;
- broad planted Power/Tank proportions;
- low stable guarded stance;
- fixed feet / predictable ground anchor;
- forward protective bracer remains a primary silhouette cue;
- large value/color masses remain readable;
- no animation and no VFX in this gate.

Static Asset Pack direction is now 3/3 approved:
- portraitSquare: PASS;
- collectionArt: PASS;
- static battleIdle: PASS.

### Next gate — Static Runtime Readability
Prepare runtime derivatives and integrate only the approved three static assets through the existing asset pipeline. Verify real game scale on Team Select / Collection / Battle HUD / Arena, including compact portrait framing, enemy mirror, overhead HP, silhouette, contrast, detail density, placeholder retirement and no layout regression.

Idle micro-animation remains BLOCKED until this runtime gate passes.


## 26. Current authoritative production state — 2026-10-05

This section supersedes earlier in-file process snapshots such as Sections 21–24 wherever they describe an older pending state.

Current status:
- Concept: **PASS / PLAYER APPROVED**.
- Battle Simplification: **PASS / PLAYER APPROVED**.
- `portraitSquare`: **PASS / PLAYER APPROVED**.
- `collectionArt`: **PASS / PLAYER APPROVED**.
- static `battleIdle`: **PASS / PLAYER APPROVED**.
- Static runtime integration / engineering verification: **PASS**.
- corrected runtime `identity.png` top-line artifact: **PASS / PLAYER VERIFIED**.
- Static Runtime Readability player gate: **PASS / PLAYER VERIFIED**.
- Idle Micro-animation: **AUTHORIZED / CURRENT GATE**.
- Run / movement animation: later gate.
- Hit / KO / Cast: later gate.
- Skill VFX: later gate.

Player closure — 2026-10-05:
- Team Select: PASS / PLAYER VERIFIED.
- Collection: PASS / PLAYER VERIFIED.
- Battle HUD: PASS / PLAYER VERIFIED.
- Arena static presentation: PASS / PLAYER VERIFIED.

Next exact action:
1. open **Idle Micro-animation** only;
2. use the approved static `battleIdle` as the sole visual/identity source;
3. author/review one idle animation asset/gate at a time;
4. preserve fixed feet/ground anchor, actor position, scale, silhouette, major color blocks and protector identity;
5. keep motion restrained to breathing / tiny weight transfer / minimal fur-head-bracer follow-through.

Do not regenerate portrait/collection/static battleIdle, do not create composite sheets, do not redesign 猼訑, and do not start run/move, Hit/KO/Cast or Skill VFX.


## 27. Idle Micro-animation player approval — 2026-10-05

Status: **PASS / PLAYER APPROVED — EXECUTABLE INTEGRATION PENDING**

This section supersedes the earlier suggested subtle-motion wording in Section 12 wherever it conflicts with the accepted player direction.

Approved 4-frame motion:
- **F1 — neutral guarded stance:** baseline pose.
- **F2 — strong inhale:** chest and shoulders rise clearly and substantially; torso expansion is obvious; shoulder/neck fur and hanging secondary elements lift strongly; **head remains level and must not tilt upward**.
- **F3 — peak breath / settle:** torso remains near peak expansion; head and horns perform a **medium** visible settle (not extreme); shoulder/neck fur carries large follow-through; tassels/cloth may show strong secondary motion while feet remain planted.
- **F4 — return:** body, head, fur and hanging elements return close to F1 for a clean loop.

Locked constraints:
- feet / ground anchor fixed across all frames;
- actor position and scale unchanged;
- preserve approved sheep/goat face, horn topology, mantle, protector bracer, palette and broad Tank silhouette;
- no stepping, stomp, attack anticipation, shield pumping, large translation, glow/aura or Skill VFX;
- this is Idle only; Run/Move, Hit/KO/Cast and Skill VFX remain later gates.

Chat-prepared production contract:
- file: `public/assets/characters/botuo/battleIdle-4f.png`;
- PNG with transparency;
- sheet: **640×160**;
- frames: 4 horizontal cells, each **160×160** at x=0/160/320/480;
- intended descriptor: `fps:2.5`, `loop:true`, `origin:[.5,158/160]`, `scale:2`, `staticFrame:0`;
- encoded bytes: **31,355**;
- SHA-256: `86cb5c36d7e7a7862287da77e36ec77d04198311fb37f97fcbd46a73f175f6a0`.

Next exact action is executable integration only: place the approved binary, update the manifest and P2 `battleIdle` descriptor to this exact contract, run targeted/asset-guard/build checks, deploy Pages, verify the public fingerprint, update verification/handoff docs, then stop for focused player animation/device smoke.


## 28. Idle playback correction — 2026-10-06

Status: **PLAYER DEFECT CONFIRMED / CHAT SOURCE CORRECTION COMPLETE / EXECUTABLE VERIFICATION PENDING**

Player clarified the accepted presentation contract:
- Team Select upper full-body 猼訑 preview must play the approved Idle loop;
- Arena living 猼訑 must play the approved Idle loop whenever a more specific authored state is not available/active;
- the approved four-frame art, timing and motion are unchanged and must not be regenerated.

Static source review found two concrete causes:
1. Team Select full-body preview was hard-wired to static `collectionArt` and never consumed `animationDescriptors.battleIdle`.
2. Arena missing-state fallback explicitly forced `elapsed=0`, freezing a living actor on F1 whenever optional Hit/Cast art was unavailable. 猼訑 currently has Idle but no formal Hit/Cast, so combat transitions can repeatedly present a static F1 fallback.

Chat source correction:
- shared menu helper now consumes an authored battleIdle sprite sheet for Team Select full-body preview, with reduced-motion/static fallback and collectionArt fallback;
- Team Select uses that helper when a character has >1 Idle frame;
- Arena living missing-transient fallback keeps the authored Idle loop moving; KO fallback remains static until formal KO exists.

Separate player defect still open:
- iOS/Safari page reload can leave a large solid block / underfilled campaign surface. Static inspection narrows this to the shared viewport/root sizing path: `viewportSync` writes the Campaign root to the transient `visualViewport.height`; the screenshot is consistent with an initial/stale short visual viewport measurement leaving the lower layout viewport exposed. Because this is shared iOS viewport lifecycle behavior, do not guess a source fix without executable Safari/browser evidence.

Next exact action:
1. run targeted tests/build for the Chat source correction;
2. deploy;
3. verify Team Select Idle and Arena Idle playback technically;
4. reproduce the reload underfill on iOS/Safari or an equivalent controlled viewport harness, make only the smallest proven viewport correction, and re-run the targeted viewport/route checks;
5. stop for player smoke. No art regeneration and no Run/Move/Hit/KO/Cast/VFX authoring.


## 29. Team Select identity restoration — 2026-10-06

Status: **PLAYER CORRECTION / CHAT SOURCE RESTORED / DEPLOY VERIFICATION PENDING**

The player rejected replacing the approved Team Select full-body identity image with the battle Idle sprite sheet. This section supersedes the Team Select-specific statements in Section 28.

Locked correction:
- Team Select upper full-body 猼訑 preview uses the previously approved `collectionArt` identity image.
- Do not substitute `battleIdle-4f.png`, its individual runtime frames, or another battle derivative into that selection-image slot.
- The Arena Idle playback correction remains valid and unchanged: living missing-Hit/Cast fallback must keep the authored Idle animation advancing rather than freeze on F1; KO missing-art fallback may remain static.
- The approved four-frame battle Idle asset remains an Arena battle-state asset.
- If Team Select animation is revisited later, it must be a separate approved presentation treatment that preserves the approved Team Select visual composition rather than swapping in the battle sprite sheet.

Chat source restoration:
- `src/roster/view.js` upper full-body preview restored to `collectionArt`.
- menu-only `decorateIdlePreview` battle-sprite substitution removed.
- targeted menu test now protects the approved Team Select collectionArt path.

The iOS/Safari reload-underfill correction and Arena Idle correction are not reverted by this change.

Next exact action: targeted executable check/build/deploy of this restoration only, then player confirms the Team Select image is back to the accepted presentation. No art regeneration, no gameplay change.


## 30. Future GIF runtime direction — 2026-10-06

Player direction: future animation work should evaluate GIF as the preferred delivered animation format instead of the current PNG sprite-sheet runtime format.

Current 猼訑 production remains unchanged for now: the approved `battleIdle-4f.png` and existing Arena frame-descriptor playback stay authoritative until a dedicated GIF runtime feasibility gate proves Pause-safe timing, state transitions, anchor stability, mirroring and mobile compatibility. Do not retroactively replace the current approved asset before that gate passes.
