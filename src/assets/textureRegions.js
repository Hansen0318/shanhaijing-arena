import {specialRuntimePacking} from './specialRuntimePacking.js';
// Select physical native-trim regions without changing logical frame names or transforms.
export function physicalRegion(key,logical=null){
 const pack=specialRuntimePacking[key];if(!pack)return logical;
 if(!logical)return pack.frames.length===1?pack.frames[0]:null;
 const index=pack.logicalFrames.findIndex(f=>['x','y','width','height'].every(k=>f[k]===logical[k])&&JSON.stringify(f.trim??null)===JSON.stringify(logical.trim??null));
 if(index<0)throw new TypeError('Unsupported logical packed frame: '+key);
 return pack.frames[index];
}
