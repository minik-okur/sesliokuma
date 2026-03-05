const CACHE_NAME = 'minik-okur-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon192.png',
  './icon512.png',
  './screenshot-mobile.png',
  './screenshot-desktop.png',
  './privacy.html',
  './style.css',
  './app.js',
  './ses-yonetici.js',
  './balon.js',
  './kelime.js',
  './uzay.js',
  './hazine.js',
  './hafiza.js',
  './yapboz.js',
  './hikaye.js',
  './hikaye-secim.js',
  './sureli-okuma.js'
];

// Kurulum: Dosyaları önbelleğe al
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  // Yeni SW hemen devreye girsin, eski beklemesin
  self.skipWaiting();
});

// Aktivasyon: Eski önbellekleri temizle
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  // Tüm açık sekmeleri hemen kontrol al
  self.clients.claim();
});

// İstekleri Yakalama
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
