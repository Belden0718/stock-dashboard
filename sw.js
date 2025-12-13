const CACHE_NAME = 'stock-dashboard-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-database-compat.js'
];

// 安裝 Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker 安裝中...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('快取已開啟');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('快取失敗:', err))
  );
  self.skipWaiting();
});

// 攔截請求
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 快取命中 - 返回快取
        if (response) {
          return response;
        }
        // 否則從網路獲取
        return fetch(event.request);
      })
      .catch(() => {
        // 網路和快取都失敗時的後備方案
        return caches.match('./index.html');
      })
  );
});

// 啟動 Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker 啟動中...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('刪除舊快取:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});
```
