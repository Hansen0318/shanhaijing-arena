"""Read actual encoded GIFs; verify review pixels, never claims game behavior."""
from pathlib import Path
from PIL import Image
import json, hashlib, subprocess
P=Path(__file__).resolve().parent
R=P.parents[5]
def frame(name,t):
    im=Image.open(P/name);elapsed=0
    for i in range(im.n_frames):
        im.seek(i);im.load()
        if elapsed+im.info['duration']>t:return im.convert('RGB').copy()
        elapsed+=im.info['duration']
    raise AssertionError((name,t))
def eq(a,b):return a.tobytes()==b.tobytes()
checks=[]
def check(name,v):
    assert v,name
    checks.append({'check':name,'pass':True})
for name in ['tiers-normal.gif','tiers-reduced.gif']:
    for x,y in [(20,124),(380,124),(20,494),(380,494)]:
        box=(x,y,x+320,y+290)
        check(name+f' Idle at exact expiry / {x},{y}',eq(frame(name,0).crop(box),frame(name,1050).crop(box)))
for name in ['directions-idle.gif','self-zero.gif']:
    for x in [20,380]:
        box=(x,124,x+320,414)
        check(name+f' return Idle / {x}',eq(frame(name,0).crop(box),frame(name,1050).crop(box)))
box=(380,124,700,414)
check('zero-heal field unchanged at every visual sample',all(eq(frame('self-zero.gif',0).crop(box),frame('self-zero.gif',t).crop(box)) for t in range(400,1100,50)))
for name in ['other-recipient.gif','caster-ko.gif']:
    box=(460,115,780,415)
    check(name+' recipient clear at expected time',eq(frame(name,0).crop(box),frame(name,700 if name=='caster-ko.gif' else 1050).crop(box)))
box=(40,115,360,415)
check('other-recipient caster never owns mark',all(eq(frame('other-recipient.gif',0).crop(box),frame('other-recipient.gif',t).crop(box)) for t in range(400,1100,50)))
for idx,kind in enumerate(['end','Restart','destroy','expiry']):
    x=20+(idx%2)*360;y=124+(idx//2)*370;box=(x,y,x+320,y+290)
    final=frame('lifecycle.gif',1050 if kind=='expiry' else 700).crop(box)
    if kind in ['end','destroy']:
        colors=final.getcolors(100000)
        check(kind+' removes scene actors and VFX in scripted field',len(colors)==1)
    else:check(kind+' clears mark and returns clean Idle',eq(frame('lifecycle.gif',0).crop(box),final))
check('scripted repeated destroy remains empty',eq(frame('lifecycle.gif',700).crop((20,494,340,784)),frame('lifecycle.gif',800).crop((20,494,340,784))))
for name,x in [('recipient-ko.gif',460),('caster-ko.gif',40)]:
    colors=frame(name,700).crop((x,115,x+320,415)).getcolors(100000)
    check(name+' removes correct mock actor and its mark',len(colors)==1)
for p,h in json.loads((P/'manifest.json').read_text())['sourcesSha256'].items():
    check('immutable '+p,hashlib.sha256((R/p).read_bytes()).hexdigest()==h)
delta=subprocess.check_output(['git','diff','--name-only','d3cf58c','--','src','public','scripts','tests','package.json','package-lock.json','.github'],cwd=R,text=True)
check('product source unchanged',delta=='')
q={'status':'ENCODED REVIEW PIXEL CHECKS PASS / NOT RUNTIME','checks':checks,
   'notClaimed':['Actual healing, cooldown, controls, target selection, lifecycle cleanup or deployment.',
                 'Player GIF acceptance or phone viewport readability.']}
(P/'encoded-verification.json').write_text(json.dumps(q,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'checks':len(checks),'failed':0,'scope':'encoded art review pixels only'}))
