import {assetUrl,resolveCharacterAsset,resolveAsset} from './resolver.js';
// Only visible menu images are requested. No runtime, animation or VFX import.
export function bindMenuImage(image,record){
 const failed=new Set();let current=record;image.decoding='async';
 const apply=r=>{current=r;const url=assetUrl(r);if(url){image.src=url;image.width=r.width;image.height=r.height;}else{image.hidden=true;image.removeAttribute?.('src');}};
 image.onerror=()=>{failed.add(current.key);apply(resolveAsset(current.fallback,{failed,fallback:'placeholder.stage'}));};apply(record);return image;
}
export function decoratePortrait(host,definition,{document=globalThis.document,slot='portraitSquare'}={}){
 const asset=resolveCharacterAsset(definition,slot);host.dataset.assetKey=asset.key;host.dataset.assetType=asset.type;
 if(asset.type==='image'){
  const fallbackText=host.textContent,label=document.createElement('span');label.textContent=fallbackText;label.style.gridArea='1/1';label.hidden=true;
  const img=document.createElement('img');img.alt='';img.style.cssText='width:100%;height:100%;object-fit:contain;grid-area:1/1;min-width:0;min-height:0';
  host.style.display='grid';host.textContent='';host.append(label,img);bindMenuImage(img,asset);
  const fallback=img.onerror;
  img.onerror=()=>{fallback();if(img.hidden)label.hidden=false;};
 }
 return host;
}
