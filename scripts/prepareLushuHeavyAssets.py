"""Source-preserving Heavy packaging only; no runtime wiring or new artwork.

Run from repo root. Requires Pillow, NumPy, SciPy. Accepted masters/GIF never
change. White JPEG removal uses border-connected background plus four explicit
negative-space seeds; never a global white-color key (which erases white fur).
"""
from pathlib import Path
import hashlib
import json
import platform
import PIL
import numpy as np
import scipy
from scipy import ndimage
from PIL import Image, ImageDraw, ImageOps

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / 'docs/art/candidates/lushu/heavy'
RECOVERED = BASE / 'recovered-review-v1'
OUT = BASE / 'runtime-prep-v1'
OUT.mkdir(exist_ok=True)
SCALE, CELL, GROUND = .145, 256, 224
R = Image.Resampling.LANCZOS
EXPECTED = [
    ('F1-windup-v1.png', 'b0b86d2a493c843e99fcc9156bc239490b653a39bc114869f19e94a025170b5e'),
    ('F2-strike-v1.png', '91fd3b2635be9446105ddb9c1ce130e39ddb4712e9b7f2a7fbb6aafc8f985e26'),
    ('F3-contact-selected-A.jpeg', 'bd58b7bb4aa4758735d1ec74e65c5ca206836e39b397b6ce38fd4af02cacc5e2'),
    ('F4-recovery-v1.png', 'ebcf442bc5cb69c9f13760ff7bbc7a5705bda83cbf3a3bf991f61721ce7fdfa6'),
]

def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()

def bbox(im, visible=False):
    a = im.getchannel('A')
    return a.point(lambda n: 255 if n > 128 else 0).getbbox() if visible else a.getbbox()

def save(im, name):
    p = OUT / name
    im.save(p, format='PNG')
    check = Image.open(p); check.load()
    assert check.tobytes() == im.tobytes()
    return {'path': str(p.relative_to(ROOT)), 'width': im.width, 'height': im.height,
            'bytes': p.stat().st_size, 'sha256': sha(p),
            'decodedBytes': im.width * im.height * 4, 'mode': im.mode}

approval = json.loads((RECOVERED / 'acceptance.json').read_text())
for record in approval['files']:
    assert sha(ROOT / record['path']) == record['sha256']
assert approval['approvedAt'] == '2026-10-16T20:33:23+08:00'
cells, layout, records = [], [], []
for i, (name, expected) in enumerate(EXPECTED):
    path = ROOT / 'docs/art/approved/lushu/heavy' / name if i == 2 else BASE / name
    assert sha(path) == expected
    original = Image.open(path); original.load()
    source = original.convert('RGBA')
    extraction = {'operation': 'preserve original RGBA including all faint alpha pixels'}
    if i == 2:
        rgb = np.array(original.convert('RGB'))
        channels = rgb.astype(np.int16)
        # Include JPEG's light neutral compression fringe up to the dark ink
        # boundary. Connectivity protects enclosed white face/mane/limbs/blade.
        white = (channels.min(2) >= 180) & (channels.max(2) - channels.min(2) <= 24)
        labels, _ = ndimage.label(white)
        border_ids = np.unique(np.r_[labels[0], labels[-1], labels[:, 0], labels[:, -1]])
        # Manually inspected white negative spaces between RED tail strands and
        # scarf folds, not mane/face/leg fur or blade highlights. Coordinates x,y.
        seeds = [(334, 452), (615, 521), (208, 715), (241, 754)]
        for x, y in seeds:
            assert white[y, x] and labels[y, x] > 0
        remove_ids = np.unique(np.r_[border_ids[border_ids > 0], [labels[y, x] for x, y in seeds]])
        background = np.isin(labels, remove_ids)
        rgba = np.dstack([rgb, np.where(background, 0, 255).astype(np.uint8)])
        source = Image.fromarray(rgba)
        assert np.array_equal(np.array(source)[:, :, :3], rgb)
        # Representative white face/mane, body, blade and hoof pixels survive.
        for x, y in [(1020, 220), (790, 195), (1040, 710), (1402, 744), (1270, 927)]:
            assert source.getpixel((x, y))[3] == 255
        extraction = {'operation': 'alpha-only JPEG background extraction; original RGB retained at every pixel',
                      'whiteMinimum': 180, 'neutralChannelSpreadMaximum': 24,
                      'connectivity': 4, 'negativeSpaceSeedsXY': seeds,
                      'removedBackgroundPixels': int(background.sum()),
                      'notGlobalWhiteKey': True, 'sourceRGBChangedPixels': 0}
        records.append(save(source, 'F3-extracted-source.png'))
    foot = bbox(source, True)[3]
    size = [round(source.width * SCALE), round(source.height * SCALE)]
    patch = source.resize(size, R)
    xy = [(CELL - size[0]) // 2, GROUND - round(foot * SCALE)]
    assert min(xy) >= 0 and xy[0] + size[0] <= CELL and xy[1] + size[1] <= CELL
    cell = Image.new('RGBA', (CELL, CELL))
    cell.alpha_composite(patch, xy)
    b = bbox(cell); margins = [b[0], b[1], CELL - b[2], CELL - b[3]]
    assert min(margins) >= 12
    records.append(save(cell, f'F{i+1}-cell.png'))
    cells.append(cell)
    layout.append({'source': str(path.relative_to(ROOT)), 'sourceSHA256': expected,
                   'sourceSize': list(original.size), 'extraction': extraction,
                   'fullCanvasScale': SCALE, 'fullCanvasResize': size, 'translation': xy,
                   'visibleFootSource': foot, 'alphaBounds': b, 'visibleBounds': bbox(cell, True),
                   'marginsLTRB': margins})

strip = Image.new('RGBA', (4 * CELL, CELL))
for i, c in enumerate(cells):
    strip.paste(c, (i * CELL, 0))
records.append(save(strip, 'heavy-4f-safe-256.png'))
runtime = Image.new('RGBA', (512, 128))
runtime_cells = []
for i, c in enumerate(cells):
    small = c.resize((128, 128), R)
    runtime_cells.append(small)
    # Exact cell copy, including RGB under alpha0; compositing normalizes those
    # invisible RGB values and breaks byte-identical cell/atlas round trips.
    runtime.paste(small, (128 * i, 0))
    b = bbox(small)
    assert min(b[0], b[1], 128 - b[2], 128 - b[3]) >= 5
records.append(save(runtime, 'heavy-4f-128.png'))
for i, c in enumerate(runtime_cells):
    assert runtime.crop((i*128, 0, (i+1)*128, 128)).tobytes() == c.tobytes()
for name, size, output in [('wind-sweep-raw-v1.png', (128, 128), 'heavy-wind.png'),
                           ('impact-raw-v1.png', (144, 96), 'heavy-impact.png')]:
    source = Image.open(RECOVERED / name).convert('RGBA')
    records.append(save(source.resize(size, R), output))

# Diagnostic proof only. No replacement GIF or new visual approval claim.
proof = Image.new('RGB', (1024, 600), '#17212d')
draw = ImageDraw.Draw(proof)
for i, c in enumerate(cells):
    for row, bg in enumerate(['#17212d', '#ececea']):
        tile = Image.new('RGBA', (256, 256), bg); tile.alpha_composite(c)
        proof.paste(tile.convert('RGB'), (256*i, 24 + row*280))
    draw.text((256*i+12, 6), f'F{i+1} / alpha packaging', fill='white')
records.append(save(proof, 'alpha-proof.png'))

baseline = 16763144
extra = sum(r['decodedBytes'] for r in records if Path(r['path']).name in
            ['heavy-4f-128.png', 'heavy-wind.png', 'heavy-impact.png'])
manifest = {
    'status': 'PACKAGING PREPARED / VISUAL QA AND SHARED RUNTIME PREFLIGHT REQUIRED',
    'sourceAcceptance': str((RECOVERED/'acceptance.json').relative_to(ROOT)),
    'sourceGIFUnchanged': next(r for r in approval['files'] if r['path'].endswith('.gif')),
    'toolVersions': {'python': platform.python_version(), 'pillow': PIL.__version__,
                     'numpy': np.__version__, 'scipy': scipy.__version__},
    'layout': layout, 'files': records, 'equalCellSize': [256, 256],
    'runtimeCellSize': [128, 128], 'groundBaseline': GROUND,
    'runtimeGroundBaseline': GROUND/2, 'runtimeVisibleBounds': [bbox(c, True) for c in runtime_cells],
    'sourcePolicy': 'Full-canvas uniform resize/padding. F1/F2/F4 original alpha untouched. F3 only explicit background alpha extraction; RGB unchanged. No source pose crop/redraw, no GIF sprite extraction.',
    'timing': {'previewFramesMs': [200, 80, 140, 180], 'contactOffsetMs': 280,
               'actualHeavyWindupMs': 0, 'runtimeTimingApproved': False},
    'budget': {'unchangedHardLimit': 16777216, 'baselineRequiredDecodedBytes': baseline,
               'additionalHeavyRuntimeBytes': extra, 'naiveAllPinnedTotal': baseline + extra,
               'naiveAllPinnedFits': baseline + extra <= 16777216,
               'requiredNext': 'Shared action residency/load-readiness design; cannot pin all new Heavy assets alongside existing required set under16MiB. Do not raise limit.'},
    'notCertified': ['Historical PNG-to-GIF exact composition/provenance',
                     'Actual Arena placement/scale/effect anchors', 'Hit/F3 synchronization',
                     'Full encounter texture residency', 'Build/deploy/phone gameplay'],
}
(OUT/'runtime-prep-manifest.json').write_text(json.dumps(manifest, indent=2)+'\n')
(OUT/'SHA256SUMS.json').write_text(json.dumps({r['path']: r['sha256'] for r in records}, indent=2)+'\n')
for name, expected in EXPECTED:
    path = ROOT/'docs/art/approved/lushu/heavy'/name if name.endswith('.jpeg') else BASE/name
    assert sha(path) == expected
print(json.dumps({'files': len(records), 'cellMargins': [l['marginsLTRB'] for l in layout],
                  'budget': manifest['budget']}, indent=2))
