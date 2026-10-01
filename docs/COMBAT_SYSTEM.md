# Combat System v1

## Match
- 3 allies vs 3 enemies.
- Real-time.
- 90-second limit.
- Enemy team fully KO -> victory.
- Allied team fully KO -> defeat.
- Timeout -> compare sum of each surviving/KO member's remaining HP percentage; higher total wins; exact tie draws.

## Abilities
### Basic
- Automatic.
- No cooldown.
- No dedicated player button.
- Character-specific attack cadence/animation may vary.

### Heavy
- Short cooldown.
- Frequently used by AI.
- Stronger impact than Basic.

### Special
- Medium cooldown.
- Defines major tactical identity: damage, heal, shield, control, buff/debuff, etc.

### Awakening
- Long cooldown or future gauge-driven implementation.
- Signature ability with high visual/strategic identity.
- Available already at T3 in the progression concept; later tiers improve mechanics, not merely damage.

### Passive
- Always-on or conditional character rule.

## AI ability use
AI does not simply press everything on cooldown.
- Heavy: use when ready and a valid target is in range.
- Heal: use when an ally crosses a configured HP threshold.
- Shield/buff: use when configured tactical conditions are met.
- AoE: prefer when multiple valid enemies can be affected.
- Control: prefer valid high-value targets not currently immune.
- Awakening: higher trigger threshold than normal skills.

Decision checks should be periodic rather than every render frame.

## Combat feedback
Prototype minimum:
- HP bars.
- Damage/heal floating numbers.
- Hit reaction.
- Cooldown feedback.
- KO state.
- Victory/defeat.
Final polish may later add hit stop, camera shake, stronger VFX, audio, status callouts.

## Bounded damage presentation
BattleSession publishes a separate drainDamageEvents queue only from actual resolved damage application shared by AI/player. Amount remains the resolver value (including overkill), display rounds to nearest integer without changing math. Scene-owned floating text uses the existing Phaser tween clock for Pause/orientation freeze and is cleaned on shutdown. Misses, air casts and no-damage actions create no number.
