# M5C-A Asset Pipeline verification

ENGINEERING PASS / PLAYER SMOKE PENDING

Recovery remote015618fa; M6C PLAYER VERIFIED. Original feat/m0-combat-core-20260927 / PR1 retained per AGENTS13A; main untouched. A700f72b6, B0de99b3f, Cdcb1d6cf, Df646c545 safe checkpoints pushed after tests. Native coherent A–E batch; one independent read-only reviewer.

## Engineering evidence
Manifest duplicate/path/dimension/size/fallback cycle/reference validation, immutable nine slots and future-character generic resolution. Current37 image files total17,703 bytes; all are existing tiny previews plus one new graybox strip. No final artwork/dependencies.
Generic menu fallback terminates even if secondary image fails. Lazy image cache shares concurrent decode/retry, follows image fallback chain, checks decoded metadata, limits64 entries/16MiB RGBA and2 parallel loads. Scene has its own64/16MiB texture cap; late completion is ignored after shutdown, displays/texture keys/clock records cleared. Optional art never blocks START.
Animation regions/timing/static frame and all eight VFX forms use immutable descriptors, bounded clock playback. Actor hit/KO/cast, HUD/stage and optional overlay presentation use formal data. Dev Visual inspection is config-only/no save capability. Target presentation ID added to existing cast event; ability factory retains optional presentation metadata. No mechanics/stats/AI/progression/reward/schema change; telegraph/status/area gameplay authority and renderer remain unchanged.

## Independent review / fixes
No Critical,5 Important, no deferred Minor: late image replacing Graphics, actual image fallback decode, encounter ability-only dependencies, target follow/KO identity, build reference collection. All reproduced RED→GREEN. Added optional ability metadata retention and decoded-memory budget/concurrency checks. Existing strict cast-event test updated only for added presentation targetId; manual air-cast remains no damage.
Targeted56/56, impacted375/375, full542/542, build/diff PASS after final fixes. Unit asset-specific30/30. Full relevant architecture regression includes M6B tactics/threats, M6C effects/areas/control, Campaign, acquisition/Tier/rewards, Team/Collection/INFO/route/lazy runtime and Lab isolation.

```sh
node --test tests/asset*.test.js tests/battleLab*.test.js tests/battleRestart.test.js tests/lazyBattleRuntime.test.js
node --test tests/asset*.test.js tests/battle*.test.js tests/tactical*.test.js tests/tier*.test.js tests/ability*.test.js tests/formal*.test.js tests/campaign*.test.js tests/collection*.test.js tests/team*.test.js tests/acquisition*.test.js tests/*Rewards.test.js tests/rewardPresentation.test.js tests/lazyBattleRuntime.test.js
npm test
npm run build
git diff --check
```

## Bundle / release
Accepted M6C entry76,859 bytes; new entry81,218 bytes (+4,359 pure manifest/resolver/menu metadata), CSS19,133 unchanged. Phaser/battle presenter/image cache/descriptors remain in deferred battle chunk (1,443,740 bytes); no menu preload/animation/VFX request. Existing deferred >500KB advisory remains. Exact release/public evidence follows. CPU/headless engineering evidence does not imply phone rendering/FPS acceptance.

## One focused player smoke
Normal Landing/Collection/preview retain placeholders and navigation. Lab Visual inspection battleIdle, skip countdown→START; inspect placeholder strip and shared cast VFX, Pause/Restart/Retry/Exit→Lab. Confirm no stale image/overlay and normal save unchanged. Missing formal art is expected. STOP before formal art/VFX production/audio/Chapter2/new economy.

## Published verification
Release source d3ed2bf0bad01e0a4d055fb4b89f49362c868ef8; Actions #399 / 37107284909 SUCCESS (build111158185887, Pages deploy111158232597). Public entry index-iHgeqczB.js matches tested build; CSS index-CuxsJ6uc.css, deferred battleRuntime-KzZEk5yG.js. Public normal Landing has BATTLE/COLLECTION/INFO, no Lab/canvas/modulepreload. Collection and Chapter/Stage preview navigation verified; six preview images complete640×300, zero canvas. Dev Visual inspection battleIdle shows two-frame graybox in real Arena; Pause/Restart/Exit→Lab verified, inspection/countdown settings retained, canvas removed. Cloud1363×936 has no horizontal overflow. Physical phone visual acceptance remains player smoke.

[Actions run](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/37107284909)

Public Lab: https://hansen0318.github.io/shanhaijing-arena/?battleLab=1
Normal URL: https://hansen0318.github.io/shanhaijing-arena/
Observed console error entries were browser-extension metadata messages, not app errors. Retry decode reuse/cleanup is covered by automated runtime tests; live Restart/Exit were observed. No normal battle/reward/upgrade/reset was performed during public verification. Player physical-device smoke remains pending.
