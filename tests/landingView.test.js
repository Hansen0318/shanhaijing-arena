import test from 'node:test';
import assert from 'node:assert/strict';
import {CampaignController} from '../src/campaign/controller.js';
import {CampaignView} from '../src/campaign/view.js';
import {normalizeAcquisition} from '../src/acquisition/model.js';
function element(tag){const n={tag,children:[],dataset:{},style:{},attributes:{},className:'',scrollTop:0,append(...x){this.children.push(...x);},replaceChildren(...x){this.children=x;},setAttribute(k,v){this.attributes[k]=v;},addEventListener(k,f){this['on'+k]=f;},focus(){}};n.classList={add(x){n.className+=' '+x;}};return n;}
const walk=n=>[n,...n.children.flatMap(walk)];
const find=(n,p)=>walk(n).find(p);
function fixture(fn){const old=globalThis.document;globalThis.document={createElement:element};try{const c=new CampaignController(),root=element('main');c.openLanding();const view=new CampaignView(root,c);view.render();fn({c,root,view});}finally{globalThis.document=old;}}
test('Landing has decorative full-screen hero, title and three clear primary/secondary entries',()=>fixture(({root})=>{
 const hero=find(root,n=>n.className==='landing-backdrop');assert.ok(hero);assert.equal(hero.attributes['aria-hidden'],'true');assert.ok(find(root,n=>n.tag==='h1'&&n.textContent==='SHANHAIJING ARENA'));
 const buttons=walk(root).filter(n=>n.tag==='button');assert.deepEqual(buttons.map(n=>n.textContent),['BATTLE','COLLECTION','INFO']);assert.ok(buttons[0].className.includes('landing-primary'));assert.ok(buttons[1].className.includes('landing-secondary'));assert.equal(buttons[0].type,'button');assert.equal(buttons[1].type,'button');
}));
for(const [label,screen,backAction] of [['BATTLE','chapters','chapters-back'],['COLLECTION','collection','collection-back']])test(`${label} opens sibling route once; BACK restores Landing without changing persisted progression`,()=>fixture(({c,root,view})=>{
 let writes=0;c.acquisition=normalizeAcquisition({version:3,shardsByCharacterId:{P1:30,P4:7},spentShardsByCharacterId:{P1:15,P4:5},tierByCharacterId:{P1:'T2',P4:'T0'}});c.lastTeam=['P1','P3','P2'];c.persistence={save(){writes++;}};c.acquisitionPersistence={save(){writes++;}};c.teamPersistence={save(){writes++;}};
 const before=structuredClone({a:c.acquisition,p:c.progress,t:c.lastTeam});view.render();const button=find(root,n=>n.textContent===label&&n.tag==='button');button.onclick();assert.equal(c.screen,screen);const page=root.children[0];button.onclick();assert.equal(root.children[0],page);assert.equal(find(root,n=>n.className==='landing-backdrop'),undefined);find(root,n=>n.dataset.action===backAction).onclick();assert.equal(c.screen,'landing');assert.ok(find(root,n=>n.className==='landing-backdrop'));assert.deepEqual({a:c.acquisition,p:c.progress,t:c.lastTeam},before);assert.equal(writes,0);
}));
test('Landing rerender has one title and three actions without duplicate persistent UI',()=>fixture(({root,view})=>{
 view.render();view.render();assert.equal(walk(root).filter(n=>n.tag==='h1').length,1);assert.equal(walk(root).filter(n=>n.tag==='button').length,3);assert.equal(walk(root).filter(n=>n.className==='landing-backdrop').length,1);
}));
