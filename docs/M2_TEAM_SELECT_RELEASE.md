# M2 Team Select release / recovery

## Status
**M2 CODE / TEST / BUILD VERIFIED — RELEASE BLOCKED**.
Do not mark M2 TEAM SELECT ENGINEERING PASS until Pages deploy and requested public smoke pass. iPhone TEAM SELECT PLAYER SMOKE PENDING. M0/M1 remain player verified; active branch `feat/m0-combat-core-20260927` and PR #1 retained; no merge performed.

## Remote checkpoint commits
1. `71a9c821bfd26ce09ca1f86a4a549d258d9f1cf4` — catalog/ownership/ordered selection model; 4 tests PASS.
2. `d9b5d0af5c6ad63ac13b7ef75f195752f3d57c98` — landscape Team Select DOM/style; roster/UI 6 tests PASS.
3. `5c5179947eaf9f788a335c2a5ceaa57fc1089da4` — START/BACK/BATTLE/Retry route; navigation/corrections/roster/UI 32 tests PASS.
4. `78972a75bedb21fa3641db3cca8ac3c3e9f23801` — selected definitions into battle factory/HUD; battle/data/HUD 13 tests PASS.
5. `3f04d06183510e89d9de077078ec14ce2ddb9467` — recent valid team save; first integrated regression 174/174 and build PASS.
6. Current commit containing this record — independent review corrections, actual CampaignView integration test, final verification and deployment handoff. Exact SHA is the active branch HEAD; next evidence record must quote it.

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

## Actions / deployment blocker
Checkpoint 5 Actions [#233](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36734018803): Test/Build/artifact upload success. Deploy job explicitly says waiting for github-pages deployment approval. API pending_deployments reports `current_user_can_approve=false`, zero wait timer, no reviewer information. Approval cannot be completed by the connected executor. Latest correction commit triggers a newer run that supersedes #233; approve the newest run for the actual branch HEAD.

Public URL: https://hansen0318.github.io/shanhaijing-arena/ . The inspected public page still served M1 (START directly entered Battle); this is old-build evidence, **not M2 smoke**. No deployment or complete engineering PASS is claimed.

## Exact continuation
1. User approves the latest `github-pages` deployment under GitHub Actions (do not change environment protections or approve an obsolete commit).
2. Executor verifies Test/Build/Deploy all success for the latest branch source; records source SHA and run URL.
3. Reload public Pages and verify M2 Team Select is present before smoke.
4. Chapter 1 → 1-1 Preview → START; choose P1/P3/P5; verify slots and BATTLE → matching Arena colors/labels/HP.
5. Complete result and Exit, START again, verify restored team; replace a member and launch again; Team Select BACK retains current Preview.
6. Verify public portrait/landscape gate without regression; record browser capability limitations precisely. Automated orientation tests already pass; do not substitute those for a claimed actual browser/device rotation.
7. Record smoke and mark M2 TEAM SELECT ENGINEERING PASS / iPhone TEAM SELECT PLAYER SMOKE PENDING, then stop for player acceptance.

## Modified files
- `index.html`, `src/main.js`.
- `src/campaign/data.js`, `controller.js`, `view.js`, `battleFactory.js`.
- `src/roster/catalog.js`, `team.js`, `view.js`, `style.css`, `battlePresentation.js`, `persistence.js`.
- `src/runtime/ArenaScene.js` (selected identity presentation only).
- `tests/rosterTeam.test.js`, `teamView.test.js`, `teamNavigation.test.js`, `teamBattle.test.js`, `teamPersistence.test.js`, `teamFlowView.test.js`.
- Updated `tests/campaignNavigation.test.js`, `campaignBattle.test.js`, `campaignData.test.js`, `boundedCorrections.test.js` to traverse M2 while retaining existing assertions.
- `WORK_PROGRESS.md`, `docs/STATE.md`, `M2_TEAM_SELECT_PLAN.md`, this release record, `CORE_GAME_LOOP.md`, `CAMPAIGN_SYSTEM.md`, `CHARACTER_SYSTEM.md`, `TECH_ARCHITECTURE.md`, `PROGRESSION_SYSTEM.md`.

## Known limits
Prototype abilities/pacing are shared and unbalanced; Passive metadata is unimplemented. Ownership defaults all five and is ready for future acquisition, but acquisition persistence belongs to M3. Restrictions are supported/tested; ordinary stages have no restrictions. If storage refuses writes, recent team remains in memory and cannot persist across reload. Pages approval/public smoke/iPhone acceptance remain outstanding.
