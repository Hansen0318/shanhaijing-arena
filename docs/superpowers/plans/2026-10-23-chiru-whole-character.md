# P3 Chiru Whole-character Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans natively, task by task. User explicitly forbids delegation/new branches and has already authorized continuation. Do not add a separate execution-method or ceremonial plan-approval Gate. Unseen F3/style and GIF batches still require the agreed player review.

**Goal:** Complete the accepted P3 five-skill design through batched art review, shared runtime, one normal deployment and whole-character acceptance.

**Architecture:** Preserve accepted base art and P1/P2 behavior. Explicit heal-basis/Tier data, token-owned generic delayed effects and condition/recipient-based instant-heal passives extend the shared engine without roster-ID switches. Player copy derives from the same numeric definitions; real events own recipient VFX.

**Tech Stack:** Existing JavaScript/Phaser/Vite, node:test, native/built Chromium; built-in image generation for candidate raster art, no external API/DB/dependency required.

**Spec:** docs/superpowers/specs/2026-10-23-chiru-whole-character-design.md; immutable approval docs/verification/P3_CHARACTER_PREFLIGHT/spec-acceptance.json.

## Global Constraints

- Native single-agent; feat/m0-combat-core-20260927 / PR#1open-unmerged. No main merge, alternate branch, TD, roster-ID runtime special cases or unrelated untracked changes.
- Whole spec → batch four F3/passive style → batch remaining poses/VFX/GIF → shared implementation → necessary verification → ONE normal release → whole-character player acceptance.
- Approved P1/P2/base/Move/KO/masters/receipts/GIF/scale/anchor/ground/right canonical/left mirror remain protected; ordinary Hit permanently cancelled.
- P3 current-maxHp heal fractions Special25/30/35/40%, Awakening16/20/24/30%, passive8/12/16/20%; no double healing scale. Active conditional modifier cap15%; ordinary movement/outgoing15%; P1 explicit95% untouched; mitigation MAX/independent expiry unchanged.
- Passive rear≥2, living enemy required, recipient≤4.2 and HP≤60%, include self, hpRatio/instanceId ordering, positive-heal CD8; recipient VFX0.65s/Tier1–4 motifs. No battlefield passive text/HUD/numbers/links or enlarged actor.
- Player copy only gameplay/lore/necessary numbers. P3 passive stays unavailable until true implementation and same-version copy ready.
- No fixed16MiB/required-count/reserve admission; per-file safety, two downloads, full required readiness, ownership/reclamation/actual failure/destroy remain.
- Source-identical evidence reused; new runtime binds new evidence, normal full CI/Pages/public. No per-skill deployments.

## Review Focus

1. Mixed caster/recipient Tiers must use recipient current maxHp once; tests in Task3.
2. A full-health/KO or same-clock active-healed recipient must never get a false passive heal/mark; tests in Task4.
3. Move/cancel/control/KO between cast and resolve must not show early damage/heal/shield; tests in Task3/5.
4. Same actor swaps skill before old FX expiry: old token must not decorate the next action; tests in Task5.
5. P3 hover silhouette/fin anatomy and side-specific water accessory must remain consistent at game scale; image comparison in Task1/2 and real browser in Task6.

### Task 1: Approved-design checkpoint and batch F3/style candidates

**Files:** Create docs/art/candidates/chiru/whole-character/f3-batch-v1/{basic-f3.png,heavy-f3.png,special-f3.png,awakening-f3.png,passive-style.png,prompts.json,manifest.json,REVIEW.md}; use existing public/assets/characters/chiru/{identity.png,battleIdle.png} as references, never replace them.

**Interfaces:** Consumes approved spec hash/reference SHA. Produces candidate-only five image paths, exact prompts/reference hashes, dimensions/alpha/inspection results and batch review entry; no accepted/runtime asset keys.

- [ ] Save exact player reply/spec/proposal hashes; verify source guard and unrelated untracked hashes; commit/push docs checkpoint before art generation.
- [ ] Generate one transparent right-facing character-only F3 per active, preserving exact anatomy/palette/accessory side; separate passive paired-fish reflux style cutout. No candidate classified approved.
- [ ] Inspect every image for identity, distinct action silhouettes, extra limbs/weapon, crop/alpha, baked-in combat FX and orientation. Repair concrete defects with targeted image edits; retain provenance/version.
- [ ] Save originals and inspect at same skull/torso landmark scale; create a code-native review page referencing original files without changing pixels. Passive is an effect style, not a fictitious cast pose.
- [ ] Update progress/rules/manifest/handoff; verify immutable hashes/unchanged production; commit/push [skip ci]; present all five for one batch review. STOP at this agreed art Gate.

### Task 2: Remaining poses, independent FX and batch animation review

**Files:** Create approved-key-pose receipts after player review, candidate directories per active, independent FX groups and whole-character composite review manifest/GIFs. Preserve candidate originals.

**Interfaces:** Consumes only accepted Task1 hashes; produces accepted F1–F4/FX/GIF receipts and descriptor-ready source inventory.

- [ ] Record batch F3/style acceptance before any derived production; generate remaining12 body poses and11 other effect groups against accepted anchors (passive style is group12).
- [ ] Verify exact anatomy/canonical side, independent source/path/contact/recipient separation, transparent edges and equal skull/torso scale. No automatic resize to crouched total height.
- [ ] Create normal/slow/effects-off/mirrored/Idle-return previews with spec frame times; show heavy emission separately from later contact, passive Tier1–4 at recipient. Assert four body poses differ rather than translating the same image.
- [ ] Present one consolidated whole-character animation batch; record only explicit accepted hashes. No game deployment before this Gate.

### Task 3: Shared heal basis and delayed effect timeline

**Files:** Modify src/combat/{ability.js,tierEffects.js,battleSession.js}; create src/combat/effectTimeline.js; tests/{healingBasis.test.js,effectTimeline.test.js}.

**Interfaces:** Add effect.healBasis='recipient-current-max-hp', effect.tierFractions={T0..T3}; generic timeline data {prepareMs,settleDelayMs,aimPolicy:'locked-point'} opt-in. Export createEffectTimeline(input) and timelineDeadlines(record,now); records own castId/actorId/epoch/preparation/release/settlement and cancellation reason. Existing absent-data paths retain old behavior.

- [ ] RED: mixed-tier patient heals target.maxHp×fraction×active modifier once, overflow capped; existing default path remains old baseHp behavior. Run node --test tests/healingBasis.test.js.
- [ ] GREEN shared validation/projection/resolution; illegal fraction/basis rejects, active bonuses add ≤15%, no heal crit/revive. Verify P1/P2 existing primary math unchanged.
- [ ] RED→GREEN generic token timeline with Basic180ms, Special320ms, Awakening600ms, Heavy charge350/337.75/325.5/305.9 + delay350ms; moving caster origin follows until release, then fixed/clamped; same locked target/finite line. Both modes same P3 data policy; existing absent policy unchanged.
- [ ] Test movement allowed, source KO/control/cancel/epoch invalidation before settlement, spent CD retained, no early damage/heal/T3shield, no animation input lock. Source/recipient KO/end/Restart/destroy eliminate stale settlement.
- [ ] Commit tested shared task and ledger; no Pages deployment.

### Task 4: Generic rear-support instant-heal passive

**Files:** Modify src/combat/{passiveDefinition.js,passiveRuntime.js,battleSession.js}; tests/{supportPassive.test.js,supportPassiveLifecycle.test.js}.

**Interfaces:** Add rear-support-low-health condition data and instant-heal effect with tierFractions, recipient-current-max-hp, radius/hpRatio/includeSelf/nearest-enemy bounds; generic resolve recipient by stable hpRatio/instanceId. Positive heal event {castId,definitionId,actorId,targetId,amount,at,tier}; passive snapshot uses this identity and readyAt, no fake status duration.

- [ ] RED→GREEN exact2/4.2/.6 boundaries, no living enemy/fullHP/control/KO/end rejection, lowest recipient including self, tie ordering, anonymous renamed actor/ability IDs, allies/enemies/manual/AI and independent instances.
- [ ] RED→GREEN fractions.08/.12/.16/.20, CD8 from positive amount, no modifier/healing-scale multiplication, no loops/queued cooldown triggers; same-time damage/KO→active effects→passive reevaluation.
- [ ] Test source/recipient lifecycle, Pause, Restart fresh ready, destroy idempotence; all prior movement/spatial passives retain existing behavior. Run node --test tests/supportPassive*.test.js plus impacted passive tests once.
- [ ] Commit tested task and ledger; no Pages deployment.

### Task 5: P3 data, accepted assets, true-event presentation and Collection

**Files:** Modify src/roster/{abilities.js,catalog.js,tierEffects.js}, src/assets/manifest.js, src/runtime/{assetPresenter.js,passivePresenter.js,ArenaScene.js}, src/collection/model.js; create source-data module src/roster/chiruKit.js and accepted runtime asset descriptors; tests/chiruKit.test.js, tests/chiruPresentation.test.js, tests/chiruCollection.test.js.

**Interfaces:** chiruKit exports approved Tier fractions/timing/copy inputs; generic common UI formatter consumes numeric data. Asset/presenter only observes real cast/release/hit/heal/protection/passive events with token/recipientId/epoch, not roster identity. Existing source key resolution allowed in roster data; no combat ID switches.

- [ ] RED→GREEN all five data definitions match accepted spec and existing Tier curves; rename T2 label清流 only, preserve ID/bonus/conditions, T3 shield10.8%/2.5 at600ms.
- [ ] Integrate accepted source pixels with lossless packing/per-file safety and retained ownership/download policy; no fixed total-size/reserve restriction. Verify skull/torso/hover anchors across all poses and mirror.
- [ ] RED→GREEN no contact on miss, no heal bloom on amount0/KO, fullHP T3 recipient may have true protection only; passive paired-fish at actual beneficiary0.65s, motifs1–4, reduced-motion static, no text/links/size transforms.
- [ ] Test token replacement on same actor/rapid skill changes and Pause/expiry/KO/end/Restart/destroy. Collection shows approved effect data/CD and honest implementation state; update passive description together with true effect, not before.
- [ ] Commit integrated task and ledger; no Pages deployment.

### Task 6: Necessary evidence, one normal release and whole-character review

**Files:** Create scripts/checkChiruWholeCharacterBrowser.mjs, scripts/verifyChiruCharacterRelease.mjs, tests/chiruReleaseEvidence.test.js and docs/verification/P3_CHARACTER_RUNTIME/; modify normal release guard invocation only after new exact evidence exists.

**Interfaces:** Browser reports bind native/built cases, actual numerical events, screenshots, physicalPhone:false and exact source SHA; new release guard binds full src/public/scripts/tests/dependencies/workflows plus spec/art/authorization receipts, never re-labels old585 evidence as new coverage.

- [ ] RED→GREEN guard rejects source tamper/absent art acceptance/false recipient/early timestamps/dirty copy/failed cleanup; green after restored genuine evidence.
- [ ] Run necessary unit/regression suites and Build once after final changes. Real native/built fourTier×five skills, actual touch entry, both sides/normal-reduced, hit/miss/heal/control/CD/Tier/geometry and same-actor chaining, phone Collection, Pause/Restart/destroy. Scope P1/P2 compatibility to shared source impacts, reuse immutable unaffected evidence.
- [ ] Native self-review only per user no-delegation, correct concrete defects with necessary RED→GREEN; ledger actual results, never invent device/FPS/GPU proof.
- [ ] Commit/push final coherent whole-character source; normal full CI/Build/newguard/Pages once. Compare actual CI artifact to local files and public bytes/fingerprints, reuse identical paths/hashes. Preserve genuine failure evidence, no bypass.
- [ ] Present one complete game version for whole-character player acceptance; after explicit confirmation save receipt/closure/progress/rules/handoff [skip ci]. Do not auto-startP4.

## Self-review and current execution boundary

Spec coverage mapped to Tasks1–6; shared time/recipient/token types agree across tasks. Five Review Focus items have owning tests; anatomy/scale also gets visual and native renderer checks. Existing branch/workspace/user untracked files preserved; user single-agent instruction overrides skill worktree/reviewer delegation suggestions. This plan introduces no new user approval ceremony; accepted whole-character workflow already defines real F3/style, GIF and final-game Gates. Current task is Task1 only; later tasks remain blocked by their genuine art approvals, not permission to begin the role.
