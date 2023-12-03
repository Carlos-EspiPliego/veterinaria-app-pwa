import Swal from 'sweetalert2'
const CACHE_DYNAMIC = 'dynamic-v1';
const CACHE_STATIC = 'static-v1';
const CACHE_INMUTABLE = 'inmutable-v1';
const self = this;

const limpiarCache = (cacheName, numberItem) => {
  caches.open(cacheName)
    .then(cache => {
      cache.keys()
        .then(keys => {
          if (keys.length > numberItem) {
            cache.delete(keys[0])
              .then(() => limpiarCache(cacheName, numberItem))
          }
        })
    })
}

const APP_SHELL = [
  '/',
  '/index.html',
  '/js/app.js',
  '/sw.js',
  '/js/sw-utils.js',
  'static/js/bundle.js',
  '/pages/404Page.html',
  '/manifest.json',
  '/favicon.ico',
  './img/404.png',
  './styles/notFound.css'
];

const APP_SHELL_INMUTABLE = [
  'https://fonts.googleapis.com/css?family=Quicksand:300,400&display=swap',
  'https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js',
    'https://www.gstatic.com/firebasejs/10.6.0/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/10.6.0/firebase-messaging-compat.js'
];

importScripts('https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js');
importScripts('js/sw-db.js');
importScripts('js/sw-utils.js');
importScripts('firebase-messaging-sw.js')

self.addEventListener('install', function (event) {
  const cacheStatic = caches.open(CACHE_STATIC).then(cache => cache.addAll(APP_SHELL));
  const cacheInmutable = caches.open(CACHE_INMUTABLE).then(cache => cache.addAll(APP_SHELL_INMUTABLE));

  event.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});

self.addEventListener('activate', function (event) {
  const respuesta = caches.keys()
    .then(keys => {
      keys.forEach(key => {
        if (key !== CACHE_STATIC && key.includes('static')) {
          return caches.delete(key);
        }
      })
    });
  event.waitUntil(respuesta);
});

self.addEventListener('fetch', event => {
  let respuesta;

  if (!navigator.onLine) {
    // Si no hay conexión, muestra una alerta de SweetAlert
    const message = "No tienes conexión a Internet";
    mostrarAlerta(message);
    return;
  }

  if (event.request.url.includes('/petcitas/cita/add')) {
    respuesta = manejoApi(CACHE_DYNAMIC, event.request);
  } else {
    respuesta = caches.match(event.request)
      .then(res => {
        if (res) {
          actualizaCacheStatico(CACHE_STATIC, event.request, APP_SHELL_INMUTABLE)
          return res;
        } else {
          return fetch(event.request)
            .then(newRes => actualizaCacheDinamico(CACHE_DYNAMIC, event.request, newRes))
            .catch(error => {
              const message = "Ocurrio un error al cargar la pagina"
              mostrarAlerta(message);
            })
        }
      });
  }

  event.respondWith(respuesta);
});

function mostrarAlerta(message) {
  Swal.fire({
      icon: 'error',
      title: 'Error de conexión',
      text: message,
  });
}

// Tareas asíncronas
self.addEventListener('sync', event => {
  console.log('SW: Sync');
  if (event.tag === 'nuevo-post') {
    // Postear a BD cuando hay conexión
    const respuesta = postearMensaje();
    event.waitUntil(respuesta);
  }
});
