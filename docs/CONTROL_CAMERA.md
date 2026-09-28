# Control & Camera v1

## Canonical presentation
- Mobile landscape is the canonical play orientation.
- Arena logical stage is fixed at 960x540.
- Phaser uses an immutable 960x540 game surface with no runtime Scale Manager resizing.
- Browser CSS alone uniformly contains the 16:9 canvas in the visible screen.
- The full 960x540 Arena must always remain visible.
- The display may uniformly scale down to fit the browser viewport.
- Do not crop, stretch, dynamically re-project, or resize Arena geometry based on transient mobile browser viewport measurements.
- Portrait simply shows the same 16:9 stage scaled down to fit width; no layout reflow is allowed.
- Extra screen area uses the same Arena background color.
- Camera is fixed for the entire battle.
- Selection never changes camera.

## Character selection
Selecting an ally:
- changes selected character;
- changes selected visual state;
- changes future HUD/skill context;
- does not move, pan, zoom, or retarget the view.

## KO
- Selected KO falls back to nearest surviving ally.
- Only selection changes.
- Camera remains fixed.

## Camera hard rules
- `stopFollow()` is canonical.
- camera scroll is 0,0.
- no `startFollow`.
- no runtime camera retarget.
- no resize-driven Arena transform.
