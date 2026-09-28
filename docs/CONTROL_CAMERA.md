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

## Fullscreen arena presentation
- The landscape viewport is fully occupied by the arena presentation.
- Do not present the battlefield as a smaller framed rectangle floating inside unused screen space.
- The arena world is larger than the logical viewport so camera movement reads as movement through the battlefield rather than movement of a map card.
- Current M0 logical viewport: 960x540.
- Current M0 arena world: 1280x720.
- Both use 16:9 to prevent camera motion from revealing outside-world empty bands.
- Combat/HUD controls are screen-space overlays above the battlefield and must not move with the world camera.

## Camera
- Soft-follow selected character with damping/dead zone.
- Do not hard-lock every frame to exact center.
- Keep useful forward combat space visible.
- Clamp camera to arena-world boundaries so no outside-world blank area appears.
- Character switching transitions smoothly rather than snapping.
- Camera motion must read as moving through one continuous fullscreen arena, not as sliding a bordered battlefield around the screen.
