# Global Dynamic Asset Residency Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the game's fixed total decoded-byte and required-entry rejection gates while keeping complete required scene readiness, per-image safety and reclaimable inactive resources.

**Architecture:** The shared cache remains a two-transport decode/dedup layer with soft LRU retention. The scene-owned residency is authoritative for required texture availability and pins; optional textures are reclaimable, and actual decode/upload errors prevent required readiness. This plan covers only the global policy, not Awakening art/event integration or deployment.

**Tech Stack:** Node.js 22.12+, ESM, `node:test`, Phaser 4.2.1, Vite 8.3.1.

**Spec:** `docs/superpowers/specs/2026-10-22-global-dynamic-asset-residency-design.md` (SHA256 `c47019288e6b6ceaf15b8c87872c5eb156518847fec3922eadab72df69e2141b`), approved by `docs/verification/P2_AWAKENING_PREFLIGHT/global-residency-spec-acceptance.json`.

## Global Constraints

- No fixed total decoded-byte hard ceiling or scene required-entry rejection; never replace 16 MiB/64 with larger hard constants.
- Keep individual image guards: 4 MiB encoded, dimension 2048, pixels 4194304, manifest metadata and actual transport validation.
- Keep all encounter required textures pinned, critical portraits/Idle first, two simultaneous downloads, optional demand, inactive LRU and scene destroy.
- A procedural fallback cannot satisfy required image readiness. Phaser allocation/transport failure stays explicit; optional failure remains nonfatal and observable.
- Chiru KO split is superseded; protect existing art/receipts and gameplay. Only `feat/m0-combat-core-20260927`, PR #1 open/unmerged; no TD/P3/main merge.
- Current historical full-suite failures remain named; this plan alone cannot establish Awakening integration, browser/device proof or Pages release.

## File map

- `src/assets/schema.js`: per-image guards and shared defaults; remove global hard acceptance constants.
- `src/runtime/assetCache.js`: two-request transport, fallback and soft decoded-cache retention; no size/count admission rejection for a valid individual image.
- `src/runtime/assetResidency.js`: scene pins, required/optional textures, inactive reclamation, failure/late load and diagnostics without hard totals.
- `src/runtime/assetPresenter.js`: preserve required enumeration/critical ordering; release stale cache references on scene transition if verified safe, without destroying live shared textures.
- `tests/assetCache.test.js`, `tests/assetResidency.test.js`, `tests/dynamicAssetIntegration.test.js`: RED→GREEN policy and failure tests.
- Legacy tests asserting the old ceiling: `tests/{botuoBasicRuntime,botuoHeavyPacking,chiruKo,jiuweihuKo,jiuweihuStatic,lushuBotuoKo,xingxingKo,xingxingStatic}.test.js`; update only their capacity-policy assertions, preserve their actor/art checks.
- Historical inspection scripts with hardcoded budgets are not production gates; label their reports historical or update affected inspectors only if reused, never rewrite frozen evidence.

## Review Focus

- A 65th **required** texture arrives while all earlier required textures are pinned: load succeeds and all remain registered (Task 2 test).
- One valid image's decoded size exceeds a caller-supplied old soft target: it still loads; only inactive cache retention is trimmed (Task 1 test).
- A transport returns procedural fallback for a required key: presenter readiness remains false with an explicit failure (Task 3 test).
- Scene destroys while a queued transport finishes: no texture appears in the closed scene; subsequent scene may still use cache (Task 2 test).
- Renderer rejects image registration after successful decode: no leaked reservation/texture, retry can succeed (Task 2 test).

---

### Task 1: Shared cache admission is per-image, retention is soft

**Files:** Modify `src/assets/schema.js`, `src/runtime/assetCache.js`; Test `tests/assetCache.test.js`.

**Interfaces:** Preserve `createAssetCache({manifest,transport,maxEntries,maxBytes})`, `load(key)`, `trim(targetBytes=0)` and `diagnostics()`. Treat `maxEntries/maxBytes` as optional finite *retention targets*, not admission or pending limits; default retention can remain bounded, and `load` may evict the oldest cache entry after resolving a valid load, but must return that loaded image even if it is larger than the target. Keep `ASSET_LIMITS.bytes/dimension/pixels`.

- [ ] Write separate failing `node:test` cases: valid image larger than tiny `maxBytes` returns its image, not fallback; >64 distinct concurrent/serialized image requests resolve despite old pending/cache limits; invalid encoded/dimension metadata still falls back; transport concurrency stays exactly ≤2.
- [ ] Run `node --test tests/assetCache.test.js`; confirm each new case fails due to the old admission gate.
- [ ] Implement soft LRU retention and remove global decoded-byte/count rejection from `createAssetCache`; keep fallback chain and per-image checks.
- [ ] Rerun `node --test tests/assetCache.test.js`; expect zero failures, then commit the cache/schema/test slice.

### Task 2: Scene residency protects all required textures without a total budget

**Files:** Modify `src/runtime/assetResidency.js`; Test `tests/assetResidency.test.js`.

**Interfaces:** Preserve `new AssetResidency(scene,{cache,prefix,softBytes,onEvict})`, `setPins(owner,keys)`, `load(key,{required=true})`, `reclaim()`, `release(owner)`, `snapshot()`, `destroy()`. Remove `hardBytes/maxEntries/optionalReserveBytes` as rejection options from production callers; retain estimated live/reserved/high-water counters and clearly mark retired fields in tests/docs rather than reporting misleading hard caps. `softBytes` can reclaim only unpinned content and never refuse a load.

- [ ] Write failing tests in `tests/assetResidency.test.js`: 65 pinned manifest keys load and remain, total >16777216 RGBA decoded succeeds; optional unpinned LRU is reclaimed at `softBytes`; parallel reservation/dedupe and actual allocation error/retry; destroy during pending; snapshot high-water and zero live after destroy.
- [ ] Run `node --test tests/assetResidency.test.js`; observe old hard-budget and 64-entry cases fail for the intended reason.
- [ ] Remove hard admission checks and obsolete reserve; keep pending cleanup, scene allocation cleanup, closed-scene late return and pinned protections. Update old tests whose explicit tiny hard caps encoded the retired policy without dropping failure/lifecycle coverage.
- [ ] Rerun `node --test tests/assetResidency.test.js`; expect zero failures; commit this owner/test slice.

### Task 3: Full required scene and historic assertions migrate without artwork changes

**Files:** Modify `src/runtime/assetPresenter.js` only if needed for safe cache trim; Test `tests/dynamicAssetIntegration.test.js` and the eight legacy files in File map.

**Interfaces:** `AssetPresenter.prepare(definitions,stage,abilities,onCriticalReady)` remains a required-image gate; `ready=true` only after every requested required texture has registered. `destroy()` tears down scene textures; any shared-cache trim must not break another live scene's decoded objects.

- [ ] Write failing integration cases: a synthetic manifest/roster exceeds 16 MiB and 64 required keys, retains all of them and has `ready=true`; missing required KO or renderer allocation keeps `ready=false`; stage/optional effects remain demand-driven; two scenes plus warm restart preserve the real P1–P5 roster.
- [ ] Run `node --test tests/dynamicAssetIntegration.test.js`; confirm the synthetic >old-cap case fails against current hard gates.
- [ ] Make only the necessary presenter change; replace legacy `ASSET_LIMITS.cacheBytes`, `hardBytes`, `optionalReserveBytes` success assertions with complete-key, nonzero diagnostic and zero-post-destroy checks. Do not delete anatomy/KO/ground/visual assertions.
- [ ] Run `node --test tests/assetCache.test.js tests/assetResidency.test.js tests/dynamicAssetIntegration.test.js tests/botuoBasicRuntime.test.js tests/botuoHeavyPacking.test.js tests/chiruKo.test.js tests/jiuweihuKo.test.js tests/jiuweihuStatic.test.js tests/lushuBotuoKo.test.js tests/xingxingKo.test.js tests/xingxingStatic.test.js`; expect zero policy-regression failures. Commit the integration/migration slice.

### Task 4: Verify shared policy and hand off to Awakening contract

**Files:** Update `WORK_PROGRESS.md`, `docs/STATE.md`, `docs/M5C_P2_BOTUO_AWAKENING_ACTION.md`, `docs/handoffs/P2_BOTUO_AWAKENING_NEXT_WORK.md`; create a scoped verification report under `docs/verification/P2_AWAKENING_PREFLIGHT/`.

**Interfaces:** No gameplay/art edits. This task delivers an evidence-backed global-policy checkpoint; Awakening's event/status contract and source-exact art are a separately reviewable next slice.

- [ ] Run the Task 3 affected command again, then `npm test` and `npm run build`; record exact counts and each preexisting/new failure, never say full-suite PASS unless exit 0.
- [ ] Compare protected approved masters/receipts and `public/assets` against base, inspect required-key counts, cache/scene high-water, startup critical ordering, shutdown and fixture/native browser checks actually available. Record which browser/device checks were not run.
- [ ] Write report with full source commit, changed paths, current release state and next Awakening observational contract review; update progress/handoff. Commit/push same branch after fresh verification, respecting CI workflow and never using a docs-only `[skip ci]` marker on runtime changes.

## Execution handoff

This plan is **new and not yet player-reviewed**. Player asked for a new Work to take over; use native single-agent execution once the player explicitly confirms this plan. New Work must fetch GitHub and present this file for review before changing production code. After this global-policy slice, review the separate Awakening event/status contract and faithful art installation, then test/build/browser/deploy/public-fingerprint and stop for player phone review. The already expressed deployment intent does not convert an untested plan into a release.
