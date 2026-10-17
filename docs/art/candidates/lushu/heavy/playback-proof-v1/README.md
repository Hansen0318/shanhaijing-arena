# Heavy standalone VFX and action proof — technical review

This folder is NOT player approval and NOT a battle screen recording. The player requested proof after seeing motions without effects.

- supplied-vfx-proof.png: the exact supplied wind/impact originals shown separately.
- heavy-composite-normal.gif / heavy-composite-slow.gif: actual280ms resolved Heavy action and independent VFX in an isolated valid-target scenario; slow is3x duration for inspection.
- heavy-vfx-and-action-normal.gif / heavy-vfx-and-action-slow.gif: three columns CHARACTER ONLY / VFX PNG LAYERS ONLY / CHARACTER+VFX, right and left rows. Manual control is held to inspect the complete authored sequence, including actual engage movement and Idle return.
- heavy-ai-handoff-before-after.gif: same campaign simulation with manual control released, every skill ready, actual0s AI handoff; before versus fixed renderer. Later generic procedural skill effects are not rasterized; focus is actual image/action layers.
- trace-before.json / trace-current.json: production BattleSession+AssetPresenter draw-command traces, not arbitrary pose/timing fabrication. Only the external Phaser/image decoder boundary is doubled. Core events/damage/positions are asserted identical before/after.
- manifest.json: source/derivative SHA256, decoded GIF durations/frame counts, evidence scope. Normal/slow GIF pixel/disposal round-trip checked; no first-frame-only validation.

Reproduce from repo root:

    node scripts/captureHeavyVfxReview.mjs --baseline
    node scripts/captureHeavyVfxReview.mjs
    python scripts/renderHeavyVfxReview.py

Baseline presenter is loaded from git commit4a7615daafd67ec11c18662d36ec562a2e43e368 into a temporary runtime sibling module, then removed. No approved art is regenerated or changed. These proofs establish intended image composition and the reproduced cast-chain correction; actual phone battlefield display still requires verification.
