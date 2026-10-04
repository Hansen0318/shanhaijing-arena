import {INFO_PAGES,infoPage} from './data.js';
import {typeMark} from '../roster/typeIcons.js';
function node(tag,className,text){const n=document.createElement(tag);n.className=className;if(text)n.textContent=text;return n;}
function action(label,onClick){const button=node('button','campaign-button',label);button.type='button';button.onclick=onClick;return button;}
export function renderTypeTriangle(){
 const triangle=node('div','type-triangle');triangle.setAttribute('aria-hidden','true');
 const arrows=node('div','type-arrows');
 arrows.innerHTML='<svg viewBox="0 0 300 220" fill="none" stroke="currentColor" stroke-width="4" aria-hidden="true"><g data-from="power" data-to="speed"><path d="M179 54 L229 143"/><path d="M216 137 L229 143 L231 129"/></g><g data-from="speed" data-to="blast"><path d="M204 176 L96 176"/><path d="M108 168 L96 176 L108 184"/></g><g data-from="blast" data-to="power"><path d="M71 143 L121 54"/><path d="M108 60 L121 54 L123 68"/></g></svg>';
 triangle.append(arrows);
 for(const [type,position] of [['power','top'],['blast','bottom-left'],['speed','bottom-right']]){
  const icon=node('span',`type-triangle-icon ${type}`,typeMark({type}).symbol);icon.dataset.type=type;icon.dataset.position=position;triangle.append(icon);
 }
 return triangle;
}
export function renderInfo(page,{pageId=null,onBack,onOpen}){
 page.classList.add('info-page');page.lang='en';
 const definition=infoPage(pageId),header=node('header','info-header');
 const heading=node('h1','',definition?.title??'INFO');heading.tabIndex=-1;
 const back=action('BACK',onBack);back.classList.add('screen-back');header.append(back,heading);page.append(header);
 if(!definition){
  const hub=node('nav','info-hub');hub.setAttribute('aria-label','Information pages');
  for(const item of INFO_PAGES)hub.append(action(item.title,()=>onOpen(item.id)));page.append(hub);return heading;
 }
 const body=node('div','info-body'),media=node('figure','info-media');media.setAttribute('aria-label',definition.media+' region');
 if(definition.id==='types')media.append(renderTypeTriangle());
 else {const placeholder=node('div','info-placeholder');placeholder.setAttribute('aria-hidden','true');placeholder.append(node('span','info-placeholder-mark',definition.id==='world'?'△':'＋'));media.append(placeholder);}
 media.append(node('figcaption','info-media-caption',definition.media+' · placeholder'));
 const content=node('article','info-copy');
 if(definition.sections)for(const section of definition.sections){const block=node('section','info-section');block.append(node('h2','',section.heading),node('p','',section.text));content.append(block);}
 else {
  const relations=node('ul','info-relations');for(const text of definition.relations)relations.append(node('li','',text));
  const multipliers=node('ul','info-multipliers');for(const text of definition.multipliers)multipliers.append(node('li','',text));
  // Explanation follows the diagram in both DOM and visual order.
  const explanation=node('section','type-explanation');explanation.append(relations,multipliers,node('p','',definition.note));media.append(explanation);
 }
 body.append(media);if(definition.sections)body.append(content);else body.classList.add('info-types');page.append(body);return heading;
}
