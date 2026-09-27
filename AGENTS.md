# AGENTS.md

## Purpose
This repository is a new game project: **Shanhaijing Arena**. It is independent from `shanhaijing-td`.

## Operating model
- **User / Product Owner**: final decisions and acceptance.
- **Chat**: game design, visual direction, specifications, defect analysis, acceptance criteria.
- **Work**: implementation, integration, automated tests, runtime smoke, optimization, Git operations, deployment.
- **GitHub**: single source of truth. Chat memory is not authoritative.

## Onboarding protocol
Before changing code or assets:
1. Read this file.
2. Read `WORK_PROGRESS.md`.
3. Read `docs/STATE.md`.
4. Read the specifications relevant to the task.
5. Summarize current state, locked decisions, pending work, and next action.
6. Do not redo completed/approved work.

## Scope discipline
Current milestone is **Combat Prototype**.
Do not add campaign UI, progression, shards, Tier upgrades, story content, or a large roster unless `docs/STATE.md` explicitly moves the milestone forward.

## Decision hierarchy
1. Latest explicit user decision.
2. `docs/decisions/` ADRs and locked decisions.
3. Current system specs in `docs/`.
4. Existing implementation.

If implementation conflicts with specs, stop and report the conflict instead of inventing a new rule.

## Engineering rules
- New game architecture only; do **not** port tower-defense gameplay assumptions or code.
- Keep systems modular: Character, Controller, Ability, Targeting, Movement, Status, Camera, Team, Battle.
- Player input overrides AI immediately.
- After 2.0 seconds without valid combat input, full AI control resumes for the selected character.
- Selected character, camera target, and skill HUD remain unchanged during that handoff.
- No AUTO/MANUAL indicator is shown.
- Basic attack is automatic and has no dedicated player button in v1.
- Prefer data-driven character/ability definitions over hard-coded per-character logic.
- Add machine-checkable tests for deterministic rules where practical.
- Avoid unrelated refactors during feature work.

## Quality gates
Before merge/release:
- targeted tests pass;
- full test/check pass;
- landscape mobile smoke passes at minimum representative widths;
- 3v3 battle can complete without player input;
- manual override and 2s AI-resume work;
- KO, team switching, victory/defeat work;
- no regression in locked combat rules.

## Change traceability
For non-trivial changes, identify:
- requirement/decision affected;
- files/systems changed;
- tests added/updated;
- known risks.

## Art / asset rules
- Mobile readability over fine detail.
- Characters are anthropomorphic Shanhaijing creatures: human-readable combat silhouettes with preserved creature-defining traits.
- Prototype assets may be placeholders.
- Do not produce final roster art before the combat prototype passes.
