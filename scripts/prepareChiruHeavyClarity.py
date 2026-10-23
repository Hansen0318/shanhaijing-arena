"""Presentation-only revision; all accepted image bytes and old packing stay immutable."""
from pathlib import Path
import json,hashlib
root=Path(__file__).resolve().parents[1]
base=root/'docs/verification/P3_HEAVY_RUNTIME/packing.json';r=json.loads(base.read_text());receipt=json.loads((root/'docs/verification/P3_HEAVY_RUNTIME/release-evidence.json').read_text())
for a in r['assets']:
 p='public/'+a['path'];assert hashlib.sha256((root/p).read_bytes()).hexdigest()==receipt['sourceSha256'][p],p
r['action']['contact'].update(durationMs=250,fullOpacityMs=120)
r.update(status='CLARITY SOURCE-PRESERVING DERIVATIVE / VERIFICATION PENDING',baselinePackingSha256=hashlib.sha256(base.read_bytes()).hexdigest(),imagesUnchanged=True)
(root/'src/assets/chiruHeavyRuntime.js').write_text('// Accepted source pixels, shared 0.9 runtime pixel density and hover anchor.\nexport const chiruHeavyAction='+json.dumps(r['action'],indent=2)+';\n')
(root/'docs/verification/P3_HEAVY_CLARITY/packing.json').write_text(json.dumps(r,indent=2)+'\n')
