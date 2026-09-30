# Technical Architecture v1

## Principle
This is a new architecture. Do not reuse tower-defense gameplay architecture.

## Core modules
- BattleManager
- TeamManager
- Character
- CharacterState
- AIController
- PlayerOverrideController
- MovementSystem
- TargetingSystem
- AbilitySystem
- StatusEffectSystem
- CombatResolver
- CameraSystem
- HUD/UI

## Controller model
Character combat logic is shared.
AI and player input feed intents into the same character/ability systems.

Priority:
1. active player input;
2. short assist/continuity behavior as needed;
3. full AI immediately on the next simulation step after joystick release (current player-confirmed baseline).

Do not implement duplicated "manual character" and "AI character" combat engines.

## Arena
- Free 360-degree movement.
- Bounded playable area.
- Simple separation/avoidance between characters.
- Avoid heavyweight physics unless later justified.

## Data
Prefer declarative character/ability definitions so player and enemy variants can share data.

## Prototype technology
Exact framework/engine selection may be finalized by Work during preflight, but the architecture above is framework-independent. Mobile web delivery remains the target.

## M1 Campaign integration
Campaign data/progression/persistence/controller/DOM view are separate from the existing combat engine. Stage config feeds battleFactory → existing BattleSession, with stageId/chapterId attached at the routing boundary. ArenaScene receives navigation callbacks and delegates results; combat never accesses storage. Scene shutdown/restart retains existing input cleanup. The 1120x540 Phaser.Scale.NONE fixed-camera baseline is unchanged.

## M2 roster/team boundary
Catalog/ownership: `src/roster/catalog.js`. Eligibility and ordered 3-slot selection: `team.js`. DOM selection UI/style: `view.js`/`style.css`. Placeholder battle identity: `battlePresentation.js`. Versioned recent-team storage: `persistence.js` (`shanhaijing-arena.team.v1`); only valid complete teams save at BATTLE, independent of Campaign storage/combat. Missing/invalid/obsolete IDs are safely filtered; failed writes retain latest in-memory team, and reload cannot recover an unsaved write.

CampaignController owns team route, last valid team and frozen per-battle IDs. Battle factory validates selected IDs/ownership/current stage restrictions and instantiates catalog definitions at the unchanged slot spawn formation. No combat core or input architecture changes. Explicit dev fixture never loads/writes formal team saves.
