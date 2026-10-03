import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {CampaignController} from '../src/campaign/controller.js';
import {CampaignView} from '../src/campaign/view.js';
import {getTypeMultiplier} from '../src/combat/typeMultiplier.js';
function element(tag){const n={tag,children:[],dataset:{},style:{},attributes:{},className:'',append(...x){this.children.push(...x);},replaceChildren(...x){this.children=x;},setAttribute(k,v){this.attributes[k]=v;},addEventListener(k,f){this['on'+k]=f;},focus(){this.focused=true;}};n.classList={add(x){n.className+=' '+x;}};return n;}
const walk=n=>[n,...n.children.flatMap(walk)],find=(n,p)=>walk(n).find(p);
const copy=n=>walk(n).map(n=>n.textContent??'').join(' ');
function fixture(fn){const old=globalThis.document;globalThis.document={createElement:element};try{const c=new CampaignController(),root=element('main');c.openLanding();const view=new CampaignView(root,c);view.render();fn({c,root,view});}finally{globalThis.document=old;}}
const click=(root,label)=>{const b=find(root,n=>n.tag==='button'&&n.textContent===label);assert.ok(b,`${label} exists`);b.onclick();};
test('Landing INFO sibling opens exactly three hub entries; hub BACK restores Landing',()=>fixture(({c,root})=>{
 assert.deepEqual(walk(root).filter(n=>n.tag==='button').map(n=>n.textContent),['BATTLE','COLLECTION','INFO']);click(root,'INFO');assert.equal(c.screen,'info');assert.equal(root.children[0].lang,'en');assert.equal(find(root,n=>n.tag==='h1').focused,true);assert.deepEqual(walk(root).filter(n=>n.tag==='button').map(n=>n.textContent),['BACK','GAME GUIDE','WORLD','TYPE MATCHUP']);click(root,'BACK');assert.equal(c.screen,'landing');assert.equal(find(root,n=>n.tag==='button'&&n.textContent==='INFO').focused,true);
}));
for(const [label,id] of [['GAME GUIDE','guide'],['WORLD','world'],['TYPE MATCHUP','types']])test(`${label} renders media and returns to hub without progression/team/battle mutation`,()=>fixture(({c,root})=>{
 let writes=0;c.persistence={save(){writes++;}};c.teamPersistence={save(){writes++;}};c.acquisitionPersistence={save(){writes++;}};
 const snapshot=()=>JSON.stringify(Object.fromEntries(Object.entries(c).filter(([k])=>!['screen','infoPageId'].includes(k))));const before=snapshot();
 click(root,'INFO');click(root,label);assert.equal(c.screen,'info-page');assert.equal(c.infoPageId,id);assert.equal(root.children[0].lang,'en');assert.equal(find(root,n=>n.tag==='h1').focused,true);assert.ok(find(root,n=>n.className==='info-media'));click(root,'BACK');assert.equal(c.screen,'info');click(root,'BACK');assert.equal(c.screen,'landing');assert.equal(snapshot(),before);assert.equal(writes,0);
}));
test('INFO routes reject invalid subpages and cannot interrupt Campaign/Team/Battle/Result',()=>{
 const c=new CampaignController();assert.equal(c.openInfo(),false);c.openLanding();assert.equal(c.openInfoPage('guide'),false);c.openInfo();assert.equal(c.openInfoPage('missing'),false);assert.equal(c.screen,'info');c.back();c.openBattleMenu();c.openChapter('chapter-1');assert.equal(c.openInfo(),false);c.openTeamSelect();assert.equal(c.openInfo(),false);for(const id of ['P1','P2','P3'])c.teamSelection.toggle(id);c.startBattle();assert.equal(c.openInfo(),false);assert.equal(c.openInfoPage('world'),false);c.finishBattle('1-1','defeat');assert.equal(c.openInfo(),false);
});
test('type triangle has only icons/arrows and explanation matches unchanged runtime',()=>fixture(({root})=>{
 click(root,'INFO');click(root,'TYPE MATCHUP');const triangle=find(root,n=>n.className==='type-triangle');assert.ok(triangle);assert.equal(copy(triangle).trim().replaceAll(/\s+/g,''),'◆✦➤');assert.doesNotMatch(copy(triangle),/Power|Speed|Blast/i);
 const icons=walk(triangle).filter(n=>n.dataset.type);assert.deepEqual(icons.map(n=>[n.dataset.type,n.dataset.position]),[['power','top'],['blast','bottom-left'],['speed','bottom-right']]);
 const arrows=find(triangle,n=>n.className==='type-arrows');assert.ok(arrows.innerHTML.includes('viewBox="0 0 300 220"'));assert.equal((arrows.innerHTML.match(/data-from=/g)??[]).length,3);
 for(const text of ['Power beats Speed','Speed beats Blast','Blast beats Power','Advantage ×1.15','Disadvantage ×0.85','Same Type ×1.00'])assert.ok(copy(root).includes(text));
 for(const [a,b] of [['power','speed'],['speed','blast'],['blast','power']]){assert.equal(getTypeMultiplier(a,b),1.15);assert.equal(getTypeMultiplier(b,a),0.85);assert.equal(getTypeMultiplier(a,a),1);}
}));
test('guide documents live controls/win/shards/Tier without future mechanics; world is compact premise',()=>fixture(({root})=>{
 click(root,'INFO');click(root,'GAME GUIDE');for(const text of ['3v3','AI','joystick','Basic','Heavy','Special','Awakening','immediately','KO','90-second','HP%','shards','automatically at T0','T0 → T1 → T2 → T3'])assert.ok(copy(root).includes(text),text);assert.doesNotMatch(copy(root),/dodge button|stamina|equipment|advanced Tier/i);
 click(root,'BACK');click(root,'WORLD');for(const text of ['Classic of Mountains and Seas','山海經','mountains','waters','three','shards','recruit'])assert.ok(copy(root).includes(text),text);
}));
test('INFO dependency surface and styles preserve lazy battle + safe-area/short-height layout',()=>{
 const view=readFileSync(new URL('../src/info/view.js',import.meta.url),'utf8'),data=readFileSync(new URL('../src/info/data.js',import.meta.url),'utf8'),css=readFileSync(new URL('../src/info/style.css',import.meta.url),'utf8');assert.doesNotMatch(view+data,/phaser|ArenaScene|battleRuntime|modulepreload/i);
 for(const edge of ['top','right','bottom','left'])assert.ok(css.includes(`env(safe-area-inset-${edge})`));assert.match(css,/minmax\(0,1fr\)/);assert.match(css,/overflow-y:auto/);assert.match(css,/min-height:44px/);assert.match(css,/max-height:420px/);assert.doesNotMatch(css,/animation\s*:|transition\s*:/);
});
