"""Candidate source QA and review layout only; not runtime scale calibration."""
from pathlib import Path
import hashlib,json
from PIL import Image,ImageDraw,ImageFont
ROOT=Path(__file__).resolve().parents[6]
OUT=Path(__file__).resolve().parent
rows=[]
files=[('F1','F1-anticipation-master.png'),('F2','F2-strike-master.png'),('F3','../key-pose-v1/F3-contact-master.png'),('F4','F4-recovery-master.png')]
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',22)
board=Image.new('RGB',(1800,900),'#eee8db');draw=ImageDraw.Draw(board)
for i,(label,file) in enumerate(files):
 p=OUT/file; im=Image.open(p);im.load();assert im.mode=='RGBA'
 alpha=im.getchannel('A'); bbox=alpha.getbbox();assert bbox
 edges={k:sum(v!=0 for v in region.get_flattened_data()) for k,region in {'top':alpha.crop((0,0,im.width,1)),'bottom':alpha.crop((0,im.height-1,im.width,im.height)),'left':alpha.crop((0,0,1,im.height)),'right':alpha.crop((im.width-1,0,im.width,im.height))}.items()}
 edgeMax=max(alpha.crop((0,0,im.width,1)).getextrema()[1],alpha.crop((0,im.height-1,im.width,im.height)).getextrema()[1],alpha.crop((0,0,1,im.height)).getextrema()[1],alpha.crop((im.width-1,0,im.width,im.height)).getextrema()[1])
 row={'maxEdgeAlpha':edgeMax,'solidAlphaBounds':alpha.point(lambda a:255 if a>128 else 0).getbbox(),'pose':label,'path':str(p.resolve().relative_to(ROOT)),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'dimensions':im.size,'bytes':p.stat().st_size,'alphaBounds':bbox,'nonzeroEdgePixels':edges,'transparentPixels':alpha.histogram()[0]}
 rows.append(row)
 # Identical raw-pixel scale for every source, never height-fit posed bodies.
 tile=im.resize((round(im.width*.28),round(im.height*.28)),Image.Resampling.LANCZOS)
 for y,bg in [(0,'#eee8db'),(450,'#24323e')]:
  x=i*450;draw.rectangle((x,y,x+449,y+449),fill=bg)
  draw.text((x+16,y+12),label+(' APPROVED' if label=='F3' else ' CANDIDATE'),font=font,fill='#777777' if y==0 else '#dddddd')
  board.paste(tile,(x+(450-tile.width)//2,y+410-tile.height),tile)
  draw.text((x+16,y+420),'Source pixels x 0.28',font=font,fill='#777777' if y==0 else '#dddddd')
 assert row['transparentPixels']>0
 if label=='F3':assert row['sha256']=='0049d9610e46b0d3ad5cffff6e54a94190786992999b282eef2253c8c019b206'
 else:
  padded=Image.new('RGBA',(im.width+80,im.height+80));padded.paste(im,(40,40))
  assert padded.crop((40,40,40+im.width,40+im.height)).tobytes()==im.tobytes()
  padpath=OUT/(Path(file).stem.replace('-master','')+'-padded.png');padded.save(padpath)
  row['padding']={'path':str(padpath.relative_to(ROOT)),'pixels':40,'exactRGBAcropBack':True,'sha256':hashlib.sha256(padpath.read_bytes()).hexdigest()}
  assert edgeMax<=8, row
board.save(OUT/'four-pose-review.png')
report={'status':'CANDIDATES — F1/F2/F4 PLAYER REVIEW PENDING; F3 previously approved','tool':'built-in image_gen, three independent calls plus targeted F4 costume correction and distinct F2 revision','references':['public/assets/characters/botuo/identity.png','public/assets/characters/botuo/battleIdle.png','docs/art/candidates/botuo/heavy/key-pose-v1/F3-contact-master.png'],'poses':rows,'reviewPolicy':'Same .28 raw-pixel scale and bottom aligned source canvases for review only. No silhouette height fitting; not an authored anatomical normalization, runtime size, support-foot or timing proof. Source PNGs unmodified. Faint edge alpha retained; separate40px padding derivatives prove exact RGBA crop-back and clear outer bounds. F3 known alpha1 left edge retained. No integration or deployment.','selfReview':'Complete horns/2 arms/2 legs/hooves in selected figures; one beast bracer, other smaller cuff; no baked effects. F1 loaded, F2 bracer crosses chest, F3 peak extended, F4 lowered guard. Initial F2 too close to F3 was superseded. Selected F2 now bent elbow/diagonal bracer close to chest, visibly short of F3 full reach. Player must assess continuity/readability. Perspective changes bracer/face projection; body/gear continuity remains review scope. F4 first draft invented chest emblem/white waist tufts; superseded after targeted correction, not used as approved reference.'}
(OUT/'verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,ensure_ascii=False,indent=2))
