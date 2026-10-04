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
 assert.equal(walk(page).some(n=>n.className==='team-status'),false);
 assert.ok(walk(page).find(n=>n.textContent==='BACK').className.includes('screen-back'));
});
test('forced front slot keeps short formation identity and accessible REQUIRED metadata without a taller title',()=>{
 const page=element('section'),team=new TeamSelection({stage:{...findStage('1-1'),forcedCharacters:['P3']},saved:['P1','P3','P5']});
 renderTeamSelect(page,team,{document:{createElement:element},stageId:'1-1'});
 const slot=walk(page).find(n=>n.dataset.slot==='2');assert.equal(walk(slot).find(n=>n.className==='slot-caption').textContent,'SLOT 2 · FRONT');
 assert.ok(slot['aria-label'].includes('REQUIRED'));assert.ok(walk(slot).some(n=>n.className==='required-slot-mark'));
 slot.onclick();assert.deepEqual(team.slots,['P1','P3','P5']);
});

test('declared row budget reserves lower BACK space while fitting flexible upper lineup and information cards',()=>{
 const css=readFileSync(new URL('../src/roster/style.css',import.meta.url),'utf8');
 const rules=[...css.matchAll(/\.team-page \{([^}]+)\}/g)].map(m=>m[1]);
 const rows=rules.map(r=>r.match(/grid-template-rows:(\d+)px minmax\((\d+)(?:px)?,1fr\) (\d+)px (\d+)px/).slice(1).map(Number));
 assert.ok(rows.every(row=>row[1]===0),'upper preview flexes with the viewport instead of forcing outer scroll');
 for(const [w,h,bottomInset] of [[667,320,0],[844,320,21],[740,356,21],[740,360,21],[844,390,21],[932,430,21]]) {
  const index=h<=356?2:h<=420?1:0,rule=rules[index],props=Object.fromEntries(rule.split(';').filter(x=>x.includes(':')).map(x=>x.trim().split(':'))),row=rows[index];
  const gap=parseFloat(props.gap),top=parseFloat(props['padding-top']),bottomMin=Number(props['padding-bottom'].match(/max\((\d+)px/)[1]),safeReserve=Number(props['padding-bottom'].match(/bottom\) \+ (\d+)px/)[1]);
  // Shared non-landing rule has higher specificity and reserves at least 66px / inset+54px.
  const bottom=Math.max(66,bottomInset+54,bottomMin,bottomInset+safeReserve);
  const upper=h-row[0]-row[2]-row[3]-gap*3-top-bottom;
  assert.ok(upper>0,`${w}×${h}: all four rows plus BACK reserve fit`);
  assert.ok(row[3]>=36);assert.match(rule,/overflow:hidden/);
 }
 assert.match(css,/\.roster-portrait \{[^}]*aspect-ratio:1/);
 assert.match(css,/object-fit:contain !important;transform:scale\(\.98\);transform-origin:50% 50%/);
 assert.match(css,/\.team-footer \{[^}]*justify-content:flex-end/);
 assert.match(css,/\.team-footer \.battle \{[^}]*width:auto;min-width:112px/);
});

test('overlapping full-body slot boxes stay within each team container instead of creating root horizontal scroll',()=>{
 const css=readFileSync(new URL('../src/roster/style.css',import.meta.url),'utf8'),slots=css.match(/\.team-slots,\.enemy-slots \{([^}]+)\}/)[1],figure=css.match(/\.team-slot,\.enemy-slot \{([^}]+)\}/)[1];
 const basis=Number(figure.match(/flex:0 0 ([\d.]+)%/)[1])/100,overlap=Number(figure.match(/margin-inline:-([\d.]+)%/)[1])/100;
 const padding=Number(slots.match(/padding:0(?: ([\d.]+)%)?/)[1]??0)/100;
 // Three boxes, four internal negative margins; outer negative edges still occupy visual space.
 assert.ok((1-2*padding)*(3*basis-4*overlap)<=1,'overlap must fit without hiding/cropping the figure');
});
