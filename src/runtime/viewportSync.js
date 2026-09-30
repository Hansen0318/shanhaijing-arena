import { ARENA_STAGE } from './arenaProjection.js';

// Campaign and canvas must share one coordinate space, including Safari's
// transient visual viewport offsets when browser chrome or routes change.
export function installViewportSync(win, host, root, onSync=()=>{}) {
 let frame=null, timers=[];
 function sync() {
  const vv=win.visualViewport;
  const width=vv?.width ?? win.innerWidth, height=vv?.height ?? win.innerHeight;
  if(width<=0 || height<=0) return;
  const left=vv?.offsetLeft ?? 0, top=vv?.offsetTop ?? 0;
  Object.assign(root.style,{left:`${left}px`,top:`${top}px`,width:`${width}px`,height:`${height}px`});
  const scale=Math.min(width/ARENA_STAGE.width,height/ARENA_STAGE.height);
  const w=ARENA_STAGE.width*scale,h=ARENA_STAGE.height*scale;
  Object.assign(host.style,{width:`${w}px`,height:`${h}px`,left:`${left+(width-w)/2}px`,top:`${top+(height-h)/2}px`});
  onSync();
 }
 function cancel() {
  if(frame!==null)win.cancelAnimationFrame(frame);
  timers.forEach(id=>win.clearTimeout(id));frame=null;timers=[];
 }
 function settle() {
  cancel();sync();
  frame=win.requestAnimationFrame(sync);
  timers=[win.setTimeout(sync,80),win.setTimeout(sync,240)];
 }
 const listeners=[
  [win,'pageshow',settle],[win,'resize',settle],[win,'orientationchange',settle],
  ...(win.visualViewport?[[win.visualViewport,'resize',settle],[win.visualViewport,'scroll',sync]]:[]),
 ];
 listeners.forEach(([target,event,fn])=>target.addEventListener(event,fn));
 settle();
 return {
  routeChanged(){root.scrollTop=0;root.scrollLeft=0;settle();},
  destroy(){cancel();listeners.forEach(([target,event,fn])=>target.removeEventListener(event,fn));},
 };
}
