// Bungalov Yönetim · bildirimler (önbellek yok)
self.addEventListener('install', function (e) { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil((async function () {
    try { var ks = await caches.keys(); for (var k of ks) { await caches.delete(k); } } catch (x) {}
    try { await self.clients.claim(); } catch (x) {}
  })());
});
self.addEventListener('push', function (e) {
  var d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = { title: 'Bungalov Yönetim', body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Bungalov Yönetim', {
    body: d.body || '', tag: d.tag || undefined, renotify: !!d.tag, icon: 'index.icon.png', badge: 'index.icon.png',
    data: { url: d.url || self.registration.scope }
  }));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || self.registration.scope;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (var c of list) { if (c.url.indexOf(self.registration.scope) === 0 && 'focus' in c) return c.focus(); }
    return self.clients.openWindow(url);
  }));
});
