import axios from 'axios';

const direccionIp = '192.168.56.1'
const URL_API = `https://petcitas.uw.r.appspot.com/petcitas/usuario`;

export const registrarCliente = async ( userData ) => {
    console.log("Entró a registrarCliente :DD => : " + JSON.stringify(userData, null, 2))
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


//Funcion para eliminar un cliente
export const eliminarCliente = async ( dataUser ) => {
    console.log("Entró a eliminarCliente :DD => : " + JSON.stringify(dataUser, null, 2))
    try {
        const response = await axios.post(`${URL_API}/eliminar`, dataUser, {
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

//Función para actualizar un cliente
export const actualizarCliente = async ( userData ) => {
    console.log("Entró a actualizarCliente :DD => : " + JSON.stringify(userData, null, 2))
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