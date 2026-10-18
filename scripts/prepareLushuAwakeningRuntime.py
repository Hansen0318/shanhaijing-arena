"""Deterministic source-preserving runtime packing; never writes approved sources.
Run from any directory. Evidence is new and separate from historical preflight.
"""
from pathlib import Path
from PIL import Image
import hashlib, json
ROOT=Path(__file__).resolve().parents[1]
def sha(p):return hashlib.sha256((ROOT/p).read_bytes()).hexdigest()
def read(p):
 im=Image.open(ROOT/p);im.load();return im.convert('RGBA')
def write(im,p):
 out=ROOT/p;out.parent.mkdir(parents=True,exist_ok=True);im.save(out,format='PNG')
 return dict(path=p,width=im.width,height=im.height,bytes=out.stat().st_size,decodedBytes=im.width*im.height*4,sha256=sha(p))
receipt=json.loads((ROOT/'docs/art/approved/lushu/awakening/composite-v3/acceptance.json').read_text())
manifest=json.loads((ROOT/receipt['sourceManifest']).read_text());protected=[]
for r in receipt['artifacts']:
 p=receipt['artifactFolder']+'/'+r['file'];assert sha(p)==r['sha256'];protected.append(dict(path=p,sha256=sha(p)))
for r in manifest['records']+manifest['vfx']:
 p=r.get('source',r.get('raw'));assert sha(p)==r['sha256'];protected.append(dict(path=p,sha256=sha(p)))
pack=Image.new('RGBA',(640,128));poses=[]
for i,r in enumerate(manifest['records']):
 p='docs/art/candidates/lushu/awakening/composite-review-v2/'+r['pose']+'-cell.png';im=read(p)
 src=read(r['source']);reconstructed=Image.new('RGBA',(640,480));reconstructed.paste(src.resize(tuple(r['resize']),Image.Resampling.LANCZOS),tuple(r['translation']));assert reconstructed.tobytes()==im.tobytes()
 crop=im.crop((160,112,480,432));restored=Image.new('RGBA',im.size);restored.paste(crop,(160,112));assert restored.tobytes()==im.tobytes();pack.paste(crop.resize((128,128),Image.Resampling.LANCZOS),(128*i,0));poses.append(dict(path=p,sha256=sha(p),restorationExact=True))
assets={'lushu.battleAwakening':write(pack,'public/assets/characters/lushu/awakening-runtime-v1/poses-5f.png')};stages=[];vfx=[]
for index,phase in enumerate('ABC'):
 stage={}
 for kind,field,maxsize,center in [('source','blade',([350,400,450][index],190),(-100,-80)),('impact','contact',([180,270,400][index],)*2,(0,-110))]:
  p=f'docs/art/candidates/lushu/awakening/vfx-review-v1/{phase}-{kind}-padded.png';im=read(p);r=manifest['vfx'][index];raw=read(r['raw']);mid=r['splitX'];part=raw.crop((0,0,mid,raw.height) if kind=='source' else (mid,0,raw.width,raw.height));pad=Image.new('RGBA',im.size);pad.paste(part,(80,80));assert pad.tobytes()==im.tobytes()
  ratio=min(96/im.width,96/im.height);small=im.resize(tuple(max(1,round(n*ratio)) for n in im.size),Image.Resampling.LANCZOS)
  key=f'lushu.awakening{phase}{kind.title()}';assets[key]=write(small,f'public/assets/characters/lushu/awakening-runtime-v1/{phase}-{kind}.png')
  # Same significant-alpha measurement as accepted compositor; preserve entire padded image.
  b=im.getchannel('A').point(lambda a:255 if a>8 else 0).getbbox();scale=min(maxsize[0]/(b[2]-b[0]),maxsize[1]/(b[3]-b[1]));size=[round(n*scale) for n in im.size];anchor=[(b[0]+b[2])*scale/2,(b[1]+b[3])*scale/2]
  # Descriptor source offsets are top-left in logical cropped body coordinates.
  offset=[160+center[0]-anchor[0],298+center[1]-anchor[1]] if kind=='source' else [center[0]-anchor[0],center[1]-anchor[1]]
  stage[field]=dict(assetKey=key,offset=offset,size=size,layer=6 if kind=='source' else 7,**({'attach':'target'} if kind=='impact' else {}));vfx.append(dict(source=p,sha256=sha(p),paddedReconstructionExact=True,significantAlphaBox=b,logicalPreviewSize=size,previewAnchor=anchor))
 stage['blade']['opacity']=.85;stage['contactHoldMs']=[80,90,130][index];stage['startMs']=[80,135,280][index];stage['endMs']=[135,280,470][index];stages.append(stage)
policies=[('botuo.battleIdle','botuo/battleIdle-4f.png',(0,0,160,160),True),('lushu.battleBasic','lushu/battleBasic-4f.png',(0,10,512,111),False),('lushu.battleHeavy','lushu/battleHeavy-4f.png',(0,31,512,116),False),('lushu.battleSpecial','lushu/battleSpecial-4f.png',(0,10,320,69),False),('chiru.battleMove','chiru/battleMove-4f.png',(0,42,640,160),False),('jiuweihu.battleKo','jiuweihu/battleKo.png',(0,47,512,485),False)]
lossless=[]
preflight=json.loads((ROOT/'docs/verification/M5C_P1_AWAKENING_ASSET_PREFLIGHT.json').read_text())
for key,p,box,unused in policies:
 p='public/assets/characters/'+p;assert sha(p)==next(r['sha256'] for r in preflight['losslessCandidates'] if r['path']==p);im=read(p);out=im.crop(box)
 if not unused:
  restored=Image.new('RGBA',im.size);restored.paste(out,box[:2]);assert restored.tobytes()==im.tobytes()
 asset=write(out,'public/assets/runtime-packing-v1/'+key.replace('.','-')+'.png');assets[key]=asset;lossless.append(dict(key=key,source=p,sha256=sha(p),crop=box,sourceSize=im.size,restorationExact=not unused,onlyDisplayedCell=unused,savedBytes=im.width*im.height*4-asset['decodedBytes']))
descriptor=dict(kind='staged',animation=dict(source='lushu.battleAwakening',frames=[dict(x=i*128,y=0,width=128,height=128) for i in range(5)],duration=.61,loop=False,staticFrame=3,origin=[.5,.93125],scale=320*(144/275)/72),coordinateSize=[320,320],durationMs=610,recoveryStartMs=470,phaseFrames=[0,1,2,3,4],frameDurationsMs=[80,55,145,190,140],stages=stages)
saved=sum(r['savedBytes'] for r in lossless);addition=sum(a['decodedBytes'] for key,a in assets.items() if key.startswith('lushu.awakening') or key=='lushu.battleAwakening');required=16775432-saved+addition;assert required==16552840
for r in protected:assert sha(r['path'])==r['sha256']
evidence=dict(scope='Source-preserving installed runtime packaging; device raster quality and GPU memory unverified',protected=protected,poses=poses,vfx=vfx,lossless=lossless,assets=assets,descriptor=descriptor,budget=dict(requiredBytes=required,hardBytes=16777216,minimumOptionalReserveBytes=131072,headroomBytes=16777216-required),limitations=['Decoded RGBA accounting is not actual browser/GPU allocation','Downsampling deterministic but not pixel identical to original','Raster quality/device acceptance remains pending'])
(ROOT/'docs/verification/P1_AWAKENING_RUNTIME_ASSETS.json').write_text(json.dumps(evidence,indent=2)+'\n');print(json.dumps(dict(requiredBytes=required,assets=len(assets),protected=len(protected))))
