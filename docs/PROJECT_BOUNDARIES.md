# Project Boundaries — Shanhaijing Arena

## 2026-10-22 — Current policy / P2 closure

P2 current character scope is CLOSED by the existing accepted base/scale/four-skill evidence; see `verification/P2_CHARACTER_CLOSURE.md` and `.json`. No P3/TD scope is authorized. Current global asset policy has no fixed total decoded-byte/required-count/131072-reserve admission gate; cache maxBytes is null. Keep per-file safety, two concurrent downloads, complete required pins/readiness, ownership/reclamation/actual failures/scene destruction. The older28-failure/Browser-blocked/design-only entries below are historical, superseded by the accepted66e6c3c release and current closure; do not restore their pending gates or caps. No runtime changes in this docs-only audit.

## 2026-10-22 — Global dynamic policy implementation checkpoint

The approved shared policy is now implemented in schema/cache/residency: no fixed total decoded-byte or required-count admission ceiling, no131072reserve gate. Existing cache16MiB/64 defaults are only inactive retention targets; scene12MiB is soft unpinned reclamation. Per-file4MiB/2048/4194304 and every required image, real failure handling and teardown stay mandatory. Do not restore old caps from history, create per-character exceptions or revive Chiru KO splitting. Evidence and current28full-suite failures/Browser blocker are in `verification/P2_AWAKENING_PREFLIGHT/global-residency-runtime/REPORT.md`; this is not Awakening integration, native/mobile acceptance or deployment. Preserve branch/PR and all approved artwork/gameplay.

## 2026-10-22 — Global decoded-byte limit direction (design only)

Player explicitly selected a game-wide shared dynamic-residency policy without a fixed **total decoded-byte hard ceiling**, superseding the character-specific Chiru KO split proposal, and wants a verified deployment for in-game skill review. Written design `docs/superpowers/specs/2026-10-22-global-dynamic-asset-residency-design.md` awaits independent review. Existing 16MiB/cache/scene/64-entry/131072-reserve code remains unchanged until an approved plan and tested implementation; earlier fixed-cap rules below document historical releases, not the new policy. Preserve per-asset limits, all required presentation keys, error handling, scene cleanup, approved art/gameplay and the same feature branch/PR. No immediate deployment or phone acceptance is inferred.

## Purpose
Prevent accidental contamination from other Shanhaijing projects, especially `shanhaijing-td`.

## Reusable across projects
Only project-governance practices may be reused by default:
- Chat-first delegation;
- Work-minimization;
- safe checkpoints;
- zero-context recovery;
- progress/state documentation;
- risk-based testing;
- player-owned smoke;
- release/status discipline;
- asset approval/reuse discipline where it is generic.

## Forbidden by default
Do **not** import, assume, or copy any tower-defense-specific gameplay contract unless the user explicitly approves it for Arena.

Examples of forbidden implicit carry-over:
- tower slots / build pads;
- tower placement;
- path-following enemies;
- Spawn -> Base path progression;
- Wave composition / wave timers;
- tower projectile rules;
- Blessing eligibility/filter logic;
- TD Boss HUD geometry/contracts;
- TD lineup progression rules;
- TD level numbering or level-folder conventions;
- TD-specific anchor/geometry transforms;
- TD-specific asset-loading assumptions;
- TD balance values, enemy spacing rules, or tower upgrade rules;
- TD-specific dev query parameters or release URLs.

## Code isolation
- Do not copy source files from `shanhaijing-td` into this repository by default.
- Reusing a generic algorithm/pattern is allowed only after rewriting it against Arena's own contracts and tests.
- Any deliberate cross-project code reuse must be documented in an ADR with source, reason, compatibility review, and tests.

## Arena-native architecture
Arena owns its own:
- Character model;
- Team model;
- Controller arbitration;
- AI decision system;
- Ability system;
- Targeting;
- free-movement arena rules;
- Camera;
- HUD;
- progression/campaign rules;
- data schemas;
- tests and release criteria.

## Conflict rule
If a developer/agent notices a TD rule appearing in an Arena task or implementation without an explicit Arena decision:
1. stop treating it as inherited truth;
2. compare against Arena canonical docs;
3. remove or quarantine the assumption;
4. ask for a decision only if Arena docs do not resolve it.

## Naming rule
Avoid TD-specific terminology in Arena code/specs unless describing an explicit non-runtime comparison. Prefer Arena-native terms such as character, team, arena, encounter, ability, target, camera, roster, chapter.
