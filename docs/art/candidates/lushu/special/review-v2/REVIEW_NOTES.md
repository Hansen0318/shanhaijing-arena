# P1 Special four-pose + VFX review v2

Status: **COMPOSITE GIF PLAYER REVIEW PENDING**. Exact original sources were reattached2026-10-17T14:12:32+08:00. F3 matches its earlier accepted SHA256. No pose regeneration or source-color/alpha deletion.

## Reproduction and source preservation

Run `python scripts/prepareLushuSpecialComposite.py` from the repo checkout with Pillow installed. It checks all input hashes, generates four640x480 transparent cells and a2560x480 sheet, true-alpha white/dark order board, normal/slow composites and a character-only GIF. Every original is preserved under `docs/art/approved/lushu/special/recovered-inputs-v1/`; receipt.json binds exact hashes and the player statement. It reuses the two independent raw/padded VFX sources from `vfx-review-v1/`, never a flattened GIF.

One skull-width policy compensates different source pixel densities, then uses the common.22 XY scale. This is explicit review-only normalization, not per-pose silhouette-height fitting or an approved runtime scale. Manual skull reference boxes, source support-hoof X, core-foot Y, effective scales and translations are in review-manifest.json. Full source canvases, including invisible low-alpha fringe at some original edges, are retained. No frame is stretched nonuniformly, cropped through anatomy, repainted or regenerated. Every packaged nonzero-alpha margin exceeds24px (actual minimum57px). The source can be restored exactly from the preserved originals; downsampled cells are derivatives, not lossless masters.

Original raw F1/F2 have faint alpha reaching the bottom and F2/F4 left fringe. Opaque cores remain inside source boundaries. Derivative padding prevents cell bleed, without pretending it restores any missing source detail. True alpha composite inspection shows the intended complete silhouettes and retained white mane/red tail/knife/hooves. Each separate cell and sheet round-trip is checked.

## Reviewed sequence and independent layers

Order: original approved Idle F1 → F1 load → F2 raised knee → F3 extended rotational kick → F4 recovery → approved Idle. Right-facing cycle followed by exactly mirrored left-facing cycle. Idle uses `public/assets/characters/lushu/battleIdle-4f.png` F1; it is not a replacement generated standing frame. Character-only GIF isolates the articulated motion for inspection. No whole-sprite wobble, invented in-betweens or extra dash.

Source rotational arc behind character is480x400 at peak; one target-impact in front is500x350 at peak, centered to place its energy core near the F3 extended hoof. Body scale is not increased to imply power. Reduced scene/HUD/readability and actual phone acceptance remain future runtime gates. Existing vfx-review-v1 comparison provides reference footprint only, not proof of actual gameplay rendering.

Preview timing per direction: Idle400 / F1 200 / F2 120 / F3 200 / F4 240 / Idle560ms. Source effect600–1000ms; contact720–1080ms, one burst. Normal two-direction GIF3440ms; slow6880ms. The visual hit occurs320ms after F1 starts. The real P1 Special currently resolves immediately (0ms): these preview timings DO NOT approve delaying real damage, movement, cooldown, damage text or HP. No actual target/HP is simulated in this review.

GIF encoder coalesces identical held frames; decode verification expands all held durations and compares all86 authored time samples exactly to the shared-palette expected images. Source hashes, cell margins, transforms, timing, effect-source hashes and GIF hashes are reproducible in manifest/checksums.

## Current gate and next step

Player reviews the composite: movement order/size consistency, visible rotational source effect, one stronger contact explosion, right/left clarity and Idle return. New effect/GIF acceptance must be explicit and bound to these exact hashes. Do not reopen the prior four-pose approval. On acceptance, inspect the shared Special lifecycle and obtain any necessary separate real timing decision before runtime integration. No production source, build/deploy, new skill/character or main merge is authorized by this artifact preparation.
