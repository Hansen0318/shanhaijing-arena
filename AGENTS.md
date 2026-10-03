# AGENTS.md

## Purpose
This repository is a new game project: **Shanhaijing Arena**. It is independent from `shanhaijing-td`.

These rules are permanent for substantial Chat / Work / Codex development unless the user explicitly changes them.

## 1. Operating model
- **User / Product Owner**: final decisions and acceptance.
- **Chat**: game design, visual direction, specifications, defect analysis, acceptance criteria, bounded repo edits that can be independently verified.
- **Work**: substantial implementation, integration, executable test/debug loops, browser/runtime smoke, optimization, Git operations, deployment.
- **GitHub**: single source of truth. Conversation memory is not authoritative.

## 2. Chat-first delegation / minimum Work scope
**Token/session efficiency is a hard rule.** Before delegating anything to Work, Chat must complete the maximum safe, order-independent scope it can reliably do with available GitHub, file, image, reasoning, and bounded-edit tools.

Typical Chat-owned work:
- requirements/specification and decision locking;
- GitHub inspection and state comparison;
- architecture decisions;
- documentation/hard-rule updates;
- root-cause narrowing;
- static/code review;
- asset inventory, visual direction, image/static inspection;
- bounded repository edits that can be independently verified without a full runtime;
- preparation of exact acceptance criteria and the smallest Work handoff.

Work receives **only the irreducible executable delta** that genuinely needs its environment, for example:
- checked-out repository + iterative multi-file implementation;
- dependency installation/build tooling;
- executable TDD/debug loops after substantial code changes;
- browser/runtime/devtools verification that cannot be delegated to the player;
- long-running integration/optimization;
- merge/deploy when Work owns a substantial implementation.

If a task mixes Chat-owned and Work-only parts, Chat finishes its part first and then hands Work only the unresolved engineering delta. Do not send Work to rediscover design, repeat documentation, redo static analysis, or execute broad checks merely for convenience.

## 3. Mandatory zero-context bootstrap
A new Chat / Work / Codex session must be able to continue without the player reconstructing the previous conversation.

Before substantial work:
1. inspect/sync latest remote `main`;
2. read this `AGENTS.md`;
3. read `docs/DEVELOPMENT_PLAYBOOK.md`;
4. read `docs/PROJECT_BOUNDARIES.md`;
5. read the **CURRENT HANDOFF POINTER** at the top of `WORK_PROGRESS.md`;
6. read `docs/STATE.md`;
7. read only the system specs relevant to the next action;
8. inspect any recorded active feature branch / PR / safe checkpoint;
9. continue from the first unfinished item only.

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
- `docs/PROJECT_BOUNDARIES.md` is mandatory and defines the contamination firewall.
- Keep systems modular: Character, Controller, Ability, Targeting, Movement, Status, Camera, Team, Battle.
- Player input overrides AI immediately.
- When valid manual combat input is released, full AI control resumes immediately (0s), per the accepted M0/M2 baseline.
- Selected character, camera target, and skill HUD remain unchanged during that handoff.
- No AUTO/MANUAL indicator is shown.
- Basic attack is automatic and has no dedicated player button in v1.
- Prefer data-driven character/ability definitions over hard-coded per-character logic.
- AI and player input must feed the same shared character/ability systems; do not create duplicated manual/AI combat engines.
- Add machine-checkable tests for deterministic rules where practical.

## 11. Verification vs player-owned smoke
Keep engineering verification and player acceptance separate.

**Player smoke is the default for checks the player can efficiently perform on the real device/build**, especially:
- game feel / fun;
- touch-control feel;
- camera comfort;
- visual readability;
- animation/VFX clarity;
- balance feel;
- device-specific layout;
- short end-to-end play confirmation after a localized change.

Work should not spend session/token budget duplicating player-owned smoke unless:
- the user explicitly asks Work to do it;
- an automated/browser check is required to diagnose a defect;
- release cannot be considered technically safe without that runtime evidence.

When player smoke is appropriate, Work/Chat should deploy or provide a testable build and give the player a **small targeted checklist for the changed scope**, not ask them to replay unrelated content.

Use precise status labels:
- **ENGINEERING PASS**: all required engineering checks owned by the executor passed.
- **ENGINEERING PASS / PLAYER SMOKE PENDING**: engineering checks pass and only targeted player/device acceptance remains.
- **PASS / PLAYER VERIFIED**: the required player smoke was actually confirmed.
- **FAIL / INCOMPLETE**: a required engineering check failed or required executor-owned verification could not be completed.
- **RELEASE BLOCKED**: engineering passed but merge/deploy cannot be completed due to a concrete blocker.

Never claim player-verified visual/gameplay success before the player actually confirms it.

## 12. Risk-based verification: test only what the change can break
Verification scope must be proportional to change impact. **Do not automatically run the entire test suite or full game flow for every small edit.**

Use the smallest sufficient layer:
- **Level A — static / local check**: documentation, isolated data, naming, or a trivially bounded helper with no shared runtime effect.
- **Level B — targeted tests**: default for small/local code changes. Run tests covering the touched module plus directly affected contracts.
- **Level C — impacted regression**: use when a shared subsystem changes. Test the affected dependency surface, not unrelated gameplay.
- **Level D — full regression / broad runtime smoke**: reserve for changes to shared architecture, battle lifecycle, persistence/progression, build/release infrastructure, dependency upgrades, large refactors, or when narrower evidence cannot establish safety.

Rules:
- A previously recorded PASS remains reusable evidence when later changes cannot materially affect that verified scope.
- Do not rerun a full suite merely because the session restarted.
- Do not replay the whole game when only one bounded mechanic changed.
- If a targeted test fails in a way suggesting wider coupling, escalate the verification scope.
- Before final release, use the minimum release checks appropriate to the actual changed surface; a full regression is not ceremonial.

For M0, the eventual complete prototype release must have evidence for:
- 3v3 battle completion without player input;
- manual override and immediate 0s AI-resume;
- KO/team switching/victory-defeat;
- type-counter correctness;
- stable landscape runtime for the integrated combat surface.
This does **not** mean every intermediate edit must rerun all of them.

## 13A. Current branch / merge policy
- The current project is intentionally continuing on the recorded long-lived feature branch / PR while milestone work remains in progress.
- Recover and continue the branch/PR named in the CURRENT HANDOFF POINTER.
- Do **not** merge to `main` merely because a new Work session starts.
- Merge to `main` only when the current handoff explicitly authorizes it or the player approves milestone consolidation/release.
- Feature-branch Pages/public verification may continue when that is the recorded release path.

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

## 16. Work handoff contract
Every Work handoff must be deliberately small.

Before creating a Work task, Chat should state internally/record in the handoff:
1. what Chat already completed;
2. the exact capability gap that requires Work;
3. the smallest implementation delta Work owns;
4. the minimum sufficient engineering checks;
5. which acceptance checks are delegated to the player;
6. where Work must checkpoint if interrupted.

A Work task must not contain broad phrases such as "fully test everything" or "recheck the whole game" unless the actual change impact justifies that scope.

## 17. Interruption protection / recoverability
For any substantial Work task:
- create the feature branch or recover the existing one before new implementation;
- push an early coherent checkpoint instead of waiting for final completion;
- checkpoint again before long browser/runtime steps;
- if session/token capacity becomes uncertain, stop adding scope and push immediately;
- update `WORK_PROGRESS.md` with latest remote SHA, completed work, remaining work, actual verification evidence, known failures, and the single next exact step;
- on the next session, recovery of the existing remote checkpoint happens before any reimplementation.

If push fails or the environment dies before push, the next session must first search the existing workspace/reflog/local branch for recoverable work and push it. Never silently start over.
