# P1 Awakening runtime integration — automated verification

2026-10-18 Asia/Taipei. Source baseline fa29a9caa04a9b91b69169def720327b3c1f1476; feature feat/m0-combat-core-20260927 / PR1, main unmerged. Player「好確認，繼續」at10:10+08 accepts preflight Section2 and source-preserving packing. **IMPLEMENTED / AUTOMATED ENGINEERING CHECKS PASS / NOT DEPLOYED / BROWSER AND PHONE PENDING.**

## Delivered behavior

Generic validated stagedAction data selects80ms preparation, legs80–135/135–280/280–470, nominal center arrivals110/260/420, recovery610. Rays re-aim only at starts80/135/280 to the same locked living target; each leg max4 world units, follow-through.65/1.10/.65, arena ray truncation, legal empty-facing motion, no reacquisition/teleport/invulnerability. Relative sweeps use radii.30+.25 on simultaneous actor paths. Each leg resolves at most once regardless of previous hits. Common damage pipeline preserves fixed coefficients.40/.70/1.10, T0 CD12 and Tier projections, defense/mitigation and noncritical Awakening. Legacy four-frame attacks remain on their protected timing/effect paths.

Real overlap event times drive HP, numbers and target confirmation. For the stationary2-unit target:101.75/154.230769/350ms;110/260/420 remain center-arrival points. Event identity(actionId,hitIndex,eventAt) follows all3 true hits. Misses have no damage/RNG/target burst. Source phases show separate A/B/C textures even on misses; relative approved source/target sizes and opacity retained. Five body poses follow authoritative phases, reverse facing on B/C, recover470 and return Idle610. Target effects follow live target and remain independent under batched paints; duplicate events/paints idempotent, late first paint shows a finite confirmed cue, KO/cancel/scene cleanup releases ownership. Reduced motion keeps static phase cues without changing gameplay.

Outside an actual action the50ms step remains. Actual AI-selected start dynamically limits the interval to<=10ms before any actor moves; normal intents are evaluated once, cooldown/cadence restoration accounts only consumed time. Action/status expiry/legacy action/queued hit/telegraph/area deadlines split intervals. Damage ties are time→actorId→hitIndex; prior same-time KO cancels later contact. Reposition is a discontinuity, never a synthetic swept line.

## Sources and required memory

`P1_AWAKENING_RUNTIME_ASSETS.json` binds14 immutable approved source/review hashes,6 immutable legacy PNG hashes, runtime derivatives, resize/crop policy, exact RGBA reconstruction and both-facing world-coordinate proofs. Runtime action atlas640×128,5 poses; six independent VFX longest side96. Legacy blank rows/unused Botuo static frames repacked without changing visible world coordinates; no original overwritten/deleted/recolored.

Actual metadata/header transport through production cache/residency/presenter:36 required keys, peak16,552,840 decoded RGBA bytes in cache/scene and concurrent reservation accounting; cap16,777,216 unchanged; headroom224,376; optional reserve131,072. Repeated scenes/teardown verified. This is not total browser/GPU/RAM accounting, and128px body/96px VFX actual raster/device quality awaits visual check.

## Evidence

- `npm test`:877/877 PASS,0 failures. Full log observed in this session; source tests retained in repository.
- `npm run build`:PASS; asset guard78 files,3,897,370 encoded bytes. Vite emits its existing large-chunk notice, not a build failure.
- `git diff --check`:PASS. Protected source/GIF/acceptance paths have no diff.
- `node scripts/verifyLushuAwakeningRuntime.mjs`:8 isolated production session/presenter traces(player/AI × ally/enemy × left/right), each exactly3 independently identified true hits and zero residual allocation on teardown. JSON records actual events, draw commands, HP and coordinates. Source image decoder/Phaser draw boundary doubled; not a browser capture.
- Node6-actor simulation microbenchmark:120 fresh casts,20 warmup excluded;100 samples of610ms simulated action; median1.043ms,p951.817ms,max5.093ms in this environment. Not mobile/browser/GPU performance or FPS.
- New tests: stagedAction physics(all8 scripted moving-target masks), stagedActionOrder(time ties across sweep/queued/telegraph/periodic area), stagedActionClock(normal50/actual10ms), stagedActionPlayback(5poses,3effects,latepaint,legacy overlap), awakeningActionIntegration(real Arena bridge/four Tiers/mirror/reduced motion), awakeningRuntimePacking(source/world-transform/memory).
- Existing action/Move/KO tests updated only to intentional packed dimensions and exact reconstruction; source hash assertions and unchanged gameplay/visual world placement remain protected. Legacy old multi-hit timing assertions now wait for approved independent phases. Seeded legacy stage win is explicitly an opt-out fixture; current production staged encounter independently wins at29.45s and has deterministic Victory/Retry coverage after the scheduling correction, no covert balance adjustment.

## Independent review and fixes

Fresh reviewer inspected the whole implementation diff. Important findings resolved with reproducing failing tests then passing fixes:
1. Source Image retained A texture for B/C → rebind each phase's real texture; production descriptor/both-direction regression.
2. Queued/telegraph hits processed after tied sweep → common chronological queue; includes periodic-area pulse, source KO and actual target positions.
3. Mere AI readiness enabled10ms globally → only a real selected cast enables fine stepping; no-cast/basic-selected preserve50ms, automatic starts/cooldowns/5ms expiry covered.

Additional root regression: retained Heavy target impact must not replace a new staged body/hide its first30ms rush; retain contact independently. No unresolved Critical/Important finding reported. Automated verification does not close unobserved browser/device gates.

## Remaining release delta

No deployment in this slice; checkpoint `[skip ci]`. Build fingerprint:index-CXbA8deU.js,battleRuntime-Dz6VjJsC.js,index-DcqtNRF0.css (local only). Need actual browser presentation/raster/cadence check, scoped deployment and public fingerprint, then player phone review of speed/three true hits/whiffs/size/facing/Pause/Restart. No P2/main merge or new art. Do not reopen accepted visual or real numerical contracts.
