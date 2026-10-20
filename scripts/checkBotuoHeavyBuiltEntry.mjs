// Actual built campaign entry and Heavy control callback; test-only response binding.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const require=createRequire(path.resolve(process.env.ARENA_BROWSER_TOOL_ROOT??'.','package.json'));
const {chromium}=require('playwright'),out=path.resolve(process.env.ARENA_BROWSER_OUTPUT??'.git/botuo-heavy-built-entry');await mkdir(out,{recursive:true});
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4175','--strictPort'],{stdio:'pipe'});let serverLog='',browser;server.stdout.on('data',b=>serverLog+=b);server.stderr.on('data',b=>serverLog+=b);
const report={kind:'Actual built mobile-emulation Campaign→Stage→Team→countdown→Arena; Heavy callback, HP/contact, Pause/Restart/cleanup. Not physical touch/phone verification.',cases:[],errors:[]};
try{
 for(let i=0;i<100;i++){try{if((await fetch('http://127.0.0.1:4175/shanhaijing-arena/')).ok)break;}catch{}if(i===99)throw Error(serverLog);await new Promise(r=>setTimeout(r,100));}
 browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader']});
 for(const reduced of [false,true]){
  const context=await browser.newContext({viewport:{width:852,height:393},deviceScaleFactor:1,isMobile:true,hasTouch:true,reducedMotion:reduced?'reduce':'no-preference'}),page=await context.newPage();page.on('pageerror',e=>report.errors.push(String(e)));
  let bindings=0;
  await page.route('**/assets/battleRuntime-*.js',async route=>{const response=await route.fetch(),body=await response.text();assert.equal(body.split('window.__arenaSmoke=').length,2);bindings++;await route.fulfill({response,body:body.replace('window.__arenaSmoke=','window.__heavyScene=this,window.__arenaSmoke=')});});
  await page.goto('http://127.0.0.1:4175/shanhaijing-arena/?campaignDev=unlock-all');
  await page.getByRole('button',{name:'BATTLE',exact:true}).click();await page.locator('.chapter-grid .campaign-card:not(:disabled)').first().click();await page.getByRole('button',{name:'1-3 available',exact:true}).click();await page.locator('.stage-page>.start').click();
  for(const id of ['P2','P1','P3'])await page.locator(`.roster-card[data-character-id="${id}"]`).click();await page.locator('.team-page .start.battle').click();
  await page.waitForFunction(()=>window.__arenaSmoke?.battleStarted&&window.__heavyScene?.assetGate?.ready,null,{timeout:60000});
  await page.locator('.battle-controls').getByRole('button',{name:'Pause',exact:true}).click();await page.locator('.battle-controls').getByRole('button',{name:'Resume',exact:true}).waitFor();
  const start=await page.evaluate(()=>{
   const sc=window.__heavyScene,s=sc.session;sc.game.loop.sleep();s.clearTransientCombat();
   for(const a of s.actors){a.heal(a.maxHp);Object.assign(a,{x:12,y:3});s.holdPlayerControl(a.instanceId);s.setPlayerMovement(a.instanceId,{x:0,y:0});s.cadence.set(a.instanceId,99);for(const cat of ['heavy','special','awakening'])Object.assign(a.abilityState[cat],{phase:'cooldown',cooldownRemaining:99});}
   const a=s.allies.find(a=>a.definitionId==='P2'),t=s.enemies[0];Object.assign(a,{x:4,y:0});Object.assign(t,{x:4.7,y:0});Object.assign(a.abilityState.heavy,{phase:'ready',cooldownRemaining:0});s.targetIds.set(a.instanceId,t.instanceId);sc.selectAlly(a.instanceId,s.snapshot());sc.visualAssets.facings.clear();sc.applyFrame(s.snapshot());
   window.heavyBuilt={actorId:a.instanceId,targetId:t.instanceId,start:s.elapsedSeconds,hp:t.hp};sc.paused=false;sc.skillButtons.get('heavy').base.emit('pointerdown');sc.paused=true;sc.game.step(performance.now(),0);
   const b=sc.visualAssets.actorSprites.get(a.instanceId);return {selected:a.definitionId,stage:window.__arenaSmoke.stageId,texture:b.texture.key,frame:b.frame.name,hp:t.hp,before:window.heavyBuilt.hp,bytes:sc.visualAssets.textureBytes,keys:sc.visualAssets.textures.size};
  });assert.equal(start.selected,'P2');assert.equal(start.stage,'1-3');assert.ok(start.texture.endsWith('botuo.heavyPoses'));assert.equal(start.frame,'0.0.175.162');assert.equal(start.hp,start.before);assert.equal(bindings,1);
  const hit=await page.evaluate(()=>{const sc=window.__heavyScene,s=sc.session;for(const a of s.actors){s.holdPlayerControl(a.instanceId);s.setPlayerMovement(a.instanceId,{x:0,y:0});}s.step(.65);sc.renderCastEvents();sc.applyFrame(s.snapshot());sc.game.step(performance.now(),0);const b=sc.visualAssets.actorSprites.get(window.heavyBuilt.actorId);return {frame:b.frame.name,hp:s.actorById(window.heavyBuilt.targetId).hp,elapsed:s.elapsedSeconds-window.heavyBuilt.start,contacts:sc.visualAssets.stagedImpacts.size,width:b.displayWidth,height:b.displayHeight};});
  assert.equal(hit.frame,'350.0.175.162');assert.ok(hit.hp<start.hp);assert.ok(Math.abs(hit.elapsed-.65)<1e-8);assert.ok(hit.contacts>=1);assert.equal(hit.width,175);assert.equal(hit.height,162);
  const file=`built-${reduced?'reduced':'normal'}-heavy-contact.png`;await page.locator('canvas').screenshot({path:path.join(out,file)});
  const paused=await page.evaluate(()=>{const sc=window.__heavyScene,s=sc.session,p=sc.visualAssets,old=JSON.stringify([s.elapsedSeconds,p.actorSprites.get(window.heavyBuilt.actorId).frame.name,[...p.stagedImpactSprites.values()].map(v=>[v.x,v.y,v.alpha])]);sc.applyFrame(s.snapshot());sc.game.step(performance.now(),0);return old===JSON.stringify([s.elapsedSeconds,p.actorSprites.get(window.heavyBuilt.actorId).frame.name,[...p.stagedImpactSprites.values()].map(v=>[v.x,v.y,v.alpha])]);});assert.ok(paused);
  await page.evaluate(()=>{const sc=window.__heavyScene;window.previousHeavyPresenter=sc.visualAssets;sc.scene.restart();sc.game.loop.wake();});
  await page.waitForFunction(()=>window.__heavyScene?.visualAssets!==window.previousHeavyPresenter&&window.__heavyScene?.assetGate?.ready,null,{timeout:60000});
  const restart=await page.evaluate(()=>{const sc=window.__heavyScene;sc.paused=true;sc.game.loop.sleep();return {oldClosed:window.previousHeavyPresenter.closed,oldBytes:window.previousHeavyPresenter.textureBytes,newBytes:sc.visualAssets.textureBytes,newReady:sc.assetGate.ready};});assert.equal(restart.oldClosed,true);assert.equal(restart.oldBytes,0);assert.equal(restart.newReady,true);assert.ok(restart.newBytes<=16777216-131072);
  const cleanup=await page.evaluate(()=>{const sc=window.__heavyScene,p=sc.visualAssets;sc.game.destroy(true);sc.game.step(performance.now(),0);return {closed:p.closed,bytes:p.textureBytes};});assert.deepEqual(cleanup,{closed:true,bytes:0});report.cases.push({reduced,start,hit,file,pauseFrozen:paused,restart,cleanup});await context.close();
 }
 assert.deepEqual(report.errors,[]);report.status='PASS';await writeFile(path.join(out,'built-entry.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({status:'PASS',cases:report.cases.length}));
}catch(error){report.status='FAIL';report.failure=String(error);report.serverLog=serverLog;await writeFile(path.join(out,'built-entry.json'),JSON.stringify(report,null,2)+'\n');throw error;}finally{await browser?.close();server.kill('SIGTERM');}
