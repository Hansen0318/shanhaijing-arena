# Control & Camera v1

## Character selection
Three allied portraits/actors may be selected.
Selecting an ally:
- changes the selected character;
- changes the selected visual state;
- changes the skill HUD to that character when HUD is added;
- **does not move or retarget the camera**.

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
- Fixed camera remains unchanged.
- Skill HUD remains that character's HUD.
- No AUTO/MANUAL text, icon, countdown, or mode-toggle button is shown.

## Fullscreen fixed-arena presentation
- Canonical play orientation is mobile landscape.
- On load, the battlefield fills the available game viewport.
- The camera is fixed for the entire battle.
- The whole 3v3 encounter should remain readable in one view whenever actors are inside the canonical arena bounds.
- Do not pan, soft-follow, retarget, or zoom the camera when selection changes.
- Do not represent the battlefield as a smaller bordered card inside unused screen space.
- Arena simulation coordinates are projected directly into the current viewport with proportional safe padding.
- Resize/orientation changes recompute actor screen positions; they do not globally zoom the scene.
- Portrait is secondary/debug support only; it must remain undistorted, but landscape is the acceptance orientation.
- Combat/HUD controls are screen-space overlays over the battlefield.

## KO selection behavior
- If the selected ally is KO, selection moves to the nearest surviving ally.
- Camera remains fixed.
- If no allied survivor exists, selected character becomes null.

## Camera
- Camera scroll remains fixed at 0,0.
- No selected-character camera focus.
- No camera follow.
- No camera retarget animation.
- No camera-dependent world edge exposure should exist in normal play.
