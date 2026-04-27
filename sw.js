const CACHE_NAME = 'phonics-v4';
const ASSETS = [
  './',
  './index.html',
  './chinese-writing.html',
  './phonics-dict.js',
  './manifest.json',
  './manifest-cw.json',
  './icon-192.png',
  './icon-512.png',
  './icon-cw-192.png',
  './icon-cw-512.png',
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@700;800;900&display=swap',
  'https://fonts.googleapis.com/css2?family=cwTeXYen&family=Zen+Kurenaido&display=swap'
];

// Install: cache core assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network-first for API/Firebase, cache-first for assets
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // API calls → always go to network (don't cache)
  if (url.hostname === 'api.anthropic.com' ||
      url.hostname === 'generativelanguage.googleapis.com' ||
      url.hostname === 'firestore.googleapis.com' ||
      url.hostname.includes('firebase')) {
    return;
  }

  // Everything else → cache-first, fallback to network
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        // Cache successful GET responses
        if (e.request.method === 'GET' && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return response;
      });
    }).catch(() => {
      // Offline fallback
      if (e.request.destination === 'document') {
        return caches.match('./index.html');
      }
    })
  );
});
