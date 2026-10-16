# P1 Heavy phone-feedback correction — 2026-10-16

## Scope and root causes

Player reports the character grows during Heavy, supplied VFX appears absent, and manual Heavy should swing without a target. Previous engineering PASS is not player acceptance. Baseline source8e567c6 / closure0abe682, active feat/m0-combat-core-20260927 / PR1; main is protected.

- Heavy normalized the crouched F4 total silhouette to standing Idle total height, inflating head/body. Use the already accepted authored-action pixel scale2.4731182795698925 instead of3.1944444444444446, uniformly for all four cells; recompute origin to preserve foot baseline exactly. Crouch naturally has a shorter overall silhouette. This is a display correction, not regenerated art.
- Supplied wind/impact originals and optimized runtime PNGs already exist and are required/pinned. The manual out-of-range path emitted an immediate generic cast, bypassing authored Heavy playback. Route opted-in nonbasic manual whiffs through the same280ms phased lifecycle, with targetId:null and a copied facing aim point. The Arena Heavy button forwards current displayed facing. Whiffs never acquire targets at resolve, move the actor, draw combat RNG, damage, or show contact. Existing cooldown3 starts on press; no refund. Valid-target hit/range/KO rules remain unchanged.
- Wind was depth4 behind actor5; contact centered only27px above feet. Heavy-only descriptor correction makes wind depth6, footprint≈160px after body correction; real-hit contact depth7 centered≈52px above target feet. Source VFX PNGs unchanged. No fake air-hit burst.

## Evidence

- New tests/heavyPlayerFeedback.test.js:6 original cases failed against old code, then passed; actual Arena button-facing case additionally failed when forwarding was temporarily reverted, then both directions passed after restoration. Eight cases cover phase/face/CD/no early hit/late target/no RNG/no move/control/layers/body bound/baseline/torso/contact/Idle and real button forwarding.
- Focused initial41/41, final full794/794. Asset guard68 files3749260bytes; build PASS (existing chunk-size warning remains); git diff --check PASS. Existing protected Basic hashes/descriptor and original art tests PASS; texture residency16748808 below unchanged16MiB.
- Independent reviewer: no Critical/Important findings. Suggested actual button forwarding coverage added and RED→GREEN verified.
- scripts/prepareLushuHeavyRuntime.py reproduces exact unchanged PNGs plus updated metadata; scripts/inspectLushuHeavyFeedback.py projects real AssetPresenter outputs through actual Arena coordinates into heavy-feedback-v1/presenter-projection.json and presenter-proof.png. Static sheet inspected (all poses, wind, contact, return, left/right air swing). It is not a browser, phone or timing-video acceptance.
- Browser connector returned UNAVAILABLE / Sheep MCP session closed. No browser/phone PASS claimed.

## Release / remaining gate

Feature source `cc4c1ade12a3191f8c1b8e9c637e94f1715cf2a5` deployed. Actions1030 / run38910735003, build117005623699 and deploy117005848745 SUCCESS. Public15 files byte-identical with local build; active index-BZ4non3B.js / battleRuntime-SNlnqSt7.js / index-DcqtNRF0.css. Fingerprint: M5C_B_LUSHU_HEAVY_FEEDBACK_PUBLIC_FINGERPRINT.json. Main remains16f73932a0399979ba79b92f93f5ce1c1d1909b9, PR1 open/unmerged at release recovery. This containing closure only updates documentation; no rebuild necessary. Next player phone check: Heavy body remains same character scale; supplied sweep visible during air swing in either direction; impact only on actual hits; cooldown respected; returns to approved Idle/Basic. No Special/Awakening/new art/other characters/main merge.
