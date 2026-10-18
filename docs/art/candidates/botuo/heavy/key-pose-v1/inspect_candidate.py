"""Read-only source inspection; creates QA composites, never edits the master."""
from pathlib import Path
from PIL import Image, ImageDraw
import hashlib, json

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[5]
MASTER = HERE / 'F3-contact-master.png'
im = Image.open(MASTER)
im.load()
assert im.mode == 'RGBA', im.mode
alpha = im.getchannel('A')
bbox = alpha.getbbox()
assert bbox
# Master retains alpha1 at its left border. Preserve every RGBA pixel and
# add transparent padding for review; never threshold/erase source noise.
original = im.copy()
pad = 40
padded = Image.new('RGBA', (im.width + 2*pad, im.height + 2*pad))
padded.paste(original, (pad, pad))
padded.save(HERE / 'F3-contact-padded.png')
assert padded.crop((pad, pad, pad+im.width, pad+im.height)).tobytes() == original.tobytes()
assert padded.getchannel('A').getbbox() == tuple(v+pad for v in bbox)
hist = alpha.histogram()
refs = ['identity.png', 'portrait.png', 'battleIdle.png', 'battleIdle-4f.png', 'battleMove-4f.png', 'battleKo.png', 'battleKo-trimmed.png']
def info(path):
    data = path.read_bytes()
    with Image.open(path) as p:
        p.load()
        return {'path': str(path.relative_to(ROOT)), 'sha256': hashlib.sha256(data).hexdigest(), 'bytes': len(data), 'size': list(p.size), 'mode': p.mode}
evidence = {
    'status': 'ART CANDIDATE / PLAYER REVIEW PENDING',
    'source': info(MASTER),
    'references': [info(ROOT / 'public/assets/characters/botuo' / f) for f in refs],
    'current_runtime_idle': info(ROOT / 'public/assets/runtime-packing-v1/botuo-battleIdle.png'),
    'alpha': {'extrema': list(alpha.getextrema()), 'nonzero_bbox_exclusive': list(bbox), 'alpha_gt_64_bbox_exclusive': list(alpha.point(lambda a: 255 if a > 64 else 0).getbbox()), 'transparent_pixels': hist[0], 'opaque_pixels': hist[255], 'low_alpha_1_to_8_pixels': sum(hist[1:9]), 'master_outer_edges_clear': False, 'left_border_max_alpha': alpha.crop((0,0,1,im.height)).getextrema()[1]},
    'padding': {'path': info(HERE / 'F3-contact-padded.png'), 'pixels_each_side': pad, 'RGBA_roundtrip_exact': True, 'outer_edges_clear': True, 'scope': 'Review safety only; no runtime normalization or world-origin proof.'},
    'scope': 'PNG/alpha/bounds/reference hashes only; no runtime, player acceptance, GIF or phone proof. Low-alpha source pixels are preserved, not cleaned.',
}
# QA derivative only: full-canvas light/dark and silhouette-height 144px samples.
im = padded
board = Image.new('RGB', (1080, 660), '#666666')
d = ImageDraw.Draw(board)
for x, bg, label in [(0, '#eeeeee', 'LIGHT'), (540, '#182029', 'DARK')]:
    board.paste(bg, (x, 0, x + 540, 660))
    d.text((x + 15, 12), label + ' / CANDIDATE, NOT APPROVED', fill='#b06030')
    thumb = im.copy()
    thumb.thumbnail((520, 400))
    board.paste(thumb, (x + (540-thumb.width)//2, 44), thumb)
    # Crop only for review, do not use as runtime or authored frame derivative.
    full = im.crop(alpha.point(lambda a: 255 if a > 64 else 0).getbbox())
    small = full.resize((round(full.width * 144 / full.height), 144), Image.Resampling.LANCZOS)
    board.paste(small, (x + (540-small.width)//2, 475), small)
    d.text((x + 15, 635), '144px alpha>64 silhouette study; not calibrated game actor scale', fill='#b06030')
board.save(HERE / 'QA-light-dark.png')
evidence['qa'] = info(HERE / 'QA-light-dark.png')
(HERE / 'verification.json').write_text(json.dumps(evidence, indent=2) + '\n')
print(json.dumps(evidence, indent=2))
