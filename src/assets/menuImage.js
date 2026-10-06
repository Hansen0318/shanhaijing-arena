import {assetUrl,resolveCharacterAsset,resolveAsset} from './resolver.js';
// Only visible menu images are requested. No runtime, animation or VFX import.
export function bindMenuImage(image,record){
 const failed=new Set();let current=record;image.decoding='async';
 const apply=r=>{current=r;const url=assetUrl(r);if(url){image.src=url;image.width=r.width;image.height=r.height;}else{image.hidden=true;image.removeAttribute?.('src');}};
 image.onerror=()=>{failed.add(current.key);apply(resolveAsset(current.fallback,{failed,fallback:'placeholder.stage'}));};apply(record);return image;
}
export function decoratePortrait(host,definition,{document=globalThis.document,slot='portraitSquare',motion=null}={}){
 const asset=resolveCharacterAsset(definition,slot);host.dataset.assetKey=asset.key;host.dataset.assetType=asset.type;
 if(asset.type==='image'){
  const fallbackText=host.textContent,label=document.createElement('span');label.textContent=fallbackText;label.style.gridArea='1/1';label.hidden=true;
  const img=document.createElement('img');img.alt='';img.style.cssText='width:100%;height:100%;object-fit:contain;grid-area:1/1;min-width:0;min-height:0';
  host.style.display='grid';host.textContent='';host.append(label,img);bindMenuImage(img,asset);
  if(motion==='idleBreath'){
   host.dataset.motion='idleBreath';img.style.transformOrigin='50% 100%';
   const reduced=document.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
   if(!reduced&&typeof img.animate==='function')img.animate([
    {transform:'translateY(0) scaleX(1) scaleY(1)',offset:0},
    {transform:'translateY(-1.8%) scaleX(1.012) scaleY(1.035)',offset:.34},
    {transform:'translateY(-.8%) scaleX(.998) scaleY(1.018)',offset:.68},
    {transform:'translateY(0) scaleX(1) scaleY(1)',offset:1},
   ],{duration:1600,iterations:Infinity,easing:'ease-in-out'});
  }
  const fallback=img.onerror;
  img.onerror=()=>{fallback();if(img.hidden)label.hidden=false;};
 }
 return host;
}
