import assert from 'node:assert/strict';import {readFileSync,readdirSync} from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {createHash} from 'node:crypto';
const hash=buffer=>createHash('sha256').update(buffer).digest('hex');
export function verifyLushuPassiveRelease({root=process.cwd(),receiptPath='docs/verification/P1_PASSIVE_RUNTIME/release-evidence.json'}={}){
 const read=p=>readFileSync(path.join(root,p)),json=p=>JSON.parse(read(p)),r=json(receiptPath),walk=p=>readdirSync(path.join(root,p),{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(p+'/'+e.name):[p+'/'+e.name]);
 assert.equal(r.status,'READY FOR NORMAL RELEASE');assert.equal(r.build,'PASS');assert.ok(Number.isInteger(r.tests.total)&&r.tests.total>0);assert.equal(r.tests.pass,r.tests.total);assert.equal(r.tests.fail,0);
 assert.deepEqual(Object.keys(r.sourceSha256).filter(p=>p.startsWith('src/')||p.startsWith('public/')).sort(),[...walk('src'),...walk('public')].sort(),'complete source/public inventory required');
 for(const [p,sha]of Object.entries(r.sourceSha256)){assert.ok(!path.isAbsolute(p)&&!p.split('/').includes('..'),'evidence path must stay in repository');assert.equal(hash(read(p)),sha,p);}
 const required=['scripts/verifyLushuPassiveRelease.mjs','scripts/checkLushuPassiveBrowser.mjs','.github/workflows/m0-pages-preview.yml','.github/workflows/p1-passive-verification.yml','tests/passiveReleaseEvidence.test.js','docs/verification/P1_PASSIVE_DESIGN/spec-acceptance.json','docs/verification/P1_PASSIVE_DESIGN/plan-acceptance.json'];
 for(const p of required)assert.ok(r.sourceSha256[p],`missing required evidence binding ${p}`);
 const approval=json(required.at(-1)),spec=json(required.at(-2));assert.equal(approval.playerStatement,'好我確認繼續');assert.equal(spec.playerStatement,'好繼續');assert.ok(approval.status.startsWith('IMPLEMENTATION PLAN PLAYER APPROVED'));assert.ok(spec.status.startsWith('WRITTEN SPEC PLAYER APPROVED'));
 assert.ok(r.sourceSha256[approval.approvedPlan]);assert.ok(r.sourceSha256[spec.approvedSpec]);assert.equal(hash(read(approval.approvedPlan)),approval.approvedPlanSha256);assert.equal(hash(read(spec.approvedSpec)),spec.approvedSpecSha256);assert.equal(approval.approvedSpecSha256,spec.approvedSpecSha256);
 const base='docs/verification/P1_PASSIVE_RUNTIME/';
 const report=name=>{const p=base+name;assert.ok(r.sourceSha256[p],`unbound report ${p}`);const d=json(p);assert.equal(d.status,'PASS',p);return d;};
 for(const [name,count]of [['native.json',4],['built-entry.json',2]]){
  const d=report(name);assert.equal(d.physicalPhone,false);assert.deepEqual(d.errors,[]);assert.equal(d.cases.length,count);assert.equal(new Set(d.cases.map(c=>`${c.side}:${c.reduced}`)).size,count);
  for(const c of d.cases){assert.deepEqual([...c.facings].sort(),[false,true]);assert.ok(c.metrics.cssFontSize>=12);assert.equal(c.metrics.visible,true);assert.equal(c.metrics.intersections,0);assert.equal(c.metrics.text,'疾行 +8%');assert.ok(Math.abs(c.numeric.activeSpeed/c.numeric.baseSpeed-1.08)<1e-8);assert.ok(Math.abs(c.numeric.activeDistance/c.numeric.baseDistance-1.08)<1e-8);assert.equal(c.expiry,true);assert.equal(c.pause,true);assert.equal(c.cap.text,'疾行 · 移速上限15%');assert.ok(Math.abs(c.cap.ratio-1.15)<1e-8);assert.equal(c.overlap.count,6);assert.equal(c.overlap.intersections,0);assert.ok(c.overlap.minCssFontSize>=12);assert.equal(c.cleanup.koCleared,true);assert.equal(c.cleanup.oldClosed,true);assert.equal(c.cleanup.newClean,true);assert.ok(c.screenshots.length>0);for(const image of c.screenshots)assert.ok(r.sourceSha256[base+image],`missing screenshot binding ${image}`);
   if(name==='built-entry.json'){assert.equal(c.viewport.width,852);assert.equal(c.viewport.height,393);assert.equal(c.callbackUsed,true);}
  }
 }
 assert.equal(report('compatibility/native.json').cases.length,4);assert.equal(report('compatibility/built-entry.json').cases.length,2);const scale=report('compatibility/scale.json');assert.equal(scale.cases.length,2);assert.ok(scale.cases.every(c=>c.cases.length===5));
 return {status:'PASS',files:Object.keys(r.sourceSha256).length};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){try{console.log(JSON.stringify(verifyLushuPassiveRelease()));}catch(error){console.error(String(error));process.exitCode=1;}}
