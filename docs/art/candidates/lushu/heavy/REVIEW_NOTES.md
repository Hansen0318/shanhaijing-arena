# P1 Heavy 逐風衝 — F3 candidate review v1

Status: **PLAYER F3 REVIEW PENDING / NOT APPROVED / NOT RUNTIME READY**.

Recovered f63cf5395e92156b12873410f89b80c618234a25, feature feat/m0-combat-core-20260927 / PR#1, main unchanged. Player2026-10-16T07:58:33+08:00 requested the next Heavy motion/VFX for review before integration/deploy. Existing proposal docs/M5C_P1_LUSHU_HEAVY_ACTION.md supplies direction; staged F3-first rule remains binding, so this checkpoint deliberately contains ONE character pose only.

## What to review now

- Same white deer/horse head, brown antlers, white mane, lean tiger-striped body, black/gold equipment, red waist cloth/one red tail and compact curved dark weapon as exact approved GitHub sources.
- Heavy contact lowers the center of gravity, plants the front hoof and turns into a downward diagonal compact-weapon blow. Compare with accepted Basic F3's horizontal extended-arm strike. This is a candidate difference, not a claim the player accepted the pose or its eventual animation.
- Whole character/weapon visible, no enemy, no baked wind/spark/light. Player should judge identity, weapon continuity and whether the Heavy silhouette is distinct and weighty enough.

Built-in image_gen, exact prompt stored alongside PNG; no Python or other post-generation pixel edit. First internal attempt rejected for visible background glow and edge proximity, then regenerated only from the three original approved references. Selected original copied unchanged. PNG fully decoded1254x1254RGBA/969599bytes/SHA256b889b214a2c2835cf26ae60b0d98e2086df2cdf1e66df0921f04065f446776b7.

**Safety limit:** nonzero-alpha bbox[55,27,1240,1254], reaches bottom via faint residue; alpha>128 bbox[90,187,1220,1130]. No obvious visible anatomy/weapon clipping in visual inspection, but alpha safety margins are NOT certified. Do not blindly slice or install this PNG. After pose acceptance preserve the original, perform reviewed safe transparent normalization/padding and independent cell checks before any GIF/strip/runtime. No resize/pixel-equality claim for this generated edit.

## Four-skill motion separation matrix — planning, not new art approvals

| Skill | Stance/weight | Main path and release | Follow-through/rhythm | Authority/status |
| --- | --- | --- | --- | --- |
| Basic 踏角 | Compact grounded stride | Short horizontal compact-blade/hoof strike | Quick anticipation/contact/return | Existing accepted poses and deployed timing; untouched |
| Heavy 逐風衝 | Low front-foot plant after actual engage | Rotated shoulder/hip diagonal chopping heavy collision; visually differs from Basic | Weight settles then recovery; proposed body mechanics | Current F3 candidate only; actual engage1.6/stop.65/one hit preserved, windup0 in current data; preview cannot silently authorize timing change |
| Special 迴蹄 | Diagonal reposition | Turning/rotational hoof strike | Distinct turn-and-settle | Future only; verify real event geometry/timing before art |
| Awakening 南山奔襲 | Rushing multihit | Three existing successive contacts | Staged strongest payoff | Future only; no invented hit/teleport/area |

## Next exact gate

STOP for player F3 identity/weapon/Heavy-motion approval. Only afterward author F1/F2/F4 individually, then unique independent Heavy wind ribbon and concentrated target impact/air-break effects, stronger than Basic but not an ultimate. No persistent target status for Heavy: ability does not apply a DoT/status. Prepare character-only and composite GIFs, normal/slow, right/left, phone scale and correct Idle return. Explicit GIF approval precedes engineering timing/residency preflight and runtime deployment. Current Heavy has no approved new windup; resolve that future contract against actual events rather than fake delayed HP/text.

No changes to approved P1 Basic, original identity, public assets, runtime/descriptors/gameplay/AI/Tier/rewards. No tests/Build/CI/Pages performed at this art checkpoint. No P2/new skill art or main merge.
