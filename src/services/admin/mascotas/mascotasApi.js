import axios from 'axios';

const direccionIp = '192.168.0.7'
const URL_API = `http://${direccionIp}:2812/petcitas/mascota`;

export const registrarMascota = async ( mascotaData ) => {
    console.log("Entró a registrarMascota :DD => : " + JSON.stringify(mascotaData, null, 2))
    try {
        const response = await axios.post(`${URL_API}/add`, mascotaData, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                "Content-Type": "application/json",
            },
            mode: "no-cors",
        })
        const data = response.data.response;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Función para eliminar una mascota
export const eliminarMascota = async ( id ) => {
    console.log("Entró a eliminarMascota :DD => : " + JSON.stringify(id, null, 2))
    try {
        const response = await axios.delete(`${URL_API}/delete/${id}`, {
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

// Función para actualizar una mascota
export const actualizarMascota = async ( userData ) => {
    console.log("Entró a actualizarMascota :DD => : " + JSON.stringify(userData, null, 2))
    try {
        const response = await axios.put(`${URL_API}/update/${userData.id}`, userData, {
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