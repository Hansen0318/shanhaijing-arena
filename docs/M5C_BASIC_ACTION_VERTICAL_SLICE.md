# M5C Basic action + matching Basic VFX — first vertical slice (2026-10-15)

**Status: CHAT DESIGN PROPOSAL / PLAYER MOTION & VFX APPROVAL PENDING.** Not yet an approved asset, executable milestone, or Work handoff. GitHub governs all current character/source constraints.

## Recovered authority
- P1–P5 Concept/static battleIdle/locomotion/static KO, shared dynamic residency, shared first-entry portraits: PLAYER VERIFIED, protected.
- `src/roster/abilities.js`: P1 鹿蜀 Basic `P1.basic`, named 踏角; description 近距角蹄攻擊; close-range [min0,preferred0.65,max1.25] Arena units, coefficient1, cooldown0, standard Basic cadence from Attack Speed1.15. No attack movement added to authoritative XY.
- P1 visual: agile mythic humanoid horse/deer head, white face, broad tiger markings, single vermilion-red tail, lean forward skirmisher, not armored/bulky; canonical right-facing art, runtime flip for opposite direction.
- Existing `BattleSession.drainCastEvents` and `AssetPresenter.cast` establish shared cast presentation hook; generic `characterVfx` uses existing data-driven descriptors. Basic is automatic, no extra player button.

## Proposed player-review behavior for P1 prototype
**Art concept**: one short **horn-and-hoof forward strike** (踏角), not a dash/teleport. Upper torso/shoulders and one striking forearm/horn lean toward facing target while one grounded hoof leads; tail snaps counterdirection then settles. Keep canonical P1 approved head/markings/tail/single weapon identity, no new accessory. No translation of sprite gameplay anchor/hitbox. Underlying visible locomotion pauses/overrides only during the brief authorized action state and resumes afterward. Do not alter actual actor movement.

**Suggested authoring format (not yet player approved)**: 4 distinct drawings in a 4-frame equal padded transparent strip, authored right-facing. Pose progression: F1 anticipation / compress → F2 forward strike → F3 contact follow-through → F4 recovery. Approximate visual duration 0.25–0.35 s, but DO NOT fix runtime fps or timing before reconciling the real event's impact and cadence semantics. All frames same feet/ground anchor and approved silhouette/scale. Author/edit in Chat, normalize each separately (no naive slicing), alpha/padding/bleed checks, GIF preview from safe cells only, then player approves exact art.

**Matching Basic VFX concept**: one restrained cyan-white short impact slash/flash at target contact, no projectile, no large area, no persistent ring, no extra lighting/color gradient. Visible only after an actual valid Basic hit event. Exact geometry and visual timing are nonauthoritative and must not create an extra hit, false impact or attack telegraph; the engine's resolved hit event is authoritative. If event interface lacks impact anchoring, implement a shared data-driven visual hook, not a P1 special-case. Optional/reduced-motion version uses a short static flash.

## Important execution boundary
1. Chat must inspect approved P1 art and current hit/cast event timing, then present the pose/VFX concept for PLAYER acceptance before generating an image. Do not infer approval from older KO/locomotion approvals.
2. After approval, Chat prepares the approved four-frame source, transparent safe derivative, VFX art if approved, verification/hashes; only then Work integrates against shared presentation descriptors and real cast/hit events.
3. No changes to attack speed, damage, crit, range, targeting, cooldown, AI, movement, KO or Tier; no new player Basic button. No new character-specific runtime branching.
4. Work executable gate: generic Basic action state lifetime and matching hit visual, KO/reduced-motion/last-facing/move-resume fallbacks, test/build/Pages/fingerprint and player phone smoke. Only after P1 vertical slice is player verified may the same system expand to P2–P5; Heavy/Special/Awakening remain deferred.
5. Do not merge main.
