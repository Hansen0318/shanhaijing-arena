// One owner for route visibility; viewport restoration never infers route from styles.
export function createRouteVisibility(root,host) {
 let battle=false;
 function sync(){
  root.hidden=battle;host.hidden=!battle;
  root.style.visibility=battle?'hidden':'visible';
  host.style.visibility=battle?'visible':'hidden';
 }
 sync();
 return {sync,setBattle(value){battle=Boolean(value);sync();}};
}
