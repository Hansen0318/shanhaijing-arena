# M5C-B Chapter1 Concept Approval Matrix

## Status
**CHAT REVIEW BASELINE — PLAYER CONCEPT APPROVAL PENDING**

This matrix is the approval control sheet for Chapter1 character concepts before any production asset lock.

It does not replace the individual visual specs. It consolidates:
- locked identity;
- current reusable animation archetype;
- equipment/prop directions that are still optional;
- collision risks;
- remaining player decisions.

No concept image is production-approved unless explicitly recorded as approved.

## Shared hard rules

All normal playable Chapter1 characters:
- use humanoid / anthropomorphic combat body plans;
- preserve defining Shanhaijing creature traits;
- may use newly designed clothing, armor, props and weapons to communicate Type / Role / abilities;
- should reuse shared animation structure where natural;
- may add a new reusable archetype later only when locomotion / ability delivery genuinely requires it;
- must pass silhouette / role / equipment collision review before production lock;
- must remain readable at mobile battle scale;
- must not be converted back to literal quadrupeds unless the player explicitly approves an exception.
- use species-derived mythic anthropomorphic faces rather than a shared human facial template;
- remain expressive enough for character acting while preserving source-species skull/muzzle/eye/ear/jaw identity;
- when multiple characters share a species family, differentiate facial morphology structurally, not merely by color, hair, horns or costume.
- treat concept/collection detail and battle detail as separate tiers; battle assets must be simplified intentionally rather than downscaled directly;
- define an ordered battle identity hierarchy for each character and preserve the highest-priority silhouette/species cues before decorative detail;
- pass a small-runtime readability gate before final battleIdle / battle state assets are approved.

Current reusable animation/locomotion archetypes are starter families, not a closed taxonomy. Ground, aerial/flight and aquatic-hover locomotion may share the same actor/runtime state architecture while using different frame sets and body motion.

## Approval matrix

| Character | Locked creature identity | Locked gameplay read | Locked silhouette direction | Current reusable archetype | Equipment / prop direction | Collision control | Still NOT locked |
|---|---|---|---|---|---|---|---|
| 鹿蜀 | white head; broad tiger-like markings; single vermilion/red tail; horse/deer-derived mythic traits | Speed / Attacker; mobile melee skirmisher | tall/lean/long-legged humanoid; agile directional posture; tail separated from body | Agile humanoid | paired light blades, horn-shaped short weapons, rush/hoof guards, mobility accessories are valid options | must not resemble 九尾狐 via multi-tail/ribbon mass; must stay lighter and more leg-driven than Power characters | exact face treatment; antler/horn shape; exact weapon; clothing; armor coverage; ornament language; final palette balance; final concept |
| 猼訑 | sheep/goat-like head; large curved horns; dense neck/shoulder fur | Power / Tank; durable front guard / protector | broad shoulders; heavy center; planted and defensive symmetry | Guard humanoid | heavy bracer, shield-like guard, mace, forearm/shoulder armor | distinguish from 狌狌: defensive torso/shoulder mass and guard surface, not oversized striking fists | exact horn geometry; shield/bracer vs mace choice; armor layout; clothing; face treatment; final concept |
| 赤鱬 | aquatic/fish traits; red/coral identity; fins/gills/scales; water-linked language | Blast / Support; ranged healer / rear support | slim-medium; calmer vertical silhouette; open support posture; may hover above ground | Aquatic hover humanoid + shared caster action hooks | water orb, healing vessel, ring staff, shell focus, floating flask/support device | distinguish from 九尾狐: circular/flowing/restorative shapes; no large trailing tail-like appendage system | exact aquatic head/face treatment; fin placement; support focus/device; clothing; final color balance; final concept |
| 九尾狐 | fox-derived head/face; fox ears; nine tails; mystic fox-fire identity | Blast / Attacker; ranged burst / pressure | lean/elegant; diagonal offensive caster; readable grouped nine-tail fan | Ranged caster humanoid | fox-fire catalyst, fan, ranged talisman device, lantern/orb focus, elegant ranged weapon | distinguish from 赤鱬: sharp/projected offensive shapes; distinguish from 鹿蜀: multiple tail/fire accents rather than one red motion axis | exact face treatment; tail grouping/count presentation at battle scale; catalyst/weapon; clothing; final palette; final concept |
| 狌狌 | primate/humanlike beast cues; strong forearms; fur; rugged close-range identity | Power / Attacker; aggressive bruiser / chase specialist | muscular compact-forward humanoid; large forearms; spring-loaded/chase posture | Bruiser humanoid | gauntlets, knuckle weapons, chain/impact gear, chase/grapple accessories | distinguish from 猼訑: forearm/hand attack mass, forward lean and asymmetry; no shield-first read | exact primate head treatment; gauntlet/weapon choice; fur distribution; clothing/armor; body bulk limit; final concept |

## Locked vs optional interpretation

### Locked
A locked item should remain stable across future concept variants unless the player explicitly changes the rule.

Examples:
- humanoid combat body plan;
- canonical creature-defining traits;
- Type / Role;
- broad silhouette role;
- separation from overlapping characters;
- reusable animation architecture compatibility.

### Optional / exploration space
These may change between concept variants until the player approves one:
- weapon choice;
- armor/clothing style;
- ornament shape;
- exact head/face stylization;
- asymmetry;
- color balance inside the defined palette;
- accessory count;
- pose details.

A listed equipment example is never automatically a hard requirement.

## Character-specific decision gates

### 鹿蜀
Next concept review must decide:
1. head/face balance between horse, deer and mythic humanoid;
2. exact antler/horn treatment;
3. primary melee equipment;
4. clothing/armor amount;
5. how the single red tail supports motion without reading as fox-fire;
6. whether the concept remains clearly Speed / Attacker at small scale.

Current status:
**PASS / PLAYER VERIFIED for formal 鹿蜀 identity/static runtime. Historical pre-approval notes are superseded.**

### 猼訑
Before image generation, preserve:
- broad defensive body;
- curved horn silhouette;
- protective equipment language;
- clear separation from 狌狌.

Primary open decision:
**shield/bracer-led protector vs heavier weapon-led protector**, while keeping Tank readability.

Current status:
**PASS / PLAYER VERIFIED for formal 猼訑 identity/static runtime. Idle breathing is withdrawn; static idle remains authoritative.**

### 赤鱬
Before image generation, preserve:
- red/coral aquatic identity;
- fins/gills;
- clear support casting posture;
- circular/flowing healing language.

Primary direction:
**floating healing-water orb + compact ring focus/bracer**. This keeps the hands expressive, gives future VFX a clear source point, fits hover locomotion, and avoids a generic staff-mage silhouette.

Current status:
**PASS / PLAYER VERIFIED for formal 赤鱬 identity/static runtime.** Revised creature-first Concept, Battle Simplification, portraitSquare, collectionArt, static battleIdle and Static Runtime Readability have all passed player review. Idle remains static; later locomotion/action/VFX gates remain separate.

### 九尾狐
Before image generation, preserve:
- nine-tail identity;
- fox-derived head/ears;
- ranged offensive casting language;
- readable tails without obscuring the actor.

Primary open decision:
**how to group the nine tails and which catalyst/weapon produces the clearest mobile silhouette.**

### 狌狌
Before image generation, preserve:
- primate identity;
- large forearm attack read;
- forward chase posture;
- clear Power Attacker separation from 猼訑.

Primary open decision:
**gauntlet/knuckle emphasis vs another impact/chase weapon, without becoming a Tank silhouette.**

## Five-character comparison gate

Before Batch1 production art is locked, compare all five together in one review and confirm:

1. body shapes differ before color is considered;
2. major appendages differ;
3. equipment language does not collide;
4. Tank vs Power Attacker reads are distinct;
5. Support caster vs Blast Attacker reads are distinct;
6. 鹿蜀 vs 九尾狐 tail/color language remains distinct;
7. all five still fit shared/reusable animation production;
8. no character-specific one-off animation architecture has been introduced.
9. no two same-family characters depend on the same human-face base with only accessory/color swaps;
10. each same-family character has at least two structural head/face differentiators visible without costume.
11. each character's battle version remains readable at intended mobile scale without relying on fine lines or micro-accessories;
12. head/body/major appendage/weapon do not collapse into one visual mass;
13. battle identity survives after removing concept-only decorative detail.

## Production lock rule

Do not create final:
- portraitSquare;
- collectionArt;
- battleIdle;
- locomotion frames;
- action/cast frames;
- VFX;

until the player's concept direction for that character is explicitly approved.

When all five concepts are approved, perform the five-character comparison gate again before final Batch1 authoring.

## Immediate next action

Continue with **九尾狐 Concept direction**. 鹿蜀、猼訑、赤鱬 formal identity/static-runtime gates are already accepted and must not be reopened.

For 九尾狐, generate/review one Concept image only under the existing creature-first + mobile-readability hard rules. Preserve fox-derived head/face, readable nine-tail identity, Blast / Attacker offensive caster posture, and strong separation from 赤鱬/鹿蜀. Do not author portraitSquare, collectionArt, battleIdle, locomotion frames, action frames or VFX before the 九尾狐 Concept is explicitly player-approved.
