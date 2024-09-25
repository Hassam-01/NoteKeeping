import { createSlice } from "@reduxjs/toolkit";

const initalState ={
    userID : null
}

export const userIdSlice = createSlice({
    name: "userId",
    initialState: initalState,
    reducers: {
        setUserId: (state, action) => {
            state.userID = action.payload;
        }
    }
})

export const {setUserId} = userIdSlice.actions;

export default userIdSlice.reducer;