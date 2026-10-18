# P1 Lushu Hit reaction — key pose review

Status: **CANDIDATE / KEY POSE PLAYER REVIEW PENDING — 2026-10-18**.
Recovered feature/PR1 HEAD: `a45072f25bc423d64c5c7ad18009a51ad61be1ce`.
Awakening remains PASS / PLAYER VERIFIED at runtime `8e2f5e049095017d7350b1d0d61e96527ab21e44`; no prior release checks were rerun. P1 overall completion/P2 remain unclosed.

## Current concrete review gate

`docs/art/candidates/lushu/hit/key-pose-v1/Hit-key-master.png` is the newly generated SINGLE right-facing standing recoil candidate, not an approved reference. Built-in imagegen used the exact approved `public/assets/characters/lushu/identity.png` and `battleIdle-4f.png` as references; prompt retained beside the image. White species-derived head/mane, antlers, amber stripes, black/gold equipment, one red tail and compact curved blade are retained. Shoulders close, left forearm covers ribs, knees flex, weapon points down and both feet stay grounded. No attack slash, impact FX, airborne travel or KO slump is authored.

`Hit-key-padded.png` adds transparent canvas only, without scaling/repainting any source RGBA pixel. `qa.json` binds hashes/dimensions/bounds; `Hit-key-light-dark.jpg` is a QA view, never a production sheet. Reviewed entire horns/mane/blade/tail/feet on light and dark backgrounds; no clipped silhouette or adjacent frame exists in this single-pose source. Source contains 18,435 low-alpha pixels (alpha1–8); these are preserved and reported, NOT claimed cleaned. Any later alpha normalization must be reviewed without deleting character colors. This source is not a runtime texture and its ground/scale is not yet a locked multi-pose anchor.

**WAIT for explicit player identity/weapon/Hit-pose acceptance.** Do not author unseen additional poses or produce a sequence/GIF from this unaccepted pose. After acceptance preserve exact source; create the settling pose, normalize with actual approved Idle return, then provide normal/slow/both-facing GIFs with decoded holds >=20ms. GIF approval precedes scoped integration/release and later player in-game acceptance. No new approval is requested for Basic/Heavy/Special/Awakening/Idle/Move/KO.

## Read-only implementation findings

- `src/roster/catalog.js` P1 assets inherit `battleHit: placeholder.battle`; no P1 `animationDescriptors.battleHit` exists. Manifest has no formal Lushu Hit PNG. `characterAnimation` defaults to a nonlooping .4s placeholder descriptor. Slot/handler presence is not formal Hit completion.
- `BattleSession.applyResolvedDamage` queues only finite positive resolved damage after avoidance checks; damage events copy target position, targetId, amount and eventAt (plus action identity when available). `ArenaScene.renderCastEvents` drains damage into `visualAssets.hit` with simulation eventAt, then processes cast events. Do not attach Hit to attempted casts/misses or synthesize HP changes. Later integration must audit any other damage producers for the same event qualification.
- `AssetPresenter.hit` currently replaces the single actor state and start time, including consecutive hits. It has only the closed guard, no local amount/KO/stale-event guard. Render HP<=0 forces battleKo and clears active actions. During living formal action playback, action descriptor/frame wins over the Hit body. `castStaged(start)` deletes the actor state; finished action cleanup can also delete it. Generic `battleCast` overwrites state. These are current overlap hazards to address through the shared presenter, not by adding a parallel reaction system or an ID exception.
- Missing optional Hit texture currently falls back to Idle/Move; formal Hit is not in `prepare()` encounter required/pin/validation slots (Idle/Move/KO and action keys are). `syncEffectPins` pins Hit/Cast state sources and demands them optionally after events. Integration must promote an authored Hit to required encounter readiness, measure both cache and scene, and keep displayed old textures pinned until switched.
- `animationFrame` supplies equal-cadence frames with nonloop duration/staticFrame; reduced-motion freezes the chosen staticFrame until duration expires. Non-action sprite rendering does not mirror origin.x; use central horizontal origin for Hit unless the shared renderer contract is deliberately extended/tested. Runtime size derives from 72*descriptor.scale and region dimensions: match approved Idle skull density and world ground in both directions, not merely raw canvas sizes.
- Pause blocks session advance; rendering consumes simulation seconds, so repeated same-time paints must retain Hit. Arena owns presenter/session cleanup on shutdown AND destroy; presenter.destroy clears sprites, states, actions, pins and optional work. Restart must create a fresh instance; no timer/listener/pin may outlive it.

## Proposed presentation contract — not yet implemented or accepted

Two authored poses: immediate contracted recoil → settling posture → existing static Idle or live Move, with **100ms +100ms =200ms** candidate playback. No anticipation before damage: response begins at actual positive-damage eventAt. The short window is a hurt cue, not the four-frame attack sequence or existing .4s fallback copied as design. Exact feel needs GIF review. Reuse shared animationDescriptor if equal cadence suffices; do not introduce a new timing subsystem for this slice.

Proposed body priority: **KO > active authored Cast > Hit > Move > Idle**. Do not interrupt/replace the accepted cast body or reset combat/action clocks. A hit occurring during active authored Cast is consumed without replaying a delayed flinch; its existing true contact FX/numbers remain. A later actual hit after the cast can start Hit. Consecutive distinct positive-damage events refresh the single reaction, no stacked sprites/queued flinches; reject duplicate/stale event replay in the eventual generic contract. Reduced motion uses the recoil static pose for the same bounded window. Keep facing from current action/movement/last-facing contract; do not auto-turn victim toward attacker. On HP<=0 show static KO immediately; do not play a living Hit first.

No stun, knockback, invulnerability, cast cancel, movement pause, hitstop, damage, attack-speed, cooldown or collision changes. No game source edits or release in this checkpoint.

## Capacity / actual checks

Run `node scripts/inspectLushuHitPreflight.mjs`: all-five-unique-roster required-set preload uses real PNG header/encoded metadata with mocked image decoder/Phaser draw API. Scene and cache peak both **16,552,840 bytes**; cap16,777,216; free224,376; optional reserve131,072. Planning envelope two96x96 RGBA cells =73,728 bytes, hypothetical required total16,626,568, remaining150,648 (19,576 beyond reserve). This is not a produced/visually accepted runtime derivative; actual normalized cell size, required-set loader changes, entry count, load reservations and image quality must be measured again before integration. Never raise cap or evict required art to fit.

Probe also verifies current missing formal descriptor, latest-hit start replacement, destroy clears scene/state/pins, closed presenter ignores Hit. Static code review covers event order, cast overlap, KO, mirroring and Pause; **no new Hit runtime, browser/phone test or engineering PASS is claimed**. Existing Awakening tests/build/release remain prior evidence. New checks: PNG decode/alpha/pixel-preserving padding/light-dark inspection, metadata-only required-set probe, `git diff --check`, protected product/art hashes unchanged. No broad suite/build/deploy needed for candidate/docs/read-only probe scope.

## Exact next step

Player reviews only `Hit-key-padded.png` identity, weapon continuity and standing hurt pose. On approval bind exact statement and SHA256 before settling-pose authoring. Do not skip to GIF/runtime/deployment or declare whole P1 complete. Keep feature branch/PR1; checkpoint `[skip ci]`, no main merge. All older completed milestones remain protected.
