// Installing service worker
const CACHE_NAME = 'Marek Guráň';

/* Add relative URL of all the static content you want to store in
* cache storage (this will help us use our app offline)*/
let resourcesToCache = [
  '/fonts/josefin_sans/JosefinSans.ttf',
  '/fonts/fontawesome-free-6.2.1-web/css/all.css',
  '/fonts/fontawesome-free-6.2.1-web/webfonts/fa-brands-400.ttf',
  '/fonts/fontawesome-free-6.2.1-web/webfonts/fa-regular-400.ttf',
  '/fonts/fontawesome-free-6.2.1-web/webfonts/fa-solid-900.ttf',
  '/fonts/fontawesome-free-6.2.1-web/webfonts/fa-v4compatibility.ttf'];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(resourcesToCache);
    })
  );
});

// Cache and return requests
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});

// Update a service worker
const cacheWhitelist = ['Marek Guráň'];
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});