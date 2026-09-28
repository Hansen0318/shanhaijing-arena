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
- Latest visual-only slice: **Arena sand color A — ENGINEERING PASS / PLAYER SMOKE PENDING**; source commit `9b9fe641848a412e2b10e26493a73532ba4551bc`; [Pages run 36436079695](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36436079695): Test / Build / Deploy success; public preview visibly shows sand ground and dark markings. Player to assess field/actor/empty-space proportions on device; no geometry or controls changed.

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
