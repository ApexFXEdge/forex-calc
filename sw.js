const cacheName = 'forex-calc-v1';
// Add all your file names here
const filesToCache = [
  '/forex-calc/',
  '/forex-calc/index.html',
  '/forex-calc/style.css', // (if you have one)
  '/forex-calc/script.js', // (if you have one)
  '/forex-calc/favicon.ico',
  '/forex-calc/apple-touch-icon.png'
  // Add all your other icon files (e.g., 'favicon-32x32.png')
];

// Install the service worker and cache files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

// Serve cached files when offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
