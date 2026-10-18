# Development Playbook

## 2026-10-18 — all five Awakening character poses player approved

Player at2026-10-18T08:47:38+08:00 「我確認ok」accepts poses1/2/3/5 on the five-pose review at951dac8; terminal F3/pose4 was approved earlier. Receipt and exact approved source hashes: `docs/art/approved/lushu/awakening/phase-poses-v1/acceptance.json`. **ALL FIVE CHARACTER POSES PLAYER APPROVED; VFX/GIF NOT YET APPROVED.** Preserve all shown source bytes; do not regenerate poses. Continue source-preserving common skull-density/ground/anchor normalization, independent three-stage escalating VFX and normal/slow/mirrored/effects-off/Idle-return composite GIF review. Distinguish real runtime from illustrative preview; no actual implementation/deploy/phone acceptance or P2/main merge. Approved gameplay contract is unchanged and remains unimplemented. Old pose-review-pending entries below are historical.


## 2026-10-18 — terminal F3 likeness approved; pose production continues

Player at 2026-10-18T06:47:26+08:00: 「好這個f3的形象我審核通過，紀錄github進度和相關流程規則，依照規則繼續」. Exact shown master SHA256 `c736acca0da5fb5b6c7824a8dfb4bfb2719cf2ce99af74c54dde21773821f3d0` is copied byte-for-byte to `docs/art/approved/lushu/awakening/terminal-f3-v1/F3-terminal-master.png`; receipt: `docs/art/approved/lushu/awakening/terminal-f3-v1/acceptance.json`. **F3 LIKENESS / IDENTITY PLAYER APPROVED; CONTINUATION AUTHORIZED.** This preserves the shown terminal pose; no approval of unseen phase poses, VFX, GIF, alpha changes, runtime, deploy or phone smoke is inferred. This entry supersedes older F3-not-produced/player-pending status below; those remain historical.

Continue with deterministic source-preserving transparent padding and independent character-only candidates: anticipation → first-rush contact → second return/crossing contact → exact approved terminal F3 → recovery. This is an authoring/review plan, not a new gameplay contract or acceptance of unshown poses. Extra key poses are justified by three separate contacts; do not force one generic four-pose loop. Contacts150/300/460ms, full650ms, coeff0.40/0.70/1.10 and CD12 remain design approved but unimplemented. After pose review, independent escalating VFX and composite normal/slow/mirrored/effects-off/Idle-return GIF require explicit player acceptance before runtime. No deploy/P2/main merge.

Source has invisible alpha1–8 noise; preserve immutable master. Padding must preserve every source RGBA pixel; if noise remains inside original canvas, report it rather than claim it was cleaned. No source redesign or regenerative repair of this approved F3. Runtime readiness remains a later shared-scale/anchor/budget gate. Checkpoint with [skip ci] to prevent art-only changes auto-deploying.


## Player-approved P1 Awakening three-rush gameplay contract — 2026-10-17

Player「好 可以 確認紀錄github流程規則進度，然後繼續」explicitly approves the previously presented **real** three-contact schedule **150 / 300 / 460 ms from cast** and **650 ms full playback including recovery**, plus **three independent path-swept collision checks**, each at most once. Design-approved T0 hit coefficients **0.40 / 0.70 / 1.10** sum **2.20**, cooldown **12s**, no extra attack, no guaranteed contact or target impact FX on whiff. Three segments are 起衝突進 → 折返追擊 → 終結奔襲. Third segment remains independently damaging if first/second missed, and third terminal-contact F3 is the first art candidate **only after the three-phase choreography is specified**. Authoritative details: `docs/M5C_P1_LUSHU_AWAKENING_ACTION.md`.

**Status distinction:** PLAYER DESIGN APPROVED / NOT IMPLEMENTED / NO F3 ART YET. Existing runtime still immediate +120/+240ms, equal 2.20/3, range checks and no three-rush displacement. Proposed segment-boundary re-aim, target-lock, swept capsule and arena clamp are implementation preflight choices requiring geometry measurements, not license to change damage geometry/retargeting beyond this approval. Keep generic shared pipeline, AI/player parity, legacy Tier, critical/defense, 16MiB budget, accepted Basic/Heavy/Special, no P2/main merge. A design approval does not authorize bypassing the **art F3 → full poses/VFX/GIF approval → runtime integration/deploy → phone smoke** gates.



## P1 Awakening approved independent hit weighting — 2026-10-17

Player「好我同意 妳把這些紀錄到github相關文件然後繼續」approves the proposed **design** for 「南山奔襲」: three individually collision-qualified hits with increasing *base coefficients* **0.40 / 0.70 / 1.10**, sum **2.20** (T0 baseline), not conditional combos. Third hit must retain coefficient1.10 if hits1/2 miss; no guaranteed hit, no fake HP, no fake target burst. Only real collision at each event can generate that hit's damage and target-attached impact VFX. First VFX smallest, second intermediate, final largest and most distinct; on phone compare independently rendered damage text, true HP bar steps and effects, and preserve existing defense/crit/Tier semantics. Actual visible HP significance is **not verified** until combat/phone test; visual legibility is not permission to change HP or give invulnerability. This supersedes equal-per-hit coefficient as a **future implementation requirement**, not a claim runtime already changed: current `battleSession.js` divides 2.20 evenly and checks later hits by range, not path collision; current ability lacks triple displacement. Keep 3 hits, CD12, total2.20; change timing/travel/hit geometry only after separate fully specified contract and approval. Multi-hit weight arrays must use generic shared data-driven schema, no P1 conditional runtime exceptions. Do not generate terminal F3 until choreography/real mechanics constraints reviewed; do not modify Basic/Heavy/Special/P2/main.



## Player-approved multi-impact Awakening design-first gate — 2026-10-17

Player「好可以，妳確認這個架構流程後，把他整理到github進度流程和硬規則，確保可給別人無縫接軌進度，然後繼續進行」approves the **design sequencing** for P1 鹿蜀「南山奔襲」: first specify all three fast collision phases (initial rush, return/crossing rush, terminal strongest rush), their travel paths, unique body poses, actual three hit/VFX correspondences and ending; **only after design review** create the key **third/terminal-impact F3** candidate, then earlier phase poses, independent effects and composite GIF for explicit player acceptance. F3-first within the pose-production stage does **not** mean F3 before full ability choreography. Do not treat this as approval of any generated image, numerical displacement/timing, GIF, runtime, or deploy. The existing P1.awakening has three damage hits but no active movement and zero windup; real movement or hit-timing changes need a separately approved gameplay contract before implementation. This rule generalizes to future multi-stage/multi-hit abilities: choreography and engine events must be mapped **before** a single key-pose image is authored. Canonical bounded spec: `docs/M5C_P1_LUSHU_AWAKENING_ACTION.md`. Preserve P1 Basic/Heavy/Special acceptance, no P2 or main merge.



## Approved action timing and source-preserving residency

Record visual/GIF approval separately from actual combat timing approval, including exact statement and scope. Once both are explicit, continue the authorized integration/deployment without reopening completed gates. Bind authored contact frame, displacement, real HP/RNG event, target VFX and post_cast effects to the same shared resolve actionId; never fake synchronization by delaying only HP text. T0 constants and existing Tier scaling are separate contracts. Runtime derivatives may remove only proven fully transparent outer rows and downsample approved sources under a recorded deterministic policy; keep originals/GIFs immutable, preserve visible-pixel world placement in both directions and test noncentral authored-action origins against actual renderer flip semantics. Fit every required asset in the existing cache cap; never silently evict required art or raise the cap. Engineering/deploy evidence does not imply phone acceptance. P1 Special320ms approval2026-10-17T14:45:48+08:00 is the current bounded case; it grants no new skill/character or main merge.


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

**2026-10-17 player clarification:** effect size must be visibly larger and easier to recognize at real phone battle scale, not merely described as stronger. Review BOTH outgoing weapon/light effects and target impact bursts separately. Heavy < Special < Awakening must show a clear successive increase in effect footprint and emphasis, while retaining different motion/VFX signatures. Canonical requirement: `docs/M5C_ART_ANIMATION_VFX.md` → "Large, unmistakable cast and impact VFX". Do not enlarge the actor, invent attack range/damage, or label unproduced skills complete.

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
