# M0 Rendering / Build Stack Decision

## Decision
For the first playable M0 runtime, use:

- **Phaser 4.2.1**
- **Vite 8.3.1**
- plain JavaScript / ESM
- no React/Vue/Svelte layer
- existing Node built-in test runner remains for deterministic combat tests

## Why
The current combat foundation is already framework-independent JavaScript. M0 only needs:
- a mobile-web canvas;
- scene lifecycle;
- sprite/shape rendering;
- camera follow;
- pointer/touch input;
- lightweight HUD;
- a production static build.

Adding a UI framework would create an extra runtime/dependency layer without solving an M0 requirement.

## Version lock
Phaser 4.2.1 is the current Phaser 4 release selected for this integration.
Vite 8.3.1 is the current Vite release selected for this integration.

Do not silently upgrade either dependency inside the M0 renderer slice. A later upgrade is a separate dependency-change task with its own verification.

Vite 8 requires a compatible modern Node runtime, so repository metadata is tightened to Node >=22.12.0.

## Architecture boundary
Phaser is a presentation/input adapter around the existing Arena combat model.

Do not move deterministic combat truth into Phaser objects.

Keep:
- Character state in existing Character model;
- Ability state in existing Ability model;
- AI decisions in existing AI module;
- battle resolution in existing battle rules;
- damage in CombatResolver.

Phaser owns:
- render objects;
- scene lifecycle;
- camera;
- pointer/touch input translation;
- visual HUD;
- visual interpolation/presentation.

## First renderer slice
The first executable renderer slice must be deliberately small.

Required:
1. Vite can start/build the project.
2. Phaser boots one scene without console/runtime errors.
3. landscape canvas responds to viewport sizing.
4. render six placeholder combatants from Arena state data.
5. map Arena x/y state into screen/world coordinates through one explicit adapter.
6. run the existing combat simulation/state update path rather than implementing duplicate Phaser combat rules.
7. camera can follow one selected allied placeholder.
8. no final art, VFX, progression, campaign, or production HUD.

Placeholder combatants may be simple geometric shapes/text labels. Final character art remains out of M0 until combat prototype acceptance.

## Mobile-landscape boundary
For the first runtime slice:
- landscape only;
- responsive fit to available viewport;
- preserve a stable logical game world independent of CSS/device pixels;
- no device-specific pixel-perfect layout work yet;
- avoid heavyweight physics.

Exact camera damping, UI spacing, touch control sizing, and safe-area polish remain later player-smoke/tuning work.

## Verification scope
This stack integration changes build/runtime infrastructure, so minimum engineering verification is:
- existing deterministic Node tests still start and pass;
- Vite production build passes;
- one browser runtime smoke proves Phaser scene boot and six actors render;
- no need for final mobile feel/player acceptance yet.

Do not perform broad visual polish or unrelated full-game testing.

## Work-only capability gap
The next implementation now genuinely requires Work because it needs:
- dependency installation and lockfile generation;
- executable Vite/Phaser integration;
- dev-server/build loop;
- browser/runtime smoke.

Chat has already completed the stack decision, architecture boundary, dependency versions, scope, and acceptance criteria.
