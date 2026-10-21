"""Deterministic ART reconstruction. No game execution or runtime output.
Run from any directory; preserves all accepted sources and old receipts.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
import json, hashlib, math, PIL
ROOT=Path(__file__).resolve().parents[6]
OUT=Path(__file__).resolve().parent
R=Image.Resampling.LANCZOS
CELL=(400,320); DENSITY=.126; GROUND=274; ROOTX=200
SCENE=(800,460); OFFSET=(130,30); CASTER=(330,304); TARGET=(620,240)
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def rel(p): return str(p.relative_to(ROOT))
def read(p):
 im=Image.open(p).convert('RGBA'); im.load(); return im

def font(n): return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',n)
def core(im): return im.getchannel('A').point(lambda v:255 if v>64 else 0).getbbox()
def write(name,value): (OUT/name).write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n')
def put(dst,im,center,opacity=1):
 im=im.copy()
 if opacity!=1: im.putalpha(im.getchannel('A').point(lambda a:round(a*opacity)))
 x,y=round(center[0]-im.width/2),round(center[1]-im.height/2)
 assert x>=0 and y>=0 and x+im.width<=dst.width and y+im.height<=dst.height,(center,im.size)
 dst.alpha_composite(im,(x,y))

receipt=json.loads((ROOT/'docs/art/approved/botuo/awakening/poses-v1/acceptance.json').read_text())
assert receipt['status']=='ALL FOUR AWAKENING POSES / PLAYER ART APPROVED'
immutable={}
for e in receipt['sources'].values():
 p=ROOT/e['master']; assert sha(p)==e['sha256']; immutable[rel(p)]=sha(p)
for rp in ['docs/art/approved/botuo/awakening/f3-v2/acceptance.json','docs/art/approved/botuo/awakening/poses-v1/acceptance.json']:
 immutable[rp]=sha(ROOT/rp)
mechanics=ROOT/'docs/verification/P2_AWAKENING_PREFLIGHT/mechanics.json'
report=json.loads(mechanics.read_text()); assert report['caseCount']==16 and report['status']=='PASS'
for path,h in report['sourceSha256'].items(): assert sha(ROOT/path)==h
case=lambda name:next(c for c in report['cases'] if c['case']==name)
t3=case('T3 Special coexistence / resolve-time recipient center / expiry')
t3instant=case('T3 Special coexistence / instant / expiry')
assert [s['targetId'] for s in t3['protection']]==['a1','a2']
# Previous static review support family. All poses retain one source pixel density.
anchors={'F1':(740,1125),'F2':(710,1111),'F3':(705,1098),'F4':(742,1130)}
poses={}; posesQA=[]
for name,e in receipt['sources'].items():
 p=ROOT/e['master']; im=read(p); sm=im.resize(tuple(round(v*DENSITY) for v in im.size),R)
 ax,ay=anchors[name];xy=(ROOTX-round(ax*DENSITY),GROUND-round(ay*DENSITY))
 cell=Image.new('RGBA',CELL);cell.paste(sm,xy)
 assert cell.crop((xy[0],xy[1],xy[0]+sm.width,xy[1]+sm.height)).tobytes()==sm.tobytes()
 b=cell.getchannel('A').getbbox(); assert min(b[0],b[1],CELL[0]-b[2],CELL[1]-b[3])>=32
 cell.save(OUT/(name+'-safe-cell.png')); poses[name]=cell
 assert ImageOps.mirror(ImageOps.mirror(cell)).tobytes()==cell.tobytes()
 posesQA.append(dict(frame=name,source=rel(p),sha256=sha(p),sourceSize=im.size,scaleXY=[DENSITY,DENSITY],sourceSupportAnchor=anchors[name],xy=xy,resizedSize=sm.size,alphaBBox=b,allResizedRGBARetained=True,groundResidualPx=xy[1]+round(ay*DENSITY)-GROUND,mirrorRoundTrip=True))
strip=Image.new('RGBA',(1600,320))
for i,im in enumerate(poses.values()): strip.paste(im,(400*i,0))
strip.save(OUT/'four-equal-cells.png')
idlepath=ROOT/'public/assets/characters/botuo/battleIdle.png';idleRaw=read(idlepath)
idle=Image.new('RGBA',CELL); idleXY=(128,GROUND-round(158*.9))
idle.paste(idleRaw.resize((144,144),R),idleXY);idle.save(OUT/'approved-idle-return-cell.png')
immutable[rel(idlepath)]=sha(idlepath)
# No original FX edited. Exact padding before separate display derivatives.
src=json.loads((OUT/'source-checkpoint.json').read_text()); fx={};fxQA=[]
sizes={'radial-release':(480,240),'victim-impact':(260,260),'team-mitigation':(210,140)}
for e in src['sources']:
 p=ROOT/e['path'];assert p.stat().st_size==e['bytes'] and sha(p)==e['sha256'];immutable[rel(p)]=sha(p)
 im=read(p); a=im.getchannel('A');w,h=im.size;pad=80
 safe=Image.new('RGBA',(w+160,h+160));safe.paste(im,(80,80))
 assert safe.crop((80,80,w+80,h+80)).tobytes()==im.tobytes()
 safe.save(OUT/(e['name']+'-padded.png'))
 # Preserve original aspect. Padding expands the derivative canvas, never clips source.
 scale=sizes[e['name']][0]/w
 scaled=safe.resize((round(safe.width*scale),round(safe.height*scale)),R)
 scaled.save(OUT/(e['name']+'-display.png'));fx[e['name']]=scaled
 fxQA.append(dict(name=e['name'],source=e['path'],sha256=sha(p),bytes=p.stat().st_size,sourceSize=im.size,alphaBBox=a.getbbox(),coreBBox=core(im),edgeMaxAlpha=[a.crop(b).getextrema()[1] for b in [(0,0,w,1),(0,h-1,w,h),(0,0,1,h),(w-1,0,w,h)]],padding=80,paddedSourceRGBARoundTrip=True,displayScaleXY=[scale,scale],displaySize=scaled.size,transparentCenterAlpha=a.getpixel((w//2,h//2))))
# Reuse original Special status cue, without altering it or inventing a T3 shield.
specialPath=ROOT/'docs/art/candidates/botuo/special/composite-review-v1/mitigation-state-raw-v1.png'
special=read(specialPath);special.thumbnail((182,190),R);immutable[rel(specialPath)]=sha(specialPath)
specialEvidence=ROOT/'docs/art/candidates/botuo/special/key-pose-v1/mechanics-snapshot.json'
specialCase=next(c for c in json.loads(specialEvidence.read_text())['direct'] if c['tier']=='T3' and c['side']=='allies' and c['source']=='player' and not c['tactical'])
specialRecords=specialCase['statuses'];assert [s['expiryTime'] for s in specialRecords]==[5,5]
immutable[rel(specialEvidence)]=sha(specialEvidence)

# Exact model ms; GIF is centisecond-only, onset/expiry rounded UP for display, never early.
CAST=400; T0RESOLVE=1300
T3ON=CAST+1000*t3['onsetSeconds'];T3OFF=CAST+1000*t3['protection'][0]['expiryTime']
def status(t,instant=False):
 c=t3instant if instant else t3
 return [s['targetId'] for s in c['protection'] if CAST+1000*s['startTime']<=t<CAST+1000*s['expiryTime']]
def phase(t,mode='tactical'):
 resolve=CAST if mode in ('instant','air') else T0RESOLVE
 if t<CAST:return idle,'IDLE'
 if t<resolve:
  return (poses['F1'],'F1 LOAD') if t<CAST+(resolve-CAST)/2 else (poses['F2'],'F2 DOWNSTROKE')
 if t<resolve+180:return poses['F3'],'F3 RELEASE'
 if t<resolve+360:return poses['F4'],'F4 RECOVERY'
 return idle,'IDLE RETURN'
def render(t,mirror=False,mode='tactical',effects=True,reduced=False):
 scene=Image.new('RGBA',SCENE,'#192633'); d=ImageDraw.Draw(scene)
 d.line((40,CASTER[1],760,CASTER[1]),fill='#536271')
 hit=mode!='air';resolve=CAST if mode in ('instant','air') else T0RESOLVE
 if hit:
  x,y=TARGET;d.line((x-16,y,x+16,y),fill='#9ba8b0',width=2);d.line((x,y-20,x,y+20),fill='#9ba8b0',width=2)
 actor,label=phase(t,mode)
 if effects and resolve<=t<resolve+360:
  opacity=.48 if reduced else min(1,(resolve+360-t)/160)
  put(scene,fx['radial-release'],(CASTER[0],CASTER[1]-10),opacity)
 scene.alpha_composite(actor,OFFSET)
 if effects and hit and resolve<=t<resolve+240:
  put(scene,fx['victim-impact'],TARGET,.48 if reduced else min(1,(resolve+240-t)/120))
 # Whole world mirror, once. Text remains readable. No per-accessory flipping.
 if mirror:scene=ImageOps.mirror(scene)
 d=ImageDraw.Draw(scene)
 d.text((16,12),'AWAKENING / '+('NO FX' if not effects else 'REDUCED STATIC CUE' if reduced else 'ACTION + SEPARATE VFX'),font=font(21),fill='white')
 d.text((16,44),('LEFT' if mirror else 'RIGHT')+' | '+mode.upper()+' | '+label,font=font(16),fill='#f3cb7b')
 d.text((16,404),'T0 resolve: '+('0ms / no hit or protection' if mode=='air' else '0ms / F1-F2 skipped' if mode=='instant' else '900ms / caster-locked circle'),font=font(15),fill='#f3cb7b')
 d.text((16,436),'ART RECONSTRUCTION / not game footage, Runtime or phone acceptance',font=font(14),fill='#bcc8d1')
 return scene.convert('RGB')
def stateRender(t,mirror=False,instant=False):
 scene=Image.new('RGBA',SCENE,'#192633');d=ImageDraw.Draw(scene)
 recipients=status(t,instant); centers=[(170,278),(400,278),(650,278)]
 # Schematic actors use exact same Idle144px. a3 is excluded by existing real evidence.
 for i,(x,y) in enumerate(centers):
  key='a'+str(i+1)
  if any(s['targetId']==key and CAST+1000*s['startTime']<=t<CAST+1000*s['expiryTime'] for s in specialRecords): put(scene,special,(x,y-40),.7) # independent Special remains after Awakening expiry
  if key in recipients: put(scene,fx['team-mitigation'],(x,y-10))
  im=idleRaw.resize((144,144),R);scene.alpha_composite(im,(x-72,y-round(158*.9)))
  if key in recipients:
   # Front base only overlays lower hooves, no filled shield/body tint.
   front=fx['team-mitigation'].copy();mask=front.getchannel('A');ImageDraw.Draw(mask).rectangle((0,0,front.width,front.height//2),fill=0);front.putalpha(mask);put(scene,front,(x,y-10))
 if mirror:scene=ImageOps.mirror(scene)
 d=ImageDraw.Draw(scene)
 d.text((16,12),'T3 / ACTUAL RECIPIENTS + SPECIAL COEXISTENCE',font=font(20),fill='white')
 onset=CAST if instant else T3ON;off=CAST+3750 if instant else T3OFF
 d.text((16,44),('INSTANT 0ms' if instant else 'TACTICAL 819ms')+' | '+('ACTIVE' if recipients else 'NOT STARTED' if t<onset else 'AWAKENING EXPIRED'),font=font(16),fill='#f3cb7b')
 for i,key in enumerate(['a1','a2','a3']):
  x=centers[i][0];x=800-x if mirror else x
  d.text((x-76,330),key+(' / BENEFICIARY' if key in recipients else ' / NO NEW CUE'),font=font(13),fill='white')
 d.text((16,374),'a1 + a2 only; a3 excluded. Special: '+('ACTIVE' if CAST<=t<CAST+5000 else 'NOT STARTED' if t<CAST else 'EXPIRED AT 5s'),font=font(15),fill='#bcc8d1')
 d.text((16,400),'Awakening 13.5% / 3.75s | Special self 33.75%, ally 20.25% / 5s | MAX',font=font(14),fill='#f3cb7b')
 d.text((16,436),'ART STUDY from existing evidence / schematic positions, not replay or radius proof',font=font(13),fill='#bcc8d1')
 return scene.convert('RGB')

results=[]
def make(name,renderfn,ends,events=(),slow=1):
 frames=[]; durations=[]; timeline=[]
 for mirror in [False,True]:
  stamps=sorted(set(range(0,ends,40))|{int(math.ceil(t/10)*10) for t in events if 0<=t<ends}|{ends})
  for t,n in zip(stamps,stamps[1:]):
   frames.append(renderfn(t,mirror));durations.append((n-t)*slow);timeline.append(dict(start=t,hold=n-t,mirror=mirror))
 # Shared global palette and complete opaque source frames. No interpolated anatomy.
 sample=Image.new('RGB',(200,115*len(frames)))
 for i,f in enumerate(frames):sample.paste(f.resize((200,115),R),(0,i*115))
 palette=sample.quantize(colors=256,method=Image.Quantize.MEDIANCUT)
 indexed=[f.quantize(palette=palette,dither=Image.Dither.NONE) for f in frames]
 p=OUT/name; indexed[0].save(p,save_all=True,append_images=indexed[1:],duration=durations,loop=0,disposal=2,optimize=False)
 g=Image.open(p);decoded=[];total=0
 for i in range(g.n_frames):
  g.seek(i);g.load();d=g.info['duration'];assert d>0 and d%10==0
  decoded.append((g.convert('RGB').tobytes(),d));total+=d
 # Compare all decoded holds against all quantized input frames, handling merged duplicates.
 di=0;remaining=decoded[0][1]
 for im,hold in zip(indexed,durations):
  assert im.convert('RGB').tobytes()==decoded[di][0],(name,di)
  assert hold<=remaining;remaining-=hold
  if remaining==0:
   di+=1
   if di<len(decoded):remaining=decoded[di][1]
 assert di==len(decoded) and remaining==0 and total==sum(durations)
 results.append(dict(path=rel(p),sha256=sha(p),bytes=p.stat().st_size,decodedFrames=len(decoded),sourceFrames=len(frames),totalMs=total,pixelTimelineRoundTrip='PASS',durationRoundTrip='PASS',disposal=2,slowFactor=slow))
 # Preserve exact source timeline hashes, including quantized pixel comparison authority.
 write(name+'.timeline.json',dict(palette=palette.getpalette(),frames=[dict(**r,durationMs=d,quantizedRGBSha256=hashlib.sha256(im.convert('RGB').tobytes()).hexdigest()) for r,d,im in zip(timeline,durations,indexed)]))

# Normal tactical onset is EXACT 900ms after cast. Slow changes review playback only.
EV=[400,850,1300,1480,1540,1660]
make('botuo-awakening-normal.gif',render,2200,EV)
make('botuo-awakening-slow.gif',render,2200,EV,3)
make('botuo-awakening-noFX.gif',lambda t,m:render(t,m,effects=False),2200,EV)
make('botuo-awakening-reduced.gif',lambda t,m:render(t,m,reduced=True),2200,EV)
make('botuo-awakening-instant.gif',lambda t,m:render(t,m,mode='instant'),1500,[400,580,640,760])
make('botuo-awakening-air.gif',lambda t,m:render(t,m,mode='air'),1500,[400,580,640,760])
make('botuo-awakening-T3-tactical.gif',stateRender,6000,[400,T3ON,T3OFF,5400])
make('botuo-awakening-T3-instant.gif',lambda t,m:stateRender(t,m,True),6000,[400,4150,5400])
# Static QA boards. All inputs separate; light/dark inspection never RGB-only alpha thumbnail.
qa=Image.new('RGB',(1100,900))
for i,e in enumerate(src['sources']):
 im=read(ROOT/e['path']);im.thumbnail((510,260),R)
 for k,bg in enumerate(['#f3f0e5','#18202a']):
  tile=Image.new('RGBA',(550,300),bg);tile.alpha_composite(im,((550-im.width)//2,30));ImageDraw.Draw(tile).text((10,8),e['name'],fill='#888888');qa.paste(tile.convert('RGB'),(550*k,300*i))
qa.save(OUT/'vfx-light-dark-QA.png')
board=Image.new('RGB',(2000,640))
for k,bg in enumerate(['#f3f0e5','#18202a']):
 for i,(name,im) in enumerate([('IDLE',idle),*poses.items()]):
  tile=Image.new('RGBA',CELL,bg);tile.alpha_composite(im);ImageDraw.Draw(tile).text((10,10),name,fill='#888888');board.paste(tile.convert('RGB'),(i*400,k*320))
board.save(OUT/'idle-poses-light-dark-QA.png')
# Visual power comparison uses the exact SAME Idle and display density for all skills.
comparison=Image.new('RGB',(2400,460));metrics=[]
configs=[('HEAVY','heavy','source-pressure-raw-v1.png',(230,154)),('SPECIAL','special','activation-raw-v1.png',(320,260)),('AWAKENING',None,None,None)]
for i,(label,folder,file,size) in enumerate(configs):
 tile=Image.new('RGBA',SCENE,'#192633')
 layer=fx['radial-release'] if i==2 else read(ROOT/f'docs/art/candidates/botuo/{folder}/composite-review-v1/{file}').resize(size,R)
 put(tile,layer,(330,280));tile.alpha_composite(idle,OFFSET)
 n=sum(layer.getchannel('A').histogram()[65:]);metrics.append(dict(skill=label,visiblePixelsAlphaGt64=n,displaySize=layer.size))
 if i==2:put(tile,fx['victim-impact'],TARGET)
 ImageDraw.Draw(tile).text((16,12),label+' / IDENTICAL IDLE 144px',font=font(20),fill='white');comparison.paste(tile.convert('RGB'),(i*800,0))
comparison.save(OUT/'heavy-special-awakening-comparison.png')
assert metrics[2]['visiblePixelsAlphaGt64']>max(m['visiblePixelsAlphaGt64'] for m in metrics[:2])
# Existing Heavy contact footprint compared to new contact. Art area only, never damage radius.
heavyContact=read(ROOT/'docs/art/candidates/botuo/heavy/composite-review-v1/target-impact-raw-v1.png').resize((210,168),R)
contactRatio=sum(fx['victim-impact'].getchannel('A').histogram()[65:])/sum(heavyContact.getchannel('A').histogram()[65:])
assert contactRatio>1
# Sample actual DECODED normal GIF and conditional instant/air output.
def decodedAt(name,t):
 g=Image.open(OUT/name);elapsed=0
 for i in range(g.n_frames):
  g.seek(i);g.load();d=g.info['duration']
  if elapsed<=t<elapsed+d:return g.convert('RGB')
  elapsed+=d
 raise AssertionError((name,t))
qa=Image.new('RGB',(1600,1380))
for i,(name,t) in enumerate([('botuo-awakening-normal.gif',1300),('botuo-awakening-normal.gif',3500),('botuo-awakening-instant.gif',400),('botuo-awakening-air.gif',400),('botuo-awakening-T3-tactical.gif',1220),('botuo-awakening-T3-tactical.gif',4970)]):qa.paste(decodedAt(name,t),((i%2)*800,(i//2)*460))
qa.save(OUT/'decoded-facing-hit-air-T3-QA.png')
qa=Image.new('RGB',(1600,920))
for k,t in enumerate([0,1220,4970,5400]):qa.paste(decodedAt('botuo-awakening-T3-tactical.gif',t),((k%2)*800,(k//2)*460))
qa.save(OUT/'decoded-T3-independent-expiry-QA.png')
render(1300,reduced=True).save(OUT/'reduced-static-cue.png')
for p,h in immutable.items():assert sha(ROOT/p)==h
assert status(T3ON-.001)==[] and status(T3ON)==['a1','a2'] and status(T3OFF)==[]
assert phase(CAST,'instant')[1]=='F3 RELEASE' and phase(CAST,'air')[1]=='F3 RELEASE'
manifest=dict(status='VFX / GIF CANDIDATE — PLAYER REVIEW PENDING',recoveredHead='60c1976522b2934fb23e505377f9f55c60d1c817',poseReceipt=rel(ROOT/'docs/art/approved/botuo/awakening/poses-v1/acceptance.json'),cell=CELL,poses=posesQA,idle=dict(path=rel(idlepath),sha256=sha(idlepath),reviewSize=[144,144],xy=idleXY),vfx=fxQA,immutableSourceHashes=immutable,mechanicsEvidence=dict(path=rel(mechanics),sha256=sha(mechanics),caseCount=16,reusedNotRerun=True,sourceHashesChecked=True),timing=dict(castMs=400,tacticalT0ResolveRelativeMs=900,instantResolveRelativeMs=0,airContact=False,airProtection=False,normalPoseBoundaries=EV,T3onsetMs=T3ON,T3expiryMs=T3OFF,T3displayOnsetMs=math.ceil(T3ON/10)*10,T3displayExpiryMs=math.ceil(T3OFF/10)*10,gifCentisecondRounding='ceil: model819/4569ms displayed820/4570ms, max1ms late; model unchanged',slowFactor=3),T3=dict(tacticalEvidence=t3,instantEvidence=t3instant,specialRaw=rel(specialPath),specialMagnitude=1-t3['effectiveSelfDamageMultiplier'],specialActiveAfterAwakeningExpiry=True,specialEvidence=rel(specialEvidence),specialRecords=specialRecords,specialIndependentExpiryMs=5400,positions='schematic layout; actual recipient IDs from saved BattleSession evidence, no new simulation',maxNotSum=True),powerComparison=metrics,contactVisibleAreaRatioVsHeavy=contactRatio,gifs=results,scope='Art reconstruction only, no Runtime/build/Browser/deploy/new capacity acceptance. Source RGBA preserved separately; no character/effect baking. No added mechanics.',nextGate='Show actual normal GIF + slow/other links. STOP for PLAYER VFX/GIF review.')
write('review-manifest.json',manifest)
write('qa.json',dict(status='AUTOMATED PACKING / GIF DECODE PASS; AUTHOR VISUAL QA IN visual-review.json',pillowVersion=PIL.__version__,independentOnDiskVerification='independent-verification.json',testHarnessCorrections='Initial additional verifier ROIs included unchanged ground line and readable labels. Excluded guide row/text from background/mirror ROI; no source/artwork changed.',sourceHashes=True,allDecodedPixelsMatchQuantizedInputs=True,allDurationsMatch=True,clearCellBorders=True,fullSourcePaddingRoundTrip=True,wholeActorMirrorRoundTrip=True,immutableSources=True,mechanicsNotRerun=True,sourceEdgeNoise='max alpha1 at raw outer edge retained, salient core inset; padding added',powerComparison=metrics,contactRatioVsHeavy=contactRatio,gifs=results))
print(json.dumps(dict(status='PASS deterministic assembly / full GIF decode',gifs=results,powerComparison=metrics,contactRatioVsHeavy=contactRatio),indent=2))
