# M6C Tier Combat Effects verification

**IMPLEMENTED / RELEASE VERIFICATION IN PROGRESS**

## Scope and contracts
Cumulative T1–T3 immutable definition effects, T0 no advanced modifiers. Campaign uses authoritative characterProgress().tier and detached frozen config; enemies defaultT0 unless encounter config explicitly supplies enemy Tier. Battle Lab side-wide override + T0 ally baseline retains teams/enemy Tier/seed41, zero persistence capability. Five content definitions validate reusable range/approach/damage/heal/status/protection/area primitives, no character-ID engine branches.
Tier5/10/15/MAX, lifetime earned/spent/available/recruitment, rewards/receipts/save schemas and Chapter data unchanged. Base T0 stats/cooldowns/coefficient/range/crit metadata and Type1.15/.85/1 unchanged. Existing joystick arbitration/0s release/automatic Basic/shared manual HSA and M6B tactical profile/state engine remain protected. Validity/effects shared AI/player pipeline.

## Lifecycle and bounds
Generic status records source/target/type/magnitude/data/start/expiry/policy/tags; replace/strongest/stack bound3,64 global. Positive gains additive cap15%; mitigation/incoming strongest. Control gates ordinary motion/new actions for both controllers; existing noninterruptible casts remain. Source/target KO removes statuses. Avoidance may require dodgeable metadata; steadfast rejects new control. Area source KO cancels, living targets unique stable order; fixed copied x/y geometry,12 instances, interval≥.2s/duration≤10s, one due pulse per step/missed intervals skipped. Periodic damage uses shared Type/DEF/status/noncrit pipeline and cannot recursively create zones.1e-9s logical expiry tolerance avoids extra fractional-clock tick.
Actual Arena Pause freezes clock/status/area; shutdown destroys presenter and clears retained session statuses/areas/threats/queued effects; Retry gets fresh session/config/Tier. Terminal clears transients. No realtime timer or storage import in effect runtime. Generic area ring and status MOB/EVA/STG/RES/◈ placeholders, Lab-only Tier labels; no final assets.

## TDD and regression
A21/21, B152/152, C143/143 after captured-live-control freeze regression RED→GREEN, D108/108/full501/501. Final targeted119/119, impacted369/369, full512/512, build/diff PASS. Test commands recorded in M6C_IMPLEMENTATION_PLAN.md and source tests tierCombatProjection/tierStatus/tierArea/tierFormalKits/tierPresentation/tierCombatRegression/battleLabRuntime.
Independent read-only review24/24 targeted,0 Critical,1 Important invalid schema fields/combinations and1 angle issue. Both fixed RED→GREEN; angle regraded functional because generic declared alternative must work. Root additional RED→GREEN fixes: explicit shutdown cleanup, full-HP secondary support without fabricated healing, natural production area fixture, fractional area/status expiry. No unresolved findings or deferred feature work.
Exact conservative seeds in canonical spec; no multiplicative runaway/flat stat growth/cleanse/dodge button. Full-HP T3 team heal grants secondary mitigation on valid cast even if healing clamps to0. Lethal Awakening can leave residual zone at captured hit position; KO targets never receive area pulses/statuses.

## Determinism / performance
Same teams/seed41/Tier/timing: all3 new presets ×4 Tier settings replay identically including snapshots/status/area records. Natural simulations terminal, tactical search bounded250ms/5 candidates, collection caps checked. Local CPU engineering sanity only, not phone FPS benchmark:

| Preset (allyT3/enemyT1) | Seconds | Steps | Tactical evaluations | Area pulses | Max statuses/areas | CPU ms |
|---|---:|---:|---:|---:|---|---:|
| tier-comparison | 17.15 | 343 | 322 | 0 | 11/0 | 32.72 |
| status-control | 50.9 | 1018 | 500 | 0 | 10/0 | 29.09 |
| persistent-area | 18.1 | 362 | 343 | 10 | 11/1 | 16.12 |

Persistent-area dev fixture uses formal caster opponents/formation so natural production AI actually leaves zones; no actor-stat lock or Campaign change. Final entry76,859 (M6B68,623; +8,236 pure Tier/schema/menu metadata), CSS19,133 unchanged, battle1,431,411 deferred. Source fingerprints index-CP8sRNpJ.js / index-CuxsJ6uc.css / battleRuntime-Q-JjQqz9.js. Static menu graph guard confirms no eager battle imports. No dependency changes.

## Delivery
Recovery5733a2463f2f8f568b85244731508eac0fb1b6e9; long-lived feature/PR1 and Pages flow retained per AGENTS13A; main untouched. A f6f24591d79febe66919f4e49bf65a45de6e4ece; B bf808779496f1f2920017e78416fa63dd986cba4; C35245514183bc59e7fc3a94f1440fff2441ac5bc; D8b694c52ef98058d3eb06c62ace031b474c3fa99. Intermediate checkpoints skip CI; coherent E release triggers actual CI/Pages. Actions/public verification pending.

## One focused player smoke
Dev Battle Lab: same teams/enemy Tier/seed41, select allyT1/T2/T3 then toggle T0 ally baseline. Compare mobile reach/avoidance/conditional final hit; guard protection/stagger; rear low-HP heal and mitigation; fox coverage/conditional pressure/residual area; bruiser movement/control/commitment. Use STATUS / CONTROL TEST and PERSISTENT AREA TEST atT2/T3. Check Pause/Retry/Back and normal save unchanged once. Physical iPhone readability/feel/balance remains player-owned; no broad Campaign replay/reset. STOP before art/animation/final VFX/audio/Chapter2/economy/Level/Star/Rarity.
