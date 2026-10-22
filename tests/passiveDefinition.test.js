import test from 'node:test';
import assert from 'node:assert/strict';
const api=await import('../src/combat/passiveDefinition.js').catch(e=>{if(e.code==='ERR_MODULE_NOT_FOUND')return {};throw e;});
export const validPassive=()=>({id:'myth.runner',name:'疾行',category:'passive',implemented:true,trigger:{kind:'ordinary-distance',distance:1,windowSeconds:2},cooldownSeconds:4,effect:{kind:'status',type:'movement',magnitude:1.08,duration:2},presentation:{label:'疾行'}});
test('passive schema validates immutable generic data without a character identity',()=>{
 assert.equal(typeof api.createPassiveDefinition,'function','passive schema is not implemented');
 const input=validPassive(),d=api.createPassiveDefinition(input);input.trigger.distance=999;
 assert.equal(d.trigger.distance,1);assert.equal(d.effect.magnitude,1.08);assert.ok(Object.isFrozen(d.effect));assert.ok(Object.isFrozen(d.presentation));
});
test('passive schema rejects nonfinite invalid unsupported or empty mechanism fields',()=>{
 assert.equal(typeof api.createPassiveDefinition,'function');
 for(const v of [NaN,Infinity,-1,0])for(const field of ['distance','windowSeconds']){
  const d=validPassive();d.trigger[field]=v;assert.throws(()=>api.createPassiveDefinition(d));
 }
 for(const v of [NaN,Infinity,-1,0,1]){const d=validPassive();d.cooldownSeconds=v;assert.throws(()=>api.createPassiveDefinition(d));}
 for(const patch of [{id:''},{name:''},{category:'basic'},{implemented:false},{trigger:{kind:'skill-distance',distance:1,windowSeconds:2}},{effect:{kind:'damage',type:'movement',magnitude:1.08,duration:2}},{effect:{kind:'status',type:'movement',magnitude:1.16,duration:2}},{effect:{kind:'status',type:'movement',magnitude:1.08,duration:NaN}}])assert.throws(()=>api.createPassiveDefinition({...validPassive(),...patch}));
});
