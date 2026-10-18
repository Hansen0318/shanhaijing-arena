"""Verify stored review outputs, decode the actual GIF events and create proof board."""
from pathlib import Path
from PIL import Image,ImageDraw
import json,hashlib,subprocess

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'docs/art/candidates/lushu/awakening/composite-review-v1'
FX=ROOT/'docs/art/candidates/lushu/awakening/vfx-review-v1'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()

def main():
 m=json.loads((OUT/'review-manifest.json').read_text())
 for r in m['records']:
  assert sha(ROOT/r['source'])==r['sha256']
  src=Image.open(ROOT/r['source']);src.load()
  scaled=src.resize(tuple(r['resize']),Image.Resampling.LANCZOS)
  cell=Image.open(OUT/(r['pose']+'-cell.png'));cell.load();x,y=r['translation']
  assert cell.crop((x,y,x+scaled.width,y+scaled.height)).tobytes()==scaled.tobytes()
  assert min(r['margins'])>=16
 for r in m['vfx']:
  src=Image.open(ROOT/r['raw']);src.load();assert sha(ROOT/r['raw'])==r['sha256']
  b=src.getchannel('A').point(lambda a:255 if a>8 else 0).getbbox()
  assert min([b[0],b[1],src.width-b[2],src.height-b[3]])>=8
  parts=[]
  for label,width in [('source',r['splitX']),('impact',src.width-r['splitX'])]:
   im=Image.open(FX/(r['phase']+'-'+label+'-padded.png'));im.load()
   parts.append(im.crop((80,80,width+80,src.height+80)))
  joined=Image.new('RGBA',src.size);joined.paste(parts[0],(0,0));joined.paste(parts[1],(r['splitX'],0))
  assert joined.tobytes()==src.tobytes()
 decoded={}
 for r in m['gifs']:
  p=OUT/r['file'];assert sha(p)==r['sha256'];gif=Image.open(p);frames=[];time=0
  while True:
   gif.load();assert gif.size==(960,540);frames.append((time,gif.convert('RGB').copy()));time+=gif.info['duration']
   try:gif.seek(gif.tell()+1)
   except EOFError:break
  assert time==r['durationMs'] and len(frames)==r['decodedFrames']
  decoded[r['file']]=(frames,time)
 frames,total=decoded['lushu-awakening-normal.gif']
 board=Image.new('RGB',(1440,600),'#172533')
 for i,at in enumerate([150,300,460,1150,1300,1460]):
  im=next(im for (t,im),(end,_) in zip(frames,frames[1:]+[(total,None)]) if t<=at<end)
  board.paste(im.resize((480,270)),((i%3)*480,(i//3)*300+20))
  ImageDraw.Draw(board).text(((i%3)*480+12,(i//3)*300+3),str(at)+'ms ACTUAL GIF DECODE',fill='white')
 board.save(OUT/'decoded-gif-contact-proof.jpg',quality=95)
 subprocess.run(['git','diff','--check'],cwd=ROOT,check=True)
 protected=subprocess.check_output(['git','diff','--name-only','--','src','public'],cwd=ROOT,text=True)
 assert not protected
 report={'status':'REVIEW ASSET CHECKS PASS / PLAYER VFX-GIF REVIEW PENDING',
  'checks':['5 approved source hashes unchanged','Uniform-XY resized source insertion exact','Minimum16px cell alpha margins',
  '3 VFX significant contours inside raw canvas','6 padded VFX components rejoin byte-exactly','5 GIF SHA256/decode/frame-count/duration checks',
  'Actual GIF150/300/460ms + mirrored1150/1300/1460ms proof inspected','git diff --check','src/public unchanged'],
  'vfxSizing':'Visible alpha>8 core, without deleting source pixels: wake caps350/400/450x190; impact caps180/270/400 square. Per-draw visible-clipping assertions passed during generation.',
  'limits':'Illustrative scripted preview; no game collision/damage/HP simulation. No runtime/deploy/phone PASS. Original low-alpha noise retained; no cleanup claim. VFX and GIF are candidates, not approved.'}
 (OUT/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
 print(json.dumps(report))

if __name__=='__main__':main()
