import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const direccionIp = '192.168.0.13'
const URL_API = `http://${direccionIp}:2812/petcitas/mascota`;

const initialState = {
    mascotas: [],
    status: 'idle',
    error: null,
}

//Función para traer todas las mascotas
const getMascotasAsync = createAsyncThunk('mascotas/mascotasPorVeterinaria', async (mascotaData) => {
    // console.log("Entró a getMascotasAsync :DD => : " + JSON.stringify(mascotaData, null, 2))
    try {
        const response = await axios.post(`${URL_API}/mascotasPorVeterinaria`, mascotaData, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                "Content-Type": "application/json",
            },
            mode: "no-cors",
        })
        const data = response.data.responses;
        // console.log("getMascotasAsync: => " + JSON.stringify(data, null, 2));
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
})

//Función para registrar una mascota
const registrarMascotaAsync = createAsyncThunk('mascotas/registrarMascota', async (mascotaData) => {
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
})

// Función para eliminar a una mascota
const eliminarMascotaAsync = createAsyncThunk('mascotas/eliminarMascota', async (mascotaData) => {
    console.log("Entró a eliminarMascota :DD => : " + JSON.stringify(mascotaData, null, 2))
    try {
        const response = await axios.post(`${URL_API}/eliminar`, mascotaData, {
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

const editarMascotaAsync = createAsyncThunk('mascotas/editarMascota', async (mascotaData) => {
    console.log("Entró a editarMascota :DD => : " + JSON.stringify(mascotaData, null, 2))
    try {
        const response = await axios.post(`${URL_API}/actualizar`, mascotaData, {
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

const mascotasSlice = createSlice({
    name: 'mascotas',
    initialState,
    reducers: {
        getMascotas: {
            reducer(state, action) {
                state.mascotas = action.payload;
            },
            prepare(mascotas) {
                return {
                    payload: mascotas
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMascotasAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMascotasAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.mascotas = action.payload;
            })
            .addCase(getMascotasAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(registrarMascotaAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registrarMascotaAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.mascotas = [...state.mascotas, action.payload];
            })
            .addCase(registrarMascotaAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(eliminarMascotaAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(eliminarMascotaAsync.fulfilled, (state, action) => {
                state.status = 'success';
                // Eliminar la mascota del state
                state.mascotas = state.mascotas.filter(mascota => mascota.id !== action.payload.id);
            }) 

            .addCase(editarMascotaAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editarMascotaAsync.fulfilled, (state, action) => {
                state.status = 'success';
                // Editar la mascota del state
                state.mascotas = state.mascotas.map(mascota => {
                    console.log("mascota.id: " + mascota.id + " action.payload.id: " + JSON.stringify( action.payload, null, 2))
                    if (mascota.id === action.payload.id) {
                        return {
                            ...mascota,
                            ...action.payload
                        }
                    } else {
                        return mascota;
                    }
                })
            })
            .addCase(editarMascotaAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })


    }
})

export const { getMascotas } = mascotasSlice.actions;

export default mascotasSlice.reducer;

export { getMascotasAsync, registrarMascotaAsync, eliminarMascotaAsync, editarMascotaAsync }