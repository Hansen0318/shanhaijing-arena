# M0 First Player-Testable Interaction Slice

## Goal
Create the smallest meaningful player-visible interaction before joystick/skills/final art.

## Scope
This slice adds only:
- three allied selection controls;
- selected-character visual state;
- smooth camera retargeting to the selected ally;
- selected identity remains stable while replay frames advance.

No gameplay mutation is introduced. The combat snapshot replay remains read-only.

## Interaction
- The three allied placeholders are directly tappable/clickable.
- Tapping an allied placeholder selects it.
- Tapping an enemy does nothing.
- The selected allied marker has an obvious ring/outline state.
- Camera follows the selected allied marker using the existing soft-follow damping.
- Selection does not reset merely because AI continues or the replay advances.
- No AUTO/MANUAL indicator is shown.

## Initial selection
Default selected ally: `a2`.

## KO behavior
For this first interaction slice:
- if the selected ally becomes KO in a replay frame, automatically select the nearest living ally using the existing Arena targeting helper;
- if no allied survivor exists, retain no selected actor and stop camera retargeting.

## Player smoke
Once deployed/accessibly previewed, the player only needs to check:
1. all six placeholders are visible;
2. tapping a1/a2/a3 changes the selected highlight;
3. camera smoothly moves to the selected ally;
4. enemy tapping does not change selection;
5. replay keeps running while selection remains;
6. selected KO fallback feels understandable.

No art-quality, joystick, skill-button, HUD, VFX, or balance judgment belongs to this smoke.
