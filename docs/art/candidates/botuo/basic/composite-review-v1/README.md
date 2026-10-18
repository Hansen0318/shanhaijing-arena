# P2 Botuo Basic GIF preview v1

Status **GIF/VFX CANDIDATE / PLAYER REVIEW PENDING**. Source recovery `dec02b2786b8d3829a5b4cb0b01350e62023a9bd`.
Player authorized GIF preparation on2026-10-18T17:22:42+08:00:「好接下來是做gif給我確認嗎，是的話就給我連結看」.
This authorizes showing the presented poses in preview, superseding the older stop-before-GIF instruction; no independent explicit F1/F2/F4 acceptance is invented. F3 exact receipt remains `docs/art/approved/botuo/basic/f3-v1/acceptance.json`. The upcoming GIF acceptance can close the visual scope actually shown.

## Review files
- `botuo-basic-composite-normal.gif`: normal speed, both directions, Idle→F1→F2→F3→F4→Idle; total2800ms.
- `botuo-basic-composite-slow.gif`: exact same image samples, 3× holds, total8400ms.
- `botuo-basic-character-only-normal.gif` / `-slow.gif`: effects OFF.
- `botuo-basic-reduced-cues-normal.gif`: static effect shapes instead of scaling; illustrative only.
- `source-force-raw-v1.png` / `target-impact-raw-v1.png`: new independent built-in imagegen outputs; prompts beside them, actual alpha composites in `vfx-light-dark-QA.png`.
- `sequence-review.png`, `contact-review.png`, `skull-landmarks-QA.png`, safe transparent cells/strip, approved-source Idle-return review derivative, exact `review-manifest.json` / `SHA256SUMS.json`.

## Preparation and measured limits
Reproduce with `python scripts/prepareBotuoBasicReview.py`. Preserve original masters and prior approval receipts. All four character sources are exact-hash checked before and after; rejected F2v1 is excluded. Each whole source canvas is uniformly scaled in X/Y using an explicitly drawn author-selected facial skull-height reference (horns/ears/mane excluded), target20px, approximately matching accepted160px Idle source's22px skull at0.9 display. F4 is more frontal/narrower, so width-only matching would inflate it. No per-pose silhouette-height fit, recolor, generative repair, body resizing or deletion of source pixels. A source-preserving downsample is a new derivative, not byte-identical to the master.
Equal400×320 transparent cells, common visible hoof baseline274 and support anchor135. Per-source density and support measurements are recorded, not claimed automatic anatomical measurements. Every resized RGBA pixel is preserved exactly in the cell; decoded strip cells match. Full source canvas retains low-alpha noise inside zero-alpha cell padding; all cells have35px or more outer alpha clearance. Inspect light/dark QA separately from player approval.

Approved static runtime Idle is read from `public/assets/runtime-packing-v1/botuo-battleIdle.png`, source unchanged. Review derives a144px canvas, source visible-foot140 aligned to review ground. This is a preview transform only; existing descriptor origin158/160 and all runtime bytes stay unchanged. Inspect source-to-action face/body scale and ground in the GIF; no phone/game-scale or GPU residency PASS is inferred.

Independent source VFX has a180×134 full-canvas review resize, shown560–840ms behind actor; independent target VFX142×126 shown640–840ms in front at neutral contact marker. Artwork has its own alpha; opaque background QA proves no baked black matte. Markers are schematic and have no combat/damage behavior.
One direction's1400ms cycle: Idle400, F1 load160, F2 release80, F3 contact160, F4 recover160, Idle440. F3 begins640ms absolute,240ms after visual action begins. Normal sampled40ms; slow same samples120ms. Full GIF decoding verifies each coalesced held frame against palette-quantized expected samples, min hold>=40/120ms and exact2800/8400ms duration; file-duration-only checks are not relied upon. Reduced cue GIF is a proposed static-effect visual, not OS/runtime testing.

## Required player review / stop
Review normal speed first: can you distinguish body stages without VFX, see both outgoing horn-force and impact separately, recognize the same goat/horns/gold bracer, and see stable proportion/ground/Idle return in both directions? Use slow GIF for inspection; slow clarity does not substitute for normal-speed approval. Maintain conspicuous skill-specific effects and future Basic<Heavy<Special<Awakening escalation.

These are scripted candidate previews, not a game recording, real hit/collision/HP proof, engineering/deployment or phone acceptance. Current P2 Basic hits immediately, windup0ms; preview240ms does not authorize changing real hit timing or delaying HP/numbers. Runtime integration requires its own measured event/geometry/residency plan and explicit timing decision if needed. No code/public assets/approved sources touched, no tests/build/Pages/public fingerprint rerun. Stop for GIF/player acceptance; do not start Heavy, P3 or merge main.
