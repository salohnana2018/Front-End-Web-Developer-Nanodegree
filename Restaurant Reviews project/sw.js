var cacheName = 'restruntCache-v1';
var urlsToCache = [
'./',
'./index.html',
 './restaurant.html',
 './js/dbhelper.js',
 './js/main.js',
 './js/restaurant_info.js',
 './css/styles.css',
'./data/restaurants.json',
 './img/1.jpg',
 './img/2.jpg',
 './img/3.jpg',
 './img/4.jpg',
 './img/5.jpg',
 './img/6.jpg',
 './img/7.jpg',
 './img/8.jpg',
 './img/9.jpg',
 './img/10.jpg'
];
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        console.log('Cache is Opend');
        return cache.addAll(urlsToCache);
      })
  );
});
self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['restruntCache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
    .catch(err => console.log(err, event.request))
  );
});


