import {layoutPassiveBadges,passiveBadgeText,passiveHudText,passiveFontSize} from './passivePresentation.js';
export class PassivePresenter{
 constructor(scene,{project}){
  this.scene=scene;this.project=project;this.badges=new Map();this.layouts=[];this.closed=false;
  this.hud=scene.add.container(245,458).setDepth(40);this.hudBackground=scene.add.graphics();this.hudText=scene.add.text(12,7,'',{fontFamily:'sans-serif',fontSize:'17px',fontStyle:'bold',color:'#ffffff',lineSpacing:3});this.hud.add([this.hudBackground,this.hudText]).setVisible(false);
 }
 render({views,actors,hpAnchors,faceRects=[],canvasRect,reservedRects=[],selectedId,now}){
  if(this.closed)return;const alive=new Set(actors.filter(a=>a.hp>0).map(a=>a.instanceId));
  const items=views.filter(v=>v.active&&alive.has(v.instanceId)&&hpAnchors.has(v.instanceId)).map(v=>({key:`${v.instanceId}:${v.definitionId}`,instanceId:v.instanceId,text:passiveBadgeText(v),anchor:hpAnchors.get(v.instanceId),view:v}));
  const hpRects=[...hpAnchors.values()].map(a=>a.rect);
  this.layouts=layoutPassiveBadges({items,canvasRect,logicalSize:{width:1120,height:540},reservedRects:[...reservedRects,...faceRects,...hpRects]});const valid=new Set();
  for(const layout of this.layouts){
   valid.add(layout.key);let badge=this.badges.get(layout.key);
   if(!badge){const container=this.scene.add.container(0,0).setDepth(39),background=this.scene.add.graphics(),bar=this.scene.add.graphics(),line=this.scene.add.graphics(),text=this.scene.add.text(11,3,'',{fontFamily:'sans-serif',fontStyle:'bold',color:'#ffffff'});container.add([line,background,bar,text]);badge={container,background,bar,line,text};this.badges.set(layout.key,badge);}
   const {x,y,width,height,fontSize,anchor,view}=layout;badge.layout=layout;badge.actorId=layout.instanceId;badge.container.setPosition(x,y);badge.text.setText(layout.text).setFontSize(fontSize);
   badge.background.clear().fillStyle(0x10242b,.97).fillRoundedRect(0,0,width,height,5).lineStyle(1.5,0x82f5e0,1).strokeRoundedRect(0,0,width,height,5);
   const remaining=Math.max(0,Math.min(1,(view.active.expiryTime-now)/(view.active.expiryTime-view.active.startTime)));
   badge.bar.clear().fillStyle(0x35545b,1).fillRect(5,height-7,width-10,3).fillStyle(0x82f5e0,1).fillRect(5,height-7,(width-10)*remaining,3);
   badge.line.clear().lineStyle(1,0x82f5e0,.8).lineBetween(width/2,height,anchor.x-x,anchor.y-y-3);
  }
  for(const [key,badge]of this.badges)if(!valid.has(key)){badge.container.destroy();this.badges.delete(key);}
  const selected=views.find(v=>v.instanceId===selectedId&&alive.has(v.instanceId));this.hud.setVisible(Boolean(selected));
  if(selected){const {fontSize}=passiveFontSize(canvasRect,{width:1120,height:540});this.hudText.setText(passiveHudText(selected,now)).setFontSize(fontSize);this.hudBackground.clear().fillStyle(0x10242b,.95).fillRoundedRect(0,0,580,68,6).lineStyle(1,0x82f5e0,.8).strokeRoundedRect(0,0,580,68,6);}
 }
 destroy(){if(this.closed)return;this.closed=true;for(const b of this.badges.values())b.container.destroy();this.badges.clear();this.layouts=[];this.hud.destroy();}
}
