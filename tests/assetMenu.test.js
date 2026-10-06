import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {bindMenuImage,decoratePortrait} from '../src/assets/menuImage.js';
test('broken menu image fallback terminates, never re-requests the same failed image',()=>{
 const image={removeAttribute(){this.src=null;}};bindMenuImage(image,{key:'new-art',path:'missing.png',width:32,height:32,fallback:'placeholder.actor-strip'});
 image.onerror();assert.match(image.src,/actor-strip/);image.onerror();assert.equal(image.hidden,true);assert.equal(image.src,null);
});

test('Team Select upper full-body preview preserves approved collectionArt instead of substituting battle sprite sheets',()=>{
 const menu=readFileSync(new URL('../src/assets/menuImage.js',import.meta.url),'utf8');
 const roster=readFileSync(new URL('../src/roster/view.js',import.meta.url),'utf8');
 assert.doesNotMatch(menu,/decorateIdlePreview/);
 assert.match(roster,/decoratePortrait\(p,character,\{document:doc,slot:'collectionArt',motion:'idleBreath'\}\)/);
 assert.doesNotMatch(roster,/battleIdle.*decorateIdlePreview/);
});

test('Team Select breathing animates the approved collectionArt itself without sprite-sheet substitution',()=>{
 const animations=[];
 const make=tag=>({tag,style:{},dataset:{},children:[],textContent:'',hidden:false,append(...items){this.children.push(...items);},removeAttribute(k){delete this[k];},animate(frames,options){animations.push({frames,options});return {};}});
 const document={defaultView:{matchMedia:()=>({matches:false})},createElement:make};
 const host=make('span');host.textContent='猼訑';
 decoratePortrait(host,{assets:{collectionArt:'botuo.identity'}},{document,slot:'collectionArt',motion:'idleBreath'});
 assert.equal(host.dataset.motion,'idleBreath');assert.equal(animations.length,1);assert.equal(animations[0].options.iterations,Infinity);assert.equal(animations[0].options.duration,1600);
 const img=host.children.find(n=>n.tag==='img');assert.match(img.src,/botuo\/identity\.png$/);assert.doesNotMatch(img.src,/battleIdle/);assert.equal(img.style.transformOrigin,'50% 100%');
 animations.length=0;
 const reducedDocument={...document,defaultView:{matchMedia:()=>({matches:true})}};
 const reducedHost=make('span');
 decoratePortrait(reducedHost,{assets:{collectionArt:'botuo.identity'}},{document:reducedDocument,slot:'collectionArt',motion:'idleBreath'});
 assert.equal(animations.length,0);assert.equal(reducedHost.children.find(n=>n.tag==='img').src,img.src);
});
