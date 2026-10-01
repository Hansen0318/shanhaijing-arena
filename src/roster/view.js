import { rosterCatalog } from './catalog.js';
import { typeMark } from './typeIcons.js';
import { stageEnemyDefinitions } from '../campaign/encounterDefinitions.js';
const titleCase=text=>text[0].toUpperCase()+text.slice(1);
export function renderTeamSelect(page,team,{document:doc=globalThis.document,stageId,onChange,onBattle,onBack}={}) {
 const node=(tag,text,className)=>{const el=doc.createElement(tag);if(text!=null)el.textContent=text;if(className)el.className=className;return el;};
 const button=(text,handler,className='campaign-button')=>{const el=node('button',text,className);el.type='button';el.onclick=handler;return el;};
 const identity=(character)=>{
  const mark=typeMark(character),label=node('strong',null,'matchup-identity');
  const icon=node('span',mark.symbol,'type-mark');icon.style.color=mark.color;
  icon.setAttribute('aria-label',`Type: ${mark.label}`);icon.dataset.type=character.type;
  label.append(icon,node('span',character.name));return label;
 };
 const portrait=character=>{const p=node('span',character.portrait?.label??character.name,'matchup-portrait');p.style.backgroundColor=character.portrait?.color??'#c9764c';return p;};
 page.className+=' team-page';
 const header=node('header',null,'stage-header');
 header.append(button('BACK',()=>onBack?.(),'campaign-button back'),node('h1','SELECT TEAM'),node('span',`Stage ${stageId}`,'team-stage'));
 const matchup=node('div',null,'team-matchup'),allies=node('section',null,'matchup-side');
 allies.append(node('h2','YOUR TEAM'));
 const slots=node('div',null,'team-slots');slots.setAttribute('aria-label','Battle slots');
 for(const [index,id] of team.slots.entries()) {
  const required=(team.stage.forcedCharacters ?? []).includes(id);
  const slot=button(`SLOT ${index+1}${index===1?' · FRONT':''}${required?' · REQUIRED':''}`,()=>{if(team.remove(index))onChange?.();},'team-slot');
  slot.dataset.slot=String(index+1);slot.setAttribute('aria-label',slot.textContent);
  if(id){const character=rosterCatalog[id];slot.style.borderColor=character.portrait.color;slot.className+=' occupied';slot.dataset.type=character.type;slot.append(portrait(character),identity(character));}
  else slot.append(node('span','EMPTY','empty-slot'));
  slots.append(slot);
 }
 allies.append(slots);
 const enemies=node('section',null,'matchup-side enemy-side'),enemyCards=node('div',null,'enemy-slots');
 enemies.append(node('h2','ENEMY TEAM'));
 const enemyDefinitions=team.stage.enemyLineup?stageEnemyDefinitions(team.stage):[];
 for(const [index,character] of enemyDefinitions.entries()) {
  const card=node('div',`E${index+1}${index===1?' · FRONT':''}`,'enemy-slot');
  card.dataset.enemyId=character.id;card.dataset.type=character.type;
  card.append(portrait(character),identity(character));enemyCards.append(card);
 }
 enemies.append(enemyCards);matchup.append(allies,node('strong','VS','matchup-vs'),enemies);
 const roster=node('div',null,'roster-grid');roster.setAttribute('aria-label','Available roster');
 for(const id of team.available) {
  const character=rosterCatalog[id],selected=team.slots.includes(id);
  const card=button(null,()=>{if(team.toggle(id))onChange?.();},`roster-card${selected?' selected':''}`);
  card.dataset.characterId=id;card.setAttribute('aria-label',`${character.name}, ${titleCase(character.type)}, ${titleCase(character.role)}`);
  card.setAttribute('aria-pressed',String(selected));
  const portrait=node('span',character.portrait.label,'roster-portrait');portrait.style.backgroundColor=character.portrait.color;
  const name=identity(character),type=node('span',`Type: ${titleCase(character.type)}`),role=node('span',`Role: ${titleCase(character.role)}`);
  card.append(portrait,name,type,role);roster.append(card);
 }
 const footer=node('footer',null,'team-footer');
 const battle=button('BATTLE',()=>{if(team.canBattle)onBattle?.();},'campaign-button start battle');battle.disabled=!team.canBattle;
 const count=team.slots.filter(Boolean).length;
 const status=node('p',team.canBattle?'3 / 3 READY':`${count} / 3 — Select a valid team of 3`,'team-status');status.setAttribute('aria-live','polite');
 footer.append(status,battle);page.append(header,matchup,roster,footer);
}
