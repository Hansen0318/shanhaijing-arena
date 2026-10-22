import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {verifyLushuPassiveV2Release} from '../scripts/verifyLushuPassiveV2Release.mjs';
test('v2 release guard rejects absent proof and tampered actual numeric or text evidence',()=>{
 const root=mkdtempSync(path.join(tmpdir(),'passive-v2-')),base='docs/verification/P1_PASSIVE_V2/',files={},put=(p,d)=>{mkdirSync(path.dirname(path.join(root,p)),{recursive:true});const s=typeof d==='string'?d:JSON.stringify(d);writeFileSync(path.join(root,p),s);files[p]=createHash('sha256').update(s).digest('hex');};
 try{
  assert.throws(()=>verifyLushuPassiveV2Release(root));
  for(const p of ['src/a.js','public/a.png','scripts/a.mjs','tests/a.js','package.json','package-lock.json','index.html','vite.config.js','.github/workflows/m0-pages-preview.yml','.github/workflows/p1-passive-verification.yml','docs/decisions/2026-10-23-passive-visibility-tier-revision.md'])put(p,'fixture');
  put(base+'authorization.json',{playerStatement:'被動的文字不要出現，很怪，還有剛剛說的比例或增益要變更大，目前沒有感覺，還有跟隨T等級增加也要有，且要夠大的變化，確認就直接進行執行'});put(base+'screen.png','fixture');
  for(const [name,count]of [['native.json',4],['built-entry.json',2],['scale.json',2]])put(base+'compatibility/'+name,{status:'PASS',cases:Array.from({length:count},()=>({cases:Array(5).fill({})}))});
  const reports={};for(const [name,built]of [['native.json',false],['built-entry.json',true]]){
   const cases=[];for(const [tier,gain]of [['T0',.35],['T1',.5],['T2',.65],['T3',.8]])for(const side of built?['ally']:['ally','enemy'])for(const reduced of [false,true])cases.push({tier,gain,side,reduced,baseSpeed:2,activeSpeed:2*(1+gain),baselineDistance:6,distance:6*(1+gain),duration:3,cooldown:6,noText:true,expiry:true,pause:true,koCleared:true,endCleared:true,restart:true,facings:[false,true],combined:1+gain+.15,independentExpiry:1+gain,callbackUsed:true,viewport:{width:852,height:393},screenshot:'screen.png'});
   reports[name]={status:'PASS',physicalPhone:false,errors:[],cases};put(base+name,reports[name]);
  }
  const receipt=()=>put(base+'release-evidence.json',{status:'READY FOR NORMAL RELEASE',build:'PASS',tests:{total:1047,pass:1047,fail:0},sourceSha256:{...files}});
  receipt();assert.equal(verifyLushuPassiveV2Release(root).status,'PASS');
  for(const field of ['noText','activeSpeed','restart']){
   const c=reports['native.json'].cases[0],original=c[field];c[field]=field==='activeSpeed'?2:false;put(base+'native.json',reports['native.json']);receipt();assert.throws(()=>verifyLushuPassiveV2Release(root));c[field]=original;put(base+'native.json',reports['native.json']);
  }
  receipt();put('src/a.js','changed source');assert.throws(()=>verifyLushuPassiveV2Release(root));
 }finally{rmSync(root,{recursive:true,force:true});}
});
