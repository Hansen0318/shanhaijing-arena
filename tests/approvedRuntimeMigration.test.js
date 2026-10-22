import test from 'node:test';
import assert from 'node:assert/strict';
import {assetManifest} from '../src/assets/manifest.js';
import {specialRuntimePacking} from '../src/assets/specialRuntimePacking.js';
import {approvedRuntimeAsset} from './helpers/approvedRuntimeAsset.js';
test('legacy assertions inspect immutable logical sources only after complete installed RGBA reconstruction',()=>{
 for(const key of Object.keys(specialRuntimePacking))assert.ok(approvedRuntimeAsset(assetManifest[key]).bytes>0);
});
test('verification adapter rejects wrong physical dimensions and source identity rather than hiding drift',()=>{
 const a=assetManifest['botuo.battleIdle'];
 assert.throws(()=>approvedRuntimeAsset({...a,width:a.width+1}));
 assert.throws(()=>approvedRuntimeAsset({...a,path:'assets/characters/botuo/battleIdle.png'}));
});
