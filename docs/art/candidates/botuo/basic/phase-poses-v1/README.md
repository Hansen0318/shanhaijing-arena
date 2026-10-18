# Botuo Basic phase poses — 2026-10-18

**F3 PLAYER ART APPROVED; F1/F2-v2/F4 ART CANDIDATES / PLAYER REVIEW PENDING.**

Approval source: `docs/art/approved/botuo/basic/f3-v1/acceptance.json`, player statement at2026-10-18T15:36:06+08:00:「好f3我approved，繼續，要確保未來動畫東西要足夠明顯」. Approval checkpoint cfd2b22c56e995a528909af08a5a491e490c3afa; F3 exact original stays at `../key-pose-v1/F3-contact-master.png` and SHA25619a8e9f8cf74c870558a4ea734b67e03d5eacce71072c5bc979931cf00f42f36.

Built-in imagegen generated each new pose independently from approved F3 + static Idle + identity; F2v2 edits unapproved F2v1 with F3/Idle identity anchors. Prompt text beside the corresponding file reproduces the generation instructions; prompts are retained from the session tool-call text. New poses are generated pixels, not exact source-preserving edits and do not inherit F3 acceptance.

| Pose | Intended body action | Status |
| --- | --- | --- |
| F1 | Head/chest raised, open arm silhouette, rear load | CANDIDATE |
| F2 v2 | Torso presses forward, head/horns intermediate between F1/F3 | CANDIDATE |
| F3 | Low grounded horn-led contact | PLAYER APPROVED, immutable |
| F4 | Head/chest lift, center weight, bracer/fist close in guard | CANDIDATE |

`four-pose-review.png` is a static light/dark and small-size comparison, built with common source-pixel scales0.235/0.14 and visible hoof baseline, not per-pose silhouette-height fitting. This avoids enlarging the crouched pose to match standing height. It is NOT runtime-normalized or calibrated game/phone scale; source skull/torso density and pivots must be measured after acceptance before GIF/runtime. No GIF or VFX produced yet.

Self-review: the four stages have different head/torso height, forward commitment and arm silhouettes; full horns, bracer, two arms and two hoof-bearing legs are visible. White face/brown mantle/gold guard/red sash remain legible on both QA backgrounds. Player must judge identity/proportions/motion readability. F2v1 rejected because visible right horn clearance is7px; retained as history, never use. F2v2 visible clearance is40px. No anatomy clipping is asserted for v1 without proof.

Initial inspection rejected all-alpha edge contact. Diagnosis measured raw edge alpha1 for new F1/F2v2/F4, with visible alpha>64 bounds at least35/40/92px from edges. The cause is faint source noise, not missing visible anatomy. Inspection now reports both raw and visible bounds plus exact border alpha; does not delete noise or claim fully transparent raw borders. Original sources remain byte-preserved. Future safe-cell packaging must add genuine zero-alpha padding and prove source retention.

Reproduce: `python docs/art/candidates/botuo/basic/phase-poses-v1/inspect_poses.py`. Report exact dimensions/bytes/SHA256/bounds/rejected source in `verification.json`. Fresh PNG decode/visible-edge checks and review board inspection completed; docs/static-only checks do not establish runtime ENGINEERING PASS or phone acceptance. No product source/assets/test changes, no build/Pages/public checks rerun.

**NEXT: player reviews F1/F2v2/F4 using four-pose comparison; do not reopen F3.** After pose acceptance, source-preserving common-scale/baseline packaging and independent skill-specific VFX, followed by normal/slow/effects-off/both-facing/Idle-return GIF approval. Current Basic real hit remains immediate (windup0ms); visual preparation is not authorization to delay HP, import P1 windup or change cadence. No runtime/deploy/main merge/P3 before their proper gates.
