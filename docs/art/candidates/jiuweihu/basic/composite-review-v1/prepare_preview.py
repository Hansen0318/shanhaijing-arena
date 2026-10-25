"""Deterministic art-simulation assembly. No gameplay execution or master edits.
Pillow only. Run this file directly from any directory.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
import hashlib, json

OUT=Path(__file__).resolve().parent
ROOT=OUT.parents[5]
R=Image.Resampling.LANCZOS
CELL=(260,220)
S=.115
GROUND=190
ANCHOR=155
CHECKS=[]
def check(ok,label):
    assert ok,label
    CHECKS.append(label)
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def rel(p): return str(p.relative_to(ROOT))
def savejson(p,v): (OUT/p).write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
def read(p):
    im=Image.open(p); im.load()
    check(im.mode=='RGBA','RGBA fully decoded: '+p.name)
    return im
def font(n): return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',n)
def bounds(im): return im.getchannel('A').getbbox()
def margins(im):
    b=bounds(im)
    return [b[0],b[1],im.width-b[2],im.height-b[3]]
sources={n:OUT/'originals'/('basic-'+n.lower()+'.png') for n in ['F1','F2','F4']}
sources['F3']=ROOT/'docs/art/candidates/jiuweihu/basic/f3-v1/basic-f3.png'
f3hash='74f4a86bb8ae78ff8d805a400e8bdf8b023d86512fc6f0cb33b9beb62d1328b7'
check(sha(sources['F3'])==f3hash,'approved F3 exact SHA256')
immutable={rel(p):sha(p) for p in sources.values()}
for p in [ROOT/'docs/art/approved/jiuweihu/basic/f3-v1/acceptance.json',ROOT/'docs/verification/P4_CHARACTER_PREFLIGHT/spec-acceptance.json']:
    immutable[rel(p)]=sha(p)
# Author inspected stable waist jewel, full foot support and fingertip, not alpha fit.
# All generated originals have the same anatomy scale and 1254-square geometry.
landmarks={
 'F1':dict(waist=(798,590),groundY=1210,hand=(1080,439)),
 'F2':dict(waist=(779,589),groundY=1210,hand=(1180,450)),
 'F3':dict(waist=(780,588),groundY=1210,hand=(1173,440)),
 'F4':dict(waist=(782,588),groundY=1210,hand=(1122,675))}
poses={};hands={};poseqa=[]
for n in ['F1','F2','F3','F4']:
    im=read(sources[n]); lm=landmarks[n]
    pad=48
    master=Image.new('RGBA',(im.width+2*pad,im.height+2*pad))
    master.paste(im,(pad,pad))
    check(master.crop((pad,pad,pad+im.width,pad+im.height)).tobytes()==im.tobytes(),n+' padded master exact all-pixel roundtrip')
    check(min(margins(master))>=48,n+' padded master clear borders')
    master.save(OUT/(n+'-padded-master.png'))
    rs=im.resize((round(im.width*S),round(im.height*S)),R)
    xy=(ANCHOR-round(lm['waist'][0]*S),GROUND-round(lm['groundY']*S))
    cell=Image.new('RGBA',CELL);cell.paste(rs,xy)
    check(cell.crop((*xy,xy[0]+rs.width,xy[1]+rs.height)).tobytes()==rs.tobytes(),n+' resized pixel roundtrip')
    check(min(margins(cell))>=24,n+' safe-cell alpha margin >=24')
    check(ImageOps.mirror(ImageOps.mirror(cell)).tobytes()==cell.tobytes(),n+' mirror roundtrip')
    cell.save(OUT/(n+'-safe-cell.png'));poses[n]=cell
    hands[n]=(xy[0]+round(lm['hand'][0]*S),xy[1]+round(lm['hand'][1]*S))
    poseqa.append(dict(frame=n,source=rel(sources[n]),sha256=sha(sources[n]),sourceSize=im.size,scale=S,landmarks=lm,translation=xy,alphaBounds=bounds(cell),margins=margins(cell),allRawPixelsPreservedInPaddedMaster=True,hand=hands[n]))
strip=Image.new('RGBA',(CELL[0]*4,CELL[1]))
for i,n in enumerate(['F1','F2','F3','F4']):
    strip.paste(poses[n],(i*CELL[0],0))
    check(strip.crop((i*CELL[0],0,(i+1)*CELL[0],CELL[1])).tobytes()==poses[n].tobytes(),n+' strip exact cell no bleed')
strip.save(OUT/'four-equal-cells.png')
idlepath=ROOT/'public/assets/characters/jiuweihu/battleIdle.png'
idle=read(idlepath);immutable[rel(idlepath)]=sha(idlepath)
idlecell=Image.new('RGBA',CELL)
idlecell.paste(idle,(ANCHOR-103,GROUND-149))
idlecell.save(OUT/'approved-idle-return-cell.png')
poses['IDLE']=idlecell
fx={};fxqa=[]
for n,width in [('hand-release',72),('target-impact',94)]:
    p=OUT/'originals'/(n+'.png');im=read(p);immutable[rel(p)]=sha(p)
    pad=96;padded=Image.new('RGBA',(im.width+pad*2,im.height+pad*2));padded.paste(im,(pad,pad))
    check(padded.crop((pad,pad,pad+im.width,pad+im.height)).tobytes()==im.tobytes(),n+' padded exact raw pixels')
    padded.save(OUT/(n+'-padded-master.png'))
    if n=='hand-release': padded=ImageOps.mirror(padded)
    ds=width/im.width
    display=padded.resize((round(padded.width*ds),round(padded.height*ds)),R)
    check(min(margins(display))>=3,n+' display clear outer borders')
    display.save(OUT/(n+'-display.png'));fx[n]=display
    fxqa.append(dict(name=n,source=rel(p),sha256=sha(p),sourceSize=im.size,sourceAlphaBounds=bounds(im),padding=pad,displaySize=display.size,scale=ds,mirroredForRightFacing=n=='hand-release',rawPixelsPreserved=True))

def put(dst,im,xy,alpha=1):
    im=im.copy()
    if alpha!=1: im.putalpha(im.getchannel('A').point(lambda a:round(a*alpha)))
    xy=tuple(round(v) for v in xy)
    check(0<=xy[0] and 0<=xy[1] and xy[0]+im.width<=dst.width and xy[1]+im.height<=dst.height,'composite inside scene')
    dst.alpha_composite(im,xy)

def world(phase,fxon=True,hit=True,mirror=False,reduced=False,fade=1,vfxonly=False,second=False):
    w=Image.new('RGBA',(780,280));d=ImageDraw.Draw(w)
    # Reference crosses are art-review target locations, never gameplay warnings.
    d.line((570,128,590,128),fill='#92a5b0',width=2);d.line((580,118,580,138),fill='#92a5b0',width=2)
    loc=(80,20)
    if not vfxonly: put(w,poses[phase],loc)
    if fxon and phase in ['F3','F2'] and fade>0:
        h=hands['F3'];release=fx['hand-release'];impact=fx['target-impact']
        # Mirrored original's root at 24% of its width: root meets fingertip.
        put(w,release,(loc[0]+h[0]-release.width*.24,loc[1]+h[1]-release.height*.53),fade)
        if hit: put(w,impact,(580-impact.width*.52,128-impact.height*.59),fade)
    if second:
        # Independent later cast, no shared age/opacity; first has already expired.
        if not vfxonly: put(w,poses['F3'] if phase in ['F1','F4'] else poses['IDLE'],(300,55))
        if fxon and phase in ['F1','F4']:
            h=hands['F3'];a=.85 if phase=='F1' else .25
            put(w,fx['hand-release'],(300+h[0]-fx['hand-release'].width*.24,55+h[1]-fx['hand-release'].height*.53),a)
            put(w,fx['target-impact'],(670-fx['target-impact'].width*.52,165-fx['target-impact'].height*.59),a)
    return ImageOps.mirror(w) if mirror else w

# 0ms release AND hit. F1/F2 are follow-through, never obligatory windup.
timeline=[('IDLE',450,0),('F3',60,1),('F3',80,.65),('F2',90,.25),('F1',90,0),('F4',140,0),('IDLE',650,0)]
records=[]
def make(name,fxon=True,hit=True,reduced=False,slow=1,vfxonly=False,second=False,tiers=False):
    frames=[];holds=[];meta=[]
    for mirror in [False,True]:
        t=-450
        for phase,ms,fade in timeline:
            showphase=phase
            if reduced and phase!='IDLE':showphase='F3' if t<140 else 'IDLE'
            w=world(showphase,fxon,hit,mirror,reduced,fade if not reduced else (.7 if 0<=t<140 else 0),vfxonly,second)
            scene=Image.new('RGBA',(780,500),'#192633');scene.alpha_composite(w,(0,28));d=ImageDraw.Draw(scene)
            d.text((16,8),'JIUWEIHU BASIC / SPIRIT FIRE',font=font(19),fill='white')
            d.text((16,295),('LEFT MIRROR' if mirror else 'RIGHT CANONICAL')+' | '+showphase+' | '+('MISS: NO TARGET BLOOM' if not hit else 'HIT AT 0ms'),font=font(16),fill='#ffca89')
            label='NO FX' if not fxon else 'REDUCED' if reduced else 'VFX ONLY' if vfxonly else 'TWO INDEPENDENT CASTS' if second else 'ACTION + INDEPENDENT FX'
            d.text((16,322),label+' | '+str(slow)+'x duration | logical t='+str(t)+'ms',font=font(14),fill='white')
            # All panels use the SAME actor size. Tier Basic has no invented extra hits/AoE.
            if tiers:
                for tier in range(4):
                    mini=w.resize((195,70),R);scene.alpha_composite(mini,(tier*195,370))
                    d.text((tier*195+10,350),'T'+str(tier)+' / same art',font=font(14),fill='#ffca89')
                d.text((16,445),'Tier changes stats/range/cadence; no new Basic flame family.',font=font(13),fill='white')
            else:
                scene.alpha_composite(w.resize((390,140),R),(380,350))
                d.text((16,370),'HALF-SIZE COMPARISON ->',font=font(13),fill='#b5c6d6')
                d.text((16,397),'0ms snap, then follow-through.',font=font(13),fill='white')
                d.text((16,420),'No travelling projectile.',font=font(13),fill='white')
            d.text((16,476),'ART SIMULATION ONLY / NOT GAME FOOTAGE / PLAYER REVIEW PENDING',font=font(13),fill='#afbecb')
            frames.append(scene.convert('RGB'));holds.append(ms*slow if phase!='IDLE' else ms)
            meta.append(dict(mirror=mirror,phase=showphase,sourcePhase=phase,logicalStartMs=t,logicalHoldMs=ms,playbackHoldMs=holds[-1],releaseAndHitAtMs=0,hit=hit,opacity=fade))
            t+=ms
    sample=Image.new('RGB',(390,250*len(frames)))
    for i,im in enumerate(frames):sample.paste(im.resize((390,250),R),(0,i*250))
    pal=sample.quantize(colors=256,method=Image.Quantize.MEDIANCUT)
    indexed=[im.quantize(palette=pal,dither=Image.Dither.NONE) for im in frames]
    p=OUT/name;indexed[0].save(p,save_all=True,append_images=indexed[1:],duration=holds,loop=0,disposal=2,optimize=False)
    g=Image.open(p);decoded=[]
    for i in range(g.n_frames):g.seek(i);g.load();decoded.append((g.convert('RGB').tobytes(),g.info['duration']))
    di=0;remaining=decoded[0][1]
    for im,hold in zip(indexed,holds):
        check(im.convert('RGB').tobytes()==decoded[di][0],name+' decoded absolute-time pixels')
        check(hold<=remaining,name+' encoded frame duration')
        remaining-=hold
        if remaining==0:
            di+=1
            if di<len(decoded):remaining=decoded[di][1]
    check(di==len(decoded) and sum(x[1] for x in decoded)==sum(holds),name+' all frames total duration')
    savejson(name+'.timeline.json',meta)
    records.append(dict(path=rel(p),sha256=sha(p),bytes=p.stat().st_size,frames=len(decoded),durationMs=sum(holds),size=g.size,pixelTimingRoundTrip='PASS'))
    if name=='jiuweihu-basic-normal.gif':frames[1].save(OUT/'release-contact-preview.png')

make('jiuweihu-basic-normal.gif')
make('jiuweihu-basic-slow.gif',slow=3)
make('jiuweihu-basic-noFX.gif',fxon=False)
make('jiuweihu-basic-miss.gif',hit=False)
make('jiuweihu-basic-reduced.gif',reduced=True)
make('jiuweihu-basic-four-tier.gif',tiers=True)
make('jiuweihu-basic-vfx-only.gif',vfxonly=True)
make('jiuweihu-basic-multi-instance.gif',second=True)
# Isolated exact scene comparison proves miss has no target bloom, source remains.
a=world('F3');b=world('F3',hit=False);c=world('F3',fxon=False)
check(a.crop((510,60,650,200)).tobytes()!=b.crop((510,60,650,200)).tobytes(),'hit-only target bloom visible')
check(b.crop((510,60,650,200)).tobytes()==c.crop((510,60,650,200)).tobytes(),'miss exactly no target bloom')
check(b.crop((240,75,370,160)).tobytes()!=c.crop((240,75,370,160)).tobytes(),'miss still emits source foxfire')
check(world('F3',mirror=True).tobytes()==ImageOps.mirror(a).tobytes(),'complete action/FX left mirror exact')
check(world('F4').tobytes()==world('F4',fxon=False).tobytes(),'all first-cast FX expire before Idle')
board=Image.new('RGB',(1300,520))
for row,bg in enumerate(['#f2f0e7','#192633']):
    for i,n in enumerate(['IDLE','F3','F2','F1','F4']):
        tile=Image.new('RGBA',(260,260),bg);tile.alpha_composite(poses[n],(0,25))
        ImageDraw.Draw(tile).text((10,5),n,font=font(18),fill='#748595');board.paste(tile.convert('RGB'),(i*260,row*260))
board.save(OUT/'poses-light-dark-QA.png')
for p,h in immutable.items():check(sha(ROOT/p)==h,'immutable source unchanged '+p)
savejson('manifest.json',dict(status='F3 APPROVED; NEW POSES/VFX/GIF PLAYER REVIEW PENDING',generator='Built-in imagegen for new FX; existing imagegen poses reused',sourceSha256=immutable,poses=poseqa,effects=fxqa,outputs=records,logicalPoseOrder=['F3','F2','F1','F4'],poseHoldsMs=[140,90,90,140],resolveMs=0,canvas=CELL,ground=GROUND,anchorX=ANCHOR,limitations=['Art simulation, not Runtime, damage execution, mobile smoke or player acceptance','Uniform .115 source scale uses manually inspected body/ground landmarks; true renderer anatomy/anchor calibration remains Runtime gate','Tier panels use identical Basic art intentionally; stats/range/cadence differ in gameplay','Reduced version keeps static release cue briefly, then static approved Idle; no breathing loop','Raw alpha=1 pixels preserved in full padded masters; small lossless PNG derivatives use documented Lanczos resampling'],selfReview='Native single worker; no independent reviewer'))
savejson('qa.json',dict(status='PASS',checks=len(CHECKS),details=CHECKS,decodedGifFrames=sum(x['frames'] for x in records),approvedF3Unchanged=True,productUntouched=True))
print(json.dumps(dict(checks=len(CHECKS),gifs=records),indent=2))
