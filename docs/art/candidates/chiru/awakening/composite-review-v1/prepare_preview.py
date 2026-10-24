"""Art-only deterministic review. Run with Python/Pillow. NEVER edits approved inputs.
No combat/runtime execution. No source alpha deletion/repaint or canvas-fit scaling.
"""
from pathlib import Path
from PIL import Image,ImageOps,ImageDraw,ImageFont,ImageFile
import hashlib,json,math,shutil
ImageFile.LOAD_TRUNCATED_IMAGES=False
OUT=Path(__file__).resolve().parent; ROOT=OUT.parents[5]
SP=ROOT/'docs/art/candidates/chiru/special/composite-review-v1'
F3=ROOT/'docs/art/candidates/chiru/awakening/f3-v2'
R=Image.Resampling.LANCZOS; CELL=(320,260); WORLD=(1060,370)
PLACES=[(50,100),(370,100),(690,100)]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def rel(p):return str(p.relative_to(ROOT))
def js(n,v):(OUT/n).write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
def read(p):
 with Image.open(p) as im:im.verify()
 im=Image.open(p);im.load();assert im.mode=='RGBA',p
 return im

def info(im):
 a=im.getchannel('A');b=a.getbbox();v=a.point(lambda x:255 if x>16 else 0).getbbox()
 return dict(size=im.size,alphaRange=a.getextrema(),alphaBounds=b,visibleAlpha16Bounds=v,margins=[b[0],b[1],im.width-b[2],im.height-b[3]])
def text(im,xy,s,n=16,color='#dcebf0'):
 ImageDraw.Draw(im).text(xy,s,font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',n),fill=color)
def anchor(dst,im,pos,a=(.5,.5),alpha=1):
 xy=(round(pos[0]-im.width*a[0]),round(pos[1]-im.height*a[1]))
 assert min(xy)>=0 and xy[0]+im.width<=dst.width and xy[1]+im.height<=dst.height,(xy,im.size)
 if alpha!=1:
  im=im.copy();im.putalpha(im.getchannel('A').point(lambda x:round(x*alpha)))
 dst.alpha_composite(im,xy)

receipt=ROOT/'docs/art/approved/chiru/awakening/f3-v2/acceptance.json'
acc=json.loads(receipt.read_text())
assert sha(ROOT/acc['source'])==acc['sourceSha256']=='7f23b33b22196ef59e0e996b4a901db5134280a0731f17f17d0e9ab511d3d340'
assert sha(ROOT/acc['generatedOriginal'])==acc['generatedOriginalSha256']
# Hash ALL approved masters/receipts plus F3 candidate directory and product tree.
protected={rel(p):sha(p) for folder in ['docs/art/approved','public/assets/characters','src'] for p in (ROOT/folder).rglob('*') if p.is_file()}
protected.update({rel(p):sha(p) for p in F3.rglob('*') if p.is_file()})
# Anatomical measurements, ORIGINAL pixels. Uniform scale per source derived
# from head/face/torso matching F3 .13; no silhouette/canvas/FX fitting.
LM={
 'F1':dict(chest=[790,440],eye=[735,257],hover=[755,1200],palmLeft=[350,550],palmRight=[1070,555],scale=.122),
 'F2':dict(chest=[785,482],eye=[725,288],hover=[780,1200],palmLeft=[410,443],palmRight=[1070,460],scale=.125),
 'F3':dict(chest=[770,565],eye=[690,385],hover=[745,1230],palmLeft=[322,225],palmRight=[1035,290],scale=.13),
 'F4':dict(chest=[800,480],eye=[750,300],hover=[820,1183],palmLeft=[685,600],palmRight=[1035,565],scale=.126),
}
poses={};poseqa=[];originalqa=[]
for p in sorted((OUT/'originals').glob('*.png')):
 im=read(p);originalqa.append(dict(path=rel(p),sha256=sha(p),strictFullDecode=True,**info(im)))
for name,lm in LM.items():
 p=ROOT/acc['generatedOriginal'] if name=='F3' else OUT/'originals'/f'{name}.png'
 im=read(p)
 pad=Image.new('RGBA',(im.width+256,im.height+256));pad.paste(im,(128,128))
 assert pad.crop((128,128,128+im.width,128+im.height)).tobytes()==im.tobytes()
 if name=='F3':
  assert pad.tobytes()==read(ROOT/acc['source']).tobytes()
  shutil.copyfile(ROOT/acc['source'],OUT/'F3-padded-master.png')
  shutil.copyfile(F3/'F3-safe-cell.png',OUT/'F3-safe-cell.png')
 else:pad.save(OUT/f'{name}-padded-master.png')
 s=lm['scale'];small=im.resize(tuple(round(x*s) for x in im.size),R)
 xy=(158-round(lm['chest'][0]*s),203-round(lm['hover'][1]*s))
 assert min(xy)>=0 and xy[0]+small.width<320 and xy[1]+small.height<260
 cell=Image.new('RGBA',CELL);cell.paste(small,xy)
 assert cell.crop((*xy,xy[0]+small.width,xy[1]+small.height)).tobytes()==small.tobytes()
 if name=='F3':assert cell.tobytes()==read(F3/'F3-safe-cell.png').tobytes()
 else:cell.save(OUT/f'{name}-safe-cell.png')
 assert min(info(cell)['margins'])>=24
 assert ImageOps.mirror(ImageOps.mirror(cell)).tobytes()==cell.tobytes()
 poses[name]=cell
 poseqa.append(dict(frame=name,source=rel(p),sha256=sha(p),landmarks=lm,canonicalDensity=.13,anatomyNormalization=s/.13,translation=xy,eyeInCell=[xy[0]+round(lm['eye'][0]*s),xy[1]+round(lm['eye'][1]*s)],RGBAAndScaleRoundTrips=True,**info(cell)))
idle=read(SP/'approved-idle-return-cell.png');idle.save(OUT/'approved-idle-return-cell.png')
strip=Image.new('RGBA',(1280,260))
for i,(n,im) in enumerate(poses.items()):
 strip.paste(im,(320*i,0));assert strip.crop((320*i,0,320*(i+1),260)).tobytes()==im.tobytes()
strip.save(OUT/'four-equal-cells.png')
fx={};fxqa=[]
# Independent VFX has independent visual geometry; NEVER scales actor anatomy.
for n,w in [('caster',340),('recipient',250),('protection',190)]:
 p=OUT/'originals'/f'{n}.png';im=read(p)
 pad=Image.new('RGBA',(im.width+256,im.height+256));pad.paste(im,(128,128))
 assert pad.crop((128,128,128+im.width,128+im.height)).tobytes()==im.tobytes()
 pad.save(OUT/f'{n}-padded-master.png')
 display=im.resize((w,round(im.height*w/im.width)),R);display.save(OUT/f'{n}-display.png');fx[n]=display
 fxqa.append(dict(name=n,source=rel(p),sha256=sha(p),sourceInfo=info(im),paddedInfo=info(pad),displayInfo=info(display),RGBARoundTrip=True))

def phase(t):return 'IDLE' if t<0 or t>=1200 else 'F1' if t<360 else 'F2' if t<600 else 'F3' if t<900 else 'F4'
def awakening(t,effects=True,positive=True,t3=False,reduced=False,actor=True,cancel=False):
 world=Image.new('RGBA',WORLD);n=phase(t)
 if cancel and t>=500:n='IDLE'
 settled=t>=600 and not cancel
 caster=effects and 0<=t<1200 and not(cancel and t>=500)
 blossom=effects and positive and settled and t<1200
 shield=effects and t3 and settled and t<3100
 if caster:
  full=fx['caster'];q=1 if reduced or t>=600 else .32+.68*t/600
  # Bilateral rise/unfurl, full-opacity authored color. Terminal fade only.
  im=full.resize((round(full.width*(.72+.28*q)),round(full.height*q)),R)
  anchor(world,im,(208,303),(.5,.88),1 if t<1100 else max(0,(1200-t)/100))
 for i,xy in enumerate(PLACES):
  pos=(xy[0]+158,xy[1]+203)
  if shield:anchor(world,fx['protection'],(pos[0],pos[1]-81),(.5,.5))
  if blossom:
   im=fx['recipient'];q=1 if reduced else min(1,.84+.16*(t-600)/100)
   im=im.resize((round(im.width*q),round(im.height*q)),R)
   anchor(world,im,pos,(.5,.82),1 if t<1100 else max(0,(1200-t)/100))
  if actor:world.alpha_composite(poses.get(n,idle) if i==0 else idle,xy)
 # All three allies incl caster genuinely positive in this explicitly scripted scenario.
 before=[650,400,700] if positive else [1000]*3
 fraction=.30 if t3 else .16
 amounts=[min(1000-h,1000*fraction) if positive and settled else 0 for h in before]
 return world,dict(phase=n,casterFx=caster,recipientBlossoms=[blossom]*3,protectiveMembranes=[shield]*3,healAmounts=amounts,hp=[h+a for h,a in zip(before,amounts)],settled=settled,scenarioTier=3 if t3 else 0)

sposes={n:read(SP/f'{n}-safe-cell.png') for n in LM}
sfx={n:read(SP/f'{n}-display.png') for n in ['caster','recipient']}
def special(t,effects=True):
 world=Image.new('RGBA',WORLD)
 n='IDLE' if t<0 or t>=760 else 'F1' if t<200 else 'F2' if t<320 else 'F3' if t<520 else 'F4'
 if effects and 0<=t<760:
  im=sfx['caster'];fade=1 if t<680 else max(0,(760-t)/80)
  if t<200:q=t/200;w=round(275-65*q);h=round(75+25*q)
  elif t<320:q=(t-200)/120;w=round(210+40*q);h=round(100+(im.height-100)*q)
  else:w,h=im.size
  anchor(world,im.resize((w,h),R),(208,303),(.5,.875),fade)
 if effects and 320<=t<760:
  im=sfx['recipient'];q=min(1,.84+.16*(t-320)/80)
  anchor(world,im.resize((round(im.width*q),round(im.height*q)),R),(528,303),(.5,.82),1 if t<680 else max(0,(760-t)/80))
 for i,xy in enumerate(PLACES):world.alpha_composite(sposes.get(n,idle) if i==0 else idle,xy)
 return world

records=[]
def build(name,effects=True,positive=True,t3=False,reduced=False,slow=1,mirror=False,compare=False,actor=True,cancel=False,idle_hold=700,phone=False):
 end=3200 if t3 else 1400
 edges=sorted(set(range(0,1201,40))|{360,600,900,1100,1200,end})
 if t3:edges=sorted(set(edges)|{1600,2100,2600,3060,3100})
 if compare:edges=sorted(set(edges)|{200,320,520,680,760})
 if cancel:edges=sorted(set(edges)|{500})
 steps=[(-500,500)]+[(a,b-a) for a,b in zip(edges,edges[1:])]+[(end,idle_hold)]
 frames=[];holds=[];timeline=[]
 for t,ms in steps:
  world,rec=awakening(t,effects,positive,t3,reduced,actor,cancel)
  if mirror:world=ImageOps.mirror(world)
  if compare:
   scene=Image.new('RGBA',(1060,850),'#172b37')
   scene.alpha_composite(special(t,effects),(0,25));scene.alpha_composite(world,(0,425))
   text(scene,(16,7),'SPECIAL / one beneficiary / same actor scale',17)
   text(scene,(16,407),'AWAKENING / whole living team incl. self / same actor scale',17)
   text(scene,(16,821),'ART SIMULATION | shared cast start | NOT runtime footage',15)
  else:
   scene=Image.new('RGBA',(1060,480),'#172b37');scene.alpha_composite(world,(0,25))
   title='CANCELLED AT 500ms' if cancel else 'T3 FULL HP / SHIELD ONLY' if not positive else 'NO INDEPENDENT FX' if not effects else 'REDUCED / STATIC CUES' if reduced else 'T3 POSITIVE HEAL + PROTECTION' if t3 else 'T0 POSITIVE HEAL / WHOLE TEAM'
   text(scene,(16,7),'CHIRU AWAKENING / '+title,18)
   text(scene,(16,397),f"{rec['phase']} | {max(t,0)}ms | "+('LEFT MIRROR' if mirror else 'RIGHT CANONICAL'),16,color='#72e0ef')
   text(scene,(16,423),f"HP /1000: {rec['hp']} | one heal each at 600ms | T3 protection 600-3100ms",15)
   text(scene,(16,452),'ART SIMULATION / scripted scenario, NOT game footage or runtime proof',15)
  if phone:
   # Uniform whole-scene reduction, never rescale individual actors.
   p=Image.new('RGBA',(390,235),'#172b37');p.alpha_composite(scene.resize((390,177),R),(0,26));text(p,(10,5),'390px whole-scene preview',15);text(p,(10,211),'Art only / not physical-device test',12);scene=p
  frames.append(scene.convert('RGB'));holds.append(ms*slow if 0<=t<end else ms)
  timeline.append(dict(castOffsetMs=t,logicalHoldMs=ms,playbackHoldMs=holds[-1],**rec))
 # Stable shared palette. GIF may merge identical frames; verify decoded pixels
 # across every intended interval, not merely total encoded duration.
 samples=Image.new('RGB',(530,math.ceil(frames[0].height/2)*len(frames)))
 h=math.ceil(frames[0].height/2)
 for i,f in enumerate(frames):samples.paste(f.resize((530,h),R),(0,i*h))
 palette=samples.quantize(colors=256,method=Image.Quantize.MEDIANCUT)
 indexed=[f.quantize(palette=palette,dither=Image.Dither.NONE) for f in frames]
 path=OUT/name;indexed[0].save(path,save_all=True,append_images=indexed[1:],duration=holds,loop=0,disposal=1,optimize=True)
 decoded=[]
 with Image.open(path) as g:
  for i in range(g.n_frames):g.seek(i);g.load();decoded.append((g.convert('RGB').tobytes(),g.info['duration']))
 di=0;remain=decoded[0][1]
 for f,ms in zip(indexed,holds):
  assert f.convert('RGB').tobytes()==decoded[di][0],(name,di)
  assert ms<=remain;(remain:=remain-ms)
  if remain==0:
   di+=1
   if di<len(decoded):remain=decoded[di][1]
 assert di==len(decoded) and sum(d for _,d in decoded)==sum(holds)
 assert min(d for _,d in decoded)>=20
 for rec in timeline:
  t=rec['castOffsetMs']
  if t<600 or cancel:assert rec['healAmounts']==[0]*3 and not any(rec['recipientBlossoms']) and not any(rec['protectiveMembranes'])
  if not positive:assert not any(rec['recipientBlossoms'])
  if t>=1200:assert rec['phase']=='IDLE' and not rec['casterFx'] and not any(rec['recipientBlossoms'])
  if t>=3100:assert not any(rec['protectiveMembranes'])
 js(name+'.timeline.json',timeline)
 records.append(dict(path=rel(path),sha256=sha(path),bytes=path.stat().st_size,decodedFrames=len(decoded),decodedHoldsMs=[d for _,d in decoded],totalDurationMs=sum(holds),pixelTimingRoundTrip=True,minDecodedHoldMs=min(d for _,d in decoded)))
 if name=='chiru-awakening-normal.gif':frames[next(i for i,(t,_) in enumerate(steps) if t==600)].save(OUT/'heal-peak-preview.png')
 if name=='awakening-vs-special.gif':frames[next(i for i,(t,_) in enumerate(steps) if t==600)].save(OUT/'comparison-peak-preview.png')

build('chiru-awakening-normal.gif')
build('chiru-awakening-slow.gif',slow=3)
build('chiru-awakening-noFX.gif',effects=False)
build('chiru-awakening-left-mirror.gif',mirror=True)
build('chiru-awakening-idle-return.gif',idle_hold=1500)
build('chiru-awakening-reduced.gif',reduced=True,t3=True)
build('chiru-awakening-full-hp-protection.gif',positive=False,t3=True)
build('chiru-awakening-t3-positive.gif',t3=True)
build('chiru-awakening-cancel-before600.gif',cancel=True)
build('awakening-vs-special.gif',compare=True)
build('awakening-vs-special-noFX.gif',compare=True,effects=False)
build('chiru-awakening-phone-390.gif',phone=True)
build('chiru-awakening-fx-only.gif',actor=False,t3=True)
# Actual common-scale still QA, light/dark, both sides.
board=Image.new('RGBA',(1600,600))
for row,bg in enumerate(['#f2f0e7','#172b37']):
 for i,n in enumerate(['IDLE','F1','F2','F3','F4']):
  tile=Image.new('RGBA',(320,300),bg);tile.alpha_composite(poses.get(n,idle),(0,25));text(tile,(10,5),n,17,color='#71838b');board.paste(tile,(320*i,300*row))
board.convert('RGB').save(OUT/'poses-light-dark-QA.png')
board=Image.new('RGBA',(1280,600))
for row,bg in enumerate(['#f2f0e7','#172b37']):
 for i,n in enumerate(LM):
  tile=Image.new('RGBA',(320,300),bg);tile.alpha_composite(ImageOps.mirror(poses[n]),(0,25));text(tile,(10,5),n+' EXACT MIRROR',16,color='#71838b');board.paste(tile,(320*i,300*row))
board.convert('RGB').save(OUT/'mirror-light-dark-QA.png')
board=Image.new('RGBA',(1200,800))
for row,bg in enumerate(['#f2f0e7','#172b37']):
 for i,(n,im) in enumerate(fx.items()):
  tile=Image.new('RGBA',(400,400),bg);anchor(tile,im,(200,210));text(tile,(12,8),n,17,color='#71838b');board.paste(tile,(400*i,400*row))
board.convert('RGB').save(OUT/'fx-light-dark-QA.png')
board=Image.new('RGBA',(2120,740))
for row,t in enumerate([600,1300]):
 for col,bg in enumerate(['#f2f0e7','#172b37']):
  tile=Image.new('RGBA',WORLD,bg);tile.alpha_composite(awakening(t,t3=True)[0]);board.paste(tile,(1060*col,370*row))
board.convert('RGB').save(OUT/'composite-light-dark-QA.png')
board=Image.new('RGBA',(1060,850),'#172b37');board.alpha_composite(special(400),(0,25));board.alpha_composite(awakening(600)[0],(0,425))
text(board,(16,7),'SPECIAL / own restorative peak at 400ms',17);text(board,(16,407),'AWAKENING / own restorative peak at 600ms',17);text(board,(16,821),'SAME ACTOR SCALE / ART SIMULATION',15)
board.convert('RGB').save(OUT/'comparison-own-peaks.png')
# Four accepted F3 silhouettes, independent FX hidden; no reopening prior art.
board=Image.new('RGBA',(1280,300),'#172b37')
for i,(n,p) in enumerate([('BASIC',ROOT/'docs/art/candidates/chiru/basic/composite-review-v1/F3-safe-cell.png'),('HEAVY',ROOT/'docs/art/candidates/chiru/heavy/composite-review-v1/F3-safe-cell.png'),('SPECIAL',SP/'F3-safe-cell.png'),('AWAKENING',OUT/'F3-safe-cell.png')]):
 im=read(p);board.alpha_composite(im,(320*i,25));text(board,(320*i+8,5),n,17)
board.convert('RGB').save(OUT/'four-skill-noFX-QA.png')
for t in [-1,0,360,580,600,900,1200,3099,3100]:
 im,rec=awakening(t,t3=True);assert ImageOps.mirror(ImageOps.mirror(im)).tobytes()==im.tobytes()
 if t<600:assert awakening(t,positive=False,t3=True)[0].tobytes()==awakening(t,positive=True,t3=True)[0].tobytes()
for p,h in protected.items():assert sha(ROOT/p)==h,p
js('protected-hashes.json',protected)
js('manifest.json',dict(status='F3 PLAYER APPROVED / NEW POSES VFX GIF PLAYER REVIEW PENDING',baseline='6ae4c26c62714ea4c934a273b0dba85177926c87',remotePreGenerationCheckpoint='4807dc08d40aa978565ef3379ebf307875f4b4f1',mode='built-in imagegen + deterministic Pillow packaging',productionChanged=False,runtimeIntegrated=False,deployed=False,originals=originalqa,poses=poseqa,effects=fxqa,gifs=records,commonCell=CELL,chestX=158,hoverY=203,canonicalF3Density=.13,timing=dict(F1=360,F2=240,F3=300,F4=300,settlement=600,returnIdle=1200,T3ProtectionExpiry=3100),scenario=dict(kind='ART SIMULATION',livingTeamIncludingSelf=3,currentMaxHp=1000,beforeHp=[650,400,700],T0Fraction=.16,T3Fraction=.30,T2RearBonus='not enabled in illustrated fixture',fullHpHasNoFlower=True,shieldMitigation=.108,shieldDurationMs=2500),protectedFiles=len(protected),checks=dict(strictFullDecode=True,RGBAAndScaledRoundTrips=True,F3OriginalPaddingSafeCellUnchanged=True,safeCellsAndStrip=True,mirrorRoundTrip=True,decodedGifPixelsAndTiming=True,noEarlyRecipientEffect=True,noFakeFullHpFlower=True,cancelBefore600NoBenefit=True,T3ExpiryAt3100=True),limitations=['All new assets remain player review pending; landmark/identity/mirror/scale checks are author visual review, not independent review.','Generated originals may contain faint alpha at native edges. All source pixels retained; transparent128px padding added; visible silhouettes inspected on light/dark backgrounds.','F2-attempt1 too close to high-V F3; retained, unused. F2 has one targeted shoulder-height correction.','NoFX hides independent VFX, retains canonical held orb.','Reduced holds static full authored cues, only terminal caster/blossom fade; T3 protective rim remains static until exact scripted expiry.','GIF decode timing is verified, NOT browser/runtime/physical-device playback evidence.','Special comparison reconstructs previously approved poses/FX at same anchors/timing; no approved file written.','T3 shield expiry shown on Idle after action return, no repeated healing.','No suite/Build/Browser/Pages run: product untouched.']))
js('checksums.json',{str(p.relative_to(OUT)):sha(p) for p in sorted(OUT.rglob('*')) if p.is_file() and p.name!='checksums.json'})
print(json.dumps(dict(status='ART_QA_PASS',poses=len(poses),independentVfx=len(fx),gifs=len(records),protectedFiles=len(protected),gifMinHold=min(r['minDecodedHoldMs'] for r in records),F3Sha256=sha(ROOT/acc['source']),posesQA=poseqa),indent=2))
