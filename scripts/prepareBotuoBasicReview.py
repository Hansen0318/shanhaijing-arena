"""Deterministic candidate GIFs only; masters, runtime and gameplay stay untouched."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
import hashlib, json

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT/'docs/art/candidates/botuo/basic/composite-review-v1'
POSE = ROOT/'docs/art/candidates/botuo/basic/phase-poses-v1'
R = Image.Resampling.LANCZOS
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
def font(n): return ImageFont.truetype(FONT, n)
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def read(p):
    im = Image.open(p).convert('RGBA'); im.load(); return im
def bounds(im, threshold=64): return im.getchannel('A').point(lambda a: 255 if a>threshold else 0).getbbox()

# Explicit author-selected facial skull boxes, excluding horns, mane and ears.
# Used only to equalize source density, never fit a crouched silhouette to Idle height.
CONFIG = [
 ('F1',POSE/'F1-anticipation-master.png','f3d52aa3b85557aa0fd88e02b6c1948ac0ff4618909ef07ef0472f983f7ecd54',(870,170,1015,340),450),
 ('F2',POSE/'F2-release-master-v2.png','224d185e8678850708fd4a045e515cee0e587e4aec9ebb9e8c1d2c702c492341',(1160,330,1305,495),420),
 ('F3',ROOT/'docs/art/candidates/botuo/basic/key-pose-v1/F3-contact-master.png','19a8e9f8cf74c870558a4ea734b67e03d5eacce71072c5bc979931cf00f42f36',(1035,445,1170,590),450),
 ('F4',POSE/'F4-recovery-master.png','de4126fe9f357a63b8b1b444c0e69a986feed10b09c50771c5816ceda18e9b66',(850,205,960,355),460),
]
CELL = (400,320)
GROUND = 274
SUPPORT = 135
SKULL = 20
poses=[]; records=[]
landmarks=Image.new('RGB',(1200,700),'#283240')
ld=ImageDraw.Draw(landmarks)
for idx,(name,p,expected,box,support_x) in enumerate(CONFIG):
    assert sha(p)==expected
    im=read(p); core=bounds(im)
    width=box[2]-box[0]; skull_height=box[3]-box[1]; scale=SKULL/skull_height
    size=tuple(round(v*scale) for v in im.size)
    xy=(round(SUPPORT-support_x*scale),GROUND-round(core[3]*scale))
    assert min(xy)>=20 and xy[0]+size[0]<=CELL[0]-20 and xy[1]+size[1]<=CELL[1]-20,(name,xy,size)
    resized=im.resize(size,R)
    cell=Image.new('RGBA',CELL);cell.paste(resized,xy)
    assert cell.crop((xy[0],xy[1],xy[0]+size[0],xy[1]+size[1])).tobytes()==resized.tobytes()
    b=cell.getchannel('A').getbbox();margin=[b[0],b[1],CELL[0]-b[2],CELL[1]-b[3]]
    assert min(margin)>=20
    cell.save(OUT/(name+'-safe-cell.png'));poses.append(cell)
    records.append(dict(frame=name,source=str(p.relative_to(ROOT)),sha256=expected,sourceSize=im.size,sourceCoreBounds=core,
                        skullBox=box,skullWidth=width,skullHeight=skull_height,targetSkullHeight=SKULL,uniformXYScale=scale,supportX=support_x,
                        translatedXY=xy,resizedSize=size,alphaMargins=margin,resizedPixelsPreserved=True,sourcePixelsDeleted=0))
    annotated=im.copy();ad=ImageDraw.Draw(annotated);ad.rectangle(box,outline='#00ffcc',width=8)
    thumb=annotated.resize((430,323),R)
    x=(idx%2)*600;y=(idx//2)*350
    landmarks.paste(Image.alpha_composite(Image.new('RGBA',thumb.size,'#e5e5e5'),thumb).convert('RGB'),(x,y+25))
    ld.text((x+8,y+5),name+' skull reference / author selected',font=font(15),fill='white')
landmarks.save(OUT/'skull-landmarks-QA.png')
strip=Image.new('RGBA',(CELL[0]*4,CELL[1]))
for i,cell in enumerate(poses):strip.paste(cell,(i*CELL[0],0))
strip.save(OUT/'botuo-basic-four-safe-cells.png')
for i,cell in enumerate(poses):assert read(OUT/'botuo-basic-four-safe-cells.png').crop((i*CELL[0],0,(i+1)*CELL[0],CELL[1])).tobytes()==cell.tobytes()

# Exact approved static Idle source, displayed at existing nominal144px canvas size.
idle_source=ROOT/'public/assets/runtime-packing-v1/botuo-battleIdle.png'
idle_raw=read(idle_source)
idle=Image.new('RGBA',CELL)
idle_scale=.9
idle_foot=bounds(idle_raw)[3]
idle_xy=(SUPPORT-72,GROUND-round(idle_foot*idle_scale))
idle.paste(idle_raw.resize((144,144),R),idle_xy);idle.save(OUT/'approved-idle-return-cell.png')

fx_records=[];effects=[]
for name,size in [('source-force-raw-v1.png',(180,134)),('target-impact-raw-v1.png',(142,126))]:
    p=OUT/name;im=read(p);a=im.getchannel('A');b=a.getbbox();assert b
    # Retain ALL source canvas pixels and their original alpha; no glow/key-color deletion.
    resized=im.resize(size,R);effects.append(resized)
    fx_records.append(dict(path=str(p.relative_to(ROOT)),sha256=sha(p),sourceSize=im.size,alphaBounds=b,
                           lowAlphaPixels=sum(a.histogram()[1:9]),reviewSize=size,policy='full-canvas resize, no source pixel deletion'))
sweep,impact=effects

SCENE=(640,340)
ACTOR=(115,0)
CONTACT=(ACTOR[0]+SUPPORT+112,GROUND-69)
def put(dst,im,center,opacity=1):
    patch=im.copy()
    if opacity<1:patch.putalpha(patch.getchannel('A').point(lambda a:round(a*opacity)))
    xy=(round(center[0]-patch.width/2),round(center[1]-patch.height/2))
    assert min(xy)>=0 and xy[0]+patch.width<=dst.width and xy[1]+patch.height<=dst.height
    dst.alpha_composite(patch,xy)
def phase(t):
    if t<400 or t>=960:return idle,'IDLE'
    if t<560:return poses[0],'F1 LOAD'
    if t<640:return poses[1],'F2 RELEASE'
    if t<800:return poses[2],'F3 CONTACT'
    return poses[3],'F4 RECOVER'
def render(t,mirror=False,with_fx=True,reduced=False):
    scene=Image.new('RGBA',SCENE,'#192633');actor,label=phase(t)
    draw=ImageDraw.Draw(scene)
    draw.line((50,GROUND,590,GROUND),fill='#526374',width=1)
    # Neutral schematic contact marker, not a game actor/HP or real hit simulation.
    draw.line((CONTACT[0],CONTACT[1]-28,CONTACT[0],CONTACT[1]+28),fill='#78899b',width=2)
    draw.line((CONTACT[0]-20,CONTACT[1],CONTACT[0]+20,CONTACT[1]),fill='#78899b',width=2)
    if with_fx and 560<=t<840:
        age=(t-560)/280;opacity=1 if age<.65 else (1-age)/.35
        scale=1 if reduced else .84+.16*min(1,age*3)
        fx=sweep.resize((round(sweep.width*scale),round(sweep.height*scale)),R)
        put(scene,fx,(CONTACT[0]-32,CONTACT[1]-9),opacity)
    scene.alpha_composite(actor,ACTOR)
    if with_fx and 640<=t<840:
        age=(t-640)/200;opacity=1 if age<.5 else (1-age)*2
        scale=1 if reduced else .8+.2*min(1,age*4)
        fx=impact.resize((round(impact.width*scale),round(impact.height*scale)),R)
        put(scene,fx,CONTACT,opacity)
    if mirror:scene=ImageOps.mirror(scene)
    draw=ImageDraw.Draw(scene)
    title='BASIC / '+('STATIC FX CUES' if reduced else 'ACTION + VFX' if with_fx else 'CHARACTER ONLY')
    draw.text((16,12),title,font=font(20),fill='white')
    draw.text((16,42),('LEFT' if mirror else 'RIGHT')+' | '+label,font=font(16),fill='#f0c56d')
    draw.text((16,301),'Candidate preview / not recorded gameplay or combat timing',font=font(14),fill='#b7c7d6')
    return scene.convert('RGB')

TIMES=list(range(0,1400,40))
results=[]
for stem,with_fx,reduced in [('botuo-basic-composite',True,False),('botuo-basic-character-only',False,False),('botuo-basic-reduced-cues',True,True)]:
    frames=[render(t,mirror,with_fx,reduced) for mirror in [False,True] for t in TIMES]
    # Shared palette across the full timeline, no GIF alpha/disposal residue.
    sample=Image.new('RGB',(320,170*len(frames)))
    for i,f in enumerate(frames):sample.paste(f.resize((320,170),R),(0,170*i))
    palette=sample.quantize(colors=256,method=Image.Quantize.MEDIANCUT)
    indexed=[f.quantize(palette=palette,dither=Image.Dither.NONE) for f in frames]
    for suffix,hold in ([('normal',40),('slow',120)] if not reduced else [('normal',40)]):
        p=OUT/(stem+'-'+suffix+'.gif')
        indexed[0].save(p,save_all=True,append_images=indexed[1:],duration=hold,loop=0,disposal=2,optimize=False)
        gif=Image.open(p);sample_index=0;duration=0;holds=[]
        for i in range(gif.n_frames):
            gif.seek(i);gif.load();h=gif.info['duration'];holds.append(h)
            assert h>=20 and h%hold==0
            duration+=h
            for _ in range(h//hold):
                assert gif.convert('RGB').tobytes()==indexed[sample_index].convert('RGB').tobytes()
                sample_index+=1
        assert sample_index==len(indexed) and duration==len(indexed)*hold
        results.append(dict(path=str(p.relative_to(ROOT)),sha256=sha(p),bytes=p.stat().st_size,frames=gif.n_frames,
                            samples=sample_index,totalMs=duration,minimumDecodedHoldMs=min(holds),pixelTimelineRoundTrip='PASS'))

qa=Image.new('RGB',(1280,1020),'#17212d')
for i,t in enumerate([0,440,600,680,820,1120]):qa.paste(render(t),((i%2)*640,(i//2)*340))
qa.save(OUT/'sequence-review.png')
render(680).save(OUT/'contact-review.png')
# Independent full-source light/dark composites for actual alpha review.
fxqa=Image.new('RGB',(1000,520),'#777777')
for i,name in enumerate(['source-force-raw-v1.png','target-impact-raw-v1.png']):
    im=read(OUT/name);im.thumbnail((480,230))
    for j,bg in enumerate(['#eeeeee','#172533']):
        tile=Image.new('RGBA',(500,260),bg);tile.alpha_composite(im,((500-im.width)//2,(260-im.height)//2))
        fxqa.paste(tile.convert('RGB'),(j*500,i*260))
fxqa.save(OUT/'vfx-light-dark-QA.png')
manifest=dict(status='GIF/VFX CANDIDATE / PLAYER REVIEW PENDING',
              userAuthorization='2026-10-18T17:22:42+08:00 好接下來是做gif給我確認嗎，是的話就給我連結看',
              authorizationScope='Proceed with shown poses to composite GIF review; no fabricated standalone per-pose acceptance or runtime authority.',
              recoveredHead='dec02b2786b8d3829a5b4cb0b01350e62023a9bd',poses=records,cell=CELL,ground=GROUND,supportX=SUPPORT,
              normalization='Author-selected facial skull height to20px, matching approximately22px source Idle skull at0.9 display; uniform XY per source; full canvas retained, no silhouette-height fit. Height chosen because F4 face is more frontal/narrower.',
              idle=dict(path=str(idle_source.relative_to(ROOT)),sha256=sha(idle_source),scale=idle_scale,sourceVisibleFoot=idle_foot,previewXY=idle_xy,previewGroundOnly=True),vfx=fx_records,
              previewTimelineMs=dict(idleBefore=400,F1=160,F2=80,F3=160,F4=160,idleAfter=440,contact=640,cycle=1400),
              sourceWindow=[560,840],contactWindow=[640,840],directions=['right','left mirror'],slowFactor=3,gifs=results,
              limits=['Scripted visual preview, not real collision/damage/HP or game recording.',
                      'Current real P2 Basic windup remains0ms; preview contact is240ms after visual action start, not approved gameplay timing.',
                      'Pose/FX sizes and anchors are review candidates, not runtime descriptors or measured GPU budget.',
                      'Reduced cue preview only demonstrates static FX shapes, not an implemented reduced-motion mode.',
                      'No VFX/GIF/player device PASS or runtime/deployment claim.'])
(OUT/'review-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
for _,p,expected,_,_ in CONFIG:assert sha(p)==expected
files=sorted(p for p in OUT.iterdir() if p.is_file() and p.name!='SHA256SUMS.json')
(OUT/'SHA256SUMS.json').write_text(json.dumps({p.name:sha(p) for p in files},indent=2)+'\n')
print(json.dumps({'sourcesUnchanged':True,'gifs':results,'safeMargins':[r['alphaMargins'] for r in records]},indent=2))
