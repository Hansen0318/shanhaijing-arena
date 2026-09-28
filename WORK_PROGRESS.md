# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Current status: **FIXED FULLSCREEN CAMERA STRATEGY IMPLEMENTED — AUTO VERIFY / PLAYER SMOKE PENDING**
- Preview URL: https://hansen0318.github.io/shanhaijing-arena/
- KO smoke URL: https://hansen0318.github.io/shanhaijing-arena/?fixture=ko
- Recovery rule: do not restore the retired selected-character camera-follow strategy unless Product Owner explicitly changes direction
- Next exact step: verify fixed fullscreen Arena presentation; joystick remains gated until this passes

## Product Owner visual-strategy decision
Previous viewport/world/camera-follow iterations were rejected because scaling and camera retargeting caused composition shifts, offset, and over-zoom.

New canonical strategy:
- mobile landscape fullscreen battlefield;
- fixed view for the whole battle;
- selection never changes camera;
- whole 3v3 encounter should remain visible in one view;
- Arena simulation coordinates map proportionally into the visible viewport;
- no larger scrolling world is required for this M0 presentation.

## Chat-first implementation
- removed selected-character `startFollow`;
- camera fixed at scroll 0,0;
- removed dependence on 1280x720 scrolling world;
- replaced world projection with viewport-relative projection;
- full viewport background resizes with browser viewport;
- actor positions are recalculated on resize/orientation change;
- A1/A2/A3 still change selected highlight only;
- KO fallback still changes selected ally but not view;
- combat/AI/Ability/headless logic unchanged.

## Required automated verification
- tests PASS;
- production build PASS;
- Pages deploy PASS.

## Required player/browser smoke
Landscape:
- game loads as a fullscreen battlefield;
- six actors fit in the same fixed view;
- no camera movement when A1/A2/A3 are selected;
- selection white ring changes correctly;
- no excessive zoom;
- no scene offset;
- replay movement remains visible;
- enemy click is no-op;
- KO fixture changes selection without moving view;
- no blocking runtime error.

Portrait is only a sanity check; landscape is canonical.

## Gate
If PASS, mark fixed fullscreen Arena presentation accepted and proceed to:
`movement joystick + shared player override input`.
