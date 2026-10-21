# P2 猼訑 Awakening「鎮岳」— static recovery / first key-pose Gate NEXT

## 2026-10-21 — Special CLOSED, next Work preparation only

Special「守群」is COMPLETE / PLAYER VERIFIED at536685401cfa0805b5836b057a27dd0692c46879. Exact player statement/scope: `docs/art/approved/botuo/special/runtime-v1/acceptance.json`. The player requests a new Work to continue after that acceptance. Canonical bounded handoff: `docs/handoffs/P2_BOTUO_AWAKENING_NEXT_WORK.md`.

This preparation contains read-only source inspection and pure catalog/Tier projection, not an actual BattleSession probe, approved choreography, authored Awakening art, executable presentation contract, integration or deployment. No new art is approved by this document. The first Work-owned delta is missing actual mechanics evidence → distinguish the reserved downward/radial action → ONE character-only F3/key-pose candidate → STOP for player review. No extra process approval is required to record the already given Special acceptance; unseen Awakening materials remain gated.

## Existing data recovered, not a proposed balance change

Snapshot `docs/verification/P2_AWAKENING_PREFLIGHT/static-seed.json` binds source hashes atdd3624141767e6e219174b539674a98312c2b2c1. Source unchanged means this projection is reusable; do not re-create it merely because the Work is new. Dynamic behavior still needs a small real-session probe.

| Tier | CD seconds | Enemy targeting range | Caster AoE radius | Tactical telegraph ms | Existing Awakening Tier protection |
| --- | --- | --- | --- | --- | --- |
| T0 | 14 | 2.2 | 2.2 | 900 | none |
| T1 | 13.216 | 2.2715 | 2.2572 | 877.5 | none |
| T2 | 12.432 | 2.343 | 2.3144 | 855 | none |
| T3 | 11.256 | 2.4574 | 2.4145 | 819 | boyi.team:13.5% mitigation,3.75s,recipient search radius2.832 |

Table display rounds binary floating representation only; raw projection is retained. All Tiers retain coefficient1.70 per eligible victim, targetingRule=enemy, effect.areaCenter=caster, windupMs=0, canCrit=false. There is no authored movement, projectile or multihit field for this ability. Its dodgeable/locked/non-interruptible circle telegraph is a separate combat path from a new animation windup. Do not turn900ms into a new universal delay, reuse Heavy650ms, add hits, change geometry or postpone HP to fit art.

Existing T3 `boyi.team` is category=awakening/kind=protect/recipient=team/trigger=post_cast, not a Special effect or unconditional protection at button press. `applyAbilityEffects` invokes post_cast only when something applied; the actual delayed/instant/miss/KO paths and true recipient onset must be probed. `areaTargets` filters living allies in radius; do not assume every teammate anywhere is protected or exclude the caster without evidence. Keep mitigation's existing MAX/independent source+target+key/expiry semantics. Special→Awakening may not erase the accepted Special state. Do not add invulnerability, absorption, taunt, DoT or extra stomp damage.

## Remaining real-session evidence

Inspect actual BattleSession for player/AI and tactical/non-tactical/empty-cast paths, cast-time/resolve-time center and locked geometry, moved/escaped/KO targets, actual AoE victim/damage events, T3 protection onset/recipients/expiry and Special→Awakening coexistence. Use only representative cases needed to resolve these unknowns; record exact commands/source hashes/observations. No full suite, existing Special/Heavy/P1 replay, Browser or build is required for this mechanics/art-preparation slice. If a real gameplay contract conflict appears, state it explicitly rather than changing combat.

Source routing: `src/roster/{abilities,catalog,tierEffects}.js`, `src/combat/{battleSession,tierEffects,tierEffectRuntime,effectTargeting,threats,statuses,ability}.js`. Optional status provenance currently opts in through utility-observed presentation; do not assume Special's rendering ownership already provides approved Awakening effects or alter it during the first-pose Gate.

## Protected references and motion differentiation

Use approved `public/assets/characters/botuo/identity.png` and `battleIdle.png`, plus the actual source paths in Heavy `docs/art/approved/botuo/heavy/f3-v1/acceptance.json` and Special poses receipt. Preserve white goat face, curled gold-banded horns, mantle, red sash, beast-face large bracer, smaller opposite bracer and cloven hooves. Never substitute an old gray/plain-guard identity. Verify/inspect these references before generation.

Existing differentiation matrix in `docs/M5C_P2_BOTUO_BASIC_ACTION.md` reserves Awakening's wide low stance/downward whole-body radial release. This is a starting direction, not a player-approved pose or extra ground-hit mechanic. Basic's low horn attack, Heavy's forward bracer strike and Special's upright inward brace are protected; the new silhouette/limb action must read differently with effects OFF. Later Awakening spectacle must exceed Special at equal actor scale, but no VFX is authored at this first character-only key-pose Gate.

Candidate workflow: source-based ONE independent PNG, not a four-up board or GIF. Save original generated source, prompt, reference hashes, selected candidate, alpha/light-dark QA and manifest in a new `docs/art/candidates/botuo/awakening/key-pose-v1/` directory only if no newer valid candidate already exists. Use the existing image-generation workflow, never claim pixels were generated without an actual result. Do not add baked VFX, simplify away identity equipment or use pose-dependent full-height fitting to resize the actor. Current slice is not final runtime scale/anchor/budget proof.

## Boundaries and preservation

Stop after showing the one actual F3/key-pose candidate for player review. No F1/F2/F4, four-pose strip, VFX, GIF, executable integration or deployment before its later explicit Gate. P1 COMPLETE and all P2 Idle/Move/KO/Basic/Heavy/Special accepted pixels, contracts and Runtime remain protected. Ordinary Hit is cancelled; ordinary damage does not interrupt actions. New behavior must remain data-driven, no P2 identity Runtime branch. Keep16MiB cap+131072reserve, all required textures, source-exact logical frames/scale/anchor/mirroring and Shared Dynamic Asset Residency; current45required16611224decoded/34920extra is inherited evidence, not a new capacity measurement or permission to load large masters.

Current acceptance/handoff slice changes only documents/receipts. Reuse Special164checks/build/Browser/deploy/145CI/39public evidence; no repeated deployment or engineering claims. Same feature branch/PR1, no main merge, alternate branch, P3 or TD. Save the next coherent Work checkpoint and update WORK_PROGRESS/STATE/this action document; `[skip ci]` for docs/art-only checkpoints.
