"""Deterministic descriptor-based size study; not a gameplay screen recording."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageOps
import json

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'docs/verification/P2_BASIC_BODY_SCALE'
r=json.loads((OUT/'measurement.json').read_text())
idle=Image.open(ROOT/r['files'][0]['path']).convert('RGBA')
poses=Image.open(ROOT/r['files'][1]['path']).convert('RGBA')
board=Image.new('RGB',(2200,800),'#21313f')
draw=ImageDraw.Draw(board)
for row,key in enumerate(['before','after']):
    ground=row*400+355
    draw.text((15,row*400+12),key.upper()+' / exact descriptor geometry, 2x display; NOT gameplay capture',fill='white')
    draw.line((0,ground,2200,ground),fill='#82949f')
    for i in range(5):
        d=r['idle'] if i==0 else r[key]['animation']
        f=d['frames'][0 if i==0 else i-1]
        source=idle if i==0 else poses
        im=source.crop((f['x'],f['y'],f['x']+f['width'],f['y']+f['height']))
        density=72*d['scale']/max(f['width'],f['height'])
        pixel_scale=2*density
        im=im.resize((round(im.width*pixel_scale),round(im.height*pixel_scale)),Image.Resampling.LANCZOS)
        anchor=(i*440+155,ground)
        xy=(round(anchor[0]-d['origin'][0]*f['width']*pixel_scale),round(anchor[1]-d['origin'][1]*f['height']*pixel_scale))
        board.paste(im,xy,im)
        draw.text((i*440+20,row*400+38),('IDLE' if i==0 else 'F'+str(i))+' landmark '+str(round((25 if i==0 else 20)*density,3))+'px',fill='#ffd785')
board.save(OUT/'before-after-scale-study.png')
# Exact source landmark annotation retained separately from source/art bytes.
im=Image.open(ROOT/r['landmarks']['referenceSource']).convert('RGBA')
study=Image.new('RGBA',im.size,'#253648');study.alpha_composite(im)
ImageDraw.Draw(study).rectangle(r['landmarks']['referenceBox'],outline='#00ffff',width=1)
study.resize((640,640),Image.Resampling.NEAREST).convert('RGB').save(OUT/'idle-landmark-study.png')
print('Descriptor-size comparison and author-selected Idle landmark study saved; masters unchanged.')
