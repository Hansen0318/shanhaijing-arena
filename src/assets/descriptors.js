import {immutable} from './schema.js';
import {assetManifest} from './manifest.js';
const finite=(n,min,max)=>Number.isFinite(n)&&n>=min&&n<=max;
function common(input){
 const origin=input.origin??[.5,.5],scale=input.scale??1;
 if(!Array.isArray(origin)||origin.length!==2||origin.some(n=>!finite(n,0,1))||!finite(scale,.05,4))throw new TypeError('Invalid origin/scale');return {origin,scale};
}
export function animationDescriptor(input,{manifest=assetManifest}={}){
 const source=input.source??'placeholder.battle',asset=manifest[source];if(!asset)throw new TypeError('Unknown animation source');
 const frames=input.frames??[];if(!Array.isArray(frames)||frames.length>128)throw new TypeError('Invalid frame count');
 for(const frame of frames){if(asset.type!=='image'||['x','y','width','height'].some(k=>!Number.isInteger(frame[k]))||frame.x<0||frame.y<0||frame.width<=0||frame.height<=0||frame.x+frame.width>asset.width||frame.y+frame.height>asset.height)throw new TypeError('Frame region outside source');}
 const fps=input.fps??(input.duration?Math.max(1,frames.length)/input.duration:8),duration=input.duration??Math.max(1,frames.length)/fps;
 if(!finite(fps,.1,60)||!finite(duration,.01,10)||typeof (input.loop??false)!=='boolean')throw new TypeError('Invalid animation timing');
 const staticFrame=input.staticFrame??0;if(!Number.isInteger(staticFrame)||staticFrame<0||staticFrame>=Math.max(1,frames.length))throw new TypeError('Invalid static fallback');
 return immutable({source,frames,fps,duration,loop:input.loop??false,staticFrame,...common(input)});
}
export function vfxDescriptor(input,{manifest=assetManifest}={}){
 const form=input.form??'burst',assetKey=input.assetKey??'placeholder.vfx',duration=input.duration??.32,attach=input.attach??'source',rotation=input.rotation??'none',layer=input.layer??15;
 if(!['sprite','flipbook','burst','trail','ring','projectile','impact','persistent-area'].includes(form)||!manifest[assetKey])throw new TypeError('Invalid VFX form/asset');
 if(!finite(duration,.01,10)||!['source','target','fixed'].includes(attach)||!['none','facing'].includes(rotation)||!Number.isInteger(layer)||layer<1||layer>19||typeof (input.loop??false)!=='boolean'||input.loop&&form!=='persistent-area')throw new TypeError('Invalid VFX lifecycle/attachment');
 const animation=input.animation?animationDescriptor(input.animation,{manifest}):null;
 if(form==='flipbook'&&!animation&&manifest[assetKey].type==='image')throw new TypeError('Flipbook requires animation');
 return immutable({form,assetKey,duration,attach,rotation,layer,loop:input.loop??false,cleanup:'owner-or-duration',animation,...common(input)});
}
export function actionDescriptor(input,{manifest=assetManifest}={}){
 const animation=animationDescriptor(input.animation,{manifest}),frameDurationsMs=input.frameDurationsMs,impactFrame=input.impactFrame,coordinateSize=input.coordinateSize;
 if(animation.loop||animation.frames.length!==4||!Array.isArray(frameDurationsMs)||frameDurationsMs.length!==4||frameDurationsMs.some(n=>!Number.isInteger(n)||n<1||n>1000)||impactFrame!==2||!Array.isArray(coordinateSize)||coordinateSize.length!==2||coordinateSize.some(n=>!finite(n,1,2048)))throw new TypeError('Invalid action timing/coordinates');
 const effect=(e)=>{if(!e||manifest[e.assetKey]?.type!=='image'||!Array.isArray(e.offset)||!Array.isArray(e.size)||e.offset.length!==2||e.size.length!==2||e.offset.some(n=>!finite(n,-2048,2048))||e.size.some(n=>!finite(n,1,2048))||!Number.isInteger(e.layer)||e.layer<1||e.layer>19||e.attach!=null&&!['source','target'].includes(e.attach)||e.retainOnNextCast!==undefined&&typeof e.retainOnNextCast!=='boolean')throw new TypeError('Invalid action effect');return {assetKey:e.assetKey,offset:e.offset,size:e.size,layer:e.layer,...(e.attach?{attach:e.attach}:{}),...(e.retainOnNextCast!==undefined?{retainOnNextCast:e.retainOnNextCast}:{})};};
 return immutable({animation,frameDurationsMs,impactFrame,coordinateSize,blade:effect(input.blade),contact:effect(input.contact)});
}
