"""Lossless empty-padding packing of approved Special safe cells. No generation."""
from pathlib import Path
from PIL import Image
import json,hashlib
ROOT=Path(__file__).resolve().parents[1];SRC=ROOT/'docs/art/candidates/chiru/special/composite-review-v1';OUT=ROOT/'public/assets/chiru-special-runtime-v1';OUT.mkdir(parents=True,exist_ok=True)
receipt=json.loads((ROOT/'docs/art/approved/chiru/special/composite-review-v1/acceptance.json').read_text())
for p,h in receipt['evidenceSha256'].items():assert hashlib.sha256((ROOT/p).read_bytes()).hexdigest()==h,p
records=[]
def record(p,key):
 im=Image.open(p);im.load();records.append(dict(key=key,type='image',path=str(p.relative_to(ROOT/'public')),width=im.width,height=im.height,bytes=p.stat().st_size,fallback='placeholder.battle' if key.endswith('Poses') else 'placeholder.vfx'));return im
strip=Image.new('RGBA',(896,194))
for i,n in enumerate(['F1','F2','F3','F4']):
 im=Image.open(SRC/f'{n}-safe-cell.png').convert('RGBA');cell=im.crop((40,30,264,224));restored=Image.new('RGBA',im.size);restored.paste(cell,(40,30));assert restored.tobytes()==im.tobytes(),n;strip.paste(cell,(224*i,0))
strip.save(OUT/'poses.png',optimize=True);record(OUT/'poses.png','chiru.specialPoses')
for n in ['caster','recipient']:
 im=Image.open(SRC/f'{n}-display.png');im.load();im.save(OUT/f'{n}.png',optimize=True);assert Image.open(OUT/f'{n}.png').tobytes()==im.tobytes();record(OUT/f'{n}.png','chiru.special'+n.title())
action=dict(kind='healing',animation=dict(source='chiru.specialPoses',frames=[dict(x=224*i,y=0,width=224,height=194) for i in range(4)],duration=.76,loop=False,staticFrame=2,origin=[118/224,173/194],scale=2.8),frameDurationsMs=[200,120,200,240],impactFrame=2,coordinateSize=[224,194],blade=dict(assetKey='chiru.specialCaster',offset=[118-125,173-.875*274],size=[250,274],layer=4),contact=dict(assetKey='chiru.specialRecipient',attach='target',offset=[-155,-.82*194],size=[310,194],layer=4,durationMs=440,fullOpacityMs=360))
(ROOT/'src/assets/chiruSpecialRuntime.js').write_text('// Accepted pixels; common 0.9 density, hover anchor, canonical right.\nexport const chiruSpecialAction='+json.dumps(action,indent=2)+';\n')
report=dict(status='LOSSLESS PACK PASS',assets=records,commonCrop=[40,30,224,194],logicalGround=173,bodyDensity=.9,decodedBytes=sum(r['width']*r['height']*4 for r in records),action=action)
(ROOT/'docs/verification/P3_SPECIAL_RUNTIME/packing.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(records))
