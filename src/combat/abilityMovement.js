// Short declarative cast-owned displacement; no tactical movement state.
export function applyAbilityMovement(actor,target,movement,bounds) {
 if(!movement||!target)return;
 const dx=target.x-actor.x,dy=target.y-actor.y,d=Math.hypot(dx,dy);
 const nx=d>0?dx/d:1,ny=d>0?dy/d:0;
 const step=movement.kind==='engage'?Math.min(movement.distance,Math.max(0,d-movement.stopDistance)):movement.distance;
 const x=movement.kind==='reposition'?(nx-ny)/Math.SQRT2:nx;
 const y=movement.kind==='reposition'?(ny+nx)/Math.SQRT2:ny;
 actor.x=Math.max(bounds.xMin,Math.min(bounds.xMax,actor.x+x*step));
 actor.y=Math.max(bounds.yMin,Math.min(bounds.yMax,actor.y+y*step));
}
