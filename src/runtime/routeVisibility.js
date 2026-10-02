// One owner for route visibility; viewport restoration never infers route from styles.
export function createRouteVisibility(root,host) {
 let battle=false;
 const parent=host.parentNode,anchor=host.nextSibling;
 function sync(){
  // A dormant canvas has no place in the non-battle DOM/compositor tree.
  if(battle){if(parent && host.parentNode!==parent)parent.insertBefore(host,anchor?.parentNode===parent?anchor:null);}
  else host.remove?.();
  root.hidden=battle;host.hidden=!battle;
  root.style.visibility=battle?'hidden':'visible';
  host.style.visibility=battle?'visible':'hidden';
 }
 sync();
 return {sync,get battle(){return battle;},setBattle(value){battle=Boolean(value);sync();}};
}
