import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const direccionIp = '192.168.1.154'
const URL_API = `http://${direccionIp}:2812/petcitas/cita`;

const initialState = {
    citas: [],
    status: 'idle',
    error: null,
}

// Función para traer todas las citas
const getCitasAsync = createAsyncThunk('citas/getCitas', async ( citaData ) => {
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
        // console.log("getCitasAsync: => " + JSON.stringify(data, null, 2));
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
    }
})

export const { getCitas } = citasSlice.actions;

export default citasSlice.reducer;

export { getCitasAsync }