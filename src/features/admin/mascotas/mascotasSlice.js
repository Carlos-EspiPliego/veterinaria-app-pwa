import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const direccionIp = '192.168.0.7'
const URL_API = `http://${direccionIp}:2812/petcitas/usuario`;

const initialState = {
    mascotas: null,
    status: 'idle',
    error: null,
}

//Función para traer todas las mascotas
const getMascotasAsync = createAsyncThunk('mascotas/getMascotas', async () => {
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
        console.log("getMascotasAsync: => " + JSON.stringify(data, null, 2));
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
    }
})

export const { getMascotas } = mascotasSlice.actions;

export default mascotasSlice.reducer;

export { getMascotasAsync }