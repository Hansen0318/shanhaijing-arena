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
- fixed 960x540 Phaser surface;
- `Phaser.Scale.NONE`;
- outer DOM performs visual contain/positioning;
- A1/A2/A3 use Phaser GameObject `setInteractive()`;
- joystick base uses Phaser GameObject input;
- joystick movement converts pointer client coordinates through canvas `getBoundingClientRect()` back to the fixed 960x540 stage.

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
