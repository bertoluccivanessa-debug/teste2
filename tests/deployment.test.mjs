import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import vm from 'node:vm';
const root = resolve(import.meta.dirname, '..');

test('Vercel gera dist pela branch Git e aponta para o entrypoint correto', async () => {
  const cfg = JSON.parse(await readFile(resolve(root, 'vercel.json'), 'utf8'));
  const html = await readFile(resolve(root, 'src/index.html'), 'utf8');
  assert.equal(cfg.buildCommand, 'npm run build');
  assert.equal(cfg.outputDirectory, 'dist');
  assert.match(html, /src="\.\/app\.js"/);
  assert.match(html, /href="\.\/causal-lab\.css"/);
});

function fakeSW(network, cached = new Map()) {
  const script = vm.runInNewContext;
  const listeners = {};
  const self = {
    location: { origin:'https://imunoverse.test' },
    addEventListener(name, listener){listeners[name] = listener},
    skipWaiting(){}, clients:{claim(){}}
  };
  const caches = {
    match: async request => cached.get(typeof request === 'string' ? request : request.url),
    open: async () => ({put: async () => {},addAll: async () => {}}),
    keys: async () => [], delete:async()=>true,
  };
  const Response = {error:() => ({type:'error'})};
  return readFile(resolve(root,'src/sw.js'),'utf8').then(code => {
    script(code,{self,caches,fetch:network,URL,Response});
    return async (pathname,mode='cors') => {
      let res; const request={method:'GET', url:'https://imunoverse.test'+pathname, mode};
      listeners.fetch({request,waitUntil(){},respondWith(p){res=p}});
      return await res;
    };
  });
}

test('Service worker preserva erro HTTP 404 de assets em vez de mascarar com HTML', async () => {
  const fetchSW = await fakeSW(async () => ({status:404,ok:false}));
  assert.equal((await fetchSW('/missing.js')).status, 404);
});

test('Service worker offline fornece HTML apenas para navegação, não para JavaScript', async () => {
  const fetchSW = await fakeSW(async () => {throw new Error('offline')},new Map([['./index.html',{body:'html-offline'}]]));
  assert.equal((await fetchSW('/missing.js')).type, 'error');
  assert.equal((await fetchSW('/outra-pagina','navigate')).body, 'html-offline');
});


test('rodapé acadêmico identifica supervisão completa e curso de Imunologia', async () => {
  const app = await readFile(resolve(root, 'src/app.js'), 'utf8');
  assert.match(app, /IMMUNOVERSE Clinical \| Imunologia Aplicada/);
  assert.match(app, /Desenvolvimento: <b>Vanessa Bertolucci<\/b>/);
  assert.match(app, /Supervisão docente: <b>Profa\. Dra\. Michelle Darrieux Bertoncini<\/b>/);
  assert.match(app, /Curso de Imunologia - Medicina — Universidade São Francisco \(USF\)/);
  assert.match(app, /Ambiente educacional com casos clínicos simulados/);
  assert.match(app, /© 2026 · IMMUNOVERSE Clinical/);
  assert.doesNotMatch(app, /Profa\. Profa\./);
});
