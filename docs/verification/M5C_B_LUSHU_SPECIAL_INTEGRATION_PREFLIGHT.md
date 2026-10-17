# P1 Special accepted visuals — integration preflight

## Accepted scope

Player2026-10-17T14:22:27+08:00 explicitly「我確認核准，紀錄進度和流程規則，確認後可以繼續進行至部署」. Exact normal/slow/effects-off GIFs and independent source/contact VFX are now accepted, bound to SHA256 in `docs/art/approved/lushu/special/review-v2/acceptance.json`. Original poses, accepted GIFs/effects remain unchanged. Publishing progress/assets and continuing scoped runtime through deployment on the existing feature branch are authorized. No main merge. Do not ask for duplicate art/GIF or GitHub publication approval.

## Read-only evidence

`node scripts/inspectLushuSpecialIntegration.mjs` verifies five accepted file hashes and eight actual campaign cases (player/AI × tactical on/off × left/right). The current P1 Special applies its diagonal.65 reposition and one damage event at the exact call time, has no pending action or phased actionId, and starts6s cooldown. Core coefficient1.3, range/target/crit/AI remain authoritative. Data-driven shared `BattleSession.pendingActions` already supports opt-in windup for categories without character-ID branching.

Current required all-five+Basic+Heavy decoded textures are16,748,808 bytes against unchanged16,777,216 limit (28,408 free). A hypothetical512x128 action strip +112x112 source +128x86 impact adds356,352 decoded bytes; naive pinned total17,105,160 is over budget. Those are measured example dimensions, NOT generated/approved Special runtime derivatives. Full baseline file breakdown and protected source hashes: `docs/art/candidates/lushu/special/review-v2/integration-preflight.json`. No budget change, runtime asset addition, or other-character modification performed.

## Concrete timing choice required before implementation

The accepted preview's F1/F2 durations are200+120ms, so F3/contact begins320ms after action start. Earlier review delivery explicitly states that GIF timing does not authorize combat timing changes. General integration/deployment approval does not specify the material0→320ms simulation delay. Do not infer approval or delay only displayed HP/damage text.

Recommended bounded contract, awaiting explicit player timing approval:

1. P1 Special data opts into real320ms windup using the existing generic pending-action lifecycle. Start spends6s cooldown; F1/F2 and source effect play during that pending window.
2. At real320ms resolve, existing validation applies one diagonal reposition and one real damage hit together. F3, real-target impact, HP and damage event share that resolve; no fake HP delay.
3. Keep coefficient1.3, crit, targeting/range, reposition distance.65, one hit, cooldown6, Basic180ms, Heavy280ms, AI architecture, saves/Tier/rewards unchanged. Existing interrupt/KO/target-loss/manual-whiff policies apply; verify explicitly.
4. Retain approved200ms F3 and240ms F4 visual durations and finite independently visible source/contact effects; preserve accepted body proportions/grounding, both directions, reduced-motion cue and cleanup. Contact is real-hit only.
5. Prepare bounded exact-source runtime derivatives and solve decoded residency under16MiB. Do not lower character quality to squeeze into28KiB, raise the cap, or silently alter another accepted character. Existing P1 originals remain protected; any exact-pixel derivative must prove both-facing display equivalence.
6. Targeted tests: actual campaign Special start/resolve/whiff/cancel/targetKO, move/hit/RNG/HP sync, descriptor/manifest/required residency, renderer contact-source visibility and ownership across Special/Basic/Heavy, mirror, reduced motion, Pause/Restart and return. Then build, appropriate impacted regression, feature CI/Pages and public byte fingerprint. Stop for phone acceptance.

Status: **ART/GIF/VFX APPROVED / PREFLIGHT PASS / REAL320ms TIMING DECISION PENDING**. No source implementation, build, deployment or phone PASS is claimed. Deployment authorization persists after the timing decision; successors must not reopen accepted assets or ask again for ordinary publishing/deployment permission.
