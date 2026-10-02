import { ACQUISITION_VERSION,initialAcquisition,normalizeAcquisition } from './model.js';
export const ACQUISITION_SAVE_KEY='shanhaijing-arena.acquisition.v1';
export function createAcquisitionPersistence(storage) {
 let memory=initialAcquisition(),unsaved=false;
 return {
  load(progress={}) {
   if(!unsaved) {
    let raw=null;try {raw=JSON.parse(storage?.getItem(ACQUISITION_SAVE_KEY)??'null');}catch{}
    memory=normalizeAcquisition(raw,progress?.clearedStages);
    // Upgrade the existing key atomically; never touch Campaign/team saves.
    if([1,2].includes(raw?.version) && raw.version<ACQUISITION_VERSION) {
     unsaved=true;
     try {if(storage){storage.setItem(ACQUISITION_SAVE_KEY,JSON.stringify(memory));unsaved=false;}}catch{}
    }
   }
   return structuredClone(memory);
  },
  save(state) {
   memory=normalizeAcquisition(state);unsaved=true;
   try {
    if(!storage)return false;
    storage.setItem(ACQUISITION_SAVE_KEY,JSON.stringify(memory));unsaved=false;return true;
   }catch{return false;}
  },
 };
}
export function browserAcquisitionPersistence() {
 try{return createAcquisitionPersistence(window.localStorage);}catch{return createAcquisitionPersistence(null);}
}
