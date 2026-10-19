// Actual built-app UI diagnostics. Probe mode saves observations without claiming
// device acceptance; release mode enforces visible/clickable route geometry.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const require=createRequire(path.resolve(process.env.ARENA_BROWSER_TOOL_ROOT??'.','package.json'));
const {chromium,webkit,devices}=require('playwright');
const out=path.resolve(process.env.ARENA_BROWSER_OUTPUT??'.git/mobile-viewport');
await mkdir(out,{recursive:true});
const probe=process.env.VIEWPORT_PROBE==='true';
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4174','--strictPort'],{stdio:'pipe'});
let serverLog='';server.stdout.on('data',b=>serverLog+=b);server.stderr.on('data',b=>serverLog+=b);
const report={kind:'Actual built-app Chromium/WebKit with mobile emulation; not physical iOS/browser chrome/device acceptance',mode:probe?'PROBE':'RELEASE',cases:[],errors:[]};
const measure=async page=>page.evaluate(()=>{
 const rect=e=>{if(!e)return null;const b=e.getBoundingClientRect(),s=getComputedStyle(e);return {x:b.x,y:b.y,width:b.width,height:b.height,font:s.fontSize,display:s.display,transform:s.transform,scrollWidth:e.scrollWidth,scrollHeight:e.scrollHeight};};
 const vv=visualViewport;const root=document.querySelector('#campaign');
 return {window:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio},vv:vv?{width:vv.width,height:vv.height,scale:vv.scale,left:vv.offsetLeft,top:vv.offsetTop}:null,root:rect(root),page:rect(root?.firstElementChild),title:rect(root?.querySelector('h1')),sun:rect(root?.querySelector('.landing-sun')),buttons:[...root.querySelectorAll('.landing-entries button')].map(b=>({text:b.textContent,...rect(b)})),meta:document.querySelector('meta[name=viewport]')?.content,htmlStyle:{font:getComputedStyle(document.documentElement).fontSize,textAdjust:getComputedStyle(document.documentElement).webkitTextSizeAdjust},canvas:rect(document.querySelector('canvas')),hostDetached:!document.querySelector('#game')};
});
function visible(m,b){const v=m.vv??{left:0,top:0,width:m.window.width,height:m.window.height};return b&&b.width>0&&b.height>0&&b.x>=v.left-1&&b.y>=v.top-1&&b.x+b.width<=v.left+v.width+1&&b.y+b.height<=v.top+v.height+1;}
async function sample(page,record,label){
 await page.waitForTimeout(350);
 const m=await measure(page),file=record.name+'-'+label+'.png';
 m.label=label;m.file=file;m.visibleButtons=m.buttons.filter(b=>visible(m,b)).map(b=>b.text);
 await page.screenshot({path:path.join(out,file)});record.samples.push(m);
 if(!probe)assert.deepEqual(m.visibleButtons,['BATTLE','COLLECTION','INFO'],record.name+'/'+label+' all menu controls must fit');
 return m;
}
let browser;
try{
 for(let i=0;i<100;i++){try{if((await fetch('http://127.0.0.1:4174/shanhaijing-arena/')).ok)break;}catch{}if(i===99)throw Error(serverLog);await new Promise(r=>setTimeout(r,100));}
 for(const [engine,api]of [['chromium',chromium],['webkit',webkit]]){
  browser=await api.launch({headless:true,...(engine==='chromium'?{args:['--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader']}: {})});
  for(const initial of ['landscape','portrait','short']){
   const landscape={width:852,height:330};
   const context=await browser.newContext({...devices['iPhone 15 Pro Max'],viewport:initial==='portrait'?{width:393,height:730}:initial==='short'?{width:852,height:240}:landscape,screen:{width:852,height:393}});
   const page=await context.newPage();page.on('pageerror',e=>report.errors.push(engine+': '+e));
   const record={name:engine+'-'+initial,samples:[]};report.cases.push(record);
   await page.goto('http://127.0.0.1:4174/shanhaijing-arena/',{waitUntil:'networkidle'});
   if(initial==='portrait'){await page.setViewportSize(landscape);await page.waitForTimeout(350);}
   await sample(page,record,'load');
   await page.reload({waitUntil:'networkidle'});await sample(page,record,'reload');
   for(const label of ['BATTLE','COLLECTION','INFO']){
    const before=await measure(page);if(!before.buttons.find(b=>b.text===label&&visible(before,b)))continue;
    await page.getByRole('button',{name:label,exact:true}).click();await page.waitForTimeout(200);
    record.routes??=[];record.routes.push({label,measurement:await measure(page)});
    await page.getByRole('button',{name:'BACK',exact:true}).click();await sample(page,record,'return-'+label.toLowerCase());
   }
   if(engine==='chromium'&&initial==='landscape'){
    const cdp=await context.newCDPSession(page);
    for(const zoom of [1.5,2,3]){
     await cdp.send('Emulation.setPageScaleFactor',{pageScaleFactor:zoom});await sample(page,record,'zoom-'+zoom);
     if(!probe){
      await page.getByRole('button',{name:'INFO',exact:true}).click();
      await page.getByRole('button',{name:'BACK',exact:true}).click();
      await sample(page,record,'zoom-'+zoom+'-return');
     }
    }
    if(!probe){
     await page.getByRole('button',{name:'BATTLE',exact:true}).click();
     await page.locator('.chapter-grid .campaign-card:not(:disabled)').first().click();
     await page.locator('.stage-page>.start').click();
     await page.locator('.team-page .start.battle').click();
     await page.locator('canvas').waitFor({state:'visible'});
     await page.waitForFunction(()=>window.__arenaSmoke?.battleStarted,{},{timeout:20000});
     const canvas=await page.locator('canvas').boundingBox();
     await page.mouse.click(canvas.x+canvas.width*72/1120,canvas.y+canvas.height*56/540);
     await page.waitForFunction(()=>window.__arenaSmoke?.selectedId==='a1');
     await page.locator('.battle-controls').getByRole('button',{name:'Pause',exact:true}).click();
     await page.locator('.battle-controls').getByRole('button',{name:'Resume',exact:true}).waitFor();
     await page.locator('.battle-controls').getByRole('button',{name:'Exit',exact:true}).click();
     const bounds=await page.locator('.exit-actions button').evaluateAll(nodes=>nodes.map(n=>{const b=n.getBoundingClientRect();return {x:b.x,y:b.y,width:b.width,height:b.height};}));
     const m=await measure(page);assert.ok(bounds.every(b=>visible(m,b)),'zoomed exit dialog controls fit');
     await page.screenshot({path:path.join(out,record.name+'-zoom-battle-exit.png')});
     record.battle={zoom:3,canvas:m.canvas,exitButtons:bounds,pauseResumeClickable:true,canvasPortraitSelection:'a1'};
     await page.getByRole('dialog').getByRole('button',{name:'EXIT',exact:true}).click();
     await page.locator('.stage-page').waitFor();
     await page.getByRole('button',{name:'BACK',exact:true}).click();
     await page.getByRole('button',{name:'BACK',exact:true}).click();
     await sample(page,record,'zoom-battle-return');
    }
    await cdp.send('Emulation.setPageScaleFactor',{pageScaleFactor:1});await sample(page,record,'zoom-restored');
   }
   await context.close();
  }
  await browser.close();browser=null;
 }
 if(!probe)assert.deepEqual(report.errors,[]);
 report.status=probe?'PROBE COMPLETE':'PASS';
}catch(e){report.status='FAIL';report.failure=String(e);throw e;}
finally{report.serverLog=serverLog;await writeFile(path.join(out,'mobile-viewport.json'),JSON.stringify(report,null,2)+'\n');await browser?.close();server.kill('SIGTERM');console.log(JSON.stringify({status:report.status,cases:report.cases.length,errors:report.errors}));}
