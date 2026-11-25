// Service Worker: מאפשר לפתוח את האתר גם בלי חיבור לאינטרנט.
// אסטרטגיה: קודם רשת (כדי לקבל תמיד את הגרסה העדכנית), ואם אין רשת — מהמטמון.
const CACHE = 'work-schedule-v2';
const SHELL = ['./', './index.html', './manifest.json', './icon.svg', './icon-192.png', './icon-512.png', './apple-touch-icon.png', './tailwind.css', './terms.html', './privacy.html', './accessibility.html'];

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);
    // לא נוגעים בתעבורה של Firebase (מסד נתונים / התחברות) — היא מנוהלת ע"י ה-SDK
    if (/firebaseio\.com|firebasedatabase\.app|googleapis\.com\/identitytoolkit|securetoken|firebaseapp\.com/.test(url.host + url.pathname)) return;
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

    event.respondWith(
        fetch(req)
            .then(res => {
                if (res && (res.ok || res.type === 'opaque')) {
                    const copy = res.clone();
                    caches.open(CACHE).then(cache => cache.put(req, copy));
                }
                return res;
            })
            .catch(() => caches.match(req).then(hit => hit || (req.mode === 'navigate' ? caches.match('./index.html') : Response.error())))
    );
});
