# P1 Special independent VFX study — 2026-10-17T13:52:27+08:00

Status: **UNAPPROVED VFX CANDIDATES / FULL FOUR-POSE GIF INCOMPLETE**.

## Recovered authorization and blocker

Player at2026-10-17T11:22:40+08:00:「剛剛你做的F1-4ok，妳接下來是做包含大場面特效gif嗎，是的話就做」. Prior conversation confirms approval. GitHub HEADa1f0f22 contains only F3 and its acceptance; full branch tree, checkout and Library checks returned no approved F1/F2/F4 originals. This is a source-preservation/handoff gap, not grounds to ask for repeat pose approval or to regenerate replacements. Exact F3 remains immutable. The recovered statement is in `docs/art/approved/lushu/special/four-pose-conversation-acceptance.json`; absent image hashes are intentionally absent.

## Actual delivered scope

- Built-in image_gen creates separate warm ivory/gold/teal rotational release and broken-shell single impact. New candidate sources, prompts and SHA256 retained in `docs/art/candidates/lushu/special/vfx-review-v1/`.
- Deterministic128px padding preserves all original source pixels. Raw sweep alpha1 reaches one bottom edge; raw impact faint alpha reaches left/bottom edges. Opaque cores fit, all padded derivative edges are fully transparent; this is padding, NOT proof of runtime residency budgets or final normalization.
- True-alpha white/dark proof visually inspected: no opaque backdrop rectangle, character/effect colors retained. Invisible RGB glow under alpha0 is not a visible backdrop.
- VFX normal/slow GIF studies: separate source/contact/composite columns, normal and mirrored rows. F3 deliberately HELD STATIC with prominent labels; no invented four-pose animation, real target/HP or runtime synchronization proof.
- Candidate source480x400/contact500x350 versus accepted Heavy345x345/contact367.5x245 (comparison rounds368). These are preview-only proposed footprints, not approved Special descriptors or universal multipliers. Final phone/readability gate remains pending.
- Composite contact-core placement adjusted toward extended hoof while retaining face/torso visibility; source arc rendered behind the approved character. No actor enlargement.

## Verification performed

`python scripts/prepareLushuSpecialVfxReview.py`: full RGBA decode; nonclipped opaque cores; padding pixel equality; derivative clear margins; fixed F3 hash; normal/slow GIF decode with timeline/pixel round-trip. GIF encoder coalesces identical held frames; validation expands each held duration to compare every source timestep (24 samples,1440/2880ms). Light/dark and peak boards visually inspected. `review-manifest.json` and `SHA256SUMS.json` capture exact results.

No production source changed. Build/game tests/Pages/browser/phone not run or claimed for this documentation/artifact-only slice. Existing804-test Heavy release evidence remains historical and unaffected. No main merge or deployment.

## Next exact action

Review independent effect candidates; recover exact approved F1/F2/F4 image files (player reattachment if no accessible original). Then safe equal-cell deterministic packaging and full character-only/effects-on/normal/slow/mirrored/Idle-return GIF approval. Special currently hits at0ms; no silent adoption of preview contact420ms. Actual timing changes require separately scoped authorization after full GIF review.
