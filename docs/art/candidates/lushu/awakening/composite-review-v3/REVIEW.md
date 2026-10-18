# Corrected GIF timing review

## 2026-10-18 — v3 browser-safe GIF correction / PLAYER REVIEW PENDING

Player reported normal GIF slower than comparison and requested corrected review files. Decoded v2 normal has twelve10ms holds; GIF players may clamp these to100ms, stretching1920ms to3000ms. Previous checks verified encoded time only, not player wall-clock playback. V2 is retained as historical evidence and superseded for speed review.

V3 `docs/art/candidates/lushu/awakening/composite-review-v3/` derives only from decoded immutable v1/v2 GIFs. Every decoded hold is >=20ms; normal and comparison share exact sample times, both directions,350ms Idle holds and1920ms total. Slow is5760ms. Discrete20/30ms sampling retains80→110ms first rush and exact110/260/420 contact samples; recovery610ms is a candidate contract only. No new poses, source-art/VFX changes, approved actual-timing changes, runtime/deploy or engineering/phone PASS. Browser-safe timing checks do not claim wall-clock measurement on the player's device.

Reproduce/verify: `python scripts/repairLushuAwakeningGifTiming.py`; output `verification.json` records every decoded hold, source hashes and total duration. Permanent review rule: verify decoded minimum frame hold >=20ms and use matching sampling, direction count and Idle holds between speed-review GIFs. File duration alone is insufficient evidence of playback speed. NEXT: player reviews corrected normal/slow/comparison and explicitly accepts VFX/GIF and exact candidate timing before runtime. No P2/main merge; art-only checkpoint [skip ci].
