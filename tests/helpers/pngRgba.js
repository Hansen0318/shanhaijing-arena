import {inflateSync} from 'node:zlib';
export function decodeRgbaPng(b){
 if(b.subarray(0,8).toString('hex')!=='89504e470d0a1a0a'||b[24]!==8||b[25]!==6||b[28]!==0)throw Error('Expected noninterlaced RGBA8 PNG');
 const width=b.readUInt32BE(16),height=b.readUInt32BE(20),chunks=[];
 for(let p=8;p<b.length;){const n=b.readUInt32BE(p),kind=b.toString('ascii',p+4,p+8);if(kind==='IDAT')chunks.push(b.subarray(p+8,p+8+n));p+=n+12;}
 const raw=inflateSync(Buffer.concat(chunks)),stride=width*4,pixels=Buffer.alloc(stride*height);
 const paeth=(a,b,c)=>{const p=a+b-c,da=Math.abs(p-a),db=Math.abs(p-b),dc=Math.abs(p-c);return da<=db&&da<=dc?a:db<=dc?b:c;};
 for(let y=0;y<height;y++){const filter=raw[y*(stride+1)];if(filter>4)throw Error('Invalid PNG filter');for(let x=0;x<stride;x++){const i=y*stride+x,a=x>=4?pixels[i-4]:0,c=y&&x>=4?pixels[i-stride-4]:0,d=y?pixels[i-stride]:0;pixels[i]=(raw[y*(stride+1)+1+x]+[0,a,d,Math.floor((a+d)/2),paeth(a,d,c)][filter])&255;}}
 return {width,height,pixels};
}
export function cropRgba(im,[x,y,w,h]){const out=Buffer.alloc(w*h*4);for(let j=0;j<h;j++)im.pixels.copy(out,j*w*4,((y+j)*im.width+x)*4,((y+j)*im.width+x+w)*4);return out;}
