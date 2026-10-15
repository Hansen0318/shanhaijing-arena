# Shared Basic windup + P1 action/VFX synchronization

Status: **B DIRECTION PLAYER APPROVED / WRITTEN DESIGN PLAYER REVIEW PENDING**.

Decision2026-10-15T22:18:37+08:00: player chose **B**, accepting actual180ms pre-impact timing rather than immediate damage with delayed visuals. This resolves the A/B choice; do not ask it again. The detailed cancellation, targeting and presentation contract below is proposed for written review before implementation. Recovery20357377e047649b0d5f80b93c246f076b5061f1; feat/m0-combat-core-20260927 / PR#1. No main merge.

## 1. Intent, scope and protected baseline

Make accepted P1 Lushu Basic F1 windup -> F2 strike -> F3 contact -> F4 recovery visible in battle, with actual damage, HP, damage numbers and hit spark agreeing at F3. Reuse common ability/session/presenter/residency paths, never character-ID branches in the engine. Initially ONLY data for P1.basic opts into180ms. P2–P5 and Heavy/Special/Awakening keep current timing and presentation. No new attack artwork.

Approved originals, GIF and independent VFX: docs/art/approved/lushu/basic/ and its review-v1/acceptance.json. Never redraw/recolor them. Protect identity/static Idle/Move/KO visible pixels, movement speeds, attack-speed/Tier stats, damage/crit coefficients, ranges, rewards, progression, AI profiles, controllers and telegraph mechanics. Authorized gameplay exception is delayed P1 Basic resolution and explicitly reviewed cancellation/range semantics, not a promise of identical battle outcomes.

This changes the shared ability lifecycle and its presentation events: treat it as architectural work. Written-spec review precedes the implementation plan and its review. Use the current session/native implementation unless the player asks for another executor; no automatic subagent delegation.

## 2. Approach and alternatives

Recommended: add an optional validated Basic windup field and a session-owned pending Basic action lifecycle. Extend the existing event/presentation pipeline with start/resolve/cancel phases. Keep simulation authoritative and renderer read-only.

Do not force the change into ThreatLedger: its existing telegraph geometry, tactical AI commitment and Tier windup floors are separate accepted mechanics. Do not set a fake dodgeable telegraph or lower TIER_SAFETY.windupMs300 to obtain180ms. Do not implement it as a renderer timer; that would not delay real damage or correctly observe death/pause/control.

## 3. Ability data and cadence

- `createAbilityDefinition`: optional `windupMs`, default0; finite integer0..1000, permitted for category basic only. Reject nonzero windup combined with a telegraph in this slice. No ID-specific condition.
- Formal P1.basic sets180; every other current definition remains0.180ms is fixed at T0–T3, not projected by telegraph Tier scaling. Do not change any Tier curve, safety cap, attack-speed stat or cooldown.
- The normal Basic interval starts when a valid attack begins, not again at impact. Existing `max(TIER_SAFETY.basicInterval,1/attackSpeed)` stays unchanged. No refund on miss/cancel; no double start or accumulated catch-up hits.
- Same-actor pending Basic prevents another Basic even if a future cadence were shorter than windup. P1's recovered T0/T1/T2/T3 intervals are approximately .869565/.790514/.712758/.621118seconds, all longer than180ms. Presentation may not extend these intervals.

## 4. Authoritative action lifecycle

1. At simulation time `t0`, run existing availability/control/target/range checks. If valid: commit cadence, capture one target instance ID, allocate a unique per-session action token, and enqueue impact at `t0+.18`. Emit start immediately; no damage, crit RNG draw, damage event or hit spark yet. Preserve the current cast-trigger semantics at start, once only.
2. Resolve exactly once at the first simulation update at/after due time (floating-point epsilon1e-9 seconds). Never use setTimeout/wall time. The earliest available simulation step defines the actual resolve time; do not claim sub-frame precision.
3. Revalidate living source and captured target, enemy relation and current range. Do NOT retarget to another enemy. If target left range: consume the attack, produce a miss result and no damage/contact spark; show remaining swing/recovery. No extra lunge, homing projectile or range enlargement.
4. Source KO, target KO, active hard control during pending windup, or a different successfully started ability from the same actor cancels pending Basic. Emit cancel, clear token/queued impact, no delayed damage/spark, no cadence refund. Ordinary incoming damage without hard control does not cancel.
5. Manual movement and AI movement continue at unchanged speed; movement alone does not cancel or root the source. Resolve range from actual current positions. Target selection may change for controllers, but the pending action still owns its original captured target.
6. Pause/countdown do not advance simulation, so windup, frame pose and VFX do not advance. Exit/result/restart clear pending actions and event queues; a new session starts with no old action token. KO wins over all action art immediately.
7. Large delta: never resolve the same action twice or replay missed animation frames. An action started during an update may become due by that update's end, matching the existing discrete-step model. Resolve/cancel records must remain ordered so no post-KO contact survives that update.

## 5. Shared event contract and ownership

Use existing drained cast-presentation event path with additive `phase` (`start`, `resolve`, `cancel`), `actionId`, `startedAt`, `resolvedAt`/`dueAt`, `windupMs` and copied source/target geometry. Existing no-phase events remain legacy-compatible. Start and resolve are not two damaging casts. Keep the ability's on-cast and on-hit effects once each at their respective simulation stages.

Damage records for a delayed Basic carry the same action token. The renderer may display contact only for a successful real resolve/damage outcome, not from elapsed animation time alone. Miss/cancel must not call the old procedural Basic burst path. A killing hit may still show its authorized one-shot contact at copied impact geometry even though the target immediately enters KO; do not lose all lethal-hit feedback just because the old generic VFX cleanup follows living target IDs. Cancel still clears pending owner effects if the source dies before impact.

`ArenaScene.renderCastEvents()` routes all phases through the shared presenter and continues to render true HP/damage immediately on resolve. Do not queue/delay HP or damage text independently. Never pass mutable actor references into presentation records. P2–P5 no-phase events and existing telegraph/multihit events retain their current meaning.

## 6. Action presentation and synchronization

| Simulation phase | Normal action art | Effect |
| --- | --- | --- |
| Start through120ms | F1 anticipation | None |
| 120ms to due180ms | F2 strike | Accepted blade trail; no hit spark |
| Actual successful resolve | F3 contact | Real damage/HP/numbers and accepted contact spark together |
| Resolve to100ms later | F3 held | Independent trail/spark decay |
| Next120ms | F4 recovery | Clear transient effects |
| End | Existing static Idle or current Move | No new idle loop |

Nominal normal action is400ms. Event phase controls F3: if a coarse step resolves late, present F3 in that resolve update rather than having already advanced to F4. Preserve F1/F2 order during normal frame delivery; do not pretend every pose can be visible when a single render step skips the entire windup. Recovery is presentation-only and does not block the next valid attack/ability. New action tokens replace stale recovery without emitting another hit.

Use shared data-driven action metadata/descriptor selected by category, not a generic battleCast for every ability. Support explicit per-pose durations120/60/100/120ms rather than forcing equal fps. Attach to actor's projected current position and common ground anchor. Capture attack facing at start; mirror actor and attached effects as one family until action ends/cancels, then use current movement/last-facing logic. Source movement does not become animation-owned.

Reduced-motion proposal: do not slow damage/windup or modify attack cadence. Show restrained F1 until actual resolve, then short static F3/contact cue without the sweeping trail, and return to existing Idle/Move. This is an accessibility presentation variant, not a single-frame locomotion regression. KO/pause/exit priority remains the same.

## 7. Runtime assets, finite budgets and readiness

Use PNG/frame metadata, never GIF in runtime. Keep source PNGs and accepted384-square review cells unchanged. Prepare resize-only runtime action cells128x128 (strip512x128), common baseline320/384 and anchor family, using one uniform scale. Independent VFX runtime canvases97x81 (blade) and85x57 (spark) preserve full-canvas proportions/transparent content. Attachment geometry is expressed in accepted384-cell coordinates and transformed with actor display size, so different texture sampling dimensions do not change relative blade/contact placement.

For display scale, match existing Idle visible head/hoof height and ground anchor using deterministic source bounds; no character enlargement to rescue readability. Verify both mirrored feet and blade-tip attachment. If these derivatives are visibly unacceptable, stop for correction instead of changing approved artwork or increasing memory caps.

Read-only baseline inventory: all five required Portrait/Idle/Move/KO texture keys estimate16597648bytes RGBA, leaving179568bytes under the existing16777216 hard guard. Shipping the384-square action sheet alone adds2359296bytes and cannot fit that worst case.

Proposed narrow, lossless optimization: a new runtime-only P1 static Idle F1 PNG, exact region[0,0,96,128] of accepted384x128 strip. Retain original strip/file/accepted source path untouched. Runtime source dimensions become96x128 while rendered frame pixels, origin, scale and static behavior stay identical; this drops unused frames, saving147456decoded bytes. No P2–P5 or KO asset changes. No breathing restoration. Assert new Idle RGBA equals the old F1 byte-for-byte.

With that optimization:16450192 baseline +262144 action +31428 blade +19380 spark =16763144bytes, below hard guard by14072bytes. This is a near-limit estimate, not runtime PASS or total browser/GPU memory. Existing12MiB soft /16MiB hard scene policy and separate16MiB cache stay finite and unchanged. Essential encounter art never evicted merely to fake budget success. Actual five-roster load orders, concurrent effects, old optional cache content, repeated Restart and scene transitions must pass both layers; if they cannot, stop and report rather than raising limits or reducing accepted art further without review.

Stage encounter readiness includes its authored Basic action and required effect textures before combat starts, after first-paint Portrait/Idle priority; no first-attack animation gap or late texture pop. Preserve existing visible actor/HUD while loading. Failed required action image is explicit load failure/retry, not an ignored fallback that silently consumes the attack. Encounter/current-action pins protect use; optional/unneeded assets remain LRU-managed. Destruction/restart releases all tokens, displays and pins.

## 8. Files and verification boundaries

Expected shared code surface: combat/ability.js, combat/battleSession.js, roster/abilities.js, assets/descriptors.js, assets/playback.js, assets/battleDescriptors.js, assets/manifest.js, roster/catalog.js, runtime/assetPresenter.js, runtime/ArenaScene.js, and lifecycle cleanup only where actual flow needs it. P1-only new runtime asset files; no dependency, AI profile, Tier, reward or unrelated UI edits. Runtime implementation details/signatures belong in the post-review implementation plan.

TDD acceptance:
- Valid definition/default0; reject negative/noninteger/NaN/infinite/non-Basic windup and unsupported telegraph combination. P1=180, other current abilities unchanged.
- Zero damage and no hit RNG/event before.18; exactly one resolve/damage at first due step; stable cadence from start, repeated start rejected, all Tiers fixed180, legacy0 immediate behavior unchanged.
- Captured target leaves range ->miss, no retarget; source/target KO, hard control and successful higher-priority ability cancel; mere movement/damage do not. No refund, double on-cast/on-hit or residual pending damage.
- Normal/coarse delta, simultaneous actors, killing hit, controls, pause/no-step, result/exit/restart, same token ordering and frame/HP/number/contact synchronization.
- All four normal poses/timing, actual resolve gates F3, no false hit on miss; shared last-facing mirror, anchor/scale and Idle/Move/KO priorities, reduced-motion timing unchanged.
- Exact approved original hashes; new Idle exact F1 pixel equality; runtime alpha/padding/no neighbor bleed and attachment geometry; P1–P5 static/Move/KO and Collection/HUD unchanged.
- Full five-roster essential/action/effect load peak in cache AND scene under unchanged hard caps, multiple load orders/Restarts, on-demand optional eviction, required load failure and shutdown/retry readiness.

Run targeted RED->GREEN tests first, then impacted combat/AI/tactical/Tier and asset/presenter/residency/HUD/locomotion/KO regressions. Update stale immediate-P1 expectations only where this authorized windup directly changes behavior; do not weaken assertions or ignore required image failures. Run full suite when the shared timing change requires it, asset guard/build, review actual diff, feature CI/Pages and exact public fingerprints of bundles/new assets. Save actual commands/results. Stop for player's iPhone action/KO/restart/readability acceptance. No main merge or next-character attack scope.

## 9. Review / exact next gate

Written design is not yet reviewed. Ask player to confirm this contract, especially movement continues, locked target/range miss, cancellation/no refund, start-to-start cadence, reduced-motion variant and lossless static-Idle runtime optimization. Do not re-ask A/B. After written-spec acceptance, create/review the implementation plan, then execute within the approved scope. No source/tests/build/deployment has been performed for this design checkpoint.
