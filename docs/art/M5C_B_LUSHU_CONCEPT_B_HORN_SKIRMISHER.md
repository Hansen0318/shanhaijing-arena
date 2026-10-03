# M5C-B 鹿蜀 Concept B — 角擊游擊型

## Status
**EXPLORATION DIRECTION — PLAYER REVIEW PENDING**

This document defines one bounded humanoid concept direction for 鹿蜀. It does not replace the canonical visual spec and does not constitute production approval.

Canonical hard rules remain in:
- `docs/art/M5C_B_LUSHU_VISUAL_SPEC.md`
- `docs/art/M5C_B_CHAPTER1_CONCEPT_APPROVAL_MATRIX.md`

## 1. Design thesis

Concept B emphasizes 鹿蜀 as a fast mythic melee skirmisher whose creature anatomy and equipment both communicate forward burst movement.

The design should read as:
- mythic horse/deer-derived humanoid first;
- Speed / Attacker second;
- lightly equipped battlefield skirmisher third.

Avoid reducing the design to a generic dual-blade beast warrior.

## 2. Head / face

Direction:
- predominantly white head and upper neck;
- horse/deer-derived elongated facial plane, but shortened enough to remain expressive in a humanoid game character;
- eyes alert and focused rather than feral;
- face target is **mythic anthropomorphic**, not a fully naturalistic deer head and not a human face with deer add-ons;
- shorten and stylize the muzzle enough to support clear brow/eye/mouth expression while keeping horse/deer-derived bone structure;
- eye socket, cheek and jaw design should carry character identity even if horns, hair and costume are hidden;
- ears swept slightly outward/backward;
- compact horn/antler treatment integrated into the head silhouette.

Preferred horn language:
- short, aerodynamic, slightly rear-swept;
- strong enough to support the horn/rush combat read;
- not a large branching stag crown.

Avoid:
- human face with decorative animal ears;
- realistic horse head proportions that make the body feel quadrupedal;
- oversized antlers that collide with 九尾狐 tail mass or 猼訑 horn mass.

## 3. Body proportions

Overall:
- tall and lean;
- narrow waist;
- moderate shoulders;
- visibly long legs;
- athletic rather than muscular-heavy;
- lower legs may use digitigrade / hoof-influenced anatomy while preserving shared humanoid locomotion.

Proportion priority:
1. leg length;
2. clean torso line;
3. clear arm articulation;
4. separated red tail;
5. readable head/horn silhouette.

Do not widen the torso enough to approach 猼訑 or 狌狌.

## 4. Clothing

Primary direction:
- fitted light battlefield garments;
- short upper-body wrap / fitted tunic / harness combination;
- split hip panels or short sash only if they preserve leg visibility;
- lower-body garments should remain compact and not hide locomotion.

Material language:
- cloth;
- leather;
- small hard guard pieces;
- minimal metal.

Avoid:
- robes;
- long coats;
- capes;
- large shoulder armor;
- layered fabric that obscures tiger markings.

## 5. Rush-guard equipment language

Concept B's defining equipment idea is **rush-oriented guard equipment**, not a conventional shield.

Preferred components:
- slim compact forearm guards that do not widen the arm silhouette into a Power/bruiser read;
- narrow hoof/shin impact guards that preserve the long-leg silhouette;
- optional small horn-shaped short blade or side weapon;
- compact waist attachment for mobility tools/talismans.

Visual purpose:
- imply that 鹿蜀 can enter quickly, absorb or redirect brief contact, then disengage;
- support horn/hoof/rush motifs;
- preserve free arm and leg movement.

The guards should look like movement equipment, not Tank armor.

## 6. Primary weapon direction

Preferred first exploration:
**single short curved skirmisher blade + rush guards**

Why:
- keeps one hand visually freer than paired blades;
- avoids generic dual-dagger assassin read;
- reduces silhouette clutter;
- supports asymmetric attacking poses;
- avoids making both the head horns and handheld weapon repeat the same horn motif too literally.

The weapon may echo the character's streamlined geometry, but should not look like a detached copy of the head horn.

Alternative allowed for later comparison:
- paired compact light blades with restrained horn-inspired curvature.

Not locked until player approval.

## 7. Tiger-marking placement

Use few, bold charcoal markings.

Preferred visible zones:
- upper arm / shoulder;
- side torso or rib area;
- outer thigh;
- optional lower leg accent.

Rules:
- do not cover the entire body;
- do not use many thin realistic tiger stripes;
- at least two large markings should survive downscaling;
- markings should not be mistaken for armor seams.

## 8. Red tail

The single vermilion tail is a primary identity feature.

Direction:
- one clear tail only;
- medium-long;
- slightly plume-like for graphic readability;
- originates cleanly from the rear pelvis;
- normally arcs away from the torso;
- acts as a strong movement counter-line.

Avoid:
- branching;
- flame splitting;
- multiple ribbon strands;
- tail groupings that could read as 九尾狐.

## 9. Color hierarchy

Primary:
- warm tawny / ochre body;
- white head / upper neck;
- charcoal tiger markings;
- vermilion tail.

Equipment:
- dark brown / muted charcoal;
- restrained bronze or dull metal edges.

Optional Speed accent:
- tiny cyan / teal accent on one or two functional details only.

Color priority at small scale:
white head > red tail > warm body > dark stripes > equipment accents.

## 10. Battle posture

Default combat posture:
- 3/4 side-facing;
- front leg bent and loaded;
- rear leg extended enough to imply directional burst;
- torso angled forward;
- weapon-side arm ready near centerline;
- off-hand / guard arm positioned to deflect or brace;
- head slightly lowered but not animal-like;
- red tail counterbalances the torso direction.

The pose should suggest:
**enter → strike → pivot → disengage**

not:
**stand and trade hits**.

## 11. Silhouette test

At black-silhouette level, Concept B should still show:
- tall lean humanoid;
- small horn/antler head shape;
- long leg emphasis;
- one separated tail;
- one compact weapon;
- one guard-heavy forearm;
- forward diagonal posture.

It must remain distinguishable from:
- 猼訑: broader, planted, symmetric guard;
- 九尾狐: multi-tail ranged caster;
- 狌狌: forearm-heavy muscular chase bruiser.

## 12. Mobile readability

At ~48px runtime fit:
- white head must remain visible;
- red tail must not merge into torso;
- tiger markings should read as 2–4 broad dark shapes;
- horn silhouette should remain detectable without becoming oversized;
- weapon should not extend far beyond actor bounds;
- leg separation must survive downscaling.

If a detail disappears below mobile scale, it is decorative and must not carry identity-critical meaning.

## 13. Shared animation compatibility

Use the existing Agile humanoid archetype.

Required reusable motion compatibility:
- idle;
- forward locomotion;
- diagonal locomotion;
- hit recoil;
- KO;
- attack/cast anticipation;
- recovery.

Creature-specific secondary motion:
- ear tilt;
- tail counter-swing;
- small horn/head settle;
- guard/weapon follow-through.

No skeletal or one-off animation architecture is required.

## 14. Idle micro-animation for Concept B

4-frame first-pass direction:
1. neutral loaded stance;
2. slight chest rise + ear tilt;
3. small tail counter-sweep + weapon/guard settle;
4. return through slight weight shift.

Hard rule:
- feet do not walk;
- actor origin does not move;
- tail motion stays compact;
- no large weapon flourish.

## 15. Portrait treatment

Portrait should emphasize:
- white mythic head;
- compact rear-swept horns;
- one visible tiger marking near shoulder/neck;
- one rush guard;
- alert expression.

Do not make the portrait depend on the tail for identification.

## 16. Collection-art treatment

Pose:
- mid-pivot rather than mid-impact;
- one leg loading for redirection;
- horn-blade low or across body;
- off-hand guard raised;
- red tail counter-sweeping;
- torso twist exposes one or two tiger markings.

This image should communicate mobility, not depict a finished attack animation.

## 17. Collision review

### vs 九尾狐
- exactly one tail;
- no tail fan;
- no floating fire;
- grounded melee posture;
- earthy palette.

### vs 猼訑
- narrow shoulders;
- long legs;
- asymmetric guard;
- light armor;
- no broad shield surface.

### vs 狌狌
- lighter torso;
- smaller forearms;
- longer leg line;
- weapon/guard precision rather than fist-heavy impact.


## 17A. Final pre-image collision review

Result:
**PASS FOR NEXT CONCEPT IMAGE EXPLORATION — NOT PRODUCTION APPROVED**

The direction is sufficiently distinct from the other four Chapter1 characters if the following controls are respected:

1. Head horns remain the primary horn identity. Handheld weapons may echo streamlined curvature but must not duplicate the horns literally.
2. Rush guards remain narrow and mobility-oriented. They must not create broad forearm mass comparable to 狌狌 or a defensive plate comparable to 猼訑.
3. The silhouette priority remains legs > single tail > compact head horns > compact weapon. Equipment must not reverse that order.
4. No long scarf, split ribbons or additional red trailing elements are permitted; the single red tail owns the rear motion axis.
5. The torso stays relatively clean so at least one large tiger marking remains visible in collection and battle representations.
6. At black-silhouette scale, equipment may disappear before the creature identity does. If the design only reads as 鹿蜀 because of the weapon, it fails.

Remaining visual risk:
- too much deer-antler branching makes the head wider and less aerodynamic;
- too much forearm/shin armor shifts the read toward Power;
- too many decorative straps or talismans create motion clutter next to the red tail;
- an overly human face weakens creature identity.

Therefore the first image exploration should intentionally use:
- compact rear-swept horns;
- one short curved skirmisher blade;
- very slim rush guards;
- minimal trailing accessories;
- visible white head + tiger marking + single vermilion tail.

## 18. Player decision points

Before Concept B can be approved, player still decides:

1. face balance inside the species-derived mythic range:
   - more horse-derived;
   - more deer-derived;
   - more abstract mythic-beast;
   - all options must preserve expressive anthropomorphic eye/brow/mouth acting and must not revert to either a normal human face or a fully naturalistic animal head.

2. horn treatment:
   - short paired swept horns;
   - small antler forks;
   - smoother horn-blade-like silhouette.

3. primary weapon:
   - single horn-blade;
   - paired compact horn-blades;
   - another light melee option.

4. clothing language:
   - more tribal/mythic;
   - more martial;
   - more minimalist creature-first.

5. cyan Speed accent:
   - none;
   - tiny functional accent only.

## 19. Approval condition

Concept B becomes approved only after explicit player acceptance of:
- head/face direction;
- horn shape;
- weapon direction;
- clothing/guard balance;
- overall silhouette.

Until then:
**EXPLORATION ONLY — DO NOT PRODUCE FINAL BATCH1 ASSETS.**


## 20. Current concept-sheet review against global hard rules

Status:
**CONCEPT REFERENCE USABLE / BATTLE VERSION REQUIRES SIMPLIFICATION / PLAYER APPROVAL STILL PENDING**

The current Concept B sheet is useful as an identity and presentation reference. It should not be treated as a direct battle-sprite source.

### What is working
- clear white species-derived mythic head;
- readable deer/horse lineage;
- tall lean humanoid proportions;
- long-leg Speed read;
- single vermilion tail is a strong identity axis;
- warm tawny body + broad dark markings separate 鹿蜀 from 九尾狐;
- asymmetric light-melee posture remains distinct from 猼訑 and 狌狌.

### Face review
The current head is still somewhat close to a polished fantasy deer head.

Keep:
- white head;
- deer/horse-derived skull;
- compact horns;
- amber focused eyes.

For the next refinement, increase anthropomorphic acting slightly by:
- shortening / simplifying the muzzle a little;
- making brow / eye-socket expression clearer;
- strengthening cheek / jaw character structure;
- preserving clear mouth shapes for hit / cast / KO expressions.

Do not revert to a normal human face with animal ears.

### Battle-detail review
Current concept-sheet detail density is too high for direct ~48px battle use.

Concept-only or heavily simplified in battle:
- multiple loose hair strands;
- multiple hanging cloth strips / tassels;
- small waist hardware;
- layered armor trim;
- fine weapon ornament;
- small cyan charms;
- detailed tail hair flow;
- dense small material transitions.

Battle version should retain:
1. white mythic head;
2. tall lean long-legged silhouette;
3. one large separated red tail;
4. warm tawny body;
5. 2–3 broad tiger-marking groups;
6. compact rear-swept horns;
7. one simple short curved blade;
8. slim forearm / shin guards.

### Tail / trailing-element correction
The single red tail must remain the dominant rear motion shape.

For battle:
- reduce or remove red cloth panels that compete with the tail;
- avoid long black/red/teal strips behind the hips;
- keep only minimal garment motion;
- tail should read as one clean large shape rather than several hair-like strands.

### Equipment correction
Current concept equipment is acceptable for identity exploration but should be simplified for runtime.

For battle:
- reduce blade guard decoration;
- simplify forearm/shin guards to one or two large shapes;
- remove tiny buckles / engraved borders;
- keep weapon length compact;
- do not let equipment widen the silhouette toward Power.

### Decision
Do not discard the current concept sheet.

Use it as:
- identity reference;
- face-direction reference;
- collection-art direction;
- costume/equipment source material.

Do not use it directly as:
- final battleIdle;
- battleHit;
- battleKo;
- battleCast.

Next Chat-owned visual step:
**prepare a simplified battle-readable 鹿蜀 design pass derived from this concept, while keeping the current concept sheet as the richer presentation reference.**
