# P2 Special shared Runtime implementation plan

**Goal:** Install approved 守群 motion and independent source/status effects with unchanged combat and exact lossless logical geometry.
**Spec:** docs/verification/M5C_P2_BOTUO_SPECIAL_PREFLIGHT.md, acceptance docs/art/approved/botuo/special/executable-v1/acceptance.json.
**Execution:** Native inline in this Work, authorized by the player's direct confirmation and continuation. Keep the existing feature branch/PR; no substitute branch or release.
**Architecture:** Source-aware immutable presentation metadata in statuses, utility observation events, a generic utility playback/reconciler, and logical-to-physical texture regions shared by all packed art. Original descriptors retain logical geometry so calibration and Heavy effects remain stable. Only draw/upload regions change.

## Constraints and review focus

16MiB cache/scene cap, 131072-byte reserve; all 42 original required keys plus three new keys. Preserve gameplay/Tier/AI/HP/CD/range/time/KO, accepted source pixels and all old logical geometry/FPS/mirroring. No ordinary Hit or additional art. Preserve five known suite failures, scoped verification only. Source/status identity and same-clock event ordering, refresh and source/recipient cleanup, utility supersession, physical-vs-logical sizes, pending uploads and reduced motion are the review focus. No deployment before a separate release scope.

## Task 1 — immutable provenance and utility observation

Files: tests/botuoSpecialLifecycle.test.js; src/combat/{statuses,statusSchema,tierEffectRuntime,battleSession}.js; src/roster/abilities.js.
Interface: optional status.presentationSource={abilityId,category,effectId}; utility event presentationId/eventAt/abilityId, no phase/contact/damage.
- [x] Write real-session paired tests for T0–T3 immediate state/CD/HP, same-clock Heavy, two-source/refresh/KO and invalid readiness/control; compare mechanics excluding optional metadata.
- [x] Run RED, then implement metadata and opt-in event observation without touching effect calculations or pending-action arbitration.
- [x] Run GREEN plus directly affected status/Tier/Heavy lifecycle tests; checkpoint.

## Task 2 — source-exact packing and logical-region adapter

Files: tests/botuoSpecialPacking.test.js; scripts/installBotuoSpecialRuntime.py; src/assets/{specialRuntimePacking,manifest,descriptors}.js; src/runtime/assetPresenter.js; new public/assets/special-runtime-v1/ only.
Interface: packed region map retains canonical logical frame name, geometry and descriptor scale/origin/FPS. Manifest carries original logical sheet dimensions solely for canonical region validation. Native Phaser frames use the candidate physical region and composed trim. Static effects use the same region adapter and original display size.
- [x] Write RED assertions for all 45 required keys/cap/reserve and logical frames/FX; preserve original source SHA256 and P3/P4/P5 Move packs.
- [x] Install exact candidate PNG copies with generated, deterministic metadata; leave original PNGs untouched.
- [x] Implement mapping/validation at draw boundary; all original actor/action descriptors remain logical. Test both facings and body/effect transform invariants.
- [x] Run GREEN packing/residency/frame-trim/affected asset tests; checkpoint.

## Task 3 — utility/status presentation and integrated verification

Files: tests/botuoSpecialRuntime.test.js; src/assets/{utilityPlayback,descriptors,botuoSpecialRuntime}.js; src/runtime/{statusEffects,assetPresenter,ArenaScene}.js; src/roster/catalog.js; scripts/checkAssets.js.
Interface: utility gesture/activation separate owners; generic status reconciler takes copied actors/definitions and real active status records, not combat mutation. Utility descriptor is a separate kind with no offensive blade/contact.
- [x] RED real-session→presenter tests for normal/reduced, both factions/facings, same-clock skill+Move, activation/state root, exact expiry/refresh/source+target KO/leave/Pause/Restart/destroy and duplicate observation events.
- [x] Implement descriptor/required-key enrollment, optional provenance resolution, capped grouped styles and independently owned effects. Reuse existing generic action semantics untouched.
- [x] GREEN affected suites, asset guard/build. Record actual counts and failures by name; do not claim global green or phone proof.
- [x] Exercise real Phaser native-trim comparisons and actual built entry using available browser tooling; if unavailable checkpoint honestly with exact missing check instead of deploying.
- [x] Final independent code review per executing-plans, fix material findings with regressions, record evidence and push same branch. End at next actual release/phone Gate, no Awakening/P3.

## Engineering closure

Browser Gate PASS at50edd53b69010ad9b5f700c3282cb2e8acb29c6a / Actions1091; see docs/verification/P2_SPECIAL_RUNTIME/browser-gate.json and WORK_LOG.md for scoped tests, sampling fix, independent review, capacity and actual Browser limitations. Deployment remains separately unauthorized; stop at Release Gate. Original packing candidates/approval receipts remain immutable; installed9sampling derivatives preserve exact source neighborhoods and logical frames.
