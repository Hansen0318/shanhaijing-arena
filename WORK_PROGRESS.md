# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Preview URL: https://hansen0318.github.io/shanhaijing-arena/
- KO smoke URL: https://hansen0318.github.io/shanhaijing-arena/?fixture=ko
- Current slice: **six portrait inner black-edge correction** on bilateral HUD.
- Graybox prototype baseline: implementation `64ba9652b17654d49c6b31e0df9f6222cd807121`; Actions [run #212](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36585956592) Test/Build/Pages Deploy success. The 90-second battle, cast feedback, result/Restart, protected mobile input, and immediate AI takeover remain intact.
- HUD correction checkpoint (2026-09-30): removed top enemy team-total HP; enemy E1/E2/E3 now have non-interactive right-side portrait/individual HP cards; timer is larger at top center. Both sides dim KO cards; existing ally KO selection guard/fallback remains. Card columns use compact mirrored placement above the joystick/skill zones. Only `ArenaScene` presentation and `battleHud` view data changed, plus HUD regression tests. Targeted 3/3 PASS; full local 107/107 PASS; Vite build PASS. Source commit `6e4f1e294c27f1165dd95a1885b3b4ff4d5d6d66`; Actions [run #213](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36647151726) Test/Build/Pages Deploy success.
- Public browser smoke: default shows mirrored cards, centered larger 01:30 timer, no enemy total HP; A1/A2/A3 portrait selection and enemy-card no-op observed. Individual ally/enemy HP changes during combat. In `?fixture=ko`, A2 shows dim 0/260, cannot be reselected, A1 receives selection; E3 later shows dim 0/240. VICTORY/RESTART returns to 5 countdown, all cards full HP/bright and A2 selected. Skill button showed cooldown; joystick pointer drag completed. No blocking page-origin errors (browser extension metadata error excluded). No real iPhone touch or visual acceptance was performed. **ENGINEERING PASS / iPhone PLAYER SMOKE PENDING**.
- Player follow-up (2026-09-30): real iPhone screenshots showed all six portrait squares smaller than the previous 68x68 ally version, and the first row nearly touched the stage top. The previous HUD commit changed portrait size 68→58 and first row y72→32 to fit E3 above the fixed Special ring. Source commit `36b7822185608c227f07ffc9ab47fde601d526be` restores 68x68 squares on both sides and places rows at y56/148/240, with selected scale 1.08, selected top margin >18 logical px, and E3 lower edge above the Special ring. Only portrait card geometry changed; timer, HP/KO, joystick, skills, and battle are untouched. Targeted layout/HUD tests 4/4 and local Vite build PASS; Actions [run #214](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36649387516) Test/Build/Pages Deploy success. Public browser smoke: six larger mirrored cards, visible top gap and E3/Special gap, A1 portrait selection/highlight; no blocking page-origin errors. **ENGINEERING PASS / iPhone PLAYER SMOKE PENDING**.
- Player follow-up (2026-09-30): six cards showed dark strips inside the portrait area. Root cause: dark backing 86px wide while the colored placeholder was only 68px, exposing 9px per side. The bounded correction makes both the backing and colored square 84x84, centers its label, and keeps the existing card centers/row pitch, HP bar/text coordinates, KO alpha, and input unchanged. Selected portrait keeps a visible white border. Targeted HUD/layout tests 4/4 and local Vite build PASS; Actions/Pages and public browser visual smoke PENDING.
- Next exact step: push this portrait-fill checkpoint, confirm Actions Test/Build/Pages deploy, then public browser smoke all six cards, selected/KO borders and HP bars. iPhone visual acceptance remains player-owned; no art or gameplay work.

## Protected mobile input baseline
Player confirmed this path works on iPhone Chrome:
- fixed 1120x540 Phaser surface (previous player-confirmed 960x540 input architecture retained);
- `Phaser.Scale.NONE`;
- outer DOM performs visual contain/positioning;
- A1/A2/A3 use Phaser GameObject `setInteractive()`;
- joystick base uses Phaser GameObject input;
- joystick movement converts pointer client coordinates through canvas `getBoundingClientRect()` back to the fixed logical stage (now 1120x540).

Do not migrate this input/display architecture again without a separate regression-safe experiment.

## Regression bisect result
Exact baseline restore recovered:
- ally selection;
- joystick drag;
- selected ally movement.

Step 1 slow runtime demo initially froze because runtime character definition IDs were changed to `ally_runtime/enemy_runtime` while `BattleSession` looked up `ally/enemy`.
That defect was fixed by preserving canonical definition IDs while changing only runtime stats.

Player then confirmed movement works again with the slower runtime fixture.

## Current runtime smoke pacing
- runtime ally move speed: 1.4;
- runtime enemy move speed: 1.2;
- increased runtime HP;
- reduced runtime attack pacing;
- canonical deterministic headless fixture remains unchanged.

## New canonical control handoff
Player judged the 1.0s grace period unnecessary.

Shared `ControlHandoff` is now:
- valid manual input overrides immediately;
- while joystick input remains active, player control is refreshed every simulation step;
- when valid player input stops, AI resumes on the **next simulation step** with **0s intentional delay**;
- selected character remains selected;
- no AUTO/MANUAL UI.

Implementation detail: timeout is 0ms and the active-input comparison is inclusive (`<=`) so the exact frame receiving player input is still owned by the player.

## Next gate
After automated tests/build/deploy PASS, player smoke:
1. select A1/A2/A3;
2. move selected ally;
3. release joystick;
4. release joystick and observe AI resume immediately;
5. confirm camera/viewport remain unchanged.

After PASS, next isolated feel change can be joystick position only.


## Zero-delay deployment correction
The first zero-delay attempts did not reach Pages because an older AI unit test still asserted the retired 2-second boundary.
Therefore player smoke performed during those failed runs was still exercising the previous successful deployment, not the intended immediate-handoff build.

The stale AI test is now updated to the canonical behavior:
- valid input instant => player override;
- immediately after input stops => AI.

## Arena sand color A (2026-09-28)
- `src/runtime/ArenaScene.js`: field rectangle fill `#8E7B5A`, center line and ellipse stroke `#5F513B`; camera/outer background remains `#253648`.
- Source commit `9b9fe641848a412e2b10e26493a73532ba4551bc` (pushed to active branch); GitHub Actions run `36436079695`: Test, Build, Pages Deploy all success. No separate local test/build repeated.
- Public preview https://hansen0318.github.io/shanhaijing-arena/ observed sand field, dark markings, and dark exterior in browser. This verifies deployed appearance only; player device/size-ratio assessment is pending.
- Exact next action: player evaluates field, actors, and empty-space proportions from the preview; then return to the separately pending joystick position/sensitivity decisions. Do not start those changes as part of the color slice.


## Arena horizontal widening — Chat implementation
Chat-side minimal implementation prepared for a wider logical stage while preserving the protected mobile input architecture.

Changes:
- logical stage width: 960 -> 1120;
- logical stage height remains 540;
- horizontal projection padding: 120 -> 200, preserving the original 720px actor projection span and adding 80px visible space on each side;
- Phaser remains Scale.NONE;
- outer DOM still performs contain/centering;
- pointer mapping still uses ARENA_STAGE.width / canvas rect width, so it follows the new logical width without an input-architecture change;
- center ellipse remains 280x170;
- simulation coordinates, battle logic, character stats, joystick logic, and AI handoff are unchanged.

Player/runtime smoke is still required after deploy; visual proportion is not pre-marked PASS.

## Arena 1120x540 widening verification (2026-09-29)
- Chat widening checkpoint `4d13321a660ea25a4cedddb96eb7a7857b4827fa`: stage/canvas/DOM width 1120, height 540, projection padding 200 (720px actor span), sand fill and center line track stage width, ellipse 280x170. No joystick/input architecture or battle logic change.
- Initial Actions run `36499677507` failed only because `tests/arenaProjection.test.js` still asserted 960 width and old projected x coordinates (59/61 pass); build/deploy skipped. Work changed only that stale test's expected width and x values in commit `23c4e759551c24d149203c2574ee0109e5921046`.
- Actions run `36500167030` for that commit: 61/61 tests PASS, Vite build PASS, Pages deploy PASS.
- Public browser smoke: stage visually wider with unchanged height, sand fill covers visible canvas, line spans the wider stage, center ellipse and actor markers preserve logical size, actor horizontal projection span remains 720 per code/test. No observed clipping, overflow, anomalous black borders, or camera shift. A1/A2/A3 selection highlight worked. Pointer drag on joystick moved selected A3 left; after release knob recentered and A3 moved right under AI. No browser pointer regression observed.
- Cloud browser pointer drag does not prove real iPhone touch. Real-device touch alignment and visual proportion remain PLAYER SMOKE PENDING. Do not label either as player verified.
- Exact next step: player opens https://hansen0318.github.io/shanhaijing-arena/ on device and checks widened field proportion and touch selection/joystick movement. No joystick position/sensitivity changes in this slice.


## Arena movement-range widening after player smoke
Player real-device smoke showed that the 1120x540 stage widened visually while the role projection/movement range still matched the old field.

Correction:
- shared simulation x bounds expand from 0..10 to -1.1..11.1;
- runtime projection uses the same -1.1..11.1 range;
- horizontal projection padding returns from 200 to 120, exposing the newly added left/right field as actual movement space;
- original spawn coordinates x=0 and x=10 remain visually near the same locations as before widening;
- all six actors share the same BattleSession arena bounds;
- AI moveToward is explicitly clamped to the same arena bounds;
- stage stays 1120x540; vertical bounds, joystick, input architecture, camera, combat stats, and zero-delay AI handoff are unchanged.

Player real-device smoke is required after deploy to verify both allies and enemies can occupy the added horizontal space.


## Arena full-width movement correction
Player real-device smoke showed the previous expanded bounds still rendered movement extremes near the horizontal line limits rather than near the visible sand-field edges.

Geometry correction:
- stage remains 1120x540;
- horizontal actor-safe screen margin becomes 32px on each side;
- shared simulation x bounds expand to approximately -2.3333333333..12.3333333333;
- mapping is chosen so the original spawn coordinates x=0 and x=10 remain at approximately screen x=200 and x=920;
- new movement extremes render at approximately screen x=32 and x=1088, allowing the actor circles to approach the sand-field edges without clipping;
- all six actors still share the same BattleSession arena bounds;
- enemy AI and ally/player movement remain governed by the same shared bounds;
- vertical range, joystick, input architecture, camera, combat logic, and zero-delay AI handoff are unchanged.

Player smoke after deploy should drag an ally to both horizontal extremes and observe enemies following into the same expanded space.


## Joystick feel / direction correction
Player reported three real-device symptoms after Arena widening:
- drag direction can disagree with the visible knob direction;
- joystick may require a second tap to acquire reliably;
- small drags feel insufficiently responsive.

Chat-side minimal correction keeps the protected input architecture:
- still Phaser GameObject setInteractive + scene pointermove/up;
- no document/canvas touch adapter;
- pointerToStage now reads TouchEvent changedTouches/touches client coordinates before falling back to mouse/pointer coordinates, avoiding double-scaling ambiguity on iPhone CSS-scaled canvas;
- visual joystick radius remains 54;
- acquisition radius increases to 76 without changing visual size;
- full input magnitude is reached at 30 logical px with dead zone 0.03;
- joystick center remains x=70, y=435 in this slice;
- AI handoff, camera, Arena bounds, battle logic, and viewport architecture unchanged.

Real-device player smoke is required for direction fidelity and acquisition feel.


## Ally tap-target tolerance
Player real-device smoke reported ally selection sometimes requires a second, more precise tap.

Minimal correction:
- ally visual marker radius remains 24;
- invisible ally selection hit radius increases to 36;
- enemy interaction remains unchanged/no-op;
- joystick, pointer mapping, camera, Arena geometry, AI handoff, and battle logic are unchanged.

Player smoke should confirm A1/A2/A3 are easier to select without noticeable ambiguous selection when allies are close.


## Player skill controls — Chat implementation
Chat implemented the first real Heavy / Special / Awakening control slice.

Combat:
- BattleSession exposes usePlayerAbility(instanceId, category) for Heavy/Special/Awakening only;
- player abilities use the existing startAbility -> resolveDirectDamage -> finishAbility pipeline;
- targeting reuses existing soft-target behavior: retain living current target, otherwise nearest living enemy;
- out-of-range, KO, invalid, or cooling abilities fail cleanly;
- cooldown remains the canonical ability slot state, not a UI-only timer.

Runtime UI:
- three circular skill buttons sit near the bottom-right edge, visually balancing the left joystick;
- Heavy and Special use 42px radius; Awakening uses 50px radius;
- current placeholders are H / S / A; final art can replace labels later without changing layout;
- ready state uses normal color;
- cooldown/disabled state dims the button/icon;
- remaining whole seconds render over the button;
- outer radial ring renders the same cooldown state's remaining fraction and disappears/shrinks with the timer;
- cooldown completion restores normal color/full ready ring;
- button state always follows the currently selected living ally.

Input:
- Phaser Scale.NONE and current protected mobile input path remain unchanged;
- activePointers is increased to 4 so joystick + skill presses can coexist for multitouch;
- no touch adapter or pointer-coordinate architecture change.

Automated player-ability tests were added for real damage/cooldown, cooldown rejection, and out-of-range rejection.

Remaining requirement after CI/deploy: real-device smoke for multitouch joystick+skill, button placement, cooldown readability, and correct selected-character binding.


## Battle start / manual skill ownership correction
Player clarified the intended control contract after first skill-button smoke:

- every round has a 5-second pre-battle countdown;
- during countdown, all six actors are frozen and no skill may be used;
- after countdown, untouched actors run fully automatic AI;
- touching/holding the selected ally's joystick establishes player ownership even if the stick vector is centered or inside the dead zone;
- while joystick is held, that ally's AI cannot auto-cast Heavy/Special/Awakening;
- skill cooldown reaching zero means READY only; while player ownership is held it must stay ready until the player presses it;
- releasing the joystick ends player ownership immediately and AI resumes full automatic movement/ability use on the next simulation step;
- each ally owns independent abilityState/cooldowns; switching A1/A2/A3 reads that ally's own slots;
- Heavy/Special/Awakening layout spacing was widened to prevent cooldown-ring overlap.

Chat added tests for joystick-hold AI suppression, independent ally cooldowns, ready-state persistence under manual control, and AI auto-cast resumption after release.


## Manual skill immediate-cast rule
Player smoke showed manual skill buttons were blocked at battle start because the shared ability start check required the target to already be inside the same range used by AI.

Canonical split:
- AI keeps the existing approach/range behavior and may only cast after entering ability range;
- player manual Heavy/Special/Awakening may cast immediately after the 5-second battle countdown if the selected ally is alive, the slot is ready, and a living target exists;
- manual cast uses the existing soft target selection but bypasses the AI range gate;
- manual cast still uses the same damage/cooldown pipeline;
- pressing a manual skill registers player input for that instant; with zero-delay handoff, AI may resume next simulation step when joystick is not held.

This is a control-rule difference, not a second combat implementation.


## Air-cast + nearest-target + continuous runtime sandbox
Player clarified the next control/testing contract:

Manual skill cast:
- after the 5-second countdown, a selected living ally may press Heavy/Special/Awakening immediately when the slot is ready;
- manual cast does not require a target and may visibly cast into empty space;
- if the nearest living target is inside the skill's real range, normal damage applies;
- if the target is outside real hit range, the skill still casts and enters cooldown but deals no remote damage;
- AI still requires range before auto-casting.

AI targeting:
- both allied and enemy AI now reevaluate the currently nearest living opponent on each decision;
- moving one side closer to a different opponent can change the target;
- this applies symmetrically to all six actors.

Runtime test sandbox:
- the public runtime fixture uses very high HP and a 24-hour maxSeconds value so the prototype does not stop during ordinary manual testing;
- canonical deterministic/headless battle rules, including the formal 90-second limit and normal HP/balance fixture, remain unchanged.


## Continuous nearest-opponent pursuit invariant
Player clarified the intended AI movement contract:

- all uncontrolled allies and all enemies continuously reevaluate the nearest living opponent;
- manual control of one allied actor must not pause AI movement for the other five actors;
- while the nearest opponent is outside usable attack range, AI must keep moving toward that opponent every simulation step;
- AI may hold position only when the nearest opponent is already inside attack range and the actor is attacking / waiting for its next attack cadence;
- if that opponent moves back outside range, pursuit resumes on the next decision;
- if another opponent becomes nearer, target switches immediately.

Regression tests now cover enemy pursuit while one ally is manually controlled, allied pursuit while another ally is manual, and resuming pursuit when a target leaves range.


## Pursuit while casting
Player device smoke showed that nearest-target retargeting existed, but movement still appeared to stop too early.

Root cause:
- AI intent was exclusive: either move OR ability.
- Entering a longer-range Heavy/Special/Awakening range produced an ability intent and suppressed movement even while still far from the opponent.

Correction:
- Basic attack range is now the pursuit stop distance for the M0 prototype.
- If the nearest opponent is outside Basic range, AI keeps moving toward it every simulation step.
- Heavy/Special/Awakening may be cast while that pursuit movement is happening.
- Once the nearest opponent is inside Basic range, AI may hold position and attack.
- If the nearest opponent changes, pursuit immediately follows the new nearest target.
- Manual joystick ownership remains unchanged; releasing returns to this pursuit behavior immediately.

This applies symmetrically to allied and enemy AI.


## Close engage-distance correction
Player smoke still showed AI failing to follow a nearby manually moved opponent.

Exact root cause:
- ranged skills had been changed to pursue while casting;
- Basic ability intents still hard-coded pursue=false;
- therefore entering Basic range (~1.8 simulation units) still stopped movement too early.

Correction:
- pursuit stop distance is now independent from all ability ranges;
- M0 uses AI_ENGAGE_DISTANCE = 0.75;
- outside 0.75, AI keeps moving toward the currently nearest living opponent even when Basic/Heavy/Special/Awakening are being used;
- inside 0.75, AI may stop and attack;
- moveToward now respects this stop distance instead of moving actor centers into each other;
- applies symmetrically to allied and enemy AI.

Regression coverage includes being inside Basic range but outside engage distance, and an enemy following a manually controlled nearest ally.


## Multi-chaser pursuit regression
Player clarified that pursuit is not one-to-one:
- one ally may be pursued by two or three enemy AI actors at the same time;
- one enemy may be pursued by two or three allied AI actors at the same time;
- there is no target reservation or exclusive pairing;
- each AI independently chooses its nearest living opponent and may share that target with teammates.

Chat added direct BattleSession regressions for two enemies simultaneously pursuing one nearest ally and two allies simultaneously pursuing one nearest enemy. If these pass but device behavior differs, investigate runtime geometry/engage-distance presentation rather than adding target reservation logic.


## Near-overlap engage distance correction
Player screenshot confirmed that the previous M0 engage distance (0.75 simulation units) stopped pursuit while actor circles were merely adjacent.

Updated rule:
- AI_ENGAGE_DISTANCE reduced from 0.75 to 0.20 simulation units;
- actors continue pursuing until their centers are visually very close / nearly overlapping;
- ability ranges remain independent and do not stop pursuit;
- multi-chaser targeting remains nonexclusive;
- applies symmetrically to allied and enemy AI.

Regression coverage now checks that the former ~edge-touch distance still pursues and only near-overlap distance permits stopping.


## Skill-driven combat spacing foundation
Basic / Heavy / Special / Awakening remain slot names only; they do not imply melee or ranged behavior.

Ability definitions now support an optional range profile:
- minRange: if a Ready skill's target is closer than this, AI retreats;
- preferredRange: desired spacing used while approaching/retreating;
- maxRange: maximum cast/hit range;
- legacy range remains an alias of maxRange for compatibility;
- legacy abilities without preferredRange retain the prior near-overlap pursuit behavior.

AI planning:
- evaluates the highest-priority Ready non-Basic skill first;
- too close for that profiled skill => retreat toward preferredRange;
- too far => approach toward preferredRange;
- inside minRange..maxRange => cast;
- after the skill enters cooldown, another Ready skill can drive spacing on following decisions;
- Basic is evaluated as the fallback using its own independent profile.

Manual player casts keep the existing air-cast behavior and are not blocked by AI spacing decisions.

The demo fixture now deliberately exercises mixed ranges:
- Basic close;
- Heavy close;
- Special medium;
- Awakening longer-range.
These are prototype fixture values, not final character balance.


## Basic fallback + prototype cooldowns
Player clarified that Basic is the unlimited automatic fallback, not a cooldown button.

Locked prototype behavior:
- Basic has no cooldown button and remains automatic/unlimited, paced only by attack cadence;
- if Heavy/Special/Awakening are all cooling down, AI must not idle;
- AI continues approaching the nearest opponent using the Basic range profile and attacks once Basic is usable;
- Heavy / Special / Awakening remain the three manual buttons in the current M0 prototype;
- prototype cooldowns are now Heavy 5s, Special 10s, Awakening 15s.

Awakening progression/unlock is not implemented in M0 yet; future progression may gate the slot without changing the combat API.


## Playable graybox integration checkpoint (2026-09-29)
- Portrait cards at upper left are the selection entry for A1/A2/A3; actor markers retain selected highlight but no longer receive selection clicks. Selected card scales 1.12 with white frame. KO cards are dim and cannot select a KO ally.
- Each card has centered white current/max HP over a red bar; upper center shows sum of enemy HP, upper right countdown timer. Both bind directly to BattleSession snapshots.
- Public runtime fixture now has finite 90-second rounds and moderate test HP, retaining the canonical headless fixture and 90-second HP% tie rule. Existing AI spacing, shared targeting, no-reservation pursuit, Basic fallback, joystick ownership, and protected 1120x540 input/viewport code remain in place.
- Shared BattleSession cast events drive distinct lightweight local/ranged placeholder Basic, Heavy, Special, Awakening feedback, including a non-damaging out-of-range manual air-cast. Result text and clickable Restart are displayed after resolution.
- Regression added for HP data, timer, finite/replayable runtime, cast events, VFX direction/range clamp including overlapping caster, countdown freeze, and future Awakening unlockTier metadata. Full local suite: 107/107 PASS; Vite build PASS. Public Pages and player device smoke still pending.

## Public Pages engineering smoke — graybox (2026-09-29)
- Source `64ba9652b17654d49c6b31e0df9f6222cd807121`, Actions run #212: Test, Build, Deploy Pages all PASS. Public URL: https://hansen0318.github.io/shanhaijing-arena/ .
- Browser observed 5→1 countdown with six actors frozen; after battle starts, all six converge and automatically cast. Portrait A1/A2/A3 selection enlarges/highlights the card; clicking an actor marker did not steal selection. Upper enemy HP and all three ally HP bars/numbers decrease; timer counts down from 01:30.
- At battle start, manual Special was pressed while enemies were far: selected cooldown displayed 10, enemy team HP stayed 720/720. Basic/Heavy/Special/Awakening placeholder effects were visible during battle. The default round reached VICTORY, and RESTART reset HP/timer and returned to 5 countdown without page reload.
- `?fixture=ko`: A2 started selected, then displayed 0/260 and dimmed; selection automatically moved to A1. Clicking A2's KO portrait left A1 selected. Joystick pointer drag still moved the knob. No blocking page-origin console error; recorded console errors came only from the browser extension.
- No real iPhone multitouch or player visual/game feel acceptance was performed. **ENGINEERING PASS / PLAYER SMOKE PENDING**. Do not claim real-device touch or visual readability PASS.
