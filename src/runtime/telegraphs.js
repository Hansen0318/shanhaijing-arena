export {statusMarks} from './statusPresentation.js';
// Renderer reads shared battle-clock geometry; no tween or independent timer.
export function telegraphProjection(threat,nowMs,project) {
 const g=threat.geometry,center=project(g.center),origin=project(g.origin);
 const x=project({x:g.center.x+g.radius,y:g.center.y}),y=project({x:g.center.x,y:g.center.y+g.radius});
 return {shape:g.shape,center,origin,radiusX:Math.abs(x.x-center.x),radiusY:Math.abs(y.y-center.y),progress:Math.max(0,Math.min(1,(nowMs-threat.createdAtMs)/(threat.impactAtMs-threat.createdAtMs))),allied:threat.sourceTeamId==='allies'};
}
export function persistentAreaProjection(area,nowSeconds,project){return telegraphProjection({...area,createdAtMs:area.startTime*1000,impactAtMs:area.expiryTime*1000},nowSeconds*1000,project);}
export class TelegraphPresenter {
 constructor(scene,project,{formalSource=()=>null}={}){this.project=project;this.formalSource=formalSource;this.graphics=scene.add.graphics().setDepth(8);this.presentations=new Map();this.closed=false;}
 render(threats,nowMs,areas=[]){
  if(this.closed)return;
  const g=this.graphics;g.clear();this.presentations.clear();
  for(const threat of [...areas.map(a=>({...a,persistent:true,createdAtMs:a.startTime*1000,impactAtMs:a.expiryTime*1000})),...threats]){const p=telegraphProjection(threat,nowMs,this.project),color=threat.persistent?(p.allied?0xbd87ef:0xff6478):(p.allied?0x73e5ff:0xffb347);
   // Actual loaded action/VFX artwork replaces the development warning layer.
   // Do not replace rectangles with a new schematic made of dots/arrows/diamonds.
   // Persistent areas retain their own source/lifetime and are not cast warnings.
   let source=null;try{if(!threat.persistent)source=this.formalSource(threat);}catch{/* unavailable art retains one fallback */}
   if(source?.kind==='action-assets'&&Array.isArray(source.assetKeys)&&source.assetKeys.length>=2){this.presentations.set(threat.id,{mode:'formal-action',assetKeys:source.assetKeys,progress:p.progress});continue;}
   this.presentations.set(threat.id,{mode:'fallback',color,progress:p.progress});
   if(p.shape==='circle'){
    g.fillStyle(color,.12+.12*p.progress).fillEllipse(p.center.x,p.center.y,p.radiusX*2,p.radiusY*2);
    g.lineStyle(6,0x172735,.95).strokeEllipse(p.center.x,p.center.y,p.radiusX*2,p.radiusY*2);
    g.lineStyle(3,color,1).strokeEllipse(p.center.x,p.center.y,p.radiusX*2,p.radiusY*2);
    g.lineStyle(2,0xffffff,.7).strokeEllipse(p.center.x,p.center.y,p.radiusX*2*p.progress,p.radiusY*2*p.progress);
   }else{
    // Project arena-space lane corners, retaining anisotropic stage projection.
    const a=threat.geometry.origin,b=threat.geometry.center,dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy)||1,r=threat.geometry.radius;
    const corners=[[a,1],[b,1],[b,-1],[a,-1]].map(([v,side])=>this.project({x:v.x-dy/len*r*side,y:v.y+dx/len*r*side}));
    g.fillStyle(color,.12+.12*p.progress).lineStyle(3,color,1).beginPath().moveTo(corners[0].x,corners[0].y);
    for(const v of corners.slice(1))g.lineTo(v.x,v.y);g.closePath().fillPath().strokePath();
    // Shared lane hit geometry is a capsule, including both endpoint discs.
    for(const end of [p.origin,p.center]){g.fillStyle(color,.12+.12*p.progress).fillEllipse(end.x,end.y,p.radiusX*2,p.radiusY*2);g.lineStyle(3,color,1).strokeEllipse(end.x,end.y,p.radiusX*2,p.radiusY*2);}
    g.lineStyle(2,0xffffff,.8).lineBetween(p.origin.x,p.origin.y,p.center.x,p.center.y);
   }
  }
 }
 destroy(){if(this.closed)return;this.closed=true;this.presentations.clear();this.graphics.destroy();}
}
