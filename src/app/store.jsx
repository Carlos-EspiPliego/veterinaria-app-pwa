import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@features/auth/authSlice';
import themeReducer from '@features/theme/themeSlice';
import citasSlice from '@features/admin/citas/citasSlice';
import clientesSlice from '@features/admin/clientes/clientesSlice';
import mascotasSlice from '@features/admin/mascotas/mascotasSlice';
import historialSlice from '@features/admin/historiales/historialSlice';

const initialState = {
    auth: {
        user:JSON.parse(localStorage.getItem('currentUser')) || [],
    }
}
export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
        citas: citasSlice,
        clientes: clientesSlice,
        mascotas: mascotasSlice,
        historiales: historialSlice,
    },
    preloadedState: initialState,
})