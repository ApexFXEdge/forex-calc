const cacheName = 'traders-edge-v1'; // Renamed cache
const filesToCache = [
    '/traders-edge/',
    '/traders-edge/index.html',
    '/traders-edge/favicon.ico',
    '/traders-edge/apple-touch-icon.png',
    '/traders-edge/favicon-32x32.png',
    '/traders-edge/favicon-16x16.png',
    '/traders-edge/site.webmanifest',
    '/traders-edge/android-chrome-192x192.png',
    '/traders-edge/android-chrome-512x512.png'
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
