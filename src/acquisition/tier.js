import {normalizeAcquisition,UNLOCK_THRESHOLD} from './model.js';
import {rosterCatalog} from '../roster/catalog.js';
const next={T1:{tier:'T2',cost:5},T2:{tier:'T3',cost:10}};
export function characterProgress(raw,id) {
 const state=normalizeAcquisition(raw),owned=state.ownedCharacterIds.includes(id),tier=state.tierByCharacterId[id] ?? null;
 const earned=state.shardsByCharacterId[id] ?? 0,spent=state.spentShardsByCharacterId[id] ?? 0,available=earned-spent;
 const requirement=owned?(next[tier]?.cost ?? null):UNLOCK_THRESHOLD;
 return {earned,spent,available,owned,tier,nextTier:next[tier]?.tier ?? null,requirement,
  progressLabel:tier==='T3'?'MAX':`${available} / ${requirement}`,canUpgrade:owned&&Boolean(next[tier])&&available>=requirement};
}
export function upgradeTier(raw,{characterId,expectedTier,requestId}={}) {
 const state=normalizeAcquisition(raw),result={state,upgraded:false};
 if(typeof characterId!=='string'||!Object.hasOwn(rosterCatalog,characterId)||typeof requestId!=='string'||!requestId||state.completedUpgradeIds.includes(requestId))return result;
 const progress=characterProgress(state,characterId);
 if(!progress.canUpgrade||expectedTier!==progress.tier)return result;
 state.spentShardsByCharacterId[characterId]+=progress.requirement;
 state.tierByCharacterId[characterId]=progress.nextTier;state.completedUpgradeIds.push(requestId);
 return {state:normalizeAcquisition(state),upgraded:true,characterId,fromTier:progress.tier,toTier:progress.nextTier,consumed:progress.requirement};
}
