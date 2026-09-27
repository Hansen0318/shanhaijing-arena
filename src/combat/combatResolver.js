import { getTypeMultiplier } from './typeMultiplier.js';
import { applyDamage } from './character.js';

function positiveFinite(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label} must be a positive finite number`);
  }
  return value;
}

export function resolveDirectDamage({
  attacker,
  defender,
  attackerDefinition,
  defenderDefinition,
  abilityDefinition,
}) {
  const coefficient = positiveFinite(abilityDefinition?.effect?.coefficient, 'ability coefficient');
  const multiplier = getTypeMultiplier(attackerDefinition.type, defenderDefinition.type);
  const amount = Math.max(
    1,
    attackerDefinition.stats.atk * coefficient * multiplier - defenderDefinition.stats.def,
  );
  applyDamage(defender, amount);
  return amount;
}
