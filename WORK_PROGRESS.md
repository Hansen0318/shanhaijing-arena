# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Preview URL: https://hansen0318.github.io/shanhaijing-arena/
- KO smoke URL: https://hansen0318.github.io/shanhaijing-arena/?fixture=ko
- Current slice: **movement joystick + shared player override input**
- Current status: **PLAYER-CONFIRMED WORKING BASELINE RESTORED; RUNTIME PACING PASS; AI RESUME DELAY SET TO 0s / IMMEDIATE**
- Latest slice: **Arena 1120x540 horizontal widening — CI/build/Pages and desktop browser pointer smoke PASS; PLAYER VISUAL PROPORTION / REAL-DEVICE TOUCH SMOKE PENDING**. Source test-fix commit `23c4e759551c24d149203c2574ee0109e5921046`; [Pages run 36500167030](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36500167030): 61/61 Test, Build, Deploy success.
- Next exact step: player checks widened proportion and touch selection/joystick on the public preview; do not adjust joystick or other gameplay in this slice.

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
