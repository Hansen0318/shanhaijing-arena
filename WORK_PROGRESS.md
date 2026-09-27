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
- Exact remaining external blocker: GitHub Pages site is not yet enabled for this repository; Actions cannot create it because the connected integration receives `Resource not accessible by integration`
- Next exact step: enable GitHub Pages for this repository with **Source: GitHub Actions**, then rerun the existing Pages workflow and perform bounded browser smoke on default + KO fixture URLs
- Canonical state: `docs/STATE.md`

## Current status
Chat has completed all repository-side work that can be done safely without an interactive GitHub settings/browser session.

The Pages workflow itself executes install/test/build successfully. The latest observed Actions failure occurs only at Pages site creation:
- Install: PASS
- Test: PASS
- Build: PASS
- Configure Pages: FAIL because the repository Pages site does not exist and the GitHub integration cannot create it
- GitHub error: `Resource not accessible by integration`

This is an account/repository settings permission boundary, not an application build failure.

## Repository-side preview changes already complete
- `vite.config.js`: base path `/shanhaijing-arena/`
- `.github/workflows/m0-pages-preview.yml`: test/build/upload/deploy workflow; no longer attempts privileged automatic Pages enablement
- deterministic KO smoke fixture via `?fixture=ko`
- first player interaction code already present

## Remaining task that Chat cannot perform
An interactive GitHub settings/browser capability must:
1. open repository Settings -> Pages;
2. set Build and deployment Source to **GitHub Actions** / otherwise enable the Pages site;
3. rerun the existing M0 Pages Preview workflow if it does not trigger automatically;
4. obtain the resulting HTTPS Pages URL;
5. browser-smoke default URL and `?fixture=ko`.

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
