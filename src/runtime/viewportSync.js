import { ARENA_STAGE } from './arenaProjection.js';

// Campaign and canvas must share one coordinate space, including Safari's
// transient visual viewport offsets when browser chrome or routes change.
export function installViewportSync(win, host, root, onSync=()=>{}) {
 let frame=null, timers=[];
 function sync(stabilizeRoot=false) {
  const vv=win.visualViewport;
  const width=vv?.width ?? win.innerWidth, height=vv?.height ?? win.innerHeight;
  if(width<=0 || height<=0) return;
  const left=vv?.offsetLeft ?? 0, top=vv?.offsetTop ?? 0;
  // iOS/Safari can report a transiently short visualViewport during reload/pageshow
  // without a later resize. Clamp only a gross reload underfill to the stable
  // layout-viewport bottom; normal route/resize behavior remains visualViewport-owned.
  const layoutBottom=Number.isFinite(win.innerHeight)?win.innerHeight-top:height;
  const rootHeight=stabilizeRoot&&layoutBottom-height>48?layoutBottom:height;
  Object.assign(root.style,{left:`${left}px`,top:`${top}px`,width:`${width}px`,height:`${rootHeight}px`});
  const scale=Math.min(width/ARENA_STAGE.width,height/ARENA_STAGE.height);
  const w=ARENA_STAGE.width*scale,h=ARENA_STAGE.height*scale;
  Object.assign(host.style,{width:`${w}px`,height:`${h}px`,left:`${left+(width-w)/2}px`,top:`${top+(height-h)/2}px`});
  onSync();
 }
 function cancel() {
  if(frame!==null)win.cancelAnimationFrame(frame);
  timers.forEach(id=>win.clearTimeout(id));frame=null;timers=[];
 }
 function settle(normalizeRoot=false,stabilizeRoot=false) {
  // Route/overlay restoration owns only the root, never nested grid/detail scroll.
  const restore=()=>{if(normalizeRoot===true){root.scrollTop=0;root.scrollLeft=0;}sync(stabilizeRoot);};
  cancel();restore();
  frame=win.requestAnimationFrame(restore);
  timers=[win.setTimeout(restore,80),win.setTimeout(restore,240)];
 }
 const onPageShow=()=>settle(false,true);
 const listeners=[
  [win,'pageshow',onPageShow],[win,'resize',settle],[win,'orientationchange',settle],
  ...(win.visualViewport?[[win.visualViewport,'resize',settle],[win.visualViewport,'scroll',sync]]:[]),
 ];
 listeners.forEach(([target,event,fn])=>target.addEventListener(event,fn));
 settle();
 return {
  routeChanged(){settle(true);},
  surfaceChanged(){settle(true);},
  destroy(){cancel();listeners.forEach(([target,event,fn])=>target.removeEventListener(event,fn));},
 };
}
