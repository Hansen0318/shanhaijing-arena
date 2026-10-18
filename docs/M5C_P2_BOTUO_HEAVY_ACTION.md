# P2 猼訑 Heavy「震嶺」— F3 design candidate

## 2026-10-19 — Heavy F3 PLAYER APPROVED / Basic size defect PRIORITY

Player explicitly approves the presented Heavy F3 and requests GitHub recording before and after fixing Basic whole-character shrinking. Immutable approval: docs/art/approved/botuo/heavy/f3-v1/acceptance.json, source0049d9610e46b0d3ad5cffff6e54a94190786992999b282eef2253c8c019b206. **F3 DESIGN / PLAYER ART APPROVED**, not remaining poses/VFX/GIF/timing/runtime approval. Prior F3 pending text is historical.

**NEXT PRIORITY: diagnose and correct P2 Basic size continuity against accepted Idle/Move; Heavy production paused.** Concrete new player defect authorizes affected inspection/fix/minimum checks; do not reopen unrelated Basic or P1 acceptance. Preserve approved pixels, grounded anchor, mirror, actual250ms timing/HP/FX/CD/Tier and16MiB+reserve. Confirm body landmarks/density across Idle→F1–F4→Idle/Move instead of trusting canvas dimensions or lower crouched silhouette height. New fix is not deployed/player-verified until separately evidenced. Existing deployment db451cd remains unchanged. No new Heavy poses/P3/main merge. Checkpoint[skip ci].

## Current gate — 2026-10-19

Recovered feature HEAD `4d849f760adb2219fcb12b4b710b71507948ebff`, PR1 open/unmerged, clean working directory. Player「好繼續」authorizes the next Heavy design/art milestone after Basic acceptance. **DESIGN / F3 ART CANDIDATE — PLAYER REVIEW PENDING**; no approval of this new design, art, timing, runtime or deployment inferred. Bounded visual design within the existing action-production pipeline, not a new gameplay subsystem. Current design is presented through the one F3 candidate for player review before further production.

P1 COMPLETE and P2 identity/Idle/Move/KO/Basic PLAYER VERIFIED remain closed. Ordinary Hit remains CANCELLED. Existing deployed runtime db451cd remains unchanged; this documentation/art checkpoint uses `[skip ci]`.

## Authoritative mechanics recovered, unchanged

Sources: src/roster/abilities.js, src/combat/ability.js, src/combat/battleSession.js, src/combat/threats.js, src/combat/tierEffects.js, src/combat/tierScaling.js, src/roster/tierEffects.js and tierScalingProfiles.js. Exact imported Tier results: art/candidates/botuo/heavy/key-pose-v1/mechanics-snapshot.json. This is pure-data inspection, not an executable combat-path test.

Heavy has one enemy target, coefficient1.30, crit20%/1.75×, no displacement/projectile/extra hit. T0 max range1.8, CD4s, windupMs0; locked circular tactical danger radius0.7. Telegraph interruptible=false is existing metadata, not permission to remove any cancellation/control rule.

| Tier | Max range | CD seconds | Tactical telegraph ms | Actual hit control seconds |
| --- | --- | --- | --- | --- |
| T0 | 1.8 | 4 | 650 | none |
| T1 | 1.8585 | 3.776 | 633.75 | none |
| T2 | 1.917 | 3.552 | 617.5 | 0.4025 |
| T3 | 2.0106 | 3.216 | 591.5 | 0.4375 |

Control is a legal target status on actual hits, not generic hit-reaction animation or knockback. Damage is further resolved by existing stats/Tier/defense/crit; coefficient is not final HP loss.

Current executeAbility uses delayedImpacts only when tacticalEnabled + telegraph + damaging + valid in-range target. Non-tactical or manual empty casts follow the immediate recordCast path; no Heavy windup action token is created. Do not call650ms a universal cast windup, copy Basic250ms, assume identical AI/player event timing, or claim future authored air-cast visuals are already integrated. Future preflight must address these real start/resolve/whiff paths, cancellation semantics, both factions and Tier timing before changing runtime. Keep HP/text/contact on true hit, never invent an impact to satisfy an animation.

## Four-skill differentiation, current design proposal

| Skill | Stance / load | Limb path / contact | Follow-through / rhythm | Independent VFX direction |
| --- | --- | --- | --- | --- |
| Basic 角擊, accepted | Low compact horn/neck load | Low head-forward horn contact | Accepted compact release/recovery | Existing accepted short horn-force source and crushed-stone target burst, unchanged |
| Heavy 震嶺, current candidate | Raised torso behind bracer; hips rotate over braced rear hoof | Bracer crosses chest and drives forward at chest/shoulder height; head stays above it | One forceful forward peak, elbow/shoulder recoil then grounded guard return | Future angular amber pressure wedge from guard, separate broad stone-like hit burst; no airborne projectile or AoE claim |
| Special 守群, future only | Upright centered protective stance | Arms draw inward to protective brace | Held protective gesture, state-driven expiry | Protective outline on actual mitigation recipients; no damage burst |
| Awakening 鎮岳, future only | Wide lowered stance, whole-body downward load | Caster-centered downward release | One largest radial payoff, no invented extra stomp hit | Radial earth/pressure signature bound to real area hit; do not copy Heavy forward wedge |

The final two rows only reserve distinct action grammar; they authorize no art now. Basic<Heavy<Special<Awakening governs spectacle, not new damage, actor size, range or offensive status for defensive Special. Do not freeze numerical F1/F2/F3/F4 holds before later real-contract inspection/review. F3-first follows mechanics recovery, not arbitrary image generation.

## F3 candidate and provenance

Built-in Imagegen, three references: public/assets/characters/botuo/identity.png, battleIdle.png and approved Basic F3-contact-master.png. Basic is equipment/style reference only; its pose must not be copied. Exact hashes and PNG/alpha evidence in art/candidates/botuo/heavy/key-pose-v1/verification.json. Exact prompt retained in prompt.txt; no fallback API used.

Master: art/candidates/botuo/heavy/key-pose-v1/F3-contact-master.png, SHA256 `0049d9610e46b0d3ad5cffff6e54a94190786992999b282eef2253c8c019b206`, 1446×1087 RGBA,1,186,261bytes. This new generation is not pixel-identical to accepted references and does not inherit their approval. Review the same single beast-face bracer arm/equipment, horn/head proportions and pose likeness.

Self-review: complete horns/two arms/two legs/cloven hooves, white goat face above forward gold beast-face guard, other fist behind waist, broad planted stance, brown mantle/red sash/cream-gold panel retained, no new weapon or baked VFX. Review light/dark and144px silhouette-height studies; these are NOT calibrated battlefield/mobile evidence. Bracer prominence, torso proportions and attack readability remain player judgment.

Master has alpha1 on its left edge and17,298 alpha1–8 pixels. Preserve all source bytes; no threshold cleanup. F3-contact-padded.png adds40transparent pixels each side and proves full RGBA crop-back equality, with clear outer boundaries. This is review safety only, not accepted runtime scale/pivot/residency proof. Master and padded hashes differ by design. QA derivatives never overwrite the master.

## Evidence / next gate

Run `python docs/art/candidates/botuo/heavy/key-pose-v1/inspect_candidate.py`, inspect QA-light-dark.png and verification.json, then git diff --check and protected-path check. No gameplay tests/build/browser/deployment repeated for this art/docs-only slice. Current16,630,060bytes required residency +131,072reserve remains prior Basic evidence, NOT a Heavy-fit measurement; just16,084additional bytes remain beyond reserve. Later runtime packaging must measure complete residency without raising16MiB, hiding required textures or reducing accepted clarity.

**STOP: player reviews this ONE F3 design/identity/arm-bracer/grounded forward bash.** After explicit acceptance: individual F1/F2/F4 → independent source/contact VFX → normal/slow/effects-off/both-facing/Idle-return GIF → separately settled executable contract and faithful packing → minimum integration/checks/build → scoped release → player review. Do not generate remaining poses now, reapprove Basic/P1, begin P3, alter receipts or merge main.

Checkpoint is the containing feature commit; fetch latest remote. Successor: docs/handoffs/P2_BOTUO_HEAVY_NEXT_CHAT.md.
