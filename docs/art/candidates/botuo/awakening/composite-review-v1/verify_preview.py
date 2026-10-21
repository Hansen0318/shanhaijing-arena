"""Independent verifier: decode files on disk against saved quantized frame hashes."""
from pathlib import Path
from PIL import Image,ImageOps
import hashlib,json
OUT=Path(__file__).resolve().parent;ROOT=OUT.parents[5]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
m=json.loads((OUT/'review-manifest.json').read_text());result=[]
refs=json.loads((OUT/'source-reference-hashes.json').read_text())
for path,r in refs.items():
 assert sha(ROOT/path)==r['sha256'] and (ROOT/path).stat().st_size==r['bytes'],path
for path,h in m['immutableSourceHashes'].items():assert sha(ROOT/path)==h,path
for r in m['gifs']:
 p=ROOT/r['path'];assert sha(p)==r['sha256']
 timeline=json.loads((OUT/(p.name+'.timeline.json')).read_text())['frames']
 g=Image.open(p);idx=0;decoded=[];total=0
 for i in range(g.n_frames):
  g.seek(i);g.load();duration=g.info['duration'];rgb=g.convert('RGB')
  assert g.size==(800,460) and g.disposal_method==2
  digest=hashlib.sha256(rgb.tobytes()).hexdigest();remaining=duration
  while remaining:
   source=timeline[idx];assert digest==source['quantizedRGBSha256'];remaining-=source['durationMs'];assert remaining>=0;idx+=1
  decoded.append((total,total+duration,rgb.copy()));total+=duration
 assert idx==len(timeline) and total==r['totalMs']
 # Check actual decoded world-region is exactly mirrored, including asymmetric bracers.
 half=total//2
 def at(t):return next(im for start,end,im in decoded if start<=t<end)
 for start,end,im in decoded:
  if start>=half:break
  # State labels remain readable; compare the world region above labels.
  bottom=328 if '-T3-' in p.name else 390
  a=ImageOps.mirror(im.crop((0,80,800,bottom)))
  b=at(start+half).crop((0,80,800,bottom))
  assert a.tobytes()==b.tobytes(),(p.name,start,'mirror')
 if p.name.endswith('-air.gif'):
  # Beyond the source ring's right edge, the entire contact-only region stays background.
  # The unchanged horizontal ground guide occupies y304; exclude that guide only.
  for region in [(625,110,780,304),(625,305,780,380)]:
   assert len(at(400).crop(region).getcolors())==1
 result.append(dict(file=p.name,decodedFrames=g.n_frames,totalMs=total,quantizedPixels='PASS',timing='PASS',worldMirror='PASS',disposal=2))
# Strip isolation and borders checked from PNGs read on disk, independent of in-memory assembly.
strip=Image.open(OUT/'four-equal-cells.png').convert('RGBA')
for i,name in enumerate(['F1','F2','F3','F4']):
 cell=Image.open(OUT/(name+'-safe-cell.png')).convert('RGBA')
 assert cell.size==(400,320) and strip.crop((i*400,0,(i+1)*400,320)).tobytes()==cell.tobytes()
 b=cell.getchannel('A').getbbox();assert min(b[0],b[1],400-b[2],320-b[3])>=32
for r in m['vfx']:
 im=Image.open(ROOT/r['source']).convert('RGBA');safe=Image.open(OUT/(r['name']+'-padded.png')).convert('RGBA')
 assert safe.crop((80,80,80+im.width,80+im.height)).tobytes()==im.tobytes()
# Ensure the protected gameplay evidence still binds unchanged actual source files.
e=json.loads((ROOT/m['mechanicsEvidence']['path']).read_text())
for path,h in e['sourceSha256'].items():assert sha(ROOT/path)==h
assert sha(ROOT/m['mechanicsEvidence']['path'])==m['mechanicsEvidence']['sha256']
report=dict(status='PASS',kind='Independent on-disk full decode; no BattleSession rerun or Runtime test',files=result,safeCellIsolation=True,exactPaddedSources=True,immutableSources=True,mechanicsSourcesUnchanged=True)
(OUT/'independent-verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
