import test from 'node:test';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import { TeamSelection } from '../src/roster/team.js';
import { renderTeamSelect } from '../src/roster/view.js';
import { findStage } from '../src/campaign/data.js';
const element=tag=>({tag,children:[],dataset:{},style:{},className:'',append(...nodes){this.children.push(...nodes);},setAttribute(k,v){this[k]=v;}});
const walk=n=>[n,...n.children.flatMap(walk)];
test('upper matchup retires formal slot captions and retains all six accessible identities',()=>{
 const page=element('section'),team=new TeamSelection({stage:findStage('1-1'),saved:['P1','P3','P5']});
 renderTeamSelect(page,team,{document:{createElement:element},stageId:'1-1'});
 const upper=walk(page).find(n=>n.className==='team-matchup');
 const nodes=walk(upper);
 assert.equal(nodes.filter(n=>n.className==='type-mark').length,0);
 assert.deepEqual(nodes.filter(n=>n.dataset.slot).map(n=>walk(n).find(c=>c.className==='slot-caption')?.textContent),[undefined,undefined,'SLOT 3']);
 assert.deepEqual(nodes.filter(n=>n.dataset.enemyId).map(n=>walk(n).find(c=>c.className==='slot-caption')?.textContent),['E1',undefined,undefined]);
 assert.equal(nodes.filter(n=>n.className==='lineup-figure').length,6);
 assert.equal(nodes.filter(n=>n.className==='matchup-identity').length,2);
 assert.ok(walk(page).some(n=>n.textContent==='BATTLE'));
 assert.equal(walk(page).some(n=>n.className==='team-status'),false);
 assert.ok(walk(page).find(n=>n.textContent==='BACK').className.includes('screen-back'));
});
test('forced front slot keeps short formation identity and accessible REQUIRED metadata without a taller title',()=>{
 const page=element('section'),team=new TeamSelection({stage:{...findStage('1-1'),forcedCharacters:['P3']},saved:['P1','P3','P5']});
 renderTeamSelect(page,team,{document:{createElement:element},stageId:'1-1'});
 const slot=walk(page).find(n=>n.dataset.slot==='2');assert.equal(walk(slot).find(n=>n.className==='slot-caption'),undefined);
 assert.ok(slot['aria-label'].includes('REQUIRED'));assert.ok(walk(slot).some(n=>n.className==='required-slot-mark'));
 slot.onclick();assert.deepEqual(team.slots,['P1','P3','P5']);
});

test('declared row budget reserves lower BACK space while fitting flexible upper lineup and information cards',()=>{
 const css=readFileSync(new URL('../src/roster/style.css',import.meta.url),'utf8');
 const rules=[...css.matchAll(/\.team-page \{([^}]+)\}/g)].map(m=>m[1]);
 const rows=rules.map(r=>r.match(/grid-template-rows:(\d+)px minmax\((\d+)(?:px)?,1fr\) (\d+)px/).slice(1).map(Number));
 assert.ok(rows.every(row=>row[1]===0),'upper preview flexes with the viewport instead of forcing outer scroll');
 for(const [w,h,bottomInset] of [[667,320,0],[844,320,21],[740,356,21],[740,360,21],[844,390,21],[932,430,21]]) {
  const index=h<=356?2:h<=420?1:0,rule=rules[index],props=Object.fromEntries(rule.split(';').filter(x=>x.includes(':')).map(x=>x.trim().split(':'))),row=rows[index];
  const gap=parseFloat(props.gap),top=parseFloat(props['padding-top']),bottomMin=Number(props['padding-bottom'].match(/max\((\d+)px/)[1]),safeReserve=0;
  // Team overrides the shared BACK reserve; controls sit beside the roster.
  const bottom=Math.max(bottomMin,bottomInset+safeReserve);
  const upper=h-row[0]-row[2]-gap*2-top-bottom;
  assert.ok(upper>0,`${w}×${h}: three rows fit beside bottom controls`);
  assert.match(rule,/overflow:hidden/);
 }
 assert.match(css,/\.roster-portrait \{[^}]*aspect-ratio:1/);
 assert.match(css,/object-fit:cover !important;transform:scale\(1\.22\);transform-origin:50% 38%/);
 assert.match(css,/\.team-footer \{[^}]*justify-content:flex-end/);
 assert.match(css,/\.team-footer \.battle \{[^}]*width:auto;min-width:112px/);
});

test('overlapping full-body slot boxes fit the available row without creating root horizontal scroll',()=>{
 const css=readFileSync(new URL('../src/roster/style.css',import.meta.url),'utf8'),slots=css.match(/\.team-slots,\.enemy-slots \{([^}]+)\}/)[1],figure=css.match(/\.team-slot,\.enemy-slot \{([^}]+)\}/)[1];
 const basis=Number(figure.match(/flex:0 0 ([\d.]+)%/)[1])/100,overlap=Number(figure.match(/margin-inline:-([\d.]+)%/)[1])/100;
 const padding=Number(slots.match(/padding:0(?: ([\d.]+)%)?/)[1]??0)/100;
 // All six margins participate in flex allocation; limited visual overhang fits the page inset.
 assert.ok(3*basis-6*overlap<=1,'three slots fit the flex row');
 for(const width of [667,844,932,1363]) {
  const teamWidth=(width-40-Math.min(82,Math.max(54,width*.08)))/2;
  const overhang=Math.max(0,overlap-padding)*teamWidth*(1-2*padding);
  assert.ok(overhang<20,'visible outer edge stays inside the page padding');
 }
});

test('Team bottom padding wins the shared BACK reserve so roster shares the controls bottom band',()=>{
 const css=readFileSync(new URL('../src/roster/style.css',import.meta.url),'utf8');
 const selectors=[...css.matchAll(/([^{}]+)\{[^{}]*grid-template-rows:[^{}]*padding-bottom:[^{}]*\}/g)].map(m=>m[1].trim());
 assert.equal(selectors.length,3);
 // The shared .campaign-page:not(.landing-page) has two class components.
 // Roster CSS is imported later, so equal or greater specificity wins at each height.
 for(const selector of selectors)assert.ok((selector.match(/\.[\w-]+/g)??[]).length>=2,`${selector} must beat the shared 66px BACK reserve`);
});

test('formal allies/enemies share unscaled full-body fit at every supported height; enemy mirror is preserved',()=>{
 const css=readFileSync(new URL('../src/roster/style.css',import.meta.url),'utf8');
 assert.match(css,/\.lineup-figure img\{[^}]*width:100% !important;[^}]*height:100% !important;[^}]*object-fit:contain !important;[^}]*transform:none/);
 assert.match(css,/\.enemy-slot \.lineup-figure img \{ transform:scaleX\(-1\); \}/);
 const fullBodyRules=[...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].filter(([,selector])=>selector.includes('.lineup-figure'));
 assert.ok(fullBodyRules.every(([,selector,body])=>! /transform:scale\(1\.[0-9]+\)/.test(body)),'full-body rules must not enlarge allies; compact portrait scale is independent');
});
