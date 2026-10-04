import test from 'node:test';
import {readFileSync} from 'node:fs';
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
 assert.equal(nodes.filter(n=>n.className==='lineup-figure').length,6);
 assert.equal(nodes.filter(n=>n.className==='matchup-identity').length,6);
 assert.ok(walk(page).some(n=>n.textContent==='BATTLE'));
});
test('forced front slot keeps short formation identity and accessible REQUIRED metadata without a taller title',()=>{
 const page=element('section'),team=new TeamSelection({stage:{...findStage('1-1'),forcedCharacters:['P3']},saved:['P1','P3','P5']});
 renderTeamSelect(page,team,{document:{createElement:element},stageId:'1-1'});
 const slot=walk(page).find(n=>n.dataset.slot==='2');assert.equal(slot.textContent,'SLOT 2 · FRONT');
 assert.ok(slot['aria-label'].includes('REQUIRED'));assert.ok(walk(slot).some(n=>n.className==='required-slot-mark'));
 slot.onclick();assert.deepEqual(team.slots,['P1','P3','P5']);
});

test('declared viewport row budget keeps header, matchup, bench and BATTLE within target landscape heights',()=>{
 // Deterministic CSS budget contract, not a browser or real-device geometry claim.
 // It catches adding fixed row height/gaps/padding that would push BATTLE below the viewport.
 const css=readFileSync(new URL('../src/roster/style.css',import.meta.url),'utf8');
 const rule=css.match(/\.team-page \{([^}]+)\}/)[1],props=Object.fromEntries(rule.split(';').filter(x=>x.includes(':')).map(x=>x.trim().split(':')));
 const rows=props['grid-template-rows'].match(/^(\d+)px minmax\((\d+)px,1fr\) (\d+)px (\d+)px$/).slice(1).map(Number),gap=parseFloat(props.gap),top=parseFloat(props['padding-top']);
 const bottomMin=parseFloat(props['padding-bottom'].match(/max\((\d+)px/)[1]);
 for(const [w,h,bottomInset] of [[667,320,0],[844,320,21],[740,360,21],[844,390,21],[932,430,21]]) {
  const fixed=rows[0]+rows[2]+rows[3]+gap*3+top+Math.max(bottomMin,bottomInset),upper=h-fixed;
  assert.ok(upper>=rows[1],`${w}×${h}: all four rows must fit`);
  assert.ok(rows[0]>=44 && rows[3]>=44,'BACK and BATTLE retain touch-height budget');
  assert.ok(fixed+upper<=h);
 }
});
