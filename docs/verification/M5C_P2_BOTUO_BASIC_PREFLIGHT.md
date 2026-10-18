# P2 猼訑 Basic runtime preflight — 2026-10-18

Current decision update2026-10-18T19:43:23+08:00: **VISUAL + EXECUTABLE250ms CONTRACT PLAYER APPROVED / NOT IMPLEMENTED**. Exact statement and bounded contract: `docs/art/approved/botuo/basic/executable-v1/acceptance.json`. Historical proposal/measurement below remains unchanged evidence; its decision-pending stop is superseded. NEXT high-fidelity packing, then bounded integration/affected checks. No implementation/build/deploy/phone acceptance in this decision-only slice.
Measured source `b7c0df68d5a85de844d35d4892413ec4dc345bfd`; feature `feat/m0-combat-core-20260927`, PR #1. Resolve latest containing docs commit remotely.
Acceptance: `docs/art/approved/botuo/basic/composite-v1/acceptance.json`; statement「我審核ok，紀錄github相關流程規則進度，然後繼續」at19:23:19+08:00, repeated19:23:43. It closes presented F1/F2v2/F3/F4 + source/contact VFX + normal/slow visual playback. Do not regenerate accepted images or reopen those gates.

## 1. Actual current behavior
Reproduce `python scripts/prepareBotuoBasicRuntimeProbe.py`, then `node scripts/inspectBotuoBasicPreflight.mjs`.
Machine evidence `docs/verification/M5C_P2_BOTUO_BASIC_PREFLIGHT.json`.
No production source/manifest/runtime art changed; no old P1 suite, build, deployment or phone gate rerun.

16 actual production-session direct-call probes: player/AI source flags × tactical on/off × ally/enemy × left/right. Every in-range P2 Basic applies exactly one real damage at unchanged time0, no displacement, no pending action, unphased cast without actionId. Existing phased ActionPlayback cannot start from this event. These are direct executeAbility probes, not actual automatic AI decision/UI-input/browser proofs.
4 current Tiers and4 out-of-range cases also measured. Out-of-range AI rejects; player direct miss has no damage/contact, as current engine defines.

| Tier | Current attackSpeed | Current cadence seconds | Current maxRange | Current windup |
| --- | ---: | ---: | ---: | ---: |
| T0 | 0.85 | 1.176470588 | 1.4 | 0ms |
| T1 | 0.89675 | 1.115137998 | 1.4455 | 0ms |
| T2 | 0.95285 | 1.049483130 | 1.491 | 0ms |
| T3 | 1.037 | 0.964320154 | 1.5638 | 0ms |

Accepted GIF contact is240ms after visual action begins, F1/F2/F3/F4=160/80/160/160ms. GIF acceptance does not silently change real damage. Repository rule, CHARACTER_ACTION_ART_WORKFLOW → Pre-integration synchronization: **“An approved preview timing is not an authorized gameplay delay.”**

## 2. Concrete proposed executable contract — PLAYER DECISION PENDING
Recommend **fixed250ms actual P2 Basic windup at T0–T3**, opt-in through shared ability data. Existing nominal50ms runtime steps execute a240ms due action at250ms;12 sandbox-only data probes confirmed240 and250 both resolve at250ms on that grid. Choosing exact250ms avoids modifying the shared clock or accepted P1 behavior. This is10ms later than accepted illustrative240ms, not a new pose/VFX design.

- F1 from0–160ms; F2 from160ms until the actual resolve (nominal250ms); F3 from resolve through+160ms; F4 next160ms, then existing Idle/Move. Nominal full action570ms. No animation-owned gameplay lock.
- Real damage, HP bar, damage/critical text and true-target contact effect occur on the **same real resolve event**. No “HP now, explosion later” or UI-only damage delay.
- At start retain cadence charge1/projected attackSpeed; no cooldown/crit/coefficient/target count/range/Tier/stat changes. No new displacement/projectile/status. Existing real Basic coefficient1.00 and defense/crit preserved.
- Retain locked target identity from start. At resolve require living source/target and current projected range. A target escaping range during anticipation causes a real miss, no target burst/HP. No auto-retarget at resolve.
- Source/target KO, explicit legitimate control and new Heavy/Special/Awakening cancel pending Basic under existing shared rules; cadence is not refunded. Ordinary nonlethal damage does **not** cancel it or play generic hurt. Ordinary movement remains existing engine-owned movement, not a staged-action movement lock.
- Caster-source force visual starts160ms, ends resolve+200ms (nominal450ms), with a visible reduced static release cue. Target-bound impact only on actual hit, own200ms finite life, nominal250–450ms. F3 body160ms and effect200ms stay independent. Pause freezes presentation time; KO/scene shutdown/destroy/Restart clean all owned effects.
- Existing source holdAfterResolve opt-in supports the source duration. Current ordinary ActionPlayback ties contact fade/retention to F3 frame hold160ms; integration must add a generic, default-preserving contact-duration opt-in for200ms rather than extending body pose or changing accepted P1 defaults. Verify actual next-cast retention and true-hit-only behavior.

Alternative: keep immediate0ms damage; full F1/F2 cannot both precede a synchronous F3 contact. It would require skipping/reworking that playback relationship. This is not the recommended path because it would no longer reproduce the accepted full anticipation before contact.
**Only this real timing/resolve contract needs the player's next decision. Art review is closed.**

## 3. Texture residency and quality — engineering work remains
Actual current all-five required set, real cache/presenter + actual PNG headers, doubled image-decoder/Phaser draw boundary. Two load orders measured; no browser/GPU/device claim.

| Quantity | Bytes |
| --- | ---: |
| Current required scene/cache set | 16,552,840 |
| Hard16MiB | 16,777,216 |
| Headroom | 224,376 |
| Preserve optional reserve | 131,072 |
| Available for new required textures while preserving reserve | 93,304 |
| Low-density probe addition | 89,856 |
| Remaining with probe | 134,520 |

Probe files under `docs/verification/P2_BASIC_RUNTIME_PACK_PROBE/`:312×60 four78×60 cells,48×36 source,48×42 contact. All existing/probe keys remained available in both cache/scene; independently tracked scene bytes agree; shutdown zero. Actual headers/bytes supplied, decoder/draw API doubled. This is **not runtime integration PASS**.

Common crop(96,136)-(304,296) reconstructs every accepted review-cell RGBA pixel exactly, including invisible RGB; final downsample is lossy. `density-comparison.png` shows visible softness of face/outline at equal world size. **Low-density probe REJECTED BY SELF-REVIEW, not an integration solution or new accepted art.** Do not promote the PLANNING PNGs. Further higher-fidelity packing/readiness engineering remains before actual integration/release. Never raise budgets, delete approved pixels, silently evict required art or sacrifice visibility just to fit.

Read-only all-RGBA blank-row measurements for current P2 alone found potential lossless savings: current160×160 Idle rows14..142 →20,480bytes;640×160 Move rows4..156 →20,480bytes;512×331 KO rows1..330 →4,096bytes; total45,056. None were repacked or changed. Any later source-preserving packaging must retain original files, prove every RGBA pixel and both-facing world placement with compensated descriptor origin/scale, then remeasure full required residency. These measurements are options, not a selected solution or source-change authorization outside existing rules.
Shared renderer already complements action originX when flipped; actual descriptor/anchor/contact/both-facing pixels still require integration evidence. Original Idle visible foot140 versus origin158 at scale0.9 yields visible foot16.2px above actor anchor; review baseline must not be copied blindly into runtime origin.

## 4. Minimal continuation after timing approval
Preserve receipt/source hashes, approved P1 and P2 base/Move/KO. Settle high-fidelity runtime packing within unchanged16MiB/reserve, then opt in P2 Basic via shared data/event/presenter. Add only necessary contact-lifetime primitive, test P2 normal/reduced/both directions/real hit/miss/KO/control/ordinary damage/new-skill/cast-chain/Pause/teardown and directly affected schema/cache/presenter contracts. Preserve P1 default behavior and use old acceptance evidence, not whole-P1 player reruns.
Only after actual engineering checks/build and scoped release authorization perform feature Pages/public fingerprint and targeted player phone verification. No main merge, P3 or Heavy.
Current safe stop: **player accepts/revises the proposed250ms real-hit contract**. Engineering packing is not claimed solved.
