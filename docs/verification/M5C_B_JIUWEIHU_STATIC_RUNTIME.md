# P4 九尾狐 static runtime integration — 2026-10-13

## Executable checkpoint / ledger
Recovered authoritative feature HEAD d7847c9dc95adade35975e9621c7e65c1b2af8a6, PR#1 open/unmerged; preceding Actions38324146220 SUCCESS. Player-approved derivatives verified as exact PNG/RGBA/bytes/SHA before byte-for-byte copy. Only manifest/catalog presentation data changes; shared presenter/cache/playback/gameplay/UI architecture unchanged.

| Repo path | Dimensions | Bytes | SHA256 |
| --- | --- | ---: | --- |
| public/assets/characters/jiuweihu/portrait.png | 128×128 | 38601 | b2df8fab63cd71a538622914b0c0d8eabcfc104bc245fd316beaf5e24ff573ef |
| public/assets/characters/jiuweihu/identity.png | 160×192 | 54502 | f8fe054e7a0de50d66e62081ec0fd53e493674cd707d5f2e28be098ab277dd0d |
| public/assets/characters/jiuweihu/battleIdle.png | 160×160 | 32063 | 394497ffa5314a4559fee10d58d799fab9be59b282a31bb3ffebb02670ed6640 |

Identity alpha bbox(6,4)-(153,188); Idle(21,16)-(139,151). Idle descriptor: one160-square frame, duration1/fps1, loopfalse/staticFrame0, origin[.5,151/160], scale2. Display144-square; visible width106.2/height121.5px; bottom alpha extent on gameplay anchor. No enlarging beyond current scale2 family, no coordinates changed. No authored Move/KO/Hit/Cast/VFX/breathing. Team/Collection use identity; compact/HUD portrait use portrait; Arena uses static Idle. Shared ally-original/enemy-mirror paths untouched.

Test-first new6 contracts:5 RED on absent formal slots/descriptor/runtime preload, existing purity contract PASS; all6 GREEN after data-only integration. Actual shared presenter in normal/reduced motion follows X/Y displacement without changing the static frame; enemy/default and negative-X facing + HUD side mirror preserved; snapshots unchanged. Actual createAssetCache and presenter.prepare plus explicit identity loading (menu assets are intentionally not battle-preloaded) retain all accepted P1-P4 slots in both load orders. Transport/renderer doubles only, actual repo file bytes supplied. Shared cache peak10955408 and independently tracked scene decoded-equivalent peak10955408bytes; all below unchanged16777216bytes. No silent drop/fallback for P1/P2/P3 KO or P4 static pack. This is decoded-equivalent residency, not total physical GPU memory. P4stats maxHp230/atk19/def4/moveSpeed1.7/attackSpeed1.05 unchanged.

Targeted70/70 PASS: jiuweihuStatic,assetManifest,formalCatalog,assetPresenter,assetIntegration,assetMenu,teamView,collectionView,battleHud,lushuBotuoKo. Guard55files2037797bytes PASS; build PASS, existing >500k chunk advisory only. Build fingerprints index-C8zPKbfi.js/battleRuntime-Dq3X78vd.js/index-DcqtNRF0.css. Review/push/Pages/public runtime verification pending.

Ruling: explicit user-provided structured handoff is the implementation plan; no design rediscovery. Existing linked isolated worktree reused. User minimal impacted checks override skill full-suite default; configuredCI unchanged. Canonical key spelling is jiuweihu (matches attached filenames and requested paths); jiuwihu in some prompt acceptance rows is a typo, not an alternate asset key. No main merge, no next gate. Remaining player-owned phone acceptance: Team size/Collection/HUD fox face/Arena scale/grouped tails/enemy mirror.

## Direct CI dependency correction
Actions#905/38325269390:655/656 pass, only lushuIdle old generic P4/P5 placeholder expectation fails because P4 is now formal. Reproduced RED locally, minimal explicit P4 authored/P5 placeholder assertion update; no production correction. Scope expands only by this directly failed file. Fresh independent production review no findings; new6 tests and whitespace independently PASS.

## Release closure — 2026-10-13
ENGINEERING PASS / PLAYER PHONE SMOKE PENDING. Tested/deployed source f57c0f3352e703012376a03ce7d138551a213fb3, tree31d8d58da208a14e89a53eea8ae7821f6676ad44; final HEAD is containing docs-only closure with identical production/test payload. Source integration checkpoint b5ca332a2b53f8e1886c3aef56c156512b630ff6, followed only by directly stale lushuIdle expectation fix. No outstanding CI failure. Final local directly affected78/78 PASS, guard55files2037797bytes/build/diff PASS. Fresh independent review: no Critical/Important/Minor findings; new6 tests and diff independently PASS. Actions#906/38325421933 CI656/656, Build115062839262 and Pages115062958307 SUCCESS.

Public technical checks:
- Collection grid/detail: real P4 portrait128-square and identity160×192 complete/natural dimensions correct, requested approved URLs. Full silhouette contained; no outer overflow. Locked UI intentionally retains existing opacity semantics.
- Team Select: existing campaignDev=unlock-all UI used only for bounded developer selection (no manual storage injection). Selected P4/P2/P3; P4 upper identity natural160×192 and compactportrait128×128 load correctly. Full-body/tails remain within existing figure fit, similar body-height family to P2/P3. Compact card56-square. No outer overflow or layout/source changes.
- Public DevLab: normal encounter P4/P2/P3 vs P4/P1/P3; correct living static P4 sprite and original ally/mirrored enemy HUD portraits observed, overhead HP blue/red,144-square descriptor size unchanged. P4 fox head/muzzle, torso/legs and grouped tail mass discernible at actual game-render size; distinct from P1 single-tail and P3 aquatic silhouette. P4 never taller than accepted family; modest extra width from tails. Manual movement keeps same approved static pose and actor follows authoritative displacement. Exact XY/normal/reduced/static frame/mirror/snapshot purity proven by controlled presenter tests.
- Arena canvas1120×540; document1363×936 equals viewport, no outer overflow. Browser check is actual game-render scale in cloud desktop viewport, not iPhone emulation or player visual acceptance. Phone narrow-scale final tail/face readability remains player-owned.
- Lab URL opened before deployment had cached index-DDjR9mFF.js, and START failed after old runtime chunk was removed. One source-tagged verification navigation loaded current index-C8zPKbfi.js and battle successfully; no source change for this transient stale-entry cache. Fresh public downloads below all match current dist.

| Public path | Bytes | SHA256 |
| --- | ---: | --- |
| index.html | 1491 | 9424b6104493685a0d3752dd708c1eae32abf60e8671a256e588f7feda6df489 |
| assets/index-C8zPKbfi.js | 96337 | 652d2d5d779f50805c946d5d8547182b3861c86853cfa6669b6407d3216f3c20 |
| assets/index-DcqtNRF0.css | 22943 | a20af2bfa9f5a700823772a0d7e0391b1760c35336de8cc621b36e54bad501da |
| assets/battleRuntime-Dq3X78vd.js | 1445032 | c906df62f298e309c9bcc2880cce8347537e54259b0510db9d23c68293cd2438 |
| assets/characters/jiuweihu/portrait.png | 38601 | b2df8fab63cd71a538622914b0c0d8eabcfc104bc245fd316beaf5e24ff573ef |
| assets/characters/jiuweihu/identity.png | 54502 | f8fe054e7a0de50d66e62081ec0fd53e493674cd707d5f2e28be098ab277dd0d |
| assets/characters/jiuweihu/battleIdle.png | 32063 | 394497ffa5314a4559fee10d58d799fab9be59b282a31bb3ffebb02670ed6640 |

All approved PNGs byte-identical, no resize/export/crop/redraw. Cache+scene regression includes both P1-P4 load orders and identity assets via explicit loadKeys; peak10955408decoded bytes each, every accepted idle/move/KO/portrait/identity retained, no silent drop/fallback; shared/scene16MiB unchanged. P4 exact230/19/4/1.7/1.05stats and real BattleSession snapshot unchanged. P1/P2/P3 assets/descriptors/locomotion/KO and projection, gameplay, shared presenter/playback, HUD/layout files untouched; impacted integration/HP/budget/purity PASS, prior accepted locomotion evidence reused. No technical blocker.

Player phone only: refresh current build; compare Team identity proportions, Collection full-body containment, HUD fox face, Arena body height/width and grouped tails, enemy mirror. No unrelated replay. STOP; no P4 locomotion/KO/Hit/action/VFX/P5 or main merge.
