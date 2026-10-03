import test from 'node:test';import assert from 'node:assert/strict';import {createLabConfig} from '../src/dev/battleLab/config.js';import {readFileSync} from 'node:fs';
test('Lab visual inspection is presentation-only session data and rejects invalid slots',()=>{
 const config=createLabConfig({visualSlot:'battleIdle'});assert.equal(config.options.visualSlot,'battleIdle');assert.throws(()=>createLabConfig({visualSlot:'secret'}));
});
test('Arena routes cast/damage presentation through shared asset adapter; telegraph remains authority',()=>{
 const source=readFileSync('src/runtime/ArenaScene.js','utf8');assert.match(source,/new AssetPresenter/);assert.match(source,/visualAssets\.cast/);assert.match(source,/visualAssets\.hit/);assert.match(source,/visualAssets\.destroy/);assert.match(source,/this\.telegraphs\.render\(this\.session\.threats\.active/);
 const p=readFileSync('src/runtime/assetPresenter.js','utf8');assert.doesNotMatch(p,/usePlayerAbility|applyDamage|\.damage\(|\.heal\(|localStorage|if\s*\([^)]*characterId/);
});
