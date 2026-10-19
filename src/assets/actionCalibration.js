// Opt-in authoring calibration, independent of character identity and gameplay.
// Match body landmarks to accepted Idle; never fit a crouch to its bounding box.
export function calibrateAnimationBody(animation,{reference,referenceSpan,sourceSpan,referenceFoot,sourceFoot}){
 const f=animation.frames[0],r=reference.frames[0];
 if(![referenceSpan,sourceSpan].every(n=>Number.isFinite(n)&&n>0)||![referenceFoot,sourceFoot].every(Number.isFinite))throw new TypeError('Invalid body calibration landmarks');
 const referenceDensity=72*reference.scale/Math.max(r.width,r.height);
 const density=referenceDensity*referenceSpan/sourceSpan;
 const foot=(referenceFoot-reference.origin[1]*r.height)*referenceDensity;
 return {...animation,scale:density*Math.max(f.width,f.height)/72,origin:[animation.origin[0],(sourceFoot-foot/density)/f.height]};
}
export function calibrateActionBody(input,{reference,referenceSpan,actionSpan,referenceFoot,actionFoot}){
 const a=input.animation,f=a.frames[0],r=reference.frames[0];
 if(![referenceSpan,actionSpan].every(n=>Number.isFinite(n)&&n>0)||![referenceFoot,actionFoot].every(Number.isFinite))throw new TypeError('Invalid body calibration landmarks');
 const oldDensity=72*a.scale/Math.max(f.width,f.height),refDensity=72*reference.scale/Math.max(r.width,r.height);
 const density=refDensity*referenceSpan/actionSpan,factor=density/oldDensity;
 const foot=(referenceFoot-reference.origin[1]*r.height)*refDensity;
 const origin=[a.origin[0],(actionFoot-foot/density)/f.height];
 const coordinateSize=input.coordinateSize.map(n=>n*factor);
 const shift=origin.map((n,i)=>n*coordinateSize[i]-a.origin[i]*input.coordinateSize[i]);
 // Keep existing independent source/target FX at the same world size/position.
 const effect=e=>e.attach==='target'?e:{...e,offset:e.offset.map((n,i)=>n+shift[i])};
 return {...input,animation:{...a,origin,scale:a.scale*factor},coordinateSize,blade:effect(input.blade),contact:effect(input.contact)};
}
