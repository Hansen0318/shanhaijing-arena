# Work Progress

## CURRENT HANDOFF POINTER
- Project: **Shanhaijing Arena**
- Milestone: **M0 — Combat Prototype foundation**
- Active feature branch: `feat/m0-combat-core-20260927`
- Active PR: **#1 — M0: combat core foundation**
- Latest completed implementation slice: M0 Character definition and per-battle state (`6366a499` safe remote checkpoint)
- Latest completed Chat-first slice: Ability execution boundary/API/target-validation contract + exact Level B targeted test scope
- Recovery rule: inspect the active branch/PR first; do **not** recreate the completed deterministic core or Character slice
- Next exact step: implement Ability definition + shared execution lifecycle against `docs/CHARACTER_SYSTEM.md`; run Ability + Character targeted tests only, escalating only if changed imports/contracts require it
- Canonical state: `docs/STATE.md`
- Workflow: `docs/DEVELOPMENT_PLAYBOOK.md`
- Character/Ability contract: `docs/CHARACTER_SYSTEM.md`
- Test scope: `docs/TEST_STRATEGY.md`
- Preflight: `docs/PREFLIGHT_M0.md`

## Current status
Design/spec foundation, deterministic combat core, and the Character model slice are complete on the active branch. PR #1 remains open. Chat has now removed the remaining Ability design ambiguity before executable implementation.

## Completed design decisions
- Mobile landscape.
- 2.5D / three-quarter arena presentation.
- 3v3 real-time semi-auto combat.
- All characters can fight autonomously.
- Player can select one allied character and intervene at any time.
- 2.0 seconds without valid combat input returns that character to full AI decision-making.
- Camera continues following the selected character.
- No AUTO/MANUAL UI state indicator.
- Types: Power / Speed / Blast.
- Roles: Tank / Attacker / Support; type and role are independent.
- Skill model: Basic / Heavy / Special / Awakening / Passive.
- Basic has no cooldown and is automatic.
- Enemy characters use the same core character rules/data model as player characters.
- Character progression concept: T3 -> T2 -> T1 with character fragments.
- Campaign concept: chapters with 1-1 through 1-5 story stages.

## Implemented M0 core slice
- Type multiplier rule.
- KO / team HP score / victory-defeat timeout rule.
- 2-second control handoff timer.
- Soft-target retention and nearest-target fallback.
- Nearest surviving ally helper for selected-character KO.
- Deterministic tests for these rules.

## Implemented M0 Character slice
- Immutable definition snapshot: identity, type/role, five stats, active ability references and passive references.
- Shared player/enemy per-battle state: runtime/team identifiers, bounded HP, arena coordinates, target identifier, independent active ability runtime slots, and existing control handoff instance.
- Derived KO gates for action and selection; zero-HP KO is terminal and cannot be healed.
- Framework-independent code in `src/combat/character.js` with deterministic tests in `tests/character.test.js`.
- Safe remote checkpoint: `6366a4991d6e09242a0e465c372c259bcc991e13`.

## Chat-first Ability contract completed
- Ability definitions stay declarative and renderer-free.
- Runtime phases are exactly `ready / executing / cooldown`.
- Cooldown begins on successful execution finish/resolution, not on start.
- Zero-cooldown Basic returns directly to ready after finish.
- Cooldown ticking clamps at zero.
- KO caster cannot start; caster KO during caster-required execution cancels pending resolution without cooldown.
- Target selection remains in Targeting; Ability only validates a resolved target.
- Targeted start rejects missing, KO, or out-of-range targets.
- AI/player use the same ability request/execution API.
- Exact Level B Ability test cases are recorded in `docs/TEST_STRATEGY.md`.

## Verification
- Existing deterministic core tests: **14 / 14 PASS** recorded evidence.
- Character targeted tests and directly imported control-handoff tests: **9 / 9 PASS**.
- Character implementation static review against contract: **PASS**.
- Ability contract/static dependency review against current Character + Targeting code: **PASS**.
- No runtime tests were rerun for Chat-only documentation changes because they cannot invalidate executable behavior.
- Rendering/browser/mobile smoke: **not applicable yet**.
- Player smoke: **not started**.

## Known blockers / defects
- None in deterministic core or Character slice.
- Rendering stack is intentionally not locked yet.
- Ability executable implementation is the first unfinished item.

## Remaining M0 work
1. Ability cooldown/execution implementation + targeted deterministic tests.
2. Basic AI decision loop.
3. Headless 3v3 simulation.
4. Select/integrate rendering stack.
5. Mobile-landscape arena.
6. Character selection UI.
7. Soft-follow camera.
8. Touch controls and player override integration.
9. HUD / damage numbers / KO presentation.
10. Runtime/mobile smoke and final M0 verification.

## Prototype exit criteria
See `docs/STATE.md` and `docs/TEST_STRATEGY.md`.
