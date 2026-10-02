import { collectionEntries,characterDetail } from './model.js';
import { typeMark } from '../roster/typeIcons.js';
export class CollectionView {
 constructor(controller,{document=globalThis.document,onBack,catalog,abilityCatalog,now=()=>Date.now()}={}) {
  this.controller=controller;this.document=document;this.onBack=onBack;this.catalog=catalog;this.abilityCatalog=abilityCatalog;this.now=now;this.upgradeTimes=new Map();this.filter='all';this.scrollTop=0;
 }
 node(tag,className,text) {const n=this.document.createElement(tag);n.className=className;if(text!==undefined)n.textContent=text;return n;}
 button(text,action) {const n=this.node('button','collection-button',text);n.type='button';n.onclick=action;return n;}
 entries(){return collectionEntries(this.controller.acquisition,{filter:this.filter,catalog:this.catalog,ownership:this.controller.ownership});}
 rememberPosition(){if(this.grid && this.grid.isConnected!==false)this.scrollTop=this.grid.scrollTop;}
 mount(page) {
  this.rememberPosition();
  this.page=page;page.replaceChildren();page.className='campaign-page collection-page';
  this.browser=this.node('div','collection-browser');
  const header=this.node('header','collection-header'),back=this.button('BACK',()=>{this.scrollTop=this.grid.scrollTop;this.onBack?.();});back.dataset.action='collection-back';
  header.append(back,this.node('h1','','COLLECTION'));this.browser.append(header);
  const filters=this.node('nav','collection-filters');filters.setAttribute('aria-label','Character Types');
  this.filters=[];
  for(const [id,label] of [['all','ALL'],['power','Power'],['speed','Speed'],['blast','Blast']]) {
   const b=this.button(label,()=>{this.filter=id;this.scrollTop=0;this.renderGrid();});b.dataset.filter=id;this.filters.push(b);filters.append(b);
  }
  this.grid=this.node('div','collection-grid');this.grid.setAttribute('aria-label','Character collection');this.browser.append(filters,this.grid);page.append(this.browser);this.renderGrid();
 }
 portrait(definition,large=false) {
  const n=this.node('div',`collection-portrait${large?' large':''}`,definition.portrait?.label ?? definition.name);n.style.backgroundColor=definition.portrait?.color ?? '#445565';n.setAttribute('aria-hidden','true');return n;
 }
 renderGrid() {
  this.grid.replaceChildren();for(const button of this.filters)button.setAttribute('aria-pressed',String(button.dataset.filter===this.filter));
  for(const entry of this.entries()) {
   const {definition,owned,shardLabel,tier}=entry,mark=typeMark(definition);
   const card=this.button('',()=>this.openDetail(definition.id,card));card.className=`collection-card${owned?'':' is-locked'}`;card.dataset.characterId=definition.id;card.dataset.owned=String(owned);card.setAttribute('aria-label',`${definition.name}, ${mark.label}, ${owned?'owned':'locked'}, ${shardLabel}`);
   card.append(this.portrait(definition),this.node('strong','collection-name',definition.name),this.node('span','collection-type',`${mark.symbol} ${mark.label}`),this.node('span','collection-status',owned?tier:'LOCKED'),this.node('span','collection-shards',shardLabel));this.grid.append(card);
  }
  this.grid.scrollTop=this.scrollTop;
 }
 openDetail(id,trigger) {
  const entry=this.entries().find(e=>e.definition.id===id);if(!entry)return;
  const {definition,owned,shardLabel,tier,nextTier,requirement,canUpgrade}=entry,detail=characterDetail(definition,this.abilityCatalog),mark=typeMark(definition);
  const scroll=this.grid.scrollTop;this.browser.inert=true;
  const dialog=this.node('section',`collection-detail${owned?'':' is-locked'}`);dialog.setAttribute('role','dialog');dialog.setAttribute('aria-modal','true');dialog.setAttribute('aria-labelledby','collection-detail-name');
  const close=()=>{dialog.remove();this.browser.inert=false;this.grid.scrollTop=scroll;trigger.focus();};
  const header=this.node('header','collection-header'),back=this.button('BACK',close);back.dataset.action='close-detail';header.append(back,this.node('h2','','CHARACTER DETAIL'));dialog.append(header);
  const content=this.node('div','collection-detail-content'),identity=this.node('div','collection-identity');const name=this.node('h2','collection-name',detail.name);name.id='collection-detail-name';identity.append(this.portrait(definition,true),name);
  const info=this.node('div','collection-info');info.append(this.node('p','',mark.label),this.node('p','',`Role: ${detail.role}`),this.node('p','collection-status',owned?'OWNED':'LOCKED'),this.node('p','collection-shards',shardLabel));
  if(owned) {
   info.append(this.node('p','collection-tier',tier));
   if(nextTier) {
    info.append(this.node('p','',`Next: ${nextTier} · Requires ${requirement} shards`));
    const requestId=globalThis.crypto.randomUUID();
    const upgrade=this.button('UPGRADE',event=>{
     const time=this.now();
     if(event?.detail>1||time-(this.upgradeTimes.get(id) ?? -Infinity)<500)return;
     const transaction=this.controller.upgradeCharacter(id,tier,requestId);
     if(!transaction.upgraded)return;
     this.upgradeTimes.set(id,time);dialog.remove();this.browser.inert=false;this.scrollTop=scroll;this.renderGrid();
     const card=[...this.grid.children].find(n=>n.dataset.characterId===id);this.openDetail(id,card);
    });
    upgrade.dataset.action='upgrade';upgrade.disabled=!canUpgrade;info.append(upgrade);
   }
  }
  info.append(this.node('h3','','Abilities'));
  for(const ability of detail.abilities){info.append(this.node('p','collection-ability',`${ability.name} · ${ability.category}`));if(ability.description)info.append(this.node('p','',ability.description));}
  if(detail.lore)info.append(this.node('h3','','Lore'),this.node('p','',detail.lore));
  content.append(identity,info);dialog.append(content);dialog.addEventListener('keydown',event=>{if(event.key==='Escape')close();});this.page.append(dialog);back.focus();
 }
}
