addEventListener('install', (event) => {
  console.log('Hello from the service worker')
  event.waitUntil(caches.open('offline').then((cache) => {
      cache.add('offline.html');
    })
  );
});

const name = 'bcalou';
console.log(`Hello ${name}`);

if (navigator.serviceWorker) {
  console.log('All good');
  navigator.serviceWorker.register("/sw.js")
  .then(() => console.log('Service worker is registered'))
  .catch(err => console.warn(err));
} else {
  console.log('Nothing to see here...');
}

addEventListener('fetch', (event) => {
  console.log(event);
  if (event.request.headers.get('Accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
      .then((res) => {
    if (isPartyPage(event.request.url)) {
      const copy = res.clone();
      caches
        .open('parties')
        .then((cache) => cache.put(event.request, copy));
      return res;
    } else {
      return res;
    }
    })
    .catch(() => {
      if (isPartyPage(event.request.url)) {
        return caches
          .match(event.request)
          .catch((err) => caches.match('offline.html'));
      } else {
        return caches.match('offline.html');
      }
    })
    );
  } 
});

function isPartyPage(url) {
  return /party\/[a-zA-Z0-9]*$/.test(url);
}

