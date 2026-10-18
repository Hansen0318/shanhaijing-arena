# P1 Awakening scoped release

## 2026-10-18 — Awakening PASS / PLAYER VERIFIED — runtime acceptance closed

Player on 2026-10-18: 「我測試確認ok，核准，紀錄github相關規則進度流程」, responding to the deployed Awakening phone-review handoff. **P1 鹿蜀 Awakening「南山奔襲」: ENGINEERING PASS / DEPLOYED / PASS — PLAYER VERIFIED.** This closes the scoped player/phone acceptance gate for runtime `8e2f5e049095017d7350b1d0d61e96527ab21e44`, live https://hansen0318.github.io/shanhaijing-arena/?v=8e2f5e0 . Baseline docs checkpoint: `8e528a49c9d5defb8958891a4b05a991689b1c45`. Immutable runtime receipt: `docs/art/approved/lushu/awakening/runtime-v1/acceptance.json`.

Recorded engineering/release evidence remains Actions #1067 / run39097029256, 879/879 tests, build/asset guard, real Chromium four cases/28 screenshots and 17 public-file SHA256 matches. Those are prior release results, not rerun for this documentation update. The player's statement confirms overall scoped acceptance; it does not supply individual checklist observations, device/browser model, FPS or measured GPU memory. Preserve this distinction in future recovery.

Permanent acceptance flow: bind the exact player statement to the presented deployed SHA/URL and scope; keep visual approval, executable-contract approval, engineering evidence, deployment evidence and player acceptance separate. Read the newest authoritative entry/receipt before older history; do not reopen or repeat completed Awakening gates without a new defect or changed scope. Preserve all approved sources/GIFs/older receipts and historical pending entries, which this entry supersedes only for Awakening.

**NEXT unfinished milestone: P1 Hit reaction, then character-wide regression/player acceptance**, following the character-first roadmap. Whole-P1 completion and P2 remain unclosed. This request records acceptance/rules/progress/workflow only; it does not implement that next milestone. Keep feature branch `feat/m0-combat-core-20260927` / PR1, no main merge. Evidence-only checkpoints use `[skip ci]`; docs HEAD may be newer than the deployed runtime SHA. Successor prompts remain one complete copyable block.

## 2026-10-18 — Awakening DEPLOYED / real browser PASS / PLAYER PHONE PENDING

Player「好，確認紀錄進度規則和流程，沒問題就然後繼續」at12:17:25+08:00 authorized the scoped verification/release. **P1 Awakening「南山奔襲」integrated and DEPLOYED** from8e2f5e049095017d7350b1d0d61e96527ab21e44. Actions#1067/39097029256 build117585501848 and deploy117585692920 SUCCESS;879/879 tests, build and asset guard PASS. Actual Chromium/Phaser WebGL verification4 cases(normal/reduced motion ×left/right),28 screenshots, real3 hit identities/times and complete direct-destroy cleanup PASS. Screenshots inspected; this is fixed-simulation-time browser rendering, not phone/FPS/GPU-memory acceptance.

Public17 files(index+3 JS/CSS+13 runtime PNGs) exact-byte SHA256 match release build. JS:index-D7Qjj1EB.js,battleRuntime-Bt34mgQY.js;CSS:index-DcqtNRF0.css. Live: https://hansen0318.github.io/shanhaijing-arena/?v=8e2f5e0 . Fingerprints:`docs/verification/M5C_P1_AWAKENING_PUBLIC_FINGERPRINT.json`; release evidence:`docs/verification/M5C_P1_AWAKENING_RELEASE.md`; real browser JSON+6 representative screenshots:`docs/verification/P1_AWAKENING_BROWSER/`; full28-shot artifact12124838038. Required decoded scene/cache16,552,840/16,777,216 bytes;131,072 optional reserve retained. Approved sources/GIFs/receipts untouched, no cap raise or art regeneration.

First browser release attempt1066 correctly blocked deployment on direct Game.destroy cleanup; generic Arena ownCleanup now handles shutdown/destroy exactly once. Permanent lifecycle rule: scene-owned session/presenter/FX/numbers/load gate cleanup must cover both events, remove paired listener on first event and pass real destruction/Restart checks. Never weaken a failing release gate or infer phone approval from CI.

**NEXT ONLY: player phone review** of first-rush speed,3distinct source/contact VFX, independent realHP steps/escape/empty cast, actor size/left-right/Idle return and Pause/Restart. No claim of phone acceptance, no P1 fully verified/Hit reaction/new art/P2 or main merge. Do not repeat preflight/approved art/runtime integration/deployment. Evidence-only closure uses[skip ci], so latest docs HEAD may be newer than deployed runtime SHA. Every successor prompt remains one complete copyable block; fetch current remote on recovery. Older not-deployed/pending entries below are history.


2026-10-18 Asia/Taipei. User at12:17:25 confirms recorded progress/rules/workflow and continuing browser verification→deployment→phone review. Integrated source112f0d3943aa74d59798dfe67d14cab694b6a671, active feat/m0-combat-core-20260927/PR1. No main merge.

## Release gate

Integration877/877/build/asset/cache proof is in M5C_P1_AWAKENING_RUNTIME.md. This release adds only deterministic real-browser verification and its one-shot CI gate, not production behavior or art changes. `[awakening browser]` release commit runs pinned Playwright1.62.1 from runner-temp, real Chromium PNG decoding/Phaser renderer and ArenaScene, 4 facing/reduced-motion cases ×7 pose/contact/Idle screenshots; exact3 hit identities, source/contact texture changes, required16MiB accounting and teardown. Browser test fails CI before Pages publishing. Artifact: awakening-browser-verification. Manual simulation deadlines are NOT a wall-clock/FPS test.

Local host lacks Chromium and attempted download produced invalid zero-size archive; no local browser pass claimed. `node --check scripts/checkLushuAwakeningBrowser.mjs` verifies syntax only. CI results and screenshots must be fetched/inspected; public fingerprint must match release build before claiming deployment.

## Status

RELEASE AUTHORIZED / REAL BROWSER + CI + DEPLOYMENT + PUBLIC FINGERPRINT PENDING / PHONE PENDING.

Runtime source/approved art unchanged. Preserve the14 original hashes, prior GIFs/receipts and13 installed derivatives. No P2, new art, gameplay changes, main merge, broad new feature or phone acceptance. Evidence-only closure must use [skip ci].

## Attempt1066 — browser caught direct-destroy cleanup gap

Release candidate aae4d75, Actions39096827103/build117584919092: install/test877/build PASS; real Chromium loaded all required PNGs and passed the right-facing anticipation/A/B/C/recovery/Idle pose/effect/hit checks, but direct Game.destroy left presenter.closed=false and16,552,840 accounted bytes. CI failed and Pages deployment was skipped. Artifact12125335456 retains7 actual screenshots and failure record; normal-right-hitC inspected, confirming authored body/source/contact art is present. This is not a release or phone PASS.

Root cause verified in installed Phaser4.2.1: Game.runDestroy→SceneManager.destroy→Systems.destroy emits `destroy`, without `shutdown`. Arena cleanup only subscribed to shutdown. Shared ownCleanup now listens to both and removes both listeners on first event, clearing session/presenter/telegraphs/numbers/readiness gate exactly once. Actual Arena-create regression reproduced failure on destroy then passes for both event orders. Full879/879 and build PASS locally; no gameplay/art changes. Next tagged release reruns real browser check before deployment. Current local fingerprint:index-D7Qjj1EB.js,battleRuntime-Bt34mgQY.js,index-DcqtNRF0.css.

## Successful release1067

Source8e2f5e049095017d7350b1d0d61e96527ab21e44; Actions https://github.com/Hansen0318/shanhaijing-arena/actions/runs/39097029256 . Build117585501848 and deploy117585692920 success;879/879 tests;78asset files/3,897,370encoded bytes; Chromium4cases/28screenshots and direct Game.destroy0bytes/0actions/0impacts passed. Browser evidence artifact12124838038 (6,835,366bytes), Pages artifact12124668638. FullCI browser JSON and6representative unedited screenshots retained in P1_AWAKENING_BROWSER. Observed normal-left terminal and reduced-right return effects; earlier rightA/B/C/Idle checked. All cases actual hit times101.75/154.230769/350ms and targetBotuo320→309.46HP, no duplicated hits. These stationary fixtures establish real-renderer synchronization; autonomous escape, touch pacing, mobile frame cadence and source/VFX raster quality still require phone review.

Public fingerprint17/17 exact SHA256 matches, including HTML,3JS/CSS and13new/packed PNGs. Live ?v=8e2f5e0. Default release scope complete; stop at player phone acceptance, no P2/main merge.
