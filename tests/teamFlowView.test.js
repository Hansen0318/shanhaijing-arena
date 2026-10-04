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

test('Stage id/name appear only in the preview overlay while rewards and START stay in the details column',()=>{
 const old=globalThis.document;globalThis.document={createElement:element};
 try{const root=element('main'),c=new CampaignController({dev:true}),view=new CampaignView(root,c);c.openChapter('chapter-1');c.selectStage('1-1');view.render();
 const overlay=walk(root).find(n=>n.className==='stage-title-overlay');assert.equal(overlay.textContent,'1-1 山麓試煉');
 const details=walk(root).find(n=>n.className==='preview-details');assert.equal(walk(details).some(n=>n.tag==='h2'||n.textContent==='山麓試煉'),false);
 assert.ok(walk(details).some(n=>n.textContent==='START'));assert.ok(walk(details).some(n=>n.className==='stage-rewards'));
 }finally{globalThis.document=old;}
});
