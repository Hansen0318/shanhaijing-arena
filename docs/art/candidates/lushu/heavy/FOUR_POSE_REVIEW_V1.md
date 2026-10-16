# P1 Heavy 逐風衝 — four-pose review v1

Status: **F3 A PLAYER SELECTED / F1,F2,F4 AND FULL SEQUENCE PLAYER REVIEW PENDING**.

Approved F3 is exactly docs/art/approved/lushu/heavy/F3-contact-selected-A.jpeg, selected via uploaded attachment「這張」2026-10-16T12:42:56+08:00; approval checkpoint9b7215c157b1e1186991c1681971805699048f97. SHA256bd58b7bb4aa4758735d1ec74e65c5ca206836e39b397b6ce38fd4af02cacc5e2 remains unchanged. The older square candidates/lushu/heavy/F3-contact-v1.png is B, NOT selected, and is not part of this review.

## Review artifacts

Open four-pose-review-v1.png. Left-to-right F1 loaded high guard, F2 diagonal strike in progress, exact selected F3 A contact, F4 narrower/upright recovery with near-side knife retracted. F1-windup-v1.png, F2-strike-v1.png and F4-recovery-v1.png are individual unapproved candidate originals. Source prompts are alongside each file. Built-in image_gen was used one pose at a time from selected A and canonical identity/Idle; F4 correction uses the accepted A alone to avoid the alternate hand configuration. No VFX baked into poses.

All three new candidates were visually inspected for same deer/horse face, antlers, mane, tiger-striped body, black/gold guards, one red tail, compact blade, complete visible anatomy/weapon and distinct action grammar. Near/foreground arm holds the knife across this chosen set; far arm remains an empty fist. Player judgment of exact identity, knife consistency and flow is still required. No claim that generative pose edits preserve every source pixel.

## Inspection corrections and rejected internal attempts

- First F1 attempt (exec-57fddf2f...) put knife in the far arm. Rejected; final F1 uses revised explicit near-arm chamber. Not a selected source.
- First F4 attempt (exec-a330ad44..., SHA2569a71ff38a261760c7b80e1d391c620a3e2636c98615c0220a83dbf5343363c56) switched to frontal/alternate hand. Rejected; final F4 retains A's near-arm topology and right-facing side view.
- A later F4 background-extraction attempt (exec-1af35ec5..., SHA25606247732a6d3e5c2684f8371425d6059949d06e400b694b0153ad710bb36fca4) is NOT selected; it was unnecessary and changed shading. Final F4 is preceding original revision SHA256ebcf442bc5cb69c9f13760ff7bbc7a5705bda83cbf3a3bf991f61721ce7fdfa6.
- **Alpha inspection correction:** the image viewer exposed RGB colors in fully transparent pixels, initially mistaken for baked background glow. Actual sampled F4 pixels (100,500),(100,600),(300,350),(600,100),(1400,650) have alpha0 in the selected F4. Proper RGBA-to-white composition confirms no such visible background ring in the review. Never decide background failure from RGB channels alone or use this as permission to erase white fur/dark contours. Earlier glow-rejection commentary is historical and corrected here. Low nonzero-alpha edge residue is a separate real issue and still needs safe preparation.

## Deterministic comparison, not runtime normalization

Run python docs/art/candidates/lushu/heavy/prepare_pose_review.py from repo root with Pillow/DejaVuSans. This only creates a review layout and JSON; it never edits pose masters. All4 full canvases use identical .30 scale, no source cropping/deletion/redraw, aligned to visible foot baseline440. Alpha>128 (PNG) and white-difference>32 (JPEG) are used ONLY to compute layout bounds, not to delete pixels. F3 JPEG is retained with its white background; no synthetic F3 repaint/alpha extraction has occurred. The sheet is NOT an equal-cell sprite strip, GIF, timing demo or runtime-safe certification. File geometry, hashes and translations are in four-pose-review-layout-v1.json.

Full disk PNG/JPEG decode and hashes PASS; exact approved F3/identity/Idle SHA checks PASS; source/public/tests/.github unchanged; git diff --check PASS. No game tests/build/CI/Pages run: this is art/candidate preparation only. PNG faint alpha can reach edges, and F3 is RGB JPEG; keep safe full-color transparency/padding/frame isolation as the next post-approval asset step, do not blindly slice this review sheet.

## Exact next gate

STOP for player F1/F2/F4/full-sequence artwork review. After acceptance, preserve all selected originals and prepare verified transparent safe equal-cell derivatives, then independently author unique stronger Heavy wind ribbon + actual-hit impact core/air-break shards; no invented DoT or extra damage. Deliver normal/slow mirrored character-only and composite GIFs with correct Idle return for explicit player approval before any shared runtime timing/residency integration. Current Heavy windup0 is unchanged; no silent Basic180ms reuse or fake HP delay. P1 Basic and all protected art/gameplay/AI/Tier/reward stay intact. No later skill/character, no main merge.
