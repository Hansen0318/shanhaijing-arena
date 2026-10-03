export function createTelegraph(input) {
 if(input==null)return null;
 const t={telegraphMs:0,projectileTravelMs:0,dodgeable:false,dangerShape:'circle',dangerRadius:.6,commitment:'locked',interruptible:false,...input};
 for(const k of ['telegraphMs','projectileTravelMs','dangerRadius'])if(!Number.isFinite(t[k])||t[k]<0)throw new RangeError(`Invalid telegraph ${k}`);
 if(!['circle','lane'].includes(t.dangerShape)||!['locked','mobile'].includes(t.commitment)||typeof t.dodgeable!=='boolean'||typeof t.interruptible!=='boolean')throw new TypeError('Invalid telegraph metadata');
 if(t.dangerRadius<=0||(t.dodgeable&&t.telegraphMs+t.projectileTravelMs<=0))throw new RangeError('Dodge requires a reaction window');
 return Object.freeze(t);
}
export function containsDanger(point,g) {
 if(g.shape==='circle')return Math.hypot(point.x-g.center.x,point.y-g.center.y)<=g.radius;
 const dx=g.center.x-g.origin.x,dy=g.center.y-g.origin.y,d=dx*dx+dy*dy;
 const f=d>0?Math.max(0,Math.min(1,((point.x-g.origin.x)*dx+(point.y-g.origin.y)*dy)/d)):0;
 return Math.hypot(point.x-g.origin.x-f*dx,point.y-g.origin.y-f*dy)<=g.radius;
}
export class ThreatLedger {
 constructor(){this.records=new Map();this.sequence=0;}
 create(actor,target,definition,nowMs) {
  const t=definition.telegraph;if(!t||!target)return null;
  const origin=Object.freeze({x:actor.x,y:actor.y});const point=definition.effect.areaCenter==='caster'?actor:target;
  const geometry=Object.freeze({shape:t.dangerShape,origin,center:Object.freeze({x:point.x,y:point.y}),radius:t.dangerRadius});
  const record=Object.freeze({id:`threat-${++this.sequence}`,sourceId:actor.instanceId,sourceTeamId:actor.teamId,targetId:target.instanceId,createdAtMs:nowMs,impactAtMs:nowMs+t.telegraphMs+t.projectileTravelMs,geometry,category:definition.category,severity:definition.category==='awakening'?3:definition.category==='special'?2:1,dodgeable:t.dodgeable,commitment:t.commitment,interruptible:t.interruptible});
  this.records.set(record.id,record);return record;
 }
 active(nowMs){return [...this.records.values()].filter(t=>t.impactAtMs>=nowMs).sort((a,b)=>a.impactAtMs-b.impactAtMs||a.id.localeCompare(b.id));}
 takeDue(nowMs){const due=this.active(Number.NEGATIVE_INFINITY).filter(t=>t.impactAtMs<=nowMs+1e-7);for(const t of due)this.records.delete(t.id);return due;}
 remove(id){this.records.delete(id);}
 clear(){this.records.clear();}
}
