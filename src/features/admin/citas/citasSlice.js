import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    cita: null,
    status: 'idle',
    error: null,
}

const citasSlice = createSlice({
    name: 'citas',
    initialState,
    reducers: {
        getCita(state, action) {
            state.cita = action.payload;
        },
        updateCita(state, action) {
            state.cita = action.payload;
        },
        deleteCita(state, action) {
            state.cita = action.payload;
        }
    }
})

export const { getCita, updateCita, deleteCita } = citasSlice.actions;

export default citasSlice.reducer;