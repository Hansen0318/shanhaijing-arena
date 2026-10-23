"""Art-only reconstruction. Run with Python/Pillow; no runtime execution.
All source RGBA pixels preserved in padded masters, never tight-cropped.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
import json, hashlib

OUT=Path(__file__).resolve().parent
ROOT=OUT.parents[5]
BASIC=ROOT/'docs/art/candidates/chiru/basic/composite-review-v1'
R=Image.Resampling.LANCZOS
CELL=(320,260)
SIZE=(780,460)
PLACE=(70,40)
TARGET=(605,175)
SHA='8943837f65e321bc2bd7290280af829801e9735cf3e3033300ba991314e694f6'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def rel(p):return str(p.relative_to(ROOT))
def read(p):
    im=Image.open(p);im.load();assert im.mode=='RGBA',p
    return im
def js(n,d):(OUT/n).write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
def font(n):return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',n)
def text(im,xy,s,n=15,color='white'):ImageDraw.Draw(im).text(xy,s,font=font(n),fill=color)
receipt=ROOT/'docs/art/approved/chiru/heavy/f3-v3/acceptance.json'
acc=json.loads(receipt.read_text());assert acc['sourceSha256']==SHA
sources={n:OUT/'originals'/f'{n}.png' for n in ['F1','F2','F4']}
sources['F3']=ROOT/acc['source'];assert sha(sources['F3'])==SHA
immutable={rel(receipt):sha(receipt)}
# Author-inspected anatomy points. Common source scale .13, common chest X
# and hover-tip baseline; vertical chest motion is authored body coiling.
lm={
 'F1':dict(chest=(570,600),eye=(633,361),hover=(620,1210),orb=(280,630)),
 'F2':dict(chest=(670,510),eye=(758,332),hover=(620,1210),orb=(340,500)),
 'F3':dict(chest=(785,550),eye=(830,350),hover=(755,1238),orb=(1095,650)),
 'F4':dict(chest=(780,550),eye=(850,325),hover=(760,1220),orb=(970,610)),
}
poses={};orbs={};qa=[]
for n in ['F1','F2','F3','F4']:
 p=sources[n];im=read(p);immutable[rel(p)]=sha(p)
 padded=Image.new('RGBA',(im.width+128,im.height+128));padded.paste(im,(64,64))
 assert padded.crop((64,64,64+im.width,64+im.height)).tobytes()==im.tobytes()
 # Native padding is reconstructible; original bytes retained separately.
 scaled=im.resize(tuple(round(v*.13) for v in im.size),R)
 x=158-round(lm[n]['chest'][0]*.13);y=203-round(lm[n]['hover'][1]*.13)
 assert x>=0 and y>=0 and x+scaled.width<CELL[0] and y+scaled.height<CELL[1]
 cell=Image.new('RGBA',CELL);cell.paste(scaled,(x,y))
 assert cell.crop((x,y,x+scaled.width,y+scaled.height)).tobytes()==scaled.tobytes()
 b=cell.getchannel('A').getbbox();m=[b[0],b[1],CELL[0]-b[2],CELL[1]-b[3]];assert min(m)>=24
 assert ImageOps.mirror(ImageOps.mirror(cell)).tobytes()==cell.tobytes()
 cell.save(OUT/f'{n}-safe-cell.png');poses[n]=cell
 orbs[n]=(PLACE[0]+x+round(lm[n]['orb'][0]*.13),PLACE[1]+y+round(lm[n]['orb'][1]*.13))
 qa.append(dict(frame=n,source=rel(p),sha256=sha(p),scale=.13,landmarks=lm[n],translation=[x,y],alphaBounds=b,margins=m,fullSourceRoundTrip=True,scaledRoundTrip=True,mirrorRoundTrip=True))
idlepath=ROOT/'public/assets/characters/chiru/battleIdle.png'
immutable[rel(idlepath)]=sha(idlepath)
idle=read(idlepath);idlecell=Image.new('RGBA',CELL);idlecell.paste(idle,(75,43))
idlecell.save(OUT/'approved-idle-return-cell.png')
strip=Image.new('RGBA',(1280,260))
for i,n in enumerate(poses):
 strip.paste(poses[n],(320*i,0));assert strip.crop((320*i,0,320*(i+1),260)).tobytes()==poses[n].tobytes()
strip.save(OUT/'four-equal-cells.png')
fx={};fxqa=[]
for n,w in [('charge',90),('column',360),('impact',190)]:
 p=OUT/'originals'/f'{n}.png';im=read(p);immutable[rel(p)]=sha(p)
 pad=Image.new('RGBA',(im.width+128,im.height+128));pad.paste(im,(64,64))
 assert pad.crop((64,64,64+im.width,64+im.height)).tobytes()==im.tobytes()
 # Reconstructible padded derivative.
 s=w/im.width;display=pad.resize((round(pad.width*s),round(pad.height*s)),R)
 display.save(OUT/f'{n}-display.png');fx[n]=display
 fxqa.append(dict(name=n,source=rel(p),sha256=sha(p),sourceSize=im.size,sourceAlpha=im.getchannel('A').getbbox(),displaySize=display.size,displayScale=s,paddedRGBARoundTrip=True))
def put(dst,im,c,opacity=1):
 im=im.copy()
 if opacity!=1:im.putalpha(im.getchannel('A').point(lambda a:round(a*opacity)))
 xy=(round(c[0]-im.width/2),round(c[1]-im.height/2))
 assert min(xy)>=0 and xy[0]+im.width<=dst.width and xy[1]+im.height<=dst.height,(xy,im.size)
 dst.alpha_composite(im,xy)
def heavy(t,effects=True,hit=True,reduced=False):
 world=Image.new('RGBA',(780,310))
 phase='IDLE' if t<0 or t>=950 else 'F1' if t<200 else 'F2' if t<350 else 'F3' if t<750 else 'F4'
 world.alpha_composite(poses.get(phase,idlecell),PLACE)
 # Review target cross is not a character/HUD or gameplay geometry.
 d=ImageDraw.Draw(world);x,y=TARGET if hit else (605,70)
 d.line((x-8,y,x+8,y),fill='#8b9eac',width=2);d.line((x,y-10,x,y+10),fill='#8b9eac',width=2)
 if effects:
  if phase in ['F1','F2']:put(world,fx['charge'],orbs[phase],.35 if phase=='F1' else .8)
  if 350<=t<850:
   ox,oy=orbs['F3'];duration=350;progress=min(1,(t-350)/duration)
   # Column grows along locked visual lane; target burst is impossible before 700ms.
   wave=fx['column'];width=round((TARGET[0]-ox)*progress)
   if reduced:width=TARGET[0]-ox
   wave=wave.resize((max(12,width),wave.height),R)
   opacity=(.35 if reduced else .75) if t<700 else max(.15,1-(t-700)/180)
   put(world,wave,(ox+width/2,TARGET[1]),opacity)
  if hit and 700<=t<950:
   # Source contact notch is at 52% width / 85% height, not canvas center.
   im=fx['impact'];center=(TARGET[0]-.02*im.width,TARGET[1]-.35*im.height)
   put(world,im,center,(.65 if reduced else 1)*max(.1,1-(t-700)/280))
 return world,phase
basicposes={n:read(BASIC/f'{n}-safe-cell.png') for n in ['F1','F2','F3','F4']}
basicfx={n:read(BASIC/f'{n}-display.png') for n in ['charge','arrow','impact']}
basiclm=json.loads((BASIC/'manifest.json').read_text())['poses']
basicorbs={p['frame']:(p['orbWorld'][0]-10,p['orbWorld'][1]-20) for p in basiclm}
def basic(t,effects=True):
 world=Image.new('RGBA',(780,310));phase='IDLE' if t<0 or t>=400 else 'F1' if t<120 else 'F2' if t<180 else 'F3' if t<280 else 'F4'
 world.alpha_composite(basicposes.get(phase,idlecell),PLACE)
 if effects:
  if phase in ['F1','F2']:put(world,basicfx['charge'],basicorbs[phase],.5)
  if phase=='F3':
   ox,oy=basicorbs['F3'];put(world,basicfx['arrow'],((ox+TARGET[0])/2,TARGET[1]),.8)
   put(world,basicfx['impact'],(TARGET[0]+10,TARGET[1]-12),.9)
 return world
steps=[(-500,500),(0,200),(200,150)]+[(t,50) for t in range(350,950,50)]+[(950,650)]
records=[]
def gif(name,effects=True,hit=True,reduced=False,slow=1,mirror=False,compare=False):
 frames=[];holds=[];timeline=[]
 use_steps=steps
 if compare:
  edges=sorted(set([0,120,180,200,280,350,400,950]+list(range(350,951,50))))
  use_steps=[(-500,500)]+[(a,b-a) for a,b in zip(edges,edges[1:])]+[(950,650)]
 for t,ms in use_steps:
  world,phase=heavy(t,effects,hit,reduced)
  if mirror:world=ImageOps.mirror(world)
  if compare:
   scene=Image.new('RGBA',(780,650),'#192633');scene.alpha_composite(world,(0,20));scene.alpha_composite(basic(t,effects),(0,315))
   text(scene,(16,5),'HEAVY / SAME ACTOR SCALE',18);text(scene,(16,320),'BASIC / SAME ACTOR SCALE',18)
   text(scene,(16,625),'ART COMPARISON / same cast start / no runtime verification',14)
  else:
   scene=Image.new('RGBA',SIZE,'#192633');scene.alpha_composite(world,(0,25))
   text(scene,(16,5),'CHIRU HEAVY / SURGING WAVE',18)
   text(scene,(16,350),f'{phase} | cast {max(0,t)}ms | '+('LEFT MIRROR' if mirror else 'RIGHT CANONICAL'),16,color='#6fdfef')
   text(scene,(16,378),'RELEASE 350ms / CONTACT 700ms | '+('MISS' if not hit else 'NO EXTERNAL FX' if not effects else 'REDUCED' if reduced else 'NORMAL'),14)
   scene.alpha_composite(world.resize((390,155),R),(380,286))
   text(scene,(16,430),'ART PREVIEW / not game footage or damage verification',13,color='#a4b5c5')
  frames.append(scene.convert('RGB'));hold=ms*slow if 0<=t<950 else ms;holds.append(hold)
  timeline.append(dict(castOffsetMs=t,phase=phase,logicalHoldMs=ms,playbackHoldMs=hold,targetImpact=bool(effects and hit and 700<=t<950)))
 sample=Image.new('RGB',(390,round(frames[0].height/2)*len(frames)))
 for i,f in enumerate(frames):sample.paste(f.resize((390,round(f.height/2)),R),(0,i*round(f.height/2)))
 pal=sample.quantize(colors=256,method=Image.Quantize.MEDIANCUT)
 indexed=[f.quantize(palette=pal,dither=Image.Dither.NONE) for f in frames]
 p=OUT/name;indexed[0].save(p,save_all=True,append_images=indexed[1:],duration=holds,loop=0,disposal=2,optimize=False)
 g=Image.open(p);decoded=[]
 for i in range(g.n_frames):g.seek(i);g.load();decoded.append((g.convert('RGB').tobytes(),g.info['duration']))
 di=0;remain=decoded[0][1]
 for f,ms in zip(indexed,holds):
  assert f.convert('RGB').tobytes()==decoded[di][0];assert ms<=remain;remain-=ms
  if remain==0:
   di+=1
   if di<len(decoded):remain=decoded[di][1]
 assert di==len(decoded) and sum(d for _,d in decoded)==sum(holds)
 assert all(not v['targetImpact'] for v in timeline if v['castOffsetMs']<700 or not hit)
 js(name+'.timeline.json',timeline)
 records.append(dict(path=rel(p),sha256=sha(p),bytes=p.stat().st_size,decodedFrames=g.n_frames,durationMs=sum(holds),pixelTimingRoundTrip=True))
 if name=='chiru-heavy-normal.gif':frames[10].save(OUT/'contact-preview.png')
gif('chiru-heavy-normal.gif')
gif('chiru-heavy-slow.gif',slow=3)
gif('chiru-heavy-noFX.gif',effects=False)
gif('chiru-heavy-miss.gif',hit=False)
gif('chiru-heavy-mirror.gif',mirror=True)
gif('chiru-heavy-idle-return.gif',effects=False)
gif('chiru-heavy-reduced.gif',reduced=True)
gif('heavy-vs-basic.gif',compare=True)
gif('heavy-vs-basic-noFX.gif',compare=True,effects=False)
board=Image.new('RGB',(1600,640))
for row,bg in enumerate(['#f2f0e7','#192633']):
 for i,n in enumerate(['IDLE','F1','F2','F3','F4']):
  tile=Image.new('RGBA',(320,320),bg);tile.alpha_composite(poses.get(n,idlecell),(0,30));text(tile,(12,5),n,18,color='#738393');board.paste(tile.convert('RGB'),(i*320,row*320))
board.save(OUT/'poses-light-dark-QA.png')
board=Image.new('RGBA',(1200,600))
for row,bg in enumerate(['#f2f0e7','#192633']):
 for i,n in enumerate(fx):
  tile=Image.new('RGBA',(400,300),bg);put(tile,fx[n],(200,155));text(tile,(12,8),n,18,color='#738393');board.paste(tile,(400*i,300*row))
board.convert('RGB').save(OUT/'fx-light-dark-QA.png')
tiers=[]
for tier,w in enumerate([350,337.75,325.5,305.9]):tiers.append(dict(tier=tier,F1ms=w*200/350,F2ms=w*150/350,releaseMs=w,resolveMs=w+350,F3ms=400,F4ms=200))
js('tier-timeline.json',tiers)
for p,h in immutable.items():assert sha(ROOT/p)==h,p
js('manifest.json',dict(status='F3 APPROVED / NEW POSES FX GIF PLAYER REVIEW PENDING',baseline='2477a1b41c9b7060093dba3be33fd4f190c5fe9b',sources=immutable,poses=qa,effects=fxqa,outputs=records,tiers=tiers,commonScale=.13,hoverBaseline=203,chestX=158,approvedSourceUnchanged=True,limitations=['Author visual anatomy QA, not runtime or physical phone verification','GIF uses exact T0 centiseconds; fractional T1-T3 preserved in tier-timeline.json, not represented as exact GIF clocks','noFX removes external VFX only; approved held water ring pixels remain','Source edge alpha includes faint pixels; all source pixels retained, padded rather than trimmed','Reduced uses stationary lane with lower opacity and no expanding column; impact remains tied to 700ms']))
print(json.dumps(dict(status='PASS',poses=len(qa),fx=len(fxqa),gifs=len(records),sourceHash=SHA,outputs=records),indent=2))
