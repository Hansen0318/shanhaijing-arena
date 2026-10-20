// Real Phaser/WebGL release gate. Controlled session, not phone/FPS proof.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import path from 'node:path';
const require=createRequire(path.resolve(process.env.ARENA_BROWSER_TOOL_ROOT??'.','package.json'));
const {chromium}=require('playwright'),out=path.resolve(process.env.ARENA_BROWSER_OUTPUT??'.git/botuo-heavy-browser');await mkdir(out,{recursive:true});
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','4173','--strictPort'],{stdio:'pipe'});let serverLog='';server.stdout.on('data',b=>serverLog+=b);server.stderr.on('data',b=>serverLog+=b);
const evidence={kind:'Real Chromium/Phaser/WebGL controlled session and native-trim raster comparison; no physical phone/FPS/GPU-memory claim',cases:[],trim:[],errors:[]};let browser;
try{
 for(let i=0;i<100;i++){try{if((await fetch('http://127.0.0.1:4173/shanhaijing-arena/')).ok)break;}catch{}if(i===99)throw Error(serverLog);await new Promise(r=>setTimeout(r,100));}
 browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader']});
 for(const tactical of [false,true])for(const reduced of [false,true])for(const sign of [-1,1]){
  const context=await browser.newContext({viewport:{width:1120,height:540},deviceScaleFactor:1,reducedMotion:reduced?'reduce':'no-preference'}),page=await context.newPage();page.on('pageerror',e=>evidence.errors.push(String(e)));
  await page.route('**/__heavy_smoke.html',r=>r.fulfill({contentType:'text/html',body:'<!doctype html><html><head><style>html,body{margin:0;background:#253648}canvas{display:block}</style></head><body><div id="game"></div></body></html>'}));
  await page.goto('http://127.0.0.1:4173/shanhaijing-arena/__heavy_smoke.html');
  await page.evaluate(async()=>{const {createArenaGame}=await import('/shanhaijing-arena/src/runtime/battleRuntime.js');const {createLabConfig}=await import('/shanhaijing-arena/src/dev/battleLab/config.js');window.fixtureGame=createArenaGame({data:{labConfig:createLabConfig({allyTeam:['P2','P3','P4'],enemyTeam:['P1','P5','P2'],skipCountdown:true}),onSceneReady:scene=>{window.fixtureScene=scene;scene.paused=true;queueMicrotask(()=>scene.game.loop.sleep());}},isCurrent:()=>true,onBoot(){}});});
  await page.waitForFunction(()=>window.fixtureScene?.assetGate?.ready===true,null,{timeout:60000});
  const setup=await page.evaluate(({sign,tactical})=>{
   const sc=window.fixtureScene,s=sc.session;sc.game.loop.sleep();s.tacticalEnabled=tactical;
   for(const a of s.actors){s.holdPlayerControl(a.instanceId);s.setPlayerMovement(a.instanceId,{x:0,y:0});Object.assign(a,{x:12,y:3});for(const c of ['heavy','special','awakening'])Object.assign(a.abilityState[c],{phase:'cooldown',cooldownRemaining:99});s.cadence.set(a.instanceId,99);}
   const a=s.actorById('a1'),t=s.actorById('e1');Object.assign(a,{x:4,y:0});Object.assign(t,{x:4+.7*sign,y:0});Object.assign(a.abilityState.heavy,{phase:'ready',cooldownRemaining:0});
   window.heavyHits=[];const drain=s.drainDamageEvents.bind(s);s.drainDamageEvents=()=>{const events=drain();window.heavyHits.push(...events);return events;};
   sc.visualAssets.facings.clear();sc.applyFrame(s.snapshot());sc.game.step(performance.now(),0);
   const idle=sc.visualAssets.actorSprites.get('a1');window.heavyIdle={width:idle.displayWidth,height:idle.displayHeight,foot:(158-idle.originY*160)*idle.displayHeight/160};
   if(!s.executeAbility(a,'heavy','player',t,{facingX:sign}))throw Error('Heavy rejected');sc.renderCastEvents();sc.applyFrame(s.snapshot());sc.game.step(performance.now(),0);
   return {hp:t.hp,initialHp:t.maxHp,bytes:sc.visualAssets.textureBytes,keys:sc.visualAssets.textures.size,renderer:sc.game.renderer.type,idle:window.heavyIdle};
  },{sign,tactical});
  assert.equal(setup.bytes,16622164);assert.equal(setup.keys,42);assert.equal(setup.renderer,2);
  const record={tactical,reduced,sign,...setup,frames:[]};evidence.cases.push(record);
  const resolve=tactical?.65:0;
  const times=tactical?[['F1',0],['F2',.16],['F3',.65],['F4',.81],['fxEnd',.93],['idle',.97]]:[['F3',0],['F4',.16],['fxEnd',.28],['idle',.32]];
  for(const [label,time]of times){
   const sample=await page.evaluate(time=>{
    const sc=window.fixtureScene,s=sc.session;if(time>s.elapsedSeconds+1e-9){for(const a of s.actors){s.holdPlayerControl(a.instanceId);s.setPlayerMovement(a.instanceId,{x:0,y:0});}s.step(time-s.elapsedSeconds);}sc.renderCastEvents();sc.applyFrame(s.snapshot());sc.game.step(performance.now(),0);
    const p=sc.visualAssets,b=p.actorSprites.get('a1'),wind=p.actionEffects.get('a1')?.get('blade'),after=p.bladeAfterglows.get('a1')?.image;
    return {time:s.elapsedSeconds,body:{texture:b.texture.key,frame:b.frame.name,width:b.displayWidth,height:b.displayHeight,origin:[b.originX,b.originY],flipX:b.flipX},wind:(wind?.visible?wind:after?.visible?after:null)?.texture.key??null,hp:s.actorById('e1').hp,hits:window.heavyHits.filter(e=>e.category==='heavy').map(e=>({at:e.eventAt,amount:e.amount})),contacts:[...p.stagedImpactSprites.values()].filter(o=>o.visible).map(o=>({at:o.eventAt,x:o.x,y:o.y,alpha:o.alpha,flipX:o.flipX}))};
   },time);evidence.current={label,...sample};
   if(label==='F1'){assert.equal(sample.body.frame,'0.0.175.162');assert.equal(sample.hits.length,0);assert.equal(sample.contacts.length,0);}
   if(label==='F2'){assert.equal(sample.body.frame,reduced?'0.0.175.162':'175.0.175.162');assert.ok(sample.wind?.endsWith('botuo.heavySource'));assert.equal(sample.hits.length,0);}
   if(label==='F3'){
    assert.equal(sample.body.frame,'350.0.175.162');assert.equal(sample.body.width,175);assert.equal(sample.body.height,162);assert.equal(sample.body.flipX,sign<0);
    assert.ok(Math.abs((151-sample.body.origin[1]*162)*sample.body.height/162-setup.idle.foot)<1e-8);assert.equal(sample.hits.length,1);assert.ok(Math.abs(sample.hits[0].at-resolve)<1e-9);assert.equal(sample.contacts.length,1);assert.ok(sample.wind?.endsWith('botuo.heavySource'));
    const paused=await page.evaluate(()=>{const sc=window.fixtureScene,p=sc.visualAssets;const snap=()=>JSON.stringify([sc.session.elapsedSeconds,p.actorSprites.get('a1').frame.name,[...p.stagedImpactSprites.values()].map(o=>[o.x,o.y,o.alpha])]);const before=snap();sc.applyFrame(sc.session.snapshot());sc.game.step(performance.now(),0);return snap()===before;});assert.ok(paused);record.pauseFrozen=true;
   }
   if(label==='F4'){assert.equal(sample.contacts.length,1);if(!reduced)assert.equal(sample.body.frame,'525.0.175.162');}
   if(label==='fxEnd'){assert.equal(sample.contacts.length,0);assert.equal(sample.wind,null);}
   if(label==='idle'){assert.ok(sample.body.texture.endsWith('botuo.battleIdle'));assert.equal(sample.body.width,144);}
   const file=`${tactical?'tactical':'instant'}-${reduced?'reduced':'normal'}-${sign<0?'left':'right'}-${label}.png`;await page.locator('canvas').screenshot({path:path.join(out,file)});record.frames.push({label,file,...sample});
  }
  const whiff=await page.evaluate(sign=>{const sc=window.fixtureScene,s=sc.session,a=s.actorById('a1'),t=s.actorById('e1'),hp=t.hp,before=window.heavyHits.length;t.x=12;Object.assign(a.abilityState.heavy,{phase:'ready',cooldownRemaining:0});s.executeAbility(a,'heavy','player',t,{facingX:sign});sc.renderCastEvents();sc.applyFrame(s.snapshot());sc.game.step(performance.now(),0);const p=sc.visualAssets;return {frame:p.actorSprites.get('a1').frame.name,flipX:p.actorSprites.get('a1').flipX,source:p.actionEffects.get('a1')?.get('blade')?.visible===true,contacts:p.stagedImpacts.size,hpUnchanged:t.hp===hp,additionalDamage:window.heavyHits.length-before};},sign);
  assert.deepEqual(whiff,{frame:'350.0.175.162',flipX:sign<0,source:true,contacts:0,hpUnchanged:true,additionalDamage:0});record.whiff=whiff;
  const ko=await page.evaluate(()=>{const sc=window.fixtureScene,a=sc.session.actorById('a1');a.damage(a.hp);sc.applyFrame(sc.session.snapshot());sc.game.step(performance.now(),0);const p=sc.visualAssets;return {texture:p.actorSprites.get('a1').texture.key,contacts:p.stagedImpacts.size,actions:p.actions.active.size};});assert.ok(ko.texture.endsWith('botuo.battleKo'));assert.equal(ko.contacts,0);assert.equal(ko.actions,0);record.ko=ko;

  // Inspect the three affected existing Move atlases in the real native renderer.
  // Original immutable PNGs are loaded only for QA after encounter budget checks.
  if(!tactical&&!reduced&&sign===1){
   const inputs=JSON.parse(await readFile('docs/verification/P2_HEAVY_PACK_INPUTS.json','utf8'));
   const results=await page.evaluate(async inputs=>{
    const sc=window.fixtureScene,p=sc.visualAssets,hidden=sc.children.list.map(o=>[o,o.visible]);for(const [o]of hidden)o.setVisible(false);
    const canvas=document.createElement('canvas');canvas.width=sc.game.canvas.width;canvas.height=sc.game.canvas.height;const ctx=canvas.getContext('2d',{willReadFrequently:true});
    const capture=()=>{sc.game.step(performance.now(),0);ctx.clearRect(0,0,canvas.width,canvas.height);ctx.drawImage(sc.game.canvas,0,0);return ctx.getImageData(0,0,canvas.width,canvas.height).data;};const results=[];
    for(const entry of inputs){
     const image=new Image();image.src='/shanhaijing-arena/'+entry.input.replace(/^public\//,'');await image.decode();const key='qa-original-'+entry.character;sc.textures.addImage(key,image);
     const d=sc.session.characterDefinitions[entry.character].animationDescriptors.battleMove;
     for(let i=0;i<4;i++)for(const flipX of [false,true]){
      const f=entry.descriptor.frames[i],name='frame'+i;if(!sc.textures.get(key).has(name))sc.textures.get(key).add(name,0,f.x,f.y,f.width,f.height);
      const width=72*d.scale*f.width/Math.max(f.width,f.height),height=72*d.scale*f.height/Math.max(f.width,f.height);
      const original=sc.add.image(500,300,key,name).setOrigin(...d.origin).setDisplaySize(width,height).setFlipX(flipX);const before=capture();original.setVisible(false);
      const current=p.imageFor('qa-current',d,i/d.fps+.001,p.actorSprites,'locomotion',i).setOrigin(...d.origin).setDisplaySize(width,height).setFlipX(flipX).setPosition(500,300);const after=capture();let changed=0,max=0,sum=0;
      for(let j=0;j<before.length;j++){const delta=Math.abs(before[j]-after[j]);if(delta)changed++;max=Math.max(max,delta);sum+=delta;}
      results.push({character:entry.character,frame:i,flipX,changedChannels:changed,maxDelta:max,meanChannelDelta:sum/before.length,logical:[current.frame.realWidth,current.frame.realHeight],expected:[f.width,f.height]});current.setVisible(false);original.destroy();
     }
     sc.textures.remove(key);
    }
    for(const [o,visible]of hidden)if(o.active)o.setVisible(visible);return results;
   },inputs);for(const r of results){assert.deepEqual(r.logical,r.expected);assert.ok(r.meanChannelDelta<.01,JSON.stringify(r));assert.ok(r.maxDelta<=8,JSON.stringify(r));}evidence.trim=results;
  }
  const cleanup=await page.evaluate(()=>{const sc=window.fixtureScene,p=sc.visualAssets;sc.game.destroy(true);sc.game.step(performance.now(),0);return {closed:p.closed,bytes:p.textureBytes,actions:p.actions.active.size,contacts:p.stagedImpacts.size,source:p.bladeAfterglows.size};});assert.deepEqual(cleanup,{closed:true,bytes:0,actions:0,contacts:0,source:0});record.cleanup=cleanup;await context.close();
 }
 assert.deepEqual(evidence.errors,[]);evidence.status='PASS';await writeFile(path.join(out,'browser-verification.json'),JSON.stringify(evidence,null,2)+'\n');console.log(JSON.stringify({status:'PASS',cases:evidence.cases.length,trimCases:evidence.trim.length,screenshots:evidence.cases.reduce((n,c)=>n+c.frames.length,0)}));
}catch(error){evidence.status='FAIL';evidence.failure=String(error);evidence.serverLog=serverLog;await writeFile(path.join(out,'browser-verification.json'),JSON.stringify(evidence,null,2)+'\n');throw error;}finally{await browser?.close();server.kill('SIGTERM');}
