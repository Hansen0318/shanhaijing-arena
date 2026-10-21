"""Source-preserving ART PREVIEW only. No runtime, gameplay, new timing or locks."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont,ImageOps
import hashlib,json,math
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'docs/art/candidates/botuo/special/composite-review-v1'
R=Image.Resampling.LANCZOS
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def read(p):
 im=Image.open(p).convert('RGBA');im.load();return im
def core(im):return im.getchannel('A').point(lambda a:255 if a>64 else 0).getbbox()
def font(n):return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',n)
CELL=(400,320);GROUND=274;ROOTX=200;DENSITY=.126
receipt=json.loads((ROOT/'docs/art/approved/botuo/special/poses-v1/acceptance.json').read_text())
poses=[];records=[]
for i,e in enumerate(receipt['sources']):
 p=ROOT/e['path'];assert sha(p)==e['sha256'];im=read(p);b=core(im)
 # Shared authoring density, as accepted Heavy's review; no pose-height fitting.
 # Source pelvis x=700 is a review translation guide, not a runtime pivot contract.
 size=tuple(round(v*DENSITY) for v in im.size);resized=im.resize(size,R)
 xy=(209-round(700*DENSITY),GROUND-round((b[3]-.5)*DENSITY))
 assert min(xy)>=32 and xy[0]+size[0]<CELL[0]-32 and xy[1]+size[1]<CELL[1]-32
 cell=Image.new('RGBA',CELL);cell.paste(resized,xy)
 assert cell.crop((xy[0],xy[1],xy[0]+size[0],xy[1]+size[1])).tobytes()==resized.tobytes()
 cell.save(OUT/f'F{i+1}-safe-cell.png');poses.append(cell)
 records.append(dict(frame=f'F{i+1}',source=e['path'],sha256=e['sha256'],sourceSize=im.size,coreBounds=b,rawSourceDensity=DENSITY,sourcePelvisX=700,xy=xy,resizedSize=size,fullResizedRGBApreserved=True,deletedSourcePixels=0,groundResidualPx=xy[1]+round((b[3]-.5)*DENSITY)-GROUND))
strip=Image.new('RGBA',(CELL[0]*4,CELL[1]))
for i,im in enumerate(poses):strip.paste(im,(CELL[0]*i,0))
strip.save(OUT/'special-four-equal-cells.png')
idlepath=ROOT/'public/assets/characters/botuo/battleIdle.png'
assert sha(idlepath)=='27c65e3f1633f4e5959e62b2fbb72df7bf47e6e8324425af24943b53d8a0d2b8'
idle=Image.new('RGBA',CELL);idle.paste(read(idlepath).resize((144,144),R),(ROOTX-72,GROUND-round(158*.9)))
idle.save(OUT/'approved-idle-return-cell.png')
movePath=ROOT/'public/assets/characters/botuo/battleMove-4f.png';move=read(movePath);moves=[]
for i in range(4):
 c=Image.new('RGBA',CELL);c.paste(move.crop((i*160,0,(i+1)*160,160)).resize((144,144),R),(ROOTX-72,GROUND-round(156*.9)));moves.append(c)
heavyPath=ROOT/'docs/art/candidates/botuo/heavy/composite-review-v1/F3-safe-cell.png'
heavy=read(heavyPath)
mechanics=json.loads((ROOT/'docs/art/candidates/botuo/special/key-pose-v1/mechanics-snapshot.json').read_text())
T0=next(r for r in mechanics['direct'] if r['tier']=='T0' and r['side']=='allies' and r['source']=='player')
state=T0['statuses'][0];assert state['magnitude']==.25 and state['expiryTime']==4
chain=next(r for r in mechanics['lifecycle'] if r['case']=='special-then-heavy-same-clock');assert chain['at']==0 and chain['enemyHpLoss']>0
fx=[];fxrecords=[]
for name,size in [('activation-raw-v1.png',(320,260)),('mitigation-state-raw-v1.png',(224,234))]:
 p=OUT/name;im=read(p);a=im.getchannel('A');assert a.histogram()[0]>im.width*im.height*.2
 # Padding derivative has clear borders and retains every original RGBA byte.
 safe=Image.new('RGBA',(im.width+80,im.height+80));safe.paste(im,(40,40));assert safe.crop((40,40,40+im.width,40+im.height)).tobytes()==im.tobytes()
 fx.append(im.resize(size,R));fxrecords.append(dict(source=str(p.relative_to(ROOT)),sha256=sha(p),sourceSize=im.size,alphaBounds=a.getbbox(),coreBounds=core(im),transparentPixels=a.histogram()[0],reviewSize=size,inMemoryPadding=40,fullRGBARoundTrip=True,policy='No source threshold cleanup, crop, color change or overwritten source.'))
activation,aura=fx;SCENE=(640,360);ACTOR=(80,0)
def put(dst,im,center,opacity=1):
 layer=im.copy()
 if opacity!=1:layer.putalpha(layer.getchannel('A').point(lambda a:round(a*opacity)))
 xy=(round(center[0]-layer.width/2),round(center[1]-layer.height/2))
 assert min(xy)>=0 and xy[0]+layer.width<=dst.width and xy[1]+layer.height<=dst.height
 dst.alpha_composite(layer,xy)
def active(t,record=state):return record['startTime']<=(t-400)/1000 and (t-400)/1000+1e-9<record['expiryTime']
def body(t,chainMode=False):
 q=t-400
 if q<0 or q>=4000:return idle,'IDLE',0
 if chainMode and q<280:return heavy,'INSTANT HEAVY / STATE RETAINED',30
 if not chainMode and q<640:return poses[min(3,q//160)],'F'+str(min(3,q//160)+1),0
 if (280 if chainMode else 1000)<=q<3200:return moves[(q//100)%4],'MOVE / STATE RETAINED',round(38*math.sin((q-1000)/2200*math.pi))
 return idle,'IDLE / STATE RETAINED',0
def render(t,mirror=False,withFx=True,reduced=False,chainMode=False):
 scene=Image.new('RGBA',SCENE,'#192633');im,label,dx=body(t,chainMode);worldDx=dx if label.startswith('MOVE') else 0;cx=ACTOR[0]+ROOTX+worldDx;center=(cx,GROUND-88)
 if withFx and active(t):
  put(scene,aura,center,.78 if reduced else .9)
  if not chainMode and 400<=t<720:put(scene,activation,center,.8 if reduced else min(1,(720-t)/160))
 scene.alpha_composite(im,(ACTOR[0]+dx,0))
 if mirror:scene=ImageOps.mirror(scene)
 d=ImageDraw.Draw(scene)
 d.text((14,10),'SPECIAL / '+('INSTANT CHAIN STUDY' if chainMode else 'STATIC FX CUES' if reduced else 'ACTION + DEFENSE' if withFx else 'CHARACTER ONLY'),font=font(19),fill='white')
 d.text((14,39),('LEFT' if mirror else 'RIGHT')+' | '+label,font=font(14),fill='#f0c56d')
 d.text((14,320),'T0 STATUS '+('ACTIVE: 25% MITIGATION' if active(t) else 'OFF')+' / 4s source-record window',font=font(13),fill='#f0c56d')
 d.text((14,342),'Art reconstruction only / no new startup, hit, lock or gameplay timing',font=font(12),fill='#bac9d4')
 return scene.convert('RGB')
results=[]
def savegif(name,frames,hold):
 # Global palette avoids frame-to-frame palette flicker. Full opaque frames/disposal2 avoid ghosting.
 sample=Image.new('RGB',(320,180*len(frames)))
 for i,f in enumerate(frames):sample.paste(f.resize((320,180),R),(0,i*180))
 palette=sample.quantize(colors=256,method=Image.Quantize.MEDIANCUT)
 indexed=[f.quantize(palette=palette,dither=Image.Dither.NONE) for f in frames]
 p=OUT/name;indexed[0].save(p,save_all=True,append_images=indexed[1:],duration=hold,loop=0,disposal=2,optimize=False)
 g=Image.open(p);n=0;total=0
 for i in range(g.n_frames):
  g.seek(i);g.load();duration=g.info['duration'];assert duration%hold==0;total+=duration
  for _ in range(duration//hold):assert g.convert('RGB').tobytes()==indexed[n].convert('RGB').tobytes();n+=1
 assert n==len(frames) and total==hold*n
 results.append(dict(path=str(p.relative_to(ROOT)),sha256=sha(p),bytes=p.stat().st_size,decodedFrames=g.n_frames,samples=n,totalMs=total,pixelTimelineRoundTrip='PASS',disposal=2))
times=list(range(0,5000,40))
main=[render(t,m) for m in [False,True] for t in times]
savegif('botuo-special-composite-normal.gif',main,40)
savegif('botuo-special-composite-slow.gif',main,120)
savegif('botuo-special-character-only.gif',[render(t,m,False) for m in [False,True] for t in range(0,1680,40)],80)
savegif('botuo-special-reduced-cues.gif',[render(t,m,True,True) for m in [False,True] for t in times],40)
savegif('botuo-special-instant-chain.gif',[render(t,m,True,False,True) for m in [False,True] for t in times],40)
assert active(400) and active(4399) and not active(399) and not active(4400)
assert body(400,True)[1].startswith('INSTANT HEAVY') and active(400)
qa=Image.new('RGB',(1280,1080))
for i,t in enumerate([0,440,600,760,920,1800]):qa.paste(render(t),((i%2)*640,(i//2)*360))
qa.save(OUT/'sequence-review.png')
qa2=Image.new('RGB',(1280,1080))
for i,(t,chainMode,mirror) in enumerate([(400,True,False),(400,True,True),(1800,False,False),(1800,False,True),(4360,False,False),(4400,False,False)]):qa2.paste(render(t,mirror,True,False,chainMode),((i%2)*640,(i//2)*360))
qa2.save(OUT/'chain-facing-expiry-QA.png')
fxqa=Image.new('RGB',(1000,640))
for i,name in enumerate(['activation-raw-v1.png','mitigation-state-raw-v1.png']):
 im=read(OUT/name);im.thumbnail((460,280),R)
 for j,bg in enumerate(['#eeeae2','#192633']):
  tile=Image.new('RGBA',(500,320),bg);tile.alpha_composite(im,((500-im.width)//2,(320-im.height)//2));fxqa.paste(tile.convert('RGB'),(j*500,i*320))
fxqa.save(OUT/'vfx-light-dark-QA.png')
# Exact SAME Idle for comparison, independent of the Special pose's upright silhouette.
comparison=Image.new('RGB',(1280,360));heavyDir=ROOT/'docs/art/candidates/botuo/heavy/composite-review-v1'
for i,label in enumerate(['APPROVED HEAVY SOURCE','SPECIAL ACTIVATION + STATE']):
 tile=Image.new('RGBA',SCENE,'#192633')
 if i==0:put(tile,read(heavyDir/'source-pressure-raw-v1.png').resize((230,154),R),(353,190))
 else:put(tile,aura,(280,196),.9);put(tile,activation,(280,196))
 tile.alpha_composite(idle,ACTOR);ImageDraw.Draw(tile).text((14,14),label,font=font(18),fill='white');comparison.paste(tile.convert('RGB'),(i*640,0))
comparison.save(OUT/'heavy-special-vfx-comparison.png')
# Actual decoded GIF QA samples at both facings, onset/move/expiry.
g=Image.open(OUT/'botuo-special-composite-normal.gif');decoded=Image.new('RGB',(1280,1080))
for k,t in enumerate([400,5400,1800,6800,4360,4400]):
 elapsed=0
 for j in range(g.n_frames):
  g.seek(j);duration=g.info['duration']
  if elapsed<=t<elapsed+duration:decoded.paste(g.convert('RGB'),((k%2)*640,(k//2)*360));break
  elapsed+=duration
 else:raise AssertionError(t)
decoded.save(OUT/'decoded-facing-state-QA.png')
manifest=dict(status='SPECIAL VFX + GIF CANDIDATE / PLAYER REVIEW PENDING',poseApproval='docs/art/approved/botuo/special/poses-v1/acceptance.json',poses=records,cell=CELL,strip=dict(path=str((OUT/'special-four-equal-cells.png').relative_to(ROOT)),sha256=sha(OUT/'special-four-equal-cells.png'),size=[1600,320]),idle=dict(path=str(idlepath.relative_to(ROOT)),sha256=sha(idlepath),reviewSize=[144,144]),move=dict(path=str(movePath.relative_to(ROOT)),sha256=sha(movePath),reviewSize=[144,144],cadence='10fps illustrative preview; production12fps unchanged'),heavyChain=dict(path=str(heavyPath.relative_to(ROOT)),sha256=sha(heavyPath),translationOnly=[30,0]),vfx=fxrecords,mechanicsEvidence='docs/art/candidates/botuo/special/key-pose-v1/mechanics-snapshot.json',recipientStudy='recipient-review.json',stateAnchor='Actor root + actual preview world translation only; Heavy image-layout offset never shifts aura',stateRecord=state,previewTimelineMs=dict(cast=400,F1=160,F2=160,F3=160,F4=160,stateOn=400,stateOff=4400,cycle=5000,immediateHeavyChain=400),gifs=results,scope=['Art reconstruction, NOT a browser recording/runtime or phone proof.','State window comes from actual T0 record; body frame holds and movement/Heavy display are review-only, no new startup or lock.','Instant-chain visual uses real same-clock Special→Heavy evidence; Special gesture may be superseded, no delay to finish F1–F4.','Common .126 raw-source density reuses accepted Heavy authoring-preview policy; inspect head/arm/bracer/waist/hoof with approved Idle/Move; not runtime anatomical calibration.','No body bounding-height fitting, no source pixel edits/regeneration; full resized RGBA retained with generous padding.','Transient activation and sustained contour separate; no damage contact or absorption/invulnerability/team-AoE claim.','All state art removed at4s boundary; future runtime must bind actual per-recipient source/status/Tier/refresh/KO/leave/Pause/scene lifecycle.','Primary preview is T0 SELF ONLY. Existing T1+one-ally status remains authoritative; no all-team aura.','Reduced mode is calm static cue proposal, not implemented accessibility.','No production/approved source changes, build/deploy/residency fit claim;16MiB+131072reserve unchanged.'])
(OUT/'review-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
for e in receipt['sources']:assert sha(ROOT/e['path'])==e['sha256']
(OUT/'SHA256SUMS.json').write_text(json.dumps({p.name:sha(p) for p in sorted(OUT.iterdir()) if p.is_file() and p.name!='SHA256SUMS.json'},indent=2)+'\n')
print(json.dumps({'approvedSourcesUnchanged':True,'groundResidualPixels':[r['groundResidualPx'] for r in records],'gifs':results},indent=2))
