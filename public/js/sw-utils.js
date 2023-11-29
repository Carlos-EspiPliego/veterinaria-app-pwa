// Guardar en el cache dinamico
function actualizaCacheDinamico(cacheDinamico, req, res) {
    if (res.ok) {
    
    return caches.open(cacheDinamico).then(cache => {
    
    cache.put(req, res.clone());
    
    return res.clone();
    
    });
    
    } else {
    return res;
    }  
}


// Cache with network update
function actualizaCacheStatico(estaticoCache, req, APP_SHELL_INMUTABLE) {


    if (APP_SHELL_INMUTABLE.includes(req.url)) {
    // No hace falta actualizar el inmutable
    // console.log('existe en inmutable', req.url );
    
    } else {
    // console.log('actualizando', req.url );
    return fetch(req).then(res => {return actualizaCacheDinamico(estaticoCache, req, res)})
    } 
}


//Estrategia de cache Red y actualización de cache

function manejoApi(cacheName, req) {
    if (req.clone().method === 'POST') {
        // Guardar mensaje en la base de datos local (PouchDB)
        return req.clone().text().then(body => {
            const bodyObj = JSON.parse(body);
            return guardarMensaje(bodyObj);
        });
    } else {
        // Para otras solicitudes (GET, etc.)
        return fetch(req)
            .then(res => {
                if (res.ok) {
                    // Actualizar el caché dinámico y devolver la respuesta
                    actualizaCacheDinamico(cacheName, req, res.clone());
                    return res.clone();
                } else {
                    // Si la solicitud no es exitosa, intentar obtener la respuesta desde la caché
                    return caches.match(req);
                }
            })
            .catch(err => {
                // Si hay errores durante la solicitud, intentar obtener la respuesta desde la caché
                return caches.match(req);
            });
    }
}