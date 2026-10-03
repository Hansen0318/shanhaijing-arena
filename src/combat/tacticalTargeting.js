import {getTypeMultiplier as typeMultiplier} from './typeMultiplier.js';
import {canCharacterAct} from './character.js';
import {resolveEffectTargets} from './effectTargeting.js';
import {chooseSoftTarget} from './targeting.js';
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export function scoreTacticalTarget({actor,enemies,allies,profile:p,characterDefinitions,abilityDefinitions={},targetIds=null}) {
 if(!p)return chooseSoftTarget(actor,enemies,null);
 const def=characterDefinitions[actor.definitionId];
 const candidates=enemies.filter(canCharacterAct).map(e=>{
  const victim=allies.find(a=>a.instanceId===(targetIds?.get(e.instanceId)??e.targetId)&&a.hp>0),protect=victim?(1-victim.hp/victim.maxHp):0;
  const opportunity=Object.values(actor.abilityState).filter(s=>s.phase==='ready').reduce((score,s)=>{const ability=abilityDefinitions[s.definitionId];return ability?.targetingRule==='enemy'?Math.max(score,resolveEffectTargets(actor,e,ability,{allies,enemies}).length-1):score;},0);
  const isolated=enemies.filter(o=>o!==e&&o.hp>0&&distance(e,o)<1.5).length===0?1:0;
  const score=-distance(actor,e)*p.targetWeights.distance+(1-e.hp/e.maxHp)*p.weakenedTargetWeight+protect*(p.protectAllyWeight+p.targetWeights.threat)+isolated*p.targetWeights.isolation+opportunity*p.skillOpportunityWeight+(def&&characterDefinitions[e.definitionId]?typeMultiplier(def.type,characterDefinitions[e.definitionId].type)-1:0)*p.typeAdvantageWeight;
  return {e,score};
 });
 return candidates.sort((a,b)=>b.score-a.score||(a.e.instanceId<b.e.instanceId?-1:a.e.instanceId>b.e.instanceId?1:0))[0]?.e??null;
}
