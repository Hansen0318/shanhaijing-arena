# Project State

## Milestone
**Combat Prototype**

## Goal
Prove that the core battle is readable, responsive, and enjoyable before investing in roster art, campaign, progression, or content.

## Locked v1 decisions
- Platform: mobile web, landscape.
- Presentation: 2.5D three-quarter arena.
- Team size: 3v3.
- Arena movement: free 360-degree movement inside bounded arena.
- Character separation: simple collision/avoidance; no complex physics.
- Selected ally is the camera focus.
- Camera uses soft follow, not hard snap.
- Player combat input immediately overrides AI for the selected character.
- After 2.0s without valid input, full AI control resumes.
- Selected character does not change when AI resumes.
- No visible AUTO/MANUAL state.
- Player controls: movement joystick + Heavy + Special + Awakening.
- Basic attack is automatic; no Basic button.
- Soft auto-targeting in prototype.
- Win: all enemy characters KO.
- Lose: all allied characters KO.
- Battle limit: 90 seconds.
- Timeout winner: higher sum of remaining team HP percentages; exact tie = draw.
- Type triangle: Power > Speed > Blast > Power.
- Initial advantage/disadvantage test value: +15% / -15% damage modifier.
- Roles: Tank / Attacker / Support. Healer/Buffer/Controller are Support subtypes in v1.
- Character stat minimum: HP, ATK, DEF, Move Speed, Attack Speed.
- Skill set: Basic, Heavy, Special, Awakening, Passive.
- KO character cannot be selected or healed in v1.
- If selected character is KO, camera/selection moves smoothly to the nearest surviving ally.

## Not in prototype
- Final character art.
- Full animation production.
- Chapter select / 1-1 to 1-5 implementation.
- Story scenes.
- Character unlock economy.
- Fragment farming.
- T3/T2/T1 implementation.
- Large roster.
- PvP, guilds, equipment, gacha, ranking.

## Prototype exit criteria
1. 3v3 can resolve from start to victory/defeat without player input.
2. Player can switch among three allies.
3. Camera soft-follows selected ally.
4. Manual input overrides AI instantly.
5. Full AI resumes after 2.0s of no valid combat input.
6. Basic/Heavy/Special/Awakening all function under AI and player control as applicable.
7. Soft targeting is understandable in play.
8. Damage numbers, HP, KO, timer, victory/defeat are readable.
9. Type advantage rules are verifiably correct.
10. Stable mobile landscape smoke test passes.

## Implementation status

### Completed on `feat/m0-combat-core-20260927`
- Framework-independent deterministic combat core.
- Type triangle helper.
- Battle resolution / 90-second timeout helper.
- Player override -> 2s AI handoff helper.
- Soft-target / KO fallback targeting helpers.
- Existing deterministic core evidence: 14 / 14 passing.
- Immutable Character definition and per-battle state model.
- Character + direct handoff evidence: 9 / 9 passing.
- Declarative Ability definition and shared execution lifecycle.
- Ability isolated evidence: 10 / 10 passing.
- Ability + Character impacted evidence: 16 / 16 passing.
- Deterministic Basic AI intent loop using shared Targeting / ControlHandoff / Ability contracts.
- AI impacted targeted evidence: 27 / 27 passing.

### Pending
- Headless 3v3 simulation.
- Rendering engine integration.
- Arena, touch input, camera, HUD, VFX.

## Open questions for prototype testing
These are tunable, not blockers:
- Is 2.0s AI resume optimal, or should it move to 1.5/2.5s?
- Is 90s match length appropriate?
- Is +/-15% type modifier strong enough to matter without dominating team building?
- Is one Special enough, or does the final game need a second Special?
