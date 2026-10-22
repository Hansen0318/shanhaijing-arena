import test from 'node:test';import assert from 'node:assert/strict';import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,readdirSync,rmSync} from 'node:fs';import {tmpdir} from 'node:os';import path from 'node:path';import {createHash} from 'node:crypto';
const api=await import('../scripts/verifyLushuPassiveRelease.mjs').catch(e=>{if(e.code==='ERR_MODULE_NOT_FOUND')return {};throw e;});
const hash=s=>createHash('sha256').update(s).digest('hex');
function fixture(){
 assert.equal(typeof api.verifyLushuPassiveRelease,'function','source-bound passive release verifier missing');
 const root=mkdtempSync(path.join(tmpdir(),'passive-evidence-')),put=(p,data)=>{mkdirSync(path.dirname(path.join(root,p)),{recursive:true});writeFileSync(path.join(root,p),data);},json=(p,d)=>put(p,JSON.stringify(d)),receiptPath='docs/verification/P1_PASSIVE_RUNTIME/release-evidence.json';
 const spec='docs/superpowers/specs/2026-10-22-lushu-passive-design.md',plan='docs/superpowers/plans/2026-10-22-lushu-passive.md';put(spec,'approved spec');put(plan,'approved plan');
 json('docs/verification/P1_PASSIVE_DESIGN/spec-acceptance.json',{status:'WRITTEN SPEC PLAYER APPROVED',approvedSpec:spec,approvedSpecSha256:hash('approved spec'),playerStatement:'好繼續'});
 json('docs/verification/P1_PASSIVE_DESIGN/plan-acceptance.json',{status:'IMPLEMENTATION PLAN PLAYER APPROVED',approvedPlan:plan,approvedPlanSha256:hash('approved plan'),approvedSpec:spec,approvedSpecSha256:hash('approved spec'),playerStatement:'好我確認繼續'});
 for(const p of ['src/main.js','public/test.png','scripts/verifyLushuPassiveRelease.mjs','scripts/checkLushuPassiveBrowser.mjs','.github/workflows/m0-pages-preview.yml','.github/workflows/p1-passive-verification.yml','tests/passiveReleaseEvidence.test.js'])put(p,'unchanged-source');
 const sample={side:'ally',reduced:false,facings:[false,true],metrics:{cssFontSize:12.3,visible:true,intersections:0,text:'疾行 +8%'},numeric:{baseSpeed:2.05,activeSpeed:2.214,baseDistance:4.1,activeDistance:4.428},expiry:true,pause:true,cap:{text:'疾行 · 移速上限15%',ratio:1.15},overlap:{count:6,intersections:0,minCssFontSize:12.3},cleanup:{koCleared:true,oldClosed:true,newClean:true},callbackUsed:true,screenshots:['screen.png']};
 const base='docs/verification/P1_PASSIVE_RUNTIME/';put(base+'screen.png',Buffer.from('PNG test fixture; binary content is hash-bound only'));
 json(base+'native.json',{status:'PASS',physicalPhone:false,errors:[],cases:[false,true].flatMap(reduced=>['ally','enemy'].map(side=>({...sample,reduced,side})))});
 json(base+'built-entry.json',{status:'PASS',physicalPhone:false,errors:[],cases:[false,true].map(reduced=>({...sample,reduced,viewport:{width:852,height:393}}))});
 json(base+'compatibility/native.json',{status:'PASS',cases:[1,2,3,4]});json(base+'compatibility/built-entry.json',{status:'PASS',cases:[1,2]});json(base+'compatibility/scale.json',{status:'PASS',cases:[{cases:[1,2,3,4,5]},{cases:[1,2,3,4,5]}]});
 const walk=p=>readdirSync(path.join(root,p),{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(p+'/'+e.name):[p+'/'+e.name]);
 const files=['src/main.js','public/test.png',...walk('scripts'),...walk('.github'),...walk('tests'),spec,plan,...walk('docs/verification/P1_PASSIVE_DESIGN'),...walk(base.slice(0,-1))];
 const receipt={status:'READY FOR NORMAL RELEASE',tests:{total:1040,pass:1040,fail:0},build:'PASS',sourceSha256:Object.fromEntries(files.map(p=>[p,hash(readFileSync(path.join(root,p)))]))};json(receiptPath,receipt);
 return {root,receiptPath,put,json,receipt,base,refresh:()=>json(receiptPath,receipt),verify:()=>api.verifyLushuPassiveRelease({root,receiptPath}),remove:()=>rmSync(root,{recursive:true,force:true})};
}
test('passive release verifier accepts complete bound successful engineering and genuine approval records',()=>{const f=fixture();try{assert.equal(f.verify().status,'PASS');}finally{f.remove();}});
test('missing changed or incomplete runtime source cannot pass the release gate',()=>{
 for(const kind of ['changed','missing','incomplete']){const f=fixture();try{if(kind==='changed')f.put('src/main.js','tampered');if(kind==='missing')rmSync(path.join(f.root,f.receiptPath));if(kind==='incomplete'){delete f.receipt.sourceSha256['src/main.js'];f.refresh();}assert.throws(f.verify);}finally{f.remove();}}
});
test('a hash-consistent report with bad measurements missing counterparts or an unapproved plan still fails',()=>{
 for(const kind of ['font','counterpart','failed','cases','screenshot','approval']){const f=fixture();try{
  const p=kind==='approval'?'docs/verification/P1_PASSIVE_DESIGN/plan-acceptance.json':f.base+'native.json';let d=JSON.parse(readFileSync(path.join(f.root,p)));
  if(kind==='font')d.cases[0].metrics.cssFontSize=11;if(kind==='failed')d.status='FAIL';if(kind==='cases')d.cases.pop();if(kind==='screenshot')d.cases[0].screenshots=['missing.png'];if(kind==='approval')d.approvedPlanSha256='0'.repeat(64);
  f.json(p,d);f.receipt.sourceSha256[p]=hash(readFileSync(path.join(f.root,p)));if(kind==='counterpart')delete f.receipt.sourceSha256[f.base+'built-entry.json'];f.refresh();assert.throws(f.verify,undefined,kind);
 }finally{f.remove();}}
});
