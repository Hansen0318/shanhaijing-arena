const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
export const rectanglesOverlap=(a,b)=>a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y;
export function passiveBadgeText(view){
 if(!view?.active)return '';
 return view.movementCapReached?`${view.label} · 移速上限15%`:`${view.label} +${Math.round(view.active.contribution*100)}%`;
}
export function passiveHudText(view,now){
 if(!view)return '';
 const active=view.active?`${passiveBadgeText(view)} · 剩餘 ${Math.max(0,view.active.expiryTime-now).toFixed(1)} 秒`:`${view.label} · 走位 ${view.progressDistance.toFixed(2)}/${view.threshold.toFixed(2)}`;
 return `${active}\n移速 ${view.effectiveMoveSpeed.toFixed(3)}${view.readyAt>now?` · 冷卻 ${(view.readyAt-now).toFixed(1)} 秒`:' · 可觸發'}`;
}
export function passiveFontSize(canvasRect,logicalSize){
 const scale=Math.min(canvasRect.width/logicalSize.width,canvasRect.height/logicalSize.height);
 if(!Number.isFinite(scale)||scale<=0)throw new RangeError('Invalid passive viewport');
 return {fontSize:Math.ceil(12/scale),scale};
}
export function layoutPassiveBadges({items,canvasRect,logicalSize,reservedRects=[]}){
 const {fontSize,scale}=passiveFontSize(canvasRect,logicalSize),layouts=[];
 for(const item of [...items].sort((a,b)=>a.instanceId.localeCompare(b.instanceId)||(a.key??a.text).localeCompare(b.key??b.text))){
  const units=[...item.text].reduce((sum,c)=>sum+(c.charCodeAt(0)>255?1:.65),0),width=Math.ceil(units*fontSize+22),height=Math.ceil(fontSize*1.35+12);
  const desired={x:clamp(item.anchor.x-width/2,8,logicalSize.width-width-8),y:clamp(item.anchor.y-height-6,8,logicalSize.height-height-8)},candidates=[];
  for(let row=0;row<12;row++)for(const offset of [0,-1,1,-2,2,-3,3])candidates.push({x:clamp(desired.x+offset*(width+5),8,logicalSize.width-width-8),y:clamp(desired.y-row*(height+5),8,logicalSize.height-height-8)});
  for(let y=8;y+height<=logicalSize.height-8;y+=height+5)for(let x=8;x+width<=logicalSize.width-8;x+=width+5)candidates.push({x,y});
  const position=candidates.find(p=>![...reservedRects,...layouts].some(r=>rectanglesOverlap({...p,width,height},r)));
  if(!position)throw new RangeError('No readable passive badge space in this viewport');
  layouts.push(Object.freeze({...item,...position,width,height,fontSize,cssFontSize:fontSize*scale}));
 }
 return Object.freeze(layouts);
}
