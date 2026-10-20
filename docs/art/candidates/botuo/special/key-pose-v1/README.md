# P2 Special 守群 — first protective key pose

**CANDIDATE / PLAYER REVIEW PENDING.** One character-only protective pose, not an offensive contact or runtime animation. The explicit current task authorizes creating this review material and stopping here.

- `F3-protection-master.png`: built-in Imagegen source,1222×1287 RGBA; SHA25600dc78f20e09da6f8c55b67497653046cb5c7aa6253df2ffaa3d7b41c7bdf8a6.
- `F3-protection-padded.png`: exact source plus40px transparent borders; no source pixels removed or recolored.
- `QA-light-dark.png`: review composite; not a battlefield capture or calibrated actor scale.
- `prompt.txt`: exact generation prompt; approved identity/Idle/Heavy equipment references hashed in verification.json. No rejected drafts used.
- `mechanics-snapshot.json`: read-only real production-path probes and hashed source files.
- `verification.json`, `SHA256SUMS.json`: alpha/bounds/source/provenance checks and limitations.

Reproduce from repo root:

```sh
node scripts/inspectBotuoSpecialPreflight.mjs
python docs/art/candidates/botuo/special/key-pose-v1/inspect_candidate.py
git diff --check
```

Mechanics and full motion design: `docs/M5C_P2_BOTUO_SPECIAL_ACTION.md`. Existing T1+ protection selects one nearby ally; do not turn T0 self protection into full-team shielding or remove actual Tier behavior. Existing immediate mitigation remains authoritative; no preview timing is approved.

Player reviews goat identity/horns/clothing/one beast-face arm guard, supported inward high brace, upright weight over two planted hooves, and clear distinction from Basic low horn strike / Heavy forward bash. No inherited approval, VFX/GIF, new timing, runtime, scale calibration or phone acceptance. Wait for this exact pose's player approval before extending the sequence. No acceptance.json until an actual player response.
