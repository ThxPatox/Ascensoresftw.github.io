var cacheName = 'Version-5';
var filesToCache = [
  '/index.html',
  '/login.html',
  '/tareas.html',
  '/service-worker.js',
  '/manifest.json',
  '/css/main.css',
  '/css/index.css',
  '/css/indextablet.css',
  '/css/indexcel.css',
  '/css/tareas.css',
  '/css/tareascel.css',
  '/css/tareastablet.css',
  '/css/login.css',
  '/css/topnav.css',
  '/img/logo.png',
  '/js/service-wroker-register.js',
  '/js/jquery.js',
  '/js/app.js',
  '/js/login.js',
  'images/icons/icon-512x512.png',
  'images/icons/icon-384x384.png',
  'images/icons/icon-192x192.png',
  'images/icons/icon-152x152.png',
  'images/icons/icon-144x144.png',
  'images/icons/icon-128x128.png',
  'images/icons/icon-96x96.png',
  'images/icons/icon-72x72.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});