import {assetManifest,defaultCharacterAssets} from './manifest.js';
export function resolveAsset(key,{manifest=assetManifest,failed=new Set(),fallback='placeholder.battle'}={}){
 const seen=new Set();let current=manifest[key];
 while(current&&failed.has(current.key)&&!seen.has(current.key)){seen.add(current.key);current=manifest[current.fallback];}
 return current&&!failed.has(current.key)?current:manifest[fallback]??Object.freeze({key:fallback,type:'procedural',path:null});
}
export function resolveCharacterAsset(character,slot,options={}){return resolveAsset(character?.assets?.[slot]??defaultCharacterAssets[slot],{...options,fallback:defaultCharacterAssets[slot]??'placeholder.battle'});}
export function assetUrl(record,base=import.meta.env?.BASE_URL??'/'){return record?.path?`${base.endsWith('/')?base:base+'/'}${record.path}`:null;}
export function resolvePreview(path){return resolveAsset(Object.values(assetManifest).find(a=>a.path===path)?.key,{fallback:'placeholder.stage'});}
export function encounterAssetKeys(definitions,stage={}){
 const slots=['battleIdle','battleHit','battleKo','portraitSquare','basicVfx','heavyVfx','specialVfx','awakeningVfx'];
 const keys=definitions.flatMap(d=>[...slots.map(s=>d?.assets?.[s]),...Object.values(d?.assets?.statusOverlays??{}),...Object.values(d?.assets?.skillOverlays??{})]).filter(v=>typeof v==='string');
 if(stage.battleAssetKey)keys.push(stage.battleAssetKey);return [...new Set(keys)];
}
