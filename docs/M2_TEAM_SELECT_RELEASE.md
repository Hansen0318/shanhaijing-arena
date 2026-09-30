# M2 Team Select release / recovery

## Status
**M2 TEAM SELECT ENGINEERING PASS**.
**iPhone TEAM SELECT PLAYER SMOKE PENDING**. M0/M1 remain player verified; active branch `feat/m0-combat-core-20260927` and PR #1 retained; no merge performed.

## Remote checkpoint commits
1. `71a9c821bfd26ce09ca1f86a4a549d258d9f1cf4` — catalog/ownership/ordered selection model; 4 tests PASS.
2. `d9b5d0af5c6ad63ac13b7ef75f195752f3d57c98` — landscape Team Select DOM/style; roster/UI 6 tests PASS.
3. `5c5179947eaf9f788a335c2a5ceaa57fc1089da4` — START/BACK/BATTLE/Retry route; navigation/corrections/roster/UI 32 tests PASS.
4. `78972a75bedb21fa3641db3cca8ac3c3e9f23801` — selected definitions into battle factory/HUD; battle/data/HUD 13 tests PASS.
5. `3f04d06183510e89d9de077078ec14ce2ddb9467` — recent valid team save; first integrated regression 174/174 and build PASS.
6. `5cfa41224f27ce49ed61c48c462904a73ecbe654` — independent review corrections, actual CampaignView integration test, final verification and deployment source.

Final closure commit containing this updated record changes documentation only; active branch HEAD is authoritative for its SHA. Deployed runtime remains checkpoint 6 source above.

## Implemented
- P1–P5 independent immutable definitions using existing Character contract, Type/Role and active ability references, placeholder portrait and Passive metadata.
- Separate prototype ownership (all five available); three unique ordered slots; selection/removal/refill first empty slot; exact-three enabled BATTLE.
- Stage Preview START → Team Select → BATTLE; BACK → same Preview; selected definitions instantiate a1/a2/a3 at unchanged one-front-two-back formation (slot 2 front).
- Selected labels/colors and HP follow catalog; enemies remain stage-configured prototype lineup. Retry retains selected team; Exit/Next go to Preview; START restores recent valid team.
- Independent team.v1 save; partial edits never overwrite a valid saved team. Unknown/duplicate/obsolete/malformed saved IDs are safely filtered; quota/denied storage has in-memory fallback.
- allowedRoster/forcedCharacters/bannedCharacters enforced in selection and launch; ownership revalidated; conflicts cannot launch an illegal team.
- No combat core/input/camera/formation/HUD geometry refactor; no formal art/animation/recruit/rewards/shards/tier/economy/audio.

## Verification
- Final M2 targeted tests: **24/24 PASS** (rosterTeam, teamView, teamNavigation, teamBattle, teamPersistence, teamFlowView).
- Full `npm test`: **176/176 PASS**, including prior Campaign/combat/input/orientation/pause/viewport tests.
- `npm run build`: PASS. `git diff --check`: PASS.
- Independent reviewer: no gameplay blocker; minor storage readable-old/write-failure fallback reproduced in a failing test then corrected. Stale progress text corrected.
- Browser-owned iPhone touch/multitouch/readability is not claimed by automated checks.
- Existing build warning: Phaser bundle exceeds Vite's 500 kB advisory. No dependency upgrade or unrelated bundling change.

## Actions / deployment
[Actions #234](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36735090478) for exact source `5cfa41224f27ce49ed61c48c462904a73ecbe654`: Test, Build, Pages artifact, Deploy success. Build job 109954582462 and deploy job 109954704775 steps verified. Earlier #233 environment approval wait subsequently resolved; no workflow/protection change made by executor. No approval action remains outstanding.

Public URL: https://hansen0318.github.io/shanhaijing-arena/ . Reload confirmed title M2 Team Select and START→Team Select before smoke.

## Public browser smoke
- Chapter 1 → 1-1 Preview → START showed five cards and three empty slots; BATTLE disabled at 0/1/2 selected.
- P1/P3/P5 selected in order. BATTLE showed A1/P1 280/280 blue, A2/P3 240/240 purple at front, A3/P5 250/250 gold. Enemy E1/E2/E3 remained 240/240 orange.
- Countdown, AI movement, HP/cooldowns, KO dimming/fallback and VICTORY observed. Result displayed NEXT STAGE / RETRY / EXIT.
- RETRY restored same selected IDs/colors, full HP and front slot, fresh countdown without page refresh.
- Confirmed unfinished retry Exit returned 1-1 Preview with prior CLEAR and 1-2 unlock retained. START preloaded P1/P3/P5.
- Removed selected slot 2: slot remained empty and BATTLE disabled. P2 filled slot 2; second Battle showed A2/P2 orange 260/260 at front, with A1/P1 and A3/P5 unchanged.
- Exit then full page reload → Chapter 1 → START restored P1/P2/P5, proving independent recent-team persistence. Team Select BACK retained 1-1 Preview.
- Public landscape gate hidden; normal menu/arena interaction observed. Portrait/landscape gate, simulation pause/resume and viewport regression are automated PASS. The cloud browser exposes no viewport resize/rotation capability; actual public portrait rotation was not performed. This is explicitly part of the pending iPhone smoke, not a claimed browser rotation PASS.
- No observed page-origin error. Chrome-extension metadata errors are external to the application. Cloud canvas timing is not used as iPhone performance evidence.
- Screenshot: arena-m2-team-select-1790781778806.jpg (P1/P3/P5 selected), preserved as review evidence.

## Next action — iPhone player acceptance
Landscape START → select 3 → BATTLE, verify chosen portraits/HP/front slot. Retry/Exit → START restores team; swap one; BACK returns same stage. Reload verifies saved team. Rotate portrait/landscape and verify full-page gate and frozen battle/countdown while portrait. Report layout/readability/touch issues only for this changed scope. Do not start M3 before acceptance.

## Modified files
- `index.html`, `src/main.js`.
- `src/campaign/data.js`, `controller.js`, `view.js`, `battleFactory.js`.
- `src/roster/catalog.js`, `team.js`, `view.js`, `style.css`, `battlePresentation.js`, `persistence.js`.
- `src/runtime/ArenaScene.js` (selected identity presentation only).
- `tests/rosterTeam.test.js`, `teamView.test.js`, `teamNavigation.test.js`, `teamBattle.test.js`, `teamPersistence.test.js`, `teamFlowView.test.js`.
- Updated `tests/campaignNavigation.test.js`, `campaignBattle.test.js`, `campaignData.test.js`, `boundedCorrections.test.js` to traverse M2 while retaining existing assertions.
- `WORK_PROGRESS.md`, `docs/STATE.md`, `M2_TEAM_SELECT_PLAN.md`, this release record, `CORE_GAME_LOOP.md`, `CAMPAIGN_SYSTEM.md`, `CHARACTER_SYSTEM.md`, `TECH_ARCHITECTURE.md`, `PROGRESSION_SYSTEM.md`.

## Known limits
Prototype abilities/pacing are shared and unbalanced; Passive metadata is unimplemented. Ownership defaults all five and is ready for future acquisition, but acquisition persistence belongs to M3. Restrictions are supported/tested; ordinary stages have no restrictions. If storage refuses writes, recent team remains in memory and cannot persist across reload. Real iPhone acceptance and actual portrait rotation remain outstanding; Pages and public M2 flow smoke are complete.
