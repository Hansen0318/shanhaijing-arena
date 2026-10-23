"""Lossless empty-padding packing of accepted Heavy cells. No generation."""
from pathlib import Path
from PIL import Image
import json,hashlib
ROOT=Path(__file__).resolve().parents[1];SRC=ROOT/'docs/art/candidates/chiru/heavy/composite-review-v1';OUT=ROOT/'public/assets/chiru-heavy-runtime-v1';OUT.mkdir(parents=True,exist_ok=True)
receipt=json.loads((ROOT/'docs/art/approved/chiru/heavy/composite-review-v1/acceptance.json').read_text())
for p,h in receipt['evidenceSha256'].items():assert hashlib.sha256((ROOT/p).read_bytes()).hexdigest()==h,p
records=[]
def record(p,key):
 im=Image.open(p);im.load();records.append(dict(key=key,type='image',path=str(p.relative_to(ROOT/'public')),width=im.width,height=im.height,bytes=p.stat().st_size,fallback='placeholder.battle' if key.endswith('Poses') else 'placeholder.vfx'));return im
strip=Image.new('RGBA',(896,194))
for i,n in enumerate(['F1','F2','F3','F4']):
 im=Image.open(SRC/f'{n}-safe-cell.png').convert('RGBA');cell=im.crop((40,30,264,224));restored=Image.new('RGBA',im.size);restored.paste(cell,(40,30));assert restored.tobytes()==im.tobytes(),n;strip.paste(cell,(224*i,0))
strip.save(OUT/'poses.png',optimize=True);record(OUT/'poses.png','chiru.heavyPoses')
fx={}
for n in ['charge','column','impact']:
 im=Image.open(SRC/f'{n}-display.png');im.load();im.save(OUT/f'{n}.png',optimize=True);assert Image.open(OUT/f'{n}.png').tobytes()==im.tobytes();fx[n]=record(OUT/f'{n}.png','chiru.heavy'+n.title())
w,h=fx['charge'].size;aw,ah=fx['column'].size;iw,ih=fx['impact'].size;ab=fx['column'].getchannel('A').getbbox()
m=json.loads((SRC/'manifest.json').read_text());orbs=[]
for p in m['poses']:
 x,y=p['translation'];ox,oy=p['landmarks']['orb'];orbs.append([x+round(ox*.13)-40,y+round(oy*.13)-30])
action=dict(kind='launched-line',animation=dict(source='chiru.heavyPoses',frames=[dict(x=224*i,y=0,width=224,height=194) for i in range(4)],duration=.95,loop=False,staticFrame=2,origin=[118/224,173/194],scale=2.8),frameDurationsMs=[200,150,400,200],impactFrame=2,coordinateSize=[224,194],anticipation=dict(assetKey='chiru.heavyCharge',offset=[orbs[0][0]-w/2,orbs[0][1]-h/2],frameOffsets=[[x-w/2,y-h/2] for x,y in orbs],size=[w,h],layer=4),blade=dict(assetKey='chiru.heavyColumn',attach='line',offset=orbs[2],size=[aw,ah],targetOffset=[0,-98],lineRange=[ab[0]/aw,ab[2]/aw],layer=4),contact=dict(assetKey='chiru.heavyImpact',attach='target',offset=[-.52*iw,-98-.85*ih],size=[iw,ih],layer=6))
(ROOT/'src/assets/chiruHeavyRuntime.js').write_text('// Accepted source pixels, shared 0.9 runtime pixel density and hover anchor.\nexport const chiruHeavyAction='+json.dumps(action,indent=2)+';\n')
report=dict(status='PACK PASS / BROWSER PENDING',assets=records,commonCrop=[40,30,224,194],logicalGround=173,bodyDensity=.9,decodedBytes=sum(r['width']*r['height']*4 for r in records),action=action)
(ROOT/'docs/verification/P3_HEAVY_RUNTIME/packing.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(records))
