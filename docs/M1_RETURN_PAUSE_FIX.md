# M1 return layout / Pause / Exit feedback release

ENGINEERING PASS / PLAYER SMOKE PENDING

## Scope and evidence
- Active branch/PR retained: feat/m0-combat-core-20260927 / #1.
- Source: 0d590cb936e109110dc79aa1b435144d4ef676fc.
- Local equivalent commits: 13a316b + 7700375. Authenticated non-force git-object API pushed the same tested file tree. Remote source SHA is authoritative.
- Targeted: 21/21. Full: 144/144 via npm test -- --test-isolation=none; build PASS. Red tests first demonstrated missing cancellation, frozen simulation/countdown and shared viewport behavior. Real Phaser TweenManager/Tween regression also failed old pauseAll/resumeAll and passed the repaired clock path.
- Actions: https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36692992427 — Test, Build and Pages deploy success.
- Public build: https://hansen0318.github.io/shanhaijing-arena/ .
- Review: two findings repaired before release (paused VFX wall-time catch-up; asynchronous boot controls); independent re-review clean.

## Changes
The former inline viewport updater adjusted only Arena and ran on browser events. Campaign stayed attached to the layout viewport, with no route-settlement resync or scroll reset. The unified updater now sizes both surfaces from visualViewport, including offsets, and remeasures after route render/start/return, pageshow, orientation and viewport changes. Settlement work is cancelled and replaced across routes; Phaser refreshes bounds/display scale against the current canvas. Logical size 1120x540 and Scale.NONE remain intact.

BACK is the only changed existing text. New accessible icon buttons sit to the left of the right portrait column at the upper right. Pause blocks scene update and gameplay input, clears a held joystick, freezes the scene clock and VFX. Resume rebases Phaser tween time at zero global scale before restoring playback speed, preserving remaining effects and preventing catch-up. Buttons are unavailable until create; pending initial boot only starts a still-selected battle. Controls hide on normal result. Exit from running/paused battle returns the current preview via the controller without calling recordVictory/storage. Previously cleared progress is retained.

## Public browser smoke
- Fresh Chapter 1 → 1-1 preview → START; BACK text only; Pause and X visible, without portrait overlap.
- Live battle Pause: timer 01:27, positions/HP and CDs 5/9/14 froze. Repeated screenshot sampling produced byte-identical images while paused.
- Paused A1 portrait click, joystick drag and Heavy click did not change battle/selection/CD.
- Resume: timer 01:24, CDs 2/6/11, AI movement/HP updates; icon/accessible label returned to Pause.
- Exit before victory: same Chapter 1 / 1-1 preview, no CLEAR, 1-2 locked.
- Exit while countdown paused also returned safely; next entry started with fresh countdown and usable controls.
- Three repeated START → Exit → Preview → BACK → Chapters → Chapter 1 cycles: Campaign bounds remained x0/y0/1363x936 and scrollTop 0 throughout; preview remained 1-1.
- Refresh after unfinished exits still showed 1-1 available, 1-2 locked.
- No page-origin runtime/console error observed. Browser extension metadata errors are unrelated.
- Cloud live frames required active screenshot sampling. No simulation time or outcome was injected/accelerated.

## Automated-only coverage and limits
- Safari visualViewport offset/size changes without resize; settlement cancellation and pageshow; no-visualViewport fallback supported by implementation.
- Exact scene simulation/ability freeze, paused countdown, accumulator preservation and stale joystick release.
- Real installed Phaser VFX clock contract on pause/resume.
- Replay early Exit preserves prior clear/unlock/save; late result after cancellation ignored; normal Victory result/Next/Retry/Exit retained.
- Cloud browser smoke is desktop Chrome, not real iPhone Safari/Chrome. Intermittent iPhone-specific offset reproduction and real touch/multitouch acceptance remain pending. Do not claim the original device symptom was reproduced in cloud.
- Placeholder encounters and local-only save limitations from M1 remain. No confirmation modal was added; X exits immediately as requested.
- Vite retains the existing large Phaser bundle warning.

## Modified files
- index.html
- src/main.js
- src/campaign/controller.js
- src/campaign/view.js
- src/campaign/style.css
- src/runtime/ArenaScene.js
- src/runtime/battleControls.js
- src/runtime/viewportSync.js
- tests/campaignNavigation.test.js
- tests/battlePause.test.js
- tests/battleTweenPause.test.js
- tests/viewportSync.test.js
- WORK_PROGRESS.md
- docs/STATE.md
- docs/M1_RETURN_PAUSE_FIX.md

## Next action
Player iPhone landscape: several Battle/Exit/Preview/BACK returns; Pause/Resume with timer and CD; running and paused Exit; confirm touch/portrait spacing. No five-stage grind or next milestone. Stop here.
