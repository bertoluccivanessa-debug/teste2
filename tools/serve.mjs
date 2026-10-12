import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const base=resolve(import.meta.dirname,'..',process.argv[2]||'src');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.json':'application/json','.webmanifest':'application/manifest+json; charset=utf-8'};
const server=http.createServer(async(req,res)=>{
 try {const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=resolve(base,'.'+pathname,(pathname.endsWith('/')?'index.html':''));
 if(file!==base && !file.startsWith(base+sep)){res.writeHead(403).end();return;}
 if(!(await stat(file)).isFile()){res.writeHead(404).end();return;}
 res.setHeader('Content-Type',types[extname(file)]||'application/octet-stream');res.end(await readFile(file));
 }catch{res.writeHead(404,{'Content-Type':'text/plain'}).end('Não encontrado');}
});
const port=Number(process.env.PORT||4173);
server.listen(port,()=>console.log(`IMMUNOVERSE → http://localhost:${port} (${base})`));
