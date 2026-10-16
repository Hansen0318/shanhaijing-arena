"""Reproduce exact presenter coordinates on a static proof sheet; not a browser/phone test."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageOps
import subprocess,json,hashlib
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'docs/verification/heavy-feedback-v1';OUT.mkdir(exist_ok=True)
js=r'''
import {makeWindupFixture} from './tests/helpers/basicWindup.js';
import {assetScene,pngTransport} from './tests/helpers/assetScene.js';
import {AssetPresenter} from './src/runtime/assetPresenter.js';
import {createAssetCache} from './src/runtime/assetCache.js';
import {rosterCatalog} from './src/roster/catalog.js';
import {arenaToStage} from './src/runtime/arenaProjection.js';
const result=[];
for(const scenario of ['hit','air-right','air-left']){
 const f=makeWindupFixture(),s=f.session,p=new AssetPresenter(assetScene(),{cache:createAssetCache({transport:pngTransport}),project:arenaToStage});await p.prepare(Object.values(rosterCatalog));
 for(const e of s.enemies)Object.assign(e,{x:10,y:0});f.target.x=scenario==='hit'?2:10;Object.assign(f.actor.abilityState.heavy,{phase:'ready',cooldownRemaining:0});
 const paint=(label)=>{for(const e of s.drainCastEvents())p.cast(e,rosterCatalog.P1,s.elapsedSeconds);const snap=s.snapshot();for(const side of ['allies','enemies'])snap[side]=snap[side].map(a=>({...a,definitionId:s.actorById(a.instanceId).definitionId}));p.render(snap,s.elapsedSeconds,rosterCatalog);
 const source=arenaToStage(f.actor),objects=[p.actorSprites.get('a1'),...(p.actionEffects.get('a1')?.values()??[])].filter(o=>o.visible&&!o.destroyed).map(o=>{const key=[...p.textures].find(([,v])=>v.key===o.texture)[0],asset=p.textures.get(key).asset;return {path:'public/'+asset.path,frame:o.frame?o.frame.split('.').map(Number):null,x:o.x-source.x+150,y:o.y-source.y+205,width:o.displayWidth,height:o.displayHeight,originX:o.originX,originY:o.originY,flipX:o.flipX,alpha:o.alpha,depth:o.depth};});result.push({scenario,label,time:s.elapsedSeconds,objects});};
 if(scenario==='hit')paint('Idle baseline');s.usePlayerAbility('a1','heavy',{facingX:scenario==='air-left'?-1:1});
 const frames=scenario==='hit'?[[0,'F1 windup'],[.2,'F2 supplied wind'],[.28,'F3 supplied impact'],[.42,'F4 recovery'],[.6,'Idle return']]:[[.2,'Air swing / no impact']];
 for(const [time,label] of frames){if(time>s.elapsedSeconds){for(const a of s.actors)s.holdPlayerControl(a.instanceId);s.step(time-s.elapsedSeconds);}paint(label);}p.destroy();
}
console.log(JSON.stringify(result));
'''
records=json.loads(subprocess.check_output(['node','--input-type=module','-e',js],cwd=ROOT))
for record in records:
 for o in record['objects']:o['sha256']=hashlib.sha256((ROOT/o['path']).read_bytes()).hexdigest()
(OUT/'presenter-projection.json').write_text(json.dumps({'scope':'Static rasterization of real AssetPresenter output; not browser or phone verification','panels':records},indent=2)+'\n')
sheet=Image.new('RGBA',(1440,510),(39,47,59,255));draw=ImageDraw.Draw(sheet)
for i,r in enumerate(records):
 panel=Image.new('RGBA',(360,255),(39,47,59,255));d=ImageDraw.Draw(panel);d.line((0,205,360,205),fill=(122,138,153),width=1)
 for o in sorted(r['objects'],key=lambda o:o['depth']):
  im=Image.open(ROOT/o['path']).convert('RGBA')
  if o['frame']:
   x,y,w,h=o['frame'];im=im.crop((x,y,x+w,y+h))
  im=im.resize((round(o['width']),round(o['height'])),Image.Resampling.LANCZOS)
  if o['flipX']:im=ImageOps.mirror(im)
  im.putalpha(im.getchannel('A').point(lambda a:round(a*o['alpha'])))
  panel.alpha_composite(im,(round(o['x']-o['originX']*o['width']),round(o['y']-o['originY']*o['height'])))
 d.text((8,8),r['scenario']+' | '+r['label'],fill='white');d.text((8,234),'Static presenter proof; not phone PASS',fill=(160,180,195))
 sheet.alpha_composite(panel,((i%4)*360,(i//4)*255))
sheet.convert('RGB').save(OUT/'presenter-proof.png')
print(OUT/'presenter-proof.png')
