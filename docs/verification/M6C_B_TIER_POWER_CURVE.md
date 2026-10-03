# M6C-B Tier Power Curve — verification

Status: **M6C-B TIER POWER CURVE REBALANCE — ENGINEERING PASS / PLAYER SMOKE PENDING**.

## Scope and source
Recovery ee3a73973d3bf47006d1bb18a4e7fccc28744f31. Active feat/m0-combat-core-20260927 / PR1 retained per AGENTS13A; no main merge. Checkpoints A f825dc0089234b8db9371c5eee15ae227595c86b, B c6714f61c33ca4adb7403369404de150a581ded1, C fbfa160b1d1745f9ba9a04c1b7c4399c7bf1fb84, D fae09e0f15ba81d2c5b4e2e09f9a6016ddad935f.

Canonical T0-relative interpolation, fifteen immutable profile weights, per-actor stats/abilities, opt-in geometry/status/tempo, Lab-only resolved summary. Existing M6C mechanics retained. No global DEF scaling, Type/crit changes, progression writes, reward/accounting/cost changes, asset pipeline or AI architecture changes. Shared M6B threat geometry/timing remains authority.

## Checks
- Final targeted tierPower*/tierScaling:28/28 PASS.
- Impacted tier/formal/BattleLab/tactical/threat/combat/pause/restart/asset/lazy suites:221/221 PASS.
- Full npm test:570/570 PASS.
- npm run build / asset guard / git diff --check PASS.
- Independent review:0 Critical/2 Important/1 Minor; all three RED→GREEN fixed. Geometry Minor regraded functional Important by root. No unresolved findings.
- Review fixes: Basic opt-out authoritative AI spacing; delayed Basic cast-owned cadence/pending-job guard; growth caps preserve legal base geometry and weight0 identity.
- Other RED→GREEN fix: cooldown HUD ring uses selected actor's resolved duration.
- Acquisition/Campaign reward data, ai/tactics/threat engine and M5C-A asset modules unchanged against recovery.

## Determinism and bounded work
Two sessions per fixture have identical snapshots/evaluation counts; seed41, enemyT1, step50ms. Columns: scenario, ally Tier, result, seconds, tactical evaluations, max statuses/areas/threats.

| Scenario | Tier | Result | Seconds | Evaluations | Status | Area | Threat |
|---|---|---|---:|---:|---:|---:|---:|
| Tier comparison | T0 | defeat | 9.90 | 172 | 4 | 0 | 4 |
| Tier comparison | T1 | defeat | 14.30 | 255 | 5 | 0 | 4 |
| Tier comparison | T2 | victory | 13.20 | 252 | 7 | 0 | 4 |
| Tier comparison | T3 | victory | 6.75 | 126 | 13 | 0 | 4 |
| Status/control | T0 | defeat | 8.20 | 142 | 4 | 0 | 2 |
| Status/control | T1 | defeat | 28.65 | 345 | 6 | 0 | 2 |
| Status/control | T2 | victory | 8.55 | 151 | 8 | 0 | 2 |
| Status/control | T3 | victory | 3.80 | 68 | 10 | 0 | 2 |
| Persistent area | T0 | defeat | 13.40 | 255 | 3 | 0 | 5 |
| Persistent area | T1 | defeat | 16.90 | 306 | 4 | 0 | 6 |
| Persistent area | T2 | victory | 10.25 | 196 | 5 | 0 | 5 |
| Persistent area | T3 | victory | 5.40 | 103 | 7 | 1 | 5 |

Limits remain64 statuses/12 areas, bounded250ms tactics/five candidates; no render-frame search. No hardware FPS inference. These fixtures establish deterministic mechanics, not final balance acceptance.

## Bundle/loading
Entry87,939 bytes vs M5C-A81,218 (+6,721 pure projection/profile/menu data). CSS19,407 vs19,133 (+274). Deferred battle1,444,469 vs1,443,740 (+729). No dependency added. Asset guard37 files/17,703 bytes unchanged. Accepted deferred Phaser >500KB warning remains. Fingerprints index-BID405J0.js, index-DVqbb2lt.css, battleRuntime-B4jsg_rp.js. Normal Landing/INFO/Collection/Lab menu retain deferred battle loading.

## Rulings and remaining acceptance
Heals use target T0 HP once, scaled HP only for clamp. Geometry caps limit growth without shrinking legal base or opted-out values. Cooldown≥.75s, Basic interval≥.25s; opted-in windup≥300ms/dodge window≥350ms; control≤.5s/avoidance≤.4s/steadfast≤1s/mitigation≤.5. Exact profile weights in canonical spec. Phone readability and feel remain one focused player smoke. STOP before final art/audio/Chapter2/new progression.

## Release / public verification — 2026-10-03
Tested/deployed source `0b34bfdd41edc88b7528a64d0db63b6f2fbbcd28`. [Actions #409 / 37113178973](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/37113178973) completed SUCCESS; build111174878460 and Pages deploy111174926343 SUCCESS. Docs-only closure follows with skip-ci; deployed gameplay remains this exact source.

Public normal URL https://hansen0318.github.io/shanhaijing-arena/ shows BATTLE/COLLECTION/INFO and no Lab/canvas/modulepreload. DOM script index-BID405J0.js matches local build; graph retains deferred battleRuntime-B4jsg_rp.js. Public dev URL https://hansen0318.github.io/shanhaijing-arena/?battleLab=1 loads isolated Lab. TIER COMPARISON with allyT3/enemyT1 gives allyHP918.75/1200/881.25 and role-specific output/tempo/range/buff multipliers. T0 ally baseline restores245/320/235 with enemyT1 stats unchanged. Lab menu zero canvas/modulepreload, cloud1363×936 no horizontal overflow.

START lazy-loads real Arena; scaled HP labels round to919/1200/882, Tier labelsT3/T1 and placeholder warning/heal presentation visible. Pause, Restart and Exit→Lab verified. Scenario/tiers/seed41/Skip countdown retained; canvas absent on return. This is engineering startup/route verification, not sustained phone timing/FPS or final balance/readability acceptance. Automated paired session and persistence regressions establish clock, retry cleanup and save isolation.

Final status: **M6C-B TIER POWER CURVE REBALANCE — ENGINEERING PASS / PLAYER SMOKE PENDING**. One focused player smoke: same teams/enemy/seed/scenario, compareT0/T1/T2/T3 HP, damage/heal, move/attack speed, skill frequency, range/AoE/mobility, buff/mitigation and warning readability. No accounting/cost/reward changes. STOP before art/audio/Chapter2/new progression.
