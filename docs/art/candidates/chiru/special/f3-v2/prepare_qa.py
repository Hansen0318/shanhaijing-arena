"""Static candidate QA only; preserves original bytes and adds transparent padding.
Run from any directory with Python/Pillow. No runtime assets or gameplay changes.
"""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
import hashlib, json

OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[5]
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def rel(p): return str(p.relative_to(ROOT))
def read(p):
    with Image.open(p) as im:
        im.verify()
    im = Image.open(p)
    im.load()  # strict full decode, never LOAD_TRUNCATED_IMAGES
    assert im.mode == 'RGBA', p
    return im
def report(im):
    a=im.getchannel('A'); b=a.getbbox()
    v=a.point(lambda x:255 if x>16 else 0).getbbox()
    return dict(dimensions=list(im.size), mode=im.mode, fullDecode='PASS', alphaRange=a.getextrema(), alphaBounds=b, visibleAlpha16Bounds=v, margins=[b[0],b[1],im.width-b[2],im.height-b[3]])

refs = [ROOT/p for p in [
    'public/assets/characters/chiru/battleIdle.png',
    'public/assets/characters/chiru/identity.png',
    'docs/art/candidates/chiru/basic/f3-v2/basic-f3.png',
    'docs/art/candidates/chiru/heavy/f3-v3/heavy-f3.png',
]]
expected=['a965600f0b9e873e652a6d6048a89d38a0d078d92cb8c2622cdc003ae4646d5d','304a96ea0e9a215ad387708935e80bbd915722d5743ab2d8d4422e2963496a0a','503eec8bb7f959aa26b07a8076eeb8f686f4d4698bead83b28ed8392d109e4d5','8943837f65e321bc2bd7290280af829801e9735cf3e3033300ba991314e694f6']
for p,h in zip(refs,expected):
    assert sha(p)==h, p
    read(p)
source=OUT/'originals/special-f3.png'
im=read(source)
pad=128
padded=Image.new('RGBA',(im.width+pad*2,im.height+pad*2))
padded.paste(im,(pad,pad))
assert padded.crop((pad,pad,pad+im.width,pad+im.height)).tobytes()==im.tobytes()
padded.save(OUT/'special-f3.png')
candidate=read(OUT/'special-f3.png')
assert min(report(candidate)['margins'])>=128
assert ImageOps.mirror(ImageOps.mirror(candidate)).tobytes()==candidate.tobytes()

# Author-inspected landmark coordinates in ORIGINAL image, not padded canvas.
# Same reference scale/chest/hover policy as accepted Basic/Heavy review.
lm=dict(chest=[750,540], eye=[711,337], hover=[770,1223], orb=[1008,373])
scale=.13
small=im.resize(tuple(round(n*scale) for n in im.size),Image.Resampling.LANCZOS)
xy=[158-round(lm['chest'][0]*scale),203-round(lm['hover'][1]*scale)]
cell=Image.new('RGBA',(320,260));cell.paste(small,tuple(xy))
assert cell.crop((xy[0],xy[1],xy[0]+small.width,xy[1]+small.height)).tobytes()==small.tobytes()
assert min(report(cell)['margins'])>=24
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',16)
compare=[]
for name,p in [('IDLE',ROOT/'docs/art/candidates/chiru/heavy/composite-review-v1/approved-idle-return-cell.png'),('BASIC',ROOT/'docs/art/candidates/chiru/basic/composite-review-v1/F3-safe-cell.png'),('HEAVY',ROOT/'docs/art/candidates/chiru/heavy/composite-review-v1/F3-safe-cell.png')]:
    compare.append((name,read(p)))
compare.append(('SPECIAL CANDIDATE',cell))
for mode,bg,fg in [('dark','#152630','white'),('light','#f1f1e8','#17232a')]:
    board=Image.new('RGB',(1280,300),bg)
    d=ImageDraw.Draw(board)
    for i,(name,c) in enumerate(compare):
        board.paste(c,(i*320,28),c)
        d.text((i*320+12,8),name,fill=fg,font=font)
        d.line((i*320,231,(i+1)*320-1,231),fill='#71868c')
    board.save(OUT/f'qa-scale-{mode}.png')
    # Light/dark full-art QA, no correction, recoloring or alpha masking.
    view=Image.new('RGB',candidate.size,bg);view.paste(candidate,(0,0),candidate)
    view.save(OUT/f'qa-alpha-{mode}.png')
# Explicit 48-pixel silhouette-height inspection, static only (not device proof).
b=im.getchannel('A').point(lambda x:255 if x>16 else 0).getbbox()
ratio=48/(b[3]-b[1])
tiny=im.resize(tuple(round(n*ratio) for n in im.size),Image.Resampling.LANCZOS)
phone=Image.new('RGB',(390,110),'#152630');phone.paste(tiny,(170,30),tiny)
ImageDraw.Draw(phone).text((10,8),'STATIC 48px visible-height check',font=font,fill='white')
phone.save(OUT/'qa-390-static.png')
manifest=dict(status='CANDIDATE / PLAYER F3 REVIEW PENDING',recoveredHead='7c72f4c73f47df866b562c9167e7f110b22360e1',mode='built-in imagegen',original=dict(path=rel(source),sha256=sha(source),**report(im)),candidate=dict(path=rel(OUT/'special-f3.png'),sha256=sha(OUT/'special-f3.png'),**report(candidate)),paddingOnlyOffset=[128,128],originalRGBARoundTrip=True,mirrorRoundTrip=True,references={rel(p):sha(p) for p in refs},promptSha256=sha(OUT/'prompt.txt'),staticScaleCheck=dict(scale=scale,landmarks=lm,translation=xy,chestX=158,hoverBaseline=203,**report(cell)),visualSelfReview='Right-facing; orb/ring screen-right over upturned palm; visible-side turquoise earring screen-left; rear hand over chest; bent vertical forearm, upright inward-curved hover body. Different from Basic horizontal shot and Heavy two-hand push. No independent spell VFX. Author inspection only; player approval pending.',limitations=['Source faint nonzero-alpha fringe reaches left canvas edge; preserved intact, candidate adds 128px clear padding on every side. Visible alpha>16 silhouette fully inside original.', 'Prompt requested 8% native padding; generator did not meet it. Packaging padding only, no silhouette repaint/removal.', 'Landmarks are author-inspected review coordinates; final accepted-pose animation normalization remains later Gate.', 'Static comparisons are not runtime/device proof, no full VFX or spectacle comparison at this Gate.'],productionChanged=False,runtimeIntegrated=False,deployed=False,nextGate='Present this single F3; wait for explicit player approval before any other poses/VFX/GIF/runtime/deploy.')
(OUT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
paths=[p for p in sorted(OUT.rglob('*')) if p.is_file() and p.name!='checksums.sha256']
(OUT/'checksums.sha256').write_text(''.join(f'{sha(p)}  {p.relative_to(OUT)}\n' for p in paths))
print(json.dumps(dict(original=manifest['original'],candidate=manifest['candidate'],staticScaleCheck=manifest['staticScaleCheck'],referenceHashes='PASS',roundTrips='PASS'),ensure_ascii=False,indent=2))
