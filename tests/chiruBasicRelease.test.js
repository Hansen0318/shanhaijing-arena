import test from 'node:test';import assert from 'node:assert/strict';
const api=await import('../scripts/verifyChiruBasicRelease.mjs').catch(e=>{if(e.code==='ERR_MODULE_NOT_FOUND')return {};throw e;});
function report(built=false){const cases=[];for(const tier of built?['T0']:['T0','T1','T2','T3'])for(const tactical of built?[true]:[false,true])for(const reduced of [false,true])for(const sign of [-1,1])cases.push({tier,tactical,reduced,sign,renderer:2,delay:.18,hitAt:.18,hitCount:1,noEarlyDamage:true,charge:true,line:true,impact:true,mirror:true,pause:true,idle:true,miss:true,cancel:true,ko:true,end:true,restart:true,scale:true,callbackUsed:built});return {status:'PASS',physicalPhone:false,errors:[],cases};}
test('new Basic source gate rejects missing/forged actual browser timing, effects and cleanup',()=>{
 assert.equal(typeof api.validateChiruBasicBrowserReport,'function');
 for(const built of [false,true]){const good=report(built);assert.doesNotThrow(()=>api.validateChiruBasicBrowserReport(good,built));
  for(const k of ['hitAt','hitCount','noEarlyDamage','charge','line','impact','mirror','pause','idle','miss','cancel','ko','end','restart','scale',...(built?['callbackUsed']:[])]){
   const bad=structuredClone(good);bad.cases[0][k]=typeof bad.cases[0][k]==='number'?999:false;assert.throws(()=>api.validateChiruBasicBrowserReport(bad,built),k);
  }
  const duplicate=structuredClone(good);duplicate.cases[0]=duplicate.cases[1];assert.throws(()=>api.validateChiruBasicBrowserReport(duplicate,built));
 }
});
