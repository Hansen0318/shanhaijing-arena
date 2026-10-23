import assert from 'node:assert/strict';import {readFileSync,readdirSync,writeFileSync} from 'node:fs';import {createHash} from 'node:crypto';import path from 'node:path';import {fileURLToPath} from 'node:url';
import {validateChiruBasicBrowserReport} from './verifyChiruBasicRelease.mjs';
const BASE='docs/verification/P3_HEAVY_RUNTIME/';
export function validateChiruHeavyBrowserReport(r,built=false){
 assert.equal(r.status,'PASS');assert.equal(r.physicalPhone,false);assert.deepEqual(r.errors,[]);assert.equal(r.cases.length,built?4:32);const seen=new Set();
 for(const c of r.cases){const i=['T0','T1','T2','T3'].indexOf(c.tier);assert.ok(i>=0);assert.ok([-1,1].includes(c.sign));for(const key of ['tactical','reduced'])assert.equal(typeof c[key],'boolean');seen.add([c.tier,c.tactical,c.reduced,c.sign].join(':'));assert.equal(c.renderer,2);assert.ok(Math.abs(c.delay-[.7,.68775,.6755,.6559][i])<1e-8);assert.ok(Math.abs(c.hitAt-c.delay)<1e-8);assert.equal(c.hitCount,1);for(const k of ['noEarlyDamage','charge','line','impact','mirror','pause','idle','miss','cancel','ko','end','restart','scale'])assert.equal(c[k],true,k);if(built){assert.equal(c.callbackUsed,true);assert.equal(c.tactical,true);assert.equal(c.tier,'T0');}}
 assert.equal(seen.size,built?4:32);return true;
}
export function verifyChiruHeavyRelease(root=process.cwd(),{record=false}={}){
 const read=p=>readFileSync(path.join(root,p)),json=p=>JSON.parse(read(p)),sha=b=>createHash('sha256').update(b).digest('hex'),walk=p=>readdirSync(path.join(root,p),{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(p+'/'+e.name):[p+'/'+e.name]);
 const current=[...walk('src'),...walk('public'),...walk('scripts'),...walk('tests'),...walk('.github/workflows'),'package.json','package-lock.json','index.html','vite.config.js'];const receipt='docs/art/approved/chiru/heavy/composite-review-v1/acceptance.json';let r;
 if(record){const tap=read('.git/chiru-tests.tap').toString(),n=k=>Number(tap.match(new RegExp('^# '+k+' (\\d+)','m'))?.[1]);assert.ok(n('tests')>=1115);assert.equal(n('tests'),n('pass'));assert.equal(n('fail'),0);const bound=[...current,receipt,...Object.keys(json(receipt).evidenceSha256),BASE+'packing.json',BASE+'previous-release-sources.json',...walk(BASE+'browser'),...walk(BASE+'basic-compatibility')];r={status:'READY FOR NORMAL RELEASE',tests:{total:n('tests'),pass:n('pass'),fail:0},build:'PASS',sourceSha256:Object.fromEntries([...new Set(bound)].sort().map(p=>[p,sha(read(p))]))};writeFileSync(path.join(root,BASE+'release-evidence.json'),JSON.stringify(r,null,2)+'\n');}else r=json(BASE+'release-evidence.json');
 assert.equal(r.status,'READY FOR NORMAL RELEASE');assert.equal(r.build,'PASS');assert.ok(r.tests.total>=1115);assert.equal(r.tests.total,r.tests.pass);assert.equal(r.tests.fail,0);
 for(const p of current)assert.ok(r.sourceSha256[p],p);for(const [p,h]of Object.entries(r.sourceSha256)){assert.ok(!path.isAbsolute(p)&&!p.split('/').includes('..'));assert.equal(sha(read(p)),h,p);}
 for(const [p,h]of Object.entries(json(receipt).evidenceSha256)){assert.equal(sha(read(p)),h,p);assert.equal(r.sourceSha256[p],h,p);}
 for(const built of [false,true]){const n=built?'built-entry':'native';validateChiruHeavyBrowserReport(json(BASE+'browser/'+n+'.json'),built);validateChiruBasicBrowserReport(json(BASE+'basic-compatibility/'+n+'.json'),built);}
 return {status:'PASS',files:Object.keys(r.sourceSha256).length,tests:r.tests};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){try{console.log(JSON.stringify(verifyChiruHeavyRelease(process.cwd(),{record:process.argv.includes('--record')})));}catch(e){console.error(e);process.exitCode=1;}}
