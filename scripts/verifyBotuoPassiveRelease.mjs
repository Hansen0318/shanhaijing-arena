import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
export function verifyBotuoPassiveRelease(root=process.cwd()){
 const base='docs/verification/P2_PASSIVE_RUNTIME/',read=p=>readFileSync(path.join(root,p)),json=p=>JSON.parse(read(p)),hash=b=>createHash('sha256').update(b).digest('hex'),walk=p=>readdirSync(path.join(root,p),{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(p+'/'+e.name):[p+'/'+e.name]),near=(a,b)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<1e-8,`${a} != ${b}`);
 const r=json(base+'release-evidence.json'),bound=r.sourceSha256;
 assert.equal(r.status,'READY FOR NORMAL RELEASE');assert.equal(r.build,'PASS');assert.ok(r.tests.total>=1065);assert.equal(r.tests.total,r.tests.pass);assert.equal(r.tests.fail,0);
 assert.deepEqual(Object.keys(bound).filter(p=>p.startsWith('src/')||p.startsWith('public/')).sort(),[...walk('src'),...walk('public')].sort());
 for(const [p,sha]of Object.entries(bound)){assert.ok(!path.isAbsolute(p)&&!p.split('/').includes('..'));assert.equal(hash(read(p)),sha,p);}
 for(const p of [...walk('scripts'),...walk('tests'),'package.json','package-lock.json','index.html','vite.config.js','.github/workflows/m0-pages-preview.yml','.github/workflows/p1-passive-verification.yml',base+'authorization.json'])assert.ok(bound[p],`Missing binding ${p}`);
 assert.equal(json(base+'authorization.json').playerStatement,'確認其他未來整體角色開發真的會有效果，就繼續實作');
 const report=(prefix,name,count)=>{const p=base+prefix+name;assert.ok(bound[p]);const d=json(p);assert.equal(d.status,'PASS');assert.equal(d.physicalPhone,false);assert.deepEqual(d.errors,[]);assert.equal(d.cases.length,count);return d;};
 for(const [name,count]of [['native.json',16],['built-entry.json',8]]){
  const d=report('',name,count);assert.equal(new Set(d.cases.map(c=>`${c.tier}:${c.side}:${c.reduced}`)).size,count);
  for(const c of d.cases){
   const i=['T0','T1','T2','T3'].indexOf(c.tier);assert.ok(i>=0);assert.ok(['ally','enemy'].includes(c.side));assert.equal(typeof c.reduced,'boolean');const reduction=[.2,.3,.4,.5][i];near(c.reduction,reduction);assert.ok(c.baselineDamage>0);near(c.actualDamage/c.baselineDamage,1-reduction);near(c.damageRatio,1-reduction);
   near(c.expiryAt-c.start,4);near(c.readyAt-c.start,8);near(c.duration,4);near(c.cooldown,8);near(c.repeat,c.start+8);near(c.combined,1-Math.max(reduction,[.25,.275,.3,.3375][i]));assert.equal(c.segments,i+1);assert.equal(c.renderer,2);assert.deepEqual(c.viewport,{width:852,height:393});
   for(const k of ['plates','stableGeometry','noText','suppressed','resumed','expiry','pause','koCleared','endCleared','restart'])assert.equal(c[k],true,k);
   assert.ok(typeof c.screenshot==='string'&&bound[base+c.screenshot]);if(name==='built-entry.json'){assert.equal(c.side,'ally');assert.equal(c.callbackUsed,true);}
  }
 }
 for(const [name,count]of [['native.json',16],['built-entry.json',8]]){
  const d=report('p1-compatibility/',name,count);assert.equal(new Set(d.cases.map(c=>`${c.tier}:${c.side}:${c.reduced}`)).size,count);
  for(const c of d.cases){const gain={T0:.35,T1:.5,T2:.65,T3:.8}[c.tier];assert.ok(Number.isFinite(gain));near(c.gain,gain);near(c.activeSpeed/c.baseSpeed,1+gain);near(c.distance/c.baselineDistance,1+gain);assert.equal(c.duration,3);assert.equal(c.cooldown,6);for(const k of ['noText','expiry','pause','koCleared','endCleared','restart'])assert.equal(c[k],true);assert.ok(bound[base+'p1-compatibility/'+c.screenshot]);if(name==='built-entry.json'){assert.equal(c.side,'ally');assert.equal(c.callbackUsed,true);}}
 }
 for(const [name,count]of [['native.json',4],['built-entry.json',2],['scale.json',2]]){const d=report('p2-compatibility/',name,count);if(name==='scale.json')assert.ok(d.cases.every(c=>c.cases.length===5));}
 return {status:'PASS',files:Object.keys(bound).length};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){try{console.log(JSON.stringify(verifyBotuoPassiveRelease()));}catch(e){console.error(String(e));process.exitCode=1;}}
