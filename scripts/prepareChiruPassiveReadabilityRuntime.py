"""Lossless packaging of the player-approved revised PNGs; never extract GIF frames."""
from pathlib import Path
from PIL import Image
import json,hashlib
R=Path(__file__).resolve().parents[1];out=R/'public/assets/chiru-passive-runtime-v2';out.mkdir(parents=True,exist_ok=True)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
receipt=json.loads((R/'docs/art/approved/chiru/passive/readability-review-v1/acceptance.json').read_text())
for p,h in receipt['evidenceSha256'].items():assert sha(R/p)==h,p
assets=[];sources={}
for t in range(4):
 src=R/f'docs/art/candidates/chiru/passive/readability-review-v1/T{t}-style.png';im=Image.open(src);im.verify();im=Image.open(src);im.load();dst=out/f'T{t}.png';im.save(dst,optimize=True);assert Image.open(dst).tobytes()==im.tobytes();sources[str(src.relative_to(R))]=sha(src);assets.append(dict(key=f'chiru.passiveT{t}',type='image',path=str(dst.relative_to(R/'public')),width=im.width,height=im.height,bytes=dst.stat().st_size,fallback='placeholder.vfx',sha256=sha(dst)))
packing=dict(status='LOSSLESS PASS',sourceSha256=sources,assets=assets,sourcePivot=[158,203],sourcePlacement=[58,123],density=.9,decodedBytes=sum(a['width']*a['height']*4 for a in assets),recipientRim=dict(source='current visible actor frame',color='#69ffc3',logicalRadius=3,depth='body depth minus .01',bodyMutation=False),fishDepth=6)
(R/'docs/verification/P3_PASSIVE_RUNTIME/readability-revision/runtime/packing.json').write_text(json.dumps(packing,indent=2)+'\n')
p=R/'src/assets/manifest.js';s=p.read_text();import re
for a in assets:s=re.sub(r' \{"key": "'+re.escape(a['key'])+r'"[^\n]+', ' '+json.dumps({k:v for k,v in a.items() if k!='sha256'})+',',s)
p.write_text(s)
print('4 approved PNGs packed, exact RGBA preserved')
