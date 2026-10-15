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

## Mandatory action-power visual escalation — player rule 2026-10-16

For each character's four active categories, **Basic < Heavy < Special < Awakening** in perceived impact, animation commitment and spectacle. This is a **relative visual hierarchy**, not a new damage formula or numerical guarantee: individual ability data (including defensive/heal skills) remain authoritative. Preserve readability, role/species identity and mobile performance.

- **Basic:** fast, compact, readable signature strike, brief contact flash/trail; little screen occupation.
- **Heavy:** stronger anticipation, forceful acceleration/weight transfer and a clearly more substantial hit, brighter/broader weapon trail, impact burst and modest recoil/shock accent.
- **Special:** distinct signature character/ability expression and richer, layered VFX with greater spatial presence, appropriate to actual targeting and gameplay function; utility/healing skills convey stronger potency without fake damage.
- **Awakening:** most dramatic ultimate action and VFX payoff; strongest anticipation/release, unmistakable silhouette, staged/layered burst, persistent-but-bounded aftermath. Do not obscure HUD, targets or critical warnings, nor add unearned hit geometry or extra damage.

For all four tiers, **animation body mechanics must escalate together with VFX** (pose breadth, windup/follow-through, weapon/limb energy, timing), not merely a larger recolored particle sprite. Judge each new skill against the preceding approved skill of the same character in a side-by-side GIF/small-screen comparison. Keep character identity, weapon, scale/anchor, right-facing mirror, existing combat data/timing and actual hit synchronization unchanged unless the player explicitly approves a separate gameplay/timing change. FX complexity is constrained by scene residency, accessibility/reduced-motion, frame budget and target readability. For future characters use the same hierarchy and review gate. Do not copy identical effects across species or damage-only assumptions into support/defense.

## Mandatory within-character attack motion differentiation — PLAYER HARD RULE 2026-10-16

**Basic / Heavy / Special / Awakening MUST have immediately distinguishable bodily movements, silhouettes, attack vectors and timing signatures, even with VFX turned off.** The existing escalating power/spectacle hierarchy is additional, not a substitute. Do not produce the same four poses with just recolored/larger effects, faster playback or extra particles. These categories are distinguishable by the character's actual articulated motion and relationship to its ability's validated gameplay mechanics.

Required art review for every character before completing the four skills:
- Build a **four-skill motion differentiation matrix** describing each skill's stance/center of gravity, anticipation, primary limb/weapon path, facing/target vector, release/contact pose, follow-through and rhythm, with the real ability data as authority. Use distinct primary silhouette and action grammar per skill.
- Show each skill's player-preview GIF **both character-only (effects hidden) and with independent VFX** at actual phone battle scale. If testers cannot identify the skill by body movement alone (or its actual support/defense gesture), revise poses before approving effects or integration.
- Preserve exact approved identity, weapon, visual proportions, animation safety and state transitions. Do not add fake hit count/target/path/projectile/teleport/area, nor edit stats/AI/range/real damage timing without a separate player-approved combat change. Power feel escalates Basic < Heavy < Special < Awakening, while distinguishing attack type independently.
- For P1 鹿蜀 starting differentiation proposals, **Basic「踏角」** is the deployed compact grounded horn/hoof/weapon strike; **Heavy「逐風衝」** must uniquely emphasize a forward engage→planted forceful collision/weapon blow, with unmistakably different F3 and silhouette; **Special「迴蹄」** must emphasize a diagonal reposition followed by a rotational/turning hoof strike (no invented extra move/hit); **Awakening「南山奔襲」** must uniquely portray the existing three successive rushing hits, with staged peak burst and strongest overall payoff. Validate the latter two against real ability timing and source prior to making art; these are design directions, not preapproved poses or extra gameplay.
- Develop the current character's full four-skill kit before starting the next character; existing accepted Basic stays intact. No new art is approved simply by recording this rule.

## Distinct ability-specific VFX and target-bound persistent status effects — PLAYER HARD RULE (2026-10-16)

Every individual ability has its own immediately readable **VFX signature**, driven by ability definition and actual combat event/state—not merely a recolor/size increase of shared explosions. Basic < Heavy < Special < Awakening must escalate dramatic release, layered impact and visual scale where appropriate, while maintaining different shape, trajectory, element/material, rhythm and contact geometry for each move. Strong explosion/burst/impact feel is required for damaging power moves where justified. Support, defense, healing, buffs and debuffs receive appropriately striking protective/healing/condition visuals, not fake damage explosions.

**Three presentation phases must remain distinct:** (1) caster-side startup/charge/travel/release effect follows actual validated action; (2) impact VFX belongs to actual hit/landing/affected targets; (3) sustained **target-bound status VFX** stays anchored to the affected unit for exactly the *actual active state* and ends upon state expiry, cleanse, KO/despawn, scene switch or cancel as appropriate. Examples: burn flames/embers on the enemy, poison violet-green fume/droplets, bleed wound pulses, slow/chill ice/snow, shield aura, regeneration/heal halo. Periodic damage numbers and pulses occur only when the simulation actually applies periodic HP ticks, **not** at arbitrary animation intervals; hit count/stacking/refresh, immunity, partial resist, target switching and state visibility need data contracts and tests. Multiple effects must be legible and bounded, no opaque HUD masking, no confusion with team colors/critical numbers. Respect reduced-motion, frame/texture budgets and mirroring; effects never persist as orphan sprites after target death/scene exit.

**No invented gameplay:** The current roster ability data does not broadly define burn/poison/DoT status merely because a fire/water/venom-themed attack exists. An ability that applies no persistent status must show only its approved cast/impact visuals. Introduce DoT/status mechanics only in a separately player-approved combat milestone, then use generic event/state-driven target attachment. The VFX architecture should support future data-driven target statuses without character-ID specials.

**Per-skill player review gate:** record skill identity, offensive/support type, unique motion silhouette, VFX signature shape/color/trajectory/layering, attach point (caster/projectile/target/world), onset event, impact confirmation, linger/expiry source, Basic<Heavy<Special<Awakening comparison, effects-off and effects-on GIF, phone readability and reduced-motion. Do not reuse the identical effect for different abilities under a different name.
