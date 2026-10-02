import { resolveBattleState, BATTLE_LIMIT_SECONDS } from './battleRules.js';
import { decideAIIntent, AI_ENGAGE_DISTANCE } from './ai.js';
import { chooseSoftTarget } from './targeting.js';
import {
  startAbility,
  finishAbility,
  tickAbilityCooldown,
  isTargetInRange,
} from './ability.js';
import { applyAbilityMovement } from './abilityMovement.js';
import { BattleStatuses } from './statuses.js';
import { resolveAbilityTarget, resolveEffectTargets } from './effectTargeting.js';
import { canCharacterAct } from './character.js';
import { resolveDamage } from './combatResolver.js';
import { createSeededRandom, DEFAULT_BATTLE_SEED } from './seededRandom.js';

const ACTIVE_CATEGORIES = ['basic', 'heavy', 'special', 'awakening'];

export const DEFAULT_ARENA_BOUNDS = Object.freeze({
  xMin: -2.3333333333,
  xMax: 12.3333333333,
  yMin: -2,
  yMax: 2,
});

function positiveFinite(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label} must be a positive finite number`);
  }
  return value;
}

function actorById(actors, id) {
  return actors.find((actor) => actor.instanceId === id) ?? null;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function moveToward(actor, target, speed, dt, bounds, stopDistance = AI_ENGAGE_DISTANCE) {
  const dx = target.x - actor.x;
  const dy = target.y - actor.y;
  const distance = Math.hypot(dx, dy);
  if (distance <= stopDistance) return;
  const remaining = distance - stopDistance;
  const step = Math.min(remaining, speed * dt);
  actor.x = clamp(actor.x + (dx / distance) * step, bounds.xMin, bounds.xMax);
  actor.y = clamp(actor.y + (dy / distance) * step, bounds.yMin, bounds.yMax);
}

function moveAway(actor, target, speed, dt, bounds, desiredDistance) {
  const dx = actor.x - target.x;
  const dy = actor.y - target.y;
  const distance = Math.hypot(dx, dy);
  if (distance >= desiredDistance) return;

  const nx = distance > 0.0001 ? dx / distance : (actor.teamId === target.teamId ? 0 : 1);
  const ny = distance > 0.0001 ? dy / distance : 0;
  const remaining = desiredDistance - distance;
  const step = Math.min(remaining, speed * dt);

  actor.x = clamp(actor.x + nx * step, bounds.xMin, bounds.xMax);
  actor.y = clamp(actor.y + ny * step, bounds.yMin, bounds.yMax);
}

function moveByVector(actor, vector, speed, dt, bounds) {
  const magnitude = Math.hypot(vector.x, vector.y);
  if (magnitude <= 0) return;
  const scale = magnitude > 1 ? 1 / magnitude : 1;
  actor.x = clamp(actor.x + vector.x * scale * speed * dt, bounds.xMin, bounds.xMax);
  actor.y = clamp(actor.y + vector.y * scale * speed * dt, bounds.yMin, bounds.yMax);
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

export class BattleSession {
  constructor({
    allies,
    enemies,
    characterDefinitions,
    abilityDefinitions,
    maxSeconds = BATTLE_LIMIT_SECONDS,
    arenaBounds = DEFAULT_ARENA_BOUNDS,
    seed = DEFAULT_BATTLE_SEED,
    rng,
  }) {
    if (allies.length !== 3 || enemies.length !== 3) {
      throw new RangeError('M0 battle session requires exactly 3 allies and 3 enemies');
    }
    positiveFinite(maxSeconds, 'maxSeconds');
    const seededRandom = createSeededRandom(seed);
    if (rng !== undefined && typeof rng !== 'function') throw new TypeError('rng must be a function');
    this.seed = seed;
    this.random = rng ?? seededRandom;

    this.allies = allies;
    this.enemies = enemies;
    this.characterDefinitions = characterDefinitions;
    this.abilityDefinitions = abilityDefinitions;
    this.maxSeconds = maxSeconds;
    this.arenaBounds = { ...arenaBounds };
    this.actors = [...allies, ...enemies];
    this.elapsedSeconds = 0;
    this.cadence = new Map(this.actors.map((actor) => [actor.instanceId, 0]));
    this.targetIds = new Map(this.actors.map((actor) => [actor.instanceId, null]));
    this.playerMovement = new Map(this.actors.map((actor) => [actor.instanceId, { x: 0, y: 0 }]));
    this.castEvents = [];
    this.damageEvents = [];
    this.healEvents = [];
    this.pendingHits = [];
    this.statuses = new BattleStatuses();
    this.aiPreparation = new Map(this.actors.map(actor => [actor.instanceId, {}]));
  }

  drainHealEvents() { return this.healEvents.splice(0); }

  drainDamageEvents() {
    return this.damageEvents.splice(0);
  }

  applyResolvedDamage(actor, target, actorDefinition, defenderDefinition, definition, category, source) {
    if (!canCharacterAct(target) || !(definition.effect?.coefficient > 0)) return 0;
    const { amount, critical } = resolveDamage({ attacker:actor, defender:target,
      attackerDefinition:actorDefinition, defenderDefinition, abilityDefinition:definition, rng:this.random, damageMultiplier:this.statuses.damageMultiplier(target.instanceId,this.elapsedSeconds) });
    if (Number.isFinite(amount) && amount > 0) this.damageEvents.push({
      actorId:actor.instanceId, targetId:target.instanceId, category, source, amount, critical,
      position:{x:target.x,y:target.y},
    });
    return amount;
  }

  drainCastEvents() {
    return this.castEvents.splice(0);
  }

  recordCast(actor, target, category, source, definition, hit) {
    this.castEvents.push({
      actorId: actor.instanceId,
      category,
      source,
      origin: { x: actor.x, y: actor.y },
      target: target ? { x: target.x, y: target.y } : null,
      hit,
      minRange: definition.minRange,
      maxRange: definition.maxRange,
    });
  }

  actorById(id) {
    return actorById(this.actors, id);
  }

  result() {
    return resolveBattleState(this.allies, this.enemies, this.elapsedSeconds);
  }

  snapshot() {
    return {
      result: this.result(),
      elapsedSeconds: this.elapsedSeconds,
      allies: snapshotTeam(this.allies),
      enemies: snapshotTeam(this.enemies),
    };
  }

  setPlayerMovement(instanceId, vector) {
    const actor = this.actorById(instanceId);
    if (!actor || !canCharacterAct(actor)) return false;
    if (!vector || !Number.isFinite(vector.x) || !Number.isFinite(vector.y)) return false;

    const magnitude = Math.hypot(vector.x, vector.y);
    if (magnitude <= 0.05) {
      this.playerMovement.set(instanceId, { x: 0, y: 0 });
      return false;
    }

    const scale = magnitude > 1 ? 1 / magnitude : 1;
    const normalized = { x: vector.x * scale, y: vector.y * scale };
    this.playerMovement.set(instanceId, normalized);
    actor.controlHandoff.registerPlayerInput(this.elapsedSeconds * 1000);
    return true;
  }

  holdPlayerControl(instanceId) {
    const actor = this.actorById(instanceId);
    if (!actor || !canCharacterAct(actor)) return false;
    actor.controlHandoff.registerPlayerInput(this.elapsedSeconds * 1000);
    return true;
  }

  clearPlayerMovement(instanceId) {
    if (!this.playerMovement.has(instanceId)) return false;
    this.playerMovement.set(instanceId, { x: 0, y: 0 });

    const actor = this.actorById(instanceId);
    if (actor) actor.controlHandoff.releasePlayerControl();

    return true;
  }

  usePlayerAbility(instanceId, category) {
    if (!['heavy', 'special', 'awakening'].includes(category)) return false;

    const actor = this.actorById(instanceId);
    if (!actor || !canCharacterAct(actor)) return false;

    const actorDefinition = this.characterDefinitions[actor.definitionId];
    if (!actorDefinition) throw new Error(`Missing character definition: ${actor.definitionId}`);

    const definitionId = actorDefinition.abilities[category];
    const definition = this.abilityDefinitions[definitionId];
    const slot = actor.abilityState[category];
    if (!definition || !slot) return false;

    actor.controlHandoff.registerPlayerInput(this.elapsedSeconds * 1000);
    return this.executeAbility(actor, category, 'player');
  }

  teamContext(actor) {
    const friendly=actor.teamId===this.allies[0].teamId;
    const allies=friendly?this.allies:this.enemies, enemies=friendly?this.enemies:this.allies;
    const current=actorById(enemies,this.targetIds.get(actor.instanceId));
    return {allies,enemies,enemyTarget:chooseSoftTarget(actor,enemies,current)};
  }

  // Both controllers execute effects here. Manual air casting retains its existing contract.
  executeAbility(actor,category,source,requestedTarget=null) {
    const actorDefinition=this.characterDefinitions[actor.definitionId];
    const definition=this.abilityDefinitions[actorDefinition.abilities[category]],slot=actor.abilityState[category];
    if(!definition||!slot)return false;
    const context=this.teamContext(actor);
    const target=resolveAbilityTarget(actor,definition,{...context,enemyTarget:requestedTarget??context.enemyTarget});
    if(!startAbility({caster:actor,slot,definition,target,source,ignoreRange:source==='player',allowNoTarget:source==='player'}))return false;
    const canHit=target&&canCharacterAct(target)&&isTargetInRange(actor,target,definition.range);
    let applied=false;
    finishAbility({caster:actor,slot,definition,applyEffect:()=>{
      if(!canHit)return;
      applyAbilityMovement(actor,target,definition.effect.movement,this.arenaBounds);
      for(const victim of resolveEffectTargets(actor,target,definition,context)) {
        if(definition.effect.kind==='heal') {
          const before=victim.hp;victim.heal(victim.maxHp*definition.effect.maxHpFraction);
          const amount=victim.hp-before;
          if(amount>0){this.healEvents.push({actorId:actor.instanceId,targetId:victim.instanceId,category,source,amount,critical:false,position:{x:victim.x,y:victim.y}});applied=true;}
        } else if(definition.effect.kind==='mitigation') {
          this.statuses.applyMitigation(victim.instanceId,definition.effect.reduction,definition.effect.duration,this.elapsedSeconds);applied=true;
        } else if(definition.effect.coefficient>0) {
          const hits=definition.effect.hits ?? 1;
          const hitDefinition=hits===1?definition:{...definition,effect:{...definition.effect,coefficient:definition.effect.coefficient/hits}};
          applied=this.applyResolvedDamage(actor,victim,actorDefinition,this.characterDefinitions[victim.definitionId],hitDefinition,category,source)>0||applied;
          for(let hit=1;hit<hits;hit++)this.pendingHits.push({actorId:actor.instanceId,targetId:victim.instanceId,definition:hitDefinition,category,source,due:this.elapsedSeconds+hit*definition.effect.hitInterval});
        }
      }
    }});
    if(target?.teamId!==actor.teamId&&target)this.targetIds.set(actor.instanceId,target.instanceId);
    if(applied&&category==='basic')this.cadence.set(actor.instanceId,1/actorDefinition.stats.attackSpeed);
    this.recordCast(actor,target,category,source,definition,applied);
    return true;
  }

  step(deltaSeconds) {
    positiveFinite(deltaSeconds, 'deltaSeconds');
    if (this.result() !== 'running') { this.pendingHits=[]; return this.snapshot(); }

    for (const actor of this.actors) {
      for (const category of ACTIVE_CATEGORIES) {
        tickAbilityCooldown(actor.abilityState[category], deltaSeconds);
      }
      this.cadence.set(actor.instanceId, Math.max(0, this.cadence.get(actor.instanceId) - deltaSeconds));
    }

    const nowMs = this.elapsedSeconds * 1000;
    const intents = this.actors.map((actor) => {
      if (!canCharacterAct(actor)) {
        this.aiPreparation.set(actor.instanceId, {});
        return { actor, intent: { kind: 'idle', reason: 'ko', targetId: null } };
      }
      const opponents = actor.teamId === this.allies[0].teamId ? this.enemies : this.allies;
      const currentTarget = actorById(opponents, this.targetIds.get(actor.instanceId));
      const intent = decideAIIntent({
        actor,
        enemies: opponents,
        allies: this.teamContext(actor).allies,
        currentTarget,
        abilityDefinitions: this.abilityDefinitions,
        nowMs,
        preparationState: this.aiPreparation.get(actor.instanceId),
      });
      this.targetIds.set(actor.instanceId, intent.targetId ?? null);
      return { actor, intent };
    });

    for (const { actor, intent } of intents) {
      if (!canCharacterAct(actor)) continue;

      const actorDefinition = this.characterDefinitions[actor.definitionId];
      if (!actorDefinition) throw new Error(`Missing character definition: ${actor.definitionId}`);

      if (actor.controlHandoff.controlSource(nowMs) === 'player') {
        moveByVector(
          actor,
          this.playerMovement.get(actor.instanceId) ?? { x: 0, y: 0 },
          actorDefinition.stats.moveSpeed,
          deltaSeconds,
          this.arenaBounds,
        );
        continue;
      }

      const opponents = actor.teamId === this.allies[0].teamId ? this.enemies : this.allies;
      const target = this.actorById(intent.targetId);

      if (intent.kind === 'move' && target && canCharacterAct(target)) {
        if (intent.movement === 'retreat') {
          moveAway(
            actor,
            target,
            actorDefinition.stats.moveSpeed,
            deltaSeconds,
            this.arenaBounds,
            intent.desiredRange,
          );
        } else {
          moveToward(
            actor,
            target,
            actorDefinition.stats.moveSpeed,
            deltaSeconds,
            this.arenaBounds,
            intent.desiredRange ?? AI_ENGAGE_DISTANCE,
          );
        }
        continue;
      }

      if (intent.kind !== 'ability') continue;

      if (intent.pursue && target && canCharacterAct(target)) {
        moveToward(actor, target, actorDefinition.stats.moveSpeed, deltaSeconds, this.arenaBounds);
      }

      if (intent.category === 'basic' && this.cadence.get(actor.instanceId) > 0) {
        continue;
      }

      this.executeAbility(actor,intent.category,'ai',target);
    }

    this.elapsedSeconds = Math.min(this.maxSeconds, this.elapsedSeconds + deltaSeconds);
    this.statuses.expire(this.elapsedSeconds);
    const remaining=[];
    for(const hit of this.pendingHits) {
      const actor=this.actorById(hit.actorId),target=this.actorById(hit.targetId);
      if(!actor||!target||!canCharacterAct(actor)||!canCharacterAct(target))continue;
      if(hit.due>this.elapsedSeconds+1e-9){remaining.push(hit);continue;}
      if(isTargetInRange(actor,target,hit.definition.range))this.applyResolvedDamage(actor,target,this.characterDefinitions[actor.definitionId],this.characterDefinitions[target.definitionId],hit.definition,hit.category,hit.source);
    }
    this.pendingHits=this.result()==='running'?remaining:[];
    return this.snapshot();
  }
}

export function createBattleSession(options) {
  return new BattleSession(options);
}
