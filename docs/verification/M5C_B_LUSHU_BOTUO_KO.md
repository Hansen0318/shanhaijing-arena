# P1 Lushu / P2 Botuo static KO — 2026-10-12

## Executable checkpoint / ledger
Recovered feature HEAD62486a9b44ad1b8234cdd97d6396e37052b06be7, PR#1 open/unmerged, preceding Actions38224851107 SUCCESS. Latest handoff rejects16→32MiB budget increase and supplies Chat-owned resize-only512-square runtime derivatives. Previous1254-master integration was never written/deployed. P3KO engineering release and pending phone acceptance reused; no P3 reintegration.

Runtime source copies (byte-for-byte, no export/resize/crop/content change by Work):
- P1 public/assets/characters/lushu/battleKo.png:512×512RGBA/150698bytes/SHA25603c4e5a75546e8dc67044f42a9ce958bba829e423561e60a2665d7494bf77aff.
- P2 public/assets/characters/botuo/battleKo.png:512×512RGBA/157440bytes/SHA256037829ec32333a0179414a9ee8ccb57b4eb3ddb83004aa93aea5c78914fc9c57.
Approved1254 masters remain visual source of truth (metadata in visual specs); neither enters runtime manifest. P3 original1254KO PNG/SHA/manifest/descriptor remain byte-unchanged.

Only production delta: P1/P2 manifest records and catalog assets.battleKo/static descriptors. One full512 frame,duration1,loopfalse,staticFrame0,fps1,scale2. P1origin[.5,385/512],P2origin[.5,405/512]. Native decoded alpha>64 boundsP1(10,176,508,385),P2(5,187,511,405): visible ground bottom aligns to authoritative actor anchor without changing coords.144-square display yields P1width140.0625/height58.78125,P2width142.3125/height61.3125px (resting silhouettes, comparable to accepted live actor height144). Canonical right-facing, saved left via shared mirror, deadalpha.35 retained; no breath/loop/sliding/returnIdle/Move/deathflipbook.

## Test-first / executable evidence
New15 tests RED (missing authored KO/manifest/files/preload), then15/15 GREEN. Actual presenter in both motion modes and both facing directions transitions living Idle→Move→HP0KO, remains same KO frame/ground anchor/size/alpha through100s. Real P1/P2 BattleSession snapshots equal around render, dead position frozen, speed2.05/1.45 unchanged. SHA/PNG header/native inflation+unfilter alpha-ground tests confirm exact derivatives; no art transformation.

Budget regression uses actual createAssetCache defaults + shared AssetPresenter.prepare with P1/P2/P3 encounter definitions, reversed/mixed orders and repeated definitions. External renderer/image decoder boundary doubles only; actual file bytes supplied to cache transport. All three KO keys retained in both shared cache and scene with no fallback/silent drop. Peak decoded shared cache bytes10308240 and peak scene decoded-equivalent bytes10308240 (9.83MiB), below unchanged16777216-byte16MiB budget for every order. Scene tracked independently from presenter.textureBytes and agrees; shutdown returns scene residency0. No schema/cache/presenter/loader changes.

Minimum impacted command: node --test tests/lushuBotuoKo.test.js tests/chiruKo.test.js tests/lushuMove.test.js tests/botuoMove.test.js tests/chiruMove.test.js tests/assetManifest.test.js tests/formalCatalog.test.js tests/assetPresenter.test.js tests/assetCache.test.js tests/battleHud.test.js tests/assetGuard.test.js →80/80 PASS. Only stale Lushu dead Idle expectation→newKO and guard inventory50→52 updated. Guard52files1912631bytes/build/whitespace PASS. Existing build chunk advisory only. P1/P2/P3 locomotion, P3KO, HUD/deadHP/mirror assertions PASS; gameplay/projection/AI/telegraph/damage/heal/control source unchanged.

Ruling: latest explicit derivative decision supersedes earlier1254 byte-copy runtime plan; both derivatives copied unchanged, no32MiB expansion. User minimum-check scope supersedes generic skill full-suite default; configured CI unchanged. Preflight manifest/descriptor→existingloader/presenter compatible; new decoded assets fit current budgets. Existing isolated linked worktree reused; exact structured handoff is the implementation plan, no design rediscovery. Review/push/Pages/public DevLab verification pending. Stop after this gate; no next animation/VFX/main merge.

## Direct CI dependency correction
Actions#876/38237121648 failed only two directly coupled stale expectations: lushuIdle still expected KO placeholder; lushuTeamBattleCorrection custom slot fixture inherited the newly authored P1 KO descriptor. Minimal corrections remove KO from the unauthored-state list/add authored source assertion, and explicitly clear inherited KO descriptor only in the existing slot-only test fixture. No production correction or architecture change. Scope expands only by those two failed files: previous impacted command plus tests/lushuIdle.test.js and tests/lushuTeamBattleCorrection.test.js →92/92 PASS. Build/guard/diff PASS again; runtime bundle filenames unchanged. Rerun CI/Pages pending. Fresh review of original production delta had no findings; independent new15 tests/whitespace PASS.

## Release closure — 2026-10-12
ENGINEERING PASS / PLAYER PHONE SMOKE PENDING. Tested/deployed source `bb6d64f2cdec7a3d8a5fdfebf615cf8666189d83`, tree `081b2ebd876a4f0b1eac5cfc7ca5c4489086b581`; final feature HEAD is the containing docs-only closure, with identical production/test payload. Initial integration source973b287d37a39715b7a83e3cf2e2c194fd1dd9f4 was followed only by the two direct stale test fixes described above. No outstanding CI failure.

Final local scope92/92 PASS; asset guard52files1912631bytes PASS; build and whitespace PASS; existing chunk advisory only. Fresh independent review: no findings, new15 tests independently PASS. Configured CI650/650 PASS. Actions#877/38237391974 Build114771324539 and Pages114771474109 SUCCESS. No main merge.

Fresh public downloads byte-match tested dist for index, JS, battleRuntime, CSS and all three KO PNGs. Public DevLab healer-retreat/T3 enemy battle showed P1 HUD0/245 and P2 HUD0/320 with their correct low resting KO poses, no overhead HP on dead actors; live P3 and enemy locomotion/HUD/HP remained visible. Subsequent defeat showed P3 existing KO/dead portrait, P1/P2 still resting; final overlay partially occludes scene. Ground/size/both last-facing directions and100-second static persistence are mechanically checked by actual presenter/session regression; public screenshots support asset rendering and do not replace those exact assertions or player art acceptance. Canvas1120×540 unchanged, document1363×936 equals viewport (no outer overflow). Browser DOM loaded index-DDjR9mFF.js; recorded errors were browser-extension metadata errors, none from app origin. Forced reduced-motion tested in actual presenter, not OS-browser preference emulation.

| Public path | Bytes | SHA256 |
| --- | ---: | --- |
| index.html | 1491 | ec9f6165371e9fe89688241b8c8eb6a9b240c03cd7d74b62d442831c008c5850 |
| assets/index-DDjR9mFF.js | 95567 | 1b3cda6dee02c1817235b2359c026e3dcccb1e1da8cf0bdc102cd0b32a1c5282 |
| assets/battleRuntime-C-tUPhHF.js | 1445032 | ab257743b99e21042b73fd1ccc1577b7b020ce88e5c79c10581386409715b8b4 |
| assets/index-DcqtNRF0.css | 22943 | a20af2bfa9f5a700823772a0d7e0391b1760c35336de8cc621b36e54bad501da |
| assets/characters/lushu/battleKo.png | 150698 | 03c4e5a75546e8dc67044f42a9ce958bba829e423561e60a2665d7494bf77aff |
| assets/characters/botuo/battleKo.png | 157440 | 037829ec32333a0179414a9ee8ccb57b4eb3ddb83004aa93aea5c78914fc9c57 |
| assets/characters/chiru/battleKo.png | 905147 | f97e369fe2c6ae2d0fff1c51c96e487279b4bbe1e614925a7d1c2c4dc2a2796d |

Budget closure: shared cache peak10308240 decoded bytes; scene peak10308240 decoded-equivalent bytes, independently measured and agrees with presenter.textureBytes. All P1/P2/P3 KO actually prepared and retained in every encounter order tested, no fallback/silent budget drop. Both limits remain16777216 bytes; src/assets/schema.js and presenter budget code unchanged. This is decoded-equivalent residency, not a claim about total physical GPU memory.

No technical blocker. Player phone needs only P1/P2 HP0 resting size/ground contact, last-facing mirror and continued static KO/no return to Idle or Move. Existing P3 acceptance remains player-owned. STOP; no next animation/VFX gate.

## Player acceptance — 2026-10-12

Status: **PASS / PLAYER VERIFIED**.

Player completed device smoke and accepted the deployed 鹿蜀 / 猼訑 static KO presentation, including size/ground contact, final-facing mirror behavior and static persistence. Together with the already accepted 赤鱬 KO, the three-character static KO gate is closed. Preserve the existing 16MiB texture/cache budgets and the runtime-sized P1/P2 derivatives; no further KO work is authorized unless a regression is demonstrated.
