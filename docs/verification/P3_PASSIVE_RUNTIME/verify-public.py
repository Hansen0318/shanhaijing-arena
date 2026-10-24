"""Compare every public release file against this source-identical local build."""
from pathlib import Path
import json,hashlib,urllib.request,concurrent.futures,time
BASE='https://hansen0318.github.io/shanhaijing-arena/'
ROOT=Path(__file__).resolve().parent
inventory=json.loads((ROOT/'local-build-inventory.json').read_text())
release='b414e9f079a985e4bf23283ffa5067abf5af9ac3'
def check(record):
 url=BASE+record['path']+'?passive='+release
 try:
  request=urllib.request.Request(url,headers={'Cache-Control':'no-cache','User-Agent':'Arena-release-verifier'})
  with urllib.request.urlopen(request,timeout=60) as response:data=response.read()
  actual=hashlib.sha256(data).hexdigest()
  return dict(path=record['path'],bytes=len(data),sha256=actual,expected=record['sha256'],ok=actual==record['sha256'] and len(data)==record['bytes'])
 except Exception as e:return dict(path=record['path'],ok=False,error=str(e))
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:results=list(pool.map(check,inventory['files']))
report=dict(status='PASS' if all(r['ok'] for r in results) else 'FAIL',releaseCommit=release,method='fresh HTTP download of every file; SHA256 and length against exact local/CI build',base=BASE,files=results,total=len(results),passed=sum(r['ok'] for r in results))
(ROOT/'public-fingerprint.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:report[k] for k in ['status','releaseCommit','total','passed']}))
if report['status']!='PASS':print(json.dumps([r for r in results if not r['ok']]));raise SystemExit(1)
