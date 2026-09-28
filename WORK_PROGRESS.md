# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Fixed Arena / iPhone Safari viewport: **ENGINEERING PASS / PLAYER SMOKE PASS**
- Current slice: **movement joystick + shared player override input**
- Current status: **CODE + CORE TESTS COMPLETE; LATEST RUNTIME BUILD/DEPLOY + INTERACTIVE MOBILE SMOKE PENDING**
- Preview URL: https://hansen0318.github.io/shanhaijing-arena/
- KO smoke URL: https://hansen0318.github.io/shanhaijing-arena/?fixture=ko
- Recovery rule: do not restore camera follow, dynamic Arena projection, snapshot-only runtime movement, or duplicate player/AI ownership state

## Chat-completed joystick implementation

### Shared live combat session
Added `src/combat/battleSession.js`:
- same AI, Ability, damage, targeting, cooldown, Character, and ControlHandoff modules as headless combat;
- step-based live battle;
- actual player movement changes CharacterState x/y;
- player vector clamped to magnitude 1;
- movement clamped to Arena x 0..10 / y -2..2;
- selected actor AI suppressed while shared ControlHandoff reports player ownership;
- 2.0s AI resume remains the existing ControlHandoff rule.

### Headless unification
`simulateHeadless3v3` now wraps the same BattleSession.
This prevents the browser runtime and deterministic tests from drifting into separate combat engines.

### Automated tests
Added `tests/battleSession.test.js`:
- immediate player ownership;
- real player movement;
- Arena bounds clamp;
- dead-zone input does not refresh ownership;
- full AI resumes after 2.0 seconds.

A completed Actions run after BattleSession + tests + demo-session integration reported:
- **53 / 53 tests PASS**
- **0 fail**
- Vite build PASS
- Pages deploy PASS

### Runtime joystick
`ArenaScene` now:
- creates a live Demo BattleSession instead of playing precomputed snapshots;
- renders lower-left base + knob;
- maps native client pointer coordinates back to the fixed 960x540 logical stage;
- moves whichever living ally is selected;
- clears previous selected actor movement when switching;
- keeps the accepted fixed camera and viewport architecture untouched;
- keeps KO fixture via deterministic forced A2 KO in runtime.

## Current gate
The latest ArenaScene joystick commit still requires its final automated build/deploy result plus real browser/mobile interaction smoke.

Do not broaden into skill buttons yet.

## Required interactive smoke
Default:
- fixed Arena/viewport remains stable;
- lower-left joystick visible;
- A2 starts selected;
- joystick moves A2 in actual Arena position;
- direction follows finger;
- switching A1/A3 changes joystick-controlled actor;
- camera never moves;
- release stops manual movement;
- after ~2.0s AI visibly resumes;
- other actors continue AI;
- no blocking page-origin error.

KO:
- A2 forced KO;
- selection falls back to living ally;
- camera remains fixed;
- joystick controls fallback ally.

## If PASS
Mark joystick slice **ENGINEERING PASS / PLAYER SMOKE PASS**.
Next exact implementation: **skill controls (Heavy + Special + Awakening) using the same shared player override path**.
