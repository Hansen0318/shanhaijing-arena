"""QA-only logical controls from immutable review rasters, never gameplay assets."""
from pathlib import Path
import hashlib,json
from PIL import Image
root=Path(__file__).resolve().parents[1]
review=root/'docs/art/candidates/botuo/special/composite-review-v1'
out=root/'docs/verification/P2_SPECIAL_RUNTIME/native-reference'
out.mkdir(parents=True,exist_ok=True)
records=[]
for i in range(4):
 source=review/f'F{i+1}-safe-cell.png'
 image=Image.open(source).convert('RGBA').crop((100,90,300,290))
 target=out/f'F{i+1}.png';image.save(target)
 records.append(dict(key='botuo.specialPoses',frame=i,path=str(target.relative_to(root)),source=str(source.relative_to(root)),sourceSha256=hashlib.sha256(source.read_bytes()).hexdigest(),sha256=hashlib.sha256(target.read_bytes()).hexdigest(),translationOnly=[-100,-90],size=image.size))
for key,name,size in [('botuo.specialActivation','activation-raw-v1.png',(320,260)),('botuo.specialState','mitigation-state-raw-v1.png',(224,234))]:
 source=review/name;image=Image.open(source).convert('RGBA').resize(size,Image.Resampling.LANCZOS)
 target=out/(key.split('.')[-1]+'.png');image.save(target)
 records.append(dict(key=key,frame=0,path=str(target.relative_to(root)),source=str(source.relative_to(root)),sourceSha256=hashlib.sha256(source.read_bytes()).hexdigest(),sha256=hashlib.sha256(target.read_bytes()).hexdigest(),policy='Exact existing review resize, not another density reduction',size=size))
(out/'manifest.json').write_text(json.dumps(records,indent=2)+'\n')
print(json.dumps(dict(references=len(records),scope='QA only, original review sources unchanged')))
