// Session-owned state drives non-text defense geometry. Never owns a timer or combat value.
export class PassivePresenter {
 constructor(scene,{project=p=>p}={}){this.scene=scene;this.project=project;this.badges=new Map();this.layouts=[];this.plates=new Map();this.closed=false;}
 render({views=[],actors=[],now=0}={}){
  if(this.closed)return;const alive=new Map(actors.filter(a=>a.hp>0).map(a=>[a.instanceId,a])),valid=new Set();
  for(const view of views){
   const actor=alive.get(view.instanceId),active=view.active,n=view.presentation?.segments;
   if(!actor||view.effectType!=='mitigation'||view.presentation?.style!=='guard-plates'||!active?.effective||!active.statusId||now+1e-9>=active.expiryTime||!Number.isInteger(n)||n<1||n>4)continue;
   const key=view.instanceId+'.'+view.definitionId;valid.add(key);let g=this.plates.get(key);
   if(!g){g=this.scene.add.graphics().setDepth(6);this.plates.set(key,g);}
   g.passiveStatusId=active.statusId;g.clear();g.lineStyle(5,0xffcf67,.95);const p=this.project(actor),height=60/n;
   for(let i=0;i<n;i++)for(const side of [-1,1]){
    const top=p.y-74+i*height,bottom=top+height-4;
    g.beginPath();g.moveTo(p.x+side*24,top);g.lineTo(p.x+side*32,top+4);g.lineTo(p.x+side*32,bottom-4);g.lineTo(p.x+side*24,bottom);g.strokePath();
   }
  }
  for(const [key,g]of this.plates)if(!valid.has(key)){g.destroy();this.plates.delete(key);}
 }
 destroy(){if(this.closed)return;this.closed=true;for(const g of this.plates.values())g.destroy();this.plates.clear();this.badges.clear();this.layouts=[];this.scene=null;this.project=null;}
}
