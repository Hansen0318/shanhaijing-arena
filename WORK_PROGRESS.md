# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Status: **ENGINEERING PASS / PLAYER SMOKE PENDING** for first player interaction
- Latest completed verified slice: Pages preview deployment and bounded default + KO browser smoke
- Runtime code deployed from `a4a757b05d80ec0887fa49ff6753d691e90c9a79`; following documentation-only commits do not change runtime
- Recovery rule: do **not** recreate deterministic core, Character, Ability, AI, headless simulation, renderer bootstrap, selection, Pages workflow, or KO fixture
- Preview URL: https://hansen0318.github.io/shanhaijing-arena/
- KO smoke URL: https://hansen0318.github.io/shanhaijing-arena/?fixture=ko
- Next exact step: **movement joystick + shared player override input** (new implementation slice); do not redo the browser smoke unless a later change affects it
- Canonical state: `docs/STATE.md`

## Current status
Pages Source is GitHub Actions. The `github-pages` environment has an explicit branch rule for `feat/m0-combat-core-20260927` alongside `main`. Workflow YAML indentation was repaired at `a4a757b`. [M0 Pages Preview run #7, retry 2](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36362372635) completed:
- Install: PASS
- Test: PASS
- Build: PASS
- Configure Pages and upload artifact: PASS
- Deploy Pages: PASS; successful deployment URL is the preview URL above

Bounded browser smoke on that HTTPS deployment:
- Default: Phaser scene booted with six visible actor markers. Clicking A1, A3, A2 changed the white selection outline; camera moved toward each selected actor. Clicking an enemy left A2 selected. Replay advanced to its later layout. No blocking application console/runtime errors.
- `?fixture=ko`: A2 initially had the selection outline; after its scripted KO, A2 became faded, selection moved to living A1 and camera retargeted. No blocking application console/runtime errors.
- Browser extension emitted a metadata error from its own `chrome-extension://` script; no page-origin blocking error was observed.
- Visual observation: actor labels and some markers overlap in later replay frames. This prototype readability note belongs to focused player smoke or a later visual pass; it did not prevent this interaction gate.
- Player device/feel acceptance: PENDING.

## Repository-side preview changes already complete
- `vite.config.js`: base path `/shanhaijing-arena/`
- `.github/workflows/m0-pages-preview.yml`: test/build/upload/deploy workflow with corrected upload indentation
- deterministic KO smoke fixture via `?fixture=ko`
- first player interaction code already present

## Player smoke
Use the default preview URL on a landscape phone to check only six placeholders, A1/A2/A3 selection outline, camera comfort, enemy tap behavior and replay. Use the KO URL to check fallback feel. Report any issue with device/browser and a screenshot if useful.

## Browser smoke gate
Default:
- scene boot
- 6 actors visible
- a1/a2/a3 selection/highlight
- camera retarget
- enemy click no-op
- replay continues
- no blocking console/runtime error

KO fixture:
- a2 initially selected
- a2 reaches KO fixture
- fallback selects living ally
- camera follows fallback
- no blocking runtime/console error

The bounded engineering gate passed. Next implementation is `movement joystick + shared player override input`; player acceptance remains separately pending.
