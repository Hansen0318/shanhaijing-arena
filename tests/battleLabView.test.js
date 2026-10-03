import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {BattleLabController} from '../src/dev/battleLab/controller.js';
import {BattleLabView} from '../src/dev/battleLab/view.js';
function element(tag){return {tag,children:[],dataset:{},style:{},attributes:{},append(...x){this.children.push(...x);},replaceChildren(...x){this.children=x;},setAttribute(k,v){this.attributes[k]=v;},focus(){},classList:{add(){}},};}
const walk=n=>[n,...n.children.flatMap(walk)];
test('Lab menu renders all formal roster slots/options/presets and START delegates only immutable local config',()=>{
 const old=globalThis.document;globalThis.document={createElement:element};try{const c=new BattleLabController(),root=element('main');let config,renders=0;const v=new BattleLabView(root,c,{onStart:x=>config=x,onRender:()=>renders++});v.render();
 const controls=walk(root).filter(x=>x.tag==='select');assert.equal(controls.length,12);for(const select of controls.slice(1,7)){assert.equal(select.children.length,5);assert.ok(select.children.some(x=>x.textContent.includes('赤鱬')));}
 const preset=controls[0];preset.value='heal';preset.onchange();assert.equal(c.draft.scenarioId,'heal');
 const ally=walk(root).find(x=>x.attributes['aria-label']==='ALLY TEAM slot 1');ally.value='P3';ally.onchange();assert.equal(c.draft.allyTeam[0],'P3');
 const mode=walk(root).find(x=>x.attributes['aria-label']==='Control mode');mode.value='ai';mode.onchange();assert.equal(c.draft.controlMode,'ai');
 const skip=walk(root).find(x=>x.attributes['aria-label']==='Skip countdown');skip.checked=true;skip.onchange();
 walk(root).find(x=>x.tag==='button'&&x.textContent==='START').onclick();assert.equal(config.kind,'battle-lab');assert.equal(config.options.skipCountdown,true);assert.equal(config.options.controlMode,'ai');assert.ok(renders>=2);
 }finally{globalThis.document=old;}
});
test('Lab view/loader dependency surface excludes eager Phaser and includes safe-area/fluid layout',()=>{
 const css=readFileSync('src/dev/battleLab/style.css','utf8');for(const edge of ['top','right','bottom','left'])assert.ok(css.includes(`env(safe-area-inset-${edge})`));assert.match(css,/minmax\(0,1fr\)/);assert.match(css,/min-height:44px/);assert.match(css,/overflow-y:auto/);
 assert.doesNotMatch(readFileSync('src/dev/battleLab/view.js','utf8'),/phaser|ArenaScene|battleRuntime|persistence/i);
});
