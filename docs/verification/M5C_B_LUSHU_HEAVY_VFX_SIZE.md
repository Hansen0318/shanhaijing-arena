# P1 Heavy VFX size correction — 2026-10-17 Asia/Taipei

Player confirmed the short design at08:44:34+08:00 after requesting much larger attack light and a larger, clearer real-hit effect. Baseline branch HEAD2c81e892e7d81fbc6d4ae0afdebd3a94970dd64c / deployed sourcecc4c1ad. Active feat/m0-combat-core-20260927 / PR1; never merge main.

## Final data change

| Effect | Previous size | New size | Linear factor | Previous offset | New offset | Coordinate center (unchanged) |
| --- | --- | --- | --- | --- | --- | --- |
| Sweep | 230x230 | 345x345 | 1.5 | [100,35] | [42.5,-22.5] | [215,150] source coordinates |
| True-hit impact | 210x140 | 367.5x245 | 1.75 | [-105,-145] | [-183.75,-197.5] | [0,-75] relative to target feet |

Only P1 Heavy blade/contact size and offset change in production catalog. Existing generic renderer and action timing unchanged. Actor scale2.4731182795698925/origin, Basic descriptor, all other catalog content, core combat and Arena code are byte/data-identical. Both original VFX and runtime PNG bytes unchanged; no art generation or additional decoded textures. Three-second cooldown,280ms windup, actual hit/range/damage/RNG, no target acquisition during whiff, false-contact suppression and cleanup remain the same. F3 A master still SHA256 bd58b7bb4aa4758735d1ec74e65c5ca206836e39b397b6ce38fd4af02cacc5e2.

scripts/prepareLushuHeavyRuntime.py records the exact approved factors and reproduces the same PNGs with updated descriptor metadata. scripts/inspectLushuHeavyFeedback.py accepts an optional output directory; enlarged proof panels preserve all effect bounds in both directions. Run: python scripts/inspectLushuHeavyFeedback.py docs/verification/heavy-vfx-size-v1 . Earlier proof files remain intact.

## Verification actually performed

- Existing tests/heavyPlayerFeedback.test.js strengthened to assert exact approved world-display sizes and unchanged sweep centers in both facings, plus actual target-contact size/center and unchanged actor/grounding. Against old data,3 assertions failed as intended; updated data passes.
- Targeted43/43: heavyPlayerFeedback, heavyWindup, heavyActionIntegration and lushuHeavyAssets. Includes real control-button facing, true hit, miss, empty cast, cooldown, mirror, Idle return, Basic transitions, pause/KO/control cleanup and finite all-five residency.
- Guard68files3749260bytes, build and git diff --check PASS. Existing Vite chunk-size warning remains. Local full suite not repeated for this isolated data correction under AGENTS risk-based testing; release CI runs its configured full test command.
- Static protected comparison proves every catalog field outside the two Heavy effects is unchanged; effect keys/layers/target attachment and both center formulas unchanged; public assets/core/renderer/Arena have no diff. Required decoded16748808bytes remains below unchanged16MiB cap.
- Self-review performed for this bounded descriptor-only correction; no independent review claimed. Static real-presenter proof inspected: all poses, larger sweep/impact, Idle return and mirrored empty swings. This is not browser or phone acceptance.

## Release and next gate

Feature source51c62aded795cf2402c6323dcb589ce3b2e1088f deployed. Actions1031 / run38988052499: Test and Build job117264012326 SUCCESS; Pages job117264101536 SUCCESS. Fifteen public files byte-identical to local build; active index-DBcXcCev.js / battleRuntime-B7rKWq7N.js / index-DcqtNRF0.css. Evidence M5C_B_LUSHU_HEAVY_VFX_SIZE_PUBLIC_FINGERPRINT.json. This containing closure changes documentation only and skips CI; deployed source remains51c62ad. No browser/phone PASS or main merge. Next phone review only: clearly larger sweep on left/right empty swings, larger real-hit burst, unchanged actor proportions and Idle/Basic return. Shared future-skill escalation rule recorded in AGENTS/playbook/M5C/workflow; no Special/Awakening authored action or visual PASS claimed, no other character work, no main merge.
