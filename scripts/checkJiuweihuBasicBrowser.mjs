// Native real Phaser and real built Campaign route. No physical-device claim.
import assert from 'node:assert/strict';import {spawn} from 'node:child_process';import {createRequire} from 'node:module';import {mkdir,writeFile} from 'node:fs/promises';import path from 'node:path';
const require=createRequire(path.resolve(process.env.ARENA_BROWSER_TOOL_ROOT??'.','package.json')),{chromium}=require('playwright');
const built=process.argv.includes('--built'),port=built?4196:4195,base=`http://127.0.0.1:${port}/shanhaijing-arena/`,out=path.resolve(process.env.ARENA_BROWSER_OUTPUT??'docs/verification/P4_BASIC_RUNTIME/browser');await mkdir(out,{recursive:true});
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js',...(built?['preview']:[]),'--host','127.0.0.1','--port',String(port),'--strictPort'],{stdio:'pipe'});let log='',browser;server.stdout.on('data',b=>log+=b);server.stderr.on('data',b=>log+=b);
const report={kind:built?'Built Campaign→Stage→Team→Arena / real portrait callback and automatic Basic':'Native real Phaser/WebGL Session',physicalPhone:false,cases:[],errors:[]};
try{
 for(let i=0;i<100;i++){try{if((await fetch(base)).ok)break;}catch{}if(i===99)throw Error(log);await new Promise(r=>setTimeout(r,100));}
 browser=await chromium.launch({headless:true,...(process.env.ARENA_CHROMIUM_PATH?{executablePath:process.env.ARENA_CHROMIUM_PATH}:{}),args:['--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader']});
 for(const tier of built?['T0']:['T0','T1','T2','T3'])for(const tactical of built?[true]:[false,true])for(const reduced of [false,true])for(const sign of [-1,1]){
  const context=await browser.newContext({viewport:built?{width:852,height:393}:{width:1120,height:540},isMobile:built,hasTouch:built,reducedMotion:reduced?'reduce':'no-preference'}),page=await context.newPage();page.on('pageerror',e=>report.errors.push(String(e)));
  if(built){
   await page.route('**/assets/battleRuntime-*.js',async route=>{const response=await route.fetch(),body=await response.text();assert.equal(body.split('window.__arenaSmoke=').length,2);await route.fulfill({response,body:body.replace('window.__arenaSmoke=','window.__p4Scene=this,window.__arenaSmoke=')});});
   await page.goto(base+'?campaignDev=unlock-all');await page.getByRole('button',{name:'BATTLE',exact:true}).click();await page.locator('.chapter-grid .campaign-card:not(:disabled)').first().click();await page.getByRole('button',{name:'1-3 available',exact:true}).click();await page.locator('.stage-page>.start').click();
   for(const id of ['P4','P1','P3'])await page.locator(`.roster-card[data-character-id="${id}"]`).click();await page.locator('.team-page .start.battle').click();
   await page.waitForFunction(()=>window.__arenaSmoke?.battleStarted&&window.__p4Scene?.assetGate?.ready,null,{timeout:60000});
  }else{
   await page.route('**/__p4_probe.html',r=>r.fulfill({contentType:'text/html',body:'<!doctype html><html><body style="margin:0"><div id="game"></div></body></html>'}));await page.goto(base+'__p4_probe.html');
   await page.evaluate(async tier=>{const {createArenaGame}=await import('/shanhaijing-arena/src/runtime/battleRuntime.js'),{createLabConfig}=await import('/shanhaijing-arena/src/dev/battleLab/config.js');window.fixtureGame=createArenaGame({data:{labConfig:createLabConfig({allyTeam:['P4','P4','P3'],enemyTeam:['P5','P1','P2'],allyTier:tier,enemyTier:tier,skipCountdown:true}),onSceneReady:sc=>{window.__p4Scene=sc;sc.paused=true;queueMicrotask(()=>sc.game.loop.sleep());}},isCurrent:()=>true,onBoot(){}});},tier);
   await page.waitForFunction(()=>window.__p4Scene?.assetGate?.ready,null,{timeout:60000});
  }
  const result=await page.evaluate(({tactical,sign,built,reduced})=>{
   const sc=window.__p4Scene,s=sc.session,p=sc.visualAssets;sc.paused=true;sc.game.loop.sleep();s.clearTransientCombat();s.elapsedSeconds=0;s.tacticalEnabled=tactical;
   const paint=()=>{sc.renderCastEvents();sc.applyFrame(s.snapshot());sc.game.step(performance.now(),0);};
   for(const a of s.actors){a.heal(a.maxHp);Object.assign(a,{x:11,y:1.7});s.holdPlayerControl(a.instanceId);s.setPlayerMovement(a.instanceId,{x:0,y:0});s.cadence.set(a.instanceId,99);for(const c of ['heavy','special','awakening'])Object.assign(a.abilityState[c],{phase:'cooldown',cooldownRemaining:99});}
   const a=s.allies.find(a=>a.definitionId==='P4'),t=s.enemies[0];Object.assign(a,{x:5,y:0});Object.assign(t,{x:5+sign*2,y:0});s.cadence.set(a.instanceId,0);s.targetIds.set(a.instanceId,t.instanceId);p.facings.clear();paint();
   const idle=p.actorSprites.get(a.instanceId),idleDensity=idle.displayWidth/160,footOffset=(142-15-idle.originY*137)*idle.displayHeight/137,waistOffset=(103-idle.originX*160)*idleDensity,hp=t.hp;
   window.p4={actorId:a.instanceId,targetId:t.instanceId,startedAt:0,hits:[]};const drain=s.drainDamageEvents.bind(s);s.drainDamageEvents=()=>{const v=drain();window.p4.hits.push(...v.filter(e=>e.actorId===a.instanceId&&e.category==='basic'));return v;};
   sc.paused=false;sc.portraitViews.get(a.instanceId).portrait.emit('pointerdown');const callbackUsed=sc.selectedId===a.instanceId;sc.paused=true;
   if(built){s.clearPlayerMovement(a.instanceId);s.step(.001);s.holdPlayerControl(a.instanceId);}else if(!s.executeAbility(a,'basic','player',t))throw Error('instant Basic rejected');
   const events=s.castEvents.filter(e=>e.actorId===a.instanceId&&e.category==='basic');window.p4.startedAt=events.find(e=>e.phase==='start')?.startedAt;paint();
   const body=p.actorSprites.get(a.instanceId),sample=p.actions.sample(a.instanceId,s.elapsedSeconds,reduced),fx=p.actionEffects.get(a.instanceId)?.get('blade'),contact=[...p.stagedImpactSprites.values()].find(im=>im.actionId===sample?.actionId);
   const formal=p.formalActionSource(s.definitionForActor(a),'basic'),missingKey='jiuweihu.basicImpact',saved=p.textures.get(missingKey);p.textures.delete(missingKey);const missing=p.formalActionSource(s.definitionForActor(a),'basic')===null;p.textures.set(missingKey,saved);const exists=sc.textures.exists.bind(sc.textures);sc.textures.exists=k=>k===saved.key?false:exists(k);const absentTexture=p.formalActionSource(s.definitionForActor(a),'basic')===null;sc.textures.exists=exists;
   const r={renderer:sc.game.renderer.type,callbackUsed,zeroMs:events.length===2&&events[1].resolvedAt===events[0].startedAt&&t.hp<hp&&window.p4.hits.length===1&&window.p4.hits[0].actionId===events[0].actionId,noLock:s.pendingActions.size===0&&s.delayedImpacts.size===0,cadence:Math.abs(s.cadence.get(a.instanceId)-1/s.definitionForActor(a).stats.attackSpeed)<1e-8,frame:body.frame.name,release:fx?.visible===true,contact:contact?.visible===true,mirror:body.flipX===(sign<0)&&fx?.flipX===body.flipX,ground:Math.abs((150-body.originY*160)*body.displayHeight/160-footOffset)<.01,groundDebug:[footOffset,(150-body.originY*160)*body.displayHeight/160,idle.originY,idle.displayHeight],anatomy:Math.abs(body.displayWidth/176-idleDensity)<1e-8&&Math.abs((107-84)*body.displayWidth/176-waistOffset)<.01,formal:formal?.assetKeys.length===3,missing,absentTexture,geometry:sc.telegraphs.graphics.commandBuffer?.length??0};
   const ax=body.x+(body.flipX?-(152-84):(152-84))*.9,ay=body.y+(62-159)*.9,rootX=fx.x+(body.flipX?1:-1)*(.5-.24)*81*.9,rootY=fx.y+(.53-.5)*57*.9;
   r.handRoot=Math.abs(ax-rootX)<.01&&Math.abs(ay-rootY)<.01;r.targetAnchor=Math.abs(contact.x-(p.project(t).x+(sign<0?1:-1)*107*.02*.9))<.01;
   const snap=()=>JSON.stringify([s.elapsedSeconds,body.frame.name,fx.x,fx.y,fx.alpha,t.hp]),before=snap();paint();r.pause=snap()===before;
   window.p4.result=r;return r;
  },{tactical,sign,built,reduced});
  report.current={tier,tactical,reduced,sign,...result};
  for(const k of ['zeroMs','noLock','cadence','release','contact','mirror','ground','anatomy','formal','missing','absentTexture','handRoot','targetAnchor','pause'])assert.equal(result[k],true,k);assert.equal(result.renderer,2);assert.equal(result.frame,'352.0.176.160');if(built)assert.equal(result.callbackUsed,true);
  if(built||tier==='T0'&&tactical){const file=`${built?'built':'native'}-${tier}-${reduced?'reduced':'normal'}-${sign}.png`;await page.locator('canvas').screenshot({path:path.join(out,file)});report.current.screenshot=file;}
  const cleanup=await page.evaluate(({reduced,built})=>{
   const sc=window.__p4Scene,s=sc.session,p=sc.visualAssets,r=window.p4,a=s.actorById(r.actorId),t=s.actorById(r.targetId),paint=()=>{sc.renderCastEvents();sc.applyFrame(s.snapshot());sc.game.step(performance.now(),0);},at=ms=>{s.elapsedSeconds=r.startedAt+ms/1000;paint();};
   const frames=[];for(const ms of [140,230,320]){at(ms);frames.push(p.actorSprites.get(a.instanceId).frame.name);}at(460);const idle=p.actorSprites.get(a.instanceId).texture.key.endsWith('jiuweihu.battleIdle');
   const moveAt=(x,time)=>{a.x=x;s.elapsedSeconds=time;paint();};moveAt(5.02,s.elapsedSeconds+.01);const move=p.actorSprites.get(a.instanceId).texture.key.endsWith('jiuweihu.battleMove');
   const start=()=>{s.cadence.set(a.instanceId,0);s.executeAbility(a,'basic','player',t);paint();};
   t.x=15;const hp=t.hp;start();const miss=t.hp===hp&&p.actionEffects.get(a.instanceId)?.get('blade')?.visible===true&&p.stagedImpacts.size===0;
   t.x=7;start();const action=p.actions.active.get(a.instanceId);const multi=!built?s.allies.find(b=>b.definitionId==='P4'&&b!==a):null;let instances=true;if(multi){Object.assign(multi,{x:5,y:1});s.cadence.set(multi.instanceId,0);s.executeAbility(multi,'basic','player',t);paint();instances=p.actions.active.size===2&&p.actions.active.get(multi.instanceId).actionId!==action.actionId;}
   Object.assign(a.abilityState.heavy,{phase:'ready',cooldownRemaining:0});s.executeAbility(a,'heavy','player',t);paint();const overwrite=!p.actions.active.has(a.instanceId)&&!p.actionEffects.has(a.instanceId);
   s.clearTransientCombat();paint();const end=p.actions.active.size===0&&p.actionEffects.size===0&&p.stagedImpacts.size===0;
   start();a.damage(a.hp);paint();const ko=!p.actions.active.has(a.instanceId)&&!p.actionEffects.has(a.instanceId)&&![...p.stagedImpacts.values()].some(v=>v.ownerId===a.instanceId);
   const contacts=p.stagedImpacts.size;window.oldP4=p;sc.scene.restart();sc.game.loop.wake();return {frames,idle,move,miss,instances,overwrite,end,ko,contacts};
  },{reduced,built});Object.assign(report.current,cleanup);for(const k of ['idle','move','miss','instances','overwrite','end','ko'])assert.equal(cleanup[k],true,k);if(!reduced)assert.deepEqual(cleanup.frames,['176.0.176.160','0.0.176.160','528.0.176.160']);
  await page.waitForFunction(()=>window.__p4Scene?.visualAssets!==window.oldP4&&window.__p4Scene?.assetGate?.ready,null,{timeout:60000});report.current.restart=await page.evaluate(()=>{window.__p4Scene.paused=true;window.__p4Scene.game.loop.sleep();return window.oldP4.closed&&window.oldP4.textureBytes===0;});assert.equal(report.current.restart,true);
  const destroyed=await page.evaluate(()=>{const sc=window.__p4Scene,p=sc.visualAssets;p.destroy();p.destroy();return p.textureBytes===0&&p.actions.active.size===0&&p.stagedImpacts.size===0;});assert.equal(destroyed,true);report.current.destroy=destroyed;report.cases.push(report.current);delete report.current;await context.close();
 }
 assert.deepEqual(report.errors,[]);report.status='PASS';
}catch(error){report.status='FAIL';report.failure=String(error);report.stack=error.stack;report.serverLog=log;process.exitCode=1;}finally{await writeFile(path.join(out,built?'built-entry.json':'native.json'),JSON.stringify(report,null,2)+'\n');await browser?.close();server.kill('SIGTERM');}
console.log(JSON.stringify({status:report.status,built,cases:report.cases.length,failure:report.failure}));
