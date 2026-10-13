# M5C-B Batch1 Visual Spec — 九尾狐

## Status
**CONCEPT DIRECTION — PLAYER REVIEW PENDING**

## 1. Role
Type: Blast
Role: Attacker
Combat identity: mid-long ranged burst / pressure.

## 2. Body plan
Humanoid / anthropomorphic biped with fox traits. Lean, elegant, controlled posture. Nine-tail identity must be readable without overwhelming the combat silhouette.

## 3. Creature identity
Preserve:
- fox head/ears or strongly fox-derived face;
- nine tails;
- Qingqiu-associated mystic elegance;
- spirit-fire motif.

Avoid:
- literal quadruped fox;
- generic human with a single tail;
- tail mass so large it obscures hit/readability.

## 4. Equipment language
Spirit-fire lantern, fox-fire catalyst, fan, ranged talisman launcher, orb focus, or elegant ranged weapon are valid. Blast identity should read as projected burst/area pressure.

## 5. Color direction
Ivory/cream, warm red, ember orange, dark neutral, optional cool spirit-fire accent.

## 6. portraitSquare
Head/upper torso with fox traits and at least partial tail framing. Expression confident, focused.

## 7. collectionArt
Mid-long ranged casting pose; several tails curve to frame the silhouette, not clutter it.

## 8. battleIdle
Humanoid caster/ranged stance; body angled away from close combat, one hand/device ready.

## 9. idle micro-animation
4-frame loop:
- subtle breathing;
- controlled tail-wave stagger across only a few visible tail groups;
- ear twitch;
- tiny spirit-fire pulse;
- no gameplay displacement.

## 10. Batch2 direction
Hit: brief tail recoil/body flinch.
KO: tails lose lift / posture drops.
Cast: concise fox-fire projection pose.

## 11. Acceptance
Must read immediately as 九尾狐, preserve nine-tail identity, and remain readable at ~48px runtime fit.

## 12. Current production gate — 2026-10-12

Status: **NEXT EXACT GATE — CONCEPT IMAGE / PLAYER REVIEW ONLY**.

The current active Chapter1 visual task is 九尾狐 Concept authoring. Preserve:
- humanoid / anthropomorphic biped body;
- strongly fox-derived mythic face, not a generic human face with ears;
- clearly readable nine-tail identity;
- Blast / Attacker ranged-offensive posture;
- grouped tail masses that remain readable at mobile scale instead of forming one undifferentiated fan;
- simplified cel-shaded shapes and strong color blocking;
- clear separation from 鹿蜀 single-red-tail motion language and 赤鱬 circular/aquatic support language.

Preferred first Concept direction:
- lean elegant fox-warrior/caster silhouette;
- ivory/cream fur and hair mass with warm red + ember-orange accents and dark neutral clothing;
- nine tails organized into three readable tail groups rather than nine equal overlapping lines;
- one compact fox-fire catalyst / orb-focus carried near the forward hand;
- sharp projected spirit-fire shapes, not water rings;
- no large staff and no oversized fan that hides the body;
- no fine embroidery, tiny jewelry, dense tassels or excessive trim;
- full body visible with separated head / torso / arms / legs / tail groups.

This gate produces exactly one Concept image for player review. Do not start portraitSquare, collectionArt, battleIdle, locomotion, KO, action frames or VFX until the player explicitly approves the Concept direction.

## 13. Concept approval — 2026-10-12

Status: **PASS / PLAYER APPROVED**.

Approved Concept source:
- 1142×1378 RGB PNG;
- 1766210 bytes;
- SHA-256 `31476bfc573808fd62c970a386ac0ecd27ac1759e116414adc1476a693b81c45`.

Locked from player approval:
- humanoid / anthropomorphic biped body;
- strongly fox-derived mythic head/face, not human-face-plus-ears;
- long fox muzzle / black nose / fox jaw and eye geometry clearly distinct from 鹿蜀;
- nine tails as readable grouped large masses;
- ivory/cream fur with warm red/ember accents and dark neutral clothing;
- compact fox-fire focus near the forward hand;
- lean elegant Blast / Attacker ranged-offensive posture;
- simplified cel-shaded large color blocks and restrained ornament for mobile readability;
- no large staff/fan silhouette that hides the body.

### Next exact item
Author/review **one portraitSquare only** from this approved identity:
- square crop-safe;
- fox-derived head/face dominates frame;
- ears readable;
- eyes/muzzle/nose immediately distinguish 九尾狐 from 鹿蜀;
- head + slight neck/upper torso only;
- minimal tail/fire framing if useful, but face remains dominant;
- preserve simplified cel-shaded style and large color blocks;
- no collectionArt, battleIdle, locomotion, KO, action or VFX yet.

## 14. portraitSquare approval — 2026-10-12

Status: **PASS / PLAYER APPROVED**.

Approved `portraitSquare` source:
- 1254×1254 RGBA PNG;
- transparent background;
- 1977883 bytes;
- SHA-256 `00677eaf3d634ee9e406f711c0823a149c4943e39ae00c5a64fec4017d809b33`.

Locked portrait framing:
- fox-derived head/face dominates the square;
- ears readable;
- long fox muzzle, black nose and fox eye geometry remain distinct from 鹿蜀;
- only slight neck/upper-ruff/upper-torso visible;
- no excessive chest exposure;
- no decorative background required;
- preserve simplified cel-shaded color blocking.

### Next exact item
Author/review **one `collectionArt` only** from the approved 九尾狐 identity:
- full-body or near-full-body identity artwork;
- mid-long ranged casting / pressure-ready three-quarter pose;
- nine tails remain clearly readable as grouped masses and frame the silhouette rather than swallowing it;
- compact fox-fire focus near the forward hand;
- lean elegant Blast / Attacker read;
- preserve ivory/cream fur, warm red/ember accents, dark neutral clothing and restrained gold;
- richer than battle art but still simplified enough to remain consistent with the accepted roster;
- no battleIdle, locomotion, KO, action frames or VFX production yet.

## 15. collectionArt approval — 2026-10-12

Status: **PASS / PLAYER APPROVED**.

Approved `collectionArt` source:
- 1122×1402 RGBA PNG;
- transparent background;
- 1803659 bytes;
- SHA-256 `dcd9c0279208730b4809780c343fa415ae313addc3d2098a362b2604e534a053`.

Locked collection presentation:
- full-body anthropomorphic fox-spirit identity;
- lean elegant Blast / Attacker proportions;
- same approved fox-derived head/face as Concept + portraitSquare;
- nine tails remain readable as grouped large masses and frame the body without swallowing torso/legs;
- compact fox-fire focus near the forward hand;
- ivory/cream fur, warm red/ember accents, dark neutral clothing and restrained gold;
- simplified 2D cel-shaded roster language;
- richer than battle art, but without identity drift.

## 16. Next gate — Battle Simplification

Status: **NEXT EXACT ITEM — ONE BATTLE-SCALE SIMPLIFICATION REFERENCE ONLY**.

Shared hard rule applies: concept/collection detail and battle detail are separate tiers. Do **not** create final battle art by directly shrinking `collectionArt`.

Target the current Arena mobile baseline (~48px base-fit readability) and preserve only the highest-priority battle cues:
1. fox-derived head / ears / long muzzle / black nose;
2. lean ranged-caster humanoid body silhouette;
3. nine-tail identity reduced into a few large readable grouped masses;
4. white/cream body-fur mass + warm red/ember tail/marking mass;
5. compact dark-neutral waist/arm clothing mass with restrained gold;
6. one small sharp fox-fire focus / projected flame cue;
7. decorative trim last.

Simplify/remove first:
- small fur spikes and micro-strands;
- tiny gold trim, buckles, jewelry and layered waist hardware;
- excess tail-tip subdivisions;
- tiny flame wisps;
- fine claw/armor engravings;
- excess garment ribbons/panels;
- any detail that disappears at ~48px.

Battle simplification acceptance:
- head / torso / arms / legs / grouped tails stay separable at small scale;
- nine tails do not become one giant unreadable blob;
- silhouette remains clearly different from 鹿蜀 single-tail Speed read and 赤鱬 hover/support read;
- Blast / Attacker ranged pressure remains obvious before VFX;
- no final `battleIdle`, locomotion, KO, action or VFX production yet.

## 17. Battle Simplification + static battleIdle approval — 2026-10-13

Status: **PASS / PLAYER APPROVED**.

Approved Battle Simplification reference:
- 1122×1402 RGB JPEG;
- 330788 bytes;
- SHA-256 `002c858a45469ecdf2744f29b01f8dc0e7e07644826de1eafd7dc1a34b09c210`.

Approved static `battleIdle` master:
- 1122×1402 RGBA PNG;
- transparent background;
- 1350983 bytes;
- SHA-256 `e90332facc504911584b96ceb95aaa86aa3b8b09e4786b199ec22e95dcb67fbd`.

Locked battle presentation:
- species-derived fox head/face remains dominant and distinct from 鹿蜀;
- lean ranged-caster humanoid proportions;
- nine-tail identity compressed into a few large readable masses rather than fine individual tail detail;
- white/cream primary mass + warm red/ember secondary mass + compact dark-neutral garment mass + restrained gold;
- compact fox-fire cue near the forward hand;
- fewer contour/detail lines than collectionArt;
- one static pose only; no animation/VFX sheet.

### Static asset pack status
- Concept: PASS / PLAYER APPROVED;
- portraitSquare: PASS / PLAYER APPROVED;
- collectionArt: PASS / PLAYER APPROVED;
- Battle Simplification: PASS / PLAYER APPROVED;
- static battleIdle: PASS / PLAYER APPROVED.

### Next exact gate — Static Runtime Readability / integration
Before any locomotion, KO, action/cast or VFX generation, prepare runtime-sized derivatives from the approved masters and integrate only:
1. `portraitSquare`;
2. `collectionArt`;
3. static `battleIdle`.

Runtime acceptance must verify:
- compact portrait remains face-first;
- Team Select / Collection identity uses the approved full-body art at roster-consistent visual scale;
- Arena actor uses the approved simplified static battle pose;
- actor height/mass is in the same presentation family as existing P1/P2/P3 rather than materially taller because the source canvas is large;
- grouped tails remain readable and do not collapse into one blob at actual mobile scale;
- head / torso / arms / legs / tail masses remain separable;
- enemy horizontal mirror remains valid;
- overhead HP/HUD/layout remain unchanged;
- no gameplay stats, movement, targeting, AI, telegraph or combat timing change;
- no idle animation is introduced.

Locomotion, KO, action/cast and VFX stay **BLOCKED** until this static runtime gate is player-verified.

## 18. Runtime derivative preparation — 2026-10-13

Status: **CHAT COMPLETE / WORK INTEGRATION NEXT**.

Prepared runtime derivatives from player-approved transparent masters:
- `portrait`: 128×128 RGBA PNG, 38601 bytes, SHA-256 `b2df8fab63cd71a538622914b0c0d8eabcfc104bc245fd316beaf5e24ff573ef`;
- `identity`: 160×192 RGBA PNG, 54502 bytes, SHA-256 `f8fe054e7a0de50d66e62081ec0fd53e493674cd707d5f2e28be098ab277dd0d`, alpha bbox `(6,4)-(153,188)`;
- static `battleIdle`: 160×160 RGBA PNG, 32063 bytes, SHA-256 `394497ffa5314a4559fee10d58d799fab9be59b282a31bb3ffebb02670ed6640`, alpha bbox `(21,16)-(139,151)`.

Preparation is resize/fit only. No redesign, pose change, facing change, gameplay change or battle-state change is introduced.

### Next exact executable gate
Integrate only these three static P4 assets through the existing shared asset pipeline, then verify real-game readability. Required runtime checks:
- Team Select / Collection use approved identity at roster-consistent visual scale;
- compact portrait remains face-first;
- Arena actor uses one static battleIdle only;
- grouped tail masses remain readable at actual mobile scale;
- actor does not present materially taller/larger than the current roster family;
- enemy mirror remains valid;
- HUD / overhead HP / layout remain unchanged;
- no movement, breathing, KO, action or VFX is introduced.

Locomotion, KO, action/cast and VFX remain blocked until player verification of this static runtime gate.

## 19. Static runtime executable checkpoint — 2026-10-13
**P4 STATIC RUNTIME — EXECUTABLE CHECKPOINT (2026-10-13).** Exact approved portrait128-square38601bytes/identity160×19254502bytes/Idle160-square32063bytes copied unchanged. Manifest/catalog data-only integration; Idle one frame/loopfalse/origin[.5,151/160]/scale2. New6 RED→GREEN; targeted70/70, guard55files2037797bytes/build PASS. Actual P1-P4 cache+scene peak10955408bytes each, every accepted asset retained;16MiB unchanged. P4stats/projection/UI/shared runtime/P1-P3 unchanged. Review/push/Pages/public runtime pending. Evidence:docs/verification/M5C_B_JIUWEIHU_STATIC_RUNTIME.md. Finish only static release then player phone smoke; no Move/KO/action/VFX/P5/main merge.

## 20. Static runtime engineering closure — 2026-10-13
**AUTHORITATIVE CURRENT STATE — P4 STATIC RUNTIME ENGINEERING PASS / PLAYER PHONE SMOKE PENDING (2026-10-13).** Tested/deployed source f57c0f3352e703012376a03ce7d138551a213fb3; final HEAD is containing docs-only closure. Exact approved3 PNGs integrated unchanged; Idle one160-square frame/loopfalse/duration1/origin[.5,151/160]/scale2, no Move/KO/Hit/Cast/VFX/breathing. Team/Collection identity, compact/HUD portrait, Arena staticIdle/mirror/anchor/small-render technical checks PASS; phone perception pending. Targeted78/78/guard55files2037797bytes/build/diff PASS; fresh review no findings; CI656/656. Actions#906/38325421933 Build115062839262 + Pages115062958307 SUCCESS. Public index-C8zPKbfi.js/battleRuntime-Dq3X78vd.js/index-DcqtNRF0.css and3PNG exact-byte match. All P1-P4 accepted assets retained; cache/scene decoded-equivalent peaks10955408bytes each under unchanged16MiB. P4stats/P1-P3 presentation/shared runtime/gameplay unchanged. No technical blocker. Evidence:docs/verification/M5C_B_JIUWEIHU_STATIC_RUNTIME.md. Next only player phone Team/Collection/HUD/Arena proportions/grouped tails/enemy mirror; STOP/no next gate/P5/main merge.
