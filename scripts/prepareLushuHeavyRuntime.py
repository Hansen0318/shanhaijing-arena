"""Only deterministic runtime derivatives of accepted sources; masters unchanged."""
from pathlib import Path
from PIL import Image
import json, hashlib, shutil
ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT/'docs/art/candidates/lushu/heavy/recovered-review-v1'
PREP = ROOT/'docs/art/candidates/lushu/heavy/runtime-prep-v1'
OUT = ROOT/'public/assets/characters/lushu'
R = Image.Resampling.LANCZOS
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
def visible(im):
    return im.getchannel('A').point(lambda a: 255 if a > 128 else 0).getbbox()
def save(im, path):
    im.save(path)
    check=Image.open(path);check.load();assert check.tobytes()==im.tobytes()
    return {'path':str(path.relative_to(ROOT)), 'width':im.width, 'height':im.height,
            'bytes':path.stat().st_size,'sha256':sha(path),'decodedBytes':im.width*im.height*4}
approval=json.loads((SOURCE/'acceptance.json').read_text())
for r in approval['files']: assert sha(ROOT/r['path'])==r['sha256']
prep=json.loads((PREP/'runtime-prep-manifest.json').read_text())
record=next(r for r in prep['files'] if r['path'].endswith('heavy-4f-128.png'))
assert sha(ROOT/record['path'])==record['sha256']
path=OUT/'battleHeavy-4f.png';shutil.copyfile(ROOT/record['path'],path)
records=[save(Image.open(path).convert('RGBA'),path)]
for source,size,out in [('wind-sweep-raw-v1.png',(112,112),'heavy-wind.png'),('impact-raw-v1.png',(128,86),'heavy-impact.png')]:
    records.append(save(Image.open(SOURCE/source).convert('RGBA').resize(size,R),OUT/out))
old=ROOT/'public/assets/characters/botuo/battleKo.png'
assert sha(old)=='037829ec32333a0179414a9ee8ccb57b4eb3ddb83004aa93aea5c78914fc9c57'
ko=Image.open(old).convert('RGBA');b=ko.getchannel('A').getbbox();assert b==(2,126,512,455)
rect=(0,125,512,456)
assert ko.crop((0,0,512,125)).getchannel('A').getbbox() is None
assert ko.crop((0,456,512,512)).getchannel('A').getbbox() is None
trim=ko.crop(rect);records.append(save(trim,old.with_name('battleKo-trimmed.png')))
atlas=Image.open(OUT/'battleHeavy-4f.png').convert('RGBA');cells=[atlas.crop((i*128,0,(i+1)*128,128)) for i in range(4)]
idle=Image.open(OUT/'battleIdle-static.png').convert('RGBA');ib=visible(idle);fb=visible(cells[3])
# Crouched Heavy height includes pose compression, not a smaller character.
# Use the approved authored-action pixel scale (Basic), retaining one scale for all four cells.
# Compare head/torso at actual display size; never stretch a crouch to Idle's full height.
scale=2.4731182795698925
idle_foot=(ib[3]-691/724*128)*144/128
origin=[.5,112/128-idle_foot/(72*scale)]
assert .05<=scale<=4 and 0<=origin[1]<=1
manifest={'status':'RUNTIME DERIVATIVES / FEEDBACK CORRECTION / PHONE PENDING','sourceAcceptance':str((SOURCE/'acceptance.json').relative_to(ROOT)),
          'files':records,'frames':[{'x':i*128,'y':0,'width':128,'height':128} for i in range(4)],
          'normalization':{'policy':'accepted-action pixel scale, not crouched silhouette height','reference':'P1 Basic accepted runtime scale','sharedAcrossFourFrames':True},
          'origin':origin,'scale':scale,'frameDurationsMs':[200,80,140,180],'coordinateSize':[256,256],
          'blade':{'assetKey':'lushu.heavyWind','offset':[100,35],'size':[230,230],'layer':6},
          'contact':{'assetKey':'lushu.heavyImpact','offset':[-105,-145],'size':[210,140],'layer':7,'attach':'target'},
          'visibleBounds':[visible(c) for c in cells],'idleBounds':ib,
          'koTrim':{'source':str(old.relative_to(ROOT)),'sourceSHA256':sha(old),'rect':rect,'origin':[.5,280/331],'scale':2,'savedDecodedBytes':370688,'allRGBAInsideRectPreserved':True,'fullWidthForExactMirroring':True},
          'requiredDecodedBytes':16748808,'hardLimit':16777216}
(SOURCE/'runtime-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps(manifest,indent=2))
