# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Current status: **FIXED FULLSCREEN ARENA / IOS VIEWPORT PLAYER SMOKE PASS**
- Preview URL: https://hansen0318.github.io/shanhaijing-arena/
- KO smoke URL: https://hansen0318.github.io/shanhaijing-arena/?fixture=ko
- Recovery rule: do not restore selected-character camera follow, dynamic Arena reprojection, or resize-driven camera movement
- Next exact implementation: **movement joystick + shared player override input**

## Accepted presentation
Player confirmed the latest iPhone Safari behavior is normal:
- fixed 960x540 Arena game surface;
- landscape is canonical;
- portrait shows the same landscape stage scaled down;
- direct landscape reload and portrait->landscape transition no longer produce the prior offset defect;
- camera remains fixed;
- A1/A2/A3 selection does not move the view;
- default and KO fixture share the same fixed presentation.

## Closed defect
The mobile viewport/camera presentation defect is resolved for this slice.

Root causes addressed across the final solution:
- removed selected-character camera follow;
- removed scrolling-world presentation;
- removed resize-driven Arena reprojection;
- fixed Phaser logical surface at 960x540;
- Phaser Scale Manager runtime scaling disabled;
- outer DOM host uniformly contains the fixed stage;
- iPhone Safari host anchoring uses visualViewport to stabilize direct-landscape reload.

## Next implementation slice
**movement joystick + shared player override input**

Requirements:
- joystick controls the currently selected living ally;
- valid joystick input immediately overrides AI movement intent for that ally;
- selected ally remains selected;
- after 2.0s without valid player combat input, full AI control resumes;
- no AUTO/MANUAL UI;
- camera remains fixed;
- no joystick work may reintroduce viewport/camera coupling;
- reuse existing control-handoff state/API rather than duplicate ownership logic;
- start with movement only; skill buttons remain a later slice.

## Verification scope for next slice
- static/unit tests for handoff semantics;
- targeted movement/selection regression;
- browser/player smoke for joystick feel on mobile landscape;
- full regression only if shared combat/input modules are broadly changed.
