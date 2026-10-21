"""Review only: preserve masters, add exact transparent padding, place with ONE uniform scale.
No GIF, animation cells, runtime atlas or pose-height/head-only fitting.
"""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import hashlib,json
out=Path(__file__).resolve().parent
root=Path(__file__).resolve().parents[6]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
sources={'F1':out/'F1-load-master.png','F2':out/'F2-downstroke-master.png','F3':root/'docs/art/candidates/botuo/awakening/key-pose-v2/F3-downward-master.png','F4':out/'F4-recovery-master.png'}
receipt=json.loads((root/'docs/art/approved/botuo/awakening/f3-v2/acceptance.json').read_text())
assert sha(sources['F3'])==receipt['master']['sha256']
assert sha(root/receipt['source']['path'])==receipt['source']['sha256']
qa={};pad=48
for f,p in sources.items():
 im=Image.open(p).convert('RGBA');im.load();a=im.getchannel('A')
 padded=Image.new('RGBA',(im.width+pad*2,im.height+pad*2));padded.paste(im,(pad,pad))
 assert padded.crop((pad,pad,pad+im.width,pad+im.height)).tobytes()==im.tobytes()
 if f!='F3':padded.save(out/f'{f}-candidate.png')
 b=padded.getchannel('A').getbbox();assert min(b[0],b[1],padded.width-b[2],padded.height-b[3])>=48
 opaque=a.point(lambda v:255 if v>=128 else 0).getbbox()
 qa[f]={'source':str(p.relative_to(root)),'sourceSha256':sha(p),'sourceSize':im.size,'alphaBBox':a.getbbox(),'opaqueBBox':opaque,'paddedBBox':b,'allSourceRgbaRetained':True,'padding':48,'sourceEdgeNoisePreserved':True,'poseHeightScaleFit':False,'runtimeVerified':False}
# Translation comes from visible support-hoof family; scale .38 is identical across all four sources.
# These are review coordinates, never actor layout or proven runtime ground/pivot.
anchors={'F1':(740,1125),'F2':(710,1111),'F3':(705,1098),'F4':(742,1130)}
scale=.38;cell=(600,530);labels={'F1':'F1  LOAD','F2':'F2  DOWNSTROKE','F3':'F3  APPROVED','F4':'F4  RECOVERY'}
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',22)
transforms={}
for theme,color,ink in [('light',(244,242,235,255),(30,35,42)),('dark',(24,29,38,255),(240,240,240))]:
 board=Image.new('RGBA',(cell[0]*2,cell[1]*2),color);draw=ImageDraw.Draw(board)
 for index,(f,p) in enumerate(sources.items()):
  im=Image.open(p).convert('RGBA');sm=im.resize((round(im.width*scale),round(im.height*scale)),Image.Resampling.LANCZOS)
  cx=(index%2)*cell[0];cy=(index//2)*cell[1];ax,ay=anchors[f];x=round(cx+cell[0]/2-ax*scale);y=round(cy+490-ay*scale)
  assert x>=cx and y>=cy+35 and x+sm.width<=cx+cell[0] and y+sm.height<=cy+cell[1]
  board.alpha_composite(sm,(x,y));draw.text((cx+20,cy+14),labels[f],font=font,fill=ink)
  transforms[f]={'scaleXY':[scale,scale],'sourceSupportAnchor':anchors[f],'placedAt':[x,y],'cell':[cx,cy,*cell],'notes':'Common .38 source-pixel scale, support translation only, no individual body/height fit; not final runtime density or pivot'}
 board.convert('RGB').save(out/f'four-pose-{theme}.png')
(out/'qa.json').write_text(json.dumps({'frames':qa,'reviewTransforms':transforms,'reviewOnly':True,'f3Unchanged':True},indent=2)+'\n')
refs=[root/'public/assets/characters/botuo/identity.png',root/'public/assets/characters/botuo/battleIdle.png',root/receipt['source']['path']]
manifest={'status':'F1/F2/F4 CANDIDATES / FULL FOUR-POSE PLAYER REVIEW PENDING','f3Status':'PLAYER ART APPROVED; exact master/source protected','approvalReceipt':'docs/art/approved/botuo/awakening/f3-v2/acceptance.json','approvalCheckpoint':'cddb7047195884a80a07c4a75a1ec492c7baf5fd','generator':'built-in image_gen.imagegen; three independent single-pose calls, no four-up generation','references':[{'path':str(p.relative_to(root)),'sha256':sha(p)} for p in refs],'frames':{f:{'master':str(p.relative_to(root)),'sha256':sha(p),'candidate':str((out/f'{f}-candidate.png').relative_to(root)) if f!='F3' else receipt['source']['path'],'playerApproved':f=='F3'} for f,p in sources.items()},'files':{p.name:{'sha256':sha(p),'bytes':p.stat().st_size} for p in sorted(out.iterdir()) if p.is_file() and p.name not in ['manifest.json','README.md','visual-review.json']},'scope':'Individual body-pose art plus static review only, no VFX/GIF/executable contract/runtime/deploy','nextGate':'Player review of F1/F2/F4 and complete four-pose design; F3 approval retained'}
(out/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('PASS four sources decode, protected F3 hashes, exact padded RGBA, clear borders, uniform-scale review layout')
