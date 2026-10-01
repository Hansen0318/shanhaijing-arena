import { normalizeReward,UNLOCK_THRESHOLD } from './model.js';
export function stageRewardRows(stage,acquisition) {
 const claimed=acquisition?.claimedStageIds?.includes(stage.stageId);
 return normalizeReward(stage.reward).map(item=>({...item,label:`${item.characterId} Shard ×${item.quantity}`,
  status:item.repeat==='repeatable'?'REPEATABLE':claimed?'CLAIMED':'FIRST CLEAR'}));
}
export function resultRewardLines(transaction) {
 if(!transaction?.grantedItems?.length)return [];
 const totals=new Map();
 for(const item of normalizeReward({items:transaction.grantedItems}))totals.set(item.characterId,(totals.get(item.characterId)??0)+item.quantity);
 return [...totals].map(([id,quantity])=>`${id} Shard +${quantity}   ${transaction.shardCounts[id]} / ${UNLOCK_THRESHOLD}${transaction.unlockedCharacterIds.includes(id)?`   ${id} UNLOCKED`:''}`);
}
