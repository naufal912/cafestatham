const CACHE_NAME = 'cafe-mang-statham-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.jpeg',
  '/css/style.css',
  '/js/script.js',
  '/src/app.js',
  // ... tambahkan semua file yang perlu di-cache
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)));
});
