import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const r=JSON.parse(readFileSync('docs/verification/P2_AWAKENING_RUNTIME/release-evidence.json'));
assert.equal(r.scale,'PASS');assert.equal(r.native,'PASS');assert.equal(r.builtMobile,'PASS');
assert.equal(r.authorization,'確認進度紀錄後繼續做到部署');
for(const [p,sha]of Object.entries(r.sourceSha256))assert.equal(createHash('sha256').update(readFileSync(p)).digest('hex'),sha,p);
console.log('Awakening native/built/scale evidence matches unchanged approved runtime sources. Normal full-suite still required.');
