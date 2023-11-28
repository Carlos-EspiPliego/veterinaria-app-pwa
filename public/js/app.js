if(navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('Registro de SW exitoso', reg))
        .catch(error => console.log('SW registro fallido', error))
}