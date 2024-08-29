import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  darkMode: true,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state) =>{
        state.darkMode = !state.darkMode;
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer