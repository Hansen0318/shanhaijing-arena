# P1 Basic VFX + GIF review v1

Status: **FOUR CHARACTER POSES PLAYER APPROVED / VFX + COMPOSITE GIF PLAYER REVIEW PENDING**.

Player accepted the complete four-pose review with「好可以，繼續」at 2026-10-15T21:43:37+08:00. Exact accepted source PNGs are copied, not regenerated, under `docs/art/approved/lushu/basic/`. F3's earlier acceptance remains unchanged. This accepts character art only; the two new effects and the GIF still require explicit acceptance. No runtime, descriptor, gameplay, tests, build, CI, Pages or main merge is authorized by this artifact checkpoint.

## Review assets and reproduction

- `lushu-basic-vfx-review-v1.gif`: normal review speed, right/left mirror and small-size inset.
- `lushu-basic-vfx-review-v1-slow.gif`: same art/effects, action at one-third speed for inspection.
- `lushu-basic-4f-safe-review-v1.png`: four 384x384 transparent cells, 1536x384 total; character only. Art-preparation derivative, not installed into runtime.
- Four `*-cell.png` files are exact cells of that strip; no naive collage slicing.
- `blade-sweep-raw-v1.png` and `contact-spark-raw-v1.png`: original generated transparent candidate effects. Full prompts adjacent. Built-in imagegen used for effects only; character sources were not regenerated.
- `alpha-light-dark-review-v1.png`, `contact-composite-review-v1.png`: static inspection proofs.
- `review-manifest.json`: source hashes, transforms, alpha bounds/margins, effect positions/layers, preview timing and decoded GIF checks.
- `SHA256SUMS.json`: package/checkpoint content checksums, excluding itself.

Run from repo root with Python and Pillow: `python docs/art/candidates/lushu/basic/review-v1/prepare_review.py`. Uses DejaVuSans from the recorded Linux font path. This reproduces derivatives/GIF/manifest; it does not update approval, manual inspection notes or SHA256SUMS. Approved source hashes are asserted before processing. No production tools or dependencies changed.

## Actual preparation and checks

All four source SHA256 values/dimensions/RGBA verified. The accepted originals remain byte-identical. Each full source canvas is resized uniformly at .25 and translated only; no threshold deletion, silhouette crop, recolor, limb interpolation or character redraw. Alpha>128 is used ONLY to locate the visible foot baseline at y320. Even disconnected low-alpha source residue is retained. Resize is a derivative operation; it does not claim every full-resolution pixel survives one-to-one in a smaller image.

Every nonzero-alpha pixel in the resized canvases lies inside its cell. Nonzero-alpha transparent L/T/R/B margins:

| Pose | Left | Top | Right | Bottom |
| --- | ---: | ---: | ---: | ---: |
| F1 | 59 | 53 | 51 | 54 |
| F2 | 61 | 64 | 42 | 61 |
| F3 | 66 | 79 | 43 | 61 |
| F4 | 77 | 39 | 51 | 61 |

Strip extraction round-trip equals each saved cell pixel-for-pixel. All four separate cells inspected on light/dark backgrounds: complete head/antlers/tail/blade/hands/feet, no neighboring silhouette and no visible boundary clipping. No claim that original low-alpha residue was removed. Both effect raw PNGs have real alpha; no opaque background baked onto actor.

Final disk-read verification also caught a truncated combined PNG (131125bytes) despite its earlier complete in-memory export and manifest (324652bytes). The cause of that later truncation is unconfirmed. Reconstructed from the four intact saved cells into a temporary PNG, fully decoded and checked before atomic replacement. Repaired file is exactly324652bytes and SHA25689f2c98fe5c71ca31b34105c2cd6d5f37c2cff6e1071dc523c58ff2fda32fe03, matching the original complete export. Packaging now decodes the written temporary file before replacing the combined strip. All file checksums were refreshed after repair; no failed file is delivered or ignored.

Initial preview safety assertion rejected a contact-spark full canvas extending 7px beyond its panel (303 + round(1536*.12) = 487 >480). Corrected only the candidate effect's transform: scale .11 at [310,91], full canvas ends x479; checks now pass. Character PNGs untouched.

Blade sweep is composited behind actor, contact spark in front at the blade tip. Preview contains one strike; effects do not imply extra damage, a projectile or wider attack range. All eight decoded normal-GIF frames inspected as a contact sheet: no persistent prior-frame residue, mirror includes weapon/effects, visible face/torso, spark only in F3, F4 clears effects and returns to the actual approved Idle F1 (region 0,0,96,128). Idle return is an explicit pose switch; subjective continuity is still for player GIF review. No anatomy in-betweens or crossfade were invented to hide it.

Normal GIF decoded: 8 frames, [550,120,60,40,40,20,120,650]ms, total1600ms. Four character poses occupy400ms; three F3 samples merely decay separate effects. Slow GIF decoded: 8 frames, total2400ms. Review Idle holds and action time are not authoritative combat timing. Small-size inset is a visual aid, not actual engine/device sizing evidence.

## Stop / exact next gate

Wait for player judgment of attack flow, blade continuity, Idle return and VFX strength/readability. Correct only requested art/effect/timing. Do not mark VFX/GIF approved in advance. After explicit GIF acceptance AND scoped engineering authorization, prepare the self-contained handoff ZIP and shared runtime integration plan against actual cast/hit timing, protected Idle/Move/KO/pause/reduced-motion/residency contracts. First full slice remains production-validation pending. No main merge.
