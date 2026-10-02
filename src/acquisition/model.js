import { rosterCatalog } from '../roster/catalog.js';
export const ACQUISITION_VERSION=3;
export const UNLOCK_THRESHOLD=5;
const catalogIds=()=>Object.keys(rosterCatalog);
const known=id=>typeof id==='string' && Object.hasOwn(rosterCatalog,id);
const identifiers=value=>Array.isArray(value)?[...new Set(value.filter(id=>typeof id==='string' && id.length>0))]:[];
export function initialAcquisition(clearedStageIds=[]) {
 return normalizeAcquisition({version:ACQUISITION_VERSION},clearedStageIds);
}
export function normalizeAcquisition(raw,clearedStageIds=[]) {
 const source=[1,2,ACQUISITION_VERSION].includes(raw?.version)?raw:{};
 const shardsByCharacterId=Object.fromEntries(catalogIds().map(id=>{
  const count=source.shardsByCharacterId?.[id];
  return [id,Number.isSafeInteger(count) && count>=0?count:0];
 }));
 const ownedCharacterIds=catalogIds().filter(id=>['P1','P2','P3'].includes(id) || shardsByCharacterId[id]>=UNLOCK_THRESHOLD);
 const owned=new Set(ownedCharacterIds),tierByCharacterId={},spentShardsByCharacterId={};
 for(const id of catalogIds()) {
  const earned=shardsByCharacterId[id],recruit=owned.has(id)&&!['P1','P2','P3'].includes(id)?UNLOCK_THRESHOLD:0;
  let tier=owned.has(id)?'T0':null;
  const savedTier=source.tierByCharacterId?.[id];
  const upgrades={T0:0,T1:5,T2:15,T3:30};
  const savedSpent=[2,ACQUISITION_VERSION].includes(source.version)?source.spentShardsByCharacterId?.[id]:0;
  const validSpent=Number.isSafeInteger(savedSpent)&&savedSpent>=0?Math.min(earned,savedSpent):0;
  // Prototype v2 Tier labels cannot reliably map to the new costs. Reset to T0,
  // retaining both its recorded spend and any valid old Tier's implied cost.
  const oldCosts={T1:0,T2:5,T3:15};
  const legacyFloor=source.version===2 && typeof savedTier==='string' && Object.hasOwn(oldCosts,savedTier)
   && earned>=recruit+oldCosts[savedTier]?recruit+oldCosts[savedTier]:recruit;
  if(source.version===ACQUISITION_VERSION && owned.has(id) && typeof savedTier==='string'
   && Object.hasOwn(upgrades,savedTier) && validSpent>=recruit+upgrades[savedTier])tier=savedTier;
  tierByCharacterId[id]=tier;spentShardsByCharacterId[id]=owned.has(id)?Math.max(legacyFloor,validSpent):0;
 }
 return {version:ACQUISITION_VERSION,shardsByCharacterId,ownedCharacterIds,tierByCharacterId,spentShardsByCharacterId,
  claimedStageIds:identifiers([...identifiers(source.claimedStageIds),...identifiers(clearedStageIds)]),
  completedBattleIds:identifiers(source.completedBattleIds),
  completedUpgradeIds:[2,ACQUISITION_VERSION].includes(source.version)?identifiers(source.completedUpgradeIds):[],
 };
}
export function normalizeReward(reward) {
 if(!Array.isArray(reward?.items))return [];
 return reward.items.filter(item=>item?.type==='characterShard' && known(item.characterId)
  && Number.isSafeInteger(item.quantity) && item.quantity>0 && ['firstClear','repeatable'].includes(item.repeat))
  .map(({type,characterId,quantity,repeat})=>({type,characterId,quantity,repeat}));
}
// Pure transaction: state is copied; every catalog character keeps its inventory.
export function completeAcquisition(raw,{stageId,completionId,outcome,reward}={}) {
 let state=normalizeAcquisition(raw);
 const result={state,grantedItems:[],unlockedCharacterIds:[],shardCounts:{...state.shardsByCharacterId}};
 if(outcome!=='victory' || typeof stageId!=='string' || !stageId || typeof completionId!=='string' || !completionId
  || state.completedBattleIds.includes(completionId))return result;
 const wasClaimed=state.claimedStageIds.includes(stageId),before=new Set(state.ownedCharacterIds);
 const items=normalizeReward(reward);
 // Select one reward set. Repeatable-only stages still reward their initial win.
 const repeat=!wasClaimed && items.some(item=>item.repeat==='firstClear')?'firstClear':'repeatable';
 for(const item of items) {
  if(item.repeat!==repeat)continue;
  const count=state.shardsByCharacterId[item.characterId]+item.quantity;
  // Never save an imprecise integer if a malformed/extreme fixture overflows.
  if(!Number.isSafeInteger(count))continue;
  state.shardsByCharacterId[item.characterId]=count;result.grantedItems.push(item);
 }
 state.claimedStageIds=identifiers([...state.claimedStageIds,stageId]);
 state.completedBattleIds.push(completionId);state=normalizeAcquisition(state);
 result.state=state;result.shardCounts={...state.shardsByCharacterId};
 result.unlockedCharacterIds=state.ownedCharacterIds.filter(id=>!before.has(id));
 return result;
}
