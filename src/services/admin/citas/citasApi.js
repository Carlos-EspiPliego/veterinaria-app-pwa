import axios from 'axios';

const direccionIp = '192.168.1.154'
const URL_API = `http://${direccionIp}:2812/petcitas/cita`;

export const registrarCita = async ( userData ) => {
    // console.log("Entró a registrarCita :DD => : " + JSON.stringify(userData, null, 2))
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
export const eliminarCita = async ( id ) => {
    console.log("Entró a eliminarCita :DD => : " + JSON.stringify(id, null, 2))
    // try {
    //     const response = await axios.delete(`${URL_API}/delete/${id}`, {
    //         headers: {
    //             "Access-Control-Allow-Origin": "*",
    //             "Access-Control-Allow-Headers":
    //                 "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
    //             "Content-Type": "application/json",
    //         },
    //         mode: "no-cors",
    //     })
    //     const data = response.data;
    //     return data;
    // } catch (error) {
    //     console.log(error);
    //     throw error;
    // }
}

// Función para actualizar cita de un cliente
export const actualizarCita = async ( userData ) => {
    console.log("Entró a actualizarCita :DD => : " + JSON.stringify(userData, null, 2))
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