// Retire the previous Workbox worker without intercepting network requests.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) {
        if (key.startsWith("workbox-") || ["google-fonts-cache", "images-cache"].includes(key)) {
          await caches.delete(key);
        }
      }
      await self.registration.unregister();
      await self.clients.claim();
    })(),
  );
});
