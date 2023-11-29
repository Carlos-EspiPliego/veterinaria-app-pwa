const db = new PouchDB('petcitas');

function guardarMensaje(message) {
  message._id = new Date().toISOString();

  return db.put(message).then(() => {
    self.registration.sync.register('nuevo-post');
    const newResp = { ok: true, offline: true };
    return new Response(JSON.stringify(newResp));
  });

}

//Postear mensajes a la API
function postearMensaje(){
    const posteos = [];

    return db.allDocs({include_docs: true}).then(docs=>{

        docs.rows.forEach(row=>{

            const doc = row.doc;
            console.log('doc de sw-db',doc);
            const fetchProm = fetch(`http://192.168.1.154:2812/petcitas/cita/add`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(doc)
            }).then(res=>{
                return db.remove(doc)
            })
            posteos.push(fetchProm)
            
        })// Fin del forEach

        return Promise.all(posteos)
    })
}