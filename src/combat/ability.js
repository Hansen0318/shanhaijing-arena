import {createTelegraph} from './threats.js';
import { canCharacterAct, isCharacterKO } from './character.js';

const ACTIVE_CATEGORIES = new Set(['basic', 'heavy', 'special', 'awakening']);
const NO_EXTERNAL_TARGET_RULES = new Set(['self', 'none', 'team_ally']);

function nonempty(value, label) {
  if (typeof value !== 'string' || !value.trim()) throw new TypeError(`${label} must be a nonempty string`);
  return value;
}

function nonnegativeFinite(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    throw new RangeError(`${label} must be a nonnegative finite number`);
  }
  return value;
}

export function createAbilityDefinition(input) {
  nonempty(input?.id, 'id');
  if (!ACTIVE_CATEGORIES.has(input?.category)) throw new TypeError('Unknown ability category');
  const cooldown = nonnegativeFinite(input.cooldown, 'cooldown');
  const unlockTier = nonnegativeFinite(input.unlockTier ?? 0, 'unlockTier');
  const canCrit = input.canCrit === undefined ? false : input.canCrit;
  if (typeof canCrit !== 'boolean') throw new TypeError('canCrit must be boolean');
  const critChance = input.critChance === undefined ? 0 : nonnegativeFinite(input.critChance, 'critChance');
  if (critChance > 1) throw new RangeError('critChance must be between 0 and 1');
  const critMultiplier = input.critMultiplier === undefined ? 1 : nonnegativeFinite(input.critMultiplier, 'critMultiplier');
  if (critMultiplier === 0) throw new RangeError('critMultiplier must be positive');
  if (input.range != null) nonnegativeFinite(input.range, 'range');
  const maxRange = nonnegativeFinite(input.maxRange ?? input.range, 'maxRange');
  const minRange = input.minRange == null ? 0 : nonnegativeFinite(input.minRange, 'minRange');
  const preferredRange = input.preferredRange == null
    ? null
    : nonnegativeFinite(input.preferredRange, 'preferredRange');
  if (minRange > maxRange) throw new RangeError('minRange must not exceed maxRange');
  if (preferredRange !== null && (preferredRange < minRange || preferredRange > maxRange)) {
    throw new RangeError('preferredRange must be between minRange and maxRange');
  }
  const targetingRule = nonempty(input.targetingRule, 'targetingRule');
  if (input.category === 'basic' && cooldown !== 0) {
    throw new RangeError('Basic ability cooldown must be 0');
  }

  return Object.freeze({
    id: input.id,
    name: input.name ?? input.id,
    description: input.description ?? null,
    category: input.category,
    cooldown,
    unlockTier,
    canCrit,
    critChance,
    critMultiplier,
    range: maxRange,
    minRange,
    preferredRange,
    maxRange,
    targetingRule,
    telegraph: createTelegraph(input.telegraph),
    effect: Object.freeze({ ...(input.effect ?? {}) }),
    ai: Object.freeze({ ...(input.ai ?? {}) }),
  });
}

export function abilityNeedsExternalTarget(definition) {
  return !NO_EXTERNAL_TARGET_RULES.has(definition.targetingRule);
}

export function isTargetInRange(caster, target, range) {
  if (!target) return false;
  const dx = caster.x - target.x;
  const dy = caster.y - target.y;
  return dx * dx + dy * dy <= range * range;
}

export function canStartAbility({
  caster,
  slot,
  definition,
  target = null,
  ignoreRange = false,
  allowNoTarget = false,
}) {
  if (!canCharacterAct(caster)) return false;
  if (!slot || slot.definitionId !== definition.id || slot.phase !== 'ready') return false;

  if (!abilityNeedsExternalTarget(definition)) return true;
  if (!target) return allowNoTarget;
  if (isCharacterKO(target)) return false;
  if (definition.targetingRule === 'lowest_hp_ally' && caster.teamId !== target.teamId) return false;
  if (definition.targetingRule === 'enemy' && caster.teamId === target.teamId) return false;
  return ignoreRange || isTargetInRange(caster, target, definition.range);
}

export function startAbility({
  caster,
  slot,
  definition,
  target = null,
  source = 'ai',
  ignoreRange = false,
  allowNoTarget = false,
}) {
  if (source !== 'ai' && source !== 'player') throw new TypeError('source must be ai or player');
  if (!canStartAbility({
    caster,
    slot,
    definition,
    target,
    ignoreRange,
    allowNoTarget,
  })) return false;

  slot.phase = 'executing';
  slot.targetId = abilityNeedsExternalTarget(definition)
    ? (target?.instanceId ?? target?.id ?? null)
    : null;
  slot.cooldownRemaining = 0;
  return true;
}

export function finishAbility({ caster, slot, definition, applyEffect = null }) {
  if (!slot || slot.definitionId !== definition.id || slot.phase !== 'executing') return false;

  if (!canCharacterAct(caster)) {
    cancelAbility(slot);
    return false;
  }

  if (typeof applyEffect === 'function') applyEffect();

  slot.targetId = null;
  slot.cooldownRemaining = definition.cooldown;
  slot.phase = definition.cooldown === 0 ? 'ready' : 'cooldown';
  return true;
}

export function cancelAbility(slot) {
  slot.phase = 'ready';
  slot.cooldownRemaining = 0;
  slot.targetId = null;
}

export function tickAbilityCooldown(slot, deltaSeconds) {
  nonnegativeFinite(deltaSeconds, 'deltaSeconds');
  if (!slot || slot.phase !== 'cooldown') return slot?.cooldownRemaining ?? 0;

  slot.cooldownRemaining = Math.max(0, slot.cooldownRemaining - deltaSeconds);
  if (slot.cooldownRemaining === 0) {
    slot.phase = 'ready';
    slot.targetId = null;
  }
  return slot.cooldownRemaining;
}
