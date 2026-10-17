"""Source-preserving Special review packaging, never runtime/gameplay integration."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
import hashlib
import json

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'docs/art/approved/lushu/special/recovered-inputs-v1'
OUT = ROOT / 'docs/art/candidates/lushu/special/review-v2'
FX = ROOT / 'docs/art/candidates/lushu/special/vfx-review-v1'
R = Image.Resampling.LANCZOS
CELL = (640, 480)
GROUND = 420
SUPPORT = 240
BASE_SCALE = .22
# Same skull-width normalization policy for different source pixel densities.
# Reference boxes exclude antlers, mane, ears and weapon. No silhouette-height fit.
CONFIG = [
    ('F1', 'd4e77f82fce5cca42b46a52fbac8d03180c78a8b44efb3b4a48335543f6702b3', 550, 167, (761,154,928,345)),
    ('F2', 'ba8eed4a287599726ed977daf187f64746ff407d10d4921404ed1d999a1122c2', 600, 199, (570,183,769,353)),
    ('F3', '0608897035880af59bfb86940f5510f82f5354bef725fca1d9268a821eaf7ba1', 550, 175, (560,157,735,300)),
    ('F4', '98d4b4a6b716000e8faf4398972adf7f874e1ea1129a22e3d80921800078c27c', 435, 204, (635,205,839,399)),
]
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
def font(n): return ImageFont.truetype(FONT, n)
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def read(p):
    im = Image.open(p); im.load(); assert im.mode == 'RGBA', p
    return im
def core(im): return im.getchannel('A').point(lambda a:255 if a>=128 else 0).getbbox()
def margins(im):
    b = im.getchannel('A').getbbox()
    return [b[0], b[1], im.width-b[2], im.height-b[3]]
OUT.mkdir(parents=True, exist_ok=True)
poses, records = [], []
for name, expected, support_x, skull_width, box in CONFIG:
    path = SRC / (name+'.png'); assert sha(path) == expected
    source = read(path); foot_y = core(source)[3]
    scale = BASE_SCALE*175/skull_width
    size = tuple(round(v*scale) for v in source.size)
    xy = (round(SUPPORT-support_x*scale), GROUND-round(foot_y*scale))
    assert min(xy)>=0 and xy[0]+size[0]<=CELL[0] and xy[1]+size[1]<=CELL[1]
    resized = source.resize(size,R)
    cell = Image.new('RGBA',CELL); cell.paste(resized,xy)
    # No alpha mask in paste: retain RGB/alpha exactly, including invisible fringe.
    assert cell.crop((xy[0],xy[1],xy[0]+size[0],xy[1]+size[1])).tobytes()==resized.tobytes()
    assert min(margins(cell))>=24
    p = OUT/(name+'-cell.png'); cell.save(p); poses.append(cell)
    records.append(dict(frame=name,source=str(path.relative_to(ROOT)),sha256=expected,
                        dimensions=source.size,sourceAlphaBounds=source.getchannel('A').getbbox(),
                        sourceCoreBounds=core(source),sourceFoot=foot_y,supportX=support_x,
                        skullReferenceBox=box,skullWidth=skull_width,sourceDensityFactor=175/skull_width,
                        commonAuthoredScale=BASE_SCALE,effectiveUniformXYScale=scale,
                        resize=size,translation=xy,alphaMargins=margins(cell),
                        transformedPixelsPreserved=True,sourcePixelsDeleted=0))
strip=Image.new('RGBA',(CELL[0]*4,CELL[1]))
for i,cell in enumerate(poses): strip.paste(cell,(CELL[0]*i,0))
strip.save(OUT/'lushu-special-four-pose-safe-v2.png')
decoded=read(OUT/'lushu-special-four-pose-safe-v2.png')
for i,cell in enumerate(poses): assert decoded.crop((CELL[0]*i,0,CELL[0]*(i+1),CELL[1])).tobytes()==cell.tobytes()
# Original approved runtime Idle F1; explicit separate reference-scale match.
idle_src=read(ROOT/'public/assets/characters/lushu/battleIdle-4f.png').crop((0,0,96,128))
idle_scale=2.25; idle=Image.new('RGBA',CELL)
idle.paste(idle_src.resize((216,288),R),(SUPPORT-108,GROUND-round(125*idle_scale)))
idle.save(OUT/'approved-idle-return-cell.png')

# Light/dark review: every cell in order, exact padded transforms, no regenerated art.
board=Image.new('RGB',(1280,560),'white')
for row,color in enumerate(['#ffffff','#172533']):
    for i,cell in enumerate(poses):
        tile=Image.alpha_composite(Image.new('RGBA',CELL,color),cell).resize((320,240),R)
        board.paste(tile.convert('RGB'),(i*320,40+row*260))
        ImageDraw.Draw(board).text((i*320+12,12+row*260),CONFIG[i][0],font=font(20),fill='#8291a2')
board.save(OUT/'four-pose-alpha-order-v2.png')

def fit(im,size):
    return im.crop(im.getchannel('A').getbbox()).resize(size,R)
sweep=fit(read(FX/'source-sweep-padded-v1.png'),(480,400))
impact=fit(read(FX/'target-impact-padded-v1.png'),(500,350))
SCENE=(960,600)
# Put the normalized 640x480 actor cell into the review stage without scaling.
ACTOR_XY=(100,100)
def put(dst,im,center,opacity=1):
    patch=im.copy()
    if opacity<1: patch.putalpha(patch.getchannel('A').point(lambda a:round(a*opacity)))
    xy=(round(center[0]-patch.width/2),round(center[1]-patch.height/2))
    assert xy[0]>=0 and xy[1]>=0 and xy[0]+patch.width<=dst.width and xy[1]+patch.height<=dst.height
    dst.alpha_composite(patch,xy)
def phase(t):
    if t<400 or t>=1160:return idle,'IDLE'
    if t<600:return poses[0],'F1 / LOAD'
    if t<720:return poses[1],'F2 / KNEE'
    if t<920:return poses[2],'F3 / CONTACT'
    return poses[3],'F4 / RECOVER'
def source_fx(t):
    if not 600<=t<1000:return None,0
    u=(t-600)/400; scale=.78+.22*min(1,u*2.5)
    a=1 if u<=.65 else (1-u)/.35
    return sweep.resize((round(480*scale),round(400*scale)),R),a
def contact_fx(t):
    if not 720<=t<1080:return None,0
    u=(t-720)/360; scale=.72+.28*min(1,u*3)
    a=1 if u<=.50 else (1-u)*2
    return impact.resize((round(500*scale),round(350*scale)),R),a
def render(t,mirror,with_fx):
    scene=Image.new('RGBA',SCENE,'#172533');actor,label=phase(t)
    if with_fx:
        fx,a=source_fx(t)
        if fx:put(scene,fx,(430,320),a)
    scene.alpha_composite(actor,ACTOR_XY)
    if with_fx:
        fx,a=contact_fx(t)
        # Core at ~34% width, aligned with the extended hoof near x547.
        if fx:put(scene,fx,(625,335),a)
    if mirror:scene=ImageOps.mirror(scene)
    draw=ImageDraw.Draw(scene)
    draw.text((22,16),'SPECIAL / FOUR POSES + VFX' if with_fx else 'SPECIAL / CHARACTER ONLY',font=font(25),fill='white')
    draw.text((22,54),('LEFT' if mirror else 'RIGHT')+' | '+label,font=font(21),fill='#efcf81')
    draw.text((22,562),'Review timing only | source -> one impact -> recovery -> approved Idle',font=font(20),fill='#c3d0dd')
    return scene.convert('RGB')
times=list(range(0,1720,40));timing={'idleBefore':400,'F1':200,'F2':120,'F3':200,'F4':240,'idleAfter':560,'contactAt':720,'cycle':1720}
results=[]
for with_fx,stem in [(True,'lushu-special-composite-v2'),(False,'lushu-special-character-only-v2')]:
    frames=[render(t,mirror,with_fx) for mirror in [False,True] for t in times]
    sample=Image.new('RGB',(480,300*len(frames)))
    for i,frame in enumerate(frames):sample.paste(frame.resize((480,300),R),(0,i*300))
    palette=sample.quantize(colors=256,method=Image.Quantize.MEDIANCUT)
    indexed=[f.quantize(palette=palette,dither=Image.Dither.NONE) for f in frames]
    variants=[('normal',40),('slow',80)] if with_fx else [('normal',40)]
    for suffix,ms in variants:
        p=OUT/(stem+'-'+suffix+'.gif')
        indexed[0].save(p,save_all=True,append_images=indexed[1:],duration=ms,loop=0,disposal=2,optimize=False)
        gif=Image.open(p);expected=0;duration=0
        for i in range(gif.n_frames):
            gif.seek(i);gif.load();hold=gif.info['duration'];assert hold%ms==0;duration+=hold
            for _ in range(hold//ms):
                assert gif.convert('RGB').tobytes()==indexed[expected].convert('RGB').tobytes();expected+=1
        assert expected==len(indexed) and duration==len(indexed)*ms
        results.append(dict(file=p.name,sha256=sha(p),bytes=p.stat().st_size,encodedFrames=gif.n_frames,
                            timelineSamples=expected,durationMs=duration,pixelTimelineRoundTrip='PASS'))
render(760,False,True).save(OUT/'contact-composite-v2.png')
# Sample phases for visual QA, including actual Idle at both ends.
qa=Image.new('RGB',(1920,900),'#101922')
for i,t in enumerate([0,440,640,760,960,1280]):qa.paste(render(t,False,True).resize((640,300),R),((i%3)*640,(i//3)*450))
qa.save(OUT/'sequence-contact-sheet-v2.png')
manifest=dict(status='COMPOSITE GIF PLAYER REVIEW PENDING / NO RUNTIME INTEGRATION',
              inputs=records,cell=CELL,ground=GROUND,supportX=SUPPORT,
              normalization='Single skull-width source-density policy, then common .22 XY scale. No per-silhouette height fit.',
              idleSource='public/assets/characters/lushu/battleIdle-4f.png F1',idleScale=idle_scale,
              previewTimingMs=timing,previewTimingDoesNotAuthorizeCombatDelay=True,
              order=['Idle','F1','F2','F3','F4','Idle'],directions=['right','left mirror'],
              vfxSources=[{'path':str((FX/n).relative_to(ROOT)),'sha256':sha(FX/n)} for n in ['source-sweep-raw-v1.png','target-impact-raw-v1.png']],
              sourceWindowMs=[600,1000],contactWindowMs=[720,1080],
              sourcePeakSize=[480,400],contactPeakSize=[500,350],gifs=results,
              limits=['Review animation, not recorded gameplay.','Special simulation hit remains 0ms; preview hit is 320ms after action start.','Effects/GIF not player-approved until explicit confirmation.','No runtime texture budget, build, deploy or phone acceptance claim.'])
(OUT/'review-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
files=sorted(p for p in OUT.iterdir() if p.is_file() and p.name!='SHA256SUMS.json')
(OUT/'SHA256SUMS.json').write_text(json.dumps({p.name:sha(p) for p in files},indent=2)+'\n')
for name,expected,*_ in CONFIG:assert sha(SRC/(name+'.png'))==expected
print(json.dumps({'sourcesUnchanged':True,'safeMargins':[r['alphaMargins'] for r in records],'gifs':results},indent=2))
