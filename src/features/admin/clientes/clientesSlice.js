import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const direccionIp = '192.168.0.7'
const URL_API = `http://${direccionIp}:2812/petcitas/usuario`;

const initialState = {
    users: null,
    status: 'idle',
    error: null,
}

// Función para traer todos los clientes
const getClientsAsync = createAsyncThunk('auth/getClients', async () => {
    try {
        const response = await axios.get(`${URL_API}/all`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                "Content-Type": "application/json",
            },
            mode: "no-cors",
        })
        const data = response.data;
        console.log("getClientsAsync: => " + JSON.stringify(data, null, 2));
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
            .addCase(getClientsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getClientsAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.users = action.payload;
            })
            .addCase(getClientsAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const { getClientes } = clientesSlice.actions;

export default clientesSlice.reducer;

export { getClientsAsync }