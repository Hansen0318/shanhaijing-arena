# INFO Hub / Game Guide

## Status
**CHAT SPEC / IMPLEMENTATION DEFERRED**

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
