import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const {chromium}=createRequire(path.resolve(process.env.ARENA_BROWSER_TOOL_ROOT??'.','package.json'))('playwright');
const built=process.argv.includes('--built'),port=built?4182:4181,base=`http://127.0.0.1:${port}/shanhaijing-arena/`,out=path.resolve(process.env.ARENA_BROWSER_OUTPUT??'.git/passive-v2-browser');
await mkdir(out,{recursive:true});
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js',...(built?['preview']:[]),'--host','127.0.0.1','--port',String(port),'--strictPort'],{stdio:'pipe'});
let browser,log='';server.stderr.on('data',b=>log+=b);server.stdout.on('data',b=>log+=b);
const report={version:2,physicalPhone:false,built,errors:[],cases:[]};
try{
 for(let i=0;i<120;i++){try{if((await fetch(base)).ok)break;}catch{}if(i===119)throw Error(log);await new Promise(r=>setTimeout(r,100));}
 browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader']});
 for(const reduced of [false,true]){
  const context=await browser.newContext({viewport:{width:852,height:393},isMobile:true,hasTouch:true,reducedMotion:reduced?'reduce':'no-preference'}),page=await context.newPage();page.on('pageerror',e=>report.errors.push(String(e)));
  if(built){
   await page.route('**/assets/battleRuntime-*.js',async route=>{const response=await route.fetch(),body=await response.text();assert.equal(body.split('window.__arenaSmoke=').length,2);await route.fulfill({response,body:body.replace('window.__arenaSmoke=','window.__passiveScene=this,window.__arenaSmoke=')});});
   await page.goto(base+'?campaignDev=unlock-all');await page.getByRole('button',{name:'BATTLE',exact:true}).click();await page.locator('.chapter-grid .campaign-card:not(:disabled)').first().click();await page.getByRole('button',{name:'1-3 available',exact:true}).click();await page.locator('.stage-page>.start').click();for(const id of ['P1','P2','P3'])await page.locator(`.roster-card[data-character-id="${id}"]`).click();await page.locator('.team-page .start.battle').click();await page.waitForFunction(()=>window.__passiveScene?.assetGate?.ready&&window.__arenaSmoke?.battleStarted,null,{timeout:60000});
  }else{
   await page.route('**/__passive_v2.html',r=>r.fulfill({contentType:'text/html',body:'<!doctype html><html><body style="margin:0"><div id="game"></div></body></html>'}));await page.goto(base+'__passive_v2.html');
   await page.evaluate(async()=>{const {createArenaGame}=await import('/shanhaijing-arena/src/runtime/battleRuntime.js'),{createLabConfig}=await import('/shanhaijing-arena/src/dev/battleLab/config.js');window.passiveGame=createArenaGame({data:{labConfig:createLabConfig({allyTeam:['P1','P2','P3'],enemyTeam:['P1','P4','P5'],skipCountdown:true}),onSceneReady:sc=>{window.__passiveScene=sc;sc.paused=true;queueMicrotask(()=>sc.game.loop.sleep());}},isCurrent:()=>true,onBoot(){}});});await page.waitForFunction(()=>window.__passiveScene?.assetGate?.ready,null,{timeout:60000});
  }
  await page.evaluate(()=>{const sc=window.__passiveScene;sc.game.loop.sleep();sc.paused=true;window.passiveTemplate=sc.session;});
  for(const [tier,gain]of [['T0',.35],['T1',.5],['T2',.65],['T3',.8]])for(const side of built?['ally']:['ally','enemy']){
   const result=await page.evaluate(({tier,gain,side,built})=>{
    const sc=window.__passiveScene,t=window.passiveTemplate;
    const fresh=(enabled=true)=>{const actors=t.actors.map((a,i)=>new a.constructor(t.characterDefinitions[a.definitionId],{instanceId:a.instanceId,teamId:a.teamId,x:10,y:i<3?1.8:-1.8})),defs=enabled?t.abilityDefinitions:{...t.abilityDefinitions,'P1.passive':{...t.abilityDefinitions['P1.passive'],implemented:false}};
     const s=new t.constructor({allies:actors.slice(0,3),enemies:actors.slice(3),characterDefinitions:t.characterDefinitions,abilityDefinitions:defs,tierByActorId:Object.fromEntries(actors.map(a=>[a.instanceId,tier])),tacticalEnabled:false,rng:()=>.99});for(const a of actors){s.holdPlayerControl(a.instanceId);s.cadence.set(a.instanceId,99);for(const c of ['heavy','special','awakening'])Object.assign(a.abilityState[c],{phase:'cooldown',cooldownRemaining:99});}return s;};
    const step=(s,dt)=>{for(const a of s.actors)s.holdPlayerControl(a.instanceId);s.step(dt);},paint=()=>{sc.applyFrame(sc.session.snapshot());sc.game.step(performance.now(),0);};
    const s=fresh(),a=(side==='ally'?s.allies:s.enemies).find(a=>a.definitionId==='P1');sc.session=s;Object.assign(a,{x:-2,y:0});s.setPlayerMovement(a.instanceId,{x:1,y:0});const base=s.definitionForActor(a).stats.moveSpeed;
    let callbackUsed=false;if(built){sc.paused=false;sc.selectAlly(a.instanceId,s.snapshot());const rect=sc.game.canvas.getBoundingClientRect();sc.joystickBase.emit('pointerdown',{id:77,event:{clientX:rect.left+102*rect.width/1120,clientY:rect.top+435*rect.height/540}});callbackUsed=sc.joystickPointerId===77&&sc.joystickVector.x>.999;sc.advanceBattle(.05);sc.paused=true;}
    step(s,1/base-s.elapsedSeconds);paint();const active=s.snapshot().passives.find(v=>v.instanceId===a.instanceId),bSession=fresh(false),b=bSession.actorById(a.instanceId);Object.assign(b,{x:a.x,y:a.y});bSession.elapsedSeconds=s.elapsedSeconds;bSession.setPlayerMovement(b.instanceId,{x:1,y:0});const x=a.x,bx=b.x;
    const texts=[];const visit=o=>{if(typeof o.text==='string')texts.push(o.text);if(Array.isArray(o.list))o.list.forEach(visit);};sc.children.list.forEach(visit);
    const noText=!texts.some(s=>/疾行|走位|移速/.test(s))&&sc.passivePresenter.badges.size===0&&!sc.passivePresenter.hud;
    step(s,2);step(bSession,2);const distance=a.x-x,baselineDistance=b.x-bx;s.setPlayerMovement(a.instanceId,{x:0,y:0});step(s,1);const expiry=!s.snapshot().passives.find(v=>v.instanceId===a.instanceId).active;
    paint();const facings=[];for(const sign of [-1,1]){s.setPlayerMovement(a.instanceId,{x:sign,y:0});step(s,.01);paint();facings.push(sc.visualAssets.actorSprites.get(a.instanceId).flipX);}
    sc.paused=false;sc.togglePause();const before=JSON.stringify(s.snapshot());sc.advanceBattle(1);const pause=before===JSON.stringify(s.snapshot());
    const c=fresh(),ca=c.actorById(a.instanceId);Object.assign(ca,{x:-2,y:0});c.setPlayerMovement(ca.instanceId,{x:1,y:0});step(c,1/base);for(const key of ['one','two'])c.statuses.apply({sourceId:ca.instanceId,targetId:ca.instanceId,key,type:'movement',magnitude:1.15,duration:1},c.elapsedSeconds);const combined=c.statuses.movementMultiplier(ca.instanceId,c.elapsedSeconds);c.setPlayerMovement(ca.instanceId,{x:0,y:0});step(c,1);const independentExpiry=c.statuses.movementMultiplier(ca.instanceId,c.elapsedSeconds);
    a.damage(a.maxHp);step(s,.01);const koCleared=!s.snapshot().passives.some(v=>v.instanceId===a.instanceId);c.clearTransientCombat();const endCleared=c.statuses.records.size===0&&c.snapshot().passives.length===0;
    sc.session=fresh();const selected=sc.session.actorById(a.instanceId);Object.assign(selected,{x:-2,y:0});sc.session.setPlayerMovement(selected.instanceId,{x:1,y:0});step(sc.session,1/base);paint();
    return {tier,side,gain,baseSpeed:base,activeSpeed:active.effectiveMoveSpeed,duration:active.active.expiryTime-active.active.startTime,cooldown:active.readyAt-active.active.startTime,distance,baselineDistance,noText,expiry,pause,combined,independentExpiry,koCleared,endCleared,facings,callbackUsed,renderer:sc.game.renderer.type,viewport:{width:852,height:393}};
   },{tier,gain,side,built});
   assert.equal(result.renderer,2);assert.ok(Math.abs(result.activeSpeed/result.baseSpeed-(1+gain))<1e-8);assert.ok(Math.abs(result.distance/result.baselineDistance-(1+gain))<1e-8);assert.equal(result.duration,3);assert.equal(result.cooldown,6);for(const key of ['noText','expiry','pause','koCleared','endCleared'])assert.equal(result[key],true,key);assert.deepEqual([...result.facings].sort(),[false,true]);assert.ok(Math.abs(result.combined-(1+gain+.15))<1e-8);assert.ok(Math.abs(result.independentExpiry-(1+gain))<1e-8);if(built)assert.equal(result.callbackUsed,true);
   const screenshot=`${built?'built':'native'}-${tier}-${side}-${reduced?'reduced':'normal'}.png`;await page.locator('canvas').screenshot({path:path.join(out,screenshot)});
   await page.evaluate(()=>{const sc=window.__passiveScene;window.oldPassivePresenter=sc.passivePresenter;sc.scene.restart();sc.game.loop.wake();});await page.waitForFunction(()=>window.__passiveScene?.passivePresenter!==window.oldPassivePresenter&&window.__passiveScene?.assetGate?.ready,null,{timeout:60000});
   result.restart=await page.evaluate(()=>{const sc=window.__passiveScene;sc.paused=true;sc.game.loop.sleep();return window.oldPassivePresenter.closed&&sc.session.snapshot().passives.every(v=>!v.active&&v.readyAt===0&&v.progressDistance===0)&&sc.passivePresenter.badges.size===0;});assert.equal(result.restart,true);
   report.cases.push({...result,reduced,screenshot});
   if(built){
    await page.evaluate(()=>{const sc=window.__passiveScene;sc.paused=false;sc.game.loop.wake();});
    await page.waitForFunction(()=>window.__arenaSmoke?.battleStarted,null,{timeout:60000});
    await page.evaluate(()=>{const sc=window.__passiveScene;sc.paused=true;sc.game.loop.sleep();});
   }
  }
  await context.close();
 }
 assert.deepEqual(report.errors,[]);report.status='PASS';
}catch(e){report.status='FAIL';report.error=String(e?.stack??e);process.exitCode=1;}
finally{await browser?.close();server.kill();await writeFile(path.join(out,built?'built-entry.json':'native.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({status:report.status,cases:report.cases.length,error:report.error}));}
