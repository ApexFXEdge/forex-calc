const cacheName = 'traders-edge-v2'; // You can change v1 to v2, v3 etc. when you make big updates
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

// 1. Install the service worker and cache files
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(filesToCache);
        })
    );
    // --- NEW: Force the new service worker to activate immediately ---
    self.skipWaiting();
});

// 2. Activate the new service worker and delete old caches
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== cacheName) {
                        return caches.delete(cache); // Deletes old caches
                    }
                })
            );
        })
    );
    // --- NEW: Take control of the page immediately ---
    return self.clients.claim();
});

// 3. Serve cached files when offline (Network-first strategy)
self.addEventListener('fetch', (e) => {
    e.respondWith(
        // --- NEW: Try the network FIRST ---
        fetch(e.request).then((networkResponse) => {
            // If successful, cache the new version and return it
            return caches.open(cacheName).then((cache) => {
                cache.put(e.request, networkResponse.clone());
                return networkResponse;
            });
        }).catch(() => {
            // --- If network fails (offline), return from cache ---
            return caches.match(e.request);
        })
    );
});
