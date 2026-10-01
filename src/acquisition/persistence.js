import { initialAcquisition,normalizeAcquisition } from './model.js';
export const ACQUISITION_SAVE_KEY='shanhaijing-arena.acquisition.v1';
export function createAcquisitionPersistence(storage) {
 let memory=initialAcquisition(),unsaved=false;
 return {
  load(progress={}) {
   if(!unsaved) {
    let raw=null;try {raw=JSON.parse(storage?.getItem(ACQUISITION_SAVE_KEY)??'null');}catch{}
    memory=normalizeAcquisition(raw,progress?.clearedStages);
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
