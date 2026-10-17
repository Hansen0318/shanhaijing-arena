"""Candidate QA only: inspect actual alpha; never modify the source master."""
from pathlib import Path
from PIL import Image,ImageDraw
import json,hashlib
ROOT=Path(__file__).resolve().parents[1]
FOLDER=ROOT/'docs/art/candidates/lushu/special'
source=FOLDER/'F3-contact-v2.png'
im=Image.open(source);im.load();assert im.mode=='RGBA'
a=im.getchannel('A');bbox=a.getbbox();margins=[bbox[0],bbox[1],im.width-bbox[2],im.height-bbox[3]]
assert min(margins)>0
board=Image.new('RGB',(1536,550),(235,238,242));draw=ImageDraw.Draw(board)
for i,(color,title) in enumerate([((255,255,255,255),'F3 v2 - WHITE BACKGROUND'),((32,43,57,255),'F3 v2 - DARK BACKGROUND')]):
 panel=Image.alpha_composite(Image.new('RGBA',im.size,color),im).convert('RGB').resize((768,512),Image.Resampling.LANCZOS)
 board.paste(panel,(768*i,38));draw.text((768*i+15,12),title,fill=(30,40,50))
output=FOLDER/'F3-contact-v2-alpha-review.png';board.save(output)
print(json.dumps({'sourceSHA256':hashlib.sha256(source.read_bytes()).hexdigest(),'alphaExtrema':a.getextrema(),'bounds':bbox,'margins':margins,'qaSHA256':hashlib.sha256(output.read_bytes()).hexdigest()}))
