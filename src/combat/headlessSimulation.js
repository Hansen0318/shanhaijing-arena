import { resolveBattleState, BATTLE_LIMIT_SECONDS } from './battleRules.js';
import { decideAIIntent } from './ai.js';
import { startAbility, finishAbility, tickAbilityCooldown } from './ability.js';
import { canCharacterAct } from './character.js';
import { resolveDirectDamage } from './combatResolver.js';

const ACTIVE_CATEGORIES = ['basic', 'heavy', 'special', 'awakening'];

function positiveFinite(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label} must be a positive finite number`);
  }
  return value;
}

function actorById(actors, id) {
  return actors.find((actor) => actor.instanceId === id) ?? null;
}

function moveToward(actor, target, speed, dt) {
  const dx = target.x - actor.x;
  const dy = target.y - actor.y;
  const distance = Math.hypot(dx, dy);
  if (distance === 0) return;
  const step = Math.min(distance, speed * dt);
  actor.x += (dx / distance) * step;
  actor.y += (dy / distance) * step;
}

function snapshotTeam(team) {
  return team.map((actor) => ({
    instanceId: actor.instanceId,
    hp: actor.hp,
    maxHp: actor.maxHp,
    x: actor.x,
    y: actor.y,
  }));
}

export function simulateHeadless3v3({
  allies,
  enemies,
  characterDefinitions,
  abilityDefinitions,
  stepSeconds = 0.25,
  maxSeconds = BATTLE_LIMIT_SECONDS,
}) {
  if (allies.length !== 3 || enemies.length !== 3) {
    throw new RangeError('Headless M0 simulation requires exactly 3 allies and 3 enemies');
  }
  positiveFinite(stepSeconds, 'stepSeconds');
  positiveFinite(maxSeconds, 'maxSeconds');

  const actors = [...allies, ...enemies];
  const cadence = new Map(actors.map((actor) => [actor.instanceId, 0]));
  const targetIds = new Map(actors.map((actor) => [actor.instanceId, null]));
  let elapsedSeconds = 0;

  while (elapsedSeconds <= maxSeconds) {
    const before = resolveBattleState(allies, enemies, elapsedSeconds);
    if (before !== 'running') {
      return {
        result: before,
        elapsedSeconds,
        allies: snapshotTeam(allies),
        enemies: snapshotTeam(enemies),
      };
    }

    for (const actor of actors) {
      for (const category of ACTIVE_CATEGORIES) {
        tickAbilityCooldown(actor.abilityState[category], stepSeconds);
      }
      cadence.set(actor.instanceId, Math.max(0, cadence.get(actor.instanceId) - stepSeconds));
    }

    const intents = actors.map((actor) => {
      if (!canCharacterAct(actor)) return { actor, intent: { kind: 'idle', reason: 'ko', targetId: null } };
      const opponents = actor.teamId === allies[0].teamId ? enemies : allies;
      const currentTarget = actorById(opponents, targetIds.get(actor.instanceId));
      const intent = decideAIIntent({
        actor,
        enemies: opponents,
        currentTarget,
        abilityDefinitions,
        nowMs: elapsedSeconds * 1000,
      });
      targetIds.set(actor.instanceId, intent.targetId ?? null);
      return { actor, intent };
    });

    for (const { actor, intent } of intents) {
      if (!canCharacterAct(actor)) continue;
      const opponents = actor.teamId === allies[0].teamId ? enemies : allies;
      const target = actorById(opponents, intent.targetId);
      const actorDefinition = characterDefinitions[actor.definitionId];
      if (!actorDefinition) throw new Error(`Missing character definition: ${actor.definitionId}`);

      if (intent.kind === 'move' && target && canCharacterAct(target)) {
        moveToward(actor, target, actorDefinition.stats.moveSpeed, stepSeconds);
        continue;
      }

      if (intent.kind !== 'ability') continue;
      if (intent.category === 'basic' && cadence.get(actor.instanceId) > 0) continue;

      const definition = abilityDefinitions[intent.definitionId];
      const slot = actor.abilityState[intent.category];
      if (!definition || !slot) continue;

      if (!startAbility({ caster: actor, slot, definition, target, source: 'ai' })) continue;

      let applied = false;
      if (target && canCharacterAct(target) && Number.isFinite(definition.effect?.coefficient)) {
        const defenderDefinition = characterDefinitions[target.definitionId];
        if (!defenderDefinition) throw new Error(`Missing character definition: ${target.definitionId}`);
        finishAbility({
          caster: actor,
          slot,
          definition,
          applyEffect: () => {
            resolveDirectDamage({
              attacker: actor,
              defender: target,
              attackerDefinition: actorDefinition,
              defenderDefinition,
              abilityDefinition: definition,
            });
            applied = true;
          },
        });
      } else {
        finishAbility({ caster: actor, slot, definition });
      }

      if (applied && intent.category === 'basic') {
        cadence.set(actor.instanceId, 1 / actorDefinition.stats.attackSpeed);
      }
    }

    elapsedSeconds = Math.min(maxSeconds, elapsedSeconds + stepSeconds);
    const after = resolveBattleState(allies, enemies, elapsedSeconds);
    if (after !== 'running') {
      return {
        result: after,
        elapsedSeconds,
        allies: snapshotTeam(allies),
        enemies: snapshotTeam(enemies),
      };
    }

    if (elapsedSeconds === maxSeconds) {
      const final = resolveBattleState(allies, enemies, elapsedSeconds);
      return {
        result: final,
        elapsedSeconds,
        allies: snapshotTeam(allies),
        enemies: snapshotTeam(enemies),
      };
    }
  }

  throw new Error('Headless simulation exceeded deterministic loop bounds');
}
