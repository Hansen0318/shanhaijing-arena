"""Reviewable, lossless packing candidates ONLY. Never writes src/public/approved.
Run from repository root after node docs/verification/P2_SPECIAL_PREFLIGHT/measure.mjs.
"""
from pathlib import Path
from PIL import Image,ImageChops,ImageDraw,ImageFont,ImageOps
import json,hashlib,itertools,math
ROOT=Path(__file__).resolve().parents[3]
REPORT=ROOT/'docs/verification/P2_SPECIAL_PREFLIGHT'
OUT=ROOT/'docs/art/candidates/botuo/special/runtime-pack-v1'
OUT.mkdir(parents=True,exist_ok=True)
REVIEW=ROOT/'docs/art/candidates/botuo/special/composite-review-v1'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def load(p):
 im=Image.open(p).convert('RGBA');im.load();return im
def dump(p,v):p.write_text(json.dumps(v,indent=2,ensure_ascii=False)+'\n')
def bounds(im):
 # Includes RGB under alpha=0; NEVER discard hidden source colors.
 mask=im.getchannel('R')
 for c in im.split()[1:]:mask=ImageChops.lighter(mask,c)
 return mask.getbbox()
def shelf(sizes,gutter=0):
 best=None
 for perm in itertools.permutations(range(len(sizes))):
  for cut in range(1<<(len(sizes)-1)):
   rows=[[]]
   for i,k in enumerate(perm):
    rows[-1].append(k)
    if cut>>i&1:rows.append([])
   width=max(sum(sizes[k][0]+gutter*2 for k in row) for row in rows)
   height=sum(max(sizes[k][1]+gutter*2 for k in row) for row in rows)
   candidate=(width*height,max(width,height),width,height,rows)
   if best is None or candidate[:4]<best[:4]:best=candidate
 _,_,w,h,rows=best;xy={};y=0
 for row in rows:
  x=0
  for k in row:xy[k]=(x+gutter,y+gutter);x+=sizes[k][0]+gutter*2
  y+=max(sizes[k][1]+gutter*2 for k in row)
 return (w,h),xy
def pack(key,im,frames,subdir=''):
 crops=[];meta=[];checks=[]
 for f in frames:
  c=im.crop((f['x'],f['y'],f['x']+f['width'],f['y']+f['height']));b=bounds(c)
  assert b is not None
  crops.append(c.crop(b));meta.append((f,c,b))
 size,xy=shelf([c.size for c in crops]);atlas=Image.new('RGBA',size)
 newframes=[]
 for i,(f,c,b) in enumerate(meta):
  x,y=xy[i];atlas.paste(crops[i],(x,y));old=f.get('trim',[c.width,c.height,0,0])
  n=dict(x=x,y=y,width=crops[i].width,height=crops[i].height,trim=[old[0],old[1],old[2]+b[0],old[3]+b[1]])
  restored=Image.new('RGBA',c.size);restored.paste(crops[i],b[:2]);assert restored.tobytes()==c.tobytes()
  # Whole logical frame and both-facing root-relative coordinates remain exact.
  before=Image.new('RGBA',tuple(old[:2]));before.paste(c,tuple(old[2:]));after=Image.new('RGBA',tuple(old[:2]));after.paste(crops[i],tuple(n['trim'][2:]));assert before.tobytes()==after.tobytes()
  assert ImageOps.mirror(before).tobytes()==ImageOps.mirror(after).tobytes()
  for flip in [False,True]:
   for px,py in [(0,0),(crops[i].width-1,crops[i].height-1)]:
    a=(old[2]+b[0]+px,old[3]+b[1]+py);z=(n['trim'][2]+px,n['trim'][3]+py)
    assert ((old[0]-a[0] if flip else a[0]),a[1])==((old[0]-z[0] if flip else z[0]),z[1])
  checks.append(dict(frame=i,logicalRGBAExact=True,mirrorExact=True,translationOnly=True,allChannelsZeroOutsideCrop=True));newframes.append(n)
 for i,c in enumerate(crops):
  x,y=xy[i];assert atlas.crop((x,y,x+c.width,y+c.height)).tobytes()==c.tobytes()
 target=OUT/subdir/(key.replace('.','-')+'.png');target.parent.mkdir(parents=True,exist_ok=True);atlas.save(target)
 reopened=load(target);assert reopened.tobytes()==atlas.tobytes()
 return dict(key=key,path=str(target.relative_to(ROOT)),width=atlas.width,height=atlas.height,bytes=target.stat().st_size,sha256=sha(target),decodedBytes=atlas.width*atlas.height*4,frames=newframes,checks=checks,gutterPixels=0,rotation=False)
current=json.loads((REPORT/'current-required.json').read_text())
# Validate immutable receipts/manifests/checksums without regenerating reviewed outputs.
validation=[]
for name in ['key-pose-v1','poses-v1','composite-review-v1']:
 folder=REVIEW.parent/name
 checks=json.loads((folder/'SHA256SUMS.json').read_text())
 # Historical inventories can have metadata wrappers; inspect only named file hashes.
 for name,digest in checks.items():
  if isinstance(digest,str) and len(digest)==64 and (folder/name).is_file():
   assert sha(folder/name)==digest,(folder/name);validation.append(str((folder/name).relative_to(ROOT)))
receipt=json.loads((ROOT/'docs/art/approved/botuo/special/poses-v1/acceptance.json').read_text())
for e in receipt['sources']:assert sha(ROOT/e['path'])==e['sha256']
review=json.loads((REVIEW/'review-manifest.json').read_text())
new=[]
logical=[]
for i,e in enumerate(review['poses']):
 im=load(REVIEW/f'F{i+1}-safe-cell.png')
 expected=load(ROOT/e['source']).resize(tuple(e['resizedSize']),Image.Resampling.LANCZOS)
 assert im.crop((*e['xy'],e['xy'][0]+expected.width,e['xy'][1]+expected.height)).tobytes()==expected.tobytes()
 # Full common 200x200 runtime logical cells, with exact zero-only review margin removal.
 cell=im.crop((100,90,300,290));restore=Image.new('RGBA',im.size);restore.paste(cell,(100,90));assert restore.tobytes()==im.tobytes()
 logical.append(cell)
sheet=Image.new('RGBA',(800,200))
for i,c in enumerate(logical):sheet.paste(c,(i*200,0))
body=pack('botuo.specialPoses',sheet,[dict(x=i*200,y=0,width=200,height=200) for i in range(4)])
body.update(reviewLogicalCanvas=[400,320],reviewRoot=[200,274],runtimeLogicalCanvas=[200,200],reviewToRuntimeTranslation=[-100,-90],runtimeRoot=[100,184],origin=[.5,.92],scale=200/72,worldUnitsPerTexel=1,authoringDensity=.126,frameDurationsMs=[160]*4,fps=6.25,duration=.64,loop=False,staticFrame=2,sourcePoses=receipt['sources'])
new.append(body)
for key,name,size in [('botuo.specialActivation','activation-raw-v1.png',(320,260)),('botuo.specialState','mitigation-state-raw-v1.png',(224,234))]:
 source=REVIEW/name;im=load(source).resize(size,Image.Resampling.LANCZOS)
 e=pack(key,im,[dict(x=0,y=0,width=size[0],height=size[1])]);e.update(source=str(source.relative_to(ROOT)),sourceSha256=sha(source),reviewSize=size,worldSize=size,rootOffset=[0,-88],origin=[.5,.5],layer=4,mirror='recipient/caster current facing around actor root');new.append(e)
legacy=[];savings=0;baseline=[]
excluded=['chiru.battleMove','jiuweihu.battleMove','xingxing.battleMove']
for e in current['records']:
 record={k:e[k] for k in ['key','path','width','height','bytes','sha256']};record['decodedBytes']=e['width']*e['height']*4
 record['candidateChanged']=False
 if e['key'] not in excluded:
  im=load(ROOT/'public'/e['path']);frames=e['consumers'][0]['animation']['frames'] if e['consumers'] else [dict(x=0,y=0,width=im.width,height=im.height)]
  # Only generate beneficial packs. Static/effect geometry needs future generic region support.
  dims=[]
  for f in frames:
   b=bounds(im.crop((f['x'],f['y'],f['x']+f['width'],f['y']+f['height'])));dims.append((b[2]-b[0],b[3]-b[1]))
  size,_=shelf(dims)
  if size[0]*size[1]<im.width*im.height:
   p=pack(e['key'],im,frames,'legacy');saved=record['decodedBytes']-p['decodedBytes'];savings+=saved
   p.update(source='public/'+e['path'],sourceSha256=e['sha256'],oldDimensions=[e['width'],e['height']],savedDecodedBytes=saved,originalConsumers=e['consumers'],runtimeDescriptorChange='frame region/trim only; original logical canvas, scale/origin/FPS/duration/loop/staticFrame unchanged')
   legacy.append(p);record.update(candidateChanged=True,**{k:p[k] for k in ['path','width','height','bytes','sha256','decodedBytes']})
 baseline.append(record)
required=baseline+[{k:e[k] for k in ['key','path','width','height','bytes','sha256','decodedBytes']} for e in new]
total=sum(e['decodedBytes'] for e in required);addition=sum(e['decodedBytes'] for e in new);cap=16777216;reserve=131072
assert len(required)==45 and len(set(e['key'] for e in required))==45
assert total+reserve<=cap,(total,addition,savings)
assert all(e['width']<=2048 and e['height']<=2048 and e['bytes']<=4*1024*1024 for e in required)
dump(OUT/'packing-manifest.json',dict(status='CONTRACT REVIEW CANDIDATES ONLY / NOT INSTALLED',newAssets=new,legacyCandidates=legacy,excludedCompletedMovePacks=excluded,provenance='Exact approved review raster; no new resampling below review density; no RGB/alpha edits; every discarded byte zero in all four channels.',limitations=['CPU RGBA/coordinates only, not Phaser raster/GPU proof','No-gutter native frame sampling requires actual browser regression before installation','Static effect/Idle/KO regions require generic logical-frame metadata support; not yet integrated']))
dump(REPORT/'capacity.json',dict(status='MEASURED OFFLINE CANDIDATE FIT / RUNTIME NOT VERIFIED',baselineRequiredKeys=42,baselineDecodedBytes=16622164,hardBytes=cap,reserveBytes=reserve,baselineExtraAfterReserve=23980,legacySavedDecodedBytes=savings,newDecodedBytes=addition,requiredKeys=45,requiredDecodedBytes=total,includingReserve=total+reserve,extraAfterReserve=cap-total-reserve,fullRequired=required,legacyCandidateCount=len(legacy),noRequiredKeysRemoved=True,noCapIncrease=True,noResolutionReduction=True,completedMovePacksUnchanged=excluded,uploadPolicy='Cold new scene only; dispose old presenter/texture ownership then cache.trim(0); replacements reuse same 42 logical keys. Never upload old+new representation simultaneously.',cachePolicy='16MiB separately for decoded cache and scene. Concurrent request reservations include all 45 assets; their sum is <=cap-reserve. Max transport concurrency2. Reject failed required key; no fallback acceptance.',limits='Not combined browser RAM/GPU memory. Decoders, driver allocations, backbuffers and temporary decode working memory unmeasured. Existing runtime not modified.'))
dump(REPORT/'packing-checks.json',dict(approvedInventoryHashesChecked=len(validation),newLogicalFrameRoundTrips=sum(len(e['checks']) for e in new),legacyLogicalFrameRoundTrips=sum(len(e['checks']) for e in legacy),bothFacingExact=True,sourcePNGsUnmodified=True,phaserBrowserRaster='NOT RUN / REQUIRED LATER',runtimeIntegration=False,build=False,deployment=False))
print(json.dumps(dict(saved=savings,addition=addition,total=total,reserve=reserve,extra=cap-total-reserve,legacyCandidates=len(legacy)),indent=2))
