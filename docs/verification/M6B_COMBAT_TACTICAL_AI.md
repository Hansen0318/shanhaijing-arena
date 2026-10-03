# M6B tactical combat verification

## Scope and contracts
Formal data-driven profiles (mobile skirmisher/front guard/rear healer/ranged burst/aggressive bruiser) feed common intent-only tactics and weighted living-target scoring; no character-ID branches in shared AI. Stage/Lab factories activate production tactics; low-level headless legacy mode remains explicit. Abilities use the existing shared start/finish/effect/damage APIs, with selected fixed-geometry delayed impacts. AI/player can avoid the same geometry through ordinary movement. Original Type1.15/.85/1.00, T0 stats/cooldowns/ranges/coefficients/crit metadata and timing of cooldown start remain unchanged.

Threat ledger is session-owned, battle-clock-based, fixed source/target/geometry/category/impact/target-vs-area eligibility. Single attacks still damage only valid intended target; AoE targets each once. Non-dodgeable Basic/instant casts/heals/mitigation/multi-hit remain immediate. Caster KO cancels pending impact; out-of-range air casts consume cooldown normally and create no damaging threat. Pause calls no simulation step; warnings read frozen clock; new session/Restart/Retry destroys old graphics and clears transient jobs/threats/state. Existing manual/0s release and automatic Basic/shared HSA rules preserved.

Tactical policy uses250ms evaluations/5 candidates, held700ms objectives, independent tactical seed stream (no crit RNG draw). Safe score includes geometry/bounds/enemy proximity/range/ally spacing/continuity; .08 clearance covers ordinary .05 movement stop. Urgent threat can replace ordinary held movement; selected evade point remains held while reachable/safe. Evade requires intended/area eligibility, reaction/window, profile roll, movement and commitment. No perfect dodge. Retreat uses.32/.62 hysteresis, bounded2800ms recovery,2000ms regroup cooloff; can cast shared heal while retreating. Tank/bruiser kiteTendency0; other fields live immutable profile data. Presets do not lock AI/targets or alter formal Campaign.

## Evidence
A contracts targeted29/29, B intent9/9, C integration73/73+full463/463, D presentation/Lab39/39/build. Final targeted50/50, impacted308/308, full475/475, build/diff PASS.
Independent read-only review found0 Critical/4 Important; all four RED→GREEN resolved, no unresolved findings: capsule warning caps; actual move stop clearance; held objectives suppressing urgent threats; harmless single-target bystanders evading. Additional RED→GREEN held evade test prevents destination jitter.

Protected original M5B immediate coefficient/multi-hit fixtures and graybox winner fixture explicitly use tacticalEnabled:false, as allowed by spec16. Production delayed impacts, actual target/area eligibility, AI/player equivalence, natural tactics/termination, support heal/retreat, override/0s release and Pause/Retry use enabled production factories in new tests. Existing Campaign/rewards/shard/Tier/Collection/INFO/save/Lab storage/lazy regressions remain included; no accounting/schema/controller/Stage reward data changes.

## Performance and dependency graph
Seed41 bounded60s simulation, same process local timings (engineering sanity, not phone/frame benchmark):
| Preset | Simulated seconds | Steps | Tactical evaluations | Maximum active threats | CPU ms |
|---|---:|---:|---:|---:|---:|
| Dodge |15.60|312|319|3|35.6|
| Telegraph |34.70|694|576|4|23.8|
| Healer retreat |16.75|335|307|3|9.1|
| Ranged kite |19.10|382|377|3|10.2|
All terminate naturally; states include evade/kite/retreat/recover/support/regroup/reposition/engage/chase. No global search/pathfinding/frame random sampling. Every evaluation checks at most5 positions.

Pre-split candidate entry93,281 bytes accidentally included existing preview→demoBattle→BattleSession graph; RED static-import guard confirmed. Pure demoDefinitions preserves exact original values/exports and removes simulation import from menu. Final entry68,623 vs accepted M6A79,192 (13.35% smaller); deferred battle1,422,246. index--RrIFyks.js / index-CuxsJ6uc.css / battleRuntime-Dk0-SWXZ.js. No Phaser or battle core in static menu graph. No dependency additions.

## Delivery
Recovery remotee36abeb922f122b64859f84a0212d64510f55605; main16f73932 unchanged; original feat/m0-combat-core-20260927 / PR1 retained. A a8e3d3d0debf2f2437b4959ef39abce03aa96e3c; B2106b152c035839d953e774a9cc20d64d17bdbe9; Cce76e9855966d1c28c07ed60f17726a9e746d445; Dca9160c501afe2c0d7d0b0409b31c4f0502111f1. Intermediate recoverable checkpoints skip CI; coherent release runs real CI/Pages. Deployment/public verification pending.

## One focused player smoke
Lab AI ONLY+Skip countdown: DODGE TEST/TELEGRAPH TEST, HEALER RETREAT, RANGED KITE. Observe skirmisher changing angle/occasional evade, guard holding front, healer retreat/heal/return, caster spacing and bruiser chase. Manual mode joystick can leave warning area; Pause/Retry/Back clean. Confirm normal save unchanged once; no broad Campaign replay/reset needed. Device feel/readability/balance acceptance remains player-owned. STOP before final art/animation/VFX/audio/Tier mechanics/Chapter2.
