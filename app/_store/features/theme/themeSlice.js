import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: true,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state) =>{
        state = !state;
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer