// This is the "Offline copy of pages" service worker
/* eslint-disable no-undef */

const CACHE = "pwabuilder-offline";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  new RegExp('/*.css|/*.js|/*.html|/*.png'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);
