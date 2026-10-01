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

## Deterministic per-ability critical contract
Ability Definition may declare immutable `canCrit` (boolean), `critChance` ([0,1]), `critMultiplier` (positive finite). Omitted fields default false/0/1. No Type/Role/category inference. Compute `max(1, ATK × coefficient × typeMultiplier − DEF)`, then multiply by the ability's critMultiplier only on a critical hit. HP clamps as before; damage event amount is the exact final resolver value including overkill, with a boolean `critical` flag.
AI/player share `resolveDamage` through BattleSession. `resolveDirectDamage` keeps the legacy numeric API around that same resolver. Eligible positive hits consume exactly one [0,1) roll (`roll < critChance`); disabled/zero chance, air/invalid/KO/no-damage actions do not roll. Crit-capable standalone calls require injected RNG.
Each fresh BattleSession creates its own Mulberry32 RNG using uint32 `seed` (default `0x5348414e`); optional injected `rng` is caller-owned, intended for reproducible test sources. Same seed/state/input sequence replays the same crit sequence. Restart/Retry create fresh sessions and reset the generator, not carry old state. Stage factory may accept `battleSeed` or explicit seed options; current stages use the default seed.
Runtime placeholder Basic/Heavy/Special are true/.10/1.50, true/.20/1.75, true/.15/1.75; Awakening false/0/1. Canonical headless demo abilities remain no-crit. These are visibility values, not formal balance; cooldowns remain 3/5/10.
