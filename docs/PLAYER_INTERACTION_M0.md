# M0 First Player-Testable Interaction Slice

## Goal
Create the smallest meaningful player-visible interaction before joystick/skills/final art.

## Scope
This slice includes:
- three allied selection controls;
- selected-character visual state;
- smooth camera retargeting to the selected ally;
- selected identity remains stable while replay frames advance;
- fullscreen arena-world presentation.

No gameplay mutation is introduced. The combat snapshot replay remains read-only.

## Interaction
- The three allied placeholders are directly tappable/clickable.
- Tapping an allied placeholder selects it.
- Tapping an enemy does nothing.
- The selected allied marker has an obvious ring/outline state.
- Camera follows the selected allied marker using the existing soft-follow damping.
- Selection does not reset merely because AI continues or the replay advances.
- No AUTO/MANUAL indicator is shown.

## Fullscreen arena requirement
- The entire landscape game viewport must read as battlefield.
- There must be no small bordered arena rectangle surrounded by unused screen space.
- The arena world must be larger than the viewport so selection/camera retargeting reads as camera motion within the battlefield.
- Camera bounds must prevent exposing empty space outside the arena.
- Future portraits, joystick, skill buttons, timer, HP, and other HUD elements are screen-space overlays over the arena.

## Initial selection
Default selected ally: `a2`.

## KO behavior
- if the selected ally becomes KO in a replay frame, automatically select the nearest living ally using the existing Arena targeting helper;
- if no allied survivor exists, retain no selected actor and stop camera retargeting.

## Player smoke
Check:
1. battlefield fills the landscape viewport;
2. no floating battlefield frame is visible;
3. all six placeholders are visible when expected;
4. tapping a1/a2/a3 changes the selected highlight;
5. camera movement reads as motion through the battlefield;
6. camera never reveals outside-world blank space;
7. enemy tapping does not change selection;
8. replay keeps running while selection remains;
9. selected KO fallback feels understandable.

No final-art, joystick, skill-button, HUD, VFX, or balance judgment belongs to this smoke.
