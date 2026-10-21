// Native Phaser/WebGL probe only: never deployment, device FPS or GPU-memory proof.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import path from 'node:path';
import {specialRuntimePacking} from '../src/assets/specialRuntimePacking.js';
const require=createRequire(path.resolve(process.env.ARENA_BROWSER_TOOL_ROOT??'.','package.json'));
const {chromium}=require('playwright'),out=path.resolve(process.env.ARENA_BROWSER_OUTPUT??'.git/botuo-special-browser');await mkdir(out,{recursive:true});
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','4173','--strictPort'],{stdio:'pipe'});let serverLog='',browser;
server.stdout.on('data',b=>serverLog+=b);server.stderr.on('data',b=>serverLog+=b);
const report={kind:'Controlled Chromium/Phaser WebGL utility/status + native trim equivalence, not physical phone verification',cases:[],trim:[],errors:[]};
try{
 for(let i=0;i<100;i++){try{if((await fetch('http://127.0.0.1:4173/shanhaijing-arena/')).ok)break;}catch{}if(i===99)throw Error(serverLog);await new Promise(r=>setTimeout(r,100));}
 browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader']});
 for(const reduced of [false,true])for(const sign of [-1,1]){
  const context=await browser.newContext({viewport:{width:1120,height:540},deviceScaleFactor:1,reducedMotion:reduced?'reduce':'no-preference'}),page=await context.newPage();page.on('pageerror',e=>report.errors.push(String(e)));
  await page.route('**/__special_smoke.html',r=>r.fulfill({contentType:'text/html',body:'<!doctype html><html><head><style>html,body{margin:0;background:#253648}canvas{display:block}</style></head><body><div id="game"></div></body></html>'}));
  await page.goto('http://127.0.0.1:4173/shanhaijing-arena/__special_smoke.html');
  await page.evaluate(async()=>{const {createArenaGame}=await import('/shanhaijing-arena/src/runtime/battleRuntime.js');const {createLabConfig}=await import('/shanhaijing-arena/src/dev/battleLab/config.js');window.fixtureGame=createArenaGame({data:{labConfig:createLabConfig({allyTeam:['P2','P3','P4'],enemyTeam:['P1','P5','P2'],allyTier:'T1',enemyTier:'T1',skipCountdown:true}),onSceneReady:scene=>{window.fixtureScene=scene;scene.paused=true;queueMicrotask(()=>scene.game.loop.sleep());}},isCurrent:()=>true,onBoot(){}});});
  await page.waitForFunction(()=>window.fixtureScene?.assetGate?.ready===true,null,{timeout:60000});
  const initial=await page.evaluate(sign=>{
   const sc=window.fixtureScene,s=sc.session,p=sc.visualAssets;sc.game.loop.sleep();
   for(const a of s.actors){s.holdPlayerControl(a.instanceId);s.setPlayerMovement(a.instanceId,{x:0,y:0});Object.assign(a,{x:12,y:3});s.cadence.set(a.instanceId,99);for(const c of ['heavy','special','awakening'])Object.assign(a.abilityState[c],{phase:'cooldown',cooldownRemaining:99});}
   const a=s.actorById('a1'),friend=s.actorById('a2'),enemy=s.actorById('e1');Object.assign(a,{x:4,y:0});Object.assign(friend,{x:4.5,y:0});Object.assign(enemy,{x:4+sign*.7,y:0});Object.assign(a.abilityState.special,{phase:'ready',cooldownRemaining:0});sc.applyFrame(s.snapshot());p.facings.set('a1',{x:4,y:0,now:s.elapsedSeconds,moving:false,flipX:sign<0});
   const hp=s.actors.map(v=>v.hp);if(!s.executeAbility(a,'special','player'))throw Error('Special rejected');sc.renderCastEvents();sc.applyFrame(s.snapshot());sc.game.step(performance.now(),0);
   const b=p.actorSprites.get('a1'),records=['a1','a2','a3'].map(id=>s.statuses.forActor(id,s.elapsedSeconds).map(r=>({id:r.id,magnitude:r.magnitude,duration:r.duration,presentationSource:r.presentationSource,expiryTime:r.expiryTime})));
   return {bytes:p.textureBytes,keys:p.textures.size,renderer:sc.game.renderer.type,hpUnchanged:JSON.stringify(hp)===JSON.stringify(s.actors.map(v=>v.hp)),activation:p.utilitySprites.size,aura:[...p.overlaySprites.keys()].filter(k=>k.startsWith('source-status.')),records,body:{texture:b.texture.key,frame:b.frame.name,width:b.displayWidth,height:b.displayHeight,flipX:b.flipX},contacts:p.stagedImpacts.size};
  },sign);
  report.current={reduced,sign,initial};assert.equal(initial.bytes,16562336);assert.equal(initial.keys,45);assert.equal(initial.renderer,2);assert.equal(initial.hpUnchanged,true);assert.equal(initial.activation,1);assert.equal(initial.aura.length,2);assert.equal(initial.records[2].length,0);assert.equal(initial.contacts,0);assert.equal(initial.body.width,200);assert.equal(initial.body.height,200);assert.equal(initial.body.flipX,sign<0);assert.equal(initial.body.frame,reduced?'400.0.200.200':'0.0.200.200');
  const record={reduced,sign,initial,frames:[]};report.cases.push(record);
  const paused=await page.evaluate(()=>{const sc=window.fixtureScene,p=sc.visualAssets,old=JSON.stringify([sc.session.elapsedSeconds,p.actorSprites.get('a1').frame.name,[...p.utilitySprites.values()].map(v=>[v.x,v.y,v.alpha])]);sc.applyFrame(sc.session.snapshot());sc.game.step(performance.now(),0);return old===JSON.stringify([sc.session.elapsedSeconds,p.actorSprites.get('a1').frame.name,[...p.utilitySprites.values()].map(v=>[v.x,v.y,v.alpha])]);});assert.ok(paused);record.pauseFrozen=paused;
  for(const time of [0,.16,.32,.48,.64]){
   const sample=await page.evaluate(time=>{const sc=window.fixtureScene,s=sc.session,p=sc.visualAssets;s.elapsedSeconds=time;sc.applyFrame(s.snapshot());sc.game.step(performance.now(),0);const b=p.actorSprites.get('a1');return {time,frame:b.frame.name,texture:b.texture.key,activation:p.utilitySprites.size,aura:[...p.overlaySprites.keys()].filter(k=>k.startsWith('source-status.')).length};},time);
   report.current={reduced,sign,sample};if(!reduced&&time<.64)assert.equal(sample.frame,`${Math.round(time/.16)*200}.0.200.200`);else if(time>=.16)assert.ok(sample.texture.endsWith('botuo.battleIdle'));assert.equal(sample.activation,time<.32?1:0);assert.equal(sample.aura,2);
   const file=`special-${reduced?'reduced':'normal'}-${sign<0?'left':'right'}-${time}.png`;await page.locator('canvas').screenshot({path:path.join(out,file)});record.frames.push({...sample,file});
  }
  const motion=await page.evaluate(sign=>{const sc=window.fixtureScene,s=sc.session,p=sc.visualAssets,a=s.actorById('a1');a.x+=sign*.25;s.elapsedSeconds=.65;sc.applyFrame(s.snapshot());sc.game.step(performance.now(),0);const image=p.overlaySprites.get('source-status.a1.protective-guard'),pos=p.project(a);return {texture:p.actorSprites.get('a1').texture.key,offset:[image.x-pos.x,image.y-pos.y],width:image.displayWidth,height:image.displayHeight,flipX:image.flipX};},sign);
  assert.ok(motion.texture.endsWith('botuo.battleMove'));assert.deepEqual(motion.offset,[0,-88]);assert.equal(motion.width,224);assert.equal(motion.height,234);assert.equal(motion.flipX,sign<0);record.motion=motion;
  const expired=await page.evaluate(()=>{const sc=window.fixtureScene,s=sc.session;s.elapsedSeconds=4.32;sc.applyFrame(s.snapshot());sc.game.step(performance.now(),0);return [...sc.visualAssets.overlaySprites.keys()].filter(k=>k.startsWith('source-status.')).length;});assert.equal(expired,0);

  if(!reduced&&sign===1){
   const manifest=JSON.parse(await readFile('docs/art/candidates/botuo/special/runtime-pack-v1/packing-manifest.json','utf8')),refs=JSON.parse(await readFile('docs/verification/P2_SPECIAL_RUNTIME/native-reference/manifest.json','utf8'));
   const entries=manifest.legacyCandidates.map(e=>({...e,pack:specialRuntimePacking[e.key]}));for(const e of manifest.newAssets)entries.push({...e,pack:specialRuntimePacking[e.key],references:refs.filter(r=>r.key===e.key)});
   report.trim=await page.evaluate(async entries=>{
    const sc=window.fixtureScene,p=sc.visualAssets,hidden=sc.children.list.map(o=>[o,o.visible]);for(const [o]of hidden)o.setVisible(false);
    const canvas=document.createElement('canvas');canvas.width=sc.game.canvas.width;canvas.height=sc.game.canvas.height;const ctx=canvas.getContext('2d',{willReadFrequently:true}),results=[];
    const capture=()=>{sc.game.step(performance.now(),0);ctx.clearRect(0,0,canvas.width,canvas.height);ctx.drawImage(sc.game.canvas,0,0);return ctx.getImageData(0,0,canvas.width,canvas.height).data;};
    for(const e of entries)for(let i=0;i<e.pack.frames.length;i++){
     const f=e.pack.frames[i],logical=e.pack.logicalFrames[i],source=e.references?.find(r=>r.frame===i)?.path??e.source,key='qa-original-'+e.key+'-'+i,image=new Image();image.src='/shanhaijing-arena/'+source.replace(/^public\//,'');await image.decode();sc.textures.addImage(key,image);
     const [lw,lh,tx,ty]=f.trim,ox=e.references?0:logical.x,oy=e.references?0:logical.y,oldTx=e.references?0:logical.trim?.[2]??0,oldTy=e.references?0:logical.trim?.[3]??0;
     sc.textures.get(key).add('native',0,ox+tx-oldTx,oy+ty-oldTy,f.width,f.height).setTrim(lw,lh,tx,ty,f.width,f.height);
     const texture=p.textures.get(e.key);if(!texture)throw Error('required texture missing '+e.key);const currentName='qa-frame-'+i;p.textureFrame(texture,logical,currentName);
     for(const flipX of [false,true]){
      const d=e.originalConsumers?.[0]?.animation,origin=d?.origin??[.5,.92],scale=d?72*d.scale/Math.max(lw,lh):1,width=lw*scale,height=lh*scale;
      const control=sc.add.image(500.25,300.125,key,'native').setOrigin(...origin).setDisplaySize(width,height).setFlipX(flipX),before=capture();control.setVisible(false);
      const current=sc.add.image(500.25,300.125,texture.key,currentName).setOrigin(...origin).setDisplaySize(width,height).setFlipX(flipX),after=capture();let max=0,sum=0,changed=0;for(let j=0;j<before.length;j++){const delta=Math.abs(before[j]-after[j]);max=Math.max(max,delta);sum+=delta;if(delta)changed++;}
      results.push({key:e.key,frame:i,flipX,logical:[current.frame.realWidth,current.frame.realHeight],expected:[lw,lh],width,height,origin,maxDelta:max,meanChannelDelta:sum/before.length,changedChannels:changed});current.destroy();control.destroy();
     }sc.textures.remove(key);
    }for(const [o,v]of hidden)if(o.active)o.setVisible(v);return results;
   },entries);
   for(const r of report.trim){assert.deepEqual(r.logical,r.expected);assert.ok(r.maxDelta<=1&&r.meanChannelDelta<.00001,JSON.stringify(r));}assert.equal(report.trim.length,126);
  }
  const cleanup=await page.evaluate(()=>{const sc=window.fixtureScene,s=sc.session,p=sc.visualAssets,a=s.actorById('a1');Object.assign(a.abilityState.special,{phase:'ready',cooldownRemaining:0});s.executeAbility(a,'special','player');sc.renderCastEvents();sc.applyFrame(s.snapshot());s.clearTransientCombat();sc.applyFrame(s.snapshot());sc.game.step(performance.now(),0);const transient={gesture:p.utility.gestures.size,activation:p.utilitySprites.size,aura:[...p.overlaySprites.keys()].filter(k=>k.startsWith('source-status.')).length};sc.game.destroy(true);sc.game.step(performance.now(),0);return {transient,closed:p.closed,bytes:p.textureBytes};});assert.deepEqual(cleanup,{transient:{gesture:0,activation:0,aura:0},closed:true,bytes:0});record.cleanup=cleanup;await context.close();
 }
 assert.deepEqual(report.errors,[]);report.status='PASS';console.log(JSON.stringify({status:'PASS',cases:report.cases.length,trimCases:report.trim.length}));
}catch(error){report.status='FAIL';report.failure=String(error);report.serverLog=serverLog;throw error;}finally{await writeFile(path.join(out,'browser-verification.json'),JSON.stringify(report,null,2)+'\n');await browser?.close();server.kill('SIGTERM');}
