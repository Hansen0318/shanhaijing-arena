"""Byte-preserving padding and QA only; no redraw, alpha deletion or runtime wiring."""
from pathlib import Path
from PIL import Image, ImageDraw
import hashlib, json

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'docs/art/approved/lushu/awakening/terminal-f3-v1/F3-terminal-master.png'
OUT = ROOT / 'docs/art/candidates/lushu/awakening/phase-poses-v1'
EXPECTED = 'c736acca0da5fb5b6c7824a8dfb4bfb2719cf2ce99af74c54dde21773821f3d0'
def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest()

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    assert sha(SRC) == EXPECTED
    source = Image.open(SRC); source.load(); assert source.mode == 'RGBA'
    pad = 160
    cell = Image.new('RGBA', (source.width + 2*pad, source.height + 2*pad))
    cell.paste(source, (pad,pad))  # No mask: preserves every RGBA source pixel.
    assert cell.crop((pad,pad,pad+source.width,pad+source.height)).tobytes() == source.tobytes()
    path = OUT / 'C-terminal-F3-padded.png'; cell.save(path)
    decoded=Image.open(path); decoded.load()
    assert decoded.tobytes()==cell.tobytes()
    bounds=decoded.getchannel('A').getbbox()
    margins=[bounds[0],bounds[1],decoded.width-bounds[2],decoded.height-bounds[3]]
    assert min(margins)>=pad
    board=Image.new('RGB',(1280,500),'#75808a')
    for x,color in [(0,'white'),(640,'#1e2837')]:
        tile=Image.new('RGBA',cell.size,color); tile.alpha_composite(cell)
        tile.thumbnail((640,464),Image.Resampling.LANCZOS)
        board.paste(tile.convert('RGB'),(x,36))
    ImageDraw.Draw(board).text((12,10),'C terminal F3: approved source, all RGBA pixels preserved; padding only',fill='white')
    board.save(OUT/'C-terminal-F3-light-dark.jpg',quality=94)
    record={'status':'PADDING / SOURCE PIXEL PRESERVATION QA PASS; NOT RUNTIME READY',
        'source':str(SRC.relative_to(ROOT)),'sha256':EXPECTED,'derivative':str(path.relative_to(ROOT)),
        'derivativeSha256':sha(path),'dimensions':cell.size,'sourceTranslation':[pad,pad],
        'scale':1,'sourceRgbaPixelsPreserved':True,'alphaPixelsDeleted':0,'rgbPixelsModified':0,
        'alphaBounds':bounds,'transparentOuterMargins':margins,
        'limitation':'Original invisible low-alpha noise and max-alpha254 are deliberately retained. This PASS covers exact pixel preservation and blank exterior padding only, not alpha cleanup, shared animation anchors, final scale or texture budgets.'}
    (OUT/'C-terminal-F3-padding-QA.json').write_text(json.dumps(record,indent=2)+'\n')
    print(json.dumps(record))
    names=['F1-anticipation','A-first-rush-contact','B-return-contact','C-terminal-F3','F4-recovery']
    sources=[OUT/(n+'.png') for n in names]
    sources[3]=SRC
    if not all(p.exists() for p in sources): return
    board=Image.new('RGB',(1536,1800),'#1e2837')
    details=[]
    light_dark=Image.new('RGB',(1280,1600),'#75808a')
    labels=['1 Anticipation - CANDIDATE','2 First rush contact - CANDIDATE',
            '3 Return contact - CANDIDATE','4 Terminal F3 - LIKENESS APPROVED',
            '5 Recovery - CANDIDATE']
    for index,(name,p) in enumerate(zip(names,sources)):
        raw=Image.open(p);raw.load();assert raw.mode=='RGBA'
        safe=Image.new('RGBA',(raw.width+320,raw.height+320));safe.paste(raw,(160,160))
        assert safe.crop((160,160,raw.width+160,raw.height+160)).tobytes()==raw.tobytes()
        target=OUT/(name+'-padded.png');safe.save(target)
        for side,color in enumerate(['white','#1e2837']):
            preview=Image.new('RGBA',safe.size,color);preview.alpha_composite(safe)
            preview.thumbnail((640,300),Image.Resampling.LANCZOS)
            light_dark.paste(preview.convert('RGB'),(side*640+(640-preview.width)//2,index*320+20))
        ImageDraw.Draw(light_dark).text((12,index*320+4),name,fill='white')
        box=safe.getchannel('A').getbbox()
        margins=[box[0],box[1],safe.width-box[2],safe.height-box[3]]
        assert min(margins)>=160
        # One pixel scale on this contact sheet; NOT animation/runtime size matching.
        scale=.32;size=(round(safe.width*scale),round(safe.height*scale))
        patch=Image.new('RGBA',safe.size,'#1e2837');patch.alpha_composite(safe)
        patch=patch.convert('RGB').resize(size,Image.Resampling.LANCZOS)
        x=(index%2)*768;y=(index//2)*600
        board.paste(patch,(x+(768-size[0])//2,y+45+(550-size[1])//2))
        ImageDraw.Draw(board).text((x+24,y+18),labels[index],fill='white')
        details.append({'pose':name,'source':str(p.relative_to(ROOT)),'sha256':sha(p),
            'dimensions':raw.size,'sourceAlphaBounds':raw.getchannel('A').getbbox(),
            'padded':str(target.relative_to(ROOT)),'paddedSha256':sha(target),
            'margins':margins,'rgbaPixelsPreserved':True,'sourceScale':1,
            'playerStatus':'F3 LIKENESS APPROVED' if index==3 else 'CANDIDATE / PLAYER REVIEW PENDING'})
    draw=ImageDraw.Draw(board)
    draw.multiline_text((800,1240),'Five separate poses for three independent rush contacts.\n\nNo VFX, GIF, gameplay or deployment.\n\nContact sheet only; source pixel scale 0.32.\nNot a normalized runtime strip.\n\nRaw low-alpha noise retained; padding verified.\nAll original PNG bytes retained.',fill='white',spacing=14)
    board.save(OUT/'five-pose-review.jpg',quality=95)
    light_dark.save(OUT/'five-pose-light-dark-QA.jpg',quality=94)
    manifest={'status':'FOUR NEW POSE CANDIDATES / PLAYER REVIEW PENDING',
        'approvedTerminalReceipt':'docs/art/approved/lushu/awakening/terminal-f3-v1/acceptance.json',
        'references':['docs/art/approved/lushu/awakening/terminal-f3-v1/F3-terminal-master.png','public/assets/characters/lushu/identity.png'],
        'tool':'built-in image_gen; each new pose independently conditioned on both listed images',
        'poses':details,'board':'five-pose-review.jpg','boardSha256':sha(OUT/'five-pose-review.jpg'),
        'qa':'PNG decode, source hashes, full-canvas preservation, minimum160px exterior alpha padding PASS; identity/anatomy visually inspected, final likeness/pose acceptance is player-owned.',
        'limits':'No alpha cleanup claimed. No common animation anchors/skull-size normalization, GIF/VFX or runtime integration. Source pixel-scale board is for pose review only. F3 unchanged; other poses not approved.'}
    (OUT/'phase-pose-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
    print('Five-pose source-preserving QA/contact sheet complete')

if __name__ == '__main__': main()
