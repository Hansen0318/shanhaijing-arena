# Shared dynamic asset residency — authorized redesign (2026-10-15)

Status: **DESIGN LOCKED / IMPLEMENTATION AND PLAYER VERIFICATION PENDING**. Player explicitly authorizes moving from a fixed all-battle-texture 16MiB gate to a shared dynamic, scene-/encounter-scoped residency system. This is a NEW bounded infrastructure milestone, not permission to disable guards or increase cache size without accounting.

## Problem statement
The current `ASSET_LIMITS.cacheBytes=16MiB` appears both in `createAssetCache` (LRU decoded image cache) and `AssetPresenter.loadKeys` (Phaser scene texture residency). These are separate layers and must not be conflated. Scene `loadKeys` silently refuses textures on overflow. Today five roster battle art fits narrowly at 16,597,648 / 16,777,216 bytes, with 179,568 bytes headroom; next action assets would likely exceed it. Current menu art uses DOM image loading, not automatic Arena texture residency. Avoid assuming all chapter roster images coexist in one Arena or that 16MiB represents total device RAM/GPU usage.

## Goal and architecture contract
1. **Encounter scope**: load only keys required by the current battle's active character definitions; no Collection full-body art in Arena. Never prewarm all future chapters or unrelated roster.
2. **Priority**: visible HUD portraits and static idle first; movement texture availability before the first movement can occur; KO texture availability before HP becomes zero. Skill VFX may load on demand if fallback is correct, but critical character art must not go missing during gameplay.
3. **Residency owner**: make a single shared, testable asset-residency manager for the Phaser scene, owning loaded keys, decoded size, explicit pin/unpin for currently usable critical keys, LRU/reclaim of unpinned textures, resource cleanup on scene shutdown/restart, and deterministic failure paths. No character-specific exceptions or mutable battle simulation state.
4. **Budgets**: retain per-file dimensions/pixel/encoded-byte integrity checks; replace fixed `16MiB all-at-once` policy with explicit configurable *soft target* and measured *hard safety cap*, selected from tested target device behavior, not simply Infinity. Do not rely on `performance.memory` as cross-browser authority or claim true GPU size from width×height×4. `bytes` estimates count decoded texture RGBA only, exclude browser/Phaser/OS overhead; label them accurately.
5. **Cache separation**: the decoded-image LRU cache and Phaser texture manager must avoid duplicating unbounded residency. Coordinate their policies and limits, dedupe concurrent loads; noncritical cache evictions must not break live sprites. Reuse downloaded/cacheable assets on restart where safe.
6. **Failure/retry**: no silent missing required textures. If critical assets cannot be allocated or loaded, use explicit loading/error gate or deterministic fallback with diagnostics, not missing character art disguised as success. Preserve first-entry HUD fill success, reduced-motion behavior, left/right mirror, KO persistence and existing gameplay clock.
7. **Observability**: expose environment-neutral counters (requested, loaded, evicted, failed, pinned, estimated live bytes, high-water mark, load order). Avoid permanent global debug objects unless guarded.

## Incremental delivery gates
- **A: Characterization tests first**: recover current assetCache, assetPresenter, ArenaScene, menuImage, all relevant tests and the all-five fixture. Write new tests reproducing scene lifetime, cold/warm restart, VFX demand, KO during load, pinned actor art, menu separation, budget stress, and rapid scene shutdown/restart. Preserve existing player-verified baseline.
- **B: Shared residency manager**: reusable metadata-driven module and unit tests; implement actual runtime ownership/eviction; do not only relax the numeric 16MiB check.
- **C: Integrate with scene**: conditionally load per-encounter essential art, prefetch/evict nonessential art safely, block or fallback visibly when essentials unavailable, keep menu lifecycle separate. Ensure first encounter never starts with blank HUD and no art silently vanishes.
- **D: Validate**: target/impacted regression suite + all-six-actor valid encounters using five unique roster characters; force asset failures/slow fetch/prefers-reduced-motion/KO/restart/menu navigation; independent scene/cache diagnostics, Vite build, CI and Pages fingerprint. Explicitly verify P1–P5 static/move/KO source hashes and gameplay invariants unchanged.
- **E: Player phone smoke**: cold launch, battle, multiple restarts, KO, pause, Collection→battle→Collection. Measure perceived loading and observe no late portraits or invisible fighters. Do not mark PLAYER VERIFIED until explicit acceptance.

## Boundaries
- Do NOT modify approved PNGs, frame descriptors, movement, damage, stats, AI, Tier, rewards or combat timeline.
- Do NOT merge main; active branch `feat/m0-combat-core-20260927`, PR #1.
- Do NOT delete 16MiB checks as a one-line fix; do not globally raise to 32MiB without evidence.
- This milestone precedes additional Basic/Hit/VFX work; do not implement new action art in the same scope.
- GitHub is single source of truth; Chat-first safe code/spec work, Work only remaining executable integration/testing/deploy.
