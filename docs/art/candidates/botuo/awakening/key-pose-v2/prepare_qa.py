from pathlib import Path
from PIL import Image
import hashlib,json
out=Path(__file__).resolve().parent
root=Path(__file__).resolve().parents[6]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
im=Image.open(out/'F3-downward-master.png').convert('RGBA')
pad=48
c=Image.new('RGBA',(im.width+2*pad,im.height+2*pad));c.paste(im,(pad,pad))
assert c.crop((pad,pad,pad+im.width,pad+im.height)).tobytes()==im.tobytes()
c.save(out/'F3-candidate.png')
for name,color in [('light',(244,242,235,255)),('dark',(24,29,38,255))]:
 bg=Image.new('RGBA',c.size,color);bg.alpha_composite(c);bg.thumbnail((900,900),Image.Resampling.LANCZOS);bg.convert('RGB').save(out/f'qa-{name}.png')
a=c.getchannel('A');b=a.getbbox();assert min(b[0],b[1],c.width-b[2],c.height-b[3])>=48
refs=['public/assets/characters/botuo/identity.png','public/assets/characters/botuo/battleIdle.png']
qa={'sourceSize':im.size,'candidateSize':c.size,'sourceAlphaBBox':im.getchannel('A').getbbox(),'candidateAlphaBBox':b,'alphaExtrema':a.getextrema(),'padding':48,'allSourceRgbaRetained':True,'candidateResize':False,'qaBackgroundsOnlyDownsampled':True,'visualInspection':'Required after rendering: trace viewer-left shoulder/elbow/large beast bracer and viewer-right shoulder/elbow/small wrist bracer; exactly two legs and two hooves.','runtimeScaleAnchorBudgetVerified':False}
(out/'qa.json').write_text(json.dumps(qa,indent=2)+'\n')
m={'status':'CORRECTED CANDIDATE / PLAYER REVIEW PENDING','replaces':'key-pose-v1 rejected for swapped arm equipment; v1 files remain historical only','sourceCommit':'2fe062fbc288c71dd5c365c1adc5c1306282be89','playerFeedback':'妳有讀取確認的戰場角色形象呢，因為妳這個圖片和形象的配件左右不分','generator':'built-in image_gen.imagegen','calls':2,'history':[{'file':'draft-extra-hoof.png','status':'REJECTED / extra third central hoof, never use as downstream reference'},{'file':'F3-downward-master.png','status':'Selected corrected generation; generative cleanup is not pixel-exact preservation of draft'}],'selectedCandidate':'F3-candidate.png','references':[{'path':p,'sha256':sha(root/p)} for p in refs],'files':{p.name:{'sha256':sha(p),'bytes':p.stat().st_size} for p in sorted(out.iterdir()) if p.is_file() and p.name not in ['manifest.json','README.md','visual-review.json']},'qa':qa,'approval':None}
(out/'manifest.json').write_text(json.dumps(m,indent=2)+'\n');print('PASS alpha/padding, exact source-to-padded RGBA and reference hashes')
