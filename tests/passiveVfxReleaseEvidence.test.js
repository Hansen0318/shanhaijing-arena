import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,copyFileSync,readFileSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {verifyPassiveVfxRelease} from '../scripts/verifyPassiveVfxRelease.mjs';
test('historical accepted VFX release guard rejects changed sources and forged clean-copy or true-status VFX evidence',()=>{
 const root=mkdtempSync(path.join(tmpdir(),'vfx-release-')),base='docs/verification/PASSIVE_VFX_COPY_REVISION/',receiptPath=base+'release-evidence.json';
 const receipt=JSON.parse(readFileSync(receiptPath)),put=(p,b)=>{mkdirSync(path.dirname(path.join(root,p)),{recursive:true});writeFileSync(path.join(root,p),b);};
 const historical=JSON.parse(readFileSync('docs/verification/P3_BASIC_RUNTIME/previous-passive-release-sources.json'));
 const refresh=()=>put(receiptPath,JSON.stringify(receipt));
 try{
  assert.throws(()=>verifyPassiveVfxRelease(root));
  for(const p of Object.keys(receipt.sourceSha256)){mkdirSync(path.dirname(path.join(root,p)),{recursive:true});if(historical[p])put(p,Buffer.from(historical[p],'base64'));else copyFileSync(p,path.join(root,p));}refresh();
  assert.equal(verifyPassiveVfxRelease(root).status,'PASS');
  const source='src/runtime/passivePresenter.js',old=readFileSync(path.join(root,source));put(source,'changed');assert.throws(()=>verifyPassiveVfxRelease(root));put(source,old);
  for(const [p,mutate] of [[base+'p1-compatibility/native.json',d=>{d.cases[0].vfxStatus=false;}],[base+'collection/built-entry.json',d=>{d.cases[0].text+=' 戰場不顯示文字';}]]){
   const bytes=readFileSync(path.join(root,p)),sha=receipt.sourceSha256[p],d=JSON.parse(bytes);mutate(d);const changed=JSON.stringify(d);put(p,changed);receipt.sourceSha256[p]=createHash('sha256').update(changed).digest('hex');refresh();assert.throws(()=>verifyPassiveVfxRelease(root));put(p,bytes);receipt.sourceSha256[p]=sha;refresh();
  }
  assert.equal(verifyPassiveVfxRelease(root).status,'PASS');
 }finally{rmSync(root,{recursive:true,force:true});}
});
