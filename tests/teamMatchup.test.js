import test from 'node:test';
import assert from 'node:assert/strict';
import { TeamSelection } from '../src/roster/team.js';
import { renderTeamSelect } from '../src/roster/view.js';
import { findStage } from '../src/campaign/data.js';
import { createStageBattleSession } from '../src/campaign/battleFactory.js';
import { typeMark } from '../src/roster/typeIcons.js';
function element(tag){return {tag,children:[],dataset:{},style:{},className:'',append(...items){this.children.push(...items);},setAttribute(k,v){this[k]=v;}};}
const walk=n=>[n,...n.children.flatMap(walk)];
test('Power / Speed / Blast have distinct replaceable type marks, independent from roles',()=>{const marks=['power','speed','blast'].map(type=>typeMark({type,role:'tank'}));assert.equal(new Set(marks.map(m=>m.symbol)).size,3);assert.deepEqual(marks.map(m=>m.label),['Power','Speed','Blast']);assert.equal(typeMark({type:'speed',role:'support'}),typeMark({type:'speed',role:'tank'}));});
test('VS enemy identities and immutable types match actual stage battle; ally replacement updates only allies',()=>{
 const stage={...findStage('1-1'),enemyLineup:['enemy','P3','P4']},team=new TeamSelection({stage,saved:['P1','P3','P5']});
 const render=()=>{const page=element('section');renderTeamSelect(page,team,{document:{createElement:element},stageId:stage.stageId});return walk(page);};
 const nodes=render(),preview=nodes.filter(n=>n.dataset.enemyId),battle=createStageBattleSession({...stage,selectedTeam:team.slots});
 assert.equal(preview.length,3);assert.deepEqual(preview.map(n=>n.dataset.enemyId),battle.enemies.map(a=>a.definitionId));
 assert.deepEqual(preview.map(n=>n.dataset.type),battle.enemies.map(a=>battle.characterDefinitions[a.definitionId].type));
 assert.ok(nodes.some(n=>n.textContent==='VS'));assert.equal(nodes.filter(n=>n.dataset.slot).length,3);
 team.remove(1);team.toggle('P2');const changed=render();assert.deepEqual(changed.filter(n=>n.dataset.enemyId).map(n=>n.dataset.enemyId),preview.map(n=>n.dataset.enemyId));
 assert.equal(changed.find(n=>n.dataset.slot==='2').dataset.type,'speed');
});
