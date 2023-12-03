import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const direccionIp = '192.168.0.15'
const URL_API = `http://${direccionIp}:2812/petcitas/cita`;

const initialState = {
    citas: [],
    status: 'idle',
    error: null,
}

// Función para traer todas las citas
const getCitasAsync = createAsyncThunk('citas/getCitas', async ( citaData ) => {
    // console.log("Entró a getCitasAsync :DD => : " + JSON.stringify(citaData, null, 2))
    try {
        const response = await axios.post(`${URL_API}/obtenerCitas`, citaData, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                "Content-Type": "application/json",
            },
            mode: "no-cors",
        })
        const data = response.data.responses;
        // console.log("Esto es la respuesta de getCitasAsync: => " + JSON.stringify(data, null, 2));
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
})

// Función para registrar una cita
const registrarCitaAsync = createAsyncThunk('citas/registrarCita', async ( citaData ) => {
    // console.log("Entro a citaSlice: " + JSON.stringify(citaData, null, 2))
    try {
        const response = await axios.post(`${URL_API}/add`, citaData, {
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

// FUnción para eliminar cita
const deleteCitaAsync = createAsyncThunk('citas/deleteCita', async ( citaData ) => {
    // console.log("Entró a eliminarCita :DD => : " + JSON.stringify(citaData, null, 2))
    try {
        const response = await axios.post(`${URL_API}/eliminar`, citaData, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                "Content-Type": "application/json",
            },
            mode: "no-cors",
        })
        const data = response.data.request;
        // console.log("Respuesta despues de eliminar " + JSON.stringify(data, null, 2))
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
})

// FUnción para editar una cita
const editarCitaAsync = createAsyncThunk('citas/editaCita', async ( citaData ) => {
    // console.log("Entró a actualizarCita :DD::: => : " + JSON.stringify(citaData, null, 2))
    try {
        const response = await axios.post(`${URL_API}/actualizar`, citaData, {
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

const citasSlice = createSlice({
    name: 'citas',
    initialState,
    reducers: {
        getCitas: {
            reducer(state, action) {
                state.citas = action.payload;
            },
            prepare(citas) {
                return {
                    payload: citas
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCitasAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCitasAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.citas = action.payload;
            })
            .addCase(getCitasAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(registrarCitaAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registrarCitaAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.citas = [...state.citas, action.payload];
            })
            .addCase(registrarCitaAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(deleteCitaAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteCitaAsync.fulfilled, (state, action) => {
                state.status = 'success';
                // console.log("Action al eliminar: " + JSON.stringify(action.payload, null, 2))
                state.citas = state.citas.filter(cita => cita.id !== action.payload.id);
            })
            .addCase(deleteCitaAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(editarCitaAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editarCitaAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.citas = state.citas.map(cita => {
                    if (cita.id === action.payload.id) {
                        return {
                            ...cita,
                            ...action.payload
                        }
                    }else {
                        return cita;
                    }
                })
            })
            .addCase(editarCitaAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const { getCitas } = citasSlice.actions;

export default citasSlice.reducer;

export { getCitasAsync, registrarCitaAsync, deleteCitaAsync, editarCitaAsync }