from pathlib import Path
from PIL import Image
import json,hashlib
R=Path(__file__).resolve().parents[1];out=R/'public/assets/chiru-passive-runtime-v1';out.mkdir(parents=True,exist_ok=True)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for name in ['style-v2','composite-review-v1']:
 for p,h in json.loads((R/f'docs/art/approved/chiru/passive/{name}/acceptance.json').read_text())['evidenceSha256'].items():assert sha(R/p)==h,p
assets=[];sources={}
for t in range(4):
 src=R/f'docs/art/candidates/chiru/passive/style-v2/T{t}-style.png';im=Image.open(src);im.verify();im=Image.open(src);im.load();dst=out/f'T{t}.png';im.save(dst,optimize=True);assert Image.open(dst).tobytes()==im.tobytes();sources[str(src.relative_to(R))]=sha(src);assets.append(dict(key=f'chiru.passiveT{t}',type='image',path=str(dst.relative_to(R/'public')),width=im.width,height=im.height,bytes=dst.stat().st_size,fallback='placeholder.vfx',sha256=sha(dst)))
(R/'docs/verification/P3_PASSIVE_RUNTIME/packing.json').write_text(json.dumps(dict(status='LOSSLESS PASS',sourceSha256=sources,assets=assets,sourcePivot=[158,203],sourcePlacement=[58,123],density=.9,decodedBytes=sum(a['width']*a['height']*4 for a in assets)),indent=2)+'\n')
p=R/'src/assets/manifest.js';s=p.read_text();s=s.replace('const entries=[','const entries=[\n'+''.join(' '+json.dumps({k:v for k,v in a.items() if k!='sha256'})+',\n' for a in assets));p.write_text(s)
print([(a['width'],a['height'],a['bytes']) for a in assets])
