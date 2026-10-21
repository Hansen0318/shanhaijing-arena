"""Static Tier recipient study from recorded actual production-path statuses, not a runtime capture."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import json,hashlib
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'docs/art/candidates/botuo/special/composite-review-v1'
data=json.loads((ROOT/'docs/art/candidates/botuo/special/key-pose-v1/mechanics-snapshot.json').read_text())
row=next(r for r in data['direct'] if r['tier']=='T1' and r['side']=='allies' and r['source']=='player')
byTarget={r['targetId']:r for r in row['statuses']};assert set(byTarget)=={'a1','a2'}
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',18)
aura=Image.open(OUT/'mitigation-state-raw-v1.png').convert('RGBA').resize((224,234),Image.Resampling.LANCZOS)
board=Image.new('RGBA',(960,360),'#192633');d=ImageDraw.Draw(board)
d.text((16,12),'T1 RECIPIENT STUDY / actual recorded targets a1 + a2, NOT whole team',font=font,fill='white')
sources=[]
for i,(actor,char,foot) in enumerate([('a1','botuo',158),('a2','chiru',160),('a3','jiuweihu',151)]):
 cx=160+i*320;ground=274
 if actor in byTarget:board.alpha_composite(aura,(cx-112,69))
 p=ROOT/f'public/assets/characters/{char}/battleIdle.png';im=Image.open(p).convert('RGBA').resize((144,144),Image.Resampling.LANCZOS)
 board.alpha_composite(im,(cx-72,ground-round(foot*.9)))
 label=f'{actor} / '+(f"{byTarget[actor]['magnitude']*100:g}% / {byTarget[actor]['expiryTime']:g}s" if actor in byTarget else 'NO STATUS / no aura')
 d.text((cx-140,308),label,font=font,fill='#f0c56d')
 sources.append({'actorId':actor,'source':str(p.relative_to(ROOT)),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'status':byTarget.get(actor)})
board.convert('RGB').save(OUT/'tier1-recipient-review.png')
(OUT/'recipient-review.json').write_text(json.dumps({'status':'ART RECIPIENT STUDY / NOT RUNTIME OR PHONE PROOF','recordedTier':'T1','sourceEvidence':'docs/art/candidates/botuo/special/key-pose-v1/mechanics-snapshot.json','sources':sources,'rules':['Only actual source/target status records receive aura. T1 single ally is existing behavior, not a new team shield.','P3/P4 approved static art only reused for a recipient illustration, no character development or source modification.','General future status presentation must handle all roster recipients through source/status ownership, no P2 identity branch.']},indent=2)+'\n')
print('PASS: T1 recorded recipient set exactly a1+a2, a3 has no aura; static art study written')

(OUT/'SHA256SUMS.json').write_text(json.dumps({p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(OUT.iterdir()) if p.is_file() and p.name!='SHA256SUMS.json'},indent=2)+'\n')
