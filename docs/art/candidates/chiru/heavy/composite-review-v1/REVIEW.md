# Heavy 湧浪 — composite review v1

Status: F3 v3 PLAYER APPROVED; F1/F2/F4, external VFX and these GIFs PLAYER REVIEW PENDING.

## Review entry
- [Normal](chiru-heavy-normal.gif), [Slow](chiru-heavy-slow.gif), [No external FX](chiru-heavy-noFX.gif)
- [Miss](chiru-heavy-miss.gif), [Mirror](chiru-heavy-mirror.gif), [Idle return](chiru-heavy-idle-return.gif), [Reduced](chiru-heavy-reduced.gif)
- [Heavy vs Basic, same actor scale](heavy-vs-basic.gif), [Body-only comparison](heavy-vs-basic-noFX.gif)
- [Pose light/dark QA](poses-light-dark-QA.png), [FX light/dark QA](fx-light-dark-QA.png), [Decoded contact sheet](normal-contact-sheet.png)

## Evidence and boundaries
- Immutable approved F3 SHA256 8943837f65e321bc2bd7290280af829801e9735cf3e3033300ba991314e694f6; source receipt and P1/P2/Basic untouched.
- New originals: F1/F2/F4, compression ring, broad water column, localized true-hit wave crown. Built-in image_gen prompts preserved in prompts.json.
- All four poses use common .13 source scale, chest X158 and hover baseline Y203. Identity/earring side/large shapes visually reviewed against approved Idle/F3. Actual movement of anatomy comes from authored poses, not runtime hit geometry.
- Full source RGBA retained; padding/resize/cell/strip/mirror round trips asserted. No source trimming or equal-width collage slicing. Source faint alpha may reach original edge; retained with safe transparent destination borders. Native padded intermediate is reconstructible by prepare_preview.py, not a new master.
- T0 F1 200ms + F2 150ms; F3 release 350ms, contact 700ms, F3 holds 400ms, F4 200ms. Every GIF has an Idle lead/return. Slow uses 3x action playback. tier-timeline.json preserves exact four-tier fractional logical times; GIF clocks are T0 centiseconds.
- Target cross is only a preview marker, not an enemy/runtime collision test. Miss marker sits outside lane and receives no impact. NoFX removes external authored VFX; the approved held-water-ring pixels are deliberately preserved.
- Heavy/Basic comparison uses same actor cell, common source scale and cast start. Both original Basic 180ms event and Heavy 700ms event represented without sampling delay. Heavy charge width90 vs Basic64; localized impact190 vs Basic110 (source-width display setting), distinct authored shapes, actor size not increased.
- Reduced uses stationary low-opacity lane, no expanding column, same contact time and fading localized contact.
- All 9 GIFs completely decoded with duration/hash verification and exact indexed-pixel/timing round trip including merged equal frames. These are art previews, not gameplay footage, real damage/phone/Tier/runtime validation.
- Author self-review only; new art and GIFs still need player approval. No Runtime integration, product edits, test suite/build/browser/Pages/deployment or Special.

Rebuild: python docs/art/candidates/chiru/heavy/composite-review-v1/prepare_preview.py (Pillow).

Next: present these existing GIFs and wait for explicit player approval. Only after it may a successor record a scoped receipt and proceed to Heavy Runtime gate under the sequential workflow; do not regenerate F3 or redo finished art checks.
