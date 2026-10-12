/**
 * Confere recursos locais referenciados pelo HTML, CSS, ES Modules,
 * manifest e precache do service worker, antes de publicar na Vercel.
 * Uso: node tools/verify-static.mjs [src|dist]
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname, extname, relative } from 'node:path';
const base = resolve(import.meta.dirname, '..', process.argv[2] || 'dist');
const errors = [];
const files = [];
async function walk(path) {
  for (const x of await readdir(path, { withFileTypes: true })) {
    const filepath = resolve(path, x.name);
    if (x.isDirectory()) await walk(filepath);
    else if (x.isFile()) files.push(filepath);
  }
}
await walk(base);
const fileSet = new Set(files);
function isLocal(ref) {
  return ref && !/^(?:https?:|data:|mailto:|tel:|#|javascript:|\/\/)/i.test(ref);
}
function check(from, raw) {
  if (!isLocal(raw)) return;
  const ref = raw.split(/[?#]/)[0];
  if (!ref || ref.startsWith('/')) return; // URLs absolutas são resolvidas pelo servidor, não relativas ao módulo.
  const dest = resolve(dirname(from), decodeURIComponent(ref));
  if (!dest.startsWith(base + '/') || !fileSet.has(dest)) {
    errors.push(`${relative(base, from)} → ${raw} (arquivo ausente)`);
  }
}
for (const file of files) {
  const ext = extname(file);
  if (!['.html', '.js', '.css', '.webmanifest'].includes(ext)) continue;
  const body = await readFile(file, 'utf8');
  if (ext === '.html') {
    for (const match of body.matchAll(/\b(?:src|href)=["']([^"']+)["']/g)) check(file, match[1]);
  }
  if (ext === '.js') {
    for (const match of body.matchAll(/(?:\bfrom\s*|\bimport\s*\()\s*["'](\.[^"']+)["']/g)) check(file, match[1]);
    if (file.endsWith('/sw.js')) {
      const staticList = body.match(/const STATIC\s*=\s*\[([\s\S]*?)\];/);
      if (!staticList) errors.push('sw.js: lista STATIC não encontrada');
      else for (const m of staticList[1].matchAll(/["'](\.[^"']+)["']/g)) {
        const ref = m[1] === './' ? './index.html' : m[1];
        check(file, ref);
      }
    }
  }
  if (ext === '.css') {
    for (const m of body.matchAll(/url\(\s*['"]?([^)'"\s]+)['"]?\s*\)/g)) check(file, m[1]);
  }
  if (ext === '.webmanifest') {
    try { const manifest = JSON.parse(body); for (const icon of manifest.icons || []) check(file, icon.src); }
    catch (e) { errors.push(`manifest inválido: ${e.message}`); }
  }
}
for (const required of ['index.html','app.js','sw.js','manifest.webmanifest','causal-lab.js','causal-view.js','causal-lab.css']) {
  if (!fileSet.has(resolve(base, required))) errors.push(`${required} não encontrado na raiz de ${base}`);
}
if (errors.length) {
  console.error('FALHA: arquivos necessários para publicação não encontrados:\n' + errors.join('\n'));
  process.exitCode = 1;
} else console.log(`Publicação estática validada: ${files.length} arquivos, links locais e imports presentes (${relative(process.cwd(),base)}).`);
