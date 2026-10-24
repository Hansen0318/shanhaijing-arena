"""Encoded-art QA only; never claims Runtime event or lifecycle verification."""
import sys,importlib.util,json,subprocess,hashlib
from pathlib import Path
from PIL import Image,ImageChops,ImageOps
sys.dont_write_bytecode=True
OUT=Path(__file__).resolve().parent;ROOT=OUT.parents[5]
s=importlib.util.spec_from_file_location('revision',OUT/'prepare_review.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
checks=[]
def check(name,value):
 assert value,name;checks.append(name)
manifest=json.loads((OUT/'manifest.json').read_text())
for p,h in manifest['sourcesSha256'].items():check('source hash '+p,sha(ROOT/p)==h)
for receipt in ['style-v2','composite-review-v1']:
 q=ROOT/f'docs/art/approved/chiru/passive/{receipt}/acceptance.json';d=json.loads(q.read_text())
 for p,h in d['evidenceSha256'].items():check('approved receipt '+p,sha(ROOT/p)==h)
renderers={'tiers-normal.gif':lambda t:m.m.tier_board(t),'tiers-reduced.gif':lambda t:m.m.tier_board(t,True),'vfx-only.gif':lambda t:m.m.tier_board(t,solo=True),'directions-idle.gif':m.m.directions,'other-recipient.gif':m.m.recipient_scene,'self-zero.gif':m.m.self_zero,'recipient-ko.gif':lambda t:m.m.recipient_scene(t,cleanup='recipientKO'),'caster-ko.gif':lambda t:m.m.recipient_scene(t,cleanup='casterKO'),'lifecycle.gif':m.m.lifecycle,'crowded-comparison.gif':m.compare,'crowded-reduced.gif':lambda t:m.compare(t,True)}
rows=[]
for name,render in renderers.items():
 p=OUT/name;decoded=[];dur=[]
 with Image.open(p) as im:
  palette=im.getpalette()
  for i in range(im.n_frames):im.seek(i);im.load();decoded.append(im.convert('RGB').copy());dur.append(im.info['duration'])
 check(name+' duration',sum(dur)==1800)
 # Compare every scripted sample to encoded output in its shared global palette.
 pal=Image.new('P',(1,1));pal.putpalette(palette)
 for t in m.m.TIMES[:-1]:
  k=0;elapsed=0
  while elapsed+dur[k]<=t:elapsed+=dur[k];k+=1
  wanted=render(t).convert('RGB').quantize(palette=pal,dither=Image.Dither.NONE).convert('RGB')
  check(name+' encoded sample '+str(t),wanted.tobytes()==decoded[k].tobytes())
 rows.append({'name':name,'frames':len(decoded),'durationMs':sum(dur),'fullDecode':True,'sha256':sha(p)})
for tier in range(4):
 check('alpha exact T'+str(tier),m.newcues[tier].getchannel('A').tobytes()==m.oldcues[tier].getchannel('A').tobytes())
 for reduced in [False,True]:
  for age in [-1,0,200,300,600,650]:
   r=m.actor_field(tier,age,reduced);l=m.actor_field(tier,age,reduced,True)
   check(f'mirror T{tier} {reduced} {age}',l.tobytes()==ImageOps.mirror(r).tobytes())
  check(f'650ms clear T{tier} {reduced}',m.actor_field(tier,650,reduced).tobytes()==m.actor_field(tier,0,reduced,mark=False).tobytes())
 # Static reduced geometry: at100 and300ms the alpha differs only by prescribed fade.
 a=m.m.fx(tier,100,True);b=m.m.fx(tier,300,True)
 check('reduced fixed pixels T'+str(tier),m.opacity(a,(650-300)/450).tobytes()==b.tobytes())
# Fully opaque subject interior receives no rim; no body tint or resize.
a=m.base_idle.getchannel('A');interior=a.point(lambda x:255 if x==255 else 0)
check('no full body mask',ImageChops.multiply(m.rim_idle.getchannel('A'),interior).getbbox() is None)
check('crowded scale pair',m.phone(0).size==m.phone(0,False).size==(852,393))
protected=['src','public','tests','scripts','.github','package.json','package-lock.json','docs/art/approved']
changed=subprocess.check_output(['git','diff','--name-only','3d156f62f75bdf8d6a8105d736ecb4a9cb1d4d16','--',*protected],cwd=ROOT,text=True).strip()
check('protected baseline diff empty',not changed)
proof={'status':'UNCHANGED-SOURCE REUSE ONLY','baseline':'3d156f62f75bdf8d6a8105d736ecb4a9cb1d4d16','protectedScopes':protected,'gitDiff':changed,'oldEvidence':'docs/verification/P3_PASSIVE_RUNTIME/REPORT.md','oldEvidenceSha256':sha(ROOT/'docs/verification/P3_PASSIVE_RUNTIME/REPORT.md'),'newRuntimeEvidence':False,'reusedFiles':{p:sha(ROOT/p) for p in ['src/runtime/assetPresenter.js','src/runtime/passivePresenter.js','src/runtime/telegraphs.js','src/runtime/ArenaScene.js','src/combat/passiveRuntime.js','src/roster/catalog.js','src/roster/abilities.js','docs/verification/P3_PASSIVE_RUNTIME/browser/native.json','docs/verification/P3_PASSIVE_RUNTIME/browser/built-entry.json','docs/verification/P3_PASSIVE_RUNTIME/public-fingerprint.json']}}
(ROOT/'docs/verification/P3_PASSIVE_RUNTIME/readability-revision/reuse-proof.json').write_text(json.dumps(proof,indent=2)+'\n')
report={'status':'ENCODED ART QA PASS / PLAYER REVIEW PENDING','runtimeEvidence':False,'reviewer':'native single-worker self-review; no independent delegation','checks':len(checks),'checkNames':checks,'gifs':rows,'limitations':['Scripted art only; no real gameplay Pause/KO/CD/fallback/retirement proof.','Phone viewport is a simulation with source-based density; not captured runtime or physical iPhone.']}
(OUT/'encoded-verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'status':report['status'],'checks':len(checks),'gifs':len(rows),'frames':sum(r['frames'] for r in rows),'protectedDiffEmpty':True}))
