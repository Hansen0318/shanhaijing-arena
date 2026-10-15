"""Deterministic approved-art derivatives. Run from repo root with Pillow."""
from pathlib import Path
import hashlib, io, json
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT/'docs/art/approved/lushu/basic/review-v1'
OUT = ROOT/'public/assets/characters/lushu'
R = Image.Resampling.LANCZOS
def digest(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def bounds(im): return im.getchannel('A').point(lambda a:255 if a>128 else 0).getbbox()
def save(im,name):
 p=OUT/name;tmp=p.with_suffix('.tmp');data=io.BytesIO();im.save(data,format='PNG');tmp.write_bytes(data.getvalue())
 decoded=Image.open(tmp);decoded.load();assert decoded.tobytes()==im.tobytes();tmp.replace(p)
 return {'path':str(p.relative_to(ROOT)),'width':im.width,'height':im.height,'bytes':p.stat().st_size,'sha256':digest(p),'decodedBytes':im.width*im.height*4}
approval=json.loads((SRC/'acceptance.json').read_text())
for f in approval['files']: assert digest(ROOT/f['path'])==f['sha256']
oldpath=OUT/'battleIdle-4f.png';assert digest(oldpath)=='ca123eb6eb15c1f32fab2c9d732d40d7db279ed2e4332a1043172d3fb0bef327'
idle=Image.open(oldpath).convert('RGBA').crop((0,0,96,128));records=[save(idle,'battleIdle-static.png')]
source=Image.open(SRC/'lushu-basic-4f-safe-review-v1.png').convert('RGBA');cells=[]
for i in range(4):
 cell=source.crop((i*384,0,(i+1)*384,384)).resize((128,128),R);cells.append(cell)
strip=Image.new('RGBA',(512,128))
for i,c in enumerate(cells):strip.alpha_composite(c,(i*128,0))
records.append(save(strip,'battleBasic-4f.png'))
for raw,size,name in [('blade-sweep-raw-v1.png',(97,81),'basic-blade.png'),('contact-spark-raw-v1.png',(85,57),'basic-contact.png')]:
 records.append(save(Image.open(SRC/raw).convert('RGBA').resize(size,R),name))
ib=bounds(idle);fb=bounds(cells[3]);scale=(144*(ib[3]-ib[1])/128)*128/(fb[3]-fb[1])/72
oldfoot=(ib[3]-(691/724)*128)*144/128
origins=[]
for cell in cells:
 cb=bounds(cell);originY=cb[3]/128-oldfoot/(72*scale);origins.append(originY)
# One anchor; resized baseline rounding is limited to one source pixel.
origin=[.5,origins[3]]
m={'status':'RUNTIME DERIVATIVE PREPARED / ENGINEERING AND PHONE PENDING','sourceAcceptance':str((SRC/'acceptance.json').relative_to(ROOT)),
 'files':records,'frames':[{'x':i*128,'y':0,'width':128,'height':128} for i in range(4)],'origin':origin,'scale':scale,
 'visibleBounds':[list(bounds(c)) for c in cells],'idleVisibleBounds':list(ib),'sourceCellSize':[384,384],
 'frameDurationsMs':[120,60,100,120],'impactFrame':2,'allFiveEstimatedBytes':16763144}
(SRC/'runtime-manifest.json').write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n')
proof=Image.new('RGB',(1024,460),'#17212d');draw=ImageDraw.Draw(proof)
for i,c in enumerate(cells):
 for row,bg in enumerate(['#17212d','#eeeeea']):
  tile=Image.new('RGBA',(256,220),bg);tile.alpha_composite(c.resize((round(72*scale),round(72*scale)),R),(28,16));proof.paste(tile.convert('RGB'),(i*256,row*230))
proof.save(ROOT/'docs/art/candidates/lushu/basic/review-v1/runtime-alpha-review.png')
print(json.dumps(m,indent=2))
