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
 assert.deepEqual(nodes.filter(n=>n.dataset.slot).map(n=>walk(n).find(c=>c.className==='slot-caption').textContent),['SLOT 1','SLOT 2 · FRONT','SLOT 3']);
 assert.deepEqual(nodes.filter(n=>n.dataset.enemyId).map(n=>walk(n).find(c=>c.className==='slot-caption').textContent),['E1','E2 · FRONT','E3']);
 assert.equal(nodes.filter(n=>n.className==='lineup-figure').length,6);
 assert.equal(nodes.filter(n=>n.className==='matchup-identity').length,4);
 assert.ok(walk(page).some(n=>n.textContent==='BATTLE'));
});
test('forced front slot keeps short formation identity and accessible REQUIRED metadata without a taller title',()=>{
 const page=element('section'),team=new TeamSelection({stage:{...findStage('1-1'),forcedCharacters:['P3']},saved:['P1','P3','P5']});
 renderTeamSelect(page,team,{document:{createElement:element},stageId:'1-1'});
 const slot=walk(page).find(n=>n.dataset.slot==='2');assert.equal(walk(slot).find(n=>n.className==='slot-caption').textContent,'SLOT 2 · FRONT');
 assert.ok(slot['aria-label'].includes('REQUIRED'));assert.ok(walk(slot).some(n=>n.className==='required-slot-mark'));
 slot.onclick();assert.deepEqual(team.slots,['P1','P3','P5']);
});

test('declared viewport row budget keeps header, matchup, bench and BATTLE within target landscape heights',()=>{
 // Deterministic CSS budget contract, not a browser or real-device geometry claim.
 // It catches adding fixed row height/gaps/padding that would push BATTLE below the viewport.
 const css=readFileSync(new URL('../src/roster/style.css',import.meta.url),'utf8');
 const rules=[...css.matchAll(/\.team-page \{([^}]+)\}/g)].map(m=>m[1]);
 const rows=rules.map(r=>r.match(/grid-template-rows:(\d+)px minmax\((\d+)px,1fr\) (\d+)px (\d+)px/).slice(1).map(Number));
 assert.equal(rows[0][1],150);assert.equal(rows[1][1],132);
 for(const [w,h,bottomInset] of [[667,320,0],[844,320,21],[740,356,21],[740,360,21],[844,390,21],[932,430,21]]) {
  const index=h<=356&&rules.length>2?2:h<=420?1:0,rule=rules[index],props=Object.fromEntries(rule.split(';').filter(x=>x.includes(':')).map(x=>x.trim().split(':'))),selectedRows=rows[index];
  const gap=parseFloat(props.gap),top=parseFloat(props['padding-top']),bottomMin=parseFloat(props['padding-bottom'].match(/max\((\d+)px/)[1]);
  const fixed=selectedRows[0]+selectedRows[2]+selectedRows[3]+gap*3+top+Math.max(bottomMin,bottomInset),upper=h-fixed;
  assert.ok(upper>=selectedRows[1],`${w}×${h}: all four rows must fit without reducing the accepted upper minimum`);
  assert.ok(selectedRows[0]>=44&&selectedRows[3]>=36,'BACK and compact BATTLE retain their control budget');
  assert.ok(fixed+upper<=h);
 }
});
