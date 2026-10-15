# Shared Dynamic Asset Residency Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline, then independent whole-change review.

**Goal:** Keep this encounter's approved character images available while reclaiming unused optional scene textures and gating play on essential readiness.
**Architecture:** One scene residency owner with per-owner pins, deduplicated loads, reservations, LRU eviction and explicit failures; the existing bounded decoded-image LRU remains separate. AssetPresenter translates encounter definitions and visible effects into ownership; Arena waits before advancing its unchanged combat/countdown clock.
**Tech Stack:** JavaScript, Phaser 4.2.1, Node tests, Vite.
**Spec:** docs/SHARED_DYNAMIC_ASSET_RESIDENCY.md (already player-approved; implement in this session).

## Global Constraints
- No approved PNG/descriptor, gameplay, AI, Tier, reward or new VFX changes; feature branch / PR#1 only; never merge main.
- Keep per-file guards. Scene soft target 12MiB, hard safety cap 16MiB and 64 textures, configurable downward. Retain the existing player-tested 16MiB upper bound pending phone measurements; no unsupported cap increase. A soft target is reclaimable pressure, not a required-art failure threshold.
- Separate cache cap 16MiB /64 entries, transport concurrency2. Estimates are decoded RGBA only, not total RAM/GPU. No performance.memory or new global debug state.

## Review Focus
- Concurrent requests must reserve capacity before installation, with no missing pinned art.
- Slow completion after shutdown must not attach textures to the next scene.
- Cached fallback must never count as success for an approved required image.
- Optional image removal must destroy its displays before texture removal.
- Loading/retry must freeze countdown and combat, including Lab skip-countdown.

### Task 1: Residency owner
Files: new src/runtime/assetResidency.js; tests/assetResidency.test.js; src/assets/schema.js; src/runtime/assetCache.js.
Interface: AssetResidency(scene,{cache,prefix,softBytes,hardBytes,maxEntries,onEvict}); setPins(owner,keys), release(owner), load(key), reclaim(), destroy(), textures Map, snapshot(). Cache exposes record(key), diagnostics and trim().
- [ ] RED: test eviction vs pinned images, concurrent dedupe/reservation, overflow/failure retry, shutdown race and invalid budgets.
- [ ] GREEN: implement LRU accounting, bounded diagnostics, ownership, resource removal and deterministic errors; expose cache metadata without coupling its eviction to live textures.
- [ ] Verify node --test tests/assetResidency.test.js tests/assetCache.test.js; checkpoint.

### Task 2: Presenter and Arena readiness
Files: src/runtime/assetPresenter.js, src/runtime/ArenaScene.js; new src/runtime/sceneAssetGate.js; tests/dynamicAssetIntegration.test.js, tests/sceneAssetGate.test.js; impacted presenter tests.
Interface: presenter.prepare resolves only when all encounter Portrait/Idle/Move/KO image keys are resident and pinned; optional VFX/overlays load on use, pinned until display removal. Asset gate exposes start(load), state, error, destroy; callbacks apply only to current attempt.
- [ ] RED: five unique characters/six actors, cold/warm repeated restarts, Collection separation, optional effect lifecycle, KO while loading, required failure+retry and late-shutdown tests.
- [ ] GREEN: integrate owner, on-demand effect loads, required errors; show opaque loading/error/retry gate; freeze update/input until complete and redraw HUD before hide.
- [ ] Verify targeted asset/cache/HUD/KO/movement/menu tests; checkpoint.

### Task 3: Release verification
Files: docs/verification/SHARED_DYNAMIC_ASSET_RESIDENCY.md, WORK_PROGRESS.md, docs/STATE.md.
- [ ] Compare P1–P5 file hashes/descriptors/gameplay source to recovery168bfb1.
- [ ] Run npm test, npm run build, git diff --check; independent review and direct fixes if needed.
- [ ] Publish feature checkpoint; verify CI/Pages and public index/bundles/all approved character PNGs against tested dist.
- [ ] Record actual counts, estimates/caveats/source SHA, CI/public proofs; STOP for player cold entry/restarts/KO/pause/Collection navigation phone smoke.

## Execution ledger
Recovery168bfb1. Spec approved and user explicitly requested implementation/deploy in current Work; no repeated design approval. Dedicated clean feature checkout reused per explicit active-branch instruction.
Ruling: preserve tested16MiB hard safety bound while replacing all-at-once refusal with per-encounter pins and LRU; 12MiB soft target permits required16597648-byte roster. No phone evidence supports raising hard cap; future larger essential sets must error visibly and request measured cap review.
