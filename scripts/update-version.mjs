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

self.addEventListener('install', (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        cache.addAll([
          './',
          './manifest.webmanifest',
          './icon-192.png',
          './icon-512.png',
        ])
      )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
`;

fs.writeFileSync('public/sw.js', sw);

console.log('version.json updated');
console.log('sw.js updated');
