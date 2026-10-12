/*
 * IMMUNOVERSE Clinical v5.5 — cache de recursos estáticos.
 * As missões e o progresso do estudante ficam no localStorage e não são enviados ao servidor.
 * Nunca retornar index.html no lugar de JavaScript/CSS: isso mascara falhas de publicação.
 */
const CACHE = 'immunoverse-static-clinical-v5.5-atlas-hema.4';
const PREFIX = 'immunoverse-static-';
const STATIC = [
  './', './index.html', './app.js', './style.css', './clinical.css',
  './clinical-v5.css', './clinical-v52.css', './clinical-v54.css',
  './causal-lab.css', './causal-lab.js', './causal-view.js',
  './curricular-drills.js', './fieldwork.js', './atlas-context.js',
  './consultation.js', './immunolab-v52.js', './doctor-profile.js',
  './semester-plan.js', './morphology.js', './content.js', './addons.js',
  './incidents.js', './adventure.js', './engine.js', './simulations.js',
  './gamification.js', './clinical.js', './clinical-data.js',
  './clinical-extensions.js', './favicon.svg', './manifest.webmanifest',
  './assets/scenes/laboratorio.webp', './assets/scenes/sangue.webp',
  './assets/scenes/linfonodo.webp', './assets/scenes/medula.webp',
  './assets/scenes/ferida.webp', './assets/scenes/mucosa.webp',
  './assets/scenes/hospital.webp', './assets/scenes/arena.webp',
  './assets/cast/macrofago.webp', './assets/cast/neutrofilo.webp',
  './assets/cast/dendritica.webp', './assets/cast/linfocito-t.webp',
  './assets/cast/linfocito-b.webp', './assets/cast/plasmocito.webp',
  './assets/cast/nk.webp', './assets/cast/anticorpo.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(STATIC)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(key => key.startsWith(PREFIX) && key !== CACHE)
        .map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    try {
      const response = await fetch(request);
      if (response.ok) {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE).then(cache => cache.put(request, copy)).catch(() => {}));
      }
      // HTTP 404/500 devem permanecer visíveis; jamais mascarar erro de asset.
      return response;
    } catch (_networkError) {
      const cached = await caches.match(request);
      if (cached) return cached;
      if (request.mode === 'navigate') {
        const fallback = await caches.match('./index.html');
        if (fallback) return fallback;
      }
      return Response.error();
    }
  })());
});
