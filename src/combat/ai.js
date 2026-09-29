import { chooseSoftTarget } from './targeting.js';
import { canCharacterAct } from './character.js';
import { canStartAbility } from './ability.js';

const NON_BASIC_ORDER = ['awakening', 'special', 'heavy'];
export const AI_ENGAGE_DISTANCE = 0.75;

function priorityOf(definition) {
  const value = definition?.ai?.priority;
  return Number.isFinite(value) ? value : 0;
}

function targetId(target) {
  return target?.instanceId ?? target?.id ?? null;
}

function abilityDefinitionFor(actor, category, definitions) {
  const id = actor.abilityState?.[category]?.definitionId;
  return id ? definitions[id] ?? null : null;
}

function shouldKeepPursuing(actor, target) {
  const dx = actor.x - target.x;
  const dy = actor.y - target.y;
  return dx * dx + dy * dy > AI_ENGAGE_DISTANCE * AI_ENGAGE_DISTANCE;
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
    .map((category) => ({
      category,
      definition: abilityDefinitionFor(actor, category, abilityDefinitions),
      slot: actor.abilityState?.[category] ?? null,
    }))
    .filter(({ definition }) => definition && priorityOf(definition) > 0)
    .sort((a, b) => priorityOf(b.definition) - priorityOf(a.definition));

  for (const candidate of prioritized) {
    if (canStartAbility({ caster: actor, slot: candidate.slot, definition: candidate.definition, target })) {
      return {
        kind: 'ability',
        category: candidate.category,
        definitionId: candidate.definition.id,
        targetId: targetId(target),
        pursue: shouldKeepPursuing(actor, target),
      };
    }
  }

  const basicDefinition = abilityDefinitionFor(actor, 'basic', abilityDefinitions);
  const basicSlot = actor.abilityState?.basic ?? null;
  if (basicDefinition && canStartAbility({ caster: actor, slot: basicSlot, definition: basicDefinition, target })) {
    return {
      kind: 'ability',
      category: 'basic',
      definitionId: basicDefinition.id,
      targetId: targetId(target),
      pursue: shouldKeepPursuing(actor, target),
    };
  }

  return {
    kind: 'move',
    reason: 'pursue_nearest',
    targetId: targetId(target),
    x: target.x,
    y: target.y,
  };
}
