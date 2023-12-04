const CACHE_DYNAMIC = 'dynamic-v1'; // Para los archivos que se van a descargar
const CACHE_STATIC = 'static-v1'; // App shell
const CACHE_INMUTABLE = 'inmutable-v1'; // CDN de terceros como librerias etc
let self = this
importScripts('https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js')
importScripts('js/sw-db.js');
importScripts('js/sw-utils.js');

const APP_SHELL = [
  '/',
  '/index.html',
  '/js/app.js',
  '/sw.js',
  '/js/sw-utils.js',
  'static/js/bundle.js',
  '/favicon.ico',
  './img/404.png',
  './pages/404Page.html',
  './styles/notFound.css'

]

const limpiarCache = (cacheName, numberItem) => {
  caches.open(cacheName)
      .then(cache => {
          cache.keys()
              .then(keys => {
                  if (keys.length > numberItem) {
                      cache.delete(keys[0])
                          .then(limpiarCache(cacheName, numberItem))
                  }
              })
      })
}

const APP_SHELL_INMUTABLE = [
  'https://fonts.googleapis.com/css?family=Quicksand:300,400&display=swap',
  'https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js'
]

self.addEventListener('install', function (event) {
  const cacheStatic = caches.open(CACHE_STATIC).then(cache => cache.addAll(APP_SHELL))
  const cacheInmutable = caches.open(CACHE_INMUTABLE).then(cache => cache.addAll(APP_SHELL_INMUTABLE))

  event.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
})

self.addEventListener('activate', function (event) {
  const respuesta = caches.keys()
    .then(keys => {
      keys.forEach(key => {
        if (key !== CACHE_STATIC && key.includes('static')) {
          return caches.delete(key)
        }
      })
    })
  event.waitUntil(respuesta)
})

self.addEventListener('fetch', event => {

  let respuesta

  if (event.request.url.includes('/petcitas/cita/add')) {
    respuesta = manejoApi(CACHE_DYNAMIC, event.request)
  } else {
    respuesta = caches.match(event.request)
      .then(res => {
        if (res) {
          actualizaCacheStatico(CACHE_STATIC, event.request, APP_SHELL_INMUTABLE)
          return res
        } else {
          return fetch(event.request)
            .then(newRes => {
              return actualizaCacheDinamico(CACHE_DYNAMIC, event.request, newRes)
            });
        }
      });
  }

  event.respondWith(respuesta);
})

// Tareas asíncronas
self.addEventListener('sync', event => {
  console.log('SW: Sync')
  if (event.tag === 'nuevo-post') {
    // Postear a BD cuando hay conexión
    const respuesta = postearMensaje()
    event.waitUntil(respuesta)
  }
})

self.addEventListener('fetch', function (event) {

  const respuesta = caches.match(event.request).then(response => {
      if (response) return response

      //Si no existe el archivo lo descarga de la web
      return fetch(event.request).then(newResponse => {

          caches.open(CACHE_DYNAMIC)
              .then(cache => {
                  cache.post(event.request, newResponse)
                  limpiarCache(CACHE_DYNAMIC, 20)
              })
          return newResponse.clone()
      })
          .catch(err => {
              // Retornamos componente con ruta /404 
              if (event.request.headers.get('accept').includes('text/html')) {
                  return caches.match('./pages/404Page.html')
              }
          })
  })
  event.respondWith(respuesta)
})