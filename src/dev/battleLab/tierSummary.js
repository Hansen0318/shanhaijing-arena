import {rosterCatalog} from '../../roster/catalog.js';
import {resolveTierProjection} from '../../combat/tierEffects.js';
import {createLabConfig} from './config.js';
// Same immutable projection as BattleSession; no runtime or persistence capability.
export function labTierSummary(draft){
 const config=createLabConfig(draft);
 return Object.freeze([['allyTeam','allyTier','a','ALLY'],['enemyTeam','enemyTier','e','ENEMY']].flatMap(([team,tier,prefix,side])=>config[team].map((id,i)=>{
  const p=resolveTierProjection(rosterCatalog[id],config[tier]);
  return Object.freeze({instanceId:`${prefix}${i+1}`,side,name:p.definition.name,tier:p.tier,maxHp:p.stats.maxHp,moveSpeed:p.stats.moveSpeed,attackSpeed:p.stats.attackSpeed,scales:p.scales});
 })));
}
