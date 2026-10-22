const EPS=1e-10;
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
export function ordinaryMotionSegments({from,motion,start,end,speed}){
 if(![from.x,from.y,start,end,speed].every(Number.isFinite)||end<=start||speed<0)throw new RangeError('Invalid ordinary motion interval');
 let vx=0,vy=0,stop=end;
 if(motion){
  const vector=motion.goal?{x:motion.goal.x-from.x,y:motion.goal.y-from.y}:motion.vector;
  const size=Math.hypot(vector.x,vector.y),scale=motion.goal?size:Math.max(1,size);
  if(size>EPS){vx=vector.x/scale*speed;vy=vector.y/scale*speed;if(motion.goal&&speed>EPS)stop=Math.min(end,start+size/speed);}
 }
 const bounds=motion?.bounds??{xMin:-Infinity,xMax:Infinity,yMin:-Infinity,yMax:Infinity};
 const times=[start,end,stop];
 if(Math.abs(vx)>EPS){const t=start+((vx>0?bounds.xMax:bounds.xMin)-from.x)/vx;if(t>start+EPS&&t<stop-EPS)times.push(t);}
 if(Math.abs(vy)>EPS){const t=start+((vy>0?bounds.yMax:bounds.yMin)-from.y)/vy;if(t>start+EPS&&t<stop-EPS)times.push(t);}
 const knots=[...new Set(times)].sort((a,b)=>a-b),at=t=>({x:clamp(from.x+vx*(Math.min(t,stop)-start),bounds.xMin,bounds.xMax),y:clamp(from.y+vy*(Math.min(t,stop)-start),bounds.yMin,bounds.yMax)});
 return knots.slice(0,-1).flatMap((a,i)=>knots[i+1]>a+EPS?[{kind:'ordinary',start:a,end:knots[i+1],from:at(a),to:at(knots[i+1])}]:[]);
}
export function clipOrdinarySegment(s,end,start=s.start){
 if(start<s.start-EPS||end>s.end+EPS||end<=start)throw new RangeError('Invalid motion clip');
 const at=t=>{const f=(t-s.start)/(s.end-s.start);return {x:s.from.x+(s.to.x-s.from.x)*f,y:s.from.y+(s.to.y-s.from.y)*f};};
 return {...s,start,end,from:at(start),to:at(end)};
}
export function nextPassiveMotionBoundary({runtime,segments,now,end}){
 const times=[];for(const [id,s]of [...segments].sort(([a],[b])=>a.localeCompare(b))){const t=runtime.nextBoundary(id,s);if(t!==null&&t>=now-EPS&&t<=end+EPS)times.push(t);}
 return times.length?Math.min(...times):null;
}
export function pointOnOrdinaryPath(segments,now){
 const s=segments.find(s=>now<=s.end+EPS)??segments.at(-1);if(!s)return null;
 const f=clamp((now-s.start)/(s.end-s.start),0,1);return {x:s.from.x+(s.to.x-s.from.x)*f,y:s.from.y+(s.to.y-s.from.y)*f};
}
