import { chooseSoftTarget } from './targeting.js';
import { canCharacterAct } from './character.js';
import { canStartAbility } from './ability.js';

const NON_BASIC_ORDER = ['awakening', 'special', 'heavy'];
export const AI_ENGAGE_DISTANCE = 0.20;

function priorityOf(definition) {
  const value = definition?.ai?.priority;
  return Number.isFinite(value) ? value : 0;
}

function targetId(target) {
  return target?.instanceId ?? target?.id ?? null;
}

function distance(actor, target) {
  return Math.hypot(actor.x - target.x, actor.y - target.y);
}

function abilityDefinitionFor(actor, category, definitions) {
  const id = actor.abilityState?.[category]?.definitionId;
  return id ? definitions[id] ?? null : null;
}

function readyCandidate(actor, category, definitions) {
  const definition = abilityDefinitionFor(actor, category, definitions);
  const slot = actor.abilityState?.[category] ?? null;
  if (!definition || !slot || slot.phase !== 'ready') return null;
  return { category, definition, slot };
}

function spacingMove(candidate, actor, target) {
  const { definition } = candidate;
  if (definition.preferredRange === null) return null;

  const d = distance(actor, target);
  if (d < definition.minRange) {
    return {
      kind: 'move',
      movement: 'retreat',
      reason: 'skill_spacing_too_close',
      category: candidate.category,
      definitionId: definition.id,
      targetId: targetId(target),
      desiredRange: definition.preferredRange,
    };
  }

  if (d > definition.maxRange) {
    return {
      kind: 'move',
      movement: 'approach',
      reason: 'skill_spacing_too_far',
      category: candidate.category,
      definitionId: definition.id,
      targetId: targetId(target),
      desiredRange: definition.preferredRange,
    };
  }

  return null;
}

function legacyPursue(actor, target) {
  return distance(actor, target) > AI_ENGAGE_DISTANCE;
}

export function decideAIIntent({
  actor,
  enemies,
  currentTarget = null,
  abilityDefinitions,
  nowMs,
}) {
  if (!canCharacterAct(actor)) {
    return { kind: 'idle', reason: 'ko', targetId: null };
  }

  if (actor.controlHandoff.controlSource(nowMs) === 'player') {
    return { kind: 'idle', reason: 'player_override', targetId: targetId(currentTarget) };
  }

  const target = chooseSoftTarget(actor, enemies, currentTarget);
  if (!target) {
    return { kind: 'idle', reason: 'no_target', targetId: null };
  }

  const prioritized = NON_BASIC_ORDER
    .map((category) => readyCandidate(actor, category, abilityDefinitions))
    .filter((candidate) => candidate && priorityOf(candidate.definition) > 0)
    .sort((a, b) => priorityOf(b.definition) - priorityOf(a.definition));

  for (const candidate of prioritized) {
    const spacing = spacingMove(candidate, actor, target);
    if (spacing) return spacing;

    if (canStartAbility({
      caster: actor,
      slot: candidate.slot,
      definition: candidate.definition,
      target,
    })) {
      return {
        kind: 'ability',
        category: candidate.category,
        definitionId: candidate.definition.id,
        targetId: targetId(target),
        pursue: candidate.definition.preferredRange === null
          ? legacyPursue(actor, target)
          : false,
      };
    }
  }

  const basic = readyCandidate(actor, 'basic', abilityDefinitions);
  if (basic) {
    const spacing = spacingMove(basic, actor, target);
    if (spacing) return spacing;

    if (canStartAbility({
      caster: actor,
      slot: basic.slot,
      definition: basic.definition,
      target,
    })) {
      return {
        kind: 'ability',
        category: 'basic',
        definitionId: basic.definition.id,
        targetId: targetId(target),
        pursue: basic.definition.preferredRange === null
          ? legacyPursue(actor, target)
          : false,
      };
    }
  }

  return {
    kind: 'move',
    movement: 'approach',
    reason: 'pursue_nearest',
    targetId: targetId(target),
    desiredRange: AI_ENGAGE_DISTANCE,
  };
}
