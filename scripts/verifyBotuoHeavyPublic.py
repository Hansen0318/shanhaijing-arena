import argparse,hashlib,json,urllib.request,concurrent.futures
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--release',required=True);p.add_argument('--ci',required=True);p.add_argument('--out',required=True);a=p.parse_args()
root=Path('dist');ci=Path(a.ci);sha=lambda b:hashlib.sha256(b).hexdigest()
files=[f for f in root.rglob('*') if f.is_file()];local=[]
for f in files:
 rel=str(f.relative_to(root));b=f.read_bytes();other=ci/rel;local.append(dict(path=rel,bytes=len(b),sha256=sha(b),ciMatch=other.exists() and other.read_bytes()==b))
assert all(f['ciMatch'] for f in local),'CI build differs from local'
assert {str(f.relative_to(ci)) for f in ci.rglob('*') if f.is_file()}=={f['path'] for f in local},'CI file set differs'
# Entry bundles, complete affected Heavy/packed Move assets, and protected P2 baselines.
chosen=[f for f in local if f['path']=='index.html' or (f['path'].startswith('assets/') and '/' not in f['path'][7:] and f['path'].endswith(('.js','.css'))) or '/botuo-heavy-runtime-v1/' in f['path'] or '/botuo-basic-packing-v1/botuo-' in f['path'] or '/botuo/ko/' in f['path']]
def fetch(row):
 url='https://hansen0318.github.io/shanhaijing-arena/'+('' if row['path']=='index.html' else row['path'])+'?v='+a.release
 r={**row,'url':url}
 try:
  req=urllib.request.Request(url,headers={'Cache-Control':'no-cache','User-Agent':'arena-release-fingerprint'})
  with urllib.request.urlopen(req,timeout=25) as response:b=response.read();r['status']=response.status
  if len(b)!=row['bytes']:
   # Some host proxies truncate large 200 responses; request independently bounded ranges.
   chunks=[]
   for start in range(0,row['bytes'],65536):
    end=min(row['bytes']-1,start+65535);req=urllib.request.Request(url+'&part='+str(start),headers={'Range':f'bytes={start}-{end}','Cache-Control':'no-cache'})
    with urllib.request.urlopen(req,timeout=25) as response:part=response.read();status=response.status;content_range=response.headers.get('Content-Range')
    if status==200 and len(part)==row['bytes']:chunks=[part];break
    assert status==206 and content_range==f'bytes {start}-{end}/{row["bytes"]}' and len(part)==end-start+1,(status,content_range,len(part));chunks.append(part)
   b=b''.join(chunks);r['boundedRangeReassembly']=True
  r.update(publicBytes=len(b),publicSha256=sha(b),match=len(b)==row['bytes'] and sha(b)==row['sha256'])
 except Exception as e:r.update(match=False,error=str(e))
 return r
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:rows=list(pool.map(fetch,chosen))
result=dict(releaseSha=a.release,status='PASS' if all(r['match'] for r in rows) else 'BLOCKED',ciLocalFiles=len(local),ciLocalAllMatch=True,publicFiles=len(rows),files=rows)
Path(a.out).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({k:v for k,v in result.items() if k!='files'}));assert result['status']=='PASS'
