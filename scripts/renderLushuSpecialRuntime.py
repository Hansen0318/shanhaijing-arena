"""Rasterize real presenter commands. Technical proof, not phone acceptance."""
from pathlib import Path
from PIL import Image,ImageDraw
import json,hashlib
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'docs/art/candidates/lushu/special/runtime-v1'
trace=json.loads((OUT/'presenter-trace.json').read_text());board=Image.new('RGBA',(900,1440),(32,43,57,255))
for row,s in enumerate(trace['scenarios']):
 f=next(f for f in s['frames'] if abs(f['time']-.32)<1e-8);panel=Image.new('RGBA',(900,360),(32,43,57,255));d=ImageDraw.Draw(panel);d.line((0,280,900,280),fill=(80,100,120))
 for o in sorted(f['objects'],key=lambda o:o['depth']):
  im=Image.open(ROOT/o['path']).convert('RGBA')
  if o['frame']:
   x,y,w,h=o['frame'];im=im.crop((x,y,x+w,y+h))
  im=im.resize((round(o['width']),round(o['height'])),Image.Resampling.LANCZOS)
  if o['flipX']:im=im.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
  im.putalpha(im.getchannel('A').point(lambda a:round(a*o['alpha'])))
  panel.alpha_composite(im,(round(o['x']-o['originX']*o['width']),round(o['y']-o['originY']*o['height'])))
 d.text((14,12),f"SPECIAL REAL320ms RESOLVE / {'LEFT' if s['sign']<0 else 'RIGHT'} / reduced={s['reducedMotion']}",fill='white');d.text((14,330),'Production draw-command reconstruction; NOT browser/phone recording.',fill='white');board.alpha_composite(panel,(0,row*360))
 assert len(s['damage'])==1
 assert any(e['phase']=='resolve' and e['hit'] and abs(e['resolvedAt']-.32)<1e-8 for e in s['events'])
board.convert('RGB').save(OUT/'contact-proof.png')
