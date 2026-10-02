// Battle-only, simulation-clock-owned status. No timers, persistence or character IDs.
export class BattleStatuses {
 constructor(){this.mitigation=new Map();}
 applyMitigation(actorId,reduction,duration,now) {
  if(!Number.isFinite(reduction)||reduction<0||reduction>1||!Number.isFinite(duration)||duration<=0)throw new RangeError('Invalid mitigation');
  this.mitigation.set(actorId,{reduction,expiresAt:now+duration});
 }
 expire(now){for(const [id,status] of this.mitigation)if(now>=status.expiresAt)this.mitigation.delete(id);}
 damageMultiplier(actorId,now){const s=this.mitigation.get(actorId);return s&&now<s.expiresAt?1-s.reduction:1;}
}
