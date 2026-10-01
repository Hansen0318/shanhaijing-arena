import test from 'node:test';
import assert from 'node:assert/strict';
import { TeamSelection } from '../src/roster/team.js';
import { renderTeamSelect } from '../src/roster/view.js';
import { findStage } from '../src/campaign/data.js';
const element=tag=>({tag,children:[],dataset:{},style:{},className:'',append(...nodes){this.children.push(...nodes);},setAttribute(k,v){this[k]=v;}});
const walk=n=>[n,...n.children.flatMap(walk)];
test('upper matchup retains all six slot identities but no type marks or detailed metadata',()=>{
 const page=element('section'),team=new TeamSelection({stage:findStage('1-1'),saved:['P1','P3','P5']});
 renderTeamSelect(page,team,{document:{createElement:element},stageId:'1-1'});
 const upper=walk(page).find(n=>n.className==='team-matchup');
 const nodes=walk(upper);
 assert.equal(nodes.filter(n=>n.className==='type-mark').length,0);
 assert.deepEqual(nodes.filter(n=>n.dataset.slot).map(n=>n.textContent),['SLOT 1','SLOT 2 · FRONT','SLOT 3']);
 assert.deepEqual(nodes.filter(n=>n.dataset.enemyId).map(n=>n.textContent),['E1','E2 · FRONT','E3']);
 assert.equal(nodes.filter(n=>n.className==='matchup-portrait').length,6);
 assert.equal(nodes.filter(n=>n.className==='matchup-identity').length,6);
 assert.ok(walk(page).some(n=>n.textContent==='BATTLE'));
});
