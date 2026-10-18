import {immutable} from '../assets/schema.js';
const EPS=1e-9;
export function createStagedAction(input){
 if(input==null)return null;
 const s=structuredClone(input);
 for(const key of ['recoveryMs','maxDistance','emptyDistance','sourceRadius','targetRadius'])if(!Number.isFinite(s[key])||s[key]<=0)throw new RangeError(`Invalid staged ${key}`);
 if(!Array.isArray(s.segments)||!s.segments.length||s.segments.length>8)throw new RangeError('Invalid staged segments');
 let end=0;
 for(const leg of s.segments){
  for(const key of ['startMs','centerMs','endMs','coefficient','overrun'])if(!Number.isFinite(leg[key])||leg[key]<0)throw new RangeError(`Invalid staged ${key}`);
  if(leg.startMs<end||leg.centerMs<=leg.startMs||leg.endMs<=leg.centerMs||leg.coefficient<=0)throw new RangeError('Invalid staged chronology');end=leg.endMs;
 }
 if(s.recoveryMs<=end)throw new RangeError('Invalid staged recovery');
 return immutable(s);
}
export function relativeSweep(a,b,c,d,radius){
 const px=a.x-c.x,py=a.y-c.y,vx=b.x-a.x-d.x+c.x,vy=b.y-a.y-d.y+c.y;
 const c0=px*px+py*py-radius*radius;if(c0<=EPS)return 0;
 const qa=vx*vx+vy*vy,qb=2*(px*vx+py*vy),disc=qb*qb-4*qa*c0;
 if(qa<EPS||disc<-EPS)return null;const u=(-qb-Math.sqrt(Math.max(0,disc)))/(2*qa);
 return u>=-EPS&&u<=1+EPS?Math.max(0,Math.min(1,u)):null;
}
export function rayDistance(origin,direction,distance,bounds){
 let result=distance;
 for(const [key,min,max] of [['x',bounds.xMin,bounds.xMax],['y',bounds.yMin,bounds.yMax]]){
  const v=direction[key];if(v>EPS)result=Math.min(result,(max-origin[key])/v);else if(v<-EPS)result=Math.min(result,(min-origin[key])/v);
 }
 return Math.max(0,result);
}
export function beginLeg(record,index,actor,target,bounds){
 const spec=record.definition.stagedAction,leg=spec.segments[index],previous=record.direction;
 let dx=previous.x,dy=previous.y,main=spec.emptyDistance;
 if(target?.hp>0){dx=target.x-actor.x;dy=target.y-actor.y;const distance=Math.hypot(dx,dy);main=Math.min(distance,record.definition.range,spec.maxDistance);if(distance>EPS){dx/=distance;dy/=distance;}else{dx=previous.x;dy=previous.y;}}
 else if(index>0){dx=-dx;dy=-dy;}
 const direction={x:dx,y:dy},origin={x:actor.x,y:actor.y};
 const legal=rayDistance(origin,direction,Math.min(spec.maxDistance,main+leg.overrun),bounds);
 record.hitIndex=index;record.direction=direction;record.leg={origin,main:Math.min(main,legal),total:legal};
}
export function legPosition(record,time){
 if(!record.leg)return {...record.origin};
 const leg=record.definition.stagedAction.segments[record.hitIndex],ms=(time-record.startedAt)*1000;
 const distance=ms<=leg.centerMs?record.leg.main*Math.max(0,Math.min(1,(ms-leg.startMs)/(leg.centerMs-leg.startMs))):record.leg.main+(record.leg.total-record.leg.main)*Math.max(0,Math.min(1,(ms-leg.centerMs)/(leg.endMs-leg.centerMs)));
 return {x:record.leg.origin.x+record.direction.x*distance,y:record.leg.origin.y+record.direction.y*distance};
}
