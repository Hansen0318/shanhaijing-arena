# Development Playbook

## Purpose
This playbook defines the durable development workflow for Shanhaijing Arena. It is project-wide and independent of any one milestone.

## A. Chat-first stage
Chat should complete the maximum safe work before Work is opened:
1. clarify/lock the player-visible requirement;
2. inspect GitHub state and relevant code/specs;
3. identify the smallest change surface;
4. complete static analysis, documentation, asset planning, and bounded edits that do not require a full runtime;
5. define acceptance criteria;
6. decide the minimum sufficient engineering verification;
7. define the specific player-owned smoke, if any;
8. only then create the smallest Work task.

## B. Work entry / recovery
Work must:
1. inspect latest remote main;
2. read `AGENTS.md`;
3. read this playbook;
4. read the CURRENT HANDOFF POINTER in `WORK_PROGRESS.md`;
5. read `docs/STATE.md` and only relevant specs;
6. recover the recorded active branch/PR/checkpoint if one exists;
7. inspect actual HEAD/status/diff;
8. continue from the first unfinished item.

Do not create a replacement implementation merely because the Work session is new.

## C. Work scope rule
Work owns only the irreducible executable delta.
Examples:
- iterative multi-file implementation;
- dependency/build integration;
- executable test/debug loop;
- browser/runtime diagnostics when they are technically necessary;
- merge/deploy/release steps when Work owns the substantial implementation.

Work should not redo:
- already locked design;
- static analysis already completed by Chat;
- documentation already completed by Chat;
- player-owned usability/visual smoke;
- unaffected historical regression.

Work handoffs should be one compact prompt, not a verbose recap. GitHub carries prior context. Include only: the exact unresolved executable delta, protected baseline, minimum checks, deploy/stop condition, and any player-smoke handoff. Do not provide a long version followed by a short version.

## D. Safe checkpoint flow
For substantial tasks:
- checkpoint after first coherent implementation;
- checkpoint before long-running runtime/browser verification;
- checkpoint immediately if token/session/environment risk increases;
- update progress docs before ending an incomplete session;
- push the branch so the next session can recover remotely.

A checkpoint is not a PASS claim.

## E. Verification ladder
Choose the smallest sufficient scope based on change impact.

### A — static/local
Use for docs, isolated data, naming, or non-runtime bounded edits.

### B — targeted
Default for small code changes. Test only touched modules and directly affected contracts.

### C — impacted regression
Use when a shared subsystem changes. Test its dependency surface.

### D — full regression/runtime
Use only for broad/shared architectural changes, dependency upgrades, release infrastructure, large refactors, or when targeted evidence is insufficient.

Escalate only when evidence shows broader coupling.

## F. Player smoke
Prefer player smoke for subjective or device-realistic acceptance:
- game feel;
- touch controls;
- camera comfort;
- visual/VFX readability;
- balance feel;
- device layout;
- focused end-to-end confirmation.

Provide a short changed-scope checklist. Do not ask the player to replay unrelated content.

## G. Status language
- ENGINEERING PASS
- ENGINEERING PASS / PLAYER SMOKE PENDING
- PASS / PLAYER VERIFIED
- FAIL / INCOMPLETE
- RELEASE BLOCKED

Keep checkpoint, engineering verification, player acceptance, merge state, and deployment state separate.

## H. Release closure
Unless explicitly checkpoint-only:
1. finish the owned implementation;
2. run minimum sufficient engineering checks;
3. review the actual diff;
4. merge to main when safe;
5. deploy if a public delivery pipeline exists;
6. verify the changed public surface at the minimum sufficient level;
7. update `docs/STATE.md` and `WORK_PROGRESS.md`;
8. record the exact next action or player-smoke checklist.

## I. Handoff completeness
A handoff is complete only when GitHub contains enough information for a zero-context successor to answer:
- What milestone are we in?
- Which branch/PR/checkpoint is active?
- What is already done?
- What evidence has passed?
- What is still pending?
- What must not be redone?
- What is the one next exact step?
