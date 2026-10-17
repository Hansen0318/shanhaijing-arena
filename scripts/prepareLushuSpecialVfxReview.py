"""Deterministic VFX candidate study, NOT the missing approved four-pose animation.
Preserves masters; padding, compositing and finite preview transforms only.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
import hashlib, json, math
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'docs/art/candidates/lushu/special/vfx-review-v1'
F3=ROOT/'docs/art/candidates/lushu/special/F3-contact-v2.png'
EXPECTED='0608897035880af59bfb86940f5510f82f5354bef725fca1d9268a821eaf7ba1'
assert hashlib.sha256(F3.read_bytes()).hexdigest()==EXPECTED
R=Image.Resampling.LANCZOS
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
def font(n): return ImageFont.truetype(FONT,n)
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def read(p):
    im=Image.open(p);im.load();assert im.mode=='RGBA',p
    return im
records=[]
for stem in ['source-sweep','target-impact']:
    p=OUT/f'{stem}-raw-v1.png';im=read(p);a=im.getchannel('A')
    bbox=a.getbbox();core=a.point(lambda v:255 if v>=128 else 0).getbbox()
    assert core and min(core[0],core[1],im.width-core[2],im.height-core[3])>0,'Opaque effect clipped'
    # Transparent padding preserves every input pixel, including near-invisible edge fringe.
    pad=128;safe=Image.new('RGBA',(im.width+2*pad,im.height+2*pad));safe.paste(im,(pad,pad))
    dest=OUT/f'{stem}-padded-v1.png';safe.save(dest)
    assert safe.crop((pad,pad,pad+im.width,pad+im.height)).tobytes()==im.tobytes()
    b=safe.getchannel('A').getbbox();m=[b[0],b[1],safe.width-b[2],safe.height-b[3]]
    assert min(m)>=pad
    records.append({'source':str(p.relative_to(ROOT)),'sha256':digest(p),'bytes':p.stat().st_size,'dimensions':im.size,'alphaExtrema':a.getextrema(),'alphaBounds':bbox,'opaqueCoreBounds':core,'derivative':str(dest.relative_to(ROOT)),'derivativeSHA256':digest(dest),'padding':pad,'safeMargins':m,'exactOriginalPixelsPreserved':True})
sweep=read(OUT/'source-sweep-padded-v1.png');impact=read(OUT/'target-impact-padded-v1.png')
actor=read(F3);actor=actor.crop(actor.getchannel('A').getbbox());actor=actor.resize((round(actor.width*170/actor.height),170),R)
def fitted(im,wh):
    im=im.crop(im.getchannel('A').getbbox());return im.resize(wh,R)
sweep=fitted(sweep,(480,400));impact=fitted(impact,(500,350))
def put(dst,im,center,opacity=1):
    im=im.copy()
    if opacity<1: im.putalpha(im.getchannel('A').point(lambda x:round(x*opacity)))
    xy=(round(center[0]-im.width/2),round(center[1]-im.height/2))
    assert xy[0]>=0 and xy[1]>=0 and xy[0]+im.width<=dst.width and xy[1]+im.height<=dst.height
    dst.alpha_composite(im,xy)
def fx_at(base,t,kind,center):
    # One appearance/peak/decay per loop. No particles imply extra damage events.
    if kind=='sweep':
        if not 180<=t<600:return
        u=(t-180)/420;scale=.70+.30*min(1,u*3);opacity=min(1,u*5)*min(1,(1-u)*3)
        im=sweep.resize((round(sweep.width*scale),round(sweep.height*scale)),R)
    else:
        if not 420<=t<840:return
        u=(t-420)/420;scale=.55+.45*min(1,u*3);opacity=min(1,u*10+.3)*min(1,(1-u)*2.5)
        im=impact.resize((round(impact.width*scale),round(impact.height*scale)),R)
    put(base,im,center,opacity)
def panel(t,mode,mirror=False):
    p=Image.new('RGBA',(640,440),'#172533')
    if mode=='source':fx_at(p,t,'sweep',(320,220))
    if mode=='impact':fx_at(p,t,'impact',(320,220))
    if mode=='composite':
        fx_at(p,t,'sweep',(280,220))
        put(p,actor,(150,260)) # Approved F3 HELD STATIC, no invented F1/F2/F4.
        fx_at(p,t,'impact',(355,235))
    if mirror:p=ImageOps.mirror(p)
    return p
frames=[]
for t in range(0,1440,60):
    frame=Image.new('RGB',(1920,1040),'#101922');draw=ImageDraw.Draw(frame)
    draw.text((24,12),'SPECIAL VFX CANDIDATE v1 | independent layers / F3 static study',font=font(25),fill='white')
    for col,(mode,title) in enumerate([('source','SOURCE / ROTATIONAL RELEASE'),('impact','TARGET / ONE CONTACT BURST'),('composite','COMPOSITE / F3 HELD STATIC')]):
        x=640*col;draw.text((x+18,54),title,font=font(19),fill='#efcf81')
        frame.paste(panel(t,mode).convert('RGB'),(x,86))
        frame.paste(panel(t,mode,True).convert('RGB'),(x,550))
    draw.text((24,1000),'Right + mirrored | preview timing only | no gameplay, HP sync or four-pose animation claim',font=font(21),fill='#c3d0dd')
    frames.append(frame)
# One shared palette avoids frame-to-frame color instability.
palette_sheet=Image.new('RGB',(780,520*len(frames)))
for i,frame in enumerate(frames):palette_sheet.paste(frame.resize((780,520),R),(0,520*i))
palette=palette_sheet.quantize(colors=256,method=Image.Quantize.MEDIANCUT)
indexed=[f.quantize(palette=palette,dither=Image.Dither.NONE) for f in frames]
for name,ms in [('special-vfx-study-normal-v1.gif',60),('special-vfx-study-slow-v1.gif',120)]:
    dest=OUT/name;indexed[0].save(dest,save_all=True,append_images=indexed[1:],duration=ms,loop=0,disposal=2,optimize=False)
    gif=Image.open(dest);duration=0;expected_index=0
    # Pillow coalesces consecutive identical frames; verify their full held timeline.
    for i in range(gif.n_frames):
        gif.seek(i);gif.load();hold=gif.info['duration'];duration+=hold
        assert hold%ms==0
        for _ in range(hold//ms):
            assert gif.convert('RGB').tobytes()==indexed[expected_index].convert('RGB').tobytes()
            expected_index+=1
    assert expected_index==len(indexed) and duration==len(indexed)*ms
    records.append({'file':str(dest.relative_to(ROOT)),'sha256':digest(dest),'frames':gif.n_frames,'durationMs':duration,'decodedPixelsRoundTrip':'PASS','status':'UNAPPROVED VFX STUDY; F3 STATIC, NOT FOUR-POSE ANIMATION'})
frames[9].save(OUT/'special-vfx-study-peak-v1.png')
# Actual alpha proof, not an RGB thumbnail of transparent pixels.
board=Image.new('RGB',(1280,760),'white');d=ImageDraw.Draw(board)
for row,stem in enumerate(['source-sweep','target-impact']):
    im=read(OUT/f'{stem}-padded-v1.png');im.thumbnail((600,325),R)
    for col,color in enumerate(['#ffffff','#172533']):
        tile=Image.new('RGBA',(640,380),color);put(tile,im,(320,205));board.paste(tile.convert('RGB'),(col*640,row*380));ImageDraw.Draw(board).text((col*640+16,row*380+12),stem+' / true alpha',font=font(20),fill='#778899')
board.save(OUT/'alpha-white-dark-v1.png')

# Candidate footprint comparison only; no claim these are installed descriptors.
comparison=Image.new('RGB',(1280,1000),'#172533');draw=ImageDraw.Draw(comparison)
draw.text((24,12),'Heavy accepted effect vs Special CANDIDATE / shared pixel scale',font=font(24),fill='white')
heavy_dir=ROOT/'docs/art/candidates/lushu/heavy/recovered-review-v1'
for row,(name,old,new,title) in enumerate([('wind-sweep-raw-v1.png',(345,345),sweep,'SOURCE'),('impact-raw-v1.png',(368,245),impact,'CONTACT')]):
    for col,(im,label) in enumerate([(fitted(read(heavy_dir/name),old),'HEAVY accepted descriptor size (rounded)'),(new,'SPECIAL proposed preview size only')]):
        tile=Image.new('RGBA',(640,440),'#172533');put(tile,im,(320,230));comparison.paste(tile.convert('RGB'),(col*640,60+row*460))
        draw.text((col*640+18,65+row*460),title+' / '+label,font=font(18),fill='#efcf81')
comparison.save(OUT/'heavy-special-effects-comparison-v1.png')

meta={'status':'UNAPPROVED INDEPENDENT VFX CANDIDATES / FULL POSE GIF BLOCKED BY MISSING SOURCES','approvedF3SHA256':EXPECTED,'scope':'Generated separate effects plus deterministic exact-source padding and FX-only/static-F3 study. No character pose generation. Preview timing is not a combat timing decision.','previewLayout':{'source':[480,400],'contact':[500,350],'actorVisibleHeight':170,'contactOnsetMs':420,'loopMs':1440},'limitations':['Missing exact approved F1/F2/F4. Held F3 is clearly labeled, not an attack animation.','No real target or HP simulation. The contact panel illustrates a confirmed-hit visual only.','No phone-scale acceptance or runtime synchronization evidence.','Final Special>Heavy comparison with approved full motion/runtime remains pending.'],'records':records}
(OUT/'review-manifest.json').write_text(json.dumps(meta,indent=2)+'\n')
files=sorted(p for p in OUT.iterdir() if p.is_file() and p.name!='SHA256SUMS.json')
(OUT/'SHA256SUMS.json').write_text(json.dumps({p.name:digest(p) for p in files},indent=2)+'\n')
assert digest(F3)==EXPECTED
print(json.dumps({'sources':records[:2],'GIFs':records[2:],'F3Unchanged':True},indent=2))
