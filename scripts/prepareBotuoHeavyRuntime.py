"""Exact review-density Heavy pack and lossless per-frame blank-space packing.

Approved masters/review files and legacy source PNGs are immutable inputs.
"""
from pathlib import Path
from PIL import Image
import hashlib,json,re,subprocess
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/assets/botuo-heavy-runtime-v1';OUT.mkdir(exist_ok=True)
REVIEW=ROOT/'docs/art/candidates/botuo/heavy/composite-review-v1'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def read(p):return Image.open(p).convert('RGBA')
def bounds(im):
    boxes=[b.getbbox() for b in im.split() if b.getbbox()]
    return min(b[0] for b in boxes),min(b[1] for b in boxes),max(b[2] for b in boxes),max(b[3] for b in boxes)

# Use frozen pre-integration descriptors and source paths so regeneration never
# recursively packs its own derivatives or folds in unrelated catalog changes.
inputs=ROOT/'docs/verification/P2_HEAVY_PACK_INPUTS.json'
if not inputs.exists():
    catalog=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {rosterCatalog} from './src/roster/catalog.js';console.log(JSON.stringify(rosterCatalog));"],cwd=ROOT,text=True))
    paths=dict(re.findall(r"key:'([^']+)',type:'image',path:'([^']+)'",(ROOT/'src/assets/manifest.js').read_text()))
    rows=[]
    for cid in ['P3','P4','P5']:
        d=catalog[cid]['animationDescriptors']['battleMove'];source=ROOT/'public'/paths[d['source']]
        rows.append(dict(character=cid,key=d['source'],input=str(source.relative_to(ROOT)),inputSha256=sha(source),descriptor=d))
    inputs.write_text(json.dumps(rows,indent=2)+'\n')
legacy=[];mapping={};saved=0
for entry in json.loads(inputs.read_text()):
    source=ROOT/entry['input'];assert sha(source)==entry['inputSha256'];im=read(source)
    cells=[];frames=[];x=0
    for f in entry['descriptor']['frames']:
        logical=im.crop((f['x'],f['y'],f['x']+f['width'],f['y']+f['height']));l,t,r,b=bounds(logical)
        box=(max(0,l-1),max(0,t-1),min(logical.width,r+1),min(logical.height,b+1))
        cell=logical.crop(box);restored=Image.new('RGBA',logical.size);restored.paste(cell,box[:2]);assert restored.tobytes()==logical.tobytes()
        frames.append(dict(x=x,y=0,width=cell.width,height=cell.height,trim=[logical.width,logical.height,*box[:2]]))
        cells.append(cell);x+=cell.width
    packed=Image.new('RGBA',(x,max(c.height for c in cells)));x=0
    for cell in cells:packed.paste(cell,(x,0));x+=cell.width
    output=OUT/(entry['key'].replace('.','-')+'.png');packed.save(output)
    saved+=(im.width*im.height-packed.width*packed.height)*4
    mapping[entry['key']]=frames
    legacy.append({**entry,'output':str(output.relative_to(ROOT)),'sha256':sha(output),'width':packed.width,'height':packed.height,'bytes':output.stat().st_size,'frames':frames})

# Accepted preview cells already have uniform authored density and foot support.
# Keep four equal cells and generous safety margin; no extra image resize.
crop=(93,123,268,285);w,h=crop[2]-crop[0],crop[3]-crop[1]
strip=Image.new('RGBA',(w*4,h));sources=[]
for i in range(4):
    p=REVIEW/f'F{i+1}-safe-cell.png';im=read(p);cell=im.crop(crop)
    restored=Image.new('RGBA',im.size);restored.paste(cell,crop[:2]);assert restored.tobytes()==im.tobytes()
    strip.paste(cell,(i*w,0));sources.append(str(p.relative_to(ROOT)))
poses=OUT/'botuo-heavyPoses.png';strip.save(poses)
new=[dict(key='botuo.heavyPoses',output=str(poses.relative_to(ROOT)),width=strip.width,height=strip.height,bytes=poses.stat().st_size,sha256=sha(poses))]
effects=[]
for filename,size,box,key in [('source-pressure-raw-v1.png',(230,154),(0,5,230,149),'botuo.heavySource'),('target-impact-raw-v1.png',(210,168),(3,4,207,165),'botuo.heavyContact')]:
    source=REVIEW/filename;review=read(source).resize(size,Image.Resampling.LANCZOS);cell=review.crop(box)
    restored=Image.new('RGBA',review.size);restored.paste(cell,box[:2]);assert restored.tobytes()==review.tobytes()
    output=OUT/(key.replace('.','-')+'.png');cell.save(output)
    record=dict(key=key,source=str(source.relative_to(ROOT)),sourceSha256=sha(source),reviewSize=size,crop=box,output=str(output.relative_to(ROOT)),width=cell.width,height=cell.height,bytes=output.stat().st_size,sha256=sha(output))
    new.append(record);effects.append(record)
action=dict(animation=dict(source='botuo.heavyPoses',frames=[dict(x=i*w,y=0,width=w,height=h)for i in range(4)],duration=.64,loop=False,staticFrame=2,origin=[42/w,151/h],scale=w/72),frameDurationsMs=[160,160,160,160],impactFrame=2,coordinateSize=[w,h],blade=dict(assetKey='botuo.heavySource',offset=[30,1],size=[230,144],layer=4,startMs=160,holdAfterResolveMs=280),contact=dict(assetKey='botuo.heavyContact',offset=[-102,-152],size=[204,161],layer=6,attach='target',retainOnNextCast=True,durationMs=280))
(ROOT/'src/assets/framePacking.js').write_text('// Lossless native-Phaser trim; original logical cells and pivots retained.\nexport const runtimeFramePacking='+json.dumps(mapping,indent=2)+';\nexport function repackAnimationFrames(input){const frames=runtimeFramePacking[input.source];return frames?{...input,frames}:input;}\n')
# Restore the shared final frame pass after an upstream Basic row-pack rebuild.
# Idempotent: row calibration runs first, native logical-frame trim runs last.
packing=ROOT/'src/assets/runtimePacking.js';packing_text=packing.read_text()
if "import {repackAnimationFrames}" not in packing_text:
    packing_text="import {repackAnimationFrames} from './framePacking.js';\n"+packing_text
packing_text=packing_text.replace('if(!p)return input;', 'if(!p)return repackAnimationFrames(input);')
packing_text=packing_text.replace('return {...input,frames:input.frames.map', 'return repackAnimationFrames({...input,frames:input.frames.map')
packing_text=packing_text.replace('Math.max(w,p.oldHeight)};', 'Math.max(w,p.oldHeight)});')
assert 'if(!p)return repackAnimationFrames(input);' in packing_text
assert 'return repackAnimationFrames({...input,frames:input.frames.map' in packing_text
packing.write_text(packing_text)
(ROOT/'src/assets/botuoHeavyRuntime.js').write_text('// Source-preserving accepted Heavy review geometry; combat timing is not owned here.\nexport const botuoHeavyAction='+json.dumps(action,indent=2)+';\n')
manifest=ROOT/'src/assets/manifest.js';text=manifest.read_text()
for entry in new+legacy:
    key=entry['key'];path=str(Path(entry['output']).relative_to('public'))
    value="{key:'%s',type:'image',path:'%s',width:%d,height:%d,bytes:%d,fallback:'%s'}"%(key,path,entry['width'],entry['height'],entry['bytes'],'placeholder.vfx'if key.endswith(('Source','Contact'))else'placeholder.battle')
    pattern=r"\{key:'"+re.escape(key)+r"',type:'image',path:'[^']+',width:\d+,height:\d+,bytes:\d+,fallback:'[^']+'\}"
    if re.search(pattern,text):text=re.sub(pattern,lambda _:value,text)
    else:text=text.replace('const entries=[','const entries=[\n '+value+',')
manifest.write_text(text)
report=dict(status='SOURCE-PRESERVING RUNTIME PACK / ENGINEERING IN PROGRESS',legacy=legacy,poses=dict(output=str(poses.relative_to(ROOT)),sources=sources,crop=crop,sha256=sha(poses)),effects=effects,newAssets=new,savedDecodedBytes=saved,additionDecodedBytes=sum(e['width']*e['height']*4 for e in new),action=action,policy='Original images/GIFs unchanged. Legacy complete RGBA reconstructs exactly per logical frame; native trim owns original position, scale and mirroring. Heavy exact accepted safe-cell raster, effects exact accepted review resize then zero-RGBA crop. No source regeneration, budget increase or clarity reduction.')
(ROOT/'docs/verification/P2_HEAVY_RUNTIME_PACK.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:report[k]for k in ['savedDecodedBytes','additionDecodedBytes']},indent=2))
