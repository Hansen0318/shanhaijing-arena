"""Deterministic derivatives of accepted art; originals remain immutable."""
from pathlib import Path
from PIL import Image
import hashlib,json
ROOT=Path(__file__).resolve().parents[1]
REVIEW=ROOT/'docs/art/candidates/lushu/special/review-v2'
OUT=ROOT/'public/assets/characters/lushu'
DEST=ROOT/'docs/art/candidates/lushu/special/runtime-v1'
DEST.mkdir(exist_ok=True)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
R=Image.Resampling.LANCZOS
accepted=json.loads((ROOT/'docs/art/approved/lushu/special/review-v2/acceptance.json').read_text())
for f in accepted['files']:assert sha(ROOT/f['path'])==f['sha256']
records=[]
def save(im,name):
 p=OUT/name;im.save(p);check=Image.open(p);check.load();assert check.tobytes()==im.tobytes()
 r=dict(path=str(p.relative_to(ROOT)),width=im.width,height=im.height,bytes=p.stat().st_size,sha256=sha(p),decodedBytes=im.width*im.height*4);records.append(r);return r
atlas=Image.new('RGBA',(320,80));bounds=[]
for i in range(4):
 source=Image.open(REVIEW/f'F{i+1}-cell.png').convert('RGBA');b=source.getchannel('A').getbbox()
 rect=(90,140,490,450);assert b[0]>=rect[0] and b[1]>=rect[1] and b[2]<=rect[2] and b[3]<=rect[3]
 cell=Image.new('RGBA',(80,80));cell.paste(source.crop(rect).resize((80,62),R),(0,9))
 b=cell.getchannel('A').getbbox();assert min(b[0],b[1],80-b[2],80-b[3])>=4
 bounds.append(b);atlas.paste(cell,(i*80,0))
save(atlas,'battleSpecial-4f.png')
fx=ROOT/'docs/art/candidates/lushu/special/vfx-review-v1'
for name,size,out in [('source-sweep-padded-v1.png',(96,80),'special-wind.png'),('target-impact-padded-v1.png',(112,72),'special-impact.png')]:
 source=Image.open(fx/name).convert('RGBA');source=source.crop(source.getchannel('A').getbbox());save(source.resize(size,R),out)
trims=[]
for name,rect,new in [('battleMove-4f.png',(0,35,384,126),'battleMove-trimmed.png'),('battleKo.png',(0,10,512,482),'battleKo-trimmed.png')]:
 p=OUT/name;original=Image.open(p).convert('RGBA');before=sha(p);b=original.getchannel('A').getbbox()
 assert b[0]>=rect[0] and b[1]>=rect[1] and b[2]<=rect[2] and b[3]<=rect[3]
 cropped=original.crop(rect);save(cropped,new);assert sha(p)==before
 trims.append(dict(original=str(p.relative_to(ROOT)),sha256=before,rect=rect,allOriginalVisiblePixelsPreserved=True,savedDecodedBytes=(original.width*original.height-cropped.width*cropped.height)*4))
idle=Image.open(OUT/'battleIdle-static.png').convert('RGBA');foot=idle.getchannel('A').point(lambda a:255 if a>=128 else 0).getbbox()[3]
idle_foot=(foot-691/724*128)*144/128
scale=2.9;px=72*scale/80;origin=[.375,(65-idle_foot/px)/80]
descriptor=dict(animation=dict(source='lushu.battleSpecial',frames=[dict(x=i*80,y=0,width=80,height=80) for i in range(4)],duration=.76,loop=False,staticFrame=2,origin=origin,scale=scale),frameDurationsMs=[200,120,200,240],impactFrame=2,coordinateSize=[80,80],
 blade=dict(assetKey='lushu.specialWind',offset=[origin[0]*80+18-336/px/2,origin[1]*80-40-280/px/2],size=[336/px,280/px],layer=6,holdAfterResolveMs=280),
 contact=dict(assetKey='lushu.specialImpact',offset=[-350/px/2,(-52-245/2)/px],size=[350/px,245/px],layer=7,attach='target',retainOnNextCast=True))
meta=dict(status='EXACT APPROVED SOURCE DERIVATIVES / REAL320ms AUTHORIZED / INTEGRATION CHECKS REQUIRED',files=records,trims=trims,descriptor=descriptor,
 normalization='Approved 640x480 review cells, transparent-only crop90,140,490,450; uniform .2 scale and9px vertical padding. Skull density normalization preserved. Common scale2.9 matches Basic head/torso, not crouched silhouette height.',
 alphaBounds=bounds,requiredDecodedBytes=16775432,hardLimit=16777216,
 move=dict(origin=[.5,(691/724*128-35)/91],scale=1.5,frameWidth=96,frameHeight=91),ko=dict(origin=[.5,375/472],scale=2,frameWidth=512,frameHeight=472))
(DEST/'runtime-manifest.json').write_text(json.dumps(meta,indent=2)+'\n')
print(json.dumps(meta,indent=2))
