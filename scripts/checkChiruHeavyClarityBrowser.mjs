// Real native Phaser / actual built Campaign entry. No physical-phone claim.
import assert from 'node:assert/strict';import {spawn} from 'node:child_process';import {createRequire} from 'node:module';import {mkdir,writeFile} from 'node:fs/promises';import path from 'node:path';
import {validateChiruHeavyClarityBrowserReport} from './verifyChiruHeavyClarityRelease.mjs';
const require=createRequire(path.resolve(process.env.ARENA_BROWSER_TOOL_ROOT??'.','package.json')),{chromium}=require('playwright');
const built=process.argv.includes('--built'),port=built?4186:4185,base=`http://127.0.0.1:${port}/shanhaijing-arena/`,out=path.resolve(process.env.ARENA_BROWSER_OUTPUT??'docs/verification/P3_HEAVY_CLARITY/browser');await mkdir(out,{recursive:true});
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js',...(built?['preview']:[]),'--host','127.0.0.1','--port',String(port),'--strictPort'],{stdio:'pipe'});let log='',browser;server.stdout.on('data',b=>log+=b);server.stderr.on('data',b=>log+=b);
const report={kind:built?'Actual built Campaign→Stage→Team→Arena / portrait selection callback and Heavy skill callback':'Native real Phaser/WebGL Session and actor/VFX bridge',physicalPhone:false,cases:[],errors:[]};
try{
 for(let i=0;i<100;i++){try{if((await fetch(base)).ok)break;}catch{}if(i===99)throw Error(log);await new Promise(r=>setTimeout(r,100));}
 browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader']});
 for(const tier of built?['T0']:['T0','T1','T2','T3'])for(const tactical of built?[true]:[false,true])for(const reduced of [false,true])for(const sign of [-1,1]){
  const context=await browser.newContext({viewport:built?{width:852,height:393}:{width:1120,height:540},isMobile:built,hasTouch:built,reducedMotion:reduced?'reduce':'no-preference'}),page=await context.newPage();page.on('pageerror',e=>report.errors.push(String(e)));
  if(built){
   await page.route('**/assets/battleRuntime-*.js',async route=>{const response=await route.fetch(),body=await response.text();assert.equal(body.split('window.__arenaSmoke=').length,2);await route.fulfill({response,body:body.replace('window.__arenaSmoke=','window.__chiruScene=this,window.__arenaSmoke=')});});
   await page.goto(base+'?campaignDev=unlock-all');await page.getByRole('button',{name:'BATTLE',exact:true}).click();await page.locator('.chapter-grid .campaign-card:not(:disabled)').first().click();await page.getByRole('button',{name:'1-3 available',exact:true}).click();await page.locator('.stage-page>.start').click();
   for(const id of ['P3','P1','P2'])await page.locator(`.roster-card[data-character-id="${id}"]`).click();await page.locator('.team-page .start.battle').click();
   await page.waitForFunction(()=>window.__arenaSmoke?.battleStarted&&window.__chiruScene?.assetGate?.ready,null,{timeout:60000});
  }else{
   await page.route('**/__chiru_probe.html',r=>r.fulfill({contentType:'text/html',body:'<!doctype html><html><body style="margin:0"><div id="game"></div></body></html>'}));await page.goto(base+'__chiru_probe.html');
   await page.evaluate(async tier=>{const {createArenaGame}=await import('/shanhaijing-arena/src/runtime/battleRuntime.js'),{createLabConfig}=await import('/shanhaijing-arena/src/dev/battleLab/config.js');window.fixtureGame=createArenaGame({data:{labConfig:createLabConfig({allyTeam:['P3','P1','P2'],enemyTeam:['P4','P5','P3'],allyTier:tier,enemyTier:tier,skipCountdown:true}),onSceneReady:sc=>{window.__chiruScene=sc;sc.paused=true;queueMicrotask(()=>sc.game.loop.sleep());}},isCurrent:()=>true,onBoot(){}});},tier);
   await page.waitForFunction(()=>window.__chiruScene?.assetGate?.ready,null,{timeout:60000});
  }
  const start=await page.evaluate(({tactical,sign,built})=>{
   const sc=window.__chiruScene,s=sc.session,p=sc.visualAssets;sc.paused=true;sc.game.loop.sleep();s.clearTransientCombat();for(const id of [...p.actions.active.keys()])p.clearAction(id);p.pendingImpactViews.clear();s.elapsedSeconds=0;s.tacticalEnabled=tactical;
   for(const a of s.actors){a.controlHandoff.resumeAfterMs=Infinity;a.heal(a.maxHp);Object.assign(a,{x:11,y:1.7});s.holdPlayerControl(a.instanceId);s.setPlayerMovement(a.instanceId,{x:0,y:0});s.cadence.set(a.instanceId,99);for(const c of ['heavy','special','awakening'])Object.assign(a.abilityState[c],{phase:'cooldown',cooldownRemaining:99});}
   const a=s.allies.find(a=>a.definitionId==='P3'),t=s.enemies[0];Object.assign(a,{x:5,y:0});Object.assign(t,{x:5+sign*2,y:0});Object.assign(a.abilityState.heavy,{phase:'ready',cooldownRemaining:0});s.cadence.set(a.instanceId,99);s.targetIds.set(a.instanceId,t.instanceId);p.facings.clear();sc.applyFrame(s.snapshot());
   const idle=p.actorSprites.get(a.instanceId);window.chiruProbe={actorId:a.instanceId,targetId:t.instanceId,hp:t.hp,ground:idle.y+(160-idle.originY*160)*idle.displayHeight/160,hits:[]};
   const drain=s.drainDamageEvents.bind(s);s.drainDamageEvents=()=>{const v=drain();window.chiruProbe.hits.push(...v.filter(e=>e.actorId===a.instanceId&&e.category==='heavy'));return v;};
   sc.paused=false;sc.portraitViews.get(a.instanceId).portrait.emit('pointerdown');const callbackUsed=sc.selectedId===a.instanceId;sc.paused=true;
   if(built){sc.paused=false;sc.skillButtons.get('heavy').base.emit('pointerdown');sc.paused=true;}else if(!s.executeAbility(a,'heavy','player',t))throw Error('Basic rejected');
   sc.renderCastEvents();sc.applyFrame(s.snapshot());sc.game.step(performance.now(),0);
   const pending=s.pendingActions.get(a.instanceId);if(!pending)throw Error('Basic auto/start lifecycle missing');window.chiruProbe.startedAt=pending.startedAt;window.chiruProbe.releaseAt=pending.startedAt+pending.definition.windupMs/1000;window.chiruProbe.dueAt=pending.dueAt;
   return {renderer:sc.game.renderer.type,hp:t.hp,before:window.chiruProbe.hp,delay:pending.dueAt-pending.startedAt,charge:p.actionEffects.get(a.instanceId)?.get('anticipation')?.visible===true,callbackUsed};
  },{tactical,sign,built});
  assert.equal(start.hp,start.before);assert.equal(start.charge,true);
  const hit=await page.evaluate(()=>{
   const sc=window.__chiruScene,s=sc.session,r=window.chiruProbe,p=sc.visualAssets;for(const a of s.actors)s.holdPlayerControl(a.instanceId);
   s.step(r.releaseAt-s.elapsedSeconds);sc.renderCastEvents();sc.applyFrame(s.snapshot());const releasedBody=p.actorSprites.get(r.actorId);const releaseNoDamage=s.actorById(r.targetId).hp===r.hp&&releasedBody.frame.name==='448.0.224.194';s.step(.175);sc.renderCastEvents();sc.applyFrame(s.snapshot());const flightAlpha=p.actionEffects.get(r.actorId)?.get('blade')?.alpha,solidFlight=flightAlpha===1;s.step(.174);sc.renderCastEvents();sc.applyFrame(s.snapshot());const noEarlyDamage=releaseNoDamage&&s.actorById(r.targetId).hp===r.hp;
   for(const a of s.actors)s.holdPlayerControl(a.instanceId);s.step(.001);sc.renderCastEvents();sc.applyFrame(s.snapshot());sc.game.step(performance.now(),0);
   const body=p.actorSprites.get(r.actorId),fx=p.actionEffects.get(r.actorId),ground=body.y+(173-body.originY*194)*body.displayHeight/194;
   return {noEarlyDamage,hitAt:r.hits[0]?.eventAt-r.startedAt,hitCount:r.hits.length,line:fx?.get('blade')?.visible===true,impact:[...p.stagedImpactSprites.values()].some(v=>v.visible),hitAlpha:[...p.stagedImpactSprites.values()][0]?.alpha,flightAlpha,solidFlight,scale:Math.abs(ground-r.ground)<1.01&&Math.abs(body.displayWidth-201.6)<1e-6,frame:body.frame.name,arrow:{x:fx?.get('blade')?.x,y:fx?.get('blade')?.y,width:fx?.get('blade')?.displayWidth,rotation:fx?.get('blade')?.rotation}};
  });
  // JS comparison is intentionally made outside the browser too; never infer facing from HP.
  const facing=await page.evaluate(()=>window.__chiruScene.visualAssets.actorSprites.get(window.chiruProbe.actorId).flipX);hit.mirror=facing===(sign<0);
  assert.equal(hit.frame,'448.0.224.194');
  const c={tier,tactical,reduced,sign,...start,...hit};report.current=c;
  const pause=await page.evaluate(()=>{const sc=window.__chiruScene,p=sc.visualAssets,r=window.chiruProbe,snap=()=>JSON.stringify([sc.session.elapsedSeconds,p.actorSprites.get(r.actorId).frame.name,[...p.actionEffects.get(r.actorId).values()].map(v=>[v.x,v.y,v.alpha])]),before=snap();sc.applyFrame(sc.session.snapshot());sc.game.step(performance.now(),0);return before===snap();});c.pause=pause;
  if(built||tactical&&!reduced&&sign===1){const file=`${built?'built':'native'}-${tier}-${reduced?'reduced':'normal'}-${sign}.png`;await page.locator('canvas').screenshot({path:path.join(out,file)});c.screenshot=file;}
  const cleanup=await page.evaluate(()=>{
   const sc=window.__chiruScene,s=sc.session,p=sc.visualAssets,r=window.chiruProbe,a=s.actorById(r.actorId),t=s.actorById(r.targetId),paint=()=>{sc.renderCastEvents();sc.applyFrame(s.snapshot());sc.game.step(performance.now(),0);},advance=dt=>{for(const x of s.actors)s.holdPlayerControl(x.instanceId);s.step(dt);};
   advance(.1);paint();const hitSprite=[...p.stagedImpactSprites.values()][0],holdAlpha=hitSprite?.alpha,solidImpactHold=holdAlpha===1;advance(.1);paint();const fadeAlpha=hitSprite?.alpha,impactFade=fadeAlpha>0&&fadeAlpha<1;advance(.05);paint();const impactCleanup=p.stagedImpactSprites.size===0;const idle=p.actorSprites.get(a.instanceId).texture.key.endsWith('chiru.battleIdle');
   Object.assign(a.abilityState.heavy,{phase:'ready',cooldownRemaining:0});s.executeAbility(a,'heavy','player',t);paint();const hp=t.hp;t.y=.6;advance(.7);paint();const missDetails={hpBefore:hp,hpAfter:t.hp,time:s.elapsedSeconds,active:!!p.actions.active.get(a.instanceId),pending:!!s.pendingActions.get(a.instanceId),effects:[...(p.actionEffects.get(a.instanceId)??[])].map(([key,v])=>({key,visible:v.visible,alpha:v.alpha,width:v.displayWidth})),sample:p.actions.sample(a.instanceId,s.elapsedSeconds,p.reducedMotion)};const miss=t.hp===hp&&p.actionEffects.get(a.instanceId)?.get('blade')?.visible===true&&p.stagedImpactSprites.size===0;
   advance(.25);paint();t.y=0;Object.assign(a.abilityState.heavy,{phase:'ready',cooldownRemaining:0});s.executeAbility(a,'heavy','player',t);paint();s.cancelAction(a.instanceId,'control');paint();const cancel=!p.actions.active.has(a.instanceId)&&!p.actionEffects.has(a.instanceId);
   Object.assign(a.abilityState.heavy,{phase:'ready',cooldownRemaining:0});s.executeAbility(a,'heavy','player',t);paint();a.damage(a.hp);paint();const ko=!p.actions.active.has(a.instanceId)&&!p.actionEffects.has(a.instanceId);
   s.clearTransientCombat();paint();const end=s.pendingActions.size===0&&p.actionEffects.size===0;
   window.previousChiruPresenter=p;sc.scene.restart();sc.game.loop.wake();return {idle,miss,missDetails,cancel,ko,end,holdAlpha,solidImpactHold,fadeAlpha,impactFade,impactCleanup};
  });Object.assign(c,cleanup);
  await page.waitForFunction(()=>window.__chiruScene?.visualAssets!==window.previousChiruPresenter&&window.__chiruScene?.assetGate?.ready,null,{timeout:60000});
  c.restart=await page.evaluate(()=>{const sc=window.__chiruScene;sc.paused=true;sc.game.loop.sleep();return window.previousChiruPresenter.closed&&window.previousChiruPresenter.textureBytes===0&&sc.assetGate.ready;});
  report.cases.push(c);await context.close();
 }
 report.status='PASS';validateChiruHeavyClarityBrowserReport(report,built);
}catch(error){report.status='FAIL';report.failure=String(error);report.serverLog=log;process.exitCode=1;}finally{await writeFile(path.join(out,built?'built-entry.json':'native.json'),JSON.stringify(report,null,2)+'\n');await browser?.close();server.kill('SIGTERM');}
console.log(JSON.stringify({status:report.status,built,cases:report.cases.length,failure:report.failure}));
