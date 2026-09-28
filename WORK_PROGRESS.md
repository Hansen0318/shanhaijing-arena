# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Current status: **IMMUTABLE 960x540 CSS-CONTAIN STAGE IMPLEMENTED — AUTO VERIFY / PLAYER SMOKE PENDING**
- Preview URL: https://hansen0318.github.io/shanhaijing-arena/
- KO smoke URL: https://hansen0318.github.io/shanhaijing-arena/?fixture=ko

## Final viewport strategy
Player confirmed the desired behavior is the original simple model:
- one fixed landscape 16:9 game surface;
- landscape: scale the whole surface uniformly to fit;
- portrait: shrink the same landscape surface and fit it inside the portrait screen;
- never re-layout or re-project the battle based on orientation;
- camera never moves on selection.

## Implementation
- Phaser logical surface remains exactly 960x540.
- Phaser Scale Manager runtime scaling is disabled with `Phaser.Scale.NONE`.
- Browser CSS alone centers and uniformly contains the canvas.
- `#game` uses a fixed 16:9 aspect ratio and a width constrained by both viewport width and viewport height.
- canvas fills that 16:9 host proportionally.
- no runtime resize listener or Arena transform.
- no combat/AI/Ability/KO changes.

## Expected behavior
Landscape:
- whole 16:9 Arena visible and centered;
- no crop;
- no camera movement;
- selection changes highlight only.

Portrait:
- exact same landscape Arena shrinks to fit width;
- no rearrangement;
- no offset caused by orientation-specific geometry;
- blank space above/below is acceptable.

## Required verification
- tests PASS;
- build PASS;
- Pages deploy PASS;
- repeated portrait/landscape loads show the same composition, only uniformly scaled.

## Gate
After player smoke PASS, proceed to `movement joystick + shared player override input`.
