import { canCharacterAct } from './character.js';
import { isTargetInRange } from './ability.js';
const compareId=(a,b)=>a.instanceId<b.instanceId?-1:a.instanceId>b.instanceId?1:0;
export function livingUnique(actors) {
 return [...new Map(actors.filter(canCharacterAct).map(a=>[a.instanceId,a])).values()].sort(compareId);
}
export function lowestHpAlly(actors) {
 return livingUnique(actors).sort((a,b)=>a.hp/a.maxHp-b.hp/b.maxHp||compareId(a,b))[0] ?? null;
}
export function areaTargets(center,actors,radius) {
 return livingUnique(actors).filter(target=>isTargetInRange(center,target,radius));
}
export function resolveAbilityTarget(actor,definition,{allies,enemies,enemyTarget}) {
 if(definition.targetingRule==='self'||definition.targetingRule==='team_ally')return actor;
 if(definition.targetingRule==='lowest_hp_ally')return lowestHpAlly(allies.filter(a=>a.teamId===actor.teamId&&isTargetInRange(actor,a,definition.range)));
 return enemyTarget;
}
export function resolveEffectTargets(actor,target,definition,{allies,enemies}) {
 if(definition.targetingRule==='team_ally')return livingUnique(allies.filter(a=>a.teamId===actor.teamId));
 if(definition.targetingRule==='self')return canCharacterAct(actor)?[actor]:[];
 if(definition.effect.areaRadius!=null){
  const center=definition.effect.areaCenter==='caster'?actor:target;
  return center?areaTargets(center,enemies.filter(a=>a.teamId!==actor.teamId),definition.effect.areaRadius):[];
 }
 return target&&canCharacterAct(target)?[target]:[];
}
// Generic protection opportunity. Uses authoritative incoming targets/geometry, never roster identity.
export function mostThreatenedAlly(actor,allies,enemies,radius,targetIds=new Map(),threats=[]){
 const candidates=areaTargets(actor,allies.filter(a=>a.teamId===actor.teamId&&a.instanceId!==actor.instanceId),radius);
 const score=a=>enemies.filter(canCharacterAct).reduce((n,e)=>n+(targetIds.get(e.instanceId)===a.instanceId?4:0)+(isTargetInRange(e,a,1.5)?1:0),0)+(1-a.hp/a.maxHp)*2+threats.filter(t=>t.sourceTeamId!==a.teamId&&(t.targetId===a.instanceId||t.area&&isTargetInRange(t.geometry.center,a,t.geometry.radius))).length*3;
 return candidates.sort((a,b)=>score(b)-score(a)||compareId(a,b))[0]??null;
}
