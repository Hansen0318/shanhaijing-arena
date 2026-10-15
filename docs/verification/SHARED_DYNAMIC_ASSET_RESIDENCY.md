# Shared dynamic asset residency verification — 2026-10-15

Status: **LOCAL ENGINEERING PASS / CI-PAGES RELEASE PENDING / PLAYER IPHONE SMOKE PENDING**.

## Recovery and protected baseline

Recovered GitHub HEAD `168bfb1e22d08a10c3cd79f8e2fc1f1ca23755a2`, current AGENTS/playbook/boundaries/state/handoff and `docs/SHARED_DYNAMIC_ASSET_RESIDENCY.md`. Active `feat/m0-combat-core-20260927`, PR#1; main inspected but never merged. Core checkpoint `156ae4b48d1d2220393c05a0cd751e155de9b0a2` persisted separately before runtime integration.

All **26** files under public/assets/characters compare byte-identical to recovery using git-show and direct file bytes; existing PNG checksum/frame/geometry tests remain. No manifest, roster/animation descriptor, playback, combat, AI, Tier, acquisition/reward or campaign source changes. Only obsolete readiness/eager-VFX test expectations and renderer VM imports changed.

## Delivered ownership and readiness

- `AssetResidency` owns this scene's namespaced textures, decoded RGBA estimates, explicit per-consumer pins, LRU touch/removal, in-flight byte/entry reservations, same-key dedupe, finite diagnostics and cleanup. No mutable simulation actor access and no new global debug objects.
- `AssetPresenter.prepare` takes only encounter definitions. Portraits/Idle load first and repaint HUD even while paused; all authored Move/KO must also load before readiness. Required unknown keys, invalid required descriptors, transport/metadata failures, allocation failures and capacity failures are explicit errors. Procedural placeholders remain legitimate only for procedural definitions; failed approved image downloads cannot become successful placeholders.
- One encounter pin set retains portrait/Idle/Move/KO through every alive/dead state. Stage ownership is scene-local. Existing effect/overlay images load only when used, with deterministic procedural fallback for optional failures. Effect/state pins and actual actor-display pins prevent recycling live references during Hit→Cast transitions. Optional displays referencing an evicted texture are destroyed before that texture; unrelated active displays are retained.
- Arena shows an opaque LOADING/error/TAP TO RETRY gate. Countdown, fixed-step combat and manual ability/joystick acquisition wait for essentials, including Lab skip-countdown. Readiness paints HUD before hiding the gate. Retry preserves the frozen battle snapshot. Shutdown closes attempt callbacks and destroys presenter-owned textures; late loads may finish in bounded shared cache but never attach to replacement scene.
- Collection continues on its independent DOM image path; Arena never prepares full-body menu images. No new attack, Hit or VFX art/animation was authored.

## Finite policy and measurements

| Layer | Policy | Evidence / meaning |
| --- | --- | --- |
| Scene texture soft target | 12MiB / 12,582,912 bytes | Reclaim LRU unpinned textures under pressure; essential pins may exceed soft target |
| Scene texture hard safety | 16MiB / 16,777,216 bytes, max64 images | Existing player-tested ceiling retained conservatively; configurable downward; reservations prevent parallel overcommit |
| Decoded image LRU | Separate16MiB, max64 entries | Existing bounded transport2, fallback/retry and warm reuse retained; metadata, trim and diagnostics exposed |
| Current all-five essential scene set | 16,597,648 bytes | Both roster orders; all20 required textures resident, no silent drop;179,568bytes below hard cap |
| Eight warm scene restarts | Same essential set, no additional transports | Every shutdown scene resident bytes/texture keys zero; normal/reduced-motion and six actor KO exercise shared paths |

These counters estimate decoded width×height×4 **per layer**, not total RAM or actual GPU consumption; cache and scene can reference the same image. In-flight transport2 and per-file4MiB/2048dimension/4,194,304pixel guards remain. Browser/Phaser/OS/transient decode overhead is outside these estimates. No performance.memory authority, Infinity, global32MiB increase or removed safety guard. Future essential sets beyond the hard cap must use the explicit gate and measured device-policy review rather than silently omit images.

## Executed verification

- Core characterization observed RED7 → core/cache12/12 PASS; integration/gate RED7 → GREEN, actual Arena gate RED2 → GREEN. Additional unknown-source and both independent-review findings were reproduced RED before fixes.
- New shared tests cover pins/LRU/dedupe/concurrent reservations/budget pressure, required failure/retry, actual allocation-null failure, cache independence, scene lifetime, cold/warm readiness, eight restarts, five unique characters/six actors, KO, reduced motion, optional image demand/fallback, Collection separation and actual Arena countdown/skip-countdown gating.
- Impacted asset/cache/HUD/KO/move/static/menu/pause/restart tests **156/156 PASS**. Full `npm test` **708/708 PASS**, no failed/cancelled/skipped tests.
- `npm run build` PASS, unchanged asset guard **62 files /3,667,880 encoded bytes**. Fingerprints: `index-oftBxKQK.js`, `battleRuntime-ByoySI4i.js`, `index-DcqtNRF0.css`.
- Independent reviewer found two important failure paths: invalid required Idle falling back under readiness, and optional Hit/Cast actor references surviving eviction. Both fixed with dedicated RED→GREEN tests; complete suite708/708 afterward. No unaddressed critical/important findings.
- Tests execute real cache/presenter/gate/Arena methods and real sessions with renderer/transport boundaries doubled. A local headless-browser attempt could not run because the provided Playwright browser binary was absent and browser download returned invalid/truncated archives. No browser/GPU/iPhone profiling success is claimed. Device acceptance remains player-owned per AGENTS11.
- Only existing npm http-proxy and Vite large-chunk build warnings; no dependency/product-build configuration changes.

## Release and player gate

Pending: publish integration checkpoint, CI/Pages, byte-match public HTML/JS/CSS and all26 character files to tested dist, record source/workflow proof. Then **STOP** for iPhone cold entry, several Restart cycles, KO/pause, Collection→battle→Collection: no blank/late HUD, missing fighters, lost KO/mirror or menu images. Do not mark PLAYER VERIFIED or start new actions/VFX before explicit acceptance. Never merge main.
