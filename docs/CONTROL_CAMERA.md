# Control & Camera v1

## Canonical presentation
- Mobile landscape is the canonical play orientation.
- Arena logical stage is fixed at 1120x540.
- Phaser Scale Manager owns canvas scaling with `FIT + CENTER_BOTH`.
- The outer DOM host may follow `visualViewport` so iOS browser chrome does not offset the visible game region.
- The host never scales the canvas directly; Phaser owns the canvas display transform.
- The full 1120x540 Arena remains visible.
- Do not crop, stretch, dynamically re-project, or move the camera because of selection.
- Portrait shows the same 16:9 stage uniformly scaled down.

## Input ownership
- Phaser Input Manager owns pointer/touch coordinate transforms.
- Do not attach document-level touch/pointer workarounds for normal combat controls.
- Do not manually map CSS client coordinates back into Arena coordinates while Scale Manager is active.
- Runtime controls use Phaser pointer coordinates in the same 1120x540 logical space as Arena objects.

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
- no resize-driven Arena geometry transform.
