import { canCharacterAct, isCharacterKO } from './character.js';

const ACTIVE_CATEGORIES = new Set(['basic', 'heavy', 'special', 'awakening']);
const NO_EXTERNAL_TARGET_RULES = new Set(['self', 'none']);

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
  const range = nonnegativeFinite(input.range, 'range');
  const targetingRule = nonempty(input.targetingRule, 'targetingRule');
  if (input.category === 'basic' && cooldown !== 0) {
    throw new RangeError('Basic ability cooldown must be 0');
  }

  return Object.freeze({
    id: input.id,
    category: input.category,
    cooldown,
    range,
    targetingRule,
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

export function canStartAbility({ caster, slot, definition, target = null, ignoreRange = false }) {
  if (!canCharacterAct(caster)) return false;
  if (!slot || slot.definitionId !== definition.id || slot.phase !== 'ready') return false;

  if (!abilityNeedsExternalTarget(definition)) return true;
  if (!target || isCharacterKO(target)) return false;
  return ignoreRange || isTargetInRange(caster, target, definition.range);
}

export function startAbility({ caster, slot, definition, target = null, source = 'ai', ignoreRange = false }) {
  if (source !== 'ai' && source !== 'player') throw new TypeError('source must be ai or player');
  if (!canStartAbility({ caster, slot, definition, target, ignoreRange })) return false;

  slot.phase = 'executing';
  slot.targetId = abilityNeedsExternalTarget(definition) ? (target.instanceId ?? target.id ?? null) : null;
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
