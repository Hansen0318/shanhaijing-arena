"""Source-preserving packing feasibility only, never public/runtime integration."""
from pathlib import Path
from PIL import Image, ImageDraw
import hashlib, json

ROOT=Path(__file__).resolve().parents[1]
SRC=ROOT/'docs/art/candidates/botuo/basic/composite-review-v1'
OUT=ROOT/'docs/verification/P2_BASIC_RUNTIME_PACK_PROBE'
OUT.mkdir(exist_ok=True)
crop=(96,136,304,296)  # 208x160, symmetric horizontal trim around original x200.
cells=[];records=[]
for n in ['F1','F2','F3','F4']:
 p=SRC/(n+'-safe-cell.png');im=Image.open(p).convert('RGBA');trim=im.crop(crop)
 reconstructed=Image.new('RGBA',im.size);reconstructed.paste(trim,crop[:2])
 assert reconstructed.tobytes()==im.tobytes(),n+' crop must retain every RGBA pixel, including invisible RGB'
 small=trim.resize((78,60),Image.Resampling.LANCZOS);cells.append(small)
 records.append({'frame':n,'source':str(p.relative_to(ROOT)),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),
                 'losslessCrop':crop,'cropReconstructionExactRGBA':True,'downsample':[78,60],
                 'downsampleIsLossyNotPixelIdentical':True})
strip=Image.new('RGBA',(312,60))
for i,cell in enumerate(cells):strip.paste(cell,(78*i,0))
strip.save(OUT/'poses-4f-PLANNING.png')
for name,size,out in [('source-force-raw-v1.png',(48,36),'source-PLANNING.png'),('target-impact-raw-v1.png',(48,42),'contact-PLANNING.png')]:
 im=Image.open(SRC/name).convert('RGBA');im.resize(size,Image.Resampling.LANCZOS).save(OUT/out)
files=[]
for name in ['poses-4f-PLANNING.png','source-PLANNING.png','contact-PLANNING.png']:
 p=OUT/name
 with Image.open(p) as im:files.append({'path':str(p.relative_to(ROOT)),'size':list(im.size),'bytes':p.stat().st_size,
                                     'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'decodedBytes':im.width*im.height*4})
assert sum(f['decodedBytes'] for f in files)==89856
# Equal world-size comparison: accepted review packing above, low-density probe below.
qa=Image.new('RGB',(832,400),'#172533');d=ImageDraw.Draw(qa)
for i,n in enumerate(['F1','F2','F3','F4']):
 original=Image.open(SRC/(n+'-safe-cell.png')).convert('RGBA').crop(crop)
 original=Image.alpha_composite(Image.new('RGBA',original.size,'#172533'),original)
 candidate=Image.alpha_composite(Image.new('RGBA',(208,160),'#172533'),cells[i].resize((208,160),Image.Resampling.BILINEAR))
 qa.paste(original.convert('RGB'),(208*i,35));qa.paste(candidate.convert('RGB'),(208*i,230))
 d.text((208*i+8,10),n+' accepted review pixels',fill='white')
 d.text((208*i+8,205),n+' low-density planning probe',fill='white')
qa.save(OUT/'density-comparison.png')
manifest={'status':'LOW-DENSITY PROBE REJECTED BY VISUAL SELF-REVIEW / NOT INTEGRATED',
 'records':records,'files':files,'additionalDecodedBytes':89856,
 'proposedWorldCell':[208,160],'proposedCoordinateSize':[208,160],
 'displayScale':208/72,'originForSameVisibleFootAsAcceptedIdle':[39/208,154.2/160],
 'groundRationale':'Accepted runtime Idle visible foot140 vs origin158 at0.9 => foot at actorY-16.2; proposed action pivot retains that offset. Not the preview-visible-floor transform.',
 'mirrorRationale':'Crop is symmetric about original canvas x200; shared action renderer complements originX on flip. Actual presenter both-facing proof still required.',
 'limitations':['Crop pixel retention verified; low-density final downsample visibly softens the face/outlines in the same-size comparison and is NOT selected for integration.',
               'This is an engineering feasibility comparison, not replacement art or a new visual acceptance demand.',
               'Renderer, palette/texture registration, contact alignment and phone quality remain later validation.']}
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps({'decoded':89856,'losslessCropRetention':True,'files':files},indent=2))
