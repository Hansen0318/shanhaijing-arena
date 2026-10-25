"""Deterministic lossless packaging of player-approved safe cells; masters untouched."""
from pathlib import Path
from PIL import Image
import json,hashlib
ROOT=Path(__file__).resolve().parents[1]
SRC=ROOT/'docs/art/candidates/jiuweihu/basic/composite-review-v1'
OUT=ROOT/'public/assets/jiuweihu-basic-runtime-v1';OUT.mkdir(parents=True,exist_ok=True)
REPORT=ROOT/'docs/verification/P4_BASIC_RUNTIME'
receipt=json.loads((ROOT/'docs/art/approved/jiuweihu/basic/composite-review-v1/acceptance.json').read_text())
for p,h in receipt['evidenceSha256'].items():assert hashlib.sha256((ROOT/p).read_bytes()).hexdigest()==h,p
records=[]
def save(im,name,key):
 p=OUT/(name+'.png');im.save(p,optimize=True);assert Image.open(p).tobytes()==im.tobytes()
 records.append(dict(key=key,type='image',path=str(p.relative_to(ROOT/'public')),width=im.width,height=im.height,bytes=p.stat().st_size,fallback='placeholder.battle' if name=='poses' else 'placeholder.vfx',sha256=hashlib.sha256(p.read_bytes()).hexdigest()))
# Common transparent crop retains every normalized alpha pixel. No anatomy/FX resampling.
strip=Image.new('RGBA',(704,160))
for i,n in enumerate(['F1','F2','F3','F4']):
 im=Image.open(SRC/(n+'-safe-cell.png')).convert('RGBA');cell=im.crop((48,40,224,200));restore=Image.new('RGBA',im.size);restore.paste(cell,(48,40));assert restore.tobytes()==im.tobytes(),n
 strip.paste(cell,(176*i,0))
save(strip,'poses','jiuweihu.basicPoses')
for name,key in [('hand-release','Release'),('target-impact','Impact')]:save(Image.open(SRC/(name+'-display.png')).convert('RGBA'),name,'jiuweihu.basic'+key)
# Idle anatomy: waist (103,80), full foot142 in original logical160, actor pivot(80,151).
# Action common waist155/foot190; crop transforms to waist107/foot150.
# Preserve .9 screen px/logical px of approved Idle/Move, same +23 waist offset, -9 foot offset.
action=dict(kind='instant-followthrough',animation=dict(source='jiuweihu.basicPoses',frames=[dict(x=i*176,y=0,width=176,height=160) for i in range(4)],duration=.46,loop=False,staticFrame=2,origin=[84/176,159/160],scale=2.2),frameDurationsMs=[140,90,90,140],impactFrame=2,coordinateSize=[176,160],blade=dict(assetKey='jiuweihu.basicRelease',offset=[200-48-81*.24,102-40-57*.53],size=[81,57],layer=6),contact=dict(assetKey='jiuweihu.basicImpact',attach='target',offset=[-107*.52,-55-91*.59],size=[107,91],layer=7,durationMs=230))
(ROOT/'src/assets/jiuweihuBasicRuntime.js').write_text('// Approved PNG geometry; observational 0ms release, no gameplay lock.\nexport const jiuweihuBasicAction='+json.dumps(action,indent=2)+';\n')
(REPORT/'packing.json').write_text(json.dumps(dict(status='PACK PASS / RENDERER CALIBRATION PENDING',commonCrop=[48,40,176,160],pixelScale=.9,idleLandmarks=dict(waist=[103,80],footY=142,pivot=[80,151]),actionLandmarks=dict(waist=[107,79],footY=150,pivot=[84,159]),decodedBytes=sum(r['width']*r['height']*4 for r in records),assets=records,action=action),indent=2)+'\n')
print(json.dumps(records))
