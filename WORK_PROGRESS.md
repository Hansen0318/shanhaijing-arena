# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Latest completed verified slice: deterministic M0 headless 3v3 simulation
- Latest completed Chat-first interaction slice: allied selection/camera/KO fallback
- Latest completed Chat-first preview unblock: Pages workflow, Pages base path, KO fixture, and workflow adjustment for pre-enabled Pages
- Recovery rule: do **not** recreate deterministic core, Character, Ability, AI, headless simulation, renderer bootstrap, ally selection, Pages workflow, or KO fixture
- Preview workflow: `.github/workflows/m0-pages-preview.yml`
- KO smoke mode: `?fixture=ko`
- Latest safe checkpoint: `a4a757b05d80ec0887fa49ff6753d691e90c9a79` (workflow YAML repair; deployment still blocked)
- Exact remaining external blocker: the `github-pages` environment permits deployments only from `main`; feature branch `feat/m0-combat-core-20260927` is rejected before the deploy job starts
- Next exact step: in Settings -> Environments -> `github-pages`, add **only** `feat/m0-combat-core-20260927` as an allowed deployment branch, then rerun failed deploy job from run `36362372635` and perform bounded browser smoke on default + KO fixture URLs
- Canonical state: `docs/STATE.md`

## Current status
The player enabled Pages with Source: GitHub Actions. A malformed indentation in the workflow upload step caused invalid runs with zero jobs; commit `a4a757b` repaired the YAML. The resulting workflow run [#7](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36362372635) built the site but its deploy job was rejected by the `github-pages` environment branch rule.
- Install: PASS (run #7)
- Test: PASS (run #7)
- Build: PASS (run #7)
- Configure Pages: PASS (run #7)
- Upload Pages artifact: PASS (run #7)
- Deploy: FAIL before steps; annotation: `Branch "feat/m0-combat-core-20260927" is not allowed to deploy to github-pages due to environment protection rules.`
- Environment policy read-only API: selected branches, one rule for `main`; no rule yet for the active feature branch
- Browser smoke: PENDING; no verified HTTPS preview URL

## Repository-side preview changes already complete
- `vite.config.js`: base path `/shanhaijing-arena/`
- `.github/workflows/m0-pages-preview.yml`: test/build/upload/deploy workflow; no longer attempts privileged automatic Pages enablement
- deterministic KO smoke fixture via `?fixture=ko`
- first player interaction code already present

## Remaining task that Chat cannot perform
An interactive GitHub settings/browser capability must:
1. in repository Settings -> Environments -> `github-pages`, keep the existing `main` rule and add selected branch `feat/m0-combat-core-20260927`;
2. rerun the failed deploy job from workflow run `36362372635`;
3. confirm deployment PASS and obtain its HTTPS Pages URL;
4. browser-smoke default URL and `?fixture=ko`.

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

Do **not** begin joystick before this gate passes.

If PASS:
- mark `ENGINEERING PASS / PLAYER SMOKE PENDING`
- retain the HTTPS preview URL for player use
- next exact step: `movement joystick + shared player override input`
