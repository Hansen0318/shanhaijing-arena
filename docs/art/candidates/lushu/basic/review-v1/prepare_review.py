"""Art review packaging only. Run from repository root; requires Pillow.

No generative edits, pixel deletion, anatomy interpolation or runtime wiring.
Accepted originals remain byte-identical. Preview transforms are reproducible.
"""
from pathlib import Path
import hashlib
import io
import json
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[6]
OUT = Path(__file__).resolve().parent
APPROVED = ROOT / 'docs/art/approved/lushu/basic'
POSES = ['F1-windup-v1', 'F2-strike-v1', 'F3-contact-v1', 'F4-recovery-v1']
EXPECTED = [
    '795217a13d453ad6dd87daa11d819f11c557b6354755c269696695efb0bbaed9',
    'dcc995d71f7bb4ae60fc9655c90dfd2e4d5e75f0935d3b17a058a7ce29e49cd8',
    '0ecfa9f8cba1beec93dbfc823b0f5ac4600e7bf63ff8104ffd719cd8ad700955',
    'bdbb66575871c9700fa2054a0a66ce2aeb7f459e63eb370c89e3f70d6115d102',
]
CELL, GROUND, SCALE = 384, 320, .25
R = Image.Resampling.LANCZOS
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'


def font(n):
    return ImageFont.truetype(FONT, n)


def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()


def record(p):
    im = Image.open(p)
    return dict(path=str(p.relative_to(ROOT)), sha256=sha(p), bytes=p.stat().st_size,
                size=list(im.size), mode=im.mode)


def visible_bounds(im):
    return im.getchannel('A').point(lambda a: 255 if a > 128 else 0).getbbox()


def margin(im):
    b = im.getbbox()
    return [b[0], b[1], im.width-b[2], im.height-b[3]]


frames, layout = [], []
for name, expected in zip(POSES, EXPECTED):
    p = APPROVED / (name + '.png')
    assert sha(p) == expected, name
    source = Image.open(p).convert('RGBA')
    foot = visible_bounds(source)[3]
    # Resize FULL source canvas. Keep even disconnected low-alpha pixels: no
    # thresholding or source clipping. Threshold is used for alignment only.
    size = (round(source.width*SCALE), round(source.height*SCALE))
    resized = source.resize(size, R)
    xy = ((CELL-size[0])//2, GROUND-round(foot*SCALE))
    assert xy[0] >= 0 and xy[1] >= 0
    assert xy[0]+size[0] <= CELL and xy[1]+size[1] <= CELL
    cell = Image.new('RGBA', (CELL, CELL))
    cell.alpha_composite(resized, xy)
    assert min(margin(cell)) >= 12
    dest = OUT / (name + '-cell.png')
    cell.save(dest)
    frames.append(cell)
    layout.append(dict(source=record(p), cell=record(dest), uniformScale=SCALE,
                       fullCanvasResize=list(size), translation=list(xy),
                       sourceVisibleFootBottom=foot, alphaNonzeroBounds=list(cell.getbbox()),
                       nonzeroAlphaMarginsLTRB=margin(cell), sourcePixelsDeleted=0))

strip = Image.new('RGBA', (CELL*4, CELL))
for i, cell in enumerate(frames):
    strip.alpha_composite(cell, (i*CELL, 0))
strip_bytes = io.BytesIO()
strip.save(strip_bytes, format='PNG')
strip_tmp = OUT / 'packed-strip.tmp'
strip_tmp.write_bytes(strip_bytes.getvalue())
strip_readback = Image.open(strip_tmp)
strip_readback.load()
assert strip_readback.tobytes() == strip.tobytes()
strip_tmp.replace(OUT / 'lushu-basic-4f-safe-review-v1.png')
for i, cell in enumerate(frames):
    assert strip_readback.crop((i*CELL, 0, (i+1)*CELL, CELL)).tobytes() == cell.tobytes()

# An actual accepted static Idle frame, not a new or invented neutral pose.
idle_source = Image.open(ROOT / 'public/assets/characters/lushu/battleIdle-4f.png').crop((0, 0, 96, 128))
idle = Image.new('RGBA', (CELL, CELL))
idle_scale = 2.3  # review-only match to accepted F4 head-to-ground height
idle_size = tuple(round(n*idle_scale) for n in idle_source.size)
idle.alpha_composite(idle_source.resize(idle_size, R),
                     (round(CELL/2-48*idle_scale), GROUND-round(125*idle_scale)))

arc = Image.open(OUT / 'blade-sweep-raw-v1.png').convert('RGBA')
spark = Image.open(OUT / 'contact-spark-raw-v1.png').convert('RGBA')


def placed(im, scale, xy, opacity=1):
    size = tuple(round(n*scale) for n in im.size)
    patch = im.resize(size, R)
    if opacity < 1:
        patch.putalpha(patch.getchannel('A').point(lambda a: round(a*opacity)))
    assert xy[0] >= 0 and xy[1] >= 0
    assert xy[0]+size[0] <= 480 and xy[1]+size[1] <= 400
    layer = Image.new('RGBA', (480, 400))
    layer.alpha_composite(patch, xy)
    return layer


def stage(pose, arc_opacity=0, spark_opacity=0):
    result = Image.new('RGBA', (480, 400))
    # Arc is behind actor, contact spark is in front at blade tip. No edit to
    # accepted character pixels. Effects only appear on strike/contact poses.
    if arc_opacity:
        result.alpha_composite(placed(arc, .14, (224, 65), arc_opacity))
    result.alpha_composite(idle if pose < 0 else frames[pose], (48, 0))
    if spark_opacity:
        result.alpha_composite(placed(spark, .11, (310, 91), spark_opacity))
    return result


timeline = [
    ('IDLE', -1, 550, 0, 0),
    ('F1 / WINDUP', 0, 120, 0, 0),
    ('F2 / STRIKE', 1, 60, .55, 0),
    ('F3 / CONTACT', 2, 40, 1, 1),
    ('F3 / CONTACT', 2, 40, .55, .55),
    ('F3 / SETTLE', 2, 20, .18, .18),
    ('F4 / RECOVERY', 3, 120, 0, 0),
    ('RETURN TO APPROVED IDLE', -1, 650, 0, 0),
]
background = (21, 30, 41)
rgb_frames, durations, panels = [], [], []
for label, pose, ms, arc_alpha, spark_alpha in timeline:
    panel = stage(pose, arc_alpha, spark_alpha)
    panels.append(panel)
    screen = Image.new('RGB', (960, 690), background)
    draw = ImageDraw.Draw(screen)
    draw.text((24, 16), 'LUSHU BASIC / POSES APPROVED / VFX + GIF REVIEW', font=font(20), fill='#edf5ff')
    draw.text((24, 48), 'RIGHT FACING', font=font(14), fill='#7edcca')
    draw.text((710, 48), 'LEFT MIRROR', font=font(14), fill='#7edcca')
    draw.line((480, 76, 480, 440), fill='#35495c')
    for x in [0, 480]:
        draw.line((x+25, 390, x+455, 390), fill='#466174')
    screen.paste(panel, (0, 70), panel)
    mirrored = ImageOps.mirror(panel)
    screen.paste(mirrored, (480, 70), mirrored)
    draw.text((24, 430), label, font=font(19), fill='#ffffff')
    draw.text((24, 474), 'SMALL-SIZE READABILITY / REVIEW ONLY', font=font(14), fill='#a9bdce')
    # Approx. 140px body height. This is NOT proof of actual runtime sizing.
    small = panel.resize((240, 200), R)
    screen.paste(small, (150, 475), small)
    msml = ImageOps.mirror(small)
    screen.paste(msml, (570, 475), msml)
    draw.text((24, 660), '400ms action preview; game timing unchanged. No runtime integration or deployment.', font=font(14), fill='#a9bdce')
    rgb_frames.append(screen)
    durations.append(ms)

# One fixed palette across all frames avoids palette shimmer on static art.
palette_source = Image.new('RGB', (960, 690*len(rgb_frames)))
for i, im in enumerate(rgb_frames):
    palette_source.paste(im, (0, 690*i))
palette = palette_source.quantize(colors=256, method=Image.Quantize.MEDIANCUT)
indexed = [im.quantize(palette=palette, dither=Image.Dither.NONE) for im in rgb_frames]
for filename, times in [('lushu-basic-vfx-review-v1.gif', durations),
                        ('lushu-basic-vfx-review-v1-slow.gif', [ms if pose < 0 else ms*3 for (_, pose, ms, _, _ ) in timeline])]:
    indexed[0].save(OUT/filename, save_all=True, append_images=indexed[1:], duration=times,
                    loop=0, optimize=False, disposal=2)

# Static alpha/background/pose comparison plus exact contact composite.
proof = Image.new('RGB', (1536, 840), '#17212d')
d = ImageDraw.Draw(proof)
for i, cell in enumerate(frames):
    for row, color in enumerate(['#17212d', '#e7e9e6']):
        tile = Image.new('RGBA', (CELL, CELL), color)
        tile.alpha_composite(cell)
        proof.paste(tile.convert('RGB'), (i*CELL, 32+row*400))
    d.text((i*CELL+16, 8), POSES[i], font=font(16), fill='#ffffff')
proof.save(OUT / 'alpha-light-dark-review-v1.png')
rgb_frames[3].save(OUT / 'contact-composite-review-v1.png')

files = [record(p) for p in sorted(OUT.iterdir()) if p.suffix in ['.png', '.gif']]
checks = []
for name in ['lushu-basic-vfx-review-v1.gif', 'lushu-basic-vfx-review-v1-slow.gif']:
    gif = Image.open(OUT/name)
    decoded_times = []
    for i in range(gif.n_frames):
        gif.seek(i)
        decoded_times.append(gif.info['duration'])
    assert gif.n_frames == len(timeline)
    checks.append(dict(path=name, frames=gif.n_frames, durationsMs=decoded_times,
                       totalMs=sum(decoded_times)))
manifest = dict(
    status='CHARACTER POSES PLAYER APPROVED / VFX AND GIF REVIEW PENDING',
    recoveryHead='ee1ee9229e5b8b88128acd5caaa7813e37344837',
    playerPoseApproval=dict(at='2026-10-15T21:43:37+08:00', statement='好可以，繼續',
                            scope='All four character poses; not VFX, GIF or runtime'),
    cellSize=[CELL, CELL], stripSize=[CELL*4, CELL], sourceScale=SCALE,
    visibleGroundBaseline=GROUND, previewOrigin=[.5, GROUND/CELL],
    normalization='Full source-canvas uniform resize and translation only; no threshold deletion/crop/redraw',
    layout=layout,
    idleReturn=dict(source='public/assets/characters/lushu/battleIdle-4f.png', region=[0, 0, 96, 128],
                    previewScale=idle_scale, gameplayAnchorChanged=False),
    effects=dict(bladeSweep=dict(raw='blade-sweep-raw-v1.png', scale=.14, position=[224,65], layer='behind actor'),
                 contactSpark=dict(raw='contact-spark-raw-v1.png', scale=.11, position=[310,91], layer='in front; blade tip'),
                 note='Independent candidate sprites; opacity-only decay, no added hit/projectile/range'),
    timeline=[dict(label=l, characterPose=p+1 if p>=0 else 'approved Idle', durationMs=t,
                   arcOpacity=a, contactOpacity=s) for l,p,t,a,s in timeline],
    timingScope='400ms action plus Idle holds; preview only, NOT a combat cadence/damage timing change',
    gifChecks=checks, files=files,
    checks=dict(sourceHashes='PASS', equalCells='PASS', stripRoundTrip='PASS',
                transparentMargins='PASS >=12px each edge, every nonzero-alpha pixel retained',
                visualInspection='See REVIEW_NOTES.md for manual inspection and pending player GIF acceptance', runtimeTests='NOT RUN / OUT OF SCOPE',
                buildCIdeploy='NOT RUN / OUT OF SCOPE'),
    nextGate='Explicit player VFX + composite GIF review. No integration, deployment or main merge.')
(OUT/'review-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+'\n')
print(json.dumps(dict(cellMargins=[x['nonzeroAlphaMarginsLTRB'] for x in layout],
                      gifChecks=checks, totalAssets=len(files)), indent=2))
