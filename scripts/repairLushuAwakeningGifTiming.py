"""Browser-safe review export from immutable decoded v2/v1 frames; no art/runtime edits."""
from pathlib import Path
from PIL import Image, ImageDraw
import hashlib, json

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / 'docs/art/candidates/lushu/awakening'
OUT = BASE / 'composite-review-v3'
# Preserve exact 80->110 rush and 110/260/420 contact samples. No <=10ms holds.
TIMES = [0,20,40,60,80,110,140] + list(range(160,600,20)) + [610]
DURATIONS = [b-a for a,b in zip(TIMES,TIMES[1:])] + [350]
assert sum(DURATIONS) == 960 and min(DURATIONS) >= 20

def decode(path):
    im=Image.open(path); frames=[]; t=0
    for i in range(im.n_frames):
        im.seek(i); frames.append((t,im.convert('RGB').copy())); t+=im.info['duration']
    return frames,t

def sample(frames,t):
    return next(im for (a,im),(b,_) in zip(frames,frames[1:]+[(10**9,None)]) if a<=t<b)

def digest(path): return hashlib.sha256(path.read_bytes()).hexdigest()

def export(name,frames,durations):
    path=OUT/name
    pal=[im.quantize(colors=256,dither=Image.Dither.NONE) for im in frames]
    pal[0].save(path,save_all=True,append_images=pal[1:],duration=durations,loop=0,disposal=2,optimize=False)
    decoded,total=decode(path)
    gif=Image.open(path); holds=[]
    for i in range(gif.n_frames): gif.seek(i); holds.append(gif.info['duration'])
    assert min(holds)>=20 and total==sum(durations)
    return {'file':name,'sha256':digest(path),'frames':len(decoded),'durationMs':total,'minimumHoldMs':min(holds),'encodedHoldsMs':holds}

def main():
    OUT.mkdir(exist_ok=True)
    records=[]; sources={}
    for name in ['normal','slow','character-only','vfx-only','whiff']:
        source=BASE/'composite-review-v2'/('lushu-awakening-'+name+'.gif')
        sources[str(source.relative_to(ROOT))]=digest(source)
        frames,total=decode(source); speed=3 if name=='slow' else 1
        assert total==1920*speed
        selected=[sample(frames,(t+960*side)*speed) for side in [0,1] for t in TIMES]
        records.append(export(source.name,selected,[d*speed for d in DURATIONS]*2))
    # Match the corrected normal GIF's sample times, holds, directions and Idle.
    oldpath=BASE/'composite-review-v1/lushu-awakening-normal.gif'
    sources[str(oldpath.relative_to(ROOT))]=digest(oldpath)
    old,_=decode(oldpath); new,_=decode(BASE/'composite-review-v2/lushu-awakening-normal.gif')
    comparison=[]
    for side in [0,1]:
        for t in TIMES:
            im=Image.new('RGB',(1280,400),'#172533')
            im.paste(sample(old,t+1000*side).resize((640,360)),(0,30))
            im.paste(sample(new,t+960*side).resize((640,360)),(640,30))
            d=ImageDraw.Draw(im)
            d.text((12,8),'BEFORE: first rush70ms / contact150ms',fill='white')
            d.text((652,8),'CANDIDATE: first rush30ms / contact110ms',fill='white')
            comparison.append(im)
    records.append(export('first-rush-before-after.gif',comparison,DURATIONS*2))
    result={'status':'EXPORT CHECKS PASS / PLAYER REVIEW PENDING','sourceSha256':sources,
      'sampleTimesMs':TIMES,'sampleHoldsMs':DURATIONS,'previewContactsMs':[110,260,420],
      'previewRecoveryMs':610,'cycleMs':960,'gifs':records,
      'checks':['Every decoded GIF hold >=20ms','normal and comparison share exact sample schedule, directions, Idle and 1920ms loop','slow is exactly 3x:5760ms','all decoded output totals match requested durations','source hashes unchanged'],
      'limits':'Preview only. GIF samples discrete frames; holds vary20/30ms, exact pose changes between samples are not simulated. No measurement of user device wall-clock playback. No art, gameplay contract, runtime or deploy changes.'}
    assert all(digest(ROOT/p)==h for p,h in sources.items())
    (OUT/'verification.json').write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result))

if __name__=='__main__': main()
