# P1 Lushu Basic four-pose Work feasibility — 2026-10-15

Status: **FAIL / NOT APPROVED — stopped after bounded candidate attempt**.

## Recovered scope

GitHub recovery HEADa29af3c4529416257292e3e36b7e070b8e86e73a, feature branch feat/m0-combat-core-20260927, open/unmerged PR#1. Read current AGENTS/playbook/boundaries/state/handoff, roadmap, M5C animation spec, Basic vertical-slice proposal, Lushu visual/readability specs and accepted presentation baseline, catalog/abilities/manifest/descriptors and relevant cast/damage presentation hooks. Latest user authorizes only P1 Basic art feasibility, superseding earlier approval-pending art gate; no runtime scope.

Only identity sources, inspected directly from checked-out GitHub bytes:

| Source | SHA256 | Git blob |
| --- | --- | --- |
| public/assets/characters/lushu/identity.png | bf82ac4f64f517a5503f6a3cabc53e046df8ef9ce16bf9ba5dba8d6567f497a1 | 1fddc20ac781faf4e0c3271a96de5225fde4f458 |
| public/assets/characters/lushu/battleIdle-4f.png | ca123eb6eb15c1f32fab2c9d732d40d7db279ed2e4332a1043172d3fb0bef327 | c0052ab9c6699d4abc2b26ce7d5d0ce1563d2543 |

Current Basic: 踏角 / close-range horn-hoof melee; no runtime/cadence/impact changes authorized. Reference locks: white horse/deer head, modest brown antlers, long-legged lean proportions, original tawny/white/charcoal/red outfit and tail, original dark/gold guards and compact short curved blade. Prior rejected Chat drafts were not input references.

## Attempt and self-review

Used built-in image generation in reference-conditioned **edit** mode, supplying both actual PNG paths. Requested only pose changes: F1 anticipation, F2 strike, F3 contact, F4 recovery; original identity/equipment, transparent background, right facing, common scale/ground and generous equal-cell padding. No new attack/VFX art beyond this P1 candidate attempt.

First output: transparent2172×724 RGBA four-pose review sheet. Compact curved blade visibly present in all four drawings. Rejected: identity was redrawn instead of securely locked; F2/F3 too similar; cells2/3 crossed equal543px boundaries. At alpha>128 the four main silhouettes had bounds(38,188)-(453,658), (550,157)-(1131,658), (1128,194)-(1778,658), (1762,162)-(2124,660). Visible pixels occurred at cell boundaries1086/1629, so naive slicing would cut weapons/adjacent components.

One targeted follow-up supplied that candidate as layout edit target, while retaining the same two approved files as the only identity references. Requested uniform shrink, explicit equal-cell clearance, common grounded feet and more intermediate F2. Revision2172×724 RGBA retained all four compact blades and aligned visible soles at y633. Main silhouettes at alpha>128: (53,191)-(438,633), (571,165)-(1069,633), (1109,203)-(1688,633), (1753,165)-(2092,633). F3 still exceeds its right boundary1629; 58visible pixels in columns1628–1629. Transparent-alpha presence alone is not a no-bleed pass. Very-low-alpha scattered pixels also prevent claiming production-clean cells.

The reviewed outputs still redraw horn/head/body details rather than reliably preserving exact approved morphology, and F2/F3 remain too close in arm extension. The executor therefore does **not** assert identity preservation, sufficient four-pose distinction, safe equal cells, player approval or runtime readiness. Outputs are rejected feasibility drafts, not replacement art or normalized assets. They are not imported into public assets or manifest.

## Blocker and recommended method

The image editor, even with exact source images and explicit invariants, did not reliably constrain identity, intermediate joint pose and sprite-cell geometry together in these two attempts. Do not keep generating unrelated beasts or call the result successful.

Recommended next method: retain original head/antler/clothing/weapon shapes as locked layers; articulate arms/torso/legs in a drawing/rigging workflow, with local manual repaint at joints and occlusions; inspect each individual pose against the same source. Obtain player review before any fixed-cell packing/GIF/runtime integration. Pure whole-sprite shifting/rotating is not a substitute for actual attack poses.

No product source, approved PNG, descriptor, tests, Build, CI or deployment was changed/run for this art task. Documentation checkpoint uses [skip ci] to avoid starting the push workflow. Main remains unmerged. **STOP after reporting this bounded failure.**
