# P2 Heavy — recovered visual acceptance and executable preflight

## Verified recovery

Current branch feat/m0-combat-core-20260927, PR1 open/unmerged; incoming remote1dcead8a246a4c0dd856b1da14e0a954ed40ab4b. Exact delivered normal/slow links were recovered from predecessor13:06:06Z delivery. Receipt: docs/art/approved/botuo/heavy/composite-v1/acceptance.json. Original expected normal bytes recovered from complete slow by GIF delay reversal, exact SHA256 match; no new preview or pose generation. The original truncated normal is preserved as evidence, not production/review source. Run python scripts/verifyBotuoHeavyRecovery.py. All four approved pose hashes, two VFX hashes, four full GIF hashes,36decoded normal/slow RGB frames and3x timing equality PASS. Earlier normal hash copied from stale checksum list is not authoritative; recovered-checksums.json is.

## Production-session evidence

Run node scripts/inspectBotuoHeavyPreflight.mjs.16 direct cases (player/AI source flag × tactical on/off × ally/enemy × left/right),4Tiers,6outcomes and2required-asset load orders PASS. JSON: P2_HEAVY_RECOVERY/executable-preflight.json. These are real session methods with actors held to avoid automatic AI/motion, not actual automatic AI/UI/browser/mobile tests. Image-decoder/Phaser allocation boundary is doubled for residency; do not claim GPU/phone verification.

Tactical in-range Heavy emits no start cast, stores one delayed impact and emits one unphased cast on resolution. T0scheduled650ms;T1 633.75;T2 617.5;T3 591.5. At10ms probe steps actual contacts650/640/620/600ms. Non-tactical hit emits immediately at0ms; manual out-of-range emits immediate miss at0ms, no damage. Each successful cast spends existing CD; no displacement. Ordinary nonlethal damage continues; escape/KO/air cast has no fake hit. Current actionId/start/resolve are absent, so the existing phased player cannot consume this as a four-pose action. Existing legal Tier-control and threat-geometry policies must remain; these probes do not certify every cancellation/auto-AI path.

Approved preview has F1/F2/F3/F4=160/160/160/160ms and contact320ms after visual start. Treating it as a universal320ms true hit changes live behavior. Neither GIF approval nor the new user's instruction authorizes such changes; user explicitly preserves gameplay/timing.

## Concrete presentation choices — player decision required

A — preserve all current true-hit times (recommended under the user's no-gameplay-change requirement). Tactical in-range gets F1 load then F2 through the actual Tier-scaled threat resolve; real hit starts F3/contact then F4. Immediate non-tactical/air casts start at F3/source at0ms then F4; they cannot show F1/F2 *before* an instantaneous hit. No timing/cooldown/AI/targeting/geometry changes. Add generic observational presentation lifecycle for telegraphed casts and an immediate-resolution entry policy, not a P2-ID branch. Actual locked threat target coordinate owns contact; only true-hit events create a target burst. Four approved frames remain immutable; instantaneous paths omit anticipation rather than counterfeit damage timing.

B — show full F1→F2→F3→F4 in immediate paths by a separately approved real320ms windup for non-tactical and manual whiff only. Preserve the existing tactical Tier-scaled650ms contract, coefficient/CD/range/one hit/no displacement and legal Tier control. This is a gameplay timing change, NOT authorized or installed. Exact delayed-path cancellation/concurrent-cast semantics must be reviewed before adoption; do not assume Basic's blocking/cancel rules apply. Do not overwrite existing telegraph with320ms or create visual-only delayed HP/contact.

No choice is silently promoted to approval. Player needs to choose the presentation behavior; existing art/GIF approval remains closed.

## Capacity measurement and next engineering work

Real current all-five required cache/scene set39keys16,639,660bytes; hard16,777,216; reserve131,072; only6,484bytes available after reserve. Both forward/reverse loads have0failures and0bytes after destroy. Shared Dynamic Residency remains unchanged.

Read-only exact-review-raster packing measurement: four175×162 cells with8px safety padding453,600bytes, source132,480/contact131,376, total717,456additionalbytes; shortfall710,972against reserve. All four complete RGBA crops reconstruct original safe cells exactly. JSON: packing-measurement.json. This is a concrete faithful-density example, not a lower bound, selected runtime pack, final anatomy calibration or proof no solution exists. No runtime PNGs installed. Complete the shared residency/transparent-only optimization solution after selected lifecycle; never raise cap, evict required visible art or reduce approved clarity to fit.

Next after decision: implement minimal generic lifecycle/presentation entry policy, faithful body/FX transforms with multiple anatomy/equipment/ground landmarks; solve measured residency; targeted RED/GREEN/event/presenter/memory/mirror/whiff/true-hit/return/Pause/Restart/KO/cleanup checks, build/Guard, required real browser and Pages release/fingerprint. User already authorizes engineering/deploy within selected preserved contract; do not re-ask release authority. Do not repeat completed P1/Basic/size acceptance. No Special/Awakening/P3/main merge.

## Delivery state

Recovery and read-only preflight only. Production src/public unchanged from incomingHEAD; no new build, browser release check or Pages deployment performed. Live source remains0fe44b3c5eed46402d0394af6dff128a72be7393 (previous release evidence reused, not reverified here). Current live page is NOT a Heavy test build. Next gate: select A or explicitly authorize/review B before changing live timing or skipping immediate-path anticipation. Not PLAYER PHONE VERIFIED.
