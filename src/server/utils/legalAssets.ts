export const legalAssets = process.env.__DEV__
    ? [
          '/default.css',
          '/client.js',
          '/favicon.ico',
          '/manifest.json',
          '/android-chrome-192x192.png',
          '/android-chrome-512x512.png',
          '/react.development.js',
          '/react-dom.development.js',
      ]
    : [
          '/default.css',
          '/client.js',
          '/favicon.ico',
          '/manifest.json',
          '/android-chrome-192x192.png',
          '/android-chrome-512x512.png',
      ];
