"""Art-only static STYLE review. No combat, gameplay state, final GIF or runtime edits.
Preserve original RGBA. Tier strokes are separate programmatic overlay proposals.
"""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont,ImageOps,ImageFile
import hashlib,json,math
ImageFile.LOAD_TRUNCATED_IMAGES=False
OUT=Path(__file__).resolve().parent;ROOT=OUT.parents[5]
R=Image.Resampling.LANCZOS
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def text(im,xy,s,size=20,color='#e4f7fa'):
 ImageDraw.Draw(im).text(xy,s,font=ImageFont.truetype(FONT,size),fill=color)
def read(p):
 with Image.open(p) as im:im.verify()
 im=Image.open(p);im.load();assert im.mode=='RGBA';return im

a=read(OUT/'originals/paired-fish.png')
pad=Image.new('RGBA',(a.width+512,a.height+512));pad.paste(a,(256,256))
assert pad.crop((256,256,256+a.width,256+a.height)).tobytes()==a.tobytes()
pad.save(OUT/'paired-fish-padded.png')
# No crop/alpha threshold/repaint. Display scales are REVIEW proposals only.
base=Image.new('RGBA',(200,160));small=a.resize((144,96),R);base.alpha_composite(small,(28,32))
base.save(OUT/'paired-fish-display.png')
records=[]
for tier in range(4):
 overlay=Image.new('RGBA',base.size);d=ImageDraw.Draw(overlay)
 # Each group = TWO short inward curves; added in lower-right,lower-left,right,left order (visible around beneficiary).
 for group in range(tier+1):
  theta=[math.pi/3,2*math.pi/3,0,math.pi][group]
  for off in [-.09,.09]:
   points=[]
   for k in range(17):
    t=k/16;r=1-.16*t;ang=theta+off+.22*(t-.5)
    points.append((100+88*r*math.cos(ang),80+65*r*math.sin(ang)))
   d.line(points,fill='#08455b',width=6);d.line(points,fill='#5ff4f2',width=3)
 overlay.save(OUT/f'T{tier}-strokes.png')
 cue=base.copy();cue.alpha_composite(overlay);cue.save(OUT/f'T{tier}-style.png')
 records.append({'tier':f'T{tier}','fraction':[.08,.12,.16,.2][tier],'strokeGroups':tier+1,'strokesPerGroup':2,'fishCount':2,'displaySize':[200,160]})
idlepath=ROOT/'docs/art/candidates/chiru/awakening/composite-review-v1/approved-idle-return-cell.png'
idle=read(idlepath);assert idle.size==(320,260)
# Header + four same-size columns. Text is reviewer annotation outside the battlefield.
board=Image.new('RGBA',(1280,970),'#102733')
text(board,(32,22),'CHIRU / YOUXI - RECIPIENT STYLE',30)
text(board,(32,67),'ART CANDIDATE  |  Static placement proposal  |  NOT GAMEPLAY',18,'#99bdc9')
for tier in range(4):
 x=320*tier
 d=ImageDraw.Draw(board);d.rounded_rectangle((x+12,110,x+308,945),18,fill='#183947',outline='#345866',width=2)
 text(board,(x+34,130),f'T{tier}  /  {[8,12,16,20][tier]}% max HP',24)
 text(board,(x+34,168),f'{tier+1} flow group'+('s' if tier else ''),18,'#7df5ee')
 cue=read(OUT/f'T{tier}-style.png')
 # enlarged inspection panel (same scale for all tiers)
 board.alpha_composite(cue.resize((280,224),R),(x+20,220))
 text(board,(x+34,455),'Beneficiary placement',18)
 cell=Image.new('RGBA',(320,290));cell.alpha_composite(cue,(58,123));cell.alpha_composite(idle)
 board.alpha_composite(cell,(x,495))
 # reduced motion is a static proposed cue, not a second treatment/effect.
 text(board,(x+34,805),'Reduced: same static cue',16,'#99bdc9')
 text(board,(x+34,840),'Lifetime: 650 ms / then gone',16,'#99bdc9')
 text(board,(x+34,875),'1 positive heal / no buff',16,'#99bdc9')
board.convert('RGB').save(OUT/'tier-style-review.png')
# A separate other-beneficiary scene: caster on left, recipient on right.
scene=Image.new('RGBA',(880,420),'#8e7b5a')
text(scene,(25,18),'ART PREVIEW / POSITIVE HEAL RECIPIENT ONLY',22,'#ffffff')
scene.alpha_composite(idle,(40,100));scene.alpha_composite(read(OUT/'T3-style.png'),(518,223));scene.alpha_composite(idle,(460,100))
text(scene,(84,365),'Caster: no mark',18,'#ffffff');text(scene,(500,365),'Beneficiary: T3 mark',18,'#ffffff')
scene.convert('RGB').save(OUT/'recipient-placement-review.png')
# QA source round trip and per-file full decode; do not claim gameplay tests.
rows=[]
for p in sorted(OUT.rglob('*.png')):
 im=Image.open(p);im.verify();im=Image.open(p);im.load()
 row={'path':str(p.relative_to(ROOT)),'sha256':sha(p),'size':im.size,'mode':im.mode,'strictFullDecode':True,'bytes':p.stat().st_size}
 if im.mode=='RGBA':
  alpha=im.getchannel('A');row.update(alphaRange=alpha.getextrema(),alphaBounds=alpha.getbbox())
 rows.append(row)
q={'status':'STYLE CANDIDATE / PLAYER REVIEW PENDING','baseline':'80408c41547a50e7bba25c7211608894d7227c54','preArtRemoteCheckpoint':'24356a96e05b6e00a8f8f57508ee8f3860a70f17','mode':'built-in imagegen original + deterministic static Pillow composition','original':rows[[r['path'] for r in rows].index(str((OUT/'originals/paired-fish.png').relative_to(ROOT)))],'idleReference':{'path':str(idlepath.relative_to(ROOT)),'sha256':sha(idlepath),'unchanged':True,'cell':[320,260],'chestX':158,'hoverY':203},'tiers':records,'pixelPreservingPadding':[256,256],'paddingRoundTrip':True,'transparentCenter':a.getpixel((a.width//2,a.height//2))[3]==0,'files':rows,'runtimeIntegrated':False,'productionChanged':False,'deployed':False,'gifGatePassed':False,'artAccepted':False,'limitations':['STATIC ART SIMULATION, not Runtime healing/event/lifecycle evidence.','Source soft fringe and alpha maximum254 retained, no alpha threshold/delete/repaint. Original requested15% padding not achieved; 256px lossless padding added.','Review cue size/anchor and Tier strokes are proposals, not approved runtime descriptors.','650ms inward return + static reduced fade will be demonstrated at GIF gate only AFTER style approval.','Mirrors, moving actors, expiry/KO/casterKO/end/Restart/destroy require later GIF/runtime gates.']}
(OUT/'manifest.json').write_text(json.dumps(q,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'strictDecodedPngs':len(rows),'paddingRoundTrip':True,'transparentCenter':q['transparentCenter'],'idleSHA256':sha(idlepath),'originalSHA256':sha(OUT/'originals/paired-fish.png')},indent=2))
