import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './features/theme/themeSlice'; // Import the Theme reducer
import userIdReducer from './features/user/userIdSlice'; // Import the userID reducer
import noteReducer from './features/notes/noteSlice'; // Import the userID reducer
export const makeStore  = () => {
    return configureStore({
        reducer: {
            theme: themeReducer,
            userId: userIdReducer,
            note: noteReducer,
        },
    })
} 