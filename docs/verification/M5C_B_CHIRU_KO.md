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

## Release / public verification closure
Status **ENGINEERING PASS / PLAYER PHONE SMOKE PENDING**. Tested/deployed source e6ed3112cdc208e91e0940ff950206e7a89faf5a, treed3def4739d032af15154468eb3fb1703f599a1f6; local checkpoint e6a34ff has identical tree. Final HEAD is containing docs-only closure (resolve active feature ref); runtime bytes unchanged by closure. PR#1 open/unmerged, expected-head fast-forward pushes only, no main merge.

Fresh-context review: no findings; independently chiruKo+assetGuard10/10 and whitespace PASS. Reviewer declined public/browser/device acceptance; executor owns evidence below, player owns final phone visual acceptance. No source fix after review. Task complete: scoped69/69, guard50files1604493bytes/build/diff PASS; Actions#865 /38214426033 SUCCESS. Build114695724960 (configured CI635/635 PASS) and Pages114695822927 SUCCESS. Existing chunk-size advisory only.

Fresh public HTML, JS, battleRuntime, CSS and exact KO PNG match local tested dist byte-for-byte:

| Public file | Bytes | SHA256 |
| --- | ---: | --- |
| index.html | 1491 | 4a29eb9dd8d1e04ca73a37929d79b51f5ed0b1b938d5522b1aa436bea30d77e3 |
| assets/index-B_WnvAUP.js | 94949 | 72a15511d4f94ef15614c8671bbb46fb398f06eee86566e095a3acae107ab806 |
| assets/index-DcqtNRF0.css | 22943 | a20af2bfa9f5a700823772a0d7e0391b1760c35336de8cc621b36e54bad501da |
| assets/battleRuntime-DgHIH6ar.js | 1445032 | b036bdad42b5967ac539fd8e8c3b6c7eef5aae71b339e537a6584acdd8a074f1 |
| assets/characters/chiru/battleKo.png | 905147 | f97e369fe2c6ae2d0fff1c51c96e487279b4bbe1e614925a7d1c2c4dc2a2796d |

Live public Battle Lab healer-retreat, default P1/P2/P3, enemyTierT1 then boundedT3 override (DEV ONLY / NO SAVE WRITES) shows living P3 static hover and distinct Move poses. Normal combat damage reaches P3 HP0; its HUD portrait dims, overhead HP disappears and battlefield sprite becomes low ground-rest KO rather than living hover. Subsequent snapshot retains the same pose; DEFEAT overlay partly occludes this final view, so this is not a claim of unobstructed full-body phone acceptance. Second bounded near-formation P2/P3/P2 scenario confirms no missing KO texture/loader error; existing combat HUD/HP/telegraph/heal/damage layers remain visible. DOM entry index-B_WnvAUP.js, canvas1120×540; document scroll/client both1363×936 (no outer overflow). Console sample shows only browser-extension metadata errors, no sampled app-origin error.

Exact HP<=0 selection, permanence through100s, right/left saved-facing mirror, deadalpha.35, fixed authoritative position, ground origin and static normal/reduced playback are verified via actual presenter/session tests, not guessed from screenshots. Native decode confirms contact within.115px for alpha>16 and within.01px for alpha>64; visible width141.014px versus Idle133.2px. No float/clipping introduced by data anchor; faint original low-alpha pixels remain untouched as explicitly approved. The single PNG is not used as a death-process flipbook. P3 Move2.7/Idle2/cadence10/5/gameplay1.6 preserved; P1/P2 locomotion regressions PASS.

Rulings carried from checkpoint: byte-preserving approved source takes priority over runtime-derivative preference (cost905147encoded/6290064decoded bytes, within budgets); targeted checks take priority over generic full-suite skill default, with configured CI635/635 supplying release suite evidence. No deferred review findings and no technical blocker. All engineering scope complete. Only player phone check: P3 KO visibly rests on ground at readable size, stays static, matches last left/right facing, and side/overhead HP reflect death. Stop now; no other KO/Hit/actions/VFX/next gate/main merge.

