# P1 Awakening scoped release

2026-10-18 Asia/Taipei. User at12:17:25 confirms recorded progress/rules/workflow and continuing browser verification→deployment→phone review. Integrated source112f0d3943aa74d59798dfe67d14cab694b6a671, active feat/m0-combat-core-20260927/PR1. No main merge.

## Release gate

Integration877/877/build/asset/cache proof is in M5C_P1_AWAKENING_RUNTIME.md. This release adds only deterministic real-browser verification and its one-shot CI gate, not production behavior or art changes. `[awakening browser]` release commit runs pinned Playwright1.62.1 from runner-temp, real Chromium PNG decoding/Phaser renderer and ArenaScene, 4 facing/reduced-motion cases ×7 pose/contact/Idle screenshots; exact3 hit identities, source/contact texture changes, required16MiB accounting and teardown. Browser test fails CI before Pages publishing. Artifact: awakening-browser-verification. Manual simulation deadlines are NOT a wall-clock/FPS test.

Local host lacks Chromium and attempted download produced invalid zero-size archive; no local browser pass claimed. `node --check scripts/checkLushuAwakeningBrowser.mjs` verifies syntax only. CI results and screenshots must be fetched/inspected; public fingerprint must match release build before claiming deployment.

## Status

RELEASE AUTHORIZED / REAL BROWSER + CI + DEPLOYMENT + PUBLIC FINGERPRINT PENDING / PHONE PENDING.

Runtime source/approved art unchanged. Preserve the14 original hashes, prior GIFs/receipts and13 installed derivatives. No P2, new art, gameplay changes, main merge, broad new feature or phone acceptance. Evidence-only closure must use [skip ci].
