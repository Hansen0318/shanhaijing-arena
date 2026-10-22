"""Lossless installation of approved display RGBA. Never generates artwork."""
from pathlib import Path
from PIL import Image
import hashlib,json
ROOT=Path(__file__).resolve().parents[1]
SRC=ROOT/'docs/art/candidates/botuo/awakening/composite-review-v1'
OUT=ROOT/'public/assets/botuo-awakening-runtime-v1'
REPORT=ROOT/'docs/verification/P2_AWAKENING_RUNTIME'
OUT.mkdir(parents=True,exist_ok=True);REPORT.mkdir(parents=True,exist_ok=True)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
atlas=Image.new('RGBA',(800,200));sources=[]
for i in range(4):
 p=SRC/f'F{i+1}-safe-cell.png';im=Image.open(p).convert('RGBA');cell=im.crop((100,80,300,280))
 restored=Image.new('RGBA',im.size);restored.paste(cell,(100,80))
 assert restored.tobytes()==im.tobytes(),'All RGBA including transparent RGB must reconstruct'
 assert cell.getbbox() is not None
 atlas.paste(cell,(i*200,0));sources.append(dict(path=str(p.relative_to(ROOT)),sha256=sha(p),crop=[100,80,300,280],atlas=[i*200,0,200,200],rgbaRoundTrip=True,mirrorRoundTrip=cell.transpose(Image.Transpose.FLIP_LEFT_RIGHT).transpose(Image.Transpose.FLIP_LEFT_RIGHT).tobytes()==cell.tobytes()))
atlas.save(OUT/'poses.png',optimize=True)
entries=[dict(key='botuo.awakeningPoses',type='image',path='assets/botuo-awakening-runtime-v1/poses.png',width=800,height=200,bytes=(OUT/'poses.png').stat().st_size,fallback='placeholder.battle')]
for key,name in [('Release','radial-release'),('Impact','victim-impact'),('State','team-mitigation')]:
 source=SRC/(name+'-display.png');target=OUT/(name+'.png');im=Image.open(source).convert('RGBA');im.save(target,optimize=True)
 assert Image.open(target).convert('RGBA').tobytes()==im.tobytes()
 entries.append(dict(key='botuo.awakening'+key,type='image',path=str(target.relative_to(ROOT/'public')),width=im.width,height=im.height,bytes=target.stat().st_size,fallback='placeholder.vfx'))
 sources.append(dict(path=str(source.relative_to(ROOT)),sha256=sha(source),output=str(target.relative_to(ROOT)),rgbaRoundTrip=True))
for e in entries:
 assert e['bytes']<=4194304 and max(e['width'],e['height'])<=2048 and e['width']*e['height']<=4194304
report=dict(status='RGBA PACKING PASS / NATIVE SCALE AND SAMPLING PENDING',sources=sources,entries=entries,ground=dict(originalCell=[400,320],commonCrop=[100,80,300,280],root=[100,194],scale=200/72,method='Accepted preview GROUND274 minus crop80 =194; correct earlier proposed184. Common authoring density/support anchors, no pose-bounds fitting'),newDecodedBytes=sum(e['width']*e['height']*4 for e in entries),outputSha256={e['path']:sha(ROOT/'public'/e['path']) for e in entries},notEstablished=['native Phaser sampling','multi-landmark native scale','browser/mobile or player acceptance'])
(REPORT/'packing.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(entries))
