# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Preview URL: https://hansen0318.github.io/shanhaijing-arena/
- KO smoke URL: https://hansen0318.github.io/shanhaijing-arena/?fixture=ko
- Current slice: **movement joystick + shared player override input**
- Current status: **PLAYER-CONFIRMED WORKING BASELINE RESTORED; RUNTIME PACING PASS; AI RESUME TUNED TO 1.0s**

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
Player judged 2.0s AI resume too slow.

Shared `ControlHandoff` is now:
- manual input overrides immediately;
- after **1.0s** without valid player combat input, full AI resumes;
- selected character remains selected;
- no AUTO/MANUAL UI.

This is a shared rule for joystick and future player skill input, not a runtime-only exception.

## Next gate
After automated tests/build/deploy PASS, player smoke:
1. select A1/A2/A3;
2. move selected ally;
3. release joystick;
4. observe AI resume at about 1 second;
5. confirm camera/viewport remain unchanged.

After PASS, next isolated feel change can be joystick position only.
