"""Reproducible art preview; no game execution or approved-master edits.
Run from any directory. Pillow is the only dependency.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
import json, hashlib

OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[5]
R = Image.Resampling.LANCZOS
SIZE = (780, 460)
CELL = (320, 260)
SCALE = .13
CHEST = (158, 110)
PLACEMENT = (80, 60)
TARGET = (610, 168)
F3_SHA = '503eec8bb7f959aa26b07a8076eeb8f686f4d4698bead83b28ed8392d109e4d5'

def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def rel(p): return str(p.relative_to(ROOT))
def font(n): return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', n)
def read(p):
    im = Image.open(p); im.load()
    assert im.mode == 'RGBA', p
    return im
def save_json(name, data):
    (OUT/name).write_text(json.dumps(data, ensure_ascii=False, indent=2)+'\n')
def bounds(im): return im.getchannel('A').getbbox()
def margins(im):
    b=bounds(im); return [b[0], b[1], im.width-b[2], im.height-b[3]]

receipt=ROOT/'docs/art/approved/chiru/basic/f3-v2/acceptance.json'
acceptance=json.loads(receipt.read_text())
assert acceptance['sha256']==F3_SHA
sources={n: OUT/'originals'/f'{n}.png' for n in ['F1','F2','F4']}
sources['F3']=ROOT/acceptance['source']
assert sha(sources['F3'])==F3_SHA
# Manually inspected chest diamonds, eye centers, hover-tail support and orb centers.
# Scale is common for all four full canvases, never fitted to total alpha height.
landmarks={
    'F1': dict(chest=(732,527), eye=(682,321), support=(848,1180), orb=(957,490)),
    'F2': dict(chest=(761,520), eye=(700,326), support=(859,1180), orb=(941,480)),
    'F3': dict(chest=(720,525), eye=(677,326), support=(840,1175), orb=(1090,510)),
    'F4': dict(chest=(736,523), eye=(693,324), support=(850,1177), orb=(955,484)),
}
poses={}; orbs={}; pose_qa=[]; immutable={rel(receipt):sha(receipt)}
for name in ['F1','F2','F3','F4']:
    p=sources[name]; im=read(p); immutable[rel(p)]=sha(p)
    resized=im.resize(tuple(round(n*SCALE) for n in im.size),R)
    cx,cy=landmarks[name]['chest']; xy=(CHEST[0]-round(cx*SCALE),CHEST[1]-round(cy*SCALE))
    assert xy[0]>=0 and xy[1]>=0 and xy[0]+resized.width<=CELL[0] and xy[1]+resized.height<=CELL[1]
    cell=Image.new('RGBA',CELL); cell.paste(resized,xy)
    assert cell.crop((*xy,xy[0]+resized.width,xy[1]+resized.height)).tobytes()==resized.tobytes()
    assert min(margins(cell))>=24
    assert ImageOps.mirror(ImageOps.mirror(cell)).tobytes()==cell.tobytes()
    cell.save(OUT/f'{name}-safe-cell.png'); poses[name]=cell
    ox,oy=landmarks[name]['orb']; orbs[name]=(PLACEMENT[0]+xy[0]+round(ox*SCALE),PLACEMENT[1]+xy[1]+round(oy*SCALE))
    pose_qa.append(dict(frame=name,source=rel(p),sha256=sha(p),sourceSize=im.size,scale=SCALE,
        landmarks=landmarks[name],translation=xy,alphaBounds=bounds(cell),margins=margins(cell),
        resizedRGBARoundTrip=True,mirrorRoundTrip=True,orbWorld=orbs[name]))
strip=Image.new('RGBA',(CELL[0]*4,CELL[1]))
for i,n in enumerate(['F1','F2','F3','F4']):
    strip.paste(poses[n],(i*CELL[0],0))
    assert strip.crop((i*CELL[0],0,(i+1)*CELL[0],CELL[1])).tobytes()==poses[n].tobytes()
strip.save(OUT/'four-equal-cells.png')
idlepath=ROOT/'public/assets/characters/chiru/battleIdle.png'; idle=read(idlepath)
immutable[rel(idlepath)]=sha(idlepath)
idlecell=Image.new('RGBA',CELL)
# Existing 160px Idle remains a static return, at its existing pixel scale.
idlecell.paste(idle,(CHEST[0]-83,CHEST[1]-70))
idlecell.save(OUT/'approved-idle-return-cell.png')
fx={}; fxqa=[]
for name,display_width in [('charge',64),('arrow',310),('impact',110)]:
    p=OUT/'originals'/f'{name}.png'; im=read(p); immutable[rel(p)]=sha(p)
    pad=64; padded=Image.new('RGBA',(im.width+pad*2,im.height+pad*2)); padded.paste(im,(pad,pad))
    assert padded.crop((pad,pad,pad+im.width,pad+im.height)).tobytes()==im.tobytes()
    scale=display_width/im.width
    display=padded.resize((round(padded.width*scale),round(padded.height*scale)),R)
    display.save(OUT/f'{name}-display.png'); fx[name]=display
    fxqa.append(dict(name=name,source=rel(p),sha256=sha(p),sourceSize=im.size,
        originalAlpha=bounds(im),padding=pad,sourceRGBARoundTrip=True,displayScale=scale,displaySize=display.size))

def put(dst,im,center,opacity=1):
    im=im.copy()
    if opacity!=1: im.putalpha(im.getchannel('A').point(lambda a:round(a*opacity)))
    xy=(round(center[0]-im.width/2),round(center[1]-im.height/2))
    assert xy[0]>=0 and xy[1]>=0 and xy[0]+im.width<=dst.width and xy[1]+im.height<=dst.height,(xy,im.size)
    dst.alpha_composite(im,xy)

def stage(phase,effects=True,hit=True,mirror=False,reduced=False,fade=1):
    world=Image.new('RGBA',(780,320))
    if hit:
        d=ImageDraw.Draw(world); x,y=TARGET
        d.line((x-12,y,x+12,y),fill='#9cb4bc',width=2); d.line((x,y-18,x,y+18),fill='#9cb4bc',width=2)
    actor=poses.get(phase,idlecell)
    world.alpha_composite(actor,PLACEMENT)
    if effects:
        if phase in ['F1','F2']:
            put(world,fx['charge'],orbs[phase],.45 if phase=='F1' else .85)
        if phase=='F3':
            # Static instantaneous flash at resolve, not a travelling slow projectile.
            ox,oy=orbs['F3']; put(world,fx['arrow'],((ox+TARGET[0])/2,oy),fade*(.65 if reduced else 1))
            if hit:
                # Authored impact center is offset in the source, so its star center meets target.
                put(world,fx['impact'],(TARGET[0]+10,TARGET[1]-12),fade*(.65 if reduced else 1))
    if mirror:world=ImageOps.mirror(world)
    return world

# Cast starts after a review-only Idle hold. All action offsets are exact centiseconds.
timeline=[('IDLE',500,1),('F1',120,1),('F2',60,1),('F3',40,1),('F3',40,.65),('F3',20,.25),('F4',120,1),('IDLE',650,1)]
records=[]
def make(name,effects=True,hit=True,reduced=False,slow=1):
    frames=[]; holds=[]; meta=[]
    for mirror in [False,True]:
        time=0
        for phase,ms,fade in timeline:
            world=stage(phase,effects,hit,mirror,reduced,fade)
            scene=Image.new('RGBA',SIZE,'#192633'); scene.alpha_composite(world,(0,25))
            d=ImageDraw.Draw(scene)
            d.text((16,10),'CHIRU BASIC / WATER ARROW',font=font(18),fill='white')
            d.text((16,350),('LEFT MIRROR' if mirror else 'RIGHT CANONICAL')+' | '+phase+(' | MISS' if not hit else ''),font=font(16),fill='#6fdfef')
            d.text((16,379),'400ms ACTION / RESOLVE AT 180ms / '+('NO FX' if not effects else 'REDUCED' if reduced else 'ACTION + VFX'),font=font(15),fill='white')
            # Half-scale review panel; does not establish actual runtime phone scale.
            small=world.resize((390,160),R)
            scene.alpha_composite(small,(380,285))
            d.text((16,428),'ART PREVIEW / not game footage or damage verification',font=font(14),fill='#a4b5c5')
            frames.append(scene.convert('RGB'))
            duration=ms*slow if phase!='IDLE' else ms
            holds.append(duration);meta.append(dict(mirror=mirror,phase=phase,logicalStartMs=time,logicalHoldMs=ms,playbackHoldMs=duration))
            time+=ms
    sample=Image.new('RGB',(390,230*len(frames)))
    for i,im in enumerate(frames):sample.paste(im.resize((390,230),R),(0,i*230))
    palette=sample.quantize(colors=256,method=Image.Quantize.MEDIANCUT)
    indexed=[im.quantize(palette=palette,dither=Image.Dither.NONE) for im in frames]
    p=OUT/name;indexed[0].save(p,save_all=True,append_images=indexed[1:],duration=holds,loop=0,disposal=2,optimize=False)
    g=Image.open(p);decoded=[]
    for i in range(g.n_frames):g.seek(i);g.load();decoded.append((g.convert('RGB').tobytes(),g.info['duration']))
    di=0;remain=decoded[0][1]
    for im,hold in zip(indexed,holds):
        assert im.convert('RGB').tobytes()==decoded[di][0]
        assert hold<=remain;remain-=hold
        if remain==0:
            di+=1
            if di<len(decoded):remain=decoded[di][1]
    assert di==len(decoded) and sum(d for _,d in decoded)==sum(holds)
    save_json(name+'.timeline.json',meta)
    records.append(dict(path=rel(p),sha256=sha(p),bytes=p.stat().st_size,decodedFrames=len(decoded),durationMs=sum(holds),pixelAndTimingRoundTrip='PASS'))
    if name=='chiru-basic-normal.gif':
        frames[3].save(OUT/'contact-preview.png')

make('chiru-basic-normal.gif')
make('chiru-basic-slow.gif',slow=3)
make('chiru-basic-noFX.gif',effects=False)
make('chiru-basic-miss.gif',hit=False)
make('chiru-basic-reduced.gif',reduced=True)
board=Image.new('RGB',(1600,640))
for row,bg in enumerate(['#f2f0e7','#192633']):
    for i,name in enumerate(['IDLE','F1','F2','F3','F4']):
        tile=Image.new('RGBA',(320,320),bg); tile.alpha_composite(poses.get(name,idlecell),(0,30))
        ImageDraw.Draw(tile).text((12,10),name,font=font(18),fill='#748595')
        board.paste(tile.convert('RGB'),(320*i,320*row))
board.save(OUT/'poses-light-dark-QA.png')
for p,h in immutable.items():assert sha(ROOT/p)==h,p
save_json('manifest.json',dict(status='BASIC F3 APPROVED; OTHER POSES / VFX / GIF PLAYER REVIEW PENDING',
    purpose='Art reconstruction only; no runtime gameplay or phone acceptance claimed.',
    sourceSha256=immutable,poses=pose_qa,effects=fxqa,outputs=records,
    actionMs=[120,60,100,120],resolveMs=180,approvedMasterUnchanged=True,
    limitations=['Visual landmarks are author-inspected, not runtime anchor validation','New F1/F2/F4 and VFX/GIF require player approval','New sources use generated cyan glow around flat water shapes; player style approval pending']))
print(json.dumps(records,indent=2))
