# P2 Heavy — independent VFX + composite GIF review

CURRENT: Visual acceptance closed; see `docs/art/approved/botuo/heavy/composite-v1/acceptance.json`. The original normal GIF was recovered byte-exactly after truncation. `docs/verification/P2_HEAVY_RECOVERY/recovered-checksums.json` supersedes the old SHA256SUMS normal entry. Preserve historical manifest below. Do not overwrite accepted previews by regeneration.

VFX/GIF CANDIDATE / PLAYER REVIEW PENDING. Approved poses receipt: docs/art/approved/botuo/heavy/poses-v1/acceptance.json (player2026-10-20 19:57:38+08:00). No pose regeneration; F3 immutable. Two independent built-in Imagegen effects, exact prompts and full RGBA masters retained. No fallback API.

Open botuo-heavy-composite-normal.gif first: right hit → left hit → right air cast → left air cast, each returns to original static Idle. Slow repeats same pixels at3×hold. Character-only shows poses/Idle without VFX, both facing. Reduced-cues demonstrates static lower-opacity shapes only, not implemented reduced motion.

Reproduce: `python scripts/prepareBotuoHeavyReview.py`. Script checks source hashes, full resized RGBA crop-back, no cell clipping, foot alignment0px, full decoded GIF timeline/palette/disposal2. SHA256SUMS contains all review outputs. decoded-facing-hit-whiff-QA.png is sampled from final encoded GIF. Light/dark alpha QA and Basic/Heavy VFX comparison inspected. Source attaches to guard independently of target cross; contact center shifted40px forward in review to keep face clear. Target cross is schematic, no enemy/HP/collision simulated.

All approved high-resolution poses use one0.126uniform XY raw pixel density and translation-only foot support. Do not use this as final renderer calibration: multi-landmark actual body/equipment/ground comparison against original static and actual built-app continuity remain future integration gates. No bounding-height or posed-face span normalization. Full source glow/edge-alpha preserved; original sources unmodified. Static return144×144 as current approved descriptor. Main effect sizes230×154source/210×168contact vs Basic180×134/142×126, same Idle in comparison. Visible-alpha>64 footprint source2.496×/contact2.270×Basic (metrics in manifest); art-only size, no hitbox/range implication.

Proposed PREVIEW holds: Idle400ms + F1/F2/F3/F4each160ms + Idle640ms. Source visible from560ms, target only hit case720ms; not approval of gameplay timing. Heavy real T0 tactical650ms is Tier-scaled and immediate non-tactical/air casts have different real contracts; recover separately after GIF review, do not copy Basic250ms or shift HP to satisfy GIF. Original poses/VFX/P1 and size-fix release protected.

No src/public/runtime/Guard changes, no gameplay tests/build/browser/deploy needed for this art-only slice.16MiB cap/131072reserve kept; final Heavy runtime residency not yet measured. Stop for explicit VFX/GIF review; no auto-integration or P3/main merge.
