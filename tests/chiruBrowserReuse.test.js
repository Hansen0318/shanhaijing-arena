import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync,mkdtempSync,mkdirSync,copyFileSync,writeFileSync,rmSync} from 'node:fs';import path from 'node:path';import {tmpdir} from 'node:os';
const api=await import('../scripts/reuseChiruBrowser.mjs').catch(()=>({}));
test('exact Browser reuse validates complete current product/driver inputs and rejects altered source/report',()=>{
 assert.equal(typeof api.verifyChiruBrowserReuse,'function');for(const group of ['special','awakening'])assert.throws(()=>api.verifyChiruBrowserReuse(group));
 const base='docs/verification/P3_AWAKENING_RUNTIME/browser/reuse-proof.json',r=JSON.parse(readFileSync(base)),root=mkdtempSync(path.join(tmpdir(),'chiru-reuse-')),put=(p,b)=>{mkdirSync(path.dirname(path.join(root,p)),{recursive:true});writeFileSync(path.join(root,p),b);};
 try{put(base,JSON.stringify(r));for(const p of new Set([...Object.keys(r.groups.awakening.sourceSha256),...Object.keys(r.groups.awakening.reportSha256)])){mkdirSync(path.dirname(path.join(root,p)),{recursive:true});const old={...JSON.parse(readFileSync('docs/verification/P4_BASIC_RUNTIME/previous-test-sources.json')),...JSON.parse(readFileSync('docs/verification/SCHEMATIC_RETIREMENT/previous-test-sources.json')),...JSON.parse(readFileSync('docs/verification/FORMAL_WARNING_RUNTIME/previous-test-sources.json')),...JSON.parse(readFileSync('docs/verification/P3_PASSIVE_RUNTIME/previous-test-sources.json'))};if(old[p])put(p,Buffer.from(old[p],'base64'));else copyFileSync(p,path.join(root,p));}assert.equal(api.verifyChiruBrowserReuse('awakening',root).status,'PASS');
 const p='src/combat/battleSession.js',original=readFileSync(path.join(root,p));put(p,'altered');assert.throws(()=>api.verifyChiruBrowserReuse('awakening',root));put(p,original);
 const report=Object.keys(r.groups.awakening.reportSha256)[0],bytes=readFileSync(path.join(root,report));put(report,'{}');assert.throws(()=>api.verifyChiruBrowserReuse('awakening',root));put(report,bytes);
 delete r.groups.awakening.sourceSha256[p];put(base,JSON.stringify(r));assert.throws(()=>api.verifyChiruBrowserReuse('awakening',root));
 }finally{rmSync(root,{recursive:true,force:true});}
});
