// Installing service worker
const CACHE_NAME = 'Marek Guráň';

/* Add relative URL of all the static content you want to store in
* cache storage (this will help us use our app offline)*/
let resourcesToCache = ["./",
'index.html',
  '404.html',
  'projekty.html',
  'skola.html',
  'zaujmy.html',
  'zivotopis.html',
  '/css/404.css',
  '/css/projekty.css',
  '/css/skola.css',
  '/css/style.css',
  '/css/zaujmy.css',
  '/css/zivotopis.css',
  '/fonts/josefin_sans/JosefinSans.ttf',
  '/fonts/fontawesome-free-6.2.1-web/css/all.css',
  '/fonts/fontawesome-free-6.2.1-web/webfonts/fa-brands-400.ttf',
  '/fonts/fontawesome-free-6.2.1-web/webfonts/fa-regular-400.ttf',
  '/fonts/fontawesome-free-6.2.1-web/webfonts/fa-solid-900.ttf',
  '/fonts/fontawesome-free-6.2.1-web/webfonts/fa-v4compatibility.ttf',
  '/images/404.jpg',
  '/images/android.png',
  '/images/astronaut.svg',
  '/images/hardware.png',
  '/images/hero.jpg',
  '/images/mesiac.svg',
  '/images/hviezdy.svg',
  '/images/MG.jpg',
  '/images/music.png',
  '/images/raketa.svg',
  '/images/zem.svg',
  '/images/gallery/pond.jpg',
  '/images/gallery/praxmaturita1.JPG',
  '/images/gallery/praxmaturita2.JPG',
  '/images/gallery/stuzkova.jpg',
  '/images/gallery/sunset.jpg',
  '/images/gallery/waterdrops.jpg',
  '/images/lineageos_os/logo.png',
  '/images/lineageos_os/obrazok1.png',
  '/images/lineageos_os/obrazok2.png',
  '/images/lineageos_os/obrazok3.png',
  '/images/marek_guran_app/dark1.png',
  '/images/marek_guran_app/dark2.png',
  '/images/marek_guran_app/dark3.png',
  '/images/marek_guran_app/dark4.png',
  '/images/marek_guran_app/ikona.png',
  '/images/rozvrh_app/dark1.png',
  '/images/rozvrh_app/dark2.png',
  '/images/rozvrh_app/dark3.png',
  '/images/rozvrh_app/ikona.png'];

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