import {containsDanger} from './threats.js';
const d=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
const point=(p,b)=>({x:clamp(p.x,b.xMin,b.xMax),y:clamp(p.y,b.yMin,b.yMax)});
export const TACTICAL_INTERVAL_MS=250;
export const DESTINATION_HOLD_MS=700;
// Exactly five bounded candidates, shared by evade, kite and retreat.
export function safePosition({actor,target,enemies,allies,profile,bounds,geometry=null,step=1,previous=null}) {
 const dx=actor.x-target.x,dy=actor.y-target.y,len=Math.hypot(dx,dy),nx=len?dx/len:(actor.teamId==='allies'?-1:1),ny=len?dy/len:0;
 const directions=[[-ny,nx],[ny,-nx],[nx,ny],[(nx-ny)/Math.SQRT2,(ny+nx)/Math.SQRT2],[(nx+ny)/Math.SQRT2,(ny-nx)/Math.SQRT2]];
 const score=p=>{
  const near=Math.min(...enemies.filter(e=>e.hp>0).map(e=>d(p,e)),10);
  const spacing=Math.min(...allies.filter(a=>a.instanceId!==actor.instanceId&&a.hp>0).map(a=>d(p,a)),2);
  const preferred=(profile.preferredRangeMin+profile.preferredRangeMax)/2;
  return (geometry&&containsDanger(p,geometry)?-1000:0)+near*3-Math.abs(d(p,target)-preferred)*.4+spacing*.4+(previous?Math.max(0,1-d(p,previous))*.3:0);
 };
 const current=score(actor);return directions.map(([x,y],index)=>({p:point({x:actor.x+x*step,y:actor.y+y*step},bounds),index})).filter(c=>d(c.p,actor)>.05)
 .map(c=>({...c,score:score(c.p)})).filter(c=>c.score>current+.05&&(!geometry||!containsDanger(c.p,geometry)))
 .sort((a,b)=>b.score-a.score||a.index-b.index)[0]?.p??null;
}
export function decideTacticalIntent(c) {
 const {actor,target,profile:p,state:s,nowMs:n,baseIntent:b}=c;
 if(actor.hp<=0||c.playerControlled){for(const k of Object.keys(s))delete s[k];return {kind:'idle',reason:actor.hp<=0?'ko':'player_override',targetId:target?.instanceId??null};}
 if(!target)return b;
 const wrap=(phase,destination=null)=>({...b,kind:destination?'move':b.kind,pursue:false,targetId:target.instanceId,tacticalState:phase,...(destination?{movement:'destination',destination}:{} )});
 if(s.until>n&&s.targetId===target.instanceId&&s.destination)return b.kind==='ability'&&c.supportAbility?{...b,pursue:false,tacticalState:s.phase,destination:s.destination}:wrap(s.phase,s.destination);
 let phase='engage',destination=null;
 const dist=d(actor,target),nearest=Math.min(...c.enemies.filter(e=>e.hp>0).map(e=>d(actor,e)),Infinity),hp=actor.hp/actor.maxHp;
 const incoming=c.threats.filter(t=>t.sourceTeamId!==actor.teamId&&t.dodgeable&&containsDanger(actor,t.geometry)).sort((a,b)=>a.impactAtMs-b.impactAtMs||b.severity-a.severity||a.id.localeCompare(b.id));
 for(const t of incoming){
  if(c.committed||c.speed<=0||n<t.createdAtMs+p.evadeReactionMs||t.impactAtMs-n<p.evadeReactionMs)continue;
  s.considered??={};if(!Object.hasOwn(s.considered,t.id))s.considered[t.id]=c.random()<p.evadeTendency;
  if(!s.considered[t.id])continue;
  const step=Math.min(1.2,c.speed*(t.impactAtMs-n)/1000);
  destination=safePosition({...c,geometry:t.geometry,step,previous:s.destination});if(destination){phase='evade';break;}
 }
 // Drop old threat roll decisions; no unbounded accumulation in long fights.
 if(s.considered){const ids=new Set(c.threats.map(t=>t.id));for(const id of Object.keys(s.considered))if(!ids.has(id))delete s.considered[id];}
 if(!destination){
  const recovering=['retreat','recover/support'].includes(s.phase);
  if(recovering&&(hp>=p.reengageHpThreshold||n-s.retreatAt>=2800)){
   phase='regroup';s.retreatBlockedUntil=n+2000;s.retreatAt=null;
  }else if(p.retreatHpThreshold>0&&(recovering||n>=(s.retreatBlockedUntil??0)&&(hp<p.retreatHpThreshold||nearest<p.dangerRadius))){
   if(!recovering)s.retreatAt=n;
   destination=safePosition({...c,previous:s.destination});phase=destination?'retreat':'recover/support';
  }else if(p.kiteTendency>0&&(s.phase==='kite'?dist<p.preferredRangeMin+.35:dist<p.preferredRangeMin-.15)){
   destination=safePosition({...c,previous:s.destination});phase='kite';
  }else if(dist>p.preferredRangeMax+.25){
   const dx=actor.x-target.x,dy=actor.y-target.y,len=dist||1,range=(p.preferredRangeMin+p.preferredRangeMax)/2;
   const side=s.side??(s.side=c.random()<.5?-1:1);const lateral=p.lateralVariation*side;
   destination=point({x:target.x+dx/len*range-dy/len*lateral,y:target.y+dy/len*range+dx/len*lateral},c.bounds);phase=p.aggression>.8?'pressure/chase':'engage';
  }else if(p.lateralVariation>.45&&n>=(s.repositionAt??0)&&b.category!=='awakening'){
   const side=s.side??(s.side=c.random()<.5?-1:1),dx=actor.x-target.x,dy=actor.y-target.y,len=dist||1;
   destination=point({x:actor.x-dy/len*side*.55,y:actor.y+dx/len*side*.55},c.bounds);phase='reposition';s.repositionAt=n+1800;
  }else phase=p.retreatHpThreshold>0?'recover/support':p.aggression>.8?'pressure/chase':'engage';
 }
 s.phase=phase;s.targetId=target.instanceId;s.destination=destination;s.until=n+(destination?DESTINATION_HOLD_MS:TACTICAL_INTERVAL_MS);
 const result=wrap(phase,destination);
 // Support can cast while following a retreat/kite objective via the shared API.
 if(b.kind==='ability'&&c.supportAbility)return {...b,pursue:false,tacticalState:phase,...(destination?{destination}:{} )};
 // While settled in a ranged band, Basic must not drag toward melee range.
 if(!destination&&b.kind==='move'&&dist>=p.preferredRangeMin&&dist<=p.preferredRangeMax)return {kind:'idle',targetId:target.instanceId,tacticalState:phase,reason:'preferred_band_hold'};
 return result;
}
