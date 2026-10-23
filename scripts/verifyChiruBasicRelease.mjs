import assert from 'node:assert/strict';import {readFileSync,readdirSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';import path from 'node:path';import {fileURLToPath} from 'node:url';
const BASE='docs/verification/P3_BASIC_RUNTIME/';
export function validateChiruBasicBrowserReport(report,built=false){
 assert.equal(report.status,'PASS');assert.equal(report.physicalPhone,false);assert.deepEqual(report.errors,[]);assert.equal(report.cases.length,built?4:32);
 const identities=new Set();
 for(const c of report.cases){
  assert.ok((built?['T0']:['T0','T1','T2','T3']).includes(c.tier));assert.equal(typeof c.tactical,'boolean');assert.equal(typeof c.reduced,'boolean');assert.ok([-1,1].includes(c.sign));if(built)assert.equal(c.tactical,true);
  identities.add([c.tier,c.tactical,c.reduced,c.sign].join(':'));assert.equal(c.renderer,2);assert.ok(Math.abs(c.delay-.18)<1e-8);assert.ok(Math.abs(c.hitAt-.18)<1e-8);assert.equal(c.hitCount,1);
  for(const k of ['noEarlyDamage','charge','line','impact','mirror','pause','idle','miss','cancel','ko','end','restart','scale'])assert.equal(c[k],true,k);
  if(built)assert.equal(c.callbackUsed,true);
 }assert.equal(identities.size,built?4:32);return true;
}
export function verifyChiruBasicRelease(root=process.cwd(),{record=false}={}){
 const read=p=>readFileSync(path.join(root,p)),json=p=>JSON.parse(read(p)),sha=b=>createHash('sha256').update(b).digest('hex');
 const walk=p=>readdirSync(path.join(root,p),{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(p+'/'+e.name):[p+'/'+e.name]);
 let r;
 if(record){
  const tap=read('.git/chiru-tests.tap').toString(),number=k=>Number(tap.match(new RegExp('^# '+k+' (\\d+)','m'))?.[1]);
  assert.ok(number('tests')>=1096);assert.equal(number('tests'),number('pass'));assert.equal(number('fail'),0);
  const receipt='docs/art/approved/chiru/basic/composite-review-v1/acceptance.json';
  const bound=[...walk('src'),...walk('public'),...walk('scripts'),...walk('tests'),...walk('.github/workflows'),'package.json','package-lock.json','index.html','vite.config.js',receipt,'docs/art/approved/chiru/basic/f3-v2/acceptance.json',BASE+'packing.json',...walk(BASE+'browser'),BASE+'previous-passive-release-sources.json',...Object.keys(json(receipt).evidenceSha256)];
  r={status:'READY FOR NORMAL RELEASE',tests:{total:number('tests'),pass:number('pass'),fail:0},build:'PASS',sourceSha256:Object.fromEntries([...new Set(bound)].sort().map(p=>[p,sha(read(p))]))};
  writeFileSync(path.join(root,BASE+'release-evidence.json'),JSON.stringify(r,null,2)+'\n');
 }else r=json(BASE+'release-evidence.json');
 assert.equal(r.status,'READY FOR NORMAL RELEASE');assert.equal(r.build,'PASS');assert.ok(r.tests.total>=1096);assert.equal(r.tests.total,r.tests.pass);assert.equal(r.tests.fail,0);
 const bound=r.sourceSha256;
 for(const p of [...walk('src'),...walk('public'),...walk('scripts'),...walk('tests'),...walk('.github/workflows'),'package.json','package-lock.json','index.html','vite.config.js'])assert.ok(bound[p],p);
 for(const [p,h]of Object.entries(bound)){assert.ok(!path.isAbsolute(p)&&!p.split('/').includes('..'));assert.equal(sha(read(p)),h,p);}
 const receipt=json('docs/art/approved/chiru/basic/composite-review-v1/acceptance.json');assert.equal(receipt.playerStatement,'我確認 紀錄 繼續');
 for(const [p,h]of Object.entries(receipt.evidenceSha256)){assert.equal(sha(read(p)),h,p);assert.equal(bound[p],h,p);}
 for(const built of [false,true]){const report=json(BASE+'browser/'+(built?'built-entry':'native')+'.json');validateChiruBasicBrowserReport(report,built);for(const c of report.cases)if(c.screenshot)assert.ok(bound[BASE+'browser/'+c.screenshot]);}
 return {status:'PASS',files:Object.keys(bound).length,tests:r.tests};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){try{console.log(JSON.stringify(verifyChiruBasicRelease(process.cwd(),{record:process.argv.includes('--record')})));}catch(e){console.error(e);process.exitCode=1;}}
