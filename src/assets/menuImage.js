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

export function decorateIdlePreview(host,definition,{document=globalThis.document}={}){
 const descriptor=definition?.animationDescriptors?.battleIdle,asset=descriptor?.source?resolveAsset(descriptor.source):null,frames=descriptor?.frames??[];
 if(asset?.type!=='image'||frames.length<2)return decoratePortrait(host,definition,{document,slot:'collectionArt'});
 const base=frames[descriptor.staticFrame??0]??frames[0];
 if(frames.some(frame=>frame.width!==base.width||frame.height!==base.height))return decoratePortrait(host,definition,{document,slot:'collectionArt'});
 host.dataset.assetKey=asset.key;host.dataset.assetType=asset.type;host.dataset.menuAnimation='battleIdle';
 const fallbackText=host.textContent,label=document.createElement('span');label.textContent=fallbackText;label.style.gridArea='1/1';label.hidden=true;
 const viewport=document.createElement('span');viewport.style.cssText='display:block;position:relative;overflow:hidden;width:100%;height:100%;grid-area:1/1;min-width:0;min-height:0';
 const img=document.createElement('img');img.alt='';img.decoding='async';img.style.cssText=`position:absolute;left:0;top:0;max-width:none;width:${asset.width/base.width*100}%;height:${asset.height/base.height*100}%;object-fit:fill;transform-origin:0 0`;
 const transform=frame=>`translate(${-frame.x/asset.width*100}%,${-frame.y/asset.height*100}%)`;
 img.style.transform=transform(base);img.src=assetUrl(asset);
 img.onerror=()=>{host.replaceChildren();host.textContent=fallbackText;decoratePortrait(host,definition,{document,slot:'collectionArt'});};
 viewport.append(img);host.style.display='grid';host.textContent='';host.append(label,viewport);
 const reduced=document.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
 if(!reduced&&typeof img.animate==='function'){
  const keyframes=frames.map((frame,index)=>({transform:transform(frame),offset:index/frames.length}));keyframes.push({transform:transform(frames[0]),offset:1});
  img.animate(keyframes,{duration:frames.length/descriptor.fps*1000,iterations:Infinity,easing:'steps(1,end)'});
 }
 return host;
}
