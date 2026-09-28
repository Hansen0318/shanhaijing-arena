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
