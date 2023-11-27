import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const direccionIp = '192.168.0.7'
const URL_API = `http://${direccionIp}:2812/petcitas/usuario`;

const initialState = {
    user: [],
    currentUser: [],
    status: 'idle',
    error: null,
}

const loginAsync = createAsyncThunk('auth/signin', async (userData) => {
    console.log("Entró a createAsyncThunk :DD => : " + JSON.stringify(userData, null, 2))

    try {
        console.log(`${URL_API}/login`)
        const response = await axios.post(`${URL_API}/login`, userData, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                "Content-Type": "application/json",
            },
            mode: "no-cors",
        });

        const data = response.data.response; // Axios ya convierte la respuesta JSON
        console.log("UserLoginAsyncThunk: => " + JSON.stringify(data.response, null, 2));

        // Guarda la información del usuario en AsyncStorage
        //await AsyncStorage.setItem('userData', JSON.stringify(data));

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

const registerAsync = createAsyncThunk('auth/add', async (userData) => {
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
        console.log("UserRegisterAsyncThunk: => " + JSON.stringify(data, null, 2));
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
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
                state.currentUser = action.payload;
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
