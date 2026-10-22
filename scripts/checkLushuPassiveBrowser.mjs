// Real Phaser and built-route verification. Controlled fixtures below never ship in the product.
import assert from 'node:assert/strict';import {spawn} from 'node:child_process';import {createRequire} from 'node:module';import {mkdir,writeFile} from 'node:fs/promises';import path from 'node:path';
const {chromium}=createRequire(path.resolve(process.env.ARENA_BROWSER_TOOL_ROOT??'.','package.json'))('playwright');
const built=process.argv.includes('--built'),port=built?4182:4181,base=`http://127.0.0.1:${port}/shanhaijing-arena/`,out=path.resolve(process.env.ARENA_BROWSER_OUTPUT??'.git/passive-browser');await mkdir(out,{recursive:true});
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js',...(built?['preview']:[]),'--host','127.0.0.1','--port',String(port),'--strictPort'],{stdio:'pipe'});let browser,log='';server.stdout.on('data',b=>log+=b);server.stderr.on('data',b=>log+=b);
const report={kind:built?'Actual built Campaign route, real joystick callback and controlled precise follow-up':'Actual native Phaser WebGL with real session fixtures',physicalPhone:false,errors:[],cases:[]};
try{
 for(let i=0;i<120;i++){try{if((await fetch(base)).ok)break;}catch{}if(i===119)throw Error(log);await new Promise(r=>setTimeout(r,100));}
 browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader']});
 for(const reduced of [false,true])for(const side of built?['ally']:['ally','enemy']){
  const context=await browser.newContext({viewport:built?{width:852,height:393}:{width:1120,height:540},isMobile:built,hasTouch:built,reducedMotion:reduced?'reduce':'no-preference'}),page=await context.newPage();page.on('pageerror',e=>report.errors.push(String(e)));
  if(built){
   await page.route('**/assets/battleRuntime-*.js',async route=>{const response=await route.fetch(),body=await response.text();assert.equal(body.split('window.__arenaSmoke=').length,2);await route.fulfill({response,body:body.replace('window.__arenaSmoke=','window.__passiveScene=this,window.__arenaSmoke=')});});
   await page.goto(base+'?campaignDev=unlock-all');await page.getByRole('button',{name:'BATTLE',exact:true}).click();await page.locator('.chapter-grid .campaign-card:not(:disabled)').first().click();await page.getByRole('button',{name:'1-3 available',exact:true}).click();await page.locator('.stage-page>.start').click();for(const id of ['P1','P2','P3'])await page.locator(`.roster-card[data-character-id="${id}"]`).click();await page.locator('.team-page .start.battle').click();
   await page.waitForFunction(()=>window.__passiveScene?.assetGate?.ready&&window.__arenaSmoke?.battleStarted,null,{timeout:60000});
  }else{
   await page.route('**/__passive_probe.html',r=>r.fulfill({contentType:'text/html',body:'<!doctype html><html><body style="margin:0"><div id="game"></div></body></html>'}));await page.goto(base+'__passive_probe.html');
   await page.evaluate(async()=>{const {createArenaGame}=await import('/shanhaijing-arena/src/runtime/battleRuntime.js'),{createLabConfig}=await import('/shanhaijing-arena/src/dev/battleLab/config.js');window.passiveGame=createArenaGame({data:{labConfig:createLabConfig({allyTeam:['P1','P1','P1'],enemyTeam:['P1','P1','P1'],skipCountdown:true}),onSceneReady:sc=>{window.__passiveScene=sc;sc.paused=true;queueMicrotask(()=>sc.game.loop.sleep());}},isCurrent:()=>true,onBoot(){}});});
   await page.waitForFunction(()=>window.__passiveScene?.assetGate?.ready,null,{timeout:60000});
  }
  const initial=await page.evaluate(({side,built})=>{
   const sc=window.__passiveScene;sc.game.loop.sleep();sc.paused=true;const template=sc.session,definitions=template.characterDefinitions,abilities=template.abilityDefinitions;
   window.freshPassive=(allP1=false,disabled=false)=>{
    const actors=template.actors.map((a,i)=>new a.constructor(definitions[allP1?'P1':a.definitionId],{instanceId:a.instanceId,teamId:a.teamId,x:10,y:i<3?1.8:-1.8}));
    const defs=disabled?{...abilities,'P1.passive':{...abilities['P1.passive'],implemented:false}}:abilities;
    const s=new template.constructor({allies:actors.slice(0,3),enemies:actors.slice(3),characterDefinitions:definitions,abilityDefinitions:defs,tacticalEnabled:false,rng:()=>.99});
    for(const a of actors){s.holdPlayerControl(a.instanceId);s.setPlayerMovement(a.instanceId,{x:0,y:0});s.cadence.set(a.instanceId,99);for(const c of ['heavy','special','awakening'])Object.assign(a.abilityState[c],{phase:'cooldown',cooldownRemaining:99});}
    return s;
   };
   window.stepPassive=(s,dt)=>{for(const a of s.actors)s.holdPlayerControl(a.instanceId);s.step(dt);};
   window.paintPassive=()=>{const s=sc.session;sc.applyFrame(s.snapshot());sc.game.step(performance.now(),0);};
   const s=window.freshPassive();sc.session=s;const actor=s.actors.find(a=>a.definitionId==='P1'&&(side==='ally'?s.allies:s.enemies).includes(a));if(!actor)throw Error('No real caster');Object.assign(actor,{x:0,y:0});window.passiveActorId=actor.instanceId;
   let callbackUsed=false;
   if(built){sc.paused=false;sc.selectAlly(actor.instanceId,s.snapshot());const rect=sc.game.canvas.getBoundingClientRect(),sx=rect.width/1120,sy=rect.height/540;sc.joystickBase.emit('pointerdown',{id:77,event:{clientX:rect.left+102*sx,clientY:rect.top+435*sy}});callbackUsed=sc.joystickPointerId===77&&sc.joystickVector.x>.999;for(const a of s.actors)s.holdPlayerControl(a.instanceId);sc.advanceBattle(.05);sc.paused=true;}else{s.setPlayerMovement(actor.instanceId,{x:1,y:0});}
   const speed=s.definitionForActor(actor).stats.moveSpeed;window.stepPassive(s,1/speed-s.elapsedSeconds);window.paintPassive();
   const badge=[...sc.passivePresenter.badges.values()].find(b=>b.actorId===actor.instanceId),view=s.snapshot().passives.find(v=>v.instanceId===actor.instanceId);if(!badge||!view.active)throw Error('Actual passive did not activate at distance threshold');
   const rect=sc.game.canvas.getBoundingClientRect(),scale=Math.min(rect.width/1120,rect.height/540),textBounds=badge.text.getBounds(),layout=badge.layout;
   const reserved=[badge.layout.anchor.rect],overlap=(a,b)=>a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y;
   return {renderer:sc.game.renderer.type,callbackUsed,metrics:{cssFontSize:parseFloat(badge.text.style.fontSize)*scale,visible:badge.container.visible&&badge.text.visible&&badge.text.alpha>0,intersections:reserved.filter(r=>overlap(textBounds,r)).length,text:badge.text.text,actualTextWidth:textBounds.width,layoutWidth:layout.width,textFits:textBounds.width<=layout.width-12},time:s.elapsedSeconds,speed,view,hud:sc.passivePresenter.hudText.text};
  },{side,built});
  assert.equal(initial.renderer,2);assert.equal(initial.metrics.visible,true);assert.ok(initial.metrics.cssFontSize>=12);assert.equal(initial.metrics.intersections,0);assert.equal(initial.metrics.text,'疾行 +8%');assert.equal(initial.metrics.textFits,true);if(built)assert.equal(initial.callbackUsed,true);
  const prefix=`${built?'built':'native'}-${side}-${reduced?'reduced':'normal'}`,screenshots=[prefix+'-active.png'];await page.locator('canvas').screenshot({path:path.join(out,screenshots[0])});
  const numeric=await page.evaluate(()=>{
   const sc=window.__passiveScene,s=sc.session,id=window.passiveActorId,a=s.actorById(id),baseline=window.freshPassive(false,true),b=baseline.actorById(id),start=s.elapsedSeconds;
   Object.assign(b,{x:a.x,y:a.y});baseline.elapsedSeconds=start;baseline.setPlayerMovement(id,{x:1,y:0});const ax=a.x,bx=b.x,baseSpeed=s.definitionForActor(a).stats.moveSpeed,activeSpeed=s.snapshot().passives.find(v=>v.instanceId===id).effectiveMoveSpeed;
   window.stepPassive(s,2);window.stepPassive(baseline,2);window.paintPassive();return {baseSpeed,activeSpeed,baseDistance:b.x-bx,activeDistance:a.x-ax,expiry:!s.snapshot().passives.find(v=>v.instanceId===id).active&&![...sc.passivePresenter.badges.values()].some(v=>v.actorId===id)};
  });assert.ok(Math.abs(numeric.activeSpeed/numeric.baseSpeed-1.08)<1e-8);assert.ok(Math.abs(numeric.activeDistance/numeric.baseDistance-1.08)<1e-8);assert.equal(numeric.expiry,true);
  const states=await page.evaluate(()=>{
   const sc=window.__passiveScene,id=window.passiveActorId,s=window.freshPassive();sc.session=s;const a=s.actorById(id);Object.assign(a,{x:4,y:0});s.setPlayerMovement(id,{x:1,y:0});window.stepPassive(s,1/s.definitionForActor(a).stats.moveSpeed);window.paintPassive();const facings=[];
   for(const sign of [-1,1]){s.setPlayerMovement(id,{x:sign,y:0});window.stepPassive(s,.01);window.paintPassive();facings.push(sc.visualAssets.actorSprites.get(id).flipX);}
   sc.paused=false;sc.togglePause();const before=JSON.stringify(s.snapshot());sc.advanceBattle(1);window.paintPassive();const pause=before===JSON.stringify(s.snapshot());
   s.statuses.apply({sourceId:id,targetId:id,key:'tier-control',type:'movement',magnitude:1.1,duration:1},s.elapsedSeconds);window.paintPassive();const badge=[...sc.passivePresenter.badges.values()].find(b=>b.actorId===id),view=s.snapshot().passives.find(v=>v.instanceId===id),cap={text:badge.text.text,ratio:view.effectiveMoveSpeed/s.definitionForActor(a).stats.moveSpeed};
   a.damage(a.maxHp);window.stepPassive(s,.01);window.paintPassive();return {facings,pause,cap,koCleared:![...sc.passivePresenter.badges.values()].some(b=>b.actorId===id)};
  });assert.deepEqual([...states.facings].sort(),[false,true]);assert.equal(states.pause,true);assert.equal(states.cap.text,'疾行 · 移速上限15%');assert.ok(Math.abs(states.cap.ratio-1.15)<1e-8);assert.equal(states.koCleared,true);
  const overlap=await page.evaluate(()=>{
   const sc=window.__passiveScene,s=window.freshPassive(true);sc.session=s;
   for(const a of s.actors){Object.assign(a,{x:0,y:0});s.setPlayerMovement(a.instanceId,{x:1,y:0});}window.stepPassive(s,1/2.05);for(const a of s.actors)Object.assign(a,{x:4,y:0});window.paintPassive();
   const layouts=sc.passivePresenter.layouts,rect=sc.game.canvas.getBoundingClientRect(),scale=Math.min(rect.width/1120,rect.height/540),boxes=[...sc.passivePresenter.badges.values()].map(b=>b.text.getBounds()),intersects=(a,b)=>a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y;
   let intersections=0;for(let i=0;i<layouts.length;i++)for(let j=i+1;j<layouts.length;j++)if(intersects(layouts[i],layouts[j]))intersections++;
   const fits=[...sc.passivePresenter.badges.values()].every(b=>b.text.getBounds().width<=b.layout.width-12);
   return {count:layouts.length,intersections,minCssFontSize:Math.min(...[...sc.passivePresenter.badges.values()].map(b=>parseFloat(b.text.style.fontSize)*scale)),fits,boxes};
  });assert.equal(overlap.count,6);assert.equal(overlap.intersections,0);assert.ok(overlap.minCssFontSize>=12);assert.equal(overlap.fits,true);
  screenshots.push(prefix+'-overlap.png');await page.locator('canvas').screenshot({path:path.join(out,screenshots.at(-1))});
  await page.evaluate(()=>{const sc=window.__passiveScene;window.oldPassivePresenter=sc.passivePresenter;sc.scene.restart();sc.game.loop.wake();});await page.waitForFunction(()=>window.__passiveScene?.passivePresenter!==window.oldPassivePresenter&&window.__passiveScene?.assetGate?.ready,null,{timeout:60000});
  const cleanup=await page.evaluate(()=>{const sc=window.__passiveScene;sc.paused=true;sc.game.loop.sleep();return {oldClosed:window.oldPassivePresenter.closed,newClean:sc.session.snapshot().passives.every(v=>!v.active&&v.readyAt===0&&v.progressDistance===0)&&sc.passivePresenter.badges.size===0};});assert.equal(cleanup.oldClosed,true);assert.equal(cleanup.newClean,true);
  report.cases.push({side,reduced,viewport:built?{width:852,height:393}:{width:1120,height:540},facings:states.facings,metrics:initial.metrics,numeric:{baseSpeed:numeric.baseSpeed,activeSpeed:numeric.activeSpeed,baseDistance:numeric.baseDistance,activeDistance:numeric.activeDistance},expiry:numeric.expiry,pause:states.pause,cap:states.cap,overlap,cleanup:{...cleanup,koCleared:states.koCleared},callbackUsed:initial.callbackUsed,screenshots});await context.close();
 }
 assert.deepEqual(report.errors,[]);report.status='PASS';
}catch(error){report.status='FAIL';report.failure=String(error);report.serverLog=log;process.exitCode=1;}finally{await writeFile(path.join(out,built?'built-entry.json':'native.json'),JSON.stringify(report,null,2)+'\n');await browser?.close();server.kill('SIGTERM');}console.log(JSON.stringify({status:report.status,built,cases:report.cases.length,failure:report.failure}));
