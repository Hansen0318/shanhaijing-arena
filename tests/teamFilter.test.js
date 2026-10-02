import { prototypeOwnership } from '../src/roster/catalog.js';
import test from 'node:test';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import { CampaignView } from '../src/campaign/view.js';
import { CampaignController } from '../src/campaign/controller.js';
import { rosterCatalog } from '../src/roster/catalog.js';
import { TeamSelection, isValidTeam } from '../src/roster/team.js';
function element(tag){const el={tag,children:[],dataset:{},style:{},disabled:false,className:'',append(...nodes){this.children.push(...nodes);},replaceChildren(...nodes){this.children=[...nodes];},setAttribute(k,v){this[k]=v;},addEventListener(e,f){this['on'+e]=f;}};el.classList={add:c=>el.className+=' '+c};return el;}
const walk=n=>[n,...n.children.flatMap(walk)];
test('type tabs filter candidates only, preserving slot order, valid saved team and selection across rerenders',()=>{
 const old=globalThis.document;globalThis.document={createElement:element};
 try {
  let saves=0;const c=new CampaignController({ownership:prototypeOwnership(),teamPersistence:{load:()=>['P1','P3','P5'],save:()=>saves++}});
  c.openChapter('chapter-1');c.openTeamSelect();const root=element('main'),view=new CampaignView(root,c);view.render();
  const nodes=()=>walk(root),cards=()=>nodes().filter(n=>n.dataset.characterId),tab=t=>nodes().find(n=>n.dataset.filter===t);
  const original=[...c.teamSelection.slots];
  for(const [type,ids] of [['power',['P2','P5']],['speed',['P1']],['blast',['P3','P4']],['all',['P1','P2','P3','P4','P5']]]) {
   tab(type).onclick();assert.deepEqual(cards().map(n=>n.dataset.characterId),ids);
   assert.equal(tab(type)['aria-pressed'],'true');assert.deepEqual(c.teamSelection.slots,original);assert.deepEqual(c.lastTeam,original);assert.equal(saves,0);
   assert.equal(nodes().find(n=>n.textContent==='BATTLE').disabled,false);
  }
  tab('power').onclick();cards().find(n=>n.dataset.characterId==='P5').onclick();assert.deepEqual(cards().map(n=>n.dataset.characterId),['P2','P5']);
  assert.deepEqual(c.teamSelection.slots,['P1','P3',null]);assert.equal(nodes().find(n=>n.textContent==='BATTLE').disabled,true);
  cards().find(n=>n.dataset.characterId==='P2').onclick();assert.deepEqual(c.teamSelection.slots,['P1','P3','P2']);assert.equal(c.teamSelection.canBattle,true);
  tab('power').onclick();assert.deepEqual(c.teamSelection.slots,['P1','P3','P2']);
  assert.equal(saves,0);
 }finally{globalThis.document=old;}
});
test('compact bench keeps type mark and selected state without detailed Type/Role prose',()=>{
 const old=globalThis.document;globalThis.document={createElement:element};try {
  const c=new CampaignController();c.openChapter('chapter-1');c.openTeamSelect();c.teamSelection.toggle('P3');
  const root=element('main');new CampaignView(root,c).render();
  for(const card of walk(root).filter(n=>n.dataset.characterId)) {
   const nodes=walk(card);assert.equal(nodes.filter(n=>n.className==='type-mark').length,1);
   assert.equal(nodes.filter(n=>String(n.textContent).startsWith('Type:')||String(n.textContent).startsWith('Role:')).length,0);
   assert.equal(card['aria-pressed'],String(card.dataset.characterId==='P3'));
  }
 }finally{globalThis.document=old;}
});
test('three Power, three Speed, three Blast and mixed teams obey only ownership/eligibility/unique rules',()=>{
 // Exercise the unchanged production selection code against future immutable catalog data;
 // no catalog or composition-rule changes are introduced for this test.
 const catalog=Object.freeze(Object.fromEntries(['power','speed','blast'].flatMap(type=>[1,2,3].map(i=>[`${type}${i}`,Object.freeze({id:`${type}${i}`,type})]))));
 const ownership={characterIds:Object.keys(catalog)};
 const source=readFileSync(new URL('../src/roster/team.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'').replace(/export /g,'');
 const {TeamSelection:Selection,isValidTeam:valid}=vm.runInNewContext(source+'\n({TeamSelection,isValidTeam})',{rosterCatalog:catalog,prototypeOwnership:()=>ownership});
 for(const ids of [['power1','power2','power3'],['speed1','speed2','speed3'],['blast1','blast2','blast3'],['power1','speed1','blast1']]) {
  const team=new Selection();for(const id of ids)assert.equal(team.toggle(id),true);
  assert.equal(team.canBattle,true);assert.equal(valid(ids),true);
  assert.equal(valid([ids[0],ids[0],ids[1]]),false);
  assert.equal(valid(ids,{bannedCharacters:[ids[1]]}),false);
  assert.equal(valid(ids,{}, {characterIds:[ids[0]]}),false);
 }
});
