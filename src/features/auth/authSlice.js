import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: null,
    status: 'idle',
    error: null,
}

const loginAsync = createAsyncThunk('auth/signin', async (userData) => {
    console.log("Entró a createAsyncThunk :DD => : " + JSON.stringify(userData, null, 2))

    // try {
    //     const response = await axios.post(`${URL_API}/auth/signin`, userData, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     const data = response.data; // Axios ya convierte la respuesta JSON
    //     //console.log("UserLoginAsyncThunk: => " + JSON.stringify(data, null, 2));

    //     // Guarda la información del usuario en AsyncStorage
    //     await AsyncStorage.setItem('userData', JSON.stringify(data));

    //     return data;
    // } catch (error) {
    //     console.log(error);
    //     throw error;
    // }
});

const registerAsync = createAsyncThunk('auth/signup', async (userData) => {
    // try {
    //     const response = await axios.post(`${URL_API}/auth/signup`, userData, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     const data = response.data;
    //     console.log("UserRegisterAsyncThunk: => " + JSON.stringify(data, null, 2));
    //     return data;
    // } catch (error) {
    //     console.log(error);
    //     throw error;
    // }
})

const authslice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: {
            reducer(state, action) {
                state.user = action.payload;
            },
            prepare(userData) {
                return {
                    payload: {
                        userData
                    }
                }
            }
        },
        logout(state) {
            state.user = null;
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(loginAsync.fulfilled, (state, action) => {
            state.status = 'success';
            state.user = action.payload;
        })
        .addCase(loginAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })

        .addCase(registerAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(registerAsync.fulfilled, (state, action) => {
            state.status = 'success';
            state.user = action.payload;
        })
        .addCase(registerAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
})

export const { login, logout } = authslice.actions;

export default authslice.reducer;

export { loginAsync, registerAsync }
