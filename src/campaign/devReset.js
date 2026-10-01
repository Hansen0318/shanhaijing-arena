import { SAVE_KEY } from './persistence.js';
import { ACQUISITION_SAVE_KEY } from '../acquisition/persistence.js';
import { TEAM_SAVE_KEY } from '../roster/persistence.js';
// Explicit testing capability only. Consume the URL trigger BEFORE touching storage.
export function consumeProgressReset(win) {
 const url=new URL(win.location.href);
 if(url.searchParams.get('resetProgress')!=='1')return {requested:false,cleared:false};
 url.searchParams.delete('resetProgress');
 try{win.history.replaceState(win.history.state??null,'',url.href);}catch{return {requested:false,cleared:false};}
 let cleared=true;
 for(const key of [SAVE_KEY,ACQUISITION_SAVE_KEY,TEAM_SAVE_KEY]){
  try{win.localStorage.removeItem(key);}catch{cleared=false;}
 }
 return {requested:true,cleared};
}
