// Instantaneous finite segment at resolve. Aim is immutable cast-time data;
// source follows the caster. Presentation consumes the exact same endpoints.
export function lockedLine(origin,aim,maxRange,halfWidth,target){
 const dx=aim.x-origin.x,dy=aim.y-origin.y,length=Math.hypot(dx,dy),reach=Math.min(length,maxRange);
 const ux=length>1e-9?dx/length:0,uy=length>1e-9?dy/length:0;
 const end={x:origin.x+ux*reach,y:origin.y+uy*reach};
 if(!target)return {origin:{x:origin.x,y:origin.y},end,hit:false};
 const tx=target.x-origin.x,ty=target.y-origin.y,along=tx*ux+ty*uy,across=Math.abs(tx*uy-ty*ux);
 const hit=length<=1e-9?Math.hypot(tx,ty)<=halfWidth:along>=-1e-9&&along<=reach+1e-9&&across<=halfWidth+1e-9;
 return {origin:{x:origin.x,y:origin.y},end,hit};
}
