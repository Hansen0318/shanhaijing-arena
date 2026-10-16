"""Deterministic review layout only; never edits or overwrites pose masters."""
from pathlib import Path
from PIL import Image, ImageChops, ImageDraw, ImageFont
import hashlib, json

ROOT = Path(__file__).resolve().parents[5]
HERE = Path(__file__).resolve().parent
SCALE = .30
PANELS = [
 ('F1 - Windup', HERE/'F1-windup-v1.png'),
 ('F2 - Strike', HERE/'F2-strike-v1.png'),
 ('F3 - Selected A', ROOT/'docs/art/approved/lushu/heavy/F3-contact-selected-A.jpeg'),
 ('F4 - Recovery', HERE/'F4-recovery-v1.png'),
]
EXPECTED = [
 'b0b86d2a493c843e99fcc9156bc239490b653a39bc114869f19e94a025170b5e',
 '91fd3b2635be9446105ddb9c1ce130e39ddb4712e9b7f2a7fbb6aafc8f985e26',
 'bd58b7bb4aa4758735d1ec74e65c5ca206836e39b397b6ce38fd4af02cacc5e2',
 'ebcf442bc5cb69c9f13760ff7bbc7a5705bda83cbf3a3bf991f61721ce7fdfa6',
]
proof = Image.new('RGB', (2160, 530), '#ffffff')
draw = ImageDraw.Draw(proof)
font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 24)
records = []
for n, (label, path) in enumerate(PANELS):
 assert hashlib.sha256(path.read_bytes()).hexdigest() == EXPECTED[n], 'Pose source changed: '+str(path)
 im = Image.open(path); im.load()
 if im.mode == 'RGBA':
  a = im.getchannel('A')
  visible = a.point(lambda v: 255 if v > 128 else 0).getbbox()
  alpha = a.getbbox()
 else:
  # JPEG foreground bounds are for placement only. No pixels are removed.
  visible = ImageChops.difference(im.convert('RGB'), Image.new('RGB', im.size, 'white')).convert('L').point(lambda v: 255 if v > 32 else 0).getbbox()
  alpha = None
 full = im.convert('RGBA').resize((round(im.width*SCALE), round(im.height*SCALE)), Image.Resampling.LANCZOS)
 x = n*540+(540-full.width)//2
 y = 440-round(visible[3]*SCALE)
 assert x >= n*540 and x+full.width <= (n+1)*540 and y >= 70 and y+full.height <= 490
 tile = Image.new('RGBA', proof.size, 'white')
 tile.alpha_composite(full, (x,y))
 # Place just this panel; alpha is composited correctly onto white, not ignored.
 proof.paste(tile.convert('RGB').crop((n*540,70,(n+1)*540,490)), (n*540,70))
 draw.text((n*540+22,22),label,font=font,fill='#152130')
 draw.line((n*540+20,442,n*540+520,442),fill='#c1c8cd',width=1)
 draw.line(((n+1)*540-1,0,(n+1)*540-1,490),fill='#dce1e5',width=1)
 records.append({'label':label,'path':str(path.relative_to(ROOT)),'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'width':im.width,'height':im.height,'bytes':path.stat().st_size,'mode':im.mode,'alphaBBox':alpha,'visibleBoundsForPlacementOnly':visible,'previewScale':SCALE,'translation':[x,y]})
draw.text((22,495),'POSE REVIEW ONLY - F3 selected; F1/F2/F4 pending. No VFX / timing / runtime approval.',font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',18),fill='#4a5560')
out=HERE/'four-pose-review-v1.png'
tmp=out.with_suffix('.tmp'); proof.save(tmp,format='PNG')
check=Image.open(tmp);check.load();assert check.tobytes()==proof.tobytes();tmp.replace(out)
(HERE/'four-pose-review-layout-v1.json').write_text(json.dumps({'status':'PLAYER FOUR-POSE REVIEW PENDING / NOT A SPRITE STRIP','scalePolicy':'uniform .30 full-canvas preview scale, common visible foot baseline440; no source cropping/deletion/redraw','files':records,'reviewImage':{'path':str(out.relative_to(ROOT)),'sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'bytes':out.stat().st_size}},indent=2)+'\n')
print(json.dumps({'review':str(out.relative_to(ROOT)),'files':records},indent=2))
