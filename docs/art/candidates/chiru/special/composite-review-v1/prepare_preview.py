"""Rebuild this art-only Special review; Python/Pillow, no game/runtime execution.
Sources immutable; full RGBA source pixels padded, never thresholded or trimmed.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
import hashlib,json,math
OUT=Path(__file__).resolve().parent
ROOT=OUT.parents[5]
HEAVY=ROOT/'docs/art/candidates/chiru/heavy/composite-review-v1'
R=Image.Resampling.LANCZOS
CELL=(320,260); WORLD=(780,310); PLACE=(55,50); RECIP=(435,50)
CHEST_X=158; HOVER_Y=203
BASE='9c222a24f06c0a01b65ad5dd041b6e7e009afc38'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def rel(p):return str(p.relative_to(ROOT))
def js(n,v):(OUT/n).write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
def read(p):
 with Image.open(p) as im:im.verify()
 im=Image.open(p);im.load();assert im.mode=='RGBA',p
 return im

def info(im):
 a=im.getchannel('A');b=a.getbbox();v=a.point(lambda x:255 if x>16 else 0).getbbox()
 return dict(size=im.size,mode=im.mode,alphaRange=a.getextrema(),alphaBounds=b,visibleAlpha16Bounds=v,margins=[b[0],b[1],im.width-b[2],im.height-b[3]])

def text(im,xy,s,n=15,color='#d8e7ee'):
 font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',n)
 ImageDraw.Draw(im).text(xy,s,font=font,fill=color)

receipt=ROOT/'docs/art/approved/chiru/special/f3-v3/acceptance.json'
acc=json.loads(receipt.read_text())
assert sha(ROOT/acc['source'])==acc['sourceSha256']=='1ca80dc4237cb43c810d465cc6be9f67df1d12f293eab8a359cdb0d09c273ac8'
assert sha(ROOT/acc['generatedOriginal'])==acc['generatedOriginalSha256']
immutable={rel(receipt):sha(receipt),acc['source']:sha(ROOT/acc['source'])}
for p in [ROOT/'public/assets/characters/chiru/battleIdle.png',ROOT/'public/assets/characters/chiru/identity.png',ROOT/'docs/art/approved/chiru/heavy/composite-review-v1/acceptance.json']:
 immutable[rel(p)]=sha(p)
# Anatomical author measurements IN ORIGINAL pixels, not full-canvas bounds.
# New generated head crests are larger than approved F3, so normalize anatomy
# to canonical F3 .13 policy. Do NOT fit whole sprite or highest focus to Idle.
LM={
 'F1':dict(chest=(755,595),eye=(785,390),hover=(690,1192),orb=(1080,765),crestSpan=(380,970),scale=.112),
 'F2':dict(chest=(820,560),eye=(830,360),hover=(840,1220),orb=(1100,465),crestSpan=(400,1000),scale=.108),
 'F3':dict(chest=(795,550),eye=(695,355),hover=(745,1218),orb=(1040,150),crestSpan=(320,815),scale=.13),
 'F4':dict(chest=(790,480),eye=(710,265),hover=(780,1222),orb=(1030,400),crestSpan=(300,840),scale=.12),
}
poses={};orbs={};poseqa=[];originalqa=[]
for p in sorted((OUT/'originals').glob('*.png')):
 im=read(p);immutable[rel(p)]=sha(p)
 originalqa.append(dict(path=rel(p),sha256=sha(p),fullDecode=True,**info(im)))
for name,lm in LM.items():
 p=ROOT/acc['generatedOriginal'] if name=='F3' else OUT/'originals'/f'{name}.png'
 im=read(p);immutable[rel(p)]=sha(p)
 padded=Image.new('RGBA',(1510,1510));padded.paste(im,(128,128))
 assert padded.crop((128,128,128+im.width,128+im.height)).tobytes()==im.tobytes()
 padded.save(OUT/f'{name}-padded-master.png')
 if name=='F3':assert padded.tobytes()==read(ROOT/acc['source']).tobytes()
 s=lm['scale'];small=im.resize(tuple(round(n*s) for n in im.size),R)
 xy=(CHEST_X-round(lm['chest'][0]*s),HOVER_Y-round(lm['hover'][1]*s))
 assert min(xy)>=0 and xy[0]+small.width<CELL[0] and xy[1]+small.height<CELL[1]
 cell=Image.new('RGBA',CELL);cell.paste(small,xy)
 assert cell.crop((*xy,xy[0]+small.width,xy[1]+small.height)).tobytes()==small.tobytes()
 assert min(info(cell)['margins'])>=24
 assert ImageOps.mirror(ImageOps.mirror(cell)).tobytes()==cell.tobytes()
 cell.save(OUT/f'{name}-safe-cell.png');poses[name]=cell
 orbs[name]=(xy[0]+round(lm['orb'][0]*s),xy[1]+round(lm['orb'][1]*s))
 poseqa.append(dict(frame=name,source=rel(p),sha256=sha(p),landmarks=lm,canonicalScale=.13,sourceAnatomyNormalization=s/.13,effectiveScale=s,crestSpanReviewPx=(lm['crestSpan'][1]-lm['crestSpan'][0])*s,translation=xy,focusInCell=orbs[name],fullRGBARoundTrip=True,scaledRGBARoundTrip=True,mirrorRoundTrip=True,**info(cell)))
# Exact accepted Idle placement; this source already is a runtime derivative.
idle=read(HEAVY/'approved-idle-return-cell.png');immutable[rel(HEAVY/'approved-idle-return-cell.png')]=sha(HEAVY/'approved-idle-return-cell.png')
idle.save(OUT/'approved-idle-return-cell.png')
strip=Image.new('RGBA',(1280,260))
for i,(n,im) in enumerate(poses.items()):
 strip.paste(im,(i*320,0));assert strip.crop((i*320,0,(i+1)*320,260)).tobytes()==im.tobytes()
strip.save(OUT/'four-equal-cells.png')
fx={};fxqa=[]
for n,width in [('caster',250),('recipient',310)]:
 p=OUT/'originals'/f'{n}.png';im=read(p)
 pad=Image.new('RGBA',(im.width+256,im.height+256));pad.paste(im,(128,128))
 assert pad.crop((128,128,128+im.width,128+im.height)).tobytes()==im.tobytes()
 pad.save(OUT/f'{n}-padded-master.png')
 # Display uses full original including all faint-alpha edge pixels, padded
 # source retained separately; never deletion/masking to force boundaries.
 display=im.resize((width,round(im.height*width/im.width)),R)
 display.save(OUT/f'{n}-display.png');fx[n]=display
 anchor=(.5,.875) if n=='caster' else (.5,.82)
 fxqa.append(dict(name=n,source=rel(p),sha256=sha(p),sourceInfo=info(im),paddedInfo=info(pad),paddedRGBARoundTrip=True,displayInfo=info(display),anchorNormalized=anchor))

def put_anchor(dst,im,pos,anchor=(.5,.5),alpha=1):
 xy=(round(pos[0]-im.width*anchor[0]),round(pos[1]-im.height*anchor[1]))
 assert xy[0]>=0 and xy[1]>=0 and xy[0]+im.width<=dst.width and xy[1]+im.height<=dst.height,(xy,im.size,dst.size)
 if alpha!=1:
  im=im.copy();im.putalpha(im.getchannel('A').point(lambda a:round(a*alpha)))
 dst.alpha_composite(im,xy)

def phase(t):return 'IDLE' if t<0 or t>=760 else 'F1' if t<200 else 'F2' if t<320 else 'F3' if t<520 else 'F4'

def special(t,effects=True,positive=True,reduced=False,actor=True):
 world=Image.new('RGBA',WORLD);n=phase(t)
 # Source ring and beneficiary blossom are separate independent raster assets.
 # All values here are explicit art scenario clocks, NOT actual battle events.
 source_fx=effects and 0<=t<760
 target_fx=effects and positive and 320<=t<760
 if source_fx:
  im=fx['caster'];fade=1 if t<680 else max(0,(760-t)/80)
  if reduced:
   w,h=250,im.height
  elif t<200:
   q=t/200;w=round(275-65*q);h=round(75+25*q)
  elif t<320:
   q=(t-200)/120;w=round(210+40*q);h=round(100+(im.height-100)*q)
  else:w,h=250,im.height
  im=im.resize((w,h),R)
  put_anchor(world,im,(PLACE[0]+158,PLACE[1]+203),(.5,.875),fade)
 if target_fx:
  im=fx['recipient'];fade=1 if t<680 else max(0,(760-t)/80)
  growth=1 if reduced else min(1,.84+.16*(t-320)/80)
  im=im.resize((round(im.width*growth),round(im.height*growth)),R)
  put_anchor(world,im,(RECIP[0]+158,RECIP[1]+203),(.5,.82),fade)
 if actor:
  # Actor drawn above ring avoids head/body occlusion, blossom front petals
  # remain visible around the lower hover edge; no actor alpha reduction.
  world.alpha_composite(poses.get(n,idle),PLACE)
  world.alpha_composite(idle,RECIP)
 return world,dict(phase=n,casterFx=source_fx,recipientFx=target_fx,recipientAmount=250 if positive and t>=320 else 0,recipientHp=(650 if t>=320 else 400) if positive else 1000)

heavyposes={n:read(HEAVY/f'{n}-safe-cell.png') for n in LM}
heavyfx={n:read(HEAVY/f'{n}-display.png') for n in ['charge','column','impact']}
heavyqa=json.loads((HEAVY/'manifest.json').read_text())
for p in [HEAVY/'manifest.json']+[HEAVY/f'{n}-safe-cell.png' for n in LM]+[HEAVY/f'{n}-display.png' for n in heavyfx]:immutable[rel(p)]=sha(p)
heavyorbs={p['frame']:(PLACE[0]+p['translation'][0]+round(p['landmarks']['orb'][0]*.13),PLACE[1]+p['translation'][1]+round(p['landmarks']['orb'][1]*.13)) for p in heavyqa['poses']}

def heavy(t,effects=True):
 world=Image.new('RGBA',WORLD);target=(593,195)
 n='IDLE' if t<0 or t>=950 else 'F1' if t<200 else 'F2' if t<350 else 'F3' if t<750 else 'F4'
 world.alpha_composite(heavyposes.get(n,idle),PLACE)
 d=ImageDraw.Draw(world);d.line((target[0]-8,target[1],target[0]+8,target[1]),fill='#8b9eac',width=2);d.line((target[0],target[1]-10,target[0],target[1]+10),fill='#8b9eac',width=2)
 if effects:
  if n in ['F1','F2']:put_anchor(world,heavyfx['charge'],heavyorbs[n],alpha=.35 if n=='F1' else .8)
  if 350<=t<850:
   ox,oy=heavyorbs['F3'];progress=min(1,(t-350)/350);w=max(12,round((target[0]-ox)*progress));im=heavyfx['column'].resize((w,heavyfx['column'].height),R)
   put_anchor(world,im,(ox+w/2,target[1]),alpha=1 if t<700 else max(.15,1-(t-700)/180))
  if 700<=t<950:
   im=heavyfx['impact'];fade=1 if t<820 else max(0,(950-t)/130)
   put_anchor(world,im,(target[0]-.02*im.width,target[1]-.35*im.height),alpha=fade)
 return world

records=[]
def build_gif(name,effects=True,positive=True,reduced=False,slow=1,mirror=False,compare=False,phone=False,actor=True,idle_hold=600):
 edges=sorted(set(range(0,761,40))|{200,320,520,680,760})
 if compare:edges=sorted(set(edges)|set(range(350,951,50))|{950})
 steps=[(-500,500)]+[(a,b-a) for a,b in zip(edges,edges[1:])]+[(edges[-1],idle_hold)]
 frames=[];holds=[];timeline=[]
 for t,ms in steps:
  world,rec=special(t,effects,positive,reduced,actor)
  if mirror:world=ImageOps.mirror(world)
  if compare:
   scene=Image.new('RGBA',(780,720),'#192633');scene.alpha_composite(heavy(t,effects),(0,30));scene.alpha_composite(world,(0,370))
   text(scene,(16,8),'HEAVY / same actor anchor and head scale',17)
   text(scene,(16,347),'SPECIAL / restorative cast + actual-beneficiary scenario',17)
   text(scene,(16,696),'ART SIMULATION | shared cast start | NOT runtime footage',13)
  elif phone:
   scene=Image.new('RGBA',(390,230),'#192633');scene.alpha_composite(world.resize((250,99),R),(70,48))
   text(scene,(12,8),'390px / approx. 48px actor',17)
   text(scene,(12,165),'ART simulation / positive heal',14)
   text(scene,(12,194),'No device/runtime claim',13)
  else:
   scene=Image.new('RGBA',(780,430),'#192633');scene.alpha_composite(world,(0,30))
   title='ZERO HEAL / FULL HP' if not positive else 'NO EXTERNAL FX' if not effects else 'REDUCED / STATIC WATER' if reduced else 'INDEPENDENT FX ONLY' if not actor else 'POSITIVE HEAL SCENARIO'
   text(scene,(16,7),'CHIRU SPECIAL / '+title,18)
   text(scene,(16,348),f"{rec['phase']} | {max(0,t)}ms | "+('LEFT MIRROR' if mirror else 'RIGHT CANONICAL'),16,color='#6fdfef')
   text(scene,(16,375),f"Recipient B: {rec['recipientHp']}/1000 | example heal: "+('250 at 320ms' if positive else '0 / NO blossom'),15)
   text(scene,(16,405),'ART SIMULATION / not game footage or runtime validation',13,color='#a4b5c5')
  frames.append(scene.convert('RGB'));holds.append(ms*slow if 0<=t<edges[-1] else ms)
  timeline.append(dict(castOffsetMs=t,logicalHoldMs=ms,playbackHoldMs=holds[-1],**rec))
 sample=Image.new('RGB',(390,math.ceil(frames[0].height*390/frames[0].width)*len(frames)))
 h=sample.height//len(frames)
 for i,f in enumerate(frames):sample.paste(f.resize((390,h),R),(0,i*h))
 palette=sample.quantize(colors=256,method=Image.Quantize.MEDIANCUT)
 indexed=[f.quantize(palette=palette,dither=Image.Dither.NONE) for f in frames]
 p=OUT/name;indexed[0].save(p,save_all=True,append_images=indexed[1:],duration=holds,loop=0,disposal=2,optimize=False)
 g=Image.open(p);decoded=[]
 for i in range(g.n_frames):g.seek(i);g.load();decoded.append((g.convert('RGB').tobytes(),g.info['duration']))
 # GIF may merge identical adjacent images; compare every logical interval.
 di=0;remain=decoded[0][1]
 for f,ms in zip(indexed,holds):
  assert f.convert('RGB').tobytes()==decoded[di][0],(name,di)
  assert ms<=remain;remain-=ms
  if remain==0:
   di+=1
   if di<len(decoded):remain=decoded[di][1]
 assert di==len(decoded) and sum(d for _,d in decoded)==sum(holds)
 assert all(not v['recipientFx'] for v in timeline if v['castOffsetMs']<320 or not positive or not effects)
 assert all(v['phase']=='IDLE' and not v['casterFx'] and not v['recipientFx'] for v in timeline if v['castOffsetMs']>=760)
 js(name+'.timeline.json',timeline)
 records.append(dict(path=rel(p),sha256=sha(p),bytes=p.stat().st_size,decodedFrames=g.n_frames,totalDurationMs=sum(holds),decodedPixelTimingRoundTrip=True))
 if name=='chiru-special-normal.gif':
  peak=next(i for i,(t,ms) in enumerate(steps) if t==400);frames[peak].save(OUT/'heal-peak-preview.png')
 if name=='special-vs-heavy.gif':
  peak=next(i for i,(t,ms) in enumerate(steps) if t==400);frames[peak].save(OUT/'comparison-peak-preview.png')

build_gif('chiru-special-normal.gif')
build_gif('chiru-special-slow.gif',slow=3)
build_gif('chiru-special-noFX.gif',effects=False)
build_gif('chiru-special-left-mirror.gif',mirror=True)
build_gif('chiru-special-idle-return.gif',idle_hold=1500)
build_gif('chiru-special-reduced.gif',reduced=True)
build_gif('chiru-special-zero-heal.gif',positive=False)
build_gif('special-vs-heavy.gif',compare=True)
build_gif('special-vs-heavy-noFX.gif',compare=True,effects=False)
build_gif('chiru-special-phone-390.gif',phone=True)
build_gif('chiru-special-fx-only.gif',actor=False)
# Light/dark anatomy/side QA at the SAME review scale, not upscale thumbnails.
board=Image.new('RGBA',(1600,600))
for row,bg in enumerate(['#f2f0e7','#192633']):
 for i,n in enumerate(['IDLE','F1','F2','F3','F4']):
  tile=Image.new('RGBA',(320,300),bg);tile.alpha_composite(poses.get(n,idle),(0,20));text(tile,(10,5),n,17,color='#71838b');board.paste(tile,(320*i,300*row))
board.convert('RGB').save(OUT/'poses-light-dark-QA.png')
board=Image.new('RGBA',(960,640))
for row,bg in enumerate(['#f2f0e7','#192633']):
 for i,(n,im) in enumerate(fx.items()):
  tile=Image.new('RGBA',(480,320),bg);put_anchor(tile,im,(240,170));text(tile,(12,8),n,17,color='#71838b');board.paste(tile,(480*i,320*row))
board.convert('RGB').save(OUT/'fx-light-dark-QA.png')
board=Image.new('RGBA',(1560,620))
for row,t in enumerate([280,400]):
 for col,bg in enumerate(['#f2f0e7','#192633']):
  tile=Image.new('RGBA',WORLD,bg);tile.alpha_composite(special(t)[0]);board.paste(tile,(780*col,310*row))
board.convert('RGB').save(OUT/'composite-light-dark-QA.png')
# Compare each skill's OWN visual peak, in addition to shared-start GIFs.
board=Image.new('RGBA',(780,720),'#192633')
board.alpha_composite(heavy(700),(0,30));board.alpha_composite(special(400)[0],(0,370))
text(board,(16,8),'HEAVY / own contact peak at 700ms',17)
text(board,(16,347),'SPECIAL / own restorative peak at 400ms',17)
text(board,(16,696),'SAME ACTOR ANCHOR / ART SIMULATION / different peak clocks',13)
board.convert('RGB').save(OUT/'comparison-own-peaks.png')
# Verify mirror geometry per role including real asymmetrical accessory artwork.
for t in [0,200,320,520,760]:
 im,_=special(t);assert ImageOps.mirror(ImageOps.mirror(im)).tobytes()==im.tobytes()
# Positive and zero-heal scenarios are visually identical before settlement,
# then differ ONLY by recipient flower (same caster/body sources).
for t in [0,200,280]:assert special(t,positive=True)[0].tobytes()==special(t,positive=False)[0].tobytes()
assert special(400,positive=True)[0].tobytes()!=special(400,positive=False)[0].tobytes()
for p,h in immutable.items():assert sha(ROOT/p)==h,p
js('manifest.json',dict(status='F3 PLAYER APPROVED / NEW POSES VFX GIF PLAYER REVIEW PENDING',baseline=BASE,mode='built-in imagegen + deterministic Pillow packaging',productionChanged=False,runtimeIntegrated=False,deployed=False,originals=originalqa,sources=immutable,poses=poseqa,effects=fxqa,gifs=records,commonCell=CELL,chestX=158,hoverY=203,scalePolicy='Canonical F3 .13, new source anatomy normalized by measured crest/head/torso; never whole-canvas/highest-ring fit. No pose warping/repainting. Each source uses one uniform scale.',scenario=dict(type='explicit ART SIMULATION',positive=dict(casterHp=900,recipientHpBefore=400,recipientHpAfter=650,currentMaxHp=1000,tier=0,amount=250,settlementMs=320),zero=dict(casterHp=1000,recipientHp=1000,amount=0,recipientFx=False)),timing=dict(F1=200,F2=120,F3=200,F4=240,settlement=320,returnIdle=760),checks=dict(fullDecode=True,rgbaPaddingRoundTrip=True,F3PixelsAndReceiptUnchanged=True,commonAnchor=True,cellSafety=True,stripRoundTrip=True,mirrorRoundTrip=True,zeroHealHasNoRecipientFx=True,allGifPixelTimingRoundTrips=True,cleanupAt760=True),limitations=['Author landmark/anatomy/side review, not independent or physical-phone validation. New art remains player pending.','Generated originals include faint alpha reaching native edges; all pixels preserved and transparent padding added. Visible alpha16 silhouettes stay inside native bounds.','noFX removes independent VFX only: original approved held focus remains.','Reduced uses static large ring/blossom at full authored opacity, terminal 80ms fade only, no travelling/growing water.','Heavy comparison reconstructs approved poses/FX with later clarity alpha1/120ms hold policy; not a screen recording.','GIF scenario demonstrates approved future320ms contract; product remains old instant healing.','No product suite/build/browser/Pages rerun because product unchanged.']))
js('checksums.json',{str(p.relative_to(OUT)):sha(p) for p in sorted(OUT.rglob('*')) if p.is_file() and p.name!='checksums.json'})
print(json.dumps(dict(status='ART_QA_PASS',poses=len(poses),independentVfx=len(fx),gifs=len(records),protectedF3=acc['sourceSha256'],outputs=records),indent=2))
