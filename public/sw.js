const options = <%= JSON.stringify(options) %>

    importScripts(options.workboxUrl)

console.log("Custom Worker! Ja!")

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', () => self.clients.claim())

const { registerRoute } = workbox.routing
const { NetworkFirst, StaleWhileRevalidate, CacheFirst } = workbox.strategies
const { CacheableResponsePlugin } = workbox.cacheableResponse
const { ExpirationPlugin } = workbox.expiration
const { precacheAndRoute } = workbox.precaching

// Cache page navigations (html) with a Network First strategy
registerRoute(
    ({ request }) => {
        return request.mode === 'navigate'
    },
    new NetworkFirst({
        cacheName: 'pages',
        plugins: [
            new CacheableResponsePlugin({ statuses: [200] })
        ]
    })
)

// Cache Web Manifest, CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
registerRoute(
    ({ request }) =>
        request.destination === 'manifest' ||
        request.destination === 'style' ||
        request.destination === 'script' ||
        request.destination === 'worker',
    new StaleWhileRevalidate({
        cacheName: 'assets',
        plugins: [
            new CacheableResponsePlugin({ statuses: [200] })
        ]
    })
)

// Cache images with a Cache First strategy
registerRoute(
    ({ request }) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'images',
        plugins: [
            new CacheableResponsePlugin({ statuses: [200] }),
            // 50 entries max, 30 days max
            new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 })
        ]
    })
)

registerRoute(
    ({ url }) =>
        url.pathname.startsWith('/api/collections/welcome_messages') || url.pathname.startsWith('/api/collections/pages'),
    new CacheFirst({
        cacheName: 'apiCache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],
    })
);

registerRoute(
    ({ url }) =>
        url.pathname.startsWith('/api/collections/events') || url.pathname.startsWith('/api/collections/categories') || url.pathname.startsWith('/api/collections/posts') || url.pathname.startsWith('/api/collections/locations'),
    new NetworkFirst({
        cacheName: 'apiCache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],
    })
);

// Precaching
if (options.preCaching.length) {
    precacheAndRoute(options.preCaching, options.cacheOptions)
}