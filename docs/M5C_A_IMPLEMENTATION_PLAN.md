# M5C-A Asset Pipeline Implementation Plan

Execute natively with executing-plans; user explicitly authorized automatic A–E continuation and one final independent review. Spec: M5C_ART_ANIMATION_VFX.md.

Goal: future characters/stages/skills use manifest data with graceful optional-art fallback; art never controls combat.
Architecture: pure validated manifest and standard slot contract → generic resolver/menu image binding → battle-only cached image loading → clock-owned animation/VFX presentation adapter. Phaser is imported only by the existing deferred runtime. Keep authoritative telegraph/status/area renderer unchanged.
Tech: existing JavaScript/Node/Vite/Phaser, no dependencies.

Review focus: fallback cycles/unknown keys, failed image decode, stale scene completion, texture cleanup/retry reuse, animation region bounds and infinite VFX accumulation. Guard each with targeted real behavior tests.

## A — schema/manifest
- [ ] RED manifest duplicate/cycle/path/dimension/size/reference validation, future-character standard nine slots.
- [ ] src/assets/schema.js exports createAssetManifest(entries), limits, CHARACTER_SLOTS; src/assets/manifest.js central current stage/placeholder records; roster data references asset keys.
- [ ] GREEN targeted tests; document/commit/push.
## B — resolver/loading
- [ ] RED resolve unknown/missing slots safely, portrait/stage fallback, selected encounter-only load plan and cache retry/concurrency/bounds.
- [ ] src/assets/resolver.js pure safe slot resolution and base-aware URL; menuImage.js error fallback without battle imports; runtime/assetCache.js injected transport/decoder cache, browser image loading and limits. Existing menu views consume resolver.
- [ ] GREEN targeted/impacted; commit/push.
## C — descriptors
- [ ] RED validate animation source/frames/regions/fps/duration/origin/static fallback and VFX forms/attach/layer/rotation/cleanup.
- [ ] src/assets/descriptors.js immutable descriptor constructors; playback.js deterministic clock projection and bounded presentation records; battleDescriptors.js default graybox data. No combat imports/writes.
- [ ] GREEN targeted; commit/push.
## D — shared Arena/Lab adapter
- [ ] RED scene generation/KO/restart/exit cleanup, same runtime Lab preview, gameplay snapshots identical and lazy graph preserved.
- [ ] runtime/assetPresenter.js loaded only by Arena; optional image textures/sprites and generic primitive VFX, animated state overlay, fixed clock playback. Retain fallback circles/HUD; replace cast graphics lifetime with descriptor presentation. Actual damage events remain owned by DamageNumbers. Threats/areas retain existing authoritative renderer. Lab dev-only slot inspection passes presentation-only config.
- [ ] GREEN targeted/impacted; commit/push before browser verification.
## E — release
- [ ] asset file/dimension build guard, impacted/full architecture regression, bundle comparison, independent review/fixes, build.
- [ ] push release, Actions/Pages/public source/menu/Lab/start/retry/exit verify, close progress/state/spec/evidence.
- [ ] one focused player visual smoke then STOP; no final art/audio/Chapter2/gameplay changes.

Limits: image4MiB, dimension2048/pixels4194304, cache64 entries/16MiB, active VFX64, descriptor frames≤128, duration≤10s (idle loop bounded by owner). Cache preserves decode across Retry; scene-owned textures/displays removed on shutdown. Procedural placeholders require no network. Two-frame graybox strip validates optional animation; not final character art.
