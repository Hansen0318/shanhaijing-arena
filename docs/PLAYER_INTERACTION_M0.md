# M0 First Player-Testable Interaction Slice

## Goal
Create the smallest meaningful player-visible interaction before joystick/skills/final art.

## Scope
This slice includes:
- three allied selection controls;
- selected-character visual state;
- fixed fullscreen Arena presentation;
- selected identity remains stable while replay frames advance.

No gameplay mutation is introduced. The combat snapshot replay remains read-only.

## Interaction
- The three allied placeholders are directly tappable/clickable.
- Tapping an allied placeholder selects it.
- Tapping an enemy does nothing.
- The selected allied marker has an obvious ring/outline state.
- Selecting A1/A2/A3 must not move, pan, zoom, or retarget the camera.
- Selection does not reset merely because AI continues or the replay advances.
- No AUTO/MANUAL indicator is shown.

## Fullscreen fixed-arena requirement
- The entire landscape game viewport reads as battlefield.
- No small bordered arena rectangle.
- Camera is fixed.
- Actor simulation coordinates are projected into the visible viewport with proportional margins.
- The complete 3v3 formation should be visible whenever actors remain inside canonical arena bounds.
- Future portraits, joystick, skill buttons, timer, HP, and other HUD elements are screen-space overlays.

## Initial selection
Default selected ally: `a2`.

## KO behavior
- if the selected ally becomes KO in a replay frame, automatically select the nearest living ally using the existing Arena targeting helper;
- camera remains fixed;
- if no allied survivor exists, retain no selected actor.

## Player smoke
Check:
1. landscape battlefield fills viewport;
2. no floating battlefield frame;
3. all six placeholders are visible when expected;
4. tapping A1/A2/A3 changes selected highlight;
5. camera/view does not move when selection changes;
6. actor scale remains stable and reasonable;
7. enemy tapping does not change selection;
8. replay keeps running;
9. KO fallback changes selection without moving the view.

No final-art, joystick, skill-button, HUD, VFX, or balance judgment belongs to this smoke.
