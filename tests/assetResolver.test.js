import test from 'node:test';import assert from 'node:assert/strict';
import {createAssetManifest} from '../src/assets/schema.js';
const r=await import('../src/assets/resolver.js').catch(()=>({}));
test('unknown/missing character slots safely resolve standard fallback',()=>{
 assert.equal(typeof r.resolveCharacterAsset,'function');
 for(const slot of ['portraitSquare','collectionArt','battleIdle','battleHit','battleKo','basicVfx','heavyVfx','specialVfx','awakeningVfx'])assert.equal(r.resolveCharacterAsset({id:'future-20',assets:{[slot]:'missing'}},slot).type,'procedural');
 assert.equal(r.resolveAsset('bad').key,'placeholder.battle');
});
test('encounter plan is unique, contains selected actors/current stage only',()=>{
 assert.equal(typeof r.encounterAssetKeys,'function');
 const keys=r.encounterAssetKeys([{assets:{battleIdle:'idle.a',portraitSquare:'portrait.a'}},{assets:{battleIdle:'idle.a',heavyVfx:'h.b'}}],{battleAssetKey:'stage.now'});
 assert.deepEqual(keys,['idle.a','portrait.a','h.b','stage.now']);assert.ok(!keys.includes('idle.future'));
});
test('asset URLs respect Pages base and resolve missing fallback chain',()=>{
 assert.equal(typeof r.assetUrl,'function');
 assert.equal(r.assetUrl({path:'a.png'},'/arena/'),'/arena/a.png');assert.equal(r.assetUrl({path:null}),null);
 const m=createAssetManifest([{key:'p',type:'procedural',path:null},{key:'a',type:'image',path:'a.png',width:8,height:8,bytes:50,fallback:'p'}]);assert.equal(r.resolveAsset('a',{manifest:m,failed:new Set(['a'])}).key,'p');
});
