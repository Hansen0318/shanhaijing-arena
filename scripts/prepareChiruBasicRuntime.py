"""Source-preserving packaging of the approved review; no generation or recoloring."""
from pathlib import Path
from PIL import Image
import json,hashlib
ROOT=Path(__file__).resolve().parents[1]
SRC=ROOT/'docs/art/candidates/chiru/basic/composite-review-v1'
OUT=ROOT/'public/assets/chiru-basic-runtime-v1'
OUT.mkdir(parents=True,exist_ok=True)
receipt=json.loads((ROOT/'docs/art/approved/chiru/basic/composite-review-v1/acceptance.json').read_text())
for p,h in receipt['evidenceSha256'].items():
 assert hashlib.sha256((ROOT/p).read_bytes()).hexdigest()==h,p
records=[]
def record(p,key):
 im=Image.open(p);im.load()
 r=dict(key=key,type='image',path=str(p.relative_to(ROOT/'public')),width=im.width,height=im.height,bytes=p.stat().st_size,fallback='placeholder.battle' if key.endswith('Poses') else 'placeholder.vfx')
 records.append(r);return im
strip=Image.new('RGBA',(672,168))
for i,n in enumerate(['F1','F2','F3','F4']):
 im=Image.open(SRC/f'{n}-safe-cell.png').convert('RGBA');cell=im.crop((64,40,232,208))
 restored=Image.new('RGBA',im.size);restored.paste(cell,(64,40));assert restored.tobytes()==im.tobytes(),n
 strip.paste(cell,(168*i,0))
strip.save(OUT/'poses.png',optimize=True);record(OUT/'poses.png','chiru.basicPoses')
for name in ['charge','arrow','impact']:
 im=Image.open(SRC/f'{name}-display.png');im.load();im.save(OUT/f'{name}.png',optimize=True)
 assert Image.open(OUT/f'{name}.png').tobytes()==im.tobytes()
 record(OUT/f'{name}.png','chiru.basic'+name.title())
fx={n:Image.open(OUT/f'{n}.png') for n in ['charge','arrow','impact']}
w,h=fx['charge'].size;aw,ah=fx['arrow'].size;iw,ih=fx['impact'].size
ab=fx['arrow'].getchannel('A').getbbox()
action=dict(animation=dict(source='chiru.basicPoses',frames=[dict(x=168*i,y=0,width=168,height=168) for i in range(4)],duration=.4,loop=False,staticFrame=2,origin=[94/168,163/168],scale=2.1),frameDurationsMs=[120,60,100,120],impactFrame=2,coordinateSize=[168,168],anticipation=dict(assetKey='chiru.basicCharge',offset=[120-w/2,65-h/2],frameOffsets=[[123-w/2,65-h/2],[117-w/2,64-h/2],[142-w/2,68-h/2],[122-w/2,65-h/2]],size=[w,h],layer=4),blade=dict(assetKey='chiru.basicArrow',attach='line',offset=[142,68],size=[aw,ah],targetOffset=[0,-95],lineRange=[ab[0]/aw,ab[2]/aw],layer=4),contact=dict(assetKey='chiru.basicImpact',attach='target',offset=[10-iw/2,-107-ih/2],size=[iw,ih],layer=6))
(ROOT/'src/assets/chiruBasicRuntime.js').write_text('// Approved source-preserving Basic review geometry. Combat owns endpoints/timing.\nexport const chiruBasicAction='+json.dumps(action,indent=2)+';\n')
report=dict(status='SOURCE-PRESERVING PACK PASS / RUNTIME VERIFICATION PENDING',assets=records,commonCrop=[64,40,168,168],logicalGround=163,bodyDensity=.9,source='approved safe cells .13 master density; no additional art resize',decodedBytes=sum(r['width']*r['height']*4 for r in records),action=action)
(ROOT/'docs/verification/P3_BASIC_RUNTIME/packing.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(records,indent=2))
