# Awakening 鎮岳 — one key-pose candidate

CANDIDATE / PLAYER REVIEW PENDING. Built-in image_gen produced ONE image using the four inspected approved references bound in manifest.json. Original bytes are F3-downward-master.png; F3-candidate.png adds48px transparent padding, no resize/recolor/crop. Exact source RGBA roundtrip asserted. prompt.txt is the complete submitted prompt. No F1/F2/F4, VFX, GIF, Runtime or deployment.

Visual QA: light/dark composites inspected at full view. White goat face, gold-banded curled horns, brown mantle, red sash, asymmetric large beast/small bracers, tabard and cloven hooves readable. Whole character silhouette visible; no VFX or floor baked in. Distinct wide low stance/downward arm versus protected earlier moves. Generated source has alpha1 edge noise at left/bottom; retained transparently, source not called runtime-ready. Padded candidate minimum48px border clear. Review backgrounds are QA derivatives, not additional art candidates.

Reproduce: `python docs/art/candidates/botuo/awakening/key-pose-v1/prepare_qa.py`. This recreates padded candidate, QA and manifests deterministically. No body resizing or anatomical scale calibration performed. Final animation density, grounded anchor, mirrored transitions and decoded residency are later gates; high-resolution masters are not loaded in Runtime.

Mechanics: docs/verification/P2_AWAKENING_PREFLIGHT/mechanics.json (16 bounded real-session cases). Source hashes confirm existing static-seed reuse. NEXT ONLY player review of exact candidate design/identity/equipment/downward pose, then record statement/hash if approved. Special acceptance does not extend here.
