"""Read-only approved source/hash, packing and renderer-transform measurements.
Hypothetical PNGs are encoded in memory only; no assets/manifests are changed.
"""
from pathlib import Path
from PIL import Image, ImageOps
import json,hashlib,io,math
ROOT=Path(__file__).resolve().parents[1]
def read(p):
 im=Image.open(ROOT/p);im.load();return im.convert('RGBA')
def sha(p):return hashlib.sha256((ROOT/p).read_bytes()).hexdigest()
def png_info(im):
 b=io.BytesIO();im.save(b,format='PNG');data=b.getvalue()
 return dict(width=im.width,height=im.height,decodedBytes=im.width*im.height*4,encodedBytes=len(data),sha256=hashlib.sha256(data).hexdigest())
receipt=json.loads((ROOT/'docs/art/approved/lushu/awakening/composite-v3/acceptance.json').read_text())
checks=[]
for r in receipt['artifacts']:
 p=receipt['artifactFolder']+'/'+r['file'];assert sha(p)==r['sha256'];checks.append(p)
manifest=json.loads((ROOT/receipt['sourceManifest']).read_text())
for r in manifest['records']+manifest['vfx']:
 p=r.get('source',r.get('raw'));assert sha(p)==r['sha256'];checks.append(p)
base='docs/art/candidates/lushu/awakening/composite-review-v2/'
pose=[];pack=Image.new('RGBA',(640,128));q=144/275
for i,r in enumerate(manifest['records']):
 path=base+r['pose']+'-cell.png';im=read(path)
 src=read(r['source']);normalized=Image.new('RGBA',(640,480));normalized.paste(src.resize(tuple(r['resize']),Image.Resampling.LANCZOS),tuple(r['translation']));assert normalized.tobytes()==im.tobytes()
 box=(160,112,480,432);cropped=im.crop(box)
 restored=Image.new('RGBA',im.size);restored.paste(cropped,(160,112));assert restored.tobytes()==im.tobytes()
 small=cropped.resize((128,128),Image.Resampling.LANCZOS);pack.paste(small,(i*128,0))
 pose.append(dict(path=path,sha256=sha(path),size=list(im.size),alphaBox=im.getbbox(),logicalCrop=box,runtimeSize=[128,128],margins=[small.getbbox()[0],small.getbbox()[1],128-small.getbbox()[2],128-small.getbbox()[3]]))
fx=[]
for r in manifest['vfx']:
 raw=read(r['raw']);mid=r['splitX']
 for kind,box in [('source',(0,0,mid,raw.height)),('impact',(mid,0,raw.width,raw.height))]:
  part=raw.crop(box);pad=Image.new('RGBA',(part.width+160,part.height+160));pad.paste(part,(80,80));assert pad.tobytes()==read(f"docs/art/candidates/lushu/awakening/vfx-review-v1/{r['phase']}-{kind}-padded.png").tobytes()
for phase in 'ABC':
 for kind in ['source','impact']:
  p=f'docs/art/candidates/lushu/awakening/vfx-review-v1/{phase}-{kind}-padded.png';im=read(p)
  ratio=min(96/im.width,96/im.height);size=tuple(max(1,round(v*ratio)) for v in im.size);small=im.resize(size,Image.Resampling.LANCZOS)
  fx.append(dict(path=p,sha256=sha(p),sourceSize=list(im.size),alphaBox=im.getbbox(),proposed=png_info(small)))
# Exact empty-row / unused-cell packaging only. Values are proposals, not installed descriptors.
policies=[
 ('public/assets/characters/botuo/battleIdle-4f.png',(0,0,160,160),True),
 ('public/assets/characters/lushu/battleBasic-4f.png',(0,10,512,111),False),
 ('public/assets/characters/lushu/battleHeavy-4f.png',(0,31,512,116),False),
 ('public/assets/characters/lushu/battleSpecial-4f.png',(0,10,320,69),False),
 ('public/assets/characters/chiru/battleMove-4f.png',(0,42,640,160),False),
 ('public/assets/characters/jiuweihu/battleKo.png',(0,47,512,485),False),
]
lossless=[]
for p,box,unused in policies:
 im=read(p);out=im.crop(box)
 if unused:
  assert out.tobytes()==im.crop((0,0,160,160)).tobytes()
 else:
  restored=Image.new('RGBA',im.size);restored.paste(out,(box[0],box[1]));assert restored.tobytes()==im.tobytes()
 lossless.append(dict(path=p,sha256=sha(p),sourceSize=list(im.size),crop=box,policy='only displayed F1 retained' if unused else 'only fully zero-alpha outer rows removed; complete RGBA reconstruction exact',proposed=png_info(out),savedBytes=im.width*im.height*4-out.width*out.height*4))
# Phaser setFlipX flips frame pixels about frame center; authored-action origin must mirror too.
mirror=[]
for origin,width in [(.375,208.8),(.5,320*q)]:
 for local in [0,.2,.5,1]:
  right=(local-origin)*width;left=(1-local-(1-origin))*width
  assert abs(right+left)<1e-10
  mirror.append(dict(origin=origin,width=width,localFraction=local,right=right,left=left))
saved=sum(r['savedBytes'] for r in lossless);addition=png_info(pack)['decodedBytes']+sum(r['proposed']['decodedBytes'] for r in fx)
rawPoses=sum(640*480*4 for _ in pose);rawFx=sum(math.prod(r['sourceSize'])*4 for r in fx)
budget=dict(baseline=16775432,hard=16777216,rawPoseDecoded=rawPoses,rawFxDecoded=rawFx,rawTotal=16775432+rawPoses+rawFx,proposedPoseAtlas=png_info(pack),proposedFxDecoded=sum(r['proposed']['decodedBytes'] for r in fx),addition=addition,losslessSavings=saved,proposedAllRequired=16775432-saved+addition,headroom=16777216-(16775432-saved+addition),minimumProposedReserve=131072)
assert budget['headroom']>=budget['minimumProposedReserve']
data=dict(scope='MEASURED SOURCE/IN-MEMORY PACKING CANDIDATE ONLY; NO RUNTIME TEXTURES WRITTEN OR REGISTERED',verifiedHashes=checks,poses=pose,vfx=fx,losslessCandidates=lossless,budget=budget,anchor=dict(sourceCell=[640,480],crop=[160,112,480,432],sourceAnchor=[320,410],croppedAnchor=[160,298],runtimeAnchor=[64,119.2],origin=[.5,298/320],stagePixelsPerReviewPixel=q,stageCanvas=[320*q,320*q],descriptorScale=320*q/72,expectedSkullStageWidth=32*q,previewIdleFootOriginalY=125,installedIdleOriginOriginalY=128*691/724,previewIdleGroundDifferenceStagePx=(125-128*691/724)*144/128),mirrorFormulaChecks=mirror,limitations=['PNG downsampling color/alpha density is deterministic, not pixel-identical to master; visual device QA still required','No real Phaser/browser/GPU upload measured; budget includes estimated RGBA and reservations only','Existing low-alpha noise preserved; no threshold deletion','Existing static/Move/KO mirror origin policy must remain unchanged; horizontal frame crop is only the already displayed centered Botuo F1','No new sprite descriptor or gameplay is installed'])
(ROOT/'docs/verification/M5C_P1_AWAKENING_ASSET_PREFLIGHT.json').write_text(json.dumps(data,indent=2)+'\n')
print(json.dumps(dict(approvedHashes=len(checks),budget=budget,anchor=data['anchor'])))
