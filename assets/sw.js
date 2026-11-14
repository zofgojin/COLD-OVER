var CACHE = "cold-over-v23";
var CORE = ["./", "index.html", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png", "background-ice.png", "background-coldover.png", "snake-head-default.jpg", "snake-body-default.jpg", "snake-head-ice.png", "snake-head-diamond.png", "snake-body-ice.png", "snake-body-shop.jpg", "cold-default.jpg", "frame-ice.jpg", "snake-head-diamond.png", "snake-body-ice.png", "snake-body-shop.jpg", "frame-ice-overlay.png", "ice-pickup.mp3", "kosatka-so-big.mp3", "cold-photo-skin.png", "cracking-ice-underfoot.mp3", "a-sudden-burst-of-fire.mp3", "cold-basket.webp", "background-on-tha-twitch.webp", "background-90.webp", "burger-pallaich.mp3", "skin-gameover.png", "skin-sound.png", "skin-track.png", "skin-platinum.png", "skin-diamond-disc.png", "skin-board.png", "snake-body-realover.webp", "background-realover.webp", "snake-head-realover.webp"];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  var r = e.request;
  if (r.method !== "GET" || r.headers.has("range")) return; /* music streams straight from the files */
  e.respondWith(caches.match(r).then(function (hit) {
    return hit || fetch(r).then(function (res) {
      if (res && (res.ok || res.type === "opaque")) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(r, copy); }); }
      return res;
    }).catch(function () { return hit; });
  }));
});
