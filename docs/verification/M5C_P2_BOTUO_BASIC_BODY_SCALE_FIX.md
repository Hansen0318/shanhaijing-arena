# P2 Basic body-size continuity defect — engineering correction

## Scope and acceptance boundary

Player2026-10-19 explicitly accepts Heavy F3 and reports Basic whole-character shrinking, requests GitHub record → prioritize fix → record. Approval/priority checkpoint07a51545853796a0cf69e52cecfd1bf835d99344. Heavy F3 receipt remains immutable and Heavy pose production paused. Prior Basic overall acceptance remains historical; only this concrete new visual defect is reopened. No P1 redo, new action art or gameplay change.

**ENGINEERING CORRECTION VERIFIED / NOT DEPLOYED / PLAYER FIX REVIEW PENDING.** Latest checkpoint is this report's containing feature commit. Public db451cd still has the prior calibration; do not tell the player the live game already contains this fix. Next is scoped browser/render verification and release authorization, then player size review; do not continue Heavy poses ahead of the size-fix gate.

## Root cause and bounded fix

Accepted review preparation (`scripts/prepareBotuoBasicReview.py`) normalized each articulated action skull to an author-selected20px, but did not calibrate that value to the accepted Idle at actual renderer density. Runtime deliberately retained those accepted pixels at1display px/source px. Idle uses0.9display px/source px; a comparable author-selected forehead-to-muzzle25px source span is22.5display px. Thus action landmark density was20/22.5=8/9 of Idle. This source-density mismatch is in presentation data, not damage/Tier scaling or generic frame cropping. Frame width158 vs Idle144 alone does not prove actor-size consistency. Lower crouched silhouette height alone is not proof of shrinking either.

Idle reference box[84,18,100,43] excludes horns/mane/ears; annotated `P2_BASIC_BODY_SCALE/idle-landmark-study.png`. These are author-selected anatomical landmarks, not automatic anatomy recognition or a claim that the distinct generated silhouettes have identical proportions. Original action skull boxes remain in the accepted review manifest. No source/GIF/receipt is regenerated or edited.

New reusable opt-in `src/assets/actionCalibration.js` matches action landmark world span to a supplied accepted reference descriptor, preserves authored support X, and solves originY from the reference world foot. Only P2 Basic opts in through roster data; renderer/combat have no character-ID exception or universal size multiplier. It does not normalize by bounding-box height and does not change P1 or future unconfigured skills automatically. This helper currently serves four-pose actions; staged-action calibration requires its own evidence if introduced later.

| Quantity | Before | Corrected |
| --- | --- | --- |
| Action px/source px | 1 | 1.125 |
| Action skull landmark | 20px | 22.5px, same as Idle |
| Full frame display dimensions | 158×143 | 177.75×160.875 |
| Body originY source-pixel coordinate | 142.2 | 140.4 |
| Visible foot relative to actor | −16.2px | −16.2px |
| Source FX size | 146×114 | unchanged |
| True-target FX size | 105×115 | unchanged |

Effect-coordinate canvas grows by the same ratio while caster-attached offsets receive origin compensation. Existing source/target world dimensions and positions stay identical, including retained source afterglow and independent target contact. Source center is(±85,−95.2)relative to actor; contact center(±0.5,−86.7)relative to target. No new range, flash, hit, animation lock, altered250ms HP/resolve, cooldown, timing, scale-dependent collision, Tier or status semantics.

## Fresh evidence

- RED: `node --test --test-name-pattern='retains Idle skull density' tests/botuoBasicRuntime.test.js` failed4/4 specifically on20px vs22.5px before implementation. GREEN same command passed4/4 afterward.
- Directly affected command: `node --test tests/botuoBasicRuntime.test.js tests/botuoBasicPacking.test.js tests/assetPresenter.test.js tests/actionPlayback.test.js tests/botuoIdleRuntime.test.js tests/botuoMove.test.js`:67/67 PASS. Includes real production Session→Presenter lifecycle with external Phaser/decoder boundary doubled, all Tiers, true hits/misses/control/ordinary damage, normal/reduced×left/right, all normal four poses and reduced static poses, mirrored support/foot, unchanged independent FX world geometry, Pause/cleanup, AI paths, repeated casts and Idle/Move return. No actual Chromium/mobile observation inferred.
- `npm run build`: PASS including asset guard81/81; existing Vite bundle-size warning remains a nonfatal warning, not changed in this slice.
- `node scripts/verifyBotuoBasicResidency.mjs`:6cold/warm/Restart cases,39required keys,16,630,060bytes,131,072reserve,16,084remaining above reserve, zero cleanup residency. No PNG/cache-budget changes.
- Full baseline catalog comparison against07a5154: P1/P3/P4/P5 deep-equal, P2 Idle/Move/KO and stats deep-equal. Protected src/combat/public/manifest/runtimePacking/approved-art diffs empty. Old approval receipts retained.
- `scripts/checkBotuoBasicBrowser.mjs` now checks corrected body dimensions/landmark density on actual raster fixture. It was NOT run here: local Chromium executable absent. Historical browser evidence is not relabeled as size-fix evidence. Run this updated checker at the next scoped browser/release gate.

Exact before/after descriptors, anatomy-selection scope, source hashes, required-key totals and invariants: `P2_BASIC_BODY_SCALE/measurement.json`. Reproduce comparison `python scripts/prepareBotuoBasicScaleReview.py`. Static before/after is exact descriptor geometry with accepted RGBA, not a screen capture, live browser run or phone-size proof. Test/build/residency logs adjacent.

## Permanent workflow lesson

Before accepting runtime packaging for any future action, compare a stable author-selected body landmark to the same character's accepted Idle/Move at actual renderer units; record source span, world density, origin/support and both facings. Use more than one visual body feature as a cross-check; do not force a low/rotating pose to Idle silhouette height or claim landmark calibration alone guarantees subjective likeness. Check all authored poses, normal/reduced, repeated casts and return transitions. Padding/frame dimensions and RGBA equality are necessary but insufficient for scale continuity. Apply explicit data calibration where needed, preserve independent VFX world size/attachment/timing and all approved pixels, then obtain scoped deployed visual acceptance for actual reported defects. Existing accepted skills are not blanket reopened.

## Independent bounded code review

Read-only reviewer examined baseline07a5154→local390cf6f: no material issues (0Critical/0Important). Calibration/ground/mirror/source afterglow/independent contact/data-only opt-in and evidence boundaries confirmed. No broad checks rerun or browser/device result added. Exact scope: P2_BASIC_BODY_SCALE/code-review.json. Follow-up only records review; implementation unchanged.
