"""Inspect sources and assemble a static review board; no master pixels are edited."""
from pathlib import Path
from PIL import Image, ImageDraw
import hashlib, json

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[5]
F3 = HERE.parent / 'key-pose-v1/F3-contact-master.png'
APPROVED_SHA = '19a8e9f8cf74c870558a4ea734b67e03d5eacce71072c5bc979931cf00f42f36'
assert hashlib.sha256(F3.read_bytes()).hexdigest() == APPROVED_SHA
entries = [('F1 LOAD / CANDIDATE', HERE / 'F1-anticipation-master.png'),
           ('F2 RELEASE v2 / CANDIDATE', HERE / 'F2-release-master-v2.png'),
           ('F3 CONTACT / PLAYER APPROVED', F3),
           ('F4 RECOVERY / CANDIDATE', HERE / 'F4-recovery-master.png')]
records = []
board = Image.new('RGB', (1440, 1040), '#202936')
draw = ImageDraw.Draw(board)
for index, (label, path) in enumerate(entries):
    data = path.read_bytes()
    im = Image.open(path)
    im.load()
    assert im.mode == 'RGBA'
    a = im.getchannel('A')
    b = a.getbbox()
    body = a.point(lambda v: 255 if v > 64 else 0).getbbox()
    h = a.histogram()
    assert b and body
    edge_clear = b[0] > 0 and b[1] > 0 and b[2] < im.width and b[3] < im.height
    visible_clearance = min(body[0], body[1], im.width-body[2], im.height-body[3])
    border_max = max(a.crop((0, 0, im.width, 1)).getextrema()[1],
                     a.crop((0, im.height-1, im.width, im.height)).getextrema()[1],
                     a.crop((0, 0, 1, im.height)).getextrema()[1],
                     a.crop((im.width-1, 0, im.width, im.height)).getextrema()[1])
    assert visible_clearance >= 16, (path, body, im.size)
    assert border_max <= 8, (path, border_max)
    records.append({'path': str(path.relative_to(ROOT)), 'sha256': hashlib.sha256(data).hexdigest(),
                    'bytes': len(data), 'size': list(im.size), 'nonzero_bbox': list(b),
                    'alpha_gt64_bbox': list(body), 'raw_nonzero_edges_clear': edge_clear,
                    'visible_alpha_gt64_clearance_px': visible_clearance, 'border_alpha_max': border_max,
                    'low_alpha_1_to_8_pixels': sum(h[1:9]),
                    'status': 'PLAYER ART APPROVED' if path == F3 else 'ART CANDIDATE / PLAYER REVIEW PENDING'})
    x = (index % 2) * 720
    y = (index // 2) * 520
    draw.text((x+18, y+14), label, fill='#e9bc65')
    # One common source-pixel scale, with feet aligned from alpha>64 bounds.
    # Deliberately do not fit each pose to the same silhouette height.
    for panel_x, bg in [(x+10, '#eeeeee'), (x+365, '#182029')]:
        board.paste(bg, (panel_x, y+40, panel_x+345, y+355))
        scale = 0.235
        thumb = im.resize((round(im.width*scale), round(im.height*scale)), Image.Resampling.LANCZOS)
        board.paste(thumb, (panel_x+2, round(y+335-body[3]*scale)), thumb)
    scale = 0.14
    thumb = im.resize((round(im.width*scale), round(im.height*scale)), Image.Resampling.LANCZOS)
    px = round(x+360-im.width*scale/2)
    py = round(y+496-body[3]*scale)
    board.paste(thumb, (px, py), thumb)
    draw.text((x+18, y+500), 'Uniform source scale; static study, not game/phone proof', fill='#b7c1cc')
board.save(HERE / 'four-pose-review.png')
reject = HERE / 'F2-release-rejected-v1.png'
with Image.open(reject) as p:
    p.load()
    rejected = {'path': str(reject.relative_to(ROOT)), 'sha256': hashlib.sha256(reject.read_bytes()).hexdigest(),
                'size': list(p.size), 'nonzero_bbox': list(p.getchannel('A').getbbox()),
                'status': 'REJECTED BY SELF-REVIEW / DO NOT USE', 'reason': 'Leading horn has only 7px alpha>64 right margin; insufficient safety clearance. Replaced by version2; no claim of proven missing anatomy.'}
report = {'scope': 'Static PNG decode/alpha/bounds/hashes and uniform-source-scale light/dark review only',
          'frames': records, 'rejected': rejected,
          'review_board_sha256': hashlib.sha256((HERE/'four-pose-review.png').read_bytes()).hexdigest(),
          'limitations': ['No cleanup of low-alpha source noise', 'No runtime normalization or calibrated phone-scale proof',
                         'No GIF/VFX approval, runtime integration, engineering test or deployment',
                         'New poses use regenerated pixels and require explicit player review']}
(HERE/'verification.json').write_text(json.dumps(report, indent=2)+'\n')
print(json.dumps(report, indent=2))
