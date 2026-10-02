# Project State

## Milestone
**M5B FORMAL CONTENT DATA INTEGRATION — IMPLEMENTATION READY**

## Current state
- M5A Chapter1 content is PLAYER APPROVED. Formal identities, skills, T0 stats/cooldowns, stage lineups/rewards and Tier mechanic direction are locked as the first playtest content baseline.
- M5B is now authorized: integrate formal data into the existing roster/campaign/Collection and add only reusable T0 combat primitives needed by the approved kits. Formal art/animation/VFX remain M5C.
- Player accepted M4C Landing smoke. Main menu visual/navigation baseline is now PLAYER VERIFIED.
- Next phase is M5A formal content definition. This is intentionally chat-first: lock Chapter1 character/stage/reward/ability/AI-profile content before Work replaces placeholder data or adds formal assets.
- Static full-screen mountain/sun Landing, title treatment, gold primary BATTLE and outlined secondary COLLECTION. Existing navigation hierarchy and route owner retained; no motion/transition or new modes.
- Product changes limited to Landing markup in `src/campaign/view.js` and Landing-scoped CSS in `src/campaign/style.css`. No combat, progression, accounting, content, controller or persistence edits.
- Active branch `feat/m0-combat-core-20260927` / PR#1; safe deployed source `0a17954f6766ff79c68e825e942e6fb6a995bb06`. WORK_PROGRESS CURRENT HANDOFF POINTER is the recovery entry.
- Targeted27/27, impacted188/188, build/diff PASS; independent review24/24/no important findings. Actions#332 /37009391394 CI357/357, build + Pages success.
- Public/local/CI bundles `index-nO1VZ07x.js` / `index-082fIvTy.css` match. Public Landing→both modes→BACK and reload verified; #game hidden and no horizontal overflow at cloud1363×936.
- Safe-area padding, short-height CSS and48–52px minimum touch targets implemented. Four viewport restoration contract cases cover568×320/667×300/844×390/932×430 and save preservation; physical iPhone readability/Safari chrome acceptance pending.
- M4B T0 **PASS / PLAYER VERIFIED**: baseT0; Tier costs5/10/15; T3MAX. Lifetime earned, recruitment/spent accounting/migration, receipts, saved team remain protected. M3 universal Chapter1–6 firstClear/repeatable rewards unchanged.
- Exact next action: short player Landing smoke in `docs/verification/M4C_MAIN_MENU_LANDING.md`, then STOP. No formal content/art/animation, AI tactics or additional progression.
- Known limitation: static placeholder presentation and existing bundle-size advisory. No engineering blocker.

## Historical M2 release evidence (superseded by current state above)
### M2 history
**M2 PLAYER PRESENTATION / PACING CORRECTION: PASS / PLAYER VERIFIED**
Deployed source `9ad74e6f9b93a85451f9cf09552243530274f35a`, original branch/PR#1. Actions#265 /36865286592 Test/Build/Pages Deploy success. Targeted17/17, impacted battle/AI98/98, check230/230, build/diff PASS. Public `index-CI9O6wHr.js` matches local build; initial page renders after reload.
Normal32/36/40/44px; crit1.25×; CRITICAL! another6px larger;80ms pop + fixed-position fade total840–1040ms. P1–P5 moveSpeed1.8/runtime enemy1.6, headless4/3.5 unchanged. Crit/RNG/formula/cooldown/attackSpeed/AI/input/Campaign/Restart preserved.
Player accepted the final impact-text sizing/behavior and current movement pacing. Actions#269 / 36866538530 succeeded. This correction is closed. **M3 SHARD / REWARD / CHARACTER UNLOCK LOOP: AUTHORIZED / IMPLEMENTATION PENDING.** Canonical spec: `docs/M3_SHARD_REWARD_UNLOCK.md`. Stop before M4.
Second player size correction: normal damage text increased again to 40/45/50/55px, critical remains slightly larger (1.12×), and `CRITICAL!` remains larger than the critical number (+12px). Presentation-only; combat logic unchanged.
**M0 / M1 / M2 PASS / PLAYER VERIFIED**

**M2 POST-ACCEPTANCE POLISH: ENGINEERING PASS / PLAYER SMOKE PENDING**

**M2 LAYOUT / FILTER / RESTART CORRECTION: PASS / PLAYER VERIFIED**

**M2 CRITICAL / DAMAGE-NUMBER POLISH: PLAYER CORRECTION PENDING**
Final source `80054aea902a3bc48a726509ca3f70aa9897b397`, original branch/PR#1 open. Actions#260 /36861577213 Test227/227, Build/Pages Deploy success. Local targeted31/31, impacted168/168, full check227/227, build/diff PASS; fresh independent review no findings (30/30 + probes).
Per-ability immutable crit + fresh seeded session RNG, one shared AI/player resolver and exact final critical events; runtime-only prototype visibility settings preserve canonical headless fixture and 3/5/10 cooldowns. Category floating text and warm CRIT! label/pop use existing tween clock and scene cleanup. Public bundle `index-CTo9sRxy.js` matches CI/local; selected team/start, Pause/Resume and Restart rendered without page-origin errors. Cloud clock slow; live crit readability is player-owned, not claimed. Full release/checkpoint/limitations evidence in `docs/M2_CRITICAL_DAMAGE_POLISH.md`.
Next: four-point iPhone feedback smoke only; no M3 until acceptance/authorization. Remaining limitations: prototype balance, integer display rounding/overkill, intentionally repeated default seed, existing large bundle advisory.
Public smoke also observed real damage numbers/HP/cooldowns, stable paused text/timer, and Restart cleanup from a damaged/KO paused round. No claim of live critical readability; this remains part of the short player smoke.

### Historical implementation checkpoints (superseded by final release above)
Checkpoint1: immutable ability crit defaults false/0/1 + validated per-ability settings; seeded independent RNG helper. Targeted21/21 PASS after RED7/7. Resolver/events/presentation/deploy pending; no M3.
Checkpoint2: shared resolver returns exact final `{amount,critical}` after type/DEF/minimum then crit; AI/player use session RNG, runtime Basic/Heavy/Special visibility values enabled, Awakening disabled. Legacy numeric/headless path retained. Core impacted88/88 PASS; presentation/release pending.
Checkpoint3: category-aware floating text and warm larger CRIT! label/scale-pop integrated. Real Phaser tween pause clock tested with normal+crit+label/pop; cleanup owned by existing shutdown. Presentation/lifecycle26/26 PASS; final release checks/deploy pending.
Integration local checks: targeted31/31, impacted168/168, full check227/227, build and whole-diff whitespace PASS. Build bundle `index-CTo9sRxy.js`. Final independent review/Actions deploy/public smoke pending; engineering acceptance not yet claimed.

### M2 historical state
- Bounded correction completed on original `feat/m0-combat-core-20260927` / PR#1. No replacement branch, merge or M3.
- Final deployed code `3e1063bb61455438a9cf5e707cbd05a1e2114410`; Actions #249 / 36818638073 CI204/204, Build/Pages Deploy success. Local targeted11/11, impacted130/130, build/diff PASS. Independent whole-diff review has no remaining findings.
- Team Select: fixed viewport rows, bottom safe area, clean actual-enemy matchup, compact64×64 bench; ALL/Power/Speed/Blast filters only change visible candidates. No Type quota; ownership/eligibility/unique/exact3/save/slot order unchanged. Type marks only bench/tabs; battle HUD unchanged.
- X menu: CONTINUE / RESTART / EXIT. Restart/Retry share validated fresh config and existing scene lifecycle; same stage/team, fresh HP/CD/targets/AI/events/timer/countdown/formation, shutdown damage cleanup; no completion/progression writes. New round clears manual/menu interruptions and preserves orientation authority.
- Public final source: render/filter/preservedP1/P3/P5/BATTLE; Restart full same-team Arena/fresh3/defaultA2; CONTINUE preserves manual Pause; EXIT correct Preview/no unlock; no page-origin errors. Cloud viewport actual no-scroll confirmed; mobile dimensions have static CSS budget evidence only.
- Player completed the real-device changed-scope smoke and reported the layout/filter/Restart correction OK. Preserve this baseline.
- Prototype-only pacing change authorized next: Heavy/Special/Awakening shared placeholder cooldowns become 3/5/10s instead of 5/10/15s to speed testing. This does not define formal character balance; cooldown remains per Ability Definition and future characters may differ.
- Stop before M3/M4/formal art/animation/audio/economy unless explicitly authorized.

- Prototype pacing correction is deployed from `125341ff177a539c6fee584f1bf09d1a871e3355`: shared placeholder Heavy/Special/Awakening cooldowns are 3/5/10s. Previous deployment was blocked only by a stale `demoBattle` regression expecting 5/10/15; that test was updated. Actions #253 / 36856525782 completed Test 204/204, Build, and Pages Deploy successfully.
- Player confirmed the public build now shows/uses the 3/5/10 prototype cooldown pacing. This closes the bounded cooldown follow-up.
- Player correction after real-device smoke: enlarge damage text; critical number larger than normal; `CRITICAL!` larger than the critical number; remove upward drift and use brief pop/flash + in-place fade. Also increase prototype moveSpeed while preserving per-character stat ownership: P1–P5 1.4→1.8, runtime placeholder enemy 1.2→1.6. No M3 until this correction is accepted.
- Before M3, player authorized one final bounded combat-feedback slice in `docs/M2_CRITICAL_DAMAGE_POLISH.md`: data-driven per-ability critical hit chance/multiplier with deterministic resolution, and stronger category-aware/CRITICAL floating damage presentation. M3 remains blocked until this slice is accepted or explicitly deferred.

## Goal
Complete the playable Chapter → Stage Preview → Battle → Result → Unlock/Replay skeleton around the player-confirmed graybox battle.

## Locked v1 decisions
- Platform: mobile web, landscape.
- Presentation: 2.5D three-quarter arena.
- Team size: 3v3.
- Arena movement: free 360-degree movement inside bounded arena.
- Character separation: simple collision/avoidance; no complex physics.
- Camera is fixed for the whole battle and does not follow selection.
- The whole 3v3 Arena encounter is intended to remain readable in one fullscreen landscape view.
- Each round begins with a 3-second pre-battle countdown; actors and skills are inactive until it completes.
- Runtime spawn uses mirrored one-front-two-back triangles: A2/E2 lead; A1/A3 and E1/E3 form the upper/lower rear. Restart restores the same positions before the countdown. The canonical headless fixture stays independent.
- Player combat input immediately overrides AI for the selected character.
- Holding the selected ally's joystick keeps player ownership active even at zero/dead-zone movement, suppressing that ally's automatic skill use.
- When joystick input is released, full AI control resumes immediately on the next simulation step.
- Selected character does not change when AI resumes.
- No visible AUTO/MANUAL state.
- Player controls: movement joystick + Heavy + Special + Awakening. Prototype cooldowns for the current shared placeholder abilities: Heavy 3s, Special 5s, Awakening 10s. These are test pacing values only; future character abilities may define different cooldowns.
- Manual Heavy/Special/Awakening can be triggered immediately after the pre-battle countdown when ready, including an air-cast with no in-range target; AI still obeys approach/range before auto-casting.
- Basic attack is automatic, unlimited, and has no cooldown button; when other active skills are cooling down, AI continues approaching for Basic instead of idling.
- AI continuously reevaluates the nearest living opponent. Multiple AI actors may independently pursue the same opponent; there is no one-to-one target reservation. It keeps pursuing until a close engage distance (M0: 0.20 simulation units, visually near-overlapping centers), independent of ability ranges; Basic/Heavy/Special/Awakening may fire during pursuit, and manual control of one ally does not pause the other five AI actors.
- Win: all enemy characters KO.
- Lose: all allied characters KO.
- Battle limit: 90 seconds.
- Timeout winner: higher sum of remaining team HP percentages; exact tie = draw.
- Type triangle: Power > Speed > Blast > Power.
- Initial advantage/disadvantage test value: +15% / -15% damage modifier.
- Roles: Tank / Attacker / Support. Healer/Buffer/Controller are Support subtypes in v1.
- Character stat minimum: HP, ATK, DEF, Move Speed, Attack Speed.
- Skill set: Basic, Heavy, Special, Awakening, Passive. Active slot names do not determine distance class; each skill may independently define min/preferred/max range for AI spacing.
- KO character cannot be selected or healed in v1.
- If selected character is KO, selection moves to the nearest surviving ally; camera remains fixed.
- M0 runtime stack: Phaser 4.2.1 + Vite 8.3.1 + plain JavaScript/ESM.

## M1 player acceptance and next milestone (2026-09-30)
- Player completed real iPhone smoke for the current Campaign/battle flow and reported the latest presentation/controls normal.
- M1 Campaign + return/Pause/Exit + portrait gate/START/exit-confirmation corrections are therefore **PASS / PLAYER VERIFIED**.
- Do not repeat M1 acceptance checks unless a later change can materially regress them.
- Next planned milestone is **M2 Team Select / Roster Skeleton**: Stage Preview → START → Team Select → choose exactly 3 → Battle.
- M2 must establish data-driven roster/ownership/team-slot contracts before M3 reward/shard unlock work.
- Post-M1 sequencing is canonical in `docs/DEVELOPMENT_ROADMAP.md`: M2 Team Select → M3 Shard/Reward/Character Unlock → M4 Tier Upgrade/Collection.
- Formal art and audio remain deferred; audio should attach later to clean gameplay/UI event hooks rather than drive current architecture.

## M1 authorization (2026-09-30)
- Latest player confirmed GREYBOX ENGINEERING PASS and iPhone FINAL PLAYER SMOKE PASS.
- M1 Campaign skeleton authorized; protect combat/input baseline. No formal art/economy.
- Historical M0 pending statements below are superseded by this player confirmation.

## Not in prototype
- Final character art.
- Full animation production.
- Formal story / unlock economy / fragment farming / T3-T1 implementation.
- Large roster.
- PvP, guilds, equipment, gacha, ranking.

## Prototype exit criteria
1. 3v3 can resolve from start to victory/defeat without player input.
2. Player can switch among three allies.
3. Fixed fullscreen camera keeps the Arena readable while player switches selected ally.
4. Manual input overrides AI instantly.
5. Full AI resumes immediately when valid combat input stops.
6. Basic/Heavy/Special/Awakening all function under AI and player control as applicable.
7. Soft targeting is understandable in play.
8. Damage numbers, HP, KO, timer, victory/defeat are readable.
9. Type advantage rules are verifiably correct.
10. Stable mobile landscape smoke test passes.

## Current M1 release (2026-09-30)
- Source checkpoint: c850641618b9b54383f628131b384fb158f9d4c2 on the existing active branch/PR #1.
- Node targeted Campaign 24/24; full regression and check 134/134; Vite build PASS. Independent code review found no blocking or minor finding.
- Actions #223 / 36681489336: Test, Build, Pages Deploy success. Public URL https://hansen0318.github.io/shanhaijing-arena/ .
- Public cloud browser: fresh Chapter 1 only, 5+1 grid, dim/central locks, unique thumbnails/large preview, START, frozen mirrored countdown, AI/HP/cooldown/VFX, Victory three actions, EXIT → 1-1 CLEAR / 1-2 available, reload persistence, cleared-stage replay, NEXT → 1-2 preview without starting, BACK → Chapter Select. Ally A3 selection/enemy no-op and joystick pointer drag observed. DEV Chapter 6 preview was accessible; returning to formal URL retained original save/locks. No page-origin blocking error; extension metadata errors are external.
- Automated-only: Defeat/Draw navigation/non-unlock, Retry identity, 1-5 completion → Chapter 2 / 2-1, last-stage no NEXT, 1-3 runtime identity, malformed/obsolete/denied save handling. Current graybox supports 90-second duration only.
- Real iPhone layout/readability/touch/multitouch acceptance remains pending. Source/shared combat/input/projection/portrait geometry remain unchanged.
- Keep the requested active branch/PR for the player acceptance cycle; feature pipeline is the current public deployment. No claim of main merge.
- STOP: no formal art, real Chapter 1 content, rewards/economy or next milestone. Next exact action is player iPhone Campaign smoke.

## Historical M0 implementation status

### Bilateral portrait HUD correction (2026-09-30)
- Player confirmed the 70x70 square portrait with a separate HP bar, selected scale, and KO dim on iPhone. This HUD slice is **PASS / PLAYER VERIFIED**.
- Final graybox closure complete: runtime countdown 3→2→1 and mirrored one-front-two-back spawn integrated at source `4d40ab0ca67e8c6566ca6cc1d19a9c7f9293b7aa`. Targeted 8/8 and integration 76/76 PASS; full tests/check 110/110, Vite build and Actions #217 Test/Build/Pages Deploy PASS. Public default browser completed VICTORY/Restart; KO fixture confirmed A2 dim 0/260, selected fallback to A1 and enemy portrait no-op. Browser saw 3→2→1, free AI movement after countdown, HP/cooldown/VFX updates, and reset to the mirrored formation/full HP/01:30. No blocking page-origin error. Defeat/Draw, timeout, manual air-cast and immediate release handoff are automated-only in this final smoke. Existing combat, HUD, and input contracts remain protected. **GREYBOX ENGINEERING PASS / iPhone FINAL PLAYER SMOKE PENDING**; real iPhone multitouch and whole-round feel remain for the player to confirm.
- Player graybox feedback requested removal of the enemy team-total HP bar, a larger top-center 90-second timer, and mirrored individual enemy cards. The active feature branch now renders E1/E2/E3 as non-interactive orange placeholders with red individual HP bars and centered white HP text; living/KO state dims both teams' cards. Ally selection and selected-KO fallback use their existing logic.
- Source `6e4f1e294c27f1165dd95a1885b3b4ff4d5d6d66`: local HUD tests 3/3, full regression 107/107, Vite build PASS; Actions #213 Test/Build/Pages Deploy success. Public browser smoke observed centered timer, symmetrical HP cards, ally selection, enemy-card no-op, per-actor HP updates, A2 KO dim/selection fallback, E3 KO dim, and Restart reset of all cards/HP/countdown. Skill cooldown and joystick pointer drag were observed; no blocking page-origin error. **ENGINEERING PASS / iPhone PLAYER SMOKE PENDING** for device layout, readability, and touch. No combat, stage, fixed camera, joystick, skill, targeting, or AI changes.
- Player iPhone correction: the prior HUD layout had reduced all portrait squares to 58x58 and positioned the first row at y32, visibly too small and close to the top edge. Source `36b7822185608c227f07ffc9ab47fde601d526be` restores 68x68 squares and lowers the bilateral rows while keeping the third enemy card clear of the Special button. Layout/HUD targeted tests 4/4, local Vite build, Actions #214 Test/Build/Pages Deploy PASS; public browser shows six larger cards, top gap, E3/Special separation, and selectable A1 highlight. **ENGINEERING PASS / iPhone PLAYER SMOKE PENDING** for real-device appearance. No gameplay or input changes.
- Latest player correction: dark 86px backing exposed 9px black strips on each side of the 68px placeholder. Source `68a9ffe922f5c265a5c7adefde602b34a8057592` aligns the six colored squares and backing at 84x84 while preserving card positions, HP/KO, selection, and input. Targeted 4/4 and local build PASS; Actions #215 Test/Build/Pages Deploy PASS. Public default and KO fixture browser smoke verified all six full-width squares, selected enlargement, dim ally/enemy KO cards, aligned individual HP, enemy click no-op, and no page-origin runtime errors. **ENGINEERING PASS / iPhone PLAYER SMOKE PENDING** for real-device visual confirmation.
- Player found that the HP bar covered the lower 18px of the otherwise square 84x84 portrait, making the visible image squat. Source `68f8c9012862f6f4574037f77d16e27aaac47e69` gives each side a full 70x70 visible square plus a separate 70x14 HP bar beneath it; card centers and row pitch stay fixed. Targeted 4/4 and local build PASS; Actions #216 Test/Build/Pages Deploy PASS. Public default/KO fixture browser smoke verified six square portraits, selected scale, ally/enemy KO dim, separate red HP bars with centered white text, enemy-card no-op, and no page-origin runtime error. **ENGINEERING PASS / iPhone PLAYER SMOKE PENDING** for player visual acceptance.

### Graybox playable milestone in progress (2026-09-29)
- Portrait-based ally selection and compact prototype HP/timer HUD are integrated on the active feature branch. The old actor marker is no longer the selection input; selection highlight remains.
- Finite 90-second runtime, distinct cast feedback, and result/restart are implemented at `64ba9652b17654d49c6b31e0df9f6222cd807121`. Full local regression 107/107 and Vite build PASS; Actions #212 Test/Build/Pages Deploy PASS. Public browser smoke observed portrait selection, HP/timer, automatic battle, manual air-cast cooldown with no remote damage, A2 KO fallback, VFX, VICTORY and Restart. **ENGINEERING PASS / PLAYER SMOKE PENDING**: real iPhone multitouch, touch layout, VFX readability, and game feel remain player-owned.

### Completed on `feat/m0-combat-core-20260927`
- Framework-independent deterministic combat core through headless 3v3.
- Existing core/headless evidence retained, including **38 / 38** impacted integration PASS.
- Phaser/Vite renderer bootstrap and exact dependency lockfile.
- Previous renderer checkpoint: **48 / 48 Node PASS** and **Vite build PASS**.
- Chat-first first interaction implementation:
  - allied placeholder selection;
  - selected visual state;
  - camera soft-retarget;
  - selected-KO fallback through existing targeting helper.

### Latest fullscreen arena verification
- Fullscreen Arena world/presentation code complete: viewport 960x540, world 1280x720, 16:9, camera clamped to world bounds.
- GitHub Actions on latest branch: **49 / 49 tests PASS**, production build PASS, Pages deploy PASS.
- Fullscreen Arena interactive browser smoke on the deployed default and `?fixture=ko` URLs: PASS. Landscape canvas has a continuous world background without the former bordered card; six actors render as replay advances, A1/A2/A3 highlight and camera retarget work, top/bottom and observed left-to-right camera positions do not reveal outside-world blank space, enemy click is no-op, and A2 KO falls back to A1. No blocking page-origin runtime/console error. **Fullscreen arena/camera defect resolved; ENGINEERING PASS / PLAYER SMOKE PASS for this slice.**

### Arena sand color evaluation (2026-09-28)
- Arena rectangle fill `#8E7B5A`, center line and ellipse stroke `#5F513B`; dark outer camera background retained.
- Color-only source commit `9b9fe641848a412e2b10e26493a73532ba4551bc`; Actions run `36436079695`: Test / Build / Pages Deploy success. Public Pages appearance observed in browser. **ENGINEERING PASS / PLAYER SMOKE PENDING** for player device proportion assessment.
- No arena/actor/control/camera geometry or battle behavior changed in this slice.

### Arena horizontal widening (2026-09-29)
- Logical stage/canvas/DOM host changed from 960x540 to 1120x540; actor projection padding increased from 120 to 200 on both sides, preserving its 720px horizontal span. Ground/line track stage width; center ellipse stays 280x170 and sand colors remain.
- Chat implementation checkpoint `4d13321a660ea25a4cedddb96eb7a7857b4827fa`; stale projection test expectations corrected only in `23c4e759551c24d149203c2574ee0109e5921046`. Actions `36500167030`: 61/61 tests, build, Pages deploy PASS.
- Public browser smoke: wider centered field, unchanged height, complete ground and line, stable circle/actor logical sizes and fixed camera. A1/A2/A3 selection and pointer joystick drag/release movement observed without regression. **Engineering CI/browser pointer checks PASS; player visual proportion and real iPhone touch smoke PENDING.**

### Pending
- Fixed fullscreen Arena / iPhone Safari viewport presentation: **ENGINEERING PASS / PLAYER SMOKE PASS**.
- Movement joystick + shared player override: **known-working mobile baseline restored; player-confirmed movement works; AI resume delay now 0s / immediate**.
- Skill controls: Heavy / Special / Awakening — **Chat implementation complete; CI/deploy + player mobile smoke pending**.
- Minimum HUD/VFX readability.
- Natural combat presentation / AI movement readability.
- Runtime/mobile and player smoke for later slices.

## M1 player feedback follow-up — 2026-09-30
- Authorized scope: stabilize all route returns; BACK only; top-right Pause/Resume and Exit.
- Shared visual viewport/layout synchronization; protected 1120x540 logical stage and input architecture retained.
- Pause stops countdown/simulation/AI/timer/cooldown/VFX and gameplay input. Resume retains round state, releasing stale joystick hold.
- Unfinished Exit returns same chapter/stage preview without clearing/unlocking/saving; earlier progress is retained.
- Local targeted 21/21, full 144/144, build PASS. Source 0d590cb936e109110dc79aa1b435144d4ef676fc; Actions 36692992427 Test/Build/Pages Deploy PASS. Public Pause freeze/Resume/input no-op, unfinished and paused Exit, BACK and three repeated navigation cycles PASS. Full evidence: docs/M1_RETURN_PAUSE_FIX.md. **ENGINEERING PASS / PLAYER SMOKE PENDING**.
- No next milestone or formal art. Real iPhone return-layout/touch acceptance remains PLAYER SMOKE PENDING.

## M1 bounded correction — portrait gate / START / exit confirmation (2026-09-30)
- Portrait: full-page orientation gate, hidden/inert Campaign/Arena and paused battle; landscape reuses route and scene with viewport resync. No orientation-lock dependency or CSS rotation.
- Stage CTA: START only. Running-battle X: confirmation freezes first; CONTINUE restores the prior running/manual Pause state, EXIT invokes the unchanged stage-select exit without fresh completion/unlock. Previously cleared stages retain CLEAR.
- No change to logical Arena dimensions, camera, input/HUD, countdown, formation, AI, unlock rules or persistence schema. Release and browser evidence to follow in this checkpoint.

## Polish damage checkpoint (2026-10-01)
- AI checkpoint remote: `e83dd34b738b7dcd7561e872e9e88da32d284b56`.
- Real resolved-damage events and 1s outlined floating numbers integrated; air/invalid/KO hits excluded, rapid hits offset, same tween pause clock, shutdown cleanup.
- Damage + Pause/tween targeted tests 13/13 PASS; earlier BattleSession impacted tests PASS.
- Remaining: VS/type and integration/deploy. Exact next action: shared encounter definition lookup and VS view.

## Polish VS/type checkpoint (2026-10-01)
- Damage checkpoint remote: `30c6419e61c6de8594515af418b611fa49f8e54c`.
- VS ally/enemy placeholders; preview and battle share immutable encounter definition lookup. Power/Speed/Blast replaceable marks derive from definition type. Battle HUD geometry unchanged.
- Roster/team/VS impacted tests 26/26 PASS.
- Remaining: whole-diff review, targeted/impacted checks, build/deploy and minimum public runtime smoke. Exact next action: inspect integrated diff and verify impacted surfaces.
