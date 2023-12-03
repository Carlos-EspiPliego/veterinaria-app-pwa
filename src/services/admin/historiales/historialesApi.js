import axios from 'axios';

const direccionIp = '192.168.1.154'
const URL_API = `http://${direccionIp}:2812/petcitas/historial`;

export const registrarHistorial = async ( userData ) => {
   
    try {
        const response = await axios.post(`${URL_API}/add`, userData, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                "Content-Type": "application/json",
            },
            mode: "no-cors",
        })
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Función para eliminar cita de un cliente
export const eliminarHistorial = async ( userData ) => {
    //console.log("Entró a eliminarHistorial :DD => : " + JSON.stringify(id, null, 2))
    try {
        const response = await axios.post(`${URL_API}/eliminar`, userData, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                "Content-Type": "application/json",
            },
            mode: "no-cors",
        })
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Función para actualizar cita de un cliente
export const actualizarHistorial = async ( userData ) => {
    //console.log("Entró a actualizarCita :DD => : " + JSON.stringify(userData, null, 2))
    try {
        const response = await axios.post(`${URL_API}/actualizar`, userData, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                "Content-Type": "application/json",
            },
            mode: "no-cors",
        })
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}