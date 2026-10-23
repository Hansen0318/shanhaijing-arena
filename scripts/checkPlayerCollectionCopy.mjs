import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const {chromium}=createRequire(path.resolve(process.env.ARENA_BROWSER_TOOL_ROOT??'.','package.json'))('playwright');
const built=process.argv.includes('--built'),port=built?4186:4185,base=`http://127.0.0.1:${port}/shanhaijing-arena/`,out=path.resolve(process.env.ARENA_BROWSER_OUTPUT??'.git/collection-copy');
await mkdir(out,{recursive:true});
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js',...(built?['preview']:[]),'--host','127.0.0.1','--port',String(port),'--strictPort'],{stdio:'pipe'});
let browser,log='';server.stderr.on('data',b=>log+=b);server.stdout.on('data',b=>log+=b);
const report={physicalPhone:false,built,errors:[],cases:[]};
try{
 for(let i=0;i<120;i++){try{if((await fetch(base)).ok)break;}catch{}if(i===119)throw Error(log);await new Promise(r=>setTimeout(r,100));}
 browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 const page=await browser.newPage({viewport:{width:852,height:393},isMobile:true,hasTouch:true});page.on('pageerror',e=>report.errors.push(String(e)));
 await page.goto(base);await page.getByRole('button',{name:'COLLECTION',exact:true}).click();
 for(const id of ['P1','P2','P3','P4','P5']){
  await page.locator(`.collection-card[data-character-id="${id}"]`).click();
  const dialog=page.getByRole('dialog'),text=await dialog.innerText();assert.doesNotMatch(text,/已實裝|保留設計|保留後續|無文字|不顯示|安全額度|Runtime|VFX|一般移速增益上限|合計上限/);
  const labels=await dialog.locator('.collection-passive-status').allTextContents();assert.deepEqual(labels,['P1','P2'].includes(id)?[]:['尚未開放']);
  if(id==='P1')assert.match(text,/35%.*50%.*65%.*80%/);if(id==='P2')assert.match(text,/20%.*30%.*40%.*50%/);
  await dialog.locator('.collection-ability').last().scrollIntoViewIfNeeded();
  const screenshot=`${built?'built':'native'}-${id}.png`;await page.screenshot({path:path.join(out,screenshot)});
  report.cases.push({id,clean:true,labels,text,screenshot});await page.locator('[data-action="close-detail"]').click();
 }
 assert.deepEqual(report.errors,[]);report.status='PASS';
}catch(e){report.status='FAIL';report.error=String(e?.stack??e);process.exitCode=1;}
finally{await browser?.close();server.kill();await writeFile(path.join(out,built?'built-entry.json':'native.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({status:report.status,cases:report.cases.length,error:report.error}));}
