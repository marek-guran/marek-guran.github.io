/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  'index.html',
  './', // Alias for index.html
  '404.html',
  'projekty.html',
  'skola.html',
  'zaujmy.html',
  'zivotopis.html',
  './css/404.css',
  './css/projekty.css',
  './css/skola.css',
  './css/style.css',
  './css/zaujmy.css',
  './css/zivotopis.css',
  './fonts/josefin_sans/JosefinSans.ttf',
  './fonts/fontawesome-free-6.2.1-web/css/all.css',
  './images/404.jpg',
  './images/android.png',
  './images/astronaut.svg',
  './images/ciapka.svg',
  './images/hardware.png',
  './images/hero.jpg',
  './images/mesiac.svg',
  './images/MG.jpg',
  './images/music.png',
  './images/prace.png',
  './images/programovanie.png',
  './images/raketa.svg',
  './images/zem.svg',
  './images/gallery/pond.jpg',
  './images/gallery/praxmaturita1.JPG',
  './images/gallery/praxmaturita2.JPG',
  './images/gallery/stuzkova.jpg',
  './images/gallery/sunset.jpg',
  './images/gallery/waterdrops.jpg',
  './images/lineage_os/logo.png',
  './images/lineage_os/obrazok1.png',
  './images/lineage_os/obrazok2.png',
  './images/lineage_os/obrazok3.png',
  './images/marek_guran_app/dark1.png',
  './images/marek_guran_app/dark2.png',
  './images/marek_guran_app/dark3.png',
  './images/marek_guran_app/dark4.png',
  './images/marek_guran_app/ikona.png',
  './images/rozvrh_app/dark1.png',
  './images/rozvrh_app/dark2.png',
  './images/rozvrh_app/dark3.png',
  './images/rozvrh_app/ikona.png'
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});