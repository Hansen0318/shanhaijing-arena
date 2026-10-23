import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const {chromium}=createRequire(path.resolve(process.env.ARENA_BROWSER_TOOL_ROOT??'.','package.json'))('playwright');
const built=process.argv.includes('--built'),port=built?4184:4183,base=`http://127.0.0.1:${port}/shanhaijing-arena/`,out=path.resolve(process.env.ARENA_BROWSER_OUTPUT??'.git/botuo-passive-browser');
await mkdir(out,{recursive:true});
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js',...(built?['preview']:[]),'--host','127.0.0.1','--port',String(port),'--strictPort'],{stdio:'pipe'});
let browser,log='';server.stderr.on('data',b=>log+=b);server.stdout.on('data',b=>log+=b);
const report={physicalPhone:false,built,errors:[],cases:[]};
try{
 for(let i=0;i<120;i++){try{if((await fetch(base)).ok)break;}catch{}if(i===119)throw Error(log);await new Promise(r=>setTimeout(r,100));}
 browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader']});
 for(const reduced of [false,true]){
  const context=await browser.newContext({viewport:{width:852,height:393},isMobile:true,hasTouch:true,reducedMotion:reduced?'reduce':'no-preference'}),page=await context.newPage();page.on('pageerror',e=>report.errors.push(String(e)));
  if(built){
   await page.route('**/assets/battleRuntime-*.js',async route=>{const response=await route.fetch(),body=await response.text();assert.equal(body.split('window.__arenaSmoke=').length,2);await route.fulfill({response,body:body.replace('window.__arenaSmoke=','window.__armorScene=this,window.__arenaSmoke=')});});
   await page.goto(base+'?campaignDev=unlock-all');await page.getByRole('button',{name:'BATTLE',exact:true}).click();await page.locator('.chapter-grid .campaign-card:not(:disabled)').first().click();await page.getByRole('button',{name:'1-3 available',exact:true}).click();await page.locator('.stage-page>.start').click();for(const id of ['P1','P2','P3'])await page.locator(`.roster-card[data-character-id="${id}"]`).click();await page.locator('.team-page .start.battle').click();await page.waitForFunction(()=>window.__armorScene?.assetGate?.ready&&window.__arenaSmoke?.battleStarted,null,{timeout:60000});
  }else{
   await page.route('**/__armor.html',r=>r.fulfill({contentType:'text/html',body:'<!doctype html><html><body style="margin:0"><div id="game"></div></body></html>'}));await page.goto(base+'__armor.html');
   await page.evaluate(async()=>{const {createArenaGame}=await import('/shanhaijing-arena/src/runtime/battleRuntime.js'),{createLabConfig}=await import('/shanhaijing-arena/src/dev/battleLab/config.js');window.armorGame=createArenaGame({data:{labConfig:createLabConfig({allyTeam:['P2','P1','P3'],enemyTeam:['P2','P4','P5'],skipCountdown:true}),onSceneReady:sc=>{window.__armorScene=sc;sc.paused=true;queueMicrotask(()=>sc.game.loop.sleep());}},isCurrent:()=>true,onBoot(){}});});await page.waitForFunction(()=>window.__armorScene?.assetGate?.ready,null,{timeout:60000});
  }
  await page.evaluate(()=>{const sc=window.__armorScene;sc.game.loop.sleep();sc.paused=true;window.armorTemplate=sc.session;});
  for(const [tier,reduction]of [['T0',.2],['T1',.3],['T2',.4],['T3',.5]])for(const side of built?['ally']:['ally','enemy']){
   const result=await page.evaluate(({tier,reduction,side,built})=>{
    const sc=window.__armorScene,t=window.armorTemplate;
    const fresh=(enabled=true)=>{
     const actors=t.actors.map((a,i)=>new a.constructor(t.characterDefinitions[a.definitionId],{instanceId:a.instanceId,teamId:a.teamId,x:i<3?-2:11,y:i%3===0?-1.8:1.8})),defs=enabled?t.abilityDefinitions:{...t.abilityDefinitions,'P2.passive':{...t.abilityDefinitions['P2.passive'],implemented:false}};
     const s=new t.constructor({allies:actors.slice(0,3),enemies:actors.slice(3),characterDefinitions:t.characterDefinitions,abilityDefinitions:defs,tierByActorId:Object.fromEntries(actors.map(a=>[a.instanceId,tier])),tacticalEnabled:false,rng:()=>.99});
     for(const a of actors){s.holdPlayerControl(a.instanceId);s.setPlayerMovement(a.instanceId,{x:0,y:0});s.cadence.set(a.instanceId,99);for(const c of ['heavy','special','awakening'])Object.assign(a.abilityState[c],{phase:'cooldown',cooldownRemaining:99});}return s;
    };
    const step=(s,dt)=>{for(const a of s.actors)s.holdPlayerControl(a.instanceId);s.step(dt);},paint=()=>{sc.applyFrame(sc.session.snapshot());sc.game.step(performance.now(),0);},team=s=>side==='ally'?s.allies:s.enemies;
    const setup=(enabled=true)=>{const s=fresh(enabled),a=team(s).find(a=>a.definitionId==='P2'),enemy=(side==='ally'?s.enemies:s.allies).find(a=>a.definitionId!=='P2');if(!a||!enemy)throw Error('Missing fixture actors');Object.assign(a,{x:3,y:0});Object.assign(enemy,{x:4,y:0});return {s,a,enemy};};
    const current=setup(),{s,a,enemy}=current;sc.session=s;sc.visualAssets.facings.clear();sc.visualAssets.states.clear();paint();const sprite=sc.visualAssets.actorSprites.get(a.instanceId),geometry=[sprite.displayWidth,sprite.displayHeight,sprite.originX,sprite.originY];
    let callbackUsed=false;if(built){sc.paused=false;sc.selectAlly(a.instanceId,s.snapshot());const rect=sc.game.canvas.getBoundingClientRect();sc.joystickBase.emit('pointerdown',{id:77,event:{clientX:rect.left+102*rect.width/1120,clientY:rect.top+435*rect.height/540}});callbackUsed=sc.joystickPointerId===77&&sc.joystickVector.x>.999;sc.advanceBattle(.05);sc.paused=true;sc.joystickPointerId=null;sc.joystickVector={x:0,y:0};s.setPlayerMovement(a.instanceId,{x:0,y:0});}
    else step(s,.05);
    if(built){step(s,.01);paint();}
    const v=()=>s.snapshot().passives.find(v=>v.instanceId===a.instanceId),start=v().active.startTime,expiryAt=v().active.expiryTime,readyAt=v().readyAt,segments=v().presentation.segments;
    const hit=f=>{const {s,a,enemy}=f,before=a.hp,definition=s.actorAbilityDefinitions.get(enemy.instanceId)[s.definitionForActor(enemy).abilities.basic];s.pendingHits.push({actorId:enemy.instanceId,targetId:a.instanceId,due:s.elapsedSeconds+.01,definition,category:'basic',source:'ai',hitIndex:0,totalHits:1});step(s,.01);return before-a.hp;};
    const baseline=setup(false),baselineDamage=hit(baseline),actualDamage=hit(current);paint();const plates=sc.passivePresenter.plates.size>0,geometryAtHit=[sprite.displayWidth,sprite.displayHeight,sprite.originX,sprite.originY],stableGeometry=geometry.every((x,i)=>Math.abs(x-geometryAtHit[i])<1e-8);
    const texts=[];const visit=o=>{if(typeof o.text==='string')texts.push(o.text);if(Array.isArray(o.list))o.list.forEach(visit);};sc.children.list.forEach(visit);const noText=!texts.some(s=>/厚甲|疾行|走位|移速/.test(s))&&sc.passivePresenter.badges.size===0&&!sc.passivePresenter.hud;
    s.statuses.apply({sourceId:a.instanceId,targetId:a.instanceId,key:'probe.stronger',type:'mitigation',magnitude:.55,duration:.1},s.elapsedSeconds);paint();const suppressed=!v().active.effective&&!sc.passivePresenter.plates.has(a.instanceId+'.P2.passive');step(s,.1);paint();const resumed=v().active.effective&&sc.passivePresenter.plates.has(a.instanceId+'.P2.passive');
    s.statuses.applyMitigation(a.instanceId,{T0:.25,T1:.275,T2:.3,T3:.3375}[tier],5,s.elapsedSeconds);const combined=s.statuses.damageMultiplier(a.instanceId,s.elapsedSeconds);step(s,start+4-s.elapsedSeconds);paint();const expiry=v().active===null;step(s,start+8-s.elapsedSeconds);const repeat=v().active?.startTime;
    sc.paused=false;sc.togglePause();const before=JSON.stringify(s.snapshot());sc.advanceBattle(1);const pause=before===JSON.stringify(s.snapshot());
    a.damage(a.hp);step(s,.01);paint();const koCleared=!s.snapshot().passives.some(v=>v.instanceId===a.instanceId)&&!sc.passivePresenter.plates.has(a.instanceId+'.P2.passive');
    s.clearTransientCombat();paint();const endCleared=s.statuses.records.size===0&&s.snapshot().passives.length===0&&sc.passivePresenter.plates.size===0;
    const screen=setup();sc.session=screen.s;sc.visualAssets.facings.clear();sc.visualAssets.states.clear();step(screen.s,.05);paint();
    return {tier,side,reduction,actualDamage,baselineDamage,damageRatio:actualDamage/baselineDamage,start,expiryAt,readyAt,duration:expiryAt-start,cooldown:readyAt-start,segments,plates,stableGeometry,geometryBefore:geometry,geometryAfter:geometryAtHit,noText,suppressed,resumed,combined,expiry,repeat,pause,koCleared,endCleared,callbackUsed,renderer:sc.game.renderer.type,viewport:{width:852,height:393}};
   },{tier,reduction,side,built});
   report.current=result;if(!result.stableGeometry)await page.locator('canvas').screenshot({path:path.join(out,'observed-'+tier+'-'+side+'.png')});assert.equal(result.renderer,2);assert.equal(result.duration,4);assert.equal(result.cooldown,8);assert.equal(result.segments,['T0','T1','T2','T3'].indexOf(tier)+1);assert.ok(Math.abs(result.damageRatio-(1-reduction))<1e-8,JSON.stringify(result));for(const key of ['plates','stableGeometry','noText','suppressed','resumed','expiry','pause','koCleared','endCleared'])assert.equal(result[key],true,key);assert.ok(Math.abs(result.repeat-8)<1e-8);assert.ok(Math.abs(result.combined-(1-Math.max(reduction,{T0:.25,T1:.275,T2:.3,T3:.3375}[tier])))<1e-8);if(built)assert.equal(result.callbackUsed,true);
   const screenshot=`${built?'built':'native'}-${tier}-${side}-${reduced?'reduced':'normal'}.png`;await page.locator('canvas').screenshot({path:path.join(out,screenshot)});
   await page.evaluate(()=>{const sc=window.__armorScene;window.oldArmorPresenter=sc.passivePresenter;sc.scene.restart();sc.game.loop.wake();});await page.waitForFunction(()=>window.__armorScene?.passivePresenter!==window.oldArmorPresenter&&window.__armorScene?.assetGate?.ready,null,{timeout:60000});
   result.restart=await page.evaluate(()=>{const sc=window.__armorScene;sc.paused=true;sc.game.loop.sleep();return window.oldArmorPresenter.closed&&window.oldArmorPresenter.plates.size===0&&sc.passivePresenter.plates.size===0&&sc.session.snapshot().passives.every(v=>!v.active&&v.readyAt===0);});assert.equal(result.restart,true);
   report.cases.push({...result,reduced,screenshot});
   if(built){await page.evaluate(()=>{const sc=window.__armorScene;sc.paused=false;sc.game.loop.wake();});await page.waitForFunction(()=>window.__arenaSmoke?.battleStarted,null,{timeout:60000});await page.evaluate(()=>{const sc=window.__armorScene;sc.paused=true;sc.game.loop.sleep();});}
  }
  await context.close();
 }
 assert.deepEqual(report.errors,[]);report.status='PASS';
}catch(e){report.status='FAIL';report.error=String(e?.stack??e);process.exitCode=1;}
finally{await browser?.close();server.kill();await writeFile(path.join(out,built?'built-entry.json':'native.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({status:report.status,cases:report.cases.length,error:report.error}));}
