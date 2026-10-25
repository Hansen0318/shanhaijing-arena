// Closed boundary in arena space: a circle or the shared segment + radius capsule.
// Project AFTER sampling; rotating an already-projected ellipse corrupts diagonal lanes.
export function warningBoundary(geometry){
 const {shape,origin:a,center:b,radius:r}=geometry,points=[],steps=48;
 if(shape==='circle'||Math.hypot(b.x-a.x,b.y-a.y)<1e-9){
  for(let i=0;i<steps;i++){const theta=i*2*Math.PI/steps;points.push({x:b.x+Math.cos(theta)*r,y:b.y+Math.sin(theta)*r});}
 }else{
  const angle=Math.atan2(b.y-a.y,b.x-a.x);
  for(const [center,start]of [[b,angle-Math.PI/2],[a,angle+Math.PI/2]])for(let i=0;i<=steps/2;i++){
   const theta=start+i*Math.PI/(steps/2);points.push({x:center.x+Math.cos(theta)*r,y:center.y+Math.sin(theta)*r});
  }
 }
 return points;
}
function polygon(g,points){
 g.beginPath().moveTo(points[0].x,points[0].y);
 for(const p of points.slice(1))g.lineTo(p.x,p.y);
 g.closePath();
}
export function drawFormalWarning(g,threat,p,source,project,reducedMotion){
 const boundary=warningBoundary(threat.geometry),projectedBoundary=boundary.map(project),color=p.allied?source.alliedColor:source.enemyColor;
 // Low wash carries the WHOLE danger region, not just a decorative hit sprite.
 g.fillStyle(color,.07+.10*p.progress);polygon(g,projectedBoundary);g.fillPath();
 // Interrupted luminous edge replaces the old rectangle/disc/center-line scaffold.
 // No marks extend beyond the combat footprint; empty gaps keep crowded fights readable.
 const center=threat.geometry.center,origin=p.shape==='lane'?threat.geometry.origin:center;
 const midpoint={x:(center.x+origin.x)/2,y:(center.y+origin.y)/2};
 for(let i=0;i<boundary.length;i+=3){
  const outer=[boundary[i],boundary[(i+1)%boundary.length]],inner=outer.map(v=>({x:midpoint.x+(v.x-midpoint.x)*.96,y:midpoint.y+(v.y-midpoint.y)*.96}));
  g.fillStyle(color,.38+.40*p.progress);polygon(g,[outer[0],outer[1],inner[1],inner[0]].map(project));g.fillPath();
 }
 // Shared clock controls the inner seal; reduced-motion uses opacity only.
 const scale=reducedMotion?.62:.86-.45*p.progress,r=threat.geometry.radius*scale;
 const count=source.marks;
 for(let i=0;i<count;i++){
  const theta=i*2*Math.PI/count,along=p.shape==='lane'?(i+1)/(count+1):.5;
  const c=p.shape==='lane'?{x:origin.x+(center.x-origin.x)*along,y:origin.y+(center.y-origin.y)*along}:center;
  const angle=p.shape==='lane'?Math.atan2(center.y-origin.y,center.x-origin.x):theta;
  const x=p.shape==='lane'?c.x:c.x+Math.cos(theta)*r,y=p.shape==='lane'?c.y:c.y+Math.sin(theta)*r;
  const size=threat.geometry.radius*(source.motif==='stone'?.15:.12);
  const local=source.motif==='stone'?[[0,-size],[size,0],[0,size],[-size,0]]:source.motif==='water'?[[size*1.6,0],[-size,-size],[-size*.45,0],[-size,size]]:[[size*1.8,0],[-size,-size],[-size*.2,0],[-size,size]];
  const points=local.map(([u,v])=>project({x:x+u*Math.cos(angle)-v*Math.sin(angle),y:y+u*Math.sin(angle)+v*Math.cos(angle)}));
  g.fillStyle(p.allied?0xe5fff5:0xffded0,.45+.45*p.progress);polygon(g,points);g.fillPath();
 }
 return {mode:'formal',renderer:source.renderer,motif:source.motif,color,progress:p.progress,boundary,projectedBoundary};
}
