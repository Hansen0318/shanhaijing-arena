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
- Position: lower-left screen-space area of the fixed 960x540 stage.
- The currently selected living ally is the movement target.
- Valid stick displacement above the dead zone immediately calls the shared player-input handoff.
- Vector magnitude is clamped to 1.
- Character speed still comes from the selected character definition.
- Movement is clamped to Arena simulation bounds: x 0..10, y -2..2.
- Releasing the stick stops manual movement immediately.
- Release does not reset the selected character.

## AI handoff
- While valid joystick input is active, the selected actor's AI intent is suppressed by `ControlHandoff`.
- After joystick release, the actor remains under player ownership but idle until the existing 2.0 second timeout expires.
- At 2.0 seconds without valid player input, full AI resumes automatically.
- No AUTO/MANUAL label, icon, countdown, or toggle is shown.
- Other actors continue AI normally.

## Selection
- Selecting another living ally changes which actor the joystick controls.
- Any stored player movement for the previously selected ally is cleared.
- Camera remains fixed; selection never changes the view.
- If selected ally becomes KO, nearest-living-ally fallback still applies.

## Input mapping
The canvas is visually CSS-scaled on mobile while the logical stage remains 960x540.
Joystick pointer coordinates therefore map native client coordinates through the canvas DOM bounding rect back into logical stage coordinates. Do not assume CSS pixels equal Phaser logical coordinates.

## KO fixture
`?fixture=ko` remains a deterministic smoke route.
It forces A2 KO during the live runtime so fallback selection can be checked without changing production balance.

## Automated acceptance
- player input immediately owns movement;
- dead-zone/zero input does not refresh ownership;
- Arena bounds clamp;
- AI resumes after 2 seconds without valid input;
- existing headless deterministic simulation remains green.

## Player smoke
On mobile landscape:
1. A2 starts selected.
2. Drag lower-left joystick in several directions.
3. A2 actually moves around Arena.
4. Camera never moves.
5. Switch to A1/A3; joystick controls newly selected ally.
6. Release joystick: character stops manual movement.
7. After about 2 seconds, AI resumes moving/fighting.
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
- runtime fixture uses lower move speed and higher HP than the canonical deterministic headless fixture so manual switching and the 2-second AI resume can actually be observed.

Do not copy these temporary smoke stats into production balance without a separate balance decision.
