# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Current status: **FIXED 960x540 FIT STAGE IMPLEMENTED — AUTO VERIFY / PLAYER SMOKE PENDING**
- Preview URL: https://hansen0318.github.io/shanhaijing-arena/
- KO smoke URL: https://hansen0318.github.io/shanhaijing-arena/?fixture=ko

## Latest player defect
On iPhone Safari, switching portrait/landscape and refreshing could produce different offsets because the previous strategy depended on runtime viewport resize measurements. Both default and KO fixture showed the same presentation defect.

## Final stabilization strategy
- remove viewport-driven Arena transforms entirely;
- fixed logical Arena: 960x540;
- Phaser display: FIT + CENTER_BOTH;
- full Arena always visible;
- no crop;
- no stretch;
- no dynamic Arena re-projection after load;
- no camera follow;
- no selection-driven view movement;
- same-color outer background hides device aspect-ratio remainder cleanly.

## Code impact
- `src/main.js`: fixed 960x540 + FIT/CENTER_BOTH;
- `ArenaScene`: no resize listener, no Arena container transform, fixed camera;
- `arenaProjection`: stable Arena-stage mapping only;
- projection tests simplified to deterministic stage coordinates;
- no combat/AI/Ability/KO logic changed.

## Required verification
Automated:
- all tests PASS;
- production build PASS;
- Pages deploy PASS.

Player/browser:
- landscape load/reload repeatedly gives same centered composition;
- portrait -> landscape -> reload remains stable;
- six actors fit in one view;
- no excessive zoom/crop;
- selecting A1/A2/A3 changes only highlight;
- default and KO fixture share identical fixed view behavior.

## Gate
After PASS, proceed to `movement joystick + shared player override input`.
