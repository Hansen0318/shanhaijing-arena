export function createOrientationGate(win,doc,root,host,gate,onChange=()=>{}) {
 let portrait=null;
 return {sync() {
  const vv=win.visualViewport;
  const width=vv?.width??win.innerWidth,height=vv?.height??win.innerHeight;
  if(width<=0||height<=0)return;
  const next=height>width;
  gate.hidden=!next;
  root.inert=host.inert=next;
  doc.documentElement.classList.toggle('orientation-portrait',next);
  if(next!==portrait){portrait=next;onChange(next);}
 }};
}
