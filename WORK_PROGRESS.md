# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Current status: **IOS SAFARI DIRECT-LANDSCAPE OFFSET FIXED IN DOM HOST — AUTO VERIFY / PLAYER SMOKE PENDING**
- Preview URL: https://hansen0318.github.io/shanhaijing-arena/
- KO smoke URL: https://hansen0318.github.io/shanhaijing-arena/?fixture=ko

## Reproduced player behavior
- portrait load -> rotate to landscape: composition can be correct;
- direct landscape reload: fixed 16:9 stage can be vertically offset/clipped;
- both default and KO URLs show the same issue.

This proves the internal Arena/camera is not the remaining problem. The discrepancy is between iPhone Safari's layout viewport used by CSS centering and its actual visible `visualViewport` during direct landscape load.

## Fix
Internal game remains unchanged:
- Phaser surface: immutable 960x540;
- Scale Manager: NONE;
- camera: fixed;
- no startFollow;
- no runtime Arena reprojection.

Outer host only:
- `#game` is positioned explicitly from `window.visualViewport.width/height/offsetLeft/offsetTop`;
- one uniform contain scale is calculated from 960x540;
- host is centered inside the actual visible browser viewport;
- host resyncs on pageshow, resize, orientationchange and visualViewport resize/scroll;
- short post-load resyncs handle Safari chrome settling after direct landscape refresh.

## Expected
- direct landscape reload and portrait->landscape transition produce the same centered composition;
- portrait shows the exact same 16:9 stage scaled down;
- no crop, no camera movement, no actor rearrangement.

## Required verification
- tests PASS;
- build PASS;
- Pages deploy PASS;
- player repeats direct landscape reload several times;
- player repeats portrait -> landscape -> reload;
- composition remains identical apart from uniform scale.

## Gate
After PASS, proceed to `movement joystick + shared player override input`.
