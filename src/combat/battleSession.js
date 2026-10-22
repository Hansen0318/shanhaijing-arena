import {PassiveRuntime} from './passiveRuntime.js';
import {ordinaryMotionSegments,clipOrdinarySegment,pointOnOrdinaryPath} from './passiveMotion.js';
import {beginLeg,legPosition,relativeSweep} from './stagedAction.js';
import {PersistentAreas} from './persistentAreas.js';
import {TierEffectRuntime} from './tierEffectRuntime.js';
import {resolveTierProjection,resolveTierAbilities} from './tierEffects.js';
import {TIER_SAFETY} from './tierScaling.js';
import {ThreatLedger,containsDanger} from './threats.js';
import {decideTacticalIntent,TACTICAL_INTERVAL_MS} from './tactics.js';
import {scoreTacticalTarget} from './tacticalTargeting.js';
import { resolveBattleState, BATTLE_LIMIT_SECONDS } from './battleRules.js';
import { decideAIIntent, AI_ENGAGE_DISTANCE } from './ai.js';
import { chooseSoftTarget } from './targeting.js';
import {
  startAbility,
  finishAbility,
  cancelAbility,
  tickAbilityCooldown,
  isTargetInRange,
} from './ability.js';
import { applyAbilityMovement } from './abilityMovement.js';
import { BattleStatuses } from './statuses.js';
import { resolveAbilityTarget, resolveEffectTargets } from './effectTargeting.js';
import { canCharacterAct } from './character.js';
import { resolveDamage } from './combatResolver.js';
import { createSeededRandom, DEFAULT_BATTLE_SEED } from './seededRandom.js';

const motionPlans=new WeakMap();
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
  const plan=motionPlans.get(actor);actor=plan??actor;
  const dx = target.x - actor.x;
  const dy = target.y - actor.y;
  const distance = Math.hypot(dx, dy);
  if (distance <= stopDistance) return;
  const remaining = distance - stopDistance;
  if(plan)actor.motion={goal:{x:actor.x+dx/distance*remaining,y:actor.y+dy/distance*remaining},bounds};
  const step = Math.min(remaining, speed * dt);
  actor.x = clamp(actor.x + (dx / distance) * step, bounds.xMin, bounds.xMax);
  actor.y = clamp(actor.y + (dy / distance) * step, bounds.yMin, bounds.yMax);
}

function moveAway(actor, target, speed, dt, bounds, desiredDistance) {
  const plan=motionPlans.get(actor);actor=plan??actor;
  const dx = actor.x - target.x;
  const dy = actor.y - target.y;
  const distance = Math.hypot(dx, dy);
  if (distance >= desiredDistance) return;

  const nx = distance > 0.0001 ? dx / distance : (actor.teamId === target.teamId ? 0 : 1);
  const ny = distance > 0.0001 ? dy / distance : 0;
  const remaining = desiredDistance - distance;
  if(plan)actor.motion={goal:{x:actor.x+nx*remaining,y:actor.y+ny*remaining},bounds};
  const step = Math.min(remaining, speed * dt);

  actor.x = clamp(actor.x + nx * step, bounds.xMin, bounds.xMax);
  actor.y = clamp(actor.y + ny * step, bounds.yMin, bounds.yMax);
}

function moveByVector(actor, vector, speed, dt, bounds) {
  const plan=motionPlans.get(actor);actor=plan??actor;
  const magnitude = Math.hypot(vector.x, vector.y);
  if (magnitude <= 0) return;
  const scale = magnitude > 1 ? 1 / magnitude : 1;
  if(plan)actor.motion={vector:{...vector},bounds};
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
    this.tierProjections=new Map(this.actors.map(a=>[a.instanceId,resolveTierProjection(characterDefinitions[a.definitionId],tierByActorId[a.instanceId]??'T0',abilityDefinitions)]));
    this.actorCharacterDefinitions=new Map(this.actors.map(a=>{
      const p=this.tierProjections.get(a.instanceId);a.initializeCombatMaxHp(p.stats.maxHp);
      return [a.instanceId,Object.freeze({...p.definition,stats:p.stats,...(p.aiProfile?{aiProfile:p.aiProfile}:{})})];
    }));
    this.actorAbilityDefinitions=new Map(this.actors.map(a=>[a.instanceId,resolveTierAbilities(this.tierProjections.get(a.instanceId),abilityDefinitions)]));
    this.elapsedSeconds = 0;
    this.cadence = new Map(this.actors.map((actor) => [actor.instanceId, 0]));
    this.targetIds = new Map(this.actors.map((actor) => [actor.instanceId, null]));
    this.playerMovement = new Map(this.actors.map((actor) => [actor.instanceId, { x: 0, y: 0 }]));
    this.castEvents = [];
    this.damageEvents = [];
    this.healEvents = [];
    this.pendingHits = [];
    this.pendingActions=new Map();this.nextActionId=0;this.nextPresentationId=0;this.presentationEpoch=0;this.presentationEventSequence=0;
    this.statuses = new BattleStatuses();
    this.areas=new PersistentAreas();this.mobilityEvidence=new Map();this.effects=new TierEffectRuntime(this);
    this.passives=new PassiveRuntime({actors:this.actors,characterForActor:actor=>this.definitionForActor(actor),tierForActor:actor=>this.tierProjections.get(actor.instanceId).tier,abilityDefinitions:this.abilityDefinitions,statuses:this.statuses});
    this.aiPreparation = new Map(this.actors.map(actor => [actor.instanceId, {}]));
  }

  clearTransientCombat({preserveEvents=false}={}){this.presentationEpoch++;for(const id of this.pendingActions.keys())this.cancelAction(id,'battle_end');this.pendingHits=[];for(const hit of this.delayedImpacts.values())this.recordImpactPresentation(hit.impactPresentation,'cancel',false,'battle_end');this.threats.clear();this.delayedImpacts.clear();this.passives?.clear();this.statuses.clear();this.areas.clear();this.mobilityEvidence.clear();this.tacticalStates.clear();this.aiPreparation.clear();if(!preserveEvents){this.castEvents=[];this.damageEvents=[];this.healEvents=[];}}

  // Compatibility view for existing Basic-only diagnostics. One shared engine
  // owns every opted-in action; categories select data, never character IDs.
  get pendingBasics(){return new Map([...this.pendingActions].filter(([,r])=>r.category==='basic'));}

  actionEvent(record,phase,hit=false,reason=null){
    const actor=this.actorById(record.actorId),target=this.actorById(record.targetId);
    this.recordCast(actor,target,record.category,record.source,record.definition,hit,{phase,eventAt:this.elapsedSeconds,actionId:record.actionId,startedAt:record.startedAt,dueAt:record.dueAt,windupMs:record.definition.windupMs,...(phase==='resolve'?{resolvedAt:this.elapsedSeconds}:{}),...(reason?{reason}:{}),attackOrigin:{...record.origin},attackTarget:{...record.target}});
  }

  cancelBasicAction(actorId,reason){
    return this.pendingActions.get(actorId)?.category==='basic'?this.cancelAction(actorId,reason):false;
  }

  cancelAction(actorId,reason){
    const record=this.pendingActions.get(actorId);if(!record)return false;
    this.pendingActions.delete(actorId);
    // Basic spends cadence; active skills spend cooldown at start. Cancelling
    // either kind must never refund the resource already spent.
    if(record.category==='basic')cancelAbility(this.actorById(actorId).abilityState.basic);
    if(record.staged)this.stagedEvent(record,'cancel',{reason});else this.actionEvent(record,'cancel',false,reason);return true;
  }

  resolveActions(onlyId=null){
    for(const [id,r] of [...this.pendingActions].sort(([a],[b])=>a.localeCompare(b))){
      if(onlyId!==null&&id!==onlyId)continue;
      const actor=this.actorById(id),target=this.actorById(r.targetId);
      if(r.staged){this.resolveStagedBoundary(r);continue;}
      const reason=!actor||!canCharacterAct(actor)?'source_ko':r.targetId!==null&&(!target||!canCharacterAct(target))?'target_ko':this.statuses.controlled(id,this.elapsedSeconds)?'control':null;
      if(reason){this.cancelAction(id,reason);continue;}
      if(r.dueAt>this.elapsedSeconds+1e-9)continue;
      this.pendingActions.delete(id);let hit=false;
      const applyEffect=()=>{
        if(target&&target.teamId!==actor.teamId&&isTargetInRange(actor,target,r.definition.range))hit=this.applyAbilityEffects(actor,target,r.definition,r.category,r.source,this.teamContext(actor),null,{actionId:r.actionId})===true;
      };
      if(r.category==='basic')finishAbility({caster:actor,slot:actor.abilityState.basic,definition:r.definition,applyEffect});
      else applyEffect();
      this.actionEvent(r,'resolve',hit);
    }
  }

  drainHealEvents() { return this.healEvents.splice(0); }

  definitionForActor(actor){return this.actorCharacterDefinitions.get(actor.instanceId);}

  drainDamageEvents() {
    return this.damageEvents.splice(0);
  }

  applyResolvedDamage(actor, target, actorDefinition, defenderDefinition, definition, category, source, hitContext={}) {
    if (!canCharacterAct(target) || !(definition.effect?.coefficient > 0)) return 0;
    if(this.statuses.avoids(target.instanceId,this.elapsedSeconds,definition.telegraph?.dodgeable===true))return 0;
    const outgoing=Math.min(1.15,this.statuses.outgoingMultiplier(actor.instanceId,this.elapsedSeconds)+this.effects.multiplier('damage',actor,target,category,hitContext)-1);
    const { amount, critical } = resolveDamage({ attacker:actor, defender:target,
      attackerDefinition:actorDefinition, defenderDefinition, abilityDefinition:definition, rng:this.random, outgoingMultiplier:outgoing,
      powerMultiplier:this.tierProjections.get(actor.instanceId).scales[hitContext.residual?'persistentMagnitude':'damage'],
      damageMultiplier:this.statuses.damageMultiplier(target.instanceId,this.elapsedSeconds) });
    if (Number.isFinite(amount) && amount > 0) this.damageEvents.push({
      actorId:actor.instanceId, targetId:target.instanceId, category, source, amount, critical,eventAt:this.elapsedSeconds,
      position:{x:target.x,y:target.y},
      ...(hitContext.actionId?{actionId:hitContext.actionId}:{}),
      ...(hitContext.presentationEpoch!=null?{presentationEpoch:hitContext.presentationEpoch}:{}),
      ...(hitContext.eventAt!=null?{eventAt:hitContext.eventAt,hitIndex:hitContext.hitIndex}:{}),
    });
    if(amount>0&&!hitContext.residual)this.effects.trigger('hit',actor,target,category,{definition,source});
    return amount;
  }

  drainCastEvents() {
    return this.castEvents.splice(0);
  }

  // Observational lifecycle only: no pendingActions entry, clocks, locks or RNG.
  recordImpactPresentation(record,phase,hit=false,reason=null){
    if(!record)return;
    const actor=this.actorById(record.actorId);if(!actor)return;
    const target=phase==='resolve'&&hit?this.actorById(record.targetId):record.target;
    const victims=record.definition.presentation?.actionLifecycle==='area-observed'&&phase==='resolve'?this.damageEvents.filter(e=>e.actionId===record.actionId&&e.presentationEpoch===record.presentationEpoch&&e.amount>0).map(e=>({targetId:e.targetId,amount:e.amount,position:{...e.position},eventAt:e.eventAt})):null;
    this.recordCast(actor,target,record.category,record.source,record.definition,hit,{phase,presentationOnly:true,actionId:record.actionId,startedAt:record.startedAt,dueAt:record.dueAt,eventAt:this.elapsedSeconds,...(phase==='resolve'?{resolvedAt:this.elapsedSeconds}:{}),...(victims?{victims}:{}),...(reason?{reason}:{}),attackOrigin:{...record.origin},attackTarget:{...record.target}});
  }

  recordCast(actor, target, category, source, definition, hit,metadata={}) {
    this.castEvents.push({
      presentationEpoch:this.presentationEpoch,
      eventSequence:++this.presentationEventSequence,
      eventAt:this.elapsedSeconds,
      actorId: actor.instanceId,
      category,
      source,
      origin: { x: actor.x, y: actor.y },
      target: target ? { x: target.x, y: target.y } : null,
      targetId: target?.instanceId ?? null,
      hit,
      minRange: definition.minRange,
      maxRange: definition.maxRange,
      ...(definition.presentation?.actionLifecycle==='utility-observed'&&hit&&!metadata.phase?{presentationId:`utility.${++this.nextPresentationId}`,eventAt:this.elapsedSeconds,abilityId:definition.id}:{}),
      ...metadata,
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
      presentationEpoch:this.presentationEpoch,
      elapsedSeconds: this.elapsedSeconds,
      passives:this.passives.snapshot(this.elapsedSeconds),
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

    if(this.pendingActions.get(instanceId)?.staged)this.cancelAction(instanceId,'movement');
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

  usePlayerAbility(instanceId, category, aim={}) {
    if (!['heavy', 'special', 'awakening'].includes(category)) return false;

    const actor = this.actorById(instanceId);
    if (!actor || !canCharacterAct(actor)) return false;

    const actorDefinition = this.definitionForActor(actor);
    if (!actorDefinition) throw new Error(`Missing character definition: ${actor.definitionId}`);

    const definitionId = actorDefinition.abilities[category];
    const definition = this.abilityDefinitions[definitionId];
    const slot = actor.abilityState[category];
    if (!definition || !slot) return false;

    actor.controlHandoff.registerPlayerInput(this.elapsedSeconds * 1000);
    return this.executeAbility(actor, category, 'player',null,aim);
  }

  teamContext(actor) {
    const friendly=actor.teamId===this.allies[0].teamId;
    const allies=friendly?this.allies:this.enemies, enemies=friendly?this.enemies:this.allies;
    const current=actorById(enemies,this.targetIds.get(actor.instanceId));
    return {allies,enemies,enemyTarget:chooseSoftTarget(actor,enemies,current)};
  }

  // Both controllers execute effects here; opted-in manual whiffs use the same action lifecycle.
  executeAbility(actor,category,source,requestedTarget=null,aim={}) {
    const actorDefinition=this.definitionForActor(actor);
    const definition=this.actorAbilityDefinitions.get(actor.instanceId)[actorDefinition.abilities[category]],slot=actor.abilityState[category];
    if(!definition||!slot||this.statuses.controlled(actor.instanceId,this.elapsedSeconds))return false;
    const pending=this.pendingActions.get(actor.instanceId);
    if(pending?.category!=='basic'&&pending&&(source==='ai'||category==='basic'))return false;
    if(category==='basic'&&(this.pendingActions.has(actor.instanceId)||this.cadence.get(actor.instanceId)>0||[...this.delayedImpacts.values()].some(hit=>hit.actorId===actor.instanceId&&hit.category==='basic')))return false;
    const context=this.teamContext(actor);
    const target=resolveAbilityTarget(actor,definition,{...context,enemyTarget:requestedTarget??context.enemyTarget});
    if(!startAbility({caster:actor,slot,definition,target,source,ignoreRange:source==='player',allowNoTarget:source==='player'}))return false;
    if(category!=='basic')this.cancelAction(actor.instanceId,'new_ability');
    const canHit=target&&canCharacterAct(target)&&isTargetInRange(actor,target,definition.range);
    if(canHit&&category==='basic')this.cadence.set(actor.instanceId,Math.max(TIER_SAFETY.basicInterval,1/actorDefinition.stats.attackSpeed));
    if(canHit)this.effects.trigger('cast',actor,target,category);
    if(definition.stagedAction){
      const facingX=aim.facingX===-1?-1:aim.facingX===1?1:(Math.sign(this.playerMovement.get(actor.instanceId)?.x)||(actor.teamId===this.allies[0].teamId?1:-1));
      const r={staged:true,actionId:`${category}.${++this.nextActionId}`,category,actorId:actor.instanceId,targetId:canHit?target.instanceId:null,source,definition,startedAt:this.elapsedSeconds,origin:{x:actor.x,y:actor.y},target:canHit?{x:target.x,y:target.y}:{x:actor.x+facingX,y:actor.y},direction:{x:facingX,y:0},hitIndex:-1,settled:definition.stagedAction.segments.map(()=>false)};
      if(canHit){const length=Math.hypot(target.x-actor.x,target.y-actor.y);if(length>1e-9)r.direction={x:(target.x-actor.x)/length,y:(target.y-actor.y)/length};}
      finishAbility({caster:actor,slot,definition});this.pendingActions.set(actor.instanceId,r);if(canHit)this.targetIds.set(actor.instanceId,target.instanceId);this.stagedEvent(r,'start');return true;
    }
    if(definition.windupMs>0&&(canHit||source==='player'&&category!=='basic')){
      // A whiff owns an aim point, never a damage target. No acquisition at resolve.
      const facingX=aim.facingX===-1?-1:aim.facingX===1?1:(Math.sign(this.playerMovement.get(actor.instanceId)?.x)|| (actor.teamId===this.allies[0].teamId?1:-1));
      const attackTarget=canHit?{x:target.x,y:target.y}:{x:actor.x+facingX,y:actor.y};
      const r={actionId:`${category}.${++this.nextActionId}`,category,actorId:actor.instanceId,targetId:canHit?target.instanceId:null,source,definition,startedAt:this.elapsedSeconds,dueAt:this.elapsedSeconds+definition.windupMs/1000,origin:{x:actor.x,y:actor.y},target:attackTarget};
      if(category!=='basic')finishAbility({caster:actor,slot,definition});
      this.pendingActions.set(actor.instanceId,r);if(canHit)this.targetIds.set(actor.instanceId,target.instanceId);this.actionEvent(r,'start');return true;
    }
    let applied=false;
    const delay=this.tacticalEnabled&&definition.telegraph&&definition.effect.coefficient>0&&canHit
      ?this.threats.create(actor,target,definition,this.elapsedSeconds*1000):null;
    const impactPresentation=['existing-impact','area-observed'].includes(definition.presentation?.actionLifecycle)?{
      actionId:`presentation.${++this.nextActionId}`,presentationEpoch:this.presentationEpoch,actorId:actor.instanceId,targetId:canHit?target.instanceId:null,definition,category,source,startedAt:this.elapsedSeconds,dueAt:delay?delay.impactAtMs/1000:this.elapsedSeconds,origin:{x:actor.x,y:actor.y},target:canHit?{x:target.x,y:target.y}:{x:actor.x+(aim.facingX===-1?-1:aim.facingX===1?1:(Math.sign(this.playerMovement.get(actor.instanceId)?.x)||(actor.teamId===this.allies[0].teamId?1:-1))),y:actor.y}
    }:null;
    this.recordImpactPresentation(impactPresentation,'start');
    finishAbility({caster:actor,slot,definition,applyEffect:()=>{
      if(delay)this.delayedImpacts.set(delay.id,{actorId:actor.instanceId,targetId:target.instanceId,definition,category,source,threat:delay,...(impactPresentation?{impactPresentation}:{})});
      else if(canHit)applied=this.applyAbilityEffects(actor,target,definition,category,source,context,null,this.observedHitContext(impactPresentation));
    }});
    if(target?.teamId!==actor.teamId&&target)this.targetIds.set(actor.instanceId,target.instanceId);
    if(!delay){if(impactPresentation)this.recordImpactPresentation(impactPresentation,'resolve',applied);else this.recordCast(actor,target,category,source,definition,applied);}
    return true;
  }

  observedHitContext(record){return record?.definition.presentation?.actionLifecycle==='area-observed'?{actionId:record.actionId,presentationEpoch:record.presentationEpoch}:{};}

  applyAbilityEffects(actor,target,definition,category,source,context,geometry=null,hitContext={}) {
    const actorDefinition=this.definitionForActor(actor);let applied=false;
    if(!geometry){const before={x:actor.x,y:actor.y};applyAbilityMovement(actor,target,definition.effect.movement,this.arenaBounds);if(definition.effect.movement?.kind==='reposition'){const from=Math.atan2(before.y-target.y,before.x-target.x),to=Math.atan2(actor.y-target.y,actor.x-target.x);this.mobilityEvidence.set(actor.instanceId,{targetId:target.instanceId,at:this.elapsedSeconds,distance:Math.hypot(actor.x-before.x,actor.y-before.y),angle:Math.abs(Math.atan2(Math.sin(to-from),Math.cos(to-from)))});}}
    const planned=motionPlans.get(actor);if(planned&&definition.effect.movement){planned.x=actor.x;planned.y=actor.y;}
    const victims=geometry?(definition.effect.areaRadius!=null?context.enemies.filter(v=>canCharacterAct(v)&&containsDanger(v,geometry)):[target].filter(v=>v&&canCharacterAct(v)&&containsDanger(v,geometry))):resolveEffectTargets(actor,target,definition,context);
    for(const victim of victims) {
      if(definition.effect.kind==='heal'){
        const before=victim.hp;const baseHp=this.characterDefinitions[victim.definitionId].stats.maxHp;
        victim.heal(baseHp*definition.effect.maxHpFraction*this.tierProjections.get(actor.instanceId).scales.healing*this.effects.multiplier('heal',actor,victim,category));const amount=victim.hp-before;
        if(amount>0){this.healEvents.push({actorId:actor.instanceId,targetId:victim.instanceId,category,source,amount,critical:false,position:{x:victim.x,y:victim.y}});applied=true;}
      }else if(definition.effect.kind==='mitigation'){
        const ownership=definition.presentation?.actionLifecycle==='utility-observed'?{abilityId:definition.id,category,effectId:'primary'}:null;
        this.statuses.applyMitigation(victim.instanceId,definition.effect.reduction,definition.effect.duration,this.elapsedSeconds,ownership);applied=true;
      }else if(definition.effect.coefficient>0){
        const hits=definition.effect.hits??1,hitDefinition=hits===1?definition:{...definition,effect:{...definition.effect,coefficient:definition.effect.coefficient/hits}};
        applied=this.applyResolvedDamage(actor,victim,actorDefinition,this.definitionForActor(victim),hitDefinition,category,source,{...hitContext,hitIndex:0,totalHits:hits})>0||applied;
        for(let hit=1;hit<hits;hit++)this.pendingHits.push({actorId:actor.instanceId,targetId:victim.instanceId,definition:hitDefinition,category,source,hitIndex:hit,totalHits:hits,due:this.elapsedSeconds+hit*definition.effect.hitInterval});
      }
    }
    if(applied)this.effects.trigger('post_cast',actor,target,category,{definition,source});
    return applied;
  }

  hasStagedAction(){return [...this.pendingActions.values()].some(r=>r.staged);}

  simulationStepSeconds(){return this.hasStagedAction()?.01:.05;}

  stagedIntervalSeconds(limit){
    if(!this.hasStagedAction())return limit;
    let dt=Math.min(limit,.01);
    const deadlines=[...this.pendingActions.values()].flatMap(r=>r.staged?[...r.definition.stagedAction.segments.flatMap(l=>[l.startMs,l.centerMs,l.endMs]),r.definition.stagedAction.recoveryMs].map(ms=>r.startedAt+ms/1000):[r.dueAt]);
    deadlines.push(...[...this.statuses.records.values()].map(v=>v.expiryTime),...this.pendingHits.map(v=>v.due),...[...this.delayedImpacts.values()].map(v=>v.threat.impactAtMs/1000),...this.areas.nextTicks.values(),...[...this.areas.records.values()].map(v=>v.expiryTime));
    for(const t of deadlines)if(t>this.elapsedSeconds+1e-9)dt=Math.min(dt,t-this.elapsedSeconds);
    return dt;
  }

  stagedEvent(r,phase,extra={}){
    const actor=this.actorById(r.actorId),target=this.actorById(r.targetId);
    this.recordCast(actor,target,r.category,r.source,r.definition,false,{staged:true,phase,actionId:r.actionId,startedAt:r.startedAt,eventAt:this.elapsedSeconds,hitIndex:r.hitIndex,direction:{...r.direction},attackOrigin:{...r.origin},attackTarget:{...r.target},...(phase==='resolve'?{resolvedAt:this.elapsedSeconds}:{}),...extra});
  }

  resolveStagedBoundary(r){
    const actor=this.actorById(r.actorId),spec=r.definition.stagedAction;
    if(!canCharacterAct(actor)||this.statuses.controlled(r.actorId,this.elapsedSeconds)){this.cancelAction(r.actorId,!canCharacterAct(actor)?'source_ko':'control');return;}
    const ms=(this.elapsedSeconds-r.startedAt)*1000;
    if(r.hitIndex>=0&&ms+1e-6>=spec.segments[r.hitIndex].endMs&&!r.settled[r.hitIndex]){r.settled[r.hitIndex]=true;this.stagedEvent(r,'resolve',{hit:false,collision:false});}
    const next=r.hitIndex+1;
    if(next<spec.segments.length&&ms+1e-6>=spec.segments[next].startMs){beginLeg(r,next,actor,this.actorById(r.targetId),this.arenaBounds);this.stagedEvent(r,'segment');}
    if(ms+1e-6>=spec.recoveryMs){this.pendingActions.delete(r.actorId);this.stagedEvent(r,'end');}
  }

  step(deltaSeconds){
    positiveFinite(deltaSeconds,'deltaSeconds');const held=this.actors.filter(a=>a.controlHandoff.controlSource(this.elapsedSeconds*1000)==='player').map(a=>[a,a.controlHandoff.lastPlayerInputAt]);const until=Math.min(this.maxSeconds,this.elapsedSeconds+deltaSeconds);
    while(this.elapsedSeconds<until-1e-10&&this.result()==='running'){
      for(const [a] of held)a.controlHandoff.registerPlayerInput(this.elapsedSeconds*1000);
      this.resolveActions();const dt=this.stagedIntervalSeconds(until-this.elapsedSeconds);
      this.stepInterval(dt);
    }
    for(const [a,last] of held)a.controlHandoff.lastPlayerInputAt=last;
    if(this.result()!=='running')this.clearTransientCombat({preserveEvents:true});return this.snapshot();
  }

  applyAreaPulse(area,victim){
    const actor=this.actorById(area.sourceId);if(!actor||!canCharacterAct(actor))return;
    if(area.spec.coefficient){const definition={...area.definition,canCrit:false,critChance:0,telegraph:null,effect:{coefficient:area.spec.coefficient}};this.applyResolvedDamage(actor,victim,this.definitionForActor(actor),this.definitionForActor(victim),definition,area.category,area.source,{residual:true});}
    if(area.spec.status)this.statuses.apply({...area.spec.status,sourceId:actor.instanceId,targetId:victim.instanceId,areaId:area.id,key:area.id},this.elapsedSeconds);
  }

  advanceStagedMotion(dt){return this.advancePlannedMotion(dt);}

  advancePlannedMotion(dt){
    const begin=this.elapsedSeconds,end=begin+dt,passiveMode=this.passives.enabled();
    if(passiveMode)this.passives.settle(begin);
    const paths=new Map(this.actors.map(a=>[a.instanceId,{from:{x:a.x,y:a.y},to:canCharacterAct(a)&&!this.statuses.controlled(a.instanceId,begin)?motionPlans.get(a)??{x:a.x,y:a.y}:{x:a.x,y:a.y},start:0,motion:motionPlans.get(a)?.motion??null,ordinary:null,lastTime:begin}]));
    for(const r of this.pendingActions.values())if(r.staged){const p=paths.get(r.actorId);p.to=r.hitIndex<0?p.from:legPosition(r,end);}
    for(const a of this.actors)motionPlans.delete(a);
    const rebuild=(u)=>{
      const now=begin+u*dt;
      for(const a of this.actors){const p=paths.get(a.instanceId);p.from={x:a.x,y:a.y};p.start=u;p.lastTime=now;
        const staged=this.pendingActions.get(a.instanceId)?.staged;
        if(staged){p.motion=null;p.ordinary=null;p.to=legPosition(this.pendingActions.get(a.instanceId),end);continue;}
        if(!canCharacterAct(a)||this.statuses.controlled(a.instanceId,now))p.motion=null;
        p.ordinary=ordinaryMotionSegments({from:p.from,motion:p.motion,start:now,end,speed:this.definitionForActor(a).stats.moveSpeed*this.statuses.movementMultiplier(a.instanceId,now)});
        p.to=p.ordinary.at(-1)?.to??p.from;
      }
    };
    if(passiveMode)rebuild(0);
    const point=(id,u)=>{const p=paths.get(id);if(p.ordinary)return pointOnOrdinaryPath(p.ordinary,begin+u*dt)??p.from;const f=p.start>=1?0:Math.max(0,(u-p.start)/(1-p.start));return {x:p.from.x+(p.to.x-p.from.x)*f,y:p.from.y+(p.to.y-p.from.y)*f};};
    const place=u=>{const now=begin+u*dt;for(const a of this.actors){const p=paths.get(a.instanceId);
      if(passiveMode&&p.ordinary&&now>p.lastTime+1e-12){for(const leg of p.ordinary){const lo=Math.max(leg.start,p.lastTime),hi=Math.min(leg.end,now);if(hi>lo+1e-12)this.passives.appendOrdinary(a.instanceId,clipOrdinarySegment(leg,hi,lo));}p.lastTime=now;}
      Object.assign(a,point(a.instanceId,u));}};
    let cursor=0;
    while(cursor<=1){
      const contacts=[];
      let horizon=1;
      if(passiveMode){const now=begin+cursor*dt;let next=end;
        for(const [id,p]of paths){if(!p.ordinary)continue;const leg=p.ordinary.find(s=>s.end>now+1e-10);if(!leg)continue;
          const clipped=clipOrdinarySegment(leg,leg.end,Math.max(leg.start,now));next=Math.min(next,leg.end);
          const boundary=this.passives.nextBoundary(id,clipped);if(boundary!==null)next=Math.min(next,boundary);
        }
        for(const record of this.statuses.records.values())if(record.expiryTime>now+1e-10)next=Math.min(next,record.expiryTime);
        horizon=Math.max(cursor,Math.min(1,(next-begin)/dt));
        contacts.push({r:{actorId:'',hitIndex:0},u:horizon,passiveTick:true});
      }
      for(const r of this.pendingActions.values()){
        if(!r.staged){if(r.dueAt<=begin+horizon*dt+1e-9)contacts.push({r,u:Math.max(cursor,(r.dueAt-begin)/dt),legacy:true});continue;}
        if(r.hitIndex<0||r.settled[r.hitIndex])continue;
        const leg=r.definition.stagedAction.segments[r.hitIndex];if(begin>=r.startedAt+leg.endMs/1000-1e-9)continue;
        const target=this.actorById(r.targetId);if(!target||!canCharacterAct(target))continue;
        const spec=r.definition.stagedAction,u=relativeSweep(point(r.actorId,cursor),point(r.actorId,horizon),point(r.targetId,cursor),point(r.targetId,horizon),spec.sourceRadius+spec.targetRadius);
        if(u!==null)contacts.push({r,u:cursor+(horizon-cursor)*u});
      }
      // All discrete damage at this interval's boundary joins the swept TOI
      // queue, so an earlier identity can KO/cancel a later same-time source.
      for(const hit of this.pendingHits)if(hit.due<=begin+horizon*dt+1e-9)contacts.push({r:hit,u:Math.max(cursor,(hit.due-begin)/dt),queued:true});
      for(const [id,hit] of this.delayedImpacts)if(hit.threat.impactAtMs/1000<=begin+horizon*dt+1e-9)contacts.push({r:hit,u:Math.max(cursor,(hit.threat.impactAtMs/1000-begin)/dt),delayed:id});
      for(const area of this.areas.records.values()){
        const due=this.areas.nextTicks.get(area.id);if(due<=begin+horizon*dt+1e-9&&due<area.expiryTime-1e-9)contacts.push({r:{actorId:area.sourceId,hitIndex:0},u:Math.max(cursor,(due-begin)/dt),area});
      }
      contacts.sort((a,b)=>(Math.abs(a.u-b.u)*dt>1e-9?a.u-b.u:0)||Number(!!a.passiveTick)-Number(!!b.passiveTick)||a.r.actorId.localeCompare(b.r.actorId)||(a.r.hitIndex??0)-(b.r.hitIndex??0));
      if(!contacts.length)break;
      const {r,u,legacy,queued,delayed,area,passiveTick}=contacts[0];cursor=u;place(u);this.elapsedSeconds=begin+u*dt;
      if(passiveTick){this.passives.settle(this.elapsedSeconds);if(u>=1-1e-12)break;rebuild(u);continue;}
      const actor=this.actorById(r.actorId),target=this.actorById(r.targetId);
      if(area){
        this.areas.tick(this.elapsedSeconds,this.actors,(record,victim)=>this.applyAreaPulse(record,victim),area.id);
      }
      if(queued)this.pendingHits=this.pendingHits.filter(hit=>hit!==r);
      if(delayed){this.delayedImpacts.delete(delayed);this.threats.remove(delayed);}
      if(!area&&(!actor||!canCharacterAct(actor)||this.statuses.controlled(r.actorId,this.elapsedSeconds))){this.cancelAction(r.actorId,'source_interrupted');if(delayed)this.recordImpactPresentation(r.impactPresentation,'cancel',false,'source_interrupted');continue;}
      if(area){/* pulse was resolved above; common KO/path cleanup follows */}
      else if(queued){
        if(target&&canCharacterAct(target)&&isTargetInRange(actor,target,r.definition.range))this.applyResolvedDamage(actor,target,this.definitionForActor(actor),this.definitionForActor(target),r.definition,r.category,r.source,{hitIndex:r.hitIndex,totalHits:r.totalHits,eventAt:this.elapsedSeconds});
      }else if(delayed){
        const applied=this.applyAbilityEffects(actor,target,r.definition,r.category,r.source,this.teamContext(actor),r.threat.geometry,this.observedHitContext(r.impactPresentation));
        if(r.impactPresentation)this.recordImpactPresentation(r.impactPresentation,'resolve',applied);else this.recordCast(actor,{...r.threat.geometry.center},r.category,r.source,r.definition,applied,{eventAt:this.elapsedSeconds});
      }else if(legacy){
        this.resolveActions(r.actorId);
        // Repositions happen at a point in time, never along a fictitious swept path.
        for(const a of this.actors){const prior=point(a.instanceId,u);if(Math.hypot(a.x-prior.x,a.y-prior.y)>1e-9){const p=paths.get(a.instanceId);p.from={x:a.x,y:a.y};p.to={x:a.x,y:a.y};p.start=u;p.motion=null;p.ordinary=null;p.lastTime=this.elapsedSeconds;}}
      }else{
        r.settled[r.hitIndex]=true;const coefficient=r.definition.stagedAction.segments[r.hitIndex].coefficient;
        const definition={...r.definition,effect:{...r.definition.effect,coefficient,hits:1}};
        const amount=this.applyResolvedDamage(actor,target,this.definitionForActor(actor),this.definitionForActor(target),definition,r.category,r.source,{actionId:r.actionId,hitIndex:r.hitIndex,totalHits:r.settled.length,eventAt:this.elapsedSeconds});
        this.stagedEvent(r,'resolve',{hit:amount>0,collision:true});
        if(amount>0)this.effects.trigger('post_cast',actor,target,r.category,{definition,source:r.source});
      }
      for(const a of this.actors)if(!canCharacterAct(a)||this.statuses.controlled(a.instanceId,this.elapsedSeconds)){
        const p=paths.get(a.instanceId);p.to={x:a.x,y:a.y};p.from={x:a.x,y:a.y};p.start=u;p.motion=null;p.ordinary=null;p.lastTime=this.elapsedSeconds;
        if(this.pendingActions.get(a.instanceId)?.staged)this.cancelAction(a.instanceId,!canCharacterAct(a)?'source_ko':'control');
      }
      if(this.result()!=='running'){this.clearTransientCombat({preserveEvents:true});return;}
    }
    place(1);if(passiveMode)this.passives.settle(end);this.elapsedSeconds=begin;
  }

  stepInterval(deltaSeconds) {
    positiveFinite(deltaSeconds, 'deltaSeconds');
    if (this.result() !== 'running') { this.clearTransientCombat(); return this.snapshot(); }
    this.resolveActions();
    for(const [id,hit] of this.delayedImpacts)if(!canCharacterAct(this.actorById(hit.actorId))){this.recordImpactPresentation(hit.impactPresentation,'cancel',false,'source_ko');this.delayedImpacts.delete(id);this.threats.remove(id);}

    this.statuses.cleanupKO(new Set(this.actors.filter(a=>!canCharacterAct(a)).map(a=>a.instanceId)));
    for(const a of this.actors)if(!canCharacterAct(a))this.passives.clearActor(a.instanceId);
    // Preserve the legacy cooldown-before-intent evaluation. If a real staged
    // start shortens this interval, unrelated clocks consume only that duration.
    const clocks=this.actors.map(actor=>({actor,cadence:this.cadence.get(actor.instanceId),slots:ACTIVE_CATEGORIES.map(category=>[actor.abilityState[category],{...actor.abilityState[category]}])}));
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
      const state=this.tacticalStates.get(actor.instanceId)??{},actorDefinition=this.definitionForActor(actor);
      if(!this.tacticalStates.has(actor.instanceId))this.tacticalStates.set(actor.instanceId,state);
      const profile=this.tacticalEnabled?actorDefinition.aiProfile:null;
      const controlled=actor.controlHandoff.controlSource(nowMs)==='player';
      if(controlled){for(const k of Object.keys(state))delete state[k];}
      const evaluate=profile&&!controlled&&nowMs>=(state.nextAt??0);
      if(evaluate){state.scoredTargetId=scoreTacticalTarget({actor,enemies:opponents,allies:this.teamContext(actor).allies,profile,characterDefinitions:this.characterDefinitions,abilityDefinitions:this.actorAbilityDefinitions.get(actor.instanceId),targetIds:this.targetIds})?.instanceId;}
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

    // A ready slot is not an action: the selected AI intent must really cast.
    // Start opted-in actions at the intent boundary, before any actor advances.
    const startedSlots=new Set();
    for(const {actor,intent} of intents){
      if(intent.kind!=='ability'||actor.controlHandoff.controlSource(nowMs)==='player'||this.pendingActions.get(actor.instanceId)?.staged)continue;
      const definition=this.actorAbilityDefinitions.get(actor.instanceId)[intent.definitionId];
      if(definition?.stagedAction&&this.executeAbility(actor,intent.category,'ai',this.actorById(intent.targetId)))startedSlots.add(actor.abilityState[intent.category]);
    }
    const planning=this.hasStagedAction()||this.passives.enabled();
    if(planning){
      const requested=deltaSeconds;deltaSeconds=this.stagedIntervalSeconds(deltaSeconds);
      if(deltaSeconds<requested){
        for(const {actor,cadence,slots} of clocks){
          for(const [slot,before] of slots)if(!startedSlots.has(slot)){Object.assign(slot,before);tickAbilityCooldown(slot,deltaSeconds);}
          this.cadence.set(actor.instanceId,Math.max(0,cadence-deltaSeconds));
        }
      }
      // These casts started at the interval boundary, so their new cooldown
      // advances with the same time as every other actor (including anticipation).
      for(const slot of startedSlots)tickAbilityCooldown(slot,deltaSeconds);
      for(const a of this.actors)motionPlans.set(a,{x:a.x,y:a.y});
    }

    for (const { actor, intent } of intents) {
      if(this.pendingActions.get(actor.instanceId)?.staged)continue;
      if (!canCharacterAct(actor)||this.statuses.controlled(actor.instanceId,this.elapsedSeconds)) continue;

      const actorDefinition = this.definitionForActor(actor);
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

    if(planning){if(this.hasStagedAction())this.advanceStagedMotion(deltaSeconds);else this.advancePlannedMotion(deltaSeconds);if(this.result()!=='running')return this.snapshot();}
    this.elapsedSeconds = Math.min(this.maxSeconds, this.elapsedSeconds + deltaSeconds);
    this.statuses.expire(this.elapsedSeconds);
    for(const threat of this.threats.takeDue(this.elapsedSeconds*1000)){
      const hit=this.delayedImpacts.get(threat.id);this.delayedImpacts.delete(threat.id);if(!hit)continue;
      const actor=this.actorById(hit.actorId),target=this.actorById(hit.targetId);
      if(!actor||!canCharacterAct(actor)){this.recordImpactPresentation(hit.impactPresentation,'cancel',false,'source_ko');continue;}
      const applied=this.applyAbilityEffects(actor,target,hit.definition,hit.category,hit.source,this.teamContext(actor),threat.geometry,this.observedHitContext(hit.impactPresentation));
      if(hit.impactPresentation)this.recordImpactPresentation(hit.impactPresentation,'resolve',applied);else this.recordCast(actor,{...threat.geometry.center},hit.category,hit.source,hit.definition,applied);
    }
    this.areas.cleanupKO(new Set(this.actors.filter(a=>!canCharacterAct(a)).map(a=>a.instanceId)));
    this.areas.tick(this.elapsedSeconds,this.actors,(area,victim)=>this.applyAreaPulse(area,victim));
    const remaining=[];
    for(const hit of this.pendingHits) {
      const actor=this.actorById(hit.actorId),target=this.actorById(hit.targetId);
      if(!actor||!target||!canCharacterAct(actor)||!canCharacterAct(target))continue;
      if(hit.due>this.elapsedSeconds+1e-9){remaining.push(hit);continue;}
      if(isTargetInRange(actor,target,hit.definition.range))this.applyResolvedDamage(actor,target,this.definitionForActor(actor),this.definitionForActor(target),hit.definition,hit.category,hit.source,{hitIndex:hit.hitIndex,totalHits:hit.totalHits});
    }
    this.pendingHits=this.result()==='running'?remaining:[];
    this.resolveActions();
    this.statuses.cleanupKO(new Set(this.actors.filter(a=>!canCharacterAct(a)).map(a=>a.instanceId)));
    for(const a of this.actors)if(!canCharacterAct(a))this.passives.clearActor(a.instanceId);
    if(this.result()!=='running')this.clearTransientCombat({preserveEvents:true});
    return this.snapshot();
  }
}

export function createBattleSession(options) {
  return new BattleSession(options);
}
