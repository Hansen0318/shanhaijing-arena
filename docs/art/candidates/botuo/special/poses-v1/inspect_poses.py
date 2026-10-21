"""Review-only source-preserving comparison. Does not make runtime cells/GIFs."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import hashlib,json
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[5]
F3=ROOT/'docs/art/candidates/botuo/special/key-pose-v1/F3-protection-master.png'
assert hashlib.sha256(F3.read_bytes()).hexdigest()=='00dc78f20e09da6f8c55b67497653046cb5c7aa6253df2ffaa3d7b41c7bdf8a6'
sources=[('F1','LOW / OPEN INITIATION',HERE/'F1-initiation-master.png'),('F2','INWARD / LIFTING TRANSITION',HERE/'F2-inward-master.png'),('F3','SUPPORTED HIGH BRACE / APPROVED',F3),('F4','OPEN / LOWERED RECOVERY',HERE/'F4-release-master.png')]
def info(p):
    b=p.read_bytes()
    with Image.open(p) as im:
        im.load()
        return {'path':str(p.relative_to(ROOT)),'sha256':hashlib.sha256(b).hexdigest(),'bytes':len(b),'size':list(im.size),'mode':im.mode}
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',22)
small=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',17)
rows=[]
for key,label,p in sources:
    im=Image.open(p);im.load();assert im.mode=='RGBA'
    a=im.getchannel('A');solid=a.point(lambda v:255 if v>64 else 0).getbbox();assert solid
    edges=[a.crop(b).getextrema()[1] for b in [(0,0,im.width,1),(0,0,1,im.height),(0,im.height-1,im.width,im.height),(im.width-1,0,im.width,im.height)]]
    # Add padding in memory only. Retain ALL original RGBA, including faint fringe.
    padded=Image.new('RGBA',(im.width+80,im.height+80));padded.paste(im,(40,40))
    assert padded.crop((40,40,40+im.width,40+im.height)).tobytes()==im.tobytes()
    assert min(solid[0],solid[1],im.width-solid[2],im.height-solid[3])>0
    rows.append({'pose':key,'status':'PLAYER ART APPROVED' if key=='F3' else 'CANDIDATE / PLAYER REVIEW PENDING','source':info(p),'alpha':{'bbox':list(a.getbbox()),'alpha_gt64_bbox':list(solid),'edge_maxima':edges,'low_alpha1to8':sum(a.histogram()[1:9])},'reviewTransform':{'raw_source_pixel_scale':.44,'source_ground_sample_y':solid[3]-.5,'ground_method':'alpha>64 lower extent for review placement ONLY; not runtime anchor/body calibration'},'in_memory_padding':{'each_side':40,'RGBA_crop_back_exact':True}})
for dark,name in [(False,'four-pose-review.png'),(True,'four-pose-dark-QA.png')]:
    bg='#182029' if dark else '#efede5';ink='#f1ece2' if dark else '#302b24'
    board=Image.new('RGBA',(1400,1500),bg);d=ImageDraw.Draw(board)
    for i,((key,label,p),row) in enumerate(zip(sources,rows)):
        x=(i%2)*700;y=(i//2)*750
        d.text((x+24,y+16),key+'  '+label,font=font,fill=ink)
        d.text((x+24,y+46),row['status'],font=small,fill=ink)
        im=Image.open(p).convert('RGBA');scale=.44
        thumb=im.resize((round(im.width*scale),round(im.height*scale)),Image.Resampling.LANCZOS)
        left=x+round(350-im.width*scale/2);top=y+round(680-row['reviewTransform']['source_ground_sample_y']*scale)
        assert left>=x+8 and left+thumb.width<=x+692
        assert top>=y+72 and top+thumb.height<=y+720
        board.alpha_composite(thumb,(left,top))
        d.text((x+24,y+718),'Same raw-pixel scale / art review only / no VFX',font=small,fill=ink)
    board.convert('RGB').save(HERE/name)
superseded=[info(p) for p in sorted(HERE.glob('*superseded*.png'))]
evidence={'status':'F1/F2/F4 CANDIDATES; F3 EXACT PLAYER APPROVED SOURCE RETAINED','workflow':'individual pose authoring, then full four-pose player review BEFORE VFX/GIF','generator':'built-in image_gen; individual first drafts and torso-costume correction edits','approvalReceipt':'docs/art/approved/botuo/special/f3-v1/acceptance.json','poses':rows,'references':[info(ROOT/p) for p in ['public/assets/characters/botuo/identity.png','public/assets/characters/botuo/battleIdle.png']],'superseded':superseded,'supersededPolicy':'Archive only. Not approved, not identity references, excluded from selected sequence. Used as their own correction edit targets only.','boards':[info(HERE/n) for n in ['four-pose-review.png','four-pose-dark-QA.png']],'selfReview':['One beast-face guard and one small bracer on same anatomical arms in all selected poses.','Low/open → inward/lifting → accepted high/support → relaxed lowered/open gesture.','White goat identity/horns/mane, original red crossing chest straps/sash, cream-gold tabard and two cloven hooves inspected.','No VFX, new weapon, damaging contact or additional gameplay delay.'],'limitations':['Common raw-source-pixel scale is review comparison only; not anatomical-density calibration or actual battlefield scale.','Ground placement is review-only, not approved runtime anchor or source-to-Idle transform.','New poses remain player art-review pending. No GIF/timing/runtime/budget-fit/browser/phone proof.','Master fringe is retained; no threshold/color cleanup or pixel-identical-edit claim.']}
(HERE/'verification.json').write_text(json.dumps(evidence,indent=2)+'\n')
files=sorted(p for p in HERE.iterdir() if p.is_file() and p.name!='SHA256SUMS.json')
(HERE/'SHA256SUMS.json').write_text(json.dumps({p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in files},indent=2)+'\n')
print(json.dumps({'status':evidence['status'],'sources':[r['source'] for r in rows],'boards':evidence['boards'],'superseded':len(superseded)},indent=2))
