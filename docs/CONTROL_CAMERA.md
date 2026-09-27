# Control & Camera v1

## Character selection
Three allied portraits are shown on the left side.
Selecting a portrait:
- changes the selected character;
- changes the skill HUD to that character;
- moves the camera focus to that character.

## Player override
Valid combat inputs:
- movement joystick;
- Heavy;
- Special;
- Awakening;
- future explicit target input, if added.

Any valid combat input immediately takes priority over AI intent for the selected character.

## AI resume
- Timer starts from the last valid combat input.
- After 2.0 seconds without valid combat input, full AI tactical control resumes.
- Selected character remains selected.
- Camera remains on that character.
- Skill HUD remains that character's HUD.
- No AUTO/MANUAL text, icon, countdown, or mode-toggle button is shown.

AI should not make the handoff feel abrupt:
- preserve a still-valid current target;
- finish non-cancellable action animation;
- preserve current facing/position where reasonable;
- then resume normal decisions.

## Camera
- Soft-follow selected character with damping/dead zone.
- Do not hard-lock every frame to exact center.
- Keep useful forward combat space visible.
- Clamp camera to arena boundaries.
- Character switching transitions smoothly rather than snapping.
