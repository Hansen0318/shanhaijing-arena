"""Offline root/scale/transition boards, NOT a capture from the game."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont,ImageOps
import json
ROOT=Path(__file__).resolve().parents[3];OUT=Path(__file__).resolve().parent
REVIEW=ROOT/'docs/art/candidates/botuo/special/composite-review-v1'
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',16)
landmarks=json.loads((OUT/'landmarks.json').read_text())
ims=[Image.open(REVIEW/'approved-idle-return-cell.png').convert('RGBA')]+[Image.open(REVIEW/f'F{i}-safe-cell.png').convert('RGBA') for i in range(1,5)]
for annotated in [False,True]:
 board=Image.new('RGB',(1500,760),'#202d3a')
 for i,(im,record) in enumerate(zip(ims,landmarks['records'])):
  for flip in [False,True]:
   # Mirror pixels, never text labels.
   tile=Image.new('RGBA',(300,360),'#202d3a');c=im.crop((100,100,300,290)).resize((300,285),Image.Resampling.NEAREST)
   if flip:c=ImageOps.mirror(c)
   tile.alpha_composite(c,(0,45));d=ImageDraw.Draw(tile);d.text((10,10),record['label']+(' / LEFT' if flip else ' / RIGHT'),font=font,fill='white');ground=45+174*1.5;d.line((0,ground,300,ground),fill='#5e7185')
   if annotated:
    for x,y in record['points'].values():
     x=(x-100)*1.5;x=300-x if flip else x;y=45+(y-100)*1.5;d.ellipse((x-2,y-2,x+2,y+2),fill='#55ffff')
   board.paste(tile.convert('RGB'),(i*300,380 if flip else 0))
 ImageDraw.Draw(board).text((10,735),'Root-aligned offline comparison / approximate landmarks / no height fit / not browser or phone proof',font=font,fill='white');board.save(OUT/('landmarks-QA.png' if annotated else 'body-scale-QA.png'))
descriptors=json.loads((OUT/'current-descriptors.json').read_text())['P2']
manifest=json.loads((ROOT/'docs/art/candidates/botuo/special/runtime-pack-v1/packing-manifest.json').read_text())
new=manifest['newAssets'][0]
sequence=[('Idle',descriptors['animations']['battleIdle'],0)]
sequence += [('Move'+str(i+1),descriptors['animations']['battleMove'],i) for i in range(4)]
sequence += [('Basic'+str(i+1),descriptors['actions']['basic']['animation'],i) for i in range(4)]
sequence += [('Heavy'+str(i+1),descriptors['actions']['heavy']['animation'],i) for i in range(4)]
sequence += [('Special'+str(i+1),dict(source=new['key'],frames=new['frames'],origin=new['origin'],scale=new['scale']),i) for i in range(4)]
sequence += [('Idle return',descriptors['animations']['battleIdle'],0)]
inventory=json.loads((OUT/'current-required.json').read_text())['records']
sources={e['key']:ROOT/'public'/e['path'] for e in inventory};sources[new['key']]=ROOT/new['path']
samples=[]
board=Image.new('RGB',(2400,1920),'#202d3a')
for index,(label,desc,frameIndex) in enumerate(sequence):
 f=desc['frames'][frameIndex];source=Image.open(sources[desc['source']]).convert('RGBA');crop=source.crop((f['x'],f['y'],f['x']+f['width'],f['y']+f['height']))
 logical=f.get('trim',[crop.width,crop.height,0,0]);im=Image.new('RGBA',tuple(logical[:2]));im.paste(crop,tuple(logical[2:]));density=72*desc['scale']/max(logical[:2]);size=[round(n*density) for n in logical[:2]];scaled=im.resize(size,Image.Resampling.LANCZOS)
 root=(200,274);xy=(round(root[0]-desc['origin'][0]*logical[0]*density),round(root[1]-desc['origin'][1]*logical[1]*density));cell=Image.new('RGBA',(400,300));assert xy[0]>=0 and xy[1]>=0 and xy[0]+scaled.width<=400 and xy[1]+scaled.height<=300;cell.alpha_composite(scaled,xy)
 # Exact footprint per descriptor, same root; lower mirrored row per six states.
 for flip in [False,True]:
  tile=Image.new('RGBA',(400,320),'#202d3a');art=ImageOps.mirror(cell) if flip else cell;tile.alpha_composite(art,(0,15));draw=ImageDraw.Draw(tile);draw.text((10,4),label+(' LEFT' if flip else ' RIGHT'),font=font,fill='white');draw.line((0,289,400,289),fill='#5e7185');board.paste(tile.convert('RGB'),((index%6)*400,(index//6)*640+(320 if flip else 0)))
 samples.append(dict(label=label,source=desc['source'],frameIndex=frameIndex,logicalSize=logical[:2],scale=desc['scale'],origin=desc['origin'],density=density,logicalDisplaySize=[n*density for n in logical[:2]],root=root,roundedPaste=xy))
board.save(OUT/'transitions-QA.png')
(OUT/'transition-measurements.json').write_text(json.dumps(dict(status='OFFLINE DESCRIPTOR PROJECTION ONLY',samples=samples,limits='No game timing or animation selection was executed. Fractional placement is rounded for this board; actual Phaser sampling/transition/Pause/KO/browser proof remains required.'),indent=2)+'\n')
print('Offline both-facing body/landmark/18-state transition boards written; not runtime evidence.')
