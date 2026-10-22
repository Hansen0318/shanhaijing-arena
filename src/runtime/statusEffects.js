import {characterAction} from '../assets/battleDescriptors.js';
// Source ability selects art; actual per-recipient status records own its lifetime.
export function statusEffectGroups(frame,definitions,statuses,now){
 const actors=[...frame.allies,...frame.enemies],byId=new Map(actors.filter(a=>a.hp>0&&a.visible!==false).map(a=>[a.instanceId,a])),groups=new Map();
 for(const target of byId.values())for(const record of statuses.forActor(target.instanceId,now)){
  const provenance=record.presentationSource,source=byId.get(record.sourceId);if(!source||!provenance)continue;
  const definition=definitions[source.definitionId];if(definition?.abilities?.[provenance.category]!==provenance.abilityId)continue;
  const action=characterAction(definition,provenance.category),style=action?.statusVisuals?.[provenance.effectId];if(!style||style.type!==record.type)continue;
  const id='source-status.'+target.instanceId+'.'+style.styleId,identity=record.sourceId+'.'+record.targetId+'.'+record.id+'.'+provenance.abilityId+'.'+provenance.effectId;
  let group=groups.get(id);if(!group){group={id,target,style,records:[]};groups.set(id,group);}group.records.push({record,identity,style});
 }
 const result=[];
 for(const target of byId.keys()){
  const list=[...groups.values()].filter(g=>g.target.instanceId===target);
  for(const g of list){g.records.sort((a,b)=>b.record.magnitude-a.record.magnitude||b.record.startTime-a.record.startTime||a.identity.localeCompare(b.identity));g.style=g.records[0].style;g.recordIds=g.records.map(r=>r.identity);}
  list.sort((a,b)=>b.style.priority-a.style.priority||a.id.localeCompare(b.id));result.push(...list.slice(0,4));
 }
 return result;
}
