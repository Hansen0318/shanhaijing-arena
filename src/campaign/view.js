import { orderedChapters, findChapter, findStage, orderedStages } from './data.js';
import { chapterStatus, stageStatus } from './progression.js';
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
  if(this.controller.screen==='stages') { this.renderStages(page); this.root.append(page); return; }
  const heading=document.createElement('h1'); heading.textContent='CHAPTER SELECT';page.append(heading);
  const grid=document.createElement('div');grid.className='chapter-grid';
  for(const chapter of orderedChapters()) grid.append(card({image:chapter.thumbnail,label:chapter.title,status:chapterStatus(this.controller.progress,chapter.chapterId),onClick:()=>{if(this.controller.openChapter(chapter.chapterId)) this.render();}}));
  page.append(grid);this.root.append(page);
 }
 renderStages(page) {
  page.classList.add('stage-page');
  const chapter=findChapter(this.controller.chapterId), stage=findStage(this.controller.selectedStageId);
  const header=document.createElement('header'); header.className='stage-header';
  const back=document.createElement('button');back.type='button';back.className='campaign-button back';back.textContent='← BACK / 返回';
  back.onclick=()=>{if(this.controller.back()) this.render();};
  const heading=document.createElement('h1');heading.textContent=chapter.title;header.append(back,heading);page.append(header);
  const preview=document.createElement('div');preview.className='stage-preview';
  const image=document.createElement('img');image.src=asset(stage.previewImage);image.alt=`Stage ${stage.stageId} preview`;image.dataset.stageId=stage.stageId;
  const details=document.createElement('div');details.className='preview-details';
  const id=document.createElement('h2');id.textContent=stage.stageId;
  const title=document.createElement('p');title.textContent=stage.title;
  const start=document.createElement('button');start.type='button';start.className='campaign-button start';start.textContent='START / 開始戰鬥';
  start.disabled=stageStatus(this.controller.progress,stage.stageId)==='locked';
  start.onclick=()=>{const config=this.controller.startBattle();if(config) this.onStart?.(config);};
  details.append(id,title,start);preview.append(image,details);page.append(preview);
  const cards=document.createElement('div');cards.className='stage-grid';cards.setAttribute('aria-label','Stages');
  for(const item of orderedStages(chapter)) cards.append(card({image:item.previewImage,label:item.stageId,status:stageStatus(this.controller.progress,item.stageId),selected:item.stageId===stage.stageId,onClick:()=>{if(this.controller.selectStage(item.stageId)) this.render();}}));
  page.append(cards);
 }
}
export { card, asset };
