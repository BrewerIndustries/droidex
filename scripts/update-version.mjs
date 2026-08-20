import fs from 'fs';

const versionFile = 'src/data/version.ts';
const versionSource = fs.readFileSync(versionFile, 'utf8');

const match = versionSource.match(/APP_VERSION = '(.*?)'/);

if (!match) {
  throw new Error('APP_VERSION not found');
}

const version = match[1];

console.log(`Version: ${version}`);

fs.writeFileSync(
  'public/version.json',
  JSON.stringify(
    {
      version,
    },
    null,
    2
  )
);

const sw = `const CACHE = 'droidex-v${version}';

// Files worth having before the first offline load. index.html is deliberately
// NOT precached — see the fetch handler.
const SHELL = ['./manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

// Navigations go to the network first, falling back to cache when offline.
//
// Serving a cached index.html cache-first is a trap: every build emits new
// hashed asset filenames, so a stale index.html points at files that no longer
// exist and the app boots to a blank page. Vite's assets are content-hashed, so
// they are safe to serve cache-first and are cached as they are fetched.
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;

  const isNavigation =
    request.mode === 'navigate' ||
    (request.headers.get('accept') || '').includes('text/html');

  if (isNavigation) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('./')))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
`;

fs.writeFileSync('public/sw.js', sw);

console.log('version.json updated');
console.log('sw.js updated');
