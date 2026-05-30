// expo export -p web の後に `workbox generateSW` で dist/service-worker.js を生成する。
// ナビゲーションは NetworkFirst にして、古いビルドがキャッシュに固着するのを防ぐ。
module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{html,js,css,png,ico,json,woff,woff2,ttf,svg}'],
  swDest: 'dist/service-worker.js',
  skipWaiting: true,
  clientsClaim: true,
  cleanupOutdatedCaches: true,
  // 大きめのチャンクも precache 対象に含める
  maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
  runtimeCaching: [
    {
      // ページ遷移は常に最新を優先（オフライン時のみキャッシュ）
      urlPattern: ({ request }) => request.mode === 'navigate',
      handler: 'NetworkFirst',
      options: {
        cacheName: 'html-navigations',
        networkTimeoutSeconds: 3,
      },
    },
    {
      urlPattern: ({ request }) =>
        ['style', 'script', 'worker', 'font'].includes(request.destination),
      handler: 'StaleWhileRevalidate',
      options: { cacheName: 'static-resources' },
    },
    {
      urlPattern: ({ request }) => request.destination === 'image',
      handler: 'StaleWhileRevalidate',
      options: { cacheName: 'images' },
    },
  ],
};
