# M0 Movement Joystick + Shared Player Override

## Purpose
Make the first manual combat input real, not cosmetic.

The joystick controls the currently selected living ally's actual combat position in the same step-based battle session used by AI and headless simulation.

## Architecture
- `BattleSession` is the shared live/headless combat step engine.
- Existing `ControlHandoff` remains the single authority for player-vs-AI ownership.
- Headless 3v3 now runs through `BattleSession`; there is no duplicate combat implementation.
- Phaser runtime also runs a live `BattleSession`, replacing precomputed snapshot replay as the active battle source.

## Joystick behavior
- Position: lower-left screen-space area of the fixed 1120x540 stage.
- The currently selected living ally is the movement target.
- Valid stick displacement above the dead zone immediately calls the shared player-input handoff.
- Vector magnitude is clamped to 1.
- Character speed still comes from the selected character definition.
- Movement is clamped to Arena simulation bounds: x 0..10, y -2..2.
- Releasing the stick stops manual movement immediately.
- Release does not reset the selected character.

## AI handoff
- While valid joystick input is active, the selected actor's AI intent is suppressed by `ControlHandoff`.
- After joystick release, player ownership ends immediately.
- With no valid joystick input, full AI resumes on the next simulation step.
- No AUTO/MANUAL label, icon, countdown, or toggle is shown.
- Other actors continue AI normally.

## Selection
- Selecting another living ally changes which actor the joystick controls.
- Any stored player movement for the previously selected ally is cleared.
- Camera remains fixed; selection never changes the view.
- If selected ally becomes KO, nearest-living-ally fallback still applies.

## Input mapping
Current mobile baseline is the player-confirmed working path:
- Phaser logical surface remains fixed at 1120x540 with `Scale.NONE`;
- outer DOM scales/positions the fixed canvas;
- ally selection uses Phaser GameObject `setInteractive()`;
- joystick uses Phaser GameObject input plus explicit canvas-rect coordinate mapping for movement;
- do not replace this input/display path without a separate regression-safe migration.

## KO fixture
`?fixture=ko` remains a deterministic smoke route.
It forces A2 KO during the live runtime so fallback selection can be checked without changing production balance.

## Automated acceptance
- player input immediately owns movement;
- dead-zone/zero input does not refresh ownership;
- Arena bounds clamp;
- AI resumes immediately after valid input stops;
- existing headless deterministic simulation remains green.

## Player smoke
On mobile landscape:
1. A2 starts selected.
2. Drag lower-left joystick in several directions.
3. A2 actually moves around Arena.
4. Camera never moves.
5. Switch to A1/A3; joystick controls newly selected ally.
6. Release joystick: character stops manual movement.
7. AI resumes moving/fighting immediately after release.
8. Other actors continue AI while selected actor is manually controlled.
9. No viewport/camera regression.
10. KO fixture still falls back selection without moving camera.


## Mobile feel tuning
Player smoke tuning is allowed to change the runtime fixture without changing canonical combat balance.

Current runtime smoke tuning:
- joystick center moved closer to bottom-left;
- visual base radius remains generous for touch acquisition;
- full input magnitude is reached at a smaller input radius for faster response;
- dead zone is small;
- runtime fixture uses lower move speed and higher HP than the canonical deterministic headless fixture so manual switching and the immediate AI resume can actually be observed.

Do not copy these temporary smoke stats into production balance without a separate balance decision.


## Input architecture baseline
The player-confirmed working baseline was restored after later input/scale experiments caused mobile controls to stop responding.

Treat this baseline as protected:
- do not switch Scale Manager mode;
- do not replace GameObject input;
- do not add document/canvas touch adapters;
- change joystick feel incrementally, one variable at a time, with mobile smoke after each change.
