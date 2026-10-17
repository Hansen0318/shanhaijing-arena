"""PNG/GIF evidence from real simulation/presenter traces; never claims screen recording."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import json,hashlib,subprocess
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'docs/art/candidates/lushu/heavy/playback-proof-v1'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
current=json.loads((OUT/'trace-current.json').read_text());before=json.loads((OUT/'trace-before.json').read_text())
now={s['name']:s for s in current['scenarios']};old=before['scenarios'][0]
assert old['events']==now['auto-right']['events'] and old['damage']==now['auto-right']['damage']
assert [(f['time'],f['actor'],f['target']) for f in old['frames']]==[(f['time'],f['actor'],f['target']) for f in now['auto-right']['frames']]
W,H=560,360;bg=(32,43,57,255);cache={}
def raster(frame,mode='composite'):
 panel=Image.new('RGBA',(W,H),bg);d=ImageDraw.Draw(panel);d.line((0,245,W,245),fill=(92,112,130),width=1)
 for o in sorted(frame['objects'],key=lambda o:o['depth']):
  if mode=='character' and o['kind'] not in ('actor','target'):continue
  if mode=='vfx' and o['kind'] in ('actor','target'):continue
  key=(o['path'],tuple(o['frame']) if o['frame'] else None,round(o['width']),round(o['height']),o['flipX'])
  if key not in cache:
   im=Image.open(ROOT/o['path']).convert('RGBA')
   if o['frame']:
    x,y,w,h=o['frame'];im=im.crop((x,y,x+w,y+h))
   im=im.resize((round(o['width']),round(o['height'])),Image.Resampling.LANCZOS)
   if o['flipX']:im=im.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
   cache[key]=im
  im=cache[key].copy();im.putalpha(im.getchannel('A').point(lambda a:round(a*o['alpha'])))
  panel.alpha_composite(im,(round(o['x']-o['originX']*o['width']),round(o['y']-o['originY']*o['height'])))
 d.text((12,310),'Heavy timing: 200 / 80 / 140 / 180 ms',fill=(183,201,216))
 d.text((12,330),'Actual draw-command reconstruction; NOT screen recording',fill=(183,201,216))
 return panel

def savegif(frames,durations,name):
 # One fixed palette avoids per-frame color flashing; GIF is a review derivative.
 contact=Image.new('RGB',(frames[0].width,frames[0].height*len(frames)),bg[:3])
 for i,im in enumerate(frames):contact.paste(im.convert('RGB'),(0,i*im.height))
 palette=contact.quantize(colors=192,method=Image.Quantize.MEDIANCUT)
 out=[im.convert('RGB').quantize(palette=palette,dither=Image.Dither.NONE) for im in frames]
 expected=[hashlib.sha256(im.convert('RGB').tobytes()).hexdigest() for im in out]
 path=OUT/name;out[0].save(path,save_all=True,append_images=out[1:],duration=durations,loop=0,optimize=True,disposal=1)
 check=Image.open(path);count=0;total=0
 intervals=[]
 for i in range(check.n_frames):
  check.seek(i);check.load();duration=check.info['duration'];intervals.append((total,total+duration,hashlib.sha256(check.convert('RGB').tobytes()).hexdigest()));count+=1;total+=duration
 elapsed=0;index=0
 for h,d in zip(expected,durations):
  while index<len(intervals)-1 and elapsed>=intervals[index][1]:index+=1
  assert intervals[index][0]<=elapsed<intervals[index][1] and intervals[index][2]==h, 'GIF round-trip pixel or disposal mismatch'
  elapsed+=d
 assert total==elapsed
 return {'path':str(path.relative_to(ROOT)),'bytes':path.stat().st_size,'sha256':sha(path),'decodedFrames':count,'durationMs':total,'loop':check.info.get('loop')}
frames=[]
for i in range(len(now['isolated-right']['frames'])):
 sheet=Image.new('RGBA',(W*3,H*2),bg)
 for row,name in enumerate(['isolated-right','isolated-left']):
  f=now[name]['frames'][i]
  for col,(mode,title) in enumerate([('character','CHARACTER ONLY'),('vfx','VFX PNG LAYERS ONLY'),('composite','CHARACTER + VFX')]):
   panel=raster(f,mode);d=ImageDraw.Draw(panel);d.text((12,12),title+(' / RIGHT' if row==0 else ' / LEFT'),fill='white');sheet.alpha_composite(panel,(col*W,row*H))
 frames.append(sheet)
durations=[400]+[20]*(len(frames)-1)
records=[savegif(frames,durations,'heavy-vfx-and-action-normal.gif'),savegif(frames,[d*3 for d in durations],'heavy-vfx-and-action-slow.gif')]
composite=[f.crop((W*2,0,W*3,H)) for f in frames]
records.append(savegif(composite,durations,'heavy-composite-normal.gif'))
records.append(savegif(composite,[d*3 for d in durations],'heavy-composite-slow.gif'))
composite[15].convert('RGB').save(OUT/'composite-contact-proof.png')
compare=[]
for i in range(len(old['frames'])):
 sheet=Image.new('RGBA',(W*2,H),bg)
 for col,(scenario,title) in enumerate([(old,'BEFORE: IMMEDIATE AI CAN ERASE HEAVY IMPACT'),(now['auto-right'],'AFTER: ORIGINAL 140ms IMPACT SURVIVES')]):
  panel=raster(scenario['frames'][i]);ImageDraw.Draw(panel).text((12,12),title,fill='white');sheet.alpha_composite(panel,(col*W,0))
 compare.append(sheet)
records.append(savegif(compare,durations,'heavy-ai-handoff-before-after.gif'))
# Show the exact supplied original effects separately, with no invented art.
board=Image.new('RGBA',(1120,440),bg);d=ImageDraw.Draw(board)
for i,(name,title) in enumerate([('wind-sweep-raw-v1.png','SUPPLIED WIND SWEEP ORIGINAL'),('impact-raw-v1.png','SUPPLIED IMPACT ORIGINAL')]):
 source=ROOT/'docs/art/candidates/lushu/heavy/recovered-review-v1'/name;im=Image.open(source).convert('RGBA');im.thumbnail((520,350),Image.Resampling.LANCZOS);board.alpha_composite(im,(i*560+(560-im.width)//2,55+(350-im.height)//2));d.text((i*560+15,15),title,fill='white')
board.convert('RGB').save(OUT/'supplied-vfx-proof.png')
for p in [OUT/'supplied-vfx-proof.png',OUT/'composite-contact-proof.png',OUT/'trace-current.json',OUT/'trace-before.json']:records.append({'path':str(p.relative_to(ROOT)),'bytes':p.stat().st_size,'sha256':sha(p)})
def impactframes(s):return sum(any(o['kind']=='contact' and o['path'].endswith('/heavy-impact.png') for o in f['objects']) for f in s['frames'])
manifest={'status':'TECHNICAL REVIEW / PLAYER PHONE DISPLAY NOT CONFIRMED','scope':'Production BattleSession and AssetPresenter reconstruction, NOT actual browser recording. Generic procedural later-skill effects are not rasterized; PNG action layers and actual actor/target motion are shown. Isolated rows hold manual control; comparison releases it to real AI with all skills ready.','baselineCommit':before['baselineCommit'],'stepMs':20,'heavyImpactVisibleSampleCountBefore':impactframes(old),'heavyImpactVisibleSampleCountAfter':impactframes(now['auto-right']),'coreEventsDamageAndPositionsIdentical':True,'files':records,'sources':[{'path':str(p.relative_to(ROOT)),'sha256':sha(p)} for p in [ROOT/'public/assets/characters/lushu/battleHeavy-4f.png',ROOT/'public/assets/characters/lushu/heavy-wind.png',ROOT/'public/assets/characters/lushu/heavy-impact.png',ROOT/'docs/art/approved/lushu/heavy/F3-contact-selected-A.jpeg']]}
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n');print(json.dumps({'files':[(r['path'],r['bytes']) for r in records],'Heavy contact samples before':manifest['heavyImpactVisibleSampleCountBefore'],'after':manifest['heavyImpactVisibleSampleCountAfter']},indent=2))
