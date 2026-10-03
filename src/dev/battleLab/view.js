import {rosterCatalog} from '../../roster/catalog.js';
import {LAB_SCENARIOS,labScenario} from './config.js';
const node=(tag,cls,text)=>{const n=document.createElement(tag);n.className=cls??'';if(text)n.textContent=text;return n;};
function choice(label,value,items,onChange){const wrapper=node('label','lab-field');wrapper.append(node('span','',label));const select=node('select');select.setAttribute('aria-label',label);for(const [id,title] of items){const option=node('option','',title);option.value=id;select.append(option);}select.value=value;select.onchange=()=>onChange(select.value);wrapper.append(select);return wrapper;}
export class BattleLabView{
 constructor(root,controller,{onStart,onRender}={}){this.root=root;this.controller=controller;this.onStart=onStart;this.onRender=onRender;}
 render(){
  const c=this.controller,d=c.draft;this.root.replaceChildren();const page=node('section','campaign-page lab-page');page.lang='en';
  const header=node('header','lab-header');header.append(node('h1','','DEV BATTLE LAB'),node('small','','DEV ONLY · NO SAVE WRITES'));page.append(header);
  const body=node('div','lab-body');body.append(choice('Scenario',d.scenarioId,LAB_SCENARIOS.map(s=>[s.id,s.title]),id=>{if(c.setScenario(id))this.render();}));
  body.append(node('p','lab-description',labScenario(d.scenarioId).description));
  const teams=node('div','lab-teams');for(const [side,title,key] of [['allies','ALLY TEAM','allyTeam'],['enemies','ENEMY TEAM','enemyTeam']]){
   const group=node('fieldset','lab-team');group.append(node('legend','',title));const slots=node('div','lab-slots');
   for(let i=0;i<3;i++)slots.append(choice(`${title} slot ${i+1}`,d[key][i],Object.values(rosterCatalog).map(r=>[r.id,`${r.name} · ${r.type}`]),id=>c.setTeam(side,i,id)));group.append(slots);teams.append(group);
  }body.append(teams);
  const options=node('div','lab-options');
  options.append(choice('Initial ally HP',d.hpRatio===null?'preset':String(d.hpRatio),[['preset','PRESET'],['1','100%'],['0.5','50%'],['0.25','25%']],value=>c.setOption('hpRatio',value==='preset'?null:Number(value))));
  options.append(choice('Control mode',d.controlMode,[['manual','MANUAL ENABLED'],['ai','AI ONLY']],value=>c.setOption('controlMode',value)));
  const typeCase=choice('Type case',d.typeCase,[['advantage','ADVANTAGE ×1.15'],['disadvantage','DISADVANTAGE ×0.85'],['same','SAME TYPE ×1.00']],value=>{c.setOption('typeCase',value);this.render();});typeCase.children[1].disabled=!labScenario(d.scenarioId).typeCases;options.append(typeCase);
  for(const [key,title] of [['skipCountdown','Skip countdown'],['allSkillsReady','All skills ready']]){const label=node('label','lab-toggle');const input=node('input');input.type='checkbox';input.checked=d[key];input.setAttribute('aria-label',title);input.onchange=()=>c.setOption(key,input.checked);label.append(input,node('span','',title));options.append(label);}body.append(options);
  body.append(node('small','lab-note','HP override applies to allies. Duplicate slots are allowed here only. Formal initial skills are already ready; All skills ready explicitly resets this session’s H/S/A slots.'));
  const start=node('button','campaign-button battle','START');start.type='button';start.onclick=()=>{const config=c.startBattle();if(config)this.onStart?.(config);};
  page.append(body,start);this.root.append(page);this.onRender?.();
 }
}
