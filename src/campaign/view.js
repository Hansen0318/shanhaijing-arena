import {bindMenuImage} from '../assets/menuImage.js';
import {resolvePreview,assetUrl} from '../assets/resolver.js';
import {renderInfo} from '../info/view.js';
import { CollectionView } from '../collection/view.js';
import { stageRewardRows } from '../acquisition/presentation.js';
import { orderedChapters, findChapter, findStage, orderedStages } from './data.js';
import { chapterStatus, stageStatus } from './progression.js';
import { renderTeamSelect } from '../roster/view.js';
const asset=path=>assetUrl(resolvePreview(path));
function card({image,label,status,selected=false,onClick}) {
 const button=document.createElement('button'); button.type='button'; button.className=`campaign-card ${status}${selected?' selected':''}`;
 button.disabled=status==='locked'; button.dataset.status=status; button.setAttribute('aria-label',`${label} ${status}`);
 const picture=document.createElement('div'); picture.className='card-picture';
 const img=document.createElement('img'); bindMenuImage(img,resolvePreview(image)); img.alt=label; picture.append(img);
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
 constructor(root,controller,{onStart,onRender,onViewportChange}={}) {this.root=root;this.controller=controller;this.onStart=onStart;this.onRender=onRender;this.onViewportChange=onViewportChange;}
 render() {
  this.collectionView?.rememberPosition();
  this.root.replaceChildren(); this.root.hidden=false;
  const page=document.createElement('section'); page.className='campaign-page';
  if(this.controller.screen==='landing') {
   page.classList.add('landing-page');
   const backdrop=document.createElement('div');backdrop.className='landing-backdrop';backdrop.setAttribute('aria-hidden','true');
   for(const layer of ['sun','ridge distant','ridge near']){const shape=document.createElement('span');shape.className=`landing-${layer}`;backdrop.append(shape);}
   const content=document.createElement('div');content.className='landing-content';
   const identity=document.createElement('header');identity.className='landing-identity';
   const eyebrow=document.createElement('p');eyebrow.className='landing-eyebrow';eyebrow.textContent='CLASSIC OF MOUNTAINS AND SEAS';
   const title=document.createElement('h1');title.textContent='SHANHAIJING ARENA';
   const subtitle=document.createElement('p');subtitle.className='landing-subtitle';subtitle.textContent='MYTHS ENTER THE ARENA';identity.append(eyebrow,title,subtitle);
   const entries=document.createElement('nav');entries.className='landing-entries';entries.setAttribute('aria-label','Game modes');
   for(const [label,open] of [['BATTLE',()=>this.controller.openBattleMenu()],['COLLECTION',()=>this.controller.openCollection()],['INFO',()=>this.controller.openInfo()]]) {
    const button=document.createElement('button');button.type='button';button.className=`campaign-button landing-${label==='BATTLE'?'primary':'secondary'}`;button.textContent=label;button.onclick=()=>{if(open())this.render();};entries.append(button);if(label==='INFO')this.landingInfoButton=button;
   }
   const footer=document.createElement('small');footer.className='landing-footer';footer.textContent='山海經 · ARENA';
   content.append(identity,entries);page.append(backdrop,content,footer);this.root.append(page);this.onRender?.();return;
  }
  if(['info','info-page'].includes(this.controller.screen)){
   const heading=renderInfo(page,{pageId:this.controller.infoPageId,onBack:()=>{const toLanding=this.controller.screen==='info';if(this.controller.back()){this.render();if(toLanding)this.landingInfoButton.focus();}},onOpen:id=>{if(this.controller.openInfoPage(id))this.render();}});
   this.root.append(page);heading.focus();this.onRender?.();return;
  }
  if(this.controller.screen==='collection') {
   this.collectionView ??= new CollectionView(this.controller,{onViewportChange:()=>this.onViewportChange?.(),onBack:()=>{if(this.controller.back())this.render();}});
   this.root.append(page);this.collectionView.mount(page);this.onRender?.();return;
  }
  if(this.controller.screen==='team') {
   this.controller.refreshTeamOwnership();
   if(this.filterTeam!==this.controller.teamSelection){this.filterTeam=this.controller.teamSelection;this.teamFilter='all';}
   renderTeamSelect(page,this.controller.teamSelection,{stageId:this.controller.selectedStageId,tierByCharacterId:this.controller.acquisition.tierByCharacterId,filter:this.teamFilter,onFilter:type=>{this.teamFilter=type;this.render();},
    onBack:()=>{if(this.controller.back())this.render();},onChange:()=>this.render(),
    onBattle:()=>{const config=this.controller.startBattle();if(config)this.onStart?.(config);},
   });
   this.root.append(page);this.onRender?.();return;
  }
  if(this.controller.screen==='stages') { this.renderStages(page); this.root.append(page); this.onRender?.(); return; }
  const heading=document.createElement('h1'); heading.textContent='CHAPTER SELECT';
  const header=document.createElement('header');header.className='stage-header';
  const back=document.createElement('button');back.type='button';back.className='campaign-button';back.textContent='BACK';back.dataset.action='chapters-back';back.onclick=()=>{if(this.controller.back())this.render();};header.append(back,heading);page.append(header);
  const grid=document.createElement('div');grid.className='chapter-grid';
  for(const chapter of orderedChapters()) grid.append(card({image:chapter.thumbnail,label:chapter.title,status:chapterStatus(this.controller.progress,chapter.chapterId),onClick:()=>{if(this.controller.openChapter(chapter.chapterId)) this.render();}}));
  page.append(grid);this.root.append(page);this.onRender?.();
 }
 renderStages(page) {
  page.classList.add('stage-page');
  const chapter=findChapter(this.controller.chapterId), stage=findStage(this.controller.selectedStageId);
  const header=document.createElement('header'); header.className='stage-header';
  const back=document.createElement('button');back.type='button';back.className='campaign-button back';back.textContent='BACK';
  back.onclick=()=>{if(this.controller.back()) this.render();};
  const heading=document.createElement('h1');heading.textContent=chapter.title;header.append(back,heading);page.append(header);
  const preview=document.createElement('div');preview.className='stage-preview';
  const image=document.createElement('img');bindMenuImage(image,resolvePreview(stage.previewImage));image.alt=`Stage ${stage.stageId} preview`;image.dataset.stageId=stage.stageId;
  const details=document.createElement('div');details.className='preview-details';
  const id=document.createElement('h2');id.textContent=stage.stageId;
  const title=document.createElement('p');title.textContent=stage.title;
  const start=document.createElement('button');start.type='button';start.className='campaign-button start';start.textContent='START';
  start.disabled=stageStatus(this.controller.progress,stage.stageId)==='locked';
  start.onclick=()=>{if(this.controller.openTeamSelect())this.render();};
  const rewards=document.createElement('div');rewards.className='stage-rewards';
  for(const item of stageRewardRows(stage,this.controller.acquisition)) {
   const row=document.createElement('div');row.className=`stage-reward${item.status==='CLAIMED'?' claimed':''}`;
   const label=document.createElement('span');label.textContent=item.label;
   row.append(label);rewards.append(row);
  }
  details.append(id,title,rewards,start);preview.append(image,details);page.append(preview);
  const cards=document.createElement('div');cards.className='stage-grid';cards.setAttribute('aria-label','Stages');
  for(const item of orderedStages(chapter)) cards.append(card({image:item.previewImage,label:item.stageId,status:stageStatus(this.controller.progress,item.stageId),selected:item.stageId===stage.stageId,onClick:()=>{if(this.controller.selectStage(item.stageId)) this.render();}}));
  page.append(cards);
 }
}
export { card, asset };
