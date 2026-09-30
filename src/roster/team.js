import { rosterCatalog, prototypeOwnership } from './catalog.js';
export const TEAM_SIZE=3;
export function availableRoster(stage={},ownership=prototypeOwnership()) {
 const owned=new Set(ownership?.characterIds ?? []);
 return Object.keys(rosterCatalog).filter(id=>owned.has(id)
  && (stage.allowedRoster==null || stage.allowedRoster.includes(id))
  && !(stage.bannedCharacters ?? []).includes(id));
}
export function isValidTeam(ids,stage={},ownership=prototypeOwnership()) {
 if(!Array.isArray(ids) || ids.length!==TEAM_SIZE || new Set(ids).size!==TEAM_SIZE)return false;
 const available=availableRoster(stage,ownership);
 return ids.every(id=>available.includes(id)) && (stage.forcedCharacters ?? []).every(id=>ids.includes(id));
}
export class TeamSelection {
 constructor({stage={},ownership=prototypeOwnership(),saved=[]}={}) {
  this.stage=stage;this.ownership=ownership;this.slots=Array(TEAM_SIZE).fill(null);
  const available=availableRoster(stage,ownership);
  const forced=[...new Set(stage.forcedCharacters ?? [])];
  const restored=Array.isArray(saved)?[...new Set(saved)].filter(id=>available.includes(id)).slice(0,TEAM_SIZE):[];
  // Keep valid saved order, making room for required characters before launch validation.
  for(const id of forced.filter(id=>available.includes(id))) {
   if(!restored.includes(id)){
    if(restored.length===TEAM_SIZE){
     const optional=restored.findLastIndex(savedId=>!forced.includes(savedId));
     if(optional===-1)continue;
     restored.splice(optional,1);
    }
    restored.push(id);
   }
  }
  restored.slice(0,TEAM_SIZE).forEach((id,i)=>{this.slots[i]=id;});
 }
 get available(){return availableRoster(this.stage,this.ownership);}
 get canBattle(){return isValidTeam(this.slots,this.stage,this.ownership);}
 toggle(id) {
  const index=this.slots.indexOf(id);
  if(index!==-1)return this.remove(index);
  const empty=this.slots.indexOf(null);
  if(empty===-1 || !this.available.includes(id))return false;
  this.slots[empty]=id;return true;
 }
 remove(index) {
  if(!Number.isInteger(index) || index<0 || index>=TEAM_SIZE || !this.slots[index]
   || (this.stage.forcedCharacters ?? []).includes(this.slots[index]))return false;
  this.slots[index]=null;return true;
 }
}
