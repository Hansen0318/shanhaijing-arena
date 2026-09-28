# Control & Camera v1

## Canonical presentation
- Mobile landscape is the canonical play orientation.
- The battle camera is fixed for the entire match.
- The Arena uses a stable logical design stage of 960x540.
- The whole Arena layer is uniformly scaled with contain semantics to fit inside the actual browser viewport.
- The Arena layer is centered in the viewport.
- Never crop the Arena to fill the screen.
- Never distort/stretch the Arena to match an arbitrary device aspect ratio.
- Never pan, follow, retarget, or zoom because of character selection.
- Extra viewport area outside the contained 960x540 Arena uses the same background family and is not another scrollable world.
- The full canonical 3v3 encounter remains visible in one fixed view.

## Character selection
Selecting an ally:
- changes selected character;
- changes selected visual state;
- changes that character's HUD/skills when those UI elements exist;
- does not affect camera or Arena transform.

## Player override
Valid combat inputs:
- movement joystick;
- Heavy;
- Special;
- Awakening;
- future explicit target input, if added.

Any valid combat input immediately takes priority over AI intent for the selected character.

## AI resume
- After 2.0 seconds without valid combat input, full AI control resumes.
- Selected character remains selected.
- Fixed camera remains unchanged.
- No AUTO/MANUAL indicator.

## KO
- If selected ally is KO, selection moves to nearest surviving ally.
- Camera and Arena transform remain unchanged.
- If no ally survives, selected character becomes null.

## Camera hard rules
- `stopFollow()` is the canonical state.
- camera scroll remains 0,0.
- no `startFollow` in M0 battle presentation.
- no selection-driven camera animation.
