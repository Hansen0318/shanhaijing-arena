import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
export function verifyLushuPassiveV2Release(root=process.cwd()){
 const base='docs/verification/P1_PASSIVE_V2/',read=p=>readFileSync(path.join(root,p)),json=p=>JSON.parse(read(p)),hash=b=>createHash('sha256').update(b).digest('hex'),walk=p=>readdirSync(path.join(root,p),{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(p+'/'+e.name):[p+'/'+e.name]);
 const r=json(base+'release-evidence.json');assert.equal(r.status,'READY FOR NORMAL RELEASE');assert.equal(r.build,'PASS');assert.ok(r.tests.total>=1046);assert.equal(r.tests.total,r.tests.pass);assert.equal(r.tests.fail,0);
 const bound=r.sourceSha256;assert.deepEqual(Object.keys(bound).filter(p=>p.startsWith('src/')||p.startsWith('public/')).sort(),[...walk('src'),...walk('public')].sort());
 for(const [p,sha]of Object.entries(bound)){assert.ok(!path.isAbsolute(p)&&!p.split('/').includes('..'));assert.equal(hash(read(p)),sha,p);}
 for(const p of [...walk('scripts'),...walk('tests'),'package.json','package-lock.json','index.html','vite.config.js','.github/workflows/m0-pages-preview.yml','.github/workflows/p1-passive-verification.yml','docs/decisions/2026-10-23-passive-visibility-tier-revision.md',base+'authorization.json'])assert.ok(bound[p],`Missing binding ${p}`);
 assert.equal(json(base+'authorization.json').playerStatement,'被動的文字不要出現，很怪，還有剛剛說的比例或增益要變更大，目前沒有感覺，還有跟隨T等級增加也要有，且要夠大的變化，確認就直接進行執行');
 for(const [name,count]of [['native.json',16],['built-entry.json',8]]){
  assert.ok(bound[base+name]);const d=json(base+name);assert.equal(d.status,'PASS');assert.equal(d.physicalPhone,false);assert.deepEqual(d.errors,[]);assert.equal(d.cases.length,count);assert.equal(new Set(d.cases.map(c=>`${c.tier}:${c.side}:${c.reduced}`)).size,count);
  for(const c of d.cases){assert.ok(['ally','enemy'].includes(c.side));assert.equal(typeof c.reduced,'boolean');if(name==='built-entry.json')assert.equal(c.side,'ally');const gain={T0:.35,T1:.5,T2:.65,T3:.8}[c.tier];assert.equal(c.gain,gain);assert.ok(Math.abs(c.activeSpeed/c.baseSpeed-1-gain)<1e-8);assert.ok(Math.abs(c.distance/c.baselineDistance-1-gain)<1e-8);assert.equal(c.duration,3);assert.equal(c.cooldown,6);for(const key of ['noText','expiry','pause','koCleared','endCleared','restart'])assert.equal(c[key],true);assert.deepEqual([...c.facings].sort(),[false,true]);assert.ok(Math.abs(c.combined-1-gain-.15)<1e-8);assert.ok(Math.abs(c.independentExpiry-1-gain)<1e-8);assert.ok(bound[base+c.screenshot]);if(name==='built-entry.json'){assert.equal(c.callbackUsed,true);assert.deepEqual(c.viewport,{width:852,height:393});}}
 }
 for(const [name,count]of [['native.json',4],['built-entry.json',2],['scale.json',2]]){
  const p=base+'compatibility/'+name;assert.ok(bound[p]);const d=json(p);assert.equal(d.status,'PASS');assert.equal(d.cases.length,count);if(name==='scale.json')assert.ok(d.cases.every(c=>c.cases.length===5));
 }
 return {status:'PASS',files:Object.keys(bound).length};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){try{console.log(JSON.stringify(verifyLushuPassiveV2Release()));}catch(e){console.error(String(e));process.exitCode=1;}}
