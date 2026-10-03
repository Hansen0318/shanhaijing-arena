import {assetUrl,resolveCharacterAsset,resolveAsset} from './resolver.js';
// Only visible menu images are requested. No runtime, animation or VFX import.
export function bindMenuImage(image,record){
 const failed=new Set();let current=record;image.decoding='async';
 const apply=r=>{current=r;const url=assetUrl(r);if(url){image.src=url;image.width=r.width;image.height=r.height;}else{image.hidden=true;image.removeAttribute?.('src');}};
 image.onerror=()=>{failed.add(current.key);apply(resolveAsset(current.fallback,{failed,fallback:'placeholder.stage'}));};apply(record);return image;
}
export function decoratePortrait(host,definition,{document=globalThis.document,slot='portraitSquare'}={}){
 const asset=resolveCharacterAsset(definition,slot);host.dataset.assetKey=asset.key;
 if(asset.type==='image'){const img=document.createElement('img');img.alt='';img.style.cssText='width:100%;height:100%;object-fit:contain;grid-area:1/1';bindMenuImage(img,asset);host.append(img);}
 return host;
}
