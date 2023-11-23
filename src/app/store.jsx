import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import themeReducer from '../features/theme/themeSlice';
import citasSlice from '../features/admin/citas/citasSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
        citas: citasSlice,
    },
})