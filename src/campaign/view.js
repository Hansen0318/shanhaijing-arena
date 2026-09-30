import { orderedChapters } from './data.js';
import { chapterStatus } from './progression.js';
const asset=path => `${import.meta.env.BASE_URL}${path}`;
function card({image,label,status,selected=false,onClick}) {
 const button=document.createElement('button'); button.type='button'; button.className=`campaign-card ${status}${selected?' selected':''}`;
 button.disabled=status==='locked'; button.dataset.status=status; button.setAttribute('aria-label',`${label} ${status}`);
 const picture=document.createElement('div'); picture.className='card-picture';
 const img=document.createElement('img'); img.src=asset(image); img.alt=label; picture.append(img);
 if(status==='locked') {
  const lock=document.createElement('span'); lock.className='lock'; lock.setAttribute('aria-hidden','true');
  lock.innerHTML='<svg viewBox="0 0 40 48"><path d="M10 20v-7a10 10 0 0 1 20 0v7" fill="none" stroke="currentColor" stroke-width="5"/><rect x="3" y="19" width="34" height="27" rx="4" fill="currentColor"/><circle cx="20" cy="31" r="3" fill="#243543"/><path d="M20 32v6" stroke="#243543" stroke-width="3"/></svg>';
  picture.append(lock);
 }
 if(status==='cleared') {const badge=document.createElement('span'); badge.className='clear-badge'; badge.textContent='CLEAR';picture.append(badge);}
 const text=document.createElement('span'); text.className='card-label'; text.textContent=label;
 button.append(picture,text); button.addEventListener('click',onClick); return button;
}
export class CampaignView {
 constructor(root,controller,{onStart}={}) {this.root=root;this.controller=controller;this.onStart=onStart;}
 render() {
  this.root.replaceChildren(); this.root.hidden=false;
  const page=document.createElement('section'); page.className='campaign-page';
  const heading=document.createElement('h1'); heading.textContent='CHAPTER SELECT';page.append(heading);
  const grid=document.createElement('div');grid.className='chapter-grid';
  for(const chapter of orderedChapters()) grid.append(card({image:chapter.thumbnail,label:chapter.title,status:chapterStatus(this.controller.progress,chapter.chapterId),onClick:()=>{if(this.controller.openChapter(chapter.chapterId)) this.render();}}));
  page.append(grid);this.root.append(page);
 }
}
export { card, asset };
