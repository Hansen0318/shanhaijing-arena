"""Deterministic ART SIMULATION only. No game imports, state or cleanup proof.
Accepted STYLE/Idle are read-only. Review annotations stay outside actor fields.
Run from any directory; Pillow writes complete GIFs, verifies decoded timelines.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageChops, ImageFile
import hashlib, json, math

ImageFile.LOAD_TRUNCATED_IMAGES = False
OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[5]
STYLE = OUT.parent / 'style-v2'
IDLE = ROOT/'docs/art/candidates/chiru/awakening/composite-review-v1/approved-idle-return-cell.png'
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BG = '#183947'
R = Image.Resampling.LANCZOS
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def read(p):
    with Image.open(p) as im: im.verify()
    im = Image.open(p); im.load(); return im.convert('RGBA')
def label(im, xy, s, size=18, color='#e4f7fa'):
    ImageDraw.Draw(im).text(xy, s, font=ImageFont.truetype(FONT,size), fill=color)

receipt = json.loads((ROOT/'docs/art/approved/chiru/passive/style-v2/acceptance.json').read_text())
for p,h in receipt['evidenceSha256'].items(): assert sha(ROOT/p)==h, p
idle = read(IDLE)
cues = [read(STYLE/f'T{t}-style.png') for t in range(4)]
assert idle.size == (320,260)
# 400 ms Idle lead; exact 650 ms VFX; 750 ms clean Idle tail.
TIMES = [0]+list(range(400,1100,50))+[1800]
DURATIONS = [b-a for a,b in zip(TIMES,TIMES[1:])]
REPORTS = []

def fx(tier, age, reduced=False, left=False):
    src = cues[tier]
    if age < 0 or age >= 650: return Image.new('RGBA',src.size)
    p=age/650
    # Keep the approved footprint visible for 200 ms, then draw inward.
    q=max(0,(age-200)/450)
    scale=1 if reduced else 1-.28*q
    opacity=1 if age<=200 else (650-age)/450
    w,h=src.size
    part=src if scale==1 else src.resize((round(w*scale),round(h*scale)),R)
    part=part.copy();part.putalpha(part.getchannel('A').point(lambda a:round(a*opacity)))
    result=Image.new('RGBA',src.size)
    result.alpha_composite(part,((w-part.width)//2,(h-part.height)//2))
    return ImageOps.mirror(result) if left else result

def actor_field(tier,age,reduced=False,left=False,mark=True,visible=True):
    field=Image.new('RGBA',(320,300))
    if mark: field.alpha_composite(fx(tier,age,reduced,left),(58 if not left else 62,123))
    if visible: field.alpha_composite(ImageOps.mirror(idle) if left else idle)
    return field

def canvas(w,h,title,sub):
    im=Image.new('RGBA',(w,h),'#102733')
    label(im,(22,14),title,24)
    label(im,(22,49),'SCRIPTED ART SIMULATION / NOT RUNTIME',16,'#7df5ee')
    label(im,(22,h-33),sub,15,'#99bdc9')
    return im

def tile(im,x,y,title,field,sub=''):
    ImageDraw.Draw(im).rounded_rectangle((x+8,y,x+352,y+360),12,fill=BG,outline='#345866')
    label(im,(x+22,y+12),title,19)
    im.alpha_composite(field,(x+20,y+42))
    if sub: label(im,(x+22,y+337),sub,14,'#99bdc9')

def stage_label(t,event=700):
    return 'IDLE' if t<400 else ('MARK / one positive heal' if t<event else 'CLEAR / no residual mark')

def tier_board(t,reduced=False,solo=False):
    im=canvas(720,850,'YOUXI / '+('REDUCED: STATIC FADE' if reduced else 'NORMAL: INWARD RETURN'),
              '650 ms visual only / no heal-over-time or damage reduction')
    for tier in range(4):
        age=t-400
        field=Image.new('RGBA',(320,300))
        if solo:
            # Enlargement for source inspection only; all four tiers equal.
            f=fx(tier,age,reduced).resize((280,224),R)
            field.alpha_composite(f,(20,28))
        else: field=actor_field(tier,age,reduced)
        tile(im,(tier%2)*360,82+(tier//2)*370,f'T{tier} / {tier+1} flow group'+('s' if tier else ''),field,
             f'{[8,12,16,20][tier]}% max HP / '+('IDLE' if age<0 or age>=650 else f'VFX {age:03d}/650 ms'))
    return im

def directions(t):
    im=canvas(720,490,'YOUXI / RIGHT AND EXACT LEFT MIRROR','Static approved Idle throughout / VFX clear at 650 ms')
    for i in range(2): tile(im,i*360,82,'RIGHT / canonical' if i==0 else 'LEFT / mirror',actor_field(3,t-400,left=bool(i)))
    return im

def recipient_scene(t,which='other',left=False,cleanup=None):
    im=canvas(880,490,'YOUXI / '+('OTHER RECIPIENT' if which=='other' else 'SELF RECIPIENT'),
              'Instance A = caster / Instance B = teammate / no connecting line')
    age=t-400; clear=cleanup is not None and t>=700
    for i,x in enumerate([40,460]):
        owns=(i==1 if which=='other' else i==0)
        shown=not(clear and ((cleanup=='recipientKO' and i==1) or (cleanup=='casterKO' and i==0)))
        mark=owns and not clear
        im.alpha_composite(actor_field(3,age,left=left,mark=mark,visible=shown),(x,115))
    label(im,(65,82),'A / CASTER',18)
    label(im,(485,82),'B / BENEFICIARY' if which=='other' else 'B / NO MARK',18)
    label(im,(24,433),('Script '+cleanup+' at +300 ms: '+stage_label(t)) if cleanup else stage_label(t,1050),16)
    return im

def self_zero(t):
    im=canvas(720,490,'YOUXI / SELF AND ZERO HEAL','Positive amount: one mark / zero amount: no mark, no cooldown start')
    tile(im,0,82,'SELF / positive heal',actor_field(3,t-400))
    tile(im,360,82,'ZERO / no mark',actor_field(3,t-400,mark=False))
    return im

def lifecycle(t):
    im=canvas(720,850,'YOUXI / SCRIPTED LIFECYCLE CLEANUP','Script-only removal demonstration / engine state and cleanup not tested')
    for i,kind in enumerate(['end','Restart','destroy','expiry']):
        cutoff=1050 if kind=='expiry' else 700
        field=actor_field(3,t-400,mark=t<cutoff)
        if kind in ['end','destroy'] and t>=cutoff: field=Image.new('RGBA',field.size)
        text='at +650 ms' if kind=='expiry' else 'at +300 ms'
        if kind=='destroy': text='at +300 / again +400 ms'
        tile(im,(i%2)*360,82+(i//2)*370,kind+' / '+('650 ms' if kind=='expiry' else '300 ms'),field,
             'Repeat destroy at +400 ms' if kind=='destroy' else stage_label(t,cutoff))
    return im

def save_gif(name,render):
    frames=[render(t).convert('RGB') for t in TIMES[:-1]]
    # One palette across the timeline prevents quantization shimmer.
    atlas=Image.new('RGB',(frames[0].width,frames[0].height*len(frames)))
    for i,f in enumerate(frames): atlas.paste(f,(0,i*f.height))
    palette=atlas.quantize(colors=256,method=Image.Quantize.MEDIANCUT)
    quant=[f.quantize(palette=palette,dither=Image.Dither.NONE) for f in frames]
    path=OUT/name
    quant[0].save(path,save_all=True,append_images=quant[1:],duration=DURATIONS,loop=0,disposal=1,optimize=False)
    decoded=[];dur=[]
    with Image.open(path) as im:
        for i in range(im.n_frames):
            im.seek(i);im.load();decoded.append(im.convert('RGB').copy());dur.append(im.info['duration'])
    assert sum(dur)==1800
    # GIF encoders coalesce identical frames: compare by absolute time.
    for j,t in enumerate(TIMES[:-1]):
        k=0;elapsed=0
        while elapsed+dur[k]<=t: elapsed+=dur[k];k+=1
        assert decoded[k].tobytes()==quant[j].convert('RGB').tobytes(),(name,t)
    # Capture onset, midlife, last visible moment and exact expiry for self-review.
    for t in [400,700,1000,1050]:
        render(t).convert('RGB').save(OUT/(name[:-4]+f'-{t}.png')) if name=='tiers-normal.gif' else None
    REPORTS.append({'path':str(path.relative_to(ROOT)),'sha256':sha(path),'bytes':path.stat().st_size,
                    'dimensions':frames[0].size,'decodedFrames':len(decoded),'decodedDurationsMs':dur,
                    'durationMs':sum(dur),'absoluteTimePixelMatch':True,'fullDecode':True})

def main():
    jobs=[('tiers-normal.gif',lambda t:tier_board(t)),('tiers-reduced.gif',lambda t:tier_board(t,True)),
          ('vfx-only.gif',lambda t:tier_board(t,solo=True)),('directions-idle.gif',directions),
          ('other-recipient.gif',recipient_scene),('self-zero.gif',self_zero),
          ('recipient-ko.gif',lambda t:recipient_scene(t,cleanup='recipientKO')),
          ('caster-ko.gif',lambda t:recipient_scene(t,cleanup='casterKO')),
          ('lifecycle.gif',lifecycle)]
    for n,fn in jobs: save_gif(n,fn);print(n,REPORTS[-1]['bytes'])
    records=[]
    for tier in range(4):
        for left in [False,True]:
            for reduced in [False,True]:
                for age in range(0,651,50):
                    f=fx(tier,age,reduced,left);box=f.getbbox()
                    if box: assert box[0]>0 and box[1]>0 and box[2]<200 and box[3]<160
                    if age==650: assert box is None
                    if left: assert f.tobytes()==ImageOps.mirror(fx(tier,age,reduced,False)).tobytes()
                    records.append({'tier':tier,'left':left,'reduced':reduced,'ageMs':age,'alphaBounds':box})
    assert actor_field(3,650).tobytes()==actor_field(3,650,mark=False).tobytes()
    assert all(actor_field(t,-1,mark=False).tobytes()==actor_field(t,100,mark=False).tobytes() for t in range(4))
    for p,h in receipt['evidenceSha256'].items(): assert sha(ROOT/p)==h
    (OUT/'timeline.json').write_text(json.dumps({'unit':'ms','loopMs':1800,'samples':TIMES[:-1],
      'durations':DURATIONS,'healAndMarkOnset':400,'visualExpiry':1050,'visualLifetime':650,
      'interruptionsAt':700,'destroyRepeatedAt':800,'normal':'full footprint 0..200ms, inward scale 1..0.72 then absent at650ms',
      'reduced':'same exact static Tier shape and position; opacity-only fade',
      'actor':'approved static Idle throughout, no cast or breathing animation','heal':'one scripted positive event, no repeated heal'},indent=2)+'\n')
    (OUT/'verification.json').write_text(json.dumps({'status':'ART DERIVATIVE CHECKS PASS / PLAYER GIF REVIEW PENDING',
      'runtimeEvidence':False,'reviewer':'native self-review, not independent','gifDecode':REPORTS,
      'alphaBoundsBySample':records,'exactLeftMirror':True,'idleReturnAtExpiry':True,'zeroHasNoMark':True,
      'styleReceiptAllHashesMatch':True,'idleGeometry':{'cell':[320,260],'chestX':158,'hoverY':203},
      'fxCell':[200,160],'placement':[58,123],'leftPlacement':[62,123],
      'limitations':['Scripted art simulation only; no real heal/event/CD/cleanup/runtime verification.',
      'Review scenes retain approved actor pixel scale, not a captured phone viewport.',
      'KO removes actor in mock scene; does not approve a new KO pose.',
      'Restart shows clean scene only; independent CD readiness must be tested later in Runtime.']},indent=2)+'\n')
    sources={p:sha(ROOT/p) for p in receipt['evidenceSha256']}
    sources['docs/art/approved/chiru/passive/style-v2/acceptance.json']=sha(ROOT/'docs/art/approved/chiru/passive/style-v2/acceptance.json')
    (OUT/'manifest.json').write_text(json.dumps({'status':'PLAYER GIF REVIEW PENDING','baseline':'d3cf58c0cb4078d911fd4039129234d4bbd16cbe',
      'preArtCheckpoint':'cfa700133fb19f0f2a7ef8d291cbe509c35472c5','sourcesSha256':sources,
      'sourceTreatment':'immutable accepted STYLE/Idle, deterministic transforms only',
      'runtimeIntegrated':False,'deployed':False,'playerGifApproved':False,'files':REPORTS},indent=2)+'\n')
    (OUT/'SHA256SUMS.json').write_text(json.dumps({str(p.relative_to(ROOT)):sha(p) for p in sorted(OUT.iterdir()) if p.is_file() and p.name!='SHA256SUMS.json'},indent=2)+'\n')
if __name__=='__main__':main()
