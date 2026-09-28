# M0 First Player-Testable Interaction Slice

## Fixed-stage interaction contract
- Arena is a fixed 960x540 logical stage.
- It is uniformly contained and centered inside the real viewport.
- All six actors should fit in the same battle view when inside canonical bounds.
- A1/A2/A3 selection only changes the white selection outline.
- Selection does not move, pan, zoom, or resize the Arena.
- Enemy tap is no-op.
- KO fallback changes selected ally only.
- Replay continues on the same fixed stage.

## Player smoke
Landscape:
1. entire Arena stage visible at once;
2. Arena proportions look stable;
3. no cropping or excessive zoom;
4. no camera movement when selecting A1/A2/A3;
5. six actors stay visible when expected;
6. replay movement stays inside same fixed stage;
7. KO fallback does not move view.

Portrait is only a containment sanity check and is not the target play orientation.
