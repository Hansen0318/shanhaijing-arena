# P1 Awakening approved runtime implementation plan

Authority: player acceptance2026-10-18T10:10+08:00 of fa29a9c preflight Section2; full spec docs/verification/M5C_P1_AWAKENING_RUNTIME_PREFLIGHT.md. No main merge/P2; preserve source/receipts; skip CI checkpoints, no deployment yet.

1. Combat domain (combat agent): validated opt-in staged action schema, authoritative relative swept motion and chronological <=10ms intervals, per-hit weighted shared damage, lifecycle/input/AI bridge, actual event timestamps. RED→GREEN focused integrated tests for all masks/escapes/edges/KO/cancel/Tiers/ties.
2. Asset domain (assets agent, independent): deterministic128px five-pose atlas/six96px VFX and exact6 legacy packaging policies; adjusted origin/density, manifest and128KiB optional reserve; actual all-required peaks, source hashes and world-transform tests.
3. Presentation domain (root): validate staged5-pose descriptor; copied event-driven staged playback, source phases and independent contact queues, both-facing anchors, reduced motion, pause/end/cleanup. RED→GREEN playback/presenter plus session bridge tests.
4. Integration: run affected and full tests/build once coherent; review fresh diff against spec. Fix Important/Critical findings with failing regressions, record honest limitations and performance/cache evidence.
5. Record checkpoint plus successor pointer; push feature branch [skip ci], verify remote SHA. Stop before deployment unless separately authorized.

Interfaces: events phase start/segment/resolve/end/cancel carry staged:true,actionId,actorId,category,startedAt,eventAt seconds; segment/resolve hitIndex,direction,origin; resolve hit appliedDamage>0,resolvedAt,target; damage same identity/time. Descriptor kind staged,5-frame animation,coordinateSize,durationMs610,phaseFrames0..4,stages3 with blade/contact/contactHoldMs80/90/130. Session simulationStepSeconds() returns .01 while staged else .05. Assets exclusively catalog/manifest, root descriptors/playback/presenter, combat exclusively combat/abilities/scene.

Review focus: moving-target/teleport chronology, boundary/re-aim, no RNG on whiff, multi-events before paint and action ownership, simultaneous casters, lossless world-pixel transforms and startup/reservation peaks. Test-only mock renderer evidence must not be claimed as device screenshot/phone acceptance.
