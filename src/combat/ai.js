import { resolveAbilityTarget, resolveEffectTargets } from './effectTargeting.js';
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

// Tunable policy, not a character/role rule. State belongs to BattleSession.
export const AI_PREPARATION = Object.freeze({ windowSeconds: 1.5, enterTolerance: 0.25, settleTolerance: 0.06 });
function clearPreparation(state) {
  if (state) Object.assign(state, { category: null, targetId: null, movement: null });
}
function preparedIntent(actor, target, definitions, state, tuning) {
  if (!state) return null;
  let candidate = state.category ? {
    category: state.category, definition: abilityDefinitionFor(actor, state.category, definitions),
    slot: actor.abilityState[state.category],
  } : null;
  const usable = c => c?.definition?.preferredRange !== null && c?.definition
    && c.definition.targetingRule === 'enemy' && priorityOf(c.definition) > 0
    && (c.slot?.phase === 'ready' || (c.slot?.phase === 'cooldown'
      && c.slot.cooldownRemaining <= tuning.windowSeconds));
  if (state.targetId !== targetId(target) || !usable(candidate)) {
    clearPreparation(state);
    // Preserve existing ready-skill priority before beginning a new commitment.
    if (NON_BASIC_ORDER.some(category => {
      const ready = readyCandidate(actor, category, definitions);
      return ready && priorityOf(ready.definition) > 0;
    })) return null;
    candidate = NON_BASIC_ORDER.map(category => ({ category,
      definition: abilityDefinitionFor(actor, category, definitions), slot: actor.abilityState[category] }))
      .filter(c => usable(c) && c.slot.phase === 'cooldown')
      .sort((a,b) => priorityOf(b.definition)-priorityOf(a.definition))[0];
    if (!candidate) return null;
    Object.assign(state, { category: candidate.category, targetId: targetId(target) });
  }
  const { definition, slot, category } = candidate;
  const d = distance(actor,target), preferred = definition.preferredRange;
  if (slot.phase === 'ready' && d >= definition.minRange && d <= definition.maxRange
      && canStartAbility({caster:actor,slot,definition,target})) {
    clearPreparation(state);
    return {kind:'ability',category,definitionId:definition.id,targetId:targetId(target),pursue:false};
  }
  // A wider enter band and narrower settle band prevent direction toggling at the edge.
  if (state.movement === 'retreat' && d >= preferred-tuning.settleTolerance) state.movement = null;
  if (state.movement === 'approach' && d <= preferred+tuning.settleTolerance) state.movement = null;
  if (!state.movement) {
    if (d < preferred-tuning.enterTolerance) state.movement = 'retreat';
    else if (d > preferred+tuning.enterTolerance) state.movement = 'approach';
  }
  if (state.movement) return {kind:'move',movement:state.movement,reason:'cooldown_preparation',
    category,definitionId:definition.id,targetId:targetId(target),desiredRange:preferred};
  // Basic remains automatic at preparation range, without dragging the actor inward.
  const basic=readyCandidate(actor,'basic',definitions);
  if (basic && canStartAbility({caster:actor,slot:basic.slot,definition:basic.definition,target}))
    return {kind:'ability',category:'basic',definitionId:basic.definition.id,targetId:targetId(target),pursue:false};
  return {kind:'idle',reason:'preparation_hold',targetId:targetId(target)};
}

export function decideAIIntent({
  actor,
  enemies,
  allies = [actor],
  currentTarget = null,
  abilityDefinitions,
  nowMs,
  preparationState = null,
  preparationTuning = AI_PREPARATION,
}) {
  if (!canCharacterAct(actor)) {
    clearPreparation(preparationState);
    return { kind: 'idle', reason: 'ko', targetId: null };
  }

  if (actor.controlHandoff.controlSource(nowMs) === 'player') {
    clearPreparation(preparationState);
    return { kind: 'idle', reason: 'player_override', targetId: targetId(currentTarget) };
  }

  // Support conditions use ally context without replacing retained enemy targeting.
  const support=NON_BASIC_ORDER.map(category=>readyCandidate(actor,category,abilityDefinitions))
    .filter(c=>c && priorityOf(c.definition)>0 && ['lowest_hp_ally','team_ally','self'].includes(c.definition.targetingRule))
    .sort((a,b)=>priorityOf(b.definition)-priorityOf(a.definition));
  for(const c of support) {
    const context={allies,enemies,enemyTarget:null};
    const target=resolveAbilityTarget(actor,c.definition,context);
    const targets=resolveEffectTargets(actor,target,c.definition,context);
    if(c.definition.effect.kind==='heal' && targets.filter(a=>a.hp/a.maxHp<=c.definition.ai.hpThreshold).length<(c.definition.ai.minTargets??1))continue;
    if(c.definition.effect.kind==='mitigation' && !enemies.some(e=>canCharacterAct(e)&&distance(actor,e)<=c.definition.range))continue;
    if(canStartAbility({caster:actor,slot:c.slot,definition:c.definition,target})) {
      clearPreparation(preparationState);
      return {kind:'ability',category:c.category,definitionId:c.definition.id,targetId:targetId(target),pursue:false};
    }
  }

  const committedTarget = enemies.find(enemy => targetId(enemy) === preparationState?.targetId && canCharacterAct(enemy));
  const target = committedTarget ?? chooseSoftTarget(actor, enemies, currentTarget);
  if (!target) {
    clearPreparation(preparationState);
    return { kind: 'idle', reason: 'no_target', targetId: null };
  }

  const preparation = preparedIntent(actor,target,abilityDefinitions,preparationState,preparationTuning);
  if (preparation) return preparation;

  const prioritized = NON_BASIC_ORDER
    .map((category) => readyCandidate(actor, category, abilityDefinitions))
    .filter((candidate) => candidate && priorityOf(candidate.definition) > 0 && candidate.definition.targetingRule==='enemy')
    .sort((a, b) => priorityOf(b.definition) - priorityOf(a.definition));

  for (const candidate of prioritized) {
    if(candidate.definition.effect.areaRadius!=null && resolveEffectTargets(actor,target,candidate.definition,{allies,enemies}).length<(candidate.definition.ai.minTargets??1))continue;
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
          : distance(actor, target) > (basic.definition.preferredRange ?? AI_ENGAGE_DISTANCE),
      };
    }

    return {
      kind: 'move',
      movement: 'approach',
      reason: 'basic_fallback_approach',
      category: 'basic',
      definitionId: basic.definition.id,
      targetId: targetId(target),
      desiredRange: basic.definition.preferredRange ?? AI_ENGAGE_DISTANCE,
    };
  }

  return {
    kind: 'move',
    movement: 'approach',
    reason: 'pursue_nearest',
    targetId: targetId(target),
    desiredRange: AI_ENGAGE_DISTANCE,
  };
}
