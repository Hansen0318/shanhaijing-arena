"""Deterministic lossless packing of accepted safe cells. Never writes approved inputs."""
from pathlib import Path
from PIL import Image
import hashlib,json
ROOT=Path(__file__).resolve().parents[1];SRC=ROOT/'docs/art/candidates/chiru/awakening/composite-review-v1';OUT=ROOT/'public/assets/chiru-awakening-runtime-v1';OUT.mkdir(parents=True,exist_ok=True)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for p,h in json.loads((ROOT/'docs/art/approved/chiru/awakening/composite-review-v1/acceptance.json').read_text())['evidenceSha256'].items():assert sha(ROOT/p)==h,p
records=[];sources={};crop=(60,40,224,216);w,h=164,176;px,py=98,163
def record(p,key):
 im=Image.open(p);im.load();records.append(dict(key=key,type='image',path=str(p.relative_to(ROOT/'public')),width=im.width,height=im.height,bytes=p.stat().st_size,fallback='placeholder.battle' if key.endswith('Poses') else 'placeholder.vfx',sha256=sha(p)))
strip=Image.new('RGBA',(w*4,h))
for i,n in enumerate(['F1','F2','F3','F4']):
 p=SRC/f'{n}-safe-cell.png';im=Image.open(p).convert('RGBA');cell=im.crop(crop);restored=Image.new('RGBA',im.size);restored.paste(cell,crop[:2]);assert restored.tobytes()==im.tobytes(),n;strip.paste(cell,(w*i,0));sources[str(p.relative_to(ROOT))]=sha(p)
strip.save(OUT/'poses.png',optimize=True);record(OUT/'poses.png','chiru.awakeningPoses')
for n in ['caster','recipient','protection']:
 p=SRC/f'{n}-display.png';im=Image.open(p);im.load();im.save(OUT/f'{n}.png',optimize=True);assert Image.open(OUT/f'{n}.png').tobytes()==im.tobytes();record(OUT/f'{n}.png','chiru.awakening'+n.title());sources[str(p.relative_to(ROOT))]=sha(p)
action=dict(kind='healing',animation=dict(source='chiru.awakeningPoses',frames=[dict(x=w*i,y=0,width=w,height=h) for i in range(4)],duration=1.2,loop=False,staticFrame=2,origin=[px/w,py/h],scale=max(w,h)*.9/72),frameDurationsMs=[360,240,300,300],impactFrame=2,coordinateSize=[w,h],blade=dict(assetKey='chiru.awakeningCaster',offset=[px-170,py-.88*340],size=[340,340],layer=4,unfurlMs=600),contact=dict(assetKey='chiru.awakeningRecipient',attach='target',offset=[-125,-.82*250],size=[250,250],layer=4,durationMs=600,fullOpacityMs=500),statusVisuals={'chiru.support':dict(assetKey='chiru.awakeningProtection',styleId='water-membrane',type='mitigation',size=[171,171],offset=[0,-72.9],layer=4,opacity=1,reducedOpacity=1,priority=0)})
(ROOT/'src/assets/chiruAwakeningRuntime.js').write_text('// Approved pixels; shared .9 display density and hover pivot.\nexport const chiruAwakeningAction='+json.dumps(action,indent=2)+';\n')
report=dict(status='LOSSLESS PACK PASS',assets=records,sourceSha256=sources,commonSourceCell=[320,260],commonCrop=list(crop),logicalPivot=[px,py],bodyDensity=.9,decodedBytes=sum(r['width']*r['height']*4 for r in records),action=action)
(ROOT/'docs/verification/P3_AWAKENING_RUNTIME/packing.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({k:report[k] for k in ['status','decodedBytes','commonCrop']}))
