# P3 Chiru static KO — 2026-10-12

## Executable checkpoint / ledger
Recovered authoritative feature HEAD11279d4cc5a17c6d5ba4c785e6bf95898aa8c404, PR#1 open/unmerged; latest prior Actions#864/38203143939 SUCCESS. Latest player handoff explicitly accepts P1/P2/P3 locomotion and P3 Move size continuity, and approves only P3 static KO integration. This supersedes the previous phone-smoke-pending pointer. Original JPEG upload was rejected with no repo write; subsequent approved PNG matches canonical metadata.

Approved attachment chiru_battleKo_approved(1).png copied byte-for-byte to public/assets/characters/chiru/battleKo.png:1254×1254 RGBA PNG,905147bytes,SHA256 f97e369fe2c6ae2d0fff1c51c96e487279b4bbe1e614925a7d1c2c4dc2a2796d. Canonical facing right; left uses shared horizontal mirror, no second asset. Decoded footprint6290064bytes; actual mixed P1/P2/P3 encounter preloads within existing16MiB cache. No export/crop/resize/redraw/normalization.

Production changes only manifest chiru.battleKo (placeholder.battle fallback) and P3 assets/descriptor. Descriptor: one full1254-square frame, duration1,loopfalse,staticFrame0,fps1,origin[.5,980/1254],scale2. Existing shared presenter/preload/dead state/facing/deadalpha.35 unchanged. HP<=0 replaces Idle/Move with permanent static KO; no looping, breathing, motion or animation transition.

Ground/size choice is data-only: main visible alpha>64 bbox(12,366,1240,980), originY980/1254 places its bottom on authoritative actor ground anchor. At144-square display, visible width141.014px versus living Idle133.2px, height70.507px (lying rather than hovering). Source contains faint alpha<=16 beyond main silhouette; bytes/pixels retained unchanged, not erased. Alpha>16 bottom981 is only.115px below selected ground origin. No actor-coordinate change.

## Test-first / executable evidence
New7 tests RED before integration (missing authored KO/source/file; renderer retained Idle). After byte-copy + data records:7/7 GREEN. Actual presenter in normal/reduced modes, both last-facing directions, switches living Move→KO, holds same frame through100s, keeps dead alpha/origin/144-square/projected position and never returns Idle/Move. Real BattleSession killing a manually left-moving P3 freezes gameplay position, presenter leaves snapshots equal and moveSpeed1.6 unchanged. PNG exact SHA/header/bytes plus native inflate/unfilter alpha-ground checks PASS.

Minimum impacted command: node --test tests/chiruKo.test.js tests/chiruMove.test.js tests/lushuMove.test.js tests/botuoMove.test.js tests/assetManifest.test.js tests/formalCatalog.test.js tests/assetPresenter.test.js tests/assetDescriptors.test.js tests/assetIntegration.test.js tests/battleHud.test.js tests/assetGuard.test.js →69/69 PASS. P1/P2/P3 locomotion unchanged; P3 Move2.7/Idle2 and10/5fps preserved. Existing HUD dead-side/overhead-hidden/shared mirror tests PASS. Asset guard50files1604493bytes PASS, build PASS (existing chunk advisory only), diff whitespace PASS. Only stale inventory expectation49→50 updated; no broad test rewrite.

Ruling: exact user byte-copy requirement takes precedence over generic runtime derivative optimization; full approved1254 PNG is within schema/cache budgets. Cost is905147encoded/6290064decoded bytes. User minimum-test scope overrides skill full-suite default; configured CI remains unchanged. Skill supplemental test instructions unavailable; main TDD guidance used. Existing isolated linked worktree reused; user's structured handoff is binding plan/spec, no design rediscovery.

Preflight interfaces: manifest image and catalog slot/descriptor feed existing encounter loader; existing presenter consumes loaded KO source. No loader/runtime/gameplay/locomotion architecture delta. Final review/commit/push/Actions/Pages/public runtime verification pending. Stop after release for P3 phone KO smoke; no other KO/Hit/actions/VFX/main merge.

