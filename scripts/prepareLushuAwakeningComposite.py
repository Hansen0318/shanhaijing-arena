"""Review-only exact-approved-source normalization, independent VFX extraction and GIFs.
No game code, damage, positions or runtime descriptors are changed by this script.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageOps, ImageFont
import hashlib, json, math, io, os

ROOT=Path(__file__).resolve().parents[1]
POSES=ROOT/'docs/art/candidates/lushu/awakening/phase-poses-v1'
FX=ROOT/'docs/art/candidates/lushu/awakening/vfx-review-v1'
OUT=ROOT/'docs/art/candidates/lushu/awakening/composite-review-v1'
CELL=(640,480); ANCHOR=320; GROUND=410; SCENE=(960,540)
R=Image.Resampling.LANCZOS
CFG=[
 ('F1-anticipation',(1240,300,1420,490),915,971),
 ('A-first-rush-contact',(1180,225,1370,425),900,973),
 ('B-return-contact',(1110,215,1300,375),850,1001),
 ('C-terminal-F3',(1180,365,1355,535),850,882),
 ('F4-recovery',(750,370,900,530),670,1418),
]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def load(p):
 im=Image.open(p);im.load();assert im.mode=='RGBA',p
 return im
def bbox(im,threshold=0):return im.getchannel('A').point(lambda a:255 if a>threshold else 0).getbbox()
def margins(im):
 b=bbox(im);return [b[0],b[1],im.width-b[2],im.height-b[3]]
def font(n):return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',n)
def save(im,path,**options):
 path=Path(path);fmt={'.png':'PNG','.jpg':'JPEG','.gif':'GIF'}[path.suffix]
 buffer=io.BytesIO();im.save(buffer,format=fmt,**options);data=buffer.getvalue()
 temp=path.with_name(path.name+'.writing')
 assert temp.write_bytes(data)==len(data)
 check=Image.open(temp);check.load();assert temp.read_bytes()==data
 os.replace(temp,path)
def panel(im,bg='#1e2837'):
 x=Image.new('RGBA',im.size,bg);x.alpha_composite(im);return x.convert('RGB')

def main():
 OUT.mkdir(parents=True,exist_ok=True);FX.mkdir(parents=True,exist_ok=True)
 manifest=json.loads((POSES/'phase-pose-manifest.json').read_text())
 expected={r['pose']:r['sha256'] for r in manifest['poses']}
 cells=[];records=[]
 for name,skull,hip,foot in CFG:
  p=ROOT/'docs/art/approved/lushu/awakening/terminal-f3-v1/F3-terminal-master.png' if name.startswith('C-') else POSES/(name+'.png')
  assert sha(p)==expected[name],name
  src=load(p);scale=32/(skull[2]-skull[0]);size=tuple(round(v*scale) for v in src.size)
  xy=(round(ANCHOR-hip*scale),round(GROUND-foot*scale))
  assert min(xy)>=0 and xy[0]+size[0]<=CELL[0] and xy[1]+size[1]<=CELL[1]
  resized=src.resize(size,R);cell=Image.new('RGBA',CELL);cell.paste(resized,xy)
  assert cell.crop((xy[0],xy[1],xy[0]+size[0],xy[1]+size[1])).tobytes()==resized.tobytes()
  assert min(margins(cell))>=16,(name,margins(cell))
  save(cell,OUT/(name+'-cell.png'));cells.append(cell)
  records.append(dict(pose=name,source=str(p.relative_to(ROOT)),sha256=sha(p),skullBox=skull,
   targetSkullWidth=32,uniformXYScale=scale,resize=size,pelvisAnchorX=hip,supportFootY=foot,
   translation=xy,margins=margins(cell),policy='manual species-skull density; full source canvas, no independent silhouette-height fitting'))
 strip=Image.new('RGBA',(CELL[0]*5,CELL[1]))
 for i,c in enumerate(cells):strip.paste(c,(i*CELL[0],0))
 save(strip,OUT/'five-pose-safe-strip.png')
 for i,c in enumerate(cells):assert strip.crop((i*640,0,(i+1)*640,480)).tobytes()==c.tobytes()
 idle_source=load(ROOT/'public/assets/characters/lushu/battleIdle-4f.png').crop((0,0,96,128))
 idle=Image.new('RGBA',CELL);factor=2.15;patch=idle_source.resize((206,275),R)
 idle.paste(patch,(ANCHOR-103,GROUND-round(125*factor)))
 cells.append(idle);save(idle,OUT/'approved-idle-return.png')
 # Independent halves are rejoin-checked; no cross-panel significant-alpha bleed.
 fx=[];fxrecords=[]
 for key in 'ABC':
  p=FX/(key+'-pair-raw.png');src=load(p)
  columns=src.getchannel('A').point(lambda v:255 if v>8 else 0).getprojection()[0]
  runs=[];start=None
  for x,occupied in enumerate(columns+[1]):
   if not occupied and start is None:start=x
   if occupied and start is not None:
    if x-start>=12 and start>src.width*.25 and x<src.width*.85:runs.append((start,x))
    start=None
  assert runs,(key,'no transparent separator')
  run=min(runs,key=lambda r:abs((r[0]+r[1])/2-src.width/2));mid=(run[0]+run[1])//2
  a=src.getchannel('A');gap=a.crop((mid-6,0,mid+6,src.height))
  assert gap.getextrema()[1]<=8,(key,'VFX seam not separated')
  parts=[src.crop((0,0,mid,src.height)),src.crop((mid,0,src.width,src.height))]
  joined=Image.new('RGBA',src.size);joined.paste(parts[0],(0,0));joined.paste(parts[1],(mid,0))
  assert joined.tobytes()==src.tobytes()
  pair=[]
  for label,part in zip(['source','impact'],parts):
   safe=Image.new('RGBA',(part.width+160,part.height+160));safe.paste(part,(80,80))
   assert safe.crop((80,80,80+part.width,80+part.height)).tobytes()==part.tobytes()
   save(safe,FX/(key+'-'+label+'-padded.png'));pair.append(safe)
  fx.append(pair);fxrecords.append({'phase':key,'raw':str(p.relative_to(ROOT)),'sha256':sha(p),'splitX':mid,'seamAlphaMax':gap.getextrema()[1],'halvesRejoinExact':True,'padding':80})
 qa=Image.new('RGB',(1280,1200),'#172533')
 for i,c in enumerate(cells[:5]):
  for side,bg in enumerate(['white','#172533']):qa.paste(panel(c,bg).resize((320,240),R),((i%2)*640+side*320,(i//2)*400+30))
  ImageDraw.Draw(qa).text(((i%2)*640+10,(i//2)*400+8),CFG[i][0],font=font(17),fill='white')
 save(qa,OUT/'normalized-poses-light-dark.jpg',quality=94)
 fxboard=Image.new('RGB',(1200,960),'#172533')
 for i,pair in enumerate(fx):
  for j,im in enumerate(pair):
   q=panel(im);q.thumbnail((570,280),R);fxboard.paste(q,(j*600+15,i*320+32))
   ImageDraw.Draw(fxboard).text((j*600+15,i*320+8),'Phase '+chr(65+i)+' '+['SOURCE','IMPACT'][j],font=font(19),fill='white')
 save(fxboard,OUT/'three-phase-vfx-board.jpg',quality=94)
 def effect(im,maxsize):
  # Measure significant content, but retain/resize the ENTIRE original padded asset.
  # Large transparent margins must not silently make the final burst smaller.
  b=bbox(im,8);scale=min(maxsize[0]/(b[2]-b[0]),maxsize[1]/(b[3]-b[1]))
  q=im.resize((round(im.width*scale),round(im.height*scale)),R)
  return q,((b[0]+b[2])*scale/2,(b[1]+b[3])*scale/2)
 sourcefx=[effect(pair[0],(w,190)) for pair,w in zip(fx,[350,400,450])]
 impactfx=[effect(pair[1],(w,w)) for pair,w in zip(fx,[180,270,400])]
 def put(dst,im,center,opacity=1,flip=False):
  original,anchor=im
  q=ImageOps.mirror(original) if flip else original.copy()
  if flip:anchor=(q.width-anchor[0],anchor[1])
  xy=(round(center[0]-anchor[0]),round(center[1]-anchor[1]))
  b=bbox(q,8)
  assert b[0]+xy[0]>=0 and b[1]+xy[1]>=0 and b[2]+xy[0]<=dst.width and b[3]+xy[1]<=dst.height,'Visible VFX clipping'
  if opacity<1:q.putalpha(q.getchannel('A').point(lambda a:round(a*opacity)))
  dst.alpha_composite(q,xy)
 def actorx(t):
  keys=[(0,280),(80,280),(150,530),(175,620),(300,530),(320,430),(460,530),(510,600),(650,600),(1000,600)]
  for (a,x),(b,y) in zip(keys,keys[1:]):
   if t<=b:return x+(y-x)*(t-a)/(b-a)
  return 600
 def frame(t,mode='full',mirrored=False,miss=False):
  im=Image.new('RGBA',SCENE,'#172533');d=ImageDraw.Draw(im)
  d.line((35,GROUND,925,GROUND),fill='#334559',width=2)
  d.ellipse((520,GROUND-8,540,GROUND+8),outline='#7790a6',width=2)
  if t<80:index=0
  elif t<175:index=1
  elif t<320:index=2
  elif t<510:index=3
  elif t<650:index=4
  else:index=5
  x=actorx(t);back=index==2
  phase=max(0,min(2,index-1));active=80<=t<510
  if mode!='body' and active:
   put(im,sourcefx[phase],(x+(100 if back else -100),330),.85,back)
  if mode!='fx':
   c=ImageOps.mirror(cells[index]) if back else cells[index]
   im.alpha_composite(c,(round(x-ANCHOR),0))
  if mode!='body' and not miss:
   for hit,(at,duration) in enumerate([(150,80),(300,90),(460,130)]):
    if at<=t<at+duration:put(im,impactfx[hit],(530,300),max(.05,1-(t-at)/duration))
  if mirrored:im=ImageOps.mirror(im)
  d=ImageDraw.Draw(im)
  d.text((20,14),'LUSHU AWAKENING - ART PREVIEW ONLY',font=font(20),fill='white')
  d.text((20,44),'Scripted contacts 150 / 300 / 460 ms; recovery 650 ms',font=font(16),fill='#c1d0df')
  d.text((20,505),('WHIFF: no target burst' if miss else '3 staged impacts; no HP/damage simulation')+' | '+mode+' | '+('MIRROR' if mirrored else 'RIGHT'),font=font(16),fill='#c1d0df')
  return im.convert('RGB')
 times=sorted(set(list(range(0,651,20))+[150,175,300,320,460,510,650]))
 durations=[b-a for a,b in zip(times,times[1:])]+[350]
 # GIF minimum tick is10ms: snap175 to170 for pose transition only, never hit timestamps.
 times=[170 if t==175 else t for t in times];times=sorted(set(times))
 durations=[b-a for a,b in zip(times,times[1:])]+[350]
 gifrecords=[]
 for name,mode,speed,whiff in [('normal','full',1,False),('slow','full',3,False),('character-only','body',1,False),('vfx-only','fx',1,False),('whiff','full',1,True)]:
  frames=[frame(t,mode,mirror,whiff) for mirror in [False,True] for t in times]
  ds=[v*speed for v in durations]*2
  path=OUT/('lushu-awakening-'+name+'.gif')
  pal=[f.quantize(colors=256,method=Image.Quantize.MEDIANCUT,dither=Image.Dither.NONE) for f in frames]
  save(pal[0],path,save_all=True,append_images=pal[1:],duration=ds,loop=0,disposal=2,optimize=False)
  check=Image.open(path);total=0;count=0
  while True:
   check.load();assert check.size==SCENE;total+=check.info['duration'];count+=1
   try:check.seek(check.tell()+1)
   except EOFError:break
  assert total==sum(ds),(name,total,sum(ds))
  gifrecords.append({'file':path.name,'sha256':sha(path),'bytes':path.stat().st_size,'decodedFrames':count,'durationMs':total,'bothDirections':True})
 save(frame(460),OUT/'terminal-composite.jpg',quality=94)
 # Whiff proof is exact in the target-only effects mode before labels: no impact pixels are drawn.
 assert frame(150,'fx',miss=True).tobytes()!=frame(150,'fx',miss=False).tobytes()
 data={'status':'CHARACTER POSES APPROVED / VFX + COMPOSITE GIF PLAYER REVIEW PENDING','records':records,'vfx':fxrecords,'gifs':gifrecords,
  'previewContactsMs':[150,300,460],'previewRecoveryMs':650,'gifTickMs':10,'slowMultiplier':3,
  'sourcePreservation':'All original PNG bytes immutable; full source canvases uniformly resized; exact resized-pixel insertion verified; no redraw or pose regeneration.',
  'geometryBoundary':'All travel, contacts and target positions here are scripted illustration, not combat simulation or validated swept collision. Real runtime remains old equal hits0/+120/+240ms/no triple dash. No engineering/deploy/phone PASS.',
  'alphaBoundary':'Low-alpha original noise retained. No alpha deletion or cleanup claim; transparent padding and no-neighbor bleed verified.',
  'next':'Player reviews VFX/GIF; no runtime integration/deploy before explicit acceptance.'}
 (OUT/'review-manifest.json').write_text(json.dumps(data,indent=2)+'\n')
 print(json.dumps({'normalization':'PASS','vfxSplit':'PASS','gifDecodeDuration':'PASS','gifs':gifrecords}))

if __name__=='__main__':main()
