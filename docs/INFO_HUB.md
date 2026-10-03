# INFO Hub / Game Guide

## Status
**PASS / PLAYER VERIFIED**

This spec records the player-approved information architecture and visual direction for a future INFO entry on the Landing page. It is intentionally separate from the current M5B overlay/performance correction.

## Landing entry

Landing hierarchy becomes:
- BATTLE
- COLLECTION
- INFO

INFO is a sibling top-level destination. It must not mutate Campaign, roster, acquisition, Tier, team, or battle state.

## INFO Hub

First version contains exactly three destinations:
1. GAME GUIDE
2. WORLD
3. TYPE MATCHUP

Future items such as Characters, Status Effects, Tier System, Credits, Events, or Patch Notes may be added later without changing the three initial pages.

Each INFO subpage should reserve a media slot for future illustration, portrait montage, lightweight micro-animation, or looped decorative motion. The first implementation may use placeholders.

## GAME GUIDE

Purpose: explain the existing game loop and controls concisely.

Topics:
- 3v3 real-time battle
- AI controls all living characters by default
- selecting an ally allows player control
- joystick moves the selected ally
- Heavy / Special / Awakening manual buttons
- Basic remains automatic
- releasing manual control returns AI ownership immediately
- Victory by KO of all enemies
- 90-second timeout compares remaining team HP percentage
- shard acquisition
- character ownership
- T0 -> T1 -> T2 -> T3 progression

Keep this page instructional, not a long manual.

## WORLD

Purpose: explain the game's Shanhaijing-inspired setting rather than reproducing the source text.

Narrative direction:
- creatures from different mountains, waters, and mythic regions of the Classic of Mountains and Seas are gathered into the Arena;
- the player forms three-character teams, travels through regions, fights rival creatures, collects shards, and recruits new creatures;
- Chapter-specific stories may later expand this premise.

Reserve a large media slot for future world-map art, mountain/water panorama, scroll motif, silhouettes, or subtle ambient motion.

## TYPE MATCHUP

### Canonical combat relation

Current runtime already implements:
- Power > Speed
- Speed > Blast
- Blast > Power

Current damage multipliers:
- advantage = x1.15
- disadvantage = x0.85
- same Type = x1.00

Do not change these values as part of INFO implementation unless separately authorized by balance feedback.

### Main visual

Use a triangular icon diagram, not text labels inside the triangle.

Layout:
- Power icon at top
- Blast icon at bottom-left
- Speed icon at bottom-right

Arrows show the advantage cycle:
- Power -> Speed
- Speed -> Blast
- Blast -> Power

The triangle itself should contain only Type icons and directional arrows.

Below the diagram, provide a compact textual explanation and the exact multipliers so the player does not have to infer the rule from iconography alone.

### Icon direction

Reuse/extend the game's existing Type visual language:
- Power: solid/heavy diamond-like symbol
- Speed: directional/arrow-like symbol
- Blast: starburst/explosion-like symbol

The final icons should remain legible at iPhone landscape size and work both in monochrome and color.

## Navigation

Expected:
Landing -> INFO -> INFO Hub
INFO Hub -> subpage
subpage BACK -> INFO Hub
INFO Hub BACK -> Landing

No modal-only trap; browser/route state must remain coherent.

## Motion and accessibility

Allowed:
- subtle icon pulses
- slow background drift
- restrained page transitions

Required:
- reduced-motion-safe fallback
- readable without animation
- no interaction dependency on color alone
- no obstruction of BACK/navigation controls

## Out of scope for initial INFO

Do not add:
- shop/gacha explanations
- unimplemented status systems
- future Tier combat effects as if already live
- AI dodge mechanics as if already live
- formal lore encyclopedia
- audio
- final art production

Only document mechanics that are actually implemented or explicitly label future concepts.


## Implementation acceptance

The first implementation should satisfy:

1. Landing shows BATTLE / COLLECTION / INFO as sibling entries.
2. INFO opens a hub page, not a long single document.
3. Hub contains exactly GAME GUIDE / WORLD / TYPE MATCHUP.
4. Each subpage has BACK to INFO Hub; INFO Hub BACK returns Landing.
5. INFO navigation does not mutate Campaign, acquisition, Tier, team, or battle state.
6. Type Matchup uses an icon-only triangle in the main visual:
   - Power icon top;
   - Blast icon bottom-left;
   - Speed icon bottom-right;
   - directional arrows Power -> Speed -> Blast -> Power.
7. The triangle itself contains no text labels.
8. Below the triangle, exact text explains:
   - Power beats Speed;
   - Speed beats Blast;
   - Blast beats Power;
   - advantage x1.15;
   - disadvantage x0.85;
   - same Type x1.00.
9. GAME GUIDE explains only currently live mechanics.
10. WORLD explains the current game premise without inventing a deep canonical story that has not been approved.
11. Every subpage reserves a media/illustration region for future static art or micro-animation.
12. Placeholder media may be used; do not generate fake final art.
13. Pages remain readable on supported iPhone landscape sizes and respect safe areas.
14. No horizontal overflow.
15. reduced-motion/no-motion remains fully usable.
16. non-battle route visibility keeps the battle host detached/asleep.
17. INFO must not eagerly import or preload the deferred battle runtime.
18. targeted + impacted tests/build/deploy pass.

## Implementation boundary

Allowed:
- new INFO route/state;
- INFO hub and three subviews;
- reusable Type icon triangle component;
- placeholder media blocks;
- scoped CSS;
- data-driven content model for INFO copy.

Do not implement:
- AI dodge/telegraph reaction;
- new combat mechanics;
- changed type multipliers;
- final illustrations;
- micro-animation production;
- audio;
- extra INFO sections beyond the initial three.

## Engineering traceability
Read-only src/info/data.js + view.js + scoped style.css; Campaign route adapter; main imports only INFO CSS. Targeted40/40, impacted152/152, full431/431, build/diff PASS. Release evidence: verification/INFO_HUB.md. No motion dependency introduced.

Release source39561844877136940fcb09a3270d1bd35327f511; Actions#365/37088162820 Test431/431/Build/Pages SUCCESS; public source and routes verified. Three Minor review copy/language/focus findings resolved. Player landscape/short-height acceptance pending; STOP.


## Player acceptance (2026-10-03)

Player completed device smoke and accepted the INFO Hub implementation, including Landing sibling INFO, three subpages, icon-only Type triangle, navigation, readability, and current placeholder media regions. Preserve as baseline.
