"""Verify the docs/art-only review deliverable, not the game."""
from pathlib import Path
from PIL import Image
import json,hashlib,subprocess
ROOT=Path(__file__).resolve().parents[3];REPORT=Path(__file__).resolve().parent
PACK=ROOT/'docs/art/candidates/botuo/special/runtime-pack-v1'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def dump(p,v):p.write_text(json.dumps(v,indent=2,ensure_ascii=False)+'\n')
base='9e685823c892843132b53c36ca897cdb625fc76c'
protected=['src','public','tests','scripts','.github','docs/art/approved']
for path in protected:
 result=subprocess.run(['git','diff',base,'--exit-code','--',path],cwd=ROOT,capture_output=True)
 assert result.returncode==0,'Protected path changed: '+path
source=json.loads((REPORT/'source-reuse.json').read_text())
for e in source['sources']:assert sha(ROOT/e['path'])==e['sha256']
capacity=json.loads((REPORT/'capacity.json').read_text());total=0
required=capacity['fullRequired'];assert len(required)==45
for e in required:
 p=ROOT/e['path'] if e['path'].startswith('docs/') else ROOT/'public'/e['path']
 assert sha(p)==e['sha256']
 im=Image.open(p);im.load();assert im.size==(e['width'],e['height']);assert p.stat().st_size==e['bytes']
 total+=im.width*im.height*4
assert total==capacity['requiredDecodedBytes']==16562336
assert total+capacity['reserveBytes']==16693408<=capacity['hardBytes']==16777216
assert capacity['extraAfterReserve']==83808
manifest=json.loads((PACK/'packing-manifest.json').read_text())
assert set(e['key'] for e in required)==set(e['key'] for e in json.loads((REPORT/'current-required.json').read_text())['records'])|set(e['key'] for e in manifest['newAssets'])
for e in manifest['legacyCandidates']:assert sha(ROOT/e['source'])==e['sourceSha256']
for e in manifest['newAssets']:
 if 'source' in e:assert sha(ROOT/e['source'])==e['sourceSha256']
 for p in e.get('sourcePoses',[]):assert sha(ROOT/p['path'])==p['sha256']
for folder in [PACK,REPORT]:
 for p in folder.rglob('*.json'):
  if p.name!='SHA256SUMS.json':json.loads(p.read_text())
 for p in folder.rglob('*.png'):
  im=Image.open(p);im.load()
handoff=(ROOT/'docs/handoffs/P2_BOTUO_SPECIAL_NEXT_WORK.md').read_text()
assert handoff.count('```')==2
checks=json.loads((REPORT/'packing-checks.json').read_text())
assert checks['newLogicalFrameRoundTrips']==6 and checks['legacyLogicalFrameRoundTrips']==57
results=json.loads((REPORT/'candidate-residency.json').read_text())['results']
for e in results:
 assert e['measured']['loaded']==45 and e['measured']['failed']==0 and e['measured']['evicted']==0
 assert e['measured']['highWaterReservedBytes']+131072<=16777216
 assert e['cleanupSceneBytes']==e['cleanupCacheBytes']==0
contract=ROOT/'docs/verification/M5C_P2_BOTUO_SPECIAL_PREFLIGHT.md'
summary=dict(status='DOCS-ART PREFLIGHT CHECKS PASS / EXECUTION CONTRACT REVIEW PENDING',baseline=base,contractSha256=sha(contract),packingManifestSha256=sha(PACK/'packing-manifest.json'),mechanicsSourcesUnchanged=12,protectedPathsUnchanged=protected,requiredKeys=45,requiredBytes=total,reserveBytes=131072,includingReserve=total+131072,extraBytes=83808,roundTrips=checks,productionIntegrated=False,deployed=False)
dump(REPORT/'verification-summary.json',summary)
for folder in [PACK,REPORT]:
 dump(folder/'SHA256SUMS.json',{str(p.relative_to(folder)):sha(p) for p in sorted(folder.rglob('*')) if p.is_file() and p.name!='SHA256SUMS.json'})
print(json.dumps({k:v for k,v in summary.items() if k not in ['roundTrips','protectedPathsUnchanged']},indent=2))
