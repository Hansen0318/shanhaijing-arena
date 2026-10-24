// Real native Phaser / actual built Campaign entry. No physical-phone claim.
import assert from 'node:assert/strict';import {spawn} from 'node:child_process';import {createRequire} from 'node:module';import {mkdir,writeFile} from 'node:fs/promises';import path from 'node:path';
import {validateChiruSpecialBrowserReport} from './verifyChiruSpecialRelease.mjs';
const require=createRequire(path.resolve(process.env.ARENA_BROWSER_TOOL_ROOT??'.','package.json')),{chromium}=require('playwright');
const built=process.argv.includes('--built'),port=built?4186:4185,base=`http://127.0.0.1:${port}/shanhaijing-arena/`,out=path.resolve(process.env.ARENA_BROWSER_OUTPUT??'docs/verification/P3_SPECIAL_RUNTIME/browser');await mkdir(out,{recursive:true});
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js',...(built?['preview']:[]),'--host','127.0.0.1','--port',String(port),'--strictPort'],{stdio:'pipe'});let log='',browser;server.stdout.on('data',b=>log+=b);server.stderr.on('data',b=>log+=b);
const report={kind:built?'Actual built Campaign→Stage→Team→Arena / portrait selection callback and Special skill callback':'Native real Phaser/WebGL Session and actor/VFX bridge',physicalPhone:false,cases:[],errors:[]};
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

  const c=await page.evaluate(({tactical,sign,built,tier,reduced})=>{
   const sc=window.__chiruScene,s=sc.session,p=sc.visualAssets;sc.paused=true;sc.game.loop.sleep();s.clearTransientCombat();s.elapsedSeconds=0;s.tacticalEnabled=tactical;
   for(const a of s.actors){a.controlHandoff.resumeAfterMs=Infinity;a.heal(a.maxHp);Object.assign(a,{x:11,y:1.7});s.holdPlayerControl(a.instanceId);s.setPlayerMovement(a.instanceId,{x:0,y:0});s.cadence.set(a.instanceId,99);for(const k of ['heavy','special','awakening'])Object.assign(a.abilityState[k],{phase:'cooldown',cooldownRemaining:99});}
   const a=s.allies.find(a=>a.definitionId==='P3'),b=s.allies.find(x=>x!==a),other=s.allies.find(x=>x!==a&&x!==b);Object.assign(a,{x:5,y:0});Object.assign(b,{x:5+sign*2,y:0});Object.assign(other,{x:5-sign*2,y:0});b.damage(b.maxHp*.6);Object.assign(a.abilityState.special,{phase:'ready',cooldownRemaining:0});p.facings.clear();sc.applyFrame(s.snapshot());const idle=p.actorSprites.get(a.instanceId),ground=idle.y+(160-idle.originY*160)*idle.displayHeight/160;
   const hits=[],drain=s.drainHealEvents.bind(s);s.drainHealEvents=()=>{const v=drain();hits.push(...v.filter(e=>e.actorId===a.instanceId&&e.category==='special'));return v;};
   const paint=()=>{sc.renderCastEvents();sc.applyFrame(s.snapshot());sc.game.step(performance.now(),0);},advance=dt=>{for(const x of s.actors)s.holdPlayerControl(x.instanceId);s.step(dt);paint();},ready=()=>Object.assign(a.abilityState.special,{phase:'ready',cooldownRemaining:0}),cast=()=>{ready();if(!s.executeAbility(a,'special','player',null,{facingX:sign}))throw Error('Special rejected');paint();};
   sc.paused=false;sc.portraitViews.get(a.instanceId).portrait.emit('pointerdown');const callbackUsed=sc.selectedId===a.instanceId;sc.paused=true;
   if(built){s.setPlayerMovement(a.instanceId,{x:sign,y:0});sc.paused=false;sc.skillButtons.get('special').base.emit('pointerdown');sc.paused=true;s.setPlayerMovement(a.instanceId,{x:0,y:0});paint();}else cast();
   const rec=s.pendingActions.get(a.instanceId);if(!rec)throw Error('Missing pending heal');const startedAt=rec.startedAt,hp=b.hp,sourceAlpha=p.actionEffects.get(a.instanceId)?.get('blade')?.alpha;
   advance(.2);const f2=p.actorSprites.get(a.instanceId).frame.name==='224.0.224.194';advance(.119);const noEarlyHeal=b.hp===hp&&hits.length===0&&p.stagedImpactSprites.size===0;
   advance(.001);const h=hits[0],flower=[...p.stagedImpactSprites.values()][0],impact=[...p.stagedImpacts.values()][0],body=p.actorSprites.get(a.instanceId);const scale=Math.abs(body.y+(173-body.originY*194)*body.displayHeight/194-ground)<1.01&&Math.abs(body.displayWidth-201.6)<1e-6;
   const targetAnchor=!!flower&&impact.targetId===b.instanceId,flowerAlpha=flower?.alpha,mirror=body.flipX===(sign<0),frame=body.frame.name,healAt=h?.eventAt-startedAt,amount=h?.amount,expected=b.maxHp*[.25,.30,.35,.40][Number(tier.slice(1))];
   const snap=()=>JSON.stringify([s.elapsedSeconds,body.frame.name,flower?.x,flower?.y,flower?.alpha]),before=snap();paint();const pause=before===snap();
   window.specialProbe={a,b,other,advance,paint,cast,ready,hits,sc,p};
   return {tier,tactical,reduced,sign,renderer:sc.game.renderer.type,callbackUsed,noEarlyHeal,sourceAlpha,f2,healAt,amount,expected,targetAnchor,flowerAlpha,mirror,frame,scale,pause};
  },{tactical,sign,built,tier,reduced});report.current=c;
  if(built||tactical&&!reduced&&sign===1){const file=`${built?'built':'native'}-${tier}-${reduced?'reduced':'normal'}-${sign}.png`;await page.locator('canvas').screenshot({path:path.join(out,file)});c.screenshot=file;}
  Object.assign(c,await page.evaluate(()=>{
   const {a,b,other,advance,paint,cast,ready,hits,sc,p}=window.specialProbe,s=sc.session;
   advance(.08);const expanded=[...p.stagedImpactSprites.values()][0]?.alpha===1;advance(.12);const f4=p.actorSprites.get(a.instanceId).frame.name==='672.0.224.194';advance(.24);const idle=p.actorSprites.get(a.instanceId).texture.key.endsWith('chiru.battleIdle'),expired=p.actions.active.size===0&&p.actionEffects.size===0&&p.stagedImpactSprites.size===0;
   b.heal(b.maxHp);other.heal(other.maxHp);a.heal(a.maxHp);const n=hits.length;cast();advance(.32);const zero=hits.length===n&&p.stagedImpactSprites.size===0;advance(.44);
   b.damage(b.maxHp*.6);cast();b.heal(b.maxHp);other.damage(other.maxHp*.7);advance(.32);const reselect=hits.at(-1)?.targetId===other.instanceId&&[...p.stagedImpacts.values()][0]?.targetId===other.instanceId;
   other.damage(other.hp);paint();const recipientKo=p.stagedImpactSprites.size===0;advance(.44);
   b.damage(b.maxHp*.2);cast();const moveX=a.x;s.setPlayerMovement(a.instanceId,{x:0,y:1});advance(.1);s.setPlayerMovement(a.instanceId,{x:0,y:0});const movement=a.y>0&&a.x===moveX&&s.pendingActions.has(a.instanceId);
   const count=hits.length;s.statuses.apply({sourceId:s.enemies[0].instanceId,targetId:a.instanceId,type:'control',magnitude:1,duration:.5},s.elapsedSeconds);advance(.23);const cancel=hits.length===count&&!p.actions.active.has(a.instanceId)&&!p.actionEffects.has(a.instanceId);s.statuses.clear();
   cast();advance(.1);a.damage(a.hp);advance(.23);const ko=hits.length===count&&p.actionEffects.size===0&&p.stagedImpactSprites.size===0;
   s.clearTransientCombat();paint();const end=s.pendingActions.size===0&&p.actionEffects.size===0&&p.stagedImpactSprites.size===0;
   window.previousChiruPresenter=p;sc.scene.restart();sc.game.loop.wake();return {expanded,f4,idle,expired,zero,reselect,recipientKo,movement,cancel,ko,end};
  }));
  await page.waitForFunction(()=>window.__chiruScene?.visualAssets!==window.previousChiruPresenter&&window.__chiruScene?.assetGate?.ready,null,{timeout:60000});
  c.restart=await page.evaluate(()=>{const sc=window.__chiruScene;sc.paused=true;sc.game.loop.sleep();return window.previousChiruPresenter.closed&&window.previousChiruPresenter.textureBytes===0&&sc.assetGate.ready;});
  report.cases.push(c);await context.close();
 }
 // Read actual Collection at phone width without replacing its product source.
 {const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),page=await context.newPage();await page.goto(base);await page.getByRole('button',{name:'COLLECTION',exact:true}).click();await page.locator('.collection-card[data-character-id="P3"]').click();const text=await page.locator('.collection-page').innerText();assert.match(text,/25%／30%／35%／40%/);assert.match(text,/7／6.44／5.88／5.04/);await page.screenshot({path:path.join(out,(built?'built':'native')+'-collection-phone.png')});report.collection={width:390,percentages:true,cooldowns:true};await context.close();}
 report.status='PASS';validateChiruSpecialBrowserReport(report,built);
}catch(error){report.status='FAIL';report.failure=String(error);report.serverLog=log;process.exitCode=1;}finally{await writeFile(path.join(out,built?'built-entry.json':'native.json'),JSON.stringify(report,null,2)+'\n');await browser?.close();server.kill('SIGTERM');}
console.log(JSON.stringify({status:report.status,built,cases:report.cases.length,failure:report.failure}));
