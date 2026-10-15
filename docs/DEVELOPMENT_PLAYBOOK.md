# Development Playbook

## Purpose
This playbook defines the durable development workflow for Shanhaijing Arena. It is project-wide and independent of any one milestone.

## Action art → GIF → runtime gate

Canonical method: `docs/CHARACTER_ACTION_ART_WORKFLOW.md`, player-approved process2026-10-15; P1 engineering/deployment complete, player attack-visual feedback positive2026-10-16, unreported device checks pending. Its reusable case-study table and zero-context successor index preserve exact assets/scripts, accepted timing decisions and release evidence; do not redo completed P1 gates or infer approval for another attack. Recover exact GitHub identity, review F3 first, then four distinct poses; author VFX separately, preserve accepted pixels during safe equal-cell packaging, and obtain explicit composite GIF approval **before** action runtime integration or deployment. Keep source PNGs/versions/metadata/checksums/GIF and acceptance history in GitHub + self-contained handoff ZIP. A successor resumes the first unfinished review gate, not a fresh redesign. Process approval is not approval of generated art or proof of a working battlefield animation.

## A0. Mandatory rule refresh before action
Before planning or executing any substantial project action, first recover the current hard rules and authoritative state from GitHub. At minimum read `AGENTS.md`, this playbook, the current handoff/state pointers when progress matters, and the spec governing the proposed action. Do this before offering implementation advice, preparing assets, editing the repo, choosing tests, or writing a Work handoff.

Do not assume a previous recovery is still current when the repo may have changed. The purpose is to make every recommendation start from the same authoritative constraints rather than from chat memory.

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

## A1. Character-first temporary completion
For the current Chapter1 character-production phase, do not hop to the next unfinished character after static art alone. Complete the active character through:
1. approved static identity/runtime presentation;
2. approved locomotion/runtime verification;
3. approved static death/KO/runtime verification.

Only then mark that character temporarily complete and move to the next roster character. Basic/Heavy/Special/Awakening action animation, Hit and VFX are not part of this temporary-completion checkpoint unless the player explicitly changes the order.

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

Before writing that prompt, Chat must have already completed all safe Chat-owned work and reduced the task to the irreducible Work-only delta. **Every player-facing handoff/instruction intended for a new Chat, Work, Codex, or another execution session must be delivered as exactly one complete self-contained copyable code block.** This includes new-Chat recovery prompts, not only Work prompts. Do not split required context across prose and separate blocks, and do not provide competing long/short versions. Successor-Chat prompts must state this one-click-copy rule near the top so it propagates to the next handoff. When a prepared ZIP/package already contains the canonical handoff, give one short copyable instruction that tells the destination to recover and follow the packaged handoff; do not duplicate competing instructions.

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

## Self-contained ZIP handoff contract (player-approved 2026-10-14)
For asset/file handoffs from Chat to Work, Chat MUST prepare one self-contained ZIP including every required approved asset, necessary supporting files, checksums/manifest, and **START_HERE.md + WORK_HANDOFF.md** with complete bounded execution instructions (GitHub zero-context recovery, protected baselines, exact executable delta, tests, release/stop gate and player verification). Work must not need the player to paste a second lengthy prompt or manually assemble files. A new successor Chat must check this rule before every handoff. Do not put outdated or competing prompts in the package.
When a Work environment actually opens the attachment, it should extract the ZIP and read START_HERE.md then WORK_HANDOFF.md, then refresh GitHub and execute the authorized task. **Attaching ZIP alone does not guarantee that a new Work session starts or reads it automatically**; this depends on the product workflow. If the environment requires an initial instruction, provide ONE minimal copyable code block: "解壓縮附件 ZIP，先讀 START_HERE.md 與 WORK_HANDOFF.md，依最新 GitHub 硬規則執行；完成後停止。" Never claim zero-click autonomous execution without verification. No unattended background work unless the platform explicitly supports it.

## Approved multi-frame normalization — required pre-GIF process (player verified 2026-10-14)
When a player approves four poses as the art source, preserve that exact image and do not regenerate it merely to repair layout. A visually good four-pose collage is NOT automatically a sprite strip. Never create GIFs from naïve equal-width slices. **Chat owns the full safe preparation whenever available**: (1) identify each independent entire silhouette and its source bounds, separating any neighboring components/pixels; (2) remove background or fringe only by a color-faithful process that never deletes character colors; (3) individually extract the four frames, preserving fists, claws, tail, accessories and outline; (4) normalize into exactly four equal-sized transparent RGBA cells with generously clear horizontal/vertical safety padding; (5) align a common grounded baseline while keeping each full actor inside cell bounds; (6) inspect per-cell nonzero-alpha bbox, compare on light/dark backgrounds and ensure no neighboring-frame bleed/clipping/discolored fringe; (7) only then derive an animated GIF preview from the normalized cells, and obtain explicit player approval before Work integration. Runtime must animate `battleMove` only while moving, return to previously approved single-frame `battleIdle` when stopped, use the existing mirror contract, and preserve gameplay/stat/collision coordinates. Do not mistake alpha mode or even a successful crop for visual/no-bleed proof. Record exact approved source, normalized derivative hashes/cell geometry and PASS boundaries in progress/state. A Chat→Work package must include approved source, four separated PNGs, normalized strip, review GIF, manifest/checksums and complete START_HERE/WORK_HANDOFF; Work gets only integration/tests/deploy and phone-smoke handoff.

## Character-complete sequential production rule — player updated 2026-10-16

**Mandatory / supersedes older category-across-roster batches.** Deliver one character's full visual skill kit before beginning another: approved Concept → portrait/collection/battleIdle → locomotion → static KO → Basic action/VFX → Heavy action/VFX → Special action/VFX → Awakening action/VFX → Hit/reactions → character-wide player phone smoke. Earlier gates already accepted do not repeat; each action still uses `docs/CHARACTER_ACTION_ART_WORKFLOW.md` F3-first pose, four poses, separate VFX, safe GIF approval, shared runtime, tests/deploy, device smoke. Data-driven shared renderer/runtime remains reusable for all characters, never character-specific branching. Review/ship bounded substeps but do not abandon an unfinished character for another character's same skill category. Follow explicit player reordering if later supplied. P1 Basic visuals player-confirmed on 2026-10-16; next P1 Heavy, with remaining device checks not falsely marked PASS. Preserve no-main-merge and original art source rules.
