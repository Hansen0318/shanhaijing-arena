# M1 Campaign Skeleton release evidence

M1 CAMPAIGN SKELETON ENGINEERING PASS  
iPhone CAMPAIGN PLAYER SMOKE PENDING

Active branch: feat/m0-combat-core-20260927; existing PR #1 retained. No new combat core, formal art or next milestone.

## Remote checkpoints
1. 5b7ea9a — campaign/stage data + 36 distinct SVG placeholders (3/3 targeted).
2. b558d3a — pure progression + persistence (10/10 cumulative targeted).
3. daf9083 — Chapter grid + guarded controller (13/13 targeted).
4. b5c4ce9 — Stage Select / large preview / START / BACK / lower five cards (syntax + controller evidence; runtime integrated later).
5. 5a7e482 — stage-config battle routing (16/16 targeted + build).
6. c850641 — result/navigation/unlock (24/24 targeted + build).
7. Current documentation commit — final release evidence/checkpoint, no executable change.

Local equivalent commits were 9e2d3cf, 6341485, 3a96af4, be0430f, d91bfd8, b673915. Shell Git lacked write credentials; authenticated GitHub git-object API pushed the same tested file trees with non-force ref updates. Remote SHAs above are the authoritative recovery checkpoints.

## Verification
- npm test: 134/134 PASS (existing 110 + Campaign 24).
- npm run check: 134/134 PASS.
- npm run build: PASS; usual Phaser chunk-size warning retained, no new dependency.
- Independent review c35e278..b673915: no Critical/Important/Minor findings.
- Source c850641618b9b54383f628131b384fb158f9d4c2.
- Actions #223: https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36681489336 — build Test/Build and Deploy Pages success.
- Public URL: https://hansen0318.github.io/shanhaijing-arena/

## Public browser smoke
Fresh state: Chapter 1 available; Chapters 2–6 disabled/dim/central lock. Grid 5+1. Chapter 1: 1-1 available; 1-2..1-5 disabled; distinct images, large selected preview, clear START/BACK.
START entered the existing frozen mirrored countdown/arena; HP/cooldown/VFX and AI progressed. Full auto battle reached VICTORY. EXIT returned to Chapter 1 showing 1-1 CLEAR and 1-2 available. Reload then Chapter 1 restored that progress. 1-2 selection changed preview only. Selecting cleared 1-1 and START replayed normally. A3 portrait selected, enemy portrait did not change selection; joystick pointer drag moved its thumb. Replay Victory NEXT opened 1-2 preview, waiting for START. BACK returned to Chapter Select. Unlock-all fixture opened Chapter 6 preview; formal URL retained original progress/locks. Only extension metadata errors were observed, no blocking page-origin console error.
Cloud browser required active screenshot sampling for live frame progression; the battle/session was not accelerated or mutated.

## Automated-only items
Defeat/Draw result actions and non-unlock; Retry same stage/fresh session; sequential chapter finale → Chapter 2 / 2-1; cleared chapter reentry; final Campaign no NEXT; 1-3 runtime identity; malformed/versioned/denied storage recovery. No manual five-battle grind.

## Limitations and next action
Placeholder-only images/encounters share graybox battle definitions. The protected core is 90 seconds; alternative durations reject and remain future scope. Storage denial permits in-memory play but cannot retain progress after reload. Local save has no account/cloud sync. Device-specific responsive layout, real iPhone touch/multitouch and subjective readability are player-owned and not claimed verified by desktop cloud smoke.

Keep existing active PR/feature deployment for player acceptance. No main merge claimed. Player checklist: landscape Chapter Select → Stage Preview → START → Victory → EXIT/unlock → cleared replay → BACK; optionally NEXT and refresh progress. Stop after this milestone.

## Modified files
- `WORK_PROGRESS.md`
- `docs/CAMPAIGN_SYSTEM.md`
- `docs/CORE_GAME_LOOP.md`
- `docs/M1_CAMPAIGN_RELEASE.md`
- `docs/PROGRESSION_SYSTEM.md`
- `docs/STATE.md`
- `docs/TECH_ARCHITECTURE.md`
- `docs/superpowers/plans/2026-09-30-m1-campaign.md`
- `docs/superpowers/specs/2026-09-30-m1-campaign-design.md`
- `index.html`
- `public/campaign/chapter-1.svg`
- `public/campaign/chapter-2.svg`
- `public/campaign/chapter-3.svg`
- `public/campaign/chapter-4.svg`
- `public/campaign/chapter-5.svg`
- `public/campaign/chapter-6.svg`
- `public/campaign/stage-1-1.svg`
- `public/campaign/stage-1-2.svg`
- `public/campaign/stage-1-3.svg`
- `public/campaign/stage-1-4.svg`
- `public/campaign/stage-1-5.svg`
- `public/campaign/stage-2-1.svg`
- `public/campaign/stage-2-2.svg`
- `public/campaign/stage-2-3.svg`
- `public/campaign/stage-2-4.svg`
- `public/campaign/stage-2-5.svg`
- `public/campaign/stage-3-1.svg`
- `public/campaign/stage-3-2.svg`
- `public/campaign/stage-3-3.svg`
- `public/campaign/stage-3-4.svg`
- `public/campaign/stage-3-5.svg`
- `public/campaign/stage-4-1.svg`
- `public/campaign/stage-4-2.svg`
- `public/campaign/stage-4-3.svg`
- `public/campaign/stage-4-4.svg`
- `public/campaign/stage-4-5.svg`
- `public/campaign/stage-5-1.svg`
- `public/campaign/stage-5-2.svg`
- `public/campaign/stage-5-3.svg`
- `public/campaign/stage-5-4.svg`
- `public/campaign/stage-5-5.svg`
- `public/campaign/stage-6-1.svg`
- `public/campaign/stage-6-2.svg`
- `public/campaign/stage-6-3.svg`
- `public/campaign/stage-6-4.svg`
- `public/campaign/stage-6-5.svg`
- `src/campaign/battleFactory.js`
- `src/campaign/controller.js`
- `src/campaign/data.js`
- `src/campaign/persistence.js`
- `src/campaign/progression.js`
- `src/campaign/style.css`
- `src/campaign/view.js`
- `src/main.js`
- `src/runtime/ArenaScene.js`
- `tests/campaignBattle.test.js`
- `tests/campaignData.test.js`
- `tests/campaignNavigation.test.js`
- `tests/campaignProgression.test.js`
