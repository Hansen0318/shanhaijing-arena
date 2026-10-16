# Heavy Synchronization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax.

**Goal:** Play accepted Heavy with real280ms hit synchronization under unchanged16MiB.
**Architecture:** Generalize existing pending Basic lifecycle by category. Reuse ActionPlayback/presenter. Use lossless transparent KO row trimming to fund the new approved Heavy textures without changing residency architecture.
**Tech Stack:** existing JavaScript/Node22/Phaser4.2.1/Vite8.3.1; Pillow for deterministic assets.
**Spec:** docs/superpowers/specs/2026-10-16-heavy-synchronization-design.md

## Global Constraints

Feature branch feat/m0-combat-core-20260927 / PR1; no main merge. Preserve original approved art/GIF, Basic and combat coefficients/range/cooldown/AI. Fixed280ms P1 Heavy; no role/character engine special cases;16MiB unchanged. User directed continuing native execution; no repeated executor-selection/visual approval gate.

## Review Focus

- Duplicate P1 actors using Basic and Heavy concurrently must retain both textures and independent actionIds.
- A target escaping range during startup must not take damage or transfer the hit to another enemy.
- AI's next choice must not immediately cancel a committed Heavy before280ms.
- Manual other skill cancellation must keep spent cooldown and remove late effects.
- KO crop must retain both mirror directions and exact grounded pixel coordinates, not merely look similar.

### Task1: Shared pending action lifecycle
**Files:** src/combat/ability.js, src/roster/abilities.js, src/combat/battleSession.js; tests/heavyWindup.test.js and directly stale Basic assertions.
**Interfaces:** consume windupMs opt-in; produce category-aware start/resolve/cancel, pendingActions and damage.actionId; preserve pendingBasics compatibility.
- [x] Write Heavy no-early-damage/cooldown/cancellation/AI/mirror/Tier/escape tests.
- [x] Run node --test tests/heavyWindup.test.js; observe RED immediate damage/missing lifecycle.
- [x] Generalize pending lifecycle, opt in280ms Heavy; protect Basic behavior.
- [x] Run Heavy+Basic targeted tests GREEN; checkpoint.

### Task2: Exact asset packaging and category descriptor
**Files:** scripts/prepareLushuHeavyRuntime.py, public optimized Heavy/KO derivatives, src/assets/manifest.js, src/roster/catalog.js; tests/lushuHeavyAssets.test.js.
**Interfaces:**512x128 Heavy atlas plus112x112/128x86 FX; botuo512x331/origin[.5,280/331],scale2. Existing actionDescriptor {frameDurationsMs:[200,80,140,180],impactFrame:2}.
- [x] Write missing Heavy asset/actual decoded budget/KO pixel and both-facing transform tests; observe RED.
- [x] Create source-hashed deterministic derivatives; register metadata, add Heavy action with measured scale/anchor/effect placement.
- [x] Run asset, Basic unchanged-source and affected KO tests GREEN; checkpoint.

### Task3: Presenter bridge, release and closure
**Files:** tests/heavyActionIntegration.test.js; affected regression fixtures, verification docs and progress/state.
**Interfaces:** existing presenter.cast handles shared events; no new combat capabilities in renderer.
- [x] Write actual BattleSession→presenter no-contact-before-hit test, miss/cancel/KO/reduced/mirror/Pause/Restart and mixed Basic+Heavy ownership.
- [x] Observe failures, fix only confirmed bridge defects, run focused checks GREEN.
- [x] Full npm test, asset guard/build, source/art protection and diff checks.
- [ ] Whole-delta review, fix material findings with RED→GREEN.
- [ ] Feature push without skipCI, inspect successful Actions/Pages, verify public fingerprints.
- [ ] Record engineering evidence and separate player phone checklist, stop without main merge.
