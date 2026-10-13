from pathlib import Path
import hashlib, json, sys
import numpy as np
from PIL import Image
from scipy.ndimage import binary_propagation

source=Path(sys.argv[1]) if len(sys.argv)>1 else Path(__file__).parents[1]/'docs/art/sources/jiuweihu-move-approved.jpeg'
output_dir=Path(sys.argv[2]) if len(sys.argv)>2 else source.parent
assert hashlib.sha256(source.read_bytes()).hexdigest()=='423f3a5d7303ce93baa738fb1c943a4e7381e72bfddf3172ee1e9b04234dcf3e'
rgb=np.asarray(Image.open(source).convert('RGB'))
# Conservative connected background only, never erase all pale foreground.
candidate=(rgb.min(axis=2)>=245)&(np.ptp(rgb.astype(np.int16),axis=2)<=8)
seed=np.zeros(candidate.shape,bool)
seed[0]=candidate[0];seed[-1]=candidate[-1];seed[:,0]=candidate[:,0];seed[:,-1]=candidate[:,-1]
background=binary_propagation(seed,mask=candidate)
rgba=np.concatenate([rgb,np.where(background,0,255).astype(np.uint8)[...,None]],axis=2)
assert np.array_equal(rgba[:,:,:3],rgb)
# Observed source components have x extents8..389,392..753,765..1157,1159..1529.
cuts=[0,390,759,1158,1536]
strip=Image.new('RGBA',(640,160));rows=[];comparison=Image.new('RGB',(800,440),(100,110,120))
for i,(l,r) in enumerate(zip(cuts,cuts[1:])):
 frame=Image.fromarray(rgba[:,l:r]);bbox=frame.getbbox()
 assert bbox and 0<bbox[0] and bbox[2]<r-l, (i,bbox)
 crop=frame.crop(bbox); w,h=crop.size; size=(round(w*.31),round(h*.31))
 small=crop.resize(size,Image.Resampling.LANCZOS)
 cell=Image.new('RGBA',(160,160));x=(160-size[0])//2;y=151-size[1];cell.paste(small,(x,y))
 assert y>=8 and x>=8
 strip.paste(cell,(160*i,0));b=cell.getbbox();rows.append({'frame':i+1,'source_interval':[l,r],'source_bbox':list(bbox),'scale':.31,'bbox':list(b),'margins':[b[0],b[1],160-b[2],160-b[3]]})
 # Raw source and color-preserving result on a contrasting neutral backdrop.
 raw=Image.fromarray(rgb[:,l:r]).resize((200,256));comparison.paste(raw,(i*200,0))
 display=Image.new('RGBA',(200,180),(100,110,120,255));display.alpha_composite(cell,(20,10));comparison.paste(display.convert('RGB'),(i*200,260))
out=output_dir/'jiuweihu_battleMove-4f.png';strip.save(out)
comparison.save(output_dir/'p4_move_color_comparison.png')
report={'source_sha':hashlib.sha256(source.read_bytes()).hexdigest(),'source_bytes':source.stat().st_size,'dimensions':[640,160],'bytes':out.stat().st_size,'sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'frames':rows,'retained_rgb_exact':True,'foreground_pale_pixels_retained':int((candidate&~background).sum()),'background_method':'border-connected near-white only; enclosed pale pixels retained'}
(output_dir/'p4_move_preparation.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report))
