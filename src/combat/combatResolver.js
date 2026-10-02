import { getTypeMultiplier } from './typeMultiplier.js';
import { applyDamage } from './character.js';

function positiveFinite(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label} must be a positive finite number`);
  }
  return value;
}

export function resolveDamage({
  attacker,
  defender,
  attackerDefinition,
  defenderDefinition,
  abilityDefinition,
  rng,
  damageMultiplier = 1,
}) {
  const coefficient = positiveFinite(abilityDefinition?.effect?.coefficient, 'ability coefficient');
  const multiplier = getTypeMultiplier(attackerDefinition.type, defenderDefinition.type);
  const baseAmount = Math.max(
    1,
    attackerDefinition.stats.atk * coefficient * multiplier - defenderDefinition.stats.def,
  );
  let critical = false;
  if (abilityDefinition.canCrit === true && abilityDefinition.critChance > 0) {
    if (typeof rng !== 'function') throw new TypeError('Crit-capable damage requires an injected rng');
    const roll = rng();
    if (!Number.isFinite(roll) || roll < 0 || roll >= 1) {
      throw new RangeError('random roll must be in [0,1)');
    }
    critical = roll < abilityDefinition.critChance;
  }
  if (!Number.isFinite(damageMultiplier) || damageMultiplier < 0 || damageMultiplier > 1) throw new RangeError("Invalid damage multiplier");
  const amount = baseAmount * (critical ? abilityDefinition.critMultiplier : 1) * damageMultiplier;
  applyDamage(defender, amount);
  return { amount, critical };
}

// Existing headless callers keep the numeric contract; both paths use one resolver.
export function resolveDirectDamage(options) {
  return resolveDamage(options).amount;
}
