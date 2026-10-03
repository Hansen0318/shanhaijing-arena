# M6C Implementation Plan

> Execute natively with superpowers:executing-plans. User authorized automatic A–E continuation and conservative exact seeds; no checkpoint approval gate.

Goal: read-only cumulative Tier combat projection through reusable status/effect/area primitives.
Architecture: immutable effect data → per-actor Tier projection and resolved ability table; generic battle-only effects runtime owns status/area records and conditions. Shared BattleSession execution applies effects for both controllers; existing progression math/writes remain untouched.
Tech stack: existing JavaScript/Node test runner/Phaser/Vite, no new dependencies.
Spec: docs/M6C_TIER_COMBAT_EFFECTS.md.

Constraints: no economy/schema/reward/Chapter data edits; T0 exact baseline; Type1.15/.85/1; battle clock only; bounds and instance caps; existing M6B tactics/lazy runtime; feature branch/PR1 retained per AGENTS13A.
Review focus: invalid Tier/effect data rejects; no air-cast free buffs; hit effects skip avoided/KO targets; status refresh/stack cannot cause runaway; queued multi-hit/control/area lifecycle and retry use fresh state.

## A — projection/schema
- [ ] RED tests effect validation/deep immutability/cumulative T0–T3 and detached Campaign Tier snapshot.
- [ ] Implement combat/tierEffects.js createTierEffect/resolveTierProjection/resolveTierAbilities; definitions may own tierEffects, no catalog/ID branches.
- [ ] CampaignController battleTierSnapshot via authoritative characterProgress(); Stage factory passes actor instance snapshots; enemies T0 unless config declares snapshot.
- [ ] Targeted tests, docs, commit/push.
## B — statuses and resolution
- [ ] RED clock-owned status replace/strongest/bounded stack, mitigation/movement/outgoing/incoming/avoidance/control/anti-control, condition checks and generic post-cast hooks.
- [ ] Extend BattleStatuses with records/source/target/type/start/expiry/tags; retain baseline mitigation API/map.
- [ ] Shared TierEffectRuntime resolves low HP/rear band/angle/isolated/weakened, damage/heal modifiers (positive gains additive capped15%), normal movement/control and queued hits.
- [ ] Targeted tests, docs, commit/push.
## C — area/protection
- [ ] RED fixed-geometry bounded periodic/impact areas, per-tick unique team eligibility, KO/terminal cleanup, threatened-nearby-ally deterministic tie.
- [ ] combat/persistentAreas.js max12 areas,200ms minimum tick; TierEffectRuntime protect/area hooks through shared damage/status APIs. Max64 statuses.
- [ ] Targeted tests, docs, commit/push.
## D — formal data/Lab
- [ ] RED five cumulative mappings plus persistent-free Tier selectors/same seed/presets.
- [ ] roster/tierEffects.js formal definitions, Lab ally/enemy Tier T0–T3/seed41 and T0 comparison option,3 presets, compact labels. Generic area/status indicator renderer; no final assets.
- [ ] Exact seeds in canonical doc; targeted tests, commit/push.
## E — release
- [ ] targeted, impacted and full relevant tests; build/diff.
- [ ] deterministic natural simulations/bounded collection performance; independent read-only review and fixes.
- [ ] push coherent release, Actions/Pages/public fingerprints/normal vs dev verification.
- [ ] update handoff/STATE/spec/evidence; one focused T0 vs selected Tier player smoke, STOP.
