import test from 'node:test';
import assert from 'node:assert/strict';
import { CampaignView } from '../src/campaign/view.js';
import { CampaignController } from '../src/campaign/controller.js';
import { createStageBattleSession } from '../src/campaign/battleFactory.js';

function element(tag){const el={tag,children:[],dataset:{},style:{},disabled:false,className:'',
 append(...items){this.children.push(...items);},replaceChildren(...items){this.children=[...items];},
 setAttribute(k,v){this[k]=v;},addEventListener(event,handler){this[`on${event}`]=handler;}};
 el.classList={add:key=>{el.className+=` ${key}`;}};return el;}
const walk=node=>[node,...node.children.flatMap(walk)];
test('real Campaign view START renders Team Select, BACK keeps stage, BATTLE supplies selected runtime',()=>{
 const old=globalThis.document;globalThis.document={createElement:element};
 try {
  const root=element('main'),c=new CampaignController({dev:true});let launches=0,session;
  const view=new CampaignView(root,c,{onStart:config=>{launches++;session=createStageBattleSession(config);}});
  const button=text=>walk(root).find(n=>n.tag==='button' && n.textContent===text);
  c.openChapter('chapter-1');c.selectStage('1-3');view.render();
  button('START').onclick();assert.equal(c.screen,'team');assert.equal(launches,0);
  button('BACK').onclick();assert.equal(c.screen,'stages');assert.equal(c.selectedStageId,'1-3');
  button('START').onclick();assert.equal(button('BATTLE').disabled,true);
  for(const id of ['P1','P3','P5'])walk(root).find(n=>n.dataset.characterId===id).onclick();
  assert.equal(button('BATTLE').disabled,false);button('BATTLE').onclick();assert.equal(launches,1);
  assert.equal(session.stageId,'1-3');assert.deepEqual(session.allies.map(a=>a.definitionId),['P1','P3','P5']);
 }finally{globalThis.document=old;}
});

test('Stage details contain chapter/stage/rewards while START is a separate lower-right control',()=>{
 const old=globalThis.document;globalThis.document={createElement:element};
 try{const root=element('main'),c=new CampaignController({dev:true}),view=new CampaignView(root,c);c.openChapter('chapter-1');c.selectStage('1-1');view.render();
 assert.equal(walk(root).some(n=>n.className==='stage-title-overlay'||n.tag==='h1'),false);
 const visual=walk(root).find(n=>n.className==='stage-visual');assert.deepEqual(visual.children.map(n=>n.tag),['img']);
 const details=walk(root).find(n=>n.className==='preview-details');assert.deepEqual(details.children.map(n=>n.className),['preview-chapter-title','preview-stage-title','stage-rewards']);
 assert.equal(details.children[0].textContent,'南山初境');assert.equal(details.children[1].textContent,'1-1 山麓試煉');
 assert.equal(walk(details).some(n=>n.textContent==='START'),false);
 const start=walk(root).find(n=>n.textContent==='START'),page=walk(root).find(n=>n.className.includes('stage-page'));assert.ok(page.children.includes(start));assert.equal(start.disabled,false);
 }finally{globalThis.document=old;}
});
