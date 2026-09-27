# AGENTS.md

## Purpose
This repository is a new game project: **Shanhaijing Arena**. It is independent from `shanhaijing-td`.

These rules are permanent for substantial Chat / Work / Codex development unless the user explicitly changes them.

## 1. Operating model
- **User / Product Owner**: final decisions and acceptance.
- **Chat**: game design, visual direction, specifications, defect analysis, acceptance criteria, bounded repo edits that can be independently verified.
- **Work**: substantial implementation, integration, executable test/debug loops, browser/runtime smoke, optimization, Git operations, deployment.
- **GitHub**: single source of truth. Conversation memory is not authoritative.

## 2. Chat-first delegation
Before delegating to Work, Chat must complete every safe, order-independent task it can reliably do first.

Typical Chat-owned work:
- requirements/specification;
- GitHub inspection;
- architecture decisions;
- documentation/hard-rule updates;
- root-cause narrowing;
- bounded deterministic code changes with independent verification;
- asset direction and approved visual specifications.

Work is preferred when the remaining task materially requires:
- a checked-out repository and iterative multi-file implementation;
- dependency installation/build tooling;
- executable TDD/debug loops;
- browser/runtime/devtools smoke;
- long-running integration/optimization;
- release/deployment verification.

Do not send Work to repeat analysis or documentation already completed by Chat.

## 3. Mandatory zero-context bootstrap
A new Chat / Work / Codex session must be able to continue without the player reconstructing the previous conversation.

Before substantial work:
1. inspect/sync latest remote `main`;
2. read this `AGENTS.md`;
3. read the **CURRENT HANDOFF POINTER** at the top of `WORK_PROGRESS.md`;
4. read `docs/STATE.md`;
5. read only the system specs relevant to the next action;
6. inspect any recorded active feature branch / PR / safe checkpoint;
7. continue from the first unfinished item only.

Do not ask the player to restate prior decisions unless canonical repo documents are genuinely missing or contradictory.

## 4. Recovery: never redo completed work
After interruption or when starting a new Work:
1. check whether the recorded feature branch exists remotely;
2. inspect branch / HEAD / status / diff;
3. recover the latest safe checkpoint;
4. reuse recorded PASS evidence unless a later change can materially invalidate it;
5. continue from the first unfinished item only.

Do not reimplement committed/pushed work merely because the session is new.

## 5. Safe push checkpoints are mandatory
For multi-step or long-running work, do not keep substantial completed work only in a local workspace.

Create `commit + push` checkpoints when applicable:
1. design/spec or preflight completed;
2. deterministic/core implementation completed;
3. major integration slice completed;
4. before long browser/runtime smoke;
5. whenever session/token/environment interruption risk increases.

A checkpoint is recoverability evidence, **not** a completion/PASS claim.

## 6. Session/token exhaustion procedure
If a Work/Codex session may end before completion:
- stop starting new scope;
- preserve the coherent current state;
- update `WORK_PROGRESS.md` with:
  - active branch;
  - latest safe checkpoint SHA;
  - completed work;
  - remaining work;
  - tests/checks actually run and results;
  - known failures/root cause;
  - exact next step;
- commit/push that state before stopping whenever the environment permits.

If push is impossible, explicitly report that work may exist only locally. Recovery must locate and push it before new development continues.

## 7. Progress documentation is mandatory
`WORK_PROGRESS.md` is the compact project handoff record.
`docs/STATE.md` is the canonical milestone/scope state.

After every meaningful implementation slice, update them before handing off.

At minimum record:
- current milestone;
- current branch / PR;
- completed items;
- locked decisions affected;
- pending items;
- actual verification results;
- known blockers/defects;
- exact next action.

A stale progress/state file is a handoff defect.

## 8. Decision hierarchy
1. Latest explicit user decision.
2. Accepted ADRs / locked decisions in `docs/decisions/`.
3. Current canonical system specs under `docs/`.
4. Existing implementation.

If implementation conflicts with a higher-priority source, stop and report the conflict instead of inventing a new rule.

## 9. Scope discipline
Current milestone is defined in `docs/STATE.md`.

For M0, do not add campaign UI, progression, shards, Tier upgrades, story content, or a large roster unless `docs/STATE.md` explicitly moves the milestone forward.

Avoid unrelated refactors during feature work.

## 10. Engineering architecture rules
- This is a new game architecture; do **not** port tower-defense gameplay assumptions or code.
- Keep systems modular: Character, Controller, Ability, Targeting, Movement, Status, Camera, Team, Battle.
- Player input overrides AI immediately.
- After 2.0 seconds without valid combat input, full AI control resumes for the selected character.
- Selected character, camera target, and skill HUD remain unchanged during that handoff.
- No AUTO/MANUAL indicator is shown.
- Basic attack is automatic and has no dedicated player button in v1.
- Prefer data-driven character/ability definitions over hard-coded per-character logic.
- AI and player input must feed the same shared character/ability systems; do not create duplicated manual/AI combat engines.
- Add machine-checkable tests for deterministic rules where practical.

## 11. Verification vs player smoke
Keep engineering verification and player acceptance separate.

Use precise status labels:
- **ENGINEERING PASS**: all required engineering checks that the executor owns have fresh successful evidence.
- **ENGINEERING PASS / PLAYER SMOKE PENDING**: engineering checks pass and only an explicitly delegated player/device smoke remains.
- **PASS / PLAYER VERIFIED**: required player smoke has also been confirmed.
- **FAIL / INCOMPLETE**: a required engineering check failed or required executor-owned verification could not be completed.
- **RELEASE BLOCKED**: engineering passed but merge/deploy cannot be completed due to a concrete blocker.

Never claim player-verified visual success before the player actually confirms it.

## 12. Quality gates
Before merge/release of M0:
- targeted tests pass;
- full test/check pass;
- landscape mobile runtime smoke passes at representative phone sizes;
- 3v3 battle can complete without player input;
- manual override and 2s AI-resume work;
- KO, team switching, victory/defeat work;
- type counter rules are correct;
- no regression in locked combat rules.

Full browser/runtime smoke is required when the changed scope affects rendering, controls, camera, timing, or interaction. Pure framework-independent deterministic helpers may use targeted automated verification until they are integrated.

## 13. Default delivery flow
Unless the user explicitly requests feature-branch-only / no-merge / no-deploy:
1. implement on a safe feature branch;
2. create safe pushed checkpoints;
3. run required targeted/regression checks;
4. perform whole-branch review;
5. merge verified work to `main`;
6. deploy/release if the project has a configured public build pipeline;
7. verify the deployed build for the changed scope;
8. update `docs/STATE.md` and `WORK_PROGRESS.md` with release state and next action.

If the project does not yet have deployment configured, record that fact; do not invent a release claim.

## 14. Change traceability
For non-trivial changes identify:
- requirement/decision affected;
- files/systems changed;
- tests added/updated;
- known risks.

## 15. Art / asset rules
- Mobile readability over fine detail.
- Characters are anthropomorphic Shanhaijing creatures: human-readable combat silhouettes with preserved creature-defining traits.
- Prototype assets may be placeholders.
- Do not produce final roster art before the combat prototype passes.
- Approved production art must not be regenerated/restyled merely because a new session begins.
