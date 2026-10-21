// Read-only production inventory; no gameplay probes, build or Runtime integration.
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {rosterCatalog} from '../../../src/roster/catalog.js';
import {characterAnimation,characterAction} from '../../../src/assets/battleDescriptors.js';
import {AssetPresenter} from '../../../src/runtime/assetPresenter.js';
import {createAssetCache} from '../../../src/runtime/assetCache.js';
import {assetScene,pngTransport} from '../../../tests/helpers/assetScene.js';
const out='docs/verification/P2_SPECIAL_PREFLIGHT/';
const sha=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
const snapshotPath='docs/art/candidates/botuo/special/key-pose-v1/mechanics-snapshot.json';
const prior=JSON.parse(readFileSync(snapshotPath));
const sources=prior.sources.map(e=>({...e,currentSha256:sha(e.path),unchanged:sha(e.path)===e.sha256}));
assert.ok(sources.every(e=>e.unchanged));
writeFileSync(out+'source-reuse.json',JSON.stringify({recoveredHead:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),mechanicsSnapshot:snapshotPath,snapshotSha256:sha(snapshotPath),sources,reused:{direct:32,lifecycle:8,ai:2,pairedDamage:4},mechanicsRerun:false,heavyEvidenceReused:true},null,2)+'\n');
const definitions=Object.values(rosterCatalog),runs=[];
for(const reverse of [false,true]){
 const scene=assetScene(),cache=createAssetCache({transport:pngTransport}),p=new AssetPresenter(scene,{cache});
 await p.prepare(reverse?[...definitions].reverse():definitions);await p.whenIdle();
 const records=[...p.textures.keys()].map(key=>({...p.residency.record(key),sha256:sha('public/'+p.residency.record(key).path),consumers:definitions.flatMap(d=>{
  const list=[];for(const state of ['battleIdle','battleMove','battleKo']){const a=characterAnimation(d,state);if(a.source===key)list.push({definitionId:d.id,state,animation:a});}
  for(const category of Object.keys(d.actionDescriptors??{})){const a=characterAction(d,category);if(a.animation.source===key)list.push({definitionId:d.id,category,animation:a.animation});}return list;
 })}));
 const entry={reverse,snapshot:p.residency.snapshot(),cache:cache.diagnostics(),allocationDouble:scene.budget(),records};
 assert.equal(records.length,42);assert.equal(p.textureBytes,16622164);assert.equal(entry.snapshot.failed,0);
 p.destroy();entry.cleanup=scene.budget();assert.equal(entry.cleanup.bytes,0);runs.push(entry);
}
writeFileSync(out+'current-required.json',JSON.stringify({...runs[0],runs: runs.map(({records,...r})=>r),scope:'Actual cache/residency/prepare with actual PNG headers; image decoder and Phaser upload are doubled. Not GPU/browser proof.'},null,2)+'\n');
writeFileSync(out+'current-descriptors.json',JSON.stringify(Object.fromEntries(Object.entries(rosterCatalog).map(([k,d])=>[k,{animations:Object.fromEntries(['battleIdle','battleMove','battleKo'].map(s=>[s,characterAnimation(d,s)])),actions:Object.fromEntries(Object.keys(d.actionDescriptors??{}).map(c=>[c,characterAction(d,c)]))}])),null,2)+'\n');
console.log(JSON.stringify({sourceHashMatches:sources.length,mechanicsEvidence:'REUSED',requiredKeys:42,decodedBytes:16622164,loadOrders:2,cleanupBytes:0}));
