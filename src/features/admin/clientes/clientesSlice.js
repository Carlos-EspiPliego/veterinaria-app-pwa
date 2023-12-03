import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const direccionIp = '192.168.1.154'
const URL_API = `http://${direccionIp}:2812/petcitas/usuario`;

const initialState = {
    users: [],
    status: 'idle',
    error: null,
}

// Función para traer todos los clientes
const getClientesAsync = createAsyncThunk('cliente/obtenerUsuarios', async (userData) => {
    // console.log("Entró a getClientesAsync :DD => : " + JSON.stringify(userData, null, 2))
    try {
        const response = await axios.post(`${URL_API}/obtenerUsuarios`, userData, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                "Content-Type": "application/json",
            },
            mode: "no-cors",
        })
        const data = response.data.responses;
        // console.log("getClientsAsync: => " + JSON.stringify(data, null, 2));
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
})

// Función para registrar un cliente
const registrarClienteAsync = createAsyncThunk('cliente/registrarUsuario', async (userData) => {
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
        const data = response.data.response;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
})

// Función para eliminar a un cliente
const eliminarClienteAsync = createAsyncThunk('cliente/eliminarCliente', async (dataUser) => {
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
})

// Función para editar a un cliente
const editarClienteAsync = createAsyncThunk('cliente/editarCliente', async (dataUser) => {
    try {
        const response = await axios.post(`${URL_API}/actualizar`, dataUser, {
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
})

const clientesSlice = createSlice({
    name: 'clientes',
    initialState,
    reducers: {
        getClientes: {
            reducer(state, action) {
                state.users = action.payload;
            },
            prepare(users) {
                return {
                    payload: users
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getClientesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getClientesAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.users = action.payload;
            })
            .addCase(getClientesAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(registrarClienteAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registrarClienteAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.users = [...state.users, action.payload];
            })
            .addCase(registrarClienteAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(eliminarClienteAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(eliminarClienteAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.users = state.users.filter((user) => user.id !== action.payload.id);
            })

            .addCase(editarClienteAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editarClienteAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.users = state.users.map((user) => {
                    if (user.id === action.payload.id) {
                        return action.payload;
                    }
                    return user;
                })
            })
            .addCase(editarClienteAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const { getClientes } = clientesSlice.actions;

export default clientesSlice.reducer;

export { getClientesAsync, registrarClienteAsync, eliminarClienteAsync, editarClienteAsync }