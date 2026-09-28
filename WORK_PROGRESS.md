# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Current status: **FIXED 960x540 CONTAINED ARENA IMPLEMENTED — AUTO VERIFY / PLAYER SMOKE PENDING**
- Preview URL: https://hansen0318.github.io/shanhaijing-arena/
- KO smoke URL: https://hansen0318.github.io/shanhaijing-arena/?fixture=ko
- Recovery rule: selected-character camera follow is retired; do not restore it

## Why the player still saw camera-follow behavior
The first fixed-camera implementation never reached Pages because workflow run #30 failed in a projection test due only to floating-point exact equality:
- actual y: 453.5999999999999
- expected y: 453.59999999999997

Build/deploy were skipped, so Pages remained on older run #23. The player was therefore still seeing the previous deployed runtime.

## Final simplified visual strategy
- Canvas follows browser viewport via Phaser RESIZE.
- Arena itself is a stable logical 960x540 stage.
- Arena stage is uniformly contain-scaled into viewport and centered.
- No crop-to-fill.
- No aspect distortion.
- No larger scrolling world.
- No selected-character camera follow or retarget.
- Selection only changes highlight/HUD state.
- KO fallback only changes selection.
- Extra viewport area is passive same-family background.

## Implementation
- `arenaToStage()` maps simulation coordinates into fixed 960x540 design coordinates.
- `fitStageToViewport()` calculates one uniform scale plus centered offsets.
- all battlefield graphics and actor markers belong to one `arenaLayer` Phaser Container.
- resize/orientation only updates that container's scale/position.
- camera is repeatedly enforced as `stopFollow(), scroll 0,0`.
- floating-point exact-equality test replaced with stable containment assertions.

## Required verification
Automated:
- tests PASS;
- production build PASS;
- Pages deploy PASS.

Player/browser landscape smoke:
- whole Arena visible;
- proportions stable;
- no crop/over-zoom;
- selecting A1/A2/A3 changes only highlight;
- view does not move;
- all six actors visible when expected;
- KO fallback does not move view;
- no blocking runtime error.

## Gate
Only after PASS proceed to `movement joystick + shared player override input`.
