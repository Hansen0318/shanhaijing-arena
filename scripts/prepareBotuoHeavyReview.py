"""Deterministic approved-pose + independent FX review. No runtime assets or timing."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont,ImageOps
import hashlib,json
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'docs/art/candidates/botuo/heavy/composite-review-v1'
R=Image.Resampling.LANCZOS
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
def font(n):return ImageFont.truetype(FONT,n)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def read(p):
 im=Image.open(p).convert('RGBA');im.load();return im
def core(im):return im.getchannel('A').point(lambda a:255 if a>128 else 0).getbbox()
receipt=json.loads((ROOT/'docs/art/approved/botuo/heavy/poses-v1/acceptance.json').read_text())
CELL=(400,320);GROUND=274;SUPPORT=135;DENSITY=.126
poses=[];records=[]
# Common raw-source density for all four approved high-resolution figures.
# No per-pose face-span or bounding-height normalization. Ground alignment is translation only.
for i,entry in enumerate(receipt['sources']):
 p=ROOT/entry['path'];assert sha(p)==entry['sha256'];im=read(p);b=core(im)
 # Authored rear-hoof support coordinates; not a root/renderer contract.
 support=[400,390,400,470][i]
 size=tuple(round(v*DENSITY) for v in im.size);resized=im.resize(size,R)
 xy=(round(SUPPORT-support*DENSITY),GROUND-round(b[3]*DENSITY))
 assert min(xy)>=24 and xy[0]+size[0]<CELL[0]-24 and xy[1]+size[1]<CELL[1]-24
 cell=Image.new('RGBA',CELL);cell.paste(resized,xy)
 assert cell.crop((xy[0],xy[1],xy[0]+size[0],xy[1]+size[1])).tobytes()==resized.tobytes()
 cell.save(OUT/f'F{i+1}-safe-cell.png');poses.append(cell)
 records.append(dict(frame=f'F{i+1}',source=entry['path'],sha256=entry['sha256'],sourceSize=im.size,sourceCoreBounds=b,rawSourceDensity=DENSITY,sourceRearHoofX=support,xy=xy,resizedSize=size,fullResizedRGBApreserved=True,deletedSourcePixels=0,previewGroundResidualPixels=round(b[3]*DENSITY)+xy[1]-GROUND))
idlepath=ROOT/'public/assets/characters/botuo/battleIdle.png';assert sha(idlepath)=='27c65e3f1633f4e5959e62b2fbb72df7bf47e6e8324425af24943b53d8a0d2b8'
im=read(idlepath);idle=Image.new('RGBA',CELL);idleXY=(SUPPORT-27,GROUND-round(158*.9));idle.paste(im.resize((144,144),R),idleXY);idle.save(OUT/'approved-idle-return-cell.png')
fx=[];fxrecords=[]
for name,size in [('source-pressure-raw-v1.png',(230,154)),('target-impact-raw-v1.png',(210,168))]:
 p=OUT/name;im=read(p);a=im.getchannel('A');assert a.histogram()[0]>im.width*im.height/3
 fx.append(im.resize(size,R));fxrecords.append(dict(source=str(p.relative_to(ROOT)),sha256=sha(p),sourceSize=im.size,alphaBounds=a.getbbox(),transparentPixels=a.histogram()[0],reviewSize=size,policy='Preserve full RGBA source incl. translucent glow, no cleanup or crop.'))
sweep,impact=fx;SCENE=(640,340);ACTOR=(115,0);CONTACT=(430,GROUND-72)
def put(dst,im,c,opacity=1):
 im=im.copy()
 if opacity<1:im.putalpha(im.getchannel('A').point(lambda a:round(a*opacity)))
 xy=(round(c[0]-im.width/2),round(c[1]-im.height/2));assert min(xy)>=0 and xy[0]+im.width<=dst.width and xy[1]+im.height<=dst.height
 dst.alpha_composite(im,xy)
def phase(t):
 if t<400 or t>=1040:return idle,'IDLE'
 i=min(3,(t-400)//160);return poses[i],'F'+str(i+1)
def render(t,mirror=False,with_fx=True,hit=True,reduced=False):
 scene=Image.new('RGBA',SCENE,'#192633');actor,label=phase(t);d=ImageDraw.Draw(scene);d.line((40,GROUND,600,GROUND),fill='#526374')
 if hit:
  x,y=CONTACT;d.line((x,y-22,x,y+22),fill='#7b8993',width=2);d.line((x-16,y,x+16,y),fill='#7b8993',width=2)
 if with_fx and 560<=t<1000:
  opacity=.8 if reduced else min(1,(1000-t)/160)
  put(scene,sweep,(353,CONTACT[1]-6),opacity)
 scene.alpha_composite(actor,ACTOR)
 if with_fx and hit and 720<=t<1000:
  opacity=.65 if reduced else min(1,(1000-t)/160)
  put(scene,impact,CONTACT,opacity)
 if mirror:scene=ImageOps.mirror(scene)
 d=ImageDraw.Draw(scene);d.text((14,10),'HEAVY / '+('STATIC FX CUES' if reduced else 'ACTION + VFX' if with_fx else 'CHARACTER ONLY'),font=font(20),fill='white')
 d.text((14,40),('LEFT' if mirror else 'RIGHT')+' | '+('HIT STUDY' if hit else 'AIR CAST / NO TARGET BURST')+' | '+label,font=font(15),fill='#f0c56d')
 d.text((14,302),'Preview timing only / not gameplay or a damage event',font=font(14),fill='#bac9d4')
 return scene.convert('RGB')
TIMES=list(range(0,1680,40));results=[]
def savegif(name,frames,hold):
 sample=Image.new('RGB',(320,170*len(frames)))
 for i,f in enumerate(frames):sample.paste(f.resize((320,170),R),(0,i*170))
 pal=sample.quantize(colors=256,method=Image.Quantize.MEDIANCUT);indexed=[f.quantize(palette=pal,dither=Image.Dither.NONE) for f in frames]
 p=OUT/name;indexed[0].save(p,save_all=True,append_images=indexed[1:],duration=hold,loop=0,disposal=2,optimize=False)
 gif=Image.open(p);n=0;total=0
 for i in range(gif.n_frames):
  gif.seek(i);gif.load();duration=gif.info['duration'];assert duration%hold==0;total+=duration
  for _ in range(duration//hold):assert gif.convert('RGB').tobytes()==indexed[n].convert('RGB').tobytes();n+=1
 assert n==len(frames) and total==hold*n
 results.append(dict(path=str(p.relative_to(ROOT)),sha256=sha(p),bytes=p.stat().st_size,decodedFrames=gif.n_frames,samples=n,totalMs=total,pixelTimelineRoundTrip='PASS',disposal=2))
main=[render(t,m,True,h) for m,h in [(False,True),(True,True),(False,False),(True,False)] for t in TIMES]
savegif('botuo-heavy-composite-normal.gif',main,40);savegif('botuo-heavy-composite-slow.gif',main,120)
savegif('botuo-heavy-character-only.gif',[render(t,m,False) for m in [False,True] for t in TIMES],80)
savegif('botuo-heavy-reduced-cues.gif',[render(t,m,True,True,True) for m in [False,True] for t in TIMES],40)
qa=Image.new('RGB',(1280,1020))
for i,t in enumerate([0,440,600,760,920,1200]):qa.paste(render(t),((i%2)*640,(i//2)*340))
qa.save(OUT/'sequence-review.png');render(760).save(OUT/'contact-review.png');render(760,False,True,False).save(OUT/'air-cast-review.png')
# Compare FX at identical approved Idle size/placement: no actor enlargement to sell Heavy.
basic=ROOT/'docs/art/candidates/botuo/basic/composite-review-v1'
compare=Image.new('RGB',(1280,340))
for i,(label,sizes,names) in enumerate([('BASIC',[(180,134),(142,126)],['source-force-raw-v1.png','target-impact-raw-v1.png']),('HEAVY',[(230,154),(210,168)],['source-pressure-raw-v1.png','target-impact-raw-v1.png'])]):
 tile=Image.new('RGBA',SCENE,'#192633');pdir=basic if i==0 else OUT
 put(tile,read(pdir/names[0]).resize(sizes[0],R),(353,CONTACT[1]-6));tile.alpha_composite(idle,ACTOR);put(tile,read(pdir/names[1]).resize(sizes[1],R),CONTACT)
 ImageDraw.Draw(tile).text((14,12),label+' / SAME APPROVED IDLE 144 x 144',font=font(18),fill='white');compare.paste(tile.convert('RGB'),(i*640,0))
compare.save(OUT/'basic-heavy-vfx-comparison.png')
fxqa=Image.new('RGB',(1000,520))
for i,name in enumerate(['source-pressure-raw-v1.png','target-impact-raw-v1.png']):
 im=read(OUT/name);im.thumbnail((470,230),R)
 for j,bg in enumerate(['#eeeeee','#172533']):
  tile=Image.new('RGBA',(500,260),bg);tile.alpha_composite(im,((500-im.width)//2,(260-im.height)//2));fxqa.paste(tile.convert('RGB'),(j*500,i*260))
fxqa.save(OUT/'vfx-light-dark-QA.png')
# Inspect actual decoded GIF samples, not only pre-encoding images.
g=Image.open(OUT/'botuo-heavy-composite-normal.gif');checks=[760,1680+760,3360+760,5040+760];decoded=Image.new('RGB',(1280,680))
for k,t in enumerate(checks):
 elapsed=0
 for j in range(g.n_frames):
  g.seek(j);h=g.info['duration']
  if elapsed<=t<elapsed+h:decoded.paste(g.convert('RGB'),((k%2)*640,(k//2)*340));break
  elapsed+=h
 else:raise AssertionError(t)
decoded.save(OUT/'decoded-facing-hit-whiff-QA.png')
metrics=[]
for label,name,size,bname,bsize in [('source','source-pressure-raw-v1.png',(230,154),'source-force-raw-v1.png',(180,134)),('contact','target-impact-raw-v1.png',(210,168),'target-impact-raw-v1.png',(142,126))]:
 a=read(OUT/name).resize(size,R).getchannel('A');b=read(basic/bname).resize(bsize,R).getchannel('A')
 ac=sum(a.histogram()[65:]);bc=sum(b.histogram()[65:]);assert ac>bc
 metrics.append(dict(layer=label,heavyVisiblePixelsAlphaGt64=ac,basicVisiblePixelsAlphaGt64=bc,ratio=ac/bc,threshold=64,scope='Art preview footprint at stated display size, not damage geometry or measured phone perception'))

manifest=dict(status='VFX + GIF CANDIDATE / PLAYER REVIEW PENDING',poseApproval='docs/art/approved/botuo/heavy/poses-v1/acceptance.json',recoveredHead='c563cfdc53f64b39a3f429ed048c8fccc23a7726',poses=records,idle=dict(path=str(idlepath.relative_to(ROOT)),sha256=sha(idlepath),size=[144,144],xy=idleXY,groundAnchor=158),vfx=fxrecords,previewTimelineMs=dict(idleBefore=400,F1=160,F2=160,F3=160,F4=160,idleAfter=640,contact=720,cycle=1680),sourceWindow=[560,1000],contactWindow=[720,1000],fxComparison=metrics,gifs=results,policy=['One .126 uniform XY raw-pixel density for all four approved high-resolution poses; translation-only foot alignment, no face-span/silhouette-height fitting, no regenerating approved art.','Preview packing density is NOT final renderer contract/anatomy calibration. Inspect face/trunk/bracer/hooves/Idle continuity, require multiple independent landmarks and actual built-app validation before runtime.','Fresh complete composites + shared GIF palette/disposal2; no pose blending/ghosting/interpolated anatomy.','HIT uses schematic cross only; no enemy art or actual collision/HP is simulated. AIR CAST retains source effect, has no target burst.','Preview phase holds proposed for art readability, not settled Heavy650ms telegraph/Tier/non-tactical/whiff timing. No gameplay change or Basic250ms inference.','Same exact static Idle144x144 in Basic/Heavy FX comparison. Heavy source230x154 vs180x134; contact210x168 vs142x126, art display sizes only, not hit geometry.','Reduced cues are a visual candidate, not implemented or device-verified accessibility. No runtime cache/residency/build/browser/Pages changes.'])
(OUT/'review-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
for entry in receipt['sources']:assert sha(ROOT/entry['path'])==entry['sha256']
(OUT/'SHA256SUMS.json').write_text(json.dumps({p.name:sha(p) for p in sorted(OUT.iterdir()) if p.is_file() and p.name!='SHA256SUMS.json'},indent=2)+'\n')
print(json.dumps({'approvedSourcesUnchanged':True,'groundResidualPixels':[r['previewGroundResidualPixels'] for r in records],'gifs':results},indent=2))
