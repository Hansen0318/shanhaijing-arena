import test from 'node:test';import assert from 'node:assert/strict';
import {formalAbilityDefinitions as abilities} from '../src/roster/abilities.js';
import {rosterCatalog} from '../src/roster/catalog.js';
import {characterDetail} from '../src/collection/model.js';
import {PassivePresenter} from '../src/runtime/passivePresenter.js';
import {createPassiveDefinition} from '../src/combat/passiveDefinition.js';
import {passiveFixture,stepHeld} from './helpers/passiveFixture.js';
test('every implemented roster passive declares its matching VFX; unsupported style/type pairs reject',()=>{
 for(const a of Object.values(abilities).filter(a=>a.category==='passive'&&a.implemented))assert.equal(a.presentation.style,{movement:'speed-streaks',mitigation:'guard-plates','instant-heal':'paired-fish'}[a.effect.type??a.effect.kind]);
 assert.throws(()=>createPassiveDefinition({...abilities['P1.passive'],presentation:{style:'guard-plates'}}));assert.throws(()=>createPassiveDefinition({...abilities['P2.passive'],presentation:{style:'speed-streaks'}}));
});
test('all player-facing skills omit engineering wording and unavailable skills remain honest',()=>{
 for(const d of Object.values(rosterCatalog))for(const a of characterDetail(d).abilities){assert.doesNotMatch(a.description??'',/實裝|保留設計|保留後續|開發|無文字|不顯示|安全|額度|Runtime|VFX|上限 \+95%|一般移速增益上限/);if(a.category==='passive')assert.equal(a.statusLabel,a.implemented?null:'尚未開放');}
 assert.match(characterDetail(rosterCatalog.P1).abilities.find(a=>a.category==='passive').description,/35%.*50%.*65%.*80%/);
 assert.match(characterDetail(rosterCatalog.P2).abilities.find(a=>a.category==='passive').description,/20%.*30%.*40%.*50%/);
});
test('real active movement snapshot supplies VFX identity, Tier strength and expiry',()=>{
 for(const tier of ['T0','T1','T2','T3']){const {session:s,actor:a}=passiveFixture({tier});s.setPlayerMovement(a.instanceId,{x:1,y:0});stepHeld(s,1);const v=s.snapshot().passives.find(v=>v.instanceId===a.instanceId);assert.equal(v.presentation.style,'speed-streaks');assert.equal(v.presentation.segments,['T0','T1','T2','T3'].indexOf(tier)+1);assert.equal(v.active.effective,true);assert.ok(v.active.statusId);s.setPlayerMovement(a.instanceId,{x:0,y:0});stepHeld(s,3);assert.equal(s.snapshot().passives.find(v=>v.instanceId===a.instanceId).active,null);}
});
test('movement VFX follows true state and facing, draws no text, and clears after expiry or destroy',()=>{
 const drawings=[],scene={add:{graphics(){const g={lines:[],clear(){this.lines=[];return this;},setDepth(){return this;},lineStyle(){return this;},beginPath(){return this;},moveTo(x,y){this.lines.push([x,y]);return this;},lineTo(x,y){this.lines.push([x,y]);return this;},strokePath(){return this;},destroy(){this.destroyed=true;}};drawings.push(g);return g;},text(){throw Error('Text forbidden');}}};
 const p=new PassivePresenter(scene),actors=[{instanceId:'a',hp:1,x:100,y:200}],v={instanceId:'a',definitionId:'future.speed',effectType:'movement',presentation:{style:'speed-streaks',segments:4},active:{statusId:'s',effective:true,expiryTime:3}};
 p.render({views:[v],actors,now:1,facings:new Map([['a',{flipX:false}]])});assert.equal(p.trails.size,1);assert.ok(drawings[0].lines.every(([x])=>x<100));
 p.render({views:[v],actors,now:1,facings:new Map([['a',{flipX:true}]])});assert.ok(drawings[0].lines.every(([x])=>x>100));p.render({views:[v],actors,now:3});assert.equal(p.trails.size,0);assert.equal(drawings[0].destroyed,true);p.destroy();assert.equal(p.badges.size,0);
});
