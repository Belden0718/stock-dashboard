const CACHE_NAME = 'stock-dashboard-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-database-compat.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

#### 3️⃣ 製作圖示

使用線上工具製作 PWA 圖示：
- 到 [Favicon Generator](https://realfavicongenerator.net/)
- 上傳一張 512x512 的圖片（可以用📈 emoji 截圖）
- 下載生成的 `icon-192.png` 和 `icon-512.png`

### 📱 RWD 優化重點：

✅ **手機按鈕完美對齊**
- 使用 Flexbox 確保按鈕在各裝置都對齊
- 手機上按鈕會垂直排列
- 平板以上會水平排列

✅ **響應式設計**
- 統計卡片在手機上 2x2 佈局
- 表格可水平滾動
- 觸控友善的按鈕大小

✅ **PWA 功能**
- 可安裝到主畫面
- 支援離線瀏覽
- 快取靜態資源
- 漸進式載入

### 🚀 部署步驟：

1. 將所有檔案上傳到 GitHub repository
2. 確認檔案結構：
```
   /
   ├── index.html
   ├── manifest.json
   ├── sw.js
   ├── icon-192.png
   └── icon-512.png
