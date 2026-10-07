# Arena Vertical Extents — Engineering Verification 2026-10-07

**ENGINEERING PASS / PLAYER SMOKE PENDING**

## Recovery / scope
Active feature branch feat/m0-combat-core-20260927, PR #1. Tested/deployed source SHA `1d8340be1a18c3413307da54188770121ef87575`, tree `a8cac8d1a02737e015f409fc2cc346a3a586e574`. Recovered latest rules/state, Chat-completed asymmetric projection and projected-center correction. Work changed no production source/test expectations/assets. No main merge.

Canonical stage1120×540: topPadding160, bottomPadding32; yMin→160, yMax→508, y0→334; xMin→32, xMax→1088, x5→560. Older symmetric160/bottom380/center270 entries are historical and superseded.

## Targeted checks
43/43 PASS: arenaProjection, battleLabRuntime, battleRestart, tacticalPresentation, damageNumbers, lushuIdle, assetPresenter, battleHud.
Build PASS; asset guard46 files /362673 bytes PASS; diff check PASS. Existing chunk-size advisory only. No unrelated local full-suite run.

## Technical top / bottom evidence
Controlled actual ArenaScene.applyFrame executed for all current formal actors at yMin/yMax with canonical descriptor-derived display bounds, including actual HP fill/stroke calls. Combat snapshot unchanged.

| Character | Top anchor | Sprite top | Overhead HP top including background | Bottom anchor | Sprite bottom |
| --- | --- | --- | --- | --- | --- |
| P1 鹿蜀 | 160 | 22.563536 | 10.563536 | 508 | 514.563536 |
| P2 猼訑 | 160 | 17.8 | 5.8 | 508 | 509.8 |
| P3 赤鱬 | 160 | 16 | 4 | 508 | 508 |

All formal sprite/HP tops are >=0 and sprite bottoms <=540. Current scale2/origins remain unchanged. Bottom reaches508, not obsolete380. Current formal assets only; future taller assets must respect the shared presentation contract and be verified at their own gate.

## Alignment / protected systems
Center mapping returns560,334. Existing source center line endpoints and ellipse use the same arenaToStage({x:5,y:0}) result. Telegraph circle/lane tests pass; controlled real DamageNumbers damage/heal calls at y=-2/0/+2 preserve their normal -33 text offset from the same projected anchor. Telegraph radiusY87 agrees with348px/4 gameplay units. Actor/snapshot geometry remains untouched.
Diff from accepted P3 release contains only Chat's arenaProjection/ArenaScene background center, corresponding projection test and docs. DEFAULT_ARENA_BOUNDS, combat/AI/movement/collision/targeting/range/AoE/timing/Tier/shards/reward source, assets/catalog/actor scale/origin and HUD/joystick/skill-button code unchanged. ActorPresenter/Battle HUD tests cover shared art/HP/mirror contracts.

## Deployment / public fingerprint
Actions #801 /37555490830 at tested source: CI609/609, Build112580699675, Pages112580790743 SUCCESS.
https://github.com/Hansen0318/shanhaijing-arena/actions/runs/37555490830
https://hansen0318.github.io/shanhaijing-arena/

Public index references the local entry/CSS names. Public downloads compare byte-identical to locally built files:
- index-BmPcgSLb.js SHA256 `930ec2a0e701c28b55682f3ed0c17088f5db619cbd224edfdccf0ddadf372c51`
- index-DcqtNRF0.css SHA256 `a20af2bfa9f5a700823772a0d7e0391b1760c35336de8cc621b36e54bad501da`
- battleRuntime-BWB18qv_.js SHA256 `1af0e1f000d23c26c914adf7ff44eb103cca5f5dc6232384a9cf2be3f430eab4`

Public technical mapping is established by identical deployed runtime bytes plus executable projection/applyFrame evidence. Phone edge appearance remains player-owned; no subjective browser acceptance claimed. Final HEAD is this docs-only closure commit (resolve active feature ref); tested source SHA above identifies the deployed runtime.

## Stop / player smoke
No technical blocker. Player only checks (1) move formal character to top: head and overhead HP stay visible; (2) move to bottom: reaches near screen bottom without clipping. No locomotion/action/Hit/KO/VFX/next character/main merge authorized.
