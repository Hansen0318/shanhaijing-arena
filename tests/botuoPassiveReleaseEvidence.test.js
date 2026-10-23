import test from 'node:test';import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,rmSync} from 'node:fs';import {tmpdir} from 'node:os';import path from 'node:path';import {createHash} from 'node:crypto';
const api=await import('../scripts/verifyBotuoPassiveRelease.mjs').catch(e=>{if(e.code==='ERR_MODULE_NOT_FOUND')return {};throw e;});
test('new defense release guard rejects missing evidence, changed source and false numeric/cleanup/browser cases',()=>{
 assert.equal(typeof api.verifyBotuoPassiveRelease,'function','new spatial passive source guard missing');
 const root=mkdtempSync(path.join(tmpdir(),'armor-proof-')),base='docs/verification/P2_PASSIVE_RUNTIME/',sha=b=>createHash('sha256').update(b).digest('hex'),put=(p,v)=>{mkdirSync(path.dirname(path.join(root,p)),{recursive:true});writeFileSync(path.join(root,p),typeof v==='string'?v:JSON.stringify(v));};
 try{
  assert.throws(()=>api.verifyBotuoPassiveRelease(root));
  const source=['src/x.js','public/a.png','scripts/verifyBotuoPassiveRelease.mjs','scripts/checkBotuoPassiveBrowser.mjs','scripts/checkLushuPassiveV2Browser.mjs','tests/botuoPassiveReleaseEvidence.test.js','package.json','package-lock.json','index.html','vite.config.js','.github/workflows/m0-pages-preview.yml','.github/workflows/p1-passive-verification.yml'];source.forEach(p=>put(p,'source'));
  put(base+'authorization.json',{playerStatement:'確認其他未來整體角色開發真的會有效果，就繼續實作'});
  const reports={};
  for(const [name,count]of [['native.json',16],['built-entry.json',8]]){
   const cases=[];for(const reduced of [false,true])for(const [i,tier]of ['T0','T1','T2','T3'].entries())for(const side of name==='native.json'?['ally','enemy']:['ally']){
    const reduction=[.2,.3,.4,.5][i],screenshot=name+tier+side+reduced+'.png';put(base+screenshot,'image');cases.push({tier,side,reduced,reduction,baselineDamage:100,actualDamage:100*(1-reduction),damageRatio:1-reduction,start:0,expiryAt:4,readyAt:8,duration:4,cooldown:8,segments:i+1,repeat:8,combined:1-Math.max(reduction,[.25,.275,.3,.3375][i]),renderer:2,viewport:{width:852,height:393},screenshot,...Object.fromEntries(['plates','stableGeometry','noText','suppressed','resumed','expiry','pause','koCleared','endCleared','restart','callbackUsed'].map(k=>[k,true]))});
   }assert.equal(cases.length,count);reports[name]={status:'PASS',physicalPhone:false,errors:[],cases};put(base+name,reports[name]);
  }
  const p1Images=[];
  for(const name of ['native.json','built-entry.json'])put(base+'p1-compatibility/'+name,{status:'PASS',physicalPhone:false,errors:[],cases:reports[name].cases.map(c=>{const gain={T0:.35,T1:.5,T2:.65,T3:.8}[c.tier],screenshot='p1-'+c.screenshot;put(base+'p1-compatibility/'+screenshot,'image');p1Images.push(base+'p1-compatibility/'+screenshot);return {...c,gain,baseSpeed:2,activeSpeed:2*(1+gain),baselineDistance:2,distance:2*(1+gain),duration:3,cooldown:6,screenshot};})});
  for(const [name,n]of [['native.json',4],['built-entry.json',2],['scale.json',2]])put(base+'p2-compatibility/'+name,{status:'PASS',physicalPhone:false,errors:[],cases:Array.from({length:n},()=>name==='scale.json'?{cases:Array(5).fill({})}:{})});
  const bound=[...source,...p1Images,base+'authorization.json',...Object.keys(reports).map(n=>base+n),...Object.values(reports).flatMap(r=>r.cases.map(c=>base+c.screenshot)),...['p1-compatibility/native.json','p1-compatibility/built-entry.json','p2-compatibility/native.json','p2-compatibility/built-entry.json','p2-compatibility/scale.json'].map(n=>base+n)];
  const refresh=()=>put(base+'release-evidence.json',{status:'READY FOR NORMAL RELEASE',tests:{total:1065,pass:1065,fail:0},build:'PASS',sourceSha256:Object.fromEntries(bound.map(p=>[p,sha(readFileSync(path.join(root,p)))]))});refresh();assert.equal(api.verifyBotuoPassiveRelease(root).status,'PASS');
  for(const field of ['actualDamage','duration','segments','stableGeometry','noText','restart']){const c=reports['native.json'].cases[0],old=c[field];c[field]=typeof old==='number'?999:false;put(base+'native.json',reports['native.json']);refresh();assert.throws(()=>api.verifyBotuoPassiveRelease(root),field);c[field]=old;put(base+'native.json',reports['native.json']);}
  refresh();put('src/x.js','changed-source');assert.throws(()=>api.verifyBotuoPassiveRelease(root));
 }finally{rmSync(root,{recursive:true,force:true});}
});
