import test from 'node:test';import assert from 'node:assert/strict';import {bindMenuImage} from '../src/assets/menuImage.js';
test('broken menu image fallback terminates, never re-requests the same failed image',()=>{
 const image={removeAttribute(){this.src=null;}};bindMenuImage(image,{key:'new-art',path:'missing.png',width:32,height:32,fallback:'placeholder.actor-strip'});
 image.onerror();assert.match(image.src,/actor-strip/);image.onerror();assert.equal(image.hidden,true);assert.equal(image.src,null);
});
