# M0 Combat Prototype Preflight

## Decision / requirement scope
This preflight covers only the framework-independent deterministic combat core for M0.

## Implemented in this slice
- Power / Speed / Blast multiplier rule.
- 90-second victory/defeat timeout rule.
- KO helpers and team remaining-HP scoring.
- 2.0-second player override -> full AI handoff timer.
- Soft-target retention and nearest-valid-target fallback.
- Active-character KO fallback helper (nearest surviving ally).

## Explicitly not implemented here
- Rendering engine.
- Arena scene.
- Touch joystick.
- Camera.
- Full character state machine.
- Ability execution.
- AI utility scoring.
- HUD.
- VFX/animation.
- Deployment.

## Runtime stack decision
Do not lock the rendering engine in this slice. The combat core remains framework-independent.

For the next rendering slice, current public releases verified on 2026-09-27 include Phaser 4.2.1 and Vite 8.3.x. Work should re-verify compatibility in the executable environment before adding them.

## Acceptance criteria
- Core deterministic tests pass with Node's built-in test runner.
- No dependency installation is required for this slice.
- No tower-defense code or assumptions are introduced.
- Public APIs remain small and data-oriented.

## Next implementation slice
1. Character model/state.
2. Ability cooldown/state.
3. Basic AI state/utility loop.
4. 3v3 simulation without rendering.
5. Then choose/render mobile-landscape arena stack.
