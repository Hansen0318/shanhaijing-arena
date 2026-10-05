import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {bindMenuImage} from '../src/assets/menuImage.js';
test('broken menu image fallback terminates, never re-requests the same failed image',()=>{
 const image={removeAttribute(){this.src=null;}};bindMenuImage(image,{key:'new-art',path:'missing.png',width:32,height:32,fallback:'placeholder.actor-strip'});
 image.onerror();assert.match(image.src,/actor-strip/);image.onerror();assert.equal(image.hidden,true);assert.equal(image.src,null);
});

test('Team Select full-body previews consume authored idle sprite sheets when available',()=>{
 const menu=readFileSync(new URL('../src/assets/menuImage.js',import.meta.url),'utf8');
 const roster=readFileSync(new URL('../src/roster/view.js',import.meta.url),'utf8');
 assert.match(menu,/export function decorateIdlePreview/);
 assert.match(menu,/frames\.length<2/);
 assert.match(menu,/img\.animate\(keyframes/);
 assert.match(roster,/animationDescriptors\?\.battleIdle\?\.frames\?\.length>1\?decorateIdlePreview/);
});
