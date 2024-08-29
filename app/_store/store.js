import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './features/theme/themeSlice'; // Import the reducer
export const makeStore  = () => {
    return configureStore({
        reducer: {
            theme: themeReducer,
        },
    })
} 