# Project Boundaries — Shanhaijing Arena

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
