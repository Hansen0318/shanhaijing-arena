"""Reproducible review composites and metadata; never edits the source PNG."""
from pathlib import Path
from PIL import Image, ImageDraw
import hashlib, json
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[5]
def info(p):
    b=p.read_bytes()
    with Image.open(p) as im:
        im.load()
        return dict(path=str(p.relative_to(ROOT)),sha256=hashlib.sha256(b).hexdigest(),bytes=len(b),size=list(im.size),mode=im.mode)
master=HERE/'F3-protection-master.png'
im=Image.open(master);im.load();assert im.mode=='RGBA'
a=im.getchannel('A');solid=a.point(lambda v:255 if v>64 else 0).getbbox();assert solid
pad=40
safe=Image.new('RGBA',(im.width+pad*2,im.height+pad*2));safe.paste(im,(pad,pad))
safe.save(HERE/'F3-protection-padded.png')
assert safe.crop((pad,pad,pad+im.width,pad+im.height)).tobytes()==im.tobytes()
bbox=safe.getchannel('A').getbbox();assert min(bbox[0],bbox[1],safe.width-bbox[2],safe.height-bbox[3])>=40
board=Image.new('RGB',(1100,720));d=ImageDraw.Draw(board)
for x,bg,ink in [(0,'#ece9df','#443c31'),(550,'#182029','#eee9df')]:
    board.paste(bg,(x,0,x+550,720));d.text((x+18,16),'SPECIAL / PROTECTIVE KEY POSE / CANDIDATE',fill=ink)
    thumb=safe.copy();thumb.thumbnail((510,570));board.paste(thumb,(x+(550-thumb.width)//2,52),thumb)
    d.text((x+18,680),'Character only / no VFX / not runtime scale proof',fill=ink)
board.save(HERE/'QA-light-dark.png')
refs=['public/assets/characters/botuo/identity.png','public/assets/characters/botuo/battleIdle.png','docs/art/candidates/botuo/heavy/key-pose-v1/F3-contact-master.png']
evidence={'status':'DESIGN / FIRST KEY POSE CANDIDATE / PLAYER REVIEW PENDING','generator':'built-in image_gen; no CLI fallback','source':info(master),'prompt':'prompt.txt','references':[info(ROOT/p) for p in refs],'alpha':{'extrema':list(a.getextrema()),'bbox':list(a.getbbox()),'alpha_gt64_bbox':list(solid),'outer_edge_maxima':[a.crop(b).getextrema()[1] for b in [(0,0,im.width,1),(0,0,1,im.height),(0,im.height-1,im.width,im.height),(im.width-1,0,im.width,im.height)]],'low_alpha_1_to8':sum(a.histogram()[1:9]),'handling':'Source faint edge alpha retained; padding only, no threshold cleanup.'},'padded':info(HERE/'F3-protection-padded.png'),'padding':{'each_side':40,'RGBA_crop_back_exact':True,'outer_edges_clear':True},'qa':info(HERE/'QA-light-dark.png'),'selfReview':['One complete upright right-facing figure; both cloven hooves visible.','Curled ram horns, white face, brown mantle, red sash, cream/gold tabard retained.','One beast-face bracer drawn inward at upper chest; opposite smaller bracer supports from below.','No baked VFX, new weapon, enemy or fake impact.','Generated anatomy/equipment projections are new pixels, not pixel-identical to approved art; player review required.'],'notProven':['Player art acceptance','Multi-frame/ground-anchor/body-density calibration at actual game scale','Runtime packing/residency fit','GIF/executable contract/runtime/phone acceptance']}
(HERE/'verification.json').write_text(json.dumps(evidence,indent=2)+'\n')
files=['F3-protection-master.png','F3-protection-padded.png','QA-light-dark.png','prompt.txt','inspect_candidate.py','verification.json','mechanics-snapshot.json']
(HERE/'SHA256SUMS.json').write_text(json.dumps({p:hashlib.sha256((HERE/p).read_bytes()).hexdigest() for p in files},indent=2)+'\n')
print(json.dumps({'status':evidence['status'],'master':evidence['source'],'alpha':evidence['alpha'],'padding':evidence['padding']},indent=2))
