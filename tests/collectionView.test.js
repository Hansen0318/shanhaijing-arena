import test from 'node:test';
import assert from 'node:assert/strict';
import { CampaignController } from '../src/campaign/controller.js';
import { CollectionView } from '../src/collection/view.js';
import { CampaignView } from '../src/campaign/view.js';
function element(tag){return {tag,children:[],dataset:{},style:{},className:'',scrollTop:0,attributes:{},classList:{add(){}},append(...items){this.children.push(...items);},replaceChildren(...items){this.children=items;},setAttribute(k,v){this.attributes[k]=v;},addEventListener(k,fn){this['on'+k]=fn;},focus(){},remove(){this.removed=true;}};}
const walk=n=>[n,...n.children.flatMap(walk)];
const by=(root,p)=>walk(root).find(p);
function fixture(){const controller=new CampaignController(),root=element('section');const view=new CollectionView(controller,{document:{createElement:element},onBack:()=>controller.back()});view.mount(root);return {controller,root,view};}
const cards=root=>walk(root).filter(n=>n.dataset.characterId);
test('Collection displays every catalog character, identifiable locked portraits and current inventory',()=>{
 const {controller,root,view}=fixture();assert.deepEqual(cards(root).map(n=>n.dataset.characterId),['P1','P2','P3','P4','P5']);assert.equal(cards(root)[0].dataset.owned,'true');assert.equal(cards(root)[3].dataset.owned,'false');assert.equal(cards(root)[3].disabled,undefined);
 controller.acquisition.shardsByCharacterId.P4=3;controller.acquisition.shardsByCharacterId.P1=9;view.mount(root);
 assert.ok(walk(cards(root)[3]).some(n=>n.textContent==='3 / 5 shards'));assert.ok(walk(cards(root)[0]).some(n=>n.textContent==='Shards 9'));
 controller.acquisition.ownedCharacterIds.push('P4');view.mount(root);assert.equal(cards(root)[3].dataset.owned,'true');assert.ok(walk(cards(root)[3]).some(n=>n.textContent==='Shards 3'));
});
test('four Type filters change only visible cards, no saved lineup or progression mutation',()=>{
 const {controller,root}=fixture(),before=structuredClone({a:controller.acquisition,t:controller.lastTeam,p:controller.progress});
 for(const [f,ids] of [['power',['P1','P4']],['speed',['P2','P5']],['blast',['P3']],['all',['P1','P2','P3','P4','P5']]]){by(root,n=>n.dataset.filter===f).onclick();assert.deepEqual(cards(root).map(n=>n.dataset.characterId),ids);}
 assert.deepEqual({a:controller.acquisition,t:controller.lastTeam,p:controller.progress},before);
});
test('single tap detail reads identity/role/abilities; close keeps filter and scroll, missing lore safe',()=>{
 const {root}=fixture();by(root,n=>n.dataset.filter==='power').onclick();const scroller=by(root,n=>n.className==='collection-grid');scroller.scrollTop=81;
 by(root,n=>n.dataset.characterId==='P4').onclick();const dialog=by(root,n=>n.attributes.role==='dialog');assert.ok(dialog);const texts=walk(dialog).map(n=>n.textContent);for(const text of ['P4','Power','Role: attacker','LOCKED','0 / 5 shards','Heavy · heavy'])assert.ok(texts.includes(text),text);assert.equal(texts.includes('Lore'),false);
 assert.equal(by(root,n=>n.className==='collection-browser').inert,true);by(dialog,n=>n.dataset.action==='close-detail').onclick();assert.equal(scroller.scrollTop,81);assert.equal(by(root,n=>n.className==='collection-browser').inert,false);assert.deepEqual(cards(root).map(n=>n.dataset.characterId),['P1','P4']);
 assert.equal(walk(root).filter(n=>!n.removed&&n.attributes.role==='dialog').length,0);
});
test('Collection back/reopen keeps inspection filter, refreshes authoritative state and respects dev fixture',()=>{
 const {controller,root,view}=fixture();by(root,n=>n.dataset.filter==='speed').onclick();by(root,n=>n.className==='collection-grid').scrollTop=25;view.mount(root);assert.equal(by(root,n=>n.className==='collection-grid').scrollTop,25);assert.deepEqual(cards(root).map(n=>n.dataset.characterId),['P2','P5']);
 const dev=new CampaignController({dev:true}),page=element('section');new CollectionView(dev,{document:{createElement:element}}).mount(page);assert.equal(cards(page).every(n=>n.dataset.owned==='true'),true);
});
test('Chapter Select entry opens Collection and back uses same route ownership render callback',()=>{
 const old=globalThis.document;globalThis.document={createElement:element};try{const controller=new CampaignController(),root=element('main');let renders=0;const v=new CampaignView(root,controller,{onRender:()=>renders++});v.render();by(root,n=>n.textContent==='COLLECTION').onclick();assert.equal(controller.screen,'collection');assert.equal(cards(root).length,5);by(root,n=>n.dataset.action==='collection-back').onclick();assert.equal(controller.screen,'chapters');assert.equal(renders,3);}finally{globalThis.document=old;}
});
