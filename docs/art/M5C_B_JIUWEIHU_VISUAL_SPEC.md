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
