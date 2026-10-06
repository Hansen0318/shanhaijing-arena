# M5C-B Chapter1 Visual Differentiation Matrix

## Status
**CHAT REVIEW COMPLETE / CHARACTER DIRECTIONS DISTINCT ENOUGH FOR NEXT CONCEPT PASS**

This document checks whether the five Chapter1 playable characters are visually distinct before more image generation or production asset locking.

## 1. Shared roster hard rules

All five use:
- humanoid / anthropomorphic combat body plans;
- shared readable animation vocabulary;
- mobile-first silhouettes;
- creature-defining traits;
- gameplay-driven clothing / props / weapons;
- simplified 2D cel-shaded presentation.

Shared structure does **not** mean shared silhouette.

Each character must be distinguishable from body shape + major appendage + equipment language alone, before color is considered.

Battle differentiation must survive simplification. Concept-sheet micro-detail does not count as a valid differentiator if it disappears at mobile runtime scale. For battle assets, compare large silhouette, species/head shape, appendage count/shape, posture, broad markings and compact equipment only.

Head/face differentiation is also structural. A humanoid body does not imply a shared human face base. Each character should use species-derived mythic facial morphology; repeated species families must vary skull/muzzle/eye/ear/horn/jaw structures so identity does not depend on costume or recoloring.

## 2. Five-character silhouette signatures

| Character | Body silhouette | Major identity shape | Equipment language | Combat posture |
|---|---|---|---|---|
| 鹿蜀 | tall / lean / long-legged | antlers + single red tail | paired light blades / rush guards / mobility accessories | forward, angled, ready to pivot |
| 猼訑 | broad / heavy / planted | large curved horns + shoulder fur | heavy bracer / shield-like guard / mace | square, protective, planted |
| 赤鱬 | slim-medium / soft rear-line | fins / gills + aquatic ornaments | water orb / vessel / ring focus | open, supportive, slightly withdrawn |
| 九尾狐 | lean / elegant / long-line | nine-tail fan silhouette | fox-fire catalyst / fan / ranged focus | controlled ranged caster |
| 狌狌 | muscular / compact-forward | primate head + large forearms | gauntlets / knuckles / impact gear | crouched-forward, chase-ready |

## 3. Highest collision risks

### 猼訑 vs 狌狌
Both are Power and melee.

Hard separation:
- 猼訑 = width in shoulders/torso, defensive symmetry, planted feet, guarded hands.
- 狌狌 = width in forearms/hands, forward lean, asymmetrical attacking stance, spring-loaded legs.
- 猼訑 equipment should block/protect.
- 狌狌 equipment should strike/chase.

Do not give 狌狌 a shield silhouette.
Do not give 猼訑 oversized punching gauntlets as the primary read.

### 赤鱬 vs 九尾狐
Both are Blast and ranged.

Hard separation:
- 赤鱬 = circular / flowing / restorative shapes, open hand posture, water focus close to body/team.
- 九尾狐 = sharp / fan-like / outward projecting shapes, tails frame the rear silhouette, offensive catalyst aimed toward enemies.
- 赤鱬 silhouette should feel calmer and more vertical.
- 九尾狐 should feel more diagonal and predatory.

Do not give 赤鱬 nine large trailing appendages.
Do not give 九尾狐 healer-vessel language.

### 鹿蜀 vs 九尾狐
Both may use white + red accents and lean silhouettes.

Hard separation:
- 鹿蜀 red is concentrated in one large tail / scarf movement axis, with amber/tiger-stripe body pattern.
- 九尾狐 red is distributed through multiple tails/fire accents.
- 鹿蜀 uses melee mobility weapons and forward leg-driven posture.
- 九尾狐 uses ranged/caster equipment and controlled upper-body posture.

Avoid giving 鹿蜀 long multi-tail-like ribbons that visually imitate 九尾狐.

## 4. Type readability without recoloring the whole roster

Type accents should be secondary.

### Speed
Use:
- streamlined geometry;
- forward diagonals;
- lighter equipment;
- visible leg motion;
- small cyan/teal accent allowed.

### Power
Use:
- mass;
- thick impact shapes;
- grounded poses;
- heavier equipment;
- compact warm/metallic accent allowed.

### Blast
Use:
- ranged focus devices;
- outward/projected VFX language;
- circular/radial or fan-shaped casting geometry;
- brighter energy accent allowed.

Do not make Type readability depend only on color.

## 5. Role readability

### Attacker
- weapon/attack direction obvious;
- torso and limbs biased toward target;
- less visually defensive.

### Tank
- wider stance;
- guard surface between ally and enemy;
- defensive mass concentrated around torso/arms.

### Support
- open/controlled posture;
- device/focus readable as aid/cast tool;
- less aggressive weapon silhouette.

## 6. Shared locomotion / action animation archetypes

To keep production scalable, use a small number of animation structure families.

### Agile humanoid
Primary: 鹿蜀
Can later support other Speed melee characters.

Idle:
- alternating weight;
- small secondary tail/scarf motion;
- quick recovery posture.

### Guard humanoid
Primary: 猼訑
Can support future tanks/protectors.

Idle:
- stable center;
- slow breathing;
- guard hand/weapon held ready.

### Ranged caster humanoid
Primary: 九尾狐 and future grounded casters.
Shared cast timing is allowed, but secondary motion and cast pose must differ.

### Aquatic hover humanoid
Primary: 赤鱬.
The humanoid torso/arms remain compatible with shared cast/action hooks, but locomotion is not a ground walk. The actor may float above the ground with a clear hover baseline; travel is expressed through body drift, fin/tail/cloth follow-through and water-linked secondary motion. This is a reusable locomotion archetype for future aquatic/floating characters.

九尾狐:
- offensive projection hand/fan/catalyst;
- tail group motion.

### Bruiser humanoid
Primary: 狌狌
Can support future Power attackers.

Idle:
- shoulders breathing;
- fists/gauntlets active;
- slight forward coil.

## 7. Locomotion differentiation

Current idle presentation is static. Character motion differentiation is expressed first through locomotion and later through action states:

- 鹿蜀: agile grounded step/run, visible leg drive, counter-swinging arms, single-tail/scarf follow-through.
- 猼訑: heavy grounded stride, shorter planted steps, controlled arm/guard movement and torso mass transfer.
- 赤鱬: aquatic hover locomotion; body remains suspended above the ground, with gentle body drift plus fin/tail/cloth follow-through. No fake walking cycle is required.
- 九尾狐: light grounded caster travel unless a later explicit supernatural-float decision is approved; tails follow movement without carrying gameplay position.
- 狌狌: forward-driving bruiser step/run with strong leg push and forearm/torso follow-through.

Future winged/aerial characters use a flight locomotion archetype with wing beats/glide/body pitch rather than ground footfalls.

All movement animation follows existing actor coordinates and movement speed; it does not own movement mechanics.

## 8. Color collision controls

Do not rely on unique palettes alone, but preserve these dominant reads:

- 鹿蜀: tawny / white / charcoal tiger markings / vermilion.
- 猼訑: stone / brown / iron / muted gold.
- 赤鱬: coral red / pearl / aqua-teal.
- 九尾狐: ivory / warm red / ember / dark neutral.
- 狌狌: deep brown / charcoal / bronze / dark red.

The main risk is 鹿蜀 vs 九尾狐. Keep 鹿蜀 visibly warmer/earthier with tiger pattern; keep 九尾狐 cleaner ivory with tail/fire emphasis.

## 9. Production decision

Current written directions are sufficiently differentiated to continue concept development.

Do not yet lock production art.

Recommended next order:
1. review/adjust 鹿蜀 humanoid concept until acceptable;
2. create one concept sheet each for 猼訑, 赤鱬, 九尾狐, 狌狌 only when the player asks to generate;
3. compare all five together before final Batch1 lock;
4. only then produce final portraitSquare / collectionArt / battleIdle assets and idle frames;
5. Work integrates the complete approved batch.

No additional image generation should happen merely from a generic "continue" unless the current next task explicitly requires an image.


## 10. Future character onboarding rule

The current four animation structure families are **starter reusable archetypes**, not a closed taxonomy.

Future characters must not be forced awkwardly into Agile / Guard / Ranged Caster / Bruiser if their mechanics require another structure.

For every new playable character, Chat first classifies:

1. humanoid body-plan compatibility;
2. creature-defining traits;
3. Type;
4. Role;
5. locomotion style;
6. attack delivery style;
7. equipment / prop language;
8. locomotion family: ground / flight / hover-aquatic / other reusable archetype;
9. action delivery and hit / KO motion needs;
10. whether an existing animation archetype can be reused safely.

Decision order:
- reuse an existing archetype when it fits naturally;
- compose from existing motion modules where possible;
- add a **new reusable archetype** only when the new mechanic/body-motion pattern is genuinely distinct;
- never add a one-character-only animation architecture if a shared reusable structure can be defined.

Examples of future reusable archetypes that may be added when needed:
- aerial / winged humanoid;
- heavy artillery / stationary caster;
- summoner / controller;
- dual-form / stance-switch;
- teleport / blink assassin;
- mounted or companion-linked humanoid.

A new archetype must be documented once and then become available to later characters.

## 11. Future visual-production flow

For every current and future playable character, use this gated sequence:

1. read current hard rules / accepted baseline / visual archetype catalog;
2. extract canonical Shanhaijing creature traits;
3. define Type / Role / combat identity;
4. select or extend a reusable animation archetype;
5. define equipment / prop language from mechanics;
6. run silhouette-collision check against the existing roster;
7. create and player-approve the **Concept** direction;
8. create a separate **Battle Simplification** derivative with stronger value/color contrast, fewer lines, fewer ornaments, larger readable color masses and clean negative space;
9. produce the **Static Asset Pack**: `portraitSquare`, `collectionArt`, static `battleIdle`;
10. integrate/preview the static assets through the existing M5C-A pipeline and run the **Static Runtime Readability Gate** at real game scale;
11. if static readability fails, revise the art—not the animation, VFX or actor scale;
12. keep Idle static under the current authoritative direction;
13. when locomotion is explicitly opened, author the character's reusable ground / flight / hover movement animation and run targeted player smoke;
14. author each approved attack/skill action micro-animation together with its corresponding VFX timing;
15. author Hit / KO reactions only when their later gate is explicitly opened;
16. record the accepted character, asset status and any new reusable archetype in GitHub.

Hard rules:
- static identity must be recognizable without motion;
- animation cannot rescue a weak silhouette;
- VFX cannot rescue a weak silhouette;
- do not enlarge individual characters as the default readability fix;
- Concept/Collection detail may be richer, but battle art must remain an intentionally simplified derivative;
- every step preserves the roster-wide 2D cel-shaded rendering language.

This supersedes the older flow that treated static battle art and idle micro-animation as one production step.

