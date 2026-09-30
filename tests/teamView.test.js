import test from 'node:test';
import assert from 'node:assert/strict';
import { TeamSelection } from '../src/roster/team.js';
import { renderTeamSelect } from '../src/roster/view.js';
// Minimal DOM boundary: real production event handlers and model are exercised.
function element(tag){return {tag,children:[],dataset:{},style:{},className:'',disabled:false,
 append(...items){this.children.push(...items);},setAttribute(k,v){this[k]=v;}};}
function walk(node){return [node,...node.children.flatMap(walk)];}
test('Team Select displays five cards and three slots; BATTLE reflects exact selection and callbacks',()=>{
 const doc={createElement:element};let page,launches=0,backs=0;
 const team=new TeamSelection();
 const render=()=>{page=element('section');renderTeamSelect(page,team,{document:doc,stageId:'1-1',onChange:render,onBattle:()=>launches++,onBack:()=>backs++});};
 render();const nodes=()=>walk(page);
 const battle=()=>nodes().find(n=>n.textContent==='BATTLE');
 const card=id=>nodes().find(n=>n.dataset.characterId===id);
 assert.equal(nodes().filter(n=>n.dataset.characterId).length,5);assert.equal(battle().disabled,true);
 assert.equal(nodes().filter(n=>n.dataset.slot).length,3);
 card('P1').onclick();card('P3').onclick();assert.equal(battle().disabled,true);card('P5').onclick();
 assert.deepEqual(team.slots,['P1','P3','P5']);assert.equal(battle().disabled,false);
 assert.equal(card('P3')['aria-pressed'],'true');assert.ok(walk(card('P3')).some(n=>n.textContent==='Type: Blast'));
 assert.ok(walk(card('P3')).some(n=>n.textContent==='Role: Support'));
 battle().onclick();assert.equal(launches,1);
 nodes().find(n=>n.dataset.slot==='2').onclick();assert.equal(team.canBattle,false);assert.equal(battle().disabled,true);
 battle().onclick();assert.equal(launches,1);
 nodes().find(n=>n.textContent==='BACK').onclick();assert.equal(backs,1);
});
test('restricted Team Select exposes only eligible cards and labels forced selections',()=>{
 const team=new TeamSelection({stage:{allowedRoster:['P1','P2','P4'],forcedCharacters:['P4']}});
 const page=element('section');renderTeamSelect(page,team,{document:{createElement:element},stageId:'1-3'});
 assert.deepEqual(walk(page).filter(n=>n.dataset.characterId).map(n=>n.dataset.characterId),['P1','P2','P4']);
 const forced=walk(page).find(n=>n.dataset.slot==='1');assert.ok(forced.textContent.includes('REQUIRED'));
 forced.onclick();assert.equal(team.slots[0],'P4');
});
