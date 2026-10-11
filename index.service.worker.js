// Önbellek kapatıldı: eski hizmet çalışanını kaldırır ve sayfayı yeniler
self.addEventListener('install', function (e) { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil((async function () {
    try { var ks = await caches.keys(); for (var k of ks) { await caches.delete(k); } } catch (x) {}
    try { await self.registration.unregister(); } catch (x) {}
    try { var cs = await self.clients.matchAll({type: 'window'}); cs.forEach(function (c) { c.navigate(c.url); }); } catch (x) {}
  })());
});
