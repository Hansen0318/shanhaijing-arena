import test from 'node:test';import assert from 'node:assert/strict';
import {PassivePresenter} from '../src/runtime/passivePresenter.js';
const active=(segments=1)=>({instanceId:'unit',effectType:'mitigation',presentation:{style:'guard-plates',segments},active:{statusId:'owned',effective:true,expiryTime:4}});
function fixture(){const graphics=[];const scene={add:{graphics(){const calls=[],g={calls,destroyed:false,visible:true,clear(){calls.length=0;return this;},setDepth(v){this.depth=v;return this;},lineStyle(...v){calls.push(['lineStyle',...v]);return this;},beginPath(){calls.push(['begin']);return this;},moveTo(...v){calls.push(['move',...v]);return this;},lineTo(...v){calls.push(['line',...v]);return this;},strokePath(){calls.push(['stroke']);return this;},destroy(){this.destroyed=true;}};graphics.push(g);return g;},text(){throw Error('No passive text');}}};return {graphics,p:new PassivePresenter(scene,{project:p=>({x:p.x,y:p.y})})};}
test('real Tier views create static one to four armor pairs with fixed body bounds and no HUD or text',()=>{
 const {p,graphics}=fixture();for(let n=1;n<=4;n++){p.render({views:[active(n)],actors:[{instanceId:'unit',hp:100,x:100,y:200}],now:1});assert.equal(p.plates.size,1);const g=graphics.at(-1);assert.equal(g.calls.filter(c=>c[0]==='stroke').length,2*n);for(const c of g.calls.filter(c=>c[0]==='move'||c[0]==='line')){assert.ok(c[1]>=66&&c[1]<=134);assert.ok(c[2]>=126&&c[2]<=186);}}
 assert.equal(p.badges.size,0);assert.equal(p.hud,undefined);p.destroy();assert.ok(graphics.every(g=>g.destroyed));assert.equal(p.plates.size,0);
});
test('suppression, expiry, KO and empty frame remove true-status-owned graphics; destroy is final',()=>{
 const {p,graphics}=fixture(),actors=[{instanceId:'unit',hp:100,x:100,y:200}];p.render({views:[active()],actors,now:0});assert.equal(p.plates.size,1);p.render({views:[{...active(),active:{...active().active,effective:false}}],actors,now:1});assert.equal(p.plates.size,0);assert.equal(graphics[0].destroyed,true);
 for(const [views,who,now]of [[[active()],actors,4],[[active()],[{...actors[0],hp:0}],1],[[],actors,1]]){p.render({views:[active()],actors,now:0});p.render({views,actors:who,now});assert.equal(p.plates.size,0);}
 p.destroy();p.render({views:[active()],actors,now:0});assert.equal(p.plates.size,0);
});
