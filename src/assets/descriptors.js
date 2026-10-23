import {immutable} from './schema.js';
import {assetManifest} from './manifest.js';
const finite=(n,min,max)=>Number.isFinite(n)&&n>=min&&n<=max;
function statusVisualRules(rules,manifest){
 if(!rules||typeof rules!=='object'||Array.isArray(rules))throw new TypeError('Invalid status rules');
 return Object.fromEntries(Object.entries(rules).map(([id,e])=>{
  if(!/^[-\w.]{1,96}$/.test(id)||!e||manifest[e.assetKey]?.type!=='image'||!Array.isArray(e.size)||e.size.length!==2||e.size.some(n=>!finite(n,1,2048))||!Array.isArray(e.offset)||e.offset.length!==2||e.offset.some(n=>!finite(n,-2048,2048))||!Number.isInteger(e.layer)||!finite(e.layer,1,19)||!finite(e.opacity,0,1)||!finite(e.reducedOpacity,0,1)||!/^[-\w.]{1,96}$/.test(e.styleId??'')||!['mitigation','incoming','outgoing','movement','avoidance','control','steadfast'].includes(e.type)||!Number.isInteger(e.priority))throw new TypeError('Invalid status visual ownership');return [id,{...e}];
 }));
}
function common(input){
 const origin=input.origin??[.5,.5],scale=input.scale??1;
 if(!Array.isArray(origin)||origin.length!==2||origin.some(n=>!finite(n,0,1))||!finite(scale,.05,4))throw new TypeError('Invalid origin/scale');return {origin,scale};
}
export function animationDescriptor(input,{manifest=assetManifest}={}){
 const source=input.source??'placeholder.battle',asset=manifest[source];if(!asset)throw new TypeError('Unknown animation source');
 const frames=input.frames??[];if(!Array.isArray(frames)||frames.length>128)throw new TypeError('Invalid frame count');
 for(const frame of frames){if(asset.type!=='image'||['x','y','width','height'].some(k=>!Number.isInteger(frame[k]))||frame.x<0||frame.y<0||frame.width<=0||frame.height<=0||frame.x+frame.width>(asset.logicalWidth??asset.width)||frame.y+frame.height>(asset.logicalHeight??asset.height))throw new TypeError('Frame region outside source');}
 for(const f of frames)if(f.trim!==undefined){const t=f.trim;if(!Array.isArray(t)||t.length!==4||t.some(n=>!Number.isInteger(n))||t[0]<1||t[1]<1||t[0]>2048||t[1]>2048||t[2]<0||t[3]<0||t[2]+f.width>t[0]||t[3]+f.height>t[1])throw new TypeError('Invalid frame trim');}
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
 if(input.kind==='utility'){
  if(animation.loop||animation.frames.length!==4||!Array.isArray(frameDurationsMs)||frameDurationsMs.length!==4||frameDurationsMs.some(n=>!Number.isInteger(n)||n<1||n>1000)||!finite(input.reducedGestureMs,1,1000)||Math.abs(animation.duration*1000-frameDurationsMs.reduce((a,b)=>a+b,0))>1e-6)throw new TypeError('Invalid utility gesture');
  const visual=e=>{if(!e||manifest[e.assetKey]?.type!=='image'||!Array.isArray(e.size)||e.size.length!==2||e.size.some(n=>!finite(n,1,2048))||!Array.isArray(e.offset)||e.offset.length!==2||e.offset.some(n=>!finite(n,-2048,2048))||!Number.isInteger(e.layer)||!finite(e.layer,1,19)||!finite(e.opacity,0,1)||!finite(e.reducedOpacity,0,1))throw new TypeError('Invalid utility visual');return {...e};};
  const activation=visual(input.activation);if(!finite(activation.durationMs,1,1000)||!finite(activation.fadeMs,1,activation.durationMs))throw new TypeError('Invalid utility activation');
  if(!input.statusVisuals||typeof input.statusVisuals!=='object'||Array.isArray(input.statusVisuals))throw new TypeError('Invalid utility status rules');
  const statusVisuals=Object.fromEntries(Object.entries(input.statusVisuals).map(([id,v])=>{const e=visual(v);if(!/^[-\w.]{1,96}$/.test(id)||typeof e.styleId!=='string'||!/^[-\w.]{1,96}$/.test(e.styleId)||!['mitigation','incoming','outgoing','movement','avoidance','control','steadfast'].includes(e.type)||!Number.isInteger(e.priority))throw new TypeError('Invalid utility status ownership');return [id,e];}));
  return immutable({kind:'utility',animation,frameDurationsMs,reducedGestureMs:input.reducedGestureMs,activation,statusVisuals});
 }
 if(input.kind!=='staged'&&(animation.loop||animation.frames.length!==4||!Array.isArray(frameDurationsMs)||frameDurationsMs.length!==4||frameDurationsMs.some(n=>!Number.isInteger(n)||n<1||n>1000)||impactFrame!==2||!Array.isArray(coordinateSize)||coordinateSize.length!==2||coordinateSize.some(n=>!finite(n,1,2048))))throw new TypeError('Invalid action timing/coordinates');
 const effect=(e)=>{if(!e||e.opacity!==undefined&&!finite(e.opacity,0,1)||manifest[e.assetKey]?.type!=='image'||!Array.isArray(e.offset)||!Array.isArray(e.size)||e.offset.length!==2||e.size.length!==2||e.offset.some(n=>!finite(n,-2048,2048))||e.size.some(n=>!finite(n,1,2048))||!Number.isInteger(e.layer)||e.layer<1||e.layer>19||e.attach!=null&&!['source','target','fixed','line'].includes(e.attach)||e.retainOnNextCast!==undefined&&typeof e.retainOnNextCast!=='boolean'||e.startMs!==undefined&&(!Number.isInteger(e.startMs)||!finite(e.startMs,0,1000))||e.durationMs!==undefined&&(!Number.isInteger(e.durationMs)||!finite(e.durationMs,1,1000))||e.holdAfterResolveMs!==undefined&&(!Number.isInteger(e.holdAfterResolveMs)||!finite(e.holdAfterResolveMs,1,1000)))throw new TypeError('Invalid action effect');if(e.attach==='line'&&(!Array.isArray(e.targetOffset)||e.targetOffset.length!==2||e.targetOffset.some(n=>!finite(n,-2048,2048))||!Array.isArray(e.lineRange)||e.lineRange.length!==2||!finite(e.lineRange[0],0,1)||!finite(e.lineRange[1],0,1)||e.lineRange[0]>=e.lineRange[1]))throw new TypeError('Invalid action line geometry');if(e.frameOffsets!==undefined&&(!Array.isArray(e.frameOffsets)||e.frameOffsets.length!==4||e.frameOffsets.some(v=>!Array.isArray(v)||v.length!==2||v.some(n=>!finite(n,-2048,2048)))))throw new TypeError('Invalid anticipation offsets');return {...(e.attach==='line'?{targetOffset:e.targetOffset,lineRange:e.lineRange}:{}),...(e.frameOffsets?{frameOffsets:e.frameOffsets}:{}),...(e.startMs!==undefined?{startMs:e.startMs}:{}),...(e.durationMs!==undefined?{durationMs:e.durationMs}:{}),...(e.opacity!==undefined?{opacity:e.opacity}:{}),assetKey:e.assetKey,offset:e.offset,size:e.size,layer:e.layer,...(e.attach?{attach:e.attach}:{}),...(e.retainOnNextCast!==undefined?{retainOnNextCast:e.retainOnNextCast}:{}),...(e.holdAfterResolveMs!==undefined?{holdAfterResolveMs:e.holdAfterResolveMs}:{})};};
 if(input.kind==='staged'){
  const {durationMs,recoveryStartMs,phaseFrames,stages}=input;
  if(animation.loop||animation.frames.length!==5||!Number.isInteger(durationMs)||!finite(durationMs,1,3000)||!Number.isInteger(recoveryStartMs)||!finite(recoveryStartMs,1,durationMs-1)||!Array.isArray(coordinateSize)||coordinateSize.length!==2||coordinateSize.some(n=>!finite(n,1,2048))||!Array.isArray(phaseFrames)||phaseFrames.length!==5||phaseFrames.some(n=>!Number.isInteger(n)||n<0||n>=5)||new Set(phaseFrames).size!==5||!Array.isArray(stages)||stages.length!==3)throw new TypeError('Invalid staged action lifecycle');
  const parsed=stages.map((stage,i)=>{
   if(!Number.isInteger(stage.startMs)||!Number.isInteger(stage.endMs)||!finite(stage.startMs,0,recoveryStartMs-1)||!finite(stage.endMs,stage.startMs+1,recoveryStartMs)||!Number.isInteger(stage.contactHoldMs)||!finite(stage.contactHoldMs,1,1000)||i&&stage.startMs!==stages[i-1].endMs)throw new TypeError('Invalid staged action phase');
   return {startMs:stage.startMs,endMs:stage.endMs,contactHoldMs:stage.contactHoldMs,blade:effect(stage.blade),contact:effect(stage.contact)};
  });
  if(parsed.at(-1).endMs!==recoveryStartMs)throw new TypeError('Invalid staged recovery');
  return immutable({kind:'staged',animation,coordinateSize,durationMs,recoveryStartMs,phaseFrames,stages:parsed});
 }
 return immutable({...(input.kind==='launched-line'?{kind:'launched-line'}:{}),...(input.kind==='area-observed'?{kind:'area-observed',statusVisuals:statusVisualRules(input.statusVisuals,manifest)}:{}),animation,frameDurationsMs,impactFrame,coordinateSize,...(input.anticipation?{anticipation:effect(input.anticipation)}:{}),blade:effect(input.blade),contact:effect(input.contact)});
}
