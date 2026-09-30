import { rosterCatalog } from './catalog.js';
import { isValidTeam } from './team.js';
export const TEAM_SAVE_KEY='shanhaijing-arena.team.v1';
function normalize(value) {
 if(value?.version!==1 || !Array.isArray(value.characterIds))return [];
 return [...new Set(value.characterIds)].filter(id=>typeof id==='string' && Object.hasOwn(rosterCatalog,id)).slice(0,3);
}
export function createTeamPersistence(storage) {
 let memory=[],unsaved=false;
 return {
  load(){try {if(storage && !unsaved)memory=normalize(JSON.parse(storage.getItem(TEAM_SAVE_KEY) ?? 'null'));}catch{}return [...memory];},
  save(ids){
   if(!isValidTeam(ids))return false;
   memory=[...ids];unsaved=true;
   try {if(!storage)return false;storage.setItem(TEAM_SAVE_KEY,JSON.stringify({version:1,characterIds:memory}));unsaved=false;return true;}catch{return false;}
  },
 };
}
export function browserTeamPersistence() {
 try{return createTeamPersistence(window.localStorage);}catch{return createTeamPersistence(null);}
}
