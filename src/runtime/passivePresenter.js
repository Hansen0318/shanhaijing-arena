// Session-owned state drives non-text passive geometry. Never owns a timer or combat value.
export class PassivePresenter {
 constructor(scene,{project=p=>p,effectImage=null,reducedMotion=false}={}){this.scene=scene;this.project=project;this.effectImage=effectImage;this.reducedMotion=reducedMotion;this.fish=new Map();this.badges=new Map();this.layouts=[];this.plates=new Map();this.trails=new Map();this.closed=false;}
 render({views=[],actors=[],now=0,facings=new Map()}={}){
  if(this.closed)return;const alive=new Map(actors.filter(a=>a.hp>0).map(a=>[a.instanceId,a])),valid=new Set(),validTrails=new Set(),validFish=new Set();
  for(const view of views){
   const actor=alive.get(view.instanceId),active=view.active,n=view.presentation?.segments;
   if(actor&&view.effectType==='instant-heal'&&view.presentation?.style==='paired-fish'&&active?.effective&&now>=active.startTime&&now<active.expiryTime){
    const target=alive.get(active.targetId);if(!target)continue;
    const spec=view.presentation,key=view.instanceId+'.'+view.definitionId+'.'+active.statusId;validFish.add(key);
    let image=this.fish.get(key);if(!image){image=this.effectImage(spec.assetKeys[n-1]).setDepth(4);this.fish.set(key,image);}
    const age=now-active.startTime,duration=active.expiryTime-active.startTime,q=Math.max(0,(age-.2)/(duration-.2)),scale=this.reducedMotion?1:1-.28*q,opacity=age<=.2?1:(duration-age)/(duration-.2),p=this.project(target),flip=!!facings?.get(target.instanceId)?.flipX;
    image.setPosition(p.x+(flip?-1:1)*spec.offset[0],p.y+spec.offset[1]).setDisplaySize(spec.size[0]*scale,spec.size[1]*scale).setAlpha(opacity).setFlipX(flip);
    continue;
   }
   if(actor&&view.effectType==='movement'&&view.presentation?.style==='speed-streaks'&&active?.effective&&active.statusId&&now+1e-9<active.expiryTime&&Number.isInteger(n)&&n>=1&&n<=4){
    const key=view.instanceId+'.'+view.definitionId;validTrails.add(key);let g=this.trails.get(key);
    if(!g){g=this.scene.add.graphics().setDepth(4);this.trails.set(key,g);}g.passiveStatusId=active.statusId;g.clear();g.lineStyle(4,0x8defff,.92);
    const p=this.project(actor),direction=facings?.get(actor.instanceId)?.flipX?1:-1;
    for(let i=0;i<n;i++)for(const offset of [0,3]){const y=p.y-10-i*8-offset;g.beginPath();g.moveTo(p.x+direction*(42+i*4),y+3);g.lineTo(p.x+direction*(28+i*4),y);g.lineTo(p.x+direction*(14+i*4),y);g.strokePath();}
    continue;
   }
   if(!actor||view.effectType!=='mitigation'||view.presentation?.style!=='guard-plates'||!active?.effective||!active.statusId||now+1e-9>=active.expiryTime||!Number.isInteger(n)||n<1||n>4)continue;
   const key=view.instanceId+'.'+view.definitionId;valid.add(key);let g=this.plates.get(key);
   if(!g){g=this.scene.add.graphics().setDepth(6);this.plates.set(key,g);}
   g.passiveStatusId=active.statusId;g.clear();g.lineStyle(5,0xffcf67,.95);const p=this.project(actor),height=60/n;
   for(let i=0;i<n;i++)for(const side of [-1,1]){
    const top=p.y-74+i*height,bottom=top+height-4;
    g.beginPath();g.moveTo(p.x+side*24,top);g.lineTo(p.x+side*32,top+4);g.lineTo(p.x+side*32,bottom-4);g.lineTo(p.x+side*24,bottom);g.strokePath();
   }
  }
  for(const [key,g]of this.fish)if(!validFish.has(key)){g.destroy();this.fish.delete(key);}
  for(const [key,g]of this.trails)if(!validTrails.has(key)){g.destroy();this.trails.delete(key);}
  for(const [key,g]of this.plates)if(!valid.has(key)){g.destroy();this.plates.delete(key);}
 }
 destroy(){if(this.closed)return;this.closed=true;for(const g of this.fish.values())g.destroy();this.fish.clear();this.effectImage=null;for(const g of this.plates.values())g.destroy();this.plates.clear();for(const g of this.trails.values())g.destroy();this.trails.clear();this.badges.clear();this.layouts=[];this.scene=null;this.project=null;}
}
