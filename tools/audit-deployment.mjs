import {readFile,readdir,stat} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {execFileSync} from 'node:child_process';
const root = resolve(import.meta.dirname,'..');
const problems=[];
const required=['src/index.html','src/app.js','src/consultation.js','src/morphology.js','src/clinical-v54.css','src/causal-lab.js','package.json','vercel.json'];
for(const f of required){try{const s=await stat(join(root,f));if(!s.isFile())problems.push(`${f}: não é um arquivo`);}catch{problems.push(`${f}: ausente`);}}
const config=JSON.parse(await readFile(join(root,'vercel.json'),'utf8'));
if(config.outputDirectory!=='dist')problems.push('vercel.json: outputDirectory deve ser dist');
if(config.buildCommand!=='npm run build')problems.push('vercel.json: buildCommand deve ser npm run build');
const pkg=JSON.parse(await readFile(join(root,'package.json'),'utf8'));
if(pkg.engines?.node!=='22.x')problems.push('package.json: fixar Node 22.x');
if(!pkg.scripts?.build)problems.push('package.json: script build ausente');
if(!pkg.scripts?.prebuild)problems.push('package.json: script prebuild ausente');
const html=await readFile(join(root,'src/index.html'),'utf8');
if(!html.includes('src="./app.js"'))problems.push('src/index.html: entrada app.js ausente');
try{const d=await readdir(join(root,'dist'));if(!d.includes('index.html'))problems.push('dist/index.html ausente');}catch{problems.push('dist ausente, execute npm run build');}
if(problems.length){console.error(`FALHA DE ARQUITETURA (${problems.length}):\n- ${problems.join('\n- ')}`); process.exitCode=1;}
else {
  execFileSync(process.execPath,[join(root,'tools/verify-static.mjs'),'dist'],{stdio:'inherit'});
  console.log('Arquitetura pronta: raiz/package.json → src/ → build dist/ → Vercel.');
}
