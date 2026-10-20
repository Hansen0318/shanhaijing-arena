// Test-only diagnostics of the real built entry. No deployed/source instrumentation.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const require=createRequire(path.resolve(process.env.ARENA_BROWSER_TOOL_ROOT??'.','package.json'));
const {chromium}=require('playwright');
const out=path.resolve(process.env.ARENA_BROWSER_OUTPUT??'.git/actor-scale');
await mkdir(out,{recursive:true});
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4175','--strictPort'],{stdio:'pipe'});
let serverLog='',browser;
server.stdout.on('data',b=>serverLog+=b);server.stderr.on('data',b=>serverLog+=b);
const report={kind:'Actual built entry/UI, real Phaser and session; controlled actor positions and simulation after countdown. Not physical phone acceptance or independent anatomical approval.',cases:[],errors:[]};
try{
 for(let i=0;i<100;i++){try{if((await fetch('http://127.0.0.1:4175/shanhaijing-arena/')).ok)break;}catch{}if(i===99)throw Error(serverLog);await new Promise(r=>setTimeout(r,100));}
 browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader']});
 for(const reduced of [false,true])for(const stage of ['1-1','1-3']){
  const context=await browser.newContext({viewport:{width:852,height:393},deviceScaleFactor:1,isMobile:true,hasTouch:true,reducedMotion:reduced?'reduce':'no-preference'});
  const page=await context.newPage();page.on('pageerror',e=>report.errors.push(String(e)));
  // Expose the existing scene only in the browser-test response. Built files remain unchanged.
  let bindings=0;
  await page.route('**/assets/battleRuntime-*.js',async route=>{const response=await route.fetch(),body=await response.text();assert.equal(body.split('window.__arenaSmoke=').length,2);bindings++;await route.fulfill({response,body:body.replace('window.__arenaSmoke=','window.__scaleScene=this,window.__arenaSmoke=')});});
  // Existing campaignDev unlocks stages only; real starter ownership/team/UI retained.
  await page.goto('http://127.0.0.1:4175/shanhaijing-arena/?campaignDev=unlock-all');
  await page.getByRole('button',{name:'BATTLE',exact:true}).click();
  await page.locator('.chapter-grid .campaign-card:not(:disabled)').first().click();
  await page.getByRole('button',{name:stage+' available',exact:true}).click();
  await page.locator('.stage-page>.start').click();
  for(const id of ['P2','P1','P3'])await page.locator(`.roster-card[data-character-id="${id}"]`).click();
  await page.locator('.team-page .start.battle').click();
  await page.waitForFunction(()=>window.__arenaSmoke?.battleStarted&&window.__scaleScene?.assetGate?.ready,{},{timeout:60000});
  await page.locator('.battle-controls').getByRole('button',{name:'Pause',exact:true}).click();
  await page.locator('.battle-controls').getByRole('button',{name:'Resume',exact:true}).waitFor();
  const entry=await page.evaluate(()=>({stage:window.__arenaSmoke.stageId,started:window.__arenaSmoke.battleStarted}));assert.equal(entry.stage,stage);assert.equal(bindings,1);
  const record={stage,reduced,entry,actors:[]};report.cases.push(record);
  const ids=await page.evaluate(()=>{const scene=window.__scaleScene;scene.game.loop.sleep();return [...new Map(scene.session.actors.map(a=>[a.definitionId,a.instanceId])).values()];});
  for(const actorId of ids)for(const sign of [1,-1]){
   const result=await page.evaluate(({actorId,sign})=>{
    const scene=window.__scaleScene,s=scene.session,p=scene.visualAssets,a=s.actorById(actorId),d=s.characterDefinitions[a.definitionId],target=s.actors.find(t=>t.teamId!==a.teamId);
    s.clearTransientCombat();p.actions.clear();p.states.clear();p.facings.clear();p.actionFacings.clear();
    for(const actor of s.actors){if(actor.hp<=0)throw Error('Diagnostic actor unexpectedly KO before scale study');actor.heal(actor.maxHp);Object.assign(actor,{x:12,y:3});for(const c of ['heavy','special','awakening'])Object.assign(actor.abilityState[c],{phase:'cooldown',cooldownRemaining:99});s.cadence.set(actor.instanceId,99);s.holdPlayerControl(actor.instanceId);s.setPlayerMovement(actor.instanceId,{x:0,y:0});}
    Object.assign(a,{x:4,y:0});Object.assign(target,{x:4+.65*sign,y:0});
    const samples=[],images={};
    const capture=label=>{
     scene.renderCastEvents();scene.applyFrame(s.snapshot());scene.game.step(performance.now(),0);
     const b=p.actorSprites.get(actorId),state=p.states.get(actorId),active=p.actions.sample(actorId,s.elapsedSeconds,p.reducedMotion),descriptor=active?.descriptor.animation??state.descriptor,region=active?descriptor.frames[active.frameIndex]:descriptor.frames.find(f=>`${f.x}.${f.y}.${f.width}.${f.height}`===b.frame.name)??descriptor.frames[0];
     const matrix=b.getWorldTransformMatrix(),parent=b.parentContainer;
     samples.push({label,time:s.elapsedSeconds,actorId,characterId:a.definitionId,state:active?'action':state.state,texture:b.texture.key,frame:b.frame.name,source:[b.texture.source[0].width,b.texture.source[0].height],region,display:[b.displayWidth,b.displayHeight],scale:[b.scaleX,b.scaleY],origin:[b.originX,b.originY],parent:parent?{scale:[parent.scaleX,parent.scaleY],position:[parent.x,parent.y]}:null,worldMatrix:{a:matrix.a,b:matrix.b,c:matrix.c,d:matrix.d,tx:matrix.tx,ty:matrix.ty},position:[b.x,b.y],actorPosition:[a.x,a.y],flipX:b.flipX,descriptor:{source:descriptor.source,scale:descriptor.scale,origin:descriptor.origin},expected:[72*descriptor.scale*region.width/Math.max(region.width,region.height),72*descriptor.scale*region.height/Math.max(region.width,region.height)]});
     if(['idle-before','move-approach','basic-start','basic-4','idle-after','move-away','ko'].includes(label))images[label]=scene.game.canvas.toDataURL('image/png');
    };
    const step=(dt,movement=null)=>{for(const actor of s.actors){s.holdPlayerControl(actor.instanceId);s.setPlayerMovement(actor.instanceId,actor===a&&movement?movement:{x:0,y:0});}s.step(dt);};
    capture('idle-before');step(.05,{x:sign,y:0});capture('move-approach');step(.05);capture('idle-near');
    s.cadence.set(actorId,0);const accepted=s.executeAbility(a,'basic','ai',target);capture('basic-start');
    for(let i=0;i<15;i++){step(.05);capture('basic-'+i);}
    capture('idle-after');for(let i=0;i<40;i++)step(.05,{x:-sign,y:0});capture('move-away');const retreatDistance=Math.hypot(a.x-target.x,a.y-target.y);step(.05);capture('idle-away');
    // Extra non-phased VFX must not leave an actor transform behind.
    for(const category of ['heavy','special','awakening']){
     if(d.actionDescriptors?.[category])continue; // Protected P1 skills have existing raster gates.
     Object.assign(a.abilityState[category],{phase:'ready',cooldownRemaining:0});s.executeAbility(a,category,'ai',target);capture(category+'-cast');step(1);capture(category+'-after');
    }
    capture('pause-repaint');
    return {actorId,characterId:a.definitionId,sign,accepted,retreatDistance,samples,images,cache:p.textureBytes,reserve:p.residency.snapshot().optionalReserveBytes};
   },{actorId,sign});
   assert.equal(result.accepted,true,'real Basic accepted for '+result.characterId);
   assert.ok(result.retreatDistance>2,'retreat must actually leave the nearby target');
   for(const sample of result.samples){
    for(let i=0;i<2;i++)assert.ok(Math.abs(sample.display[i]-sample.expected[i])<1e-7,JSON.stringify(sample));
    assert.equal(sample.parent,null,'actor is not parented to VFX');
    assert.ok(Math.abs(sample.worldMatrix.a-sample.scale[0])<1e-7&&Math.abs(sample.worldMatrix.d-sample.scale[1])<1e-7,'no inherited scale');
    if(result.characterId==='P2'&&['battleIdle','battleMove','action'].includes(sample.state)){
     const face=sample.state==='action'?20:sample.state==='battleMove'?32:25,foot=sample.state==='action'?126:sample.state==='battleMove'?153:158;
     sample.anatomy={faceWorld:face*sample.display[0]/sample.region.width,groundOffset:(foot-sample.origin[1]*sample.region.height)*sample.display[1]/sample.region.height};
     const expectedFace=sample.state==='battleMove'?28.8:22.5;
     assert.ok(Math.abs(sample.anatomy.faceWorld-expectedFace)<1e-7);
     if(sample.state==='battleMove'){sample.anatomy.bodyDensity=sample.display[0]/sample.region.width;assert.ok(Math.abs(sample.anatomy.bodyDensity-.9)<1e-7);}assert.ok(Math.abs(sample.anatomy.groundOffset)<1e-7);
    }
   }
   const before=result.samples.find(x=>x.label==='idle-before'),after=result.samples.find(x=>x.label==='idle-away');
   assert.deepEqual(after.display,before.display);assert.equal(after.texture,before.texture);assert.deepEqual(after.origin,before.origin);assert.equal(result.reserve,131072);
   for(const [label,url]of Object.entries(result.images))await writeFile(path.join(out,`${stage}-${reduced?'reduced':'normal'}-${result.characterId}-${sign}-${label}.png`),Buffer.from(url.split(',')[1],'base64'));
   delete result.images;record.actors.push(result);
   await page.screenshot({path:path.join(out,`${stage}-${reduced?'reduced':'normal'}-${result.characterId}-${sign}-end.png`)});
  }
  // CharacterState.hp is getter-only. Use real damage, after all living-state
  // studies, so KO is actual engine state and no unsupported revival is needed.
  record.ko=await page.evaluate(()=>{
   const scene=window.__scaleScene,s=scene.session,p=scene.visualAssets;s.clearTransientCombat();
   for(const a of s.actors)a.damage(a.hp);
   scene.renderCastEvents();scene.applyFrame(s.snapshot());scene.game.step(performance.now(),0);
   const read=()=>s.actors.map(a=>{const b=p.actorSprites.get(a.instanceId);return {actorId:a.instanceId,characterId:a.definitionId,hp:a.hp,state:p.states.get(a.instanceId).state,source:p.actorTextureKeys.get(a.instanceId),expected:s.characterDefinitions[a.definitionId].animationDescriptors.battleKo.source,display:[b.displayWidth,b.displayHeight],origin:[b.originX,b.originY],flipX:b.flipX};});
   const before=read();scene.applyFrame(s.snapshot());scene.game.step(performance.now(),0);return {before,after:read()};
  });
  assert.deepEqual(record.ko.before,record.ko.after);for(const k of record.ko.before){assert.equal(k.hp,0);assert.equal(k.state,'battleKo');assert.equal(k.source,k.expected);}
  await page.screenshot({path:path.join(out,`${stage}-${reduced?'reduced':'normal'}-ko.png`)});
  // All-KO correctly opens the result screen, whose RETRY lives on canvas.
  // Exercise that actual UI before testing the in-battle restart dialog.
  const retry=await page.evaluate(()=>{const scene=window.__scaleScene;window.__koScalePresenter=scene.visualAssets;const b=scene.resultButtons.get('RETRY').button;scene.game.loop.wake();return {x:b.x,y:b.y,visible:scene.resultLayer.visible};});assert.equal(retry.visible,true);
  const canvas=await page.locator('canvas').boundingBox();await page.mouse.click(canvas.x+retry.x*canvas.width/1120,canvas.y+retry.y*canvas.height/540);
  await page.waitForFunction(()=>window.__scaleScene.visualAssets!==window.__koScalePresenter&&window.__scaleScene.assetGate?.ready,{},{timeout:60000});
  record.koRetry=await page.evaluate(()=>({oldClosed:window.__koScalePresenter.closed,oldBytes:window.__koScalePresenter.textureBytes}));assert.deepEqual(record.koRetry,{oldClosed:true,oldBytes:0});
  // Actual exit/restart UI, retaining old presenter to prove lifecycle cleanup.
  await page.evaluate(()=>{window.__oldScalePresenter=window.__scaleScene.visualAssets;window.__scaleScene.game.loop.wake();});
  await page.locator('.battle-controls').getByRole('button',{name:'Exit',exact:true}).click();
  await page.getByRole('dialog').getByRole('button',{name:'RESTART',exact:true}).click();
  await page.waitForFunction(()=>window.__scaleScene.visualAssets!==window.__oldScalePresenter&&window.__scaleScene.assetGate?.ready,{},{timeout:60000});
  record.restart=await page.evaluate(()=>({oldClosed:window.__oldScalePresenter.closed,oldBytes:window.__oldScalePresenter.textureBytes,newBytes:window.__scaleScene.visualAssets.textureBytes}));assert.equal(record.restart.oldClosed,true);assert.equal(record.restart.oldBytes,0);
  await page.locator('.battle-controls').getByRole('button',{name:'Exit',exact:true}).click();
  await page.getByRole('dialog').getByRole('button',{name:'EXIT',exact:true}).click();await page.locator('.stage-page').waitFor();record.exit=true;
  await context.close();
 }
 assert.deepEqual(report.errors,[]);report.status='PASS';
}catch(e){report.status='FAIL';report.failure=String(e);throw e;}
finally{report.serverLog=serverLog;await writeFile(path.join(out,'actor-scale.json'),JSON.stringify(report,null,2)+'\n');await browser?.close();server.kill('SIGTERM');console.log(JSON.stringify({status:report.status,cases:report.cases.length,errors:report.errors}));}
