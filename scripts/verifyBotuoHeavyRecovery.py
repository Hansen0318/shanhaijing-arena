"""Verify recovered predecessor files without generating or replacing artwork."""
from pathlib import Path
from PIL import Image
import hashlib
import json

ROOT = Path(__file__).resolve().parents[1]
REVIEW = ROOT / 'docs/art/candidates/botuo/heavy/composite-review-v1'
EVIDENCE = ROOT / 'docs/verification/P2_HEAVY_RECOVERY'

def sha(data):
    return hashlib.sha256(data).hexdigest()

manifest = json.loads((REVIEW / 'review-manifest.json').read_text())
for record in manifest['poses'] + manifest['vfx'] + manifest['gifs']:
    path = ROOT / record.get('source', record.get('path'))
    assert sha(path.read_bytes()) == record['sha256'], path
for path, expected in json.loads((EVIDENCE / 'recovered-checksums.json').read_text()).items():
    assert sha((ROOT / path).read_bytes()) == expected, path

# Reverse only the predecessor's 3x slow timing. Parse block boundaries so
# compressed image bytes resembling an extension marker are never rewritten.
data = bytearray((REVIEW / 'botuo-heavy-composite-slow.gif').read_bytes())
pos = 13
if data[10] & 128:
    pos += 3 * 2 ** ((data[10] & 7) + 1)
controls = 0
while pos < len(data):
    marker = data[pos]
    pos += 1
    if marker == 0x3b:
        break
    if marker == 0x21:
        label = data[pos]
        pos += 1
        if label == 0xf9:
            assert data[pos] == 4
            delay = int.from_bytes(data[pos + 2:pos + 4], 'little')
            assert delay % 3 == 0
            data[pos + 2:pos + 4] = (delay // 3).to_bytes(2, 'little')
            controls += 1
    elif marker == 0x2c:
        packed = data[pos + 8]
        pos += 9
        if packed & 128:
            pos += 3 * 2 ** ((packed & 7) + 1)
        pos += 1  # LZW minimum code size
    else:
        raise AssertionError((pos, marker))
    while data[pos]:
        pos += data[pos] + 1
    pos += 1
normal_bytes = (REVIEW / 'botuo-heavy-composite-normal.gif').read_bytes()
assert bytes(data) == normal_bytes
assert sha(normal_bytes) == '2f72bc4f16cc35af773c805bdf97eb6a89f819f11d3ad0d1b9f78b35bc1cb001'
truncated = (EVIDENCE / 'normal-truncated.bin').read_bytes()
assert normal_bytes.startswith(truncated) and len(truncated) == 717501
normal = Image.open(REVIEW / 'botuo-heavy-composite-normal.gif')
slow = Image.open(REVIEW / 'botuo-heavy-composite-slow.gif')
assert normal.n_frames == slow.n_frames == controls == 36
totals = [0, 0]
for i in range(36):
    normal.seek(i)
    slow.seek(i)
    assert normal.convert('RGB').tobytes() == slow.convert('RGB').tobytes()
    assert normal.info['duration'] * 3 == slow.info['duration']
    totals[0] += normal.info['duration']
    totals[1] += slow.info['duration']
assert totals == [6720, 20160]
for record in manifest['poses']:
    source = Image.open(ROOT / record['source']).convert('RGBA')
    resized = source.resize(tuple(record['resizedSize']), Image.Resampling.LANCZOS)
    cell = Image.open(REVIEW / (record['frame'] + '-safe-cell.png')).convert('RGBA')
    x, y = record['xy']
    assert cell.crop((x, y, x + resized.width, y + resized.height)).tobytes() == resized.tobytes()
print('PASS: four source hashes/RGBA cells, two VFX hashes, four GIF hashes, '
      '36 exact normal/slow decoded frames, 3x delays, original-byte recovery and truncated prefix')
