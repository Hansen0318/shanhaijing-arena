"""Art-only reproducible QA. Run from any cwd; needs Pillow. No product changes."""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont, ImageFile
import hashlib, json

OUT=Path(__file__).resolve().parent
ROOT=OUT.parents[5]
ImageFile.LOAD_TRUNCATED_IMAGES=False
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def rel(p): return str(p.relative_to(ROOT))
def read(p):
    with Image.open(p) as im: im.verify()
    im=Image.open(p); im.load(); assert im.mode=='RGBA',p
    return im
def info(im):
    a=im.getchannel('A'); b=a.getbbox()
    return dict(size=im.size,mode=im.mode,strictFullDecode=True,alphaRange=a.getextrema(),alphaBounds=b,visibleAlpha16Bounds=a.point(lambda x:255 if x>16 else 0).getbbox(),margins=[b[0],b[1],im.width-b[2],im.height-b[3]])
refs=[
 'public/assets/characters/chiru/battleIdle.png',
 'public/assets/characters/chiru/identity.png',
 'docs/art/candidates/chiru/basic/f3-v2/basic-f3.png',
 'docs/art/candidates/chiru/heavy/f3-v3/heavy-f3.png',
 'docs/art/candidates/chiru/special/f3-v3/special-f3.png']
expected=['a965600f0b9e873e652a6d6048a89d38a0d078d92cb8c2622cdc003ae4646d5d','304a96ea0e9a215ad387708935e80bbd915722d5743ab2d8d4422e2963496a0a','503eec8bb7f959aa26b07a8076eeb8f686f4d4698bead83b28ed8392d109e4d5','8943837f65e321bc2bd7290280af829801e9735cf3e3033300ba991314e694f6','1ca80dc4237cb43c810d465cc6be9f67df1d12f293eab8a359cdb0d09c273ac8']
for p,h in zip(refs,expected): assert sha(ROOT/p)==h; read(ROOT/p)
im=read(OUT/'originals/awakening-f3.png')
pad=128
candidate=Image.new('RGBA',(im.width+2*pad,im.height+2*pad)); candidate.paste(im,(pad,pad))
assert candidate.crop((pad,pad,pad+im.width,pad+im.height)).tobytes()==im.tobytes()
candidate.save(OUT/'awakening-f3.png')
candidate=read(OUT/'awakening-f3.png')
assert min(info(candidate)['margins'])>=128
assert ImageOps.mirror(ImageOps.mirror(candidate)).tobytes()==candidate.tobytes()
# Author-inspected anatomical landmarks in ORIGINAL pixels. Same .13 density
# as accepted Special F3, shared chestX158/hoverY203; never fit the highest orb.
lm=dict(chest=[770,565],eye=[690,385],hover=[745,1230],orb=[1045,175],leftPalm=[322,225],rightPalm=[1035,290])
scale=.13
small=im.resize(tuple(round(n*scale) for n in im.size),Image.Resampling.LANCZOS)
xy=(158-round(lm['chest'][0]*scale),203-round(lm['hover'][1]*scale))
assert min(xy)>=0 and xy[0]+small.width<320 and xy[1]+small.height<260
cell=Image.new('RGBA',(320,260)); cell.paste(small,xy)
assert cell.crop((*xy,xy[0]+small.width,xy[1]+small.height)).tobytes()==small.tobytes()
assert min(info(cell)['margins'])>=24
cell.save(OUT/'F3-safe-cell.png')
comparisons=[('IDLE','docs/art/candidates/chiru/heavy/composite-review-v1/approved-idle-return-cell.png'),('BASIC','docs/art/candidates/chiru/basic/composite-review-v1/F3-safe-cell.png'),('HEAVY','docs/art/candidates/chiru/heavy/composite-review-v1/F3-safe-cell.png'),('SPECIAL','docs/art/candidates/chiru/special/composite-review-v1/F3-safe-cell.png')]
rows=[(name,read(ROOT/p)) for name,p in comparisons]+[('AWAKENING CANDIDATE',cell)]
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',15)
for name,bg,fg in [('dark','#152630','white'),('light','#f1f1e8','#17232a')]:
    board=Image.new('RGB',(1600,300),bg); d=ImageDraw.Draw(board)
    for i,(label,c) in enumerate(rows):
        board.paste(c,(i*320,28),c); d.text((i*320+8,8),label,font=font,fill=fg)
        d.line((i*320,231,(i+1)*320-1,231),fill='#71868c')
    board.save(OUT/f'qa-scale-{name}.png')
    view=Image.new('RGB',candidate.size,bg); view.paste(candidate,(0,0),candidate); view.save(OUT/f'qa-alpha-{name}.png')
    mirror=ImageOps.mirror(cell)
    sides=Image.new('RGB',(640,290),bg); sides.paste(cell,(0,25),cell); sides.paste(mirror,(320,25),mirror)
    ImageDraw.Draw(sides).text((8,5),'CANONICAL RIGHT / EXACT LEFT MIRROR',font=font,fill=fg)
    sides.save(OUT/f'qa-mirror-{name}.png')
phone=Image.new('RGB',(390,120),'#152630')
# Uniform reduction of the entire common cell, not independent actor enlargement.
mini=cell.resize((160,130),Image.Resampling.LANCZOS)
phone.paste(mini,(115,-10),mini); phone.save(OUT/'qa-390-static.png')
manifest=dict(status='CANDIDATE / PLAYER F3 REVIEW PENDING',mode='built-in imagegen',recoveredHead='3ae6d679940bcfa90e8ca9359db5385a8aeeb53c',preGenerationCheckpoint='b4a1ef2999a5c87f60d3c756a92021afaa591945',original=dict(path=rel(OUT/'originals/awakening-f3.png'),sha256=sha(OUT/'originals/awakening-f3.png'),**info(im)),candidate=dict(path=rel(OUT/'awakening-f3.png'),sha256=sha(OUT/'awakening-f3.png'),**info(candidate)),paddingOffset=[128,128],fullRGBARoundTrip=True,mirrorRoundTrip=True,references=dict(zip(refs,expected)),generationReferences=[refs[0],refs[1],refs[4]],comparisonCells={p:sha(ROOT/p) for _,p in comparisons},promptSha256=sha(OUT/'prompt.txt'),staticScaleCheck=dict(scale=scale,landmarks=lm,translation=xy,chestX=158,hoverBaseline=203,scaledRGBARoundTrip=True,**info(cell)),limitations=['Native requested12% padding not achieved; added transparent128px only, preserving EVERY original pixel.','Landmarks and likeness/accessory/scale are author visual self-review, not independent review/player approval.','Static comparison only; not GIF/runtime/phone testing or completed VFX spectacle escalation.','Original tiny faint pixels retained; no alpha removal or recoloring.'],visualSelfReview='Both arms high V; palms on opposite sides above eyes, forward orb screen RIGHT; visible-side cyan earring retained; head faces RIGHT. Body-only distinct from Basic horizontal thrust, Heavy bent forward push, Special one high/one low. Same .13 anatomical review scale and common chest/hover placement; broad original fins, no new VFX.',productionChanged=False,runtimeIntegrated=False,deployed=False,nextGate='Present this ONE F3 and wait for explicit player art approval. No later poses/VFX/GIF/runtime/deploy/Passive or new acceptance.')
(OUT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
for p in OUT.rglob('*.png'):
    with Image.open(p) as check: check.verify()
    with Image.open(p) as check: check.load()
paths=[p for p in sorted(OUT.rglob('*')) if p.is_file() and p.name!='checksums.sha256']
(OUT/'checksums.sha256').write_text(''.join(f'{sha(p)}  {p.relative_to(OUT)}\n' for p in paths))
print(json.dumps(dict(original=manifest['original'],candidate=manifest['candidate'],scale=manifest['staticScaleCheck'],references='5 PASS',roundTrips='PASS'),indent=2))
