import {PersistentAreas} from './persistentAreas.js';
import {TierEffectRuntime} from './tierEffectRuntime.js';
import {resolveTierProjection,resolveTierAbilities} from './tierEffects.js';
import {ThreatLedger,containsDanger} from './threats.js';
import {decideTacticalIntent,TACTICAL_INTERVAL_MS} from './tactics.js';
import {scoreTacticalTarget} from './tacticalTargeting.js';
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
    tacticalEnabled = false,
    tierByActorId = {},
  }) {
    if (allies.length !== 3 || enemies.length !== 3) {
      throw new RangeError('M0 battle session requires exactly 3 allies and 3 enemies');
    }
    positiveFinite(maxSeconds, 'maxSeconds');
    const seededRandom = createSeededRandom(seed);
    if (rng !== undefined && typeof rng !== 'function') throw new TypeError('rng must be a function');
    this.tacticalEnabled=tacticalEnabled;
    this.tacticalRandom=createSeededRandom((Number(seed)^0x6a09e667)>>>0);
    this.threats=new ThreatLedger();this.delayedImpacts=new Map();
    this.tacticalStates=new Map([...allies,...enemies].map(a=>[a.instanceId,{}]));
    this.tacticalEvaluations=0;
    this.seed = seed;
    this.random = rng ?? seededRandom;

    this.allies = allies;
    this.enemies = enemies;
    this.characterDefinitions = characterDefinitions;
    this.abilityDefinitions = abilityDefinitions;
    this.maxSeconds = maxSeconds;
    this.arenaBounds = { ...arenaBounds };
    this.actors = [...allies, ...enemies];
    this.tierProjections=new Map(this.actors.map(a=>[a.instanceId,resolveTierProjection(characterDefinitions[a.definitionId],tierByActorId[a.instanceId]??'T0')]));
    this.actorAbilityDefinitions=new Map(this.actors.map(a=>[a.instanceId,resolveTierAbilities(this.tierProjections.get(a.instanceId),abilityDefinitions)]));
    this.elapsedSeconds = 0;
    this.cadence = new Map(this.actors.map((actor) => [actor.instanceId, 0]));
    this.targetIds = new Map(this.actors.map((actor) => [actor.instanceId, null]));
    this.playerMovement = new Map(this.actors.map((actor) => [actor.instanceId, { x: 0, y: 0 }]));
    this.castEvents = [];
    this.damageEvents = [];
    this.healEvents = [];
    this.pendingHits = [];
    this.statuses = new BattleStatuses();
    this.areas=new PersistentAreas();this.mobilityEvidence=new Map();this.effects=new TierEffectRuntime(this);
    this.aiPreparation = new Map(this.actors.map(actor => [actor.instanceId, {}]));
  }

  clearTransientCombat(){this.pendingHits=[];this.threats.clear();this.delayedImpacts.clear();this.statuses.clear();this.areas.clear();this.mobilityEvidence.clear();this.tacticalStates.clear();this.aiPreparation.clear();}

  drainHealEvents() { return this.healEvents.splice(0); }

  drainDamageEvents() {
    return this.damageEvents.splice(0);
  }

  applyResolvedDamage(actor, target, actorDefinition, defenderDefinition, definition, category, source, hitContext={}) {
    if (!canCharacterAct(target) || !(definition.effect?.coefficient > 0)) return 0;
    if(this.statuses.avoids(target.instanceId,this.elapsedSeconds,definition.telegraph?.dodgeable===true))return 0;
    const outgoing=Math.min(1.15,this.statuses.outgoingMultiplier(actor.instanceId,this.elapsedSeconds)+this.effects.multiplier('damage',actor,target,category,hitContext)-1);
    const { amount, critical } = resolveDamage({ attacker:actor, defender:target,
      attackerDefinition:actorDefinition, defenderDefinition, abilityDefinition:definition, rng:this.random, outgoingMultiplier:outgoing, damageMultiplier:this.statuses.damageMultiplier(target.instanceId,this.elapsedSeconds) });
    if (Number.isFinite(amount) && amount > 0) this.damageEvents.push({
      actorId:actor.instanceId, targetId:target.instanceId, category, source, amount, critical,
      position:{x:target.x,y:target.y},
    });
    if(amount>0&&!hitContext.residual)this.effects.trigger('hit',actor,target,category,{definition,source});
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
    const definition=this.actorAbilityDefinitions.get(actor.instanceId)[actorDefinition.abilities[category]],slot=actor.abilityState[category];
    if(!definition||!slot||this.statuses.controlled(actor.instanceId,this.elapsedSeconds))return false;
    const context=this.teamContext(actor);
    const target=resolveAbilityTarget(actor,definition,{...context,enemyTarget:requestedTarget??context.enemyTarget});
    if(!startAbility({caster:actor,slot,definition,target,source,ignoreRange:source==='player',allowNoTarget:source==='player'}))return false;
    const canHit=target&&canCharacterAct(target)&&isTargetInRange(actor,target,definition.range);
    if(canHit)this.effects.trigger('cast',actor,target,category);
    let applied=false;
    const delay=this.tacticalEnabled&&definition.telegraph&&definition.effect.coefficient>0&&canHit
      ?this.threats.create(actor,target,definition,this.elapsedSeconds*1000):null;
    finishAbility({caster:actor,slot,definition,applyEffect:()=>{
      if(delay)this.delayedImpacts.set(delay.id,{actorId:actor.instanceId,targetId:target.instanceId,definition,category,source,threat:delay});
      else if(canHit)applied=this.applyAbilityEffects(actor,target,definition,category,source,context);
    }});
    if(target?.teamId!==actor.teamId&&target)this.targetIds.set(actor.instanceId,target.instanceId);
    if(applied&&category==='basic')this.cadence.set(actor.instanceId,1/actorDefinition.stats.attackSpeed);
    if(!delay)this.recordCast(actor,target,category,source,definition,applied);
    return true;
  }

  applyAbilityEffects(actor,target,definition,category,source,context,geometry=null) {
    const actorDefinition=this.characterDefinitions[actor.definitionId];let applied=false;
    if(!geometry){const before={x:actor.x,y:actor.y};applyAbilityMovement(actor,target,definition.effect.movement,this.arenaBounds);if(definition.effect.movement?.kind==='reposition'){const from=Math.atan2(before.y-target.y,before.x-target.x),to=Math.atan2(actor.y-target.y,actor.x-target.x);this.mobilityEvidence.set(actor.instanceId,{targetId:target.instanceId,at:this.elapsedSeconds,distance:Math.hypot(actor.x-before.x,actor.y-before.y),angle:Math.abs(Math.atan2(Math.sin(to-from),Math.cos(to-from)))});}}
    const victims=geometry?(definition.effect.areaRadius!=null?context.enemies.filter(v=>canCharacterAct(v)&&containsDanger(v,geometry)):[target].filter(v=>v&&canCharacterAct(v)&&containsDanger(v,geometry))):resolveEffectTargets(actor,target,definition,context);
    for(const victim of victims) {
      if(definition.effect.kind==='heal'){
        const before=victim.hp;victim.heal(victim.maxHp*definition.effect.maxHpFraction*this.effects.multiplier('heal',actor,victim,category));const amount=victim.hp-before;
        if(amount>0){this.healEvents.push({actorId:actor.instanceId,targetId:victim.instanceId,category,source,amount,critical:false,position:{x:victim.x,y:victim.y}});applied=true;}
      }else if(definition.effect.kind==='mitigation'){
        this.statuses.applyMitigation(victim.instanceId,definition.effect.reduction,definition.effect.duration,this.elapsedSeconds);applied=true;
      }else if(definition.effect.coefficient>0){
        const hits=definition.effect.hits??1,hitDefinition=hits===1?definition:{...definition,effect:{...definition.effect,coefficient:definition.effect.coefficient/hits}};
        applied=this.applyResolvedDamage(actor,victim,actorDefinition,this.characterDefinitions[victim.definitionId],hitDefinition,category,source,{hitIndex:0,totalHits:hits})>0||applied;
        for(let hit=1;hit<hits;hit++)this.pendingHits.push({actorId:actor.instanceId,targetId:victim.instanceId,definition:hitDefinition,category,source,hitIndex:hit,totalHits:hits,due:this.elapsedSeconds+hit*definition.effect.hitInterval});
      }
    }
    if(applied)this.effects.trigger('post_cast',actor,target,category,{definition,source});
    return applied;
  }

  step(deltaSeconds) {
    positiveFinite(deltaSeconds, 'deltaSeconds');
    if (this.result() !== 'running') { this.clearTransientCombat(); return this.snapshot(); }
    for(const [id,hit] of this.delayedImpacts)if(!canCharacterAct(this.actorById(hit.actorId))){this.delayedImpacts.delete(id);this.threats.remove(id);}

    this.statuses.cleanupKO(new Set(this.actors.filter(a=>!canCharacterAct(a)).map(a=>a.instanceId)));
    for (const actor of this.actors) {
      for (const category of ACTIVE_CATEGORIES) {
        tickAbilityCooldown(actor.abilityState[category], deltaSeconds);
      }
      this.cadence.set(actor.instanceId, Math.max(0, this.cadence.get(actor.instanceId) - deltaSeconds));
    }

    const nowMs = this.elapsedSeconds * 1000;
    const intents = this.actors.map((actor) => {
      if (!canCharacterAct(actor)) {
        this.aiPreparation.set(actor.instanceId, {});this.tacticalStates.set(actor.instanceId,{});
        return { actor, intent: { kind: 'idle', reason: 'ko', targetId: null } };
      }
      const opponents = actor.teamId === this.allies[0].teamId ? this.enemies : this.allies;
      const state=this.tacticalStates.get(actor.instanceId),actorDefinition=this.characterDefinitions[actor.definitionId];
      const profile=this.tacticalEnabled?actorDefinition.aiProfile:null;
      const controlled=actor.controlHandoff.controlSource(nowMs)==='player';
      if(controlled){for(const k of Object.keys(state))delete state[k];}
      const evaluate=profile&&!controlled&&nowMs>=(state.nextAt??0);
      if(evaluate){state.scoredTargetId=scoreTacticalTarget({actor,enemies:opponents,allies:this.teamContext(actor).allies,profile,characterDefinitions:this.characterDefinitions,abilityDefinitions:this.abilityDefinitions,targetIds:this.targetIds})?.instanceId;}
      const currentTarget = actorById(opponents,profile?state.scoredTargetId:this.targetIds.get(actor.instanceId));
      let intent = decideAIIntent({
        actor,
        enemies: opponents,
        allies: this.teamContext(actor).allies,
        currentTarget,
        abilityDefinitions: this.actorAbilityDefinitions.get(actor.instanceId),
        nowMs,
        preparationState: this.aiPreparation.get(actor.instanceId),
        profile,
      });
      if(profile&&!controlled){
        const context=this.teamContext(actor),target=currentTarget??context.enemyTarget;
        const supportAbility=intent.kind==='ability'&&this.abilityDefinitions[intent.definitionId]?.targetingRule!=='enemy';
        const committed=this.threats.active(nowMs).some(t=>t.sourceId===actor.instanceId&&t.commitment==='locked');
        if(evaluate){
          this.tacticalEvaluations++;state.nextAt=nowMs+TACTICAL_INTERVAL_MS;
          state.intent=decideTacticalIntent({actor,enemies:opponents,allies:context.allies,target,profile,state,nowMs,bounds:this.arenaBounds,speed:actorDefinition.stats.moveSpeed,threats:this.threats.active(nowMs),random:this.tacticalRandom,baseIntent:intent,supportAbility,committed});
        }
        if(committed)intent={kind:'idle',targetId:target?.instanceId,reason:'cast_commitment'};
        else if(supportAbility)intent={...intent,pursue:false,...(state.destination?{destination:state.destination}:{} )};
        else if(state.destination&&state.until>nowMs&&target?.hp>0)intent={kind:'move',movement:'destination',destination:state.destination,targetId:target.instanceId,tacticalState:state.phase};
        else if(state.intent?.reason==='preferred_band_hold'&&intent.kind==='move')intent=state.intent;
        else intent={...intent,pursue:false,tacticalState:state.phase};
      }
      const intendedTarget=this.actorById(intent.targetId);
      if(!intendedTarget||intendedTarget.teamId!==actor.teamId)this.targetIds.set(actor.instanceId, intent.targetId ?? null);
      return { actor, intent };
    });

    for (const { actor, intent } of intents) {
      if (!canCharacterAct(actor)||this.statuses.controlled(actor.instanceId,this.elapsedSeconds)) continue;

      const actorDefinition = this.characterDefinitions[actor.definitionId];
      if (!actorDefinition) throw new Error(`Missing character definition: ${actor.definitionId}`);

      const moveSpeed=actorDefinition.stats.moveSpeed*this.statuses.movementMultiplier(actor.instanceId,this.elapsedSeconds);
      if (actor.controlHandoff.controlSource(nowMs) === 'player') {
        moveByVector(
          actor,
          this.playerMovement.get(actor.instanceId) ?? { x: 0, y: 0 },
          moveSpeed,
          deltaSeconds,
          this.arenaBounds,
        );
        continue;
      }

      const opponents = actor.teamId === this.allies[0].teamId ? this.enemies : this.allies;
      const target = this.actorById(intent.targetId);

      if (intent.destination)moveToward(actor,intent.destination,moveSpeed,deltaSeconds,this.arenaBounds,.05);
      if(this.tacticalEnabled&&['move','idle'].includes(intent.kind)&&this.cadence.get(actor.instanceId)<=0)this.executeAbility(actor,'basic','ai',target);
      if(intent.kind==='move'&&intent.destination)continue;
      if (intent.kind === 'move' && target && canCharacterAct(target)) {
        if (intent.movement === 'retreat') {
          moveAway(
            actor,
            target,
            moveSpeed,
            deltaSeconds,
            this.arenaBounds,
            intent.desiredRange,
          );
        } else {
          moveToward(
            actor,
            target,
            moveSpeed,
            deltaSeconds,
            this.arenaBounds,
            intent.desiredRange ?? AI_ENGAGE_DISTANCE,
          );
        }
        continue;
      }

      if (intent.kind !== 'ability') continue;

      if (intent.pursue && target && canCharacterAct(target)) {
        moveToward(actor, target, moveSpeed, deltaSeconds, this.arenaBounds);
      }

      if (intent.category === 'basic' && this.cadence.get(actor.instanceId) > 0) {
        continue;
      }

      this.executeAbility(actor,intent.category,'ai',target);
    }

    this.elapsedSeconds = Math.min(this.maxSeconds, this.elapsedSeconds + deltaSeconds);
    this.statuses.expire(this.elapsedSeconds);
    for(const threat of this.threats.takeDue(this.elapsedSeconds*1000)){
      const hit=this.delayedImpacts.get(threat.id);this.delayedImpacts.delete(threat.id);if(!hit)continue;
      const actor=this.actorById(hit.actorId),target=this.actorById(hit.targetId);
      if(!actor||!canCharacterAct(actor))continue;
      const applied=this.applyAbilityEffects(actor,target,hit.definition,hit.category,hit.source,this.teamContext(actor),threat.geometry);
      this.recordCast(actor,{...threat.geometry.center},hit.category,hit.source,hit.definition,applied);
    }
    this.areas.cleanupKO(new Set(this.actors.filter(a=>!canCharacterAct(a)).map(a=>a.instanceId)));
    this.areas.tick(this.elapsedSeconds,this.actors,(area,victim)=>{
      const actor=this.actorById(area.sourceId);if(!actor||!canCharacterAct(actor))return;
      if(area.spec.coefficient){const definition={...area.definition,canCrit:false,critChance:0,telegraph:null,effect:{coefficient:area.spec.coefficient}};this.applyResolvedDamage(actor,victim,this.characterDefinitions[actor.definitionId],this.characterDefinitions[victim.definitionId],definition,area.category,area.source,{residual:true});}
      if(area.spec.status)this.statuses.apply({...area.spec.status,sourceId:actor.instanceId,targetId:victim.instanceId,areaId:area.id,key:area.id},this.elapsedSeconds);
    });
    const remaining=[];
    for(const hit of this.pendingHits) {
      const actor=this.actorById(hit.actorId),target=this.actorById(hit.targetId);
      if(!actor||!target||!canCharacterAct(actor)||!canCharacterAct(target))continue;
      if(hit.due>this.elapsedSeconds+1e-9){remaining.push(hit);continue;}
      if(isTargetInRange(actor,target,hit.definition.range))this.applyResolvedDamage(actor,target,this.characterDefinitions[actor.definitionId],this.characterDefinitions[target.definitionId],hit.definition,hit.category,hit.source,{hitIndex:hit.hitIndex,totalHits:hit.totalHits});
    }
    this.pendingHits=this.result()==='running'?remaining:[];
    this.statuses.cleanupKO(new Set(this.actors.filter(a=>!canCharacterAct(a)).map(a=>a.instanceId)));
    if(this.result()!=='running')this.clearTransientCombat();
    return this.snapshot();
  }
}

export function createBattleSession(options) {
  return new BattleSession(options);
}
