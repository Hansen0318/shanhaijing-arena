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
3. full AI after 2.0 seconds without valid combat input.

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
