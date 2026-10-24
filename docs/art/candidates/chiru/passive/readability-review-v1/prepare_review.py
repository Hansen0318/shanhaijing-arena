"""Deterministic requested PNG/display derivatives; SCRIPTED ART SIMULATION ONLY.
No image generation, gameplay imports, runtime output or approved source writes.
"""
from pathlib import Path
from PIL import Image, ImageOps, ImageChops, ImageFilter
import importlib.util, json, hashlib, math, sys
sys.dont_write_bytecode=True
OUT=Path(__file__).resolve().parent; ROOT=OUT.parents[5]
OLD=OUT.parent/'composite-review-v1'; STYLE=OUT.parent/'style-v2'
spec=importlib.util.spec_from_file_location('accepted_review',OLD/'prepare_gifs.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
R=Image.Resampling.LANCZOS
sources={}
def read(p):
 sources[str(p.relative_to(ROOT))]=m.sha(p);return m.read(p)
def opacity(im,a):
 im=im.copy();im.putalpha(im.getchannel('A').point(lambda x:round(x*max(0,min(1,a)))));return im
def rim(im,r=3):
 a=im.getchannel('A');outer=ImageChops.subtract(a.filter(ImageFilter.MaxFilter(2*r+1)),a)
 edge=Image.new('RGBA',im.size,(105,255,195,0));edge.putalpha(outer)
 # Transparent exterior only: no fill/tint inside the subject.
 return edge

def prepare():
 fish=read(STYLE/'paired-fish-display.png'); a=fish.getchannel('A')
 # Preserve shape/alpha; map existing light/dark structure to white with mint shadows.
 pixels=[]
 for red,green,blue,alpha in fish.getdata():
  lum=(red*.2126+green*.7152+blue*.0722)/255
  pixels.append((round(181+74*lum),round(232+23*lum),round(216+39*lum),alpha))
 white=Image.new('RGBA',fish.size);white.putdata(pixels)
 white.save(OUT/'paired-fish-white.png')
 for tier in range(4):
  stroke=read(STYLE/f'T{tier}-strokes.png');mapped=Image.new('RGBA',stroke.size)
  mapped.putdata([(112,255,198,a) if g>100 else (12,78,63,a) for r,g,b,a in stroke.getdata()])
  mapped.save(OUT/f'T{tier}-strokes-mint.png')
  cue=white.copy();cue.alpha_composite(mapped);cue.save(OUT/f'T{tier}-style.png')
 return [m.read(OUT/f'T{t}-style.png') for t in range(4)]

newcues=prepare(); oldcues=[read(STYLE/f'T{t}-style.png') for t in range(4)]
base_idle=read(m.IDLE);m.OUT=OUT;m.cues=newcues
rim_idle=rim(base_idle);rim_idle.save(OUT/'idle-rim-reference-only.png')
# This rim is a display mockup reference, not an Idle replacement or universal runtime texture.
def phase(age):return 0 if age<0 or age>=650 else (1 if age<=200 else (650-age)/450)
def actor_field(tier,age,reduced=False,left=False,mark=True,visible=True):
 field=Image.new('RGBA',(320,300));body=ImageOps.mirror(base_idle) if left else base_idle
 if visible:
  if mark:field.alpha_composite(opacity(ImageOps.mirror(rim_idle) if left else rim_idle,phase(age)))
  field.alpha_composite(body)
 # Proposed foreground fish below HUD/warnings, instead of behind the body.
 if mark:field.alpha_composite(m.fx(tier,age,reduced,left),(62 if left else 58,123))
 return field
m.actor_field=actor_field

# Source-driven actual logical stage density. Not a captured/built phone viewport.
AUDIT=ROOT/'docs/verification/P3_PASSIVE_RUNTIME/readability-revision/source-audit.json'
geo=json.loads(AUDIT.read_text())['actorGeometry'];sources[str(AUDIT.relative_to(ROOT))]=m.sha(AUDIT)
actors={}
for id,name in [('P1','lushu'),('P2','botuo'),('P3','chiru')]:
 p=ROOT/f'public/assets/characters/{name}/battleIdle.png'
 if id=='P1':p=ROOT/'public/assets/characters/lushu/battleIdle-static.png'
 im=read(p);d=geo[id]['idle'];w,h=im.size;density=72*d['scale']/max(w,h)
 actors[id]=(im.resize((round(w*density),round(h*density)),R),d['origin'])
blue=read(ROOT/'public/assets/chiru-heavy-runtime-v1/column.png')
impact=read(ROOT/'public/assets/chiru-heavy-runtime-v1/impact.png')

POSITIONS=[('P3',(280,305),False),('P2',(465,323),False),('P1',(560,365),False),('P2',(675,315),True),('P1',(610,240),True),('P3',(805,280),True)]
def phone(age,revised=True,reduced=False):
 stage=Image.new('RGBA',(1120,540),'#8e7b5a');d=m.ImageDraw.Draw(stage)
 d.ellipse((420,185,700,355),outline='#5f513b',width=2)
 d.line((90,270,1030,270),fill='#5f513b',width=2)
 # Identical blue action fragments in both panels; not extra Passive damage.
 stage.alpha_composite(opacity(blue.resize((300,110),R),.85),(480,240))
 stage.alpha_composite(opacity(impact.resize((145,100),R),.8),(600,290))
 for i,(id,(x,y),left) in enumerate(POSITIONS):
  body,origin=actors[id];body=ImageOps.mirror(body) if left else body
  bx=round(x-body.width*origin[0]);by=round(y-body.height*origin[1])
  if i==1 and not revised:
   # Existing Passive depth4 below actor depth5, using exact old cue at180x144.
   save=m.cues;m.cues=oldcues;cue=m.fx(3,age,reduced).resize((180,144),R);m.cues=save
   stage.alpha_composite(cue,(x-90,y-72))
  stage.alpha_composite(body,(bx,by))
  # Same neutral HP bar footprint in both mock panels; no battlefield nameplate.
  d.rectangle((x-29,by-10,x+29,by-4),fill='#18242c');d.rectangle((x-28,by-9,x+5,by-5),fill='#69cbff' if not left else '#ff8178')
 if revised:
  body,origin=actors['P2'];x,y=POSITIONS[1][1];bx=round(x-body.width*origin[0]);by=round(y-body.height*origin[1])
  stage.alpha_composite(opacity(rim(body,3),phase(age)),(bx,by))
  stage.alpha_composite(m.fx(3,age,reduced).resize((180,144),R),(x-90,y-72))
 scale=min(852/1120,393/540);wh=(round(1120*scale),round(540*scale))
 viewport=Image.new('RGBA',(852,393),'#102733');viewport.alpha_composite(stage.resize(wh,R),((852-wh[0])//2,0));return viewport

def compare(t,reduced=False):
 im=m.canvas(852,1000,'YOUXI / SAME-SCALE CROWDED PHONE COMPARISON','Matched 852 x 393 viewport / same actors, blue FX and scale')
 m.label(im,(20,78),'BEFORE / blue fish behind beneficiary',19)
 im.alpha_composite(phone(t-400,False,reduced),(0,108))
 m.label(im,(20,522),'REVISION / mint rim + white fish / '+('REDUCED' if reduced else 'NORMAL'),19)
 im.alpha_composite(phone(t-400,True,reduced),(0,554))
 return im

def main():
 m.main()
 m.save_gif('crowded-comparison.gif',compare)
 m.save_gif('crowded-reduced.gif',lambda t:compare(t,True))
 compare(400).convert('RGB').save(OUT/'crowded-comparison.png')
 # Paused identical-time repeats are a simulation only, not real Pause proof.
 assert compare(500).tobytes()==compare(500).tobytes()
 for tier in range(4):
  assert newcues[tier].size==oldcues[tier].size==(200,160)
  assert newcues[tier].getchannel('A').tobytes()==oldcues[tier].getchannel('A').tobytes()
  assert actor_field(tier,650).tobytes()==actor_field(tier,650,mark=False).tobytes()
  assert actor_field(tier,100,mark=False).tobytes()==actor_field(tier,-1,mark=False).tobytes()
 for p,h in sources.items():assert m.sha(ROOT/p)==h,p
 manifest=json.loads((OUT/'manifest.json').read_text());manifest.update(status='REVISED VISUAL/GIF PLAYER REVIEW PENDING',baseline='3d156f62f75bdf8d6a8105d736ecb4a9cb1d4d16',preArtRemoteCheckpoint='f61a3d4be2f64d6a66ecc68818aa25d8aa6c4b57',sourceTreatment='Requested deterministic white/mint color mapping, outside-alpha recipient rim, foreground fish. Immutable accepted sources. No regeneration or GIF extraction.',sourcesSha256={**manifest['sourcesSha256'],**sources},files=m.REPORTS,displayProposal={'fishLayer':6,'recipientRim':'outside current visible actor silhouette only; follow current pose/frame and flip, not this static Idle reference','rimWidthLogicalPx':3,'rimColor':'#69ffc3','lifetimeMs':650,'normal':'fish inward return after200ms; rim fades without scaling body','reduced':'same Tier shape/position; opacity-only fade','phoneViewport':[852,393],'logicalStage':[1120,540],'phoneScale':393/540,'beneficiary':'second actor, P2 teammate; no marker on caster','runtimeIntegrated':False,'gameplayChanged':False})
 (OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
 verification=json.loads((OUT/'verification.json').read_text());verification.update(status='ART DERIVATIVE CHECKS PASS / REVISED VISUAL REVIEW PENDING',gifDecode=m.REPORTS,sourceAlphaPreserved=True,allSourceHashesUnchanged=True,recipientRimExteriorOnly=True,phoneComparison='Source-driven simulated logical density; NOT captured built runtime or physical device evidence',limitations=['No new gameplay/event/cleanup/renderer proof; all cases are scripted art simulations.','Runtime will need generic current-frame silhouette rim and loaded formal-source resolution, after visual approval.','Three-pixel rim is exterior-only; character pixels/scale/anchor unchanged.','Phone actors are static source PNGs; surrounding blue FX are fixed decorative samples from approved files.'])
 (OUT/'verification.json').write_text(json.dumps(verification,indent=2)+'\n')
 print(json.dumps({'gifs':len(m.REPORTS),'sourceFiles':len(sources),'runtime':False}))
if __name__=='__main__':main()
