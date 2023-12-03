import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const direccionIp = '192.168.1.154'
const URL_API = `http://${direccionIp}:2812/petcitas/historial`;

const initialState = {
    historiales: [],
    historialesClientes: [],
    status: 'idle',
    error: null,
}

// Función para traer todos los historiales
const getHistorialesAsync = createAsyncThunk('citas/getHistoriales', async ( historialData ) => {
    try {
        const response = await axios.post(`${URL_API}/obtenerVeterinaria`, historialData, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                "Content-Type": "application/json",
            },
            mode: "no-cors",
        })
        const data = response.data.responses;
        // console.log("getCitasAsync: => " + JSON.stringify(data, null, 2));
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
})

//Funcion que trae los historiales del cliente logueado
const getHistorialesClienteAsync = createAsyncThunk('citas/getHistoriales', async ( historialData ) => {
    try {
        const response = await axios.post(`${URL_API}/obtenerCliente`, historialData, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                "Content-Type": "application/json",
            },
            mode: "no-cors",
        })
        const data = response.data.responses;
        // console.log("getCitasAsync: => " + JSON.stringify(data, null, 2));
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
})

const historialesSlice = createSlice({
    name: 'historiales',
    initialState,
    reducers: {
        getHistoriales: {
            reducer(state, action) {
                state.historiales = action.payload;
            },
            prepare(historiales) {
                return {
                    payload: historiales
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHistorialesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getHistorialesAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.historiales = action.payload;
            })
            .addCase(getHistorialesAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

const historialesClientesSlice = createSlice({
    name: 'historialesClientes',
    initialState,
    reducers: {
        getHistorialesClientes: {
            reducer(state, action) {
                state.historialesClientes = action.payload;
            },
            prepare(historialesClientes) {
                return {
                    payload: historialesClientes
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHistorialesClienteAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getHistorialesClienteAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.historiales = action.payload;
            })
            .addCase(getHistorialesClienteAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const { getHistoriales } = historialesSlice.actions;
export const { getHistorialesClientes } = historialesClientesSlice.actions;

export default historialesSlice.reducer;

export { getHistorialesAsync, getHistorialesClienteAsync }