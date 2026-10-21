"""Deterministic lossless padding and review backgrounds; never redraw or rescale master."""
from pathlib import Path
from PIL import Image
import hashlib,json
root=Path(__file__).resolve().parents[6]
out=Path(__file__).resolve().parent
def digest(p): return hashlib.sha256(p.read_bytes()).hexdigest()
source=out/'F3-downward-master.png'
im=Image.open(source).convert('RGBA'); pad=48
candidate=Image.new('RGBA',(im.width+pad*2,im.height+pad*2))
candidate.paste(im,(pad,pad))
assert candidate.crop((pad,pad,pad+im.width,pad+im.height)).tobytes()==im.tobytes()
candidate.save(out/'F3-candidate.png')
for name,color in [('light',(244,242,235,255)),('dark',(24,29,38,255))]:
 bg=Image.new('RGBA',candidate.size,color); bg.alpha_composite(candidate); bg.convert('RGB').save(out/f'qa-{name}.png')
a=candidate.getchannel('A'); bbox=a.getbbox()
assert min(bbox[0],bbox[1],candidate.width-bbox[2],candidate.height-bbox[3])>=48
refs=['public/assets/characters/botuo/identity.png','public/assets/characters/botuo/battleIdle.png','docs/art/candidates/botuo/heavy/key-pose-v1/F3-contact-master.png','docs/art/candidates/botuo/special/key-pose-v1/F3-protection-master.png']
qa={'mode':'RGBA','sourceSize':im.size,'candidateSize':candidate.size,'paddingPixels':pad,'allSourceRgbaPreserved':True,'resizeOrRecolor':False,'alphaExtrema':a.getextrema(),'sourceAlphaBBox':im.getchannel('A').getbbox(),'candidateAlphaBBox':bbox,'sourceEdgeNote':'Source contains alpha=1 pixels on left/bottom outer edges. Preserved, not cleaned or called clipping-free runtime evidence. Opaque silhouette inspected separately on light/dark backgrounds.','opaqueAlphaBBox':im.getchannel('A').point(lambda x:255 if x>=128 else 0).getbbox(),'outerBorderTransparent':True,'runtimeScaleAnchorBudgetVerified':False}
(out/'qa.json').write_text(json.dumps(qa,indent=2)+'\n')
manifest={'status':'CANDIDATE / PLAYER REVIEW PENDING','generatedDate':'2026-10-21','timezone':'Asia/Taipei','generator':'built-in image_gen.imagegen','generationCount':1,'sourceCommit':'8d7fb0b863e45e8a247780632ab79955eb361ae8','scope':'ONE character-only Awakening F3 downward-release key pose; no other frames/VFX/GIF/runtime/deployment','source':'F3-downward-master.png','selectedCandidate':'F3-candidate.png','references':[{'path':p,'sha256':digest(root/p)} for p in refs],'files':{p.name:{'sha256':digest(p),'bytes':p.stat().st_size} for p in sorted(out.iterdir()) if p.is_file() and p.name not in ['manifest.json','README.md']},'qa':qa,'approval':None}
(out/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('PASS source RGBA roundtrip, alpha/padding, four reference hashes and QA manifest')
