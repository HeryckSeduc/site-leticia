/* ============================================================
   SERVICE WORKER — site-leticia
   Cache estratégico para performance e offline
   ============================================================ */

const CACHE  = 'leticia-v1';
const STATIC = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/script.js',
    '/assets/backgrounds/lirio.webp',
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Lato:wght@300;400&display=swap',
];

/* Instalação — armazena assets críticos */
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE)
            .then(c => c.addAll(STATIC))
            .then(() => self.skipWaiting())
    );
});

/* Ativação — limpa caches antigos e garante controle imediato */
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE).map(k => caches.delete(k))
            )
        ).then(() => self.clients.claim())
    );
});

/* Fetch — estratégia inteligente de cache */
self.addEventListener('fetch', e => {
    /* Ignora requisições não-GET */
    if (e.request.method !== 'GET') return;

    /* Para navegação, tenta network primeiro com fallback em cache */
    if (e.request.mode === 'navigate') {
        e.respondWith(
            fetch(e.request, { timeout: 5000 })
                .then(response => {
                    if (response.ok) {
                        const clone = response.clone();
                        caches.open(CACHE).then(c => c.put(e.request, clone));
                    }
                    return response;
                })
                .catch(() => caches.match(e.request)
                    .then(cached => cached || caches.match('/index.html'))
                )
        );
        return;
    }

    /* Para outros assets, cache-first com network fallback */
    e.respondWith(
        caches.match(e.request).then(cached => {
            if (cached) return cached;

            return fetch(e.request, { timeout: 8000 }).then(response => {
                /* Só cacheia respostas válidas de mesma origem */
                if (
                    response.ok &&
                    response.type === 'basic' &&
                    !e.request.url.includes('spotify')
                ) {
                    const clone = response.clone();
                    caches.open(CACHE).then(c => c.put(e.request, clone));
                }
                return response;
            }).catch(() => {
                /* Fallback para imagens offline */
                if (e.request.destination === 'image') {
                    return new Response(
                        '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect fill="#070d1f" width="100" height="100"/></svg>',
                        { headers: { 'Content-Type': 'image/svg+xml' } }
                    );
                }
                return caches.match('/index.html');
            });
        })
    );
});