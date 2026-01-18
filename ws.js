// Service Worker Version
const version = 1;
let isOnline = true;

// Cache Names
const staticCache = `agriStaticCache${version}`;
const dynamicCache = `agriDynamicCache${version}`;

// Files to cache on install
const cacheList = [
  '/',
  '/index.html',
  '/app.js',
  '/manifest.json',
  '/components/AppShell.js',
  '/pages/HomePage.js',
  '/pages/ServicesPage.js',
  '/pages/ProductsPage.js',
  '/pages/AboutPage.js',
  '/pages/ContactPage.js',
  '/bneder.png',
  // Add other assets you want to cache
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png'
];

// Install Event - Cache static assets
self.addEventListener('install', event => {
  // Force activate the new service worker
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(staticCache)
      .then(cache => {
        console.log('Caching static assets');
        return cache.addAll(cacheList);
      })
  );
});

// Skip waiting and claim clients immediately
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

// Activate Event - Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== staticCache && key !== dynamicCache)
          .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch Event - Serve from cache, falling back to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache the response
          caches.open(dynamicCache)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(() => {
          // If both cache and network fail, show a fallback
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          return new Response('You are offline and no cache available.', {
            status: 408,
            headers: { 'Content-Type': 'text/plain' }
          });
        });
      })
  );
});

// Handle messages from the app
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'ONLINE_STATUS') {
    isOnline = event.data.isOnline;
  }
});

// Handle push notifications
self.addEventListener('push', event => {
  const title = 'GreenHarvest Update';
  const options = {
    body: event.data?.text() || 'New update available!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-96x96.png'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});