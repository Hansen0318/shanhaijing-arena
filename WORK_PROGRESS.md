# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Fixed Arena / iPhone viewport strategy retained.
- Current slice: **movement joystick + shared player override input**
- Current status: **INPUT ARCHITECTURE REWORK COMPLETE IN CODE — AUTO VERIFY / MOBILE SMOKE PENDING**
- Preview URL: https://hansen0318.github.io/shanhaijing-arena/
- KO smoke URL: https://hansen0318.github.io/shanhaijing-arena/?fixture=ko

## Why input architecture was reworked
Player repeatedly confirmed that ally selection and joystick were non-responsive on iPhone Chrome/Safari despite successful deploys.
The root architectural issue was that the game canvas had been visually scaled/positioned outside Phaser while input hit testing was handled through a separate manual DOM/touch path.

That split ownership is retired.

## Canonical display/input architecture
- logical game remains 960x540;
- outer `#game` host follows `visualViewport` bounds only;
- Phaser Scale Manager owns canvas display scaling with `FIT + CENTER_BOTH`;
- Phaser Input Manager owns pointer/touch transforms;
- ArenaScene consumes Phaser `pointer.x / pointer.y` in logical stage coordinates;
- no document touch capture;
- no manual client->stage mapping;
- no CSS width/height override on canvas;
- fixed camera remains unchanged.

## Chat-completed implementation
- `src/main.js`: restored Phaser Scale Manager ownership and enabled 3 active pointers;
- `index.html`: host follows visual viewport but canvas dimensions are Phaser-owned;
- `src/runtime/arenaInput.js`: pure circle hit-test and joystick-vector helpers;
- `tests/arenaInput.test.js`: helper tests;
- `ArenaScene`: Phaser Input Manager handles pointerdown/move/up for ally selection and joystick;
- existing live BattleSession / ControlHandoff remain unchanged;
- joystick remains at the lower-left tuned position;
- no skill buttons yet.

## Required automated verification
- all tests PASS;
- Vite build PASS;
- Pages deploy PASS.

## Required mobile smoke
Default URL:
1. A2 starts selected.
2. Tap A1/A2/A3: white selection ring changes.
3. Drag joystick: knob follows finger.
4. Selected ally moves.
5. Release: manual movement stops.
6. After ~2s AI resumes.
7. Camera remains fixed.
8. No viewport regression.

KO URL:
- fallback selection works;
- joystick controls fallback ally.

## Gate
Do not add Heavy / Special / Awakening until this input architecture passes mobile smoke.
